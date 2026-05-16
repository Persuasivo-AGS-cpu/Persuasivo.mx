# Persuasivo Web — Conversion Redesign Spec

**Date:** 2026-05-15  
**Goal:** Transform existing artistic site into a converting agency website that ranks on Google and drives WhatsApp inquiries.  
**Primary conversion:** WhatsApp click  
**Stack:** React + Vite + Framer Motion + React Router (no rewrite — surgical changes only)

---

## 1. Context & Constraints

- Site already exists at `/Web-Persuasivo` with routing, data files, and animations
- 3rd redesign — must ship without rebuilding from scratch
- No rush; quality over speed
- Primary CTA throughout: WhatsApp (`https://wa.me/528110731510`)
- Real clients: Renters, Contratos, Monterrey Jurídico, Elite Seguridad
- All case study data lives in `src/data/caseStudiesData.js` (source of truth)

---

## 2. Architecture Decision

Keep existing site. Problems are content + UX, not architecture. What already works:
- React Router with all routes configured
- Centralized data files (`caseStudiesData.js`, `servicesData.js`, `blogData.jsx`)
- Framer Motion animations (scroll reveal, horizontal carousel, editorial hover)
- Schema.org global markup in `App.jsx`
- `WhatsAppButton.jsx` with correct phone number

---

## 3. Page-by-Page Changes

### 3.1 `LandingHero.jsx` — Hero Rewrite

**Current state:** H1 with abstract copy ("Para marcas que no tienen miedo de ser recordadas") + scroll indicator. Zero CTAs.

**Required changes:**

1. **H1 rewrite** — concrete value prop:
   - "Agencia de Marketing Digital en Monterrey que genera resultados reales."
   - Contains exact keyword "agencia de marketing digital Monterrey" (highest-volume local term)
   - Keep italic on last word as existing style: *"reales."*

2. **Subtitle** — eliminate abstraction:
   - "Generamos leads calificados con Meta Ads, desarrollo web con React y estrategia de contenido. Primera consulta gratis."

