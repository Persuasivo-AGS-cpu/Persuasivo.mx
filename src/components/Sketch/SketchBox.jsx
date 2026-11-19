import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sketchRect, sketchEllipse, sketchCross } from './sketchPath';

// Caja cuyo borde se "dibuja" al entrar en pantalla. El contenido sigue siendo HTML normal.
export default function SketchBox({
  as: Tag = 'div', kind = 'rect', seed = 1, passes = 2, cross = false,
  stroke = '#1b1b1b', strokeWidth = 2.2, fill = 'none', style, children, ...rest
}) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const d = w && h ? (kind === 'ellipse' ? sketchEllipse(w, h, seed) : sketchRect(w, h, seed, { passes })) : '';
  const draw = {
    initial: reduce ? false : { pathLength: 0, fillOpacity: 0 },
    whileInView: { pathLength: 1, fillOpacity: 1 },
    viewport: { once: true, margin: '-8% 0px' },
    transition: { duration: 0.9, ease: 'easeInOut' },
  };

  return (
    <Tag ref={ref} style={{ position: 'relative', isolation: 'isolate', ...style }} {...rest}>
      {d && (
        <svg aria-hidden="true" width={w} height={h}
          style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'visible', pointerEvents: 'none' }}>
          <motion.path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth}
            strokeLinecap="round" strokeLinejoin="round" {...draw} />
          {cross && (
            <motion.path d={sketchCross(w, h, seed + 1)} fill="none" stroke={stroke}
              strokeWidth={1.4} strokeLinecap="round" opacity={0.55} {...draw} />
          )}
        </svg>
      )}
      {children}
    </Tag>
  );
}
