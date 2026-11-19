import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Nota roja a mano con flecha hacia el bloque. side = de qué lado del bloque está la nota.
export default function SketchNote({ side = 'right', rotate = -3, children }) {
  const reduce = useReducedMotion();
  return (
    <aside className={`sk-note sk-note--${side}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <p className="sk-note-text">{children}</p>
      <svg className={`sk-note-arrow sk-note-arrow--${side}`} width="90" height="44" viewBox="0 0 90 44" aria-hidden="true">
        <motion.path d="M4 8C28 -4 62 4 82 30M82 30l-13-2M82 30l-3-13" fill="none" stroke="#d6303c"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.7, delay: 0.5 }} />
      </svg>
    </aside>
  );
}
