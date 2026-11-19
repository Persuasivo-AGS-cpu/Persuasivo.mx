# Página Contacto ("La comanda") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el formulario oscuro de 4 pasos de `/contacto` por **una comanda de restaurante**: a la izquierda, preguntas simples; a la derecha, un **ticket térmico que se imprime línea por línea** mientras el visitante contesta, con folio, fecha y el cierre "Diagnóstico (30 min) … $0.00". El pedido se envía **por WhatsApp** (con el ticket ya escrito) o dejando que Persuasivo escriba al cliente. Es lo contrario de un formulario frío: se ve el pedido armándose y contratar se siente fácil.

**Architecture:** Mismo método que las demás páginas: HTML real (labels, fieldsets, botones accesibles), creatividad en CSS + Framer Motion, y la lógica en un módulo puro y comprobable (`src/data/comanda.js`: opciones, `toggleService`, `buildTicketRows`, `buildOrderText`, `canSend`, `canContact`, `makeFolio`) con un auto-chequeo `node:assert` (como `check-sketch`). El envío conserva **exactamente los mismos destinos** que el formulario anterior (formsubmit por correo + Supabase `crm_tasks` y `onboarding_queue`), movidos a `submitLead.js`; si fallan, nunca rompen la experiencia. El WhatsApp es un `<a>` real (no `window.open`) para que ningún bloqueador de ventanas lo detenga.

**Tech Stack:** React 19, Vite, Framer Motion 11, React Router 7, `@supabase/supabase-js` (ya instalado). Una fuente nueva de Google Fonts: **Courier Prime** (texto del ticket). Sin otras dependencias ni assets.

**Contraste entre páginas:** Web = blanco y trazo; Branding = papel; Video = oscuro; Redes = perfil gris; Ads = ventana; Nosotros = periódico; Servicios = directorio; **Contacto = mostrador de cocina**, con el ticket colgado de un riel metálico.

**Cambios respecto al formulario actual (a confirmar):**
- **Precios:** el formulario anterior mostraba "Meta Ads desde $2,700/mes", "Redes $4,500/mes" y "Landing $6,500", que contradicen las páginas de servicio ($15,000, $12,000 y $35,000). La comanda **no muestra precios por servicio**; el presupuesto es opcional, con rangos coherentes con lo publicado: menos de $15,000, de $15,000 a $35,000 y más de $35,000 MXN.
- **Menos fricción:** antes se pedían nombre, WhatsApp y correo obligatorios en el paso 1. Ahora solo **nombre y al menos un servicio** son obligatorios; WhatsApp y correo son opcionales salvo para la opción "Prefiero que me escriban" (requiere uno de los dos).
- **Servicios:** se agregan Branding, Contenido en video y **Google Ads** (confirmado como servicio que ofreces) y la opción "No sé por dónde empezar". Se reemplazan los textos tipo "Vector de Ataque".
- **Correo y CRM:** los campos del correo cambian de nombre (`Servicios`, `Para_Cuando`, `Presupuesto`, `Notas`, `Enviado_Por`) y el presupuesto llega como texto legible, no como `base/pro/elite`. Las filas de Supabase conservan las mismas columnas.

**Fuera de alcance (a propósito):** actualizar la página de Ads, el directorio de Servicios y el SEO con Google Ads (seguimiento aparte), botón de llamada, calendario, adjuntar archivos, rediseño de `/consulta-gratis` (se enlaza como alternativa).

**Riesgos a confirmar antes de publicar:**
- **Correo de destino:** el formulario anterior envía a `https://formsubmit.co/ajax/hola@persuasivo.mx`, pero el pie de página muestra `hola@persuasivo.com.mx`. Este plan **no lo cambia**; queda en un solo lugar (`LEAD_ENDPOINT` en `src/data/contact.js`) para corregirlo en una línea si el dominio correcto es otro.
- Si el CRM (otra app que lee `crm_tasks`/`onboarding_queue`) filtra por los valores antiguos de presupuesto `base`/`pro`/`elite`, hay que ajustarlo.

---

## Verificación (aplica a todas las tareas)

1. `npm run build` termina con `✓ built in`.
2. `npm run check:comanda` imprime `comanda ok` (desde la Task 1).
3. `preview_start` con `persuasivo-mx` (puerto 5181), abrir `/contacto`; esperar ~10 s tras navegar (el sitio tiene un fundido de entrada lento en el panel).
4. Revisar a 1280 px y a 375 px (sin scroll horizontal).
5. **Nunca enviar leads reales al probar.** Antes de pulsar un botón de envío, bloquear la red desde la consola del navegador:
   ```js
   window.__calls = []; window.fetch = (u) => { window.__calls.push(String(u)); return Promise.resolve(new Response('{}', { status: 200 })); };
   ```
   y comprobar después `window.__calls`. El enlace de WhatsApp se verifica leyendo su `href`, sin abrirlo.

