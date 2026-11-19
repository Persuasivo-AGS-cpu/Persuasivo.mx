import React, { useState } from 'react';
import Pin from './Pin';
import { brandHero, brandPresets, BRAND_WA } from '../../data/brandBoard';

export default function BbHero() {
  const [active, setActive] = useState(brandPresets[0].id);
  const p = brandPresets.find((x) => x.id === active);
  const [a, b] = brandHero.title;
  const vars = {
    '--c1': p.colors[0], '--c2': p.colors[1], '--c3': p.colors[2], '--c4': p.colors[3], '--c5': p.colors[4],
    '--disp': p.display, '--wt': p.weight,
  };

  return (
    <section className="bb-hero">
      <div>
        <span className="bb-kicker">{brandHero.kicker}</span>
        <h1 className="bb-h1">{a}<em>{b}</em></h1>
        <p className="bb-lead">{brandHero.sub}</p>
        <a className="bb-btn" href={BRAND_WA} target="_blank" rel="noopener noreferrer">{brandHero.cta}</a>
      </div>
      <div>
        <Pin rotate={-2} style={vars}>
          <div className="bb-board">
            <div className="bb-tile bb-tile--logo">tu marca</div>
            <div className="bb-tile bb-tile--swatches" aria-hidden="true">
              {p.colors.map((c) => <i key={c} style={{ background: c }} />)}
            </div>
            <div className="bb-tile bb-tile--type"><b>Aa</b><span>Se recuerda y se elige</span></div>
            <div className="bb-tile bb-tile--post">Hola, somos tu marca.</div>
          </div>
        </Pin>
        <div className="bb-presets" role="group" aria-label={brandHero.presetsLabel}>
          <span className="bb-presets-label">{brandHero.presetsLabel}</span>
          {brandPresets.map((x) => (
            <button key={x.id} type="button" className="bb-preset" aria-pressed={x.id === active} onClick={() => setActive(x.id)}>
              <i style={{ background: x.colors[2] }} />{x.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
