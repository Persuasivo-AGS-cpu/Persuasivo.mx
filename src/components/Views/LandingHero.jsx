import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { waLink } from '../../data/contact';
import PhoneFrame from '../Home/PhoneFrame';

const heroPhones = [
  { src: '/showcase/renters.jpg', alt: 'Renters', y: 40, delay: 0.3 },
  { src: '/showcase/monterrey.jpg', alt: 'Monterrey Jurídico', y: -30, delay: 0.45 },
  { src: '/showcase/elypse.jpg', alt: 'Edificio Elypse', y: 60, delay: 0.6 },
];

const ease = [0.16, 1, 0.3, 1];

export default function LandingHero() {
  return (
    <section
      id="hero"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '16vh 5vw 10vh',
        background: 'var(--bg-void)',
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        style={{ width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '3vw' }}
      >
        <style>{`.hero-phones{display:none}@media(min-width:1000px){.hero-phones{display:flex}}`}</style>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            marginBottom: '2rem',
            maxWidth: '1100px',
          }}
        >
          Agencia de marketing digital en Monterrey que genera <span style={{ fontStyle: 'italic', textDecoration: 'underline', textDecorationColor: 'var(--neon)', textDecorationThickness: '0.06em', textUnderlineOffset: '0.12em' }}>resultados reales.</span>
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
            lineHeight: 1.6,
            maxWidth: '620px',
            marginBottom: '2.5rem',
          }}
        >
          Branding, desarrollo web, contenido en video y Meta Ads para empresas que quieren que las recuerden y las contraten.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.a
            href={waLink('Hola, quiero una cotización')}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-deep)',
              padding: '1.1rem 2.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            Quiero una cotización →
          </motion.a>
          <Link
            to="/servicios"
            style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            Ver nuestros servicios
          </Link>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2.5rem' }}>
          +215% leads · 12X ROAS · Renters · Contratos · Monterrey Jurídico
        </p>
        </div>

        <div className="hero-phones" style={{ flex: '0 0 38%', gap: '1rem', alignItems: 'center' }} aria-hidden="true">
          {heroPhones.map((p) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: p.y + 40 }}
              animate={{ opacity: 1, y: p.y }}
              transition={{ duration: 0.9, delay: p.delay, ease }}
              style={{ flex: 1 }}
            >
              <PhoneFrame src={p.src} alt={p.alt} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
