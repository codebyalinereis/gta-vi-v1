"use client";

import { useSceneProgress } from "@/lib/scroll";
import { ASSETS } from "@/lib/data";

export default function Story() {
  const ref = useSceneProgress<HTMLDivElement>();

  return (
    <section className="section story" id="historia" data-loc="Rodovia 1" data-locsub="Interior de Leonida · km 42">
      <div className="container">
        <p className="label" data-reveal><span>01</span> A História</p>
        <h2 className="display" data-reveal>
          Vice City, <em>EUA.</em>
        </h2>

        <div className="story__grid" ref={ref}>
          <div className="story__art scene--inline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="story__img"
              src={ASSETS.onlyInLeonida}
              alt="Lucia e Jason em Vice City"
              loading="lazy"
            />
            <span className="story__cap">Vice City · hora dourada</span>
          </div>
          <div className="story__copy">
            <p className="story__lead" data-reveal>
              Lucia e Jason sempre souberam que o baralho estava marcado contra eles.
            </p>
            <p data-reveal style={{ "--d": ".08s" } as React.CSSProperties}>
              Mas quando um golpe fácil dá errado, os dois acabam no lado mais sombrio
              do lugar mais ensolarado da América — no meio de uma conspiração criminosa
              que se espalha por todo o estado de Leonida.
            </p>
            <p data-reveal style={{ "--d": ".14s" } as React.CSSProperties}>
              Forçados a confiar um no outro como nunca, eles descobrem que em Vice City
              só existe uma saída: <strong>pra cima.</strong>
            </p>
            <ul className="story__facts" data-reveal style={{ "--d": ".2s" } as React.CSSProperties}>
              <li><b>2</b><span>Protagonistas jogáveis</span></li>
              <li><b>1</b><span>Estado inteiro: Leonida</span></li>
              <li><b>∞</b><span>Jeitos de se dar mal</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
