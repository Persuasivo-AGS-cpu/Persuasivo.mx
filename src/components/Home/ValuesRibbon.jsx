import React from 'react';

const values = [
  'Estrategia',
  'Creatividad',
  'Resultados medibles',
  'Tecnología',
  'Transparencia',
  'Compromiso con tu marca',
];

export default function ValuesRibbon() {
  const items = [...values, ...values];
  return (
    <div aria-hidden="true" style={{ overflow: 'hidden', padding: '5rem 0', background: 'var(--bg-void)' }}>
      <style>{`
        @keyframes ribbon { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ribbon-track { display: flex; width: max-content; animation: ribbon 35s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .ribbon-track { animation: none; } }
      `}</style>
      <div style={{ background: 'var(--text-primary)', transform: 'rotate(-2deg)', margin: '0 -5vw', padding: '1.4rem 0' }}>
        <div className="ribbon-track">
          {items.map((v, i) => (
            <span
              key={i}
              style={{
                color: 'var(--bg-deep)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                whiteSpace: 'nowrap',
                padding: '0 2rem',
              }}
            >
              {v} <span style={{ margin: '0 0 0 2rem', opacity: 0.5 }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
