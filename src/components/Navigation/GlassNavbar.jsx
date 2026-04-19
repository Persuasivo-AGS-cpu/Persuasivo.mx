import React from 'react';
import { motion } from 'framer-motion';

export default function GlassNavbar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'landing', label: 'Bienvenida' },
    { id: 'agency', label: 'Agencia' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <motion.nav
      className="glass-nav"
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 20, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(5, 5, 5, 0.65)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50px',
        zIndex: 99999
      }}
    >
      {/* Logotipo a la izquierda */}
      <div 
        className="glass-nav-logo"
        onClick={() => setCurrentView('landing')}
        style={{ color: '#fff', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E0FF31', display: 'inline-block', boxShadow: '0 0 10px #E0FF31' }} />
        PERSUASIVO
      </div>

      {/* Enlaces de Navegación a la derecha */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className="glass-nav-btn"
            onClick={() => setCurrentView(item.id)}
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              color: currentView === item.id ? '#fff' : '#888',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '9999px',
              transition: 'color 0.2s ease',
              zIndex: 1,
            }}
          >
            {currentView === item.id && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  zIndex: -1
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {item.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
