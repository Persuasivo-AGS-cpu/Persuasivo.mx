import React from 'react';
import { Link } from 'react-router-dom';
import { hubServices, hubJourney } from '../../data/hub';

export default function HubJourney() {
  return (
    <section className="hub-journey">
      <h2 className="hub-h2">{hubJourney.title}</h2>
      <p className="hub-p">{hubJourney.sub}</p>
      <ol className="hub-steps">
        {hubServices.map((s, i) => (
          <li key={s.id}>
            <span className="hub-dot" aria-hidden="true">{i + 1}</span>
            <Link to={s.to}>{s.title}</Link>
            <span>{s.role}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
