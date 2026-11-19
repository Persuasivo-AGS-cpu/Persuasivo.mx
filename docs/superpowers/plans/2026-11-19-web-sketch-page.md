# Página Web (wireframe dibujado a mano) + rename "Contenido en video" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir `/servicios/ecosistemas` en un boceto de landing "dibujado a mano" sobre lienzo blanco que, al mismo tiempo, muestra la creatividad de Persuasivo y **vende** el servicio de páginas web (hero, prueba, beneficios, proceso, precios, FAQ y cierre con WhatsApp). Además renombrar "Contenido" → "Contenido en video".

**Architecture:** El texto es HTML real (SEO, accesible, responsivo). Lo "dibujado" son los bordes: un componente `SketchBox` mide su caja y dibuja encima un `<svg>` con trazos temblorosos generados por una función pura y determinista (`sketchPath.js`), animados con `pathLength` al entrar en pantalla. Cada bloque del wireframe va en una `WfRow` con una nota manuscrita en rojo (`SketchNote`) que explica **por qué ese bloque convierte**: así el visitante ve el servicio y entiende el método a la vez. En móvil las notas pasan debajo del bloque.

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async. Fuentes: Caveat (notas/títulos) y Patrick Hand (cuerpo). Sin dependencias nuevas (no `roughjs`: ~60 líneas propias bastan). Sin framework de pruebas: la lógica de trazos tiene un auto-chequeo con `node:assert`; el resto se verifica con `npm run build` + navegador.

**Decisión sobre Astryx:** esta página NO usa Astryx. Es un lienzo ilustrado a medida y el sitio actual usa estilos propios; además Astryx pide no usar `<div>` ni CSS importado, lo que choca con un diseño de bocetos. Astryx queda instalado para páginas nuevas "de producto" más adelante. (Los CSS base de Astryx tampoco están importados aún.)

**Alcance de este plan:** solo (a) rename de Contenido y (b) página Web. Branding, Contenido en video, Redes y Ads van **cada una en su propio plan**, para diseñarlas una por una (ver "Siguientes páginas" al final).

**Fuera de alcance (a propósito):** interruptor "boceto ↔ terminado", rediseño de `ServiceEcosystems` en otros idiomas, SSR/prerender (el sitio es SPA; el límite de SEO ya existe).

**Riesgo a confirmar antes de publicar:** las cifras (`+215%`, `<1s`, `100%`, "desde $35,000 / $75,000", plazos) salen de `src/data/servicesData.js`. Se reutilizan tal cual; Abraham debe confirmar que siguen vigentes.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `npm run check:sketch` imprime `sketchPath ok` (desde la Task 2).
3. `npm run dev -- --port 5180`, abrir `http://localhost:5180/servicios/ecosistemas`; consola sin errores.
4. Revisar a 1280 px y a 375 px de ancho.

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/homeServices.js` | Modificar | Rename "Contenido en video" |
| `src/data/servicesData.js` | Modificar | Título del servicio de video |
| `src/components/Views/ServiceContent.jsx` | Modificar | Kicker de la página |
| `src/index.css` | Modificar | Importar Caveat y Patrick Hand |
| `package.json` | Modificar | Script `check:sketch` |
| `scripts/check-sketch.mjs` | Crear | Auto-chequeo de `sketchPath` |
| `src/components/Sketch/sketchPath.js` | Crear | Trazos temblorosos puros y deterministas |
| `src/components/Sketch/SketchBox.jsx` | Crear | Caja con borde dibujado y animado |
| `src/components/Sketch/SketchButton.jsx` | Crear | Botón-óvalo con relleno marcador, link a WhatsApp |
| `src/components/Sketch/SketchNote.jsx` | Crear | Nota manuscrita roja con flecha |
| `src/components/WebSketch/webSketch.css` | Crear | Lienzo, filas, tipografía manuscrita, responsivo |
| `src/components/WebSketch/WfRow.jsx` | Crear | Fila: bloque + nota lateral |
| `src/data/webSketch.js` | Crear | Todo el copy de la página |
| `src/components/WebSketch/WfHeader.jsx` … `WfFinalCta.jsx` | Crear | Un archivo por sección |
| `src/components/Views/ServiceEcosystems.jsx` | Reescribir | Compone el boceto + SEO |

---

### Task 1: Rename "Contenido" → "Contenido en video"

**Files:**
- Modify: `src/data/homeServices.js:13`
- Modify: `src/data/servicesData.js` (servicio `contenido`, campo `title`)
- Modify: `src/components/Views/ServiceContent.jsx` (kicker)

- [ ] **Step 1: Cambiar el nombre en la home**

En `src/data/homeServices.js` cambiar:

```js
    word: 'Contenido',
