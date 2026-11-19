# Página Branding (tablero de marca) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/servicios/branding` como un **tablero de marca** (papel cálido, tarjetas pegadas con cinta, polaroids, notas adhesivas) que se arma al hacer scroll, con un mini armador interactivo (el visitante prueba 3 paletas/tipografías y el tablero cambia en vivo). La página muestra creatividad y a la vez vende el servicio: qué incluye, cómo se trabaja, casos, FAQ y diagnóstico por WhatsApp.

**Architecture:** Mismo método que la página Web ([plan anterior](2026-11-19-web-sketch-page.md)): texto en HTML real (SEO, accesible, responsivo) y la "artesanía" en CSS + Framer Motion. Un primitivo `Pin` (tarjeta con cinta que "cae" al entrar en pantalla) se reutiliza en todas las secciones. Los textos existentes de `ServiceBranding.jsx` (qué incluye, pasos, FAQ, casos) se mueven a `src/data/brandBoard.js` sin cambiar su contenido; solo se añade la capa visual. El hero tiene estado local (`useState`) para el armador de paletas; el resto es estático.

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async. Fuentes ya cargadas (Instrument Serif, DM Sans, Caveat). Sin dependencias ni assets nuevos (las formas se dibujan con CSS).

**Contraste deliberado con Web:** Web es blanco, trazo negro, rojo y marcador lima; Branding es papel cálido y color de marca. Así cada página de servicio se siente distinta y la identidad del sitio sigue siendo la misma (tipografía y tono).

**Fuera de alcance (a propósito):** guardar o compartir la paleta elegida, más de 3 presets, arrastrar tarjetas, rediseño de otras páginas. Los casos que ya enlaza la página (`manifiesto-marca`, `arquitectura-visual`) se conservan tal cual.

**Riesgo a confirmar:** no se agregan cifras nuevas. El texto de ejemplo del bloque "Narrativa" (`"Hacemos que tu empresa se explique sola."`) es ilustrativo y está marcado como ejemplo; Abraham puede cambiarlo.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `npm run dev -- --port 5181 --strictPort` (o `preview_start` con `persuasivo-mx`), abrir `/servicios/branding`; consola sin errores.
3. Revisar a 1280 px y a 375 px (sin scroll horizontal, botones ≥44 px).
4. Los imports en `src/data/*.js` usan extensión `.js` (Node ESM los necesita para verificar con `node -e`; Vite acepta ambos).

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/brandBoard.js` | Crear | Textos movidos de la página + presets de paleta |
| `src/components/BrandBoard/brandBoard.css` | Crear | Papel, tarjetas con cinta, polaroids, notas, formas CSS |
| `src/components/BrandBoard/Pin.jsx` | Crear | Tarjeta que "cae" con spring y se queda rotada |
| `src/components/BrandBoard/BbHero.jsx` | Crear | Hero + tablero interactivo de paletas |
| `src/components/BrandBoard/BbIncluded.jsx` | Crear | 6 tarjetas "lo que construimos" con mini-ilustración CSS |
| `src/components/BrandBoard/BbProcess.jsx` | Crear | 4 pasos unidos por un hilo punteado |
| `src/components/BrandBoard/BbCases.jsx` | Crear | Casos como polaroids |
| `src/components/BrandBoard/BbFaq.jsx` | Crear | FAQ en notas adhesivas |
| `src/components/BrandBoard/BbCta.jsx` | Crear | Cierre con diagnóstico por WhatsApp |
| `src/components/Views/ServiceBranding.jsx` | Reescribir | Compone el tablero + SEO |

---

### Task 1: Datos (`brandBoard.js`)

**Files:**
- Create: `src/data/brandBoard.js`

- [ ] **Step 1: Crear el archivo (contenido existente movido + presets)**

```js
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
```

- [ ] **Step 2: Verificar**

Run: `node -e "import('./src/data/brandBoard.js').then(m=>console.log(m.brandPresets.length, m.brandIncluded.length, m.brandSteps.length, m.brandFaq.length))"`
Expected: `3 6 4 4`

- [ ] **Step 3: Commit**

```bash
git add src/data/brandBoard.js
git commit -m "feat(branding): move page copy to data and add palette presets"
```

---

### Task 2: CSS del tablero y primitivo `Pin`

**Files:**
- Create: `src/components/BrandBoard/brandBoard.css`
- Create: `src/components/BrandBoard/Pin.jsx`

- [ ] **Step 1: Crear `brandBoard.css`**

```css
.bb-page {
  --bb-paper: #f6efe3; --bb-ink: #1b1b1b; --bb-red: #c8452d; --bb-tape: rgba(255, 233, 140, 0.8);
  min-height: 100vh; padding: 16vh 5vw 8vw; color: var(--bb-ink); font-family: var(--font-body);
  background: radial-gradient(circle at 20% 10%, rgba(0, 0, 0, 0.03) 0 1px, transparent 1.5px) 0 0 / 14px 14px, var(--bb-paper);
}
.bb-wrap { max-width: var(--container-max); margin: 0 auto; display: flex; flex-direction: column; gap: clamp(3.5rem, 7vw, 6rem); }

