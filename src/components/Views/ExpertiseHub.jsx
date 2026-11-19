import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { services } from '../../data/servicesData';
import { hubIntro } from '../../data/hub';
import HubCards from '../ServicesHub/HubCards';
import HubGoals from '../ServicesHub/HubGoals';
import '../ServicesHub/hub.css';

export default function ExpertiseHub() {
  const [goalId, setGoalId] = useState(null);
  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicios de Persuasivo",
    "itemListElement": services.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.longDesc,
        "provider": { "@type": "Organization", "name": "Persuasivo" },
        "url": `https://persuasivo.com.mx${s.routePath}`
      }
    }))
  };

  return (
    <motion.div key="expertise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Helmet>
        <title>Servicios — Branding, Web, Video, Redes y Meta Ads | Persuasivo</title>
        <meta name="description" content="Branding, desarrollo web con React desde $35,000 MXN, contenido en video, redes sociales y Meta Ads con ROI 12X. Elige el servicio que tu negocio necesita." />
        <link rel="canonical" href="https://persuasivo.com.mx/servicios" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <div className="hub-page">
        <div className="hub-wrap">
          <header>
            <span className="hub-kicker">{hubIntro.kicker}</span>
            <h1 className="hub-h1">{hubIntro.title}</h1>
            <p className="hub-lead">{hubIntro.sub}</p>
            <HubGoals goalId={goalId} onChange={setGoalId} />
          </header>
          <HubCards goalId={goalId} />
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
