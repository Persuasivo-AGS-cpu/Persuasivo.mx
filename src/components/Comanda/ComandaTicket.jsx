import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { buildTicketRows } from '../../data/comanda';

export default function ComandaTicket({
  form, folio, dateStr, status, via, canSend, canContact, waHref, onWhatsApp, onContact,
}) {
  const reduce = useReducedMotion();
  const rows = buildTicketRows(form);
  const sent = status === 'sent';

  return (
    <div className="cm-ticket-wrap">
      <div className="cm-rail" aria-hidden="true" />
      <section className="cm-ticket" aria-label="Tu comanda">
        <div className="cm-t-head">
          <p className="cm-t-name">PERSUASIVO</p>
          <p className="cm-t-sub">COMANDA DE SERVICIO</p>
          <div className="cm-t-meta"><span>Monterrey, N.L.</span><span>{dateStr}</span></div>
        </div>

        <div className="cm-t-body">
          {rows.length === 0 && <p className="cm-t-empty">Tu pedido se imprimirá aquí…</p>}
          <dl style={{ margin: 0 }}>
            {rows.map((r) => (
              <motion.div key={r.id} className="cm-row"
                initial={reduce ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <dt>{r.label}</dt>
                <dd>{r.values.map((v) => <span key={v} style={{ display: 'block' }}>{v}</span>)}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div style={{ paddingTop: '0.6rem' }}>
          <div className="cm-total"><span>DIAGNÓSTICO (30 MIN)</span><i /><span>$0.00</span></div>
          <div className="cm-total cm-total--big"><span>TOTAL</span><i /><span>$0.00</span></div>
        </div>
        <p className="cm-thanks">GRACIAS POR SU PREFERENCIA</p>
        <div className="cm-barcode" aria-hidden="true" />
        <p className="cm-folio">{folio}</p>

        {sent && (
          <motion.div className="cm-stamp" aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 2.2, x: '-50%', rotate: -4 }}
            animate={{ opacity: 0.88, scale: 1, x: '-50%', rotate: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
            ENVIADO
          </motion.div>
        )}
      </section>

      <div className="cm-actions">
        <a className="cm-btn cm-btn--wa" href={waHref} target="_blank" rel="noopener noreferrer"
          aria-disabled={!canSend} onClick={onWhatsApp}>
          Enviar por WhatsApp
        </a>
        <button type="button" className="cm-btn cm-btn--ghost" disabled={!canContact || status === 'sending'} onClick={onContact}>
          {status === 'sending' ? 'Enviando…' : 'Prefiero que me escriban'}
        </button>
        {!canSend && <p className="cm-hint">Falta tu nombre y al menos un servicio.</p>}
        {canSend && !canContact && <p className="cm-hint">Para la opción «Prefiero que me escriban», agrega tu WhatsApp o correo.</p>}
        {sent && (
          <p className="cm-sent" role="status">
            {via === 'WhatsApp'
              ? 'Listo: abrimos WhatsApp con tu pedido y lo registramos. Si no se abrió, pulsa de nuevo «Enviar por WhatsApp». Te respondemos en menos de 24 horas.'
              : 'Recibimos tu pedido. Te escribimos en menos de 24 horas.'}
          </p>
        )}
      </div>
    </div>
  );
}
