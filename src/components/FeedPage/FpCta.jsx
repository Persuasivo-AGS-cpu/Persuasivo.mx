import React from 'react';
import Post from './Post';
import { feedCta, FEED_WA } from '../../data/feedPage';

export default function FpCta() {
  return (
    <Post meta={feedCta.meta}>
      <h2 className="fp-h2">{feedCta.title}</h2>
      <ol className="fp-steps">
        {feedCta.steps.map(([t, d], i) => (
          <li key={t}><b>{i + 1}</b><div><strong>{t}</strong><span>{d}</span></div></li>
        ))}
      </ol>
      <p className="fp-p">{feedCta.text}</p>
      <a className="fp-btn" href={FEED_WA} target="_blank" rel="noopener noreferrer">{feedCta.button}</a>
      <p className="fp-p" style={{ margin: '1rem 0 0', fontSize: '0.9rem' }}>{feedCta.price}</p>
    </Post>
  );
}
