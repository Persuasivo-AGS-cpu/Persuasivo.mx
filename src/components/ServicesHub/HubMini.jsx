import React from 'react';

// Miniatura decorativa que adelanta el estilo de la página de cada servicio.
export default function HubMini({ kind }) {
  switch (kind) {
    case 'branding':
      return <div className="hub-mini hub-mini--branding" aria-hidden="true"><i /><i /><i /><b>Aa</b></div>;
    case 'web':
      return <div className="hub-mini hub-mini--web" aria-hidden="true"><i /><i /><span /><span /></div>;
    case 'video':
      return <div className="hub-mini hub-mini--video" aria-hidden="true"><i /><i /><i /><b>▶</b></div>;
    case 'feed':
      return <div className="hub-mini hub-mini--feed" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>;
    case 'search':
      return <div className="hub-mini hub-mini--search" aria-hidden="true"><span className="bar" /><small>Anuncio</small><span className="l1" /><span className="l2" /></div>;
    default:
      return null;
  }
}
