import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Cada bloque "se imprime": aparece con un leve desenfoque que se enfoca. Con movimiento reducido ya está puesto.
export default function PpReveal({ children, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.6, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
