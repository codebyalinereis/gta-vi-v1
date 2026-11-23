# 🌴 GRAND THEFT AUTO VI — BEM-VINDO A LEONIDA

> **Experiência interativa de fã, feita em Next.js.**
> Vice City, EUA. O lado mais sombrio do lugar mais ensolarado da América.

[![Classificação](https://img.shields.io/badge/energia-neon-ff3fb4?style=flat-square)](https://github.com/codebyalinereis/gtaVI)
[![Framework](https://img.shields.io/badge/framework-Next.js-0b0413?style=flat-square)](https://nextjs.org)
[![Licença do projeto](https://img.shields.io/badge/uso-fan--made%20·%20não--oficial-ffd166?style=flat-square)](#aviso)

---

## 🎬 O Briefing

Você foi contratado para um serviço simples: **descer a página**.
O que acontece depois é problema seu.

O site inteiro reage à rolagem — o pôster oficial se monta caco por caco,
Lucia e Jason trocam de lugar conforme você desce, e o estado de Leonida
abre como um mapa de jogo de verdade.

---

## 🕹️ Controles

| Ação | Como |
| --- | --- |
| **Montar o pôster** | Role o hero devagar. Os 10 cacos oficiais se encaixam. |
| **Movimentar a dupla** | Continue rolando. Lucia domina, depois Jason responde. |
| **Navegar pelo mapa** | Arraste para mover, roda do mouse (ou pinça) para zoom, `+ − ⌖` para controlar. |
| **Marcar waypoint** | Escolha um ponto no mapa e clique em *Definir waypoint*. |
| **Ouvir a rádio** | Aperte play em qualquer estação — 100% sintetizada ao vivo no navegador. |
| **Estarrecer a polícia** | Clique 5× no logo do menu. Nível de procurado máximo. |
| **Cheat clássico** | Digite `HESOYAM` em qualquer lugar da página. |

---

## 🗺️ O Território

```
app/            → rotas, layout e o CSS que veste tudo
components/     → Hero (mosaico), Dupla (scroll), Mapa, Rádio, Mídia…
lib/data.ts     → locais de Leonida, estações, trailers — edite aqui
lib/audio.ts    → motor WebAudio (rádio + SFX, sem um único mp3)
lib/scroll.ts   → a engine de scroll → variável CSS --p
public/fonts/   → GTAArtDeco + RageItalic (as fontes oficiais)
```

## ⚙️ Debaixo do capô

- **Next.js 15** (App Router, TypeScript, prerender estático)
- **Scrollytelling sem bibliotecas**: progresso de scroll escrito como
  variável CSS `--p` direto no DOM — zero re-render por frame
- **Rádio generativa**: kick, hats, baixo, pads e plucks agendados via
  WebAudio com lookahead scheduler; 4 estações, 4 identidades
- **Mapa SVG desenhado à mão** com pan/zoom/pinça e marcadores que
  mantêm tamanho constante (contra-escala)
- **Artes e fontes oficiais** servidas pelo CDN da Rockstar / localmente
- `prefers-reduced-motion` respeitado — o site inteiro degrada com elegância

## 🔧 Colocar na rua

```bash
npm install     # abastece o carro
npm run dev     # liga o motor → http://localhost:3000
npm run build   # blindagem completa (build de produção)
npm run start   # sai do estacionamento
```

## 🚀 Publicar

Funciona direto na [Vercel](https://vercel.com) (importa o repo e pronto)
ou em qualquer host estático com o output do build.

---

## ⚠️ Aviso

Projeto conceito de fã, **sem afiliação** com Rockstar Games ou
Take-Two Interactive. Grand Theft Auto e todas as artes, marcas e
personagens pertencem aos seus detentores. É 18+ lá, é 18+ aqui.

**Leonida · 2026** — *o baralho está marcado, mas o scroll é seu.*
