import React from 'react';
import { Link } from 'react-router-dom';
import PpReveal from './PpReveal';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { paperHead } from '../../data/aboutPaper';

export default function PpHeadline() {
  const c = getProjectBySlug(paperHead.photoSlug);
  const [a, b] = paperHead.title;
  return (
    <article className="pp-col pp-col--head">
      <PpReveal>
        <p className="pp-kicker">{paperHead.kicker}</p>
        <h1 className="pp-h1">{a}<em>{b}</em></h1>
        <p className="pp-deck">{paperHead.deck}</p>
        <p className="pp-byline">{paperHead.byline}</p>
        {c && c.img && (
          <figure style={{ margin: '0 0 1rem' }}>
            <Link to={`/work/${c.slug}`} className="pp-photo-link">
              <span className="pp-photo-wrap"><img className="pp-photo" src={c.img} alt={`Sitio web del caso ${c.title}`} /></span>
            </Link>
            <figcaption className="pp-caption">Caso {c.title}: {c.metric}.</figcaption>
          </figure>
        )}
        <div className="pp-cols">
          {paperHead.body.map((t, i) => (
            <p key={t} className={`pp-p${i === 0 ? ' pp-dropcap' : ''}`}>{t}</p>
          ))}
        </div>
      </PpReveal>
    </article>
  );
}
