import React, { useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
  const accentColor = isPrimary ? '#D6531D' : '#1A1815';

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
          background: isHovered ? (isPrimary ? 'rgba(214, 83, 29, 0.05)' : 'rgba(26,24,21,0.03)') : '#F7F4EC',
          border: isHovered ? `1.5px solid ${accentColor}` : '1px solid #D9D2C2',
          borderRadius: '8px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          boxShadow: isHovered ? `4px 4px 0 rgba(26,24,21,0.12)` : '0 1px 0 rgba(26,24,21,0.04)'
        }}
        onClick={() => { if (setView && item.navTarget) setView(item.navTarget); }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Spotlight que sigue al ratón */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: isHovered ? `radial-gradient(circle at center, ${isPrimary ? 'rgba(214, 83, 29, 0.10)' : 'rgba(26,24,21,0.06)'} 0%, transparent 60%)` : 'transparent',
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
              backgroundColor: isHovered ? (isPrimary ? 'rgba(214, 83, 29, 0.08)' : 'rgba(26,24,21,0.04)') : 'rgba(26,24,21,0.02)',
              borderColor: isHovered ? accentColor : '#D9D2C2',
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 2rem', border: '1.5px solid #D9D2C2', position: 'relative' }}
          >
            {/* Core Pulsating Ring */}
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.8, 1] : (isPrimary ? [1, 1.2, 1] : 1),
                opacity: isHovered ? [0.5, 0, 0.5] : (isPrimary ? [0.3, 0.1, 0.3] : 0)
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: `1px solid ${accentColor}`, borderRadius: '50%' }}
            />
          </motion.div>

          {/* Dynamic Title Translation */}
          <h3
            style={{ color: '#1A1815', fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-0.01em', height: '2.5rem' }}
          >
            {item.title}
          </h3>

          {/* Ambos textos siempre visibles: en touch (mobile) no hay hover, y la traducción a
              valor de negocio es la copy con más peso persuasivo — no puede depender de mouseover. */}
          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
             <p style={{ color: '#6B6459', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
               {item.desc}
             </p>
             <motion.p
               animate={{ color: isHovered ? accentColor : '#1A1815' }}
               style={{ lineHeight: 1.6, fontWeight: 600, margin: 0 }}
             >
               {item.businessTrans}
             </motion.p>
          </div>

          {/* Deep Navigation CTA — siempre visible y clickeable (el hover es solo un realce, no la condición para poder tocarlo en móvil) */}
          <motion.div
             animate={{ y: isHovered ? -2 : 0 }}
             transition={{ duration: 0.3 }}
             style={{ marginTop: 'auto', paddingTop: '1rem' }}
          >
             <Link
               to={
                 item.navTarget === 'service_traffic' ? '/servicios/trafico' :
                 item.navTarget === 'service_authority' ? '/servicios/autoridad' :
                 '/servicios/ecosistemas'
               }
               style={{
                 display: 'inline-block',
                 background: 'transparent',
                 color: accentColor,
                 padding: '0.55rem 1.4rem',
                 borderRadius: '4px',
                 fontSize: '0.8rem',
                 fontFamily: "'IBM Plex Mono', monospace",
                 fontWeight: 600,
                 textTransform: 'uppercase',
                 letterSpacing: '1px',
                 border: `1.5px solid ${accentColor}`,
                 textDecoration: 'none',
                 cursor: 'pointer',
                 transition: 'all 0.2s ease'
               }}
               onMouseEnter={(e) => { e.currentTarget.style.background = isPrimary ? 'rgba(214,83,29,0.08)' : 'rgba(26,24,21,0.05)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
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
    { id: 'renters', title: 'Renters.mx', type: 'Real Estate / Legal', img: '/showcase/renters.jpg', tags: ['React', 'Vite', 'Corporate SaaS'], href: 'https://renters.mx/' },
    { id: 'onebell', title: 'OneBell AI', type: 'Fitness AI / Native App', img: '/showcase/onebell.jpg', tags: ['IA', 'Apple-Native', 'Mobile'] },
    { id: 'contratos', title: 'Contratos B2B', type: 'Legal Ecommerce', img: '/showcase/contratos.jpg', tags: ['Ecommerce', 'Stripe API', 'Monopoly'] }
  ],
  autoridad: [
    { id: 'auth1', title: 'Manifiesto de Marca', type: 'Fundación Psicológica', img: '/showcase/auth1.jpg', tags: ['Copywriting', 'Ventas High-Ticket'] },
    { id: 'auth2', title: 'Arquitectura Visual', type: 'Dominio en Instagram', img: '/showcase/auth2.jpg', tags: ['Grid Industrial', 'Zero Fricción'] },
    { id: 'auth3', title: 'Sistema de Liderazgo', type: 'Adquisición LinkedIn', img: '/showcase/auth3.jpg', tags: ['Autoridad Niche', 'Métricas'] }
  ],
  trafico: [
    { id: 'ads1', title: 'Motor Inmobiliario', type: 'ROAS Estimado: 12X', img: '/showcase/ads1.jpg', tags: ['Embudos', 'Lead Qualificado'] },
    { id: 'ads2', title: 'Infraestructura SaaS', type: 'Costos Reducidos: 40%', img: '/showcase/ads2.jpg', tags: ['Retargeting', 'Algoritmo Meta'] },
    { id: 'ads3', title: 'Escala Clínica', type: 'Volumen: 150 Citas/Mes', img: '/showcase/ads3.jpg', tags: ['Datos Duros', 'Predecibilidad'] }
  ]
};

function ShowcaseCarousel() {
  const scrollRef = React.useRef(null);
  const [activeTab, setActiveTab] = React.useState('ecosistemas');

  const tabs = [
    { id: 'ecosistemas', label: 'Desarrollo Web' },
    { id: 'autoridad', label: 'Gestión de Redes' },
    { id: 'trafico', label: 'Meta Ads' }
  ];

  return (
    <section style={{ width: '100%', overflow: 'hidden', padding: '8rem 0', background: '#EDE7D8', borderTop: '1px solid #D9D2C2' }}>
      <style>{`
        .netflix-carousel::-webkit-scrollbar { display: none; }
        .netflix-carousel { -ms-overflow-style: none; scrollbar-width: none; }
        .showcase-card:hover .showcase-bg { opacity: 0.85 !important; transform: scale(1.05); }

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
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1815', letterSpacing: '-0.01em', margin: 0 }}>
          Pruebas Balísticas.
        </h2>
        <p style={{ color: '#6B6459', fontSize: '1.2rem', margin: '0.5rem auto 2.5rem auto', maxWidth: '600px' }}>
          La evidencia matemática de nuestro protocolo. Sin captura de plantillas. Operaciones reales.
        </p>

        {/* Segmented Control */}
        <div style={{
          display: 'inline-flex',
          background: '#F7F4EC',
          padding: '0.3rem',
          borderRadius: '6px',
          border: '1px solid #D9D2C2',
          gap: '0.3rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#D6531D' : 'transparent',
                color: activeTab === tab.id ? '#FBF7ED' : '#6B6459',
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                letterSpacing: '0.5px',
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
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #D9D2C2',
                background: '#1A1815',
                boxShadow: '4px 4px 0 rgba(26,24,21,0.1)',
                cursor: proj.href ? 'pointer' : 'default',
                scrollSnapAlign: 'center'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => {
                if (proj.href) window.open(proj.href, '_blank');
              }}
            >
               {/* Imagen de Fondo de Socket */}
               <img
                 src={proj.img}
                 alt={`${proj.title} — ${proj.type}`}
                 loading="lazy"
                 decoding="async"
                 className="showcase-bg"
                 style={{
                   position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                   objectFit: 'cover',
                   objectPosition: 'top center',
                   transition: 'all 0.5s ease',
                   opacity: 0.65
                 }}
               />

               {/* Gradiente Oscuro para lectura */}
               <div style={{
                 position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 background: 'linear-gradient(to top, rgba(26,24,21,1) 0%, rgba(26,24,21,0) 60%)'
               }} />

               {/* Contenido */}
               <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 10 }}>
                 <h3 style={{ color: '#FBF7ED', fontFamily: "'Oswald', sans-serif", fontSize: '1.7rem', fontWeight: 600, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   {proj.title}
                   {proj.href && (
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D6531D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                       <polyline points="15 3 21 3 21 9"></polyline>
                       <line x1="10" y1="14" x2="21" y2="3"></line>
                     </svg>
                   )}
                 </h3>

                 <p style={{ color: '#D6531D', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85rem', fontWeight: 600, margin: '0.8rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {proj.type}
                 </p>

                 <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                   {proj.tags.map(t => (
                     <span key={t} style={{ background: 'rgba(247,244,236,0.08)', color: '#D9D2C2', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(247,244,236,0.15)' }}>
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#948C78', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
        &larr; Desliza para explorar pruebas &rarr;
      </div>
    </section>
  );
}

export default function AgencyHome({ setView }) {
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

  const protocolSteps = [
    { title: 'Llamada de Entendimiento', desc: 'Escuchamos antes de recetar. Una conversación directa para entender tu negocio, tu mercado y dónde está la fuga real de dinero — sin diagnósticos genéricos.' },
    { title: 'Elaboración de Propuesta', desc: 'Construimos el plan de ataque: alcance, inversión y entregables definidos con precisión. Cero letra chica, cero ambigüedad.' },
    { title: 'Presentación y Cierre', desc: 'Presentamos la propuesta y resolvemos objeciones en el momento. Cerramos los términos de la operación antes de mover un solo píxel.' },
    { title: 'Diseño de Solución', desc: 'Aquí nace la arquitectura real: estrategia de contenido, estructura de campaña o mapa del sitio. El plano antes de construir.' },
    { title: 'Diseño de Materiales', desc: 'Ejecutamos la identidad visual y los textos persuasivos que sostienen la solución. Cada pieza con intención de venta, no decoración.' },
    { title: 'Prototipo', desc: 'Antes de la entrega final, validamos contigo sobre una versión funcional — nunca sobre una idea en papel.' },
    { title: 'Entrega Final', desc: 'Tu ecosistema queda activo, documentado y en tus manos: listo para generar demanda sin depender de nosotros para operar.' }
  ];

  return (
    <motion.div
      key="agency"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#EDE7D8',
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
          <div
            style={{ display: 'inline-block', padding: '0.5rem 1.4rem', background: 'transparent', border: '1.5px solid #1A1815', color: '#1A1815', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '3rem' }}
          >
             El Protocolo Persuasivo
          </div>

          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.01em', color: '#1A1815', margin: 0 }}>
            Diseñamos el ecosistema.<br/>Tú <span style={{ color: '#D6531D' }}>dominas</span> tu industria.
          </h1>

          <p style={{ marginTop: '3rem', fontSize: '1.35rem', color: '#6B6459', maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55, fontWeight: 400 }}>
            No usamos corbata ni reciclamos plantillas viejas. Nuestro núcleo es el arte y la imaginación. Fusionamos ese estallido creativo con tecnología letal para construir máquinas de facturación ininterrumpida que hacen ver obsoleta a tu competencia.
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginTop: '5rem', opacity: 0.7 }}
          >
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', letterSpacing: '2px', color: '#D6531D', textTransform: 'uppercase', marginBottom: '1rem' }}>Mira lo que podemos construir para ti</p>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1815" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>

        </motion.div>
      </section>

      {/* SECTION 1.5: EL PROTOCOLO — metodología real de 7 pasos */}
      <section style={{ width: '100%', padding: '8rem 2rem', display: 'flex', justifyContent: 'center', background: '#EDE7D8', borderTop: '1px solid #D9D2C2', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
          variants={textVariant}
          style={{ width: '100%', maxWidth: '760px' }}
        >
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 600, color: '#1A1815', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '1rem', textAlign: 'center' }}>
            Siete pasos. <span style={{ color: '#D6531D' }}>Sin atajos.</span>
          </h2>
          <p style={{ color: '#6B6459', fontSize: '1.15rem', marginBottom: '4.5rem', textAlign: 'center' }}>
            Del primer diagnóstico a la entrega final — el mismo protocolo, sin importar cuál de los tres servicios contrates.
          </p>

          <div style={{ position: 'relative' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '10px', bottom: '58px', left: '23px', width: '1.5px', background: '#D9D2C2' }} />
            {protocolSteps.map((s, i) => (
              <div key={i} style={{ position: 'relative', display: 'flex', gap: '1.75rem', paddingBottom: i === protocolSteps.length - 1 ? 0 : '2.5rem' }}>
                <div style={{
                  flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%',
                  background: '#F7F4EC', border: '1.5px solid #1A1815',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '0.95rem',
                  color: '#1A1815', zIndex: 1
                }}>
                  0{i + 1}
                </div>
                <div style={{ paddingTop: '0.4rem' }}>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A1815', margin: '0 0 0.4rem 0' }}>{s.title}</h3>
                  <p style={{ color: '#6B6459', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: THE TECH STACK SHOWCASE */}
      <section style={{ ...sectionStyle, background: '#F7F4EC', borderTop: '1px solid #D9D2C2' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-150px" }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 } }
          }}
          style={{ width: '100%', maxWidth: '1200px', textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 600, color: '#1A1815', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
            Nuestro <span style={{ color: '#D6531D' }}>Arsenal</span> Creativo.
          </h2>
          <p style={{ color: '#6B6459', fontSize: '1.15rem', marginBottom: '5rem' }}>Las 3 áreas clave para escalar tu negocio de manera estructurada y predecible.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
              <MagneticCard key={i} item={item} isPrimary={i === 0} setView={setView} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2.5: PRUEBAS BALISTICAS (Showcase Carousel) */}
      <ShowcaseCarousel />

      {/* SECTION 3: THE WHAT (The Object of Desire Showcase) */}
      <section style={{ ...sectionStyle, background: '#EDE7D8' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
          variants={{
             hidden: { opacity: 0, scale: 0.9 },
             visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1815', letterSpacing: '-0.01em' }}>
               El límite es tu imaginación
             </h2>
             <p style={{ color: '#6B6459', fontSize: '1.15rem', marginTop: '1rem' }}>
                Podemos integrarte desde un Agente de IA hasta tu propio{' '}
                <span style={{
                  display: 'inline-block', verticalAlign: 'middle', padding: '0.15rem 0.7rem',
                  border: '1.5px solid #1A1815', color: '#1A1815', fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem'
                }}>ARCADE</span>
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
               borderRadius: '8px',
               border: '2px solid #1A1815',
               position: 'relative',
               overflow: 'hidden',
               boxShadow: '6px 6px 0 rgba(26,24,21,0.15)',
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
        background: 'linear-gradient(180deg, #EDE7D8 0%, #F7F4EC 100%)',
        borderTop: '1px solid #D9D2C2'
      }}>
        {/* Gran CTA Central */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textAlign: 'center', maxWidth: '1000px', backgroundColor: 'transparent', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid #D9D2C2', marginBottom: '2rem', margin: '0 auto', color: '#6B6459', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Tu Próximo Nivel
          </div>

          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', fontWeight: 700, color: '#1A1815', marginBottom: '1.2rem', letterSpacing: '-0.01em', lineHeight: 1.08 }}>
            Construyamos algo <br/>
            <span style={{ color: '#D6531D' }}>asombroso.</span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#6B6459', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
            A esto nos dedicamos en Persuasivo: Hacer que la tecnología de punta trabaje para el diseño de tu marca. Deja de competir. Empieza a dominar.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setView('contact')}
              style={{
                background: '#D6531D', color: '#FBF7ED', border: '1.5px solid #1A1815', padding: '1.35rem 3.6rem',
                borderRadius: '4px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '1.5px',
                boxShadow: '4px 4px 0 rgba(26,24,21,0.2)'
              }}
            >
              Iniciar Operación
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Minimalista (Apple-style / Familiar) */}
        <Footer setView={setView} />
      </section>

    </motion.div>
  );
}
