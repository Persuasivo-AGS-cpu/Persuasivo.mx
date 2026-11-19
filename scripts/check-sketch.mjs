import assert from 'node:assert/strict';
import { rng, sketchRect, sketchLine, sketchCross, sketchEllipse } from '../src/components/Sketch/sketchPath.js';

// determinista
assert.equal(rng(7)(), rng(7)());
assert.notEqual(rng(7)(), rng(8)());
const r = rng(1);
for (let i = 0; i < 1000; i++) { const v = r(); assert.ok(v >= 0 && v < 1); }

// rect: misma semilla = mismo trazo; distinta semilla = otro trazo
assert.equal(sketchRect(100, 50, 3), sketchRect(100, 50, 3));
assert.notEqual(sketchRect(100, 50, 3), sketchRect(100, 50, 4));
// 4 lados por pasada
assert.equal(sketchRect(100, 50, 3, { passes: 2 }).match(/M/g).length, 8);
assert.equal(sketchRect(100, 50, 3, { passes: 1 }).match(/M/g).length, 4);
assert.equal(sketchCross(100, 50, 3).match(/M/g).length, 2);

// path válido
for (const d of [sketchRect(100, 50, 1), sketchLine(0, 0, 10, 10, 1), sketchCross(10, 10, 1), sketchEllipse(80, 40, 1)]) {
  assert.ok(d.startsWith('M'));
  assert.ok(!d.includes('NaN'));
}
console.log('sketchPath ok');