```
por
```js
    word: 'Contenido en video',
```

- [ ] **Step 2: Cambiar el título del servicio**

En `src/data/servicesData.js`, dentro del objeto `id: 'contenido'`, cambiar `title: 'Video para Empresas',` por:

```js
    title: 'Contenido en video',
```

- [ ] **Step 3: Cambiar el kicker de la página**

Run: `grep -n "Persuasivo ·" src/components/Views/ServiceContent.jsx`
Expected: una línea con el kicker del hero. Reemplazar su texto por `Persuasivo · Contenido en video`.

- [ ] **Step 4: Verificar que la palabra larga no rompa la lista de la home**

Run: `npm run dev -- --port 5180`, abrir `http://localhost:5180/` a 1280 px y a 375 px.
Expected: la fila "Contenido en video" se ve completa (a 375 px puede ir en dos líneas; no debe desbordar horizontalmente).

- [ ] **Step 5: Commit**

```bash
git add src/data/homeServices.js src/data/servicesData.js src/components/Views/ServiceContent.jsx
git commit -m "feat(content): rename Contenido to Contenido en video"
```

---

### Task 2: Trazos dibujados a mano (`sketchPath.js`) con auto-chequeo

**Files:**
- Create: `scripts/check-sketch.mjs`
- Create: `src/components/Sketch/sketchPath.js`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Escribir el auto-chequeo (falla porque el módulo no existe)**

Crear `scripts/check-sketch.mjs`:

```js
import assert from 'node:assert/strict';
import { rng, sketchRect, sketchLine, sketchCross, sketchEllipse } from '../src/components/Sketch/sketchPath.js';

// determinista
assert.equal(rng(7)(), rng(7)());
assert.notEqual(rng(7)(), rng(8)());
const r = rng(1);
for (let i = 0; i < 1000; i++) { const v = r(); assert.ok(v >= 0 && v < 1); }

// rect: misma semilla = mismo trazo; distinta semilla = otro trazo
assert.equal(sketchRect(100, 50, 3), sketchRect(100, 50, 3));
assert.notEqual(sketchRect(100, 50, 3), sketchRect(100, 50, 4));
// 4 lados por pasada
assert.equal(sketchRect(100, 50, 3, { passes: 2 }).match(/M/g).length, 8);
assert.equal(sketchRect(100, 50, 3, { passes: 1 }).match(/M/g).length, 4);
assert.equal(sketchCross(100, 50, 3).match(/M/g).length, 2);

// path válido
for (const d of [sketchRect(100, 50, 1), sketchLine(0, 0, 10, 10, 1), sketchCross(10, 10, 1), sketchEllipse(80, 40, 1)]) {
  assert.ok(d.startsWith('M'));
  assert.ok(!d.includes('NaN'));
}
console.log('sketchPath ok');
```

- [ ] **Step 2: Agregar el script y ver que falla**

En `package.json`, dentro de `"scripts"`, agregar `"check:sketch": "node scripts/check-sketch.mjs"` (coma en la línea anterior).

Run: `npm run check:sketch`
Expected: FAIL con `ERR_MODULE_NOT_FOUND` (aún no existe `sketchPath.js`).

- [ ] **Step 3: Implementar `sketchPath.js`**

Crear `src/components/Sketch/sketchPath.js`:

