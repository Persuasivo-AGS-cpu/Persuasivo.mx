import React from 'react';
import { videoCta, VIDEO_WA } from '../../data/videoStudio';

export default function VsCta() {
  return (
    <section className="vs-cta">
      <h2 className="vs-h2">{videoCta.title}</h2>
      <p className="vs-lead">{videoCta.text}</p>
      <a className="vs-btn" href={VIDEO_WA} target="_blank" rel="noopener noreferrer">{videoCta.button}</a>
    </section>
  );
}
