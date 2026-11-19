# Redes como parrilla 3×3 con ventana Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reacomodar `/servicios/autoridad` (ya hecha como feed vertical, ver [plan anterior](2026-11-19-redes-feed-page.md)) en una **parrilla de perfil 3×3 estilo Instagram**, con el mismo estilo (gris claro, blanco y lima). Arriba va el encabezado de perfil con "historias destacadas"; abajo, 9 celdas cuadradas. Al tocar una celda se abre esa publicación **en una ventana** (con las mismas interacciones de hoy); las 3 celdas de casos llevan directo a su caso. La experiencia es la de hacer scroll por el perfil de la agencia: los posts explican **qué incluye** el servicio, **cómo funciona** para el cliente y **cómo contratarlo** (la información es la de hoy con otro enfoque creativo; la celda "Cómo contratar" reúne los pasos para empezar).

**Architecture:** Se reutilizan tal cual los posts existentes (`FpHero`, `FpCarousel`, `FpPoll`, `FpCalendar`, `FpComments`, `FpCta`) como contenido de las ventanas. La ventana usa el elemento nativo `<dialog>` con `showModal()`: da gratis Escape, bloqueo del fondo, atrapar el foco y devolverlo al cerrar. Todas las ventanas se montan siempre (cerradas) para que el texto siga en el DOM, por SEO. `FpGrid` guarda cuál está abierta (`useState`). Las portadas de las celdas se dibujan con CSS (sin assets nuevos; los casos usan `/showcase/auth1-3.jpg`).

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7. Sin dependencias nuevas.

**Qué cambia respecto al feed vertical:**
- Se eliminan `FpProfile.jsx` (barra fija) y `FpStories.jsx` (post de historias): el perfil pasa a ser un encabezado y las historias son "destacadas" dentro de él.
- El `<h1>` sube al encabezado de perfil; `FpHero` pasa a `<h2>` (sigue habiendo un solo `<h1>`).
- `Post` recibe un contexto para no animar su entrada dentro de la ventana.

**Orden de la parrilla (los casos con foto quedan en diagonal, como un perfil real):**
`Diagnóstico · Caso 1 · Qué hacemos` / `Encuesta · Calendario · Caso 2` / `Caso 3 · Preguntas · Hablemos`

**Fuera de alcance (a propósito):** enlace directo a una ventana (`?p=`), flechas anterior/siguiente dentro de la ventana, contadores o likes (no se inventan cifras), pestañas del perfil.

