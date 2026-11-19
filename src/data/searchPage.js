import { waLink } from './contact.js';
import { getServiceBySlug } from './servicesData.js';

const svc = getServiceBySlug('trafico');

export const SEARCH_WA = waLink('Hola, quiero una auditoría de mis campañas de Meta Ads');

export const searchQuery = 'cómo conseguir clientes nuevos en Monterrey';

export const searchAd = {
  label: 'Anuncio',
  url: 'persuasivo.com.mx › ads',
  title: 'Google Ads y Meta Ads en Monterrey: aparece cuando te buscan y antes de que te busquen',
  desc: svc.desc,
  extra: 'Empezamos con una auditoría de tu infraestructura publicitaria actual para detectar dónde se te va el dinero.',
  cta: 'Solicitar auditoría',
  sitelinks: [
    ['Qué incluye', 'sr-incluye'],
    ['Google Ads', 'sr-google'],
    ['Meta Ads', 'sr-algoritmo'],
    ['Casos', 'sr-casos'],
    ['Precio', 'sr-panel'],
  ],
};

// Resultados orgánicos. `more` es texto; `list` es una lista opcional.
export const searchResults = [
  {
    id: 'sr-contraste', url: 'persuasivo.com.mx › ads › diferencia',
    title: 'Google Ads capta a quien ya te busca. Meta Ads llega a quien aún no.',
    snippet: 'En Google apareces cuando alguien ya busca lo que vendes. En Meta llegas a quien todavía no te busca pero tiene el perfil para comprarte.',
    more: 'Por eso las combinamos: Google para captar la demanda que ya existe y Meta para crearla. ' + svc.businessTrans,
  },
  {
    id: 'sr-google', url: 'persuasivo.com.mx › ads › google-ads',
    title: 'Google Ads: aparece justo cuando buscan lo que vendes',
    snippet: 'Campañas de búsqueda con palabras clave, anuncios y páginas de destino pensadas para convertir.',
    more: 'Definimos qué buscan tus clientes, armamos grupos de palabras clave y anuncios, y los enviamos a una página pensada para convertir. Medimos por conversiones (llamadas, cotizaciones, citas) y no por clics.',
  },
  {
    id: 'sr-incluye', url: 'persuasivo.com.mx › ads › que-incluye',
    title: 'Qué incluye la gestión de Google Ads y Meta Ads',
    snippet: 'Campañas de búsqueda, arquitectura de campañas, embudos de calificación, retargeting y optimización por conversiones.',
    list: svc.capabilities,
  },
  {
    id: 'sr-algoritmo', url: 'persuasivo.com.mx › ads › meta-ads',
    title: 'Entrenamos el algoritmo de Meta con conversiones reales',
    snippet: 'No optimizamos por likes ni alcance vacío: optimizamos por citas, demos y ventas.',
    more: 'Mientras tu competencia sube videos bailando, nosotros entrenamos el algoritmo de Meta con conversiones de alto nivel. Usamos píxeles maduros y datos demográficos cerrados para mostrar tus ofertas únicamente a quienes ya tienen la tarjeta de crédito en la mano.',
  },
  {
    id: 'sr-escala', url: 'persuasivo.com.mx › ads › escalamiento',
    title: 'Duplicar la inversión sin romper tu margen',
    snippet: 'Una arquitectura publicitaria que aguanta facturar el doble sin que el sistema se rompa.',
    more: 'El problema de la mayoría es que no soportan facturar el doble sin que su sistema se rompa. Nuestra arquitectura publicitaria permite duplicar la inversión (ROAS) sin perder margen de beneficio, estabilizando tu adquisición de clientes a largo plazo.',
  },
  {
    id: 'sr-filtro', url: 'persuasivo.com.mx › ads › embudos',
    title: 'Embudos que filtran antes de llegar a ventas',
    snippet: 'Menos conversaciones con curiosos, más con prospectos cualificados.',
    more: 'No queremos que hables con 100 curiosos. Queremos que hables con 5 personas cualificadas. Implementamos embudos (Funnels) posteriores al anuncio que filtran a los prospectos por presupuesto y dolor antes de que lleguen a tu equipo comercial.',
  },
];

export const searchCases = {
  id: 'sr-casos',
  label: 'Casos de Meta Ads',
  category: 'trafico',
};

export const searchPaa = {
  title: 'Otras preguntas',
  items: svc.faq.map((f) => [f.question, f.answer]),
};

export const searchPanel = {
  id: 'sr-panel',
  name: 'Persuasivo · Google Ads y Meta Ads',
  kind: 'Agencia de publicidad digital',
  place: 'Monterrey, N.L.',
  metrics: svc.metrics, // [{ value, label }]
  metricsNote: 'Resultados documentados en campañas de Meta Ads.',
  rows: [
    ['Inversión', 'Meta Ads desde $15,000 MXN al mes, más el presupuesto publicitario. Google Ads se cotiza en el diagnóstico.'],
    ['Primeros leads', 'En Meta Ads suelen llegar entre la semana 2 y 3.'],
    ['Optimización completa', 'En Meta Ads, entre 30 y 60 días.'],
  ],
  cta: 'Solicitar auditoría',
};

export const searchMore = {
  title: 'Anuncios recomendados',
  items: [
    {
      url: 'persuasivo.com.mx › desarrollo-web',
      title: 'Una página web que convierte el tráfico que pagas',
      desc: 'Páginas en React que cargan en menos de un segundo y convierten visitas en cotizaciones por WhatsApp.',
      to: '/servicios/ecosistemas',
    },
    {
      url: 'persuasivo.com.mx › redes',
      title: 'Copywriting y redes que posicionan tu marca',
      desc: getServiceBySlug('autoridad').desc,
      to: '/servicios/autoridad',
    },
  ],
};
