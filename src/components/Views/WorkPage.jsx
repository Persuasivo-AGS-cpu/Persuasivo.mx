import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { caseStudies, getAllCategories } from '../../data/caseStudiesData';

/* ─── Editorial Project Card ─── */
function ProjectCard({ project, index }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.05, duration: 0.5 }}>
      <Link to={`/work/${project.slug}`} style={{ textDecoration: 'none', display: 'block', group: 'true' }}>
        <motion.div
          whileHover="hover"
          initial="initial"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
        >
          <div style={{
            position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
            background: 'var(--border-subtle)', aspectRatio: '4/3', width: '100%'
          }}>
            <motion.div
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%', height: '100%',
                backgroundImage: `url(${project.img})`, backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
          
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem 0' }}>
              {project.title}
            </h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                {project.industry}
              </span>
              <span style={{ color: 'var(--border-strong)', fontSize: '0.9rem' }}>—</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                {project.tags.slice(0, 2).join(', ')}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const categories = getAllCategories();

  const filtered = activeFilter === 'all' ? caseStudies : caseStudies.filter(p => p.category === activeFilter);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>

      <Helmet>
        <title>Portafolio de Proyectos | Casos de Éxito — Persuasivo</title>
        <meta name="description" content="Explora nuestro portafolio de proyectos: desarrollo web con React, campañas de Meta Ads con ROI 12X, y estrategias de copywriting que aumentan conversiones +215%." />
        <link rel="canonical" href="https://persuasivo.com.mx/work" />
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '15vh 2rem 4rem 2rem', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Portafolio</span>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '1rem 0 1.5rem 0', fontFamily: 'var(--font-display)' }}>
            Pruebas Balísticas.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', maxWidth: '650px', lineHeight: 1.6 }}>
            Cada proyecto es una operación documentada. Sin capturas de plantillas. Solo resultados reales con métricas verificables.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div style={{ padding: '0 2rem', maxWidth: 'var(--container-max)', margin: '0 auto 3rem auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveFilter(cat.id)} style={{
              background: activeFilter === cat.id ? 'var(--text-primary)' : 'transparent',
              color: activeFilter === cat.id ? 'var(--bg-void)' : 'var(--text-muted)',
              border: activeFilter === cat.id ? '1px solid var(--text-primary)' : '1px solid var(--border-subtle)',
              padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
              letterSpacing: '0.5px'
            }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '0 2rem 6rem 2rem', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem 3rem' }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
          ¿Quieres resultados así?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Cada proyecto empieza con una conversación de 15 minutos.
        </p>
        <Link to="/contacto" style={{
          background: 'var(--text-primary)', color: 'var(--bg-void)', padding: '1.2rem 3rem', borderRadius: 'var(--radius-full)',
          fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
          textDecoration: 'none', transition: 'background 0.3s', display: 'inline-block'
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neon)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--text-primary)' }}
        >Agendar Consultoría</Link>
      </section>

      <Footer />
    </motion.div>
  );
}
