import React, { useEffect, useRef } from 'react';
import { InstantContext } from './Post';

// Ventana con <dialog> nativo: Escape, fondo inerte, foco atrapado y devuelto al cerrar.
// El contenido siempre está montado (cerrado no se ve) para que el texto siga en el DOM.
export default function FpModal({ open, onClose, label, children }) {
  const ref = useRef(null);
  const downOnBackdrop = useRef(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog ref={ref} className="fp-modal" aria-label={label} onClose={onClose}
      onPointerDown={(e) => { downOnBackdrop.current = e.target === ref.current; }}
      onClick={(e) => { if (downOnBackdrop.current && e.target === ref.current) onClose(); }}>
      <div>
        <div className="fp-modal-bar">
          <button type="button" className="fp-modal-x" aria-label="Cerrar" onClick={onClose}>×</button>
        </div>
        <InstantContext.Provider value>{children}</InstantContext.Provider>
      </div>
    </dialog>
  );
}
