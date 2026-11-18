# 04 - Técnicas web creativa 2026 (reemplazo del "Pacman interactivo")

Fecha de investigación: 2026-11-06. Stack actual del repo: Vite 5, React 18, react-router-dom 7, framer-motion 11. No hay GSAP, three ni lenis instalados.

## Nivel de verificación (leer primero)

- **Verificado con fuente:** datos de INEGI, ganadores de Awwwards (listado oficial), licencia de GSAP, pautas de integración Lenis+GSAP, umbrales de Core Web Vitals, tamaño de three.js.
- **Con fuentes contradictorias (marcado "confirmar"):** soporte de View Transitions entre documentos en Firefox, versiones exactas de Safari/Firefox para scroll-driven animations, qué sitio exacto ganó Site of the Year 2025.
- **Estimación propia (no medida):** todos los costos de performance en KB y ms de la sección 5. Hay que medirlos con `vite build` + `rollup-plugin-visualizer` y Lighthouse en un Android de gama baja antes de comprometerse.
- La stack técnica de varios sitios ganadores no es pública; solo la cito donde una fuente la declara.

## 1. Contexto de público: pymes en México, mayormente móvil

- ENDUTIH 2025 (INEGI, publicada 16-jun-2026): 86.1% de la población de 6+ años usa internet (104.9 millones). Un análisis de esos datos indica que 97.3% de los usuarios de internet se conecta con smartphone, contra 36.2% con computadora. Confirmar la cifra exacta en el boletín `ENDUTIH_25_RR.pdf`.
- StatCounter México (jun-2026): Android ~78% y iOS ~22% del tráfico móvil. Implicación: el equipo medio es Android, frecuentemente de gama media/baja, con red 4G irregular. El dueño de pyme llega desde un anuncio de Meta/Instagram, dentro del navegador in-app (webview), que es más lento y más limitado que Chrome.
- Conclusión de diseño: la experiencia debe ser memorable en 5 segundos sobre un Android de $4,000 MXN, no en una MacBook Pro. Todo efecto pesado debe ser opcional y diferido.

## 2. Técnicas modernas: qué usar, qué evitar

