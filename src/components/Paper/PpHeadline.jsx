import React from 'react';
import PpReveal from './PpReveal';
import { paperHead } from '../../data/aboutPaper';

export default function PpHeadline() {
  const [a, b] = paperHead.title;
  const { photo } = paperHead;
  return (
    <article className="pp-col pp-col--head">
      <PpReveal>
        <p className="pp-kicker">{paperHead.kicker}</p>
        <h1 className="pp-h1">{a}<em>{b}</em></h1>
        <p className="pp-deck">{paperHead.deck}</p>
        <p className="pp-byline">{paperHead.byline}</p>
        <figure style={{ margin: '0 0 1rem' }}>
          <span className="pp-photo-wrap"><img className="pp-photo" src={photo.src} alt={photo.alt} /></span>
          <figcaption className="pp-caption">{photo.caption}</figcaption>
        </figure>
        <div className="pp-cols">
          {paperHead.body.map((t, i) => (
            <p key={t} className={`pp-p${i === 0 ? ' pp-dropcap' : ''}`}>{t}</p>
          ))}
        </div>
      </PpReveal>
    </article>
  );
}
