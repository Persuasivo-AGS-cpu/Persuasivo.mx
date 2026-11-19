import React from 'react';
import { searchPanel, SEARCH_WA } from '../../data/searchPage';

export default function SrPanel() {
  return (
    <aside className="sr-panel" id={searchPanel.id} aria-label="Datos de la empresa">
      <h2 className="sr-panel-name">{searchPanel.name}</h2>
      <p className="sr-panel-kind">{searchPanel.kind} · {searchPanel.place}</p>
      <ul className="sr-metrics">
        {searchPanel.metrics.map((m) => (
          <li key={m.label}><strong>{m.value}</strong><span>{m.label}</span></li>
        ))}
      </ul>
      {searchPanel.metricsNote && <p className="sr-metrics-note">{searchPanel.metricsNote}</p>}
      <dl className="sr-rows">
        {searchPanel.rows.map(([k, v]) => (
          <div key={k}><dt>{k}: </dt><dd>{v}</dd></div>
        ))}
      </dl>
      <a className="sr-btn" href={SEARCH_WA} target="_blank" rel="noopener noreferrer">{searchPanel.cta}</a>
    </aside>
  );
}
