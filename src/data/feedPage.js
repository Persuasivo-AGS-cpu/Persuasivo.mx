import { waLink } from './contact.js';
import { getServiceBySlug } from './servicesData.js';

const svc = getServiceBySlug('autoridad');

export const FEED_WA = waLink('Hola, me interesa la gestión de redes para mi empresa');

export const FEED_WA_MSG = waLink('Hola, quiero un diagnóstico de mis redes sociales');

export const feedProfile = {
  name: 'persuasivo.mx',
  role: 'Copywriting & Redes',
  follow: 'Seguir',
  followLabel: 'Seguir: escribir por WhatsApp',
  message: 'Mensaje',
  messageLabel: 'Enviar mensaje por WhatsApp',
};

export const feedHero = {
  meta: 'Copywriting & Redes',
  title: 'Si suenas igual que todos, te cobrarán como a todos.',
  sub: svc.desc,
  tags: ['#Copywriting', '#IdentidadVisual', '#LinkedIn'],
  cta: 'Solicitar diagnóstico',
};

export const feedCarousel = {
  meta: 'Qué hacemos · desliza →',
  title: 'Lo que hacemos por tu marca',
  slides: svc.capabilities,
};

export const feedPoll = {
  meta: 'Encuesta',
  question: '¿Qué te frena en redes?',
  options: [
    { label: 'No tengo tiempo', answer: 'Nosotros creamos todo: copy, diseño visual y estrategia editorial. Tú solo haces una sesión inicial de onboarding.' },
    { label: 'No sé qué publicar', answer: 'Armamos calendarios editoriales con contenido de valor, planeados por mes.' },
    { label: 'No veo resultados', answer: 'Escribimos sobre el dolor de tu cliente y posicionamos tu solución, para que el prospecto llegue ya convencido del valor de lo que ofreces.' },
  ],
};

export const feedStories = {
  meta: 'Casos',
  title: 'Marcas que ya publican con criterio',
  slugs: ['manifiesto-marca', 'arquitectura-visual', 'sistema-liderazgo'],
};

export const feedCalendar = {
  meta: 'Calendario editorial',
  title: 'Así se ve un mes de contenido',
  note: 'Ejemplo ilustrativo: la frecuencia real depende de tus plataformas y objetivos.',
  weeks: 4,
  dayHeads: ['L', 'M', 'M', 'J', 'V'],
  dayNames: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'],
  types: [
    { id: 'educa', label: 'Educa', desc: 'Enseña algo útil a tu cliente.' },
    { id: 'caso', label: 'Caso', desc: 'Muestra un resultado real.' },
    { id: 'opina', label: 'Opina', desc: 'Tu criterio como líder, ideal para LinkedIn.' },
    { id: 'equipo', label: 'Equipo', desc: 'Detrás de cámaras, personas reales.' },
    { id: 'pregunta', label: 'Pregunta', desc: 'Abre conversación con tu audiencia.' },
  ],
};

export const feedComments = {
  meta: 'Comentarios',
  title: 'Lo que más nos preguntan',
  items: svc.faq.map((f) => [f.question, f.answer]),
};

export const feedCta = {
  meta: 'Cómo contratar ↓',
  title: '¿Cómo empezamos?',
  steps: [
    ['Escríbenos por WhatsApp', 'Pides tu diagnóstico de redes.'],
    ['Sesión de onboarding', 'Entendemos tu negocio, tu voz y tus objetivos.'],
    ['Nosotros producimos', 'Copy, diseño y estrategia editorial. Tú recibes tu calendario del mes.'],
  ],
  text: 'En el diagnóstico revisamos tu narrativa y tus plataformas, y te proponemos un calendario con el contenido que sí vende.',
  price: 'Gestión de redes desde $12,000 MXN al mes. El alcance se define según plataformas y frecuencia.',
  button: 'Solicitar diagnóstico',
};

// Orden de la parrilla 3×3. kind 'modal' abre una ventana; 'case' enlaza al caso.
export const feedTiles = [
  { id: 'hero', kind: 'modal', label: 'Diagnóstico', tone: 'lime' },
  { id: 'case0', kind: 'case', slug: feedStories.slugs[0] },
  { id: 'carousel', kind: 'modal', label: 'Qué incluye', tone: 'dark' },
  { id: 'poll', kind: 'modal', label: 'Encuesta', tone: 'white' },
  { id: 'calendar', kind: 'modal', label: 'Cómo funciona', tone: 'white' },
  { id: 'case1', kind: 'case', slug: feedStories.slugs[1] },
  { id: 'case2', kind: 'case', slug: feedStories.slugs[2] },
  { id: 'faq', kind: 'modal', label: 'Preguntas', tone: 'gray' },
  { id: 'cta', kind: 'modal', label: 'Cómo contratar', tone: 'dark' },
];
