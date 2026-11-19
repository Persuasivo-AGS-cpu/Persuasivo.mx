import React from 'react';
import { searchAd, SEARCH_WA } from '../../data/searchPage';

// Abre el resultado de destino (si es un <details>) antes de que el ancla haga scroll.
const openTarget = (id) => () => {
  const el = document.getElementById(id);
  if (el && el.tagName === 'DETAILS') el.open = true;
};

export default function SrAd() {
  return (
    <section className="sr-ad">
      <cite className="sr-cite"><span className="sr-fav" aria-hidden="true">P</span>{searchAd.url}</cite>
      <h1 className="sr-title"><span className="sr-label">{searchAd.label} ·</span>{searchAd.title}</h1>
      <span className="sr-snippet">{searchAd.desc}</span>
      <ul className="sr-sitelinks">
        {searchAd.sitelinks.map(([label, id]) => (
          <li key={id}><a href={`#${id}`} onClick={openTarget(id)}>{label}</a></li>
        ))}
      </ul>
      <span className="sr-snippet" style={{ marginBottom: '0.9rem' }}>{searchAd.extra}</span>
      <a className="sr-btn" href={SEARCH_WA} target="_blank" rel="noopener noreferrer">{searchAd.cta}</a>
    </section>
  );
}
