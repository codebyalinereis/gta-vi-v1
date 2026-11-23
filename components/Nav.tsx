"use client";

import { useEffect, useState } from "react";
import { ASSETS, OFFICIAL } from "@/lib/data";
import { audio } from "@/lib/audio";

const LINKS = [
  { href: "#dupla", n: "01", label: "A Dupla" },
  { href: "#mapa", n: "02", label: "Mapa" },
  { href: "#radio", n: "03", label: "Rádio" },
  { href: "#midia", n: "04", label: "Mídia" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 42);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const bar = document.getElementById("scrollProgress");
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* wanted level: 5 cliques no logo */
  useEffect(() => {
    let clicks = 0;
    let last = 0;
    const brand = document.getElementById("navBrand");
    if (!brand) return;
    const onClick = () => {
      const now = Date.now();
      if (now - last > 2600) { clicks = 0; setStars(0); }
      last = now;
      clicks = Math.min(5, clicks + 1);
      setStars(clicks);
      audio.ensure();
      audio.blip(620 + clicks * 90, 0.09, 0.05, "square");
      if (clicks >= 5) {
        window.dispatchEvent(new CustomEvent("vi:toast", {
          detail: { html: "<b>★ ★ ★ ★ ★</b> — Procurado em Leonida. Boa sorte.", dur: 4200 },
        }));
        audio.siren();
        window.dispatchEvent(new CustomEvent("vi:police", { detail: { on: true } }));
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent("vi:police", { detail: { on: false } }));
          setStars(0);
          clicks = 0;
        }, 4200);
      }
    };
    brand.addEventListener("click", onClick);
    return () => brand.removeEventListener("click", onClick);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a className="nav__brand" href="#inicio" id="navBrand" aria-label="GTA VI, voltar ao início" title="Clique 5× se tiver coragem">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nav__logo" src={ASSETS.logoVi} alt="" width={46} height={26} />
        <span className="nav__name">Grand Theft Auto VI</span>
      </a>

      <nav className="nav__links" aria-label="Navegação principal">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            <span>{l.n}</span> {l.label}
          </a>
        ))}
      </nav>

      <div className="nav__extra">
        <div className="stars" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={i <= stars ? "lit" : ""}>★</span>
          ))}
        </div>
        <button
          className={`nav__sound${audio.soundOn ? "" : " is-off"}`}
          type="button"
          aria-pressed={audio.soundOn}
          aria-label="Alternar sons da interface"
          onClick={() => audio.toggleSound()}
        >
          ♪
        </button>
        <a className="nav__cta" href={OFFICIAL} target="_blank" rel="noopener noreferrer">
          Comprar
        </a>
      </div>
    </header>
  );
}
