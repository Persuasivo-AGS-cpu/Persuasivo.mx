import React from 'react';

export default function PhoneFrame({ src, alt }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '9 / 19',
        background: '#111',
        borderRadius: '36px',
        padding: '8px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: '28px', overflow: 'hidden', background: '#fff' }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
      </div>
    </div>
  );
}
