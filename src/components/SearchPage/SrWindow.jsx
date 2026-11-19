import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { searchQuery } from '../../data/searchPage';

// La búsqueda "se escribe sola". Con movimiento reducido aparece completa.
function useTypewriter(text, reduce) {
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) { setN(text.length); return undefined; }
    if (n >= text.length) return undefined;
    const id = setTimeout(() => setN((x) => x + 1), 45);
    return () => clearTimeout(id);
  }, [n, text, reduce]);
  return text.slice(0, n);
}

export default function SrWindow({ children }) {
  const reduce = useReducedMotion();
  const typed = useTypewriter(searchQuery, reduce);
  return (
    <div className="sr-window">
      <div className="sr-chrome" aria-hidden="true">
        <span className="sr-dots"><i /><i /><i /></span>
        <span className="sr-url">Búsqueda de ejemplo</span>
      </div>
      <div className="sr-searchrow">
        <div className="sr-bar" role="img" aria-label={`Búsqueda de ejemplo: ${searchQuery}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-bar-text" aria-hidden="true">{typed}<i className="sr-caret" /></span>
        </div>
      </div>
      {children}
    </div>
  );
}