**Riesgos a confirmar:**
- Los mismos del plan anterior: cifra "85% / 75%" del FAQ y precio "desde $12,000 MXN al mes", que siguen viniendo de `servicesData.js`.
- Los 3 pasos de "Cómo contratar" (escribir por WhatsApp, sesión de onboarding, producción y calendario del mes) los redacto a partir del FAQ actual ("una sesión inicial de onboarding… todo es producción interna") y de las capacidades del servicio. Abraham debe confirmar que así es como se contrata hoy.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/servicios/autoridad`; esperar ~8 s tras navegar (el sitio tiene un fundido de entrada lento en el panel).
3. Revisar a 1280 px y a 375 px (sin scroll horizontal; las celdas se ven cuadradas).
4. Los imports en `src/data/*.js` usan extensión `.js`.

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/feedPage.js` | Modificar | Perfil con 2.º botón y `feedTiles` (orden de la parrilla) |
| `src/components/FeedPage/feedPage.css` | Modificar | Quitar barra fija y feed; añadir encabezado, parrilla, celdas y ventana |
| `src/components/FeedPage/Post.jsx` | Modificar | Contexto `InstantContext` (sin animación de entrada en la ventana) |
| `src/components/FeedPage/FpHero.jsx` | Modificar | Título como `<h2>` |
| `src/components/FeedPage/FpCta.jsx` | Modificar | Pasos de "Cómo contratar" antes del botón |
| `src/components/FeedPage/FpModal.jsx` | Crear | Ventana con `<dialog>` |
| `src/components/FeedPage/FpProfileHeader.jsx` | Crear | Encabezado: avatar, botones, bio con `<h1>` y destacadas |
| `src/components/FeedPage/FpGrid.jsx` | Crear | Parrilla 3×3 + ventanas |
| `src/components/FeedPage/FpProfile.jsx` | Eliminar | Sustituido por el encabezado |
| `src/components/FeedPage/FpStories.jsx` | Eliminar | Sustituido por las destacadas |
| `src/components/Views/ServiceAuthority.jsx` | Reescribir | Compone encabezado + parrilla |

---

### Task 1: Datos (perfil y `feedTiles`)

**Files:**
- Modify: `src/data/feedPage.js`

- [ ] **Step 1: Reemplazar el bloque `feedProfile` y agregar `FEED_WA_MSG`**

En `src/data/feedPage.js`, reemplazar:

```js
export const feedProfile = {
  name: 'persuasivo.mx',
  role: 'Copywriting & Redes',
  follow: 'Seguir',
  followLabel: 'Escribir por WhatsApp',
};
```

por:

```js
export const FEED_WA_MSG = waLink('Hola, quiero un diagnóstico de mis redes sociales');

export const feedProfile = {
  name: 'persuasivo.mx',
  role: 'Copywriting & Redes',
  follow: 'Seguir',
  followLabel: 'Seguir: escribir por WhatsApp',
  message: 'Mensaje',
  messageLabel: 'Enviar mensaje por WhatsApp',
};
```

- [ ] **Step 2: Agregar `feedTiles` al final del archivo**

```js
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
```

- [ ] **Step 3: Reemplazar `feedCta` para incluir los pasos de contratación**

En `src/data/feedPage.js`, reemplazar todo el bloque `export const feedCta = { ... };` por:

```js
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
```

- [ ] **Step 4: Verificar**

Run:
```bash
node -e "import('./src/data/feedPage.js').then(m=>{const modal=m.feedTiles.filter(t=>t.kind==='modal').map(t=>t.id).sort().join();console.log(m.feedTiles.length, m.feedTiles.filter(t=>t.kind==='case').every(t=>t.slug), modal, m.feedCta.steps.length)})"
```
Expected: `9 true calendar,carousel,cta,faq,hero,poll 3`

- [ ] **Step 5: Commit**

```bash
git add src/data/feedPage.js
git commit -m "feat(redes): add profile message button and grid tile order"
```

---

### Task 2: CSS (parrilla, encabezado y ventana)

**Files:**
- Modify: `src/components/FeedPage/feedPage.css`

- [ ] **Step 1: Quitar las reglas que ya no se usan**

En `feedPage.css` eliminar estas reglas completas: `.fp-feed { ... }`, el bloque `/* perfil fijo */` con sus reglas `.fp-profile`, el `@media (min-width: 640px) { .fp-profile { ... } }`, `.fp-profile-id`, `.fp-profile-id strong` y `.fp-profile-id span`. **Conservar** `.fp-follow` y `.fp-avatar`. Quitar también `.fp-follow:focus-visible,` de la regla de foco solo si rompe la sintaxis; si no, dejarla.

Run: `grep -n "fp-profile\|\.fp-feed" src/components/FeedPage/feedPage.css`
Expected: sin resultados.

- [ ] **Step 2: Agregar al final del archivo**

```css
/* ===== parrilla estilo perfil ===== */
.fp-wrap { max-width: 640px; margin: 0 auto; }

.fp-ph { display: grid; grid-template-columns: auto 1fr; gap: 1rem 1.25rem; align-items: center; padding: 1.5rem 0 0.5rem; }
.fp-ph .fp-avatar { width: 84px; height: 84px; font-size: 2.2rem; }
@media (min-width: 640px) { .fp-ph .fp-avatar { width: 120px; height: 120px; font-size: 3rem; } }
.fp-ph-name { font-weight: 700; font-size: 1.15rem; margin: 0 0 0.6rem; }
.fp-ph-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.fp-follow--ghost { background: transparent; color: var(--fp-ink); border: 1.5px solid var(--fp-ink); }
.fp-ph-bio { grid-column: 1 / -1; }
.fp-ph-role { color: var(--text-secondary); font-size: 0.9rem; margin: 0 0 0.25rem; }
.fp-ph-bio .fp-h1 { margin: 0 0 0.75rem; }

