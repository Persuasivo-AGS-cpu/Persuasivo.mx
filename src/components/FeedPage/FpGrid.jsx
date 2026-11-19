import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FpModal from './FpModal';
import FpHero from './FpHero';
import FpCarousel from './FpCarousel';
import FpPoll from './FpPoll';
import FpCalendar from './FpCalendar';
import FpComments from './FpComments';
import FpCta from './FpCta';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { feedTiles, feedCalendar as cal, feedHero, feedCarousel } from '../../data/feedPage';

const content = { hero: FpHero, carousel: FpCarousel, poll: FpPoll, calendar: FpCalendar, faq: FpComments, cta: FpCta };

// Portada de cada celda, dibujada con CSS. Decorativa: el nombre accesible es la etiqueta.
function Cover({ id }) {
  switch (id) {
    case 'hero':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-text">{feedHero.title}</span></span>;
    case 'carousel':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-big">01</span><span className="fp-tile-text">{feedCarousel.title}</span></span>;
    case 'poll':
      return <span aria-hidden="true" className="fp-tile-cover fp-pills"><span className="fp-tile-text">¿Qué te frena?</span><i /><i /><i /></span>;
    case 'calendar':
      return (
        <span aria-hidden="true" className="fp-tile-cover fp-mini">
          {Array.from({ length: cal.weeks * cal.dayHeads.length }, (_, i) => {
            const w = Math.floor(i / cal.dayHeads.length);
            const d = i % cal.dayHeads.length;
            return <i key={i} className={`fp-day--${cal.types[(w + d) % cal.types.length].id}`} />;
          })}
        </span>
      );
    case 'faq':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-big">?</span></span>;
    case 'cta':
      return <span aria-hidden="true" className="fp-tile-cover"><span className="fp-tile-big">→</span><span className="fp-tile-text">Empieza aquí</span></span>;
    default:
      return null;
  }
}

export default function FpGrid() {
  const [open, setOpen] = useState(null);
  const modalTiles = feedTiles.filter((t) => t.kind === 'modal');

  return (
    <>
      <ul className="fp-grid">
        {feedTiles.map((t) => {
          if (t.kind === 'case') {
            const c = getProjectBySlug(t.slug);
            if (!c) return null;
            return (
              <li key={t.id}>
                <Link to={`/work/${c.slug}`} className="fp-tile">
                  <span aria-hidden="true" className="fp-tile-cover">{c.img && <img src={c.img} alt="" loading="lazy" />}</span>
                  <span className="fp-tile-label">{c.title}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={t.id}>
              <button type="button" className={`fp-tile fp-tile--${t.tone}`} aria-haspopup="dialog" onClick={() => setOpen(t.id)}>
                <Cover id={t.id} />
                <span className="fp-tile-label">{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {modalTiles.map((t) => {
        const Content = content[t.id];
        return (
          <FpModal key={t.id} label={t.label} open={open === t.id}
            onClose={() => setOpen((cur) => (cur === t.id ? null : cur))}>
            <Content />
          </FpModal>
        );
      })}
    </>
  );
}
