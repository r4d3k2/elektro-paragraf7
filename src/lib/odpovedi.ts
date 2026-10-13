// Odpověď na otázku a její vyhodnocení pro oba typy otázek (sekce 3 a 4 specifikace).
// „vyber“: id zvolené možnosti; „poradi“: id položek v pořadí, jak je uživatel seřadil.
import type { Moznost, Otazka, OtazkaPoradi } from "../data/typy";

export type Odpoved = Moznost["id"] | string[];

export function jeSpravnaOdpoved(otazka: Otazka, odpoved: Odpoved | undefined): boolean {
  if (odpoved === undefined) return false;
  if (otazka.typ === "vyber") {
    return typeof odpoved === "string" && otazka.moznosti.some((m) => m.id === odpoved && m.spravna);
  }
  return (
    Array.isArray(odpoved) &&
    odpoved.length === otazka.spravnePoradi.length &&
    odpoved.every((id, i) => id === otazka.spravnePoradi[i])
  );
}

/** Je pořadí permutací položek otázky? */
export function jePermutace(otazka: OtazkaPoradi, hodnota: unknown): hodnota is string[] {
  const ids = otazka.polozky.map((p) => p.id);
  return (
    Array.isArray(hodnota) &&
    hodnota.length === ids.length &&
    new Set(hodnota).size === ids.length &&
    hodnota.every((x) => typeof x === "string" && ids.includes(x))
  );
}

/** Je hodnota (např. načtená z úložiště relace) platnou odpovědí na danou otázku? */
export function jePlatnaOdpoved(otazka: Otazka, hodnota: unknown): hodnota is Odpoved {
  if (otazka.typ === "vyber") return typeof hodnota === "string" && otazka.moznosti.some((m) => m.id === hodnota);
  return jePermutace(otazka, hodnota);
}

/** Kolik položek stojí na správném místě. */
export function pocetNaMiste(otazka: OtazkaPoradi, poradi: readonly string[]): number {
  return poradi.filter((id, i) => id === otazka.spravnePoradi[i]).length;
}
