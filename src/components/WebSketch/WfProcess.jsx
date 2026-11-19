import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { webSteps, webNotes } from '../../data/webSketch';

export default function WfProcess() {
  return (
    <WfRow note={webNotes.process}>
      <h2 className="sk-h2">Así trabajamos, <span className="sk-mark">paso a paso</span></h2>
      <div className="sk-steps">
        {webSteps.map((s, i) => (
          <SketchBox key={s.title} seed={51 + i} fill={s.here ? '#E0FF31' : 'none'} className="sk-pad" style={{ padding: '1rem' }}>
            <h3 className="sk-h3">{i + 1}. {s.title}</h3>
            <p style={{ margin: 0 }}>{s.text}</p>
            {s.here && <p className="sk-caption" style={{ margin: '0.5rem 0 0' }}>← estás aquí</p>}
          </SketchBox>
        ))}
      </div>
    </WfRow>
  );
}
