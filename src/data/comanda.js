export const comandaCopy = {
  kicker: 'Contacto',
  title: 'Arma tu comanda.',
  sub: 'Cuéntanos qué necesitas. Tu pedido se imprime al lado y el diagnóstico de 30 minutos va por nuestra cuenta.',
  servicesLegend: '¿Qué necesitas? *',
  timingLegend: '¿Para cuándo?',
  budgetLabel: 'Presupuesto aproximado (primer mes o proyecto)',
  budgetEmpty: 'Prefiero hablarlo después',
  notesLabel: 'Algo más que debamos saber',
  alt: '¿Prefieres hablar en vivo?',
  altLink: 'Agenda 30 minutos',
};

export const comandaServices = [
  { id: 'branding', label: 'Branding', short: 'Branding' },
  { id: 'web', label: 'Página web', short: 'Página web' },
  { id: 'video', label: 'Contenido en video', short: 'Contenido en video' },
  { id: 'redes', label: 'Redes sociales', short: 'Redes sociales' },
  { id: 'meta', label: 'Meta Ads', short: 'Meta Ads' },
  { id: 'google', label: 'Google Ads', short: 'Google Ads' },
  { id: 'nose', label: 'No sé por dónde empezar', short: 'Por definir (diagnóstico)' },
];

export const comandaTimings = ['Lo antes posible', 'Este mes', 'En 1 a 3 meses', 'Solo estoy explorando'];

export const comandaBudgets = ['Menos de $15,000 MXN', '$15,000 a $35,000 MXN', 'Más de $35,000 MXN'];

export const initialForm = { name: '', company: '', phone: '', email: '', services: [], timing: '', budget: '', notes: '' };

const byId = (id) => comandaServices.find((s) => s.id === id);

// "No sé por dónde empezar" es exclusivo: elegirlo limpia el resto y elegir otro lo quita.
export const toggleService = (list, id) => {
  if (id === 'nose') return list.includes('nose') ? [] : ['nose'];
  const rest = list.filter((s) => s !== 'nose');
  return rest.includes(id) ? rest.filter((s) => s !== id) : [...rest, id];
};

export const canSend = (f) => f.name.trim() !== '' && f.services.length > 0;
export const canContact = (f) => canSend(f) && (f.phone.trim() !== '' || f.email.trim() !== '');

export const makeFolio = (now = Date.now()) => `PZ-${String(now).slice(-5)}`;

export const formatTicketDate = (d = new Date()) =>
  new Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Monterrey' }).format(d);

// Filas del ticket: solo lo que ya tiene contenido, en un orden fijo.
export const buildTicketRows = (f) => [
  ['name', 'Cliente', [f.name.trim()]],
  ['company', 'Empresa', [f.company.trim()]],
  ['phone', 'WhatsApp', [f.phone.trim()]],
  ['email', 'Correo', [f.email.trim()]],
  ['services', 'Pedido', f.services.map((id) => `1x ${byId(id).short}`)],
  ['timing', 'Para cuándo', [f.timing]],
  ['budget', 'Presupuesto', [f.budget]],
  ['notes', 'Notas', [f.notes.trim()]],
]
  .filter(([, , values]) => values.some(Boolean))
  .map(([id, label, values]) => ({ id, label, values: values.filter(Boolean) }));

// Mensaje de WhatsApp con el pedido ya escrito.
export const buildOrderText = (f, folio) => {
  const lines = [`Hola, soy ${f.name.trim() || '(sin nombre)'}. Quiero hacer este pedido en Persuasivo:`, `Folio: ${folio}`];
  if (f.company.trim()) lines.push(`Empresa o sitio: ${f.company.trim()}`);
  if (f.services.length) lines.push(`Pedido: ${f.services.map((id) => byId(id).label).join(', ')}`);
  if (f.timing) lines.push(`Para cuándo: ${f.timing}`);
  if (f.budget) lines.push(`Presupuesto: ${f.budget}`);
  if (f.notes.trim()) lines.push(`Notas: ${f.notes.trim()}`);
  return lines.join('\n');
};
