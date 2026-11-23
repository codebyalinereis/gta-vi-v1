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
  storyArt: I("t-launch.jpg"),
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
  county: string;
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
    county: "Vice-Dale",
    tag: "Metrópole · Neon",
    desc: "O coração de Leonida e a maior cidade do estado: Downtown, Little Cuba, La Perle, Ekanfinaka e o Aeroporto Internacional. Onde todo mundo tem um plano — e nenhum funciona.",
    x: 680, y: 934,
    danger: 5,
    clima: "Tropical úmido",
    vibe: "Euforia",
    accent: "#ff3fb4",
  },
  {
    id: "vice-beach",
    name: "Vice Beach",
    county: "Vice-Dale",
    tag: "Litoral · Ocean & Washington Beach",
    desc: "A faixa mais cara do estado: Ocean Beach, Washington Beach e o clube de golfe de Leaf Links. O paraíso cobra aluguel — em parcelas que você nem sabia que assinou.",
    x: 800, y: 755,
    danger: 3,
    clima: "Sol permanente",
    vibe: "Verão sem fim",
    accent: "#ff9ad5",
  },
  {
    id: "portvicecity",
    name: "PortViceCity",
    county: "Vice-Dale",
    tag: "Ilhas artificiais · Baía sul",
    desc: "Complexo de ilhas artificiais na baía sul de Vice City — o porto mais movimentado do mundo. Containers de dia, contrabando de noite.",
    x: 620, y: 1071,
    danger: 4,
    clima: "Brisa de baía",
    vibe: "Logística suja",
    accent: "#ff5f8f",
  },
  {
    id: "hamlet",
    name: "Hamlet",
    county: "Vice-Dale",
    tag: "Cidade pequena · Penitenciária",
    desc: "Cidadezinha que existe em função de uma única instituição: a Penitenciária de Leonida. Onde a história de Lucia começa — e onde ela deixou dívidas.",
    x: 520, y: 1071,
    danger: 4,
    clima: "Calor parado",
    vibe: "Espera",
    accent: "#ff8a2a",
  },
  {
    id: "keys",
    name: "Leonida Keys",
    county: "Mariana",
    tag: "Ilhas · Key Lento & East Key",
    desc: "Arquipélago do condado de Mariana: Key Lento, East Key e estradas sobre o mar. Bares às cinco da manhã e gente que nunca voltou. Jason conhece cada canal de cor.",
    x: 320, y: 1236,
    danger: 4,
    clima: "Brisa salgada",
    vibe: "Liberdade",
    accent: "#5ff0ff",
  },
  {
    id: "grassrivers",
    name: "Grassrivers",
    county: "Mariana",
    tag: "Pântano · Interior sem lei",
    desc: "O grande pântano de Mariana: água parada, aircobrats e segredos que afundam devagar. Aqui o silêncio tem dono — e ele cobra caro.",
    x: 300, y: 755,
    danger: 4,
    clima: "Úmido e pesado",
    vibe: "Silêncio",
    accent: "#7dffb0",
  },
  {
    id: "watson-bay",
    name: "Watson Bay",
    county: "Mariana",
    tag: "Costa oeste · Baía",
    desc: "A baía que abre o litoral oeste de Mariana. Pescadores, docas pequenas e o melhor pôr do sol do estado — segundo quem sobreviveu para contar.",
    x: 200, y: 714,
    danger: 3,
    clima: "Vento marítimo",
    vibe: "Cautela",
    accent: "#5fd0ff",
  },
  {
    id: "port-gellhorn",
    name: "Port Gellhorn",
    county: "Kelly",
    tag: "Porto · Zona industrial",
    desc: "O porto industrial do condado de Kelly: contêineres, dívidas e navios que chegam de madrugada. Ninguém pergunta o que é descarregado.",
    x: 150, y: 439,
    danger: 5,
    clima: "Neblina industrial",
    vibe: "Tensão",
    accent: "#ff8a2a",
  },
  {
    id: "draper-island",
    name: "Draper Island",
    county: "Kelly",
    tag: "Ilha · Ao largo do porto",
    desc: "Ilha defronte a Port Gellhorn. Poucos moram, menos visitam — e quem tem barco não explica o porquê.",
    x: 80, y: 494,
    danger: 4,
    clima: "Névoa costeira",
    vibe: "Isolamento",
    accent: "#8fa3ff",
  },
  {
    id: "raceway",
    name: "Gellhorn Raceway",
    county: "Kelly",
    tag: "Autódromo · Velocidade",
    desc: "Circuito internacional de Gellhorn. corrida de rua de dia, aposta clandestina de noite — e sempre alguém testando um carro que não é dele.",
    x: 220, y: 412,
    danger: 2,
    clima: "Asfalto quente",
    vibe: "Adrenalina",
    accent: "#ffd166",
  },
  {
    id: "ambrosia",
    name: "Ambrosia",
    county: "Ambrosia",
    tag: "Interior · Cidade operária",
    desc: "A única cidade do condado de mesmo nome: laranjais, turnos duplos e um orgulho teimoso. Alimenta o estado — que esqueceu de agradecer.",
    x: 420, y: 385,
    danger: 3,
    clima: "Sol direto",
    vibe: "Resiliência",
    accent: "#ffd166",
  },
  {
    id: "mount-kalaga",
    name: "Mount Kalaga",
    county: "Norte",
    tag: "Parque nacional · Divisa",
    desc: "Parque nacional que marca a fronteira norte de Leonida com o estado de Gloriana. Trilhas, ursos e ar puro demais para quem vive de fumaça.",
    x: 350, y: 165,
    danger: 2,
    clima: "Neblina",
    vibe: "Silêncio absoluto",
    accent: "#b892ff",
  },
  {
    id: "yorktown",
    name: "Yorktown",
    county: "Norte",
    tag: "Cidade do norte · Domed Hills",
    desc: "Cidade do condado norte, nas colinas de Domed Hills. Última parada de gasolina antes de Gloriana — e último lugar para pensar duas vezes.",
    x: 550, y: 137,
    danger: 3,
    clima: "Temperado",
    vibe: "Vigília",
    accent: "#8fa3ff",
  },
  {
    id: "waning-sands",
    name: "Waning Sands",
    county: "Leonard",
    tag: "Condado Leonard · Panhandle",
    desc: "Única cidade conhecida do condado de Leonard, no extremo noroeste. Areia que escorre entre os dedos — como todo mundo que passa por aqui.",
    x: 80, y: 247,
    danger: 3,
    clima: "Seco e quente",
    vibe: "Passagem",
    accent: "#ffb57a",
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

/* ------------------------------------------------------------
   Easter eggs — do jogo e deste site
   ------------------------------------------------------------ */

export const EGGS = [
  {
    cat: "No jogo",
    title: "O Leonida Man",
    desc: "O fenômeno viral do estado: manchetes absurdas que só poderiam acontecer aqui. Fique de olho nos noticiários e nas conversas de rua.",
  },
  {
    cat: "No jogo",
    title: "A Lua é de Leonida",
    desc: "O estado é 'indiretamente responsável' pelos teóricos da conspiração da chegada à Lua — pistas espalhadas desde Liberty City.",
  },
  {
    cat: "No jogo",
    title: "O selo do jacaré",
    desc: "O brasão oficial de Leonida mostra uma pessoa sendo devorada por um jacaré. O retrato do estado em um só desenho.",
  },
  {
    cat: "No jogo",
    title: "O vizinho Gloriana",
    desc: "Ao norte de Mount Kalaga começa o estado de Gloriana. A fronteira existe exatamente para ser cruzada.",
  },
  {
    cat: "No jogo",
    title: "Vice City de 2002",
    desc: "O neon da Vice City clássica pisca em letreiros, camisetas e rádios pela cidade inteira. Nostalgia é negócio por aqui.",
  },
  {
    cat: "No jogo",
    title: "Jacaré na piscina",
    desc: "Tradição local confirmada no Trailer 1: voltou de viagem e achou um jacaré na piscina? Parabéns, você é leonidense.",
  },
  {
    cat: "Neste site",
    title: "HESOYAM",
    desc: "O clássico dos clássicos. Digite H-E-S-O-Y-A-M em qualquer lugar desta página e veja o céu mudar.",
  },
  {
    cat: "Neste site",
    title: "Cinco estrelas",
    desc: "Clique 5 vezes no logo VI do menu. A polícia de Leonida agradece a denúncia.",
  },
];
