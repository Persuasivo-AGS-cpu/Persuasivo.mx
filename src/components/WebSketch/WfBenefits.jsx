import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { webBenefits, webNotes } from '../../data/webSketch';

export default function WfBenefits() {
  return (
    <WfRow note={webNotes.benefits}>
      <h2 className="sk-h2">Una web que trabaja <span className="sk-mark">por ti</span></h2>
      <div className="sk-grid3">
        {webBenefits.map((b, i) => (
          <div key={b.n}>
            <SketchBox kind="ellipse" seed={41 + i} passes={1} className="sk-num">{b.n}</SketchBox>
            <h3 className="sk-h3">{b.title}</h3>
            <p style={{ margin: 0 }}>{b.text}</p>
          </div>
        ))}
      </div>
    </WfRow>
  );
}
