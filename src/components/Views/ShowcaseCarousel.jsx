import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const showcaseData = {
  ecosistemas: [
    { 
      id: 'monterrey', title: 'Monterrey Jurídico', type: 'Legal / High-Conversion', 
      img: '/showcase/monterrey.jpg', tags: ['React', 'Framer', 'Human-Centered'], href: 'https://monterreyjuridico.com/',
      metric: '+215% Leads Calificados',
      quote: '"El protocolo implementado no solo mejoró nuestra imagen, sino que triplicó el volumen de consultas de alto valor en menos de 3 meses."',
      clientName: 'Dirección General'
    },
    { 
      id: 'elypse', title: 'Edificio Elypse', type: 'Real Estate / Ultra-Luxury', 
      img: '/showcase/elypse.jpg', tags: ['Next.js', 'WebGL', 'Premium'], href: 'https://edificio-elypse.vercel.app/',
      metric: 'Ventas Aceleradas 40%',
      quote: '"Una experiencia inmersiva que captura la atención desde el primer segundo. La presentación digital finalmente refleja la magnitud de nuestro desarrollo."',
      clientName: 'Desarrollos Elypse'
    },
    { 
      id: 'renters', title: 'Renters.mx', type: 'Real Estate / Legal', 
      img: '/showcase/renters.jpg', tags: ['React', 'Vite', 'Corporate SaaS'], href: 'https://renters.mx/',
      metric: 'Operaciones 100% Digitales',
      quote: '"Transformamos el arrendamiento tradicional en una experiencia libre de fricción. La interfaz inspira confianza absoluta a propietarios e inquilinos."',
      clientName: 'Renters PropTech'
    },
    { 
      id: 'onebell', title: 'OneBell AI', type: 'Fitness AI / Native App', 
      img: '/showcase/onebell.jpg', tags: ['IA', 'Apple-Native', 'Mobile'],
      metric: '10k+ Usuarios Activos',
      quote: '"La interfaz se siente como si Apple hubiera diseñado una app de fitness. La retención de usuarios rompió nuestras métricas proyectadas."',
      clientName: 'Founders OneBell'
    },
    { 
      id: 'contratos', title: 'Contratos B2B', type: 'Legal Ecommerce', 
      img: '/showcase/contratos.jpg', tags: ['Ecommerce', 'Stripe API', 'Monopoly'],
      metric: 'Facturación Automatizada',
      quote: '"Pasamos de procesos manuales tediosos a ventas transaccionales instantáneas. El diseño y el flujo de caja ahora están totalmente sincronizados."',
      clientName: 'Contratos B2B Legal'
    }
  ],
  autoridad: [
    { 
      id: 'auth1', title: 'Manifiesto de Marca', type: 'Fundación Psicológica', 
      img: '/showcase/auth1.jpg', tags: ['Copywriting', 'Ventas High-Ticket'],
      metric: 'Aumento de Percepción de Valor',
      quote: '"Finalmente nuestras palabras resuenan con la calidad de nuestro servicio. Los clientes llegan educados y listos para comprar sin regatear."',
      clientName: 'Clínica Estética Premium'
    },
    { 
      id: 'auth2', title: 'Arquitectura Visual', type: 'Dominio en Instagram', 
      img: '/showcase/auth2.jpg', tags: ['Grid Industrial', 'Zero Fricción'],
      metric: 'Crecimiento Orgánico Acelerado',
      quote: '"Un rediseño de identidad que nos separó de los amateurs de inmediato. El nivel de prestigio que proyectamos hoy nos permite cerrar tratos más grandes."',
      clientName: 'Agencia de Consultoría'
    },
    { 
      id: 'auth3', title: 'Sistema de Liderazgo', type: 'Adquisición LinkedIn', 
      img: '/showcase/auth3.jpg', tags: ['Autoridad Niche', 'Métricas'],
      metric: 'Posicionamiento Top Voice',
      quote: '"Nuestro CEO ahora es un líder de opinión reconocido. El embudo de contenido nos trajo oportunidades de negocio corporativo impensables."',
      clientName: 'Startup B2B SaaS'
    }
  ],
  trafico: [
    { 
      id: 'ads1', title: 'Motor Inmobiliario', type: 'ROE Documentado: 12X', 
      img: '/showcase/ads1.jpg', tags: ['Embudos', 'Lead Qualificado'],
      metric: 'Retorno de Inversión (ROE) 12X',
      quote: '"Dejamos de gastar en campañas sin rumbo y empezamos a invertir en un sistema de adquisición matemático. Los leads ahora llegan perfilados y listos para visitar desarrollos."',
      clientName: 'Broker Inmobiliario Elite'
    },
    { 
      id: 'ads2', title: 'Infraestructura SaaS', type: 'Costos Reducidos: 40%', 
      img: '/showcase/ads2.jpg', tags: ['Retargeting', 'Algoritmo Meta'],
      metric: 'CAC Reducido en 40%',
      quote: '"El costo de adquisición bajó drásticamente mientras mantuvimos la calidad de las demos. Una ingeniería de pauta que entiende de software, no solo de likes."',
      clientName: 'SaaS Financiero'
    },
    { 
      id: 'ads3', title: 'Escala Clínica', type: 'Volumen: 150 Citas/Mes', 
      img: '/showcase/ads3.jpg', tags: ['Datos Duros', 'Predecibilidad'],
      metric: '150 Citas Nuevas por Mes',
      quote: '"La agenda llena de manera predecible. Pasamos de depender de recomendaciones boca a boca a un flujo constante de pacientes de alto valor."',
      clientName: 'Clínica Especializada'
    }
  ]
};

