# Página Ads (ventana de búsqueda con anuncios y orgánicos) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/servicios/trafico` (servicio **Meta Ads**) como una **ventana de navegador con una búsqueda genérica** ("cómo conseguir clientes nuevos en Monterrey") donde el primer resultado es el **Anuncio** de Persuasivo, y los resultados orgánicos, el bloque de casos, "Otras preguntas" y un panel lateral de empresa explican qué incluye, cómo funciona, cuánto cuesta y cómo contratar. Al final, "Anuncios recomendados" enlazan a las páginas de Web y Redes.

**Architecture:** Mismo método que las demás páginas: texto en HTML real (SEO, accesible, responsivo), creatividad en CSS + Framer Motion, copy en `src/data/searchPage.js` tomado de `servicesData.js` y de la página actual. Cada resultado orgánico es un `<details>` (el fragmento siempre visible, el detalle se expande), así el texto completo está en el DOM aunque esté cerrado. La búsqueda "se escribe sola" con un hook local (`useTypewriter`); con movimiento reducido aparece completa. Sin dependencias ni assets nuevos (los casos usan `/showcase/ads1-3.jpg`).

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async.

**Decisiones de diseño (acordadas):**
- Búsqueda **genérica**: sin logo, nombre ni colores de Google, y sin usar "Google" como marca de la ventana. El servicio es Meta Ads (Facebook e Instagram), no Google Ads.
- Mensaje de contraste: *en una búsqueda, la persona ya sabe qué quiere; con Meta Ads llegas al cliente antes de que busque.*
- "Anuncios recomendados" = otros servicios de Persuasivo (Web y Redes), con enlaces internos.
- Contraste entre páginas: Web = blanco y trazo; Branding = papel; Video = oscuro; Redes = perfil gris; Ads = ventana de navegador clara con títulos azules de resultado.

**Cambios de copy respecto a la página actual (a confirmar):**
- La frase "No queremos que hables con 100 personas pobres" se reescribe como "…con 100 curiosos". El resto de los párrafos se conserva palabra por palabra.
- La página actual dice "Metodología 01" y "Tráfico Quirúrgico"; el título pasa a "Meta Ads en Monterrey: llega al cliente antes de que te busque".

**Fuera de alcance (a propósito):** buscador real que filtre, pestañas funcionales (Todo/Imágenes), publicidad de Google Ads, rediseño de otras páginas. Las rutas y `ServiceTraffic({ setView })` se conservan (el prop ya no se usa).

