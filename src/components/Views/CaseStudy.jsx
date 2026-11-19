import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { getProjectBySlug, caseStudies } from '../../data/caseStudiesData';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  if (!project) return <Navigate to="/servicios" replace />;

  const relatedProjects = caseStudies.filter(p => p.category === project.category && p.id !== project.id).slice(0, 2);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.challenge,
    "creator": { "@type": "Organization", "name": "Persuasivo", "url": "https://persuasivo.com.mx" },
    "about": project.industry,
    ...(project.href && { "url": project.href }),
    "review": {
      "@type": "Review",
      "reviewBody": project.quote,
      "author": { "@type": "Organization", "name": project.clientName },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  };

  return (
    <motion.div key={`case-${slug}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>

      <Helmet>
        <title>{project.title} — Caso de Éxito | Persuasivo</title>
        <meta name="description" content={`${project.metric} — ${project.challenge?.substring(0, 140)}...`} />
        <link rel="canonical" href={`https://persuasivo.com.mx/work/${project.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      {/* Hero Image */}
      <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '350px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${project.img})`, backgroundSize: 'cover', backgroundPosition: 'top center', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, var(--bg-void) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 2rem', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <Link to="/servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            ← Volver a servicios
          </Link>
          <span style={{ display: 'inline-block', padding: '0.2rem 0.75rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{project.categoryLabel}</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '1rem 0' }}>
            {project.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{project.industry}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Metrics Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {project.results?.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>{r.value}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{r.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Sections (Rich Text) or Legacy Challenge/Solution */}
        {project.contentSections ? (
          project.contentSections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{section.heading}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>{p}</p>
              ))}
              {section.image && (
                <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                  <img src={section.image} alt={section.heading} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            {/* Challenge */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>El Desafío</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>{project.challenge}</p>
            </div>

            {/* Solution */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>La Solución</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>{project.solution}</p>
            </div>
          </>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {project.tags.map(t => (
            <span key={t} style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--border-subtle)' }}>{t}</span>
          ))}
        </div>

        {/* Testimonial */}
        <blockquote style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderLeft: '4px solid var(--text-primary)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>"{project.quote}"</p>
          <footer style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.9rem', marginTop: '1.5rem' }}>— {project.clientName}</footer>
        </blockquote>

        {/* Live Link */}
        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '1rem 2rem',
            borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 700,
            border: '1px solid var(--border-medium)', transition: 'all 0.3s', marginBottom: '4rem'
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = '#FFF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >Ver proyecto en vivo ↗</a>
        )}

        {/* Related */}
        {relatedProjects.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '4rem', marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>Proyectos Relacionados</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedProjects.map(rp => (
                <Link key={rp.id} to={`/work/${rp.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', padding: '1.5rem', transition: 'border-color 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{rp.metric}</p>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{rp.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>{rp.industry}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
          ¿Quieres resultados similares?
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contacto" style={{
            background: 'var(--text-primary)', color: '#FFF', padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)',
            fontWeight: 700, textDecoration: 'none', transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >Agendar Consultoría →</Link>
          <a href="https://wa.me/528110731510" target="_blank" rel="noopener noreferrer" style={{
            color: 'var(--text-primary)', padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)',
            fontWeight: 700, textDecoration: 'none', border: '1px solid var(--border-strong)', transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >WhatsApp →</a>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
