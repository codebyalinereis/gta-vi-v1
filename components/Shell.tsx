"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";

/* ---------- confete dourado (cheat / conquistas) ---------- */
function burst() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;z-index:355;pointer-events:none";
  document.body.appendChild(c);
  const g = c.getContext("2d");
  if (!g) { c.remove(); return; }
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  const W = c.width, H = c.height;
  const colors = ["#ffd166", "#ff3fb4", "#fff4ec", "#ff8a2a"];
  const parts: { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string }[] = [];
  for (let i = 0; i < 150; i++) {
    const left = i % 2 === 0;
    const life = 80 + Math.random() * 50;
    parts.push({
      x: (left ? 0.06 : 0.94) * W,
      y: H + 20,
      vx: (W * 0.5 - (left ? 0.06 : 0.94) * W) / 70 + (Math.random() - 0.5) * 4 * dpr,
      vy: -(7 + Math.random() * 7) * dpr,
      life, max: life,
      size: (1.5 + Math.random() * 2.5) * dpr,
      color: colors[i % colors.length],
    });
  }
  const grav = 0.22 * dpr;
  const step = () => {
    g.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of parts) {
      if (p.life <= 0) continue;
      alive++;
      p.life--; p.x += p.vx; p.y += p.vy; p.vy += grav;
      g.globalAlpha = Math.max(0, p.life / p.max);
      g.fillStyle = p.color;
      g.beginPath();
      g.arc(p.x, p.y, p.size, 0, 6.283);
      g.fill();
    }
    g.globalAlpha = 1;
    if (alive > 0) requestAnimationFrame(step);
    else c.remove();
  };
  step();
}

/* ---------- loader ---------- */
function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 400 : 1500;
    const started = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        setDone(true);
        setTimeout(onDone, 900);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <div className={`loader${done ? " is-done" : ""}`} aria-hidden={done}>
      <div className="loader__curtain loader__curtain--t" />
      <div className="loader__curtain loader__curtain--b" />
      <div className="loader__content">
        <p className="loader__brand">Leonida · 2026</p>
        <p className="loader__mark">VI</p>
        <div className="loader__bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <p className="loader__pct">{pct}%</p>
      </div>
    </div>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; html: string }[]>([]);
  const [police, setPolice] = useState(false);
  const [loc, setLoc] = useState<{ name: string; sub: string; key: number } | null>(null);
  const locTimer = useRef<number>(0);
  const lastLoc = useRef(0);

  useEffect(() => {
    document.body.classList.add("is-loading");

    const t = window.setTimeout(() => setReady(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  /* toasts via evento global */
  useEffect(() => {
    const onToast = (e: Event) => {
      const { html, dur } = (e as CustomEvent).detail;
      const id = Date.now() + Math.random();
      setToasts((list) => [...list.slice(-2), { id, html }]);
      window.setTimeout(() => {
        setToasts((list) => list.filter((t) => t.id !== id));
      }, dur || 3400);
    };
    window.addEventListener("vi:toast", onToast);
    return () => window.removeEventListener("vi:toast", onToast);
  }, []);

  /* polícia + cheat + burst */
  useEffect(() => {
    const onPolice = (e: Event) => {
      const { on } = (e as CustomEvent).detail;
      setPolice(!!on);
    };
    const onBurst = () => burst();
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag && /^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      if (e.key && e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-7);
        if (buf === "hesoyam") {
          buf = "";
          burst();
          window.dispatchEvent(new CustomEvent("vi:toast", {
            detail: { html: "<b>HESOYAM</b> — Vida, colete e $250.000 na conta.", dur: 4200 },
          }));
        }
      }
    };
    window.addEventListener("vi:police", onPolice);
    window.addEventListener("vi:burst", onBurst);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("vi:police", onPolice);
      window.removeEventListener("vi:burst", onBurst);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* intro de localização + reveals */
  useEffect(() => {
    if (!ready) return;
    const showLoc = (name: string, sub: string) => {
      const now = Date.now();
      if (now - lastLoc.current < 4200) return;
      lastLoc.current = now;
      setLoc({ name, sub, key: now });
      window.clearTimeout(locTimer.current);
      locTimer.current = window.setTimeout(() => setLoc(null), 2700);
    };

    const locIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const el = en.target as HTMLElement;
          if (el.id === "inicio") {
            const d = new Date();
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            showLoc(el.dataset.loc || "Vice City", `Leonida · ${hh}:${mm}`);
          } else {
            showLoc(el.dataset.loc || "", el.dataset.locsub || "");
          }
        }
      },
      { threshold: 0.35 }
    );
    document.querySelectorAll("[data-loc]").forEach((el) => locIO.observe(el));

    const revIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            revIO.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revIO.observe(el));

    return () => { locIO.disconnect(); revIO.disconnect(); };
  }, [ready]);

  return (
    <>
      {!ready && <Loader onDone={() => {
        document.body.classList.remove("is-loading");
        document.body.classList.add("is-ready");
        setReady(true);
      }} />}

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />

      <Nav />

      {children}

      {/* intro de localização estilo GTA */}
      {loc && (
        <div className="loc-intro is-on" key={loc.key} aria-hidden="true">
          <span className="loc-intro__bar" />
          <span className="loc-intro__text">
            <strong>{loc.name}</strong>
            <em>{loc.sub}</em>
          </span>
        </div>
      )}

      {/* toasts */}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div className="toast" key={t.id} dangerouslySetInnerHTML={{ __html: t.html }} />
        ))}
      </div>

      {/* luzes de polícia */}
      <div className={`police${police ? " is-on" : ""}`} aria-hidden="true" />
    </>
  );
}