3. **Primary CTA button** — WhatsApp, green, large:
   - Text: "Quiero una cotización →"
   - href: `https://wa.me/528110731510?text=Hola%2C%20quiero%20una%20cotización`
   - Style: solid green (#25D366), white text, border-radius full, font-weight 700
   - Animation: `whileHover={{ scale: 1.03 }}` + magnetic effect on desktop

4. **Secondary CTA** — text link:
   - Text: "Ver nuestro trabajo"
   - href: `/work`

5. **Proof line** — below CTAs:
   - "+215% leads · 12X ROAS · Renters · Contratos · Monterrey Jurídico"
   - Small text, `var(--text-muted)`

6. **Magnetic button effect** (desktop only, `window.innerWidth > 768`):
   ```js
   // useMotionValue x, y
   // onMouseMove: set x/y to (cursor - center) * 0.3
   // onMouseLeave: animate back to 0,0
   ```

---

### 3.2 `AgencyHome.jsx` — New Sections

**Add after `<LandingHero />`:**

#### Section A: Client Logo Marquee

- Infinite horizontal scroll of client logos (text-based if no SVG logos available)
- Clients: Renters · Contratos · Monterrey Jurídico · Elite Seguridad · Edificio Elypse · OneBell
- CSS animation: `@keyframes marquee` — duplicate list for seamless loop
- Framer Motion not needed here — pure CSS is lighter

```jsx
// Component: LogoMarquee
// Two identical rows of client names for seamless infinite scroll
// Speed: 30s linear infinite
```

#### Section B: Impact Metrics

- 4 stat cards in a horizontal band
- Animated counters: count up when `useInView` triggers
- Stats:
  | Metric | Value | Label |
  |--------|-------|-------|
  | +215% | Más leads calificados | promedio de clientes |
  | 12X | ROAS en Meta Ads | máximo documentado |
  | 20+ | Proyectos entregados | desde 2021 |
  | 3 | Servicios especializados | web · ads · contenido |
- Use `useMotionValue` + `useTransform` + `animate()` for count-up
- Trigger with `useInView({ once: true })`

**Keep existing sections:**
- `ScrollRevealText` ✓
- `WorkCarousel` ✓
- `EditorialServices` — add WhatsApp button to each service row (inline, appears on hover)

**Modify final CTA section:**
- Add second button: "Escríbenos por WhatsApp" alongside existing "Agendar Consultoría"

---

### 3.3 Service Pages — Full Landing Page Rebuild

All three: `ServiceTraffic.jsx`, `ServiceAuthority.jsx`, `ServiceEcosystems.jsx`

**Fix immediately in all three:**
- Replace `setView('contact')` with direct WhatsApp `<a>` tag
- Replace generic CTA with service-specific WhatsApp pre-filled message

**WhatsApp links per service:**
- Tráfico: `?text=Hola%2C%20me%20interesa%20Meta%20Ads`
- Autoridad: `?text=Hola%2C%20me%20interesa%20gestión%20de%20redes%20y%20contenido`
- Ecosistemas: `?text=Hola%2C%20me%20interesa%20un%20sitio%20web`

**New sections to add to each service page:**

1. **What's included** — 6-item grid with icon + text
2. **Who it's for** — 3 ideal client profiles (ICP)
3. **Pricing anchor** — "Desde $X MXN/mes · Sin contratos anuales"
   - Tráfico: "Desde $15,000 MXN/mes · Sin contratos anuales"
   - Autoridad: "Desde $12,000 MXN/mes · Sin contratos anuales"
   - Ecosistemas: "Desde $35,000 MXN · Proyecto único · Entrega en 3 semanas"
   - Show anchors only — not full pricing tables. Filters unqualified leads, builds trust, eligible for Google rich snippets.
4. **3-step process** — "Así trabajamos" timeline
5. **FAQ section** — 5 questions minimum per page (critical for SEO)
6. **Related case studies** — 2 cards from `caseStudiesData.js` filtered by category
7. **Final CTA** — WhatsApp button + "o llámanos: +52 811 073 1510"

**SEO for each service page:**
- H1 with keyword:
  - Tráfico: "Meta Ads en Monterrey — Pauta Digital de Alto Retorno"
  - Autoridad: "Gestión de Redes Sociales en Monterrey — Contenido que Vende"
  - Ecosistemas: "Desarrollo Web con React en Monterrey — Sitios que Convierten"
- `<Helmet>` with `meta name="description"` containing keyword + CTA
- Add FAQ Schema (`application/ld+json`) per page

---

### 3.4 `caseStudiesData.js` — Add Elite Seguridad

Add new entry:

```js
{
  id: 'elite-seguridad',
  slug: 'elite-seguridad',
  title: 'Elite Seguridad',
  category: 'trafico',  // or 'ecosistemas' depending on what service was provided
  categoryLabel: 'Meta Ads',
  industry: 'Seguridad Privada / B2B',
  img: '/showcase/elite.jpg',  // image must be added to /public/showcase/
  tags: ['Meta Ads', 'Lead Generation', 'B2B'],
  metric: 'Leads Calificados',
  quote: '',          // Abraham provides
  clientName: '',     // Abraham provides
  challenge: '',      // Abraham provides
  solution: '',       // Abraham provides
  results: [],        // Abraham provides real metrics
  contentSections: [], // Abraham provides
  featured: true
}
```

**Data extracted from https://elite-seguridad.vercel.app/:**
- Industry: Seguridad privada / CCTV / Smart Home — Monterrey, N.L.
- Service Persuasivo delivered: Desarrollo web (landing page completa con catálogo)
- Client stats: 100+ instalaciones en N.L., 10+ años experiencia, 4.9/5 de +100 clientes
- challenge: "Empresa con más de 10 años de experiencia en seguridad privada sin presencia digital que reflejara su nivel técnico y profesional. Sus clientes llegaban por referidos, sin sistema de captación digital."
- solution: "Desarrollamos una landing page de alto rendimiento con catálogo de productos Hikvision/EZVIZ, CTAs de WhatsApp contextuales por producto, proceso de auditoría en 3 pasos y sección FAQ optimizada para SEO local."
- results: [{ label: 'Clientes protegidos', value: '100+' }, { label: 'Calificación', value: '4.9/5' }, { label: 'Operatividad', value: '100%' }]
- quote: "Diseño profesional con alto impacto en digital — exactamente lo que necesitamos para proyectar confianza a nuestros clientes."
- img: '/showcase/elite.jpg' — Abraham must provide screenshot of the site saved as this filename

---

### 3.5 Case Study Pages (`CaseStudy.jsx`)

Add at bottom of each case study:
- "¿Quieres resultados así?" section
- WhatsApp CTA with pre-filled message referencing the service category

---

### 3.6 `AboutPage.jsx` — Founder Photo

- `FOUNDER_IMG` is currently `null`
- Abraham must provide headshot photo → save to `/public/founder.jpg`
- Update: `const FOUNDER_IMG = '/founder.jpg'`
- Add `onError` fallback to show initials avatar if image fails

---

### 3.7 `WhatsAppButton.jsx` — Pulse Animation

Add subtle pulse every 5 seconds to draw attention without annoying:

```jsx
<motion.a
  animate={{ scale: [1, 1.08, 1] }}
  transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 4.4 }}
  ...
>
```

---

### 3.8 New: `NotFoundPage.jsx`

Create `src/components/Views/NotFoundPage.jsx`:
- H1: "404 — Esta página no existe"
- Subtext: "Pero sí podemos ayudarte a construir la tuya."
- CTA → WhatsApp
- Secondary link → `/`
- Register in `App.jsx`: `<Route path="*" element={<NotFoundPage />} />`

---

### 3.9 New: Cookie Banner

Create `src/components/UI/CookieBanner.jsx`:
- Bottom bar: "Usamos cookies para mejorar tu experiencia. [Aceptar] [Ver política]"
- Store consent in `localStorage`
- Only show if no consent stored
- Link to `/legal/cookies`
- Render in `App.jsx` above routes

---

### 3.10 New: OG Image

Create `/public/og-image.jpg`:
- Dimensions: 1200×630px
- Content: Persuasivo logo + tagline + "agencia digital monterrey"
- Abraham provides or generate with design tool
- Reference already exists in schema — just needs the file

---

## 4. SEO Technical

### 4.1 Sitemap

Create `/public/sitemap.xml` with all routes:
```xml
<url><loc>https://persuasivo.com.mx/</loc><priority>1.0</priority></url>
<url><loc>https://persuasivo.com.mx/servicios/trafico</loc><priority>0.9</priority></url>
<url><loc>https://persuasivo.com.mx/servicios/autoridad</loc><priority>0.9</priority></url>
<url><loc>https://persuasivo.com.mx/servicios/ecosistemas</loc><priority>0.9</priority></url>
<url><loc>https://persuasivo.com.mx/work</loc><priority>0.8</priority></url>
<url><loc>https://persuasivo.com.mx/nosotros</loc><priority>0.7</priority></url>
<url><loc>https://persuasivo.com.mx/contacto</loc><priority>0.7</priority></url>
<url><loc>https://persuasivo.com.mx/blog</loc><priority>0.6</priority></url>
```

### 4.2 `robots.txt` — Update

Current file exists. Verify it allows all crawlers and references sitemap:
```
User-agent: *
Allow: /
Sitemap: https://persuasivo.com.mx/sitemap.xml
```

### 4.3 Per-page Schema (Service Pages)

Add `FAQPage` schema to each service page using the FAQ content defined in section 3.3.

---

## 5. Performance

### 5.1 Image Compression

Install `vite-plugin-imagemin` or use manual compression:
- All images in `/public/showcase/` must be < 300kb
- Check current sizes: `ls -lh public/showcase/`
- Target format: WebP where supported, JPEG fallback

### 5.2 Animation Performance

Reduce existing animation durations:
- Page transitions: `duration: 0.8` → `duration: 0.4`
- Remove `filter: blur(10px)` from exit transitions (GPU expensive on mobile)
- All Framer Motion `whileInView` use `viewport={{ once: true }}` (already partially done)

### 5.3 Code Splitting

Verify Vite is lazy-loading heavy routes. Add if missing:
```js
const ServiceTraffic = lazy(() => import('./components/Views/ServiceTraffic'));
```

---

## 6. Analytics & Tracking

### 6.1 Google Analytics 4

- Add GA4 script to `index.html`
- Track: pageviews, WhatsApp CTA clicks (custom event `whatsapp_click`), contact form submissions
- Tag each WhatsApp link with `onClick` to fire `gtag('event', 'whatsapp_click', { service: 'generic' })`

### 6.2 Meta Pixel

- Add Meta Pixel base code to `index.html`
- Track: `PageView`, `Lead` (on WhatsApp click), `Contact` (on form submit)
- Pixel ID: Abraham must provide

---

## 7. Blog Content (SEO)

Minimum 3 posts in `src/data/blogData.jsx` targeting priority keywords:

| Post | Target Keyword | Word Count |
|------|----------------|------------|
| "Cómo elegir una agencia de marketing digital en Monterrey" | agencia marketing digital monterrey | 800+ |
| "Meta Ads vs Google Ads: ¿cuál conviene para tu negocio en México?" | meta ads mexico | 800+ |
| "¿Cuánto cuesta un sitio web profesional en México en 2026?" | costo sitio web mexico | 600+ |

---

## 8. Animations Summary

| Animation | Component | Library | Priority |
|-----------|-----------|---------|----------|
| Magnetic CTA button | `LandingHero` | Framer Motion | High |
| Counter count-up | `AgencyHome` (metrics section) | Framer Motion | High |
| Logo marquee infinite scroll | `AgencyHome` (new) | CSS | High |
| WhatsApp button pulse | `WhatsAppButton` | Framer Motion | Medium |
| Service row WhatsApp appear on hover | `AgencyHome` | Framer Motion | Medium |
| Stagger entrance on logo band | `LogoMarquee` | Framer Motion | Low |

**Keep as-is:** scroll color change hero, horizontal work carousel, editorial service hover, AnimatePresence page transitions, ScrollRevealText.

**Remove/reduce:** blur exit transitions, 0.8s page entry durations.

---

## 9. Items Requiring Abraham's Input (Blockers)

These cannot be coded without content from Abraham:

- [ ] **Elite Seguridad:** image + real metrics + client quote + service delivered
- [ ] **Founder photo:** headshot for `/nosotros` — if unavailable, fallback to initials avatar with strong quote. Does not block launch.
- [ ] **OG image:** branded 1200×630 asset
- [ ] **Meta Pixel ID:** for analytics setup
- [ ] **Blog post content:** or approval of AI-drafted content
- [ ] **FAQ content per service:** 5 questions per page (can draft for review)
- [ ] **Real testimonials:** client name + photo/logo + specific quote

---

## 10. File Change Map

| File | Action | Priority |
|------|--------|----------|
| `src/components/Views/LandingHero.jsx` | Rewrite — add H1, CTAs, proof line | 🔴 Critical |
| `src/components/Views/AgencyHome.jsx` | Add LogoMarquee, MetricsBand sections | 🔴 Critical |
| `src/components/Views/ServiceTraffic.jsx` | Full rebuild as landing page | 🔴 Critical |
| `src/components/Views/ServiceAuthority.jsx` | Full rebuild as landing page | 🔴 Critical |
| `src/components/Views/ServiceEcosystems.jsx` | Full rebuild as landing page | 🔴 Critical |
| `src/components/WhatsAppButton.jsx` | Add pulse animation | 🟠 High |
| `src/data/caseStudiesData.js` | Add Elite Seguridad entry | 🟠 High |
| `src/components/Views/CaseStudy.jsx` | Add WhatsApp CTA at bottom | 🟠 High |
| `src/components/Views/AboutPage.jsx` | Wire founder photo when available | 🟠 High |
| `src/App.jsx` | Add 404 route + CookieBanner | 🟠 High |
| `src/components/Views/NotFoundPage.jsx` | Create new | 🟠 High |
| `src/components/UI/CookieBanner.jsx` | Create new | 🟠 High |
| `public/sitemap.xml` | Create new | 🟡 Medium |
| `public/robots.txt` | Update with sitemap reference | 🟡 Medium |
| `src/data/blogData.jsx` | Add 3 SEO posts | 🟡 Medium |
| `index.html` | Add GA4 + Meta Pixel scripts | 🟡 Medium |
| `vite.config.js` | Add imagemin plugin + lazy routes | 🟡 Medium |
