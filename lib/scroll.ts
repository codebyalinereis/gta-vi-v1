"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Escreve a variável CSS --p (0 → 1) no elemento conforme ele atravessa
 * a viewport — sem re-render. Para cenas fixas (altura > 100vh),
 * o progresso cobre a travessia completa da cena.
 */
export function useSceneProgress<T extends HTMLElement>(
  onUpdate?: (p: number, el: T) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (r.height > vh) {
        const total = r.height - vh;
        p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
      } else {
        p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      }
      if (reduce) p = p > 0 ? 1 : 0;
      el.style.setProperty("--p", p.toFixed(4));
      onUpdate?.(p, el);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [onUpdate]);

  return ref;
}

/** Toast global via CustomEvent — qualquer componente pode disparar. */
export const toast = (html: string, dur = 3400) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("vi:toast", { detail: { html, dur } }));
  }
};
