# Auditoría del sitio actual: persuasivo-mx

Fecha: 2026-11-06. Solo lectura (único efecto: `git fetch`, que actualizó refs remotas). Repo: `Persuasivo-AGS-cpu/Persuasivo.mx`.

## 0. Hallazgo principal: hay DOS líneas de trabajo divergentes

El checkout local y `origin/main` divergieron desde el commit `0d913bc`. Local: `main` ahead 6 / behind 13.

| | Local (`404dd78`) | Remoto `origin/main` (`e794b0e`) |
|---|---|---|
| Diseño | "Firma-style": fondo claro `#F2F2F2`, neón oscuro `#8A9E00`, Instrument Serif + DM Sans | "Papel de Operaciones": papel `#EDE7D8`, acento naranja `#D6531D`, Oswald + IBM Plex |
| Rutas | ~20 (work, blog, nosotros, consulta-gratis, soluciones/:id, recursos…) | ~9 (home, contacto, 3 servicios, legal, onboarding, arcade); `/agencia` redirige a `/` |
| Supabase | Presente (contacto, onboarding, Storage) | Eliminado (integración muerta); solo `formsubmit.co` |
| Higiene git | `dist/`, `node_modules/`, `.env` trackeados | `.gitignore` correcto, `.env.example`, sin dist/node_modules/.env |
| Extra | Specs en `docs/superpowers/` | `PLAN_EVOLUCION_CREATIVA.md` (plan de rebrand hacia agencia creativa, ref. Conqr.mx) |
| Vistas nuevas (Blog, WorkPage, CaseStudy, AboutPage, BookConsultation, LeadMagnet, ThemeProvider, data/…) | Sí, pero 16 rutas/archivos **sin commitear** (untracked) | No existen |

Los 13 commits remotos (más recientes: `e794b0e` plan de traspaso, `23a40db` quita Supabase, `65782e6` fix crítico de /contacto y /onboarding en blanco, `6f77798` fusión home, `dc2c58c` rediseño Papel de Operaciones, `30fc5e1` fixes SEO/perf) **no están en local**. Los 6 commits locales (`35079b4`…`404dd78`: specs de /nosotros y conversión, navbar Firma, AboutPage editorial) **no están en remoto**. Hay además una rama remota `claude/stoic-albattani-n2rxjr`. Según el plan, producción (Vercel `persuasivo-mx`, `www.persuasivo.mx`) corre la línea remota, no la local.

Implicación: antes de cualquier rebrand hay que decidir la base (recomendado: `origin/main`, ya en producción y más limpia) y rescatar de local solo lo valioso (ver sección 9). Nada se debe borrar sin respaldo: el trabajo sin commitear de local existe solo en este disco.

## 1. Git local: qué significa el status

- `527 D` (sin stage): son `dist/**` (28 archivos) y `node_modules/**` (499 archivos). Están **trackeados por error** en el historial local (los añadieron commits como `a4ea443`, `12f9fba`, `0d913bc`) y fueron borrados del disco: `dist/` y `node_modules/` no existen ahora. No hay `.gitignore` local. Un `git diff --stat` muestra 542 archivos / ~270k líneas borradas, casi todo ruido. Remediación: no hacer commit de esos borrados tal cual a menos que se acompañe de `.gitignore`; la rama remota ya los destrae. Reinstalar con `npm install`.
- `.env` está **trackeado** en local (contiene `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`; la anon key es pública por diseño, pero el archivo no debería versionarse). Remoto ya lo evita (`.env` en `.gitignore`, hay `.env.example`). También trackeado: `lighthouse-report.json` (482 KB) y el workspace de VSCode.
- `M index.html` (cambio real, sin commitear):
  - `<title>`: "Agencia de Desarrollo Web y Meta Ads" pasó a "Consultoría de Estrategia Digital, UX y Performance"; description a "agencia boutique… marcas B2B".
  - Se añaden Open Graph y Twitter Card con `https://persuasivo.com.mx/og-image.jpg` (**el archivo no existe** en `public/`).
  - Fuentes: se quitan `Press Start 2P` (juego) y se pasa a Inter + Space Grotesk. Pero `index.css` usa DM Sans + Instrument Serif (importadas por CSS), así que Inter/Space Grotesk quedan cargándose sin uso probable.
  - Inconsistencia: dominio `persuasivo.com.mx` en OG/schema vs `persuasivo.mx` en producción y correo `hola@persuasivo.mx`.
