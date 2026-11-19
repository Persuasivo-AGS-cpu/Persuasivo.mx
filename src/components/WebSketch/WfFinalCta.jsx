import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webNotes, WEB_WA } from '../../data/webSketch';

export default function WfFinalCta() {
  return (
    <WfRow note={webNotes.cta}>
      <SketchBox seed={91} className="sk-pad" style={{ textAlign: 'center' }}>
        <h2 className="sk-h1">¿Armamos <span className="sk-mark">tu página</span>?</h2>
        <p className="sk-body" style={{ margin: '0 auto 1.5rem' }}>
          Esta página es un boceto. La tuya sale terminada, publicada y vendiendo.
        </p>
        <SketchButton href={WEB_WA} seed={92} large>Cotizar por WhatsApp</SketchButton>
      </SketchBox>
    </WfRow>
  );
}
