import { waLink } from './contact.js';
import { getServiceBySlug } from './servicesData.js';

const svc = getServiceBySlug('ecosistemas');

export const WEB_WA = waLink('Hola, quiero cotizar una página web');

export const webKicker = 'Esto es un boceto de la página que te vamos a construir. Léela como cliente: ya te está vendiendo el servicio.';

export const webHero = {
  title: ['Tu sitio web, trabajando de ', 'vendedor', ' las 24 horas.'],
  sub: 'Páginas en React que cargan en menos de un segundo y convierten visitas en cotizaciones por WhatsApp.',
  cta: 'Cotizar mi sitio',
  stats: svc.metrics, // [{ value, label }]
};

export const webBenefits = [
  { n: '1', title: 'Carga en menos de 1 segundo', text: 'Si tarda, el visitante se va. Construimos en React y Vite, sin plantillas pesadas.' },
  { n: '2', title: 'Está hecha para vender', text: 'Cada bloque empuja a una sola acción: cotizar por WhatsApp. Nada que distraiga.' },
  { n: '3', title: 'Google te encuentra', text: 'SEO técnico desde el código: títulos, descripciones y datos estructurados.' },
];

export const webSteps = [
  { title: 'Boceto', text: 'Dibujamos estructura y mensaje, como esta página.', here: true },
  { title: 'Diseño', text: 'Lo vestimos con tu marca.' },
  { title: 'Desarrollo', text: 'Lo construimos rápido y listo para Google.' },
  { title: 'Lanzamiento', text: 'Publicamos, medimos y ajustamos.' },
];

export const webPlans = [
  { name: 'Landing de alta conversión', price: 'Desde $35,000 MXN', time: '2–3 semanas',
    items: ['Una página enfocada en una sola acción', 'Copywriting y diseño UI/UX', 'SEO técnico y velocidad', 'Botón a WhatsApp o CRM'] },
  { name: 'Sitio corporativo', price: 'Desde $75,000 MXN', time: '4–6 semanas',
    items: ['Multipágina: servicios, nosotros, contacto', 'Todo lo de la landing', 'Integración con CRM, pagos y analítica', 'Optimización de rendimiento (Core Web Vitals)'] },
];

export const webFaq = svc.faq; // [{ question, answer }]

export const webNotes = {
  header: { side: 'left', rotate: -4, text: '1. Menú limpio: una sola acción visible → cotizar.' },
  hero: { side: 'right', rotate: 3, text: '2. Hero: en 5 segundos se entiende qué vendes, para quién y qué hacer.' },
  proof: { side: 'left', rotate: -3, text: '3. Prueba real: resultados con nombre, no frases genéricas.' },
  benefits: { side: 'right', rotate: 2, text: '4. Beneficios, no características: responde "¿y a mí qué me gano?"' },
  process: { side: 'left', rotate: -2, text: '5. Así empezamos todos los proyectos: dibujando. Esta página es el ejemplo.' },
  pricing: { side: 'right', rotate: 3, text: '6. Precio a la vista = menos fricción y prospectos más serios.' },
  faq: { side: 'left', rotate: -3, text: '7. Responde la objeción antes de que la piensen.' },
  cta: { side: 'right', rotate: 2, text: '8. Cierre: la misma acción del principio. Una sola.' },
};
