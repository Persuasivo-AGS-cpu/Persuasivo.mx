import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

export default function ServiceEcosystems({ setView }) {
  return (
    <motion.div 
      key="service-ecosystems"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; } 
        .radial-bg { background: radial-gradient(circle at top center, rgba(224, 255, 49, 0.05) 0%, transparent 60%); }
      `}</style>
      
      <Helmet>
        <title>Desarrollo y Ecosistemas Web (React) | Persuasivo</title>
        <meta name="description" content="Construimos arquitecturas React que cargan en microsegundos y retienen atención con animaciones cinemáticas (Framer Motion)." />
      </Helmet>

      <div className="radial-bg" style={{ flex: 1, padding: '15vh 5vw 10vh 5vw', display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '900px' }}
        >
          {/* SEO Header & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ 
              background: 'rgba(224, 255, 49, 0.1)', color: '#E0FF31', padding: '0.4rem 1rem', 
              borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              Metodología 03
            </span>
            <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>Infraestructura Web</span>
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '2rem' }}>
            Ecosistemas Inmersivos.
          </h1>
          
          <p style={{ color: '#A1A1AA', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', lineHeight: 1.6, marginBottom: '4rem', maxWidth: '800px', fontWeight: 400 }}>
            Una página web no es un folleto digital, es un empleado de ventas que trabaja 24/7 y nunca se cansa. Construimos arquitecturas web en React que cargan en microsegundos, retienen la atención como un videojuego y empujan al cliente hacia la transacción sin fricciones.
          </p>

          <img 
            src="/showcase/placeholder-ecosystems.png" 
            alt="Arquitectura React y Ecosistemas Web de Alta Conversión" 
            style={{ width: '100%', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '5rem', background: '#111', height: '400px', objectFit: 'cover' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Zero Friction (Velocidad)</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Por cada segundo que tu web tarda en cargar, el 20% de tus clientes cierra la pestaña. Desarrollamos con React y Vercel (la misma tecnología de Netflix y Uber) para garantizar despliegues instantáneos. No usamos plantillas lentas de WordPress.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Animaciones Cinemáticas</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                El usuario moderno necesita estímulos. Implementamos interacciones Glassmorphism y animaciones fluidas con Framer Motion. El cliente sentirá que está usando una pieza de "software premium" y no una simple página de internet. Es psicología sensorial.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Dominancia en Google</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Hacemos "Hard-Coding" técnico (SEO Orgánico). Estructuramos etiquetas H1, descripciones y micro-data a nivel de código fuente para que Google, Safari y Edge reconozcan a tu empresa como líder del sector de forma automática.
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '4rem', borderRadius: '32px', textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Tu imperio necesita cimientos de titanio.</h2>
            <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Los negocios del futuro no corren en plantillas de WordPress. Eleva tu infraestructura al estándar de Silicon Valley.
            </p>
            <motion.button 
              onClick={() => setView('contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(180deg, #E0FF31 0%, #B8D900 100%)',
                color: '#000', border: 'none', padding: '1.2rem 3rem',
                borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '1px',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 10px 30px rgba(224, 255, 49, 0.3)',
                cursor: 'pointer'
              }}
            >
              Iniciar Operación
            </motion.button>
          </div>

        </motion.div>
      </div>

      <Footer setView={setView} />
    </motion.div>
  );
}
