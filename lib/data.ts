/* ============================================================
   Dados da experiência — assets oficiais, mapa, rádio, mídia
   ============================================================ */

const CDN = "https://www.rockstargames.com/VI/_next/static/media/";

/** Monta URL do CDN oficial com largura otimizada (Akamai). */
export const img = (file: string, w = 1600) =>
  `${CDN}${file}${file.includes("?") ? "&" : "?"}akim=1&imdensity=1&imwidth=${w}`;

export const ASSETS = {
  posterFull: img("poster_full.0az_iud2g3y4j.jpg", 2200),
  posterLogo: img("poster_logo.0m-7c805zusl7.png", 900),
  logoVi: img("logo_vi.02gnpy7k4ozcz.png", 400),
  logoGta: img("logo_gta.0_~y3s2ni8fbj.png", 700),
  vi: img("vi.0hxa9~pf214xe.png", 700),
  meta: img("meta.0t8ty~nlmxq2s.jpg?6wC5t2qhtJZtllO-YhLc", 1200),
  onlyInLeonida: img("onlyInLeonidaMobile.0mupfnk-x6x~r.jpg", 1800),
  music: img("musicMobile.16pdg34v6lit..jpg", 1800),
  gallery: img("screenshotsMobile.01nsldjqbta4u.jpg", 1800),
  esrb: img("esrb-mature.0k-tky9~eo.-3.svg", 140),
};

/** Cacos de vidro do hero — montam o pôster conforme o scroll. */
export const SHARDS = [
  "shard0.0_vm6ya9-h67x.png",
  "shard1.14.-n-5n.4nws.png",
  "shard2.0n4e6vntuoxgf.png",
  "shard3.120i1.3ll3tb9.png",
  "shard4.0bi8cg9mdh8p4.png",
  "shard5.0qdavlhu9vx3m.png",
  "shard6.0m27xv.6a~.pk.png",
  "shard7.0r3-p5yp386ao.png",
  "shard8.0-nawcceg2vqw.png",
  "shard9.08p7clh5_sa.q.png",
].map((f) => img(f, 1000));

/* ------------------------------------------------------------
   Locais de Leonida — marcadores do mapa interativo
   ------------------------------------------------------------ */

export type LocationData = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  x: number;
  y: number;
  danger: number;
  clima: string;
  vibe: string;
  accent: string;
};

export const LOCATIONS: LocationData[] = [
  {
    id: "vice-city",
    name: "Vice City",
    tag: "Metrópole · Neon",
    desc: "O coração de Leonida: praia, excesso e asfalto molhado que reflete neon a noite inteira. Onde todo mundo tem um plano — e nenhum funciona.",
    x: 795, y: 468,
    danger: 5,
    clima: "Tropical úmido",
    vibe: "Euforia",
    accent: "#ff3fb4",
  },
  {
    id: "vice-beach",
    name: "Vice Beach",
    tag: "Litoral · Ponto badalado",
    desc: "Areia branca, risadas altas e contas mais altas ainda. O paraíso cobra aluguel — em parcelas que você nem sabia que tinha assinado.",
    x: 822, y: 548,
    danger: 3,
    clima: "Sol permanente",
    vibe: "Verão sem fim",
    accent: "#ff9ad5",
  },
  {
    id: "keys",
    name: "Leonida Keys",
    tag: "Ilhas · Estrada sobre o mar",
    desc: "Estradas sobre o oceano, bares abertos às cinco da manhã e gente que nunca voltou. O horizonte é bonito demais para fazer perguntas.",
    x: 738, y: 902,
    danger: 4,
    clima: "Brisa salgada",
    vibe: "Liberdade",
    accent: "#5ff0ff",
  },
  {
    id: "port-gellhorn",
    name: "Port Gellhorn",
    tag: "Porto · Zona industrial",
    desc: "Contêineres, dívidas e navios que chegam de madrugada. A cidade trabalha a noite inteira — e ninguém pergunta o que é descarregado.",
    x: 142, y: 252,
    danger: 5,
    clima: "Neblina industrial",
    vibe: "Tensão",
    accent: "#ff8a2a",
  },
  {
    id: "grassrivers",
    name: "Grassrivers",
    tag: "Pântano · Interior sem lei",
    desc: "Água parada, aircobrats e segredos que afundam devagar. Aqui o silêncio tem dono — e ele cobra caro para não quebrá-lo.",
    x: 432, y: 566,
    danger: 4,
    clima: "Úmido e pesado",
    vibe: "Silêncio",
    accent: "#7dffb0",
  },
  {
    id: "mount-kalaga",
    name: "Mount Kalaga",
    tag: "Parque nacional · Montanha",
    desc: "Trilhas, ursos e ar puro demais para quem está acostumado com fumaça. Do topo, dá para ver o estado inteiro — e o tamanho do problema.",
    x: 398, y: 178,
    danger: 2,
    clima: "Neblina",
    vibe: "Silêncio absoluto",
    accent: "#b892ff",
  },
  {
    id: "ambrosia",
    name: "Ambrosia",
    tag: "Interior · Cidade operária",
    desc: "Laranjais, turnos duplos e um orgulho teimoso. A cidadezinha que alimenta o estado — e que o estado esqueceu de agradecer.",
    x: 482, y: 244,
    danger: 3,
    clima: "Sol direto",
    vibe: "Resiliência",
    accent: "#ffd166",
  },
  {
    id: "kelly-county",
    name: "Kelly County",
    tag: "Condado do norte · Fronteira",
    desc: "Onde Leonida começa para quem chega de cima. Xerifes pacientes, estradas longas e um radar que nunca dorme.",
    x: 298, y: 206,
    danger: 3,
    clima: "Temperado",
    vibe: "Vigília",
    accent: "#8fa3ff",
  },
];

