import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Tarjeta pegada que "cae" con spring y queda ligeramente rotada. Con movimiento reducido aparece ya puesta.
export default function Pin({ as = 'div', rotate = 0, delay = 0, note = false, className = '', style, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={`bb-pin${note ? ' bb-pin--note' : ''} ${className}`.trim()}
      initial={reduce ? false : { y: -36, opacity: 0, rotate: rotate + 6 }}
      whileInView={{ y: 0, opacity: 1, rotate }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 16, delay }}
      style={{ rotate, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
