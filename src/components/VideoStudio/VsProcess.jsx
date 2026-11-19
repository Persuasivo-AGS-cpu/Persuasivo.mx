import React from 'react';
import { videoSteps } from '../../data/videoStudio';

export default function VsProcess() {
  return (
    <section id="como-funciona">
      <h2 className="vs-h2">Del diagnóstico a la entrega mensual.</h2>
      <div className="vs-strip">
        <div className="vs-frames">
          {videoSteps.map(([n, t, d]) => (
            <div className="vs-frame" key={n}>
              <span className="vs-num">{n}</span>
              <h3 className="vs-h3">{t}</h3>
              <p className="vs-p">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
