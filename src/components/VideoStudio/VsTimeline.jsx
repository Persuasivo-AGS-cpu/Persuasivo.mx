import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { videoTracks, videoMonths, videoClips, videoExample } from '../../data/videoStudio';

export default function VsTimeline() {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setSel((i) => (i + 1) % videoClips.length), 3500);
    return () => clearInterval(id);
  }, [playing]);

  const clip = videoClips[sel];
  const track = videoTracks.find((t) => t.id === clip.track);

  return (
    <section>
      <h2 className="vs-h2">{videoExample.title}</h2>
      <p className="vs-lead">{videoExample.text}</p>

      <div className="vs-monitor" style={{ '--tc': track.color }}>
        <div className="vs-screen" aria-live={playing ? 'off' : 'polite'}>
          <span className="vs-tag">{track.tag}</span>
          <p className="vs-clip-title">{clip.title}</p>
          <p className="vs-clip-meta">{videoMonths[clip.month]} · pieza {sel + 1} de {videoClips.length}</p>
        </div>
        <div>
          <h3 className="vs-h3">{track.title}</h3>
          <p className="vs-p">{track.text}</p>
          <button type="button" className="vs-play" onClick={() => setPlaying((p) => !p)}>
            {playing ? 'Pausar ejemplo' : 'Reproducir ejemplo'}
          </button>
        </div>
      </div>

      <div className="vs-scroll" role="region" aria-label="Línea de tiempo del ejemplo (desplazable)" tabIndex={0}>
        <div className="vs-timeline" role="group" aria-label="Elige una pieza para verla en el monitor">
          <div className="vs-ruler"><span />{videoMonths.map((m) => <span key={m}>{m}</span>)}</div>
          {videoTracks.map((t) => (
            <div className="vs-track" key={t.id}>
              <span className="vs-track-label" style={{ color: t.color }}>{t.tag}</span>
              {videoMonths.map((m, mi) => (
                <div className="vs-cell" key={m}>
                  {videoClips.map((c, i) => (c.track === t.id && c.month === mi ? (
                    <button key={c.id} type="button" className="vs-clip" style={{ '--clip': t.color }}
                      aria-pressed={i === sel} onClick={() => { setPlaying(false); setSel(i); }}>
                      {c.title}
                    </button>
                  ) : null))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
