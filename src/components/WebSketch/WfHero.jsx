import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webHero, webNotes, WEB_WA } from '../../data/webSketch';

export default function WfHero() {
  const [a, mark, b] = webHero.title;
  return (
    <WfRow note={webNotes.hero}>
      <SketchBox seed={21} className="sk-pad">
        <div className="sk-hero">
          <div>
            <h1 className="sk-h1">{a}<span className="sk-mark">{mark}</span>{b}</h1>
            <p className="sk-body">{webHero.sub}</p>
            <div className="sk-actions">
              <SketchButton href={WEB_WA} seed={22} large>{webHero.cta}</SketchButton>
            </div>
          </div>
          <SketchBox seed={23} cross className="sk-imgph"><span className="sk-caption">aquí va tu producto</span></SketchBox>
        </div>
        <ul className="sk-stats">
          {webHero.stats.map((s) => (<li key={s.label}><strong>{s.value}</strong>{s.label}</li>))}
        </ul>
      </SketchBox>
    </WfRow>
  );
}
