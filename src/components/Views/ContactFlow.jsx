import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { createClient } from '@supabase/supabase-js';
import Footer from '../Navigation/Footer';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ContactFlow({ setView }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', url: '', scope: [], budget: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const scopes = [
    { id: 'meta_ads', label: 'Campañas Meta Ads', desc: 'Adquisición de prospectos calificados en frío. (Desde $2,700/mes)' },
    { id: 'redes', label: 'Gestión de Redes Sociales', desc: 'Posicionamiento y fidelización de marca. ($4,500/mes)' },
    { id: 'landing', label: 'Landing Page de Alta Conversión', desc: 'Activo digital estático estructurado para venta. ($6,500 único)' },
    { id: 'web_copy', label: 'Ecosistema Web 360 & Copywriting', desc: 'Desarrollo web corporativo completo. (Cotización a la medida)' }
  ];

  const budgets = [
    { id: 'base', label: 'Inversión de Arranque', desc: 'Para activar campañas, redes sociales o landing pages base. (< $10,000)' },
    { id: 'pro', label: 'Fase de Escalamiento', desc: 'Operación paralela de distintos servicios para dominar tu nicho. ($10k - $25k)' },
    { id: 'elite', label: 'Dominio de Mercado Completamente Custom', desc: 'Sistemas complejos Web3/SaaS con alto nivel de carga ingenieril. (Flexible)' }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.email || !formData.name || !formData.phone)) return;
    if (step === 3 && formData.scope.length === 0) return;

    setStep(prev => prev + 1);
  };

  const handleScopeSelect = (scopeId) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.includes(scopeId) ? prev.scope.filter(s => s !== scopeId) : [...prev.scope, scopeId]
    }));
  };

  const handleBudgetSelect = (budgetId) => {
    setFormData({ ...formData, budget: budgetId });
  };

  const submitForm = async () => {
    if (!formData.budget) return;
    setStatus('loading');

    try {
      await fetch("https://formsubmit.co/ajax/hola@persuasivo.mx", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Nombre: formData.name,
            Whatsapp: formData.phone,
            Email: formData.email,
            URL_Empresa: formData.url,
            Vector_Elegido: formData.scope.join(', '),
            Filtro_Inversion: formData.budget,
            _subject: "NUEVO LEAD CALIFICADO - The Factory Persuasivo"
        })
      });
      // Inyección NATIVA a Supabase para sonar la campana en cualquier servidor
      try {
        await supabase.from('crm_tasks').insert([{
           title: `${formData.url || formData.email.split('@')[0]} - ${formData.scope.map(s => s === 'meta_ads' ? 'Ads' : s === 'redes' ? 'Social' : s === 'landing' ? 'Landing' : 'Web').join('+')}`,
           column_state: 'Backlog',
           priority: 'Alta',
           description: `**LEAD ENTRANTE (LANDING PAGE)**\n\n- **Nombre:** ${formData.name}\n- **Teléfono:** ${formData.phone}\n- **Email Principal:** ${formData.email}\n- **URL/Empresa:** ${formData.url || 'N/A'}\n- **Inversión:** ${formData.budget}\n- **Servicios:** ${formData.scope.join(', ')}`
        }]);

        // Inyectar simultáneamente al INBOX de Aterrizajes (onboarding_queue) para que suene la campana de notificaciones de la UI
        await supabase.from('onboarding_queue').insert([{
           company_name: formData.url || formData.name || formData.email.split('@')[0] || 'Lead Web',
           sales_phone: formData.phone || formData.email,
           project_type: 'Contacto Express',
           pain_point: `Este prospecto llegó por el formulario rápido. \nPresupuesto asignado: ${formData.budget}`,
           hook: `Servicios solicitados: ${formData.scope.join(', ')}`,
           authority: 'N/A',
           cta: 'Validar y Contactar',
           status: 'pending',
           services: {
              ticket_range: formData.budget,
              current_website: formData.url || null,
              traffic_source: 'Landing Page'
           }
        }]);
      } catch (crmError) {
        // Silently handle CRM injection error to avoid breaking the UX
      }
      setStatus('success');
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      // Even on adblocker network errors, we want to show success to the user so they feel heard.
      setStatus('success');
    }
  };

  const formVariants = {
    enter: { opacity: 0, x: 20, filter: 'blur(5px)' },
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, filter: 'blur(5px)', transition: { duration: 0.15, ease: 'easeIn' } }
  };

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100vh',
        background: '#EDE7D8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Mobile fixes for tall forms */
        .form-safe-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          position: relative;
          padding: max(100px, 12vh) 20px 100px 20px;
          box-sizing: border-box;
        }

        .form-card {
          margin: 0 auto auto auto;
          z-index: 1;
          width: 100%;
          max-width: 600px;
          padding: clamp(1.5rem, 5vw, 3rem);
          background: #F7F4EC;
          border: 1px solid #D9D2C2;
          border-radius: 8px;
          box-shadow: 6px 6px 0 rgba(26,24,21,0.08);
        }

        .field-input {
          width: 100%; background: #FBF7ED; border: 1.5px solid #D9D2C2; color: #1A1815;
          font-size: 1.05rem; padding: 1.1rem 1.5rem; outline: none; font-family: inherit;
          border-radius: 6px; transition: border-color 0.2s ease;
        }
        .field-input:focus { border-color: #D6531D; }
        .field-input::placeholder { color: #948C78; }
      `}</style>

      <Helmet>
        <title>Iniciar Operación | Contacto Persuasivo</title>
        <meta name="description" content="Inicia el diagnóstico de facturación y auditoría de identidad magnética." />
      </Helmet>

      <div className="form-safe-wrapper">

      <motion.div
        className="form-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        {status !== 'success' && status !== 'loading' && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: '4px', flex: 1,
                background: step >= i ? '#D6531D' : '#D9D2C2',
                transition: 'background 0.3s ease'
              }} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 0' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                style={{ width: '72px', height: '72px', background: 'transparent', border: '2px solid #1A1815', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#D6531D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.9rem', fontWeight: 600, color: '#1A1815', margin: '0 0 1rem 0' }}>En la mira.</h2>
              <p style={{ color: '#6B6459', fontSize: '1.1rem', lineHeight: 1.5, margin: 0 }}>Datos cifrados y recibidos. Ejecutaremos auditoría inicial y nuestro equipo cerrará contacto.</p>
            </motion.div>
          ) : status === 'loading' ? (
             <motion.div
               key="loading"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}
             >
               <div style={{ width: '36px', height: '36px', border: '3px solid #D9D2C2', borderTop: '3px solid #D6531D', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }} />
               <p style={{ color: '#D6531D', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Asegurando Ecosistema...</p>
             </motion.div>
          ) : (
            <motion.form
              key={`step-${step}`}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onSubmit={step === 4 ? (e) => { e.preventDefault(); submitForm(); } : handleNext}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* HEADER DINÁMICO */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(1.7rem, 5vw, 2.3rem)', fontWeight: 700, color: '#1A1815', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                  {step === 1 && "Identidad Quirúrgica"}
                  {step === 2 && "Trazar el Blanco"}
                  {step === 3 && "Vector de Ataque"}
                  {step === 4 && "Filtro de Inversión"}
                </h1>
                <p style={{ marginTop: '1rem', color: '#6B6459', fontSize: 'clamp(0.9rem, 3vw, 1.05rem)', lineHeight: 1.5 }}>
                  {step === 1 && "Solo tratamos con tomadores de decisiones. Ingresa tus datos de contacto directo."}
                  {step === 2 && "Ingresa la URL de tu corporativo (si existe). Si vienes a construir desde cero, sáltate este paso."}
                  {step === 3 && "¿En qué vectores necesitas fuerza operativa bruta? Puedes seleccionar múltiples opciones."}
                  {step === 4 && "Filtro comercial final. Requerimos ubicarnos en un espectro de inversión para ensamblar la propuesta."}
                </p>
              </div>

              {/* CONTENIDO DEL PASO */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input className="field-input" type="text" placeholder="Tu Nombre Completo" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required autoFocus />
                  <input className="field-input" type="tel" placeholder="WhatsApp Comercial" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  <input className="field-input" type="email" placeholder="Correo Corporativo (ej. ceo@apple.com)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
              )}

              {step === 2 && (
                <>
                  <input className="field-input" type="text" placeholder="ej. miempresa.com" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} autoFocus />
                  <div style={{ textAlign: 'center', marginTop: '-0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => { setFormData({...formData, url: 'Proyecto desde cero'}); setStep(3); }}
                      style={{ background: 'transparent', color: '#6B6459', border: '1px solid #D9D2C2', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}
                    >
                      Aún no tengo un activo digital
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {scopes.map(s => (
                    <motion.div
                      key={s.id}
                      onClick={() => handleScopeSelect(s.id)}
                      whileHover={{ scale: formData.scope.includes(s.id) ? 1.02 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: formData.scope.includes(s.id) ? 'rgba(214, 83, 29, 0.07)' : '#FBF7ED',
                        border: formData.scope.includes(s.id) ? '1.5px solid #D6531D' : '1.5px solid #D9D2C2',
                        transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column'
                      }}
                    >
                      <h4 style={{ margin: 0, color: formData.scope.includes(s.id) ? '#D6531D' : '#1A1815', fontSize: '1.05rem', fontWeight: 700 }}>{s.label}</h4>
                      <p style={{ margin: '0.3rem 0 0 0', color: '#6B6459', fontSize: '0.9rem' }}>{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {budgets.map(b => (
                    <motion.div
                      key={b.id}
                      onClick={() => handleBudgetSelect(b.id)}
                      whileHover={{ scale: formData.budget === b.id ? 1.02 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: formData.budget === b.id ? 'rgba(214, 83, 29, 0.07)' : '#FBF7ED',
                        border: formData.budget === b.id ? '1.5px solid #D6531D' : '1.5px solid #D9D2C2',
                        transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column'
                      }}
                    >
                      <h4 style={{ margin: 0, color: formData.budget === b.id ? '#D6531D' : '#1A1815', fontSize: '1.05rem', fontWeight: 700 }}>{b.label}</h4>
                      <p style={{ margin: '0.3rem 0 0 0', color: '#6B6459', fontSize: '0.9rem' }}>{b.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* BOTONES */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {step > 1 && (
                   <motion.button type="button" onClick={() => setStep(step - 1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'transparent', color: '#1A1815', border: '1.5px solid #1A1815', padding: '1.2rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}>
                     ←
                   </motion.button>
                )}

                <motion.button
                  type="submit"
                  disabled={(step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)}
                  whileHover={{ y: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 0 : -2 }}
                  whileTap={{ scale: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 1 : 0.98 }}
                  style={{
                    flex: 1, background: '#D6531D',
                    boxShadow: '4px 4px 0 rgba(26,24,21,0.15)',
                    color: '#FBF7ED', border: '1.5px solid #1A1815', borderRadius: '6px', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                    cursor: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 'not-allowed' : 'pointer',
                    opacity: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 0.5 : 1,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px'
                  }}
                >
                  {step < 4 ? 'Avanzar →' : 'Iniciar Operación'}
                </motion.button>
              </div>

            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
      </div>

      {/* Footer Minimalista Inyectado */}
      <div style={{ padding: '0 5vw' }}>
        <Footer setView={setView} />
      </div>
    </motion.div>
  );
}
