import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../Navigation/Footer';
import ComandaForm from '../Comanda/ComandaForm';
import { comandaCopy, initialForm } from '../../data/comanda';
import '../Comanda/comanda.css';

export default function ContactFlow({ setView }) {
  const [form, setForm] = useState(initialForm);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ width: '100%', minHeight: '100vh', background: '#e6e2d9' }}>
      <Helmet>
        <title>Contacto — Arma tu comanda | Persuasivo</title>
        <meta name="description" content="Cuéntanos qué necesitas y arma tu pedido: Branding, página web, video, redes, Meta Ads o Google Ads. Diagnóstico gratuito de 30 minutos. Respuesta en menos de 24 horas." />
        <link rel="canonical" href="https://persuasivo.com.mx/contacto" />
      </Helmet>

      <div className="cm-page">
        <div className="cm-wrap">
          <header className="cm-head">
            <span className="cm-kicker">{comandaCopy.kicker}</span>
            <h1 className="cm-h1">{comandaCopy.title}</h1>
            <p className="cm-lead">{comandaCopy.sub}</p>
          </header>
          <div className="cm-layout">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <ComandaForm form={form} setForm={setForm} />
              <p className="cm-alt">{comandaCopy.alt} <Link to="/consulta-gratis">{comandaCopy.altLink}</Link></p>
            </div>
          </div>
        </div>
      </div>

      <Footer setView={setView} />
    </motion.div>
  );
}
