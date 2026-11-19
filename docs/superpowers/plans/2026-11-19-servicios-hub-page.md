# Página Servicios (directorio que te manda al servicio correcto) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/servicios` como un **directorio corto que te manda al servicio correcto**: un selector "¿Qué necesitas hoy?" que recomienda una combinación de servicios, 5 tarjetas con una miniatura del estilo de cada página (boceto, tablero, película, parrilla, ventana de búsqueda), una línea "Cómo se conectan" y el diagnóstico como cierre. Reemplaza la página larga actual, que repetía en cada servicio lo que ya cuentan las páginas internas.

**Architecture:** Mismo método que las demás páginas: texto en HTML real (SEO, accesible, responsivo), creatividad en CSS + Framer Motion, y copy en `src/data/hub.js` tomado de `servicesData.js` (descripciones, `businessTrans`, rutas) sin duplicarlo. El único estado es el objetivo elegido (`goalId`), que vive en `ExpertiseHub.jsx` y lo comparten el selector (`HubGoals`) y las tarjetas (`HubCards`). Las miniaturas se dibujan con CSS. El JSON-LD de `ItemList` con los 5 servicios se conserva.

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async. Sin dependencias ni assets nuevos.

**Qué se corrige de la página actual:** FAQ vacíos en Branding y Contenido en video, íconos de emoji, y una longitud excesiva que duplicaba las páginas internas.

**Fuera de alcance (a propósito):** guardar la elección en la URL, más de 4 objetivos, buscador, rediseño de otras páginas. La ruta `/servicios` y los anclas `#<slug>` de cada servicio se conservan (cada tarjeta lleva `id={slug}`).

