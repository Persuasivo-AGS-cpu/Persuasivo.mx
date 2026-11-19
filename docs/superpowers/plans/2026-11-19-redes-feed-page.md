# Página Redes (la página es un feed) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/servicios/autoridad` (servicio "Copywriting & Redes") para que **la página sea un feed de redes sociales**: cada sección es una publicación (carrusel que se desliza, encuesta que responde, historias de casos, calendario editorial, comentarios que contestan las dudas). Quien hace scroll está "scrolleando un feed", y a la vez ve exactamente lo que Persuasivo hace por una marca, con diagnóstico por WhatsApp.

**Architecture:** Mismo método que Web, Branding y Video: texto en HTML real (SEO, accesible, responsivo), creatividad en CSS + Framer Motion, y copy movido a `src/data/feedPage.js`. Un primitivo `Post` (cabecera con avatar, cuerpo, pie con botón "me gusta") envuelve cada sección. Los textos salen de `servicesData.js` (`getServiceBySlug('autoridad')`: descripción, capacidades, FAQ), no se inventan cifras. Estado local solo donde hay interacción: carrusel, encuesta, "me gusta".

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, react-helmet-async. Sin dependencias ni assets nuevos (se reutilizan `/showcase/auth1-3.jpg`). Look neutro de red social, sin logos ni marcas de terceros.

**Contraste deliberado:** Web = blanco y trazo; Branding = papel cálido; Video = oscuro cinematográfico; Redes = gris claro de app con tarjetas blancas y lima de marca.

**Cambios respecto a la página actual:** la actual es oscura, usa `setView('contact')` (sin WhatsApp), una imagen placeholder inexistente y textos como "Metodología 02" y "Aniquilación de Objeciones". La nueva se enfoca en **redes** (la de Branding ya cubre identidad y narrativa), usa WhatsApp y conserva el mensaje central ("Si suenas igual que todos, te cobrarán como a todos").

**Fuera de alcance (a propósito):** feed infinito real, contadores de likes (no se inventan números), publicar en redes desde la página, rediseño de otras páginas. La ruta `/servicios/autoridad` y la firma `ServiceAuthority({ setView })` se conservan (el prop ya no se usa).

