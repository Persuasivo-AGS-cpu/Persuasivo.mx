# Home Visual Redesign (Levitt-style) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la home de Persuasivo para que diga con claridad qué hacemos y se vea tan atractiva como levitt.mx: hero concreto con WhatsApp, lista tipográfica de servicios (Branding primero, Video incluido), portafolio en marcos de celular, franja de valores, cifras y testimonios reales, y CTA fijo en la navbar.

**Architecture:** Se conserva el tema claro editorial actual (variables CSS, Instrument Serif + DM Sans) y la estructura React + Framer Motion. Las secciones nuevas se extraen a `src/components/Home/` (un archivo por sección) y `AgencyHome.jsx` solo las compone. Los textos de servicios y testimonios viven en `src/data/` para editarlos sin tocar componentes.

**Tech Stack:** React 18, Vite, Framer Motion 11, React Router, react-helmet-async. No hay framework de pruebas: cada tarea se verifica con `npm run build` más una revisión en el navegador (ver "Verificación").

**Spec relacionado:** `docs/superpowers/specs/2026-05-15-conversion-redesign-design.md` (hero, métricas y CTA). Este plan no cubre GA4, sitemap, blog, 404 ni cookies: siguen en ese spec.

**Fuera de alcance (a propósito):** efecto magnético del botón (opcional en el spec) y rediseño de las páginas de servicio existentes. La página de Branding sí está incluida (Task 11).

---

## Verificación (aplica a todas las tareas)

No hay pruebas automáticas. "Verificar" significa:

1. `npm run build` termina con `✓ built in`.
2. Servidor de desarrollo: `npm run dev -- --port 5180` y abrir `http://localhost:5180/`.
3. La consola del navegador no muestra errores.

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `.gitignore` | Crear | Dejar de versionar `node_modules` y `dist` |
| `src/data/contact.js` | Crear | `waLink(texto)`: único lugar con el número de WhatsApp |
| `src/data/homeServices.js` | Crear | Los 5 servicios de la lista de la home |
| `src/data/testimonials.js` | Crear | Testimonios reales (solo reales) |
| `src/components/Home/ServiceList.jsx` | Crear | Lista tipográfica de servicios |
| `src/components/Home/ValuesRibbon.jsx` | Crear | Cinta inclinada de valores |
| `src/components/Home/PhoneFrame.jsx` | Crear | Marco de celular para capturas |
| `src/components/Home/MetricsBand.jsx` | Crear | Cifras con conteo animado |
| `src/components/Home/Testimonials.jsx` | Crear | Sección de testimonios |
| `src/components/Views/LandingHero.jsx` | Reescribir | Hero concreto con CTA |
| `src/components/Navigation/GlassNavbar.jsx` | Modificar | Botón "Comenzar" a WhatsApp |
| `src/components/Views/AgencyHome.jsx` | Reescribir | Compone las secciones |
| `src/components/Views/ServiceBranding.jsx` | Crear | Página `/servicios/branding` |
| `src/App.jsx` | Modificar | Registrar la ruta de Branding |
| `src/data/servicesData.js` | Modificar | Branding como primer servicio del hub |

---

### Task 0: Línea base del repositorio

`node_modules/` (499 archivos) y `dist/` (28) están versionados y borrados en el árbol de trabajo, y no existe `.gitignore`. Hay que resolverlo antes de commitear nada.

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Crear `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 2: Dejar de versionar dependencias y build**

Run: `git rm -r --cached node_modules dist -q && git status --short | head -5`
Expected: líneas `D  node_modules/...` / `D  dist/...` en el índice, sin error.

- [ ] **Step 3: Instalar dependencias y comprobar que compila**

Run: `npm install --silent && npm run build 2>&1 | tail -3`
Expected: termina con `✓ built in`.

- [ ] **Step 4: Commit de la línea base**

Pregunta a Abraham si el resto de cambios pendientes (`git status`) se incluyen. Si sí:

```bash
git add -A
git commit -m "chore: baseline — ignore node_modules/dist and commit pending site work"
```

Si no, commitear solo `.gitignore` y el `git rm --cached`:

```bash
git add .gitignore
git commit -m "chore: stop tracking node_modules and dist"
```

---

### Task 1: Datos compartidos

**Files:**
- Create: `src/data/contact.js`
- Create: `src/data/homeServices.js`
- Create: `src/data/testimonials.js`

- [ ] **Step 1: Crear `src/data/contact.js`**

```js
export const WA_NUMBER = '528110731510';

