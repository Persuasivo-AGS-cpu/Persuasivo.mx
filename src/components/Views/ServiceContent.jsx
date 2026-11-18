import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

const WA = 'https://wa.me/528110731510?text=' + encodeURIComponent('Hola, quiero solicitar un diagnóstico de video para mi empresa');

const lines = [
  { tag: 'Líder', title: 'El criterio de quien decide', text: 'Entrevistas breves donde tu director o fundador responde las preguntas que sí hace el comprador. Cada respuesta funciona como un video independiente.' },
  { tag: 'Marca', title: 'La empresa por dentro', text: 'Recorrido por taller u oficinas: manos, herramientas, inspección y personas reales. Confianza sin depender de visitas ni catálogos.' },
  { tag: 'Producto', title: 'Verlo en uso', text: 'Demostraciones y anuncios de unos 20 segundos: contexto, demostración y una sola acción para cotizar.' },
];

const months = [
  { m: 'Mes 1 · Dar contexto', t: 'Qué revisar al elegir. Recorrido por el taller. Demostración del producto. Anuncio: qué datos enviar para cotizar.' },
  { m: 'Mes 2 · Resolver dudas', t: 'Preguntas frecuentes de especificación. Errores comunes. Qué considera el equipo antes de instalar. Demostración de un herraje.' },
  { m: 'Mes 3 · Apoyar la decisión', t: 'Cómo compara opciones el arquitecto. Del levantamiento a la instalación. Revisión previa a la entrega. Anuncio de la solución.' },
];

const steps = [
  ['01', 'Diagnóstico', 'Objetivo, público, oferta prioritaria, canales y quién aprueba.'],
  ['02', 'Preproducción', 'Calendario, guiones, lista de tomas, locación y tiempos.'],
  ['03', 'Rodaje', 'Sesiones concentradas por locación y talento, con audio y respaldos verificados.'],
  ['04', 'Edición y entrega', 'Piezas finales con subtítulos, una ronda consolidada de ajustes y entrega mensual.'],
];

const plans = [
  { name: 'Starter', n: 4, text: 'Un objetivo prioritario: explicar una solución o presentar al fundador.' },
  { name: 'Brand Authority', n: 8, text: 'Dos líneas combinadas, por ejemplo criterio del líder y demostraciones comerciales.' },
  { name: 'Brand Expert', n: 12, text: 'Varias líneas y cadencia sostenida para marcas con más productos o campañas.' },
];

const faq = [
  ['¿Qué cuenta como un video?', 'Una pieza final con guion, montaje y formato principal acordados. Si necesitas otro encuadre, idioma o duración, la propuesta indica cuántas adaptaciones incluye.'],
  ['¿Cuánto dura el compromiso?', 'Iniciamos con tres meses para probar cómo responde tu audiencia. Si planeas con más anticipación, hay opción de seis meses con un segundo bloque de rodaje.'],
  ['¿Cuánto cuesta?', 'Depende del volumen mensual, las jornadas de rodaje y la edición. En el diagnóstico te recomendamos un volumen y recibes una propuesta con inversión y calendario.'],
  ['¿Ustedes publican los videos?', 'Entregamos las piezas listas para tu calendario. Publicación, gestión de comunidad y pauta se pueden agregar como servicio adicional.'],
];

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

export default function ServiceContent() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Videos para empresas B2B en Monterrey | Persuasivo CEO Content Studio</title>
        <meta name="description" content="Diseñamos y producimos campañas de video para empresas B2B en Monterrey: explican tu producto, muestran cómo trabajas y posicionan a tus líderes." />
        <link rel="canonical" href="https://persuasivo.com.mx/contenido" />
      </Helmet>

      {/* HERO */}
      <section style={{ ...section, paddingTop: '18vh', paddingBottom: '8vw' }}>
        <div style={wrap}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Persuasivo · CEO Content Studio
          </span>
          <h1 style={{ ...h2, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', lineHeight: 0.98, margin: '1.5rem 0', maxWidth: '1000px' }}>
            Videos para que tus clientes entiendan qué vendes y <em>por qué elegirte.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.6, maxWidth: '640px', marginBottom: '2.5rem' }}>
            Diseñamos y producimos campañas de video para empresas B2B en Monterrey. Cada mes recibes piezas listas para explicar tu producto, mostrar cómo trabaja tu empresa o posicionar a sus líderes.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Cta>Solicitar diagnóstico</Cta>
            <a href="#como-funciona" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4 }}>Ver cómo funciona</a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2rem' }}>
            Para fundadores, directores comerciales y responsables de marketing de fabricantes y proveedores de construcción e industria.
          </p>
        </div>
      </section>

      {/* TRES LÍNEAS */}
      <section style={{ ...section, background: 'var(--bg-deep)' }}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Tres líneas de contenido, una sola campaña.</h2>
          <div style={grid}>
            {lines.map((l) => (
              <div key={l.tag} style={card}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--neon)' }}>{l.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.9rem', margin: '0.75rem 0', color: 'var(--text-primary)' }}>{l.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{l.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* EJEMPLO */}
      <section style={section}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Ejemplo: fabricante de puertas de emergencia.</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Escenario ilustrativo con el paquete Starter: 12 piezas en tres meses para que arquitectos, especificadores y compradores industriales entiendan la solución y sepan cómo cotizar.
          </p>
          <div style={grid}>
            {months.map((x) => (
              <div key={x.m} style={card}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{x.m}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{x.t}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROCESO */}
      <section id="como-funciona" style={{ ...section, background: 'var(--bg-deep)' }}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Del diagnóstico a la entrega mensual.</h2>
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

      {/* PAQUETES (sin precios hasta validar costos) */}
      <section style={section}>
        <motion.div style={wrap} {...reveal}>
          <h2 style={h2}>Igualas mensuales de video terminado.</h2>
          <div style={grid}>
            {plans.map((p) => (
              <div key={p.name} style={card}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '2rem', color: 'var(--text-primary)' }}>{p.name}</h3>
                <p style={{ fontSize: '3rem', fontWeight: 500, margin: '0.5rem 0 0', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{p.n}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>videos al mes · compromiso inicial de 3 meses</p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.text}</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', fontSize: '0.95rem' }}>
            La inversión se define en el diagnóstico según volumen, jornadas de rodaje y edición.
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section style={{ ...section, background: 'var(--bg-deep)' }}>
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
        <h2 style={{ ...h2, color: 'var(--bg-deep)', marginBottom: '1.5rem' }}>Empieza con tres ideas de video para tu empresa.</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          En el diagnóstico te mostramos tres ideas ligadas a tu negocio y te recomendamos el volumen mensual que tenga sentido para tu objetivo.
        </p>
        <Cta dark>Solicitar diagnóstico</Cta>
      </section>

      <Footer />
    </motion.div>
  );
}
