import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Lo que dicen nuestros clientes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ margin: 0 }}
            >
              <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
                “{t.quote}”
              </blockquote>
              <figcaption style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-medium)', paddingTop: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{t.name}</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
