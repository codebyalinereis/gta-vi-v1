import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grand Theft Auto VI — Bem-vindo a Leonida",
  description:
    "Vice City, EUA. Lucia e Jason sempre souberam que o baralho estava marcado contra eles. Explore o mapa de Leonida, conheça a dupla e sintonize as rádios — uma experiência de fã, cinematográfica e interativa.",
  openGraph: {
    title: "Grand Theft Auto VI — Bem-vindo a Leonida",
    description: "Experiência interativa de fã: mapa navegável, dupla em scroll cinematográfico e rádio ao vivo.",
    images: ["https://www.rockstargames.com/VI/_next/static/media/meta.0t8ty~nlmxq2s.jpg?6wC5t2qhtJZtllO-YhLc"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffd166'/%3E%3Cstop offset='.5' stop-color='%23ff3fb4'/%3E%3Cstop offset='1' stop-color='%23ff8a2a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='%23050208'/%3E%3Ctext x='32' y='46' font-family='Georgia,serif' font-style='italic' font-weight='900' font-size='34' text-anchor='middle' fill='url(%23g)'%3EVI%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
