import React from 'react';
import Post from './Post';
import { feedCalendar as cal } from '../../data/feedPage';

export default function FpCalendar() {
  const cells = Array.from({ length: cal.weeks * cal.dayHeads.length }, (_, i) => {
    const w = Math.floor(i / cal.dayHeads.length);
    const d = i % cal.dayHeads.length;
    return { w, d, t: cal.types[(w + d) % cal.types.length] };
  });
  return (
    <Post meta={cal.meta}>
      <h2 className="fp-h2">{cal.title}</h2>
      <ol className="fp-cal">
        {cal.dayHeads.map((h, i) => <li key={i} className="fp-cal-head" aria-hidden="true">{h}</li>)}
        {cells.map(({ w, d, t }) => (
          <li key={`${w}-${d}`} className={`fp-day fp-day--${t.id}`}>
            <span className="fp-vh">Semana {w + 1}, {cal.dayNames[d]}: </span>{t.label}
          </li>
        ))}
      </ol>
      <ul className="fp-legend">
        {cal.types.map((t) => <li key={t.id}><b>{t.label}:</b> {t.desc}</li>)}
      </ul>
      <p className="fp-p" style={{ marginBottom: 0, fontSize: '0.85rem' }}>{cal.note}</p>
    </Post>
  );
}