**Cambios de copy a confirmar:**
- Título SEO: de "Servicios — Desarrollo Web, Meta Ads & Copywriting" a "Servicios — Branding, Web, Video, Redes y Meta Ads | Persuasivo", y la meta descripción pasa a mencionar los 5 servicios.
- Las líneas de "Cómo se conectan" (Defines quién eres · Tu casa digital, donde se cierra la venta · Explicas qué vendes · Construyes autoridad · Llegas a más clientes) las redacto a partir de las descripciones de cada servicio.
- Los precios "desde" son los que ya publican las páginas de servicio: Web $35,000 MXN; Redes $12,000 MXN al mes; Ads $15,000 MXN al mes más presupuesto publicitario. Branding y Video dicen "Según diagnóstico" porque no tienen precio publicado.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/servicios`; esperar ~10 s tras navegar (el sitio tiene un fundido de entrada lento en el panel).
3. Revisar a 1280 px y a 375 px (sin scroll horizontal).
4. Los imports en `src/data/*.js` usan extensión `.js`.
5. `grep -rn "servicios#" src` para ver si algún enlace usa anclas; deben seguir funcionando (`id={slug}` en cada tarjeta).

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/hub.js` | Crear | Objetivos, servicios en orden con precio y rol, cierre |
| `src/components/ServicesHub/hub.css` | Crear | Estilos de selector, tarjetas, miniaturas y recorrido |
| `src/components/ServicesHub/HubMini.jsx` | Crear | 5 miniaturas dibujadas con CSS |
| `src/components/ServicesHub/HubCards.jsx` | Crear | Las 5 tarjetas con resaltado de recomendados |
| `src/components/ServicesHub/HubGoals.jsx` | Crear | Selector "¿Qué necesitas hoy?" y recomendación |
| `src/components/ServicesHub/HubJourney.jsx` | Crear | "Cómo se conectan" |
| `src/components/Views/ExpertiseHub.jsx` | Reescribir | Compone todo + SEO + JSON-LD |

---

### Task 1: Datos (`hub.js`)

**Files:**
- Create: `src/data/hub.js`

- [ ] **Step 1: Crear el archivo**

```js
import { waLink } from './contact.js';
import { getServiceById } from './servicesData.js';

export const hubIntro = {
  kicker: 'Servicios',
  title: '¿Qué hacemos en Persuasivo?',
  sub: 'Disciplinas complementarias. Un solo objetivo: que tu negocio facture más con menos fricción.',
};

// Los 5 servicios en el orden en que se conectan. El texto sale de servicesData.js.
export const hubServices = [
  { id: 'branding', mini: 'branding', price: 'Según diagnóstico', role: 'Defines quién eres' },
  { id: 'ecosistemas', mini: 'web', price: 'Desde $35,000 MXN', role: 'Tu casa digital, donde se cierra la venta' },
  { id: 'contenido', mini: 'video', price: 'Según diagnóstico', role: 'Explicas qué vendes' },
  { id: 'autoridad', mini: 'feed', price: 'Desde $12,000 MXN al mes', role: 'Construyes autoridad' },
  { id: 'trafico', mini: 'search', price: 'Desde $15,000 MXN al mes, más presupuesto publicitario', role: 'Llegas a más clientes' },
].map((s) => {
  const d = getServiceById(s.id);
  return { ...s, slug: d.slug, title: d.title, subtitle: d.subtitle, desc: d.desc, why: d.businessTrans, to: d.routePath };
});

export const hubGoals = [
  { id: 'pro', label: 'Quiero verme profesional', ids: ['branding', 'ecosistemas'] },
  { id: 'clientes', label: 'Quiero más clientes ya', ids: ['trafico', 'ecosistemas'] },
  { id: 'experto', label: 'Quiero que me reconozcan como experto', ids: ['contenido', 'autoridad'] },
  {
    id: 'nose', label: 'No sé por dónde empezar', ids: [],
    note: 'Cuéntanos tu caso: en un diagnóstico gratuito de 30 minutos te decimos por dónde empezar y qué combinación tiene sentido.',
  },
];

export const hubGoalsCopy = {
  title: '¿Qué necesitas hoy?',
  recommend: 'Te recomendamos:',
  button: 'Hablar de esto por WhatsApp',
  badge: 'Recomendado',
};

export const hubGoalWa = (label) => waLink(`Hola, ${label.charAt(0).toLowerCase()}${label.slice(1)}`);

export const hubJourney = {
  title: 'Cómo se conectan',
  sub: 'Cada pieza prepara a la siguiente.',
};

export const hubCta = {
  title: '¿No sabes por dónde empezar?',
  text: 'Empieza con un diagnóstico gratuito de 30 minutos. Sin presión. Sin venderte nada que no necesitas.',
  button: 'Agendar diagnóstico',
};
```

- [ ] **Step 2: Verificar**

Run:
```bash
node -e "import('./src/data/hub.js').then(m=>{const ids=m.hubServices.map(s=>s.id);const ok=m.hubServices.every(s=>s.title&&s.desc&&s.why&&s.to&&s.slug)&&m.hubGoals.every(g=>g.ids.every(i=>ids.includes(i)));console.log(m.hubServices.length, m.hubGoals.length, ok, m.hubGoalWa('Quiero más clientes ya').includes('quiero'))})"
```
Expected: `5 4 true true` (el último `includes` busca "quiero" en minúscula tras codificar: la URL contiene `quiero`).

- [ ] **Step 3: Commit**

```bash
git add src/data/hub.js
git commit -m "feat(servicios): add hub data with goals, ordered services and prices"
```

---

### Task 2: CSS del directorio

**Files:**
- Create: `src/components/ServicesHub/hub.css`

- [ ] **Step 1: Crear `hub.css`**

```css
.hub-page { --hub-ink: #111; --hub-lime: #E0FF31; --hub-line: rgba(0, 0, 0, 0.1); background: var(--bg-void); color: var(--hub-ink); min-height: 100vh; padding: 15vh 4vw 6vw; font-family: var(--font-body); }
.hub-wrap { max-width: var(--container-max); margin: 0 auto; display: grid; gap: clamp(3rem, 6vw, 5rem); }

/* tipografía y botones */
.hub-kicker { color: var(--text-muted); font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
.hub-h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(3rem, 6vw, 5rem); line-height: 1.02; letter-spacing: -0.03em; margin: 1rem 0 1.25rem; }
.hub-lead { color: var(--text-secondary); font-size: clamp(1.1rem, 2vw, 1.4rem); line-height: 1.6; max-width: 700px; margin: 0; }
.hub-h2 { font-family: var(--font-display); font-weight: 400; font-size: 2rem; line-height: 1.05; margin: 0; }
.hub-sub { margin: 0.15rem 0 0.75rem; color: var(--text-muted); font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.hub-p { margin: 0 0 1rem; color: var(--text-secondary); line-height: 1.6; }
.hub-btn { display: inline-flex; align-items: center; min-height: 48px; padding: 0 1.75rem; border-radius: var(--radius-full); background: var(--hub-lime); color: var(--hub-ink); font-weight: 700; text-decoration: none; transition: transform 0.2s; }
.hub-btn:hover { transform: translateY(-2px); }
.hub-btn--dark { background: var(--hub-ink); color: #fff; }
.hub-btn:focus-visible, .hub-chip:focus-visible, .hub-link:focus-visible, .hub-reco a:focus-visible, .hub-steps a:focus-visible { outline: 3px solid var(--hub-ink); outline-offset: 3px; }

/* selector de objetivo */
.hub-goals { margin-top: 2rem; }
.hub-goals-title { margin: 0 0 0.75rem; font-weight: 700; }
.hub-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.hub-chip { min-height: 44px; padding: 0 1.2rem; border: 1.5px solid var(--hub-ink); border-radius: var(--radius-full); background: transparent; color: var(--hub-ink); font: inherit; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s; }
.hub-chip[aria-pressed='true'] { background: var(--hub-ink); color: #fff; }
.hub-reco { margin-top: 1rem; min-height: 1px; }
.hub-reco-box { max-width: 720px; padding: 1.25rem; border-radius: 16px; background: #fff; border: 1px solid var(--hub-line); }
.hub-reco-box p { margin: 0 0 0.6rem; }
.hub-reco-box ul { margin: 0 0 1rem; padding-left: 1.1rem; display: grid; gap: 0.5rem; color: var(--text-secondary); line-height: 1.5; }
.hub-reco-box b { color: var(--hub-ink); }

/* tarjetas */
.hub-grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.hub-card { display: flex; flex-direction: column; padding: 1.25rem; border-radius: 20px; background: #fff; border: 1px solid var(--hub-line); transition: opacity 0.3s, box-shadow 0.3s, border-color 0.3s; }
.hub-card[data-rec='true'] { border-color: var(--hub-ink); box-shadow: 0 0 0 3px var(--hub-lime); }
.hub-card[data-dim='true'] { opacity: 0.5; }
.hub-card-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
.hub-badge { padding: 0.2rem 0.65rem; border-radius: var(--radius-full); background: var(--hub-lime); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
.hub-price { margin: auto 0 1rem; font-weight: 700; }
.hub-link { color: var(--hub-ink); font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }

/* miniaturas dibujadas con CSS */
.hub-mini { position: relative; display: flex; align-items: center; gap: 0.5rem; height: 120px; margin-bottom: 1rem; padding: 0.75rem; border-radius: 12px; overflow: hidden; background: #f4efe4; }
.hub-mini--branding i { display: block; width: 34px; height: 34px; border-radius: 50%; }
.hub-mini--branding i:nth-child(1) { background: #16213e; }
.hub-mini--branding i:nth-child(2) { background: #e0b84c; }
.hub-mini--branding i:nth-child(3) { background: #a8452a; }
.hub-mini--branding b { margin-left: auto; font-family: var(--font-display); font-weight: 400; font-size: 2.6rem; }
.hub-mini--web { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; align-content: center; background: #fff; border: 1.5px dashed var(--hub-ink); }
.hub-mini--web i { display: block; grid-column: 1 / 3; height: 12px; border: 1.5px solid var(--hub-ink); border-radius: 3px; }
.hub-mini--web i:nth-child(2) { height: 34px; }
.hub-mini--web span { display: block; height: 24px; border: 1.5px solid var(--hub-ink); border-radius: 3px; }
.hub-mini--video { display: grid; gap: 6px; align-content: center; background: #0b0b0c; }
.hub-mini--video i { display: block; height: 16px; border-radius: 3px; }
.hub-mini--video i:nth-child(1) { width: 60%; background: #E0FF31; }
.hub-mini--video i:nth-child(2) { width: 80%; margin-left: 20%; background: #ff9b73; }
.hub-mini--video i:nth-child(3) { width: 50%; margin-left: 10%; background: #8ab4ff; }
.hub-mini--video b { position: absolute; top: 8px; right: 14px; color: #fff; font-size: 1.2rem; }
.hub-mini--feed { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 4px; padding: 0.5rem; background: #e5e7eb; }
.hub-mini--feed i { display: block; border-radius: 3px; }
.hub-mini--feed i:nth-child(3n + 1) { background: #E0FF31; }
.hub-mini--feed i:nth-child(3n + 2) { background: #111; }
.hub-mini--feed i:nth-child(3n) { background: #bfe0ff; }
.hub-mini--search { flex-direction: column; align-items: flex-start; justify-content: center; gap: 6px; background: #fff; border: 1px solid #e3e5e8; }
.hub-mini--search .bar { display: block; width: 80%; height: 16px; border: 1px solid #cfd2d6; border-radius: 99px; }
.hub-mini--search small { font-weight: 700; font-size: 0.7rem; }
.hub-mini--search .l1 { display: block; width: 70%; height: 8px; border-radius: 4px; background: #1a4fc4; }
.hub-mini--search .l2 { display: block; width: 90%; height: 6px; border-radius: 4px; background: #d8dadd; }

/* cómo se conectan */
.hub-journey .hub-p { margin: 0.5rem 0 1.75rem; }
.hub-steps { position: relative; display: grid; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.hub-steps li { display: grid; grid-template-columns: 34px 1fr; gap: 0 0.75rem; align-items: start; }
.hub-steps li > span:last-child { grid-column: 2; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.4; }
.hub-steps a { color: inherit; font-weight: 700; }
.hub-dot { display: grid; place-items: center; position: relative; width: 34px; height: 34px; border-radius: 50%; background: var(--hub-ink); color: var(--hub-lime); font-weight: 700; }
@media (min-width: 900px) {
  .hub-steps { grid-template-columns: repeat(5, 1fr); }
  .hub-steps::before { content: ''; position: absolute; top: 17px; left: 17px; right: 17px; border-top: 2px dashed var(--border-strong); }
  .hub-steps li { grid-template-columns: 1fr; gap: 0.5rem; }
  .hub-steps li > span:last-child { grid-column: 1; }
}

/* cierre */
.hub-cta { padding: clamp(2rem, 5vw, 4rem); border-radius: 24px; background: #fff; border: 1px solid var(--hub-line); text-align: center; }
.hub-cta .hub-lead { margin: 1rem auto 1.5rem; }

@media (prefers-reduced-motion: reduce) { .hub-btn, .hub-chip, .hub-card { transition: none; } }
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesHub/hub.css
git commit -m "feat(servicios): add hub styles with CSS mini previews"
```

---

### Task 3: Miniaturas, tarjetas y página reescrita

**Files:**
- Create: `src/components/ServicesHub/HubMini.jsx`
- Create: `src/components/ServicesHub/HubCards.jsx`
- Rewrite: `src/components/Views/ExpertiseHub.jsx`

- [ ] **Step 1: Crear `HubMini.jsx`**

```jsx
import React from 'react';

// Miniatura decorativa que adelanta el estilo de la página de cada servicio.
export default function HubMini({ kind }) {
  switch (kind) {
    case 'branding':
      return <div className="hub-mini hub-mini--branding" aria-hidden="true"><i /><i /><i /><b>Aa</b></div>;
    case 'web':
      return <div className="hub-mini hub-mini--web" aria-hidden="true"><i /><i /><span /><span /></div>;
    case 'video':
      return <div className="hub-mini hub-mini--video" aria-hidden="true"><i /><i /><i /><b>▶</b></div>;
    case 'feed':
      return <div className="hub-mini hub-mini--feed" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>;
    case 'search':
      return <div className="hub-mini hub-mini--search" aria-hidden="true"><span className="bar" /><small>Anuncio</small><span className="l1" /><span className="l2" /></div>;
    default:
      return null;
  }
}
```

- [ ] **Step 2: Crear `HubCards.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import HubMini from './HubMini';
import { hubServices, hubGoals, hubGoalsCopy } from '../../data/hub';

export default function HubCards({ goalId }) {
  const reduce = useReducedMotion();
  const goal = hubGoals.find((g) => g.id === goalId);
  const hasRecs = !!goal && goal.ids.length > 0;

  return (
    <div className="hub-grid">
      {hubServices.map((s) => {
        const rec = hasRecs && goal.ids.includes(s.id);
        return (
          <motion.article key={s.id} id={s.slug} className="hub-card"
            data-rec={rec || undefined} data-dim={hasRecs && !rec ? true : undefined}
            initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6% 0px' }} transition={{ duration: 0.5 }}>
            <HubMini kind={s.mini} />
            <div className="hub-card-head">
              <h2 className="hub-h2">{s.title}</h2>
              {rec && <span className="hub-badge">{hubGoalsCopy.badge}</span>}
            </div>
            <p className="hub-sub">{s.subtitle}</p>
            <p className="hub-p">{s.desc}</p>
            <p className="hub-price">{s.price}</p>
            <Link className="hub-link" to={s.to}>Ver {s.title} →</Link>
          </motion.article>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Reescribir `ExpertiseHub.jsx` (encabezado + tarjetas por ahora)**

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { services } from '../../data/servicesData';
import { hubIntro } from '../../data/hub';
import HubCards from '../ServicesHub/HubCards';
import '../ServicesHub/hub.css';

export default function ExpertiseHub() {
  const [goalId, setGoalId] = useState(null);
  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicios de Persuasivo",
    "itemListElement": services.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.longDesc,
        "provider": { "@type": "Organization", "name": "Persuasivo" },
        "url": `https://persuasivo.com.mx${s.routePath}`
      }
    }))
  };

  return (
    <motion.div key="expertise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Servicios — Branding, Web, Video, Redes y Meta Ads | Persuasivo</title>
        <meta name="description" content="Branding, desarrollo web con React desde $35,000 MXN, contenido en video, redes sociales y Meta Ads con ROI 12X. Elige el servicio que tu negocio necesita." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <div className="hub-page">
        <div className="hub-wrap">
          <header>
            <span className="hub-kicker">{hubIntro.kicker}</span>
            <h1 className="hub-h1">{hubIntro.title}</h1>
            <p className="hub-lead">{hubIntro.sub}</p>
          </header>
          <HubCards goalId={goalId} />
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
```

- [ ] **Step 4: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/servicios` (esperar ~10 s).
Expected: encabezado y 5 tarjetas (Branding, Desarrollo Web, Contenido en video, Copywriting & Redes, Meta Ads) cada una con su miniatura, descripción, precio y enlace "Ver … →" a su página; un solo `<h1>`; consola limpia. (El setter `setGoalId` aún no se usa; se conecta en la Task 4.)

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesHub/HubMini.jsx src/components/ServicesHub/HubCards.jsx src/components/Views/ExpertiseHub.jsx
git commit -m "feat(servicios): cards with CSS mini previews, rewrite /servicios hub"
```

---

### Task 4: Selector "¿Qué necesitas hoy?"

**Files:**
- Create: `src/components/ServicesHub/HubGoals.jsx`
- Modify: `src/components/Views/ExpertiseHub.jsx`

- [ ] **Step 1: Crear `HubGoals.jsx`** (la región `aria-live` siempre está montada y solo cambia su contenido, para que se anuncie)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { hubGoals, hubGoalsCopy, hubServices, hubGoalWa } from '../../data/hub';

export default function HubGoals({ goalId, onChange }) {
  const goal = hubGoals.find((g) => g.id === goalId);
  const recs = goal ? hubServices.filter((s) => goal.ids.includes(s.id)) : [];

  return (
    <div className="hub-goals">
      <p className="hub-goals-title" id="hub-goals-label">{hubGoalsCopy.title}</p>
      <div className="hub-chips" role="group" aria-labelledby="hub-goals-label">
        {hubGoals.map((g) => (
          <button key={g.id} type="button" className="hub-chip" aria-pressed={goalId === g.id}
            onClick={() => onChange(goalId === g.id ? null : g.id)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="hub-reco" aria-live="polite">
        {goal && (
          <div className="hub-reco-box">
            {recs.length > 0 ? (
              <>
                <p><b>{hubGoalsCopy.recommend}</b></p>
                <ul>
                  {recs.map((s) => (
                    <li key={s.id}><Link to={s.to}><b>{s.title}</b></Link>: {s.why}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>{goal.note}</p>
            )}
            <a className="hub-btn" href={hubGoalWa(goal.label)} target="_blank" rel="noopener noreferrer">{hubGoalsCopy.button}</a>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Montarlo**

En `ExpertiseHub.jsx` agregar `import HubGoals from '../ServicesHub/HubGoals';` (en su propia línea junto a los otros imports de `ServicesHub`) y, dentro de `<header>`, después del `<p className="hub-lead">…</p>`:

```jsx
            <HubGoals goalId={goalId} onChange={setGoalId} />
```

- [ ] **Step 3: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador:
- Al elegir "Quiero más clientes ya": aparece el cuadro "Te recomendamos:" con Meta Ads y Desarrollo Web (cada uno con su `businessTrans`) y el botón a WhatsApp; esas dos tarjetas se resaltan con borde oscuro y aro lima con la insignia "Recomendado" y las otras 3 se atenúan.
- Volver a pulsar el mismo botón lo quita y todo vuelve a la normalidad.
- "No sé por dónde empezar" muestra la nota y el botón, sin resaltar ninguna tarjeta ni atenuar ninguna.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServicesHub/HubGoals.jsx src/components/Views/ExpertiseHub.jsx
git commit -m "feat(servicios): add goal selector that recommends and highlights services"
```

---

### Task 5: "Cómo se conectan" y cierre

**Files:**
- Create: `src/components/ServicesHub/HubJourney.jsx`
- Modify: `src/components/Views/ExpertiseHub.jsx`

- [ ] **Step 1: Crear `HubJourney.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { hubServices, hubJourney } from '../../data/hub';

export default function HubJourney() {
  return (
    <section className="hub-journey">
      <h2 className="hub-h2">{hubJourney.title}</h2>
      <p className="hub-p">{hubJourney.sub}</p>
      <ol className="hub-steps">
        {hubServices.map((s, i) => (
          <li key={s.id}>
            <span className="hub-dot" aria-hidden="true">{i + 1}</span>
            <Link to={s.to}>{s.title}</Link>
            <span>{s.role}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Montarlo junto con el cierre**

En `ExpertiseHub.jsx`:
1. Cambiar la línea `import { motion } from 'framer-motion';` por la misma y agregar, justo debajo, `import { Link } from 'react-router-dom';`.
2. Cambiar `import { hubIntro } from '../../data/hub';` por `import { hubIntro, hubCta } from '../../data/hub';`.
3. Agregar `import HubJourney from '../ServicesHub/HubJourney';` junto a los otros imports de `ServicesHub`.
4. Dentro de `.hub-wrap`, después de `<HubCards goalId={goalId} />`, agregar:

```jsx
          <HubJourney />
          <section className="hub-cta">
            <h2 className="hub-h2">{hubCta.title}</h2>
            <p className="hub-lead">{hubCta.text}</p>
            <Link to="/contacto" className="hub-btn hub-btn--dark">{hubCta.button}</Link>
          </section>
```

- [ ] **Step 3: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: línea punteada con 5 círculos numerados en escritorio (lista vertical en móvil), cada servicio enlazado a su página y su rol debajo; el cierre lleva a `/contacto`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServicesHub/HubJourney.jsx src/components/Views/ExpertiseHub.jsx
git commit -m "feat(servicios): add connection journey and closing CTA, page complete"
```

---

### Task 6: Pulido y verificación final

**Files:**
- Modify: `src/components/ServicesHub/hub.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: las tarjetas se reparten en 3 + 2 columnas sin cortar texto; las miniaturas se ven completas; el recorrido ocupa una fila de 5; la recomendación no mueve el layout de forma brusca.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth`; las chips del selector hacen salto de línea; botones y chips ≥44 px de alto; las tarjetas pasan a una columna; el recorrido es una lista vertical.

- [ ] **Step 3: Teclado y movimiento reducido**

Con Tab: foco visible (contorno oscuro) en chips, enlaces y botones; Enter/Espacio activan chips y `aria-pressed` cambia. Con "reducir movimiento": las tarjetas aparecen sin animación y sin transición de opacidad.

- [ ] **Step 4: SEO y regresiones**

En la consola del navegador:

```js
({ h1: document.querySelectorAll('h1').length, cards: document.querySelectorAll('.hub-card').length, ids: [...document.querySelectorAll('.hub-card')].map(c => c.id), ld: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).itemListElement.length, mains: document.querySelectorAll('main').length })
```
Expected: `{ h1: 1, cards: 5, ids: ['branding','ecosistemas','contenido','autoridad','trafico'], ld: 5, mains: 1 }`.
Run: `npm run build` → `✓ built in`. Los enlaces "Ver … →" abren cada página de servicio; el pie y el menú siguen enlazando a `/servicios`.

- [ ] **Step 5: ¿Ayuda a decidir?**

Sin guía: ¿se entiende qué ofrece cada servicio, cuánto cuesta aproximadamente, cómo se conectan y cómo elegir? Si falta claridad, ajustar copy en `src/data/hub.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(servicios): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura del pedido:** directorio corto que manda al servicio correcto (Tasks 3–5), selector de objetivo con recomendación y resaltado (Task 4), 5 miniaturas con el estilo de cada página (Tasks 2–3), precios "desde" ya publicados y "según diagnóstico" donde no hay (Task 1), recorrido "Cómo se conectan" (Task 5), cierre con diagnóstico (Task 5), conserva SEO (Helmet, canonical, JSON-LD de 5 servicios y anclas `#<slug>`), elimina FAQ vacíos y emojis, accesibilidad y móvil (Task 6).
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `hubIntro`, `hubServices`, `hubGoals`, `hubGoalsCopy`, `hubGoalWa`, `hubJourney`, `hubCta` (Task 1) se usan igual en Tasks 3–5; clases `.hub-*` definidas en Task 2 antes de usarse; `HubCards` recibe `goalId`, `HubGoals` recibe `goalId` y `onChange`.
- **Riesgos conocidos:** el servicio `contenido` tiene `slug: 'contenido'` y ruta `/contenido` (no `/servicios/contenido`), por eso los enlaces salen de `routePath`; las líneas de "rol" son redacción propia a partir de las descripciones (ver "Cambios de copy a confirmar"); el último `includes('quiero')` del chequeo de la Task 1 asume que `waLink` codifica el texto con `encodeURIComponent` (`Hola%2C%20quiero%20…`).
