# /nosotros — Rediseño Completo
**Fecha:** 2026-05-09  
**Archivo objetivo:** `src/components/Views/AboutPage.jsx`  
**Estado:** Aprobado — pendiente implementación

---

## Contexto y Problema

Página actual tiene:
- H1 como pregunta ("¿Quién es Persuasivo?") — débil para SEO
- Emojis como iconos en 6 principios — no premium
- Manifiesto dentro de card con borde — pierde impacto editorial
- Navbar oscuro sobre fondo claro — conflicto de identidad visual
- Timeline con puntos neon (`#E0FF31`) sobre fondo claro — clash
- Sin sección de fundador — crítico para agencia boutique
- CTA genérico sin urgencia ni propuesta de valor

**Objetivo:** Página que convierta visitas a diagnósticos agendados, posicione en Google para búsquedas de agencias en Monterrey/MX, y establezca trust mediante presencia del fundador.

---

## Arquitectura de Secciones (Aprobada)

### Sección 1 — Hero

**Layout:** Centrado, solo tipografía, sin imagen de fondo.

```
[eyebrow]   Monterrey, NL · Agencia Digital · Est. 2022
[H1]        Hacemos que tu negocio
            crezca en internet.
[sub]       Meta Ads, Google Ads, desarrollo web y redes sociales
            con estrategia real y resultados documentados.
[stats]     12X ROI promedio  ·  +215% leads  ·  3 años operando  ·  MX + USA
```

- H1: Instrument Serif, `clamp(3.5rem, 7vw, 6rem)`, weight 400
- Eyebrow: DM Sans, 0.8rem, uppercase, `var(--text-muted)`, letter-spacing 2px
- Stats: DM Sans, plain text con `·` separadores, `var(--text-secondary)`
- Sin cards, sin borders, sin emojis

**SEO:** H1 contiene "negocio", "crezca", "internet" — keyword naturales sin keyword stuffing

---

### Sección 2 — Manifiesto

**Layout:** Full-width, padding generoso, fondo alternado (`var(--bg-deep)`).

```
Cada peso que inviertes en marketing debería
tener una razón y un destino claro.

No creamos campañas para verse bien en un reporte.
Construimos ecosistemas digitales que generan
clientes reales, ventas reales, crecimiento real.

Ese es el único estándar que nos importa.
```

- Instrument Serif, `clamp(1.8rem, 3.5vw, 3rem)`, weight 400, line-height 1.2
- Color: `var(--text-primary)` — sin ghost, sin card box, sin border
- Framer Motion: `ScrollRevealText` pattern (misma técnica que hero existente)
- Sin H2 label — el texto habla solo

---

### Sección 3 — Por Qué Persuasivo

**Layout:** Stacked editorial rows, numerados 01–06. Mismo patrón que `EditorialServices` en home.

```
01   Estrategia antes que ejecución
     No tocamos un anuncio ni escribimos una línea de código
     sin entender a fondo tu negocio y a tus clientes ideales.

02   Resultados con nombre y apellido
     ...

03   Comunicación sin traductor
     ...

04   Velocidad de startup, rigor de agencia
     ...

05   Un solo punto de contacto
     ...

06   Nos importa tu industria
     ...
```

**Implementación:**
- Número: `0.9rem`, `var(--text-ghost)`, monospace
- Título: Instrument Serif, `clamp(1.5rem, 2.5vw, 2rem)`, weight 500
- Body: DM Sans, `1rem`, `var(--text-secondary)`, `max-width: 600px`
- `borderBottom: '1px solid var(--border-subtle)'` entre rows
- Framer Motion `whileInView` fade-in con stagger 0.1s por item
- **SIN emojis, SIN cards, SIN grid**

**Reemplaza:** Grid de 6 cards con emojis actual

---

### Sección 4 — El Fundador

**Layout:** 2 columnas en desktop (foto izq, texto der), 1 columna en mobile.

