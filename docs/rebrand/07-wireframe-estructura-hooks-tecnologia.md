# Wireframe v1: estructura, hooks y tecnología

Alcance: la nueva web de Persuasivo, ya posicionada como agencia creativa para dueños de negocios pequeños. Es una propuesta a aprobar, no código final. Se apoya en los reportes 01 a 06 y en el paquete del consultor (05).

Leyenda: **[F]** dato del fundador · **[D]** dato de los reportes · **[S]** propuesta o supuesto por validar.

---

## 1. Principios del diseño

1. **Un solo objetivo por página:** que el visitante escriba por WhatsApp. Todo lo demás lo apoya.
2. **Mobile-first.** 97% de usuarios de internet en México entra por smartphone y buena parte llega desde el navegador de Instagram o Facebook [D: 04].
3. **Claridad antes que "cool".** En 5 segundos se entiende: qué hacemos, para quién y qué hago yo como cliente.
4. **Prueba sin cifras.** Los clientes no autorizan publicar números [F]. La prueba es trabajo visible, proceso y una cara.
5. **Un elemento memorable, ligero.** Reemplaza al Pacman sin romper el rendimiento: reproductor de ideas en el hero y generador de ideas.
6. **Honestidad.** Una sola persona al frente, con IA como apoyo. Se dice sin pena.

## 2. Mapa del sitio

| Ruta | Para qué | Estado |
|---|---|---|
| `/` | Home larga de una sola página (13 secciones, ver sección 3) | Existe versión 1 |
| `/servicios/contenido-y-storytelling` | Página de servicio, SEO y anuncios | Nueva (reemplaza `/servicios/autoridad`) |
| `/servicios/marca-personal` | Servicio para dueños que dan la cara | Nueva |
| `/servicios/campanas-meta` | Campañas con intención | Nueva (reemplaza `/servicios/trafico`) |
| `/servicios/sitios-web` | Sitio como parte de la marca | Nueva (reemplaza `/servicios/ecosistemas`) |
| `/ideas` | Generador de ideas (página propia, compartible, indexable) | Nueva |
| `/trabajo` | Casos con evidencia del trabajo | Nueva |
| `/contacto` | Formulario corto + WhatsApp | Rediseñar |
| `/gracias` | Confirmación; dispara conversión del píxel | Nueva |
| `/legal/*` | Privacidad, términos, cookies | Existe |
| Redirecciones 301 | Rutas viejas hacia las nuevas | Nueva |

Quitar: `/arcade`, `/onboarding` (a menos que se use), Pacman.

Navegación (máx. 5 elementos): Nosotros · Servicios · Proceso · Trabajo · Contacto, más botón fijo de WhatsApp.

## 3. Estructura de la home (de arriba abajo)

Cada sección lleva: objetivo, contenido, hook (gancho) y métrica.

| # | Sección | Objetivo | Contenido | Métrica |
|---|---|---|---|---|
| 0 | Barra superior | Orientar y convertir | Logo, 4 enlaces, botón WhatsApp; botón flotante en móvil | Clics a WhatsApp |
| 1 | Hero | Explicar y llevar a WhatsApp | Titular, subtítulo, 2 botones, reproductor de ideas (teléfono 9:16), línea "sin compromiso" | Clic en CTA, scroll >25% |
| 2 | Franja de contexto | Dar credibilidad rápida | "Hemos trabajado con inmobiliarias, despachos y empresas industriales", logos/nombres sin cifras | Scroll |
| 3 | El problema | Que el visitante se vea reflejado | Tres miedos: no sé qué decir, no tengo tiempo, me da pena la cámara | Scroll, tiempo en sección |
| 4 | La idea: 2 horas al mes | Mostrar el cambio | Antes y después: "tú grabas 2 horas, nosotros sacamos un mes de contenido" | Scroll |
| 5 | Servicios | Presentar la oferta | 4 tarjetas: para quién y qué recibes; cada una enlaza a su página | Clic a páginas de servicio |
| 6 | Generador de ideas | Captar leads con valor | Eliges giro, ves 3 ideas, botón "pídeme el guion por WhatsApp" | Uso del generador, clics a WhatsApp |
| 7 | Proceso en 7 pasos | Quitar incertidumbre | Lista interactiva con "tu único trabajo del mes" resaltado | Interacción |
| 8 | Nosotros | Poner cara y confianza | Foto real, video de 30 s de presentación, historia breve, cómo usamos IA | Reproducción del video |
| 9 | Trabajo | Dar prueba | 4 casos con evidencia (piezas, capturas, videos), sin cifras; Renters rotulado "proyecto propio" | Clic en casos |
| 10 | Cómo cotizamos | Quitar miedo al precio | Tres formas de empezar (piloto, mensual, a medida) y qué incluye cada una; precios cuando estén validados | Scroll, clic a WhatsApp |
| 11 | Preguntas frecuentes | Resolver objeciones | 6–8 preguntas (miedo a la cámara, costo, tiempo, qué necesito, uso de IA, derechos de imagen) | Apertura de preguntas |
| 12 | Cierre | Convertir | "¿Platicamos 20 minutos?", botón WhatsApp y formulario corto de 3 campos | Conversión |
| 13 | Pie de página | Cumplir y orientar | Enlaces, aviso de privacidad, ciudad, redes | — |

