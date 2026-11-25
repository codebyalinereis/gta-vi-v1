/* Testa os cheats num browser real: HESOYAM + wanted level */
import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(3500); // loader abrir

/* --- cheat HESOYAM --- */
await p.keyboard.type("hesoyam", { delay: 80 });
await p.waitForTimeout(1500);
const sky = await p.$(".cheat-sky.is-on");
const toast = await p.$(".toast");
console.log("HESOYAM  → céu mudou:", !!sky, "| toast:", !!toast);
await p.screenshot({ path: "scripts/proof-hesoyam.png" });

/* volta ao normal */
await p.waitForTimeout(5500);

/* --- wanted: 5 cliques no logo --- */
await p.click("#navBrand");
await p.waitForTimeout(150);
await p.click("#navBrand");
await p.waitForTimeout(150);
await p.click("#navBrand");
await p.waitForTimeout(150);
await p.click("#navBrand");
await p.waitForTimeout(150);
await p.click("#navBrand");
await p.waitForTimeout(900);
const police = await p.$(".police.is-on");
const lit = await p.$$eval(".stars .lit", (els) => els.length).catch(() => 0);
console.log("WANTED   → polícia:", !!police, "| estrelas acesas:", lit);
await p.screenshot({ path: "scripts/proof-wanted.png" });

await b.close();
