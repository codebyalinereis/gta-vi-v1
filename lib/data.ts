/* ============================================================
   Dados da experiência — assets locais, mapa, rádio, mídia
   ============================================================ */

/** Arte oficial baixada para /public/img (imune a hotlink/CDN). */
const I = (name: string) => `/img/${name}`;

export const ASSETS = {
  posterFull: I("poster.jpg"),
  posterLogo: I("poster-logo.png"),
  logoVi: I("logo-vi.png"),
  vi: I("vi.png"),
  lucia: I("lucia.png"),
  jason: I("jason.png"),
  onlyInLeonida: I("only-in-leonida.jpg"),
  gallery: I("gallery.jpg"),
  esrb: I("esrb.svg"),
};

/** Cacos de vidro do hero — montam o pôster conforme o scroll. */
export const SHARDS = Array.from({ length: 10 }, (_, i) => I(`shard-${i}.png`));

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
  { label: "Trailer de Lançamento", img: I("t-launch.jpg"), url: "https://www.rockstargames.com/VI" },
  { label: "An Extended Look", img: I("t-extended.jpg"), url: "https://www.rockstargames.com/VI" },
  { label: "Trailer 2", img: I("t2.jpg"), url: "https://www.youtube.com/watch?v=VQRLujxTm3c" },
  { label: "Trailer 1", img: I("t1.jpg"), url: "https://www.youtube.com/watch?v=QdBZY2fkU-0" },
];

export const NEWS = [
  { date: "23 · Nov · 2026", title: "Grand Theft Auto VI: The Album (Deluxe Edition)", img: I("news-album.jpg") },
  { date: "19 · Nov · 2026", title: "Grand Theft Auto VI já está disponível", img: I("news-launch.jpg") },
  { date: "10 · Nov · 2026", title: "Pré-carga de Grand Theft Auto VI liberada", img: I("news-preload.jpg") },
];

export const OFFICIAL = "https://www.rockstargames.com/VI";
