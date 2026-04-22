import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import ArcadeCabinet from './components/ArcadeCabinet';
import GlassNavbar from './components/Navigation/GlassNavbar';
import LandingHero from './components/Views/LandingHero';
import AgencyHome from './components/Views/AgencyHome';
import ContactFlow from './components/Views/ContactFlow';
import LegalView from './components/Views/LegalView';
import ServiceTraffic from './components/Views/ServiceTraffic';
import ServiceAuthority from './components/Views/ServiceAuthority';
import ServiceEcosystems from './components/Views/ServiceEcosystems';
import ClientOnboarding from './components/Views/ClientOnboarding';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Adapter function to maintain legacy compatibility across all components
  const setView = (viewName) => {
    const routeMap = {
      landing: '/',
      agency: '/agencia',
      contact: '/contacto',
      arcade: '/arcade',
      privacy: '/legal/privacidad',
      terms: '/legal/terminos',
      cookies: '/legal/cookies',
      service_traffic: '/servicios/trafico',
      service_authority: '/servicios/autoridad',
      service_ecosystems: '/servicios/ecosistemas'
    };
    navigate({ pathname: routeMap[viewName] || '/', search: location.search });
  };

  // Reverse mapping for Navbar active state indicator
  const pathParts = location.pathname.split('/');
  let activeViewId = 'landing';
  if (location.pathname === '/agencia') activeViewId = 'agency';
  else if (location.pathname === '/contacto') activeViewId = 'contact';
  else if (pathParts.includes('servicios') || location.pathname === '/arcade') activeViewId = 'agency'; // Keep agency active when deep in services

  return (
    <main style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden', background: '#050505', color: 'white' }}>
      
      {/* Global Meta Data base */}
        <Helmet>
          <title>Persuasivo | Arquitectura Digital de Alto Rendimiento</title>
          <meta name="description" content="Agencia creativa especializada en desarrollo de Sitios Web de alta conversión, Copywriting y Meta Ads." />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "ProfessionalService",
                    "name": "Persuasivo",
                    "url": "https://persuasivo.com.mx",
                    "logo": "https://persuasivo.com.mx/favicon.svg",
                    "description": "Agencia creativa especializada en desarrollo de Sitios Web de alta conversión, Copywriting y Meta Ads.",
                    "knowsAbout": ["Desarrollo Web", "React", "Meta Ads", "Copywriting", "SEO"]
                  },
                  {
                    "@type": "FAQPage",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "¿Qué servicios ofrece la agencia Persuasivo?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Persuasivo ofrece tres servicios principales: 1) Desarrollo de Sitios Web de alto rendimiento y alta conversión. 2) Meta Ads para pauta publicitaria estructurada. 3) Gestión de Redes y Copywriting para construir autoridad de marca."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "¿Qué tecnología utiliza Persuasivo para el desarrollo web?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Utilizamos arquitecturas modernas como ReactJS, ecosistemas nativos de vanguardia y estéticas de Silicon Valley para garantizar tiempos de carga cero y máxima accesibilidad (AEO/SEO)."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "¿Por qué elegir a Persuasivo como agencia creativa?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "No reciclamos plantillas viejas. Fusionamos diseño de élite con tecnología para crear ecosistemas que posicionan a tu marca como líder, ahuyentando clientes que compiten por precio."
                        }
                      }
                    ]
                  }
                ]
              }
            `}
          </script>
        </Helmet>

      {/* Persistent Global Navigation */}
      <GlassNavbar currentView={activeViewId} setCurrentView={setView} />

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingHero setView={setView} />} />
          
          <Route path="/agencia" element={<AgencyHome setView={setView} />} />
          
          <Route path="/contacto" element={<ContactFlow setView={setView} />} />

          {/* Deep Funnel SEO Pages */}
          <Route path="/servicios/trafico" element={<ServiceTraffic setView={setView} />} />

          <Route path="/servicios/autoridad" element={<ServiceAuthority setView={setView} />} />

          <Route path="/servicios/ecosistemas" element={<ServiceEcosystems setView={setView} />} />

          <Route path="/legal/privacidad" element={<LegalView setView={setView} docType="privacy" />} />
          <Route path="/legal/terminos" element={<LegalView setView={setView} docType="terms" />} />
          <Route path="/legal/cookies" element={<LegalView setView={setView} docType="cookies" />} />

          {/* Core App / Agency Flow (Zero Friction Onboarding) */}
          <Route path="/onboarding" element={
            <motion.div 
               key="onboarding"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, filter: 'blur(5px)' }}
               transition={{ duration: 0.8 }}
            >
              <ClientOnboarding setView={setView} />
            </motion.div>
          } />

          {/* Special Arcade Route */}
          <Route path="/arcade" element={
            <motion.div 
              key="arcade"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #111111 0%, #050505 80%)',
                position: 'relative'
              }}
            >
              <Helmet>
                 <title>Jugar Arcade | Zero Fricción - Persuasivo</title>
              </Helmet>
              <ArcadeCabinet />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
