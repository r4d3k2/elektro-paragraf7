// Stav pokroku v paměti + ukládání. Komponenty ho čtou hookem usePokrok().
import { useSyncExternalStore } from "react";
import type { Kapitola } from "../data/kapitoly";
import {
  KLIC_ULOZISTE,
  nacti,
  smaz,
  uloz,
  ulozisteFunguje,
  vychoziStav,
  type Ulozeno,
  type Vzhled
} from "./storage";

const nacteno = nacti();
let stav: Ulozeno = nacteno.stav;
let lzeUlozit = nacteno.lzeUlozit;
const posluchaci = new Set<() => void>();

/** Zda se pokrok skutečně ukládá (úložiště je dostupné a neobsahuje novější data). */
export const ukladaniDostupne = ulozisteFunguje() && lzeUlozit;

function oznam(): void {
  posluchaci.forEach((fn) => fn());
}

function zmen(uprava: (s: Ulozeno) => Ulozeno): void {
  const novy = uprava(stav);
  if (novy === stav) return;
  stav = novy;
  if (lzeUlozit) uloz(stav);
  oznam();
}

function prihlas(fn: () => void): () => void {
  posluchaci.add(fn);
  return () => posluchaci.delete(fn);
}

// Změny z jiné záložky se promítnou i sem.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key !== KLIC_ULOZISTE) return;
    const nove = nacti();
    stav = nove.stav;
    lzeUlozit = nove.lzeUlozit;
    oznam();
  });
}

export function usePokrok(): Ulozeno {
  return useSyncExternalStore(prihlas, () => stav, () => stav);
}

/** Aktuální stav bez přihlášení k odběru (pro jednorázové výpočty). */
export function aktualniPokrok(): Ulozeno {
  return stav;
}

export const pokrok = {
  zaznamenejOdpoved(idOtazky: string, spravne: boolean): void {
    zmen((s) => {
      const puvodni = s.otazky[idOtazky];
      return {
        ...s,
        otazky: {
          ...s.otazky,
          [idOtazky]: {
            pokusy: (puvodni?.pokusy ?? 0) + 1,
            spravne: (puvodni?.spravne ?? 0) + (spravne ? 1 : 0),
            posledni: spravne ? "ok" : "chyba",
            kdy: new Date().toISOString()
          }
        }
      };
    });
  },

  oznacPrectene(idKarty: string): void {
    zmen((s) => (s.prectene.includes(idKarty) ? s : { ...s, prectene: [...s.prectene, idKarty] }));
  },

  nastavPosledniMisto(hash: string): void {
    zmen((s) => (s.posledniMisto === hash ? s : { ...s, posledniMisto: hash }));
  },

  nastavVzhled(vzhled: Vzhled): void {
    zmen((s) => (s.nastaveni.vzhled === vzhled ? s : { ...s, nastaveni: { ...s.nastaveni, vzhled } }));
  },

  /** Smaže pokrok (odpovědi, přečtené karty, testy, poslední místo). Nastavení vzhledu zůstane. */
  smazPokrok(): void {
    const vzhled = stav.nastaveni.vzhled;
    smaz();
    lzeUlozit = true;
    zmen(() => ({ ...vychoziStav(), nastaveni: { vzhled } }));
  }
};

// ─── Odvozené hodnoty ───────────────────────────────────────────────────

export function pocetZvladnutych(s: Ulozeno, idOtazek: string[]): number {
  return idOtazek.filter((id) => s.otazky[id]?.posledni === "ok").length;
}

export function pocetPrectenych(s: Ulozeno, idKaret: string[]): number {
  return idKaret.filter((id) => s.prectene.includes(id)).length;
}

export function pocetChybnych(s: Ulozeno, idOtazek: string[]): number {
  return idOtazek.filter((id) => s.otazky[id]?.posledni === "chyba").length;
}

export function pocetNovych(s: Ulozeno, idOtazek: string[]): number {
  return idOtazek.filter((id) => !s.otazky[id]).length;
}

/** Nejlepší výsledek testu kapitoly jako podíl 0–1 (testy přibudou ve Fázi 2). */
export function nejlepsiTest(s: Ulozeno, kapitola: Kapitola["id"]): number {
  const testy = s.testy[kapitola] ?? [];
  return testy.reduce((max, t) => (t.celkem > 0 ? Math.max(max, t.skore / t.celkem) : max), 0);
}

/**
 * Hvězdičky kapitoly: jedna od 50 % zvládnutí, dvě od 80 %, tři při 100 %
 * a zároveň testu kapitoly alespoň 80 %.
 */
export function hvezdicky(podilZvladnuti: number, podilTestu: number): 0 | 1 | 2 | 3 {
  if (podilZvladnuti >= 1 && podilTestu >= 0.8) return 3;
  if (podilZvladnuti >= 0.8) return 2;
  if (podilZvladnuti >= 0.5) return 1;
  return 0;
}
