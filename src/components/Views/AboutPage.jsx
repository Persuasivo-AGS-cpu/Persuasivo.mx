import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

// Swap this path when a real headshot is available
const FOUNDER_IMG = null;

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    num: '01',
    title: 'Estrategia antes que ejecución',
    desc: 'No tocamos un anuncio ni escribimos una línea de código sin entender a fondo tu negocio y a tus clientes ideales.'
  },
  {
    num: '02',
    title: 'Resultados con nombre y apellido',
    desc: 'Cada proyecto tiene métricas definidas desde el día uno. No hablamos de "alcance" — hablamos de ventas y leads.'
  },
  {
    num: '03',
    title: 'Comunicación sin traductor',
    desc: 'Reportes claros, sin jerga técnica innecesaria. Sabes exactamente qué se hizo, por qué, y qué sigue.'
  },
  {
    num: '04',
    title: 'Velocidad de startup, rigor de agencia',
    desc: 'Tomamos decisiones rápido y las ejecutamos bien. Sin burocracia. Sin capas de aprobación interminables.'
  },
  {
    num: '05',
    title: 'Un solo punto de contacto',
    desc: 'Trabajas directamente con quien hace el trabajo. Sin cuentas que solo coordinan y facturan.'
  },
  {
    num: '06',
    title: 'Nos importa tu industria',
    desc: 'Antes de proponer cualquier solución, estudiamos tu mercado, tu competencia y tu cliente.'
  }
];

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={{
      padding: '18vh 5vw 8vw 5vw',
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '1.5rem'
        }}>
          Monterrey, NL · Agencia Digital · Est. 2022
        </p>

        <h1 style={{
          fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          marginBottom: '2rem',
          fontFamily: 'var(--font-display)'
        }}>
          Hacemos que tu negocio<br />
          <span style={{ fontStyle: 'italic' }}>crezca en internet.</span>
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginBottom: '3rem'
        }}>
          Meta Ads, Google Ads, desarrollo web y redes sociales
          con estrategia real y resultados documentados.
        </p>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          letterSpacing: '0.02em'
        }}>
          12X ROI promedio&nbsp;&nbsp;·&nbsp;&nbsp;+215% leads&nbsp;&nbsp;·&nbsp;&nbsp;3 años operando&nbsp;&nbsp;·&nbsp;&nbsp;MX + USA
        </p>
      </motion.div>
    </section>
  );
}

function ManifiestoSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });
  const color = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['var(--text-ghost)', 'var(--text-primary)']
  );

  return (
    <section
      ref={containerRef}
      style={{
        padding: '10vw 5vw',
        background: 'var(--bg-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.p style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
        fontWeight: 400,
        color,
        maxWidth: '900px',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-display)',
        textAlign: 'center'
      }}>
        Cada peso que inviertes en marketing debería tener una razón
        y un destino claro. No creamos campañas para verse bien en un reporte.
        Construimos ecosistemas digitales que generan clientes reales,
        ventas reales, crecimiento real. Ese es el único estándar que nos importa.
      </motion.p>
    </section>
  );
}

