import { waLink } from './contact.js';

export const BRAND_WA = waLink('Hola, me interesa branding para mi empresa');

export const brandHero = {
  kicker: 'Persuasivo · Branding',
  title: ['Una marca que se recuerda y ', 'se elige.'],
  sub: 'Identidad, posicionamiento y narrativa para que tu empresa cuente quién es con claridad y se distinga de su competencia.',
  cta: 'Solicitar diagnóstico',
  presetsLabel: 'Prueba una paleta y una voz:',
};

// Cada preset cambia colores y tipografía del tablero de ejemplo (no del sitio).
export const brandPresets = [
  { id: 'editorial', name: 'Editorial', display: "'Instrument Serif', serif", weight: 400,
    colors: ['#16213e', '#52606d', '#e0b84c', '#f4efe6', '#ffffff'] },
  { id: 'directa', name: 'Directa', display: "'DM Sans', sans-serif", weight: 800,
    colors: ['#111111', '#4b5563', '#e0ff31', '#f2f2f2', '#ffffff'] },
  { id: 'cercana', name: 'Cercana', display: "'Caveat', cursive", weight: 700,
    colors: ['#3a1d12', '#a8452a', '#f0a07c', '#fbeee3', '#ffffff'] },
];

export const brandIncluded = [
  { id: 'diag', title: 'Diagnóstico y posicionamiento', text: 'Quién eres, a quién le hablas y qué te diferencia de la competencia.', rotate: -1.5 },
  { id: 'narr', title: 'Narrativa de marca', text: 'Manifiesto, historia y mensajes clave para contar quién eres con claridad.', rotate: 1.2 },
  { id: 'logo', title: 'Logotipo y sistema visual', text: 'Logo, paleta, tipografía y reglas de uso que se reconocen en cualquier lugar.', rotate: -1 },
  { id: 'voz', title: 'Voz y tono', text: 'Cómo habla tu marca en redes, web, propuestas y ventas.', rotate: 1.6 },
  { id: 'manual', title: 'Manual de identidad', text: 'Una guía para que tu equipo y tus proveedores mantengan la marca coherente.', rotate: -1.4 },
  { id: 'apps', title: 'Aplicaciones', text: 'Papelería, redes sociales, presentaciones y web con la nueva identidad.', rotate: 1 },
];

export const brandSteps = [
  ['01', 'Descubrimiento', 'Entendemos tu negocio, tu mercado y a tus clientes.'],
  ['02', 'Estrategia', 'Definimos posicionamiento, narrativa y personalidad de marca.'],
  ['03', 'Identidad', 'Diseñamos el sistema visual y verbal.'],
  ['04', 'Entrega', 'Manual, archivos y aplicaciones listos para usar.'],
];

export const brandFaq = [
  ['¿Qué incluye un proyecto de branding?', 'Depende del punto de partida: desde cero, un rediseño o solo posicionamiento y narrativa. En el diagnóstico definimos los entregables exactos.'],
  ['¿Cuánto cuesta y cuánto tarda?', 'Varía según el alcance. Después del diagnóstico recibes una propuesta con inversión y calendario.'],
  ['¿Pueden rediseñar una marca que ya existe?', 'Sí. Evaluamos qué conservar y qué cambiar para no perder el reconocimiento que ya tienes.'],
  ['¿Necesito también un sitio web?', 'No es obligatorio, pero la identidad rinde más cuando se aplica en un sitio y en redes. Podemos hacerlo todo en un solo proyecto.'],
];

export const brandCaseSlugs = ['manifiesto-marca', 'arquitectura-visual'];

export const brandCta = {
  title: 'Cuéntanos qué marca quieres construir.',
  text: 'En el diagnóstico revisamos dónde está tu marca hoy y te proponemos el camino más corto para que se vea y suene como la empresa que eres.',
  button: 'Solicitar diagnóstico',
};
