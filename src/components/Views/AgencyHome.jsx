import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import LandingHero from './LandingHero';
import ServiceList from '../Home/ServiceList';
import ValuesRibbon from '../Home/ValuesRibbon';
import PhoneFrame from '../Home/PhoneFrame';
import MetricsBand from '../Home/MetricsBand';
import Testimonials from '../Home/Testimonials';
import { getFeaturedProjects } from '../../data/caseStudiesData';
import { waLink } from '../../data/contact';

/* ─── Scroll Reveal Text ─── */
function ScrollRevealText() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const color = useTransform(scrollYProgress, [0, 0.8], ['var(--text-ghost)', 'var(--text-primary)']);

  return (
    <section
      ref={containerRef}
      style={{ padding: '10vw 5vw', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.h2
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 6rem)',
          fontWeight: 500,
          color,
          maxWidth: '1200px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
        }}
      >
        Entendemos tu negocio y a tus clientes. Te damos el poder de impactar a cualquier escala.
      </motion.h2>
    </section>
  );
}

/* ─── Horizontal Work Carousel (phone frames) ─── */
function WorkCarousel({ projects }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={containerRef} style={{ height: '200vh', background: 'var(--bg-deep)', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)', padding: '0 5vw', marginBottom: '2rem' }}>
          Portafolio
        </h2>
        <motion.div style={{ x, display: 'flex', gap: '3rem', paddingLeft: '5vw' }}>
          {projects.map((p) => (
            <Link to={`/work/${p.slug}`} key={p.id} style={{ textDecoration: 'none', flex: '0 0 auto' }}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: 'clamp(200px, 24vw, 290px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
              >
                <PhoneFrame src={p.img} alt={p.title} />
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {p.industry}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
          <div style={{ flex: '0 0 5vw' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Home ─── */
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
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}
    >
      <Helmet>
        <title>Agencia de Marketing Digital en Monterrey | Persuasivo</title>
        <meta name="description" content="Branding, desarrollo web, contenido en video y Meta Ads para empresas en Monterrey. Solicita una cotización por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx" />
        <meta property="og:title" content="Persuasivo | Agencia de Marketing Digital en Monterrey" />
        <meta property="og:description" content="Para marcas que no tienen miedo de ser recordadas." />
        <meta property="og:url" content="https://persuasivo.com.mx" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LandingHero />
      <ScrollRevealText />
      <ServiceList />
      <ValuesRibbon />
      <WorkCarousel projects={featuredProjects} />
      <MetricsBand />
      <Testimonials />

      {/* FINAL CTA */}
      <section style={{ padding: '10vw 5vw', background: 'var(--bg-deep)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
            Construyamos algo <br /><span style={{ fontStyle: 'italic' }}>asombroso.</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
            Cada día con un ecosistema digital obsoleto es dinero perdido y terreno cedido a tu competencia.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={waLink('Hola, quiero una cotización')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--text-primary)', color: 'var(--bg-deep)', padding: '1.2rem 3rem', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Escríbenos por WhatsApp
            </a>
            <Link
              to="/contacto"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)', padding: '1.2rem 3rem', borderRadius: 'var(--radius-full)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Agendar consultoría
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  );
}
