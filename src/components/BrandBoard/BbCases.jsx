import React from 'react';
import { Link } from 'react-router-dom';
import Pin from './Pin';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { brandCaseSlugs } from '../../data/brandBoard';

export default function BbCases() {
  const cases = brandCaseSlugs.map(getProjectBySlug).filter(Boolean);
  if (!cases.length) return null;
  return (
    <section>
      <h2 className="bb-h2">Marcas que ya cuentan mejor su historia.</h2>
      <div className="bb-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))' }}>
        {cases.map((c, i) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="bb-link">
            <Pin rotate={i % 2 ? 2.2 : -2.2} className="bb-polaroid" delay={i * 0.1}>
              {c.img && <img src={c.img} alt={c.title} loading="lazy" />}
              <p className="bb-cap">{c.title}</p>
              <p className="bb-cap-sub">{c.metric} →</p>
            </Pin>
          </Link>
        ))}
      </div>
    </section>
  );
}
