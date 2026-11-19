import React from 'react';
import SketchBox from './SketchBox';

// Botón-óvalo con relleno de marcador. Siempre es un link (a WhatsApp o a una ruta externa).
export default function SketchButton({ href, children, seed = 5, large = false }) {
  return (
    <SketchBox as="a" kind="ellipse" seed={seed} fill="#E0FF31" passes={1}
      href={href} target="_blank" rel="noopener noreferrer"
      className={`sk-btn${large ? ' sk-btn--lg' : ''}`}>
      {children}
    </SketchBox>
  );
}
