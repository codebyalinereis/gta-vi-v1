import { EGGS } from "@/lib/data";

export default function EasterEggs() {
  return (
    <section className="section eggs" id="easter-eggs" data-loc="Motel Waning Sands" data-locsub="Condado de Leonard · quarto 6">
      <div className="container">
        <header className="section-head section-head--split" data-reveal>
          <div>
            <p className="label"><span>05</span> Easter Eggs</p>
            <h2 className="display">Só em <em>Leonida.</em></h2>
          </div>
          <p className="section-head__text">
            Segredos e curiosidades espalhados pelo jogo — e por este site.
            Fique de olho: alguns você só entende quando vê de perto.
          </p>
        </header>

        <div className="eggs__grid">
          {EGGS.map((egg, i) => {
            const isSite = egg.cat === "Neste site";
            return (
              <article
                key={egg.title}
                className={`egg${isSite ? " egg--site" : ""}`}
                data-reveal
                style={{ "--d": `${(i % 4) * 0.07}s` } as React.CSSProperties}
              >
                <span className="egg__cat">{egg.cat}</span>
                <h4 className="egg__title">{egg.title}</h4>
                <p className="egg__desc">{egg.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
