# Página Nosotros (primera plana de un periódico) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/nosotros` como la **primera plana de un periódico**: cabecera con el nombre en grande y la fecha del día, cinta de "Última hora", titular principal con foto de prensa y columnas, índice "Dentro de esta edición" que enlaza a los 5 servicios, recuadro "En cifras", nota del fundador con cita destacada, secciones interiores (principios, método, corresponsalías) y el llamado a la acción como **anuncio clasificado**. La misma información de hoy, con otro enfoque creativo.

**Architecture:** Mismo método que las páginas de servicio: texto en HTML real (SEO, accesible, responsivo), la creatividad en CSS + Framer Motion, y el copy movido a `src/data/aboutPaper.js` sin cambiar su contenido (los textos salen de `AboutPage.jsx` actual). Un envoltorio `PpReveal` hace que cada bloque "se imprima" al entrar (aparece con un leve desenfoque que se enfoca). La cinta de noticias es la única pieza con estado (pausa). La fecha de la edición se calcula en vivo con `Intl.DateTimeFormat('es-MX')`. La página no usa `<main>` propio (la app ya lo trae).

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async. Dos fuentes nuevas de Google Fonts: **Playfair Display** (titulares, cabecera) y **Source Serif 4** (texto de columnas). Sin dependencias ni assets nuevos (la foto es la del caso `monterrey-juridico`, en blanco y negro con trama de impresión por CSS).

**Contraste entre páginas:** papel crema con tinta negra, filetes dobles y un único acento rojo "Última hora"; el lima de marca solo aparece en el botón del clasificado.

**Fuera de alcance (a propósito):** número de edición, clima o secciones inventadas, foto del fundador (no hay; el código actual ya lo deja para después con `FOUNDER_IMG = null`), versión para imprimir, rediseño de otras páginas. Este plan **sustituye visualmente** el [plan de Nosotros de mayo](2026-05-09-nosotros-redesign.md); el contenido se conserva.

