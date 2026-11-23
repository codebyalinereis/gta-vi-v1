import { TRAILERS, NEWS, OFFICIAL, ASSETS } from "@/lib/data";

export default function Media() {
  return (
    <section className="section midia" id="midia" data-loc="Cinema Oceana" data-locsub="Sessão das 22h — lotado">
      <div className="container">
        <header className="section-head section-head--split" data-reveal>
          <div>
            <p className="label"><span>05</span> Mídia</p>
            <h2 className="display">Direto de <em>Leonida.</em></h2>
          </div>
          <p className="section-head__text">
            Trailers oficiais e as últimas notícias do Newswire — tudo em um só lugar.
          </p>
        </header>

        <div className="midia__grid">
          {TRAILERS.map((t, i) => (
            <a
              key={t.label}
              className={`midia__card${i === 0 ? " midia__card--wide" : ""}`}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
            >
              <span className="midia__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.img} alt={t.label} loading="lazy" />
                <span className="midia__play" aria-hidden="true">▶</span>
              </span>
              <span className="midia__label">{t.label}</span>
            </a>
          ))}
        </div>

        <div className="midia__news">
          <p className="label" data-reveal><span>+</span> Newswire</p>
          <div className="midia__news-grid">
            {NEWS.map((n, i) => (
              <a
                key={n.title}
                className="news"
                href={OFFICIAL}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.img} alt="" loading="lazy" />
                <div>
                  <p className="news__date">{n.date}</p>
                  <h4 className="news__title">{n.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* banner final */}
        <div className="finale" data-reveal style={{ backgroundImage: `url(${ASSETS.gallery})` }}>
          <div className="finale__veil" aria-hidden="true" />
          <div className="finale__inner">
            <p className="finale__kicker">Disponível agora · 19 · 11 · 2026</p>
            <h3 className="finale__title">Bem-vindo <em>a Leonida.</em></h3>
            <p className="finale__sub">PlayStation 5 · Xbox Series X|S</p>
            <div className="finale__actions">
              <a className="btn btn--primary" href={OFFICIAL} target="_blank" rel="noopener noreferrer">
                Site oficial ↗
              </a>
              <a className="btn btn--ghost" href="#inicio">Voltar ao topo ↑</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
