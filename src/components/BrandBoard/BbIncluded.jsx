import React from 'react';
import Pin from './Pin';
import { brandIncluded } from '../../data/brandBoard';

const visuals = {
  diag: <div className="bb-vis bb-vis--diag" aria-hidden="true"><span style={{ width: '80%' }} /><span style={{ width: '60%' }} /><span style={{ width: '70%' }} /></div>,
  narr: <div className="bb-vis bb-vis--narr" aria-hidden="true">“Hacemos que tu empresa se explique sola.” <small>(ejemplo)</small></div>,
  logo: <div className="bb-vis bb-vis--logo" aria-hidden="true"><span className="c" /><span className="s" /></div>,
  voz: <div className="bb-vis bb-vis--voz" aria-hidden="true"><span className="b">¿Hablamos?</span></div>,
  manual: <div className="bb-vis bb-vis--manual" aria-hidden="true"><span className="bk" /><span className="ln" /></div>,
  apps: <div className="bb-vis bb-vis--apps" aria-hidden="true"><span className="card" /><span className="ph" /><span className="tg" /></div>,
};

export default function BbIncluded() {
  return (
    <section>
      <h2 className="bb-h2">Lo que construimos contigo.</h2>
      <div className="bb-grid">
        {brandIncluded.map((it, i) => (
          <Pin key={it.id} rotate={it.rotate} delay={(i % 3) * 0.08}>
            {visuals[it.id]}
            <h3 className="bb-h3">{it.title}</h3>
            <p className="bb-p">{it.text}</p>
          </Pin>
        ))}
      </div>
    </section>
  );
}