export default function ShowcaseCarousel() {
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState('ecosistemas');
  const [selectedProject, setSelectedProject] = useState(null);

  // Stop background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const tabs = [
    { id: 'ecosistemas', label: 'Desarrollo Web' },
    { id: 'autoridad', label: 'Gestión de Redes' },
    { id: 'trafico', label: 'Meta Ads' }
  ];

  return (
    <section style={{ width: '100%', overflow: 'hidden', padding: '8rem 0', background: '#020202', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
      <style>{`
        .netflix-carousel::-webkit-scrollbar { display: none; }
        .netflix-carousel { -ms-overflow-style: none; scrollbar-width: none; }
        .showcase-card:hover .showcase-bg { opacity: 0.8 !important; transform: scale(1.05); }

        .carousel-centered {
          justify-content: center;
        }
        
        .cinematic-modal {
          flex-direction: row;
        }
        .cinematic-img-container {
          flex: 1 1 60%;
        }
        .cinematic-info-container {
          flex: 1 1 40%;
          padding: 4rem 3rem;
        }

        @media(max-width: 1200px) {
          .carousel-centered {
            justify-content: flex-start;
          }
        }
        @media(max-width: 900px) {
          .cinematic-modal {
            flex-direction: column;
            overflow-y: auto;
          }
          .cinematic-img-container {
            flex: none;
            width: 100%;
            height: 40vh;
            min-height: 300px;
          }
          .cinematic-info-container {
            flex: none;
            padding: 2rem;
          }
        }
      `}</style>
      
      <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', margin: 0 }}>
          Pruebas Balísticas.
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: '0.5rem auto 2.5rem auto', maxWidth: '600px' }}>
          La evidencia matemática de nuestro protocolo. Sin captura de plantillas. Operaciones reales.
        </p>
        
        {/* Apple-style Segmented Control */}
        <div style={{ 
          display: 'inline-flex', 
          background: 'rgba(255,255,255,0.03)', 
          padding: '0.3rem', 
          borderRadius: '100px',
          border: '1px solid var(--border-subtle)',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--neon-glow)' : 'transparent',
                color: activeTab === tab.id ? 'var(--neon)' : '#888',
                border: activeTab === tab.id ? '1px solid rgba(224, 255, 49, 0.3)' : '1px solid transparent',
                padding: '0.6rem 1.5rem',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Container con Animación de entrada al cambiar pestaña */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
          <motion.div 
          ref={scrollRef}
          className={`netflix-carousel ${showcaseData[activeTab].length <= 3 ? 'carousel-centered' : ''}`}
          style={{
            display: 'flex', 
            gap: '2rem', 
            padding: '2rem 2rem 0 2rem', 
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          {showcaseData[activeTab].map((proj) => (
            <motion.div 
              key={proj.id}
              className="showcase-card"
              style={{ 
                minWidth: '350px',
                height: '500px',
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: '#050505',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                scrollSnapAlign: 'center'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setSelectedProject(proj)}
            >
               {/* Imagen de Fondo de Socket */}
               <div style={{
                 position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                 backgroundImage: `url(${proj.img})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'top center',
                 transition: 'all 0.5s ease',
                 opacity: 0.6
               }} className="showcase-bg" />
               
               {/* Gradiente Oscuro para lectura */}
               <div style={{
                 position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)'
               }} />

               {/* Controles Médicos (Efecto tecnológico táctico) */}
               <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '5px' }}>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeTab === 'trafico' ? '#0f0' : '#444' }}></div>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeTab === 'autoridad' ? '#0f0' : '#444' }}></div>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeTab === 'ecosistemas' ? '#0f0' : '#444' }}></div>
               </div>

               {/* Contenido */}
               <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 10 }}>
                 <h3 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   {proj.title}
                   {proj.href && (
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke='var(--neon)' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                       <polyline points="15 3 21 3 21 9"></polyline>
                       <line x1="10" y1="14" x2="21" y2="3"></line>
                     </svg>
                   )}
                 </h3>
                 
                 {/* El "Tipo" se vuelve verde brillante para destacar la afirmación de negocio */}
                 <p style={{ color: 'var(--neon)', fontSize: '0.95rem', fontWeight: 800, margin: '0.8rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {proj.type}
                 </p>
                 
                 <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                   {proj.tags.map(t => (
                     <span key={t} style={{ background: 'var(--border-subtle)', color: 'var(--text-secondary)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-medium)' }}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#555', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
        &larr; Desliza para explorar pruebas &rarr;
      </div>

      {/* Cinematic Expansion Modal (Lightbox) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(2, 2, 2, 0.85)'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="cinematic-modal"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '1200px',
                height: '85vh',
                backgroundColor: '#0a0a0a',
                borderRadius: '24px',
                border: '1px solid var(--border-medium)',
                boxShadow: '0 30px 100px rgba(0,0,0,0.8), 0 0 40px var(--neon-glow)',
                display: 'flex',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Botón de cerrar */}
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'var(--border-medium)',
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-strong)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--border-medium)'}
              >
                &times;
              </button>

              {/* Imagen de Alta Resolución (Lado Izquierdo) */}
              <div className="cinematic-img-container" style={{ position: 'relative', overflow: 'hidden' }}>
                <div 
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${selectedProject.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                  }}
                />
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to right, rgba(10,10,10,0) 70%, rgba(10,10,10,1) 100%)'
                }} />
              </div>

              {/* Panel de Datos y Conversión (Lado Derecho) */}
              <div className="cinematic-info-container" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                background: '#0a0a0a',
                position: 'relative'
              }}>
                 <p style={{ color: 'var(--neon)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
                    {selectedProject.type}
                 </p>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
                    {selectedProject.title}
                 </h2>
                 
                 {/* Métrica Estrella */}
                 <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(224, 255, 49, 0.05)', borderRadius: '12px', borderLeft: '4px solid #E0FF31' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Resultado Clave</p>
                    <p style={{ color: 'var(--neon)', fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>{selectedProject.metric}</p>
                 </div>

                 {/* Cita del Cliente */}
                 <blockquote style={{ margin: '0 0 2rem 0', padding: 0 }}>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1rem' }}>
                     {selectedProject.quote}
                   </p>
                   <footer style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                     — {selectedProject.clientName}
                   </footer>
                 </blockquote>

                 {/* Tags */}
                 <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'auto' }}>
                   {selectedProject.tags.map(t => (
                     <span key={t} style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                       {t}
                     </span>
                   ))}
                 </div>

                 {/* Botones de Acción */}
                 <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                   {selectedProject.href && (
                     <a 
                       href={selectedProject.href}
                       target="_blank"
                       rel="noopener noreferrer"
                       style={{
                         flex: 1,
                         textAlign: 'center',
                         background: 'var(--border-medium)',
                         color: 'var(--text-primary)',
                         padding: '1rem',
                         borderRadius: '12px',
                         fontWeight: 700,
                         textDecoration: 'none',
                         transition: 'background 0.3s'
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-strong)'}
                       onMouseLeave={(e) => e.currentTarget.style.background = 'var(--border-medium)'}
                     >
                       Ver Evidencia ↗
                     </a>
                   )}
                   <Link 
                     to="/contacto"
                     onClick={() => setSelectedProject(null)} // Close modal before navigation
                     style={{
                       flex: 1,
                       textAlign: 'center',
                       background: 'var(--neon)',
                       color: '#000',
                       padding: '1rem',
                       borderRadius: '12px',
                       fontWeight: 900,
                       textDecoration: 'none',
                       boxShadow: '0 10px 20px rgba(224, 255, 49, 0.2)',
                       transition: 'transform 0.2s, box-shadow 0.2s'
                     }}
                     onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(224, 255, 49, 0.3)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(224, 255, 49, 0.2)'; }}
                   >
                     Quiero esto →
                   </Link>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
