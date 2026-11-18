import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { homeServices } from '../../data/homeServices';

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem 3rem',
  padding: '2.5rem 0',
  borderBottom: '1px solid var(--border-medium)',
  textDecoration: 'none',
  color: 'inherit',
};

function Row({ s, i }) {
  const content = (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ ...rowStyle, opacity: 0, y: 20 }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>0{i + 1}</span>
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 16 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          {s.word}
        </motion.span>
      </div>
      <p style={{ flex: '1 1 260px', maxWidth: '340px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {s.detail}
      </p>
      <span aria-hidden="true" style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>↗</span>
    </motion.div>
  );

  return s.to ? (
    <Link to={s.to} style={{ textDecoration: 'none' }}>{content}</Link>
  ) : (
    <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a>
  );
}

export default function ServiceList() {
  return (
    <section id="services" style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Servicios
        </h2>
        <div style={{ borderTop: '1px solid var(--border-medium)' }}>
          {homeServices.map((s, i) => <Row key={s.word} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