## 4. Wireframe de la home

Ver el wireframe visual en la conversación. Resumen de orden de bloques en móvil: Hero → Problema → Idea → Servicios → Generador → Proceso → Nosotros → Trabajo → Cotización → Preguntas → Cierre.

Decisión de orden **[S]**: el generador va antes que el proceso porque ofrece valor inmediato y captura interés antes del bloque largo. Nosotros va después del proceso para que la confianza llegue cuando el visitante ya entendió la oferta; el hero ya incluye una línea con tu nombre para no esperar.

## 5. Hooks (ganchos de texto)

Tono: A con toques de B (cálido, llano, humor autoirónico) [F]. Español de México, tuteo, frases cortas, sin mayúsculas gritadas ni promesas de viralidad.

### 5.1 Hero (probar en A/B)

| Variante | Titular | Por qué |
|---|---|---|
| H1-A (actual) | Tú pon la cara. Nosotros ponemos la historia. | Reparte el trabajo en una frase |
| H1-B | Dos horas al mes. Un mes de contenido. | Beneficio concreto y medible |
| H1-C | Tu negocio ya tiene una historia. Falta quien la cuente. | Toca lo emocional |

Subtítulo base: "Ayudamos a dueños de negocios que no tienen tiempo, equipo ni ganas de verse en cámara. Tú grabas con nosotros 2 horas al mes; de ahí salen tus videos, tu contenido y tus campañas."

CTA principal: "Escríbeme por WhatsApp". Alternativas para probar: "Platiquemos 20 minutos", "Cuéntame de tu negocio".
Microcopy bajo el botón: "Sin compromiso. La primera plática es para conocerte, no para venderte."

### 5.2 Por sección

| Sección | Hook principal | Alternativa |
|---|---|---|
| Problema | "Sabes que deberías estar en redes. Pero ¿qué dices? ¿cuándo? ¿y si te ves raro?" | "No es que no tengas qué contar. Es que nadie te ha ayudado a contarlo." |
| La idea | "Tú das 2 horas. Nosotros sacamos el mes." | "Una tarde de grabación, treinta días de contenido." |
| Servicios | "Contamos tu historia y hacemos que llegue a quien debe." | "Cuatro formas de que tu negocio se vea (y se venda) mejor." |
| Generador | "Si no sabes qué grabar, empieza por aquí." | "Elige tu giro. Te damos 3 ideas en 10 segundos." |
| Proceso | "Siete pasos. Tú haces uno." | "Así trabajamos, sin letra chica." |
| Nosotros | "Un solo estratega que te atiende de principio a fin." | "Soy Abraham. Esto es lo que hago y lo que no." |
| Trabajo | "Negocios con los que hemos trabajado." | "Esto es lo que hicimos, tú juzgas." |
| Cotización | "Cada negocio es distinto, el precio también. Aquí cómo lo calculamos." | "Sin sorpresas: así se arma tu cotización." |
| Preguntas | "Lo que todos preguntan antes de escribir." | "¿Y si me da pena la cámara?" (primera pregunta) |
| Cierre | "¿Platicamos 20 minutos?" | "Cuéntame de tu negocio y te digo, con honestidad, si te puedo ayudar." |

### 5.3 Hooks de video (para el contenido que alimenta el sitio y las campañas) **[S]**

1. "Nunca me había grabado… y salió fácil." (cliente, 20 s)
2. "3 errores que cuestan más que un buen video." (tú a cámara, 40 s)
3. "Lo que pasa en una sesión de grabación de 2 horas." (detrás de cámaras, 30 s)
4. "Por qué no te da pena la cámara, te da pena el guion." (opinión, 30 s)

Estas piezas, grabadas por Persuasivo con Abraham como protagonista, son también el primer caso propio del servicio nuevo.

## 6. Tecnología

### 6.1 Decisiones principales

