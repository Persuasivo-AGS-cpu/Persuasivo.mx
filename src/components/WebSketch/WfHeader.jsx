import React from 'react';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import SketchButton from '../Sketch/SketchButton';
import { webNotes, WEB_WA } from '../../data/webSketch';

export default function WfHeader() {
  return (
    <WfRow note={webNotes.header}>
      <SketchBox seed={11} className="sk-bar">
        <span className="sk-logo">tuempresa</span>
        <div className="sk-nav" aria-hidden="true"><span>Servicios</span><span>Casos</span><span>Contacto</span></div>
        <SketchButton href={WEB_WA} seed={12}>Cotizar</SketchButton>
      </SketchBox>
    </WfRow>
  );
}
