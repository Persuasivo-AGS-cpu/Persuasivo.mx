# Plan v2: Persuasivo → estudio creativo para CEOs y pymes

Síntesis de los reportes 01–04, revisada con una segunda pasada crítica. Es una propuesta para aprobar. Nada se ejecuta sin un "sí" de Abraham.

Leyenda: **[D]** dato de los reportes o del handoff · **[S]** supuesto mío, por validar · **[?]** falta información de Abraham.

---

## 0. Brief del proyecto

| Campo | Contenido |
|---|---|
| **Proyecto** | Rediseño y reposicionamiento de persuasivo.mx: de "agencia de marketing/tráfico" a estudio creativo para CEOs y pymes. |
| **Cliente / dueño** | Abraham Garza (Persuasivo). Un solo decisor. |
| **Problema** | Cero leads desde la creación del sitio. Causa real [D]: nunca hubo tráfico (Meta Ads sin pago ni campañas, 0 páginas indexadas). Además el sitio tiene fallas de UX conocidas y un posicionamiento genérico. |
| **Objetivo de negocio** | Convertir Persuasivo en la agencia creativa de pymes sin equipo de marketing: campañas con intención, storytelling de marca, contenido de marca personal para CEOs, sitios web. |
| **Objetivo del sitio** | Que un dueño de pyme entienda en 5 segundos qué hacemos, vea prueba de que funciona y contacte por WhatsApp o formulario. |
| **Audiencia principal** | Dueños, fundadores y CEOs de pymes en México, sin equipo ni tiempo de marketing. Entran sobre todo desde celular (97% del acceso a internet en México es por smartphone [D], Android ~78% [D]) y desde el navegador in-app de Instagram/Facebook [S]. |
| **Audiencia secundaria** | Gerentes de marketing de pymes que necesitan un proveedor creativo. |
| **Oferta** | Cuatro servicios: campañas creativas (Meta Ads), contenido y storytelling, sitio web como parte de la marca, y marca personal del CEO (video corto). Precios visibles. |
| **Diferenciadores** | Precios visibles, proceso real de 7 pasos, casos verificables (p. ej. Grupo APH) [D]. Nicho libre: no hay agencia latina especializada en video corto para CEOs de pymes [D, búsqueda parcial]. |
| **Referencias** | conqr.mx como referencia **visual y de interacción** únicamente: es agencia BTL/experiencial, no de contenido [D]. Ver reportes 01 y 04. |
| **Tono** | Por decidir. Claridad antes que "cool". El tono táctico-militar queda abierto a discusión; no debe aparecer en puntos de confianza (formulario) [D]. |
| **Identidad visual** | Abierta. "Papel de Operaciones" (papel + naranja #D6531D, Oswald/IBM Plex) es lo vigente en producción [D]. |
| **Nombre** | Se mantiene "Persuasivo" + descriptor "Estudio creativo" en esta fase. Cambio de nombre se reevalúa con datos de tráfico. |
| **Experiencia firma** | Sustituta del Pacman. Propuesta: Generador de ideas de contenido para el CEO (principal) + Reel Playground en el hero [04]. |
| **Entregables** | Plan aprobado; arreglos de UX; sitio nuevo en producción; medición instalada; tráfico de pago encendido. |
| **Stack** | Vite 5, React 18, react-router 7, framer-motion 11, react-helmet-async; Vercel (proyecto `persuasivo-mx`, dominio www.persuasivo.mx). Lead: `formsubmit.co` a hola@persuasivo.mx [D]. |
| **Restricciones** | Mobile-first y ligero; sin testimonios por ahora (decisión previa de Abraham); no relitigar precios visibles ni los 7 pasos. |
| **Éxito (propuesto)** | Ver sección 7. Metas numéricas **[?]** pendientes de Abraham. |
| **Presupuesto / fecha** | **[?]** Sin definir. |
| **Contacto directo** | **[?]** Falta número de WhatsApp real. |
| **Aprobador y hito de "sí"** | Abraham, una sola aprobación del plan de diseño antes de construir. |

---

## 1. Lo que dice la evidencia

- Conqr es BTL/experiencial; social es 1 de 7 servicios; nada de CEO branding. Su "signature": intro 3D, cursor propio, cortinillas, scroll horizontal. Sin precios, casos con cifras ni rostros del equipo. Es pesado para móvil [D: 01].
- En Instagram publican menos de una pieza por semana y no hay evidencia de video de CEO [D: 02].
- La base técnica local y `origin/main` divergieron (6 adelante, 13 atrás); producción corre la línea remota [D: 03].
- Recomendación técnica: framer-motion ya cubre la mayor parte; no instalar three/Lenis de entrada [04].

## 2. Posicionamiento (borrador)

> Hacemos que el dueño de la empresa se vea, suene y venda como la marca que ya es. Estrategia, video y campañas con intención, para pymes sin equipo de marketing.

## 3. Servicios reenmarcados

| Hoy | Nuevo marco |
|---|---|
| Meta Ads | Campañas creativas con intención |
| Redes & Copywriting | Contenido y storytelling de marca |
| Desarrollo Web | Sitio como parte de la marca |
| (nuevo) | Marca personal del CEO (guion, grabación, edición, video corto) |

Un solo nombre por servicio en nav, footer y páginas.

## 4. Experiencia firma

- **C. Generador de ideas para el CEO:** captura leads; requiere Vercel Function con la llave de IA en servidor.
- **A. Reel Playground** en el hero.
- Medir un prototipo en Android de gama baja y en el navegador in-app de Instagram antes de fijar el concepto [04].

## 5. Estructura de página

Hero (promesa + CTA que diga qué pasa + WhatsApp) → experiencia firma → servicios → 7 pasos → casos → precios → generador de ideas → cierre con contacto sin filtro excesivo.

---

## 6. Áreas de oportunidad detectadas en la revisión

Ordenadas por impacto. Cada una corrige un hueco del plan v1.

### Críticas (cambian el orden o el alcance)

1. **El orden de fases era incorrecto.** v1 dejaba el tráfico para el final. La causa raíz del "cero leads" es la falta de tráfico, no el diseño [D]. *Cambio:* encender una campaña pequeña de Meta Ads hacia el sitio **actual** ya, en paralelo, para obtener datos reales antes y después del rediseño. Requiere método de pago y presupuesto **[?]**.
2. **No hay validación de demanda del servicio nuevo.** "Marca personal del CEO" es una hipótesis [S]: no tiene precio, casos ni oferta definida, y ninguna conversación con clientes lo respalda. *Cambio:* antes de construir la página, 5–10 conversaciones con dueños de pyme y una oferta piloto con precio.
3. **No hay prueba para el servicio nuevo.** Con "sin testimonios" y sin casos de video de CEO, la sección más importante estaría vacía. *Cambio:* producir 2–3 piezas piloto (incluyendo contenido del propio Abraham como caso propio) y mostrar resultados o proceso.
4. **SEO sin resolver.** Es una SPA sin SSR y con 0 páginas indexadas [D]. Un sitio creativo y rápido no sirve si Google no lo ve. *Cambio:* prerender/SSG de las rutas públicas, sitemap, `robots`, imagen OG, 404, y dominio canónico correcto (el `index.html` local apunta a `.com.mx`, equivocado [D]).
5. **Sin medición.** El plan no incluye analítica, píxel de Meta/API de conversiones ni eventos (clic en WhatsApp, envío de formulario, uso del generador). Sin esto no se puede evaluar el rediseño. *Cambio:* instalar medición en la fase 1.
6. **Capacidad de entrega sin definir [?].** Prometer video, campañas, web y marca personal exige producción. No sé quién graba, edita y entrega, ni cuántos clientes se pueden atender a la vez. Riesgo de vender más de lo que se entrega.

### Importantes

7. **El generador de ideas puede abusarse y cuesta dinero.** Llamadas a IA sin límite. *Cambio:* límite de uso por IP/sesión, captura de contacto antes del resultado completo, tope de gasto mensual, y validación de entradas.
8. **Cumplimiento.** El formulario y el generador guardan datos personales. Falta aviso de privacidad (LFPDPPP) y consentimiento visible **[S: confirmar con asesor]**.
9. **Manejo de leads.** El único canal es `formsubmit.co` a un correo [D]. Sin CRM, sin tiempo de respuesta definido y sin seguimiento. *Cambio:* WhatsApp como canal principal, respuesta en menos de 1 hora hábil como regla, y una hoja o CRM mínimo.
10. **Decisión de tono pendiente.** El plan v1 la pospone a "moodboard". Debe decidirse explícitamente antes del copy, porque cambia todo el texto.
11. **Peso vs. creatividad.** Hero con video y efectos puede romper Core Web Vitals en Android. *Cambio:* presupuesto de rendimiento medible por sección, versión estática para dispositivos lentos y `prefers-reduced-motion`.
12. **Precio del servicio nuevo y anclajes.** Los precios visibles son un diferenciador [D]; el cuarto servicio los necesita igual.

### Oportunidades de diferenciación

13. **Ángulo GEO/IA.** Conqr vende "cited by AI" [D: 01] pero su blog es genérico. *Oportunidad:* datos estructurados, `llms.txt` y páginas de respuesta a preguntas reales del nicho (CEO + contenido).
14. **Español primero.** Conqr usa inglés por defecto [D]. Para pymes mexicanas, español claro es ventaja.
15. **Rostros y proceso visibles.** Conqr no muestra equipo [D]. En un servicio de marca personal, mostrar a quien lo hace (nombre, foto, ciudad) genera confianza y cubre el hallazgo de "cero señal humana" [D: handoff].
16. **Casos con cifras.** Conqr no muestra resultados [D]. Cualquier caso con número real supera su sitio.
17. **Contenido propio como motor.** Persuasivo debería aplicar a sí mismo lo que vende: publicar video corto del fundador. Es caso de estudio y fuente de tráfico a la vez.

### Higiene técnica (de la auditoría 03)

18. Resolver la divergencia de git antes que nada: respaldar el árbol local (16 archivos sin commitear), partir de `origin/main`, portar lo valioso (specs, schema).
19. Quitar `.env`, `dist/` y `node_modules/` del control de versiones local; el remoto ya lo evita [D].
20. Eliminar Pacman, `ArcadeCabinet`, fuentes sin uso, `src_backup_*` y `ThemeProvider` sin uso [D].
21. Verificar en Vercel que el deploy de producción tenga el commit esperado (`target: production`, `READY`) antes de dar algo por publicado [D: handoff].

---

## 7. Éxito: métricas propuestas

Metas numéricas **[?]** a fijar por Abraham. Indicadores:

- Visitas cualificadas por semana (desde Meta Ads y orgánico).
- Clics a WhatsApp y envíos de formulario por cada 100 visitas.
- Costo por lead de la campaña de Meta.
- Leads → llamadas → clientes.
- Core Web Vitals en móvil (LCP, INP, CLS) medidos en Android real.
- Páginas indexadas en Google.

## 8. Fases (reordenadas)

0. **Base de git** (bloqueante): respaldo local, partir de `origin/main`.
1. **Fundamentos en paralelo:** arreglos de UX (footer, errata, nombres, formulario, WhatsApp), SEO técnico, medición, aviso de privacidad; **Meta Ads pequeña hacia el sitio actual** para línea base.
2. **Validación:** conversaciones con 5–10 dueños, oferta piloto, 2–3 piezas piloto de video.
3. **Diseño:** decisión de tono, moodboard, copy, wireframes → un solo "sí" de Abraham.
4. **Build por entregas:** hero + experiencia firma → secciones → generador de ideas (con límites).
5. **Medición y ajuste:** Android real, in-app de Instagram, comparar con línea base.

**Versión mínima (MVP) si hay que recortar:** fases 0, 1 y 2 más un hero nuevo con el Reel Playground. El generador de ideas y los efectos avanzados van después.

## 9. Decisiones abiertas para Abraham

1. ¿Partir de `origin/main` y respaldar el local?
2. ¿Aprobar posicionamiento y cuarto servicio, sujetos a validación?
3. ¿Tono: seguir táctico, suavizarlo o cambiarlo?
4. ¿Concepto firma: C + A?
5. Número de WhatsApp real.
6. Presupuesto y fecha para encender Meta Ads.
7. ¿Quién produce el video y con qué capacidad mensual?
8. Metas numéricas de éxito.

## 10. Límites de la evidencia

- Instagram de Conqr: sin engagement ni captions (requiere sesión).
- Costos de rendimiento de los conceptos: estimaciones, no mediciones.
- Soporte de navegadores de View Transitions y scroll-driven animations: confirmar en MDN/caniuse.
- Estado de Vercel no verificado.
- Los puntos marcados [S] son supuestos míos, no hallazgos.
