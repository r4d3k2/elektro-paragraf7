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
  type VysledekCasti,
  type Vzhled,
  type ZaznamOtazky,
  type ZaznamTestu,
  type ZaznamZkousky
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

function dalsiZaznam(puvodni: ZaznamOtazky | undefined, spravne: boolean, kdy: string): ZaznamOtazky {
  return {
    pokusy: (puvodni?.pokusy ?? 0) + 1,
    spravne: (puvodni?.spravne ?? 0) + (spravne ? 1 : 0),
    posledni: spravne ? "ok" : "chyba",
    kdy
  };
}

export const pokrok = {
  zaznamenejOdpoved(idOtazky: string, spravne: boolean): void {
    zmen((s) => ({
      ...s,
      otazky: { ...s.otazky, [idOtazky]: dalsiZaznam(s.otazky[idOtazky], spravne, new Date().toISOString()) }
    }));
  },

  /**
   * Uloží dokončený test kapitoly jedním zápisem: výsledek do „testy“ a každou odpověď
   * do statistiky otázek (chyby z testu se pak objeví v režimu Chyby).
   */
  dokonciTest(kapitola: Kapitola["id"], odpovedi: { idOtazky: string; spravne: boolean }[]): void {
    if (odpovedi.length === 0) return;
    const kdy = new Date().toISOString();
    zmen((s) => {
      const otazky = { ...s.otazky };
      for (const o of odpovedi) otazky[o.idOtazky] = dalsiZaznam(otazky[o.idOtazky], o.spravne, kdy);
      const zaznam: ZaznamTestu = { kdy, skore: odpovedi.filter((o) => o.spravne).length, celkem: odpovedi.length };
      return { ...s, otazky, testy: { ...s.testy, [kapitola]: [...(s.testy[kapitola] ?? []), zaznam] } };
    });
  },

  /**
   * Uloží dokončenou zkoušku nanečisto jedním zápisem: výsledek s rozpadem po kapitolách
   * do „zkousky“ a každou odpověď do statistiky otázek (chyby se pak objeví v Opakování chyb).
   */
  dokonciZkousku(
    odpovedi: { idOtazky: string; kapitola: Kapitola["id"]; spravne: boolean }[],
    neoverene: boolean
  ): ZaznamZkousky | undefined {
    if (odpovedi.length === 0) return undefined;
    const kdy = new Date().toISOString();
    const kapitoly: Record<string, VysledekCasti> = {};
    for (const o of odpovedi) {
      const k = kapitoly[o.kapitola] ?? { skore: 0, celkem: 0 };
      kapitoly[o.kapitola] = { skore: k.skore + (o.spravne ? 1 : 0), celkem: k.celkem + 1 };
    }
    const zaznam: ZaznamZkousky = {
      kdy,
      skore: odpovedi.filter((o) => o.spravne).length,
      celkem: odpovedi.length,
      neoverene,
      kapitoly
    };
    zmen((s) => {
      const otazky = { ...s.otazky };
      for (const o of odpovedi) otazky[o.idOtazky] = dalsiZaznam(otazky[o.idOtazky], o.spravne, kdy);
      return { ...s, otazky, zkousky: [...s.zkousky, zaznam] };
    });
    return zaznam;
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

  /** Smaže pokrok (odpovědi, přečtené karty, testy, zkoušky, poslední místo). Nastavení vzhledu zůstane. */
  smazPokrok(): void {
    const vzhled = stav.nastaveni.vzhled;
    smaz();
    lzeUlozit = true;
    zmen(() => ({ ...vychoziStav(), nastaveni: { vzhled } }));
  },

  /**
   * Nahradí pokrok daty ze zálohy (už převedenými přes migrate). Nastavení vzhledu
   * zůstane podle tohoto zařízení.
   */
  obnovZeZalohy(data: Ulozeno): void {
    const vzhled = stav.nastaveni.vzhled;
    lzeUlozit = true;
    zmen(() => ({ ...data, nastaveni: { vzhled } }));
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

/**
 * Úspěšnost otázky: podíl správných ze všech pokusů (0–1). Nezodpovězená otázka má 0,5,
 * stojí tedy mezi otázkami, které jdou hůř, a těmi, které jdou lépe.
 */
export function uspesnost(s: Ulozeno, idOtazky: string): number {
  const z = s.otazky[idOtazky];
  return z && z.pokusy > 0 ? z.spravne / z.pokusy : 0.5;
}

/** Nejlepší výsledek testu kapitoly jako podíl 0–1 (0, když test ještě neproběhl). */
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
