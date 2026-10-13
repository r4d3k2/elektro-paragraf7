// Generátor ikon aplikace (PWA a apple-touch-icon) z motivu public/favicon.svg: modrý čtverec
// a žlutý blesk. Bez knihoven: tvary vykreslí s vyhlazením (16 vzorků na pixel) a zapíše PNG
// přes node:zlib. Spouští se ručně (npm run ikony), výsledné soubory jsou v public/ v repu.
//
// Soubor je .mjs, aby ho nekontroloval tsc (projekt nemá typy pro Node).
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const MODRA = [0x1f, 0x4e, 0x79];
const ZLUTA = [0xf2, 0xc2, 0x00];

// Blesk z favicon.svg (souřadnice ve čtverci 64 × 64): M36 8 18 36h12l-4 20 20-30H34z
const BLESK = [
  [36, 8],
  [18, 36],
  [30, 36],
  [26, 56],
  [46, 26],
  [34, 26]
];

function vMnohouhelniku(x, y, body) {
  let uvnitr = false;
  for (let i = 0, j = body.length - 1; i < body.length; j = i++) {
    const [xi, yi] = body[i];
    const [xj, yj] = body[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) uvnitr = !uvnitr;
  }
  return uvnitr;
}

function vZaoblenemCtverci(x, y, polomer) {
  const cx = Math.min(Math.max(x, polomer), 64 - polomer);
  const cy = Math.min(Math.max(y, polomer), 64 - polomer);
  return (x - cx) ** 2 + (y - cy) ** 2 <= polomer ** 2;
}

/**
 * Vykreslí ikonu do RGBA.
 * polomer: zaoblení rohů ve čtverci 64 (0 = čtverec do krajů, průhledné rohy jinak).
 * meritko: velikost blesku vůči favicon.svg (kolem středu 32, 32).
 */
function vykresli(velikost, { polomer, meritko }) {
  const data = Buffer.alloc(velikost * velikost * 4);
  const VZORKY = 4;
  const blesk = BLESK.map(([x, y]) => [32 + (x - 32) * meritko, 32 + (y - 32) * meritko]);
  for (let py = 0; py < velikost; py++) {
    for (let px = 0; px < velikost; px++) {
      let pozadi = 0;
      let znak = 0;
      for (let sy = 0; sy < VZORKY; sy++) {
        for (let sx = 0; sx < VZORKY; sx++) {
          const x = ((px + (sx + 0.5) / VZORKY) / velikost) * 64;
          const y = ((py + (sy + 0.5) / VZORKY) / velikost) * 64;
          if (polomer === 0 || vZaoblenemCtverci(x, y, polomer)) {
            pozadi++;
            if (vMnohouhelniku(x, y, blesk)) znak++;
          }
        }
      }
      const n = VZORKY * VZORKY;
      const podilZnaku = pozadi > 0 ? znak / pozadi : 0;
      const i = (py * velikost + px) * 4;
      for (let k = 0; k < 3; k++) {
        data[i + k] = Math.round(MODRA[k] * (1 - podilZnaku) + ZLUTA[k] * podilZnaku);
      }
      data[i + 3] = Math.round((pozadi / n) * 255);
    }
  }
  return data;
}

// ─── PNG ────────────────────────────────────────────────────────────────

const CRC_TABULKA = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABULKA[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function blok(typ, obsah) {
  const delka = Buffer.alloc(4);
  delka.writeUInt32BE(obsah.length);
  const typObsah = Buffer.concat([Buffer.from(typ, "ascii"), obsah]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typObsah));
  return Buffer.concat([delka, typObsah, crc]);
}

function png(velikost, rgba) {
  const hlavicka = Buffer.alloc(13);
  hlavicka.writeUInt32BE(velikost, 0);
  hlavicka.writeUInt32BE(velikost, 4);
  hlavicka[8] = 8; // bitů na kanál
  hlavicka[9] = 6; // RGBA
  const radky = Buffer.alloc(velikost * (velikost * 4 + 1));
  for (let y = 0; y < velikost; y++) {
    radky[y * (velikost * 4 + 1)] = 0; // bez filtru
    rgba.copy(radky, y * (velikost * 4 + 1) + 1, y * velikost * 4, (y + 1) * velikost * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    blok("IHDR", hlavicka),
    blok("IDAT", deflateSync(radky, { level: 9 })),
    blok("IEND", Buffer.alloc(0))
  ]);
}

// ─── Výstup ─────────────────────────────────────────────────────────────

const IKONY = [
  // Běžné ikony: stejné jako favicon, se zaoblenými rohy.
  { soubor: "public/pwa-192x192.png", velikost: 192, polomer: 14, meritko: 1 },
  { soubor: "public/pwa-512x512.png", velikost: 512, polomer: 14, meritko: 1 },
  // Maskovatelná ikona (Android): pozadí do krajů, blesk zmenšený do bezpečné zóny (kruh 80 %).
  { soubor: "public/pwa-maskable-512x512.png", velikost: 512, polomer: 0, meritko: 0.8 },
  // iOS si rohy zaoblí samo: pozadí do krajů, bez průhlednosti.
  { soubor: "public/apple-touch-icon.png", velikost: 180, polomer: 0, meritko: 0.9 }
];

for (const { soubor, velikost, polomer, meritko } of IKONY) {
  writeFileSync(soubor, png(velikost, vykresli(velikost, { polomer, meritko })));
  console.log(`  ${soubor} (${velikost} × ${velikost})`);
}
