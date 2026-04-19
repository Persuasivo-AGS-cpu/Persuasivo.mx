import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../Navigation/Footer';

const legalDocs = {
  privacy: {
    title: "Aviso de Privacidad",
    lastUpdated: "Última actualización: Abril 2026",
    content: (
      <>
        <h3>1. Recopilación de Datos</h3>
        <p>En Persuasivo, valoramos y respetamos tu privacidad industrial. Recopilamos información corporativa (nombres, correos, datos de facturación) exclusivamente a través de nuestros formularios con encriptación activa, con el único fin de proveer nuestras arquitecturas digitales y diseñar ecosistemas a medida.</p>
        
        <h3>2. Uso de la Información</h3>
        <p>Tus datos son armas estratégicas y los tratamos como tal. Jamás comercializaremos tu información con terceros, brokers de datos, ni agencias competidoras. Los datos se emplean estrictamente para ejecución de campaña, auditorías UX, y comunicación operativa.</p>
        
        <h3>3. Seguridad Estructural</h3>
        <p>Todos nuestros servidores operan con tecnología Vercel, Firebase y AWS, manteniendo estándares de encriptación de grado bancario. Cualquier filtración es mitigada a nivel de clúster preventivo.</p>
        
        <h3>4. Derechos ARCO</h3>
        <p>Tienes en todo momento el control absoluto. Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiendo directamente a nuestro enlace de seguridad: privacy@persuasivo.com.</p>
      </>
    )
  },
  terms: {
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: Abril 2026",
    content: (
      <>
        <h3>1. Naturaleza del Servicio</h3>
        <p>Persuasivo no es una agencia de "entregables sueltos". Somos arquitectos corporativos. Al contratar nuestros ecosistemas, adquieres una infraestructura completa. No garantizamos resultados mágicos; garantizamos ingeniería de precisión que multiplica exponencialmente tus probabilidades de cierre de venta.</p>
        
        <h3>2. Propiedad Intelectual</h3>
        <p>Todo el código fuente, los diseños estructurales de React, los hooks de conversión y arquitecturas de campaña desarrollados durante la fase de prueba pertenecen a Persuasivo, y el licenciamiento total al cliente ocurre de manera automatizada tras la liquidación final del contrato.</p>
        
        <h3>3. Responsabilidades Bilaterales</h3>
        <p>Nos encargamos del aspecto técnico, estético y persuasivo. Sin embargo, la calidad del producto final (servicio de la clínica, el despacho, o software SaaS) y el seguimiento manual a los prospectos filtrados recae enteramente en la operación interna del cliente corporativo.</p>
      </>
    )
  },
  cookies: {
    title: "Política de Cookies",
    lastUpdated: "Última actualización: Abril 2026",
    content: (
      <>
        <h3>1. Micro-Rastreo (Cookies)</h3>
        <p>Utilizamos cookies de primera línea para garantizar que nuestros Ecosistemas Inmersivos y Animaciones Framer Motion corran sin latencia en tus visitas subsecuentes. Las cookies son nuestra forma de mantener el entorno veloz y optimizado.</p>
        
        <h3>2. Analítica Quirúrgica</h3>
        <p>Usamos identificadores para entender qué secciones del motor web interactúan más los prospectos. Esta data es anonimizada y no compromete información personalmente identificable. Se usa estrictamente para refinar el ratio de conversión.</p>
        
        <h3>3. Control Universal</h3>
        <p>Puedes desactivar o purgar nuestras cookies corporativas directamente desde el panel de seguridad de tu navegador. Sin embargo, adviértase que desactivarlas puede resultar en una experiencia de usuario estriada y con pérdida de animaciones cinemáticas.</p>
      </>
    )
  }
};

export default function LegalView({ setView, docType }) {
  const doc = legalDocs[docType];

  return (
    <motion.div 
      key={`legal-${docType}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 0px; } 
        .legal-content h3 {
          color: #fff;
          font-size: 1.4rem;
          font-weight: 800;
          margin: 3rem 0 1rem 0;
          letter-spacing: -0.02em;
        }
        .legal-content p {
          color: #888;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
      `}</style>
      
      <div style={{ flex: 1, padding: '15vh 5vw 10vh 5vw', display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '800px' }}
        >
          {/* Header del Documento */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', margin: 0 }}>
              {doc.title}
            </h1>
            <p style={{ color: '#E0FF31', marginTop: '1rem', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {doc.lastUpdated}
            </p>
          </div>

          {/* Cuerpo Legal Typográfico */}
          <div className="legal-content">
            {doc.content}
          </div>
        </motion.div>
      </div>

      <Footer setView={setView} />
    </motion.div>
  );
}
