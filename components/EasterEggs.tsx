"use client";

import { useState } from "react";
import { EGGS } from "@/lib/data";

export default function EasterEggs() {
  const [found, setFound] = useState<Set<number>>(new Set());
  const total = EGGS.length;

  const flip = (i: number) => {
    setFound((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  return (
    <section className="section eggs" id="ovos" data-loc="Motel Waning Sands" data-locsub="Condado de Leonard · quarto 6">
      <div className="container">
        <header className="section-head section-head--split" data-reveal>
          <div>
            <p className="label"><span>05</span> Easter Eggs</p>
            <h2 className="display">Só em <em>Leonida.</em></h2>
          </div>
          <p className="section-head__text">
            Segredos espalhados pelo jogo — e por este site. Vire as cartas para revelar
            cada um. Algumas você só entende quando vê de perto.
          </p>
        </header>

        <div className="eggs__meta" data-reveal>
          <span className="eggs__count">
            <b>{found.size}</b>/{total} revelados
          </span>
          <span className="eggs__bar" aria-hidden="true">
            <i style={{ width: `${(found.size / total) * 100}%` }} />
          </span>
        </div>

        <div className="eggs__grid">
          {EGGS.map((egg, i) => {
            const isFound = found.has(i);
            const isSite = egg.cat === "Neste site";
            return (
              <button
                key={egg.title}
                type="button"
                className={`egg${isFound ? " is-found" : ""}${isSite ? " egg--site" : ""}`}
                data-reveal
                style={{ "--d": `${(i % 4) * 0.07}s` } as React.CSSProperties}
                aria-pressed={isFound}
                onClick={() => flip(i)}
              >
                <span className="egg__inner" aria-hidden={isFound}>
                  <span className="egg__face egg__face--front">
                    <span className="egg__q">?</span>
                    <span className={`egg__cat${isSite ? " egg__cat--site" : ""}`}>{egg.cat}</span>
                    <span className="egg__hint">virar carta</span>
                  </span>
                  <span className="egg__face egg__face--back">
                    <span className="egg__title">{egg.title}</span>
                    <span className="egg__desc">{egg.desc}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
