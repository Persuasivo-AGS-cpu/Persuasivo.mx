import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../Navigation/Footer';
import { getProjectBySlug } from '../../data/caseStudiesData';
import { waLink } from '../../data/contact';

const WA = waLink('Hola, me interesa branding para mi empresa');

const included = [
  ['Diagnóstico y posicionamiento', 'Quién eres, a quién le hablas y qué te diferencia de la competencia.'],
  ['Narrativa de marca', 'Manifiesto, historia y mensajes clave para contar quién eres con claridad.'],
  ['Logotipo y sistema visual', 'Logo, paleta, tipografía y reglas de uso que se reconocen en cualquier lugar.'],
  ['Voz y tono', 'Cómo habla tu marca en redes, web, propuestas y ventas.'],
  ['Manual de identidad', 'Una guía para que tu equipo y tus proveedores mantengan la marca coherente.'],
  ['Aplicaciones', 'Papelería, redes sociales, presentaciones y web con la nueva identidad.'],
];

const steps = [
  ['01', 'Descubrimiento', 'Entendemos tu negocio, tu mercado y a tus clientes.'],
  ['02', 'Estrategia', 'Definimos posicionamiento, narrativa y personalidad de marca.'],
  ['03', 'Identidad', 'Diseñamos el sistema visual y verbal.'],
  ['04', 'Entrega', 'Manual, archivos y aplicaciones listos para usar.'],
];

const faq = [
  ['¿Qué incluye un proyecto de branding?', 'Depende del punto de partida: desde cero, un rediseño o solo posicionamiento y narrativa. En el diagnóstico definimos los entregables exactos.'],
  ['¿Cuánto cuesta y cuánto tarda?', 'Varía según el alcance. Después del diagnóstico recibes una propuesta con inversión y calendario.'],
  ['¿Pueden rediseñar una marca que ya existe?', 'Sí. Evaluamos qué conservar y qué cambiar para no perder el reconocimiento que ya tienes.'],
  ['¿Necesito también un sitio web?', 'No es obligatorio, pero la identidad rinde más cuando se aplica en un sitio y en redes. Podemos hacerlo todo en un solo proyecto.'],
];

const caseSlugs = ['manifiesto-marca', 'arquitectura-visual'];

const h2 = { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '3rem' };
const card = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '2rem' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' };
const section = { padding: '6vw 5vw' };
const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto' };
const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } };

function Cta({ children, dark }) {
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-block', padding: '1.1rem 2.5rem', borderRadius: 'var(--radius-full)', textDecoration: 'none',
      fontWeight: 600, fontSize: '1rem', background: dark ? 'var(--bg-deep)' : 'var(--text-primary)', color: dark ? 'var(--text-primary)' : 'var(--bg-deep)',
    }}>{children}</a>
  );
}

export default function ServiceBranding() {
  const cases = caseSlugs.map(getProjectBySlug).filter(Boolean);
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Branding en Monterrey: identidad y narrativa de marca | Persuasivo</title>
        <meta name="description" content="Identidad de marca, posicionamiento y narrativa para empresas en Monterrey. Una marca que se recuerda y se elige. Solicita un diagnóstico por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/branding" />
      </Helmet>

      {/* HERO */}
      <section style={{ ...section, paddingTop: '18vh', paddingBottom: '8vw' }}>
        <div style={wrap}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Persuasivo · Branding
          </span>
          <h1 style={{ ...h2, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', lineHeight: 0.98, margin: '1.5rem 0', maxWidth: '1000px' }}>
            Una marca que se recuerda y <em>se elige.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.6, maxWidth: '640px', marginBottom: '2.5rem' }}>
            Identidad, posicionamiento y narrativa para que tu empresa cuente quién es con claridad y se distinga de su competencia.
          </p>
          <Cta>Solicitar diagnóstico</Cta>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section style={{ ...section, background: 'var(--bg-deep)' }}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Lo que construimos contigo.</h2>
          <div style={grid}>
            {included.map(([t, d]) => (
              <div key={t} style={card}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.7rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{t}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROCESO */}
      <section style={section}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Cómo trabajamos.</h2>
          <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {steps.map(([n, t, d]) => (
              <div key={n} style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '1.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{n}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.8rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>{t}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CASOS */}
      {cases.length > 0 && (
        <section style={{ ...section, background: 'var(--bg-deep)' }}>
          <motion.div style={wrap} {...reveal}>
            <h2 style={h2}>Marcas que ya cuentan mejor su historia.</h2>
            <div style={grid}>
              {cases.map((c) => (
                <Link key={c.id} to={`/work/${c.slug}`} style={{ ...card, textDecoration: 'none', display: 'block' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--neon)' }}>{c.industry}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.9rem', margin: '0.75rem 0', color: 'var(--text-primary)' }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{c.challenge}</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{c.metricPrefix}{c.metricValue}{c.metricUnit} · {c.metric} →</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* FAQ */}
      <section style={section}>
        <div style={{ ...wrap, maxWidth: '800px' }}>
          <h2 style={h2}>Preguntas frecuentes</h2>
          {faq.map(([q, a]) => (
            <details key={q} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '1.25rem 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{q}</summary>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.75rem' }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ ...section, background: 'var(--text-primary)', textAlign: 'center' }}>
        <h2 style={{ ...h2, color: 'var(--bg-deep)', marginBottom: '1.5rem' }}>Cuéntanos qué marca quieres construir.</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          En el diagnóstico revisamos dónde está tu marca hoy y te proponemos el camino más corto para que se vea y suene como la empresa que eres.
        </p>
        <Cta dark>Solicitar diagnóstico</Cta>
      </section>

      <Footer />
    </motion.div>
  );
}
