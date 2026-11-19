import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectsByCategory } from '../../data/caseStudiesData';
import { searchCases } from '../../data/searchPage';

export default function SrCases() {
  const cases = getProjectsByCategory(searchCases.category).filter((c) => c.img);
  if (!cases.length) return null;
  return (
    <section id={searchCases.id}>
      <h2 className="sr-block-title">{searchCases.label}</h2>
      <div className="sr-rail" tabIndex={0} role="region" aria-label="Casos de Meta Ads (desplazable)">
        {cases.map((c) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="sr-case">
            <img src={c.img} alt="" loading="lazy" />
            <b>{c.title}</b>
            <span>{c.metric}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
