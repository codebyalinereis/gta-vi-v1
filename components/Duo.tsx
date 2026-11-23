"use client";

import { useCallback } from "react";
import { useSceneProgress } from "@/lib/scroll";
import { ASSETS } from "@/lib/data";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

type Side = {
  role: string;
  name: string;
  last: string;
  quote: string;
  art: string;
  accent: string;
  pos: string;
};

const LUCIA: Side = {
  role: "A sobrevivente",
  name: "Lucia",
  last: "Caminos",
  quote: "“Eu saí de Leonida uma vez. Voltei por conta própria — e do meu jeito.”",
  art: ASSETS.lucia,
  accent: "#ff3fb4",
  pos: "50% 15%",
};

const JASON: Side = {
  role: "O veterano",
  name: "Jason",
  last: "Duval",
  quote: "“Só quero uma vida fácil. O problema é descobrir quanto ela custa.”",
  art: ASSETS.jason,
  accent: "#ff8a2a",
  pos: "50% 15%",
};

function Half({ side, weight }: { side: Side; weight: "l" | "j" }) {
  return (
    <div
      className={`duo__half duo__half--${weight}`}
      style={{ "--ac": side.accent, "--op": side.pos } as React.CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={side.art} alt={`${side.name} ${side.last}`} loading="lazy" draggable={false} />
      <div className="duo__label">
        <p className="duo__role">{side.role}</p>
        <h3 className="duo__name">
          {side.name} <em>{side.last}</em>
        </h3>
        <p className="duo__quote">{side.quote}</p>
      </div>
    </div>
  );
}

export default function Duo() {
  /* o divisor desliza: Lucia domina → Jason responde → equilíbrio */
  const onUpdate = useCallback((p: number, el: HTMLElement) => {
    const s1 = clamp01(p / 0.4);
    const s2 = clamp01((p - 0.4) / 0.4);
    const s3 = clamp01((p - 0.8) / 0.2);
    const d = 50 + 18 * s1 - 36 * s2 + 18 * s3;
    el.style.setProperty("--dl", d.toFixed(2));
    el.style.setProperty("--dj", (100 - d).toFixed(2));
    el.style.setProperty("--eL", Math.min(1, s1 * (1 - s2) + s3 * 0.5 + 0.1).toFixed(3));
    el.style.setProperty("--eJ", Math.min(1, s2 * (1 - s3 * 0.5) + 0.1).toFixed(3));
    el.style.setProperty("--pb", clamp01((p - 0.85) / 0.15).toFixed(3));
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
        <p className="duo__chapter">02 · A Dupla</p>

        <div className="duo__sides">
          <Half side={LUCIA} weight="l" />
          <div className="duo__divider" aria-hidden="true" />
          <Half side={JASON} weight="j" />
        </div>

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
