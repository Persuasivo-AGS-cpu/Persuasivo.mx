import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    needs: [],
    budget: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, needs: [...prev.needs, value] };
      } else {
        return { ...prev, needs: prev.needs.filter(n => n !== value) };
      }
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      alert("Por favor, completa tus datos de contacto básicos.");
      return;
    }
    if (step === 2 && (!formData.industry || formData.needs.length === 0 || !formData.budget)) {
      alert("Por favor, ayúdanos a entender mejor tu proyecto.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Consulta Gratuita | Persuasivo",
    "description": "Agenda una consultoría estratégica gratuita de 15 minutos para escalar tu negocio.",
    "url": "https://persuasivo.com.mx/consulta-gratis",
    "mainEntity": {
      "@type": "ScheduleAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://persuasivo.com.mx/consulta-gratis",
        "inLanguage": "es"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-void)' }}
    >
      <Helmet>
        <title>Agenda tu Consultoría Gratis | Persuasivo</title>
        <meta name="description" content="Agenda 15 minutos con un experto en crecimiento digital. Analizaremos tu presencia actual y te daremos un plan de acción sin costo." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="booking-layout" style={{ display: 'flex', flex: 1, width: '100%' }}>
        
        <div className="booking-form-area" style={{ flex: '1', padding: '12vh 5vw 5vh 5vw', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 600 }}>
              ← Volver al inicio
            </Link>
            
            <h1 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Diagnóstico de Marca.
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.6 }}>
              Completa este breve cuestionario para que podamos prepararnos para nuestra llamada de 15 minutos. 
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ 
                  flex: 1, height: '4px', borderRadius: '2px',
                  background: s < step ? 'var(--text-primary)' : s === step ? 'var(--text-secondary)' : 'var(--border-subtle)',
                  transition: 'background 0.3s ease'
                }} />
              ))}
            </div>

            <div style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '2.5rem' }}>
              <AnimatePresence mode="wait">
                
                {step === 1 && (
                  <motion.form key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleNext}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 800 }}>1. Datos de Contacto</h3>
                    
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Nombre Completo *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem' }} />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Empresa / Proyecto</label>
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem' }} />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>WhatsApp *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem' }} />
                      </div>
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '1.2rem', background: 'var(--text-primary)', color: 'var(--bg-void)', border: 'none', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', transition: 'opacity 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Siguiente →
                    </button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleNext}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 800 }}>2. Sobre tu Proyecto</h3>
                    
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Industria *</label>
                      <select name="industry" value={formData.industry} onChange={handleInputChange} required style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem', appearance: 'none' }}>
                        <option value="">Selecciona tu industria...</option>
                        <option value="inmobiliaria">Desarrollo Inmobiliario</option>
                        <option value="abogados">Servicios Legales</option>
                        <option value="salud">Salud / Clínicas</option>
                        <option value="restaurante">Restaurante / Hospitalidad</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="tech">Tecnología / SaaS</option>
                        <option value="otro">Otro sector</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>¿Qué necesitas resolver? (Múltiple) *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {['Página Web', 'Meta Ads', 'Branding', 'SEO', 'Embudos', 'Todo el sistema'].map(need => (
                          <label key={need} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem', border: `1px solid ${formData.needs.includes(need) ? 'var(--text-primary)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-sm)', background: formData.needs.includes(need) ? 'var(--bg-card)' : 'transparent', transition: 'all 0.2s' }}>
                            <input type="checkbox" value={need} checked={formData.needs.includes(need)} onChange={handleCheckboxChange} style={{ accentColor: 'var(--text-primary)' }} />
                            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{need}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Presupuesto Mensual Disponible *</label>
                      <select name="budget" value={formData.budget} onChange={handleInputChange} required style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1rem', appearance: 'none' }}>
                        <option value="">Selecciona un rango...</option>
                        <option value="<15k">Menos de $15,000 MXN</option>
                        <option value="15k-35k">$15,000 - $35,000 MXN</option>
                        <option value="35k-75k">$35,000 - $75,000 MXN</option>
                        <option value=">75k">Más de $75,000 MXN</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '1.2rem', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}>
                        Volver
                      </button>
                      <button type="submit" style={{ flex: 2, padding: '1.2rem', background: 'var(--text-primary)', color: 'var(--bg-void)', border: 'none', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', transition: 'opacity 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        Siguiente →
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 800 }}>Excelente, {formData.name.split(' ')[0]}</h3>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Selecciona el horario que mejor te funcione:</p>
                    
                    <div style={{ width: '100%', height: '600px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                         <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                         <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: '1rem' }}>Integración de Calendario</h4>
                         <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '300px', marginBottom: '1.5rem' }}>
                            Para conectar con Google Calendar de forma gratuita, recomendamos crear una cuenta en <strong>Cal.com</strong> o <strong>Calendly</strong> y pegar el código de inserción (iframe) aquí.
                         </p>
                         <button style={{
                           background: 'var(--text-primary)',
                           color: 'var(--bg-void)',
                           border: 'none',
                           padding: '0.8rem 1.5rem',
                           borderRadius: 'var(--radius-full)',
                           fontWeight: 700,
                           fontSize: '0.85rem'
                         }}>Finalizar Reserva Demo</button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="booking-info-area" style={{ flex: '1', background: 'var(--bg-deep)', borderLeft: '1px solid var(--border-subtle)', padding: '12vh 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            
            <div style={{ display: 'inline-block', padding: '0.4rem 1.2rem', border: '1px solid var(--border-medium)', borderRadius: '50px', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              15 Minutos
            </div>

            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2, fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.03em' }}>
              No vendemos servicios.<br/>Construimos activos.
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem' }}>
              En esta llamada no intentaremos venderte nada agresivamente. Evaluaremos tu modelo de adquisición actual, detectaremos las fugas de presupuesto y te daremos un mapa claro de lo que necesitas.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ borderLeft: '3px solid var(--text-primary)', paddingLeft: '1.5rem' }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1rem', fontWeight: 500 }}>
                  "Dejamos de perseguir clientes y empezamos a recibirlos. El cambio en la calidad de los leads fue inmediato desde el mes uno."
                </p>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Director Comercial</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Desarrollo Inmobiliario Monterrey</div>
                </div>
              </div>

              <div style={{ borderLeft: '3px solid var(--border-medium)', paddingLeft: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                  "Habíamos pasado por 3 agencias que solo nos daban 'likes'. Persuasivo construyó un sistema que literalmente agenda citas en automático."
                </p>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Fundadora</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Clínica Especializada CDMX</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .booking-layout { flexDirection: column !important; }
          .booking-form-area { padding-top: 15vh !important; }
          .booking-info-area { padding-top: 5vh !important; border-left: none !important; border-top: 1px solid var(--border-subtle); }
        }
      `}</style>
    </motion.div>
  );
}
