"use client";

import { useCallback } from "react";
import { useSceneProgress } from "@/lib/scroll";
import { ASSETS } from "@/lib/data";

type Side = {
  num: string;
  first: string;
  last: string;
  role: string;
  quote: string;
  art: string;
  dossier: { k: string; v: string }[];
  accent: string;
};

const LUCIA: Side = {
  num: "01",
  first: "Lucia",
  last: "Caminos",
  role: "A sobrevivente",
  quote: "“Eu saí de Leonida uma vez. Voltei por conta própria — e do meu jeito.”",
  art: ASSETS.lucia,
  dossier: [
    { k: "Origem", v: "Vice City, LE" },
    { k: "Status", v: "Procurada" },
  ],
  accent: "#ff3fb4",
};

const JASON: Side = {
  num: "02",
  first: "Jason",
  last: "Duval",
  role: "O veterano",
  quote: "“Só quero uma vida fácil. O problema é descobrir quanto ela custa.”",
  art: ASSETS.jason,
  dossier: [
    { k: "Origem", v: "Leonida Keys" },
    { k: "Status", v: "Em movimento" },
  ],
  accent: "#ff8a2a",
};

function Card({ side, weight }: { side: Side; weight: "l" | "j" }) {
  return (
    <article
      className={`duo__card duo__card--${weight}`}
      style={{ "--ac": side.accent } as React.CSSProperties}
    >
      <div className="duo__art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={side.art} alt={`${side.first} ${side.last}`} loading="lazy" draggable={false} />
      </div>
      <span className="duo__num" aria-hidden="true">{side.num}</span>
      <div className="duo__body">
        <p className="duo__role">{side.role}</p>
        <h3 className="duo__name">
          {side.first}
          <br />
          <em>{side.last}</em>
        </h3>
        <p className="duo__quote">{side.quote}</p>
        <ul className="duo__dossier">
          {side.dossier.map((d) => (
            <li key={d.k}>
              <span>{d.k}</span> {d.v}
            </li>
          ))}
        </ul>
      </div>
      <span className="duo__shine" aria-hidden="true" />
    </article>
  );
}

export default function Duo() {
  /* progresso da cena → pesos de cada card + encerramento */
  const onUpdate = useCallback((p: number, el: HTMLElement) => {
    const pl = Math.max(0, Math.min(1, p * 2.2 - 0.05));   // Lucia entra primeiro
    const pj = Math.max(0, Math.min(1, p * 2.2 - 1.15));   // Jason responde
    const pb = Math.max(0, Math.min(1, p * 3 - 1.9));      // os dois juntos
    el.style.setProperty("--pl", pl.toFixed(4));
    el.style.setProperty("--pj", pj.toFixed(4));
    el.style.setProperty("--pb", pb.toFixed(4));
  }, []);

  const ref = useSceneProgress<HTMLElement>(onUpdate);

  return (
    <section
      className="duo scene"
      id="dupla"
      data-loc="Vice Beach"
      data-locsub="Península sul · maré alta"
      ref={ref}
    >
      <div className="duo__stage">
        {/* palco: pôr do sol */}
        <div className="duo__bg" aria-hidden="true">
          <div className="duo__sun" />
        </div>

        <p className="duo__chapter">02 · A Dupla</p>

        <Card side={LUCIA} weight="l" />
        <Card side={JASON} weight="j" />

        {/* encerramento */}
        <div className="duo__finale">
          <p className="duo__finale-kicker">Um golpe. Um estado. Nenhuma saída limpa.</p>
          <h3 className="duo__finale-title">
            Lucia <em>&amp;</em> Jason
          </h3>
          <p className="duo__finale-sub">Contra todo mundo — inclusive um contra o outro.</p>
        </div>
      </div>
    </section>
  );
}
