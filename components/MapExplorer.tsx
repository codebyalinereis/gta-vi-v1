"use client";

import { useEffect, useRef, useState } from "react";
import { LOCATIONS, type LocationData } from "@/lib/data";
import { toast } from "@/lib/scroll";

type View = { x: number; y: number; k: number };

/* camada fixa com a proporção do mapa oficial (3019x4140) */
const MAP_W = 1000;
const MAP_H = 1373;
/* foco inicial: região de Vice City */
const FOCUS = { x: 680, y: 900 };

const MIN_K = 0.7;
const MAX_K = 4.5;

export default function MapExplorer() {
  const [view, setView] = useState<View>({ x: 0, y: 0, k: 1 });
  const [sel, setSel] = useState<LocationData>(LOCATIONS[0]);
  const [waypoint, setWaypoint] = useState<string | null>(null);
  const drag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; k: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const zoomAt = (factor: number, cx: number, cy: number) => {
    setView((v) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
      const r = k / v.k;
      return { k, x: cx - (cx - v.x) * r, y: cy - (cy - v.y) * r };
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: view.x, oy: view.y };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), k: view.k };
      drag.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const r = box.current?.getBoundingClientRect();
      if (r) zoomAt(dist / pinch.current.dist, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      pinch.current = { dist, k: view.k };
    } else if (drag.current && drag.current.id === e.pointerId) {
      const d = drag.current;
      setView((v) => ({ ...v, x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (drag.current?.id === e.pointerId) drag.current = null;
  };

  const btnZoom = (factor: number) => {
    const r = box.current?.getBoundingClientRect();
    zoomAt(factor, (r?.width ?? 0) / 2, (r?.height ?? 0) / 2);
  };

  const centerView = () => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setView({ x: r.width / 2 - FOCUS.x, y: r.height / 2 - FOCUS.y, k: 1 });
  };

  useEffect(() => {
    centerView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setWp = (loc: LocationData) => {
    setWaypoint(loc.id);
    toast(`<b>Waypoint</b> definido — ${loc.name}`);
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const k = Math.max(view.k, 2.2);
    setView({ k, x: r.width / 2 - loc.x * k, y: r.height / 2 - loc.y * k });
  };

  return (
    <section className="section mapsec" id="mapa" data-loc="Grassrivers" data-locsub="Pântano de Leonida · sem sinal">
      <div className="container">
        <header className="section-head section-head--split" data-reveal>
          <div>
            <p className="label"><span>03</span> O Mapa</p>
            <h2 className="display">O mapa <em>de verdade.</em></h2>
          </div>
          <p className="section-head__text">
            O mapa oficial do estado de Leonida, direto do jogo — com os 5 condados e as
            localidades reveladas. Arraste para navegar, dê zoom com a roda (ou pinça) e
            toque nos marcadores para saber o que esperar de cada canto.
          </p>
        </header>

        <div className="mapx" data-reveal>
          <div
            className="mapx__viewport"
            ref={box}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className="mapx__layer"
              style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.k})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mapx__img"
                src="/img/map-leonida.jpg"
                alt="Mapa oficial do estado de Leonida em Grand Theft Auto VI"
                draggable={false}
              />

              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  className={`mapx__marker${sel.id === loc.id ? " is-active" : ""}${waypoint === loc.id ? " is-waypoint" : ""}`}
                  style={{ left: loc.x, top: loc.y, "--ac": loc.accent, "--ik": 1 / view.k } as React.CSSProperties}
                  aria-label={`Ver detalhes de ${loc.name}`}
                  onClick={(e) => { e.stopPropagation(); setSel(loc); }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <span className="mapx__pin" />
                  <span className="mapx__tag">{loc.name}</span>
                </button>
              ))}
            </div>

            {/* controles */}
            <div className="mapx__ui">
              <button type="button" onClick={() => btnZoom(1.3)} aria-label="Aproximar">+</button>
              <button type="button" onClick={() => btnZoom(1 / 1.3)} aria-label="Afastar">−</button>
              <button type="button" onClick={centerView} aria-label="Recentrar mapa">⌖</button>
            </div>
            <p className="mapx__hint">Arraste · role para dar zoom · toque nos marcadores</p>
          </div>

          {/* painel de informações */}
          <aside className="mapx__panel" key={sel.id} style={{ "--ac": sel.accent } as React.CSSProperties}>
            <p className="mapx__tagchip">{sel.tag}</p>
            <h3 className="mapx__name">{sel.name}</h3>
            <p className="mapx__county">Condado de {sel.county}</p>
            <p className="mapx__desc">{sel.desc}</p>

            <div className="mapx__danger">
              <span>Nível de perigo</span>
              <div className="mapx__bars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <i key={i} className={i <= sel.danger ? "on" : ""} style={{ transitionDelay: `${i * 70}ms` }} />
                ))}
              </div>
              <b>{["Tranquilo", "Atento", "Cuidado", "Perigoso", "Letal"][sel.danger - 1]}</b>
            </div>

            <dl className="mapx__stats">
              <div><dt>Clima</dt><dd>{sel.clima}</dd></div>
              <div><dt>Vibe</dt><dd>{sel.vibe}</dd></div>
            </dl>

            <button className="btn btn--ghost mapx__wp" type="button" onClick={() => setWp(sel)}>
              Definir waypoint ➤
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
