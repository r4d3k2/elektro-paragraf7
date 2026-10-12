// Pomocné funkce nad bází faktů.
import { FAKTA, type Fakt } from "../data/fakta";
import type { LekceKarta, Otazka } from "../data/typy";

const PODLE_ID = new Map<string, Fakt>(FAKTA.map((f) => [f.id, f]));

export function najdiFakt(id: string): Fakt | undefined {
  return PODLE_ID.get(id);
}

/** Opírá se obsah alespoň o jeden fakt se stavem „overit“? */
export function maOverit(fakta: readonly string[]): boolean {
  return fakta.some((id) => PODLE_ID.get(id)?.stav === "overit");
}

/**
 * Karta nauky, která s otázkou sdílí nejvíc faktů. Při shodě vyhraje karta
 * ze stejného podtématu, pak ta dřívější. Vrací i pořadí karty (od 1).
 */
export function nejblizsiKarta(lekce: readonly LekceKarta[], otazka: Otazka): { karta: LekceKarta; poradi: number } | undefined {
  let nejlepsi: { karta: LekceKarta; poradi: number; skore: number } | undefined;
  lekce.forEach((karta, i) => {
    const spolecne = karta.fakta.filter((f) => otazka.fakta.includes(f)).length;
    const skore = spolecne * 10 + (karta.podtema === otazka.podtema ? 1 : 0);
    if (skore > 0 && (!nejlepsi || skore > nejlepsi.skore)) {
      nejlepsi = { karta, poradi: i + 1, skore };
    }
  });
  return nejlepsi ? { karta: nejlepsi.karta, poradi: nejlepsi.poradi } : undefined;
}

export const POCET_FAKTU = {
  celkem: FAKTA.length,
  overeno: FAKTA.filter((f) => f.stav === "overeno").length,
  overit: FAKTA.filter((f) => f.stav === "overit").length
};
