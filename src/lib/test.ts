// Test kapitoly (sekce 6 specifikace): výběr otázek a rozpracovaný test v úložišti relace.
// Rozpracovaný test se drží v sessionStorage, aby přežil obnovení stránky (např. když iPhone
// stránku na pozadí uvolní). Do trvalého pokroku se zapíše až dokončený test (progress.ts).
import type { KapitolaId } from "../data/kapitoly";
import type { ObsahKapitoly, Otazka } from "../data/typy";
import { jePlatnaOdpoved, type Odpoved } from "./odpovedi";
import { zamichej } from "./shuffle";

export const POCET_OTAZEK_TESTU = 10;
export const HRANICE_USPECHU = 0.8;

/** Otázky, ze kterých se test skládá: oba typy, „vyber“ i „poradi“. */
export function otazkyProTest(obsah: ObsahKapitoly): Otazka[] {
  return obsah.otazky;
}

/** Kolik otázek bude test mít (10, nebo všechny, je-li jich méně). */
export function delkaTestu(obsah: ObsahKapitoly): number {
  return Math.min(POCET_OTAZEK_TESTU, otazkyProTest(obsah).length);
}

/** Nejmenší počet správných odpovědí pro úspěch (80 %). */
export function minimumProUspech(celkem: number): number {
  return Math.ceil(celkem * HRANICE_USPECHU - 1e-9);
}

export function uspel(skore: number, celkem: number): boolean {
  return celkem > 0 && skore >= minimumProUspech(celkem);
}

/**
 * Vybere otázky testu: z každého podtématu aspoň jednu, zbytek náhodně.
 * Vrací je seřazené podle podtémat a uvnitř podtématu v pořadí z dat.
 */
export function vyberOtazky(
  obsah: ObsahKapitoly,
  pocet: number = POCET_OTAZEK_TESTU,
  nahoda: () => number = Math.random
): Otazka[] {
  const kandidati = otazkyProTest(obsah);
  const poradiPodtemat = new Map(obsah.podtemata.map((p, i) => [p.id, i]));
  const serad = (seznam: Otazka[]) =>
    [...seznam].sort((a, b) => (poradiPodtemat.get(a.podtema) ?? 0) - (poradiPodtemat.get(b.podtema) ?? 0));

  if (kandidati.length <= pocet) return serad(kandidati);

  const vybrane = new Set<string>();
  const podtemata = obsah.podtemata.map((p) => p.id).filter((id) => kandidati.some((o) => o.podtema === id));
  // Kdyby podtémat bylo víc než otázek testu, pokryje se náhodný výběr z nich.
  const pokryt = podtemata.length > pocet ? zamichej(podtemata, nahoda).slice(0, pocet) : podtemata;
  for (const podtema of pokryt) {
    const [prvni] = zamichej(
      kandidati.filter((o) => o.podtema === podtema),
      nahoda
    );
    if (prvni) vybrane.add(prvni.id);
  }
  for (const o of zamichej(
    kandidati.filter((o) => !vybrane.has(o.id)),
    nahoda
  )) {
    if (vybrane.size >= pocet) break;
    vybrane.add(o.id);
  }
  return serad(kandidati.filter((o) => vybrane.has(o.id)));
}

// ─── Rozpracovaný test (sessionStorage) ─────────────────────────────────

export interface RozpracovanyTest {
  ids: string[];
  odpovedi: Partial<Record<string, Odpoved>>;
  index: number;
}

const klic = (kapitola: KapitolaId) => `elektro7:test:${kapitola}`;

export function nactiRozpracovany(kapitola: KapitolaId, obsah: ObsahKapitoly): RozpracovanyTest | undefined {
  try {
    const text = sessionStorage.getItem(klic(kapitola));
    if (!text) return undefined;
    const raw: unknown = JSON.parse(text);
    if (typeof raw !== "object" || raw === null) return undefined;
    const { ids, odpovedi, index } = raw as Record<string, unknown>;
    const platne = new Map(otazkyProTest(obsah).map((o) => [o.id, o]));
    if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === "string" && platne.has(id))) {
      return undefined;
    }
    const cisteOdpovedi: Partial<Record<string, Odpoved>> = {};
    if (typeof odpovedi === "object" && odpovedi !== null) {
      for (const [id, v] of Object.entries(odpovedi)) {
        const otazka = platne.get(id);
        if (otazka && ids.includes(id) && jePlatnaOdpoved(otazka, v)) cisteOdpovedi[id] = v;
      }
    }
    const i = typeof index === "number" && Number.isInteger(index) ? Math.min(Math.max(index, 0), ids.length - 1) : 0;
    return { ids: ids as string[], odpovedi: cisteOdpovedi, index: i };
  } catch {
    return undefined;
  }
}

export function ulozRozpracovany(kapitola: KapitolaId, test: RozpracovanyTest): void {
  try {
    sessionStorage.setItem(klic(kapitola), JSON.stringify(test));
  } catch {
    // bez úložiště relace se test drží jen v paměti
  }
}

export function smazRozpracovany(kapitola: KapitolaId): void {
  try {
    sessionStorage.removeItem(klic(kapitola));
  } catch {
    // úložiště relace není dostupné – není co mazat
  }
}
