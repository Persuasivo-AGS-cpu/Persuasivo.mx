import React from 'react';
import { Link } from 'react-router-dom';
import { searchMore } from '../../data/searchPage';

export default function SrMore() {
  return (
    <section>
      <h2 className="sr-block-title">{searchMore.title}</h2>
      <div className="sr-more-ads">
        {searchMore.items.map((a) => (
          <Link key={a.to} to={a.to}>
            <cite className="sr-cite"><span className="sr-fav" aria-hidden="true">P</span>{a.url}</cite>
            <span className="sr-title"><span className="sr-label">Anuncio ·</span>{a.title}</span>
            <span className="sr-snippet">{a.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
