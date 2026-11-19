import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webPlans, webNotes, WEB_WA } from '../../data/webSketch';
import { waLink } from '../../data/contact';

export default function WfPricing() {
  return (
    <WfRow note={webNotes.pricing}>
      <h2 className="sk-h2">Cuánto <span className="sk-mark">cuesta</span></h2>
      <div className="sk-grid3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {webPlans.map((p, i) => (
          <SketchBox key={p.name} seed={61 + i} className="sk-pad">
            <h3 className="sk-h3">{p.name}</h3>
            <p className="sk-price">{p.price}</p>
            <p className="sk-caption" style={{ margin: 0 }}>Entrega: {p.time}</p>
            <ul className="sk-list">{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
            <SketchButton href={i === 0 ? WEB_WA : waLink('Hola, quiero cotizar un sitio corporativo')} seed={65 + i}>Cotizar</SketchButton>
          </SketchBox>
        ))}
      </div>
    </WfRow>
  );
}