- 15 `M` más: `App.jsx`, `index.css`, `main.jsx`, `Footer`, `ContactFlow`, `ClientOnboarding`, `AgencyHome`, `LandingHero`, 3 `Service*`, `LegalView`, `ABVoiceInput`, `ArcadeCabinet`.
- 16 `??` untracked: `ThemeProvider`, `FrictionCTA`, `WhatsAppButton`, 10 vistas (Blog, WorkPage, CaseStudy, ExpertiseHub, ShowcaseCarousel, BookConsultation, LeadMagnet, SuccessStories, VerticalLanding…), `src/data/*`, `public/monterrey.jpg`.
- Basura en disco: `src_backup_20260508_094211/` (copia vieja de src) y `lighthouse-report.json`.

## 2. Stack y versiones (local; remoto idéntico salvo sin Supabase)

Vite `^5.0.0`, `@vitejs/plugin-react ^4.2.0`, React `^18.2.0`, react-router-dom `^7.14.1`, framer-motion `^11.0.0`, react-helmet-async `^3.0.0`, `@supabase/supabase-js ^2.103.3` (solo local). Nombre de paquete: `persuasivo-arcade` (residuo del juego). Scripts: dev/build/preview. SPA pura, sin SSR/prerender, sin TypeScript, sin Tailwind, sin tests, sin linter, `vite.config.js` solo con plugin react (sin code-splitting por `lazy`, que el spec pedía).

## 3. Estructura de `src/` (local, ~7.4k líneas)

- `main.jsx`, `App.jsx` (256 líneas: rutas + schema.org global + Helmet + adaptador legado `setView`), `index.css` (308).
- `components/Navigation/` GlassNavbar, Footer. `components/Views/` 22 vistas. `components/UI/FrictionCTA`, `Context/ThemeProvider` (tema dark/light con localStorage; el CSS actual es solo claro, el provider por defecto dice 'dark': código muerto/incoherente). `WhatsAppButton`, `ArcadeCabinet(.css/.jsx)`, `PacmanEngine.js`.
- `data/`: `caseStudiesData.js`, `servicesData.js`, `verticalsData.js`, `blogData.jsx`.
- Vistas más pesadas: ClientOnboarding 721, AboutPage 519, ShowcaseCarousel 479, ContactFlow 397.

## 4. Rutas (local)

`/`, `/agencia` (duplicado de home, no redirect), `/work`, `/work/:slug`, `/servicios`, `/servicios/{trafico,autoridad,ecosistemas}`, `/nosotros`, `/contacto`, `/consulta-gratis`, `/blog`, `/blog/:slug`, `/recursos/checklist`, `/legal/{privacidad,terminos,cookies}`, `/soluciones/:id`, `/agencia-marketing/:id` (SEO programático), `/onboarding`, `/arcade`. Sin ruta 404 (`*`). `vercel.json` hace rewrite de todo a `/index.html` (correcto para SPA). Remoto: ver tabla sección 0.

## 5. Componentes clave