**Riesgos a confirmar antes de publicar (copy existente, se reutiliza tal cual):**
- Cifras y datos: "12X ROI promedio", "+215% leads", "3 años operando", "MX + USA", "Est. 2022", clientes en Monterrey, CDMX, Houston y Austin, "Meta Certified".
- **Inconsistencia:** esta página dice "Meta Ads, Google Ads…" y acredita "Google Ads", pero las páginas de servicio solo describen Meta Ads (y la de Ads se enfoca en Meta). Confirma si Persuasivo ofrece Google Ads; si no, hay que quitarlo del titular y de las acreditaciones.
- La foto de prensa es una captura del sitio del caso Monterrey Jurídico (de `/showcase/monterrey.jpg`).

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/nosotros`; esperar ~10 s tras navegar (el sitio tiene un fundido de entrada lento en el panel).
3. Revisar a 1280 px y a 375 px (sin scroll horizontal).
4. Los imports en `src/data/*.js` usan extensión `.js`.
5. `grep -rn "por-que" src` solo debe encontrar la sección nueva (se conserva el ancla `#por-que`).

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/index.css` | Modificar | Importar Playfair Display y Source Serif 4 |
| `src/data/aboutPaper.js` | Crear | Todo el copy + `formatEdition` |
| `src/components/Paper/paper.css` | Crear | Papel, filetes, cabecera, columnas, cuadros, clasificado |
| `src/components/Paper/PpReveal.jsx` | Crear | Entrada "de imprenta" de cada bloque |
| `src/components/Paper/PpMasthead.jsx` | Crear | Franja de fecha, nombre y lema |
| `src/components/Paper/PpTicker.jsx` | Crear | Cinta "Última hora" con botón de pausa |
| `src/components/Paper/PpHeadline.jsx` | Crear | Titular (`<h1>`), bajada, foto y columnas |
| `src/components/Paper/PpIndex.jsx` | Crear | "Dentro de esta edición" y "En cifras" |
| `src/components/Paper/PpFounder.jsx` | Crear | Nota del fundador con cita |
| `src/components/Paper/PpInside.jsx` | Crear | Principios, método y corresponsalías |
| `src/components/Paper/PpClassified.jsx` | Crear | CTA como clasificado + pie de imprenta |
| `src/components/Views/AboutPage.jsx` | Reescribir | Compone la plana + SEO (mismo Helmet) |

---

### Task 1: Fuentes y datos (`aboutPaper.js`)

**Files:**
- Modify: `src/index.css:1`
- Create: `src/data/aboutPaper.js`

- [ ] **Step 1: Cargar las fuentes**

En `src/index.css`, en la primera línea (`@import url('https://fonts.googleapis.com/css2?...`), insertar antes de `&display=swap`:

```
&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400
```

- [ ] **Step 2: Crear `aboutPaper.js`**

```js
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
```

- [ ] **Step 3: Verificar**

Run:
```bash
node -e "import('./src/data/aboutPaper.js').then(m=>console.log(m.paperPrinciples.items.length, m.paperMethod.items.length, m.paperIndex.items.length, m.paperTicker.items.length, /noviembre/.test(m.formatEdition(new Date('2026-11-19T12:00:00-06:00'))), /19/.test(m.formatEdition(new Date('2026-11-19T12:00:00-06:00')))))"
```
Expected: `6 3 5 5 true true`

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/data/aboutPaper.js
git commit -m "feat(nosotros): add newspaper fonts and page copy data"
```

---

### Task 2: CSS de la primera plana

**Files:**
- Create: `src/components/Paper/paper.css`

- [ ] **Step 1: Crear `paper.css`**

```css
.pp-page { --pp-paper: #f4efe4; --pp-ink: #141414; --pp-soft: #5a554a; --pp-red: #b3261e; --pp-lime: #E0FF31; background-color: var(--pp-paper); background-image: radial-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1.2px); background-size: 6px 6px; color: var(--pp-ink); min-height: 100vh; padding: 84px 4vw 6vw; font-family: 'Source Serif 4', Georgia, serif; }
.pp-sheet { max-width: 1180px; margin: 0 auto; }

/* cabecera */
.pp-strip { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.25rem 1rem; padding: 0.4rem 0; border-top: 3px solid var(--pp-ink); border-bottom: 1px solid var(--pp-ink); font-family: var(--font-body); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; }
.pp-name { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(3.2rem, 13vw, 10rem); line-height: 0.9; letter-spacing: -0.02em; text-align: center; text-transform: uppercase; margin: 0.35em 0 0.1em; }
.pp-tagline { text-align: center; font-style: italic; font-size: 1.05rem; margin: 0 0 0.6rem; }
.pp-rule2 { height: 5px; border: 0; border-top: 3px solid var(--pp-ink); border-bottom: 1px solid var(--pp-ink); margin: 0; }

