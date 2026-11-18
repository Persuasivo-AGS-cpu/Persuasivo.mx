import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingHero() {
  const containerRef = useRef(null);
  
  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress into color (Ghost to Primary)
  const color = useTransform(scrollYProgress, [0, 0.5], ["var(--text-ghost)", "var(--text-primary)"]);

  return (
    <motion.div 
      ref={containerRef}
      id="hero"
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 'var(--section-padding)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '1400px' }}
      >
        <motion.h1 style={{
          fontSize: 'clamp(4.5rem, 10vw, 11rem)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          lineHeight: '0.9',
          marginBottom: '2rem',
          color: color,
          fontFamily: 'var(--font-display)'
        }}>
          Para marcas que no tienen miedo de ser <span style={{ fontStyle: 'italic' }}>recordadas.</span>
        </motion.h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
          marginTop: '2rem', 
          fontWeight: 500, 
          letterSpacing: '-0.01em',
          maxWidth: '600px',
          marginInline: 'auto',
          lineHeight: '1.6'
        }}>
          Estrategia digital, diseño de experiencias y performance para empresas que piensan diferente.
        </p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--text-secondary), transparent)'
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
