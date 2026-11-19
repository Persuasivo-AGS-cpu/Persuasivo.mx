import React from 'react';
import Pin from './Pin';
import { brandCta, BRAND_WA } from '../../data/brandBoard';

export default function BbCta() {
  return (
    <section>
      <Pin rotate={-1} className="bb-cta">
        <h2 className="bb-h2" style={{ marginBottom: '1.25rem' }}>{brandCta.title}</h2>
        <p className="bb-lead">{brandCta.text}</p>
        <a className="bb-btn" href={BRAND_WA} target="_blank" rel="noopener noreferrer">{brandCta.button}</a>
      </Pin>
    </section>
  );
}
