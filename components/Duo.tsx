"use client";

import { useRef } from "react";
import { useSceneProgress } from "@/lib/scroll";
import { ASSETS } from "@/lib/data";

type Side = {
  num: string;
  first: string;
  last: string;
  role: string;
  quote: string;
  art: string;
  accent: string;
  align: "l" | "r";
  dossier: { k: string; v: string }[];
};

const LUCIA: Side = {
  num: "01",
  first: "Lucia",
  last: "Caminos",
  role: "A sobrevivente",
  quote: "“Eu saí de Leonida uma vez. Voltei por conta própria — e do meu jeito.”",
  art: ASSETS.lucia,
  accent: "#ff3fb4",
  align: "l",
  dossier: [
    { k: "Origem", v: "Vice City" },
    { k: "Condado", v: "Vice-Dale" },
    { k: "Status", v: "Procurada" },
  ],
};

const JASON: Side = {
  num: "02",
  first: "Jason",
  last: "Duval",
  role: "O veterano",
  quote: "“Só quero uma vida fácil. O problema é descobrir quanto ela custa.”",
  art: ASSETS.jason,
  accent: "#ff8a2a",
  align: "r",
  dossier: [
    { k: "Origem", v: "Leonida Keys" },
    { k: "Condado", v: "Mariana" },
    { k: "Status", v: "Em movimento" },
  ],
};

function Scene({ data }: { data: Side }) {
  const ref = useSceneProgress<HTMLDivElement>();
  const stage = useRef<HTMLDivElement>(null);

  /* parallax de mouse — a figura e o nome seguem o cursor em camadas */
  const onMove = (e: React.MouseEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
  };

  return (
    <div className="char scene" ref={ref}>
      <div
        className={`char__stage char__stage--${data.align}`}
        ref={stage}
        onMouseMove={onMove}
        style={{ "--ac": data.accent } as React.CSSProperties}
      >
        <span className="char__ghost" aria-hidden="true">{data.first}</span>
        <div className="char__sun" aria-hidden="true" />

        {/* figura em recorte — entra com o scroll, flutua com o mouse */}
        <div className="char__fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.art} alt={`${data.first} ${data.last}`} draggable={false} />
        </div>

        <div className="char__info">
          <p className="char__num">{data.num} · protagonista</p>
          <h3 className="char__name">
            {data.first} <em>{data.last}</em>
          </h3>
          <p className="char__role">{data.role}</p>
          <p className="char__quote">{data.quote}</p>
          <ul className="char__dossier">
            {data.dossier.map((d) => (
              <li key={d.k}>
                <span>{d.k}</span> {d.v}
              </li>
            ))}
          </ul>
        </div>

        <div className="char__scroll" aria-hidden="true">
          <span /> continue descendo
        </div>
      </div>
    </div>
  );
}

export default function Duo() {
  return (
    <section
      className="duo-wrap"
      id="dupla"
      data-loc="Vice Beach"
      data-locsub="Península sul · maré alta"
    >
      <div className="container">
        <header className="section-head section-head--split" data-reveal>
          <div>
            <p className="label"><span>02</span> A Dupla</p>
            <h2 className="display">Dois lados, <em>uma lei.</em></h2>
          </div>
          <p className="section-head__text">
            Cada um tem sua própria cena — role devagar. E mova o mouse: eles reagem.
          </p>
        </header>
      </div>

      <Scene data={LUCIA} />
      <Scene data={JASON} />
    </section>
  );
}
