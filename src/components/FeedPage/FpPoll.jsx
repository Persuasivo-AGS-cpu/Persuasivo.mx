import React, { useState } from 'react';
import Post from './Post';
import { feedPoll } from '../../data/feedPage';

export default function FpPoll() {
  const [sel, setSel] = useState(null);
  return (
    <Post meta={feedPoll.meta}>
      <h2 className="fp-h2">{feedPoll.question}</h2>
      <div className="fp-opts" role="group" aria-label={feedPoll.question}>
        {feedPoll.options.map((o, i) => (
          <button key={o.label} type="button" className="fp-opt" aria-pressed={sel === i} onClick={() => setSel(i)}>{o.label}</button>
        ))}
      </div>
      <p className="fp-answer" aria-live="polite" hidden={sel === null}>
        {sel !== null ? feedPoll.options[sel].answer : ''}
      </p>
    </Post>
  );
}
