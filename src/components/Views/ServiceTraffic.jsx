import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import SrWindow from '../SearchPage/SrWindow';
import SrAd from '../SearchPage/SrAd';
import SrOrganic from '../SearchPage/SrOrganic';
import SrCases from '../SearchPage/SrCases';
import SrPaa from '../SearchPage/SrPaa';
import SrMore from '../SearchPage/SrMore';
import SrPanel from '../SearchPage/SrPanel';
import '../SearchPage/searchPage.css';

export default function ServiceTraffic({ setView }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Meta Ads en Monterrey: campañas que traen clientes | Persuasivo</title>
        <meta name="description" content="Campañas de Meta Ads en Facebook e Instagram para empresas en Monterrey: optimizadas por conversiones reales, con embudos de calificación. Solicita una auditoría por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/trafico" />
      </Helmet>
      <div className="sr-page">
        <SrWindow>
          <div className="sr-body">
            <div className="sr-main">
              <SrAd />
              <SrOrganic />
              <SrCases />
              <SrPaa />
              <SrMore />
            </div>
            <SrPanel />
          </div>
        </SrWindow>
      </div>
      <Footer setView={setView} />
    </motion.div>
  );
}
