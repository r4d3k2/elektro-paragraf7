// Validátor obsahu – spouští se před každým sestavením (npm run validate, prebuild).
// Pravidla odpovídají docs/elektro-par7-spec.md, sekce 5. Při chybě vypíše soubor, id
// a pravidlo a skončí kódem 1. Validátor se nesmí upravovat tak, aby propustil chybná data.

import { FAKTA, ZDROJE_ZNENI } from "../src/data/fakta";
import { KAPITOLY, type KapitolaId } from "../src/data/kapitoly";
import { AKTUALNI_FAZE } from "../src/data/faze";
import { ILUSTRACE, type ObsahKapitoly } from "../src/data/typy";
import { OBSAH } from "../src/data/obsah/index";

// Bez @types/node: z prostředí Node potřebujeme jen process.exit.
const proces = (globalThis as unknown as { process: { exit(kod: number): never } }).process;

const MINIMA: Record<KapitolaId, { karty: number; otazky: number }> = {
  "k1-legislativa": { karty: 6, otazky: 16 },
  "k2-vtz-revize": { karty: 6, otazky: 16 },
  "k3-organizace": { karty: 5, otazky: 14 },
  "k4-bezpecna-prace": { karty: 6, otazky: 16 },
  "k5-prvni-pomoc": { karty: 4, otazky: 10 },
  "k6-ochrana": { karty: 6, otazky: 16 },
  "k7-site-vodice": { karty: 5, otazky: 14 },
  "k8-prostory": { karty: 4, otazky: 10 },
  "k9-revize-mereni": { karty: 5, otazky: 14 }
};

const MIN_PODIL_OBTIZNOST_3 = 0.25;
const MAX_PODIL_PISMENA = 0.4;
const MIN_DELKA_VYSVETLENI = 30;
const ZAKAZANE_FRAZE = ["všechny uvedené", "žádná z uvedených", "všechny výše"];
const PISMENA = ["a", "b", "c", "d"] as const;

interface Chyba {
  soubor: string;
  id: string;
  pravidlo: string;
  zprava: string;
}

const chyby: Chyba[] = [];
const upozorneni: string[] = [];

function chyba(soubor: string, id: string, pravidlo: string, zprava: string): void {
  chyby.push({ soubor, id, pravidlo, zprava });
}

const SOUBOR_FAKTA = "src/data/fakta.ts";
const SOUBOR_KAPITOLY = "src/data/kapitoly.ts";
const souborObsahu = (klic: string) => `src/data/obsah/${klic}.ts`;

