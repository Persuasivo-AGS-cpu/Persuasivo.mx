import React from 'react';
import { videoPlans, videoPlansNote } from '../../data/videoStudio';

export default function VsPlans() {
  return (
    <section>
      <h2 className="vs-h2">Igualas mensuales de video terminado.</h2>
      <div className="vs-grid">
        {videoPlans.map((p) => (
          <div className="vs-plan" key={p.name}>
            <h3 className="vs-h3">{p.name}</h3>
            <p className="vs-plan-n">{p.n}</p>
            <p className="vs-plan-sub">videos al mes · compromiso inicial de 3 meses</p>
            <div className="vs-dots" aria-hidden="true">{Array.from({ length: p.n }, (_, i) => <i key={i} />)}</div>
            <p className="vs-p">{p.text}</p>
          </div>
        ))}
      </div>
      <p className="vs-small">{videoPlansNote}</p>
    </section>
  );
}
