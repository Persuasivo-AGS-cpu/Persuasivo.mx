import React from 'react';
import PpReveal from './PpReveal';
import { paperFounder } from '../../data/aboutPaper';

export default function PpFounder() {
  return (
    <article className="pp-col pp-col--founder">
      <PpReveal delay={0.2}>
        <p className="pp-kicker">{paperFounder.label}</p>
        <h2 className="pp-h2">{paperFounder.name}</h2>
        {paperFounder.paragraphs.map((t) => <p className="pp-p" key={t}>{t}</p>)}
        <blockquote className="pp-quote">“{paperFounder.quote}”</blockquote>
        <p className="pp-small">{paperFounder.creds}</p>
      </PpReveal>
    </article>
  );
}
