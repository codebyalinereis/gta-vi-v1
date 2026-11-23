import { ASSETS, OFFICIAL } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="footer__brand" href="#inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.vi} alt="Grand Theft Auto VI" width={110} height={62} />
          <span>
            Experiência interativa de fã<br />
            <em>Não afiliada à Rockstar Games</em>
          </span>
        </a>

        <nav className="footer__links" aria-label="Rodapé">
          <a href="#dupla">A Dupla</a>
          <a href="#mapa">Mapa</a>
          <a href="#radio">Rádio</a>
          <a href="#midia">Mídia</a>
          <a href={OFFICIAL} target="_blank" rel="noopener noreferrer">Site oficial ↗</a>
        </nav>

        <div className="footer__badges">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.esrb} alt="Classificação ESRB Mature 17+" width={54} height={76} loading="lazy" />
        </div>
      </div>

      <div className="container footer__bottom">
        <p>Projeto conceito de fã. Grand Theft Auto © Rockstar Games / Take-Two Interactive.</p>
        <p className="footer__cheat">dica de turista: digite <b>HESOYAM</b></p>
        <p>Leonida · 2026</p>
      </div>
    </footer>
  );
}
