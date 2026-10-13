// Přístup ke kapitolám a jejich obsahu.
import { AKTUALNI_FAZE } from "../data/faze";
import { KAPITOLY, type Kapitola } from "../data/kapitoly";
import { OBSAH } from "../data/obsah/index";
import type { ObsahKapitoly } from "../data/typy";
import { rozeberHash } from "./route";

export function jeAktivni(kapitola: Kapitola): boolean {
  return kapitola.faze <= AKTUALNI_FAZE;
}

export function najdiKapitolu(id: string): Kapitola | undefined {
  return KAPITOLY.find((k) => k.id === id);
}

export function obsahKapitoly(kapitola: Kapitola): ObsahKapitoly | undefined {
  return jeAktivni(kapitola) ? OBSAH[kapitola.id] : undefined;
}

export function nazevPodtematu(obsah: ObsahKapitoly, id: string): string {
  return obsah.podtemata.find((p) => p.id === id)?.nazev ?? id;
}

/** Popis uloženého „posledního místa“ pro kartu Pokračovat; undefined, když už neplatí. */
export function popisMista(hash: string): { nadpis: string; popis: string } | undefined {
  const { cesta, dotaz } = rozeberHash(hash);
  if (cesta[0] !== "k" || !cesta[1]) return undefined;
  const kapitola = najdiKapitolu(cesta[1]);
  if (!kapitola) return undefined;
  const obsah = obsahKapitoly(kapitola);
  if (!obsah) return undefined;
  const nadpis = `Kapitola ${kapitola.cislo} · ${kapitola.nazev}`;

  if (cesta[2] === "nauka") {
    const poradi = Number(cesta[3]);
    const karta = obsah.lekce[poradi - 1];
    if (!karta) return undefined;
    return { nadpis, popis: `Nauka ${poradi} / ${obsah.lekce.length}: ${karta.nadpis}` };
  }
  if (cesta[2] === "test") {
    return { nadpis, popis: "Test kapitoly" };
  }
  if (cesta[2] === "procvic") {
    const podtema = dotaz.get("podtema");
    return {
      nadpis,
      popis: `Procvičování${podtema ? ` · ${nazevPodtematu(obsah, podtema)}` : ""}`
    };
  }
  return { nadpis, popis: "Přehled kapitoly" };
}
