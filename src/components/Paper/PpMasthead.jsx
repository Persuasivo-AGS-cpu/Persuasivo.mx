import React from 'react';
import { paperMasthead, formatEdition } from '../../data/aboutPaper';

export default function PpMasthead() {
  return (
    <header>
      <div className="pp-strip">
        <span>{paperMasthead.place} · {formatEdition()}</span>
        <span>{paperMasthead.founded}</span>
        <span>{paperMasthead.price}</span>
      </div>
      <p className="pp-name">{paperMasthead.name}</p>
      <p className="pp-tagline">{paperMasthead.tagline}</p>
      <hr className="pp-rule2" />
    </header>
  );
}
