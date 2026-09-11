import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ dark = false }) {
  const ink = dark ? '#F7F4EC' : '#1A1815';
  const muted = dark ? 'rgba(247,244,236,0.55)' : '#6B6459';
  const line = dark ? 'rgba(247,244,236,0.15)' : '#D9D2C2';
  const accent = '#D6531D';

  const linkStyle = { background: 'none', border: 'none', padding: 0, color: muted, textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit', display: 'inline-block' };
  const onOver = (e) => { e.target.style.color = ink; };
  const onOut = (e) => { e.target.style.color = muted; };

  return (
    <footer style={{
      width: '100%',
      maxWidth: '1200px',
      borderTop: `1px solid ${line}`,
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '3rem',
      color: muted,
      fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    }}>
      {/* Columna Branding */}
      <div style={{ gridColumn: 'span 2' }}>
         <h4 style={{ color: ink, fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>PERSUASIVO</h4>
         <p style={{ fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px', color: muted }}>
           Agencia de alto rendimiento y alquimia digital. Haciendo lo imposible, estéticamente inevitable.
         </p>
      </div>

      {/* Columna Servicios — ancla de enlaces internos reales hacia las 3 páginas de servicio */}
      <div>
         <h4 style={{ color: ink, fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Servicios</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><Link to="/servicios/trafico" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Meta Ads</Link></li>
           <li><Link to="/servicios/ecosistemas" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Desarrollo Web</Link></li>
           <li><Link to="/servicios/autoridad" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Redes &amp; Copywriting</Link></li>
         </ul>
      </div>

      {/* Columna Sitemap */}
      <div>
         <h4 style={{ color: ink, fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Agencia</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><Link to="/" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Inicio</Link></li>
           <li><Link to="/contacto" style={{ ...linkStyle, color: accent, fontWeight: 'bold' }} onMouseOver={(e)=>e.target.style.color='#A83C14'} onMouseOut={(e)=>e.target.style.color=accent}>Contacto</Link></li>
         </ul>
      </div>

      {/* Columna Legal */}
      <div>
         <h4 style={{ color: ink, fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><Link to="/legal/privacidad" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Aviso de Privacidad</Link></li>
           <li><Link to="/legal/terminos" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Términos de Servicio</Link></li>
           <li><Link to="/legal/cookies" style={linkStyle} onMouseOver={onOver} onMouseOut={onOut}>Política de Cookies</Link></li>
         </ul>
      </div>

      {/* Bottom Bar: Copyright & Status */}
      <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${line}`, paddingTop: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap', gap: '1rem', color: muted }}>
        <p>© {new Date().getFullYear()} Persuasivo. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
           <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
             <span style={{ width: '7px', height: '7px', background: accent, display: 'inline-block' }} />
             Sistemas Operativos
           </p>

        </div>
      </div>
    </footer>
  );
}
