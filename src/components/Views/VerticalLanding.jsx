import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { verticalsData, localData } from '../../data/verticalsData';
import Footer from '../Navigation/Footer';

export default function VerticalLanding({ type, setView }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Determine which data dictionary to use
  const dataMap = type === 'local' ? localData : verticalsData;
  const data = dataMap[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fallback if the route parameter doesn't match our data
  if (!data) {
    return (
      <div style={{ padding: '20vh 5vw', textAlign: 'center', color: 'white', background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--neon)' }}>Página no encontrada</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>El recurso que buscas no está disponible actualmente.</p>
        <div>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'var(--neon)', color: 'black', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  // Schema.org Structured Data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type === 'local' ? "LocalBusiness" : "ProfessionalService",
    "name": `Persuasivo - ${data.title || data.city}`,
    "url": `https://persuasivo.com.mx/${type === 'local' ? 'agencia-marketing' : 'soluciones'}/${id}`,
    "description": data.subtitle,
    "telephone": "+528110802911",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.city || "Monterrey",
      "addressCountry": "MX"
    }
  };

  // FAQ Schema (Great for ranking on 'People Also Ask')
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `¿Por qué elegir a Persuasivo como agencia en ${data.city || data.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos enfocamos exclusivamente en retorno de inversión (ROI) y generación de prospectos calificados, alejándonos de métricas de vanidad como likes o seguidores."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los precios de una estrategia de marketing profesional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los esquemas profesionales de performance marketing en México comienzan desde los $15,000 MXN mensuales dependiendo de los objetivos comerciales y canales utilizados."
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050505' }}
    >
      <Helmet>
        <title>{data.h1} | Persuasivo</title>
        <meta name="description" content={data.subtitle} />
        <meta name="keywords" content={data.keyword} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${data.h1} | Persuasivo`} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data injections */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumbs */}
      <div style={{ padding: '10vh 5vw 0 5vw', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Inicio</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{type === 'local' ? 'Local' : 'Soluciones'}</span>
          <span>/</span>
          <span style={{ color: 'var(--neon)' }}>{data.city || data.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '25vh 5vw 15vh 5vw', 
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, #151515 0%, #050505 80%)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', border: '1px solid rgba(224,255,49,0.3)', borderRadius: '50px', marginBottom: '2rem', color: 'var(--neon)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', background: 'rgba(224,255,49,0.05)' }}>
            {type === 'local' ? `Marketing en ${data.city}` : `Soluciones para ${data.title}`}
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '1000px', marginBottom: '1.5rem', margin: '0 auto 1.5rem auto' }}>
            {data.h1}
          </h1>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
            {data.subtitle}
          </p>

          <Link 
            to="/consulta-gratis"
            style={{ 
              display: 'inline-block',
              background: 'var(--neon)', 
              color: '#000', 
              textDecoration: 'none',
              padding: '1.2rem 3rem', 
              borderRadius: '50px', 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              boxShadow: '0 10px 30px rgba(224, 255, 49, 0.2)', 
              transition: 'transform 0.2s, box-shadow 0.2s' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(224, 255, 49, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(224, 255, 49, 0.2)';
            }}
          >
            Agendar Diagnóstico Gratuito
          </Link>
        </motion.div>
      </section>

      {/* Specific Content Section */}
      <section style={{ padding: '10vh 5vw', background: '#020202', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* If Vertical: Show Benefits */}
        {type === 'vertical' && data.benefits && (
          <div style={{ maxWidth: '1200px', width: '100%', marginBottom: '8rem' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 800 }}>
              ¿Cómo transformamos {data.title}?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {data.benefits.map((benefit, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: '#000', background: 'var(--neon)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    {idx + 1}
                  </div>
                  <p style={{ color: '#ddd', fontSize: '1.1rem', lineHeight: 1.6 }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If Local: Show Geo Authority */}
        {type === 'local' && (
          <div style={{ maxWidth: '1200px', width: '100%', marginBottom: '8rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 800 }}>
              Dominio Local en {data.city}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
              No importa si estás en corporativos de Valle Oriente o zonas industriales, implementamos embudos de adquisición que filtran prospectos de alto valor adquisitivo y eliminan los contactos basura.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {['Búsqueda Orgánica (SEO)', 'Pauta en Google Ads', 'Meta Ads Avanzado', 'Automatización de Leads'].map((service, i) => (
                <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid #E0FF31', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{service}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Universal Section: "El Costo de No Hacerlo Bien" */}
        <div style={{ maxWidth: '1000px', width: '100%', background: 'linear-gradient(135deg, rgba(224,255,49,0.05) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid var(--neon-glow)', borderRadius: '24px', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--neon)', fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Deja de competir por precio.
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', lineHeight: 1.6, marginBottom: '2rem' }}>
            Las empresas que lideran hoy no tienen necesariamente el mejor servicio; tienen el <strong>mejor sistema de adquisición</strong>. Nosotros construimos ese sistema para ti.
          </p>
          <Link to="/consulta-gratis" style={{ display: 'inline-block', background: 'var(--text-primary)', color: '#000', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>
            Hablar con un estratega hoy
          </Link>
        </div>

      </section>

      {/* Embedded Footer */}
      <Footer setView={setView} />
    </motion.div>
  );
}

