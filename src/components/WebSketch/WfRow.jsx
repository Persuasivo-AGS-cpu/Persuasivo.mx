import React from 'react';
import SketchNote from '../Sketch/SketchNote';

// Una fila del wireframe: el bloque (centro) y su nota explicativa (lateral en escritorio, debajo en móvil).
export default function WfRow({ note, children }) {
  return (
    <section className="sk-row">
      <div className="sk-block">{children}</div>
      {note && <SketchNote side={note.side} rotate={note.rotate}>{note.text}</SketchNote>}
    </section>
  );
}
