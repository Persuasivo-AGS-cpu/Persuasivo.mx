import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FrictionCTA({ 
  title = "No trabajamos con cualquiera.",
  subtitle = "Nuestro ecosistema es exclusivo para empresas dispuestas a invertir en su crecimiento real.",
  ctaText = "Ver si califico →",
  ctaLink = "/consulta-gratis"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(2rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        maxWidth: '800px',
        margin: '4rem auto'
      }}
    >
      {/* Warning Stripes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'repeating-linear-gradient(45deg, var(--danger), var(--danger) 10px, transparent 10px, transparent 20px)'
      }} />

      <h3 style={{
        color: 'var(--text-primary)',
        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
        fontWeight: 900,
        marginBottom: '1rem',
        letterSpacing: '-0.02em'
      }}>
        {title}
      </h3>

      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1.1rem',
        lineHeight: 1.6,
        marginBottom: '2.5rem',
        maxWidth: '600px',
        margin: '0 auto 2.5rem auto'
      }}>
        {subtitle}
      </p>

      <Link
        to={ctaLink}
        style={{
          display: 'inline-block',
          background: 'var(--danger)',
          color: 'var(--text-primary)',
          padding: '1rem 2.5rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '1rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 20px rgba(255,68,68,0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(255,68,68,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,68,68,0.2)';
        }}
      >
        {ctaText}
      </Link>
    </motion.div>
  );
}
