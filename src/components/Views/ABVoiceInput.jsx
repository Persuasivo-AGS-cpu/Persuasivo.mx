import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ABVoiceInput({ name, value, onChange, placeholder, rows = 3, stepIndicator }) {
  const [isSupported, setIsSupported] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [interactionMode, setInteractionMode] = useState('voice'); // 'voice' o 'text' -> Default V3 es Voice
  
  const recognitionRef = useRef(null);
  const valueRef = useRef(value);

  // Sincronizar para evadir el stale closure del callback de voz
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    // Validar Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      setInteractionMode('text'); // Forzar text seguro para navegadores hostiles
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false; // Solo envíos limpios tras pausar
    recognition.lang = 'es-MX'; 

    recognition.onresult = (event) => {
      let finalTranscriptChunk = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptChunk += event.results[i][0].transcript + ' ';
        }
      }

      if (finalTranscriptChunk) {
         let currentVal = valueRef.current || '';
         const separator = currentVal.length > 0 && !currentVal.endsWith(' ') ? ' ' : '';
         const newVal = currentVal + separator + finalTranscriptChunk;
         
         // Inyectar magicamente en la variable del formulario padre
         onChange({ target: { name, value: newVal } });
      }
    };

    recognition.onerror = (event) => {
      console.error("Mic error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [name, onChange]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // --- RENDERIZADO DEL INTERFACE ---

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
      <AnimatePresence mode="wait">
        {interactionMode === 'voice' && isSupported ? (
          
          <motion.div 
            key="voicemode"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: '16px', padding: '3rem 1rem', width: '100%', minHeight: '150px', 
              position: 'relative', overflow: 'hidden' 
            }}
          >
            {stepIndicator && (
              <span style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#E0FF31', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem', display: 'inline-block' }}>
                Paso {stepIndicator}
              </span>
            )}

            <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center', fontSize: '0.95rem', maxWidth: '80%' }}>
              {placeholder || "Dicta aquí tus ideas en crudo, la IA lo procesará."}
            </p>
            
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={toggleRecording}>
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: '#E0FF31', borderRadius: '50%', zIndex: 0
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={{ 
                    scale: isRecording ? 1.05 : 1, 
                    backgroundColor: isRecording ? '#E0FF31' : 'rgba(255,255,255,0.1)' 
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                   width: '80px', height: '80px', borderRadius: '50%', display: 'flex', 
                   alignItems: 'center', justifyContent: 'center',
                   zIndex: 1, position: 'relative', color: isRecording ? '#000' : '#fff', fontSize: '2.5rem',
                   boxShadow: isRecording ? '0 0 40px rgba(224,255,49,0.5)' : 'none'
                }}
              >
                {isRecording ? '⏸' : '🎙️'}
              </motion.div>
            </div>

            <motion.p 
              animate={{ opacity: isRecording ? 1 : 0.6, color: isRecording ? '#E0FF31' : '#fff' }}
              style={{ marginTop: '1.5rem', fontWeight: 600, fontSize: '1.1rem', transition: 'color 0.3s' }}
            >
              {isRecording ? '🔴 Grabando audio... Puedes hablar libremente' : 'Toca el micrófono para hablar'}
            </motion.p>

            {value && !isRecording && (
              <motion.div 
                 initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}}
                 style={{ 
                   color: '#aaa', fontSize: '0.85rem', marginTop: '1.5rem', fontStyle: 'italic', 
                   textAlign: 'center', background: 'rgba(0,0,0,0.4)', padding: '0.5rem 1rem', borderRadius: '8px'
                 }}
              >
                <span style={{color: '#E0FF31'}}>✓ Datos encriptados capturados</span> ({value.length} caracteres)
              </motion.div>
            )}

            {/* LA ESCOTILLA DE ESCAPE MAGICA (V3) */}
            <button
               onClick={(e) => { e.preventDefault(); setInteractionMode('text'); }}
               style={{ 
                  marginTop: '1.5rem', background: 'transparent', border: 'none', 
                  color: '#888', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline'
               }}
            >
               Preferiría escribirlo a mano ⌨️
            </button>
          </motion.div>

        ) : (

          <motion.div 
            key="textmode"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
            style={{ width: '100%', position: 'relative' }}
          >
            {stepIndicator && (
              <div style={{ marginBottom: '0.8rem', color: '#E0FF31', fontSize: '0.85rem', fontWeight: 600 }}>
                Paso {stepIndicator}
              </div>
            )}
            <textarea 
              name={name}
              value={value}
              onChange={onChange}
              rows={rows}
              placeholder={placeholder}
              style={{ 
                width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px', color: '#fff', fontSize: '1.1rem', padding: '1.5rem', 
                outline: 'none', resize: 'none', lineHeight: '1.5'
              }}
            />
            
            {/* Opción para revertir a voz si está tecleando y se arrepiente */}
            {isSupported && (
              <button
                 onClick={(e) => { e.preventDefault(); setInteractionMode('voice'); }}
                 style={{ 
                    position: 'absolute', top: '-1.5rem', right: '0.5rem', background: 'transparent', 
                    border: 'none', color: '#E0FF31', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600
                 }}
              >
                 Volver a dictado por voz 🎙️
              </button>
            )}
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
}
