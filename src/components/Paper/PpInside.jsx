import React from 'react';
import PpReveal from './PpReveal';
import { paperPrinciples, paperMethod, paperCorrespondents } from '../../data/aboutPaper';

export default function PpInside() {
  return (
    <div className="pp-inside">
      <section id="por-que">
        <PpReveal>
          <p className="pp-kicker">{paperPrinciples.title}</p>
          <ol className="pp-list pp-list--roman">
            {paperPrinciples.items.map(([t, d]) => (
              <li key={t}><h3 className="pp-h3">{t}</h3><p className="pp-p" style={{ margin: 0 }}>{d}</p></li>
            ))}
          </ol>
        </PpReveal>
      </section>
      <section>
        <PpReveal delay={0.1}>
          <p className="pp-kicker">{paperMethod.title}</p>
          <ol className="pp-list">
            {paperMethod.items.map(([n, t, d]) => (
              <li key={n}><h3 className="pp-h3"><span className="pp-num">{n}</span>{t}</h3><p className="pp-p" style={{ margin: 0 }}>{d}</p></li>
            ))}
          </ol>
        </PpReveal>
      </section>
      <section>
        <PpReveal delay={0.2}>
          <p className="pp-kicker">{paperCorrespondents.title}</p>
          <ul className="pp-inline">{paperCorrespondents.places.map((p) => <li key={p}>{p}</li>)}</ul>
          <p className="pp-kicker">{paperCorrespondents.creditsTitle}</p>
          <ul className="pp-inline">{paperCorrespondents.credits.map((c) => <li key={c}>{c}</li>)}</ul>
        </PpReveal>
      </section>
    </div>
  );
}