/* ------------------------------------------------------------
   Rádio Leonida — estações sintetizadas ao vivo
   ------------------------------------------------------------ */

export const STATION_META = [
  { id: "neon", name: "Neon 96", freq: "96.0 FM · Vice City", genre: "Synthwave · Nightdrive", ac: "#ff3fb4" },
  { id: "mamba", name: "Mamba FM", freq: "103.5 FM · Vice City", genre: "Reggaetón · Urbana", ac: "#ff8a2a" },
  { id: "baile", name: "Baile 105", freq: "105.9 FM · Vice City", genre: "Funk de Vice City", ac: "#5ff0ff" },
  { id: "kfly", name: "K-Fly", freq: "91.3 FM · Leonida", genre: "Soul · Disco · Boogie", ac: "#b892ff" },
] as const;

export type StationId = (typeof STATION_META)[number]["id"];

/* ------------------------------------------------------------
   Mídia — trailers e newswire
   ------------------------------------------------------------ */

export const TRAILERS = [
  { label: "Trailer de Lançamento", img: img("launch-trailer-mobile.11.007xolt5y2.jpg", 1200), url: "https://www.rockstargames.com/VI" },
  { label: "An Extended Look", img: img("an-extended-look-mobile.0f0-3vo3w9u26.jpg", 1200), url: "https://www.rockstargames.com/VI" },
  { label: "Trailer 2", img: img("trailer-2.0l.7aqib91fz6.jpg", 1200), url: "https://www.youtube.com/watch?v=VQRLujxTm3c" },
  { label: "Trailer 1", img: img("trailer-1.06b6paykx247w.jpg", 1200), url: "https://www.youtube.com/watch?v=QdBZY2fkU-0" },
];

export const NEWS = [
  {
    date: "23 · Nov · 2026",
    title: "Grand Theft Auto VI: The Album (Deluxe Edition)",
    img: img("178ok8411a55o5.0bzs42.6~szfb.jpg", 800),
  },
  {
    date: "19 · Nov · 2026",
    title: "Grand Theft Auto VI já está disponível",
    img: img("39akk424a9oo53.0sses._-mhxod.jpg", 800),
  },
  {
    date: "10 · Nov · 2026",
    title: "Pré-carga de Grand Theft Auto VI liberada",
    img: img("89834o94713o21.04n287k6o2lh9.jpg", 800),
  },
];

export const OFFICIAL = "https://www.rockstargames.com/VI";
