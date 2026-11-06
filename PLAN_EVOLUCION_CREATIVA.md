# Plan: evolución de Persuasivo hacia agencia creativa (ref. Conqr.mx)

> Documento de traspaso para continuar este trabajo en una **sesión local** (con acceso real a Chrome vía la extensión Claude in Chrome). Escrito el 6 de noviembre de 2026, al cierre de una sesión en la nube que no tiene acceso al navegador real del usuario.

## 0. Repo y entorno

- **Repo:** `https://github.com/Persuasivo-AGS-cpu/Persuasivo.mx`
- **Rama activa de trabajo:** `claude/stoic-albattani-n2rxjr` (se hace fast-forward merge a `main` en cada ronda; `main` está al día con todo lo descrito aquí).
- **Stack:** React 18 + Vite 5, react-router-dom v7, Framer Motion, react-helmet-async. SPA pura (sin SSR) — todo el contenido real solo existe después de que corre el JS.
- **Hosting:** Vercel, proyecto `persuasivo-mx` (id `prj_2lZ5GDfJxXm56gyAQnEYHHfnUWDm`), dominio `www.persuasivo.mx`.
- **Gotcha de despliegue conocido:** si el mismo commit SHA se empuja a dos ramas distintas en segundos (p. ej. feature branch → luego fast-forward a `main`), Vercel a veces NO dispara el build de producción para la segunda rama (deduplicación por SHA). Antes de asumir que algo ya está en vivo, verificar en Vercel que el deployment más reciente tenga `target: production` y `state: READY` para el commit esperado. Si no aparece, un commit nuevo (no vacío, con cambio real) sí lo dispara.
- No existen "carpetas locales" adicionales del proyecto fuera de este repo — es un repo único. Al abrir la sesión local, clonar este repo y trabajar ahí.

## 1. Por qué estamos aquí (contexto que no hay que repetir)