**Riesgos a confirmar antes de publicar:**
- El FAQ viene de `servicesData.js` y la 3.ª respuesta afirma "85% de aumento en solicitudes de cotización y 75% menos objeciones por precio". Abraham debe confirmar que esa cifra sigue vigente.
- El precio "desde $12,000 MXN al mes" sale de ese mismo FAQ.
- El calendario es un ejemplo ilustrativo (5 publicaciones por semana); la frecuencia real depende de plataformas y objetivos, y la página lo dice.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/servicios/autoridad`; consola sin errores.
3. Revisar a 1280 px y a 375 px (sin scroll horizontal de la página; carrusel e historias se desplazan dentro de su caja).
4. Los imports en `src/data/*.js` usan extensión `.js` (Node ESM lo necesita para `node -e`).
5. Esperar ~8 s tras una navegación completa antes de capturar pantalla: el sitio tiene un fundido de entrada lento.

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/data/feedPage.js` | Crear | Todo el copy de la página |
| `src/components/FeedPage/feedPage.css` | Crear | Estilo de app: columna de feed, posts, carrusel, historias, calendario |
| `src/components/FeedPage/Post.jsx` | Crear | Publicación: avatar, meta, cuerpo, "me gusta" |
| `src/components/FeedPage/FpProfile.jsx` | Crear | Barra de perfil fija con botón a WhatsApp |
| `src/components/FeedPage/FpHero.jsx` | Crear | Post 1: h1 como pie de foto + CTA |
| `src/components/FeedPage/FpCarousel.jsx` | Crear | Post 2: carrusel de 6 capacidades |
| `src/components/FeedPage/FpPoll.jsx` | Crear | Post 3: encuesta que responde con lo que hacemos |
| `src/components/FeedPage/FpStories.jsx` | Crear | Post 4: casos como historias |
| `src/components/FeedPage/FpCalendar.jsx` | Crear | Post 5: calendario editorial de un mes |
| `src/components/FeedPage/FpComments.jsx` | Crear | Post 6: FAQ como comentarios y respuestas |
| `src/components/FeedPage/FpCta.jsx` | Crear | Post 7: "link en bio" + diagnóstico |
| `src/components/Views/ServiceAuthority.jsx` | Reescribir | Compone el feed + SEO |

---

### Task 1: Datos (`feedPage.js`)

**Files:**
- Create: `src/data/feedPage.js`

- [ ] **Step 1: Crear el archivo**

```js
import { waLink } from './contact.js';
import { getServiceBySlug } from './servicesData.js';

const svc = getServiceBySlug('autoridad');

export const FEED_WA = waLink('Hola, me interesa la gestión de redes para mi empresa');

export const feedProfile = {
  name: 'persuasivo.mx',
  role: 'Copywriting & Redes',
  follow: 'Seguir',
  followLabel: 'Escribir por WhatsApp',
};

export const feedHero = {
  meta: 'Copywriting & Redes',
  title: 'Si suenas igual que todos, te cobrarán como a todos.',
  sub: svc.desc,
  tags: ['#Copywriting', '#IdentidadVisual', '#LinkedIn'],
  cta: 'Solicitar diagnóstico',
};

export const feedCarousel = {
  meta: 'Qué hacemos · desliza →',
  title: 'Lo que hacemos por tu marca',
  slides: svc.capabilities,
};

export const feedPoll = {
  meta: 'Encuesta',
  question: '¿Qué te frena en redes?',
  options: [
    { label: 'No tengo tiempo', answer: 'Nosotros creamos todo: copy, diseño visual y estrategia editorial. Tú solo haces una sesión inicial de onboarding.' },
    { label: 'No sé qué publicar', answer: 'Armamos calendarios editoriales con contenido de valor, planeados por mes.' },
    { label: 'No veo resultados', answer: 'Escribimos sobre el dolor de tu cliente y posicionamos tu solución, para que el prospecto llegue ya convencido del valor de lo que ofreces.' },
  ],
};

export const feedStories = {
  meta: 'Casos',
  title: 'Marcas que ya publican con criterio',
  slugs: ['manifiesto-marca', 'arquitectura-visual', 'sistema-liderazgo'],
};

export const feedCalendar = {
  meta: 'Calendario editorial',
  title: 'Así se ve un mes de contenido',
  note: 'Ejemplo ilustrativo: la frecuencia real depende de tus plataformas y objetivos.',
  weeks: 4,
  dayHeads: ['L', 'M', 'M', 'J', 'V'],
  dayNames: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'],
  types: [
    { id: 'educa', label: 'Educa', desc: 'Enseña algo útil a tu cliente.' },
    { id: 'caso', label: 'Caso', desc: 'Muestra un resultado real.' },
    { id: 'opina', label: 'Opina', desc: 'Tu criterio como líder, ideal para LinkedIn.' },
    { id: 'equipo', label: 'Equipo', desc: 'Detrás de cámaras, personas reales.' },
    { id: 'pregunta', label: 'Pregunta', desc: 'Abre conversación con tu audiencia.' },
  ],
};

export const feedComments = {
  meta: 'Comentarios',
  title: 'Lo que más nos preguntan',
  items: svc.faq.map((f) => [f.question, f.answer]),
};

export const feedCta = {
  meta: 'Link en bio ↓',
  title: '¿Hablamos de tus redes?',
  text: 'En el diagnóstico revisamos tu narrativa y tus plataformas, y te proponemos un calendario con el contenido que sí vende.',
  price: 'Gestión de redes desde $12,000 MXN al mes. El alcance se define según plataformas y frecuencia.',
  button: 'Solicitar diagnóstico',
};
```

- [ ] **Step 2: Verificar**

Run:
```bash
node -e "import('./src/data/feedPage.js').then(m=>console.log(m.feedCarousel.slides.length, m.feedPoll.options.length, m.feedComments.items.length, m.feedStories.slugs.length, m.feedCalendar.types.length))"
```
Expected: `6 3 3 3 5`

- [ ] **Step 3: Commit**

```bash
git add src/data/feedPage.js
git commit -m "feat(redes): add feed page copy data"
```

---

### Task 2: CSS, `Post` y barra de perfil

**Files:**
- Create: `src/components/FeedPage/feedPage.css`
- Create: `src/components/FeedPage/Post.jsx`
- Create: `src/components/FeedPage/FpProfile.jsx`

- [ ] **Step 1: Crear `feedPage.css`**

```css
.fp-page { --fp-lime: #E0FF31; --fp-ink: #111; --fp-line: rgba(0, 0, 0, 0.1); background: var(--bg-void); color: var(--fp-ink); min-height: 100vh; padding: 64px 4vw 8vw; font-family: var(--font-body); }
.fp-feed { max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
.fp-vh { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* perfil fijo */
.fp-profile { position: sticky; top: 64px; z-index: 5; display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; margin: 0 -4vw 1.5rem; background: rgba(242, 242, 242, 0.92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--fp-line); }
@media (min-width: 640px) { .fp-profile { margin: 0 0 1.5rem; border-radius: 0 0 14px 14px; border: 1px solid var(--fp-line); border-top: 0; } }
.fp-profile-id { flex: 1; min-width: 0; line-height: 1.2; }
.fp-profile-id strong { display: block; }
.fp-profile-id span { color: var(--text-secondary); font-size: 0.85rem; }
.fp-follow { display: inline-flex; align-items: center; min-height: 44px; padding: 0 1.25rem; border-radius: var(--radius-full); background: var(--fp-ink); color: #fff; font-weight: 600; text-decoration: none; }
.fp-avatar { display: grid; place-items: center; width: 40px; height: 40px; flex: none; border-radius: 50%; background: var(--fp-lime); color: var(--fp-ink); font-weight: 800; }

/* publicación */
.fp-post { background: #fff; border: 1px solid var(--fp-line); border-radius: 18px; box-shadow: 0 2px 14px rgba(0, 0, 0, 0.05); overflow: hidden; }
.fp-post-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.9rem 1rem; }
.fp-post-head strong { display: block; line-height: 1.2; }
.fp-post-head span { color: var(--text-secondary); font-size: 0.85rem; }
.fp-post-body { padding: 0 1rem 1rem; }
.fp-post-foot { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem 0.75rem; border-top: 1px solid var(--fp-line); }
.fp-like { display: grid; place-items: center; width: 44px; height: 44px; border: 0; background: transparent; border-radius: 50%; cursor: pointer; color: var(--fp-ink); }
.fp-like svg { fill: none; stroke: currentColor; stroke-width: 2; transition: transform 0.2s; }
.fp-like[aria-pressed='true'] svg { fill: #e5484d; stroke: #e5484d; transform: scale(1.15); }
.fp-tags { color: var(--text-secondary); font-size: 0.9rem; }
.fp-btn:focus-visible, .fp-follow:focus-visible, .fp-like:focus-visible, .fp-opt:focus-visible, .fp-nav:focus-visible, .fp-slides:focus-visible, .fp-story:focus-visible { outline: 3px solid var(--fp-ink); outline-offset: 3px; }

/* tipografía */
.fp-h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.2rem, 7vw, 3.2rem); line-height: 1; letter-spacing: -0.02em; margin: 0.5rem 0 1rem; }
.fp-h2 { font-family: var(--font-display); font-weight: 400; font-size: 1.9rem; line-height: 1.05; margin: 0 0 1rem; }
.fp-p { margin: 0 0 1rem; color: var(--text-secondary); line-height: 1.6; }
.fp-btn { display: inline-flex; align-items: center; min-height: 48px; padding: 0 1.75rem; border-radius: var(--radius-full); background: var(--fp-lime); color: var(--fp-ink); font-weight: 700; text-decoration: none; transition: transform 0.2s; }
.fp-btn:hover { transform: translateY(-2px); }

