import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import BbHero from '../BrandBoard/BbHero';
import '../BrandBoard/brandBoard.css';

export default function ServiceBranding() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: '#f6efe3' }}>
      <Helmet>
        <title>Branding en Monterrey: identidad y narrativa de marca | Persuasivo</title>
        <meta name="description" content="Identidad de marca, posicionamiento y narrativa para empresas en Monterrey. Una marca que se recuerda y se elige. Solicita un diagnóstico por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/branding" />
      </Helmet>
      <main className="bb-page">
        <div className="bb-wrap">
          <BbHero />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
