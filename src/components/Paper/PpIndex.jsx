import React from 'react';
import { Link } from 'react-router-dom';
import PpReveal from './PpReveal';
import { paperIndex, paperStats } from '../../data/aboutPaper';

export default function PpIndex() {
  return (
    <aside className="pp-col pp-col--index">
      <PpReveal delay={0.1}>
        <div className="pp-box">
          <h2 className="pp-box-title">{paperIndex.title}</h2>
          <ul className="pp-index">
            {paperIndex.items.map((s) => (
              <li key={s.to}>
                <Link to={s.to}><b>{s.word}</b> <small>· p. {s.page}</small><span>{s.detail}</span></Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="pp-box">
          <h2 className="pp-box-title">En cifras</h2>
          <ul className="pp-stats">
            {paperStats.map(([v, l]) => <li key={l}><strong>{v}</strong><span>{l}</span></li>)}
          </ul>
        </div>
      </PpReveal>
    </aside>
  );
}