/* carrusel */
.fp-carousel { position: relative; }
.fp-slides { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; border-radius: 12px; }
.fp-slides::-webkit-scrollbar { display: none; }
.fp-slide { flex: 0 0 100%; scroll-snap-align: center; aspect-ratio: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; }
.fp-slide b { font-family: var(--font-display); font-weight: 400; font-size: 3.5rem; line-height: 1; }
.fp-slide p { margin: 0; font-family: var(--font-display); font-size: clamp(1.6rem, 6vw, 2.2rem); line-height: 1.1; }
.fp-slide--0 { background: var(--fp-lime); } .fp-slide--1 { background: var(--fp-ink); color: #fff; } .fp-slide--2 { background: #bfe0ff; }
.fp-slide--3 { background: #ffd6a8; } .fp-slide--4 { background: #111; color: var(--fp-lime); } .fp-slide--5 { background: #d4c8ff; }
.fp-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(255, 255, 255, 0.9); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); cursor: pointer; font-size: 1.2rem; }
.fp-nav--prev { left: 8px; } .fp-nav--next { right: 8px; }
.fp-dots { display: flex; justify-content: center; gap: 6px; padding-top: 0.75rem; }
.fp-dots i { width: 7px; height: 7px; border-radius: 50%; background: var(--fp-line); }
.fp-dots i[data-on='true'] { background: var(--fp-ink); }

