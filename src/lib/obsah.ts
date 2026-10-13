// Přístup ke kapitolám a jejich obsahu.
import { AKTUALNI_FAZE } from "../data/faze";
import { KAPITOLY, type Kapitola } from "../data/kapitoly";
import { OBSAH } from "../data/obsah/index";
import type { ObsahKapitoly, Otazka } from "../data/typy";
import { nejblizsiKarta } from "./fakta";
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

/** Aktivní kapitoly s obsahem, v pevném pořadí. */
export function aktivniKapitoly(): { kapitola: Kapitola; obsah: ObsahKapitoly }[] {
  return KAPITOLY.flatMap((kapitola) => {
    const obsah = obsahKapitoly(kapitola);
    return obsah ? [{ kapitola, obsah }] : [];
  });
}

const OTAZKY_PODLE_ID = new Map<string, Otazka>(aktivniKapitoly().flatMap(({ obsah }) => obsah.otazky.map((o) => [o.id, o])));

/** Otázka z kterékoli aktivní kapitoly. */
export function najdiOtazku(id: string): Otazka | undefined {
  return OTAZKY_PODLE_ID.get(id);
}

/** Kapitola a obsah, do kterých otázka patří (pro otázky napříč kapitolami). */
export function kapitolaOtazky(otazka: Otazka): { kapitola: Kapitola; obsah: ObsahKapitoly } | undefined {
  const kapitola = najdiKapitolu(otazka.kapitola);
  const obsah = kapitola ? obsahKapitoly(kapitola) : undefined;
  return kapitola && obsah ? { kapitola, obsah } : undefined;
}

/** „Kapitola 3 · Podtéma“ – popis otázky mimo její kapitolu (zkouška, chyby). */
export function popisOtazky(otazka: Otazka): string {
  const k = kapitolaOtazky(otazka);
  return k ? `Kapitola ${k.kapitola.cislo} · ${nazevPodtematu(k.obsah, otazka.podtema)}` : otazka.podtema;
}

/** Odkaz na kartu nauky, která s otázkou sdílí nejvíc faktů. */
export function odkazNaukyOtazky(otazka: Otazka): string | undefined {
  const k = kapitolaOtazky(otazka);
  const karta = k ? nejblizsiKarta(k.obsah.lekce, otazka) : undefined;
  return k && karta ? `#/k/${k.kapitola.id}/nauka/${karta.poradi}` : undefined;
}

/** Popis uloženého „posledního místa“ pro kartu Pokračovat; undefined, když už neplatí. */
export function popisMista(hash: string): { nadpis: string; popis: string } | undefined {
  const { cesta, dotaz } = rozeberHash(hash);
  if (cesta[0] === "zkouska") return { nadpis: "Zkouška nanečisto", popis: "20 otázek ze všech kapitol" };
  if (cesta[0] === "chyby") {
    const kapitola = dotaz.get("kapitola") ? najdiKapitolu(dotaz.get("kapitola") ?? "") : undefined;
    return {
      nadpis: "Opakování chyb",
      popis: kapitola ? `Chyby z kapitoly ${kapitola.cislo} · ${kapitola.nazev}` : "Chyby ze všech kapitol"
    };
  }
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
