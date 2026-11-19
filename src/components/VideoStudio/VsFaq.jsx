import React from 'react';
import { videoFaq } from '../../data/videoStudio';

export default function VsFaq() {
  return (
    <section className="vs-faq">
      <h2 className="vs-h2">Preguntas frecuentes</h2>
      {videoFaq.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
