import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Post from './Post';
import { feedCarousel } from '../../data/feedPage';

export default function FpCarousel() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { slides } = feedCarousel;

  const go = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };
  const onScroll = () => {
    const el = ref.current;
    if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <Post meta={feedCarousel.meta}>
      <h2 className="fp-h2">{feedCarousel.title}</h2>
      <div className="fp-carousel">
        <div ref={ref} className="fp-slides" onScroll={onScroll} tabIndex={0}
          role="group" aria-roledescription="carrusel" aria-label="Lo que hacemos por tu marca (desliza)">
          {slides.map((s, i) => (
            <div key={s} className={`fp-slide fp-slide--${i % 6}`} role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${slides.length}`}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <p>{s}</p>
            </div>
          ))}
        </div>
        <button type="button" className="fp-nav fp-nav--prev" aria-label="Anterior" onClick={() => go(-1)}>‹</button>
        <button type="button" className="fp-nav fp-nav--next" aria-label="Siguiente" onClick={() => go(1)}>›</button>
        <div className="fp-dots" aria-hidden="true">{slides.map((s, i) => <i key={s} data-on={i === idx} />)}</div>
      </div>
    </Post>
  );
}
