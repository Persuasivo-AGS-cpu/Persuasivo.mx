import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import LandingHero from './LandingHero';
import { services } from '../../data/servicesData';
import { getFeaturedProjects } from '../../data/caseStudiesData';
import { blogPosts } from '../../data/blogData.jsx';

/* ─── Philosophical Scroll Reveal ─── */
function ScrollRevealText() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const color = useTransform(scrollYProgress, [0, 0.8], ["var(--text-ghost)", "var(--text-primary)"]);

  return (
    <section 
      ref={containerRef}
      style={{
        padding: '10vw 5vw',
        background: 'var(--bg-void)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.h2 style={{
        fontSize: 'clamp(2.5rem, 6vw, 6rem)',
        fontWeight: 500,
        color,
        maxWidth: '1200px',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        textAlign: 'center',
        fontFamily: 'var(--font-display)'
      }}>
        Entendemos tu negocio y a tus clientes. Te damos el poder de impactar a cualquier escala.
      </motion.h2>
    </section>
  );
}

/* ─── Horizontal Carousel for Work ─── */
function WorkCarousel({ projects }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      ref={containerRef}
      style={{
        height: '200vh', // Create scroll space
        background: 'var(--bg-deep)',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <motion.div style={{ x, display: 'flex', gap: '4rem', paddingLeft: '5vw' }}>
          {projects.map((p) => (
            <Link to={`/work/${p.slug}`} key={p.id} style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 'clamp(300px, 40vw, 600px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  background: 'var(--border-subtle)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${p.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                    {p.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{p.industry}</span>
                    <span style={{ color: 'var(--text-ghost)' }}>/</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.tags.slice(0,2).join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          <div style={{ width: '5vw' }} /> {/* Right padding filler */}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Editorial Service List ─── */
function EditorialServices({ services }) {
  return (
    <section id="services" style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4rem' }}>
          Nuestras Disciplinas
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((s, idx) => (
            <Link to={s.routePath} key={s.id} style={{ textDecoration: 'none' }}>
              <motion.div 
                initial="initial"
                whileHover="hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '3rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                  <span style={{ fontSize: '1rem', color: 'var(--text-ghost)', fontWeight: 500 }}>
                    0{idx + 1}
                  </span>
                  <motion.h3 
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 20 }
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                  >
                    {s.title}
                  </motion.h3>
                </div>
                
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: -10 },
                    hover: { opacity: 1, x: 0 }
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── Main Home Component ─── */
export default function AgencyHome() {
  const location = useLocation();
  const featuredProjects = getFeaturedProjects();

  React.useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.8 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>

      <Helmet>
        <title>Persuasivo | Arquitectura Digital para Ecosistemas de Alto Rendimiento</title>
        <meta name="description" content="Estrategia digital, diseño de experiencias y performance para empresas que piensan diferente." />
        <link rel="canonical" href="https://persuasivo.com.mx" />
        <meta property="og:title" content="Persuasivo | Arquitectura Digital de Alto Rendimiento" />
        <meta property="og:description" content="Para marcas que no tienen miedo de ser recordadas." />
        <meta property="og:url" content="https://persuasivo.com.mx" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <LandingHero />

      {/* PHILOSOPHICAL SCROLL REVEAL */}
      <ScrollRevealText />

      {/* HORIZONTAL CAROUSEL WORK */}
      <WorkCarousel projects={featuredProjects} />

      {/* EDITORIAL SERVICES */}
      <EditorialServices services={services} />

      {/* FINAL CTA */}
      <section style={{ padding: '10vw 5vw', background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
            Construyamos algo <br /><span style={{ fontStyle: 'italic' }}>asombroso.</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '600px', marginInline: 'auto' }}>
            Cada día con un ecosistema digital obsoleto es dinero perdido y terreno cedido a tu competencia.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacto" style={{
              background: 'var(--text-primary)', color: 'var(--bg-deep)', padding: '1.2rem 3rem', borderRadius: 'var(--radius-full)',
              fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'background 0.3s'
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--text-secondary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--text-primary)' }}
            >Agendar Consultoría</Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  );
}
