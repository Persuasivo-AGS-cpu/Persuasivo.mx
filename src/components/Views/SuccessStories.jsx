import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Elypse', url: '/logos/elypse.png' },
  { name: 'Renters', url: '/logos/renters.png' },
  { name: 'Monterrey Juridico', url: '/logos/mty-juridico.png' },
  { name: 'OneBell', url: '/logos/onebell.png' },
  { name: 'Contratos B2B', url: '/logos/contratos.png' },
  { name: 'Elite Seguridad', url: '/logos/elite.png' }
];

export default function SuccessStories() {
  return (
    <section style={{ padding: '8rem 2rem', background: '#050505', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          No somos una agencia.<br />
          Somos tu <span style={{ color: 'var(--neon)', textShadow: '0 0 20px rgba(224, 255, 49, 0.3)' }}>ventaja injusta.</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1.5rem', maxWidth: '700px', margin: '1.5rem auto 0 auto' }}>
          Resultados medibles y escalables. Así es como transformamos negocios ordinarios en líderes de su industria.
        </p>
      </div>

      {/* Infinite Logo Marquee */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '2rem 0', marginBottom: '5rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-content {
            display: flex;
            width: 200%;
            animation: marquee 30s linear infinite;
          }
          .marquee-content:hover {
            animation-play-state: paused;
          }
          .logo-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            filter: grayscale(100%) opacity(0.5);
            transition: filter 0.3s ease;
          }
          .logo-item:hover {
            filter: grayscale(0%) opacity(1);
          }
        `}</style>
        <div className="marquee-content">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="logo-item">
              <span style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
        
        {/* Card 1: Main Highlight (Span 8 cols) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ gridColumn: 'span 8', background: 'linear-gradient(145deg, rgba(224,255,49,0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '24px', padding: '3rem', border: '1px solid rgba(224,255,49,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ color: 'var(--neon)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Tasa de Conversión</div>
          <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.05em', marginBottom: '1rem' }}>
            +215%
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6 }}>
            Aumento promedio en captación de leads calificados tras rediseñar la arquitectura de conversión en los primeros 90 días.
          </p>
        </motion.div>

        {/* Card 2: Secondary Highlight (Span 4 cols) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ gridColumn: 'span 4', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '3rem', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Costo por Lead</div>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.05em', marginBottom: '1rem' }}>
            -40%
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Reducción del costo de adquisición gracias a ingeniería de pauta publicitaria (Meta Ads).
          </p>
        </motion.div>

        {/* Card 3: Feature (Span 4 cols) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ gridColumn: 'span 4', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '3rem', border: '1px solid var(--border-subtle)' }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡️</div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Core Web Vitals</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Cargas en menos de 2 segundos. Diseños optimizados para dominar el SEO técnico de Google.</p>
        </motion.div>

        {/* Card 4: Feature (Span 8 cols) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ gridColumn: 'span 8', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '3rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '2rem' }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--neon)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Retorno de Inversión</div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>Sistemas Matemáticos, no Esperanza.</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Implementamos embudos de ventas donde mides exactamente cuánto ganas por cada peso invertido en publicidad. ROAS y ROE documentado.
            </p>
          </div>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,255,49,0.2) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(224,255,49,0.3)' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--neon)' }}>12X</span>
          </div>
        </motion.div>

      </div>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, var(--neon-subtle) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />
    </section>
  );
}
