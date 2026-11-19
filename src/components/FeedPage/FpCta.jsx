import React from 'react';
import Post from './Post';
import { feedCta, FEED_WA } from '../../data/feedPage';

export default function FpCta() {
  return (
    <Post meta={feedCta.meta}>
      <h2 className="fp-h2">{feedCta.title}</h2>
      <p className="fp-p">{feedCta.text}</p>
      <a className="fp-btn" href={FEED_WA} target="_blank" rel="noopener noreferrer">{feedCta.button}</a>
      <p className="fp-p" style={{ margin: '1rem 0 0', fontSize: '0.9rem' }}>{feedCta.price}</p>
    </Post>
  );
}
