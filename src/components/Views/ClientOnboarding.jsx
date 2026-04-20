import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { createClient } from '@supabase/supabase-js';
import ABVoiceInput from './ABVoiceInput';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const defaultData = {
  projectType: '',
  companyName: '',
  salesPhone: '',
  currentWebsite: '',
  socialMedia: '',
  isPhysical: null,
  address: '',
  competitors: '',
  buyerPersona: [],
  painPoint: '',
  hook: '',
  authority: '',
  ticket: '',
  brandVoice: '',
  servicesList: '',
  cta: '',
  leadEmail: '',
  leadFields: ['Nombre Completo', 'WhatsApp'],
  customLeadField: '',
  trafficSource: [],
  assetsLink: '',
  honeypot: '' // Anti-bot trap field
};

export default function ClientOnboarding({ setView }) {
  const [step, setStep] = useState(1);
  const autoAdvanceTimeout = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState(defaultData);
  const [isDragging, setIsDragging] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  // 1. Rehydrate from LocalStorage (Anti-Accident)
  useEffect(() => {
    const savedData = localStorage.getItem('persuasivo_onboarding_v2');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Only load if it's an actual partial form filling
        if (parsed && parsed.projectType) {
           setFormData(parsed);
        }
      } catch (e) {}
    }
  }, []);

  // 2. Auto-Save to LocalStorage
  useEffect(() => {
    // Only save if they started filling it
    if (formData.projectType) {
      localStorage.setItem('persuasivo_onboarding_v2', JSON.stringify(formData));
    }
  }, [formData]);

  const nextStep = () => {
    if (autoAdvanceTimeout.current) clearTimeout(autoAdvanceTimeout.current);
    setStep(s => s + 1);
  };
  const prevStep = () => {
    if (autoAdvanceTimeout.current) clearTimeout(autoAdvanceTimeout.current);
    setStep(s => s - 1);
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleLeadField = (field) => {
    let currentFields = Array.isArray(formData.leadFields) ? formData.leadFields : [];
    if (currentFields.includes(field)) {
      setFormData({ ...formData, leadFields: currentFields.filter(f => f !== field) });
    } else {
      setFormData({ ...formData, leadFields: [...currentFields, field] });
    }
  };

  const handleSingularSelection = (field, value, doAutoAdvance = true) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (doAutoAdvance) {
      if (autoAdvanceTimeout.current) clearTimeout(autoAdvanceTimeout.current);
      autoAdvanceTimeout.current = setTimeout(() => nextStep(), 1500); // 1.5s delay to engrave the visual neon confirmation
    }
  };

  const handleMultipleSelection = (field, value) => {
    setFormData(prev => {
      const currentList = Array.isArray(prev[field]) ? prev[field] : [];
      if (currentList.includes(value)) {
        return { ...prev, [field]: currentList.filter(v => v !== value) };
      }
      return { ...prev, [field]: [...currentList, value] };
    });
  };

  const submitForm = async () => {
    // SECURITY: If honeypot is filled, shadow-ban (fake success) so bots don't know they failed.
    if (formData.honeypot !== '') {
       setIsDone(true);
       setStep(14);
       localStorage.removeItem('persuasivo_onboarding_v2');
       return;
    }

    setIsSubmitting(true);
    let logoUrl = null;
    
    // 1. Upload Logo if exists
    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${Date.now()}_${formData.companyName.replace(/\s+/g, '')}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('client-logos')
        .upload(fileName, logoFile);
        
      if (!uploadError) {
         const { data: publicUrlData } = supabase.storage.from('client-logos').getPublicUrl(fileName);
         logoUrl = publicUrlData.publicUrl;
      }
    }

    // Join array into string for the database payload
    const leadFieldsStr = Array.isArray(formData.leadFields) ? formData.leadFields.join(', ') : formData.leadFields;
    const finalLeadFields = formData.customLeadField 
      ? (leadFieldsStr ? `${leadFieldsStr}, [Dato Especial: ${formData.customLeadField}]` : `[Dato Especial: ${formData.customLeadField}]`)
      : leadFieldsStr;

    // 2. Package ALL strategic matrix fields into the JSONB 'services' column without breaking DB schema.
    const strategicMatrix = {
      list: formData.servicesList.split('\n'),
      is_physical: formData.isPhysical,
      address: formData.address,
      competitors: formData.competitors,
      buyer_persona: formData.buyerPersona,
      ticket_range: formData.ticket,
      brand_voice: formData.brandVoice,
      lead_email: formData.leadEmail,
      lead_fields: finalLeadFields,
      traffic_source: formData.trafficSource,
      assets_link: formData.assetsLink,
      current_website: formData.currentWebsite,
      social_media: formData.socialMedia
    };

    // 3. Submit Data
    const { error } = await supabase
      .from('onboarding_queue')
      .insert([
        {
          project_type: formData.projectType,
          company_name: formData.companyName,
          sales_phone: formData.salesPhone,
          pain_point: formData.painPoint,
          hook: formData.hook,
          authority: formData.authority,
          services: strategicMatrix,
          cta: formData.cta,
          logo_url: logoUrl
        }
      ]);

    if (!error) {
       // --- INYECCIÓN A CRM KANBAN PARA ACTIVAR CAMPANA ---
       await supabase.from('crm_tasks').insert([{
          title: `ONBOARDING V2: ${formData.companyName}`,
          column_state: 'Backlog',
          priority: 'Alta',
          description: `**NUEVO CLIENTE CERRADO VÍA ONBOARDING**\n\n- **Empresa:** ${formData.companyName}\n- **Contacto:** ${formData.salesPhone}\n- **Servicio:** ${formData.projectType}\n\n*El cliente ha completado la ingesta de datos y está listo para fase de Kickoff.*`
       }]);

       // --- RESPALDO: ENVIAR POR CORREO (FormSubmit) ---
       try {
         await fetch("https://formsubmit.co/ajax/hola@persuasivo.mx", {
           method: "POST",
           headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
           body: JSON.stringify({
             Proyecto: formData.projectType,
             Empresa: formData.companyName,
             Whatsapp: formData.salesPhone,
             PuntoDeDolor: formData.painPoint,
             SalsaSecreta_Hook: formData.hook,
             Autoridad: formData.authority,
             Servicios: strategicMatrix,
             Llamado_Accion: formData.cta,
             Assets: formData.assetsLink,
             _subject: `💎 ONBOARDING COMPLETADO - ${formData.companyName}`
           })
         });
       } catch(e) {
         console.error("Fallo el envio de correo de respaldo");
       }

       setIsDone(true);
       setStep(14); // Final Step
       localStorage.removeItem('persuasivo_onboarding_v2'); // Clean memory
    } else {
       alert("Hubo un error de conexión con los bóvedas corporativas, intenta de nuevo.");
    }
    setIsSubmitting(false);
  };

  const stepAnimations = {
    initial: { opacity: 0, y: 20, filter: 'blur(5px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.15, ease: 'easeIn' } }
  };

  const TOTAL_STEPS = 13; // Form Steps (14 is success)

  return (
    <div className="onboarding-safe-wrapper">
      <Helmet>
        <title>Inicio de Proyecto | Persuasivo</title>
        {/* Anti-Bot Google Indexing Protection */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      {/* Background cinematic lights */}
      <div style={{ position: 'absolute', top: '20%', left: '30%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(224,255,49,0.05) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0 }} />

      <style>{`
        ::-webkit-scrollbar { width: 0px; } 

        .onboarding-safe-wrapper {
          width: 100%;
          height: 100vh;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
          padding: max(100px, 12vh) 0 100px 0;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }

        .onboarding-card {
          z-index: 10;
          width: 100%;
          max-width: 700px;
          padding: 0 clamp(1rem, 5vw, 2rem);
          margin: auto;
        }
      `}</style>

      <div className="onboarding-card">
        
        {/* Magic Progress Indicator */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '3rem', justifyContent: 'center' }}>
           {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
             const i = idx + 1;
             return (
               <motion.div 
                 key={i} 
                 animate={{ 
                   width: step === i ? '40px' : '10px', 
                   background: step >= i ? '#E0FF31' : 'rgba(255,255,255,0.1)' 
                 }}
                 style={{ height: '4px', borderRadius: '10px' }}
               />
             )
           })}
        </div>

        <AnimatePresence mode="wait">

          {/* SECURITY: Invisible Honeypot Field */}
          <input 
            type="text" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={handleTextChange} 
            style={{ opacity: 0, position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1 }} 
            tabIndex="-1" 
            autoComplete="off" 
          />

          {step === 1 && (
            <motion.div key="step1" {...stepAnimations} style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                ¡Bienvenido a Persuasivo!
              </h2>
              <p style={{ color: '#888', marginBottom: '3rem' }}>¿Qué tipo de ecosistema vas a forjar con nosotros hoy?</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button 
                  onClick={() => handleSingularSelection('projectType', 'Landing')}
                  style={{ background: formData.projectType === 'Landing' ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.projectType === 'Landing' ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: formData.projectType === 'Landing' ? '0 0 20px rgba(224,255,49,0.4)' : 'none', padding: '2rem', borderRadius: '24px', color: '#fff', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>⚡️</span>
                  Landing Page
                </button>
                <button 
                  onClick={() => handleSingularSelection('projectType', 'Website')}
                  style={{ background: formData.projectType === 'Website' ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.projectType === 'Website' ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: formData.projectType === 'Website' ? '0 0 20px rgba(224,255,49,0.4)' : 'none', padding: '2rem', borderRadius: '24px', color: '#fff', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🏢</span>
                  Sitio Web Empresa
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Sobre tu Negocio
              </h2>
              <p style={{ color: '#888', marginBottom: '2rem' }}>Queremos conocerte para generar confianza en tus prospectos.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <p style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Nombre de Empresa o Proyecto</p>
                  <input 
                    autoFocus
                    name="companyName" value={formData.companyName} onChange={handleTextChange}
                    placeholder="Ej. Tacos El Paisa" 
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.8rem', padding: '0.5rem 0', outline: 'none' }}
                  />
                </div>
                <div>
                  <p style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Tu WhatsApp (Para contactarte rápido)</p>
                  <input 
                    name="salesPhone" value={formData.salesPhone} onChange={handleTextChange}
                    placeholder="+52..." 
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.5rem', padding: '0.5rem 0', outline: 'none' }}
                  />
                </div>
                <div>
                  <p style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Tu Página Web Actual <span style={{opacity:0.5}}>(Opcional)</span></p>
                  <input 
                    name="currentWebsite" value={formData.currentWebsite} onChange={handleTextChange}
                    placeholder="www.tusitio.com" 
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.2rem', padding: '0.5rem 0', outline: 'none' }}
                  />
                </div>
                <div>
                  <p style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Tus Redes Sociales <span style={{opacity:0.5}}>(Opcional)</span></p>
                  <input 
                    name="socialMedia" value={formData.socialMedia} onChange={handleTextChange}
                    placeholder="Instagram / Facebook link" 
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.2rem', padding: '0.5rem 0', outline: 'none' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                ¿Es un Negocio Físico?
              </h2>
              <p style={{ color: '#888', marginBottom: '3rem' }}>¿Recibes clientes en un local o clínica (Google Maps)?</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => handleSingularSelection('isPhysical', true, false)} // No auto-advance because they need to type address now
                  style={{ background: formData.isPhysical === true ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.isPhysical === true ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: formData.isPhysical === true ? '0 0 20px rgba(224,255,49,0.4)' : 'none', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📍</span>
                  <div style={{ color: '#fff', fontWeight: 600 }}>Sí, tenemos local</div>
                </button>
                <button
                  onClick={() => { 
                    setFormData({ ...formData, isPhysical: false, address: '' }); 
                    if (autoAdvanceTimeout.current) clearTimeout(autoAdvanceTimeout.current);
                    autoAdvanceTimeout.current = setTimeout(() => nextStep(), 1500); 
                  }}
                  style={{ background: formData.isPhysical === false ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.isPhysical === false ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: formData.isPhysical === false ? '0 0 20px rgba(224,255,49,0.4)' : 'none', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🌐</span>
                  <div style={{ color: '#fff', fontWeight: 600 }}>No, soy 100% Digital</div>
                </button>
              </div>

              <AnimatePresence>
                {formData.isPhysical && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <input 
                      autoFocus
                      name="address" value={formData.address} onChange={handleTextChange}
                      placeholder="Dirección completa o Link de Google Maps" 
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.5rem', padding: '1rem 0', outline: 'none' }}
                      onKeyDown={e => e.key === 'Enter' && nextStep()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Vigílando a la Competencia
              </h2>
              <p style={{ color: '#888', marginBottom: '1rem' }}>¿Quién es tu mayor competencia o a qué empresa admiras profundamente?</p>
              <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '3rem' }}>Esta información nos sirve de brújula visual para saber a qué nivel corporativo vamos a competir (y superar).</p>
              
              <input 
                autoFocus
                name="competitors" value={formData.competitors} onChange={handleTextChange}
                placeholder="Ej. Apple, Tesla, La clínica de enfrente..." 
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.5rem', padding: '1rem 0', outline: 'none' }}
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Tu Comprador Ideal
              </h2>
              <p style={{ color: '#888', marginBottom: '1rem' }}>¿Quién es la persona que suele comprarte más o pagarte mejor?</p>
              <p style={{ color: '#E0FF31', opacity: 0.8, fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem' }}>*Puedes seleccionar más de una opción</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { id: 'b2b', icon: '🏢', label: 'B2B Corporativo', desc: 'Le vendo a otras empresas o directivos.' },
                  { id: 'premium', icon: '💎', label: 'Mercado Premium', desc: 'Clientes con de alto poder adquisitivo.' },
                  { id: 'mass', icon: '👨‍👩‍👧', label: 'Público Masivo', desc: 'Familias, volumen alto, personas comunes.' },
                  { id: 'young', icon: '⚡️', label: 'Audiencia Joven', desc: 'Gen Z, dinámico, rápido y estético.' }
                ].map(opt => {
                  const isSelected = Array.isArray(formData.buyerPersona) && formData.buyerPersona.includes(opt.label);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleMultipleSelection('buyerPersona', opt.label)}
                      style={{ background: isSelected ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isSelected ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: isSelected ? '0 0 20px rgba(224,255,49,0.3)' : 'none', borderRadius: '16px', padding: '1.2rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{opt.label}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.3rem' }}>{opt.desc}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="step6" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                El Dolor de Tus Clientes
              </h2>
              <p style={{ color: '#888', marginBottom: '1rem' }}>¿Qué problema tienen las personas que los obliga a buscar tu negocio?</p>
              <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '3rem' }}>No te preocupes si no suena perfecto, nuestros Copywriters expertos lo pulirán en la redacción final.</p>
              
              <ABVoiceInput 
                name="painPoint" value={formData.painPoint} onChange={handleTextChange}
                placeholder="Ej. Mis clientes sufren porque su contador actual no les responde a tiempo..." 
              />
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="step7" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Tu Oferta Irresistible
              </h2>
              <p style={{ color: '#888', marginBottom: '3rem' }}>¿Por qué tus clientes deberían comprarte a ti y no a tu competencia?</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ABVoiceInput 
                  name="hook" value={formData.hook} onChange={handleTextChange} rows={2}
                  placeholder="Tu gran promesa (Ej. Ordenamos tu contabilidad en 5 días o te devolvemos tu dinero)" 
                  stepIndicator="1 de 2"
                />
                <ABVoiceInput 
                  name="authority" value={formData.authority} onChange={handleTextChange} rows={2}
                  placeholder="Tu respaldo (Ej. Tenemos +10 años de experiencia...)" 
                  stepIndicator="2 de 2"
                />
              </div>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div key="step8" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Precio y Percepción
              </h2>
              <p style={{ color: '#888', marginBottom: '1rem' }}>¿En qué rango de precio ofreces tus servicios?</p>
              
              {/* Strategic Disclaimer */}
              <div style={{ background: 'rgba(224,255,49,0.03)', borderLeft: '3px solid rgba(224,255,49,0.5)', padding: '1rem', marginBottom: '2rem' }}>
                 <p style={{ color: '#ccc', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                   <strong>¿Por qué preguntamos esto?</strong> Una marca "High-Ticket" requiere un diseño que transmita escasez, autoridad radical y flujos de evaluación (agendar llamadas). Si tu producto es económico, usamos metodologías de impulso rápido directo a carrito de compras.
                 </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { id: 'low', label: 'Económico / Masivo (Competitivo en precio)' },
                  { id: 'mid', label: 'Rango Medio (Relación Calidad/Precio estándar)' },
                  { id: 'high', label: 'High-Ticket Premium (Costoso, Exclusivo o B2B)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSingularSelection('ticket', opt.label)}
                    style={{ background: formData.ticket === opt.label ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.ticket === opt.label ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: formData.ticket === opt.label ? '0 0 20px rgba(224,255,49,0.3)' : 'none', borderRadius: '16px', padding: '1.2rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    <div style={{ color: '#fff', fontWeight: 600 }}>{opt.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 9 && (
            <motion.div key="step9" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                La Voz de tu Marca
              </h2>
              <p style={{ color: '#888', marginBottom: '3rem' }}>Si tu negocio fuera una persona atendiendome en persona, ¿cómo me hablaría?</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { id: 'pro', icon: '👔', label: 'Serio y Corporativo', desc: 'Confiable, formal, institucional.' },
                  { id: 'wolf', icon: '🎯', label: 'Directo y Persuasivo', desc: 'Agresivo a resultados automáticos.' },
                  { id: 'friendly', icon: '🤝', label: 'Amigable y Cálido', desc: 'Te abraza y soluciona dudas con empatía.' },
                  { id: 'tech', icon: '🤖', label: 'Disruptivo / Tech', desc: 'Vanguardista, breve, minimalista.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSingularSelection('brandVoice', opt.label)}
                    style={{ background: formData.brandVoice === opt.label ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.brandVoice === opt.label ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: formData.brandVoice === opt.label ? '0 0 20px rgba(224,255,49,0.3)' : 'none', borderRadius: '16px', padding: '1.2rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{opt.label}</div>
                    <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.3rem' }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 10 && (
            <motion.div key="step10" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                El Objetivo Principal
              </h2>
              <p style={{ color: '#888', marginBottom: '3rem' }}>Lista tus productos y elige qué quieres que hagan en tu página.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ABVoiceInput 
                  name="servicesList" value={formData.servicesList} onChange={handleTextChange} rows={4}
                  placeholder="Lista o dicta tus servicios estrella..." 
                />
                
                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, marginTop: '1rem' }}>Acción de Conversión experta que detonaremos:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { id: 'whatsapp', icon: '💬', label: 'Escribirme por WhatsApp', desc: 'Rápido y directo' },
                    { id: 'llamada', icon: '📅', label: 'Agendar Videollamada', desc: 'Filtrar prospectos B2B' },
                    { id: 'ventas', icon: '💳', label: 'Venta Directa (Tienda)', desc: 'E-commerce automatizado' },
                    { id: 'leads', icon: '📝', label: 'Formulario de Contacto', desc: 'Captura de correos' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleSingularSelection('cta', option.label)}
                      style={{ 
                        background: formData.cta === option.label ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', 
                        border: `1px solid ${formData.cta === option.label ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, 
                        boxShadow: formData.cta === option.label ? '0 0 20px rgba(224,255,49,0.3)' : 'none',
                        borderRadius: '16px', padding: '1rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s' 
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{option.icon}</div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{option.label}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.2rem' }}>{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 11 && (
            <motion.div key="step11" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Captura de Prospectos
              </h2>
              <p style={{ color: '#888', marginBottom: '3rem' }}>Si integramos formularios de alta conversión, ¿a dónde mandamos a tu prospecto y qué le preguntamos?</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input 
                  autoFocus
                  name="leadEmail" value={formData.leadEmail} onChange={handleTextChange}
                  placeholder="El correo exacto donde recibirás los avisos de ventas" 
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.5rem', padding: '1rem 0', outline: 'none' }}
                />
                
                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, marginTop: '1rem' }}>Datos que el prospecto te debe dejar:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem' }}>
                  {['Nombre Completo', 'WhatsApp', 'Correo Electrónico', 'Ciudad / País', 'Presupuesto'].map(field => {
                    const isSelected = Array.isArray(formData.leadFields) && formData.leadFields.includes(field);
                    return (
                      <button
                        key={field}
                        onClick={() => toggleLeadField(field)}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '100px', border: `1px solid ${isSelected ? '#E0FF31' : 'rgba(255,255,255,0.2)'}`, boxShadow: isSelected ? '0 0 20px rgba(224,255,49,0.3)' : 'none', background: isSelected ? 'rgba(224,255,49,0.1)' : 'transparent', color: isSelected ? '#E0FF31' : '#fff', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
                      >
                        {isSelected ? '✓ ' : '+ '} {field}
                      </button>
                    )
                  })}
                </div>
                
                <input 
                  name="customLeadField" value={formData.customLeadField} onChange={handleTextChange}
                  placeholder="¿Requieres un dato muy especial? (Ej. Tipo de Vehículo, Fecha de Boda...)" 
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1.2rem', padding: '1.5rem', outline: 'none' }}
                />
              </div>
            </motion.div>
          )}

          {step === 12 && (
            <motion.div key="step12" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Estrategia de Tráfico
              </h2>
              <p style={{ color: '#888', marginBottom: '1rem' }}>¿De dónde vendrán las personas que visitarán esta página?</p>
              <p style={{ color: '#E0FF31', opacity: 0.8, fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem' }}>*Puedes seleccionar más de una opción</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { id: 'meta', icon: '📱', label: 'Campañas Meta Ads', desc: 'Anuncios en Facebook e Instagram.' },
                  { id: 'google', icon: '🔍', label: 'Google Ads / SEO', desc: 'Búsquedas por intención o palabras clave.' },
                  { id: 'organic', icon: '📹', label: 'Contenido Orgánico', desc: 'Tráfico desde TikTok, Reels, YouTube.' },
                  { id: 'direct', icon: '🤝', label: 'Networking Directo', desc: 'Se la enviaré por WhatsApp o juntas B2B.' }
                ].map(opt => {
                  const isSelected = Array.isArray(formData.trafficSource) && formData.trafficSource.includes(opt.label);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleMultipleSelection('trafficSource', opt.label)}
                      style={{ background: isSelected ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isSelected ? '#E0FF31' : 'rgba(255,255,255,0.1)'}`, boxShadow: isSelected ? '0 0 20px rgba(224,255,49,0.3)' : 'none', borderRadius: '16px', padding: '1.2rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{opt.label}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.3rem' }}>{opt.desc}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 13 && (
            <motion.div key="step13" {...stepAnimations}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Tu Material Visual
              </h2>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', marginTop: '2rem' }}>
                 <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                 <h3 style={{ color: '#E0FF31', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Compártenos todo por WhatsApp</h3>
                 <p style={{ color: '#bbb', fontSize: '1rem', lineHeight: '1.6', margin: 0, maxWidth: '100%' }}>
                   Sabemos que no tienes tu logo y fotos a la mano en este momento. 
                   <br /><br />
                   Para no detener tu progreso, avanza y finaliza. En el siguiente paso te indicaremos cómo enviar todo tu material directo a nuestro canal de WhatsApp Business o por correo. Así mantenemos un flujo impecable.
                 </p>
              </div>

              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button onClick={submitForm} disabled={isSubmitting} style={{ background: '#E0FF31', border: 'none', color: '#000', padding: '1rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.2rem', cursor: 'pointer', opacity: isSubmitting ? 0.5 : 1 }}>
                  {isSubmitting ? 'Ensamblando...' : 'Finalizar y Procesar'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 14 && (
            <motion.div key="step14" {...stepAnimations} style={{ textAlign: 'center', paddingTop: '2rem' }}>
              <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>🚀</span>
              <h2 style={{ fontSize: '4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                ¡Información Recibida!
              </h2>
              <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '3rem' }}>Tu información ha sido enviada de manera encriptada y segura directamente al equipo de Consultoría y Diseño de Persuasivo. Comenzaremos a forjar tu proyecto de inmediato.</p>
              <button onClick={() => setView('agency')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '1rem 3rem', borderRadius: '100px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
                Volver a Persuasivo
              </button>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Global Navigation Controls */}
        {!isDone && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', zIndex: 10, position: 'relative' }}>
            {step > 1 ? (
               <button onClick={prevStep} style={{ background: 'transparent', color: '#888', border: 'none', fontSize: '1rem', cursor: 'pointer', fontWeight: 600 }}>← Atrás</button>
            ) : <div />}
            
            {step > 1 && step < TOTAL_STEPS && (
               <button onClick={nextStep} style={{ background: '#E0FF31', border: 'none', color: '#000', padding: '0.8rem 2rem', borderRadius: '100px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>Continuar →</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