/* cinta de última hora */
.pp-ticker { display: flex; align-items: stretch; border-bottom: 1px solid var(--pp-ink); font-family: var(--font-body); font-size: 0.85rem; overflow: hidden; }
.pp-ticker-label { flex: none; display: flex; align-items: center; background: var(--pp-red); color: #fff; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 0 0.8rem; }
.pp-ticker-viewport { flex: 1; min-width: 0; overflow: hidden; }
.pp-ticker-track { display: flex; width: max-content; padding: 0.55rem 0; animation: pp-scroll 32s linear infinite; }
.pp-ticker-track[data-paused='true'], .pp-ticker:hover .pp-ticker-track { animation-play-state: paused; }
.pp-ticker-track ul { display: flex; flex: none; gap: 3rem; margin: 0; padding: 0 3rem 0 0; list-style: none; white-space: nowrap; }
@keyframes pp-scroll { to { transform: translateX(-50%); } }
.pp-ticker-btn { flex: none; min-height: 44px; padding: 0 0.9rem; border: 0; border-left: 1px solid var(--pp-ink); background: transparent; font: inherit; cursor: pointer; }

/* primera plana: 3 columnas con filetes */
.pp-front { display: grid; gap: 0; padding-top: 1.25rem; }
.pp-col { padding: 1rem 0; border-top: 1px solid var(--pp-ink); }
.pp-col--head { border-top: 0; }
@media (min-width: 1000px) {
  .pp-front { grid-template-columns: 230px minmax(0, 1fr) 280px; }
  .pp-col { padding: 0 1.25rem; border-top: 0; }
  .pp-col--index { grid-column: 1; grid-row: 1; padding-left: 0; }
  .pp-col--head { grid-column: 2; grid-row: 1; border-left: 1px solid var(--pp-ink); border-right: 1px solid var(--pp-ink); }
  .pp-col--founder { grid-column: 3; grid-row: 1; padding-right: 0; }
}

/* tipografía */
.pp-kicker { margin: 0 0 0.4rem; color: var(--pp-red); font-family: var(--font-body); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.pp-h1 { margin: 0.1em 0 0.4em; font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(2.4rem, 5.6vw, 4.6rem); line-height: 1; letter-spacing: -0.02em; }
.pp-h1 em { font-style: italic; font-weight: 700; }
.pp-deck { margin: 0 0 0.75rem; font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(1.1rem, 2vw, 1.4rem); line-height: 1.3; color: #2b2822; }
.pp-byline { margin: 0 0 1rem; padding: 0.35rem 0; border-top: 1px solid var(--pp-ink); border-bottom: 1px solid var(--pp-ink); font-family: var(--font-body); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
.pp-h2 { margin: 0 0 0.6rem; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.6rem; line-height: 1.1; }
.pp-h2 em { font-style: italic; font-weight: 700; }
.pp-h3 { margin: 0 0 0.25rem; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.15rem; line-height: 1.2; }
.pp-p { margin: 0 0 0.8rem; line-height: 1.6; font-size: 1rem; }
.pp-small { margin: 0.5rem 0 0; font-family: var(--font-body); font-size: 0.78rem; letter-spacing: 0.04em; color: var(--pp-soft); }
.pp-cols { column-count: 1; }
@media (min-width: 700px) { .pp-cols { column-count: 2; column-gap: 1.5rem; column-rule: 1px solid rgba(20, 20, 20, 0.35); text-align: justify; hyphens: auto; } }
.pp-dropcap::first-letter { float: left; margin: 0.04em 0.1em 0 0; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 4.2em; line-height: 0.8; }

/* foto de prensa */
.pp-photo-link { display: block; color: inherit; text-decoration: none; }
.pp-photo-wrap { position: relative; display: block; }
.pp-photo { display: block; width: 100%; aspect-ratio: 3 / 2; object-fit: cover; filter: grayscale(1) contrast(1.15); mix-blend-mode: multiply; }
.pp-photo-wrap::after { content: ''; position: absolute; inset: 0; background: radial-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1.4px) 0 0 / 4px 4px; mix-blend-mode: multiply; opacity: 0.35; pointer-events: none; }
.pp-caption { margin: 0.35rem 0 0; font-size: 0.8rem; font-style: italic; color: var(--pp-soft); }

/* recuadros */
.pp-box { padding: 0.9rem 1rem; border: 2px solid var(--pp-ink); }
.pp-box + .pp-box { margin-top: 1rem; }
.pp-box-title { margin: 0 0 0.6rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--pp-ink); font-family: var(--font-body); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.pp-index { display: grid; gap: 0.7rem; margin: 0; padding: 0; list-style: none; }
.pp-index a { display: block; color: inherit; text-decoration: none; }
.pp-index b { font-family: 'Playfair Display', serif; font-size: 1.1rem; }
.pp-index small { font-family: var(--font-body); color: var(--pp-red); }
.pp-index span { display: block; font-size: 0.82rem; line-height: 1.35; color: var(--pp-soft); }
.pp-index a:hover b { text-decoration: underline; }
.pp-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem 0.6rem; margin: 0; padding: 0; list-style: none; text-align: center; }
.pp-stats strong { display: block; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.7rem; line-height: 1; }
.pp-stats span { font-family: var(--font-body); font-size: 0.66rem; letter-spacing: 0.08em; text-transform: uppercase; }
.pp-quote { margin: 1rem 0; padding: 0.7rem 0; border-top: 3px solid var(--pp-ink); border-bottom: 1px solid var(--pp-ink); font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; font-size: 1.4rem; line-height: 1.2; }

/* interiores */
.pp-inside { display: grid; margin-top: 1.5rem; border-top: 3px double var(--pp-ink); }
.pp-inside > section { padding: 1.25rem 0; border-top: 1px solid var(--pp-ink); }
.pp-inside > section:first-child { border-top: 0; }
@media (min-width: 900px) {
  .pp-inside { grid-template-columns: repeat(3, 1fr); }
  .pp-inside > section { padding: 1.25rem; border-top: 0; border-left: 1px solid var(--pp-ink); }
  .pp-inside > section:first-child { padding-left: 0; border-left: 0; }
  .pp-inside > section:last-child { padding-right: 0; }
}
.pp-list { display: grid; gap: 0.9rem; margin: 0; padding: 0; list-style: none; counter-reset: pp; }
.pp-list li { counter-increment: pp; }
.pp-list--roman .pp-h3::before { content: counter(pp, upper-roman) '. '; color: var(--pp-red); }
.pp-num { margin-right: 0.35rem; color: var(--pp-red); font-family: var(--font-body); font-size: 0.8rem; font-weight: 700; }
.pp-inline { margin: 0 0 1rem; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.25rem 0.9rem; font-family: var(--font-body); font-size: 0.85rem; }

/* clasificado y pie */
.pp-classified { max-width: 720px; margin: 1.5rem auto 0; padding: 1.5rem; border: 3px double var(--pp-ink); background: rgba(255, 255, 255, 0.35); text-align: center; }
.pp-classified .pp-p { max-width: 520px; margin-left: auto; margin-right: auto; }
.pp-btn { display: inline-block; min-height: 44px; padding: 0.95rem 2.2rem; border: 2px solid var(--pp-ink); background: var(--pp-lime); color: var(--pp-ink); font-family: var(--font-body); font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; transition: background 0.2s, color 0.2s; }
.pp-btn:hover { background: var(--pp-ink); color: var(--pp-lime); }
.pp-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem; margin-top: 1.5rem; padding-top: 0.5rem; border-top: 3px solid var(--pp-ink); font-family: var(--font-body); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; }

.pp-btn:focus-visible, .pp-index a:focus-visible, .pp-ticker-btn:focus-visible, .pp-photo-link:focus-visible { outline: 3px solid var(--pp-red); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .pp-ticker-track { animation: none; width: auto; flex-wrap: wrap; }
  .pp-ticker-track ul[aria-hidden='true'] { display: none; }
  .pp-ticker-track ul { white-space: normal; flex-wrap: wrap; gap: 0.25rem 1.5rem; }
  .pp-btn { transition: none; }
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/Paper/paper.css
git commit -m "feat(nosotros): add front-page newspaper styles"
```

---

### Task 3: Cabecera, cinta de noticias y página montada

**Files:**
- Create: `src/components/Paper/PpReveal.jsx`
- Create: `src/components/Paper/PpMasthead.jsx`
- Create: `src/components/Paper/PpTicker.jsx`
- Rewrite: `src/components/Views/AboutPage.jsx`

- [ ] **Step 1: Crear `PpReveal.jsx`**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Cada bloque "se imprime": aparece con un leve desenfoque que se enfoca. Con movimiento reducido ya está puesto.
export default function PpReveal({ children, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.6, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Crear `PpMasthead.jsx`**

```jsx
import React from 'react';
import { paperMasthead, formatEdition } from '../../data/aboutPaper';

export default function PpMasthead() {
  return (
    <header>
      <div className="pp-strip">
        <span>{paperMasthead.place} · {formatEdition()}</span>
        <span>{paperMasthead.founded}</span>
        <span>{paperMasthead.price}</span>
      </div>
      <p className="pp-name">{paperMasthead.name}</p>
      <p className="pp-tagline">{paperMasthead.tagline}</p>
      <hr className="pp-rule2" />
    </header>
  );
}
```

- [ ] **Step 3: Crear `PpTicker.jsx`**

```jsx
import React, { useState } from 'react';
import { paperTicker } from '../../data/aboutPaper';

// Cinta de noticias en movimiento, con botón de pausa (WCAG 2.2.2). La segunda copia es decorativa.
export default function PpTicker() {
  const [paused, setPaused] = useState(false);
  const list = (hidden) => (
    <ul aria-hidden={hidden || undefined}>
      {paperTicker.items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
  return (
    <div className="pp-ticker">
      <span className="pp-ticker-label">{paperTicker.label}</span>
      <div className="pp-ticker-viewport">
        <div className="pp-ticker-track" data-paused={paused}>
          {list(false)}
          {list(true)}
        </div>
      </div>
      <button type="button" className="pp-ticker-btn" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        {paused ? paperTicker.play : paperTicker.pause}
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Reescribir `AboutPage.jsx` (cabecera y cinta por ahora)**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import PpMasthead from '../Paper/PpMasthead';
import PpTicker from '../Paper/PpTicker';
import '../Paper/paper.css';

export default function AboutPage() {
  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: '#f4efe4' }}
    >
      <Helmet>
        <title>Nosotros — Agencia Digital en Monterrey | Persuasivo</title>
        <meta name="description" content="Persuasivo es una agencia digital en Monterrey especializada en Meta Ads, Google Ads y desarrollo web. Conoce quién está detrás y cómo trabajamos." />
        <link rel="canonical" href="https://persuasivo.com.mx/nosotros" />
        <meta property="og:title" content="Nosotros | Persuasivo — Agencia Digital Monterrey" />
        <meta property="og:description" content="Hacemos que tu negocio crezca en internet. Meta Ads, Google Ads, desarrollo web y redes sociales con resultados documentados." />
        <meta property="og:url" content="https://persuasivo.com.mx/nosotros" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="pp-page">
        <div className="pp-sheet">
          <PpMasthead />
          <PpTicker />
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
```

- [ ] **Step 5: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/nosotros` (esperar ~10 s).
Expected: fondo crema con trama; franja superior con la fecha de hoy en español; "PERSUASIVO" enorme con filete doble; cinta roja "Última hora" que se desplaza y se detiene con el cursor o con el botón; consola limpia.

- [ ] **Step 6: Commit**

```bash
git add src/components/Paper/PpReveal.jsx src/components/Paper/PpMasthead.jsx src/components/Paper/PpTicker.jsx src/components/Views/AboutPage.jsx
git commit -m "feat(nosotros): newspaper masthead and breaking-news ticker on /nosotros"
```

---

### Task 4: Titular, índice y nota del fundador

**Files:**
- Create: `src/components/Paper/PpHeadline.jsx`
- Create: `src/components/Paper/PpIndex.jsx`
- Create: `src/components/Paper/PpFounder.jsx`
- Modify: `src/components/Views/AboutPage.jsx`

- [ ] **Step 1: Crear `PpHeadline.jsx`** (el `<h1>` va primero en el DOM; la rejilla CSS lo coloca en el centro)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PpReveal from './PpReveal';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { paperHead } from '../../data/aboutPaper';

export default function PpHeadline() {
  const c = getProjectBySlug(paperHead.photoSlug);
  const [a, b] = paperHead.title;
  return (
    <article className="pp-col pp-col--head">
      <PpReveal>
        <p className="pp-kicker">{paperHead.kicker}</p>
        <h1 className="pp-h1">{a}<em>{b}</em></h1>
        <p className="pp-deck">{paperHead.deck}</p>
        <p className="pp-byline">{paperHead.byline}</p>
        {c && c.img && (
          <figure style={{ margin: '0 0 1rem' }}>
            <Link to={`/work/${c.slug}`} className="pp-photo-link">
              <span className="pp-photo-wrap"><img className="pp-photo" src={c.img} alt={`Sitio web del caso ${c.title}`} /></span>
            </Link>
            <figcaption className="pp-caption">Caso {c.title}: {c.metric}.</figcaption>
          </figure>
        )}
        <div className="pp-cols">
          {paperHead.body.map((t, i) => (
            <p key={t} className={`pp-p${i === 0 ? ' pp-dropcap' : ''}`}>{t}</p>
          ))}
        </div>
      </PpReveal>
    </article>
  );
}
```

- [ ] **Step 2: Crear `PpIndex.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PpReveal from './PpReveal';
import { paperIndex, paperStats } from '../../data/aboutPaper';

export default function PpIndex() {
  return (
    <aside className="pp-col pp-col--index">
      <PpReveal delay={0.1}>
        <div className="pp-box">
          <h2 className="pp-box-title">{paperIndex.title}</h2>
          <ul className="pp-index">
            {paperIndex.items.map((s) => (
              <li key={s.to}>
                <Link to={s.to}><b>{s.word}</b> <small>· p. {s.page}</small><span>{s.detail}</span></Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="pp-box">
          <h2 className="pp-box-title">En cifras</h2>
          <ul className="pp-stats">
            {paperStats.map(([v, l]) => <li key={l}><strong>{v}</strong><span>{l}</span></li>)}
          </ul>
        </div>
      </PpReveal>
    </aside>
  );
}
```

- [ ] **Step 3: Crear `PpFounder.jsx`**

```jsx
import React from 'react';
import PpReveal from './PpReveal';
import { paperFounder } from '../../data/aboutPaper';

export default function PpFounder() {
  return (
    <article className="pp-col pp-col--founder">
      <PpReveal delay={0.2}>
        <p className="pp-kicker">{paperFounder.label}</p>
        <h2 className="pp-h2">{paperFounder.name}</h2>
        {paperFounder.paragraphs.map((t) => <p className="pp-p" key={t}>{t}</p>)}
        <blockquote className="pp-quote">“{paperFounder.quote}”</blockquote>
        <p className="pp-small">{paperFounder.creds}</p>
      </PpReveal>
    </article>
  );
}
```

- [ ] **Step 4: Montarlos**

En `AboutPage.jsx` importar `PpHeadline`, `PpIndex` y `PpFounder` (cada import en su propia línea) y agregar, después de `<PpTicker />`:

```jsx
          <div className="pp-front">
            <PpHeadline />
            <PpIndex />
            <PpFounder />
          </div>
```

- [ ] **Step 5: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador:
- Escritorio (≥1000 px): tres columnas con filetes verticales; índice y cifras a la izquierda, titular al centro con foto de prensa en blanco y negro y texto en dos columnas con capitular, nota del fundador a la derecha con cita destacada.
- 375 px: se apila (titular, índice, fundador) con filetes horizontales.
- Un solo `<h1>`; los enlaces del índice llevan a los 5 servicios; la foto lleva a `/work/monterrey-juridico`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Paper/PpHeadline.jsx src/components/Paper/PpIndex.jsx src/components/Paper/PpFounder.jsx src/components/Views/AboutPage.jsx
git commit -m "feat(nosotros): add headline story, edition index and founder column"
```

---

### Task 5: Interiores y clasificado

**Files:**
- Create: `src/components/Paper/PpInside.jsx`
- Create: `src/components/Paper/PpClassified.jsx`
- Modify: `src/components/Views/AboutPage.jsx`

- [ ] **Step 1: Crear `PpInside.jsx`**

```jsx
import React from 'react';
import PpReveal from './PpReveal';
import { paperPrinciples, paperMethod, paperCorrespondents } from '../../data/aboutPaper';

export default function PpInside() {
  return (
    <div className="pp-inside">
      <section id="por-que">
        <PpReveal>
          <p className="pp-kicker">{paperPrinciples.title}</p>
          <ol className="pp-list pp-list--roman">
            {paperPrinciples.items.map(([t, d]) => (
              <li key={t}><h3 className="pp-h3">{t}</h3><p className="pp-p" style={{ margin: 0 }}>{d}</p></li>
            ))}
          </ol>
        </PpReveal>
      </section>
      <section>
        <PpReveal delay={0.1}>
          <p className="pp-kicker">{paperMethod.title}</p>
          <ol className="pp-list">
            {paperMethod.items.map(([n, t, d]) => (
              <li key={n}><h3 className="pp-h3"><span className="pp-num">{n}</span>{t}</h3><p className="pp-p" style={{ margin: 0 }}>{d}</p></li>
            ))}
          </ol>
        </PpReveal>
      </section>
      <section>
        <PpReveal delay={0.2}>
          <p className="pp-kicker">{paperCorrespondents.title}</p>
          <ul className="pp-inline">{paperCorrespondents.places.map((p) => <li key={p}>{p}</li>)}</ul>
          <p className="pp-kicker">{paperCorrespondents.creditsTitle}</p>
          <ul className="pp-inline">{paperCorrespondents.credits.map((c) => <li key={c}>{c}</li>)}</ul>
        </PpReveal>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Crear `PpClassified.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PpReveal from './PpReveal';
import { paperClassified as c } from '../../data/aboutPaper';

export default function PpClassified() {
  const [a, b] = c.title;
  return (
    <>
      <PpReveal>
        <section className="pp-classified">
          <p className="pp-box-title">{c.label}</p>
          <h2 className="pp-h2">{a}<em>{b}</em></h2>
          <p className="pp-p">{c.text}</p>
          <Link to="/contacto" className="pp-btn">{c.button}</Link>
          <p className="pp-small">{c.note}</p>
        </section>
      </PpReveal>
      <div className="pp-foot"><span>{c.print}</span><span>persuasivo.com.mx</span></div>
    </>
  );
}
```

- [ ] **Step 3: Montarlos**

En `AboutPage.jsx` importar `PpInside` y `PpClassified` (cada import en su propia línea) y agregar, después del `</div>` de `.pp-front`:

```jsx
          <PpInside />
          <PpClassified />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: tres secciones interiores (principios con números romanos rojos, método con 01–03, corresponsalías y acreditaciones); el clasificado de borde doble con botón lima que lleva a `/contacto`; pie "Impreso en Monterrey, N.L.".

- [ ] **Step 5: Commit**

```bash
git add src/components/Paper/PpInside.jsx src/components/Paper/PpClassified.jsx src/components/Views/AboutPage.jsx
git commit -m "feat(nosotros): add inside sections and classified-ad CTA, page complete"
```

---

### Task 6: Pulido y verificación final

**Files:**
- Modify: `src/components/Paper/paper.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: la cabecera ocupa el ancho de la hoja (máx. 1180 px); tres columnas con filetes verticales sin cortar texto; el nombre en grande no desborda; la fecha corresponde al día de hoy; la capitular no se superpone con la segunda línea.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth`; el nombre "PERSUASIVO" cabe en una línea (si no, bajar el `clamp` mínimo); la cinta se desplaza dentro de su caja; botones (pausa y clasificado) ≥44 px de alto; las columnas de texto pasan a una sola.

- [ ] **Step 3: Teclado y movimiento reducido**

Con Tab: foco rojo visible en el botón de pausa, enlaces del índice, foto y botón del clasificado; el botón de pausa detiene y reanuda la cinta (`aria-pressed`). Con "reducir movimiento": la cinta queda estática (lista envuelta, sin segunda copia) y los bloques aparecen sin desenfoque.

- [ ] **Step 4: SEO y regresiones**

En la consola del navegador:

```js
({ h1: document.querySelectorAll('h1').length, mains: document.querySelectorAll('main').length, porQue: !!document.getElementById('por-que'), links: [...document.querySelectorAll('.pp-index a')].map(a => a.getAttribute('href')) })
```
Expected: `{ h1: 1, mains: 1, porQue: true, links: ['/servicios/branding', '/servicios/ecosistemas', '/contenido', '/servicios/autoridad', '/servicios/trafico'] }`.
Run: `npm run build` → `✓ built in`. La navegación y el pie siguen enlazando a `/nosotros`; las demás páginas sin cambios.

- [ ] **Step 5: ¿Se siente un periódico?**

Sin guía: ¿se reconoce de inmediato la primera plana (cabecera, fecha, titular, foto, columnas, clasificado) y a la vez se entiende qué hace Persuasivo, quién está detrás y cómo pedir el diagnóstico? Si falta claridad, ajustar copy en `src/data/aboutPaper.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(nosotros): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura del pedido:** primera plana de periódico con su estilo y dinámica (cabecera con fecha en vivo, cinta de última hora, titular con foto de prensa y columnas con capitular, índice "Dentro de esta edición", recuadro de cifras, cita destacada, secciones interiores, clasificado como CTA; Tasks 2–5), con la misma información de hoy (Task 1), SEO igual que antes (mismo Helmet y canonical, un solo `<h1>`, ancla `#por-que`), accesibilidad y móvil (Task 6).
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `paperMasthead`, `formatEdition`, `paperTicker`, `paperHead`, `paperStats`, `paperIndex`, `paperFounder`, `paperPrinciples`, `paperMethod`, `paperCorrespondents`, `paperClassified` (Task 1) se usan igual en Tasks 3–5; clases `.pp-*` definidas en Task 2 antes de usarse; `PpReveal` acepta `delay` y reenvía el resto de props.
- **Riesgos conocidos:** la cinta usa `translateX(-50%)` y depende de que las dos listas midan lo mismo (por eso ambas llevan el mismo `padding-right`); la capitular con `::first-letter` puede variar entre navegadores, y si se ve mal basta quitar `pp-dropcap`; el nombre en `clamp(3.2rem, 13vw, 10rem)` debe comprobarse a 320–375 px.