export const waLink = (text = 'Hola, quiero una cotización') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
```

- [ ] **Step 2: Crear `src/data/homeServices.js`**

Cada servicio usa `to` (ruta interna) o `href` (enlace externo). Branding aún no tiene página, así que abre WhatsApp.

```js
import { waLink } from './contact';

export const homeServices = [
  {
    word: 'Branding',
    detail: 'Identidad de marca, estrategia, posicionamiento y rediseño',
    href: waLink('Hola, me interesa branding para mi empresa'),
  },
  {
    word: 'Web',
    detail: 'Desarrollo a la medida con React, UX/UI y SEO técnico',
    to: '/servicios/ecosistemas',
  },
  {
    word: 'Contenido',
    detail: 'Campañas de video mensuales para explicar tu producto y posicionar a tus líderes',
    to: '/contenido',
  },
  {
    word: 'Redes',
    detail: 'Copywriting, identidad visual y gestión de redes sociales',
    to: '/servicios/autoridad',
  },
  {
    word: 'Ads',
    detail: 'Meta Ads, audiencias, embudos y optimización por conversión',
    to: '/servicios/trafico',
  },
];
```

- [ ] **Step 3: Crear `src/data/testimonials.js`**

Solo testimonios reales. La cita de Elite Seguridad viene del spec (sección 3.4). No inventar otros: agregar cada uno cuando el cliente lo autorice.

```js
export const testimonials = [
  {
    quote: 'Diseño profesional con alto impacto en digital — exactamente lo que necesitamos para proyectar confianza a nuestros clientes.',
    name: 'Elite Seguridad',
    role: 'Seguridad privada · Monterrey',
  },
];
```

- [ ] **Step 4: Verificar y commit**

Run: `npm run build 2>&1 | tail -2`
Expected: `✓ built in`.

```bash
git add src/data/contact.js src/data/homeServices.js src/data/testimonials.js
git commit -m "feat(home): shared data for whatsapp link, services list and testimonials"
```

---

### Task 2: Hero concreto

Reemplaza el texto abstracto por una propuesta clara con botón de WhatsApp. Se elimina el color fantasma por scroll: el titular debe verse completo al cargar.

**Files:**
- Rewrite: `src/components/Views/LandingHero.jsx`

- [ ] **Step 1: Reemplazar el archivo completo**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { waLink } from '../../data/contact';

const ease = [0.16, 1, 0.3, 1];

export default function LandingHero() {
  return (
    <section
      id="hero"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '16vh 5vw 10vh',
        background: 'var(--bg-void)',
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        style={{ width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            marginBottom: '2rem',
            maxWidth: '1100px',
          }}
        >
          Agencia de marketing digital en Monterrey que genera <span style={{ fontStyle: 'italic' }}>resultados reales.</span>
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
            lineHeight: 1.6,
            maxWidth: '620px',
            marginBottom: '2.5rem',
          }}
        >
          Branding, desarrollo web, contenido en video y Meta Ads para empresas que quieren que las recuerden y las contraten.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.a
            href={waLink('Hola, quiero una cotización')}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-deep)',
              padding: '1.1rem 2.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            Quiero una cotización →
          </motion.a>
          <Link
            to="/work"
            style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            Ver nuestro trabajo
          </Link>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2.5rem' }}>
          +215% leads · 12X ROAS · Renters · Contratos · Monterrey Jurídico
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar en el navegador**

Run: `npm run dev -- --port 5180` y abrir `http://localhost:5180/`.
Expected: titular legible desde el primer momento, botón negro "Quiero una cotización →" que abre WhatsApp con el texto prellenado, enlace "Ver nuestro trabajo" que va a `/work`, sin errores en consola.

- [ ] **Step 3: Commit**

