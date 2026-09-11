import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import GlassNavbar from './components/Navigation/GlassNavbar';
import AgencyHome from './components/Views/AgencyHome';

// Rutas fuera de la home se cargan on-demand para reducir el bundle inicial
const ArcadeCabinet = lazy(() => import('./components/ArcadeCabinet'));
const ContactFlow = lazy(() => import('./components/Views/ContactFlow'));
const LegalView = lazy(() => import('./components/Views/LegalView'));
const ServiceTraffic = lazy(() => import('./components/Views/ServiceTraffic'));
const ServiceAuthority = lazy(() => import('./components/Views/ServiceAuthority'));
const ServiceEcosystems = lazy(() => import('./components/Views/ServiceEcosystems'));
const ClientOnboarding = lazy(() => import('./components/Views/ClientOnboarding'));

function RouteFallback() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EDE7D8' }}>
      <div style={{ width: '32px', height: '32px', border: '3px solid #D9D2C2', borderTop: '3px solid #D6531D', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Adapter function to maintain legacy compatibility across all components
  const setView = (viewName) => {
    const routeMap = {
      landing: '/',
      agency: '/',
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
  let activeViewId = 'landing';
  if (location.pathname === '/contacto') activeViewId = 'contact';
  else if (location.pathname !== '/') activeViewId = null; // Deep pages (servicios, legal, arcade) show no active tab

  return (
    <main style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden', background: '#EDE7D8', color: '#1A1815' }}>
      
      {/* Global Meta Data base */}
        <Helmet>
          <title>Persuasivo | Arquitectura Digital de Alto Rendimiento</title>
          <meta name="description" content="Agencia creativa especializada en desarrollo de Sitios Web de alta conversión, Copywriting y Meta Ads." />
          <link rel="canonical" href={`https://www.persuasivo.mx${location.pathname}`} />

          {/* Open Graph / Social Share */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Persuasivo" />
          <meta property="og:title" content="Persuasivo | Arquitectura Digital de Alto Rendimiento" />
          <meta property="og:description" content="Agencia creativa especializada en desarrollo de Sitios Web de alta conversión, Copywriting y Meta Ads." />
          <meta property="og:url" content={`https://www.persuasivo.mx${location.pathname}`} />
          <meta property="og:image" content="https://www.persuasivo.mx/og-cover.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="es_MX" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Persuasivo | Arquitectura Digital de Alto Rendimiento" />
          <meta name="twitter:description" content="Agencia creativa especializada en desarrollo de Sitios Web de alta conversión, Copywriting y Meta Ads." />
          <meta name="twitter:image" content="https://www.persuasivo.mx/og-cover.png" />

          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "ProfessionalService",
                    "name": "Persuasivo",
                    "url": "https://www.persuasivo.mx",
                    "logo": "https://www.persuasivo.mx/favicon.svg",
                    "description": "Agencia creativa especializada en desarrollo de Sitios Web de alta conversión, Copywriting y Meta Ads.",
                    "areaServed": "MX",
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
        <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AgencyHome setView={setView} />} />

          {/* Ruta anterior conservada como redirect por SEO/backlinks ya indexados */}
          <Route path="/agencia" element={<Navigate to="/" replace />} />

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
        </Suspense>
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
