import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const linkStyle = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
    fontWeight: 500
  };

  const columnTitle = {
    color: 'var(--text-primary)',
    fontSize: '0.8rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1.5rem'
  };

  return (
    <footer style={{
      width: '100%',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-void)',
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem) 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        {/* Brand Column */}
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h3 style={{
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              fontWeight: 900,
              letterSpacing: '4px',
              fontFamily: 'var(--font-display)',
              marginBottom: '1rem'
            }}>
              PERSUASIVO
            </h3>
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Arquitectura digital de alto rendimiento. Fusionamos creatividad con tecnología para construir ecosistemas que convierten.
          </p>
          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="https://www.instagram.com/persuasivo.mx/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" 
               style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
               onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://wa.me/528110802911" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
               style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.color = '#25D366'}
               onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 style={columnTitle}>Navegación</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link to="/" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Inicio</Link>
            <Link to="/servicios" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Servicios</Link>
            <Link to="/nosotros" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Nosotros</Link>
            <Link to="/blog" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Insights</Link>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h4 style={columnTitle}>Servicios</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link to="/servicios/ecosistemas" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Desarrollo Web</Link>
            <Link to="/servicios/trafico" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Meta Ads</Link>
            <Link to="/servicios/autoridad" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Copywriting & Redes</Link>
            <Link to="/servicios/branding" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Branding</Link>
            <Link to="/contenido" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>Contenido en video</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4 style={columnTitle}>Contacto</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link to="/consulta-gratis" style={{ ...linkStyle, color: 'var(--neon)', fontWeight: 700 }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--neon)'}>Agendar Consultoría →</Link>
            <a href="mailto:hola@persuasivo.com.mx" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>hola@persuasivo.com.mx</a>
            <a href="https://wa.me/528110802911" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>+52 811 080 2911</a>
            <span style={{ ...linkStyle, cursor: 'default' }}>Monterrey, N.L. México</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
          © {currentYear} Persuasivo. Todos los derechos reservados.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/legal/privacidad" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Privacidad</Link>
          <Link to="/legal/terminos" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Términos</Link>
          <Link to="/legal/cookies" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