```bash
git add src/components/Views/LandingHero.jsx
git commit -m "feat(hero): concrete value proposition with whatsapp CTA"
```

---

### Task 3: Botón "Comenzar" en la navbar

Contacto pasa a ser un enlace normal y el botón negro lleva a WhatsApp, como el "Comenzar" de Levitt.

**Files:**
- Modify: `src/components/Navigation/GlassNavbar.jsx`

- [ ] **Step 1: Importar `waLink`**

Después de la línea `import { motion, AnimatePresence } from 'framer-motion';` agregar:

```jsx
import { waLink } from '../../data/contact';
```

- [ ] **Step 2: Agregar Contacto a `navItems`**

Reemplazar el arreglo:

```jsx
const navItems = [
  { path: '/work', label: 'Work' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/blog', label: 'Insights' },
  { path: '/contacto', label: 'Contacto' },
];
```

- [ ] **Step 3: Evitar el duplicado en el menú móvil**

Reemplazar `{[...navItems, { path: '/contacto', label: 'Contacto' }].map((item, i) => (` por:

```jsx
{navItems.map((item, i) => (
```

- [ ] **Step 4: Convertir el botón de escritorio en enlace a WhatsApp**

Reemplazar el bloque `<Link to="/contacto" ...>Contacto</Link>` (el botón negro dentro de `desktop-nav-links`) por:

```jsx
<a
  href={waLink('Hola, quiero iniciar un proyecto')}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    background: 'var(--text-primary)',
    color: 'var(--bg-void)',
    padding: '0.5rem 1.2rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: 600,
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    marginLeft: '0.5rem',
  }}
>
  Comenzar ↗
</a>
```

- [ ] **Step 5: Verificar y commit**

Run: `npm run build 2>&1 | tail -2`
Expected: `✓ built in`. En el navegador: la barra muestra Work, Servicios, Nosotros, Insights, Contacto y el botón "Comenzar ↗"; el menú móvil lista Contacto una sola vez.

```bash
git add src/components/Navigation/GlassNavbar.jsx
git commit -m "feat(navbar): whatsapp 'Comenzar' CTA and Contacto as regular link"
```

---

### Task 4: Lista tipográfica de servicios

**Files:**
- Create: `src/components/Home/ServiceList.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { homeServices } from '../../data/homeServices';

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem 3rem',
  padding: '2.5rem 0',
  borderBottom: '1px solid var(--border-medium)',
  textDecoration: 'none',
  color: 'inherit',
};

function Row({ s, i }) {
  const content = (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ ...rowStyle, opacity: 0, y: 20 }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>0{i + 1}</span>
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 16 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          {s.word}
        </motion.span>
      </div>
      <p style={{ flex: '1 1 260px', maxWidth: '340px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {s.detail}
      </p>
      <span aria-hidden="true" style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>↗</span>
    </motion.div>
  );

  return s.to ? (
    <Link to={s.to} style={{ textDecoration: 'none' }}>{content}</Link>
  ) : (
    <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a>
  );
}

export default function ServiceList() {
  return (
    <section id="services" style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Servicios
        </h2>
        <div style={{ borderTop: '1px solid var(--border-medium)' }}>
          {homeServices.map((s, i) => <Row key={s.word} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar y commit** (se ve en pantalla hasta Task 9; por ahora solo compila)

Run: `npm run build 2>&1 | tail -2`
Expected: `✓ built in`.

```bash
git add src/components/Home/ServiceList.jsx
git commit -m "feat(home): typographic service list component"
```

---

### Task 5: Cinta de valores

**Files:**
- Create: `src/components/Home/ValuesRibbon.jsx`

- [ ] **Step 1: Crear el componente**

La lista se duplica para que el bucle sea continuo. El movimiento se desactiva con `prefers-reduced-motion`.

```jsx
import React from 'react';

const values = [
  'Estrategia',
  'Creatividad',
  'Resultados medibles',
  'Tecnología',
  'Transparencia',
  'Compromiso con tu marca',
];

