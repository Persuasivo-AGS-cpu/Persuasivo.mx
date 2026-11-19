const f = (n) => n.toFixed(1);

// Generador pseudoaleatorio con semilla (mulberry32): mismo seed = mismo dibujo en cada render.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Un trazo "de pluma": curva cuadrática con extremos y centro desplazados al azar.
function stroke(r, x1, y1, x2, y2, wobble) {
  const j = () => (r() - 0.5) * wobble;
  const cx = (x1 + x2) / 2 + j() * 2;
  const cy = (y1 + y2) / 2 + j() * 2;
  return `M${f(x1 + j())} ${f(y1 + j())}Q${f(cx)} ${f(cy)} ${f(x2 + j())} ${f(y2 + j())}`;
}

export function sketchRect(w, h, seed, { passes = 2, wobble = 2.2 } = {}) {
  const r = rng(seed);
  let d = '';
  for (let p = 0; p < passes; p++) {
    d += stroke(r, 0, 0, w, 0, wobble) + stroke(r, w, 0, w, h, wobble)
      + stroke(r, w, h, 0, h, wobble) + stroke(r, 0, h, 0, 0, wobble);
  }
  return d;
}

export function sketchLine(x1, y1, x2, y2, seed, wobble = 2) {
  return stroke(rng(seed), x1, y1, x2, y2, wobble);
}

export function sketchCross(w, h, seed) {
  const r = rng(seed);
  return stroke(r, 0, 0, w, h, 3) + stroke(r, w, 0, 0, h, 3);
}

// Óvalo dibujado de un trazo, que pasa de largo el punto de inicio (8%) como al hacerlo a mano.
export function sketchEllipse(w, h, seed, wobble = 3) {
  const r = rng(seed);
  const n = 12;
  const total = Math.ceil(n * 1.08);
  const pts = [];
  for (let i = 0; i <= total; i++) {
    const t = (i / n) * Math.PI * 2 - Math.PI / 2;
    pts.push([
      w / 2 + (w / 2) * Math.cos(t) + (r() - 0.5) * wobble,
      h / 2 + (h / 2) * Math.sin(t) + (r() - 0.5) * wobble,
    ]);
  }
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += `Q${f(x)} ${f(y)} ${f((x + nx) / 2)} ${f((y + ny) / 2)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return d + `L${f(lx)} ${f(ly)}`;
}
