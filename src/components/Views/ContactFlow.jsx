import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

export default function ContactFlow({ setView }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', url: '', scope: '', budget: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [isFocused, setIsFocused] = useState(false);

  const scopes = [
    { id: 'traffic', label: 'Tráfico Meta Ads', desc: 'Sistemas de adquisición predictiva.' },
    { id: 'branding', label: 'Identidad y Copy', desc: 'Narrativa para escalar precios.' },
    { id: 'ecosystem', label: 'Desarrollo Web React', desc: 'Ecosistemas de ultra conversión.' },
    { id: 'dominance', label: 'Dominación Integral', desc: 'Operación completa 360º.' }
  ];

  const budgets = [
    { id: 'base', label: '$15,000 - $30,000 MXN', desc: 'Arranque Sólido y Posicionamiento' },
    { id: 'pro', label: '$30,000 - $60,000 MXN', desc: 'Sistemas de Tráfico y Escalamiento' },
    { id: 'elite', label: '+$60,000 MXN', desc: 'Dominio de Mercado Completo' }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && !formData.email) return;
    if (step === 3 && !formData.scope) return;
    
    setStep(prev => prev + 1);
  };

  const handleScopeSelect = (scopeId) => {
    setFormData({ ...formData, scope: scopeId });
  };

  const handleBudgetSelect = (budgetId) => {
    setFormData({ ...formData, budget: budgetId });
  };

  const submitForm = () => {
    if (!formData.budget) return;
    setStatus('loading');
    // Simular el proceso de envío a servidor / Firebase
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  const formVariants = {
    enter: { opacity: 0, x: 50, filter: 'blur(10px)' },
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -50, filter: 'blur(10px)', transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; } 
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
      
      <Helmet>
        <title>Iniciar Operación | Contacto Persuasivo</title>
        <meta name="description" content="Inicia el diagnóstico de facturación y auditoría de identidad magnética." />
      </Helmet>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100vh', position: 'relative' }}>

      {/* Luz Ambiental / Foco Holográfico detrás del formulario */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(224, 255, 49, 0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 }}
        style={{
          zIndex: 1, width: '100%', maxWidth: '600px', padding: '3rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)', borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {status !== 'success' && status !== 'loading' && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ 
                height: '4px', flex: 1, borderRadius: '2px',
                background: step >= i ? '#E0FF31' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease',
                boxShadow: step >= i ? '0 0 10px rgba(224,255,49,0.5)' : 'none'
              }} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 0' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                style={{ width: '80px', height: '80px', background: 'rgba(224, 255, 49, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E0FF31" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              <h2 style={{ fontSize: '2rem', color: '#fff', margin: '0 0 1rem 0' }}>En la mira.</h2>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.5, margin: 0 }}>Datos cifrados y recibidos. Ejecutaremos auditoría inicial y nuestro equipo cerrará contacto.</p>
            </motion.div>
          ) : status === 'loading' ? (
             <motion.div 
               key="loading"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}
             >
               <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #E0FF31', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }} />
               <p style={{ color: '#E0FF31', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Asegurando Ecosistema...</p>
             </motion.div>
          ) : (
            <motion.form 
              key={`step-${step}`}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onSubmit={step === 4 ? (e) => { e.preventDefault(); submitForm(); } : handleNext}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* HEADER DINÁMICO */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  {step === 1 && "Identidad Quirúrgica"}
                  {step === 2 && "Trazar el Blanco"}
                  {step === 3 && "Vector de Ataque"}
                  {step === 4 && "Filtro de Inversión"}
                </h1>
                <p style={{ marginTop: '1rem', color: '#888', fontSize: '1.05rem', lineHeight: 1.5 }}>
                  {step === 1 && "Solo tratamos con tomadores de decisiones. Tu correo principal."}
                  {step === 2 && "Ingresa la URL de tu empresa. Si vienes a construir desde cero, sáltate este paso."}
                  {step === 3 && "¿Cómo vamos a escalar tu infraestructura? Selecciona el scope."}
                  {step === 4 && "Filtro final. Selecciona el rango de capital asignado para escalar tu proyecto de forma seria."}
                </p>
              </div>

              {/* CONTENIDO DEL PASO */}
              {step === 1 && (
                <motion.div 
                  animate={{ borderColor: isFocused ? 'rgba(224, 255, 49, 0.6)' : 'rgba(255,255,255,0.08)' }}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', borderRadius: '9999px', border: '1px solid', boxShadow: isFocused ? '0 0 20px rgba(224, 255, 49, 0.2), inset 0 5px 15px rgba(0,0,0,0.8)' : 'inset 0 5px 15px rgba(0,0,0,0.8)', transition: 'box-shadow 0.3s ease' }}
                >
                  <input type="email" placeholder="ej. director@apple.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.1rem', padding: '1.2rem 2rem', outline: 'none', fontFamily: 'inherit' }} required autoFocus />
                </motion.div>
              )}

              {step === 2 && (
                <>
                  <motion.div 
                    animate={{ borderColor: isFocused ? 'rgba(224, 255, 49, 0.6)' : 'rgba(255,255,255,0.08)' }}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', borderRadius: '9999px', border: '1px solid', boxShadow: isFocused ? '0 0 20px rgba(224, 255, 49, 0.2), inset 0 5px 15px rgba(0,0,0,0.8)' : 'inset 0 5px 15px rgba(0,0,0,0.8)', transition: 'box-shadow 0.3s ease' }}
                  >
                    <input type="text" placeholder="ej. miempresa.com" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.1rem', padding: '1.2rem 2rem', outline: 'none', fontFamily: 'inherit' }} autoFocus />
                  </motion.div>
                  <div style={{ textAlign: 'center', marginTop: '-0.5rem' }}>
                    <motion.button 
                      type="button"
                      whileHover={{ borderColor: 'rgba(224, 255, 49, 0.3)', color: '#fff' }}
                      onClick={() => { setFormData({...formData, url: 'Proyecto desde cero'}); setStep(3); }}
                      style={{ background: 'transparent', color: '#888', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s' }}
                    >
                      Aún no tengo un activo digital
                    </motion.button>
                  </div>
                </>
              )}

              {step === 3 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {scopes.map(s => (
                    <motion.div
                      key={s.id}
                      onClick={() => handleScopeSelect(s.id)}
                      whileHover={{ scale: formData.scope === s.id ? 1.02 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        background: formData.scope === s.id ? 'rgba(224, 255, 49, 0.1)' : 'rgba(255,255,255,0.03)',
                        border: formData.scope === s.id ? '1px solid rgba(224, 255, 49, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: formData.scope === s.id ? '0 0 20px rgba(224, 255, 49, 0.15)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column'
                      }}
                    >
                      <h4 style={{ margin: 0, color: formData.scope === s.id ? '#E0FF31' : '#fff', fontSize: '1.1rem', fontWeight: 800 }}>{s.label}</h4>
                      <p style={{ margin: '0.3rem 0 0 0', color: formData.scope === s.id ? '#ddd' : '#888', fontSize: '0.9rem' }}>{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {budgets.map(b => (
                    <motion.div
                      key={b.id}
                      onClick={() => handleBudgetSelect(b.id)}
                      whileHover={{ scale: formData.budget === b.id ? 1.02 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        background: formData.budget === b.id ? 'rgba(224, 255, 49, 0.1)' : 'rgba(255,255,255,0.03)',
                        border: formData.budget === b.id ? '1px solid rgba(224, 255, 49, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: formData.budget === b.id ? '0 0 20px rgba(224, 255, 49, 0.15)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column'
                      }}
                    >
                      <h4 style={{ margin: 0, color: formData.budget === b.id ? '#E0FF31' : '#fff', fontSize: '1.1rem', fontWeight: 800 }}>{b.label}</h4>
                      <p style={{ margin: '0.3rem 0 0 0', color: formData.budget === b.id ? '#ddd' : '#888', fontSize: '0.9rem' }}>{b.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* BOTONES */}
              {/* BOTONES */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {step > 1 && (
                   <motion.button type="button" onClick={() => setStep(step - 1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '1.2rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}>
                     ←
                   </motion.button>
                )}
                
                <motion.button
                  type="submit"
                  disabled={(step === 3 && !formData.scope) || (step === 4 && !formData.budget)}
                  whileHover={{ scale: ((step === 3 && !formData.scope) || (step === 4 && !formData.budget)) ? 1 : 1.02 }}
                  whileTap={{ scale: ((step === 3 && !formData.scope) || (step === 4 && !formData.budget)) ? 1 : 0.98 }}
                  style={{
                    flex: 1, background: 'linear-gradient(180deg, #E0FF31 0%, #B8D900 100%)',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 10px 30px rgba(224, 255, 49, 0.3)',
                    color: '#000', border: 'none', padding: '1.2rem', borderRadius: '9999px', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                    cursor: ((step === 3 && !formData.scope) || (step === 4 && !formData.budget)) ? 'not-allowed' : 'pointer',
                    opacity: ((step === 3 && !formData.scope) || (step === 4 && !formData.budget)) ? 0.5 : 1,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px'
                  }}
                >
                  {step < 4 ? 'Avanzar →' : 'Ejecutar Solicitud'}
                </motion.button>
              </div>

            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
      
      {/* Footer Minimalista Inyectado */}
      <div style={{ padding: '0 5vw' }}>
        <Footer setView={setView} />
      </div>
    </motion.div>
  );
}
