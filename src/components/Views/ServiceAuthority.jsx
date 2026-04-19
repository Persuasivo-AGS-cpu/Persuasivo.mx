import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

export default function ServiceAuthority({ setView }) {
  return (
    <motion.div 
      key="service-authority"
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
         <title>Branding & Copywriting | Identidad Persuasivo</title>
         <meta name="description" content="Redactamos textos persuasivos y diseñamos estéticas premium para aniquilar obsesiones de clientes B2B." />
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
              Metodología 02
            </span>
            <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>Identidad y Copywriting</span>
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '2rem' }}>
            Autoridad Magnética.
          </h1>
          
          <p style={{ color: '#A1A1AA', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', lineHeight: 1.6, marginBottom: '4rem', maxWidth: '800px', fontWeight: 400 }}>
            Si suenas igual que todos, te cobrarán como a todos. Rediseñamos tu identidad comercial y redactamos textos persuasivos que posicionan a tu empresa en la categoría de lujo, eliminando la necesidad de competir por precio.
          </p>

          <img 
            src="/showcase/placeholder-authority.png" 
            alt="Análisis Comparativo de Identidad de Marca y Tasas de Cierre" 
            style={{ width: '100%', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '5rem', background: '#111', height: '400px', objectFit: 'cover' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Ingeniería de Lenguaje</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Las palabras no son decoración; son vectores de venta. Analizamos y re-escribimos tu narrativa comercial utilizando sesgos cognitivos. Desde el título de tu web hasta los guiones de ventas, cada palabra tiene el objetivo matemático de generar confianza instantánea.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Branding Premium</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                El cerebro humano juzga el valor en milisegundos. Creamos una estética de "Hardware Premium" y arquitectura sobria. Si te ves caro, la percepción de tu calidad se multiplica por 10 antes de que siquiera hables con el cliente.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Aniquilación de Objeciones</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Un buen copy responde las dudas antes de que el cliente las formule. Construimos módulos de autoridad, pruebas sociales y garantías inversas para que el prospecto llegue a la llamada con la mentalidad de "quiero que me acepten".
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '4rem', borderRadius: '32px', textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>La persuasión comienza aquí.</h2>
            <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Convierte prospectos fríos en fanáticos que pagan primas altas. Evaluemos la debilidad de tu narrativa comercial hoy mismo.
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
