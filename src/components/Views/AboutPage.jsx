import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import PpMasthead from '../Paper/PpMasthead';
import PpTicker from '../Paper/PpTicker';
import PpHeadline from '../Paper/PpHeadline';
import PpIndex from '../Paper/PpIndex';
import PpWhy from '../Paper/PpWhy';
import PpInside from '../Paper/PpInside';
import PpClassified from '../Paper/PpClassified';
import '../Paper/paper.css';

export default function AboutPage() {
  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: '#f4efe4' }}
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

      <div className="pp-page">
        <div className="pp-sheet">
          <PpMasthead />
          <PpTicker />
          <div className="pp-front">
            <PpHeadline />
            <PpIndex />
            <PpWhy />
          </div>
          <PpInside />
          <PpClassified />
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
