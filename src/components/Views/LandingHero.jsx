import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingHero({ setView }) {
  const neonWords = [
    "estatus.", 
    "prestigio.", 
    "autoridad.", 
    "exclusividad."
  ];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    let timer;
    const i = loopNum % neonWords.length;
    const fullText = neonWords[i];

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(120);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
          setTypingSpeed(40);
        }, typingSpeed);
      }
    } else {
      if (text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
          setTypingSpeed(120);
        }, typingSpeed);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <motion.div 
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Crazy Neon Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          background: 'radial-gradient(ellipse at center, rgba(224, 255, 49, 0.15) 0%, rgba(0,0,0,0) 60%)',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(50px)'
        }}
      />

      {/* Grid Overlay for Texture */}
      <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(224, 255, 49, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(224, 255, 49, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.5
      }} />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '1200px' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'inline-block',
            padding: '0.6rem 2rem',
            border: '1px solid rgba(224, 255, 49, 0.5)',
            borderRadius: '50px',
            color: '#E0FF31',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            marginBottom: '2.5rem',
            background: 'rgba(224, 255, 49, 0.05)',
            boxShadow: '0 0 20px rgba(224, 255, 49, 0.1)'
          }}
        >
          ARQUITECTURA DIGITAL DE ALTO RENDIMIENTO
        </motion.div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: '1.2',
          marginBottom: '2rem',
          color: '#FFFFFF'
        }}>
          Deja de competir por precio.<br />
          Empieza a vender por <span style={{ color: '#E0FF31', textShadow: '0 0 40px rgba(224, 255, 49, 0.4)', position: 'relative' }}>
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ fontWeight: 300, display: 'inline-block', width: '4px', verticalAlign: 'baseline' }}
            >
              |
            </motion.span>
          </span>
        </h1>
        
        <p style={{ 
          color: '#A1A1AA', 
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
          marginBottom: '4rem', 
          fontWeight: 400, 
          letterSpacing: '-0.02em',
          maxWidth: '800px',
          margin: '0 auto 4rem auto',
          lineHeight: '1.6'
        }}>
          Diseñamos Páginas Web excepcionales, escribimos textos que de hecho venden (Copywriting) y escalamos tu facturación con pauta publicitaria (Meta Ads). Arquitectura digital para que tu única preocupación sea atender la demanda.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Welcome Mat - Single CTA Hypothesis 2 */}
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(224, 255, 49, 0.4)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setView('agency')}
            style={{
              background: '#E0FF31', 
              color: '#050505', 
              border: 'none', 
              padding: '1.1rem 3rem', 
              borderRadius: '9999px', 
              fontSize: '1.05rem', 
              fontWeight: 700, 
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
              letterSpacing: '0.01em', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem',
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), 0 8px 20px rgba(0,0,0,0.2)'
            }}
          >
            Activar Modo Persuasivo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateY(1px)' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
