import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { webFaq, webNotes } from '../../data/webSketch';

export default function WfFaq() {
  return (
    <WfRow note={webNotes.faq}>
      <h2 className="sk-h2">Lo que <span className="sk-mark">todos preguntan</span></h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {webFaq.map((f, i) => (
          <SketchBox key={f.question} seed={71 + i} passes={1} className="sk-faq">
            <details>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          </SketchBox>
        ))}
      </div>
    </WfRow>
  );
}
