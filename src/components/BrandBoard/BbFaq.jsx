import React from 'react';
import Pin from './Pin';
import { brandFaq } from '../../data/brandBoard';

const tilt = [-1.2, 1, 1.4, -1];

export default function BbFaq() {
  return (
    <section>
      <h2 className="bb-h2">Preguntas frecuentes</h2>
      <div className="bb-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {brandFaq.map(([q, a], i) => (
          <Pin key={q} note rotate={tilt[i % tilt.length]}>
            <details>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          </Pin>
        ))}
      </div>
    </section>
  );
}
