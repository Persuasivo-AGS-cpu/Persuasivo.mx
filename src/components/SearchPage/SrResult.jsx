import React from 'react';

// Resultado orgánico: el fragmento siempre se ve; el detalle se despliega (y siempre está en el DOM).
export default function SrResult({ id, url, title, snippet, more, list }) {
  return (
    <details className="sr-result" id={id}>
      <summary>
        <cite className="sr-cite"><span className="sr-fav" aria-hidden="true">P</span>{url}</cite>
        <span className="sr-title">{title}</span>
        <span className="sr-snippet">{snippet}</span>
      </summary>
      <div className="sr-more">
        {more && <p style={{ margin: 0 }}>{more}</p>}
        {list && <ul>{list.map((li) => <li key={li}>{li}</li>)}</ul>}
      </div>
    </details>
  );
}