.fp-grid { list-style: none; padding: 0; margin: 1.25rem 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
.fp-tile { position: relative; display: block; width: 100%; aspect-ratio: 1; padding: 0; border: 0; overflow: hidden; border-radius: 4px; cursor: pointer; text-decoration: none; color: var(--fp-ink); background: #fff; font: inherit; text-align: left; }
.fp-tile-cover { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 0.35rem; padding: 0.6rem 0.6rem 1.9rem; transition: filter 0.2s; }
.fp-tile-cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fp-tile:hover .fp-tile-cover, .fp-tile:focus-visible .fp-tile-cover { filter: brightness(0.92); }
.fp-tile:focus-visible { outline: 3px solid var(--fp-ink); outline-offset: 2px; }
.fp-tile-label { position: absolute; left: 6px; bottom: 6px; z-index: 1; max-width: calc(100% - 12px); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); background: rgba(255, 255, 255, 0.94); color: var(--fp-ink); font-size: 0.68rem; font-weight: 700; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (min-width: 640px) { .fp-tile-label { font-size: 0.8rem; } }
.fp-tile--lime .fp-tile-cover { background: var(--fp-lime); }
.fp-tile--dark .fp-tile-cover { background: #111; color: #fff; }
.fp-tile--gray .fp-tile-cover { background: #e5e7eb; }
.fp-tile--white .fp-tile-cover { background: #fff; border: 1px solid var(--fp-line); }
.fp-tile-text { font-family: var(--font-display); font-size: clamp(0.85rem, 3.2vw, 1.3rem); line-height: 1.05; }
.fp-tile-big { font-family: var(--font-display); font-size: clamp(1.8rem, 8vw, 3.2rem); line-height: 1; }
.fp-pills i { display: block; height: 14px; border: 1.5px solid var(--fp-ink); border-radius: 8px; }
.fp-mini { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3px; align-content: center; }
.fp-mini i { display: block; aspect-ratio: 1; border-radius: 2px; }

/* ventana */
body:has(dialog.fp-modal[open]) { overflow: hidden !important; }
.fp-modal { border: 0; padding: 0; width: min(560px, 94vw); max-height: 90vh; overflow: auto; border-radius: 18px; background: #fff; color: var(--fp-ink); }
.fp-modal::backdrop { background: rgba(17, 17, 17, 0.6); backdrop-filter: blur(3px); }
.fp-modal[open] { animation: fp-pop 0.25s ease-out; }
@keyframes fp-pop { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
.fp-modal .fp-post { border: 0; border-radius: 0; box-shadow: none; }
.fp-modal-bar { position: sticky; top: 0; z-index: 2; display: flex; justify-content: flex-end; padding: 0.25rem 0.5rem 0; background: #fff; }
.fp-modal-x { width: 44px; height: 44px; border: 0; border-radius: 50%; background: transparent; font-size: 1.8rem; line-height: 1; cursor: pointer; color: var(--fp-ink); }
.fp-modal-x:focus-visible { outline: 3px solid var(--fp-ink); outline-offset: 2px; }

/* pasos de "Cómo contratar" */
.fp-steps { list-style: none; padding: 0; margin: 0 0 1rem; display: grid; gap: 0.75rem; }
.fp-steps li { display: flex; gap: 0.75rem; align-items: flex-start; }
.fp-steps b { display: grid; place-items: center; width: 28px; height: 28px; flex: none; border-radius: 50%; background: var(--fp-lime); font-size: 0.9rem; }
.fp-steps strong { display: block; }
.fp-steps span { color: var(--text-secondary); font-size: 0.95rem; }

@media (prefers-reduced-motion: reduce) { .fp-modal[open] { animation: none; } .fp-tile-cover { transition: none; } }
```

- [ ] **Step 3: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 4: Commit**

```bash
git add src/components/FeedPage/feedPage.css
git commit -m "feat(redes): add profile header, 3x3 grid and dialog styles"
```

---

### Task 3: `FpModal`, contexto en `Post` y `FpHero` como `<h2>`

**Files:**
- Create: `src/components/FeedPage/FpModal.jsx`
- Modify: `src/components/FeedPage/Post.jsx`
- Modify: `src/components/FeedPage/FpHero.jsx`
- Modify: `src/components/FeedPage/FpCta.jsx`

- [ ] **Step 1: Crear `FpModal.jsx`**

```jsx
import React, { useEffect, useRef } from 'react';
import { InstantContext } from './Post';

// Ventana con <dialog> nativo: Escape, fondo inerte, foco atrapado y devuelto al cerrar.
// El contenido siempre está montado (cerrado no se ve) para que el texto siga en el DOM.
export default function FpModal({ open, onClose, label, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog ref={ref} className="fp-modal" aria-label={label} onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div>
        <div className="fp-modal-bar">
          <button type="button" className="fp-modal-x" aria-label="Cerrar" onClick={onClose}>×</button>
        </div>
        <InstantContext.Provider value>{children}</InstantContext.Provider>
      </div>
    </dialog>
  );
}
```

- [ ] **Step 2: Modificar `Post.jsx` para respetar el contexto**

Reemplazar la primera línea de imports y la cabecera del componente. El archivo debe quedar así hasta el `return`:

```jsx
import React, { createContext, useContext, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// true dentro de la ventana: el post aparece ya puesto, sin animación de entrada.
export const InstantContext = createContext(false);

// Publicación. El "me gusta" es solo un gesto: no hay contadores ni datos inventados.
export default function Post({ meta, children, tags }) {
  const reduce = useReducedMotion();
  const instant = useContext(InstantContext);
  const [liked, setLiked] = useState(false);
  return (
    <motion.article className="fp-post"
      initial={reduce || instant ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
```

El resto del archivo (de `viewport={{ once: true, margin: '-8% 0px' }} ...` hasta el final) no cambia.

- [ ] **Step 3: Cambiar el título de `FpHero` a `<h2>`**

En `FpHero.jsx`, reemplazar `<h1 className="fp-h1">{feedHero.title}</h1>` por:

```jsx
      <h2 className="fp-h1">{feedHero.title}</h2>
```

- [ ] **Step 4: Mostrar los pasos en `FpCta`**

Reemplazar todo el contenido de `src/components/FeedPage/FpCta.jsx` por:

```jsx
import React from 'react';
import Post from './Post';
import { feedCta, FEED_WA } from '../../data/feedPage';

export default function FpCta() {
  return (
    <Post meta={feedCta.meta}>
      <h2 className="fp-h2">{feedCta.title}</h2>
      <ol className="fp-steps">
        {feedCta.steps.map(([t, d], i) => (
          <li key={t}><b>{i + 1}</b><div><strong>{t}</strong><span>{d}</span></div></li>
        ))}
      </ol>
      <p className="fp-p">{feedCta.text}</p>
      <a className="fp-btn" href={FEED_WA} target="_blank" rel="noopener noreferrer">{feedCta.button}</a>
      <p className="fp-p" style={{ margin: '1rem 0 0', fontSize: '0.9rem' }}>{feedCta.price}</p>
    </Post>
  );
}
```

- [ ] **Step 5: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 6: Commit**

```bash
git add src/components/FeedPage/FpModal.jsx src/components/FeedPage/Post.jsx src/components/FeedPage/FpHero.jsx src/components/FeedPage/FpCta.jsx
git commit -m "feat(redes): add dialog modal, instant Post context, h2 hero and how-to-hire steps"
```

---

### Task 4: Encabezado de perfil con destacadas

**Files:**
- Create: `src/components/FeedPage/FpProfileHeader.jsx`

- [ ] **Step 1: Crear `FpProfileHeader.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { feedProfile, feedHero, feedStories, FEED_WA, FEED_WA_MSG } from '../../data/feedPage';

export default function FpProfileHeader() {
  const cases = feedStories.slugs.map(getProjectBySlug).filter(Boolean);
  return (
    <header className="fp-ph">
      <span className="fp-avatar" aria-hidden="true">P</span>
      <div>
        <p className="fp-ph-name">{feedProfile.name}</p>
        <div className="fp-ph-actions">
          <a className="fp-follow" href={FEED_WA} target="_blank" rel="noopener noreferrer" aria-label={feedProfile.followLabel}>
            {feedProfile.follow}
          </a>
          <a className="fp-follow fp-follow--ghost" href={FEED_WA_MSG} target="_blank" rel="noopener noreferrer" aria-label={feedProfile.messageLabel}>
            {feedProfile.message}
          </a>
        </div>
      </div>
      <div className="fp-ph-bio">
        <p className="fp-ph-role">{feedProfile.role}</p>
        <h1 className="fp-h1">{feedHero.title}</h1>
        <p className="fp-p">{feedHero.sub}</p>
        {cases.length > 0 && (
          <div className="fp-stories">
            {cases.map((c) => (
              <Link key={c.id} to={`/work/${c.slug}`} className="fp-story">
                <span className="fp-ring">{c.img && <img src={c.img} alt="" loading="lazy" />}</span>
                {c.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/FeedPage/FpProfileHeader.jsx
git commit -m "feat(redes): add profile header with highlights"
```

---

### Task 5: Parrilla 3×3 y página reescrita

**Files:**
- Create: `src/components/FeedPage/FpGrid.jsx`
- Rewrite: `src/components/Views/ServiceAuthority.jsx`
- Delete: `src/components/FeedPage/FpProfile.jsx`, `src/components/FeedPage/FpStories.jsx`

- [ ] **Step 1: Crear `FpGrid.jsx`**

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FpModal from './FpModal';
import FpHero from './FpHero';
import FpCarousel from './FpCarousel';
import FpPoll from './FpPoll';
import FpCalendar from './FpCalendar';
import FpComments from './FpComments';
import FpCta from './FpCta';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { feedTiles, feedCalendar as cal, feedHero, feedCarousel } from '../../data/feedPage';

const content = { hero: FpHero, carousel: FpCarousel, poll: FpPoll, calendar: FpCalendar, faq: FpComments, cta: FpCta };

// Portada de cada celda, dibujada con CSS. Decorativa: el nombre accesible es la etiqueta.
function Cover({ id }) {
  switch (id) {
    case 'hero':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-text">{feedHero.title}</span></span>;
    case 'carousel':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-big">01</span><span className="fp-tile-text">{feedCarousel.title}</span></span>;
    case 'poll':
      return <span aria-hidden="true" className="fp-tile-cover fp-pills"><span className="fp-tile-text">¿Qué te frena?</span><i /><i /><i /></span>;
    case 'calendar':
      return (
        <span aria-hidden="true" className="fp-tile-cover fp-mini">
          {Array.from({ length: cal.weeks * cal.dayHeads.length }, (_, i) => {
            const w = Math.floor(i / cal.dayHeads.length);
            const d = i % cal.dayHeads.length;
            return <i key={i} className={`fp-day--${cal.types[(w + d) % cal.types.length].id}`} />;
          })}
        </span>
      );
    case 'faq':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-big">?</span></span>;
    case 'cta':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-big">→</span><span className="fp-tile-text">Empieza aquí</span></span>;
    default:
      return null;
  }
}

export default function FpGrid() {
  const [open, setOpen] = useState(null);
  const modalTiles = feedTiles.filter((t) => t.kind === 'modal');

  return (
    <>
      <ul className="fp-grid">
        {feedTiles.map((t) => {
          if (t.kind === 'case') {
            const c = getProjectBySlug(t.slug);
            if (!c) return null;
            return (
              <li key={t.id}>
                <Link to={`/work/${c.slug}`} className="fp-tile">
                  <span aria-hidden="true" className="fp-tile-cover">{c.img && <img src={c.img} alt="" loading="lazy" />}</span>
                  <span className="fp-tile-label">{c.title}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={t.id}>
              <button type="button" className={`fp-tile fp-tile--${t.tone}`} aria-haspopup="dialog" onClick={() => setOpen(t.id)}>
                <Cover id={t.id} />
                <span className="fp-tile-label">{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {modalTiles.map((t) => {
        const Content = content[t.id];
        return (
          <FpModal key={t.id} label={t.label} open={open === t.id}
            onClose={() => setOpen((cur) => (cur === t.id ? null : cur))}>
            <Content />
          </FpModal>
        );
      })}
    </>
  );
}
```

- [ ] **Step 2: Reescribir `ServiceAuthority.jsx`**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import FpProfileHeader from '../FeedPage/FpProfileHeader';
import FpGrid from '../FeedPage/FpGrid';
import '../FeedPage/feedPage.css';

export default function ServiceAuthority({ setView }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Gestión de redes sociales y copywriting en Monterrey | Persuasivo</title>
        <meta name="description" content="Copywriting, identidad visual y gestión de redes sociales para empresas en Monterrey. Contenido que posiciona tu marca y educa a tu prospecto. Solicita un diagnóstico por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/autoridad" />
      </Helmet>
      <main className="fp-page">
        <div className="fp-wrap">
          <FpProfileHeader />
          <FpGrid />
        </div>
      </main>
      <Footer setView={setView} />
    </motion.div>
  );
}
```

- [ ] **Step 3: Eliminar los componentes sustituidos**

```bash
git rm src/components/FeedPage/FpProfile.jsx src/components/FeedPage/FpStories.jsx
grep -rn "FpProfile'\|FpStories" src || echo "sin referencias"
```
Expected: `sin referencias`

- [ ] **Step 4: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/servicios/autoridad`.
Expected:
- Encabezado con avatar, "Seguir" y "Mensaje" (abren WhatsApp), bio con el `<h1>` y 3 destacadas.
- Parrilla de 9 celdas cuadradas con etiqueta en cada una; las 3 con foto llevan a `/work/<slug>`.
- Al tocar "Qué hacemos": se abre la ventana con el carrusel funcionando; Escape la cierra y el foco vuelve a la celda.
- "Encuesta": elegir una opción muestra la respuesta lima; clic en el fondo oscuro cierra la ventana.
- "Calendario", "Preguntas", "Diagnóstico" y "Hablemos" abren su contenido; consola sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeedPage/FpGrid.jsx src/components/Views/ServiceAuthority.jsx
git commit -m "feat(redes): 3x3 grid page with dialog posts, replace vertical feed"
```

---

### Task 6: Pulido y verificación final

**Files:**
- Modify: `src/components/FeedPage/feedPage.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: la parrilla (640 px) queda centrada; las celdas son cuadradas; las etiquetas no tapan el texto de las portadas; la ventana queda centrada con el fondo oscurecido y no hay scroll de la página detrás mientras está abierta.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth`; las 9 celdas caben en 3 columnas; el texto de las portadas (`Diagnóstico`, `Qué hacemos`) no se desborda de la celda; la ventana ocupa ~94 % del ancho, se desplaza por dentro si es alta y el botón × mide ≥44 px.

- [ ] **Step 3: Teclado y lector de pantalla**

Con Tab: foco visible en cada celda; Enter/Espacio abren la ventana; dentro de ella Tab no sale al fondo (foco atrapado); Escape cierra y el foco vuelve a la celda que la abrió. Con movimiento reducido: la ventana aparece sin animación.

- [ ] **Step 4: SEO y regresiones**

Comprobar en la consola del navegador que el texto de las ventanas cerradas sigue en el DOM y que hay un solo `<h1>`:

```js
({ h1: document.querySelectorAll('h1').length, dialogs: document.querySelectorAll('dialog.fp-modal').length, faqInDom: document.body.textContent.includes('¿Cuánto cuesta la gestión de redes') })
```
Expected: `{ h1: 1, dialogs: 6, faqInDom: true }`.
Run: `npm run build` → `✓ built in`. La home sigue enlazando a `/servicios/autoridad`; `/servicios/branding`, `/servicios/ecosistemas` y `/contenido` sin cambios.

- [ ] **Step 5: ¿Vende?**

Sin guía: ¿se entiende en un vistazo qué hace Persuasivo por las redes y cómo pedir el diagnóstico? Accesos a WhatsApp: "Seguir", "Mensaje" y el botón dentro de "Diagnóstico" y "Cómo contratar". Al recorrer las celdas en orden, ¿se entiende qué incluye, cómo funciona y cómo contratarlo? Si falta claridad, ajustar copy en `src/data/feedPage.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(redes): grid responsive, dialog a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura del pedido:** parrilla 3×3 tipo Instagram con el estilo ya diseñado (Tasks 2 y 5), publicaciones que abren en ventana (Tasks 3 y 5), mismas interacciones (se reutilizan los posts), casos como fotos en la parrilla, perfil con destacadas (Task 4), SEO y un solo `<h1>` (Tasks 3 y 6), accesibilidad y móvil (Task 6).
- **Placeholders:** ninguno; el código está completo. Los dos cambios en archivos existentes (`Post.jsx`, `FpHero.jsx`, `feedPage.js`, `feedPage.css`) indican el texto exacto a reemplazar o las reglas exactas a quitar.
- **Consistencia de nombres:** `feedTiles` (ids `hero, case0, carousel, poll, calendar, case1, case2, faq, cta`), `FEED_WA_MSG`, `feedProfile.message/messageLabel` (Task 1) coinciden con `FpGrid` y `FpProfileHeader`; `InstantContext` exportado en `Post.jsx` e importado en `FpModal`; clases `.fp-ph*`, `.fp-grid`, `.fp-tile*`, `.fp-modal*` definidas en Task 2 antes de usarse; `fp-day--<tipo>` reutiliza las clases de color del calendario.
- **Riesgos conocidos:** `body:has(...)` necesita `!important` porque `GlassNavbar` fija `overflow` en línea; `<dialog>` requiere Safari 15.4+ / Chrome 37+ (cubre los navegadores actuales); al reescribir `Post.jsx` hay que conservar intacto el resto del archivo (viewport, transición, cabecera y pie con el botón "me gusta").
