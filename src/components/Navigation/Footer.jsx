import React from 'react';

export default function Footer({ setView }) {
  return (
    <footer style={{
      width: '100%',
      maxWidth: '1200px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '3rem',
      color: '#666',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Columna Branding */}
      <div style={{ gridColumn: 'span 2' }}>
         <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>PERSUASIVO</h4>
         <p style={{ fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px', color: '#888' }}>
           Agencia de alto rendimiento y alquimia digital. Haciendo lo imposible, estéticamente inevitable.
         </p>
      </div>
      
      {/* Columna Sitemap */}
      <div>
         <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Agencia</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><a href="#" onClick={(e) => { e.preventDefault(); setView('landing'); }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Inicio</a></li>
           <li><a href="#" onClick={(e) => { e.preventDefault(); setView('agency'); }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Nuestra Agencia</a></li>
           <li><a href="#" onClick={(e) => { e.preventDefault(); setView('contact'); }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#E0FF31'} style={{ color: '#E0FF31', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem', fontWeight: 'bold' }}>Contacto</a></li>
         </ul>
      </div>

      {/* Columna Legal */}
      <div>
         <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <li><a href="#" onClick={(e) => { e.preventDefault(); setView('privacy'); }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Aviso de Privacidad</a></li>
           <li><a href="#" onClick={(e) => { e.preventDefault(); setView('terms'); }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Términos de Servicio</a></li>
           <li><a href="#" onClick={(e) => { e.preventDefault(); setView('cookies'); }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Política de Cookies</a></li>
         </ul>
      </div>
      
      {/* Bottom Bar: Copyright & Status */}
      <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap', gap: '1rem' }}>
        <p>© {new Date().getFullYear()} Persuasivo. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
           <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
             <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E0FF31', display: 'inline-block', boxShadow: '0 0 10px #E0FF31' }} />
             Sistemas Operativos
           </p>
           <div style={{ display: 'flex', gap: '1rem' }}>
             <a href="#" onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 600 }}>𝕏 (Twitter)</a>
             <a href="#" onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#888'} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 600 }}>LinkedIn</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
