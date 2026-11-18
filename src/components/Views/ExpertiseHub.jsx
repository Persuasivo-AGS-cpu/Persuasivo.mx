import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { services } from '../../data/servicesData';
import { getProjectsByCategory } from '../../data/caseStudiesData';

export default function ExpertiseHub() {
  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicios de Persuasivo",
    "itemListElement": services.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.longDesc,
        "provider": { "@type": "Organization", "name": "Persuasivo" },
        "url": `https://persuasivo.com.mx${s.routePath}`
      }
    }))
  };

  return (
    <motion.div key="expertise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>

      <Helmet>
        <title>Servicios — Desarrollo Web, Meta Ads & Copywriting | Persuasivo</title>
        <meta name="description" content="Servicios de agencia creativa: desarrollo web con React desde $35,000 MXN, Meta Ads con ROI 12X, y copywriting de conversión. Conoce nuestras metodologías." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '15vh 2rem 6rem 2rem', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Servicios</span>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '1rem 0 1.5rem 0', fontFamily: 'var(--font-display)' }}>
            ¿Qué hacemos en Persuasivo?
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', maxWidth: '700px', lineHeight: 1.6 }}>
            Disciplinas complementarias. Un solo objetivo: que tu negocio facture más con menos fricción.
          </p>
        </motion.div>
      </section>

      {/* Services Detail */}
      {services.map((service, idx) => {
        const relatedProjects = getProjectsByCategory(service.id).slice(0, 2);
        return (
          <section key={service.id} id={service.slug}
            style={{ padding: '5rem 2rem', borderTop: '1px solid var(--border-subtle)', background: idx % 2 === 0 ? 'var(--bg-deep)' : 'var(--bg-void)' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{service.icon}</span>
                  <div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0, fontFamily: 'var(--font-display)' }}>{service.title}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{service.subtitle}</p>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '800px', marginBottom: '3rem' }}>{service.longDesc}</p>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                  {service.metrics.map((m, i) => (
                    <div key={i} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                      <p style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 900, margin: 0, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>{m.value}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Capabilities */}
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>¿Qué incluye?</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.8rem' }}>
                    {service.capabilities.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 800 }}>✓</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ (AEO-critical) */}
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Preguntas Frecuentes</h3>
                  {service.faq.map((f, i) => (
                    <details key={i} style={{ marginBottom: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                      <summary style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {f.question}
                        <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 300, marginLeft: '1rem', flexShrink: 0 }}>+</span>
                      </summary>
                      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        {f.answer}
                      </div>
                    </details>
                  ))}
                </div>

                {/* Related projects */}
                {relatedProjects.length > 0 && (
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {relatedProjects.map(rp => (
                      <Link key={rp.id} to={`/work/${rp.slug}`} style={{
                        flex: '1 1 280px', textDecoration: 'none', background: 'var(--bg-card)',
                        padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                        transition: 'border-color 0.3s'
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>{rp.metric}</p>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{rp.title}</h4>
                      </Link>
                    ))}
                  </div>
                )}

                <Link to={service.routePath} style={{
                  display: 'inline-block', color: 'var(--text-primary)', border: '1px solid var(--border-strong)',
                  padding: '0.7rem 2rem', borderRadius: 'var(--radius-full)', textDecoration: 'none',
                  fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                >Ver metodología completa →</Link>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
          ¿Listo para escalar?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Empezamos con un diagnóstico rápido de tu situación actual.
        </p>
        <Link to="/contacto" style={{
          display: 'inline-block', background: 'var(--text-primary)', color: 'var(--bg-void)', padding: '1rem 3rem',
          borderRadius: 'var(--radius-full)', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase',
          letterSpacing: '0.05em', transition: 'background 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--neon)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--text-primary)'}
        >Agendar Consultoría →</Link>
      </section>

      <Footer />
    </motion.div>
  );
}
