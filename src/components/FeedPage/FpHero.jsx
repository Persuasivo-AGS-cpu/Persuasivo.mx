import React from 'react';
import Post from './Post';
import { feedHero, FEED_WA } from '../../data/feedPage';

export default function FpHero() {
  return (
    <Post meta={feedHero.meta} tags={feedHero.tags}>
      <h1 className="fp-h1">{feedHero.title}</h1>
      <p className="fp-p">{feedHero.sub}</p>
      <a className="fp-btn" href={FEED_WA} target="_blank" rel="noopener noreferrer">{feedHero.cta}</a>
    </Post>
  );
}