Esta temporada ya se hizo, en orden:
1. Auditoría técnica/SEO inicial + fixes (sitemap, robots.txt, OG tags, CLS, code-splitting).
2. Rediseño visual completo: de estética "neón-hacker" a "Papel de Operaciones" (paper + un acento naranja #D6531D + Oswald/IBM Plex), manteniendo el tono táctico-militar del copy — esa fue una decisión explícita y cerrada en su momento.
3. Auditoría independiente de IA/UX/copy (agente sin stake en el diseño) → varios hallazgos corregidos (CTA unificado, Meta Ads como servicio ancla, precios visibles, enlaces internos reales, Casos Verificables con clientes reales incl. Grupo APH).
4. Fusión de "/" + "/agencia" en una sola home, acordeón de servicios, cierre en negativo — inspirado en research de brand.ai que trajo el cliente.
5. **Bug crítico encontrado y corregido:** `/contacto` y `/onboarding` estaban en blanco en producción desde el origen del proyecto — `createClient()` de Supabase tronaba porque esas credenciales nunca existieron. Se confirmó con el cliente que el CRM de Supabase **nunca existió de verdad**; se eliminó esa integración muerta. El único canal de entrega de leads que SÍ funciona es un `fetch` a `formsubmit.co/ajax/hola@persuasivo.mx`.
6. **Diagnóstico de "cero leads desde su creación" (root cause real, confirmado con datos, no opinión):**
   - Existe una cuenta de Meta Ads "Persuasivo.mx" (id `1650674835655564`) en el Business Manager del cliente, **activa pero sin método de pago**, y con **cero campañas creadas jamás** (ni live ni borrador). El canal que se decidió como "ancla" este año nunca se encendió.
   - `site:persuasivo.mx` no devuelve ninguna página indexada en Google — visibilidad orgánica prácticamente nula (normal para un dominio nuevo sin backlinks, pero confirma que tampoco hay tráfico orgánico).
   - Conclusión: no hay evidencia todavía de que el sitio "no convierta" — nunca ha recibido tráfico real que lo probara.
7. **Auditoría independiente de UX/UI y claridad de copy** (agente con ojos frescos, sin saber el porqué de ninguna decisión, instrucción explícita de ser brutalmente honesto). Hallazgos clave — **aplican sin importar hacia dónde evolucione el posicionamiento**, hay que corregirlos de cualquier forma:
   - **Casi no hay forma de contactar durante el scroll.** En móvil, entre el botón del hero y el siguiente CTA de contacto hay ~11 pantallas de scroll sin ningún llamado a la acción.
   - **Cero señal humana.** No hay WhatsApp clickeable, teléfono, foto, nombre o ciudad en ningún lado del sitio. No existe ningún número de WhatsApp real todavía en el código — hay que conseguirlo antes de poder agregar el botón flotante.
   - **El formulario filtra antes de generar confianza:** "Solo tratamos con tomadores de decisiones", pide presupuesto antes de cualquier contacto humano, usa "ceo@apple.com" como ejemplo de correo (aleja al dueño de PyME real).
   - **Footer visiblemente roto** en las 3 páginas de servicio (`/servicios/trafico`, `/servicios/autoridad`, `/servicios/ecosistemas`): sin márgenes laterales, texto cortado en móvil, fondo beige en vez del fondo oscuro que usa el footer en home.
   - **CTA principal ("Iniciar Operación") no dice qué pasa al hacer clic** (¿llamada? ¿cotización?).
   - **Copy con metáforas militares que en momentos específicos restan claridad/confianza**, sobre todo en los pasos del formulario justo cuando se piden datos personales: "Trazar el Blanco", "En la mira", "Vector de Ataque" ponen al visitante en el lugar del objetivo de un ataque. (El tono táctico en sí no es el problema — el párrafo del hero y la sección "Siete pasos" prueban que puede ser claro. El problema es dónde y cómo se usa.)
   - **"Métricas de Referencia" no verificables** y con una errata ("Lead Qualificado" → debería ser "Calificado"); el propio copy admite "sin caso público que enlazar todavía", lo cual lee como "no verificado" para un comprador escéptico.
   - **Páginas de servicio con frases que pueden ofender o sonar poco profesionales**, p. ej. "No queremos que hables con 100 personas pobres", términos como "Data Oscura", afirmaciones técnicamente falsas (Safari/Edge no son buscadores, nada te posiciona "automáticamente").
   - **Nombres de servicio inconsistentes:** el footer dice "Meta Ads / Desarrollo Web / Redes & Copywriting" pero las páginas se titulan "Tráfico Quirúrgico", "Ecosistemas Inmersivos", "Autoridad Magnética" — un visitante no sabe que son lo mismo.
   - **Lo que SÍ funciona bien y no hay que perder:** el párrafo del hero (nombra los 3 servicios en palabras simples), la sección "Siete pasos. Sin atajos." (la parte que más genera confianza en todo el sitio), precios visibles (diferenciador real — casi ninguna agencia los muestra), Casos Verificables con clientes reales y clicables, diseño visual limpio y consistente, el formulario funciona técnicamente bien en desktop y mobile.

## 2. La propuesta nueva del cliente (textual, resumida)

El cliente (Abraham) propone evolucionar Persuasivo de "agencia de marketing" a **agencia creativa**, inspirado en **conqr.mx**. En sus palabras (parafraseado, mezclando varios mensajes suyos):

> Quiero animar a las empresas a generar su propio contenido y convertirnos en su agencia creativa, no agencia de marketing. Sí hacemos Meta Ads, pero más que "pauta" generamos campañas con intención. Sí grabamos video, pero más que grabar video generamos storytelling creativo que impulsa el desarrollo de una marca.

Servicios que menciona explícitamente:
- Campañas creativas en Facebook/Meta Ads (con intención, no solo pauta genérica).
- Contenido para CEOs/founders que buscan branding personal propio o de su empresa.
- Ser la agencia de marketing para PyMEs que no tienen equipo, conocimiento o tiempo para hacerlo ellos mismos.
- Páginas web, redes sociales, Meta Ads.
- Video de contenido para CEO (marca personal).
- Videos cortos de producto/promoción para redes.

No tiene miedo de rebrandear la marca completa — considera abiertamente que "Persuasivo", tal como existe hoy, no ha logrado despegar y quizá deba evolucionar (nombre, identidad visual, todo está sobre la mesa).

Quiere que la nueva versión del sitio use "los recursos más modernos" para confirmar que son la opción creativa correcta — puso como referencia que antes el sitio tenía el mini-juego de Pacman como detalle memorable, y quiere algo equivalente hoy: un elemento interactivo/creativo que se recuerde.

## 3. Research de Conqr.mx hecho hasta ahora — Y SUS LÍMITES (leer antes de asumir nada)

Dos sub-agentes intentaron investigar conqr.mx y su Instagram desde la sesión en la nube. **Ninguno pudo abrir el sitio real ni el Instagram real** — el proxy de red de ese entorno bloquea esos dominios. Todo lo que seguía era, en el mejor caso, texto de resultados de búsqueda sobre Conqr, sin haber visto el sitio ni el Instagram directamente. Los dos agentes insistieron en marcar esto como **no verificado**.

**Hallazgo importante a confirmar/descartar con el sitio real:** las fuentes de terceros (directorios de agencias, rankings) describen a Conqr como una agencia **mediana-grande de BTL y marketing experiencial** (activaciones, eventos masivos, hospitality, producción física), con +75-125 empleados y clientes como Rappi, Vips, Hyundai, Banorte — **no** aparece ninguna evidencia (en esas fuentes de terceros) de que Conqr esté específicamente posicionada en "marca personal para CEOs" o "contenido de storytelling para redes" como su diferenciador principal. Eso podría ser:
(a) que las fuentes de terceros estén desactualizadas o incompletas, y el Conqr real/actual sí tenga ese ángulo fuerte — **lo más probable, dado que el cliente lo escogió como referencia visual/de producto**, o
(b) que lo que atrajo al cliente sea específicamente el *diseño/estructura del sitio* y no necesariamente el posicionamiento de servicio de Conqr — en cuyo caso hay que separar "cómo se ve y se siente su sitio" de "qué venden ellos", y tomar solo lo primero como referencia.

**Primera tarea de la sesión local, antes de cualquier otra cosa:** usar Claude in Chrome para entrar de verdad a conqr.mx (y su Instagram, el usuario ya los tiene abiertos en dos pestañas de Chrome) y extraer, con evidencia real (capturas, texto citado):
1. Cómo se describen a sí mismos en su propio sitio (su pitch, en sus palabras).
2. Qué servicios ofrecen realmente, listados tal cual aparecen.
3. Estructura completa de la página (secciones en orden, de arriba a abajo).
4. Qué elemento visual/interactivo es el "signature" — lo memorable, lo que un visitante comentaría.
5. Estilo de contenido real en su Instagram: ¿hacen video corto de founders/CEO? ¿producto? ¿detrás de cámaras? ¿qué tan editado/pulido es?
6. Tono de escritura (corto y directo vs. largo y explicativo).

Con eso, decidir con el cliente: ¿qué de Conqr es la inspiración real (el posicionamiento de servicio, el estilo visual, o ambos)?

## 4. Decisiones de negocio ya tomadas este año (no relitigar sin razón nueva)

- Mostrar precio antes del formulario de contacto — mantenerlo si el pivote conserva un modelo de precios fijos/paquetes.
- Sin testimonios por ahora (decisión explícita del cliente).
- El protocolo de 7 pasos (Llamada de Entendimiento → Entrega Final) es un proceso real confirmado con el cliente, no inventado — si cambia el posicionamiento, probablemente este proceso sigue aplicando y vale la pena conservarlo como prueba de seriedad.
- El tono táctico-militar fue una decisión cerrada en una ronda anterior — pero el cliente ahora dice explícitamente que no le teme a cambiarlo todo. Tratar esto como **abierto a discusión** en esta nueva ronda, no como tabú, pero no cambiarlo "porque sí": el audit de copy mostró que el tono en sí no es el problema, sino usos puntuales. Si el pivote de posicionamiento (de "marketing" a "creativo") amerita un tono distinto, está bien proponerlo, pero hacerlo como decisión consciente, no accidental.
- WhatsApp: no existe ningún número real en el código todavía. Hay que pedírselo al cliente antes de poder construir el botón flotante de contacto directo que el audit de UX recomienda.

## 5. Qué se espera de la sesión local (orden sugerido)

1. Clonar el repo, rama `claude/stoic-albattani-n2rxjr` (o `main`, están sincronizadas).
2. Usar Claude in Chrome sobre las pestañas ya abiertas del usuario (conqr.mx + su Instagram) — ver sección 3. Documentar hallazgos reales con capturas/citas.
3. Sintetizar: ¿qué de Conqr es el modelo a seguir (posicionamiento, servicio, visual, los tres)?
4. Proponer al cliente un **plan concreto** antes de ejecutar cambios grandes/irreversibles (nombre, identidad visual completa):
   - Nueva declaración de posicionamiento (1-2 frases, en lenguaje claro — recordar los hallazgos de copy del punto 1: claridad antes que sonar "cool").
   - Qué pasa con los 3 servicios actuales (Meta Ads / Desarrollo Web / Redes & Copywriting) — ¿se reenmarcan, se renombran, se reemplazan?
   - Dirección visual: ¿se mantiene "Papel de Operaciones" o se reemplaza? ¿Qué elemento interactivo moderno sustituye al Pacman como "signature"?
   - Estructura de página resultante.
   - Qué pasa con el nombre "Persuasivo" — ¿se mantiene, se ajusta el tagline, o es un rebrand de nombre también?
5. **Antes de ejecutar el rebrand completo**, conseguir un solo "sí" del cliente sobre el plan (no otra ronda de rediseño a ciegas — ya pasó una vez este año que "no se le terminaba de gustar la propuesta").
6. En paralelo o después, no perder de vista los arreglos de UX ya diagnosticados (sección 1, punto 7) — son correcciones necesarias sin importar el posicionamiento final: CTA/WhatsApp visible en todo el scroll, suavizar el gate del formulario, arreglar el footer roto en servicios, corregir la errata, unificar nombres de servicio entre footer y páginas.
7. Recordar antes de desplegar: verificar en Vercel que el deployment de producción realmente tenga el commit esperado con `target: production` antes de dar por hecho que ya está en vivo (ver gotcha en sección 0).