function PorQueSection() {
  return (
    <section id="por-que" style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '4rem'
        }}>
          Por qué Persuasivo
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{
                display: 'flex',
                gap: '2rem',
                padding: '2.5rem 0',
                borderBottom: '1px solid var(--border-subtle)',
                alignItems: 'flex-start'
              }}
            >
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--text-ghost)',
                fontWeight: 500,
                minWidth: '2rem',
                paddingTop: '0.3rem',
                fontVariantNumeric: 'tabular-nums'
              }}>
                {p.num}
              </span>
              <div>
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  marginBottom: '0.6rem',
                  letterSpacing: '-0.02em'
                }}>
                  {p.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  maxWidth: '600px'
                }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section style={{ padding: '8vw 5vw', background: 'var(--bg-deep)' }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: FOUNDER_IMG ? '1fr 1fr' : '1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>

        {FOUNDER_IMG && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '3/4',
              background: 'var(--border-subtle)'
            }}
          >
            <img
              src={FOUNDER_IMG}
              alt="Abraham Garza — Fundador de Persuasivo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem'
          }}>
            Quién está detrás de Persuasivo
          </p>

          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            lineHeight: 1.05
          }}>
            Abraham Garza
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '1rem',
            maxWidth: '560px'
          }}>
            Llevo 3 años construyendo sistemas de crecimiento digital para negocios en México y Estados Unidos.
          </p>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '1rem',
            maxWidth: '560px'
          }}>
            Empecé Persuasivo porque vi demasiadas agencias vendiendo humo: promesas grandes, reportes bonitos y resultados que nadie podía explicar.
          </p>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '2rem',
            maxWidth: '560px'
          }}>
            Mi apuesta es diferente: menos clientes, más atención, resultados que puedas ver en tu banco.
          </p>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            letterSpacing: '0.02em',
            marginBottom: '1.5rem'
          }}>
            Meta Certified&nbsp;&nbsp;·&nbsp;&nbsp;Google Ads&nbsp;&nbsp;·&nbsp;&nbsp;Desarrollo Web React
            <br />
            Clientes en Monterrey, CDMX, Houston, Austin
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function MetodologiaSection() {
  const phases = [
    {
      num: '01',
      title: 'Diagnóstico',
      desc: 'Analizamos tu situación actual: tráfico, competencia, embudos, mensaje y conversión. Sin costo, sin compromiso.'
    },
    {
      num: '02',
      title: 'Arquitectura',
      desc: 'Diseñamos el sistema completo antes de ejecutar. Qué canales, qué presupuesto, qué mensaje, qué orden.'
    },
    {
      num: '03',
      title: 'Ejecución y Escala',
      desc: 'Implementamos, medimos y optimizamos semana a semana. Escalamos lo que funciona. Cortamos lo que no.'
    }
  ];

  return (
    <section style={{ padding: '8vw 5vw', background: 'var(--bg-void)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '4rem'
        }}>
          Cómo trabajamos
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0'
        }}>
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                padding: '2.5rem',
                paddingLeft: i > 0 ? '2.5rem' : '0',
                paddingRight: i < phases.length - 1 ? '2.5rem' : '0',
                borderRight: i < phases.length - 1 ? '1px solid var(--border-subtle)' : 'none'
              }}
            >
              <p style={{
                fontSize: 'clamp(3rem, 5vw, 4rem)',
                fontWeight: 400,
                color: 'var(--text-ghost)',
                fontFamily: 'var(--font-display)',
                lineHeight: 1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.04em'
              }}>
                {phase.num}
              </p>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.8rem',
                letterSpacing: '-0.02em'
              }}>
                {phase.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.7
              }}>
                {phase.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section style={{
      padding: '10vw 5vw',
      background: 'var(--bg-deep)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '1.5rem'
        }}>
          ¿Tu negocio debería<br />
          <span style={{ fontStyle: 'italic' }}>facturar más?</span>
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          maxWidth: '500px',
          marginInline: 'auto',
          marginBottom: '3rem'
        }}>
          Empieza con un diagnóstico gratuito de 30 minutos.
          Sin presión. Sin venderte nada que no necesitas.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            to="/contacto"
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-deep)',
              padding: '1.2rem 3rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--text-secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--text-primary)'; }}
          >
            Agendar diagnóstico
          </Link>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}>
            Respuesta en menos de 24 horas
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}
    >
      <Helmet>
        <title>Nosotros — Agencia Digital en Monterrey | Persuasivo</title>
        <meta name="description" content="Persuasivo es una agencia digital en Monterrey especializada en Meta Ads, Google Ads y desarrollo web. Conoce quién está detrás y cómo trabajamos." />
        <link rel="canonical" href="https://persuasivo.com.mx/nosotros" />
        <meta property="og:title" content="Nosotros | Persuasivo — Agencia Digital Monterrey" />
        <meta property="og:description" content="Hacemos que tu negocio crezca en internet. Meta Ads, Google Ads, desarrollo web y redes sociales con resultados documentados." />
        <meta property="og:url" content="https://persuasivo.com.mx/nosotros" />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <ManifiestoSection />
      <PorQueSection />
      <FounderSection />
      <MetodologiaSection />
      <CtaSection />

      <Footer />
    </motion.div>
  );
}
