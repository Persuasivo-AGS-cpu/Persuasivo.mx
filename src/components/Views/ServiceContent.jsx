import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import VsHero from '../VideoStudio/VsHero';
import VsTimeline from '../VideoStudio/VsTimeline';
import '../VideoStudio/videoStudio.css';

export default function ServiceContent() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: '#0b0b0c' }}>
      <Helmet>
        <title>Videos para empresas B2B en Monterrey | Persuasivo CEO Content Studio</title>
        <meta name="description" content="Diseñamos y producimos campañas de video para empresas B2B en Monterrey: explican tu producto, muestran cómo trabajas y posicionan a tus líderes." />
        <link rel="canonical" href="https://persuasivo.com.mx/contenido" />
      </Helmet>
      <main className="vs-page">
        <div className="vs-wrap">
          <VsHero />
          <VsTimeline />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
