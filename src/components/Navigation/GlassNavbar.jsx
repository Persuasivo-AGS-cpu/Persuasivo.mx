import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const routeFor = { landing: '/', contact: '/contacto' };

export default function GlassNavbar({ currentView }) {
  const navItems = [
    { id: 'landing', label: 'Inicio' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <motion.nav
      className="top-nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(247, 244, 236, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid #D9D2C2',
        zIndex: 99999
      }}
    >
      {/* Logotipo a la izquierda */}
      <Link
        to="/"
        className="top-nav-logo"
        style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', textDecoration: 'none' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M1 5V1H5" stroke="#D6531D" strokeWidth="1.6" fill="none" />
          <path d="M11 1H15V5" stroke="#D6531D" strokeWidth="1.6" fill="none" />
          <path d="M15 11V15H11" stroke="#D6531D" strokeWidth="1.6" fill="none" />
          <path d="M5 15H1V11" stroke="#D6531D" strokeWidth="1.6" fill="none" />
        </svg>
        PERSUASIVO
      </Link>

      {/* Enlaces de Navegación a la derecha */}
      <div className="top-nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={routeFor[item.id]}
            className="top-nav-btn"
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              color: currentView === item.id ? '#1A1815' : '#6B6459',
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            {item.label}
            {currentView === item.id && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  left: '10%',
                  right: '10%',
                  bottom: '-1px',
                  height: '2px',
                  background: '#D6531D'
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
