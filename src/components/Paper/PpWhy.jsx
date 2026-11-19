import React from 'react';
import PpReveal from './PpReveal';
import { paperWhy } from '../../data/aboutPaper';

export default function PpWhy() {
  return (
    <article className="pp-col pp-col--why">
      <PpReveal delay={0.2}>
        <p className="pp-kicker">{paperWhy.label}</p>
        <h2 className="pp-h2">{paperWhy.title}</h2>
        {paperWhy.paragraphs.map((t) => <p className="pp-p" key={t}>{t}</p>)}
        <blockquote className="pp-quote">“{paperWhy.quote}”</blockquote>
      </PpReveal>
    </article>
  );
}