/** Pro porovnání zadání: malá písmena, bez interpunkce, jednotné mezery. */
function normalizuj(text: string): string {
  return text
    .toLocaleLowerCase("cs")
    .replace(/[\p{P}\p{S}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Český tvar podle počtu: 1 možnost, 2–4 možnosti, 0 a 5+ možností. */
function tvar(n: number, jeden: string, dvaAzCtyri: string, pet: string): string {
  if (n === 1) return `${n} ${jeden}`;
  if (n >= 2 && n <= 4) return `${n} ${dvaAzCtyri}`;
  return `${n} ${pet}`;
}

function prazdny(text: string | undefined): boolean {
  return text === undefined || text.trim().length === 0;
}

function pocetSlov(text: string): number {
  return text
    .replace(/\*\*/g, "")
    .split(/\s+/)
    .filter((slovo) => /[\p{L}\p{N}]/u.test(slovo)).length;
}

// ─── Pravidlo 1 a 2: fakta ─────────────────────────────────────────────
const idKapitol = new Set<string>(KAPITOLY.map((k) => k.id));
const faktaPodleId = new Map<string, (typeof FAKTA)[number]>();

for (const fakt of FAKTA) {
  if (faktaPodleId.has(fakt.id)) {
    chyba(SOUBOR_FAKTA, fakt.id, "1 unikátní id", "id faktu se opakuje");
  }
  faktaPodleId.set(fakt.id, fakt);
  if (!idKapitol.has(fakt.kapitola)) {
    chyba(SOUBOR_FAKTA, fakt.id, "2 kapitoly", `kapitola „${fakt.kapitola}“ není v KAPITOLY`);
  }
}

// ─── Pravidlo 2: obsah existuje právě pro aktivní kapitoly ─────────────
const aktivni = KAPITOLY.filter((k) => k.faze <= AKTUALNI_FAZE);
const obsahy = Object.entries(OBSAH) as [string, ObsahKapitoly | undefined][];

for (const [klic, obsah] of obsahy) {
  if (!obsah) continue;
  const kapitola = KAPITOLY.find((k) => k.id === klic);
  if (!kapitola) {
    chyba(souborObsahu(klic), klic, "2 kapitoly", "obsah patří kapitole, která není v KAPITOLY");
    continue;
  }
  if (obsah.kapitola !== klic) {
    chyba(souborObsahu(klic), klic, "2 kapitoly", `obsah má kapitola „${obsah.kapitola}“, v registru je pod „${klic}“`);
  }
  if (kapitola.faze > AKTUALNI_FAZE) {
    chyba(
      souborObsahu(klic),
      klic,
      "2 kapitoly",
      `kapitola je z fáze ${kapitola.faze}, ale AKTUALNI_FAZE je ${AKTUALNI_FAZE} – neaktivní kapitola nesmí mít obsah`
    );
  }
}

for (const kapitola of aktivni) {
  if (!OBSAH[kapitola.id]) {
    chyba(
      souborObsahu(kapitola.id),
      kapitola.id,
      "2 kapitoly",
      "aktivní kapitola nemá obsah (chybí soubor nebo záznam v src/data/obsah/index.ts)"
    );
  }
}

// ─── Pravidla 1, 3–10 a 12 pro každý obsah ─────────────────────────────
const idKaret = new Set<string>();
const idOtazek = new Set<string>();
const zadaniVsechna = new Map<string, string>();

interface Statistika {
  kapitola: string;
  karty: number;
  otazky: number;
  obtiznost: [number, number, number];
  kartyOverit: number;
  otazkyOverit: number;
}
const statistiky: Statistika[] = [];

function zkontrolujFakta(soubor: string, id: string, fakta: string[]): void {
  if (fakta.length === 0) {
    chyba(soubor, id, "3 fakta", "nemá žádný odkaz na fakt");
  }
  for (const f of fakta) {
    if (!faktaPodleId.has(f)) {
      chyba(soubor, id, "3 fakta", `odkaz na neexistující fakt „${f}“`);
    }
  }
}

function opiraSeOOverit(fakta: string[]): boolean {
  return fakta.some((f) => faktaPodleId.get(f)?.stav === "overit");
}

function zkontrolujIlustraci(soubor: string, id: string, ilustrace: string | undefined): void {
  if (ilustrace !== undefined && !(ILUSTRACE as readonly string[]).includes(ilustrace)) {
    chyba(soubor, id, "8 ilustrace", `ilustrace „${ilustrace}“ není v seznamu ILUSTRACE`);
  }
}

for (const [klic, obsah] of obsahy) {
  if (!obsah) continue;
  const soubor = souborObsahu(klic);
  const idPodtemat = new Set<string>();

  for (const podtema of obsah.podtemata) {
    if (idPodtemat.has(podtema.id)) {
      chyba(soubor, podtema.id, "1 unikátní id", "id podtématu se v kapitole opakuje");
    }
    idPodtemat.add(podtema.id);
    if (prazdny(podtema.nazev)) {
      chyba(soubor, podtema.id, "7 podtémata", "podtéma nemá název");
    }
  }

  const podtemataSKartou = new Set<string>();
  const podtemataSOtazkou = new Set<string>();
  let kartyOverit = 0;

  for (const karta of obsah.lekce) {
    if (idKaret.has(karta.id)) {
      chyba(soubor, karta.id, "1 unikátní id", "id karty se opakuje");
    }
    idKaret.add(karta.id);
    zkontrolujFakta(soubor, karta.id, karta.fakta);
    zkontrolujIlustraci(soubor, karta.id, karta.ilustrace);
    if (!idPodtemat.has(karta.podtema)) {
      chyba(soubor, karta.id, "7 podtémata", `podtéma „${karta.podtema}“ v kapitole neexistuje`);
    }
    podtemataSKartou.add(karta.podtema);
    if (prazdny(karta.nadpis) || prazdny(karta.text)) {
      chyba(soubor, karta.id, "7 podtémata", "karta nemá nadpis nebo text");
    }
    const slova = pocetSlov(karta.text);
    if (slova < 60 || slova > 160) {
      upozorneni.push(`${soubor} · ${karta.id}: text karty má ${slova} slov (doporučeno 60–160)`);
    }
    if (opiraSeOOverit(karta.fakta)) kartyOverit++;
  }

  const obtiznost: [number, number, number] = [0, 0, 0];
  const spravnaPismena: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
  let otazekVyber = 0;
  let otazkyOverit = 0;

  for (const otazka of obsah.otazky) {
    const id = otazka.id;
    if (idOtazek.has(id)) {
      chyba(soubor, id, "1 unikátní id", "id otázky se opakuje");
    }
    idOtazek.add(id);

    if (otazka.kapitola !== obsah.kapitola) {
      chyba(soubor, id, "2 kapitoly", `otázka má kapitola „${otazka.kapitola}“, obsah patří „${obsah.kapitola}“`);
    }
    if (!idKapitol.has(otazka.kapitola)) {
      chyba(soubor, id, "2 kapitoly", `kapitola „${otazka.kapitola}“ není v KAPITOLY`);
    }

    zkontrolujFakta(soubor, id, otazka.fakta);
    zkontrolujIlustraci(soubor, id, otazka.ilustrace);

    if (!idPodtemat.has(otazka.podtema)) {
      chyba(soubor, id, "7 podtémata", `podtéma „${otazka.podtema}“ v kapitole neexistuje`);
    }
    podtemataSOtazkou.add(otazka.podtema);

    if (prazdny(otazka.zadani)) chyba(soubor, id, "6 zadání a shrnutí", "prázdné zadání");
    if (prazdny(otazka.shrnuti)) chyba(soubor, id, "6 zadání a shrnutí", "prázdné shrnutí");
    const klicZadani = normalizuj(otazka.zadani);
    const dalsi = zadaniVsechna.get(klicZadani);
    if (dalsi) {
      chyba(soubor, id, "6 zadání a shrnutí", `zadání je stejné jako u otázky ${dalsi}`);
    } else {
      zadaniVsechna.set(klicZadani, id);
    }

    if (otazka.obtiznost !== 1 && otazka.obtiznost !== 2 && otazka.obtiznost !== 3) {
      chyba(soubor, id, "12 minimální počty", `neplatná obtížnost ${String(otazka.obtiznost)}`);
    } else {
      obtiznost[otazka.obtiznost - 1]++;
    }
    if (opiraSeOOverit(otazka.fakta)) otazkyOverit++;

    if (otazka.typ === "vyber") {
      otazekVyber++;
      const m = otazka.moznosti;
      if (m.length < 3 || m.length > 4) {
        chyba(soubor, id, "4 možnosti", `má ${tvar(m.length, "možnost", "možnosti", "možností")}, povoleno je 3–4`);
      }
      const spravne = m.filter((x) => x.spravna);
      if (spravne.length !== 1) {
        chyba(soubor, id, "4 možnosti", `má ${tvar(spravne.length, "správnou možnost", "správné možnosti", "správných možností")}, musí být právě jedna`);
      } else {
        spravnaPismena[spravne[0].id] = (spravnaPismena[spravne[0].id] ?? 0) + 1;
      }
      const texty = new Set<string>();
      m.forEach((moznost, i) => {
        if (moznost.id !== PISMENA[i]) {
          chyba(soubor, id, "4 možnosti", `možnost č. ${i + 1} má id „${moznost.id}“, očekává se „${PISMENA[i] ?? "?"}“`);
        }
        if (prazdny(moznost.text)) {
          chyba(soubor, id, "4 možnosti", `možnost ${moznost.id} má prázdný text`);
        }
        if ((moznost.vysvetleni ?? "").trim().length < MIN_DELKA_VYSVETLENI) {
          chyba(
            soubor,
            id,
            "4 možnosti",
            `vysvětlení možnosti ${moznost.id} má méně než ${MIN_DELKA_VYSVETLENI} znaků`
          );
        }
        const klicTextu = normalizuj(moznost.text);
        if (texty.has(klicTextu)) {
          chyba(soubor, id, "4 možnosti", `text možnosti ${moznost.id} se v otázce opakuje`);
        }
        texty.add(klicTextu);
        const maly = moznost.text.toLocaleLowerCase("cs");
        for (const fraze of ZAKAZANE_FRAZE) {
          if (maly.includes(fraze)) {
            chyba(soubor, id, "9 zakázané fráze", `možnost ${moznost.id} obsahuje „${fraze}“`);
          }
        }
      });
    } else if (otazka.typ === "poradi") {
      const polozky = otazka.polozky;
      if (polozky.length < 4 || polozky.length > 7) {
        chyba(soubor, id, "5 pořadí", `má ${tvar(polozky.length, "položku", "položky", "položek")}, povoleno je 4–7`);
      }
      const idPolozek = polozky.map((p) => p.id);
      const mnozina = new Set(idPolozek);
      if (mnozina.size !== idPolozek.length) {
        chyba(soubor, id, "5 pořadí", "id položek se opakují");
      }
      const permutace =
        otazka.spravnePoradi.length === idPolozek.length &&
        new Set(otazka.spravnePoradi).size === otazka.spravnePoradi.length &&
        otazka.spravnePoradi.every((p) => mnozina.has(p));
      if (!permutace) {
        chyba(soubor, id, "5 pořadí", "spravnePoradi není permutací id položek");
      } else if (idPolozek.every((p, i) => p === otazka.spravnePoradi[i])) {
        chyba(soubor, id, "5 pořadí", "položky jsou v datech už ve správném pořadí – musí být zamíchané");
      }
      if (polozky.some((p) => prazdny(p.text))) {
        chyba(soubor, id, "5 pořadí", "některá položka má prázdný text");
      }
      if (prazdny(otazka.vysvetleniPoradi)) {
        chyba(soubor, id, "5 pořadí", "chybí vysvetleniPoradi");
      }
    } else {
      chyba(soubor, id, "4 možnosti", "neznámý typ otázky");
    }
  }

  for (const podtema of obsah.podtemata) {
    if (!podtemataSKartou.has(podtema.id)) {
      chyba(soubor, podtema.id, "7 podtémata", "podtéma nemá žádnou kartu nauky");
    }
    if (!podtemataSOtazkou.has(podtema.id)) {
      chyba(soubor, podtema.id, "7 podtémata", "podtéma nemá žádnou otázku");
    }
  }

  // Pravidlo 10: vyváženost písmen správných odpovědí.
  if (otazekVyber > 0) {
    for (const pismeno of PISMENA) {
      const podil = spravnaPismena[pismeno] / otazekVyber;
      if (podil > MAX_PODIL_PISMENA) {
        chyba(
          soubor,
          klic,
          "10 vyváženost",
          `písmeno ${pismeno} je správné u ${spravnaPismena[pismeno]} z ${otazekVyber} otázek (${Math.round(
            podil * 100
          )} %), povoleno je nejvýše ${MAX_PODIL_PISMENA * 100} %`
        );
      }
    }
  }

  // Pravidlo 12: minimální počty a podíl obtížnosti 3 (jen aktivní kapitoly).
  const kapitola = KAPITOLY.find((k) => k.id === klic);
  if (kapitola && kapitola.faze <= AKTUALNI_FAZE) {
    const min = MINIMA[kapitola.id];
    if (obsah.lekce.length < min.karty) {
      chyba(soubor, klic, "12 minimální počty", `má ${tvar(obsah.lekce.length, "kartu", "karty", "karet")}, minimum je ${min.karty}`);
    }
    if (obsah.otazky.length < min.otazky) {
      chyba(soubor, klic, "12 minimální počty", `má ${tvar(obsah.otazky.length, "otázku", "otázky", "otázek")}, minimum je ${min.otazky}`);
    }
    const podil3 = obsah.otazky.length > 0 ? obtiznost[2] / obsah.otazky.length : 0;
    if (podil3 < MIN_PODIL_OBTIZNOST_3) {
      chyba(
        soubor,
        klic,
        "12 minimální počty",
        `otázek obtížnosti 3 je ${obtiznost[2]} z ${obsah.otazky.length} (${Math.round(podil3 * 100)} %), minimum je 25 %`
      );
    }
  }

  statistiky.push({
    kapitola: klic,
    karty: obsah.lekce.length,
    otazky: obsah.otazky.length,
    obtiznost,
    kartyOverit,
    otazkyOverit
  });
}

// ─── Pravidlo 11: kódování ─────────────────────────────────────────────
function projdiTexty(hodnota: unknown, cesta: string, soubor: string): void {
  if (typeof hodnota === "string") {
    if (hodnota.includes("�")) {
      chyba(soubor, cesta, "11 kódování", "text obsahuje náhradní znak U+FFFD – rozbité kódování");
    }
    if (hodnota.includes("\\u00")) {
      chyba(soubor, cesta, "11 kódování", "text obsahuje sekvenci \\u00 – dvojitě escapovaný znak");
    }
    return;
  }
  if (Array.isArray(hodnota)) {
    hodnota.forEach((polozka, i) => projdiTexty(polozka, `${cesta}[${i}]`, soubor));
    return;
  }
  if (hodnota !== null && typeof hodnota === "object") {
    const objekt = hodnota as Record<string, unknown>;
    // Fakta, karty a otázky mají id dost výmluvné; možnosti („a“–„d“) si nechají cestu i s id otázky.
    const popis = typeof objekt.id === "string" && objekt.id.length > 1 ? objekt.id : cesta;
    for (const [klic, v] of Object.entries(objekt)) {
      projdiTexty(v, `${popis}.${klic}`, soubor);
    }
  }
}

projdiTexty(FAKTA, "FAKTA", SOUBOR_FAKTA);
projdiTexty(ZDROJE_ZNENI, "ZDROJE_ZNENI", SOUBOR_FAKTA);
projdiTexty(KAPITOLY, "KAPITOLY", SOUBOR_KAPITOLY);
for (const [klic, obsah] of obsahy) {
  if (obsah) projdiTexty(obsah, klic, souborObsahu(klic));
}

// ─── Výstup ────────────────────────────────────────────────────────────
if (chyby.length > 0) {
  console.error(`\nValidátor obsahu: nalezeno chyb: ${chyby.length}\n`);
  for (const c of chyby) {
    console.error(`  ✗ ${c.soubor} · ${c.id} · pravidlo ${c.pravidlo}\n      ${c.zprava}`);
  }
  console.error("\nOpravte data (ne validátor) a spusťte build znovu.\n");
  proces.exit(1);
}

const radky: string[][] = [["Kapitola", "Karty", "Otázky", "Obt. 1/2/3", "Karty „overit“", "Otázky „overit“"]];
for (const s of statistiky) {
  radky.push([
    s.kapitola,
    String(s.karty),
    String(s.otazky),
    s.obtiznost.join(" / "),
    String(s.kartyOverit),
    String(s.otazkyOverit)
  ]);
}
const sirky = radky[0].map((_, i) => Math.max(...radky.map((r) => r[i].length)));
const formatuj = (r: string[]) => r.map((bunka, i) => (i === 0 ? bunka.padEnd(sirky[i]) : bunka.padStart(sirky[i]))).join("  ");

const overeno = FAKTA.filter((f) => f.stav === "overeno").length;
const overit = FAKTA.filter((f) => f.stav === "overit").length;

console.log(`\nValidátor obsahu: v pořádku (AKTUALNI_FAZE = ${AKTUALNI_FAZE})\n`);
console.log("  " + formatuj(radky[0]));
console.log("  " + sirky.map((s) => "─".repeat(s)).join("  "));
for (const r of radky.slice(1)) console.log("  " + formatuj(r));
console.log(`\n  Fakta: ${FAKTA.length} celkem · overeno ${overeno} · overit ${overit}`);
if (upozorneni.length > 0) {
  console.log(`\n  Upozornění (${upozorneni.length}):`);
  for (const u of upozorneni) console.log(`  ! ${u}`);
}
console.log("");