- **Views**: patrón de una vista por página, estilos inline masivos, datos en `src/data`. Las 3 `Service*` son casi clones de 116 líneas. `AgencyHome` = LandingHero + ScrollRevealText + WorkCarousel + EditorialServices (spec pedía añadir marquee de logos y contadores; no hecho).
- **Navigation**: `GlassNavbar` fixed, transparente que gana blur al hacer scroll, menú móvil con overlay; items Work/Servicios/Nosotros/Insights. Footer con enlaces y WhatsApp.
- **ArcadeCabinet**: mesa tipo cocktail con CSS 310 líneas + `PacmanEngine.js` (178 líneas) + juego Pacman completo en `public/pacman/` (152 KB, de terceros con su README/.editorconfig). Ruta `/arcade`. Con el rebrand es eliminable; remoto lo conserva como "momento CRT oscuro deliberado". El plan de remoto pide un elemento interactivo equivalente en su lugar.

## 6. Estilos y tokens

Local: variables `:root` en `index.css` (`--neon`, `--bg-void/deep/card`, `--text-*`, `--border-*`, `--font-display/body`, radios, `--section-padding`, `--container-max`). Mezcla CSS global (navbar, `.whatsapp-float`, marquee, carrusel) con **estilos inline en JSX** (la mayoría). Restos de arcade en el CSS (`.scanlines`, `neon-pulse`, `pulse-dot` con amarillo `#E0FF31` hardcodeado distinto al `--neon` actual). Remoto: tokens `--paper/--ink/--accent/--line`, más limpio. Sin sistema de componentes (botones repetidos a mano).

## 7. Animación

framer-motion 11 en ~todas las vistas (`motion`, `AnimatePresence mode='wait'` con transición por ruta, `useScroll/useTransform` en scroll-reveal de texto y carrusel horizontal, hover editorial). CSS puro para marquee y keyframes. Sin Lenis/GSAP/Three. Spec pide bajar duraciones (0.8 a 0.4 s) y quitar `blur` en exits (costoso en móvil); sin `prefers-reduced-motion` visible en revisión.

## 8. SEO, forms y datos

- **SEO**: `react-helmet-async` en 16 archivos; `<Helmet>` por página; JSON-LD global en App.jsx (ProfessionalService, WebSite, FAQPage con precios: web desde $35,000, Meta Ads desde $15,000/mes, redes desde $12,000/mes; teléfono +52 811 073 1510; Monterrey). Fallos: SPA sin prerender (indexación débil; el plan remoto confirma 0 páginas indexadas), sin `sitemap.xml`, `robots.txt` mínimo sin Sitemap, sin `og-image.jpg`, dominio `.com.mx` vs `.mx`, `<title>` duplicado entre index.html y Helmet, `showcase/*.jpg` de 460-620 KB cada uno (4.9 MB, sin WebP), `lighthouse-report.json` en repo como evidencia previa.
- **Supabase (local)**: cliente creado en `ContactFlow` y `ClientOnboarding` con `VITE_SUPABASE_*`. Inserta en `crm_tasks` y `onboarding_queue`, sube logos al bucket `client-logos`. Según el plan remoto, ese CRM **nunca existió** y sin credenciales `createClient()` rompía las páginas en blanco en producción. No usar como dependencia en el rebrand.
- **Contacto**: único canal verificado = `fetch` a `formsubmit.co/ajax/hola@persuasivo.mx` (backup en onboarding). WhatsApp `wa.me/528110731510` en botón flotante, footer y casos (local; el plan remoto dice que no había número real en remoto: validar cuál es el correcto). Dictado por voz IA en `ABVoiceInput`. Sin GA4/Meta Pixel (spec lo pedía), sin banner de cookies.
- **Datos** (`src/data`): casos reales (Renters, Contratos, Monterrey Jurídico, Elite Seguridad pendiente, Elypse, OneBell; Grupo APH en remoto), servicios, verticales para SEO programático, blog (1-3 posts).

## 9. Deployment

Vercel, proyecto `persuasivo-mx` (`prj_2lZ5GDfJxXm56gyAQnEYHHfnUWDm`), dominio `www.persuasivo.mx`; en repo solo `vercel.json` con rewrite SPA. No hay `.vercel/` local. Gotcha documentado: mismo SHA en dos ramas puede no disparar el build de producción (verificar `target: production`/`READY`).

