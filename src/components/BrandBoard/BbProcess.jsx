import React from 'react';
import { brandSteps } from '../../data/brandBoard';

export default function BbProcess() {
  return (
    <section>
      <h2 className="bb-h2">Cómo trabajamos.</h2>
      <div className="bb-steps">
        {brandSteps.map(([n, t, d]) => (
          <div key={n}>
            <span className="bb-dot" aria-hidden="true">{n.replace(/^0/, '')}</span>
            <h3 className="bb-h3">{t}</h3>
            <p className="bb-p">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
