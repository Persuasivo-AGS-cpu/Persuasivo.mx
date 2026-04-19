import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ArcadeCabinet.css';

export default function ArcadeCabinet() {
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="arcade-room">
      
      <motion.div 
        className="cocktail-table"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
      >
        {/* Destello Diogonal del Cristal Superpuesto */}
        <div className="glass-reflection"></div>

        <div className="table-surface">
          {/* Arte Corrupto Izquierdo */}
          <div className="bezel-art">
            <div className="bezel-brand">
              <div className="bezel-brand-name">Persuasivo</div>
              <div className="bezel-brand-sub">SUPERAPP OS</div>
            </div>

            <div className="bezel-manifesto">
              No hacemos webs. Instalamos monopolios. Fricción cero. Extracción máxima. El que duda, pierde. Apunta y dispara.
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div className="bezel-title" style={{ marginTop: 0 }}>Targets</div>
              <ul className="bezel-list">
                <li><span className="neon">●</span> <div><span className="bold">Competencia</span><br/>100pts</div></li>
                <li><span className="neon">●</span> <div><span className="bold">Agencias</span><br/>200pts</div></li>
                <li><span className="neon">●</span> <div><span className="bold">Plantillas</span><br/>500pts</div></li>
              </ul>
            </div>
          </div>

          {/* El CRT y el Juego */}
          <div className="table-crt-casing">
            <div className="crt-ignite" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
              <div className="scanlines"></div>
              <iframe 
                src="/pacman/index.html?v=2" 
                width="420" 
                height="500" 
                style={{
                  border: 'none', 
                  display: 'block',
                  background: 'black',
                  pointerEvents: 'auto'
                }}
                title="Pacman Game"
              />
            </div>
          </div>

          {/* Arte Corrupto Derecho */}
          <div className="bezel-art" style={{ textAlign: 'right' }}>
            <div className="bezel-brand">
              <div className="bezel-brand-name">Decreto</div>
              <div className="bezel-brand-sub">VER 1.0</div>
            </div>

            <div className="bezel-manifesto" style={{ textAlign: 'right' }}>
              Tu atención es nuestra divisa. El scroll infinito es la nueva religión. Bienvenido al culto. 
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div className="bezel-title" style={{ marginTop: 0 }}>System</div>
              <ul className="bezel-list" style={{ textAlign: 'right' }}>
                <li style={{ justifyContent: 'flex-end' }}><span className="bold">Insert</span></li>
                <li style={{ justifyContent: 'flex-end', marginBottom: '10px' }}>Attention</li>
                <li style={{ justifyContent: 'flex-end' }}><span className="bold">Zero</span></li>
                <li style={{ justifyContent: 'flex-end', marginBottom: '10px' }}>Friction</li>
                <li style={{ justifyContent: 'flex-end' }}><span className="neon bold" style={{ fontSize: '1rem', animation: 'flicker 1s infinite' }}>READY</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Panel de Control Plano en la Base */}
        <div className="table-control-panel">
          <div className="joystick">
            <div className="joystick-base"></div>
            <div className="joystick-ball"></div>
          </div>

          {/* Firma Central (Signature Plate) */}
          <div className="signature-plate">
            <div style={{ color: '#888', fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2px' }}>Engineered By</div>
            <div style={{ color: '#fff', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '8px' }}>
              PERSUASIVO
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-arcade" aria-label="Action 1"></button>
            <button className="btn-arcade btn-arcade-neon" aria-label="Action 2"></button>
          </div>
        </div>

      </motion.div>

      <div className="room-ambient-glow"></div>
    </div>
  );
}
