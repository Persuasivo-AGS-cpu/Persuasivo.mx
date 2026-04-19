import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

// Sub-componente Magnético para destruir la objeción de las "plantillas"
function MagneticCard({ item, isPrimary = false, setView }) {
  // Posición del ratón relativa a la tarjeta (-0.5 a 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Físicas de resorte para suavizar el movimiento del ratón
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Rotación 3D extrema (Efecto Tarjeta Pokémon Holográfica)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Linterna dinámica que persigue el ratón
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  
  // Parallax Inverso para el contenido interior
  const parallaxX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const parallaxY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1500, // Profundidad 3D masiva
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          padding: '4rem 2rem 4rem 2rem', // Let Flex determine height without overlapping constraints
          background: isHovered ? (isPrimary ? 'rgba(224, 255, 49, 0.05)' : 'rgba(255,255,255,0.05)') : 'rgba(20,20,20,0.4)',
          border: isHovered ? (isPrimary ? '1px solid rgba(224, 255, 49, 0.4)' : '1px solid rgba(255,255,255,0.4)') : '1px solid rgba(255,255,255,0.15)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          boxShadow: isHovered ? '0 10px 40px rgba(224, 255, 49, 0.15), inset 0 0 20px rgba(224, 255, 49, 0.05)' : '0 10px 30px rgba(0,0,0,0.5)'
        }}
        onClick={() => { if (setView && item.navTarget) setView(item.navTarget); }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Spotlight que sigue al ratón */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: isHovered ? (isPrimary ? 'radial-gradient(circle at center, rgba(224, 255, 49, 0.15) 0%, transparent 60%)' : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 60%)') : 'transparent',
            left: spotlightX,
            top: spotlightY,
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Contenido en Parallax */}
        <motion.div
          style={{
            x: parallaxX,
            y: parallaxY,
            zIndex: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {/* El Foco Magnético (Orbit X-Ray Reactor) */}
          <motion.div 
            animate={{
              backgroundColor: isHovered ? (isPrimary ? 'rgba(224, 255, 49, 0.1)' : 'rgba(255,255,255,0.05)') : 'rgba(255,255,255,0.02)',
              boxShadow: isHovered ? (isPrimary ? '0 0 30px 5px rgba(224, 255, 49, 0.2), inset 0 0 10px rgba(224, 255, 49, 0.5)' : '0 0 20px 5px rgba(255,255,255,0.1), inset 0 0 10px rgba(255,255,255,0.3)') : 'inset 0 0 10px rgba(0,0,0,0.5)',
              borderColor: isHovered ? (isPrimary ? 'rgba(224, 255, 49, 0.5)' : 'rgba(255,255,255,0.4)') : 'rgba(255,255,255,0.15)',
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 2rem', border: '1px solid block', position: 'relative' }}
          >
            {/* Core Pulsating Ring */}
            <motion.div 
              animate={{ 
                scale: isHovered ? [1, 1.8, 1] : (isPrimary ? [1, 1.2, 1] : 1), 
                opacity: isHovered ? [0.5, 0, 0.5] : (isPrimary ? [0.3, 0.1, 0.3] : 0) 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: isPrimary ? '1px solid #E0FF31' : '1px solid #ffffff', borderRadius: '50%' }}
            />
          </motion.div>
          
          {/* Dynamic Title Translation */}
          <motion.h3 
            animate={{ color: '#fff' }}
            style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em', height: '2.5rem' }}
          >
            {item.title}
          </motion.h3>
          
          <div style={{ position: 'relative', flex: 1, width: '100%' }}>
             {/* Technical Spec */}
             <motion.p 
               animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -15 : 0, filter: isHovered ? 'blur(10px)' : 'blur(0px)' }}
               transition={{ duration: 0.4 }}
               style={{ color: '#aaa', lineHeight: 1.6, fontWeight: 500, position: isHovered ? 'absolute' : 'relative', width: '100%', pointerEvents: isHovered ? 'none' : 'auto' }}
             >
               {item.desc}
             </motion.p>
             
             {/* Business Translation (X-Ray Value) */}
             <motion.p 
               animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15, filter: isHovered ? 'blur(0px)' : 'blur(10px)' }}
               transition={{ duration: 0.5, delay: 0.1 }}
               style={{ color: '#fff', lineHeight: 1.6, fontWeight: 600, position: isHovered ? 'relative' : 'absolute', top: 0, left: 0, width: '100%', pointerEvents: isHovered ? 'auto' : 'none' }}
             >
               {item.businessTrans}
             </motion.p>
          </div>

          {/* Deep Navigation CTA */}
          <motion.div
             animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
             transition={{ duration: 0.4, delay: 0.2 }}
             style={{ marginTop: 'auto', paddingTop: '1rem', pointerEvents: isHovered ? 'auto' : 'none' }}
          >
             <Link 
               to={
                 item.navTarget === 'service_traffic' ? '/servicios/trafico' : 
                 item.navTarget === 'service_authority' ? '/servicios/autoridad' : 
                 '/servicios/ecosistemas'
               }
               style={{ 
                 display: 'inline-block',
                 background: isPrimary ? 'rgba(224,255,49,0.1)' : 'rgba(255,255,255,0.05)',
                 color: isPrimary ? '#E0FF31' : '#fff',
                 padding: '0.6rem 1.5rem',
                 borderRadius: '9999px',
                 fontSize: '0.85rem',
                 fontWeight: 800,
                 textTransform: 'uppercase',
                 letterSpacing: '1px',
                 border: isPrimary ? '1px solid rgba(224,255,49,0.3)' : '1px solid rgba(255,255,255,0.2)',
                 textDecoration: 'none',
                 cursor: 'pointer',
                 transition: 'all 0.2s ease'
               }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
             >
               Profundizar →
             </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const showcaseData = {
  ecosistemas: [
    { id: 'monterrey', title: 'Monterrey Jurídico', type: 'Legal / High-Conversion', img: '/showcase/monterrey.jpg', tags: ['React', 'Framer', 'Human-Centered'], href: 'https://monterreyjuridico.com/' },
    { id: 'elypse', title: 'Edificio Elypse', type: 'Real Estate / Ultra-Luxury', img: '/showcase/elypse.jpg', tags: ['Next.js', 'WebGL', 'Premium'], href: 'https://edificio-elypse.vercel.app/' },
    { id: 'renters', title: 'Renters CRM', type: 'Finance / SaaS Dashboard', img: '/showcase/renters.jpg', tags: ['React', 'Vite', 'Corporate SaaS'] },
    { id: 'onebell', title: 'OneBell AI', type: 'Fitness AI / Native App', img: '/showcase/onebell.jpg', tags: ['IA', 'Apple-Native', 'Mobile'] },
    { id: 'contratos', title: 'Contratos B2B', type: 'Legal Ecommerce', img: '/showcase/contratos.jpg', tags: ['Ecommerce', 'Stripe API', 'Monopoly'] }
  ],
  autoridad: [
    { id: 'auth1', title: 'Manifiesto de Marca', type: 'Fundación Psicológica', img: '/showcase/auth1.jpg', tags: ['Copywriting', 'Ventas High-Ticket'] },
    { id: 'auth2', title: 'Arquitectura Visual', type: 'Dominio en Instagram', img: '/showcase/auth2.jpg', tags: ['Grid Industrial', 'Zero Fricción'] },
    { id: 'auth3', title: 'Sistema de Liderazgo', type: 'Adquisición LinkedIn', img: '/showcase/auth3.jpg', tags: ['Autoridad Niche', 'Métricas'] }
  ],
  trafico: [
    { id: 'ads1', title: 'Motor Inmobiliario', type: 'ROE Documentado: 12X', img: '/showcase/ads1.jpg', tags: ['Embudos', 'Lead Qualificado'] },
    { id: 'ads2', title: 'Infraestructura SaaS', type: 'Costos Reducidos: 40%', img: '/showcase/ads2.jpg', tags: ['Retargeting', 'Algoritmo Meta'] },
    { id: 'ads3', title: 'Escala Clínica', type: 'Volumen: 150 Citas/Mes', img: '/showcase/ads3.jpg', tags: ['Datos Duros', 'Predecibilidad'] }
  ]
};

function ShowcaseCarousel() {
  const scrollRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('ecosistemas');

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
        @media(max-width: 1200px) {
          .carousel-centered {
            justify-content: flex-start;
          }
        }
      `}</style>
      
      <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', margin: 0 }}>
          Pruebas Balísticas.
        </h2>
        <p style={{ color: '#888', fontSize: '1.2rem', margin: '0.5rem auto 2.5rem auto', maxWidth: '600px' }}>
          La evidencia matemática de nuestro protocolo. Sin captura de plantillas. Operaciones reales.
        </p>
        
        {/* Apple-style Segmented Control */}
        <div style={{ 
          display: 'inline-flex', 
          background: 'rgba(255,255,255,0.03)', 
          padding: '0.3rem', 
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.05)',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(224, 255, 49, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#E0FF31' : '#888',
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
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          drag="x"
          dragConstraints={{ left: -1500, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
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
                border: '1px solid rgba(255,255,255,0.05)',
                background: '#050505',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                cursor: proj.href ? 'pointer' : 'default'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => {
                if (proj.href && !isDragging) window.open(proj.href, '_blank');
              }}
            >
               {/* Imagen de Fondo de Socket */}
               <div style={{
                 position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 backgroundImage: `url(${proj.img})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 opacity: 0.4,
                 transition: 'all 0.5s ease',
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
                 <h3 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   {proj.title}
                   {proj.href && (
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E0FF31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                       <polyline points="15 3 21 3 21 9"></polyline>
                       <line x1="10" y1="14" x2="21" y2="3"></line>
                     </svg>
                   )}
                 </h3>
                 
                 {/* El "Tipo" se vuelve verde brillante para destacar la afirmación de negocio */}
                 <p style={{ color: '#E0FF31', fontSize: '0.95rem', fontWeight: 800, margin: '0.8rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {proj.type}
                 </p>
                 
                 <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                   {proj.tags.map(t => (
                     <span key={t} style={{ background: 'rgba(255,255,255,0.05)', color: '#ccc', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)' }}>
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
    </section>
  );
}

export default function AgencyHome({ setView }) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const sectionStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 2rem',
    position: 'relative',
    overflow: 'hidden'
  };

  const textVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      key="agency"
      initial={{ opacity: 0, backgroundColor: '#000' }}
      animate={{ opacity: 1, backgroundColor: '#050505' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      style={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#050505',
        scrollBehavior: 'smooth'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; } 
      `}</style>

      <Helmet>
        <title>Nuestra Agencia | Diseño Web & Meta Ads - Persuasivo</title>
        <meta name="description" content="Especialistas en Desarrollo Web, Meta Ads y Gestión de Redes Sociales. Elevamos tu marca con estrategia, copywriting y alta tecnología sin complicaciones." />
      </Helmet>

      {/* SECTION 1: THE WHY (The Tech Magic & Creativity) */}
      <section style={{ ...sectionStyle, justifyContent: 'center' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
          variants={textVariant}
          style={{ maxWidth: '1000px', textAlign: 'center', zIndex: 2 }}
        >
          <motion.div 
            style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(224, 255, 49, 0.05)', borderRadius: '50px', border: '1px solid rgba(224, 255, 49, 0.3)', color: '#E0FF31', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3rem', boxShadow: '0 0 20px rgba(224, 255, 49, 0.1)' }}
          >
             EL PROTOCOLO PERSUASIVO
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff', margin: 0 }}>
            Diseñamos el ecosistema.<br/>Tú <span style={{ color: '#E0FF31', textShadow: '0 0 40px rgba(224, 255, 49, 0.4)' }}>dominas</span> tu industria.
          </h1>
          
          <p style={{ marginTop: '3rem', fontSize: '1.4rem', color: '#888', maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5, fontWeight: 500 }}>
            No usamos corbata ni reciclamos plantillas viejas. Nuestro núcleo es el arte y la imaginación. Fusionamos ese estallido creativo con tecnología letal para construir máquinas de facturación ininterrumpida que hacen ver obsoleta a tu competencia.
          </p>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginTop: '5rem', opacity: 0.6 }}
          >
            <p style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#E0FF31', textTransform: 'uppercase', marginBottom: '1rem' }}>Mira lo que podemos construir para ti</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E0FF31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
          
        </motion.div>
        
        <motion.div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(224,255,49,0.05) 0%, transparent 50%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none', y: yParallax, opacity: opacityFade }} />
      </section>

      {/* SECTION 2: THE TECH STACK SHOWCASE */}
      <section style={{ ...sectionStyle, background: '#020202', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-150px" }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 } }
          }}
          style={{ width: '100%', maxWidth: '1200px', textAlign: 'center' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
            Nuestro <span style={{ color: '#E0FF31', textShadow: '0 0 20px rgba(224, 255, 49, 0.3)' }}>Arsenal</span> Creativo.
          </h2>
          <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '5rem' }}>Las 3 áreas clave para escalar tu negocio de manera estructurada y predecible.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              {
                title: 'Meta Ads (Pauta Digital)', 
                desc: 'Campañas de adquisición inteligentes de extremo a extremo. En lugar de quemar presupuesto tratando de llegar a todos, analizamos tu mercado y dirigimos tu mensaje al cliente que ya te está buscando.',
                businessTrans: 'Te acompañamos a sistematizar tus ventas. Dejas de depender de la suerte o recomendaciones para tener un flujo transparente y seguro de clientes nuevos cada mes.',
                navTarget: 'service_traffic'
              }, 
              {
                title: 'Gestión de Redes & Copywriting', 
                desc: 'Escribimos textos persuasivos y diseñamos una identidad visual que transmite tu verdadera experiencia. Nos aseguramos de que tu marca dé la mejor primera impresión posible.',
                businessTrans: 'Generamos confianza real sin arrogancia y sin juzgar. Educamos a tu prospecto para que, cuando toque a tu puerta, ya esté convencido del gran valor de lo que ofreces.',
                navTarget: 'service_authority'
              }, 
              {
                title: 'Desarrollo de Sitios Web', 
                desc: 'Creamos plataformas de alto rendimiento visual y tecnológico. Más que una página web, esculpimos tu cuartel general digital con reactJS y estética de Silicon Valley.',
                businessTrans: 'El componente donde se consolida la venta. Un sitio tan profesional que automáticamente justifica tus precios, blindando tu credibilidad 24/7 sin margen de error.',
                navTarget: 'service_ecosystems'
              }
            ].map((item, i) => (
              <MagneticCard key={i} item={item} isPrimary={i === 1} setView={setView} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2.5: PRUEBAS BALISTICAS (Showcase Carousel) */}
      <ShowcaseCarousel />

      {/* SECTION 3: THE WHAT (The Object of Desire Showcase) */}
      <section style={{ ...sectionStyle, background: '#050505' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
          variants={{
             hidden: { opacity: 0, scale: 0.9 },
             visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
               El límite es tu imaginación
             </h2>
             <style>{`
               .neon-arcade-sign {
                 display: inline-block;
                 vertical-align: middle;
                 margin-left: 0.5rem;
                 padding: 0.2rem 1rem;
                 border: 2px solid #0ff;
                 border-radius: 12px;
                 color: #fff;
                 font-weight: 900;
                 text-transform: uppercase;
                 letter-spacing: 4px;
                 font-size: 1.1rem;
                 background: transparent;
                 text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #0ff;
                 box-shadow: 0 0 5px #0ff, inset 0 0 5px #0ff, 0 0 20px #0ff, inset 0 0 20px #0ff;
                 animation: neon-flicker 4s infinite alternate;
               }
               @keyframes neon-flicker {
                 0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                   text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 15px #f0f, 0 0 30px #f0f, 0 0 50px #f0f;
                   box-shadow: 0 0 3px #f0f, inset 0 0 3px #f0f, 0 0 15px #f0f, inset 0 0 15px #f0f;
                   border-color: #f0f;
                 }
                 20%, 24%, 55% {
                   text-shadow: none;
                   box-shadow: none;
                   border-color: #222;
                   color: #555;
                 }
               }
             `}</style>
             <p style={{ color: '#E0FF31', fontSize: '1.2rem', marginTop: '1rem', fontWeight: 'bold' }}>
                Podemos integrarte desde un Agente de IA hasta tu propio <span className="neon-arcade-sign">ARCADE</span>
             </p>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ type: 'spring', stiffness: 200, damping: 20 }}
             style={{ 
               width: '100%', 
               maxWidth: '430px', /* Exactly fits Pacman 420px + border */
               height: '510px', 
               margin: '0 auto',
               borderRadius: '16px', 
               border: '2px solid rgba(224,255,49,0.3)', 
               position: 'relative', 
               overflow: 'hidden', 
               boxShadow: '0 20px 60px rgba(224, 255, 49, 0.15)',
               background: '#000'
             }}
          >
             <iframe 
               src="/pacman/index.html?v=4" 
               title="Pacman Zero-Friction Flow"
               style={{ width: '100%', height: '100%', border: 'none' }}
               scrolling="no"
             />
             
             {/* Subtle CRT Overlay */}
             <div style={{ 
               position: 'absolute', top:0, left:0, width:'100%', height:'100%', 
               background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%)', 
               backgroundSize: '100% 4px', 
               pointerEvents: 'none', 
               mixBlendMode: 'overlay', 
               zIndex: 5 
             }}></div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 4: THE ULTIMATUM & FOOTER */}
      <section style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15vh 5vw 0 5vw',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Gran CTA Central */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textAlign: 'center', maxWidth: '1000px', backgroundColor: 'transparent', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', marginBottom: '2rem', margin: '0 auto', color: '#888', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Tu Próximo Nivel
          </div>
          
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, color: '#fff', marginBottom: '1.2rem', letterSpacing: '-0.05em', lineHeight: 1.1 }}>
            Construyamos algo <br/>
            <span style={{ color: '#E0FF31', textShadow: '0 0 40px rgba(224, 255, 49, 0.3)' }}>asombroso.</span>
          </h2>
          
          <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
            A esto nos dedicamos en Persuasivo: Hacer que la tecnología de punta trabaje para el diseño de tu marca. Deja de competir. Empieza a dominar.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 40px rgba(224, 255, 49, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('contact')}
              style={{
                background: '#E0FF31', color: '#000', border: 'none', padding: '1.5rem 4rem', 
                borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '2px'
              }}
            >
              Iniciar Proyecto
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Minimalista (Apple-style / Familiar) */}
        <Footer setView={setView} />
      </section>

    </motion.div>
  );
}
