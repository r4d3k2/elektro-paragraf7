// Odvozené pohledy na pokrok napříč kapitolami (Fáze 4): chyby, nejslabší podtémata, poslední výsledky.
import type { Kapitola } from "../data/kapitoly";
import type { ObsahKapitoly, Otazka, Podtema } from "../data/typy";
import { aktivniKapitoly, najdiKapitolu } from "./obsah";
import type { Ulozeno } from "./storage";

/** Chybně zodpovězené otázky (poslední odpověď „chyba“) po kapitolách; jen kapitoly, kde nějaké jsou. */
export function chybyPoKapitolach(
  stav: Ulozeno,
  idKapitoly?: string
): { kapitola: Kapitola; obsah: ObsahKapitoly; otazky: Otazka[] }[] {
  return aktivniKapitoly()
    .filter(({ kapitola }) => !idKapitoly || kapitola.id === idKapitoly)
    .map(({ kapitola, obsah }) => ({
      kapitola,
      obsah,
      otazky: obsah.otazky.filter((o) => stav.otazky[o.id]?.posledni === "chyba")
    }))
    .filter((k) => k.otazky.length > 0);
}

export function pocetChyb(stav: Ulozeno): number {
  return chybyPoKapitolach(stav).reduce((s, k) => s + k.otazky.length, 0);
}

export interface SlabePodtema {
  kapitola: Kapitola;
  podtema: Podtema;
  /** Podíl správných odpovědí ze všech pokusů v podtématu (0–1). */
  uspesnost: number;
  pokusy: number;
  /** Otázky podtématu s poslední odpovědí „chyba“. */
  chyby: number;
  zvladnuto: number;
  otazek: number;
}

/**
 * Nejslabší podtémata: jen ta, kde už padla aspoň jedna odpověď a úspěšnost je pod 100 %.
 * Řadí se podle úspěšnosti (podíl správných ze všech pokusů), při shodě podle počtu
 * aktuálních chyb a pak podle pořadí v kapitolách.
 */
export function nejslabsiPodtemata(stav: Ulozeno, pocet = 3): SlabePodtema[] {
  const vsechna: SlabePodtema[] = [];
  for (const { kapitola, obsah } of aktivniKapitoly()) {
    for (const podtema of obsah.podtemata) {
      const otazky = obsah.otazky.filter((o) => o.podtema === podtema.id);
      let pokusy = 0;
      let spravne = 0;
      let chyby = 0;
      let zvladnuto = 0;
      for (const o of otazky) {
        const z = stav.otazky[o.id];
        if (!z) continue;
        pokusy += z.pokusy;
        spravne += z.spravne;
        if (z.posledni === "chyba") chyby++;
        else zvladnuto++;
      }
      if (pokusy === 0 || spravne >= pokusy) continue;
      vsechna.push({ kapitola, podtema, uspesnost: spravne / pokusy, pokusy, chyby, zvladnuto, otazek: otazky.length });
    }
  }
  // Stabilní řazení zachová pořadí kapitol a podtémat při úplné shodě.
  return vsechna.sort((a, b) => a.uspesnost - b.uspesnost || b.chyby - a.chyby).slice(0, pocet);
}

export interface PosledniVysledek {
  druh: "test" | "zkouska";
  kdy: string;
  skore: number;
  celkem: number;
  /** Kapitola u testu kapitoly. */
  kapitola?: Kapitola;
  neoverene?: boolean;
}

/** Poslední testy kapitol a zkoušky nanečisto dohromady, od nejnovějšího. */
export function posledniVysledky(stav: Ulozeno, pocet = 8): PosledniVysledek[] {
  const testy: PosledniVysledek[] = Object.entries(stav.testy).flatMap(([id, seznam]) => {
    const kapitola = najdiKapitolu(id);
    return kapitola ? seznam.map((t) => ({ druh: "test" as const, kdy: t.kdy, skore: t.skore, celkem: t.celkem, kapitola })) : [];
  });
  const zkousky: PosledniVysledek[] = stav.zkousky.map((z) => ({
    druh: "zkouska",
    kdy: z.kdy,
    skore: z.skore,
    celkem: z.celkem,
    neoverene: z.neoverene
  }));
  return [...testy, ...zkousky].sort((a, b) => (a.kdy < b.kdy ? 1 : a.kdy > b.kdy ? -1 : 0)).slice(0, pocet);
}
