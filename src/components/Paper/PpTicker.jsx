import React, { useState } from 'react';
import { paperTicker } from '../../data/aboutPaper';

// Cinta de noticias en movimiento, con botón de pausa (WCAG 2.2.2). La segunda copia es decorativa.
export default function PpTicker() {
  const [paused, setPaused] = useState(false);
  const list = (hidden) => (
    <ul aria-hidden={hidden || undefined}>
      {paperTicker.items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
  return (
    <div className="pp-ticker">
      <span className="pp-ticker-label">{paperTicker.label}</span>
      <div className="pp-ticker-viewport">
        <div className="pp-ticker-track" data-paused={paused}>
          {list(false)}
          {list(true)}
        </div>
      </div>
      <button type="button" className="pp-ticker-btn" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        {paused ? paperTicker.play : paperTicker.pause}
      </button>
    </div>
  );
}
