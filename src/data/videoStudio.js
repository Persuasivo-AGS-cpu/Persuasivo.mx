import { waLink } from './contact.js';

export const VIDEO_WA = waLink('Hola, quiero solicitar un diagnóstico de video para mi empresa');

export const videoHero = {
  kicker: 'Persuasivo · Contenido en video',
  title: ['Videos para que tus clientes entiendan qué vendes y ', 'por qué elegirte.'],
  sub: 'Diseñamos y producimos campañas de video para empresas B2B en Monterrey. Cada mes recibes piezas listas para explicar tu producto, mostrar cómo trabaja tu empresa o posicionar a sus líderes.',
  cta: 'Solicitar diagnóstico',
  more: 'Ver cómo funciona',
  audience: 'Para fundadores, directores comerciales y responsables de marketing de fabricantes y proveedores de construcción e industria.',
};

export const videoTracks = [
  { id: 'lider', tag: 'Líder', title: 'El criterio de quien decide', color: '#E0FF31',
    text: 'Entrevistas breves donde tu director o fundador responde las preguntas que sí hace el comprador. Cada respuesta funciona como un video independiente.' },
  { id: 'marca', tag: 'Marca', title: 'La empresa por dentro', color: '#ff9b73',
    text: 'Recorrido por taller u oficinas: manos, herramientas, inspección y personas reales. Confianza sin depender de visitas ni catálogos.' },
  { id: 'producto', tag: 'Producto', title: 'Verlo en uso', color: '#8ab4ff',
    text: 'Demostraciones y anuncios de unos 20 segundos: contexto, demostración y una sola acción para cotizar.' },
];

export const videoMonths = ['Mes 1 · Dar contexto', 'Mes 2 · Resolver dudas', 'Mes 3 · Apoyar la decisión'];

// 12 piezas del ejemplo, tomadas de los textos de cada mes y asignadas a una pista.
export const videoClips = [
  { id: 'm1a', month: 0, track: 'lider', title: 'Qué revisar al elegir' },
  { id: 'm1b', month: 0, track: 'marca', title: 'Recorrido por el taller' },
  { id: 'm1c', month: 0, track: 'producto', title: 'Demostración del producto' },
  { id: 'm1d', month: 0, track: 'producto', title: 'Anuncio: qué datos enviar para cotizar' },
  { id: 'm2a', month: 1, track: 'lider', title: 'Preguntas frecuentes de especificación' },
  { id: 'm2b', month: 1, track: 'lider', title: 'Errores comunes' },
  { id: 'm2c', month: 1, track: 'marca', title: 'Qué considera el equipo antes de instalar' },
  { id: 'm2d', month: 1, track: 'producto', title: 'Demostración de un herraje' },
  { id: 'm3a', month: 2, track: 'lider', title: 'Cómo compara opciones el arquitecto' },
  { id: 'm3b', month: 2, track: 'marca', title: 'Del levantamiento a la instalación' },
  { id: 'm3c', month: 2, track: 'marca', title: 'Revisión previa a la entrega' },
  { id: 'm3d', month: 2, track: 'producto', title: 'Anuncio de la solución' },
];

export const videoExample = {
  title: 'Ejemplo: fabricante de puertas de emergencia.',
  text: 'Escenario ilustrativo con el paquete Starter: 12 piezas en tres meses para que arquitectos, especificadores y compradores industriales entiendan la solución y sepan cómo cotizar.',
};

export const videoSteps = [
  ['01', 'Diagnóstico', 'Objetivo, público, oferta prioritaria, canales y quién aprueba.'],
  ['02', 'Preproducción', 'Calendario, guiones, lista de tomas, locación y tiempos.'],
  ['03', 'Rodaje', 'Sesiones concentradas por locación y talento, con audio y respaldos verificados.'],
  ['04', 'Edición y entrega', 'Piezas finales con subtítulos, una ronda consolidada de ajustes y entrega mensual.'],
];

export const videoPlans = [
  { name: 'Starter', n: 4, text: 'Un objetivo prioritario: explicar una solución o presentar al fundador.' },
  { name: 'Brand Authority', n: 8, text: 'Dos líneas combinadas, por ejemplo criterio del líder y demostraciones comerciales.' },
  { name: 'Brand Expert', n: 12, text: 'Varias líneas y cadencia sostenida para marcas con más productos o campañas.' },
];

export const videoPlansNote = 'La inversión se define en el diagnóstico según volumen, jornadas de rodaje y edición.';

export const videoFaq = [
  ['¿Qué cuenta como un video?', 'Una pieza final con guion, montaje y formato principal acordados. Si necesitas otro encuadre, idioma o duración, la propuesta indica cuántas adaptaciones incluye.'],
  ['¿Cuánto dura el compromiso?', 'Iniciamos con tres meses para probar cómo responde tu audiencia. Si planeas con más anticipación, hay opción de seis meses con un segundo bloque de rodaje.'],
  ['¿Cuánto cuesta?', 'Depende del volumen mensual, las jornadas de rodaje y la edición. En el diagnóstico te recomendamos un volumen y recibes una propuesta con inversión y calendario.'],
  ['¿Ustedes publican los videos?', 'Entregamos las piezas listas para tu calendario. Publicación, gestión de comunidad y pauta se pueden agregar como servicio adicional.'],
];

export const videoCta = {
  title: 'Empieza con tres ideas de video para tu empresa.',
  text: 'En el diagnóstico te mostramos tres ideas ligadas a tu negocio y te recomendamos el volumen mensual que tenga sentido para tu objetivo.',
  button: 'Solicitar diagnóstico',
};
