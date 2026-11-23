"use client";

import { useCallback } from "react";
import { useSceneProgress } from "@/lib/scroll";
import { ASSETS } from "@/lib/data";

type Side = {
  id: string;
  name: string;
  role: string;
  quote: string;
  crop: string;
  origin: string;
  status: string;
  accent: string;
};

const LUCIA: Side = {
  id: "lucia",
  name: "Lucia Caminos",
  role: "A sobrevivente",
  quote: "“Eu saí de Leonida uma vez. Voltei por conta própria — e do meu jeito.”",
  crop: "18% 24%",
  origin: "Origem · Vice City, LE",
  status: "Status · Procurada",
  accent: "#ff3fb4",
};

const JASON: Side = {
  id: "jason",
  name: "Jason Duval",
  role: "O veterano",
  quote: "“Só quero uma vida fácil. O problema é descobrir quanto ela custa.”",
  crop: "84% 22%",
  origin: "Origem · Leonida Keys",
  status: "Status · Em movimento",
  accent: "#ff8a2a",
};

function Panel({ side, weight }: { side: Side; weight: "l" | "j" }) {
  return (
    <article className={`duo__panel duo__panel--${weight}`} style={{ "--ac": side.accent } as React.CSSProperties}>
      <div className="duo__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.posterFull}
          alt={side.name}
          loading="lazy"
          style={{ objectPosition: side.crop }}
          draggable={false}
        />
      </div>
      <div className="duo__veil" aria-hidden="true" />
      <div className="duo__info">
        <p className="duo__role">{side.role}</p>
        <h3 className="duo__name">{side.name}</h3>
        <p className="duo__quote">{side.quote}</p>
        <ul className="duo__dossier">
          <li>{side.origin}</li>
          <li>{side.status}</li>
        </ul>
      </div>
      <span className="duo__edge" aria-hidden="true" />
    </article>
  );
}

export default function Duo() {
  /* deriva os pesos de cada painel a partir do progresso da cena */
  const onUpdate = useCallback((p: number, el: HTMLElement) => {
    const pl = Math.max(0, Math.min(1, p * 2.2 - 0.05));        // Lucia domina no início
    const pj = Math.max(0, Math.min(1, p * 2.2 - 1.15));        // Jason assume no fim
    const both = Math.max(0, Math.min(1, p * 3 - 1.9));         // os dois juntos no encerramento
    el.style.setProperty("--pl", pl.toFixed(4));
    el.style.setProperty("--pj", pj.toFixed(4));
    el.style.setProperty("--pb", both.toFixed(4));
  }, []);

  const ref = useSceneProgress<HTMLElement>(onUpdate);

  return (
    <section
      className="duo scene"
      id="dupla"
      data-loc="Vice Beach" data-locsub="Península sul · maré alta"
      ref={ref}
    >
      <div className="duo__stage">
        <p className="duo__chapter">02 · A Dupla</p>

        <Panel side={LUCIA} weight="l" />
        <Panel side={JASON} weight="j" />

        {/* encerramento: os dois, o carro e a cidade */}
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