## Estructura de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/index.css` | Modificar | Importar Courier Prime |
| `src/data/contact.js` | Modificar | Agregar `LEAD_ENDPOINT` |
| `src/data/comanda.js` | Crear | Opciones y lógica pura del pedido |
| `scripts/check-comanda.mjs` | Crear | Auto-chequeo de la lógica |
| `package.json` | Modificar | Script `check:comanda` |
| `src/components/Comanda/submitLead.js` | Crear | Envío a correo + CRM (movido del formulario anterior) |
| `src/components/Comanda/comanda.css` | Crear | Mostrador, formulario, ticket, sello, código de barras |
| `src/components/Comanda/ComandaForm.jsx` | Crear | Preguntas de la comanda |
| `src/components/Comanda/ComandaTicket.jsx` | Crear | Ticket que se imprime y botones de envío |
| `src/components/Views/ContactFlow.jsx` | Reescribir | Compone todo + SEO |

---

### Task 1: Fuente, datos y lógica pura con auto-chequeo

**Files:**
- Modify: `src/index.css:1`
- Modify: `src/data/contact.js`
- Create: `scripts/check-comanda.mjs`
- Create: `src/data/comanda.js`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Cargar la fuente del ticket**

En `src/index.css`, en la primera línea (`@import url('https://fonts.googleapis.com/css2?...`), insertar antes de `&display=swap`:

```
&family=Courier+Prime:wght@400;700
```

- [ ] **Step 2: Agregar el destino del correo a `contact.js`**

Al final de `src/data/contact.js` agregar:

```js

// Destino de los pedidos por correo (formsubmit). Mismo valor que el formulario anterior.
export const LEAD_ENDPOINT = 'https://formsubmit.co/ajax/hola@persuasivo.mx';
```

- [ ] **Step 3: Escribir el auto-chequeo (falla porque el módulo no existe)**

Crear `scripts/check-comanda.mjs`:

```js
import assert from 'node:assert/strict';
import {
  toggleService, canSend, canContact, buildTicketRows, buildOrderText, makeFolio,
} from '../src/data/comanda.js';

const base = { name: '', company: '', phone: '', email: '', services: [], timing: '', budget: '', notes: '' };

// toggleService: "No sé" es exclusivo
assert.deepEqual(toggleService([], 'web'), ['web']);
assert.deepEqual(toggleService(['web'], 'web'), []);
assert.deepEqual(toggleService(['web'], 'meta'), ['web', 'meta']);
assert.deepEqual(toggleService(['web'], 'nose'), ['nose']);
assert.deepEqual(toggleService(['nose'], 'nose'), []);
assert.deepEqual(toggleService(['nose'], 'meta'), ['meta']);

// reglas de envío
assert.equal(canSend(base), false);
assert.equal(canSend({ ...base, name: '  ', services: ['web'] }), false);
assert.equal(canSend({ ...base, name: 'Ana', services: ['web'] }), true);
assert.equal(canContact({ ...base, name: 'Ana', services: ['web'] }), false);
assert.equal(canContact({ ...base, name: 'Ana', services: ['web'], phone: '8110000000' }), true);
assert.equal(canContact({ ...base, name: 'Ana', services: ['web'], email: 'a@b.com' }), true);

// filas del ticket: solo lo que tiene contenido, en orden fijo
assert.deepEqual(buildTicketRows(base), []);
const f = { ...base, name: 'Ana', company: 'miempresa.com', services: ['web', 'google'], timing: 'Este mes' };
const rows = buildTicketRows(f);
assert.deepEqual(rows.map((r) => r.id), ['name', 'company', 'services', 'timing']);
assert.deepEqual(rows.find((r) => r.id === 'services').values, ['1x Página web', '1x Google Ads']);

// texto del pedido para WhatsApp
const t = buildOrderText(f, 'PZ-12345');
assert.ok(t.includes('Ana') && t.includes('PZ-12345') && t.includes('Página web, Google Ads') && t.includes('Este mes'));
assert.ok(!t.includes('Presupuesto') && !t.includes('Notas'));

// folio
assert.equal(makeFolio(1700000012345), 'PZ-12345');
assert.match(makeFolio(), /^PZ-\d{5}$/);

console.log('comanda ok');
```

- [ ] **Step 4: Agregar el script y ver que falla**

En `package.json`, dentro de `"scripts"`, agregar `"check:comanda": "node scripts/check-comanda.mjs"` (con coma en la línea anterior).

Run: `npm run check:comanda`
Expected: FAIL con `ERR_MODULE_NOT_FOUND` (aún no existe `comanda.js`).

- [ ] **Step 5: Implementar `comanda.js`**