/* tipografía */
.bb-kicker { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--text-secondary); }
.bb-h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.8rem, 7vw, 6rem); line-height: 0.98; letter-spacing: -0.02em; margin: 1rem 0; }
.bb-h2 { font-family: var(--font-display); font-weight: 400; font-size: clamp(2rem, 4.5vw, 3.5rem); line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 2.25rem; }
.bb-h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.7rem; line-height: 1.1; margin: 0.75rem 0 0.5rem; }
.bb-lead { color: var(--text-secondary); font-size: clamp(1.05rem, 1.6vw, 1.3rem); line-height: 1.6; max-width: 560px; margin: 0 0 2rem; }
.bb-p { margin: 0; color: var(--text-secondary); line-height: 1.6; }
.bb-btn { display: inline-block; padding: 1.1rem 2.5rem; border-radius: var(--radius-full); background: var(--text-primary); color: var(--bg-deep); text-decoration: none; font-weight: 600; transition: transform 0.2s; }
.bb-btn:hover { transform: translateY(-2px); }
.bb-btn:focus-visible, .bb-link:focus-visible, .bb-preset:focus-visible, .bb-pin summary:focus-visible { outline: 3px solid var(--bb-red); outline-offset: 4px; }

/* tarjeta pegada */
.bb-pin { position: relative; background: #fff; padding: 1.5rem; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 10px 24px rgba(0, 0, 0, 0.12); }
.bb-pin::before { content: ''; position: absolute; top: -12px; left: 50%; width: 84px; height: 26px; transform: translateX(-50%) rotate(-3deg); background: var(--bb-tape); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }
.bb-pin--note { background: #fff3a8; }
.bb-pin--note::before { content: none; }
.bb-grid { display: grid; gap: 1.75rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }

/* hero + tablero interactivo */
.bb-hero { display: grid; gap: 3rem; }
@media (min-width: 900px) { .bb-hero { grid-template-columns: 1.1fr 1fr; align-items: center; } }
.bb-board { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.bb-tile { border-radius: 6px; min-height: 110px; padding: 0.9rem; display: grid; place-items: center; transition: background-color 0.5s, color 0.5s; }
.bb-tile--logo { background: var(--c1); color: var(--c3); font-family: var(--disp); font-weight: var(--wt); font-size: 2rem; }
.bb-tile--swatches { background: var(--c4); display: flex; gap: 0.4rem; flex-wrap: wrap; align-content: center; justify-content: center; }
.bb-tile--swatches i { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); transition: background-color 0.5s; }
.bb-tile--type { background: var(--c5); color: var(--c1); border: 1px solid rgba(0, 0, 0, 0.08); text-align: center; }
.bb-tile--type b { font-family: var(--disp); font-weight: var(--wt); font-size: 2.6rem; line-height: 1; }
.bb-tile--type span { font-size: 0.85rem; color: var(--c2); }
.bb-tile--post { background: var(--c3); color: var(--c1); font-family: var(--disp); font-weight: var(--wt); font-size: 1.5rem; line-height: 1.05; text-align: left; place-items: end start; }
.bb-presets { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-top: 1.25rem; }
.bb-presets-label { font-family: 'Caveat', cursive; font-size: 1.4rem; font-weight: 700; color: var(--bb-red); }
.bb-preset { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 1rem; min-height: 44px; border-radius: var(--radius-full); border: 1.5px solid var(--bb-ink); background: transparent; font: inherit; cursor: pointer; }
.bb-preset[aria-pressed='true'] { background: var(--bb-ink); color: #fff; }
.bb-preset i { width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.6); }

/* mini ilustraciones de "lo que incluye" */
.bb-vis { height: 74px; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.bb-vis span { display: block; }
.bb-vis--diag span { height: 8px; border-radius: 4px; background: var(--bb-ink); opacity: 0.8; }
.bb-vis--diag { flex-direction: column; align-items: flex-start; justify-content: center; }
.bb-vis--narr { font-family: var(--font-display); font-size: 1.15rem; font-style: italic; line-height: 1.15; color: var(--text-secondary); }
.bb-vis--logo .c { width: 52px; height: 52px; border-radius: 50%; background: var(--bb-ink); }
.bb-vis--logo .s { width: 40px; height: 40px; background: var(--bb-red); transform: rotate(12deg); margin-left: -18px; mix-blend-mode: multiply; }
.bb-vis--voz .b { padding: 0.5rem 0.9rem; background: var(--bb-ink); color: #fff; border-radius: 16px 16px 16px 2px; font-size: 0.95rem; }
.bb-vis--manual .bk { width: 52px; height: 66px; background: var(--bb-ink); border-radius: 2px 6px 6px 2px; box-shadow: inset 6px 0 0 rgba(255, 255, 255, 0.25); }
.bb-vis--manual .ln { width: 46px; height: 6px; background: #d8cdb8; border-radius: 3px; box-shadow: 0 12px 0 #d8cdb8, 0 24px 0 #d8cdb8; align-self: flex-start; margin-top: 18px; }
.bb-vis--apps .card { width: 56px; height: 34px; background: var(--bb-ink); border-radius: 3px; }
.bb-vis--apps .ph { width: 30px; height: 58px; border: 3px solid var(--bb-ink); border-radius: 8px; }
.bb-vis--apps .tg { width: 44px; height: 52px; background: var(--bb-red); border-radius: 3px 3px 10px 10px; }

/* proceso */
.bb-steps { position: relative; display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
@media (min-width: 900px) { .bb-steps::before { content: ''; position: absolute; top: 17px; left: 4%; right: 4%; border-top: 2px dashed var(--bb-red); } }
.bb-dot { position: relative; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--bb-red); color: #fff; font-weight: 700; margin-bottom: 0.75rem; }

/* polaroids */
.bb-link { display: block; text-decoration: none; color: inherit; }
.bb-polaroid { padding: 12px 12px 1rem; }
.bb-polaroid img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
.bb-cap { font-family: 'Caveat', cursive; font-size: 1.6rem; font-weight: 700; line-height: 1.05; margin: 0.75rem 0 0.15rem; }
.bb-cap-sub { margin: 0; font-size: 0.95rem; color: var(--text-secondary); }

/* faq y cierre */
.bb-pin summary { cursor: pointer; font-weight: 600; font-size: 1.1rem; }
.bb-pin details p { margin: 0.75rem 0 0; line-height: 1.6; }
.bb-cta { text-align: center; padding: clamp(2rem, 5vw, 4rem); }
.bb-cta .bb-lead { margin-left: auto; margin-right: auto; }

@media (prefers-reduced-motion: reduce) { .bb-tile, .bb-tile--swatches i, .bb-btn { transition: none; } }
```

- [ ] **Step 2: Crear `Pin.jsx`**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Tarjeta pegada que "cae" con spring y queda ligeramente rotada. Con movimiento reducido aparece ya puesta.
export default function Pin({ as = 'div', rotate = 0, delay = 0, note = false, className = '', style, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={`bb-pin${note ? ' bb-pin--note' : ''} ${className}`.trim()}
      initial={reduce ? false : { y: -36, opacity: 0, rotate: rotate + 6 }}
      whileInView={{ y: 0, opacity: 1, rotate }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 16, delay }}
      style={{ rotate, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 4: Commit**

```bash
git add src/components/BrandBoard/brandBoard.css src/components/BrandBoard/Pin.jsx
git commit -m "feat(branding): add board styles and Pin primitive"
```

---

### Task 3: Hero con armador de paletas y página montada

**Files:**
- Create: `src/components/BrandBoard/BbHero.jsx`
- Rewrite: `src/components/Views/ServiceBranding.jsx`

- [ ] **Step 1: Crear `BbHero.jsx`**

```jsx
import React, { useState } from 'react';
import Pin from './Pin';
import { brandHero, brandPresets, BRAND_WA } from '../../data/brandBoard';

export default function BbHero() {
  const [active, setActive] = useState(brandPresets[0].id);
  const p = brandPresets.find((x) => x.id === active);
  const [a, b] = brandHero.title;
  const vars = {
    '--c1': p.colors[0], '--c2': p.colors[1], '--c3': p.colors[2], '--c4': p.colors[3], '--c5': p.colors[4],
    '--disp': p.display, '--wt': p.weight,
  };

  return (
    <section className="bb-hero">
      <div>
        <span className="bb-kicker">{brandHero.kicker}</span>
        <h1 className="bb-h1">{a}<em>{b}</em></h1>
        <p className="bb-lead">{brandHero.sub}</p>
        <a className="bb-btn" href={BRAND_WA} target="_blank" rel="noopener noreferrer">{brandHero.cta}</a>
      </div>
      <div>
        <Pin rotate={-2} style={vars}>
          <div className="bb-board">
            <div className="bb-tile bb-tile--logo">tu marca</div>
            <div className="bb-tile bb-tile--swatches" aria-hidden="true">
              {p.colors.map((c) => <i key={c} style={{ background: c }} />)}
            </div>
            <div className="bb-tile bb-tile--type"><b>Aa</b><span>Se recuerda y se elige</span></div>
            <div className="bb-tile bb-tile--post">Hola, somos tu marca.</div>
          </div>
        </Pin>
        <div className="bb-presets" role="group" aria-label={brandHero.presetsLabel}>
          <span className="bb-presets-label">{brandHero.presetsLabel}</span>
          {brandPresets.map((x) => (
            <button key={x.id} type="button" className="bb-preset" aria-pressed={x.id === active} onClick={() => setActive(x.id)}>
              <i style={{ background: x.colors[2] }} />{x.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Reescribir `ServiceBranding.jsx` (solo hero por ahora)**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import BbHero from '../BrandBoard/BbHero';
import '../BrandBoard/brandBoard.css';

export default function ServiceBranding() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: '#f6efe3' }}>
      <Helmet>
        <title>Branding en Monterrey: identidad y narrativa de marca | Persuasivo</title>
        <meta name="description" content="Identidad de marca, posicionamiento y narrativa para empresas en Monterrey. Una marca que se recuerda y se elige. Solicita un diagnóstico por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/branding" />
      </Helmet>
      <main className="bb-page">
        <div className="bb-wrap">
          <BbHero />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
```

- [ ] **Step 3: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/servicios/branding`.
Expected: papel cálido con puntos sutiles; el tablero "cae" con cinta; al pulsar "Directa" o "Cercana" cambian colores y tipografía del tablero con transición suave; `aria-pressed` cambia; un solo `<h1>`; consola limpia.

- [ ] **Step 4: Commit**

```bash
git add src/components/BrandBoard/BbHero.jsx src/components/Views/ServiceBranding.jsx
git commit -m "feat(branding): board hero with live palette switcher"
```

---

### Task 4: "Lo que construimos contigo" con mini-ilustraciones

**Files:**
- Create: `src/components/BrandBoard/BbIncluded.jsx`
- Modify: `src/components/Views/ServiceBranding.jsx`

- [ ] **Step 1: Crear `BbIncluded.jsx`**

```jsx
import React from 'react';
import Pin from './Pin';
import { brandIncluded } from '../../data/brandBoard';

const visuals = {
  diag: <div className="bb-vis bb-vis--diag" aria-hidden="true"><span style={{ width: '80%' }} /><span style={{ width: '60%' }} /><span style={{ width: '70%' }} /></div>,
  narr: <div className="bb-vis bb-vis--narr" aria-hidden="true">“Hacemos que tu empresa se explique sola.” <small>(ejemplo)</small></div>,
  logo: <div className="bb-vis bb-vis--logo" aria-hidden="true"><span className="c" /><span className="s" /></div>,
  voz: <div className="bb-vis bb-vis--voz" aria-hidden="true"><span className="b">¿Hablamos?</span></div>,
  manual: <div className="bb-vis bb-vis--manual" aria-hidden="true"><span className="bk" /><span className="ln" /></div>,
  apps: <div className="bb-vis bb-vis--apps" aria-hidden="true"><span className="card" /><span className="ph" /><span className="tg" /></div>,
};

export default function BbIncluded() {
  return (
    <section>
      <h2 className="bb-h2">Lo que construimos contigo.</h2>
      <div className="bb-grid">
        {brandIncluded.map((it, i) => (
          <Pin key={it.id} rotate={it.rotate} delay={(i % 3) * 0.08}>
            {visuals[it.id]}
            <h3 className="bb-h3">{it.title}</h3>
            <p className="bb-p">{it.text}</p>
          </Pin>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Montarlo**

En `ServiceBranding.jsx`: `import BbIncluded from '../BrandBoard/BbIncluded';` y, dentro de `.bb-wrap`, después de `<BbHero />`: `<BbIncluded />`.

- [ ] **Step 3: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 6 tarjetas con cinta, cada una con su mini-ilustración, caen escalonadas al hacer scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/BrandBoard/BbIncluded.jsx src/components/Views/ServiceBranding.jsx
git commit -m "feat(branding): add included-items cards with CSS illustrations"
```

---

### Task 5: Proceso + Casos (polaroids)

**Files:**
- Create: `src/components/BrandBoard/BbProcess.jsx`
- Create: `src/components/BrandBoard/BbCases.jsx`
- Modify: `src/components/Views/ServiceBranding.jsx`

- [ ] **Step 1: Crear `BbProcess.jsx`**

```jsx
import React from 'react';
import { brandSteps } from '../../data/brandBoard';

export default function BbProcess() {
  return (
    <section>
      <h2 className="bb-h2">Cómo trabajamos.</h2>
      <div className="bb-steps">
        {brandSteps.map(([n, t, d]) => (
          <div key={n}>
            <span className="bb-dot" aria-hidden="true">{n.replace(/^0/, '')}</span>
            <h3 className="bb-h3">{t}</h3>
            <p className="bb-p">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear `BbCases.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Pin from './Pin';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { brandCaseSlugs } from '../../data/brandBoard';

export default function BbCases() {
  const cases = brandCaseSlugs.map(getProjectBySlug).filter(Boolean);
  if (!cases.length) return null;
  return (
    <section>
      <h2 className="bb-h2">Marcas que ya cuentan mejor su historia.</h2>
      <div className="bb-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))' }}>
        {cases.map((c, i) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="bb-link">
            <Pin rotate={i % 2 ? 2.2 : -2.2} className="bb-polaroid" delay={i * 0.1}>
              {c.img && <img src={c.img} alt={c.title} loading="lazy" />}
              <p className="bb-cap">{c.title}</p>
              <p className="bb-cap-sub">{c.metric} →</p>
            </Pin>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceBranding.jsx` importar `BbProcess` y `BbCases` y agregar, después de `<BbIncluded />`:

```jsx
          <BbProcess />
          <BbCases />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: hilo rojo punteado que une los 4 pasos en escritorio (sin hilo en móvil); polaroids rotadas en sentidos opuestos, clic lleva a `/work/<slug>`.

- [ ] **Step 5: Commit**

```bash
git add src/components/BrandBoard/BbProcess.jsx src/components/BrandBoard/BbCases.jsx src/components/Views/ServiceBranding.jsx
git commit -m "feat(branding): add process thread and polaroid cases"
```

---

### Task 6: FAQ (notas adhesivas) + Cierre

**Files:**
- Create: `src/components/BrandBoard/BbFaq.jsx`
- Create: `src/components/BrandBoard/BbCta.jsx`
- Modify: `src/components/Views/ServiceBranding.jsx`

- [ ] **Step 1: Crear `BbFaq.jsx`**

```jsx
import React from 'react';
import Pin from './Pin';
import { brandFaq } from '../../data/brandBoard';

const tilt = [-1.2, 1, 1.4, -1];

export default function BbFaq() {
  return (
    <section>
      <h2 className="bb-h2">Preguntas frecuentes</h2>
      <div className="bb-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {brandFaq.map(([q, a], i) => (
          <Pin key={q} note rotate={tilt[i % tilt.length]}>
            <details>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          </Pin>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear `BbCta.jsx`**

```jsx
import React from 'react';
import Pin from './Pin';
import { brandCta, BRAND_WA } from '../../data/brandBoard';

export default function BbCta() {
  return (
    <section>
      <Pin rotate={-1} className="bb-cta">
        <h2 className="bb-h2" style={{ marginBottom: '1.25rem' }}>{brandCta.title}</h2>
        <p className="bb-lead">{brandCta.text}</p>
        <a className="bb-btn" href={BRAND_WA} target="_blank" rel="noopener noreferrer">{brandCta.button}</a>
      </Pin>
    </section>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceBranding.jsx` importar `BbFaq` y `BbCta` y agregar, después de `<BbCases />`:

```jsx
          <BbFaq />
          <BbCta />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 4 notas amarillas con preguntas que abren/cierran con teclado; cierre con botón a WhatsApp.

- [ ] **Step 5: Commit**

```bash
git add src/components/BrandBoard/BbFaq.jsx src/components/BrandBoard/BbCta.jsx src/components/Views/ServiceBranding.jsx
git commit -m "feat(branding): add sticky-note FAQ and closing CTA, page complete"
```

---

### Task 7: Pulido y verificación final

**Files:**
- Modify: `src/components/BrandBoard/brandBoard.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: el tablero y las tarjetas caen una vez al hacer scroll; ningún texto queda tapado por la cinta; el hilo punteado queda a la altura de los círculos numerados; cambiar de paleta no mueve el layout.

- [ ] **Step 2: Móvil (375 px)**

Checklist: sin scroll horizontal (`document.documentElement.scrollWidth === innerWidth`); botones y presets ≥44 px de alto; las tarjetas no se rotan de forma que se salgan del borde (si se salen, reducir `rotate` o `padding` lateral en `.bb-page`).

- [ ] **Step 3: Movimiento reducido y teclado**

Con "reducir movimiento" activo: las tarjetas aparecen ya puestas, sin caída. Con Tab: foco visible (contorno rojo) en CTA, presets, polaroids y resúmenes del FAQ; Enter/Espacio activan presets y abren las preguntas.

- [ ] **Step 4: Build limpio y regresiones**

Run: `npm run build`
Expected: `✓ built in`. Consola sin errores. Verificar que la home sigue enlazando a `/servicios/branding` y que `/servicios/ecosistemas` no cambió.

- [ ] **Step 5: ¿Vende?**

Sin leer instrucciones: ¿se entiende qué es branding, qué incluye y cómo pedir el diagnóstico? Hay dos botones de diagnóstico (hero y cierre), ambos a WhatsApp. Si falta claridad, ajustar copy en `src/data/brandBoard.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(branding): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura:** tablero de marca (Tasks 2–6), interactividad creativa que enseña el servicio (armador de paletas, Task 3), contenido existente conservado y movido a datos (Task 1), venta/conversión (qué incluye, proceso, casos, FAQ, 2 CTAs a WhatsApp), SEO igual que antes (Helmet con mismo título/descripción/canonical, un solo `<h1>`), accesibilidad y móvil (Task 7).
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `brandHero`, `brandPresets`, `brandIncluded`, `brandSteps`, `brandFaq`, `brandCaseSlugs`, `brandCta`, `BRAND_WA` (Task 1) se usan igual en Tasks 3–6; clases `.bb-*` de Task 2 antes de usarse; `Pin` acepta `as`, `rotate`, `delay`, `note`, `className`, `style`.
- **Riesgos conocidos:** `Pin` usa `motion[as]` (solo `div` en este plan). La rotación la aplica Framer en línea, así que no se puede anular con CSS; si en móvil las rotaciones hacen que las tarjetas se salgan del borde, hay que reducir el `rotate` en los datos o agregar `padding` lateral a `.bb-page` (Task 7, Step 2).
