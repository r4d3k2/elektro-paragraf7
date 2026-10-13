// Zkouška nanečisto (Fáze 4, sekce 10 specifikace): výběr otázek a rozpracovaná zkouška.
// 20 otázek ze všech aktivních kapitol, poměrně podle počtu otázek (z každé kapitoly aspoň jedna),
// seřazené podle kapitol a podtémat. Standardně jen otázky bez faktů „overit“. Přednost mají
// otázky s horší úspěšností. Oba typy otázek („vyber“ i „poradi“).
//
// Rozpracovaná zkouška je v localStorage pod vlastním klíčem (mimo uložený pokrok), aby přežila
// i zavření aplikace na iPhonu. Do pokroku se zapíše až dokončená zkouška (progress.ts).
import type { KapitolaId } from "../data/kapitoly";
import type { Otazka } from "../data/typy";
import { maOverit } from "./fakta";
import { aktivniKapitoly, najdiOtazku } from "./obsah";
import { jePlatnaOdpoved, type Odpoved } from "./odpovedi";
import { uspesnost } from "./progress";
import { zamichej } from "./shuffle";
import type { Ulozeno } from "./storage";

export const POCET_OTAZEK_ZKOUSKY = 20;

/** Otázky, které do zkoušky mohou vstoupit, po kapitolách v pevném pořadí. */
export function kandidatiZkousky(neoverene: boolean): { kapitola: KapitolaId; otazky: Otazka[] }[] {
  return aktivniKapitoly()
    .map(({ kapitola, obsah }) => {
      const poradiPodtemat = new Map(obsah.podtemata.map((p, i) => [p.id, i]));
      const otazky = obsah.otazky
        .filter((o) => neoverene || !maOverit(o.fakta))
        // Podle podtémat; uvnitř podtématu zůstane pořadí z dat (sort je stabilní).
        .sort((a, b) => (poradiPodtemat.get(a.podtema) ?? 0) - (poradiPodtemat.get(b.podtema) ?? 0));
      return { kapitola: kapitola.id, otazky };
    })
    .filter((k) => k.otazky.length > 0);
}

/**
 * Rozdělí `celkem` míst mezi skupiny poměrně k jejich velikosti (metoda největších zbytků),
 * každé neprázdné skupině aspoň jedno místo a žádné víc, než má otázek.
 */
export function rozdelPomerne(velikosti: number[], celkem: number): number[] {
  const soucet = velikosti.reduce((a, b) => a + b, 0);
  if (soucet <= celkem) return [...velikosti];
  const kvoty = velikosti.map((n) => (celkem * n) / soucet);
  const pridel = velikosti.map((n, i) => (n > 0 ? Math.min(n, Math.max(1, Math.floor(kvoty[i]))) : 0));
  const zbytek = (i: number) => kvoty[i] - pridel[i];
  let pridelenych = pridel.reduce((a, b) => a + b, 0);

  while (pridelenych < celkem) {
    let nej = -1;
    for (let i = 0; i < pridel.length; i++) {
      if (pridel[i] < velikosti[i] && (nej < 0 || zbytek(i) > zbytek(nej))) nej = i;
    }
    if (nej < 0) break;
    pridel[nej]++;
    pridelenych++;
  }
  // Minimum jednoho místa mohlo součet přetáhnout – ubere se tam, kde je přidělení nejvíc nad kvótou.
  while (pridelenych > celkem) {
    let nej = -1;
    for (let i = 0; i < pridel.length; i++) {
      if (pridel[i] > 1 && (nej < 0 || zbytek(i) < zbytek(nej))) nej = i;
    }
    if (nej < 0) break;
    pridel[nej]--;
    pridelenych--;
  }
  return pridel;
}

/**
 * Vybere otázky zkoušky. Uvnitř kapitoly mají přednost otázky s nižší úspěšností,
 * při shodě ty, které byly naposledy zodpovězené špatně, a pak náhoda.
 * Výsledek je seřazený podle kapitol, podtémat a pořadí v datech.
 */
export function vyberOtazkyZkousky(
  stav: Ulozeno,
  neoverene: boolean,
  pocet: number = POCET_OTAZEK_ZKOUSKY,
  nahoda: () => number = Math.random
): Otazka[] {
  const skupiny = kandidatiZkousky(neoverene);
  const pocty = rozdelPomerne(
    skupiny.map((k) => k.otazky.length),
    pocet
  );
  const vybrane: Otazka[] = [];
  skupiny.forEach((skupina, i) => {
    const klic = (o: Otazka) => uspesnost(stav, o.id) - (stav.otazky[o.id]?.posledni === "chyba" ? 0.001 : 0);
    // Zamíchat a pak stabilně seřadit: při stejné úspěšnosti rozhodne náhoda.
    const poradi = zamichej(skupina.otazky, nahoda).sort((a, b) => klic(a) - klic(b));
    const zvolene = new Set(poradi.slice(0, pocty[i]).map((o) => o.id));
    vybrane.push(...skupina.otazky.filter((o) => zvolene.has(o.id)));
  });
  return vybrane;
}

// ─── Rozpracovaná zkouška (localStorage, vlastní klíč) ───────────────────

export interface RozpracovanaZkouska {
  ids: string[];
  odpovedi: Partial<Record<string, Odpoved>>;
  index: number;
  neoverene: boolean;
}

const KLIC = "elektro7:zkouska";

export function nactiRozpracovanou(): RozpracovanaZkouska | undefined {
  try {
    const text = localStorage.getItem(KLIC);
    if (!text) return undefined;
    const raw: unknown = JSON.parse(text);
    if (typeof raw !== "object" || raw === null) return undefined;
    const { ids, odpovedi, index, neoverene } = raw as Record<string, unknown>;
    if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === "string" && najdiOtazku(id))) {
      return undefined;
    }
    const cisteOdpovedi: Partial<Record<string, Odpoved>> = {};
    if (typeof odpovedi === "object" && odpovedi !== null) {
      for (const [id, v] of Object.entries(odpovedi)) {
        const otazka = najdiOtazku(id);
        if (otazka && ids.includes(id) && jePlatnaOdpoved(otazka, v)) cisteOdpovedi[id] = v;
      }
    }
    const i = typeof index === "number" && Number.isInteger(index) ? Math.min(Math.max(index, 0), ids.length - 1) : 0;
    return { ids: ids as string[], odpovedi: cisteOdpovedi, index: i, neoverene: neoverene === true };
  } catch {
    return undefined;
  }
}

export function ulozRozpracovanou(zkouska: RozpracovanaZkouska): void {
  try {
    localStorage.setItem(KLIC, JSON.stringify(zkouska));
  } catch {
    // bez úložiště se zkouška drží jen v paměti
  }
}

export function smazRozpracovanou(): void {
  try {
    localStorage.removeItem(KLIC);
  } catch {
    // úložiště není dostupné – není co mazat
  }
}
