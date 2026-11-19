import { homeServices } from './homeServices.js';

export const paperMasthead = {
  name: 'Persuasivo',
  tagline: 'Diario de los negocios que crecen en internet',
  place: 'Monterrey, N.L.',
  founded: 'Fundado en 2022',
  price: 'Precio del ejemplar: diagnóstico gratuito',
};

// Fecha de la edición en vivo (zona horaria de Monterrey para no adelantar el día).
export const formatEdition = (d = new Date()) => {
  const s = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Monterrey',
  }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const paperTicker = {
  label: 'Última hora',
  pause: 'Pausar noticias',
  play: 'Reanudar noticias',
  items: [
    '12X ROI promedio',
    '+215% en leads',
    'Diagnóstico gratuito de 30 minutos',
    'Respuesta en menos de 24 horas',
    'Clientes en Monterrey, CDMX, Houston y Austin',
  ],
};

export const paperHead = {
  kicker: 'Portada · Agencia digital',
  title: ['Hacemos que tu negocio ', 'crezca en internet.'],
  deck: 'Meta Ads, Google Ads, desarrollo web y redes sociales con estrategia real y resultados documentados.',
  byline: 'Por Abraham Garza, fundador · Monterrey, N.L.',
  photoSlug: 'monterrey-juridico',
  body: [
    'Cada peso que inviertes en marketing debería tener una razón y un destino claro. No creamos campañas para verse bien en un reporte.',
    'Construimos ecosistemas digitales que generan clientes reales, ventas reales, crecimiento real. Ese es el único estándar que nos importa.',
  ],
};

export const paperStats = [
  ['12X', 'ROI promedio'],
  ['+215%', 'Leads'],
  ['3 años', 'Operando'],
  ['MX + USA', 'Cobertura'],
];

// Índice de la edición: los 5 servicios, con "página" ficticia.
export const paperIndex = {
  title: 'Dentro de esta edición',
  items: homeServices.map((s, i) => ({ ...s, page: i + 2 })),
};

export const paperFounder = {
  label: 'Quién está detrás de Persuasivo',
  name: 'Abraham Garza',
  paragraphs: [
    'Llevo 3 años construyendo sistemas de crecimiento digital para negocios en México y Estados Unidos.',
    'Empecé Persuasivo porque vi demasiadas agencias vendiendo humo: promesas grandes, reportes bonitos y resultados que nadie podía explicar.',
  ],
  quote: 'Mi apuesta es diferente: menos clientes, más atención, resultados que puedas ver en tu banco.',
  creds: 'Meta Certified · Google Ads · Desarrollo Web React',
};

export const paperPrinciples = {
  title: 'Por qué Persuasivo',
  items: [
    ['Estrategia antes que ejecución', 'No tocamos un anuncio ni escribimos una línea de código sin entender a fondo tu negocio y a tus clientes ideales.'],
    ['Resultados con nombre y apellido', 'Cada proyecto tiene métricas definidas desde el día uno. No hablamos de "alcance" — hablamos de ventas y leads.'],
    ['Comunicación sin traductor', 'Reportes claros, sin jerga técnica innecesaria. Sabes exactamente qué se hizo, por qué, y qué sigue.'],
    ['Velocidad de startup, rigor de agencia', 'Tomamos decisiones rápido y las ejecutamos bien. Sin burocracia. Sin capas de aprobación interminables.'],
    ['Un solo punto de contacto', 'Trabajas directamente con quien hace el trabajo. Sin cuentas que solo coordinan y facturan.'],
    ['Nos importa tu industria', 'Antes de proponer cualquier solución, estudiamos tu mercado, tu competencia y tu cliente.'],
  ],
};

export const paperMethod = {
  title: 'Cómo trabajamos',
  items: [
    ['01', 'Diagnóstico', 'Analizamos tu situación actual: tráfico, competencia, embudos, mensaje y conversión. Sin costo, sin compromiso.'],
    ['02', 'Arquitectura', 'Diseñamos el sistema completo antes de ejecutar. Qué canales, qué presupuesto, qué mensaje, qué orden.'],
    ['03', 'Ejecución y Escala', 'Implementamos, medimos y optimizamos semana a semana. Escalamos lo que funciona. Cortamos lo que no.'],
  ],
};

export const paperCorrespondents = {
  title: 'Corresponsalías',
  places: ['Monterrey', 'CDMX', 'Houston', 'Austin'],
  creditsTitle: 'Acreditaciones',
  credits: ['Meta Certified', 'Google Ads', 'Desarrollo Web React'],
};

export const paperClassified = {
  label: 'Clasificados · Servicios profesionales',
  title: ['¿Tu negocio debería ', 'facturar más?'],
  text: 'Empieza con un diagnóstico gratuito de 30 minutos. Sin presión. Sin venderte nada que no necesitas.',
  button: 'Agendar diagnóstico',
  note: 'Respuesta en menos de 24 horas',
  print: 'Impreso en Monterrey, N.L.',
};
