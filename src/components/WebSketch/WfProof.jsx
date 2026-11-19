import React from 'react';
import { Link } from 'react-router-dom';
import WfRow from './WfRow';
import SketchBox from '../Sketch/SketchBox';
import { getProjectsByCategory } from '../../data/caseStudiesData';
import { webNotes } from '../../data/webSketch';

export default function WfProof() {
  const cases = getProjectsByCategory('ecosistemas').filter((c) => c.img).slice(0, 3);
  return (
    <WfRow note={webNotes.proof}>
      <h2 className="sk-h2">Resultados que ya <span className="sk-mark">funcionan</span></h2>
      <div className="sk-grid3">
        {cases.map((c, i) => (
          <Link key={c.id} to={`/work/${c.slug}`} className="sk-card-link">
            <SketchBox seed={31 + i} className="sk-pad" style={{ padding: '1rem' }}>
              <img className="sk-thumb" src={c.img} alt={c.title} loading="lazy" />
              <h3 className="sk-h3">{c.title}</h3>
              <p className="sk-metric">{c.metric}</p>
            </SketchBox>
          </Link>
        ))}
      </div>
    </WfRow>
  );
}
