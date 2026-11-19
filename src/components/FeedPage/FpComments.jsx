import React from 'react';
import Post from './Post';
import { feedComments } from '../../data/feedPage';

export default function FpComments() {
  return (
    <Post meta={feedComments.meta}>
      <h2 className="fp-h2">{feedComments.title}</h2>
      <div className="fp-thread">
        {feedComments.items.map(([q, a]) => (
          <div key={q}>
            <div className="fp-comment">
              <span className="fp-avatar" aria-hidden="true">?</span>
              <div className="fp-bubble"><strong>Un cliente</strong>{q}</div>
            </div>
            <div className="fp-reply">
              <span className="fp-avatar" aria-hidden="true">P</span>
              <div className="fp-bubble"><strong>persuasivo.mx</strong>{a}</div>
            </div>
          </div>
        ))}
      </div>
    </Post>
  );
}
