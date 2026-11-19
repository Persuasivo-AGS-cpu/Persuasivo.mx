import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import FpProfileHeader from '../FeedPage/FpProfileHeader';
import FpGrid from '../FeedPage/FpGrid';
import '../FeedPage/feedPage.css';

export default function ServiceAuthority({ setView }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Gestión de redes sociales y copywriting en Monterrey | Persuasivo</title>
        <meta name="description" content="Copywriting, identidad visual y gestión de redes sociales para empresas en Monterrey. Contenido que posiciona tu marca y educa a tu prospecto. Solicita un diagnóstico por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/autoridad" />
      </Helmet>
      <main className="fp-page">
        <div className="fp-wrap">
          <FpProfileHeader />
          <FpGrid />
        </div>
      </main>
      <Footer setView={setView} />
    </motion.div>
  );
}
