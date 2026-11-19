# Página Contenido en video (línea de tiempo de edición) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/contenido` como un **estudio de edición de video** en modo oscuro: claqueta y "REC" en el hero, y una **línea de tiempo interactiva** donde el ejemplo de 12 piezas en 3 meses se ve como clips sobre 3 pistas (Líder, Marca, Producto) con un monitor que reproduce cada pieza. La página muestra creatividad y vende el servicio: qué se entrega cada mes, cómo se produce, paquetes y diagnóstico por WhatsApp.

**Architecture:** Mismo método que Web y Branding: texto en HTML real (SEO, accesible, responsivo) y la artesanía en CSS + Framer Motion. Los textos existentes de `ServiceContent.jsx` se mueven a `src/data/videoStudio.js` sin cambiar su contenido; solo se añade la capa visual y la clasificación de las 12 piezas del ejemplo en pistas (derivada de los textos de cada mes). La línea de tiempo tiene estado local (pieza seleccionada + reproducción automática con botón de pausa); el resto es estático.

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async. Sin dependencias ni assets nuevos (claqueta, perforaciones de película y clips se dibujan con CSS).

**Contraste deliberado:** Web = blanco y trazo; Branding = papel cálido; Video = oscuro cinematográfico con lima de marca (`#E0FF31`). Cada servicio se siente distinto y el tono de voz es el mismo.

**Decisión heredada:** el sitio NO muestra precios de video "hasta validar costos" (comentario original en `ServiceContent.jsx`). Este plan los sigue omitiendo; los paquetes se muestran por número de piezas.

**Fuera de alcance (a propósito):** reproducir videos reales (no hay assets), arrastrar clips, audio, rediseño de otras páginas.

**Riesgos a confirmar:**
- La clasificación de las 12 piezas en pistas (Líder/Marca/Producto) la hago yo a partir de los textos de cada mes; Abraham debe validarla.
- Los nombres de los paquetes y sus números (4/8/12) salen tal cual del archivo actual.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. Servidor: `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/contenido`; consola sin errores.
3. Revisar a 1280 px y a 375 px (sin scroll horizontal de la página; la línea de tiempo puede desplazarse dentro de su propio contenedor).
4. Los imports en `src/data/*.js` usan extensión `.js` (Node ESM lo necesita para `node -e`).

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/videoStudio.js` | Crear | Textos movidos + pistas, meses y 12 clips |
| `src/components/VideoStudio/videoStudio.css` | Crear | Tema oscuro, claqueta, REC, línea de tiempo, tira de película |
| `src/components/VideoStudio/VsHero.jsx` | Crear | Hero con REC, timecode y claqueta |
| `src/components/VideoStudio/VsTimeline.jsx` | Crear | Monitor + pistas + reproducción automática con pausa |
| `src/components/VideoStudio/VsProcess.jsx` | Crear | 4 pasos como fotogramas de película |
| `src/components/VideoStudio/VsPlans.jsx` | Crear | 3 paquetes con clips que cuentan las piezas |
| `src/components/VideoStudio/VsFaq.jsx` | Crear | FAQ oscuro con `<details>` |
| `src/components/VideoStudio/VsCta.jsx` | Crear | Cierre con diagnóstico por WhatsApp |
| `src/components/Views/ServiceContent.jsx` | Reescribir | Compone todo + SEO (mismo Helmet) |

---

### Task 1: Datos (`videoStudio.js`)

**Files:**
- Create: `src/data/videoStudio.js`

- [ ] **Step 1: Crear el archivo**

```js
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
  tracksTitle: 'Tres líneas de contenido, una sola campaña.',
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
```

- [ ] **Step 2: Verificar integridad de los datos**

Run:
```bash
node -e "import('./src/data/videoStudio.js').then(m=>{const ids=m.videoTracks.map(t=>t.id);const ok=m.videoClips.length===12&&m.videoClips.every(c=>ids.includes(c.track)&&c.month>=0&&c.month<3)&&ids.every(id=>m.videoClips.some(c=>c.track===id));console.log(ok, m.videoPlans.length, m.videoSteps.length, m.videoFaq.length)})"
```
Expected: `true 3 4 4`

- [ ] **Step 3: Commit**

```bash
git add src/data/videoStudio.js
git commit -m "feat(video): move page copy to data and add timeline clips"
```

---

### Task 2: CSS del estudio

**Files:**
- Create: `src/components/VideoStudio/videoStudio.css`

- [ ] **Step 1: Crear `videoStudio.css`**

```css
.vs-page {
  --vs-bg: #0b0b0c; --vs-panel: #141416; --vs-line: rgba(255, 255, 255, 0.12);
  --vs-fg: #f2f2f2; --vs-muted: #a1a1aa; --vs-lime: #E0FF31; --vs-rec: #ff3b30;
  background: var(--vs-bg); color: var(--vs-fg); min-height: 100vh; padding: 16vh 5vw 8vw; font-family: var(--font-body);
}
.vs-wrap { max-width: var(--container-max); margin: 0 auto; display: flex; flex-direction: column; gap: clamp(4rem, 8vw, 7rem); }

