import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import WfHeader from '../WebSketch/WfHeader';
import WfHero from '../WebSketch/WfHero';
import { webKicker } from '../../data/webSketch';
import '../WebSketch/webSketch.css';

export default function ServiceEcosystems({ setView }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
      <Helmet>
        <title>Desarrollo web en Monterrey: páginas que venden | Persuasivo</title>
        <meta name="description" content="Sitios y landing pages en React que cargan en menos de 1 segundo y convierten visitas en cotizaciones. Desde $35,000 MXN. Cotiza por WhatsApp." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios/ecosistemas" />
      </Helmet>
      <main className="sk-page">
        <p className="sk-kicker">{webKicker}</p>
        <div className="sk-canvas">
          <WfHeader />
          <WfHero />
        </div>
      </main>
      <Footer setView={setView} />
    </motion.div>
  );
}