```
[eyebrow]   Quién está detrás de Persuasivo

[foto]      Abraham Garza — headshot o working photo
            aspect-ratio: 3/4, border-radius: var(--radius-xl)

[H2]        Abraham Garza

[body]      Llevo 3 años construyendo sistemas de crecimiento digital
            para negocios en México y Estados Unidos.

            Empecé Persuasivo porque vi demasiadas agencias vendiendo
            humo: promesas grandes, reportes bonitos y resultados
            que nadie podía explicar.

            Mi apuesta es diferente: menos clientes, más atención,
            resultados que puedas ver en tu banco.

[credenciales]
            Meta Certified  ·  Google Ads  ·  Desarrollo Web React
            Clientes en Monterrey, CDMX, Houston, Austin

[link]      LinkedIn → (si existe)
```

**SEO:** Contiene "agencias" + "México" + "Monterrey" — keywords de long tail  
**Trust:** Fundador visible = señal de boutique premium vs fábrica anónima  
**Schema:** Candidato para `Person` schema nested en `Organization`

**Foto:** Si no hay headshot disponible, usar placeholder con instrucción en comentario de código. No inventar placeholder genérico.

---

### Sección 5 — Metodología

**Layout:** 3 columnas en desktop, stacked en mobile.

```
H2:    Cómo trabajamos

01 / Diagnóstico
   Analizamos tu situación actual: tráfico, competencia,
   embudos, mensaje y conversión. Sin costo, sin compromiso.

02 / Arquitectura
   Diseñamos el sistema completo antes de ejecutar.
   Qué canales, qué presupuesto, qué mensaje, qué orden.

03 / Ejecución y Escala
   Implementamos, medimos y optimizamos semana a semana.
   Escalamos lo que funciona. Cortamos lo que no.
```

- Número + título: Instrument Serif, grande
- Body: DM Sans, `var(--text-secondary)`
- Sin iconos, sin emojis — números solos como elemento visual
- `borderTop` o `borderLeft` sutil para separar columnas

---

### Sección 6 — CTA Final

**Layout:** Centrado, fondo `var(--bg-deep)`.

```
H2:    ¿Tu negocio debería
       facturar más?

Sub:   Empieza con un diagnóstico gratuito de 30 minutos.
       Sin presión. Sin venderte nada que no necesitas.

CTA:   [ Agendar diagnóstico ]
       "Respuesta en menos de 24 horas"  ← microcopy debajo del botón
```

- H2: Instrument Serif, `clamp(2.5rem, 5vw, 4.5rem)`, weight 400, italic en "facturar más"
- CTA: `background: var(--text-primary)`, `color: var(--bg-deep)`, `border-radius: var(--radius-full)`
- Link: `/contacto` o `/consulta-gratis`
- Microcopy: DM Sans, `0.85rem`, `var(--text-muted)` — reduce friction

---

## SEO / AEO

| Elemento | Valor |
|---|---|
| Title tag | `Nosotros — Agencia Digital en Monterrey \| Persuasivo` |
| Meta description | `Persuasivo es una agencia digital en Monterrey especializada en Meta Ads, Google Ads y desarrollo web. Conoce quién está detrás y cómo trabajamos.` |
| Canonical | `https://persuasivo.com.mx/nosotros` |
| H1 keyword | "negocio crezca en internet" |
| Person schema | Abraham Garza + founder credentials |
| FAQ schema | Agregar 3-4 preguntas AEO (opcional, fase 2) |

---

## Decisiones Técnicas

- Componente: reemplazar `AboutPage.jsx` completo — no patch incremental
- Eliminar: emojis, timeline con neon dots, card-box del manifiesto
- Mantener: patrón `ScrollRevealText` de home (mismo `useScroll` + `useTransform`)
- Mantener: `AnimatePresence` + `motion.div` page transition wrapper
- Foto fundador: usar variable `FOUNDER_IMG` en tope del archivo para fácil swap
- Responsive: mobile-first, breakpoint `768px` para cambio de layout

---

## Fuera de Scope (esta iteración)

- Navbar: conflicto dark/light es issue separado — ticket propio
- Nuevas páginas de servicio (Google Ads, Landing Pages) — sprint siguiente
- FAQ schema — opcional, agregar si hay tiempo después de hero/copy

---

## Archivos a Modificar

| Archivo | Cambio |
|---|---|
| `src/components/Views/AboutPage.jsx` | Reemplazar completo |
| `src/App.jsx` | Sin cambio — ruta `/nosotros` ya existe |
| `src/index.css` | Sin cambio — tokens ya correctos |
