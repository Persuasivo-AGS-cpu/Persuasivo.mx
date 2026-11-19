import React from 'react';
import { searchPaa } from '../../data/searchPage';

export default function SrPaa() {
  return (
    <section>
      <h2 className="sr-block-title">{searchPaa.title}</h2>
      <div className="sr-paa">
        {searchPaa.items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
