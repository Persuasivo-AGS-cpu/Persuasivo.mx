import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

const stats = [
  { to: 215, prefix: '+', suffix: '%', label: 'Más leads calificados en promedio' },
  { to: 12, prefix: '', suffix: 'X', label: 'ROAS máximo documentado en Meta Ads' },
  { to: 20, prefix: '+', suffix: '', label: 'Proyectos entregados desde 2021' },
  { to: 4, prefix: '', suffix: '', label: 'Servicios integrados: branding, web, contenido y ads' },
];

function Counter({ to, prefix, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => { ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

export default function MetricsBand() {
  return (
    <section style={{ padding: '8vw 5vw', background: 'var(--bg-deep)' }}>
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem 2rem',
        }}
      >
        {stats.map((s) => (
          <div key={s.label} style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.5 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