```js
export const comandaCopy = {
  kicker: 'Contacto',
  title: 'Arma tu comanda.',
  sub: 'Cuéntanos qué necesitas. Tu pedido se imprime al lado y el diagnóstico de 30 minutos va por nuestra cuenta.',
  servicesLegend: '¿Qué necesitas? *',
  timingLegend: '¿Para cuándo?',
  budgetLabel: 'Presupuesto aproximado (primer mes o proyecto)',
  budgetEmpty: 'Prefiero hablarlo después',
  notesLabel: 'Algo más que debamos saber',
  alt: '¿Prefieres hablar en vivo?',
  altLink: 'Agenda 30 minutos',
};

export const comandaServices = [
  { id: 'branding', label: 'Branding', short: 'Branding' },
  { id: 'web', label: 'Página web', short: 'Página web' },
  { id: 'video', label: 'Contenido en video', short: 'Contenido en video' },
  { id: 'redes', label: 'Redes sociales', short: 'Redes sociales' },
  { id: 'meta', label: 'Meta Ads', short: 'Meta Ads' },
  { id: 'google', label: 'Google Ads', short: 'Google Ads' },
  { id: 'nose', label: 'No sé por dónde empezar', short: 'Por definir (diagnóstico)' },
];

export const comandaTimings = ['Lo antes posible', 'Este mes', 'En 1 a 3 meses', 'Solo estoy explorando'];

export const comandaBudgets = ['Menos de $15,000 MXN', '$15,000 a $35,000 MXN', 'Más de $35,000 MXN'];

export const initialForm = { name: '', company: '', phone: '', email: '', services: [], timing: '', budget: '', notes: '' };

const byId = (id) => comandaServices.find((s) => s.id === id);

// "No sé por dónde empezar" es exclusivo: elegirlo limpia el resto y elegir otro lo quita.
export const toggleService = (list, id) => {
  if (id === 'nose') return list.includes('nose') ? [] : ['nose'];
  const rest = list.filter((s) => s !== 'nose');
  return rest.includes(id) ? rest.filter((s) => s !== id) : [...rest, id];
};

export const canSend = (f) => f.name.trim() !== '' && f.services.length > 0;
export const canContact = (f) => canSend(f) && (f.phone.trim() !== '' || f.email.trim() !== '');

export const makeFolio = (now = Date.now()) => `PZ-${String(now).slice(-5)}`;

export const formatTicketDate = (d = new Date()) =>
  new Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Monterrey' }).format(d);

// Filas del ticket: solo lo que ya tiene contenido, en un orden fijo.
export const buildTicketRows = (f) => [
  ['name', 'Cliente', [f.name.trim()]],
  ['company', 'Empresa', [f.company.trim()]],
  ['phone', 'WhatsApp', [f.phone.trim()]],
  ['email', 'Correo', [f.email.trim()]],
  ['services', 'Pedido', f.services.map((id) => `1x ${byId(id).short}`)],
  ['timing', 'Para cuándo', [f.timing]],
  ['budget', 'Presupuesto', [f.budget]],
  ['notes', 'Notas', [f.notes.trim()]],
]
  .filter(([, , values]) => values.some(Boolean))
  .map(([id, label, values]) => ({ id, label, values: values.filter(Boolean) }));

// Mensaje de WhatsApp con el pedido ya escrito.
export const buildOrderText = (f, folio) => {
  const lines = [`Hola, soy ${f.name.trim() || '(sin nombre)'}. Quiero hacer este pedido en Persuasivo:`, `Folio: ${folio}`];
  if (f.company.trim()) lines.push(`Empresa o sitio: ${f.company.trim()}`);
  if (f.services.length) lines.push(`Pedido: ${f.services.map((id) => byId(id).label).join(', ')}`);
  if (f.timing) lines.push(`Para cuándo: ${f.timing}`);
  if (f.budget) lines.push(`Presupuesto: ${f.budget}`);
  if (f.notes.trim()) lines.push(`Notas: ${f.notes.trim()}`);
  return lines.join('\n');
};
```

- [ ] **Step 6: Ver que pasa**

Run: `npm run check:comanda`
Expected: `comanda ok`

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/data/contact.js src/data/comanda.js scripts/check-comanda.mjs package.json
git commit -m "feat(contacto): add comanda order logic with self-check and ticket font"
```

---

### Task 2: Envío a correo y CRM (`submitLead.js`)

**Files:**
- Create: `src/components/Comanda/submitLead.js`

- [ ] **Step 1: Crear `submitLead.js`** (conserva los destinos del formulario anterior; nunca lanza error)

```js
import { createClient } from '@supabase/supabase-js';
import { LEAD_ENDPOINT } from '../../data/contact';
import { comandaServices } from '../../data/comanda';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || '', import.meta.env.VITE_SUPABASE_ANON_KEY || '');

const SHORT = { branding: 'Branding', web: 'Web', video: 'Video', redes: 'Social', meta: 'Meta Ads', google: 'Google Ads', nose: 'Por definir' };

