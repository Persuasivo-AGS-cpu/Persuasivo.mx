import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from './LandingHero';
import Footer from '../Navigation/Footer';

const verifiedCases = [
  { id: 'monterrey', title: 'Monterrey Jurídico', type: 'Legal / High-Conversion', img: '/showcase/monterrey.jpg', href: 'https://monterreyjuridico.com/', domain: 'monterreyjuridico.com' },
  { id: 'elypse', title: 'Edificio Elypse', type: 'Real Estate / Ultra-Luxury', img: '/showcase/elypse.jpg', pos: 'center', href: 'https://edificio-elypse.vercel.app/', domain: 'edificio-elypse.vercel.app' },
  { id: 'renters', title: 'Renters.mx', type: 'Real Estate / Legal', img: '/showcase/renters.jpg', pos: 'center', href: 'https://renters.mx/', domain: 'renters.mx' },
  { id: 'aph', title: 'Grupo APH', type: 'Industrial / Seguridad', img: '/showcase/aph.jpg', pos: 'center', href: 'https://www.grupoaph.com.mx/', domain: 'grupoaph.com.mx' }
];

const referenceMetrics = [
  { id: 'ads1', category: 'Meta Ads', title: 'Motor Inmobiliario', type: 'ROAS Estimado: 12X', tags: ['Embudos', 'Lead Qualificado'] },
  { id: 'ads2', category: 'Meta Ads', title: 'Infraestructura SaaS', type: 'Costos Reducidos: 40%', tags: ['Retargeting', 'Algoritmo Meta'] },
  { id: 'ads3', category: 'Meta Ads', title: 'Escala Clínica', type: 'Volumen: 150 Citas/Mes', tags: ['Datos Duros', 'Predecibilidad'] },
  { id: 'auth1', category: 'Redes & Copywriting', title: 'Manifiesto de Marca', type: 'Fundación Psicológica', tags: ['Copywriting', 'Ventas High-Ticket'] },
  { id: 'auth2', category: 'Redes & Copywriting', title: 'Arquitectura Visual', type: 'Dominio en Instagram', tags: ['Grid Industrial', 'Zero Fricción'] },
  { id: 'auth3', category: 'Redes & Copywriting', title: 'Sistema de Liderazgo', type: 'Adquisición LinkedIn', tags: ['Autoridad Niche', 'Métricas'] },
  { id: 'onebell', category: 'Desarrollo Web', title: 'OneBell AI', type: 'Fitness AI / Native App', tags: ['IA', 'Apple-Native', 'Mobile'] },
  { id: 'contratos', category: 'Desarrollo Web', title: 'Contratos B2B', type: 'Legal Ecommerce', tags: ['Ecommerce', 'Stripe API', 'Monopoly'] }
];

