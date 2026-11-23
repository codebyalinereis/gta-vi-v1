"use client";

import { useSceneProgress } from "@/lib/scroll";
import { ASSETS, SHARDS } from "@/lib/data";

/* dispersão inicial de cada caco (vw / vh / graus / escala) */
const SCATTER = [
  { sx: -14, sy: -8, sr: -5, ss: 0.22 },
  { sx: 10, sy: 9, sr: 4, ss: 0.16 },
  { sx: -8, sy: 12, sr: -3, ss: 0.19 },
  { sx: 15, sy: -10, sr: 6, ss: 0.24 },
  { sx: -17, sy: 6, sr: -4, ss: 0.18 },
  { sx: 11, sy: -12, sr: 3, ss: 0.21 },
  { sx: -10, sy: 8, sr: -6, ss: 0.23 },
  { sx: 16, sy: 11, sr: 5, ss: 0.17 },
  { sx: -13, sy: -8, sr: -4, ss: 0.2 },
  { sx: 9, sy: 10, sr: 5, ss: 0.22 },
];

export default function Hero() {
  const ref = useSceneProgress<HTMLElement>();

  return (
    <section className="hero scene" id="inicio" data-loc="Vice City" data-locsub="Onde tudo começa" ref={ref}>
      <div className="hero__stage">
        <div className="hero__sky" aria-hidden="true" />
        <div className="hero__stars" aria-hidden="true" />
        <div className="hero__sun" aria-hidden="true" />

        <p className="hero__top">
          <span className="hero__eyebrow">Disponível agora · 19 · 11 · 2026</span>
        </p>

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
          {/* GTA VI no meio dos cards que viram o pôster */}
          <div className="hero__mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.posterLogo} alt="Grand Theft Auto VI" draggable={false} />
          </div>
        </div>

        <div className="hero__bottom">
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

        {/* silhueta da cidade ao fundo */}
        <svg className="hero__skyline" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 220 V150 h28 V120 h16 v30 h22 V95 h30 v55 h18 V140 h26 V70 h20 v70 h24 V120 h34 v20 h18 V88 h26 v72 h30 V130 h22 V60 h24 v70 h20 v-40 h16 v60 h28 V110 h24 v30 h20 V78 h28 v62 h24 V140 h30 v-25 h14 v25 h26 V100 h22 v40 h20 V132 h30 v88 Z"
            fill="#0c0414"
            opacity="0.92"
          />
          <g fill="#ff9ad5" opacity="0.5">
            <rect x="36" y="128" width="3" height="5" />
            <rect x="52" y="102" width="3" height="5" />
            <rect x="106" y="140" width="3" height="5" />
            <rect x="152" y="78" width="3" height="5" />
            <rect x="212" y="126" width="3" height="5" />
            <rect x="290" y="68" width="3" height="5" />
            <rect x="364" y="120" width="3" height="5" />
            <rect x="470" y="86" width="3" height="5" />
            <rect x="560" y="128" width="3" height="5" />
            <rect x="640" y="104" width="3" height="5" />
            <rect x="730" y="140" width="3" height="5" />
            <rect x="840" y="92" width="3" height="5" />
            <rect x="940" y="124" width="3" height="5" />
            <rect x="1050" y="72" width="3" height="5" />
            <rect x="1160" y="118" width="3" height="5" />
            <rect x="1260" y="138" width="3" height="5" />
            <rect x="1360" y="100" width="3" height="5" />
          </g>
        </svg>

        <div className="hero__scroll" aria-hidden="true">
          <span /> Role para montar Leonida
        </div>
      </div>
    </section>
  );
}
