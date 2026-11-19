import React from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { feedStories } from '../../data/feedPage';

export default function FpStories() {
  const cases = feedStories.slugs.map(getProjectBySlug).filter(Boolean);
  if (!cases.length) return null;
  return (
    <Post meta={feedStories.meta}>
      <h2 className="fp-h2">{feedStories.title}</h2>
      <div className="fp-stories">
        {cases.map((c) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="fp-story">
            <span className="fp-ring">{c.img && <img src={c.img} alt="" loading="lazy" />}</span>
            {c.title}
          </Link>
        ))}
      </div>
    </Post>
  );
}
