"use client";

import { useEffect, useRef, useState } from "react";
import { STATION_META } from "@/lib/data";
import { audio } from "@/lib/audio";

export default function RadioSection() {
  const [, force] = useState(0);
  const vizRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    const off = audio.onChange(() => force((n) => n + 1));
    return () => { off(); };
  }, []);

  /* visualizador reativo ao áudio real */
  useEffect(() => {
    const paint = () => {
      const cv = vizRef.current;
      const an = audio.analyser;
      if (!cv || !an) return;
      const g = cv.getContext("2d");
      if (!g) return;
      running.current = !!audio.stationId;
      if (!running.current) { g.clearRect(0, 0, cv.width, cv.height); return; }
      const data = new Uint8Array(an.frequencyBinCount);
      an.getByteFrequencyData(data);
      g.clearRect(0, 0, cv.width, cv.height);
      const bars = 22;
      const bw = cv.width / bars;
      for (let i = 0; i < bars; i++) {
        const v = (data[2 + i] || 0) / 255;
        const h = Math.max(2, v * cv.height);
        g.fillStyle = i % 3 === 2 ? "#ff9ad5" : "#ff3fb4";
        g.globalAlpha = 0.35 + 0.65 * v;
        g.fillRect(i * bw + 1, cv.height - h, bw - 2, h);
      }
      g.globalAlpha = 1;
      raf.current = requestAnimationFrame(paint);
    };
    raf.current = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf.current);
  }, [audio.stationId]);

  const cur = audio.stationId;
  const curMeta = STATION_META.find((s) => s.id === cur);

  return (
    <section className="section radio" id="radio" data-loc="Ocean Drive" data-locsub="Vice City · dial FM">
      <div className="container">
        <header className="section-head section-head--split" data-reveal>
          <div>
            <p className="label"><span>04</span> Rádio Leonida</p>
            <h2 className="display">Sintonize <em>o estado.</em></h2>
          </div>
          <p className="section-head__text">
            Quatro estações compostas ao vivo pelo seu navegador — cada uma com baixo,
            brisa e pôr do sol próprios. Aperte o play e deixe Leonida tocar.
          </p>
        </header>

        <div className="radio__grid">
          {STATION_META.map((s, i) => {
            const on = cur === s.id;
            return (
              <button
                key={s.id}
                type="button"
                className={`station${on ? " is-on" : ""}`}
                style={{ "--ac": s.ac, "--d": `${i * 0.08}s` } as React.CSSProperties}
                data-reveal
                aria-pressed={on}
                onClick={() => audio.startStation(s.id)}
              >
                <span className="station__eq" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </span>
                <span className="station__meta">
                  <span className="station__freq">{s.freq}</span>
                  <span className="station__name">{s.name}</span>
                  <span className="station__genre">{s.genre}</span>
                </span>
                <span className="station__hint">{on ? "No ar" : "Tocar"}</span>
              </button>
            );
          })}
        </div>

        <p className="radio__note" data-reveal>100% sintetizado em tempo real — sem arquivos, sem streams.</p>
      </div>

      {/* now playing */}
      <div className={`np${cur ? " is-on" : ""}`} aria-live="polite">
        <span className="np__dot" aria-hidden="true" />
        <div className="np__meta">
          <strong>{curMeta?.name ?? "Neon 96"}</strong>
          <span>{curMeta ? `${curMeta.freq} · ao vivo` : ""}</span>
        </div>
        <canvas ref={vizRef} width={132} height={34} aria-hidden="true" />
        <button type="button" aria-label="Parar rádio" onClick={() => audio.stopStation()}>■</button>
      </div>
    </section>
  );
}