```js
const f = (n) => n.toFixed(1);

// Generador pseudoaleatorio con semilla (mulberry32): mismo seed = mismo dibujo en cada render.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Un trazo "de pluma": curva cuadrática con extremos y centro desplazados al azar.
function stroke(r, x1, y1, x2, y2, wobble) {
  const j = () => (r() - 0.5) * wobble;
  const cx = (x1 + x2) / 2 + j() * 2;
  const cy = (y1 + y2) / 2 + j() * 2;
  return `M${f(x1 + j())} ${f(y1 + j())}Q${f(cx)} ${f(cy)} ${f(x2 + j())} ${f(y2 + j())}`;
}

export function sketchRect(w, h, seed, { passes = 2, wobble = 2.2 } = {}) {
  const r = rng(seed);
  let d = '';
  for (let p = 0; p < passes; p++) {
    d += stroke(r, 0, 0, w, 0, wobble) + stroke(r, w, 0, w, h, wobble)
      + stroke(r, w, h, 0, h, wobble) + stroke(r, 0, h, 0, 0, wobble);
  }
  return d;
}

export function sketchLine(x1, y1, x2, y2, seed, wobble = 2) {
  return stroke(rng(seed), x1, y1, x2, y2, wobble);
}

export function sketchCross(w, h, seed) {
  const r = rng(seed);
  return stroke(r, 0, 0, w, h, 3) + stroke(r, w, 0, 0, h, 3);
}

// Óvalo dibujado de un trazo, que pasa de largo el punto de inicio (8%) como al hacerlo a mano.
export function sketchEllipse(w, h, seed, wobble = 3) {
  const r = rng(seed);
  const n = 12;
  const total = Math.ceil(n * 1.08);
  const pts = [];
  for (let i = 0; i <= total; i++) {
    const t = (i / n) * Math.PI * 2 - Math.PI / 2;
    pts.push([
      w / 2 + (w / 2) * Math.cos(t) + (r() - 0.5) * wobble,
      h / 2 + (h / 2) * Math.sin(t) + (r() - 0.5) * wobble,
    ]);
  }
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += `Q${f(x)} ${f(y)} ${f((x + nx) / 2)} ${f((y + ny) / 2)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return d + `L${f(lx)} ${f(ly)}`;
}
```

- [ ] **Step 4: Ver que pasa**

Run: `npm run check:sketch`
Expected: `sketchPath ok`

- [ ] **Step 5: Commit**

```bash
git add scripts/check-sketch.mjs src/components/Sketch/sketchPath.js package.json
git commit -m "feat(sketch): add deterministic hand-drawn path generators"
```

---

### Task 3: Fuentes + `SketchBox` + `SketchButton`

**Files:**
- Modify: `src/index.css:1`
- Create: `src/components/Sketch/SketchBox.jsx`
- Create: `src/components/Sketch/SketchButton.jsx`

- [ ] **Step 1: Cargar las fuentes manuscritas**

En `src/index.css`, en la primera línea (`@import url('https://fonts.googleapis.com/css2?family=DM+Sans...`), insertar antes de `&display=swap` estas dos familias:

```
&family=Caveat:wght@500;700&family=Patrick+Hand
```

- [ ] **Step 2: Crear `SketchBox.jsx`**

```jsx
import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sketchRect, sketchEllipse, sketchCross } from './sketchPath';

// Caja cuyo borde se "dibuja" al entrar en pantalla. El contenido sigue siendo HTML normal.
export default function SketchBox({
  as: Tag = 'div', kind = 'rect', seed = 1, passes = 2, cross = false,
  stroke = '#1b1b1b', strokeWidth = 2.2, fill = 'none', style, children, ...rest
}) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const d = w && h ? (kind === 'ellipse' ? sketchEllipse(w, h, seed) : sketchRect(w, h, seed, { passes })) : '';
  const draw = {
    initial: reduce ? false : { pathLength: 0, fillOpacity: 0 },
    whileInView: { pathLength: 1, fillOpacity: 1 },
    viewport: { once: true, margin: '-8% 0px' },
    transition: { duration: 0.9, ease: 'easeInOut' },
  };

  return (
    <Tag ref={ref} style={{ position: 'relative', isolation: 'isolate', ...style }} {...rest}>
      {d && (
        <svg aria-hidden="true" width={w} height={h}
          style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'visible', pointerEvents: 'none' }}>
          <motion.path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth}
            strokeLinecap="round" strokeLinejoin="round" {...draw} />
          {cross && (
            <motion.path d={sketchCross(w, h, seed + 1)} fill="none" stroke={stroke}
              strokeWidth={1.4} strokeLinecap="round" opacity={0.55} {...draw} />
          )}
        </svg>
      )}
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Crear `SketchButton.jsx`**

```jsx
import React from 'react';
import SketchBox from './SketchBox';

// Botón-óvalo con relleno de marcador. Siempre es un link (a WhatsApp o a una ruta externa).
export default function SketchButton({ href, children, seed = 5, large = false }) {
  return (
    <SketchBox as="a" kind="ellipse" seed={seed} fill="#E0FF31" passes={1}
      href={href} target="_blank" rel="noopener noreferrer"
      className={`sk-btn${large ? ' sk-btn--lg' : ''}`}>
      {children}
    </SketchBox>
  );
}
```

- [ ] **Step 4: Verificar compilación**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/Sketch/SketchBox.jsx src/components/Sketch/SketchButton.jsx
git commit -m "feat(sketch): add SketchBox and SketchButton with animated hand-drawn borders"
```

---

### Task 4: Notas manuscritas, filas y CSS del lienzo

**Files:**
- Create: `src/components/Sketch/SketchNote.jsx`
- Create: `src/components/WebSketch/WfRow.jsx`
- Create: `src/components/WebSketch/webSketch.css`

- [ ] **Step 1: Crear `SketchNote.jsx`**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Nota roja a mano con flecha hacia el bloque. side = de qué lado del bloque está la nota.
export default function SketchNote({ side = 'right', rotate = -3, children }) {
  const reduce = useReducedMotion();
  return (
    <aside className={`sk-note sk-note--${side}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <p className="sk-note-text">{children}</p>
      <svg className={`sk-note-arrow sk-note-arrow--${side}`} width="90" height="44" viewBox="0 0 90 44" aria-hidden="true">
        <motion.path d="M4 8C28 -4 62 4 82 30M82 30l-13-2M82 30l-3-13" fill="none" stroke="#d6303c"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.7, delay: 0.5 }} />
      </svg>
    </aside>
  );
}
```

- [ ] **Step 2: Crear `WfRow.jsx`**

```jsx
import React from 'react';
import SketchNote from '../Sketch/SketchNote';

// Una fila del wireframe: el bloque (centro) y su nota explicativa (lateral en escritorio, debajo en móvil).
export default function WfRow({ note, children }) {
  return (
    <section className="sk-row">
      <div className="sk-block">{children}</div>
      {note && <SketchNote side={note.side} rotate={note.rotate}>{note.text}</SketchNote>}
    </section>
  );
}
```

- [ ] **Step 3: Crear `webSketch.css`**

```css
.sk-page {
  --ink: #1b1b1b; --pen: #d6303c; --hi: #E0FF31;
  background: #fff; color: var(--ink); min-height: 100vh;
  padding: 16vh 5vw 8vw; font-family: 'Patrick Hand', cursive; font-size: 1.2rem; line-height: 1.45;
}
.sk-canvas { max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(2.5rem, 5vw, 4.5rem); }
.sk-kicker { font-family: 'Caveat', cursive; font-weight: 700; font-size: 1.6rem; color: var(--pen); text-align: center; margin: 0 auto 1rem; max-width: 40ch; }

/* tipografía manuscrita */
.sk-h1, .sk-h2, .sk-h3, .sk-logo, .sk-price, .sk-num { font-family: 'Caveat', cursive; font-weight: 700; line-height: 1; margin: 0; }
.sk-h1 { font-size: clamp(2.6rem, 6vw, 4.6rem); margin-bottom: 1rem; }
.sk-h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1.25rem; }
.sk-h3 { font-size: 1.7rem; margin: 0.5rem 0 0.25rem; }
.sk-body { margin: 0 0 1.25rem; max-width: 46ch; }
.sk-mark { background: linear-gradient(transparent 55%, var(--hi) 55%, var(--hi) 92%, transparent 92%); padding: 0 0.15em; }
.sk-logo { font-size: 1.9rem; }
.sk-link { color: var(--ink); text-decoration: underline wavy var(--pen); text-underline-offset: 6px; }

/* fila = bloque + nota */
.sk-row { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.75rem; }
.sk-note { font-family: 'Caveat', cursive; font-weight: 700; font-size: 1.4rem; line-height: 1.05; color: var(--pen); max-width: 26ch; }
.sk-note-text { margin: 0; }
.sk-note::before { content: '↑ '; }
.sk-note-arrow { display: none; }
@media (min-width: 1000px) {
  .sk-row { grid-template-columns: minmax(150px, 1fr) minmax(0, 780px) minmax(150px, 1fr); align-items: start; }
  .sk-block { grid-column: 2; grid-row: 1; }
  .sk-note { grid-row: 1; padding-top: 2rem; }
  .sk-note::before { content: none; }
  .sk-note--left { grid-column: 1; justify-self: end; text-align: right; }
  .sk-note--right { grid-column: 3; justify-self: start; }
  .sk-note-arrow { display: block; margin-top: 0.4rem; }
  .sk-note-arrow--left { margin-left: auto; transform: scaleY(-1); }
  .sk-note-arrow--right { transform: scale(-1, -1); }
}

/* bloques */
.sk-block > div, .sk-block > a { box-sizing: border-box; }
.sk-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.9rem 1.25rem; }
.sk-nav { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.sk-pad { padding: clamp(1.25rem, 3vw, 2.25rem); }
.sk-hero { display: grid; gap: 1.5rem; }
@media (min-width: 760px) { .sk-hero { grid-template-columns: 1.2fr 1fr; align-items: center; } }
.sk-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; }
.sk-imgph { min-height: 200px; display: grid; place-items: end center; padding: 1rem; }
.sk-caption { font-family: 'Caveat', cursive; font-size: 1.4rem; color: #555; }
.sk-stats { display: flex; flex-wrap: wrap; gap: 0.5rem 2rem; list-style: none; padding: 1.25rem 0 0; margin: 0; }
.sk-stats strong { font-family: 'Caveat', cursive; font-size: 2.1rem; margin-right: 0.35rem; }
.sk-grid3 { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
.sk-card-link { color: inherit; text-decoration: none; display: block; }
.sk-thumb { width: 100%; height: 150px; object-fit: cover; filter: grayscale(1) contrast(1.1); mix-blend-mode: multiply; transition: filter 0.4s; }
.sk-card-link:hover .sk-thumb { filter: none; mix-blend-mode: normal; }
.sk-metric { margin: 0; font-family: 'Caveat', cursive; font-size: 1.5rem; color: var(--pen); }
.sk-num { display: inline-grid; place-items: center; width: 3rem; height: 3rem; font-size: 1.9rem; margin-bottom: 0.5rem; }
.sk-steps { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); }
.sk-price { font-size: 2.4rem; }
.sk-list { padding-left: 1.2rem; margin: 0.75rem 0 1.25rem; }
.sk-faq { padding: 0.9rem 1.25rem; }
.sk-faq summary { font-family: 'Caveat', cursive; font-size: 1.6rem; font-weight: 700; cursor: pointer; }
.sk-faq p { margin: 0.5rem 0 0; }

/* botón */
.sk-btn { display: inline-block; padding: 0.7rem 1.9rem; color: var(--ink); text-decoration: none; font-family: 'Caveat', cursive; font-weight: 700; font-size: 1.6rem; transition: transform 0.2s; }
.sk-btn:hover { transform: rotate(-2deg) scale(1.04); }
.sk-btn--lg { font-size: 2.1rem; padding: 1rem 2.8rem; }
.sk-btn:focus-visible, .sk-link:focus-visible, .sk-faq summary:focus-visible { outline: 3px solid var(--pen); outline-offset: 4px; }

@media (prefers-reduced-motion: reduce) { .sk-btn, .sk-thumb { transition: none; } }
```

- [ ] **Step 4: Verificar compilación**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 5: Commit**

```bash
git add src/components/Sketch/SketchNote.jsx src/components/WebSketch/WfRow.jsx src/components/WebSketch/webSketch.css
git commit -m "feat(web-sketch): add handwritten notes, row layout and canvas styles"
```

---

### Task 5: Copy de la página (`webSketch.js`)

**Files:**
- Create: `src/data/webSketch.js`

- [ ] **Step 1: Crear el archivo de datos**

```js
import { waLink } from './contact';
import { getServiceBySlug } from './servicesData';

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
```

- [ ] **Step 2: Verificar que los datos existen**

Run: `node -e "import('./src/data/webSketch.js').then(m=>console.log(m.webHero.stats.length, m.webFaq.length))"`
Expected: `3 3`

- [ ] **Step 3: Commit**

```bash
git add src/data/webSketch.js
git commit -m "feat(web-sketch): add page copy data"
```

---

### Task 6: Header + Hero y página montada (primer resultado visible)

**Files:**
- Create: `src/components/WebSketch/WfHeader.jsx`
- Create: `src/components/WebSketch/WfHero.jsx`
- Rewrite: `src/components/Views/ServiceEcosystems.jsx`

- [ ] **Step 1: Crear `WfHeader.jsx`**

```jsx
import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webNotes, WEB_WA } from '../../data/webSketch';

export default function WfHeader() {
  return (
    <WfRow note={webNotes.header}>
      <SketchBox seed={11} className="sk-bar">
        <span className="sk-logo">tuempresa</span>
        <div className="sk-nav" aria-hidden="true"><span>Servicios</span><span>Casos</span><span>Contacto</span></div>
        <SketchButton href={WEB_WA} seed={12}>Cotizar</SketchButton>
      </SketchBox>
    </WfRow>
  );
}
```

- [ ] **Step 2: Crear `WfHero.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webHero, webNotes, WEB_WA } from '../../data/webSketch';

export default function WfHero() {
  const [a, mark, b] = webHero.title;
  return (
    <WfRow note={webNotes.hero}>
      <SketchBox seed={21} className="sk-pad">
        <div className="sk-hero">
          <div>
            <h1 className="sk-h1">{a}<span className="sk-mark">{mark}</span>{b}</h1>
            <p className="sk-body">{webHero.sub}</p>
            <div className="sk-actions">
              <SketchButton href={WEB_WA} seed={22} large>{webHero.cta}</SketchButton>
              <Link to="/work" className="sk-link">Ver casos →</Link>
            </div>
          </div>
          <SketchBox seed={23} cross className="sk-imgph"><span className="sk-caption">aquí va tu producto</span></SketchBox>
        </div>
        <ul className="sk-stats">
          {webHero.stats.map((s) => (<li key={s.label}><strong>{s.value}</strong>{s.label}</li>))}
        </ul>
      </SketchBox>
    </WfRow>
  );
}
```

- [ ] **Step 3: Reescribir `ServiceEcosystems.jsx` con las dos secciones**

Reemplazar todo el archivo por:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import WfHeader from '../WebSketch/WfHeader';
import WfHero from '../WebSketch/WfHero';
import { webKicker } from '../../data/webSketch';
import '../WebSketch/webSketch.css';

export default function ServiceEcosystems({ setView }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
      <Helmet>
        <title>Desarrollo web en Monterrey: páginas que venden | Persuasivo</title>
        <meta name="description" content="Sitios y landing pages en React que cargan en menos de 1 segundo y convierten visitas en cotizaciones. Desde $35,000 MXN. Cotiza por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/ecosistemas" />
      </Helmet>
      <main className="sk-page">
        <p className="sk-kicker">{webKicker}</p>
        <div className="sk-canvas">
          <WfHeader />
          <WfHero />
        </div>
      </main>
      <Footer setView={setView} />
    </motion.div>
  );
}
```

- [ ] **Step 4: Verificar en el navegador**

Run: `npm run build` → `✓ built in`. Luego `npm run dev -- --port 5180` y abrir `/servicios/ecosistemas`.
Expected: lienzo blanco; los bordes del header y del hero se dibujan al cargar; nota roja a cada lado en escritorio (≥1000 px) y debajo del bloque en 375 px; un solo `<h1>`; consola sin errores (confirma que framer-motion 11 funciona con React 19).

- [ ] **Step 5: Commit**

```bash
git add src/components/WebSketch/WfHeader.jsx src/components/WebSketch/WfHero.jsx src/components/Views/ServiceEcosystems.jsx
git commit -m "feat(web-sketch): hand-drawn header and hero on /servicios/ecosistemas"
```

---

### Task 7: Prueba social + Beneficios

**Files:**
- Create: `src/components/WebSketch/WfProof.jsx`
- Create: `src/components/WebSketch/WfBenefits.jsx`
- Modify: `src/components/Views/ServiceEcosystems.jsx`

- [ ] **Step 1: Crear `WfProof.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { getProjectsByCategory } from '../../data/caseStudiesData';
import { webNotes } from '../../data/webSketch';

export default function WfProof() {
  const cases = getProjectsByCategory('ecosistemas').filter((c) => c.img).slice(0, 3);
  return (
    <WfRow note={webNotes.proof}>
      <h2 className="sk-h2">Resultados que ya <span className="sk-mark">funcionan</span></h2>
      <div className="sk-grid3">
        {cases.map((c, i) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="sk-card-link">
            <SketchBox seed={31 + i} className="sk-pad" style={{ padding: '1rem' }}>
              <img className="sk-thumb" src={c.img} alt={c.title} loading="lazy" />
              <h3 className="sk-h3">{c.title}</h3>
              <p className="sk-metric">{c.metric}</p>
            </SketchBox>
          </Link>
        ))}
      </div>
    </WfRow>
  );
}
```

- [ ] **Step 2: Crear `WfBenefits.jsx`**

```jsx
import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { webBenefits, webNotes } from '../../data/webSketch';

export default function WfBenefits() {
  return (
    <WfRow note={webNotes.benefits}>
      <h2 className="sk-h2">Una web que trabaja <span className="sk-mark">por ti</span></h2>
      <div className="sk-grid3">
        {webBenefits.map((b, i) => (
          <div key={b.n}>
            <SketchBox kind="ellipse" seed={41 + i} passes={1} className="sk-num">{b.n}</SketchBox>
            <h3 className="sk-h3">{b.title}</h3>
            <p style={{ margin: 0 }}>{b.text}</p>
          </div>
        ))}
      </div>
    </WfRow>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceEcosystems.jsx` agregar los imports `import WfProof from '../WebSketch/WfProof';` e `import WfBenefits from '../WebSketch/WfBenefits';` y, dentro de `.sk-canvas`, después de `<WfHero />`:

```jsx
          <WfProof />
          <WfBenefits />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 3 tarjetas de casos con foto en blanco y negro que recupera el color al pasar el cursor; clic lleva a `/work/<slug>`; 3 círculos numerados dibujados.

- [ ] **Step 5: Commit**

```bash
git add src/components/WebSketch/WfProof.jsx src/components/WebSketch/WfBenefits.jsx src/components/Views/ServiceEcosystems.jsx
git commit -m "feat(web-sketch): add proof and benefits blocks"
```

---

### Task 8: Proceso + Precios

**Files:**
- Create: `src/components/WebSketch/WfProcess.jsx`
- Create: `src/components/WebSketch/WfPricing.jsx`
- Modify: `src/components/Views/ServiceEcosystems.jsx`

- [ ] **Step 1: Crear `WfProcess.jsx`**

```jsx
import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { webSteps, webNotes } from '../../data/webSketch';

export default function WfProcess() {
  return (
    <WfRow note={webNotes.process}>
      <h2 className="sk-h2">Así trabajamos, <span className="sk-mark">paso a paso</span></h2>
      <div className="sk-steps">
        {webSteps.map((s, i) => (
          <SketchBox key={s.title} seed={51 + i} fill={s.here ? '#E0FF31' : 'none'} className="sk-pad" style={{ padding: '1rem' }}>
            <h3 className="sk-h3">{i + 1}. {s.title}</h3>
            <p style={{ margin: 0 }}>{s.text}</p>
            {s.here && <p className="sk-caption" style={{ margin: '0.5rem 0 0' }}>← estás aquí</p>}
          </SketchBox>
        ))}
      </div>
    </WfRow>
  );
}
```

- [ ] **Step 2: Crear `WfPricing.jsx`**

```jsx
import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webPlans, webNotes, WEB_WA } from '../../data/webSketch';
import { waLink } from '../../data/contact';

export default function WfPricing() {
  return (
    <WfRow note={webNotes.pricing}>
      <h2 className="sk-h2">Cuánto <span className="sk-mark">cuesta</span></h2>
      <div className="sk-grid3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {webPlans.map((p, i) => (
          <SketchBox key={p.name} seed={61 + i} className="sk-pad">
            <h3 className="sk-h3">{p.name}</h3>
            <p className="sk-price">{p.price}</p>
            <p className="sk-caption" style={{ margin: 0 }}>Entrega: {p.time}</p>
            <ul className="sk-list">{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
            <SketchButton href={i === 0 ? WEB_WA : waLink('Hola, quiero cotizar un sitio corporativo')} seed={65 + i}>Cotizar</SketchButton>
          </SketchBox>
        ))}
      </div>
    </WfRow>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceEcosystems.jsx` importar `WfProcess` y `WfPricing` (rutas `../WebSketch/...`) y agregar, después de `<WfBenefits />`:

```jsx
          <WfProcess />
          <WfPricing />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: la tarjeta "Boceto" tiene relleno marcador y "← estás aquí"; cada botón "Cotizar" abre WhatsApp con su texto.

- [ ] **Step 5: Commit**

```bash
git add src/components/WebSketch/WfProcess.jsx src/components/WebSketch/WfPricing.jsx src/components/Views/ServiceEcosystems.jsx
git commit -m "feat(web-sketch): add process and pricing blocks"
```

---

### Task 9: FAQ + Cierre

**Files:**
- Create: `src/components/WebSketch/WfFaq.jsx`
- Create: `src/components/WebSketch/WfFinalCta.jsx`
- Modify: `src/components/Views/ServiceEcosystems.jsx`

- [ ] **Step 1: Crear `WfFaq.jsx`** (`<details>` nativo: accesible y sin JS)

```jsx
import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { webFaq, webNotes } from '../../data/webSketch';

export default function WfFaq() {
  return (
    <WfRow note={webNotes.faq}>
      <h2 className="sk-h2">Lo que <span className="sk-mark">todos preguntan</span></h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {webFaq.map((f, i) => (
          <SketchBox key={f.question} as="details" seed={71 + i} passes={1} className="sk-faq">
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </SketchBox>
        ))}
      </div>
    </WfRow>
  );
}
```

- [ ] **Step 2: Crear `WfFinalCta.jsx`**

```jsx
import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webNotes, WEB_WA } from '../../data/webSketch';

export default function WfFinalCta() {
  return (
    <WfRow note={webNotes.cta}>
      <SketchBox seed={91} className="sk-pad" style={{ textAlign: 'center' }}>
        <h2 className="sk-h1">¿Armamos <span className="sk-mark">tu página</span>?</h2>
        <p className="sk-body" style={{ margin: '0 auto 1.5rem' }}>
          Esta página es un boceto. La tuya sale terminada, publicada y vendiendo.
        </p>
        <SketchButton href={WEB_WA} seed={92} large>Cotizar por WhatsApp</SketchButton>
      </SketchBox>
    </WfRow>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceEcosystems.jsx` importar `WfFaq` y `WfFinalCta` y agregar, después de `<WfPricing />`:

```jsx
          <WfFaq />
          <WfFinalCta />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: las 3 preguntas se abren y cierran con teclado (Enter/Espacio); el cierre muestra el botón grande.

- [ ] **Step 5: Commit**

```bash
git add src/components/WebSketch/WfFaq.jsx src/components/WebSketch/WfFinalCta.jsx src/components/Views/ServiceEcosystems.jsx
git commit -m "feat(web-sketch): add FAQ and final CTA, page complete"
```

---

### Task 10: Pulido, accesibilidad y verificación final

**Files:**
- Modify: `src/components/WebSketch/webSketch.css` (solo si la revisión lo pide)

- [ ] **Step 1: Revisión de escritorio (1280 px)**

Run: `npm run dev -- --port 5180`. Checklist:
- Las 8 notas numeradas 1–8 aparecen alternando izquierda/derecha, con flecha hacia el bloque.
- Los bordes se dibujan al hacer scroll (una vez).
- Ningún texto queda tapado por un trazo.

- [ ] **Step 2: Revisión móvil (375 px)**

Checklist: sin scroll horizontal; notas debajo de cada bloque con prefijo "↑"; botones tocables (≥44 px de alto); texto legible (≥16 px). Si algo desborda, ajustar `webSketch.css` y repetir.

- [ ] **Step 3: Movimiento reducido y teclado**

Activar "reducir movimiento" del sistema y recargar. Expected: los bordes aparecen ya dibujados, sin animación. Con Tab: foco visible (contorno rojo) en botones, "Ver casos", resúmenes del FAQ y tarjetas de casos.

- [ ] **Step 4: Consola y build limpio**

Run: `npm run build && npm run check:sketch`
Expected: `✓ built in` y `sketchPath ok`. Consola del navegador sin errores ni warnings de React.

- [ ] **Step 5: Revisión de conversión (el "¿vende?" del plan)**

Con ojos de cliente, sin leer las notas rojas: ¿se entiende en 5 segundos qué se vende, cuánto cuesta aprox. y cómo cotizar? Hay cuatro botones de cotizar (header, hero, planes, cierre), todos a WhatsApp. Si falta claridad, ajustar copy en `src/data/webSketch.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(web-sketch): responsive, a11y and motion fixes"
git push
```

---

## Siguientes páginas (un plan por cada una, a aprobar antes de escribirlos)

Misma regla: el medio es el mensaje, y cada página vende su propio servicio. Ideas de partida, a validar contigo:

| Página | Concepto creativo propuesto |
|---|---|
| Branding | Tablero de marca pegado con cinta sobre corcho/papel: logo, paleta, tipografía y manifiesto "armándose" al hacer scroll. |
| Contenido en video | Claqueta + tira de película/storyboard: el scroll recorre las tres piezas (líder, empresa, producto) como fotogramas. |
| Redes | Un feed/teléfono que se desplaza solo mostrando posts reales de ejemplo, con el calendario del mes alrededor. |
| Ads | Una "pantalla de resultados" animada: el embudo y los números cambian al ajustar un control (inversión → leads). |

## Self-review

- **Cobertura del pedido:** rename → Task 1; Web como wireframe dibujado a mano sobre lienzo blanco → Tasks 2–6; que venda y convierta (hero, prueba, beneficios, proceso, precios, FAQ, CTA ×4 a WhatsApp) → Tasks 6–9; atractivo/creativo (trazos animados + notas manuscritas + foto "boceto→color") → Tasks 3, 4, 7; funcional (responsivo, teclado, movimiento reducido) → Task 10; "una por una" → sección de siguientes páginas.
- **Placeholders:** ninguno; todo el código está completo. La única búsqueda dinámica es el kicker de `ServiceContent.jsx` (Task 1 Step 3), con comando exacto.
- **Consistencia de nombres:** `sketchRect/sketchEllipse/sketchCross` (Task 2) = importados en `SketchBox`; `webNotes.*`, `webHero`, `webBenefits`, `webSteps`, `webPlans`, `webFaq`, `WEB_WA`, `webKicker` definidos en Task 5 y usados con el mismo nombre en Tasks 6–9; clases `.sk-*` definidas en Task 4 antes de usarse.
