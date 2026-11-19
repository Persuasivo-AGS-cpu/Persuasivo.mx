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