// Tarjeta de caso verificable con recorrido largo al entrar (alterna izquierda/derecha)
function CaseCard({ proj, i }) {
  const variant = {
    hidden: { opacity: 0, x: i % 2 === 0 ? -140 : 140, y: 40 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };
  return (
    <motion.a
      href={proj.href}
      target="_blank"
      rel="noopener noreferrer"
      className="showcase-card"
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        display: 'block', textDecoration: 'none', cursor: 'pointer',
        height: '420px', position: 'relative', borderRadius: '8px', overflow: 'hidden',
        border: '1px solid #D9D2C2', background: '#1A1815', boxShadow: '4px 4px 0 rgba(26,24,21,0.1)'
      }}
    >
      <img
        src={proj.img}
        alt={`${proj.title} — ${proj.type}`}
        loading="lazy"
        decoding="async"
        className="showcase-bg"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: proj.pos || 'top center',
          transform: 'scale(1.08)',
          filter: 'blur(4px) grayscale(30%)',
          transition: 'all 0.5s ease', opacity: 0.6
        }}
      />
      {/* Las capturas son de sitios/creativos reales con texto propio: blur + velo evitan que compita con el nuestro */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(26,24,21,0.35)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(26,24,21,1) 0%, rgba(26,24,21,0.15) 65%, rgba(26,24,21,0.15) 100%)' }} />
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 10 }}>
        <h4 style={{ color: '#FBF7ED', fontFamily: "'Oswald', sans-serif", fontSize: '1.5rem', fontWeight: 600, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
          {proj.title}
        </h4>
        <p style={{ color: '#D6531D', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', fontWeight: 600, margin: '0.7rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {proj.type}
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#FBF7ED', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', fontWeight: 600, border: '1px solid rgba(247,244,236,0.3)', borderRadius: '4px', padding: '0.4rem 0.8rem', marginTop: '0.4rem' }}>
          {proj.domain}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

const metricVariant = {
  hidden: { opacity: 0, y: 90 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

function ShowcaseSection() {
  return (
    <section style={{ width: '100%', padding: '8rem 2rem', background: '#EDE7D8', borderTop: '1px solid #D9D2C2' }}>
      <style>{`
        .showcase-card:hover .showcase-bg { opacity: 0.85 !important; transform: scale(1.05); }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1815', letterSpacing: '-0.01em', margin: 0 }}>
            Pruebas Balísticas.
          </h2>
          <p style={{ color: '#6B6459', fontSize: '1.2rem', margin: '0.5rem auto 0 auto', maxWidth: '620px' }}>
            La evidencia de nuestro protocolo, sin mezclar lo verificable con lo reportado.
          </p>
        </motion.div>

        {/* CASOS VERIFICABLES */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ width: '8px', height: '8px', background: '#D6531D', display: 'inline-block' }} />
            <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1A1815', margin: 0 }}>
              Casos Verificables
            </h3>
            <span style={{ color: '#948C78', fontSize: '0.85rem' }}>— entra tú mismo, sin pedirte que nos creas</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {verifiedCases.map((proj, i) => <CaseCard key={proj.id} proj={proj} i={i} />)}
          </div>
        </div>

        {/* MÉTRICAS DE REFERENCIA */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ width: '8px', height: '8px', border: '1.5px solid #948C78', display: 'inline-block' }} />
            <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1A1815', margin: 0 }}>
              Métricas de Referencia
            </h3>
            <span style={{ color: '#948C78', fontSize: '0.85rem' }}>— resultados reportados, sin caso público que enlazar todavía</span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}
          >
            {referenceMetrics.map(item => (
              <motion.div key={item.id} variants={metricVariant} style={{ background: '#F7F4EC', border: '1px solid #D9D2C2', borderRadius: '8px', padding: '1.5rem' }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#948C78', margin: '0 0 0.8rem 0' }}>
                  {item.category}
                </p>
                <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.1rem', fontWeight: 600, color: '#1A1815', margin: '0 0 0.4rem 0' }}>
                  {item.title}
                </h4>
                <p style={{ color: '#D6531D', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
                  {item.type}
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {item.tags.map(t => (
                    <span key={t} style={{ background: '#EDE7D8', color: '#6B6459', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Un servicio expandido a la vez — el título de los colapsados se lee, el contenido persuasivo vive solo en el abierto
function ServiceAccordionItem({ item, isOpen, onToggle, accentColor }) {
  return (
    <div style={{ borderBottom: '1px solid #D9D2C2' }}>
      <button
        onClick={onToggle}
        style={{
          all: 'unset', boxSizing: 'border-box', cursor: 'pointer', width: '100%',
          display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem 0'
        }}
      >
        <span style={{ alignSelf: 'stretch', width: '3px', minHeight: '2.5rem', background: isOpen ? accentColor : '#D9D2C2', flexShrink: 0, transition: 'background 0.3s ease' }} />
        <span style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 600, textAlign: 'left', flex: 1,
          color: isOpen ? '#1A1815' : '#948C78',
          fontSize: isOpen ? 'clamp(1.5rem, 3vw, 2.1rem)' : '1.2rem',
          transition: 'font-size 0.3s ease, color 0.3s ease'
        }}>
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '1.6rem', fontWeight: 300, color: isOpen ? accentColor : '#948C78', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingLeft: 'calc(3px + 1.5rem)', paddingBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
              <p style={{ color: '#6B6459', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{item.desc}</p>
              <p style={{ color: accentColor, fontWeight: 600, lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{item.businessTrans}</p>
              <div style={{ paddingTop: '0.5rem' }}>
                <Link
                  to={item.href}
                  style={{
                    display: 'inline-block', background: 'transparent', color: accentColor,
                    padding: '0.55rem 1.4rem', borderRadius: '4px', fontSize: '0.8rem',
                    fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '1px', border: `1.5px solid ${accentColor}`, textDecoration: 'none', cursor: 'pointer'
                  }}
                >
                  Profundizar →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const servicesData = [
  {
    title: 'Meta Ads (Pauta Digital)',
    desc: 'Campañas de adquisición inteligentes de extremo a extremo. En lugar de quemar presupuesto tratando de llegar a todos, analizamos tu mercado y dirigimos tu mensaje al cliente que ya te está buscando.',
    businessTrans: 'Te acompañamos a sistematizar tus ventas. Dejas de depender de la suerte o recomendaciones para tener un flujo transparente y seguro de clientes nuevos cada mes.',
    href: '/servicios/trafico'
  },
  {
    title: 'Gestión de Redes & Copywriting',
    desc: 'Escribimos textos persuasivos y diseñamos una identidad visual que transmite tu verdadera experiencia. Nos aseguramos de que tu marca dé la mejor primera impresión posible.',
    businessTrans: 'Generamos confianza real sin arrogancia y sin juzgar. Educamos a tu prospecto para que, cuando toque a tu puerta, ya esté convencido del gran valor de lo que ofreces.',
    href: '/servicios/autoridad'
  },
  {
    title: 'Desarrollo de Sitios Web',
    desc: 'Creamos plataformas de alto rendimiento visual y tecnológico. Más que una página web, esculpimos tu cuartel general digital con reactJS y estética de Silicon Valley.',
    businessTrans: 'El componente donde se consolida la venta. Un sitio tan profesional que automáticamente justifica tus precios, blindando tu credibilidad 24/7 sin margen de error.',
    href: '/servicios/ecosistemas'
  }
];

export default function AgencyHome({ setView }) {
  const [openService, setOpenService] = useState(0); // Meta Ads abierto por default: es el servicio ancla

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
    hidden: { opacity: 0, y: 140, scale: 0.95 },
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

      {/* SECTION 0: HERO */}
      <Hero />

      {/* SECTION 1: EL MANIFIESTO */}
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

      {/* SECTION 2: ARSENAL — acordeón, un servicio a la vez */}
      <section style={{ ...sectionStyle, background: '#F7F4EC', borderTop: '1px solid #D9D2C2' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-150px" }}
          variants={{
            hidden: { opacity: 0, y: 220 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ width: '100%', maxWidth: '800px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 600, color: '#1A1815', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
              Nuestro <span style={{ color: '#D6531D' }}>Arsenal</span> Creativo.
            </h2>
            <p style={{ color: '#6B6459', fontSize: '1.15rem' }}>Las 3 áreas clave para escalar tu negocio de manera estructurada y predecible.</p>
          </div>

          <div style={{ borderTop: '1px solid #D9D2C2' }}>
            {servicesData.map((item, i) => (
              <ServiceAccordionItem
                key={i}
                item={item}
                isOpen={openService === i}
                onToggle={() => setOpenService(i)}
                accentColor={i === 0 ? '#D6531D' : '#1A1815'}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2.5: PRUEBAS BALISTICAS (Showcase) */}
      <ShowcaseSection />

      {/* SECTION 3: THE WHAT (The Object of Desire Showcase) */}
      <section style={{ ...sectionStyle, background: '#EDE7D8' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
          variants={{
             hidden: { opacity: 0, scale: 0.85, y: 100 },
             visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
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
             animate={{ y: [0, -12, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* SECTION 4: EL CIERRE — negativo (ink) para romper el paper de principio a fin */}
      <section style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15vh 5vw 0 5vw',
        background: '#1A1815'
      }}>
        {/* Gran CTA Central */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textAlign: 'center', maxWidth: '1000px', backgroundColor: 'transparent', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid rgba(247,244,236,0.25)', marginBottom: '2rem', margin: '0 auto', color: 'rgba(247,244,236,0.65)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Tu Próximo Nivel
          </div>

          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', fontWeight: 700, color: '#F7F4EC', marginBottom: '1.2rem', letterSpacing: '-0.01em', lineHeight: 1.08 }}>
            Construyamos algo <br/>
            <span style={{ color: '#D6531D' }}>asombroso.</span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'rgba(247,244,236,0.6)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
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
                boxShadow: '4px 4px 0 rgba(0,0,0,0.35)'
              }}
            >
              Iniciar Operación
            </motion.button>
          </div>
        </motion.div>

        {/* Footer en negativo */}
        <Footer dark />
      </section>

    </motion.div>
  );
}
