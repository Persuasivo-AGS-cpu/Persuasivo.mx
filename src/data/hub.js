import { waLink } from './contact.js';
import { getServiceById } from './servicesData.js';

export const hubIntro = {
  kicker: 'Servicios',
  title: '¿Qué hacemos en Persuasivo?',
  sub: 'Disciplinas complementarias. Un solo objetivo: que tu negocio facture más con menos fricción.',
};

// Los 5 servicios en el orden en que se conectan. El texto sale de servicesData.js.
export const hubServices = [
  { id: 'branding', mini: 'branding', price: 'Según diagnóstico', role: 'Defines quién eres' },
  { id: 'ecosistemas', mini: 'web', price: 'Desde $35,000 MXN', role: 'Tu casa digital, donde se cierra la venta' },
  { id: 'contenido', mini: 'video', price: 'Según diagnóstico', role: 'Explicas qué vendes' },
  { id: 'autoridad', mini: 'feed', price: 'Desde $12,000 MXN al mes', role: 'Construyes autoridad' },
  { id: 'trafico', mini: 'search', price: 'Desde $15,000 MXN al mes, más presupuesto publicitario', role: 'Llegas a más clientes' },
].map((s) => {
  const d = getServiceById(s.id);
  return { ...s, slug: d.slug, title: d.title, subtitle: d.subtitle, desc: d.desc, why: d.businessTrans, to: d.routePath };
});

export const hubGoals = [
  { id: 'pro', label: 'Quiero verme profesional', ids: ['branding', 'ecosistemas'] },
  { id: 'clientes', label: 'Quiero más clientes ya', ids: ['trafico', 'ecosistemas'] },
  { id: 'experto', label: 'Quiero que me reconozcan como experto', ids: ['contenido', 'autoridad'] },
  {
    id: 'nose', label: 'No sé por dónde empezar', ids: [],
    note: 'Cuéntanos tu caso: en un diagnóstico gratuito de 30 minutos te decimos por dónde empezar y qué combinación tiene sentido.',
  },
];

export const hubGoalsCopy = {
  title: '¿Qué necesitas hoy?',
  recommend: 'Te recomendamos:',
  button: 'Hablar de esto por WhatsApp',
  badge: 'Recomendado',
};

export const hubGoalWa = (label) => waLink(`Hola, ${label.charAt(0).toLowerCase()}${label.slice(1)}`);

export const hubJourney = {
  title: 'Cómo se conectan',
  sub: 'Cada pieza prepara a la siguiente.',
};

export const hubCta = {
  title: '¿No sabes por dónde empezar?',
  text: 'Empieza con un diagnóstico gratuito de 30 minutos. Sin presión. Sin venderte nada que no necesitas.',
  button: 'Agendar diagnóstico',
};
