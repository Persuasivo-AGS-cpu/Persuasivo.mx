import React from 'react';
import { Link } from 'react-router-dom';
import PpReveal from './PpReveal';
import { paperClassified as c } from '../../data/aboutPaper';

export default function PpClassified() {
  const [a, b] = c.title;
  return (
    <>
      <PpReveal>
        <section className="pp-classified">
          <p className="pp-box-title">{c.label}</p>
          <h2 className="pp-h2">{a}<em>{b}</em></h2>
          <p className="pp-p">{c.text}</p>
          <Link to="/contacto" className="pp-btn">{c.button}</Link>
          <p className="pp-small">{c.note}</p>
        </section>
      </PpReveal>
      <div className="pp-foot"><span>{c.print}</span><span>persuasivo.com.mx</span></div>
    </>
  );
}