## 10. Docs y specs previos

- Local `docs/superpowers/`: plan y spec de /nosotros (2026-05-09) y `2026-05-15-conversion-redesign-design.md` (hero con CTA WhatsApp #25D366, logo marquee, contadores, páginas de servicio como landings con FAQ+schema, caso Elite Seguridad, 404, cookie banner, sitemap, OG, GA4/Pixel, 3 posts SEO, compresión de imágenes; lista bloqueos que dependen de Abraham: fotos, métricas, Pixel ID, testimonios). Casi nada se implementó. **No existen en remoto** (el diff remoto muestra -1324 líneas de docs).
- Remoto `PLAN_EVOLUCION_CREATIVA.md`: contexto, hallazgos de auditorías UX (sin CTA durante ~11 pantallas móviles, cero señal humana, formulario filtra antes de generar confianza, footer roto en servicios, CTA ambiguo, metáforas militares dañinas, métricas no verificables), diagnóstico (Meta Ads sin método de pago y 0 campañas; 0 páginas indexadas en Google) y la propuesta de pasar a agencia creativa (video CEO, storytelling, Meta Ads con intención). Es el insumo principal del rebrand.

## 11. Reutilizable vs deuda

**Reutilizar**
- Base técnica: Vite+React+Router+framer-motion+Helmet y `vercel.json` (rewrite SPA).
- Datos de casos reales y servicios (`src/data`), con precios visibles (diferenciador según auditoría).
- Schema.org global (corregir dominio y posicionamiento), FAQ de preguntas.
- Navbar glass (local) y WhatsAppButton; patrón scroll-reveal/carrusel horizontal.
- Secciones que la auditoría marca como confiables: párrafo de hero, "Siete pasos. Sin atajos.", Casos Verificables (remoto).
- Contenido de specs locales (estructura de /nosotros, servicios-landing, FAQ) como brief.
- Tokens de remoto como punto de partida de marca (ya hay decisión visual pendiente de rebrand).
- Flujo `formsubmit.co` como canal mínimo viable de leads.

**Deuda / eliminar**
- Divergencia de ramas y trabajo local sin commitear (riesgo de pérdida); `dist/` y `node_modules/` y `.env` trackeados en local; sin `.gitignore`.
- Pacman/Arcade (`PacmanEngine`, `public/pacman`, `ArcadeCabinet*`, `Press Start 2P`, keyframes neón, nombre `persuasivo-arcade`).
- Supabase (dependencia + 2 clientes con credenciales vacías en producción): quitar o crear el backend de verdad.
- `ThemeProvider` dark/light sin uso real; `src_backup_*`; `lighthouse-report.json`; `setView` legado.
- Estilos inline duplicados; 3 páginas de servicio clonadas; sin biblioteca de UI/botones.
- SEO: SPA sin prerender (valorar Next.js/Astro o prerender), sin sitemap/OG image/404/analytics/cookies, dominio inconsistente, imágenes pesadas, sin lazy-loading de rutas.
- Copy: metáforas militares en formularios, frases ofensivas en servicios, nombres de servicio inconsistentes, métricas "+215% / 12X" sin respaldo público.
- Negocio: Meta Ads propio nunca encendido; 0 indexación; sin fotos/nombre/WhatsApp validado del fundador.

## 12. Recomendaciones inmediatas

1. Respaldar el árbol local (rama `backup/local-firma` + commit de los untracked) antes de tocar nada.
2. Elegir base: `origin/main` (producción). Portar de local solo AboutPage/specs/datos que se quieran.
3. Añadir `.gitignore`, des-trackear dist/node_modules/.env en la rama elegida.
4. Resolver dominio canónico (`persuasivo.mx`) y número de WhatsApp.
5. Decidir si el rebrand cambia nombre; si sí, no invertir en SEO del dominio actual hasta definirlo.
