import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { createClient } from '@supabase/supabase-js';
import Footer from '../Navigation/Footer';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ContactFlow({ setView }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', url: '', scope: [], budget: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [isFocused, setIsFocused] = useState(false);

  const scopes = [
    { id: 'meta_ads', label: 'Campañas Meta Ads', desc: 'Adquisición de prospectos calificados en frío. (Desde $2,700/mes)' },
    { id: 'redes', label: 'Gestión de Redes Sociales', desc: 'Posicionamiento y fidelización de marca. ($4,500/mes)' },
    { id: 'landing', label: 'Landing Page de Alta Conversión', desc: 'Activo digital estático estructurado para venta. ($6,500 único)' },
    { id: 'web_copy', label: 'Ecosistema Web 360 & Copywriting', desc: 'Desarrollo web corporativo completo. (Cotización a la medida)' }
  ];

  const budgets = [
    { id: 'base', label: 'Inversión de Arranque', desc: 'Para activar campañas, redes sociales o landing pages base. (< $10,000)' },
    { id: 'pro', label: 'Fase de Escalamiento', desc: 'Operación paralela de distintos servicios para dominar tu nicho. ($10k - $25k)' },
    { id: 'elite', label: 'Dominio de Mercado Completamente Custom', desc: 'Sistemas complejos Web3/SaaS con alto nivel de carga ingenieril. (Flexible)' }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && !formData.email) return;
    if (step === 3 && formData.scope.length === 0) return;
    
    setStep(prev => prev + 1);
  };

  const handleScopeSelect = (scopeId) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.includes(scopeId) ? prev.scope.filter(s => s !== scopeId) : [...prev.scope, scopeId]
    }));
  };

  const handleBudgetSelect = (budgetId) => {
    setFormData({ ...formData, budget: budgetId });
  };

  const submitForm = async () => {
    if (!formData.budget) return;
    setStatus('loading');
    
    try {
      await fetch("https://formsubmit.co/ajax/hola@persuasivo.mx", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Email: formData.email,
            URL_Empresa: formData.url,
            Vector_Elegido: formData.scope.join(', '),
            Filtro_Inversion: formData.budget,
            _subject: "NUEVO LEAD CALIFICADO - The Factory Persuasivo"
        })
      });
      // Inyección NATIVA a Supabase para sonar la campana en cualquier servidor
      try {
        await supabase.from('crm_tasks').insert([{
           title: `${formData.url || formData.email.split('@')[0]} - ${formData.scope.map(s => s === 'meta_ads' ? 'Ads' : s === 'redes' ? 'Social' : s === 'landing' ? 'Landing' : 'Web').join('+')}`,
           column_state: 'Backlog',
           priority: 'Alta',
           description: `**LEAD ENTRANTE (LANDING PAGE)**\n\n- **Email Principal:** ${formData.email}\n- **URL/Empresa:** ${formData.url || 'N/A'}\n- **Inversión:** ${formData.budget}\n- **Servicios:** ${formData.scope.join(', ')}`
        }]);
      } catch (crmError) {
        console.log("Error de inyección supabase CRM", crmError);
      }
      setStatus('success');
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      // Even on adblocker network errors, we want to show success to the user so they feel heard.
      setStatus('success');
    }
  };

  const formVariants = {
    enter: { opacity: 0, x: 20, filter: 'blur(5px)' },
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, filter: 'blur(5px)', transition: { duration: 0.15, ease: 'easeIn' } }
  };

  return (
    <motion.div 
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100%',
        height: '100vh',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; } 
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Mobile fixes for tall forms */
        .form-safe-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          position: relative;
          padding: max(100px, 12vh) 20px 100px 20px;
          box-sizing: border-box;
        }

        .form-card {
          margin: 0 auto auto auto;
          z-index: 1;
          width: 100%;
          max-width: 600px;
          padding: clamp(1.5rem, 5vw, 3rem);
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
        }
      `}</style>
      
      <Helmet>
        <title>Iniciar Operación | Contacto Persuasivo</title>
        <meta name="description" content="Inicia el diagnóstico de facturación y auditoría de identidad magnética." />
      </Helmet>

      <div className="form-safe-wrapper">

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
        className="form-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 }}
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
                <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  {step === 1 && "Identidad Quirúrgica"}
                  {step === 2 && "Trazar el Blanco"}
                  {step === 3 && "Vector de Ataque"}
                  {step === 4 && "Filtro de Inversión"}
                </h1>
                <p style={{ marginTop: '1rem', color: '#888', fontSize: 'clamp(0.9rem, 3vw, 1.05rem)', lineHeight: 1.5 }}>
                  {step === 1 && "Solo tratamos con tomadores de decisiones. Tu correo principal."}
                  {step === 2 && "Ingresa la URL de tu corporativo (si existe). Si vienes a construir desde cero, sáltate este paso."}
                  {step === 3 && "¿En qué vectores necesitas fuerza operativa bruta? Puedes seleccionar múltiples opciones."}
                  {step === 4 && "Filtro comercial final. Requerimos ubicarnos en un espectro de inversión para ensamblar la propuesta."}
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
                      whileHover={{ scale: formData.scope.includes(s.id) ? 1.02 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        background: formData.scope.includes(s.id) ? 'rgba(224, 255, 49, 0.1)' : 'rgba(255,255,255,0.03)',
                        border: formData.scope.includes(s.id) ? '1px solid rgba(224, 255, 49, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: formData.scope.includes(s.id) ? '0 0 20px rgba(224, 255, 49, 0.15)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column'
                      }}
                    >
                      <h4 style={{ margin: 0, color: formData.scope.includes(s.id) ? '#E0FF31' : '#fff', fontSize: '1.1rem', fontWeight: 800 }}>{s.label}</h4>
                      <p style={{ margin: '0.3rem 0 0 0', color: formData.scope.includes(s.id) ? '#ddd' : '#888', fontSize: '0.9rem' }}>{s.desc}</p>
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
                  disabled={(step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)}
                  whileHover={{ scale: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 1 : 1.02 }}
                  whileTap={{ scale: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 1 : 0.98 }}
                  style={{
                    flex: 1, background: 'linear-gradient(180deg, #E0FF31 0%, #B8D900 100%)',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 10px 30px rgba(224, 255, 49, 0.3)',
                    color: '#000', border: 'none', padding: '1.2rem', borderRadius: '9999px', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                    cursor: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 'not-allowed' : 'pointer',
                    opacity: ((step === 3 && formData.scope.length === 0) || (step === 4 && !formData.budget)) ? 0.5 : 1,
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