// Mismo flujo que el formulario anterior: correo (formsubmit) + CRM (Supabase). `via` = 'WhatsApp' | 'Correo'.
// Si algo falla no se interrumpe la experiencia del visitante.
export async function submitLead(form, via) {
  const email = form.email.trim();
  const who = form.company.trim() || email.split('@')[0] || form.name.trim() || 'Lead Web';
  const labels = form.services.map((id) => (comandaServices.find((s) => s.id === id) || {}).label || id);

  try {
    await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Nombre: form.name,
        Empresa: form.company,
        Whatsapp: form.phone,
        Email: form.email,
        Servicios: labels.join(', '),
        Para_Cuando: form.timing,
        Presupuesto: form.budget,
        Notas: form.notes,
        Enviado_Por: via,
        _subject: 'NUEVO LEAD - Comanda Persuasivo',
      }),
    });
  } catch (error) {
    console.error('Error al enviar el pedido por correo:', error);
  }

  try {
    await supabase.from('crm_tasks').insert([{
      title: `${who} - ${form.services.map((id) => SHORT[id] || id).join('+')}`,
      column_state: 'Backlog',
      priority: 'Alta',
      description: `**LEAD ENTRANTE (COMANDA - ${via})**\n\n- **Nombre:** ${form.name}\n- **Teléfono:** ${form.phone || 'N/A'}\n- **Email Principal:** ${form.email || 'N/A'}\n- **URL/Empresa:** ${form.company || 'N/A'}\n- **Inversión:** ${form.budget || 'N/A'}\n- **Para cuándo:** ${form.timing || 'N/A'}\n- **Servicios:** ${labels.join(', ')}\n- **Notas:** ${form.notes || 'N/A'}`,
    }]);

    await supabase.from('onboarding_queue').insert([{
      company_name: who,
      sales_phone: form.phone.trim() || email || form.name,
      project_type: 'Contacto Express',
      pain_point: `Este prospecto llegó por la comanda (${via}).\nPresupuesto: ${form.budget || 'N/D'}\nPara cuándo: ${form.timing || 'N/D'}`,
      hook: `Servicios solicitados: ${labels.join(', ')}`,
      authority: 'N/A',
      cta: 'Validar y Contactar',
      status: 'pending',
      services: {
        ticket_range: form.budget || null,
        current_website: form.company || null,
        traffic_source: 'Comanda',
      },
    }]);
  } catch (crmError) {
    // El CRM es secundario: si falla no se muestra nada al visitante.
  }
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/Comanda/submitLead.js
git commit -m "feat(contacto): move lead submission to submitLead with same email and CRM targets"
```

---

### Task 3: CSS de la comanda

**Files:**
- Create: `src/components/Comanda/comanda.css`

- [ ] **Step 1: Crear `comanda.css`**

```css
.cm-page { --cm-ink: #1a1a1a; --cm-red: #b3261e; --cm-lime: #E0FF31; background: #e6e2d9; min-height: 100vh; padding: 15vh 4vw 6vw; color: var(--cm-ink); font-family: var(--font-body); }
.cm-wrap { max-width: 1100px; margin: 0 auto; }
.cm-head { margin-bottom: 2rem; }
.cm-kicker { color: #6b665c; font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
.cm-h1 { margin: 0.75rem 0 1rem; font-family: var(--font-display); font-weight: 400; font-size: clamp(3rem, 7vw, 5.5rem); line-height: 1; letter-spacing: -0.03em; }
.cm-lead { max-width: 640px; margin: 0; color: #4b473f; font-size: clamp(1.05rem, 1.8vw, 1.3rem); line-height: 1.6; }
.cm-layout { display: grid; gap: 2.5rem; }
@media (min-width: 960px) {
  .cm-layout { grid-template-columns: minmax(0, 1fr) 380px; align-items: start; }
  .cm-ticket-wrap { position: sticky; top: 88px; }
}

/* formulario */
.cm-form { display: grid; gap: 1.25rem; padding: clamp(1.25rem, 3vw, 2rem); border-radius: 20px; background: #fff; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08); }
.cm-grid2 { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.cm-field { display: grid; gap: 0.4rem; font-weight: 600; font-size: 0.92rem; }
.cm-field input, .cm-field select, .cm-field textarea { width: 100%; min-height: 48px; padding: 0.7rem 0.9rem; border: 1.5px solid #cfcabd; border-radius: 12px; background: #fff; color: var(--cm-ink); font: inherit; font-weight: 400; }
.cm-field textarea { resize: vertical; }
.cm-field input:focus-visible, .cm-field select:focus-visible, .cm-field textarea:focus-visible { outline: 3px solid var(--cm-ink); outline-offset: 2px; }
.cm-fieldset { margin: 0; padding: 0; border: 0; }
.cm-fieldset legend { padding: 0; margin-bottom: 0.6rem; font-weight: 600; font-size: 0.92rem; }
.cm-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cm-chip { min-height: 44px; padding: 0 1.1rem; border: 1.5px solid var(--cm-ink); border-radius: var(--radius-full); background: transparent; color: var(--cm-ink); font: inherit; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s; }
.cm-chip[aria-pressed='true'] { background: var(--cm-ink); color: #fff; }
.cm-chip:focus-visible { outline: 3px solid var(--cm-red); outline-offset: 2px; }
.cm-alt { margin: 0; color: #4b473f; }
.cm-alt a { color: var(--cm-ink); font-weight: 700; }

/* ticket */
.cm-rail { position: relative; z-index: 2; height: 14px; margin-bottom: -6px; border-radius: 7px; background: linear-gradient(#c3c7cc, #8a8f95); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25); }
.cm-ticket { position: relative; padding: 1.5rem 1.25rem 1.75rem; background: #fffef8; color: var(--cm-ink); font-family: 'Courier Prime', 'Courier New', monospace; font-size: 0.92rem; line-height: 1.35; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); }
.cm-ticket::after { content: ''; position: absolute; left: 0; right: 0; bottom: -10px; height: 10px; background: conic-gradient(from -45deg at bottom, #0000, #fffef8 1deg 90deg, #0000 91deg) 50% / 20px 100%; }
.cm-t-head { text-align: center; padding-bottom: 0.75rem; border-bottom: 1px dashed var(--cm-ink); }
.cm-t-name { margin: 0; font-size: 1.5rem; font-weight: 700; letter-spacing: 0.12em; }
.cm-t-sub { margin: 0.15rem 0 0; }
.cm-t-meta { display: flex; justify-content: space-between; gap: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem; }
.cm-t-body { min-height: 96px; padding: 0.75rem 0; border-bottom: 1px dashed var(--cm-ink); }
.cm-t-empty { margin: 0; color: #8a857a; }
.cm-row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.2rem 0; }
.cm-row dt { flex: none; font-weight: 700; text-transform: uppercase; }
.cm-row dd { margin: 0; text-align: right; overflow-wrap: anywhere; }
.cm-total { display: flex; align-items: baseline; padding: 0.15rem 0; }
.cm-total i { flex: 1; margin: 0 0.4rem; border-bottom: 1px dotted var(--cm-ink); transform: translateY(-4px); }
.cm-total--big { font-weight: 700; font-size: 1.05rem; }
.cm-thanks { margin: 0.75rem 0 0.5rem; text-align: center; font-weight: 700; letter-spacing: 0.06em; }
.cm-barcode { height: 40px; background: repeating-linear-gradient(90deg, var(--cm-ink) 0 2px, transparent 2px 4px, var(--cm-ink) 4px 5px, transparent 5px 8px, var(--cm-ink) 8px 11px, transparent 11px 13px); }
.cm-folio { margin: 0.35rem 0 0; text-align: center; font-size: 0.8rem; letter-spacing: 0.2em; }
.cm-stamp { position: absolute; top: 34%; left: 50%; padding: 0.2rem 1rem; border: 4px solid var(--cm-red); border-radius: 6px; color: var(--cm-red); font-size: 2rem; font-weight: 700; letter-spacing: 0.1em; opacity: 0.88; pointer-events: none; }

/* acciones del ticket */
.cm-actions { display: grid; gap: 0.6rem; margin-top: 1.1rem; }
.cm-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 1.25rem; border: 2px solid var(--cm-ink); border-radius: var(--radius-full); font-family: var(--font-body); font-size: 0.95rem; font-weight: 800; letter-spacing: 0.03em; text-decoration: none; cursor: pointer; }
.cm-btn--wa { background: var(--cm-lime); color: var(--cm-ink); }
.cm-btn--ghost { background: transparent; color: var(--cm-ink); }
.cm-btn[aria-disabled='true'], .cm-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.cm-btn:focus-visible { outline: 3px solid var(--cm-red); outline-offset: 3px; }
.cm-hint, .cm-sent { margin: 0; font-family: var(--font-body); font-size: 0.85rem; line-height: 1.4; color: #4b473f; }
.cm-sent { padding: 0.6rem 0.8rem; border-radius: 10px; background: #f1f7c8; color: var(--cm-ink); }

@media (prefers-reduced-motion: reduce) { .cm-chip { transition: none; } }
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/Comanda/comanda.css
git commit -m "feat(contacto): add kitchen-counter and thermal ticket styles"
```

---

### Task 4: Formulario de la comanda y página montada

**Files:**
- Create: `src/components/Comanda/ComandaForm.jsx`
- Rewrite: `src/components/Views/ContactFlow.jsx`

- [ ] **Step 1: Crear `ComandaForm.jsx`**

```jsx
import React from 'react';
import {
  comandaCopy, comandaServices, comandaTimings, comandaBudgets, toggleService,
} from '../../data/comanda';

export default function ComandaForm({ form, setForm }) {
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const pickTiming = (t) => setForm((f) => ({ ...f, timing: f.timing === t ? '' : t }));

  return (
    <form className="cm-form" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="cm-grid2">
        <label className="cm-field"><span>Tu nombre *</span>
          <input type="text" autoComplete="name" value={form.name} onChange={set('name')} />
        </label>
        <label className="cm-field"><span>Empresa o sitio web</span>
          <input type="text" autoComplete="organization" placeholder="ej. miempresa.com" value={form.company} onChange={set('company')} />
        </label>
        <label className="cm-field"><span>WhatsApp</span>
          <input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
        </label>
        <label className="cm-field"><span>Correo</span>
          <input type="email" autoComplete="email" value={form.email} onChange={set('email')} />
        </label>
      </div>

      <fieldset className="cm-fieldset">
        <legend>{comandaCopy.servicesLegend}</legend>
        <div className="cm-chips">
          {comandaServices.map((s) => (
            <button key={s.id} type="button" className="cm-chip" aria-pressed={form.services.includes(s.id)}
              onClick={() => setForm((f) => ({ ...f, services: toggleService(f.services, s.id) }))}>
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="cm-fieldset">
        <legend>{comandaCopy.timingLegend}</legend>
        <div className="cm-chips">
          {comandaTimings.map((t) => (
            <button key={t} type="button" className="cm-chip" aria-pressed={form.timing === t} onClick={() => pickTiming(t)}>{t}</button>
          ))}
        </div>
      </fieldset>

      <label className="cm-field"><span>{comandaCopy.budgetLabel}</span>
        <select value={form.budget} onChange={set('budget')}>
          <option value="">{comandaCopy.budgetEmpty}</option>
          {comandaBudgets.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>

      <label className="cm-field"><span>{comandaCopy.notesLabel}</span>
        <textarea rows={3} maxLength={400} value={form.notes} onChange={set('notes')} />
      </label>
    </form>
  );
}
```

- [ ] **Step 2: Reescribir `ContactFlow.jsx` (formulario por ahora)**

Leer el archivo actual y reemplazarlo por completo con:

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../Navigation/Footer';
import ComandaForm from '../Comanda/ComandaForm';
import { comandaCopy, initialForm } from '../../data/comanda';
import '../Comanda/comanda.css';

export default function ContactFlow({ setView }) {
  const [form, setForm] = useState(initialForm);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ width: '100%', minHeight: '100vh', background: '#e6e2d9' }}>
      <Helmet>
        <title>Contacto — Arma tu comanda | Persuasivo</title>
        <meta name="description" content="Cuéntanos qué necesitas y arma tu pedido: Branding, página web, video, redes, Meta Ads o Google Ads. Diagnóstico gratuito de 30 minutos. Respuesta en menos de 24 horas." />
        <link rel="canonical" href="https://persuasivo.com.mx/contacto" />
      </Helmet>

      <div className="cm-page">
        <div className="cm-wrap">
          <header className="cm-head">
            <span className="cm-kicker">{comandaCopy.kicker}</span>
            <h1 className="cm-h1">{comandaCopy.title}</h1>
            <p className="cm-lead">{comandaCopy.sub}</p>
          </header>
          <div className="cm-layout">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <ComandaForm form={form} setForm={setForm} />
              <p className="cm-alt">{comandaCopy.alt} <Link to="/consulta-gratis">{comandaCopy.altLink}</Link></p>
            </div>
          </div>
        </div>
      </div>

      <Footer setView={setView} />
    </motion.div>
  );
}
```

- [ ] **Step 3: Verificar**

Run: `npm run build` → `✓ built in`. Abrir `/contacto` (esperar ~10 s).
Expected: fondo beige tipo mostrador, "Arma tu comanda." como `<h1>`, formulario blanco con 4 campos, 7 botones de servicio (incluye "Google Ads" y "No sé por dónde empezar"), plazos, presupuesto y notas. Elegir "No sé por dónde empezar" desmarca los otros y viceversa. Sin errores de consola.

- [ ] **Step 4: Commit**

```bash
git add src/components/Comanda/ComandaForm.jsx src/components/Views/ContactFlow.jsx
git commit -m "feat(contacto): comanda form on /contacto replacing the 4-step dark form"
```

---

### Task 5: Ticket que se imprime y envío

**Files:**
- Create: `src/components/Comanda/ComandaTicket.jsx`
- Modify: `src/components/Views/ContactFlow.jsx`

- [ ] **Step 1: Crear `ComandaTicket.jsx`**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { buildTicketRows } from '../../data/comanda';

export default function ComandaTicket({
  form, folio, dateStr, status, via, canSend, canContact, waHref, onWhatsApp, onContact,
}) {
  const reduce = useReducedMotion();
  const rows = buildTicketRows(form);
  const sent = status === 'sent';

  return (
    <div className="cm-ticket-wrap">
      <div className="cm-rail" aria-hidden="true" />
      <section className="cm-ticket" aria-label="Tu comanda">
        <div className="cm-t-head">
          <p className="cm-t-name">PERSUASIVO</p>
          <p className="cm-t-sub">COMANDA DE SERVICIO</p>
          <div className="cm-t-meta"><span>Monterrey, N.L.</span><span>{dateStr}</span></div>
        </div>

        <div className="cm-t-body">
          {rows.length === 0 && <p className="cm-t-empty">Tu pedido se imprimirá aquí…</p>}
          <dl style={{ margin: 0 }}>
            {rows.map((r) => (
              <motion.div key={r.id} className="cm-row"
                initial={reduce ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <dt>{r.label}</dt>
                <dd>{r.values.map((v) => <span key={v} style={{ display: 'block' }}>{v}</span>)}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div style={{ paddingTop: '0.6rem' }}>
          <div className="cm-total"><span>DIAGNÓSTICO (30 MIN)</span><i /><span>$0.00</span></div>
          <div className="cm-total cm-total--big"><span>TOTAL</span><i /><span>$0.00</span></div>
        </div>
        <p className="cm-thanks">GRACIAS POR SU PREFERENCIA</p>
        <div className="cm-barcode" aria-hidden="true" />
        <p className="cm-folio">{folio}</p>

        {sent && (
          <motion.div className="cm-stamp" aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 2.2, x: '-50%', rotate: -4 }}
            animate={{ opacity: 0.88, scale: 1, x: '-50%', rotate: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
            ENVIADO
          </motion.div>
        )}
      </section>

      <div className="cm-actions">
        <a className="cm-btn cm-btn--wa" href={waHref} target="_blank" rel="noopener noreferrer"
          aria-disabled={!canSend} onClick={onWhatsApp}>
          Enviar por WhatsApp
        </a>
        <button type="button" className="cm-btn cm-btn--ghost" disabled={!canContact || status === 'sending'} onClick={onContact}>
          {status === 'sending' ? 'Enviando…' : 'Prefiero que me escriban'}
        </button>
        {!canSend && <p className="cm-hint">Falta tu nombre y al menos un servicio.</p>}
        {canSend && !canContact && <p className="cm-hint">Para la opción «Prefiero que me escriban», agrega tu WhatsApp o correo.</p>}
        {sent && (
          <p className="cm-sent" role="status">
            {via === 'WhatsApp'
              ? 'Listo: abrimos WhatsApp con tu pedido y lo registramos. Si no se abrió, pulsa de nuevo «Enviar por WhatsApp». Te respondemos en menos de 24 horas.'
              : 'Recibimos tu pedido. Te escribimos en menos de 24 horas.'}
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Conectar el ticket en `ContactFlow.jsx`**

Reemplazar todo el contenido de `ContactFlow.jsx` por:

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../Navigation/Footer';
import ComandaForm from '../Comanda/ComandaForm';
import ComandaTicket from '../Comanda/ComandaTicket';
import { submitLead } from '../Comanda/submitLead';
import { waLink } from '../../data/contact';
import {
  comandaCopy, initialForm, canSend, canContact, buildOrderText, makeFolio, formatTicketDate,
} from '../../data/comanda';
import '../Comanda/comanda.css';

export default function ContactFlow({ setView }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [via, setVia] = useState('');
  const [folio] = useState(() => makeFolio());
  const [dateStr] = useState(() => formatTicketDate());

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const okSend = canSend(form);
  const okContact = canContact(form);

  // WhatsApp es un <a> real: aquí solo se registra el pedido y se bloquea el clic si falta algo.
  const onWhatsApp = (e) => {
    if (!okSend) { e.preventDefault(); return; }
    submitLead(form, 'WhatsApp');
    setVia('WhatsApp');
    setStatus('sent');
  };

  const onContact = async () => {
    if (!okContact || status === 'sending') return;
    setStatus('sending');
    await submitLead(form, 'Correo');
    setVia('Correo');
    setStatus('sent');
  };

  return (
    <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ width: '100%', minHeight: '100vh', background: '#e6e2d9' }}>
      <Helmet>
        <title>Contacto — Arma tu comanda | Persuasivo</title>
        <meta name="description" content="Cuéntanos qué necesitas y arma tu pedido: Branding, página web, video, redes, Meta Ads o Google Ads. Diagnóstico gratuito de 30 minutos. Respuesta en menos de 24 horas." />
        <link rel="canonical" href="https://persuasivo.com.mx/contacto" />
      </Helmet>

      <div className="cm-page">
        <div className="cm-wrap">
          <header className="cm-head">
            <span className="cm-kicker">{comandaCopy.kicker}</span>
            <h1 className="cm-h1">{comandaCopy.title}</h1>
            <p className="cm-lead">{comandaCopy.sub}</p>
          </header>
          <div className="cm-layout">
            <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
              <ComandaForm form={form} setForm={setForm} />
              <p className="cm-alt">{comandaCopy.alt} <Link to="/consulta-gratis">{comandaCopy.altLink}</Link></p>
            </div>
            <ComandaTicket
              form={form} folio={folio} dateStr={dateStr} status={status} via={via}
              canSend={okSend} canContact={okContact}
              waHref={waLink(buildOrderText(form, folio))}
              onWhatsApp={onWhatsApp} onContact={onContact}
            />
          </div>
        </div>
      </div>

      <Footer setView={setView} />
    </motion.div>
  );
}
```

- [ ] **Step 3: Verificar (sin enviar leads reales)**

Run: `npm run build` → `✓ built in`. Abrir `/contacto`, y en la consola del navegador ejecutar el bloqueo de red de la sección "Verificación" (punto 5). Luego:
- Escribir un nombre: aparece la fila "CLIENTE" en el ticket con una pequeña animación de impresión; elegir "Meta Ads" y "Google Ads": aparece "PEDIDO: 1x Meta Ads / 1x Google Ads".
- Con el formulario vacío, el botón de WhatsApp tiene `aria-disabled="true"` y aparece "Falta tu nombre y al menos un servicio."
- Con nombre y servicio, el `href` del botón de WhatsApp empieza con `https://wa.me/528110731510?text=` y, decodificado, contiene el pedido y el folio.
- "Prefiero que me escriban" sigue deshabilitado hasta agregar WhatsApp o correo; al pulsarlo (con la red bloqueada) aparece el sello rojo "ENVIADO" y el mensaje de éxito, y `window.__calls` contiene la URL de formsubmit y las de Supabase.

- [ ] **Step 4: Commit**

```bash
git add src/components/Comanda/ComandaTicket.jsx src/components/Views/ContactFlow.jsx
git commit -m "feat(contacto): live-printing ticket with WhatsApp and contact-me send"
```

---

### Task 6: Pulido y verificación final

**Files:**
- Modify: `src/components/Comanda/comanda.css` (solo si la revisión lo pide)

- [ ] **Step 1: Escritorio (1280 px)**

Checklist: formulario a la izquierda y ticket a la derecha, fijo al hacer scroll; el riel metálico queda pegado a la parte superior del ticket; el borde dentado inferior se ve; el sello "ENVIADO" queda centrado sobre las líneas del pedido.

- [ ] **Step 2: Móvil (375 px)**

Checklist: `document.documentElement.scrollWidth === innerWidth`; el ticket aparece debajo del formulario (sin `sticky`); campos, chips y botones ≥44 px; las líneas largas del ticket (correo, empresa) no desbordan (`overflow-wrap`).

- [ ] **Step 3: Teclado y movimiento reducido**

Con Tab: foco visible en campos, chips y botones; los chips se activan con Enter/Espacio y `aria-pressed` cambia; el enlace de WhatsApp deshabilitado no navega. Con "reducir movimiento": las filas del ticket y el sello aparecen sin animación.

- [ ] **Step 4: Regresiones y SEO**

En la consola del navegador:

```js
({ h1: document.querySelectorAll('h1').length, mains: document.querySelectorAll('main').length, chips: document.querySelectorAll('.cm-chip').length, labels: document.querySelectorAll('.cm-field').length })
```
Expected: `{ h1: 1, mains: 1, chips: 11, labels: 6 }` (7 servicios + 4 plazos = 11 chips; 6 campos con etiqueta).
Run: `npm run build && npm run check:comanda` → `✓ built in` y `comanda ok`. Confirmar que los botones "Comenzar" del menú y los enlaces a `/contacto` del sitio siguen llegando a esta página.

- [ ] **Step 5: ¿Se siente distinto y fácil?**

Sin guía: ¿se entiende en 5 segundos que es un pedido, qué falta para enviarlo y cómo hacerlo por WhatsApp? Si falta claridad, ajustar los textos en `src/data/comanda.js`.

- [ ] **Step 6: Commit y push**

```bash
git add -A
git commit -m "polish(contacto): responsive, a11y and motion fixes"
git push
```

---

## Self-review

- **Cobertura del pedido:** "algo diferente a todos, siguiendo la línea creativa" → comanda con ticket que se imprime (Tasks 3–5); mismo método que las otras páginas; Google Ads como servicio elegible (Task 1); precios inconsistentes eliminados y presupuesto con rangos coherentes (Task 1); fricción reducida con validación mínima (Task 1 y 5); destinos de envío conservados (Task 2); alternativa en vivo con `/consulta-gratis` (Task 4); accesibilidad y móvil (Task 6).
- **Placeholders:** ninguno; todo el código está completo y la lógica pura tiene prueba.
- **Consistencia de nombres:** `comandaCopy`, `comandaServices`, `comandaTimings`, `comandaBudgets`, `initialForm`, `toggleService`, `canSend`, `canContact`, `makeFolio`, `formatTicketDate`, `buildTicketRows`, `buildOrderText` (Task 1) se usan igual en Tasks 2–5; `LEAD_ENDPOINT` (Task 1) en `submitLead.js` (Task 2); clases `.cm-*` definidas en Task 3 antes de usarse; `ComandaTicket` recibe exactamente las props que `ContactFlow` le pasa (`form, folio, dateStr, status, via, canSend, canContact, waHref, onWhatsApp, onContact`).
- **Riesgos conocidos:** el envío real (correo y CRM) no se prueba con leads de verdad: la verificación bloquea `fetch`; el `conic-gradient` del borde dentado necesita navegadores recientes (si no se soporta, el ticket queda con borde recto, sin romperse); la animación de las filas usa `key` por fila, por lo que cada fila "se imprime" solo la primera vez que aparece.
