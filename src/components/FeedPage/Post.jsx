import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Publicación del feed. El "me gusta" es solo un gesto: no hay contadores ni datos inventados.
export default function Post({ meta, children, tags }) {
  const reduce = useReducedMotion();
  const [liked, setLiked] = useState(false);
  return (
    <motion.article className="fp-post"
      initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.5 }}>
      <header className="fp-post-head">
        <span className="fp-avatar" aria-hidden="true">P</span>
        <div><strong>persuasivo.mx</strong><span>{meta}</span></div>
      </header>
      <div className="fp-post-body">{children}</div>
      <footer className="fp-post-foot">
        <button type="button" className="fp-like" aria-pressed={liked} aria-label="Me gusta" onClick={() => setLiked((l) => !l)}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        {tags && <span className="fp-tags">{tags.join(' ')}</span>}
      </footer>
    </motion.article>
  );
}