/* tipografía y botones */
.vs-kicker { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--vs-muted); }
.vs-h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.8rem, 7vw, 6rem); line-height: 0.98; letter-spacing: -0.02em; margin: 1rem 0; }
.vs-h1 em { color: var(--vs-lime); }
.vs-h2 { font-family: var(--font-display); font-weight: 400; font-size: clamp(2rem, 4.5vw, 3.5rem); line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 1.25rem; }
.vs-h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.8rem; line-height: 1.1; margin: 0.5rem 0; }
.vs-lead { color: var(--vs-muted); font-size: clamp(1.05rem, 1.6vw, 1.25rem); line-height: 1.6; max-width: 680px; margin: 0 0 2rem; }
.vs-p { margin: 0; color: var(--vs-muted); line-height: 1.6; }
.vs-actions { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; }
.vs-btn { display: inline-block; padding: 1.1rem 2.5rem; border-radius: var(--radius-full); background: var(--vs-lime); color: #0b0b0c; text-decoration: none; font-weight: 700; transition: transform 0.2s; }
.vs-btn:hover { transform: translateY(-2px); }
.vs-link { color: var(--vs-fg); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
.vs-btn:focus-visible, .vs-link:focus-visible, .vs-clip:focus-visible, .vs-play:focus-visible, .vs-faq summary:focus-visible, .vs-scroll:focus-visible { outline: 3px solid var(--vs-lime); outline-offset: 3px; }
.vs-small { color: var(--vs-muted); font-size: 0.9rem; margin-top: 2rem; }

/* hero: REC + claqueta */
.vs-hero { display: grid; gap: 3rem; }
@media (min-width: 900px) { .vs-hero { grid-template-columns: 1.2fr 1fr; align-items: center; } }
.vs-rec { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; letter-spacing: 0.08em; font-size: 0.85rem; margin-bottom: 1rem; }
.vs-rec i { width: 10px; height: 10px; border-radius: 50%; background: var(--vs-rec); animation: vs-blink 1.2s steps(2, jump-none) infinite; }
.vs-rec time { font-variant-numeric: tabular-nums; color: var(--vs-muted); font-weight: 500; }
@keyframes vs-blink { 0% { opacity: 1; } 100% { opacity: 0.15; } }
.vs-clap { width: min(100%, 380px); justify-self: center; transform: rotate(-3deg); }
.vs-clap-arm, .vs-clap-top { height: 34px; background: repeating-linear-gradient(135deg, #fff 0 22px, #111 22px 44px); border: 2px solid #fff; border-radius: 4px 4px 0 0; }
.vs-clap-arm { transform-origin: 0% 100%; margin-bottom: 2px; }
.vs-clap-body { background: #1b1b1d; border: 2px solid #fff; border-radius: 0 0 6px 6px; padding: 1rem 1.25rem 1.4rem; display: grid; gap: 0.6rem; }
.vs-clap-body p { margin: 0; display: flex; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--vs-line); padding-bottom: 0.45rem; font-size: 1.1rem; }
.vs-clap-body b { font-size: 0.7rem; letter-spacing: 0.12em; color: var(--vs-muted); align-self: center; }

/* línea de tiempo */
.vs-monitor { display: grid; gap: 1rem; background: var(--vs-panel); border: 1px solid var(--vs-line); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.25rem; }
@media (min-width: 760px) { .vs-monitor { grid-template-columns: 1.4fr 1fr; align-items: center; } }
.vs-screen { aspect-ratio: 16 / 9; background: #000; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: flex-end; border-left: 6px solid var(--tc); }
.vs-tag { align-self: flex-start; background: var(--tc); color: #0b0b0c; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: auto; }
.vs-clip-title { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.2rem); line-height: 1.05; margin: 0.5rem 0 0.25rem; }
.vs-clip-meta { margin: 0; color: var(--vs-muted); font-size: 0.9rem; }
.vs-play { margin-top: 1rem; min-height: 44px; padding: 0.5rem 1.2rem; border-radius: var(--radius-full); border: 1.5px solid var(--vs-fg); background: transparent; color: var(--vs-fg); font: inherit; font-weight: 600; cursor: pointer; }
.vs-scroll { overflow-x: auto; border: 1px solid var(--vs-line); border-radius: 12px; background: var(--vs-panel); }
.vs-timeline { min-width: 640px; padding: 1rem; display: grid; gap: 0.6rem; }
.vs-ruler, .vs-track { display: grid; grid-template-columns: 84px repeat(3, 1fr); gap: 0.6rem; }
.vs-ruler span { font-size: 0.75rem; color: var(--vs-muted); letter-spacing: 0.04em; border-bottom: 1px solid var(--vs-line); padding-bottom: 0.4rem; }
.vs-track-label { align-self: center; font-weight: 700; font-size: 0.85rem; }
.vs-cell { display: flex; flex-direction: column; gap: 0.4rem; min-height: 44px; }
.vs-clip { background: var(--clip); color: #0b0b0c; border: 0; border-radius: 6px; padding: 0.6rem 0.7rem; text-align: left; font: 600 0.85rem/1.2 var(--font-body); cursor: pointer; opacity: 0.5; min-height: 44px; transition: opacity 0.25s; }
.vs-clip:hover { opacity: 0.85; }
.vs-clip[aria-pressed='true'] { opacity: 1; outline: 3px solid #fff; outline-offset: 2px; }

/* tira de película */
.vs-strip { position: relative; background: #111; padding: 40px 1.25rem; border-radius: 6px; }
.vs-strip::before, .vs-strip::after { content: ''; position: absolute; left: 0; right: 0; height: 14px; background: repeating-linear-gradient(90deg, var(--vs-bg) 0 14px, transparent 14px 30px); opacity: 0.9; }
.vs-strip::before { top: 12px; } .vs-strip::after { bottom: 12px; }
.vs-frames { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
.vs-frame { background: var(--vs-panel); border: 1px solid var(--vs-line); border-radius: 4px; padding: 1.25rem; }
.vs-num { font-variant-numeric: tabular-nums; color: var(--vs-lime); font-weight: 700; letter-spacing: 0.08em; }

/* paquetes */
.vs-grid { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.vs-plan { background: var(--vs-panel); border: 1px solid var(--vs-line); border-radius: 12px; padding: 1.75rem; }
.vs-plan-n { font-size: 3rem; font-weight: 500; letter-spacing: -0.03em; margin: 0.25rem 0 0; }
.vs-plan-sub { color: var(--vs-muted); font-size: 0.9rem; margin: 0 0 1rem; }
.vs-dots { display: flex; flex-wrap: wrap; gap: 4px; margin: 0 0 1rem; }
.vs-dots i { width: 22px; height: 14px; border-radius: 2px; background: var(--vs-lime); opacity: 0.9; }

/* faq y cierre */
.vs-faq { max-width: 800px; }
.vs-faq details { border-bottom: 1px solid var(--vs-line); padding: 1.25rem 0; }
.vs-faq summary { cursor: pointer; font-weight: 600; font-size: 1.1rem; }
.vs-faq details p { color: var(--vs-muted); line-height: 1.7; margin: 0.75rem 0 0; }
.vs-cta { text-align: center; background: var(--vs-panel); border: 1px solid var(--vs-line); border-radius: 16px; padding: clamp(2rem, 6vw, 4.5rem); }
.vs-cta .vs-lead { margin-left: auto; margin-right: auto; }

@media (prefers-reduced-motion: reduce) { .vs-rec i { animation: none; } .vs-btn, .vs-clip { transition: none; } }
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/VideoStudio/videoStudio.css
git commit -m "feat(video): add dark studio styles"
```

---

### Task 3: Hero (REC + claqueta) y página montada

**Files:**
- Create: `src/components/VideoStudio/VsHero.jsx`
- Rewrite: `src/components/Views/ServiceContent.jsx`

- [ ] **Step 1: Crear `VsHero.jsx`**

```jsx
import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { videoHero, VIDEO_WA } from '../../data/videoStudio';

const pad = (n) => String(n).padStart(2, '0');

export default function VsHero() {
  const reduce = useReducedMotion();
  const [s, setS] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [reduce]);
  const [a, b] = videoHero.title;

  return (
    <section className="vs-hero">
      <div>
        <span className="vs-rec" aria-hidden="true"><i />REC <time>{pad(Math.floor(s / 60))}:{pad(s % 60)}</time></span>
        <div><span className="vs-kicker">{videoHero.kicker}</span></div>
        <h1 className="vs-h1">{a}<em>{b}</em></h1>
        <p className="vs-lead">{videoHero.sub}</p>
        <div className="vs-actions">
          <a className="vs-btn" href={VIDEO_WA} target="_blank" rel="noopener noreferrer">{videoHero.cta}</a>
          <a className="vs-link" href="#como-funciona">{videoHero.more}</a>
        </div>
        <p className="vs-small">{videoHero.audience}</p>
      </div>
      <div className="vs-clap" aria-hidden="true">
        <motion.div className="vs-clap-arm" initial={reduce ? false : { rotate: -18 }} animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 9, delay: 0.5 }} />
        <div className="vs-clap-top" style={{ borderRadius: 0, borderTop: 0 }} />
        <div className="vs-clap-body">
          <p><b>PRODUCCIÓN</b><span>Tu empresa</span></p>
          <p><b>ESCENA</b><span>Mes 1</span></p>
          <p><b>TOMA</b><span>01</span></p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Reescribir `ServiceContent.jsx` (solo hero por ahora)**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import VsHero from '../VideoStudio/VsHero';
import '../VideoStudio/videoStudio.css';

export default function ServiceContent() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: '#0b0b0c' }}>
      <Helmet>
        <title>Videos para empresas B2B en Monterrey | Persuasivo CEO Content Studio</title>
        <meta name="description" content="Diseñamos y producimos campañas de video para empresas B2B en Monterrey: explican tu producto, muestran cómo trabajas y posicionan a tus líderes." />
        <link rel="canonical" href="https://persuasivo.com.mx/contenido" />
      </Helmet>
      <main className="vs-page">
        <div className="vs-wrap">
          <VsHero />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
```

- [ ] **Step 3: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/contenido`.
Expected: fondo oscuro; punto "REC" parpadea con contador; la claqueta "golpea" una vez al cargar; un solo `<h1>`; consola limpia. El anchor "Ver cómo funciona" aún no tiene destino (se crea en Task 5).

- [ ] **Step 4: Commit**

```bash
git add src/components/VideoStudio/VsHero.jsx src/components/Views/ServiceContent.jsx
git commit -m "feat(video): dark hero with REC timecode and clapperboard"
```

---

### Task 4: Línea de tiempo interactiva

**Files:**
- Create: `src/components/VideoStudio/VsTimeline.jsx`
- Modify: `src/components/Views/ServiceContent.jsx`

- [ ] **Step 1: Crear `VsTimeline.jsx`**

```jsx
import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { videoTracks, videoMonths, videoClips, videoExample } from '../../data/videoStudio';

export default function VsTimeline() {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setSel((i) => (i + 1) % videoClips.length), 3500);
    return () => clearInterval(id);
  }, [playing]);

  const clip = videoClips[sel];
  const track = videoTracks.find((t) => t.id === clip.track);

  return (
    <section>
      <h2 className="vs-h2">{videoExample.title}</h2>
      <p className="vs-lead">{videoExample.text}</p>

      <div className="vs-monitor" style={{ '--tc': track.color }}>
        <div className="vs-screen" aria-live={playing ? 'off' : 'polite'}>
          <span className="vs-tag">{track.tag}</span>
          <p className="vs-clip-title">{clip.title}</p>
          <p className="vs-clip-meta">{videoMonths[clip.month]} · pieza {sel + 1} de {videoClips.length}</p>
        </div>
        <div>
          <h3 className="vs-h3">{track.title}</h3>
          <p className="vs-p">{track.text}</p>
          <button type="button" className="vs-play" onClick={() => setPlaying((p) => !p)}>
            {playing ? 'Pausar ejemplo' : 'Reproducir ejemplo'}
          </button>
        </div>
      </div>

      <div className="vs-scroll" role="region" aria-label="Línea de tiempo del ejemplo (desplazable)" tabIndex={0}>
        <div className="vs-timeline" role="group" aria-label="Elige una pieza para verla en el monitor">
          <div className="vs-ruler"><span />{videoMonths.map((m) => <span key={m}>{m}</span>)}</div>
          {videoTracks.map((t) => (
            <div className="vs-track" key={t.id}>
              <span className="vs-track-label" style={{ color: t.color }}>{t.tag}</span>
              {videoMonths.map((m, mi) => (
                <div className="vs-cell" key={m}>
                  {videoClips.map((c, i) => (c.track === t.id && c.month === mi ? (
                    <button key={c.id} type="button" className="vs-clip" style={{ '--clip': t.color }}
                      aria-pressed={i === sel} onClick={() => { setPlaying(false); setSel(i); }}>
                      {c.title}
                    </button>
                  ) : null))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Montarlo**

En `ServiceContent.jsx`: `import VsTimeline from '../VideoStudio/VsTimeline';` y, dentro de `.vs-wrap`, después de `<VsHero />`: `<VsTimeline />`.

- [ ] **Step 3: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador:
- El monitor cambia de pieza cada ~3.5 s y el color de la pista cambia con ella.
- Clic en un clip: detiene la reproducción, el monitor muestra esa pieza y el clip queda resaltado (`aria-pressed="true"`).
- "Reproducir ejemplo" la reanuda. A 375 px la línea de tiempo se desplaza horizontalmente dentro de su caja (la página no).

- [ ] **Step 4: Commit**

```bash
git add src/components/VideoStudio/VsTimeline.jsx src/components/Views/ServiceContent.jsx
git commit -m "feat(video): add interactive editing timeline with monitor"
```

---

### Task 5: Proceso (película) + Paquetes

**Files:**
- Create: `src/components/VideoStudio/VsProcess.jsx`
- Create: `src/components/VideoStudio/VsPlans.jsx`
- Modify: `src/components/Views/ServiceContent.jsx`

- [ ] **Step 1: Crear `VsProcess.jsx`**

```jsx
import React from 'react';
import { videoSteps } from '../../data/videoStudio';

export default function VsProcess() {
  return (
    <section id="como-funciona">
      <h2 className="vs-h2">Del diagnóstico a la entrega mensual.</h2>
      <div className="vs-strip">
        <div className="vs-frames">
          {videoSteps.map(([n, t, d]) => (
            <div className="vs-frame" key={n}>
              <span className="vs-num">{n}</span>
              <h3 className="vs-h3">{t}</h3>
              <p className="vs-p">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear `VsPlans.jsx`**

```jsx
import React from 'react';
import { videoPlans, videoPlansNote } from '../../data/videoStudio';

export default function VsPlans() {
  return (
    <section>
      <h2 className="vs-h2">Igualas mensuales de video terminado.</h2>
      <div className="vs-grid">
        {videoPlans.map((p) => (
          <div className="vs-plan" key={p.name}>
            <h3 className="vs-h3">{p.name}</h3>
            <p className="vs-plan-n">{p.n}</p>
            <p className="vs-plan-sub">videos al mes · compromiso inicial de 3 meses</p>
            <div className="vs-dots" aria-hidden="true">{Array.from({ length: p.n }, (_, i) => <i key={i} />)}</div>
            <p className="vs-p">{p.text}</p>
          </div>
        ))}
      </div>
      <p className="vs-small">{videoPlansNote}</p>
    </section>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceContent.jsx` importar `VsProcess` y `VsPlans` y agregar, después de `<VsTimeline />`:

```jsx
          <VsProcess />
          <VsPlans />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: tira de película con perforaciones arriba y abajo y 4 fotogramas; 3 paquetes con 4, 8 y 12 clips lima; "Ver cómo funciona" del hero baja a la tira; no aparece ningún precio.

- [ ] **Step 5: Commit**

```bash
git add src/components/VideoStudio/VsProcess.jsx src/components/VideoStudio/VsPlans.jsx src/components/Views/ServiceContent.jsx
git commit -m "feat(video): add film-strip process and plan cards"
```

---

### Task 6: FAQ + Cierre

**Files:**
- Create: `src/components/VideoStudio/VsFaq.jsx`
- Create: `src/components/VideoStudio/VsCta.jsx`
- Modify: `src/components/Views/ServiceContent.jsx`

- [ ] **Step 1: Crear `VsFaq.jsx`**

```jsx
import React from 'react';
import { videoFaq } from '../../data/videoStudio';

export default function VsFaq() {
  return (
    <section className="vs-faq">
      <h2 className="vs-h2">Preguntas frecuentes</h2>
      {videoFaq.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Crear `VsCta.jsx`**

```jsx
import React from 'react';
import { videoCta, VIDEO_WA } from '../../data/videoStudio';

export default function VsCta() {
  return (
    <section className="vs-cta">
      <h2 className="vs-h2">{videoCta.title}</h2>
      <p className="vs-lead">{videoCta.text}</p>
      <a className="vs-btn" href={VIDEO_WA} target="_blank" rel="noopener noreferrer">{videoCta.button}</a>
    </section>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceContent.jsx` importar `VsFaq` y `VsCta` y agregar, después de `<VsPlans />`:

```jsx
          <VsFaq />
          <VsCta />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 4 preguntas que abren/cierran con teclado; cierre con botón lima a WhatsApp.

- [ ] **Step 5: Commit**

```bash
git add src/components/VideoStudio/VsFaq.jsx src/components/VideoStudio/VsCta.jsx src/components/Views/ServiceContent.jsx
git commit -m "feat(video): add FAQ and closing CTA, page complete"
```

---

### Task 7: Pulido y verificación final

**Files:**
- Modify: `src/components/VideoStudio/videoStudio.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: la claqueta no tapa el texto del hero; el monitor y la línea de tiempo caben sin recortar títulos de clips; el color de la pista seleccionada se refleja en la barra lateral y la etiqueta del monitor.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth` (el desplazamiento horizontal ocurre solo dentro de `.vs-scroll`); botones y clips ≥44 px de alto; las perforaciones de la tira no desbordan; el texto del hero es legible.

- [ ] **Step 3: Movimiento reducido y teclado**

Con "reducir movimiento": REC no parpadea ni cuenta, la claqueta aparece cerrada, la reproducción del ejemplo empieza en pausa. Con Tab: foco lima visible en botones, clips, región desplazable y preguntas; Enter/Espacio seleccionan clips y abren preguntas.

- [ ] **Step 4: Build limpio y regresiones**

Run: `npm run build`
Expected: `✓ built in`. Consola sin errores. La home sigue enlazando a `/contenido`; `/servicios/branding` y `/servicios/ecosistemas` sin cambios.

- [ ] **Step 5: ¿Vende?**

Sin guía: ¿se entiende qué se entrega al mes (el ejemplo de 12 piezas), cómo se produce y cómo pedir el diagnóstico? Dos botones de diagnóstico (hero y cierre) a WhatsApp. Si falta claridad, ajustar copy en `src/data/videoStudio.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(video): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura:** estudio oscuro con claqueta y REC (Tasks 2–3), línea de tiempo interactiva que enseña el servicio con el ejemplo existente de 12 piezas (Task 4), proceso y paquetes sin precios (Task 5), FAQ y cierre (Task 6), SEO igual que antes (mismo Helmet y canonical, un solo `<h1>`), contenido existente conservado en datos (Task 1), accesibilidad y móvil (Task 7).
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `videoHero`, `videoTracks`, `videoMonths`, `videoClips`, `videoExample`, `videoSteps`, `videoPlans`, `videoPlansNote`, `videoFaq`, `videoCta`, `VIDEO_WA` (Task 1) se usan igual en Tasks 3–6; clases `.vs-*` definidas en Task 2 antes de usarse; `--tc` y `--clip` son variables inline que lee el CSS.
- **Riesgos conocidos:** el `aria-live` del monitor está apagado mientras reproduce (evita ruido de lectores) y se activa al pausar; la reproducción automática tiene botón de pausa y arranca pausada con movimiento reducido (WCAG 2.2.2).
