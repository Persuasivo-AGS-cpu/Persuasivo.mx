import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CornerMarks from '../CornerMarks';

export default function LandingHero() {
  const words = [
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
    const i = loopNum % words.length;
    const fullText = words[i];

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        background: '#EDE7D8'
      }}
    >
      {/* Grid de plano tecnico */}
      <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(26, 24, 21, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 24, 21, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 0
      }} />

      <CornerMarks color="#1A1815" inset={24} size={22} />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '1200px' }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '0.55rem 1.6rem',
            border: '1.5px solid #1A1815',
            color: '#1A1815',
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontSize: '0.72rem',
            marginBottom: '2.5rem'
          }}
        >
          Arquitectura Digital de Alto Rendimiento
        </div>

        <h1 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 'clamp(2rem, 4.2vw, 4.3rem)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineHeight: '1.18',
          marginBottom: '2rem',
          color: '#1A1815'
        }}>
          Deja de competir por precio.<br />
          Empieza a vender por <span style={{ color: '#D6531D', position: 'relative', display: 'inline-block', minWidth: '8.5ch', textAlign: 'left' }}>
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
          color: '#6B6459',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          marginBottom: '4rem',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          maxWidth: '800px',
          margin: '0 auto 4rem auto',
          lineHeight: '1.6'
        }}>
          Diseñamos Páginas Web excepcionales, escribimos textos que de hecho venden (Copywriting) y escalamos tu facturación con pauta publicitaria (Meta Ads). Arquitectura digital para que tu única preocupación sea atender la demanda.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contacto" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#D6531D',
                color: '#FBF7ED',
                border: '1.5px solid #1A1815',
                padding: '1.05rem 2.8rem',
                borderRadius: '4px',
                fontSize: '1.02rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
                letterSpacing: '0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '3px 3px 0 rgba(26,24,21,0.25)'
              }}
            >
              Iniciar Operación
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateY(1px)' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.div>
          </Link>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginTop: '3.5rem', opacity: 0.6 }}
        >
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', letterSpacing: '2px', color: '#6B6459', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            O conoce el protocolo primero
          </p>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1815" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
