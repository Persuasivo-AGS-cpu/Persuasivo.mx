import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import GlassNavbar from './components/Navigation/GlassNavbar';
import WhatsAppButton from './components/WhatsAppButton';
import AgencyHome from './components/Views/AgencyHome';
import CaseStudy from './components/Views/CaseStudy';
import ExpertiseHub from './components/Views/ExpertiseHub';
import AboutPage from './components/Views/AboutPage';
import ContactFlow from './components/Views/ContactFlow';
import LegalView from './components/Views/LegalView';
import ServiceTraffic from './components/Views/ServiceTraffic';
import ServiceAuthority from './components/Views/ServiceAuthority';
import ServiceEcosystems from './components/Views/ServiceEcosystems';
import ServiceContent from './components/Views/ServiceContent';
import ServiceBranding from './components/Views/ServiceBranding';
import ClientOnboarding from './components/Views/ClientOnboarding';
import VerticalLanding from './components/Views/VerticalLanding';
import BlogIndex from './components/Views/BlogIndex';
import BlogPost from './components/Views/BlogPost';
import BookConsultation from './components/Views/BookConsultation';
import ArcadeCabinet from './components/ArcadeCabinet';
import LeadMagnet from './components/Views/LeadMagnet';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Legacy adapter — kept for backward compatibility in existing components
  const setView = (viewName) => {
    const routeMap = {
      landing: '/',
      agency: '/',
      home: '/',
      contact: '/contacto',
      contacto: '/contacto',
      servicios: '/servicios',
      nosotros: '/nosotros',
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

  // Global Schema.org — expanded for LLM/AEO
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://persuasivo.com.mx/#organization",
        "name": "Persuasivo",
        "alternateName": "Persuasivo.mx",
        "url": "https://persuasivo.com.mx",
        "logo": "https://persuasivo.com.mx/favicon.svg",
        "image": "https://persuasivo.com.mx/og-image.jpg",
        "description": "Agencia creativa en Monterrey especializada en desarrollo web con React, Meta Ads de alto rendimiento y copywriting de conversión. Generamos +215% más leads calificados para nuestros clientes.",
        "priceRange": "$$-$$$",
        "telephone": "+528110731510",
        "email": "hola@persuasivo.com.mx",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Monterrey",
          "addressRegion": "Nuevo León",
          "addressCountry": "MX"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.6866",
          "longitude": "-100.3161"
        },
        "areaServed": [
          { "@type": "Country", "name": "México" },
          { "@type": "Country", "name": "Estados Unidos" }
        ],
        "knowsAbout": [
          "Desarrollo Web con React",
          "Next.js",
          "Meta Ads",
          "Copywriting de Conversión",
          "SEO Técnico",
          "Diseño UI/UX",
          "Framer Motion",
          "Embudos de Venta",
          "Branding Digital"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Persuasivo",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desarrollo Web con React",
                "description": "Sitios web de alto rendimiento con React, Next.js y Vite. Desde $35,000 MXN.",
                "url": "https://persuasivo.com.mx/servicios/ecosistemas"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Meta Ads — Pauta Digital",
                "description": "Campañas de adquisición con ROI documentado de 12X. Desde $15,000 MXN/mes.",
                "url": "https://persuasivo.com.mx/servicios/trafico"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Copywriting & Gestión de Redes",
                "description": "Estrategia de contenido y gestión de redes sociales. Desde $12,000 MXN/mes.",
                "url": "https://persuasivo.com.mx/servicios/autoridad"
              }
            }
          ]
        },
        "sameAs": [
          "https://www.instagram.com/persuasivo.mx/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://persuasivo.com.mx/#website",
        "url": "https://persuasivo.com.mx",
        "name": "Persuasivo",
        "publisher": { "@id": "https://persuasivo.com.mx/#organization" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué servicios ofrece la agencia Persuasivo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Persuasivo ofrece tres servicios principales: 1) Desarrollo de Sitios Web de alto rendimiento con React y Next.js (desde $35,000 MXN). 2) Meta Ads para pauta publicitaria con ROI documentado de 12X (desde $15,000 MXN/mes). 3) Copywriting y Gestión de Redes Sociales para construir autoridad de marca (desde $12,000 MXN/mes)."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta un sitio web profesional con Persuasivo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Los proyectos de desarrollo web comienzan desde $35,000 MXN para landing pages de alta conversión y desde $75,000 MXN para sitios web corporativos multipágina. El precio final depende de la complejidad, número de páginas e integraciones requeridas. Incluye estrategia, diseño, desarrollo, copywriting y optimización SEO."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué tecnología utiliza Persuasivo para el desarrollo web?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Utilizamos React, Next.js y Vite — las mismas tecnologías que usan empresas como Netflix, Airbnb y Shopify. No usamos WordPress ni plantillas. Cada proyecto se construye desde cero para garantizar velocidad, seguridad y rendimiento óptimo."
            }
          },
          {
            "@type": "Question",
            "name": "¿Dónde está ubicada la agencia Persuasivo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Persuasivo está ubicada en Monterrey, Nuevo León, México. Atendemos clientes en todo México, LATAM y el mercado hispano en Estados Unidos. Operamos de forma remota con herramientas de colaboración en tiempo real."
            }
          }
        ]
      }
    ]
  };

  return (
    <main style={{ width: '100%', minHeight: '100vh', overflowX: 'clip', background: 'var(--bg-void)', color: 'var(--text-primary)' }}>
      <Helmet>
        <title>Persuasivo | Agencia Creativa — Desarrollo Web, Meta Ads & Copywriting</title>
        <meta name="description" content="Agencia creativa en Monterrey especializada en desarrollo web con React, Meta Ads de alto rendimiento y copywriting de conversión." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <html lang="es" />
        <script type="application/ld+json">{JSON.stringify(globalSchema)}</script>
      </Helmet>

      <GlassNavbar />
      <WhatsAppButton />

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          {/* Core Pages */}
          <Route path="/" element={<AgencyHome />} />
          <Route path="/work" element={<Navigate to="/servicios" replace />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/servicios" element={<ExpertiseHub />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactFlow setView={setView} />} />
          <Route path="/consulta-gratis" element={<BookConsultation />} />
          {/* Content Surface (Blog & Lead Magnets) */}
          <Route path="/blog" element={<BlogIndex setView={setView} />} />
          <Route path="/blog/:slug" element={<BlogPost setView={setView} />} />
          <Route path="/recursos/checklist" element={<LeadMagnet />} />

          {/* Deep Service Pages */}
          <Route path="/servicios/trafico" element={<ServiceTraffic setView={setView} />} />
          <Route path="/servicios/autoridad" element={<ServiceAuthority setView={setView} />} />
          <Route path="/servicios/ecosistemas" element={<ServiceEcosystems setView={setView} />} />
          <Route path="/contenido" element={<ServiceContent />} />
          <Route path="/servicios/branding" element={<ServiceBranding />} />

          {/* Legal */}
          <Route path="/legal/privacidad" element={<LegalView setView={setView} docType="privacy" />} />
          <Route path="/legal/terminos" element={<LegalView setView={setView} docType="terms" />} />
          <Route path="/legal/cookies" element={<LegalView setView={setView} docType="cookies" />} />

          {/* Programmatic SEO */}
          <Route path="/soluciones/:id" element={<VerticalLanding type="vertical" setView={setView} />} />
          <Route path="/agencia-marketing/:id" element={<VerticalLanding type="local" setView={setView} />} />

          {/* Onboarding */}
          <Route path="/onboarding" element={
            <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              <ClientOnboarding setView={setView} />
            </motion.div>
          } />

          {/* Arcade */}
          <Route path="/arcade" element={
            <motion.div key="arcade" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #111 0%, #050505 80%)', position: 'relative' }}>
              <Helmet><title>Jugar Arcade | Zero Fricción — Persuasivo</title></Helmet>
              <ArcadeCabinet />
            </motion.div>
          } />

          {/* Legacy redirect */}
          <Route path="/agencia" element={<AgencyHome />} />
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