| Técnica | Estado 2026 | Veredicto para Persuasivo |
|---|---|---|
| **GSAP + ScrollTrigger** | Todo GSAP, incluidos plugins bonus (SplitText, MorphSVG), es gratis incluso para uso comercial desde que Webflow lo adquirió. Un solo paquete `npm install gsap`. | Usar solo si se necesita timeline/scrub complejo. Para reveals simples, framer-motion (`whileInView`, `useScroll`) ya instalado basta. |
| **Lenis (smooth scroll)** | Envuelve el scroll nativo (sticky y anclas siguen funcionando). Integración con ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker` llama `lenis.raf`, `lagSmoothing(0)`. Riesgos: lectura larga se siente lenta, hay que excluir contenedores con `data-lenis-prevent`, probar teclado y lector de pantalla. En táctil el scroll nativo ya es suave y el smoothing viene desactivado por defecto. | **Evitar en móvil.** Aporta poco donde el 97% de tu público navega. Solo escritorio y con `prefers-reduced-motion` respetado (confirmar en docs oficiales). |
| **CSS scroll-driven animations** (`animation-timeline`) | Chrome/Edge desde 115. Safari y Firefox: fuentes contradictorias (Safari 18.2 o 26; Firefox 133 o sin soporte). Confirmar en MDN/caniuse. | Usar como mejora progresiva (barra de progreso, parallax ligero): corre en el compositor, cero JS. Contenido visible sin la animación. |
| **View Transitions API** | Mismo documento (SPA): Chrome/Edge, Safari 18+, Firefox 144+ (según Chrome docs). Entre documentos: Chrome/Edge 126+, Safari 18.2+, Firefox sin confirmar. | Encaja con react-router 7 (`viewTransition` en `<Link>`/`navigate`). Costo casi cero en JS; fallback es navegación normal. Buena inversión. |
| **WebGL / Three.js / R3F** | Dominante en ganadores (un análisis de terceros dice 29 de 47 Site of the Day de Q1-2026 usan Three.js; no verificado). three.js completo ≈ 150 kB gzip (foro oficial three.js). Tree-shaking ayuda poco. | Solo en un momento acotado y con carga diferida (`React.lazy` + `IntersectionObserver`). Nunca en el LCP. Fallback estático obligatorio. |
| **Shaders (GLSL)** | Efectos de refracción, distorsión, ruido. Se pueden hacer sin three con un `<canvas>` y WebGL crudo (~2-4 kB de código propio). | Un fragment shader de fondo en un solo quad cuesta mucho menos que una escena 3D. Opción barata de "wow". |
| **Cursor custom** | Ubicuo en sitios de agencia. | Sin valor en móvil (no hay cursor). Solo escritorio, `@media (pointer: fine)`. Aprovechar el tacto (haptics via `navigator.vibrate` en Android, retroalimentación visual al tocar). |
| **Video hero** | Común (Studio Namma, Scout Motors usan clips en loop). | Alto riesgo de LCP. Usar `poster` optimizado como LCP, video 480p/720p AV1 o H.264 <1.5 MB, `preload="none"` en conexiones lentas (`navigator.connection.saveData`). |
| **Rive / Lottie** | dotLottie: runtime ~150 kB (cifra del propio vendor, WASM/ThorVG). Rive afirma archivos 10-15x más pequeños que Lottie (cifra del vendor); no hay comparativa independiente. | Rive para microinteracciones con estado (botón, mascota que reacciona). Ojo: el runtime pesa más que el archivo; solo vale la pena con varias animaciones. Para 1-2 animaciones, SVG + framer-motion es más barato. |
| **IA generativa en la web** | AI SDK de Vercel v6: `streamText` con `Output.object({schema})` (en v6 `generateObject` aparece deprecado según un listado de terceros; confirmar migración). Hook `useChat`/`useObject`. | Viable con una Vercel Function y una llave en servidor. Nunca exponer la llave en el cliente. Ver concepto C. |
| **Tipografía editorial** | Titulares enormes, variable fonts, captions tipo revista (Lando Norris). | Costo bajo y retorno alto. Una variable font con `font-display: swap` + `preload`, `clamp()` para escalar. Probablemente la inversión de mejor relación impacto/costo. |

## 3. Sitios ganadores analizados (por qué funcionan)

Fuente de ganadores: listado oficial Awwwards Sites of the Year. Nota: sobre 2025 mis fuentes dan Lando Norris (OFF+BRAND.) y Messenger (abeto) como entradas bajo "Site of the Year 2025"; un resumen secundario atribuye el título a cada uno, así que confirmar en awwwards.com.

1. **Lando Norris - OFF+BRAND. (SOTY 2025, según listado oficial).** Titulares en mayúsculas gigantes, captions estilo revista, hovers contenidos. Un desarrollador de OFF+BRAND publicó en Codrops un efecto de refracción WebGL sobre objetos 3D; un resumen de video de terceros menciona Three.js, depth maps, shaders y máscaras CSS (no verificado). Lección: identidad tipográfica fuerte + un solo efecto WebGL firma.
2. **Messenger - abeto (SOTY 2025 o entrada destacada).** Juego web WebGL/Three.js: repartes cartas en un planeta esférico pequeño. Lección: el sitio *es* la experiencia; un juego ligero con un loop claro retiene mucho más que una galería. Pero es un proyecto de meses.
3. **Igloo Inc - abeto (SOTY 2024).** Mismo estudio; inmersión 3D como marca. Lección: coherencia de mundo visual.
4. **Lusion v3 - Lusion (SOTY 2023).** Referente de WebGL/shaders con partículas y materiales; el propio estudio es su mejor portafolio. Lección: la técnica es el mensaje cuando vendes técnica.
5. **Noomo Agency (SOTY 2023) / "The Power of Storytelling".** Escena WebGL como demo, copy mínimo, menú overlay a pantalla completa y loader deliberado. Lección: poco texto, loader con intención.
6. **Max Mara - The Jacket Circle.** Juego de palabras en navegador que funciona como lookbook interactivo; cada palabra es un nivel autocontenido. Lección: mecánica simple y rejugable para producto/marca. Referente directo para el concepto A.
7. **Studio Namma (París).** Un clip de video corto por servicio, saltos de línea intencionales en el copy, formulario de contacto de cuatro campos. Lección: claridad comercial dentro de una estética de agencia; relevante para convertir.
8. **Produx.** Brutalismo contenido, texto que aparece letra por letra, entrega prometida en 14 días, reseñas enlazadas a Google. Lección: personalidad + prueba social concreta + promesa clara.
9. **By-Kin (Reino Unido).** Next.js + GSAP + weighted smooth scroll, premio Developer de Awwwards según una reseña de terceros. Tipografía editorial y transiciones continuas. Lección: oficio de ingeniería visible, sin gimmicks.
10. **Uncommon Studio (Australia).** Grilla que se rompe en momentos deliberados, transiciones tipo cámara, y aun así responde rápido. Lección: restricción como estética.

Patrones comunes: (a) una sola idea visual dominante, (b) tipografía grande y decidida, (c) loader con personalidad, (d) movimiento al servicio de la lectura, no sobre ella, (e) un CTA claro repetido (Scout Motors, Produx), (f) el WebGL se limita a una sección o al hero.

Lo que muchos sitios ganadores NO resuelven para tu público: pesan varios MB, asumen GPU decente y no están pensados para webviews de Instagram. Copiar la técnica sin la restricción de peso sería un error.

## 4. Rendimiento, accesibilidad y SEO móvil

- **Core Web Vitals (umbrales "buenos", percentil 75):** LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1. Sin cambios desde que INP reemplazó a FID en marzo 2024. El peso en ranking es modesto, pero el efecto real está en la conversión.
- **Presupuesto sugerido (propuesta propia):** JS inicial <= 150 kB gzip, hero LCP <= 2.0 s en 4G lento simulado, total de la ruta de inicio <= 1 MB sin video. Todo lo pesado (three, Rive, IA) en chunks cargados bajo demanda.
- **Cómo medir:** Lighthouse mobile con throttling, PageSpeed Insights (datos de campo CrUX) y un Android real de gama baja. Probar dentro del navegador in-app de Instagram.
- **Accesibilidad:** respetar `prefers-reduced-motion` (apagar parallax, smooth scroll y loops; mostrar estado final), foco visible y navegación por teclado, contraste AA, no bloquear el scroll con loaders largos, subtítulos o alternativa a cualquier video con información, `aria-live` para resultados del generador de IA, y una versión sin canvas del juego (botones en vez de gestos).
- **SEO:** el contenido indexable debe vivir en el HTML, no solo en canvas. Con Vite SPA hay riesgo: usar prerender (por ejemplo `vite-plugin-prerender`/SSG) o asegurar que las rutas clave devuelvan HTML con H1, texto y datos estructurados. react-helmet-async ya está en el proyecto. Cuidar `<title>`, meta description, canonical y Open Graph (las pymes comparten por WhatsApp). Los efectos pesados no deben bloquear el render del texto.
- **Tacto en móvil:** áreas táctiles >= 44 px, nada que dependa de hover, gestos con alternativa en botón.

## 5. Tres conceptos de "experiencia firma"

Costos de performance son estimaciones propias, por medir.

### Concepto A - "Reel Playground": reproductor de reels interactivo

**Idea:** un carrusel vertical tipo Reels/TikTok en el hero o en una sección. El visitante desliza entre 5-6 clips cortos de trabajo de Persuasivo (con resultados reales: "+X leads en N días"). Al tocar, aparece una capa interactiva: eliges tu giro (restaurante, clínica, inmobiliaria) y el mismo reel cambia el texto superpuesto y el CTA a ese giro. Es un reflejo directo de lo que Persuasivo vende (reels) y de la lógica de Max Mara (mecánica simple, rejugable).

- **Viabilidad en Vite+React+framer-motion:** alta. `scroll-snap` CSS + `<video>` + framer-motion para transiciones y overlays. Sin librerías nuevas.
- **Costo de performance (estimado):** +5-15 kB JS. El costo real son los videos: 5 clips de 3-6 s en 480p H.264/AV1 ≈ 300-700 kB cada uno. Mitigación: cargar solo el primero con `poster`, `preload="none"` en el resto, `IntersectionObserver` para play/pause, desactivar autoplay con `saveData` o conexión lenta. INP bajo si los handlers son simples.
- **Riesgos:** autoplay con audio bloqueado (todo muted + subtítulos), webview de Instagram con comportamiento variable de `<video>`, y contenido: requiere material real producido.
- **Impacto de marca:** alto y coherente. Sirve como demostración y como portafolio a la vez.
- **Esfuerzo:** bajo-medio (3-5 días de dev; depende de tener los clips).

### Concepto B - "El Spot": momento WebGL-shader de firma, ligero

**Idea:** el hero es tipografía editorial gigante con un fondo shader (fluido/ruido que reacciona al toque o al dedo arrastrado, o a la inclinación con el giroscopio con permiso). En un punto del scroll, el logo o una palabra clave se "revela" a través de una máscara que sigue el dedo. Una sola escena, un solo quad, sin modelos 3D. Inspirado en Lando Norris (tipografía + un efecto firma) y en el enfoque "WebGL como atmósfera" de Iventions.

- **Viabilidad:** alta si se hace con WebGL crudo (un `<canvas>` y un fragment shader de ~60 líneas); media si se usa three/R3F (agrega ~150 kB gzip de three, en chunk diferido).
- **Costo de performance (estimado):** WebGL crudo +3-6 kB JS, GPU baja-media; three/R3F +150-200 kB gzip diferidos, GPU media-alta y riesgo de batería y calentamiento en Android de gama baja. Mitigación: render a resolución reducida (`devicePixelRatio` máx 1.5), pausar fuera de pantalla, congelar en un frame estático con `prefers-reduced-motion`, fallback a imagen/gradiente CSS si falla WebGL o el FPS cae (medir con `requestAnimationFrame`).
- **Riesgos:** el LCP debe ser el texto y no el canvas; contexto WebGL perdido en webviews; mantenimiento de shader por una persona.
- **Impacto de marca:** memorable visualmente, pero no vende por sí solo; es "estética" más que "demostración de servicio".
- **Esfuerzo:** medio (4-7 días; mucho ensayo y error visual).

### Concepto C - "Generador de Ideas para el CEO": herramienta de IA con personalidad

**Idea:** un widget de 3 pasos: eliges tu giro, tu objetivo (más citas, más ventas, marca) y tu tono; la IA devuelve en streaming 3 ideas de contenido (reel/carrusel/historia) con un gancho, un guion de 15 s y un CTA, listas para copiar. Al final: "¿Quieres que las produzcamos? Escríbenos por WhatsApp" con el contexto prellenado. Es captación de leads disfrazada de juguete útil y el diferenciador más fuerte para dueños de pyme (te da valor antes de pedirte algo).

- **Viabilidad:** alta pero requiere backend: una Vercel Function (Vite no tiene servidor) que llama al modelo con la llave en variable de entorno de servidor, nunca en el cliente. AI SDK de Vercel (`streamText`; confirmar en docs la API de salida estructurada en v6) o llamada directa a la API de Anthropic/OpenAI. Streaming con `fetch` + `ReadableStream` si no se quiere agregar el SDK.
- **Costo de performance (estimado):** +3-10 kB JS cliente sin SDK (o ~30-60 kB con `ai/react`, medir); el costo es de red/latencia del modelo (1-4 s hasta el primer token con streaming). Cargar el widget bajo demanda (`React.lazy`). Sin impacto en LCP si está bajo el pliegue.
- **Riesgos:** abuso y costo de tokens (rate limiting por IP, límite de longitud, captcha ligero tipo Turnstile), contenido inapropiado (system prompt estricto + validación), privacidad (aviso de uso de datos, no guardar nada sensible), calidad inconsistente del modelo (probar con 20 giros reales). Cumplir aviso de privacidad mexicano si se capturan datos de contacto.
- **Impacto de marca y conversión:** el más alto para generar leads cualificados; también el más rastreable (eventos: giro elegido, idea copiada, clic a WhatsApp).
- **Esfuerzo:** medio (4-6 días + afinado de prompt + medidas anti-abuso).

### Comparativa rápida

| | A. Reel Playground | B. El Spot (shader) | C. Generador de Ideas |
|---|---|---|---|
| Memorabilidad | Alta | Alta (visual) | Alta (útil) |
| Coherencia con el servicio | Muy alta | Media | Alta |
| Captación de leads | Media | Baja | Alta |
| Peso extra JS | Bajo | Bajo (crudo) / Alto (three) | Bajo-medio |
| Peso extra red | Medio (video) | Bajo | Bajo |
| Riesgo móvil de gama baja | Medio | Medio-alto | Bajo |
| Requiere backend | No | No | Sí |
| Esfuerzo | Bajo-medio | Medio | Medio |

## 6. Recomendación

1. **Base obligatoria (barata, para cualquier concepto):** tipografía editorial con variable font, view transitions con react-router 7, reveals con framer-motion (ya instalado), loader con personalidad, `prefers-reduced-motion`, presupuesto de performance y prerender para SEO. No instalar Lenis ni three para esto.
2. **Experiencia firma recomendada: C como pieza principal + A como hero.** C da valor y capta leads; A demuestra el servicio. Juntas: el hero es el reel interactivo y, bajo el pliegue, el generador de ideas.
3. **B solo si sobra presupuesto**, implementado con WebGL crudo y no con three, como acento del hero.
4. **No instalar GSAP todavía.** Reconsiderar solo si un timeline con scrub complejo lo exige; es gratis, así que no hay barrera de licencia.
5. **Antes de comprometerse:** medir un prototipo del concepto elegido en un Android de gama baja real y dentro del webview de Instagram, y confirmar en caniuse/MDN el soporte actual de View Transitions entre documentos y de scroll-driven animations.

## Fuentes

- INEGI, ENDUTIH 2025: https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25_RR.pdf
- Awwwards, Sites of the Year: https://www.awwwards.com/websites/sites_of_the_year/ y https://www.awwwards.com/annual-awards/winners
- Codrops, Adrián Gubrica (OFF+BRAND): https://tympanus.net/codrops/2025/12/05/from-illusions-to-optimization-the-creative-webgl-worlds-of-adrian-gubrica/
- hontran.dev, mejores sitios 2026: https://www.hontran.dev/blog/best-award-winning-websites-2026
- hireadrian.com, sitios premiados: https://hireadrian.com/award-winning-websites/
- Chrome Developers, View Transitions: https://developer.chrome.com/docs/web-platform/view-transitions
- GSAP (README oficial, gratis): https://github.com/greensock/GSAP
- Lenis (README oficial): https://github.com/darkroomengineering/lenis
- dotLottie: https://lottiefiles.com/dotlottie ; Rive vs Lottie: https://rive.app/blog/rive-as-a-lottie-alternative
- three.js tamaño: https://discourse.threejs.org/t/three-js-file-size-when-importing-via-npm-and-bundling-with-webpack/8904
- StatCounter México: https://gs.statcounter.com/os-market-share/mobile/mexico/2025
- Core Web Vitals 2026: https://corewebvitals.io/core-web-vitals
- Messenger (abeto): https://www.awwwards.com/abeto/