| Tema | Recomendación | Razón |
|---|---|---|
| Base | Mantener Vite 5 + React 18 + react-router 7 + framer-motion 11 [D: 03] | Ya existe y funciona; evita reescribir |
| SEO | **Prerender estático** de las rutas públicas (p. ej. `vite-react-ssg` o equivalente; verificar compatibilidad con react-router 7) o migrar a un framework con salida estática (Astro, Next.js) si el prerender falla | La SPA actual tiene 0 páginas indexadas [D: 03] |
| Estilos | Mover estilos inline a CSS con tokens (`--paper`, `--ink`, `--accent`) | Mantenible y más ligero |
| Fuentes | Alojarlas en el propio sitio, `font-display: swap`, solo 2 familias y pocos pesos | Rendimiento y CLS |
| Imágenes | AVIF/WebP, `srcset`, `loading="lazy"`; hoy pesan ~4.9 MB [D: 03] | LCP |
| Video | `<video muted playsinline loop preload="none">` con póster; ≤ 1.5 MB por loop; alojado en Vercel Blob o CDN de video | Android gama baja, navegador in-app |
| Animación | framer-motion y CSS; respetar `prefers-reduced-motion`; **sin three.js ni GSAP en v1** [D: 04] | Peso y riesgo |
| Contacto | WhatsApp como canal principal; formulario de 3 campos que llama a una **Vercel Function** (`/api/lead`) que envía correo y registra el lead | `formsubmit.co` hoy es el único canal [D: handoff] |
| Generador de ideas v1 | Banco de ideas estático, sin servidor | Cero costo, cero riesgo |
| Generador de ideas v2 | Vercel Function con modelo vía AI Gateway (cadena `proveedor/modelo`), límite por IP, tope de gasto mensual, salida estructurada | Personalizar sin abuso |
| Almacén de leads | Fase 1: correo + hoja de cálculo; si se necesita CRM, elegir integración desde Vercel Marketplace | Evitar sobreconstruir |
| Hosting | Vercel (proyecto `persuasivo-mx`, dominio www.persuasivo.mx) con previews por rama [D: handoff] | Ya configurado |
| Contenido | Textos en un archivo único (`src/content/*.js`) para editar sin tocar componentes | Cambios de copy rápidos |

### 6.2 Medición **[S]**

- Vercel Web Analytics y Speed Insights.
- Píxel de Meta y API de conversiones desde una Function, con desduplicación de eventos.
- Eventos mínimos: `click_whatsapp` (con la sección de origen), `lead_form_submit`, `generator_used`, `generator_whatsapp`, `step_view`, `faq_open`, `video_play`.
- Página `/gracias` para conversiones.
- Banner de cookies que respete el consentimiento antes de cargar píxeles.

### 6.3 SEO y descubrimiento

- Prerender, `sitemap.xml`, `robots.txt`, etiqueta canonical por ruta, imagen OG de 1200×630.
- Datos estructurados `ProfessionalService` con ciudad (Monterrey), `FAQPage` para la sección de preguntas.
- Dominio canónico único: `www.persuasivo.mx` (el `index.html` local apuntaba a `.com.mx`, error [D: 03]).
- `llms.txt` y páginas que respondan preguntas reales del nicho (ángulo GEO, ausente en Conqr [D: 01]).
- Página 404.

### 6.4 Rendimiento y accesibilidad (presupuesto) **[S]**

- LCP < 2.5 s en 4G con Android de gama media; INP < 200 ms; CLS < 0.1.
- JavaScript inicial < 150 kB comprimido.
- Contraste AA, foco visible, objetivos táctiles ≥ 44 px, alternativas de texto, navegación por teclado, movimiento reducido.
- Probar en un Android de gama baja real y en el navegador integrado de Instagram antes de publicar [D: 04].

### 6.5 Legal y confianza

- Aviso de privacidad (LFPDPPP) visible en formularios y en el generador.
- Consentimiento de cookies.
- Permisos escritos de clientes para mostrar nombre y trabajo [F].
- Sin promesas de "viral" ni garantías de resultados.

## 7. Qué se aprovecha de la v1 ya construida

La home en `CreativeHome.jsx` ya cubre secciones 1, 5, 7, 8, 9 y 12 en una primera versión, más el generador estático y el botón flotante. Faltan: problema, la idea de 2 horas, cotización, preguntas frecuentes, franja de contexto, páginas de servicio, `/ideas`, `/trabajo`, `/gracias`, formulario con Function, medición, prerender y legal.

## 8. Orden de construcción propuesto

1. Wireframe aprobado (este documento).
2. Copy final de cada sección con el tono elegido.
3. Medición, prerender y rendimiento (base técnica).
4. Home completa (secciones faltantes).
5. Páginas de servicio, `/ideas`, `/trabajo`, `/contacto`, `/gracias`.
6. Pruebas en Android real y navegador de Instagram.
7. Publicación con verificación en Vercel (`target: production`, `READY`).

## 9. Decisiones abiertas

1. ¿Aprobar el orden de secciones (generador antes del proceso, Nosotros después)?
2. ¿Qué hook de hero probamos (A, B o C)?
3. ¿Prerender sobre Vite o migrar a Astro/Next?
4. ¿Foto y video de presentación: quién y cuándo se graban?
5. ¿Mostrar rangos de precio en la sección de cotización o solo "a la medida" por ahora?
6. ¿Generador solo estático en v1 o con IA desde el inicio?
