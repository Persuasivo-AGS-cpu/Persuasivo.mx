import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { videoHero, VIDEO_WA } from '../../data/videoStudio';

const pad = (n) => String(n).padStart(2, '0');

export default function VsHero() {
  const reduce = useReducedMotion();
  const [s, setS] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [reduce]);
  const [a, b] = videoHero.title;

  return (
    <section className="vs-hero">
      <div>
        <span className="vs-rec" aria-hidden="true"><i />REC <time>{pad(Math.floor(s / 60))}:{pad(s % 60)}</time></span>
        <div><span className="vs-kicker">{videoHero.kicker}</span></div>
        <h1 className="vs-h1">{a}<em>{b}</em></h1>
        <p className="vs-lead">{videoHero.sub}</p>
        <div className="vs-actions">
          <a className="vs-btn" href={VIDEO_WA} target="_blank" rel="noopener noreferrer">{videoHero.cta}</a>
          <a className="vs-link" href="#como-funciona">{videoHero.more}</a>
        </div>
        <p className="vs-small">{videoHero.audience}</p>
      </div>
      <div className="vs-clap" aria-hidden="true">
        <motion.div className="vs-clap-arm" initial={reduce ? false : { rotate: -18 }} animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 9, delay: 0.5 }} />
        <div className="vs-clap-top" style={{ borderRadius: 0, borderTop: 0 }} />
        <div className="vs-clap-body">
          <p><b>PRODUCCIÓN</b><span>Tu empresa</span></p>
          <p><b>ESCENA</b><span>Mes 1</span></p>
          <p><b>TOMA</b><span>01</span></p>
        </div>
      </div>
    </section>
  );
}