**Riesgos a confirmar antes de publicar:**
- Cifras de `servicesData.js`: `12X` ROI promedio documentado, `-40%` CAC, `150+` citas al mes para clínicas, "primeros leads entre la semana 2 y 3", "optimización completa en 30 a 60 días".
- Precio: "desde $15,000 MXN al mes más presupuesto publicitario".
- Las descripciones de los dos "Anuncios recomendados" reutilizan texto de las páginas de Web y Redes.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/servicios/trafico`; esperar ~10 s tras navegar (el sitio tiene un fundido de entrada lento en el panel).
3. Revisar a 1280 px y a 375 px (sin scroll horizontal; el carril de casos puede desplazarse dentro de su caja).
4. Los imports en `src/data/*.js` usan extensión `.js`.

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/searchPage.js` | Crear | Todo el copy de la página |
| `src/components/SearchPage/searchPage.css` | Crear | Ventana, resultados, panel, casos, "otras preguntas" |
| `src/components/SearchPage/SrWindow.jsx` | Crear | Ventana de navegador + barra de búsqueda que se escribe sola |
| `src/components/SearchPage/SrAd.jsx` | Crear | Resultado "Anuncio" con el `<h1>`, enlaces y botón |
| `src/components/SearchPage/SrResult.jsx` | Crear | Resultado orgánico genérico (`<details>`) |
| `src/components/SearchPage/SrOrganic.jsx` | Crear | Los 4 resultados orgánicos |
| `src/components/SearchPage/SrCases.jsx` | Crear | Carril de casos con foto (como un bloque de imágenes) |
| `src/components/SearchPage/SrPaa.jsx` | Crear | "Otras preguntas" (FAQ) |
| `src/components/SearchPage/SrMore.jsx` | Crear | "Anuncios recomendados" (Web y Redes) |
| `src/components/SearchPage/SrPanel.jsx` | Crear | Panel lateral de empresa con precio y WhatsApp |
| `src/components/Views/ServiceTraffic.jsx` | Reescribir | Compone todo + SEO |

---

### Task 1: Datos (`searchPage.js`)

**Files:**
- Create: `src/data/searchPage.js`

- [ ] **Step 1: Crear el archivo**

```js
import { waLink } from './contact.js';
import { getServiceBySlug } from './servicesData.js';

const svc = getServiceBySlug('trafico');

export const SEARCH_WA = waLink('Hola, quiero una auditoría de mis campañas de Meta Ads');

export const searchQuery = 'cómo conseguir clientes nuevos en Monterrey';

export const searchAd = {
  label: 'Anuncio',
  url: 'persuasivo.com.mx › meta-ads',
  title: 'Meta Ads en Monterrey: llega al cliente antes de que te busque',
  desc: svc.desc,
  extra: 'Empezamos con una auditoría de tu infraestructura publicitaria actual para detectar dónde se te va el dinero.',
  cta: 'Solicitar auditoría',
  sitelinks: [
    ['Qué incluye', 'sr-incluye'],
    ['Cómo funciona', 'sr-algoritmo'],
    ['Casos', 'sr-casos'],
    ['Precio', 'sr-panel'],
  ],
};

// Resultados orgánicos. `more` es texto; `list` es una lista opcional.
export const searchResults = [
  {
    id: 'sr-contraste', url: 'persuasivo.com.mx › meta-ads › diferencia',
    title: 'Google espera a que te busquen. Meta Ads te lleva al cliente.',
    snippet: 'En una búsqueda, la persona ya sabe qué quiere. En Meta llegas a quien todavía no te busca pero tiene el perfil para comprarte.',
    more: svc.businessTrans,
  },
  {
    id: 'sr-incluye', url: 'persuasivo.com.mx › meta-ads › que-incluye',
    title: 'Qué incluye la gestión de Meta Ads',
    snippet: 'Arquitectura de campañas por etapa, embudos de calificación, retargeting, optimización por conversiones y más.',
    list: svc.capabilities,
  },
  {
    id: 'sr-algoritmo', url: 'persuasivo.com.mx › meta-ads › algoritmo',
    title: 'Entrenamos el algoritmo con conversiones reales',
    snippet: 'No optimizamos por likes ni alcance vacío: optimizamos por citas, demos y ventas.',
    more: 'Mientras tu competencia sube videos bailando, nosotros entrenamos el algoritmo de Meta con conversiones de alto nivel. Usamos píxeles maduros y datos demográficos cerrados para mostrar tus ofertas únicamente a quienes ya tienen la tarjeta de crédito en la mano.',
  },
  {
    id: 'sr-escala', url: 'persuasivo.com.mx › meta-ads › escalamiento',
    title: 'Duplicar la inversión sin romper tu margen',
    snippet: 'Una arquitectura publicitaria que aguanta facturar el doble sin que el sistema se rompa.',
    more: 'El problema de la mayoría es que no soportan facturar el doble sin que su sistema se rompa. Nuestra arquitectura publicitaria permite duplicar la inversión (ROAS) sin perder margen de beneficio, estabilizando tu adquisición de clientes a largo plazo.',
  },
  {
    id: 'sr-filtro', url: 'persuasivo.com.mx › meta-ads › embudos',
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
  name: 'Persuasivo · Meta Ads',
  kind: 'Agencia de publicidad digital',
  place: 'Monterrey, N.L.',
  metrics: svc.metrics, // [{ value, label }]
  rows: [
    ['Inversión', 'Gestión desde $15,000 MXN al mes, más el presupuesto publicitario.'],
    ['Primeros leads', 'Suelen llegar entre la semana 2 y 3.'],
    ['Optimización completa', 'Entre 30 y 60 días.'],
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
```

- [ ] **Step 2: Verificar**

Run:
```bash
node -e "import('./src/data/searchPage.js').then(m=>console.log(m.searchResults.length, m.searchPaa.items.length, m.searchPanel.metrics.length, m.searchResults[1].list.length, m.searchAd.sitelinks.length))"
```
Expected: `5 3 3 6 4`

- [ ] **Step 3: Commit**

```bash
git add src/data/searchPage.js
git commit -m "feat(ads): add search-page copy data"
```

---

### Task 2: CSS de la ventana de búsqueda

**Files:**
- Create: `src/components/SearchPage/searchPage.css`

- [ ] **Step 1: Crear `searchPage.css`**

```css
.sr-page { --sr-ink: #202124; --sr-muted: #5f6368; --sr-link: #1a4fc4; --sr-line: #e3e5e8; --sr-lime: #E0FF31; background: var(--bg-void); color: var(--sr-ink); min-height: 100vh; padding: 96px 4vw 8vw; font-family: var(--font-body); }
.sr-window { max-width: 1120px; margin: 0 auto; background: #fff; border: 1px solid var(--sr-line); border-radius: 14px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); overflow: hidden; }

/* barra del navegador */
.sr-chrome { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 1rem; background: #f1f3f4; border-bottom: 1px solid var(--sr-line); }
.sr-dots { display: flex; gap: 6px; }
.sr-dots i { width: 11px; height: 11px; border-radius: 50%; background: #d0d3d6; }
.sr-url { flex: 1; min-width: 0; padding: 0.35rem 0.9rem; border-radius: var(--radius-full); background: #fff; color: var(--sr-muted); font-size: 0.85rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* barra de búsqueda */
.sr-searchrow { padding: 1.25rem 1.25rem 0.5rem; }
.sr-bar { display: flex; align-items: center; gap: 0.75rem; max-width: 640px; padding: 0.7rem 1.1rem; border: 1px solid var(--sr-line); border-radius: var(--radius-full); box-shadow: 0 1px 6px rgba(32, 33, 36, 0.12); }
.sr-bar svg { flex: none; stroke: var(--sr-muted); }
.sr-bar-text { font-size: 1.05rem; min-height: 1.5em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sr-caret { display: inline-block; width: 1px; height: 1.1em; margin-left: 1px; vertical-align: text-bottom; background: var(--sr-ink); animation: sr-blink 1s steps(2, jump-none) infinite; }
@keyframes sr-blink { 0% { opacity: 1; } 100% { opacity: 0; } }

/* cuerpo: resultados + panel */
.sr-body { display: grid; gap: 2rem; padding: 1rem 1.25rem 2rem; }
@media (min-width: 960px) { .sr-body { grid-template-columns: minmax(0, 1fr) 320px; } .sr-panel { position: sticky; top: 88px; align-self: start; } }
.sr-main { display: grid; gap: 1.75rem; max-width: 660px; }

/* resultado */
.sr-cite { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--sr-muted); font-style: normal; }
.sr-fav { display: grid; place-items: center; width: 22px; height: 22px; flex: none; border-radius: 50%; background: var(--sr-lime); color: var(--sr-ink); font-size: 0.7rem; font-weight: 800; }
.sr-title { display: block; margin: 0.15rem 0 0.2rem; font-size: 1.3rem; line-height: 1.25; font-weight: 500; color: var(--sr-link); }
.sr-title:hover { text-decoration: underline; }
h1.sr-title { font-family: inherit; }
.sr-snippet { display: block; color: #3c4043; line-height: 1.55; font-size: 0.97rem; }
.sr-label { display: inline-block; margin-right: 0.4rem; font-weight: 700; color: var(--sr-ink); }
.sr-ad { padding-bottom: 1.25rem; border-bottom: 1px solid var(--sr-line); }
.sr-sitelinks { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; margin: 0.75rem 0; padding: 0; list-style: none; }
.sr-sitelinks a { color: var(--sr-link); text-decoration: none; font-size: 0.95rem; }
.sr-sitelinks a:hover { text-decoration: underline; }
.sr-btn { display: inline-flex; align-items: center; min-height: 44px; padding: 0 1.4rem; border-radius: var(--radius-full); background: var(--sr-lime); color: var(--sr-ink); font-weight: 700; text-decoration: none; transition: transform 0.2s; }
.sr-btn:hover { transform: translateY(-2px); }

/* resultado desplegable */
.sr-result summary { list-style: none; cursor: pointer; }
.sr-result summary::-webkit-details-marker { display: none; }
.sr-result summary::after { content: 'Ver más'; display: inline-block; margin-top: 0.35rem; color: var(--sr-link); font-size: 0.85rem; }
.sr-result[open] summary::after { content: 'Ver menos'; }
.sr-more { margin: 0.75rem 0 0; padding: 0.9rem 1rem; border-left: 3px solid var(--sr-lime); background: #fafafa; color: #3c4043; line-height: 1.6; }
.sr-more ul { margin: 0; padding-left: 1.2rem; }

/* casos (carril de imágenes) */
.sr-block-title { margin: 0 0 0.6rem; font-size: 1.05rem; font-weight: 500; }
.sr-rail { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem; }
.sr-case { flex: 0 0 200px; text-decoration: none; color: inherit; }
.sr-case img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 10px; border: 1px solid var(--sr-line); }
.sr-case b { display: block; margin-top: 0.4rem; font-weight: 600; font-size: 0.95rem; }
.sr-case span { color: var(--sr-muted); font-size: 0.85rem; }

/* otras preguntas */
.sr-paa { border: 1px solid var(--sr-line); border-radius: 12px; overflow: hidden; }
.sr-paa details { border-top: 1px solid var(--sr-line); }
.sr-paa details:first-of-type { border-top: 0; }
.sr-paa summary { display: flex; justify-content: space-between; gap: 1rem; padding: 0.9rem 1rem; cursor: pointer; list-style: none; min-height: 44px; }
.sr-paa summary::-webkit-details-marker { display: none; }
.sr-paa summary::after { content: '▾'; color: var(--sr-muted); }
.sr-paa details[open] summary::after { content: '▴'; }
.sr-paa p { margin: 0; padding: 0 1rem 1rem; color: #3c4043; line-height: 1.6; }

/* anuncios recomendados */
.sr-more-ads { display: grid; gap: 1.25rem; }
.sr-more-ads a { color: inherit; text-decoration: none; display: block; }
.sr-more-ads a:hover .sr-title { text-decoration: underline; }

/* panel de empresa */
.sr-panel { border: 1px solid var(--sr-line); border-radius: 14px; padding: 1.25rem; background: #fff; }
.sr-panel-name { margin: 0; font-size: 1.4rem; font-weight: 500; }
.sr-panel-kind { margin: 0.1rem 0 1rem; color: var(--sr-muted); font-size: 0.9rem; }
.sr-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin: 0 0 1rem; padding: 0; list-style: none; text-align: center; }
.sr-metrics strong { display: block; font-size: 1.4rem; }
.sr-metrics span { color: var(--sr-muted); font-size: 0.72rem; line-height: 1.2; display: block; }
.sr-rows { margin: 0 0 1rem; display: grid; gap: 0.6rem; font-size: 0.92rem; line-height: 1.45; }
.sr-rows dt { display: inline; font-weight: 700; }
.sr-rows dd { display: inline; margin: 0; color: #3c4043; }

.sr-btn:focus-visible, .sr-sitelinks a:focus-visible, .sr-result summary:focus-visible, .sr-paa summary:focus-visible, .sr-case:focus-visible, .sr-more-ads a:focus-visible, .sr-rail:focus-visible { outline: 3px solid var(--sr-ink); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) { .sr-caret { animation: none; } .sr-btn { transition: none; } }
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/SearchPage/searchPage.css
git commit -m "feat(ads): add search window styles"
```

---

### Task 3: Ventana + Anuncio y página montada

**Files:**
- Create: `src/components/SearchPage/SrWindow.jsx`
- Create: `src/components/SearchPage/SrAd.jsx`
- Rewrite: `src/components/Views/ServiceTraffic.jsx`

- [ ] **Step 1: Crear `SrWindow.jsx`**

```jsx
import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { searchQuery } from '../../data/searchPage';

// La búsqueda "se escribe sola". Con movimiento reducido aparece completa.
function useTypewriter(text, reduce) {
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) { setN(text.length); return undefined; }
    if (n >= text.length) return undefined;
    const id = setTimeout(() => setN((x) => x + 1), 45);
    return () => clearTimeout(id);
  }, [n, text, reduce]);
  return text.slice(0, n);
}

export default function SrWindow({ children }) {
  const reduce = useReducedMotion();
  const typed = useTypewriter(searchQuery, reduce);
  return (
    <div className="sr-window">
      <div className="sr-chrome" aria-hidden="true">
        <span className="sr-dots"><i /><i /><i /></span>
        <span className="sr-url">Búsqueda de ejemplo</span>
      </div>
      <div className="sr-searchrow">
        <div className="sr-bar" role="img" aria-label={`Búsqueda de ejemplo: ${searchQuery}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-bar-text" aria-hidden="true">{typed}<i className="sr-caret" /></span>
        </div>
      </div>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Crear `SrAd.jsx`**

```jsx
import React from 'react';
import { searchAd, SEARCH_WA } from '../../data/searchPage';

// Abre el resultado de destino (si es un <details>) antes de que el ancla haga scroll.
const openTarget = (id) => () => {
  const el = document.getElementById(id);
  if (el && el.tagName === 'DETAILS') el.open = true;
};

export default function SrAd() {
  return (
    <section className="sr-ad">
      <cite className="sr-cite"><span className="sr-fav" aria-hidden="true">P</span>{searchAd.url}</cite>
      <h1 className="sr-title"><span className="sr-label">{searchAd.label} ·</span>{searchAd.title}</h1>
      <span className="sr-snippet">{searchAd.desc}</span>
      <ul className="sr-sitelinks">
        {searchAd.sitelinks.map(([label, id]) => (
          <li key={id}><a href={`#${id}`} onClick={openTarget(id)}>{label}</a></li>
        ))}
      </ul>
      <span className="sr-snippet" style={{ marginBottom: '0.9rem' }}>{searchAd.extra}</span>
      <a className="sr-btn" href={SEARCH_WA} target="_blank" rel="noopener noreferrer">{searchAd.cta}</a>
    </section>
  );
}
```

- [ ] **Step 3: Reescribir `ServiceTraffic.jsx` (ventana + anuncio por ahora)**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import SrWindow from '../SearchPage/SrWindow';
import SrAd from '../SearchPage/SrAd';
import '../SearchPage/searchPage.css';

export default function ServiceTraffic({ setView }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Meta Ads en Monterrey: campañas que traen clientes | Persuasivo</title>
        <meta name="description" content="Campañas de Meta Ads en Facebook e Instagram para empresas en Monterrey: optimizadas por conversiones reales, con embudos de calificación. Solicita una auditoría por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/trafico" />
      </Helmet>
      <main className="sr-page">
        <SrWindow>
          <div className="sr-body">
            <div className="sr-main">
              <SrAd />
            </div>
          </div>
        </SrWindow>
      </main>
      <Footer setView={setView} />
    </motion.div>
  );
}
```

- [ ] **Step 4: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/servicios/trafico` (esperar ~10 s).
Expected: ventana blanca con barra de navegador; la búsqueda se escribe sola con cursor parpadeante; primer resultado "Anuncio · Meta Ads en Monterrey…" en azul con enlaces y botón lima que abre WhatsApp; un solo `<h1>`; consola limpia.

- [ ] **Step 5: Commit**

```bash
git add src/components/SearchPage/SrWindow.jsx src/components/SearchPage/SrAd.jsx src/components/Views/ServiceTraffic.jsx
git commit -m "feat(ads): search window with typed query and ad result on /servicios/trafico"
```

---

### Task 4: Resultados orgánicos y casos

**Files:**
- Create: `src/components/SearchPage/SrResult.jsx`
- Create: `src/components/SearchPage/SrOrganic.jsx`
- Create: `src/components/SearchPage/SrCases.jsx`
- Modify: `src/components/Views/ServiceTraffic.jsx`

- [ ] **Step 1: Crear `SrResult.jsx`**

```jsx
import React from 'react';

// Resultado orgánico: el fragmento siempre se ve; el detalle se despliega (y siempre está en el DOM).
export default function SrResult({ id, url, title, snippet, more, list }) {
  return (
    <details className="sr-result" id={id}>
      <summary>
        <cite className="sr-cite"><span className="sr-fav" aria-hidden="true">P</span>{url}</cite>
        <span className="sr-title">{title}</span>
        <span className="sr-snippet">{snippet}</span>
      </summary>
      <div className="sr-more">
        {more && <p style={{ margin: 0 }}>{more}</p>}
        {list && <ul>{list.map((li) => <li key={li}>{li}</li>)}</ul>}
      </div>
    </details>
  );
}
```

- [ ] **Step 2: Crear `SrOrganic.jsx`**

```jsx
import React from 'react';
import SrResult from './SrResult';
import { searchResults } from '../../data/searchPage';

export default function SrOrganic() {
  return (
    <>
      {searchResults.map((r) => <SrResult key={r.id} {...r} />)}
    </>
  );
}
```

- [ ] **Step 3: Crear `SrCases.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectsByCategory } from '../../data/caseStudiesData';
import { searchCases } from '../../data/searchPage';

export default function SrCases() {
  const cases = getProjectsByCategory(searchCases.category).filter((c) => c.img);
  if (!cases.length) return null;
  return (
    <section id={searchCases.id}>
      <h2 className="sr-block-title">{searchCases.label}</h2>
      <div className="sr-rail" tabIndex={0} role="region" aria-label="Casos de Meta Ads (desplazable)">
        {cases.map((c) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="sr-case">
            <img src={c.img} alt="" loading="lazy" />
            <b>{c.title}</b>
            <span>{c.metric}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Montarlos**

En `ServiceTraffic.jsx` importar `SrOrganic` y `SrCases` (rutas `../SearchPage/...`, cada import en su propia línea) y, dentro de `.sr-main`, después de `<SrAd />`:

```jsx
              <SrOrganic />
              <SrCases />
```

- [ ] **Step 5: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 5 resultados orgánicos con su fragmento; "Ver más" los despliega (y "Ver menos" los pliega); el enlace "Qué incluye" del anuncio baja al resultado y lo abre; carril de 3 casos con foto que llevan a `/work/<slug>`.

- [ ] **Step 6: Commit**

```bash
git add src/components/SearchPage/SrResult.jsx src/components/SearchPage/SrOrganic.jsx src/components/SearchPage/SrCases.jsx src/components/Views/ServiceTraffic.jsx
git commit -m "feat(ads): add organic results and case rail"
```

---

### Task 5: Otras preguntas, Anuncios recomendados y panel

**Files:**
- Create: `src/components/SearchPage/SrPaa.jsx`
- Create: `src/components/SearchPage/SrMore.jsx`
- Create: `src/components/SearchPage/SrPanel.jsx`
- Modify: `src/components/Views/ServiceTraffic.jsx`

- [ ] **Step 1: Crear `SrPaa.jsx`**

```jsx
import React from 'react';
import { searchPaa } from '../../data/searchPage';

export default function SrPaa() {
  return (
    <section>
      <h2 className="sr-block-title">{searchPaa.title}</h2>
      <div className="sr-paa">
        {searchPaa.items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear `SrMore.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { searchMore } from '../../data/searchPage';

export default function SrMore() {
  return (
    <section>
      <h2 className="sr-block-title">{searchMore.title}</h2>
      <div className="sr-more-ads">
        {searchMore.items.map((a) => (
          <Link key={a.to} to={a.to}>
            <cite className="sr-cite"><span className="sr-fav" aria-hidden="true">P</span>{a.url}</cite>
            <span className="sr-title"><span className="sr-label">Anuncio ·</span>{a.title}</span>
            <span className="sr-snippet">{a.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Crear `SrPanel.jsx`**

```jsx
import React from 'react';
import { searchPanel, SEARCH_WA } from '../../data/searchPage';

export default function SrPanel() {
  return (
    <aside className="sr-panel" id={searchPanel.id} aria-label="Datos de la empresa">
      <h2 className="sr-panel-name">{searchPanel.name}</h2>
      <p className="sr-panel-kind">{searchPanel.kind} · {searchPanel.place}</p>
      <ul className="sr-metrics">
        {searchPanel.metrics.map((m) => (
          <li key={m.label}><strong>{m.value}</strong><span>{m.label}</span></li>
        ))}
      </ul>
      <dl className="sr-rows">
        {searchPanel.rows.map(([k, v]) => (
          <div key={k}><dt>{k}: </dt><dd>{v}</dd></div>
        ))}
      </dl>
      <a className="sr-btn" href={SEARCH_WA} target="_blank" rel="noopener noreferrer">{searchPanel.cta}</a>
    </aside>
  );
}
```

- [ ] **Step 4: Montarlos**

En `ServiceTraffic.jsx` importar `SrPaa`, `SrMore` y `SrPanel` (cada import en su propia línea) y dejar el cuerpo así:

```jsx
          <div className="sr-body">
            <div className="sr-main">
              <SrAd />
              <SrOrganic />
              <SrCases />
              <SrPaa />
              <SrMore />
            </div>
            <SrPanel />
          </div>
```

- [ ] **Step 5: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: en escritorio el panel queda a la derecha y se mantiene fijo al hacer scroll; en 375 px aparece al final, bajo los anuncios recomendados; "Otras preguntas" se abre y cierra; los dos anuncios recomendados llevan a `/servicios/ecosistemas` y `/servicios/autoridad`; el enlace "Precio" del anuncio baja al panel.

- [ ] **Step 6: Commit**

```bash
git add src/components/SearchPage/SrPaa.jsx src/components/SearchPage/SrMore.jsx src/components/SearchPage/SrPanel.jsx src/components/Views/ServiceTraffic.jsx
git commit -m "feat(ads): add people-also-ask, recommended ads and company panel, page complete"
```

---

### Task 6: Pulido y verificación final

**Files:**
- Modify: `src/components/SearchPage/searchPage.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: ventana centrada (máx. 1120 px); resultados a la izquierda (máx. 660 px) y panel a la derecha, fijo; la barra de búsqueda termina de escribir y deja el cursor parpadeando; títulos azules y subrayado al pasar el cursor.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth`; la barra de búsqueda no desborda (texto con puntos suspensivos si no cabe); el carril de casos se desplaza dentro de su caja; botones y filas de "Otras preguntas" ≥44 px; las 3 métricas del panel caben en una fila.

- [ ] **Step 3: Teclado y movimiento reducido**

Con Tab: foco visible (contorno oscuro) en enlaces del anuncio, botones, resúmenes, casos y carril; Enter/Espacio abren los resultados. Con "reducir movimiento": la búsqueda aparece completa y sin cursor animado.

- [ ] **Step 4: SEO y regresiones**

Comprobar en la consola del navegador:

```js
({ h1: document.querySelectorAll('h1').length, results: document.querySelectorAll('details.sr-result').length, inDom: document.body.textContent.includes('duplicar la inversión') })
```
Expected: `{ h1: 1, results: 5, inDom: true }`.
Run: `npm run build` → `✓ built in`. La home sigue enlazando a `/servicios/trafico`; las demás páginas de servicio sin cambios.

- [ ] **Step 5: ¿Vende?**

Sin guía: ¿se entiende qué es Meta Ads, qué incluye, cuánto cuesta aproximadamente, en cuánto tiempo se ven resultados y cómo pedir la auditoría? Accesos a WhatsApp: el anuncio y el panel. Si falta claridad, ajustar copy en `src/data/searchPage.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(ads): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura del pedido:** ventana de búsqueda genérica (Tasks 2–3), "Anuncio" como primer resultado y "Anuncios recomendados" al final (Tasks 3 y 5), resultados orgánicos que explican el servicio (Task 4), contraste con la búsqueda y Meta (resultado `sr-contraste`), FAQ como "Otras preguntas" y precio en el panel (Task 5), SEO con un solo `<h1>` y texto siempre en el DOM (Task 6), accesibilidad y móvil (Task 6).
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `searchQuery`, `searchAd`, `searchResults`, `searchCases`, `searchPaa`, `searchPanel`, `searchMore`, `SEARCH_WA` (Task 1) se usan igual en Tasks 3–5; ids de enlace (`sr-incluye`, `sr-algoritmo`, `sr-casos`, `sr-panel`) existen en datos y componentes; clases `.sr-*` definidas en Task 2 antes de usarse.
- **Riesgos conocidos:** el `<h1>` contiene el texto "Anuncio ·" además del título (como en una búsqueda real); si molesta para SEO, mover el rótulo a un `<span aria-hidden>`. El enlace "Casos" del anuncio apunta a una sección (no a un `<details>`), por eso `openTarget` solo abre elementos `DETAILS`.