/* encuesta */
.fp-opts { display: grid; gap: 0.6rem; }
.fp-opt { min-height: 48px; text-align: left; padding: 0 1rem; border-radius: 12px; border: 1.5px solid var(--fp-ink); background: transparent; font: inherit; font-weight: 600; cursor: pointer; }
.fp-opt[aria-pressed='true'] { background: var(--fp-ink); color: #fff; }
.fp-answer { margin: 1rem 0 0; padding: 1rem; border-radius: 12px; background: var(--fp-lime); line-height: 1.5; }

/* historias */
.fp-stories { display: flex; gap: 1rem; overflow-x: auto; padding: 0.25rem 0 0.5rem; }
.fp-story { flex: 0 0 auto; width: 92px; text-align: center; text-decoration: none; color: inherit; font-size: 0.8rem; line-height: 1.2; }
.fp-ring { display: block; padding: 3px; border-radius: 50%; background: conic-gradient(#E0FF31, #8ab4ff, #ff9b73, #E0FF31); margin-bottom: 0.4rem; }
.fp-ring img { display: block; width: 100%; aspect-ratio: 1; border-radius: 50%; object-fit: cover; border: 3px solid #fff; }

/* calendario */
.fp-cal { list-style: none; padding: 0; margin: 0 0 1rem; display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
.fp-cal-head { text-align: center; font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
.fp-day { position: relative; display: grid; place-items: center; min-height: 44px; border-radius: 8px; font-size: 0.68rem; font-weight: 700; text-align: center; padding: 0 2px; color: var(--fp-ink); }
.fp-day--educa { background: #E0FF31; } .fp-day--caso { background: #bfe0ff; } .fp-day--opina { background: #ffd6a8; }
.fp-day--equipo { background: #ffc4d6; } .fp-day--pregunta { background: #d4c8ff; }
.fp-legend { list-style: none; padding: 0; margin: 0 0 1rem; display: grid; gap: 0.4rem; font-size: 0.9rem; color: var(--text-secondary); }
.fp-legend b { color: var(--fp-ink); }

/* comentarios */
.fp-thread { display: grid; gap: 1.25rem; }
.fp-comment { display: flex; gap: 0.6rem; }
.fp-comment .fp-avatar { width: 34px; height: 34px; font-size: 0.85rem; background: #e5e7eb; }
.fp-bubble { background: #f4f4f5; border-radius: 14px; padding: 0.6rem 0.9rem; line-height: 1.45; }
.fp-bubble strong { display: block; font-size: 0.85rem; }
.fp-reply { margin: 0.5rem 0 0 1rem; display: flex; gap: 0.6rem; }
.fp-reply .fp-bubble { background: #f6fbd0; }

@media (prefers-reduced-motion: reduce) { .fp-btn, .fp-like svg { transition: none; } .fp-slides { scroll-behavior: auto; } }
```

- [ ] **Step 2: Crear `Post.jsx`**

```jsx
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Publicación del feed. El "me gusta" es solo un gesto: no hay contadores ni datos inventados.
export default function Post({ meta, children, tags }) {
  const reduce = useReducedMotion();
  const [liked, setLiked] = useState(false);
  return (
    <motion.article className="fp-post"
      initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.5 }}>
      <header className="fp-post-head">
        <span className="fp-avatar" aria-hidden="true">P</span>
        <div><strong>persuasivo.mx</strong><span>{meta}</span></div>
      </header>
      <div className="fp-post-body">{children}</div>
      <footer className="fp-post-foot">
        <button type="button" className="fp-like" aria-pressed={liked} aria-label="Me gusta" onClick={() => setLiked((l) => !l)}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        {tags && <span className="fp-tags">{tags.join(' ')}</span>}
      </footer>
    </motion.article>
  );
}
```

- [ ] **Step 3: Crear `FpProfile.jsx`**

```jsx
import React from 'react';
import { feedProfile, FEED_WA } from '../../data/feedPage';

export default function FpProfile() {
  return (
    <div className="fp-profile">
      <span className="fp-avatar" aria-hidden="true">P</span>
      <div className="fp-profile-id"><strong>{feedProfile.name}</strong><span>{feedProfile.role}</span></div>
      <a className="fp-follow" href={FEED_WA} target="_blank" rel="noopener noreferrer" aria-label={feedProfile.followLabel}>
        {feedProfile.follow}
      </a>
    </div>
  );
}
```

- [ ] **Step 4: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 5: Commit**

```bash
git add src/components/FeedPage/feedPage.css src/components/FeedPage/Post.jsx src/components/FeedPage/FpProfile.jsx
git commit -m "feat(redes): add feed styles, Post primitive and profile bar"
```

---

### Task 3: Hero (post 1) y página montada

**Files:**
- Create: `src/components/FeedPage/FpHero.jsx`
- Rewrite: `src/components/Views/ServiceAuthority.jsx`

- [ ] **Step 1: Crear `FpHero.jsx`**

```jsx
import React from 'react';
import Post from './Post';
import { feedHero, FEED_WA } from '../../data/feedPage';

export default function FpHero() {
  return (
    <Post meta={feedHero.meta} tags={feedHero.tags}>
      <h1 className="fp-h1">{feedHero.title}</h1>
      <p className="fp-p">{feedHero.sub}</p>
      <a className="fp-btn" href={FEED_WA} target="_blank" rel="noopener noreferrer">{feedHero.cta}</a>
    </Post>
  );
}
```

- [ ] **Step 2: Reescribir `ServiceAuthority.jsx` (solo perfil + hero por ahora)**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import FpProfile from '../FeedPage/FpProfile';
import FpHero from '../FeedPage/FpHero';
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
        <FpProfile />
        <div className="fp-feed">
          <FpHero />
        </div>
      </main>
      <Footer setView={setView} />
    </motion.div>
  );
}
```

- [ ] **Step 3: Verificar en navegador**

Run: `npm run build` → `✓ built in`. Abrir `/servicios/autoridad` (esperar ~8 s).
Expected: gris claro, barra de perfil fija bajo la navbar con botón "Seguir" que abre WhatsApp, primer post con el `<h1>`; el corazón se rellena de rojo al pulsarlo; consola limpia.

- [ ] **Step 4: Commit**

```bash
git add src/components/FeedPage/FpHero.jsx src/components/Views/ServiceAuthority.jsx
git commit -m "feat(redes): feed hero post and sticky profile on /servicios/autoridad"
```

---

### Task 4: Carrusel + Encuesta

**Files:**
- Create: `src/components/FeedPage/FpCarousel.jsx`
- Create: `src/components/FeedPage/FpPoll.jsx`
- Modify: `src/components/Views/ServiceAuthority.jsx`

- [ ] **Step 1: Crear `FpCarousel.jsx`**

```jsx
import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Post from './Post';
import { feedCarousel } from '../../data/feedPage';

export default function FpCarousel() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { slides } = feedCarousel;

  const go = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };
  const onScroll = () => {
    const el = ref.current;
    if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <Post meta={feedCarousel.meta}>
      <h2 className="fp-h2">{feedCarousel.title}</h2>
      <div className="fp-carousel">
        <div ref={ref} className="fp-slides" onScroll={onScroll} tabIndex={0}
          role="group" aria-roledescription="carrusel" aria-label="Lo que hacemos por tu marca (desliza)">
          {slides.map((s, i) => (
            <div key={s} className={`fp-slide fp-slide--${i % 6}`} role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${slides.length}`}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <p>{s}</p>
            </div>
          ))}
        </div>
        <button type="button" className="fp-nav fp-nav--prev" aria-label="Anterior" onClick={() => go(-1)}>‹</button>
        <button type="button" className="fp-nav fp-nav--next" aria-label="Siguiente" onClick={() => go(1)}>›</button>
        <div className="fp-dots" aria-hidden="true">{slides.map((s, i) => <i key={s} data-on={i === idx} />)}</div>
      </div>
    </Post>
  );
}
```

- [ ] **Step 2: Crear `FpPoll.jsx`**

```jsx
import React, { useState } from 'react';
import Post from './Post';
import { feedPoll } from '../../data/feedPage';

export default function FpPoll() {
  const [sel, setSel] = useState(null);
  return (
    <Post meta={feedPoll.meta}>
      <h2 className="fp-h2">{feedPoll.question}</h2>
      <div className="fp-opts" role="group" aria-label={feedPoll.question}>
        {feedPoll.options.map((o, i) => (
          <button key={o.label} type="button" className="fp-opt" aria-pressed={sel === i} onClick={() => setSel(i)}>{o.label}</button>
        ))}
      </div>
      <p className="fp-answer" aria-live="polite" hidden={sel === null}>
        {sel !== null ? feedPoll.options[sel].answer : ''}
      </p>
    </Post>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceAuthority.jsx` importar `FpCarousel` y `FpPoll` y agregar, después de `<FpHero />`:

```jsx
          <FpCarousel />
          <FpPoll />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: el carrusel se desliza con los botones, con el dedo/trackpad y con flechas del teclado (enfocado); los puntos siguen la diapositiva; al elegir una opción de la encuesta aparece la respuesta lima y la opción queda oscura.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeedPage/FpCarousel.jsx src/components/FeedPage/FpPoll.jsx src/components/Views/ServiceAuthority.jsx
git commit -m "feat(redes): add swipe carousel and answering poll posts"
```

---

### Task 5: Historias (casos) + Calendario

**Files:**
- Create: `src/components/FeedPage/FpStories.jsx`
- Create: `src/components/FeedPage/FpCalendar.jsx`
- Modify: `src/components/Views/ServiceAuthority.jsx`

- [ ] **Step 1: Crear `FpStories.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { feedStories } from '../../data/feedPage';

export default function FpStories() {
  const cases = feedStories.slugs.map(getProjectBySlug).filter(Boolean);
  if (!cases.length) return null;
  return (
    <Post meta={feedStories.meta}>
      <h2 className="fp-h2">{feedStories.title}</h2>
      <div className="fp-stories">
        {cases.map((c) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="fp-story">
            <span className="fp-ring">{c.img && <img src={c.img} alt="" loading="lazy" />}</span>
            {c.title}
          </Link>
        ))}
      </div>
    </Post>
  );
}
```

- [ ] **Step 2: Crear `FpCalendar.jsx`**

```jsx
import React from 'react';
import Post from './Post';
import { feedCalendar as cal } from '../../data/feedPage';

export default function FpCalendar() {
  const cells = Array.from({ length: cal.weeks * cal.dayHeads.length }, (_, i) => {
    const w = Math.floor(i / cal.dayHeads.length);
    const d = i % cal.dayHeads.length;
    return { w, d, t: cal.types[(w + d) % cal.types.length] };
  });
  return (
    <Post meta={cal.meta}>
      <h2 className="fp-h2">{cal.title}</h2>
      <ol className="fp-cal">
        {cal.dayHeads.map((h, i) => <li key={i} className="fp-cal-head" aria-hidden="true">{h}</li>)}
        {cells.map(({ w, d, t }) => (
          <li key={`${w}-${d}`} className={`fp-day fp-day--${t.id}`}>
            <span className="fp-vh">Semana {w + 1}, {cal.dayNames[d]}: </span>{t.label}
          </li>
        ))}
      </ol>
      <ul className="fp-legend">
        {cal.types.map((t) => <li key={t.id}><b>{t.label}:</b> {t.desc}</li>)}
      </ul>
      <p className="fp-p" style={{ marginBottom: 0, fontSize: '0.85rem' }}>{cal.note}</p>
    </Post>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceAuthority.jsx` importar `FpStories` y `FpCalendar` y agregar, después de `<FpPoll />`:

```jsx
          <FpStories />
          <FpCalendar />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 3 historias con aro de color que llevan a `/work/<slug>`; calendario de 4 semanas × 5 días con 5 colores que rotan por semana y su leyenda; la nota de "ejemplo ilustrativo" visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeedPage/FpStories.jsx src/components/FeedPage/FpCalendar.jsx src/components/Views/ServiceAuthority.jsx
git commit -m "feat(redes): add case stories and editorial calendar posts"
```

---

### Task 6: Comentarios (FAQ) + Cierre

**Files:**
- Create: `src/components/FeedPage/FpComments.jsx`
- Create: `src/components/FeedPage/FpCta.jsx`
- Modify: `src/components/Views/ServiceAuthority.jsx`

- [ ] **Step 1: Crear `FpComments.jsx`**

```jsx
import React from 'react';
import Post from './Post';
import { feedComments } from '../../data/feedPage';

export default function FpComments() {
  return (
    <Post meta={feedComments.meta}>
      <h2 className="fp-h2">{feedComments.title}</h2>
      <div className="fp-thread">
        {feedComments.items.map(([q, a]) => (
          <div key={q}>
            <div className="fp-comment">
              <span className="fp-avatar" aria-hidden="true">?</span>
              <div className="fp-bubble"><strong>Un cliente</strong>{q}</div>
            </div>
            <div className="fp-reply">
              <span className="fp-avatar" aria-hidden="true">P</span>
              <div className="fp-bubble"><strong>persuasivo.mx</strong>{a}</div>
            </div>
          </div>
        ))}
      </div>
    </Post>
  );
}
```

- [ ] **Step 2: Crear `FpCta.jsx`**

```jsx
import React from 'react';
import Post from './Post';
import { feedCta, FEED_WA } from '../../data/feedPage';

export default function FpCta() {
  return (
    <Post meta={feedCta.meta}>
      <h2 className="fp-h2">{feedCta.title}</h2>
      <p className="fp-p">{feedCta.text}</p>
      <a className="fp-btn" href={FEED_WA} target="_blank" rel="noopener noreferrer">{feedCta.button}</a>
      <p className="fp-p" style={{ margin: '1rem 0 0', fontSize: '0.9rem' }}>{feedCta.price}</p>
    </Post>
  );
}
```

- [ ] **Step 3: Montarlos**

En `ServiceAuthority.jsx` importar `FpComments` y `FpCta` y agregar, después de `<FpCalendar />`:

```jsx
          <FpComments />
          <FpCta />
```

- [ ] **Step 4: Verificar**

Run: `npm run build` → `✓ built in`. En el navegador: 3 preguntas como comentarios con su respuesta de `persuasivo.mx`; el último post tiene el botón a WhatsApp y la línea de precio.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeedPage/FpComments.jsx src/components/FeedPage/FpCta.jsx src/components/Views/ServiceAuthority.jsx
git commit -m "feat(redes): add comments FAQ and closing CTA, page complete"
```

---

### Task 7: Pulido y verificación final

**Files:**
- Modify: `src/components/FeedPage/feedPage.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: columna de feed centrada (560 px); la barra de perfil queda fija bajo la navbar sin taparla ni dejar hueco; ningún post se corta.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth`; botones, opciones, "me gusta", flechas del carrusel y celdas del calendario ≥44 px; las etiquetas del calendario ("Pregunta", "Equipo") caben en su celda; la barra de perfil no desborda.

- [ ] **Step 3: Teclado y movimiento reducido**

Con Tab: foco visible (contorno oscuro) en "Seguir", "me gusta", flechas, carrusel, opciones de encuesta, historias y botones; las flechas del teclado desplazan el carrusel enfocado. Con "reducir movimiento": los posts aparecen sin entrada animada y el carrusel salta sin desplazamiento suave.

- [ ] **Step 4: Build limpio y regresiones**

Run: `npm run build`
Expected: `✓ built in`. Consola sin errores. La home sigue enlazando a `/servicios/autoridad`; `/servicios/branding`, `/servicios/ecosistemas` y `/contenido` sin cambios.

- [ ] **Step 5: ¿Vende?**

Sin guía: ¿se entiende qué hace Persuasivo por las redes (copy, identidad visual, calendario, LinkedIn), cuánto cuesta aproximadamente y cómo pedir el diagnóstico? Hay tres accesos a WhatsApp (barra de perfil, hero y cierre). Si falta claridad, ajustar copy en `src/data/feedPage.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(redes): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura:** la página es un feed (Tasks 2–6); cada servicio que ofrece Redes (copy, identidad visual para feeds, calendarios editoriales, thought leadership en LinkedIn, gestión integral) aparece en el carrusel y el calendario, con respuestas a objeciones en encuesta y comentarios; casos en historias; conversión con WhatsApp en barra de perfil, hero y cierre; SEO nuevo coherente con el servicio (título, descripción y canonical propios, un solo `<h1>`); accesibilidad y móvil en Task 7.
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `feedProfile`, `feedHero`, `feedCarousel`, `feedPoll`, `feedStories`, `feedCalendar` (importado como `cal`), `feedComments`, `feedCta`, `FEED_WA` (Task 1) se usan igual en Tasks 2–6; clases `.fp-*` definidas en Task 2 antes de usarse; `Post` acepta `meta`, `tags` y `children`.
- **Riesgos conocidos:** el CSS del calendario usa celdas de 44 px mínimo, pero en 320 px de ancho "Pregunta" a 0.68rem podría recortarse (Task 7, Step 2 lo revisa); `hidden` en el párrafo de la encuesta mantiene el `aria-live` montado para que el lector anuncie la respuesta al aparecer.
