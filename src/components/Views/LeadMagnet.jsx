import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import GlassNavbar from '../Navigation/GlassNavbar';
import Footer from '../Navigation/Footer';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Logic to submit email to a mailing list (e.g. Mailchimp/ConvertKit/Webhook)
      console.log("Submitting email:", email);
      setSubmitted(true);
    }
  };

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Helmet>
        <title>Auditoría SEO Gratuita | Persuasivo</title>
        <meta name="description" content="Descarga nuestra checklist de auditoría SEO técnica y descubre por qué tu sitio web no convierte." />
      </Helmet>

      <GlassNavbar />
      
      <main style={{ paddingTop: '150px', paddingBottom: '100px', position: 'relative' }}>
        
        {/* Abstract Background Elements */}
        <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--neon) 0%, transparent 70%)', opacity: 0.05, filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, #ff00ff 0%, transparent 70%)', opacity: 0.03, filter: 'blur(50px)', zIndex: 0 }} />

        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left side: Copy & Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--neon-glow)', border: '1px solid rgba(224,255,49,0.3)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', color: 'var(--neon)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 800 }}>
                Recurso Gratuito
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Por qué tu web tiene visitas pero <span style={{ color: 'var(--danger)' }}>cero ventas.</span>
              </h1>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Descarga la checklist técnica exacta que usamos para auditar a nuestros clientes de alto valor. Descubre los 10 errores mortales que están matando tu conversión.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
                {['Auditoría UX/UI', 'Tiempos de carga', 'Errores de Copywriting', 'Fugas de tráfico'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 500 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '15px' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right side: Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-medium)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '3rem',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--neon)' }} />
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '2rem 0' }}
                  >
                    <div style={{ width: '80px', height: '80px', background: 'var(--neon-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>¡Enviado a tu correo!</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Revisa tu bandeja de entrada (y la de spam por si acaso). Te enviamos el link de descarga directo.</p>
                  </motion.div>
                ) : (
                  <>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Acceso Inmediato</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Ingresa tu correo profesional para recibir el PDF al instante.</p>
                    
                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="email" style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>Correo Electrónico</label>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@empresa.com"
                          style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: 'var(--bg-void)',
                            border: '1px solid var(--border-strong)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--neon)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--border-strong)'}
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '1.2rem',
                          background: 'var(--neon)',
                          color: '#000',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1.1rem',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          boxShadow: '0 10px 20px rgba(224,255,49,0.2)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        Enviar Checklist Ahora →
                      </button>
                      
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '1.5rem' }}>
                        Al descargar aceptas recibir nuestros correos con estrategias de conversión. Cero spam, 100% valor.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