export default function ValuesRibbon() {
  const items = [...values, ...values];
  return (
    <div aria-hidden="true" style={{ overflow: 'hidden', padding: '5rem 0', background: 'var(--bg-void)' }}>
      <style>{`
        @keyframes ribbon { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ribbon-track { display: flex; width: max-content; animation: ribbon 35s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .ribbon-track { animation: none; } }
      `}</style>
      <div style={{ background: 'var(--text-primary)', transform: 'rotate(-2deg)', margin: '0 -5vw', padding: '1.4rem 0' }}>
        <div className="ribbon-track">
          {items.map((v, i) => (
            <span
              key={i}
              style={{
                color: 'var(--bg-deep)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                whiteSpace: 'nowrap',
                padding: '0 2rem',
              }}
            >
              {v} <span style={{ margin: '0 0 0 2rem', opacity: 0.5 }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar y commit**

Run: `npm run build 2>&1 | tail -2`
Expected: `✓ built in`.

```bash
git add src/components/Home/ValuesRibbon.jsx
git commit -m "feat(home): tilted values ribbon with infinite marquee"
```

---

### Task 6: Marco de celular y portafolio

Las capturas de `public/showcase/*.jpg` son verticales (≈467×1024, formato celular), por eso el marco es de celular y no de laptop.

**Files:**
- Create: `src/components/Home/PhoneFrame.jsx`

- [ ] **Step 1: Crear el marco**

```jsx
import React from 'react';

export default function PhoneFrame({ src, alt }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '9 / 19',
        background: '#111',
        borderRadius: '36px',
        padding: '8px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: '28px', overflow: 'hidden', background: '#fff' }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Confirmar que las capturas encajan**

Run: `sips -g pixelWidth -g pixelHeight public/showcase/renters.jpg public/showcase/elypse.jpg public/showcase/monterrey.jpg | grep pixel`
Expected: proporciones cercanas a 0.46 (ancho/alto). Si alguna es horizontal, su caso no debe estar en `featured: true`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Home/PhoneFrame.jsx
git commit -m "feat(home): phone frame component for portfolio screenshots"
```

---

### Task 7: Cifras con conteo animado

Cifras tomadas del spec y de `caseStudiesData.js`. **Abraham debe confirmar que siguen vigentes antes de publicar.**

**Files:**
- Create: `src/components/Home/MetricsBand.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

const stats = [
  { to: 215, prefix: '+', suffix: '%', label: 'Más leads calificados en promedio' },
  { to: 12, prefix: '', suffix: 'X', label: 'ROAS máximo documentado en Meta Ads' },
  { to: 20, prefix: '+', suffix: '', label: 'Proyectos entregados desde 2021' },
  { to: 4, prefix: '', suffix: '', label: 'Servicios integrados: branding, web, contenido y ads' },
];

function Counter({ to, prefix, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => { ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

export default function MetricsBand() {
  return (
    <section style={{ padding: '8vw 5vw', background: 'var(--bg-deep)' }}>
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem 2rem',
        }}
      >
        {stats.map((s) => (
          <div key={s.label} style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.5 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar y commit**

Run: `npm run build 2>&1 | tail -2`
Expected: `✓ built in`.

```bash
git add src/components/Home/MetricsBand.jsx
git commit -m "feat(home): metrics band with count-up animation"
```

---

### Task 8: Testimonios

El componente no muestra nada si `testimonials` está vacío, para no dejar una sección rota.

**Files:**
- Create: `src/components/Home/Testimonials.jsx`

- [ ] **Step 1: Crear el componente**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Lo que dicen nuestros clientes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ margin: 0 }}
            >
              <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
                “{t.quote}”
              </blockquote>
              <figcaption style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-medium)', paddingTop: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{t.name}</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar y commit**

Run: `npm run build 2>&1 | tail -2`
Expected: `✓ built in`.

```bash
git add src/components/Home/Testimonials.jsx
git commit -m "feat(home): testimonials section driven by data file"
```

---

### Task 9: Componer la home

Reescribe `AgencyHome.jsx`: conserva `ScrollRevealText`, reemplaza el carrusel con tarjetas de celular, quita `EditorialServices` (sustituido por `ServiceList`), agrega las secciones nuevas, suma el botón de WhatsApp al CTA final y retira el desenfoque de la transición de salida.

**Files:**
- Rewrite: `src/components/Views/AgencyHome.jsx`

- [ ] **Step 1: Reemplazar el archivo completo**

```jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import LandingHero from './LandingHero';
import ServiceList from '../Home/ServiceList';
import ValuesRibbon from '../Home/ValuesRibbon';
import PhoneFrame from '../Home/PhoneFrame';
import MetricsBand from '../Home/MetricsBand';
import Testimonials from '../Home/Testimonials';
import { getFeaturedProjects } from '../../data/caseStudiesData';
import { waLink } from '../../data/contact';

/* ─── Scroll Reveal Text ─── */
function ScrollRevealText() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const color = useTransform(scrollYProgress, [0, 0.8], ['var(--text-ghost)', 'var(--text-primary)']);

  return (
    <section
      ref={containerRef}
      style={{ padding: '10vw 5vw', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.h2
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 6rem)',
          fontWeight: 500,
          color,
          maxWidth: '1200px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
        }}
      >
        Entendemos tu negocio y a tus clientes. Te damos el poder de impactar a cualquier escala.
      </motion.h2>
    </section>
  );
}

/* ─── Horizontal Work Carousel (phone frames) ─── */
function WorkCarousel({ projects }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={containerRef} style={{ height: '200vh', background: 'var(--bg-deep)', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', padding: '0 5vw', marginBottom: '2rem' }}>
          Portafolio
        </h2>
        <motion.div style={{ x, display: 'flex', gap: '3rem', paddingLeft: '5vw' }}>
          {projects.map((p) => (
            <Link to={`/work/${p.slug}`} key={p.id} style={{ textDecoration: 'none', flex: '0 0 auto' }}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: 'clamp(200px, 24vw, 290px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
              >
                <PhoneFrame src={p.img} alt={p.title} />
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {p.industry}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
          <div style={{ flex: '0 0 5vw' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Home ─── */
export default function AgencyHome() {
  const location = useLocation();
  const featuredProjects = getFeaturedProjects();

  React.useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}
    >
      <Helmet>
        <title>Agencia de Marketing Digital en Monterrey | Persuasivo</title>
        <meta name="description" content="Branding, desarrollo web, contenido en video y Meta Ads para empresas en Monterrey. Solicita una cotización por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx" />
        <meta property="og:title" content="Persuasivo | Agencia de Marketing Digital en Monterrey" />
        <meta property="og:description" content="Para marcas que no tienen miedo de ser recordadas." />
        <meta property="og:url" content="https://persuasivo.com.mx" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LandingHero />
      <ScrollRevealText />
      <ServiceList />
      <ValuesRibbon />
      <WorkCarousel projects={featuredProjects} />
      <MetricsBand />
      <Testimonials />

      {/* FINAL CTA */}
      <section style={{ padding: '10vw 5vw', background: 'var(--bg-deep)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
            Construyamos algo <br /><span style={{ fontStyle: 'italic' }}>asombroso.</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
            Cada día con un ecosistema digital obsoleto es dinero perdido y terreno cedido a tu competencia.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={waLink('Hola, quiero una cotización')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--text-primary)', color: 'var(--bg-deep)', padding: '1.2rem 3rem', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Escríbenos por WhatsApp
            </a>
            <Link
              to="/contacto"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)', padding: '1.2rem 3rem', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Agendar consultoría
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  );
}
```

- [ ] **Step 2: Verificar compilación**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in`, sin errores de importación.

- [ ] **Step 3: Revisar la home completa en el navegador**

Run: `npm run dev -- --port 5180`, abrir `http://localhost:5180/` y recorrer de arriba a abajo.
Expected, en este orden: hero con botón, frase que se ilumina, lista de 5 servicios (cada fila navega o abre WhatsApp), cinta inclinada en movimiento, portafolio con marcos de celular, 4 cifras que cuentan al aparecer, testimonio de Elite Seguridad, CTA final con dos botones. Consola sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/Views/AgencyHome.jsx
git commit -m "feat(home): compose Levitt-style home — services list, ribbon, phone portfolio, metrics, testimonials"
```

---

### Task 10: Revisión en celular

**Files:** ninguno (solo verificación; corregir en el archivo de la sección afectada si algo falla)

- [ ] **Step 1: Emular celular**

Con el navegador integrado: `resize_window` con preset `mobile` (375×812) y recargar `http://localhost:5180/`.

- [ ] **Step 2: Comprobar que no hay scroll horizontal**

Ejecutar en la consola del navegador:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Expected: `true`. Si da `false`, localizar el elemento que desborda con:

```js
[...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).map(e => e.tagName + '.' + e.className).slice(0, 5)
```

y corregir el ancho o el `overflow` de esa sección (la cinta ya usa `overflow: hidden` en su contenedor).

- [ ] **Step 3: Revisar cada sección a 375px**

Expected: titular del hero sin cortarse, botones apilados o en línea con salto, filas de servicios con la descripción debajo del nombre, tarjetas de celular visibles en el carrusel, cifras en una columna, botón de WhatsApp flotante sin tapar el CTA.

- [ ] **Step 4: Restaurar el tamaño y commit de ajustes (si los hubo)**

`resize_window` con preset `desktop`. Si se corrigió algo:

```bash
git add -A src
git commit -m "fix(home): mobile layout adjustments"
```

---

### Task 11: Página de Branding (`/servicios/branding`)

Branding es el primer servicio de la lista, pero hoy no tiene página: su fila abre WhatsApp (Task 1). Esta tarea crea la página, la registra, la agrega al hub de servicios y cambia la fila de la home para que navegue a ella. Es la página que respalda tu posicionamiento de empresa que sabe hacer branding y contar historias, y usa los casos reales que ya están en `caseStudiesData.js` (`manifiesto-marca` y `arquitectura-visual`).

**Files:**
- Create: `src/components/Views/ServiceBranding.jsx`
- Modify: `src/App.jsx`
- Modify: `src/data/servicesData.js`
- Modify: `src/data/homeServices.js`

- [ ] **Step 1: Crear `src/components/Views/ServiceBranding.jsx`**

Sin precios ni cifras inventadas: los resultados salen de los casos existentes. Los entregables de `included` son una propuesta; Abraham debe confirmar que reflejan lo que realmente vende.

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../Navigation/Footer';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { waLink } from '../../data/contact';

const WA = waLink('Hola, me interesa branding para mi empresa');

const included = [
  ['Diagnóstico y posicionamiento', 'Quién eres, a quién le hablas y qué te diferencia de la competencia.'],
  ['Narrativa de marca', 'Manifiesto, historia y mensajes clave para contar quién eres con claridad.'],
  ['Logotipo y sistema visual', 'Logo, paleta, tipografía y reglas de uso que se reconocen en cualquier lugar.'],
  ['Voz y tono', 'Cómo habla tu marca en redes, web, propuestas y ventas.'],
  ['Manual de identidad', 'Una guía para que tu equipo y tus proveedores mantengan la marca coherente.'],
  ['Aplicaciones', 'Papelería, redes sociales, presentaciones y web con la nueva identidad.'],
];

const steps = [
  ['01', 'Descubrimiento', 'Entendemos tu negocio, tu mercado y a tus clientes.'],
  ['02', 'Estrategia', 'Definimos posicionamiento, narrativa y personalidad de marca.'],
  ['03', 'Identidad', 'Diseñamos el sistema visual y verbal.'],
  ['04', 'Entrega', 'Manual, archivos y aplicaciones listos para usar.'],
];

const faq = [
  ['¿Qué incluye un proyecto de branding?', 'Depende del punto de partida: desde cero, un rediseño o solo posicionamiento y narrativa. En el diagnóstico definimos los entregables exactos.'],
  ['¿Cuánto cuesta y cuánto tarda?', 'Varía según el alcance. Después del diagnóstico recibes una propuesta con inversión y calendario.'],
  ['¿Pueden rediseñar una marca que ya existe?', 'Sí. Evaluamos qué conservar y qué cambiar para no perder el reconocimiento que ya tienes.'],
  ['¿Necesito también un sitio web?', 'No es obligatorio, pero la identidad rinde más cuando se aplica en un sitio y en redes. Podemos hacerlo todo en un solo proyecto.'],
];

const caseSlugs = ['manifiesto-marca', 'arquitectura-visual'];

const h2 = { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '3rem' };
const card = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '2rem' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' };
const section = { padding: '6vw 5vw' };
const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto' };
const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } };

function Cta({ children, dark }) {
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-block', padding: '1.1rem 2.5rem', borderRadius: 'var(--radius-full)', textDecoration: 'none',
      fontWeight: 600, fontSize: '1rem', background: dark ? 'var(--bg-deep)' : 'var(--text-primary)', color: dark ? 'var(--text-primary)' : 'var(--bg-deep)',
    }}>{children}</a>
  );
}

export default function ServiceBranding() {
  const cases = caseSlugs.map(getProjectBySlug).filter(Boolean);
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Branding en Monterrey: identidad y narrativa de marca | Persuasivo</title>
        <meta name="description" content="Identidad de marca, posicionamiento y narrativa para empresas en Monterrey. Una marca que se recuerda y se elige. Solicita un diagnóstico por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/branding" />
      </Helmet>

      {/* HERO */}
      <section style={{ ...section, paddingTop: '18vh', paddingBottom: '8vw' }}>
        <div style={wrap}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Persuasivo · Branding
          </span>
          <h1 style={{ ...h2, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', lineHeight: 0.98, margin: '1.5rem 0', maxWidth: '1000px' }}>
            Una marca que se recuerda y <em>se elige.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.6, maxWidth: '640px', marginBottom: '2.5rem' }}>
            Identidad, posicionamiento y narrativa para que tu empresa cuente quién es con claridad y se distinga de su competencia.
          </p>
          <Cta>Solicitar diagnóstico</Cta>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section style={{ ...section, background: 'var(--bg-deep)' }}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Lo que construimos contigo.</h2>
          <div style={grid}>
            {included.map(([t, d]) => (
              <div key={t} style={card}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.7rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{t}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROCESO */}
      <section style={section}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Cómo trabajamos.</h2>
          <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {steps.map(([n, t, d]) => (
              <div key={n} style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '1.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{n}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.8rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>{t}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CASOS */}
      {cases.length > 0 && (
        <section style={{ ...section, background: 'var(--bg-deep)' }}>
          <motion.div style={wrap} {...reveal}>
            <h2 style={h2}>Marcas que ya cuentan mejor su historia.</h2>
            <div style={grid}>
              {cases.map((c) => (
                <Link key={c.id} to={`/work/${c.slug}`} style={{ ...card, textDecoration: 'none', display: 'block' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--neon)' }}>{c.industry}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.9rem', margin: '0.75rem 0', color: 'var(--text-primary)' }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{c.challenge}</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{c.metricPrefix}{c.metricValue}{c.metricUnit} · {c.metric} →</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* FAQ */}
      <section style={section}>
        <div style={{ ...wrap, maxWidth: '800px' }}>
          <h2 style={h2}>Preguntas frecuentes</h2>
          {faq.map(([q, a]) => (
            <details key={q} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '1.25rem 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{q}</summary>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.75rem' }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ ...section, background: 'var(--text-primary)', textAlign: 'center' }}>
        <h2 style={{ ...h2, color: 'var(--bg-deep)', marginBottom: '1.5rem' }}>Cuéntanos qué marca quieres construir.</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          En el diagnóstico revisamos dónde está tu marca hoy y te proponemos el camino más corto para que se vea y suene como la empresa que eres.
        </p>
        <Cta dark>Solicitar diagnóstico</Cta>
      </section>

      <Footer />
    </motion.div>
  );
}
```

- [ ] **Step 2: Registrar la ruta en `src/App.jsx`**

Debajo de la línea `import ServiceContent from './components/Views/ServiceContent';` agregar:

```jsx
import ServiceBranding from './components/Views/ServiceBranding';
```

Debajo de la línea `<Route path="/contenido" element={<ServiceContent />} />` agregar:

```jsx
          <Route path="/servicios/branding" element={<ServiceBranding />} />
```

- [ ] **Step 3: Agregar Branding como primer servicio del hub**

En `src/data/servicesData.js`, justo después de la línea `export const services = [` insertar este objeto (antes del de `trafico`). Va primero para que el hub `/servicios` también abra con Branding:

```js
  {
    id: 'branding',
    slug: 'branding',
    title: 'Branding',
    subtitle: 'Identidad y Narrativa de Marca',
    icon: '✦',
    navTarget: 'service_branding',
    routePath: '/servicios/branding',
    desc: 'Identidad, posicionamiento y narrativa para que tu empresa cuente quién es con claridad y se distinga de su competencia.',
    businessTrans: 'Una marca coherente justifica tus precios y hace que te elijan antes de comparar.',
    longDesc: 'Definimos quién eres, a quién le hablas y cómo suenas y te ves en cada punto de contacto: logo, sistema visual, voz, manual y aplicaciones.',
    capabilities: [
      'Diagnóstico y posicionamiento',
      'Narrativa y manifiesto de marca',
      'Logotipo y sistema visual',
      'Voz y tono',
      'Manual de identidad',
      'Aplicaciones en papelería, redes y web'
    ],
    metrics: [],
    faq: []
  },
```

- [ ] **Step 4: Hacer que la fila de Branding en la home navegue a su página**

En `src/data/homeServices.js` reemplazar el primer elemento por:

```js
  {
    word: 'Branding',
    detail: 'Identidad de marca, estrategia, posicionamiento y rediseño',
    to: '/servicios/branding',
  },
```

Como `waLink` ya no se usa en ese archivo, borrar también la línea `import { waLink } from './contact';`.

- [ ] **Step 5: Verificar**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built in`.

En el navegador (`npm run dev -- --port 5180`):
- `http://localhost:5180/servicios/branding` carga con el titular "Una marca que se recuerda y se elige.", 6 tarjetas, 4 pasos, 2 casos con su cifra y el FAQ. Sin errores en consola.
- Los casos enlazan a `/work/manifiesto-marca` y `/work/arquitectura-visual`.
- `http://localhost:5180/servicios` muestra Branding como primer servicio y no se rompe.
- En la home, la fila "Branding" navega a `/servicios/branding`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Views/ServiceBranding.jsx src/App.jsx src/data/servicesData.js src/data/homeServices.js
git commit -m "feat(branding): add /servicios/branding page and link it from home and hub"
```

---

## Autorrevisión

**Cobertura de lo pedido:**

| Pedido | Tarea |
|---|---|
| Hero concreto con CTA WhatsApp | 2 |
| CTA fijo en la navbar | 3 |
| Servicios como lista tipográfica, Branding primero, Video incluido | 1, 4, 9 |
| Franja/cinta de valores | 5, 9 |
| Portafolio en mockups | 6, 9 |
| Cifras reales | 7, 9 |
| Testimonios reales | 1, 8, 9 |
| Movimiento con intención (cinta, conteo, reveal, hover) | 4, 5, 7, 9 |
| Sin blur de salida (spec 5.2) | 9 |
| Celular | 10 |
| Página propia de Branding | 11 |

**Revisión de marcadores y tipos:** no hay "TBD"; los nombres coinciden entre tareas (`waLink` de `contact.js`, `homeServices` con `word`/`detail`/`to`/`href`, `testimonials` con `quote`/`name`/`role`, `PhoneFrame` con `src`/`alt`).

**Pendientes que dependen de Abraham (no bloquean el código):**

1. Confirmar las cifras de `MetricsBand` (215%, 12X, 20+ proyectos, 4 servicios).
2. Más testimonios reales con nombre y empresa; hoy solo hay el de Elite Seguridad, tomado del spec.
3. Confirmar los entregables de la página de Branding (Task 11: diagnóstico, narrativa, logo y sistema visual, voz y tono, manual, aplicaciones) y el orden de la home (hoy Branding va primero). Hasta la Task 11, la fila de Branding abre WhatsApp.
4. Elite Seguridad no está en `featured` del portafolio hasta tener su captura en `public/showcase/elite.jpg`.
5. Las capturas actuales son de baja resolución (≈467 px de ancho): se verán suaves en pantallas grandes.
