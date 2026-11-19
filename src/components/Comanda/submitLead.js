import { createClient } from '@supabase/supabase-js';
import { LEAD_ENDPOINT } from '../../data/contact';
import { comandaServices } from '../../data/comanda';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || '', import.meta.env.VITE_SUPABASE_ANON_KEY || '');

const SHORT = { branding: 'Branding', web: 'Web', video: 'Video', redes: 'Social', meta: 'Meta Ads', google: 'Google Ads', nose: 'Por definir' };

// Mismo flujo que el formulario anterior: correo (formsubmit) + CRM (Supabase). `via` = 'WhatsApp' | 'Correo'.
// Si algo falla no se interrumpe la experiencia del visitante.
export async function submitLead(form, via) {
  const email = form.email.trim();
  const who = form.company.trim() || email.split('@')[0] || form.name.trim() || 'Lead Web';
  const labels = form.services.map((id) => (comandaServices.find((s) => s.id === id) || {}).label || id);

  try {
    await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Nombre: form.name,
        Empresa: form.company,
        Whatsapp: form.phone,
        Email: form.email,
        Servicios: labels.join(', '),
        Para_Cuando: form.timing,
        Presupuesto: form.budget,
        Notas: form.notes,
        Enviado_Por: via,
        _subject: 'NUEVO LEAD - Comanda Persuasivo',
      }),
    });
  } catch (error) {
    console.error('Error al enviar el pedido por correo:', error);
  }

  try {
    await supabase.from('crm_tasks').insert([{
      title: `${who} - ${form.services.map((id) => SHORT[id] || id).join('+')}`,
      column_state: 'Backlog',
      priority: 'Alta',
      description: `**LEAD ENTRANTE (COMANDA - ${via})**\n\n- **Nombre:** ${form.name}\n- **Teléfono:** ${form.phone || 'N/A'}\n- **Email Principal:** ${form.email || 'N/A'}\n- **URL/Empresa:** ${form.company || 'N/A'}\n- **Inversión:** ${form.budget || 'N/A'}\n- **Para cuándo:** ${form.timing || 'N/A'}\n- **Servicios:** ${labels.join(', ')}\n- **Notas:** ${form.notes || 'N/A'}`,
    }]);

    await supabase.from('onboarding_queue').insert([{
      company_name: who,
      sales_phone: form.phone.trim() || email || form.name,
      project_type: 'Contacto Express',
      pain_point: `Este prospecto llegó por la comanda (${via}).\nPresupuesto: ${form.budget || 'N/D'}\nPara cuándo: ${form.timing || 'N/D'}`,
      hook: `Servicios solicitados: ${labels.join(', ')}`,
      authority: 'N/A',
      cta: 'Validar y Contactar',
      status: 'pending',
      services: {
        ticket_range: form.budget || null,
        current_website: form.company || null,
        traffic_source: 'Comanda',
      },
    }]);
  } catch (crmError) {
    // El CRM es secundario: si falla no se muestra nada al visitante.
  }
}
