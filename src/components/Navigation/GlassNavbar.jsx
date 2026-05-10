import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/work', label: 'Work' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/blog', label: 'Insights' },
];

export default function GlassNavbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          height: '64px',
          background: scrolled ? 'rgba(242, 242, 242, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 900,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            letterSpacing: '3px',
            fontFamily: 'var(--font-display)',
            lineHeight: 1,
          }}
        >
          PERSUASIVO
        </Link>

        {/* Desktop Links */}
        <div className="desktop-nav-links" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: isActive(item.path) ? 600 : 400,
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isActive(item.path) ? 'var(--text-primary)' : 'var(--text-secondary)'; }}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/contacto"
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-void)',
              padding: '0.5rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em',
              transition: 'background 0.2s ease, color 0.2s ease',
              whiteSpace: 'nowrap',
              marginLeft: '0.5rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--text-secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--text-primary)'; }}
          >
            Contacto
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú de navegación"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          <div style={{ width: '22px', height: '14px', position: 'relative' }}>
            <span style={{
              display: 'block', width: '100%', height: '1.5px',
              background: 'var(--text-primary)',
              position: 'absolute', left: 0,
              top: isMenuOpen ? '6px' : '0',
              transform: isMenuOpen ? 'rotate(45deg)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              display: 'block', width: '100%', height: '1.5px',
              background: 'var(--text-primary)', position: 'absolute', left: 0, top: '6px',
              opacity: isMenuOpen ? 0 : 1, transition: 'opacity 0.2s ease'
            }} />
            <span style={{
              display: 'block', width: '100%', height: '1.5px',
              background: 'var(--text-primary)',
              position: 'absolute', left: 0,
              top: isMenuOpen ? '6px' : '12px',
              transform: isMenuOpen ? 'rotate(-45deg)' : 'none',
              transition: 'all 0.3s ease'
            }} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay"
          >
            {[...navItems, { path: '/contacto', label: 'Contacto' }].map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link
                  to={item.path}
                  className={`mobile-menu-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
