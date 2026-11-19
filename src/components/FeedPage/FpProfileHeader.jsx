import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { feedProfile, feedHero, feedStories, FEED_WA, FEED_WA_MSG } from '../../data/feedPage';

export default function FpProfileHeader() {
  const cases = feedStories.slugs.map(getProjectBySlug).filter(Boolean);
  return (
    <header className="fp-ph">
      <span className="fp-avatar" aria-hidden="true">P</span>
      <div>
        <p className="fp-ph-name">{feedProfile.name}</p>
        <div className="fp-ph-actions">
          <a className="fp-follow" href={FEED_WA} target="_blank" rel="noopener noreferrer" aria-label={feedProfile.followLabel}>
            {feedProfile.follow}
          </a>
          <a className="fp-follow fp-follow--ghost" href={FEED_WA_MSG} target="_blank" rel="noopener noreferrer" aria-label={feedProfile.messageLabel}>
            {feedProfile.message}
          </a>
        </div>
      </div>
      <div className="fp-ph-bio">
        <p className="fp-ph-role">{feedProfile.role}</p>
        <h1 className="fp-h1">{feedHero.title}</h1>
        <p className="fp-p">{feedHero.sub}</p>
        {cases.length > 0 && (
          <div className="fp-stories">
            {cases.map((c) => (
              <Link key={c.id} to={`/work/${c.slug}`} className="fp-story">
                <span className="fp-ring">{c.img && <img src={c.img} alt="" loading="lazy" />}</span>
                {c.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
