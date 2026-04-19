import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';

export default function ServiceTraffic({ setView }) {
  return (
    <motion.div 
      key="service-traffic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; } 
        .radial-bg { background: radial-gradient(circle at top center, rgba(224, 255, 49, 0.05) 0%, transparent 60%); }
      `}</style>
      
      <Helmet>
        <title>Tráfico Quirúrgico y Pauta Digital | Persuasivo</title>
        <meta name="description" content="Entrenamiento de algoritmos de Meta Ads. Pautas digitales escalables de alto retorno (ROAS)." />
      </Helmet>

      <div className="radial-bg" style={{ flex: 1, padding: '15vh 5vw 10vh 5vw', display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '900px' }}
        >
          {/* SEO Header & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ 
              background: 'rgba(224, 255, 49, 0.1)', color: '#E0FF31', padding: '0.4rem 1rem', 
              borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              Metodología 01
            </span>
            <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>Adquisición Predictiva</span>
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '2rem' }}>
            Tráfico Quirúrgico.
          </h1>
          
          <p style={{ color: '#A1A1AA', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', lineHeight: 1.6, marginBottom: '4rem', maxWidth: '800px', fontWeight: 400 }}>
            Tener el mejor producto del mundo es irrelevante si eres invisible. Olvídate de los "likes" y el alcance vacío. Construimos sistemas de pauta digital que inyectan clientes con capital directamente en tu ecosistema.
          </p>

          <img 
            src="/showcase/placeholder-charts.png" 
            alt="Métricas de Retorno de Inversión y Escalamiento de Pauta" 
            style={{ width: '100%', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '5rem', background: '#111', height: '400px', objectFit: 'cover' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Data Oscura (Meta Ads)</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Mientras tu competencia sube videos bailando, nosotros entrenamos el algoritmo de Meta con conversiones de alto nivel. Usamos píxeles maduros y datos demográficos cerrados para mostrar tus ofertas únicamente a quienes ya tienen la tarjeta de crédito en la mano.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Escalamiento Vertical</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                El problema de la mayoría es que no soportan facturar el doble sin que su sistema se rompa. Nuestra arquitectura publicitaria permite duplicar la inversión (ROAS) sin perder margen de beneficio, estabilizando tu adquisición de clientes a largo plazo.
              </p>
            </div>
            <div>
               <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Filtro de Fricción</h3>
              <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: 1.7 }}>
                No queremos que hables con 100 personas pobres. Queremos que hables con 5 personas cualificadas. Implementamos embudos (Funnels) posteriores al anuncio que filtran a los prospectos por presupuesto y dolor antes de que lleguen a tu equipo comercial.
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '4rem', borderRadius: '32px', textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>¿Listo para dominar la atención?</h2>
            <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Iniciaremos con una auditoría profunda de tu infraestructura publicitaria actual para detectar las hemorragias de dinero.
            </p>
            <motion.button 
              onClick={() => setView('contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(180deg, #E0FF31 0%, #B8D900 100%)',
                color: '#000', border: 'none', padding: '1.2rem 3rem',
                borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '1px',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 10px 30px rgba(224, 255, 49, 0.3)',
                cursor: 'pointer'
              }}
            >
              Iniciar Operación
            </motion.button>
          </div>

        </motion.div>
      </div>

      <Footer setView={setView} />
    </motion.div>
  );
}
