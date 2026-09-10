import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import CornerMarks from '../CornerMarks';

export default function ServiceEcosystems({ setView }) {
  return (
    <motion.div
      key="service-ecosystems"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#EDE7D8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        .grid-bg { background-image: linear-gradient(rgba(26,24,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,21,0.04) 1px, transparent 1px); background-size: 32px 32px; }
      `}</style>

      <Helmet>
        <title>Desarrollo y Ecosistemas Web (React) | Persuasivo</title>
        <meta name="description" content="Construimos arquitecturas React que cargan en microsegundos y retienen atención con animaciones cinemáticas (Framer Motion)." />
      </Helmet>

      <CornerMarks color="#1A1815" inset={22} size={20} />

      <div className="grid-bg" style={{ flex: 1, padding: '15vh 5vw 10vh 5vw', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '900px' }}
        >
          {/* SEO Header & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{
              background: 'transparent', border: '1.5px solid #1A1815', color: '#1A1815', padding: '0.35rem 0.9rem',
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              Servicio
            </span>
            <span style={{ color: '#6B6459', fontSize: '0.9rem', fontWeight: 500 }}>Infraestructura Web</span>
          </div>

          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)', fontWeight: 700, color: '#1A1815', letterSpacing: '-0.01em', lineHeight: 1.08, marginBottom: '2rem' }}>
            Ecosistemas Inmersivos.
          </h1>

          <p style={{ color: '#6B6459', fontSize: 'clamp(1.1rem, 2.6vw, 1.4rem)', lineHeight: 1.6, marginBottom: '4rem', maxWidth: '800px', fontWeight: 400 }}>
            Una página web no es un folleto digital, es un empleado de ventas que trabaja 24/7 y nunca se cansa. Construimos arquitecturas web en React que cargan en microsegundos, retienen la atención como un videojuego y empujan al cliente hacia la transacción sin fricciones.
          </p>

          <div style={{
            position: 'relative', overflow: 'hidden', borderRadius: '8px',
            border: '1px solid #D9D2C2', marginBottom: '5rem',
            background: '#F7F4EC',
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 4rem)'
          }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-30px', left: '10px', fontSize: '9rem', fontWeight: 900, color: 'rgba(214,83,29,0.1)', lineHeight: 1, fontFamily: 'Georgia, serif' }}>&ldquo;</div>
            <p style={{ position: 'relative', color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.01em', maxWidth: '650px', margin: 0 }}>
              Un sitio tan profesional que <span style={{ color: '#D6531D' }}>justifica tus precios</span> y blinda tu credibilidad 24/7, sin margen de error.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
            <div>
              <h3 style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>Zero Friction (Velocidad)</h3>
              <p style={{ color: '#6B6459', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Por cada segundo que tu web tarda en cargar, el 20% de tus clientes cierra la pestaña. Desarrollamos con React y Vercel (la misma tecnología de Netflix y Uber) para garantizar despliegues instantáneos. No usamos plantillas lentas de WordPress.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>Animaciones Cinemáticas</h3>
              <p style={{ color: '#6B6459', fontSize: '1.05rem', lineHeight: 1.7 }}>
                El usuario moderno necesita estímulos. Implementamos interacciones Glassmorphism y animaciones fluidas con Framer Motion. El cliente sentirá que está usando una pieza de "software premium" y no una simple página de internet. Es psicología sensorial.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>Dominancia en Google</h3>
              <p style={{ color: '#6B6459', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Hacemos "Hard-Coding" técnico (SEO Orgánico). Estructuramos etiquetas H1, descripciones y micro-data a nivel de código fuente para que Google, Safari y Edge reconozcan a tu empresa como líder del sector de forma automática.
              </p>
            </div>
          </div>

          <div style={{ background: '#F7F4EC', border: '1px solid #D9D2C2', padding: 'clamp(2rem, 6vw, 4rem)', borderRadius: '8px', textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>Tu imperio necesita cimientos de titanio.</h2>
            <p style={{ color: '#6B6459', fontSize: '1.15rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Los negocios del futuro no corren en plantillas de WordPress. Eleva tu infraestructura al estándar de Silicon Valley.
            </p>
            <div style={{ display: 'inline-block', marginBottom: '2rem', padding: '0.5rem 1.2rem', border: '1.5px solid #1A1815', color: '#1A1815', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Landing $6,500 MXN único · Ecosistema 360 a cotización
            </div>
            <br />
            <motion.button
              onClick={() => setView('contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: '#D6531D',
                color: '#FBF7ED', border: '1.5px solid #1A1815', padding: '1.15rem 2.8rem',
                borderRadius: '4px', fontSize: '1.05rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '1px',
                boxShadow: '4px 4px 0 rgba(26,24,21,0.15)',
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
