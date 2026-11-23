"use client";

import { useEffect, useRef, useState } from "react";
import { LOCATIONS, type LocationData } from "@/lib/data";
import { toast } from "@/lib/scroll";

type View = { x: number; y: number; k: number };

const MIN_K = 0.9;
const MAX_K = 4;

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
    setView({ x: (r.width - 1000) / 2, y: (r.height - 1000) / 2, k: 1 });
  };

  useEffect(() => {
    centerView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setWp = (loc: LocationData) => {
    setWaypoint(loc.id);
    toast(`<b>Waypoint</b> definido — ${loc.name}`);
    /* voa até o marcador */
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
            <h2 className="display">Navegue <em>Leonida.</em></h2>
          </div>
          <p className="section-head__text">
            Arraste para navegar, use a rolagem para zoom (ou pinça no celular) e toque nos
            marcadores para ver o que cada canto do estado esconde.
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
              <svg className="mapx__svg" viewBox="0 0 1000 1000" role="img" aria-label="Mapa ilustrado do estado de Leonida">
                <defs>
                  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0a1d33" />
                    <stop offset="1" stopColor="#081527" />
                  </linearGradient>
                  <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#232a21" />
                    <stop offset=".55" stopColor="#2c3226" />
                    <stop offset="1" stopColor="#39402e" />
                  </linearGradient>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M50 0H0V50" fill="none" stroke="#5ff0ff" strokeOpacity=".06" strokeWidth="1" />
                  </pattern>
                  <pattern id="swamp" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.6" fill="#7dffb0" opacity=".22" />
                    <circle cx="11" cy="10" r="1.2" fill="#7dffb0" opacity=".16" />
                  </pattern>
                </defs>

                {/* água + grade GPS */}
                <rect width="1000" height="1000" fill="url(#water)" />
                <rect width="1000" height="1000" fill="url(#grid)" />

                {/* ilhas das Keys */}
                <g fill="#39402e">
                  <ellipse cx="665" cy="868" rx="20" ry="9" transform="rotate(24 665 868)" />
                  <ellipse cx="703" cy="886" rx="16" ry="8" transform="rotate(24 703 886)" />
                  <ellipse cx="742" cy="902" rx="19" ry="8" transform="rotate(26 742 902)" />
                  <ellipse cx="782" cy="916" rx="15" ry="7" transform="rotate(27 782 916)" />
                  <ellipse cx="822" cy="930" rx="13" ry="6" transform="rotate(28 822 930)" />
                </g>

                {/* continente de Leonida */}
                <path
                  d="M120 210 C220 170 320 180 380 220 C430 250 470 240 520 230 C600 210 680 220 740 260 C800 300 840 360 850 430 C865 520 880 600 870 680 C862 740 840 790 800 830 C770 858 730 872 700 860 C680 850 670 820 660 790 C640 720 610 660 560 620 C520 590 470 570 430 540 C380 500 330 470 300 420 C270 370 240 330 190 310 C150 295 110 260 120 210 Z"
                  fill="url(#land)"
                  stroke="#4d5741"
                  strokeWidth="3"
                />

                {/* baía de Vice City */}
                <path d="M852 470 C838 490 818 496 800 492 C818 502 842 498 856 484 Z" fill="#0a1d33" />

                {/* parque Mount Kalaga */}
                <ellipse cx="398" cy="178" rx="88" ry="58" fill="#2f4a33" stroke="#4d6b4f" strokeWidth="2" />
                <path d="M360 200 l24 -38 16 22 12 -16 20 32 Z" fill="#1c2e20" />

                {/* pântano Grassrivers */}
                <ellipse cx="432" cy="566" rx="96" ry="64" fill="url(#swamp)" stroke="#3d5a44" strokeWidth="2" strokeDasharray="6 5" />

                {/* área urbana de Vice City */}
                <g fill="#8d8474">
                  <rect x="770" y="430" width="14" height="14" />
                  <rect x="790" y="438" width="12" height="18" />
                  <rect x="808" y="428" width="14" height="12" />
                  <rect x="775" y="452" width="12" height="16" />
                  <rect x="795" y="462" width="14" height="12" />
                  <rect x="815" y="450" width="12" height="16" />
                  <rect x="782" y="482" width="14" height="12" />
                  <rect x="800" y="492" width="12" height="12" />
                </g>

                {/* rodovias */}
                <g fill="none" stroke="#0e1420" strokeWidth="7" strokeLinecap="round">
                  <path d="M380 225 C500 265 640 330 745 425 C800 480 830 545 820 620 C812 680 790 730 755 772 L700 850" />
                  <path d="M150 280 C260 350 360 430 460 520 C540 590 600 660 645 735" />
                </g>
                <g fill="none" stroke="#e8e2d2" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 12">
                  <path d="M380 225 C500 265 640 330 745 425 C800 480 830 545 820 620 C812 680 790 730 755 772 L700 850" />
                  <path d="M150 280 C260 350 360 430 460 520 C540 590 600 660 645 735" />
                </g>
                {/* ponte até as Keys */}
                <path d="M700 850 L822 930" stroke="#e8e2d2" strokeWidth="2.5" strokeDasharray="4 8" />

                {/* rótulos */}
                <g fill="#e8e2d2" fontSize="17" letterSpacing="6" opacity=".65">
                  <text x="500" y="360">LEONIDA</text>
                </g>
                <g fill="#8fa3c4" fontSize="13" letterSpacing="2" opacity=".55">
                  <text x="90" y="120">GOLFO DE LEONIDA</text>
                  <text x="700" y="985" transform="rotate(-5 700 985)">MAR DE LEONIDA</text>
                  <text x="352" y="152" fontSize="12">MT. KALAGA</text>
                  <text x="404" y="650" fontSize="12">GRASSRIVERS</text>
                  <text x="742" y="512" fontSize="12">VICE CITY</text>
                </g>

                {/* rosa dos ventos + escala */}
                <g transform="translate(944,64)" stroke="#8fa3c4" fill="none" opacity=".6">
                  <circle r="26" strokeWidth="1.5" />
                  <path d="M0 -20 L6 8 L0 3 L-6 8 Z" fill="#8fa3c4" stroke="none" />
                  <text y="-32" textAnchor="middle" fill="#8fa3c4" stroke="none" fontSize="12">N</text>
                </g>
                <g transform="translate(60,940)" opacity=".6">
                  <rect width="80" height="4" fill="#8fa3c4" />
                  <rect width="40" height="4" fill="#0a1d33" />
                  <text x="0" y="-8" fill="#8fa3c4" fontSize="11">20 MI</text>
                </g>
              </svg>

              {/* marcadores */}
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
              <div><dt>Coordenadas</dt><dd>25.{sel.x.toString().padStart(3, "0")}°N · 80.{sel.y.toString().padStart(3, "0")}°W</dd></div>
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
