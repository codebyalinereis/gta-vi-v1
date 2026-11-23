"use client";

import { useSceneProgress } from "@/lib/scroll";
import { ASSETS, SHARDS } from "@/lib/data";

/* dispersão inicial de cada caco (vw / vh / graus / escala) */
const SCATTER = [
  { sx: -24, sy: -12, sr: -8, ss: 0.35 },
  { sx: 18, sy: 16, sr: 6, ss: 0.25 },
  { sx: -14, sy: 22, sr: -5, ss: 0.3 },
  { sx: 26, sy: -18, sr: 9, ss: 0.4 },
  { sx: -30, sy: 10, sr: -7, ss: 0.28 },
  { sx: 20, sy: -22, sr: 5, ss: 0.33 },
  { sx: -18, sy: 14, sr: -9, ss: 0.38 },
  { sx: 28, sy: 20, sr: 7, ss: 0.26 },
  { sx: -22, sy: -14, sr: -6, ss: 0.31 },
  { sx: 16, sy: 18, sr: 8, ss: 0.36 },
];

export default function Hero() {
  const ref = useSceneProgress<HTMLElement>();

  return (
    <section className="hero scene" id="inicio" data-loc="Vice City" data-locsub="Onde tudo começa" ref={ref}>
      <div className="hero__stage">
        <div className="hero__sky" aria-hidden="true" />

        {/* mosaico de cacos — se monta conforme o scroll */}
        <div className="hero__mosaic" aria-label="Arte oficial de Grand Theft Auto VI se montando com a rolagem">
          {SHARDS.map((src, i) => (
            <div
              key={i}
              className="hero__shard"
              style={{
                "--sx": SCATTER[i].sx,
                "--sy": SCATTER[i].sy,
                "--sr": SCATTER[i].sr,
                "--ss": SCATTER[i].ss,
              } as React.CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading={i < 2 ? "eager" : "lazy"} draggable={false} />
            </div>
          ))}
          <div className="hero__mosaic-glow" aria-hidden="true" />
          {/* o pôster inteiro emerge quando os cacos se alinham */}
          <div className="hero__poster" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.posterFull} alt="" loading="lazy" draggable={false} />
          </div>
        </div>

        {/* conteúdo — surge quando o mosaico fecha */}
        <div className="hero__inner">
          <p className="hero__eyebrow">Disponível agora · 19 · 11 · 2026</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__logo" src={ASSETS.posterLogo} alt="Grand Theft Auto VI" />
          <p className="hero__tagline">
            O baralho sempre esteve marcado contra eles.<br />
            Resta descobrir quem marca as cartas.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#dupla">Conhecer a dupla ↓</a>
            <a className="btn btn--ghost" href="#mapa">Explorar o mapa</a>
          </div>
          <p className="hero__meta">PlayStation 5 · Xbox Series X|S · Classificação 18+</p>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span /> Role para montar Leonida
        </div>
      </div>
    </section>
  );
}
