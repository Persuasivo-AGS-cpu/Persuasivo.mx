import React from 'react';

export default function Footer({ setView }) {
  return (
    <footer style={{
      width: '100%',
      maxWidth: '1200px',
      borderTop: '1px solid #D9D2C2',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '3rem',
      color: '#6B6459',
      fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    }}>
      {/* Columna Branding */}
      <div style={{ gridColumn: 'span 2' }}>
         <h4 style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>PERSUASIVO</h4>
         <p style={{ fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px', color: '#6B6459' }}>
           Agencia de alto rendimiento y alquimia digital. Haciendo lo imposible, estéticamente inevitable.
         </p>
      </div>

      {/* Columna Sitemap */}
      <div>
         <h4 style={{ color: '#1A1815', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Agencia</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><button onClick={() => setView('landing')} onMouseOver={(e)=>e.target.style.color='#1A1815'} onMouseOut={(e)=>e.target.style.color='#6B6459'} style={{ background: 'none', border: 'none', padding: 0, color: '#6B6459', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>Inicio</button></li>
           <li><button onClick={() => setView('agency')} onMouseOver={(e)=>e.target.style.color='#1A1815'} onMouseOut={(e)=>e.target.style.color='#6B6459'} style={{ background: 'none', border: 'none', padding: 0, color: '#6B6459', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>Nuestra Agencia</button></li>
           <li><button onClick={() => setView('contact')} onMouseOver={(e)=>e.target.style.color='#A83C14'} onMouseOut={(e)=>e.target.style.color='#D6531D'} style={{ background: 'none', border: 'none', padding: 0, color: '#D6531D', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>Contacto</button></li>
         </ul>
      </div>

      {/* Columna Legal */}
      <div>
         <h4 style={{ color: '#1A1815', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><button onClick={() => setView('privacy')} onMouseOver={(e)=>e.target.style.color='#1A1815'} onMouseOut={(e)=>e.target.style.color='#6B6459'} style={{ background: 'none', border: 'none', padding: 0, color: '#6B6459', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>Aviso de Privacidad</button></li>
           <li><button onClick={() => setView('terms')} onMouseOver={(e)=>e.target.style.color='#1A1815'} onMouseOut={(e)=>e.target.style.color='#6B6459'} style={{ background: 'none', border: 'none', padding: 0, color: '#6B6459', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>Términos de Servicio</button></li>
           <li><button onClick={() => setView('cookies')} onMouseOver={(e)=>e.target.style.color='#1A1815'} onMouseOut={(e)=>e.target.style.color='#6B6459'} style={{ background: 'none', border: 'none', padding: 0, color: '#6B6459', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>Política de Cookies</button></li>
         </ul>
      </div>

      {/* Bottom Bar: Copyright & Status */}
      <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #D9D2C2', paddingTop: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap', gap: '1rem' }}>
        <p>© {new Date().getFullYear()} Persuasivo. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
           <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
             <span style={{ width: '7px', height: '7px', background: '#D6531D', display: 'inline-block' }} />
             Sistemas Operativos
           </p>

        </div>
      </div>
    </footer>
  );
}
