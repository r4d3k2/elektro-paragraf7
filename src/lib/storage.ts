// Uložení pokroku do localStorage pod klíčem elektro7:v1.
// Každý přístup k úložišti je v try/catch: bez úložiště (anonymní režim, zakázaná data webu)
// aplikace funguje dál, jen si nic nepamatuje. Tvar dat se nemění bez migrace.

export const KLIC_ULOZISTE = "elektro7:v1";

export type Vzhled = "system" | "svetly" | "tmavy";

export interface ZaznamOtazky {
  pokusy: number;
  spravne: number;
  posledni: "ok" | "chyba";
  kdy: string;
}

export interface ZaznamTestu {
  kdy: string;
  skore: number;
  celkem: number;
}

export interface Ulozeno {
  verze: 1;
  otazky: Record<string, ZaznamOtazky>;
  prectene: string[];
  testy: Record<string, ZaznamTestu[]>;
  posledniMisto?: string;
  nastaveni: { vzhled: Vzhled };
}

export interface NactenyStav {
  stav: Ulozeno;
  /** false, když úložiště obsahuje data novější verze aplikace – ta se nesmí přepsat. */
  lzeUlozit: boolean;
}

export function vychoziStav(): Ulozeno {
  return { verze: 1, otazky: {}, prectene: [], testy: {}, nastaveni: { vzhled: "system" } };
}

function jeObjekt(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function jeCislo(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x) && x >= 0;
}

function jeVzhled(x: unknown): x is Vzhled {
  return x === "system" || x === "svetly" || x === "tmavy";
}

/**
 * Převede načtená data na aktuální tvar Ulozeno. Platné části zachová, poškozené zahodí.
 * Až přibude verze 2, doplní se sem převod z verze 1 (data uživatele se nesmí ztratit).
 */
export function migrate(raw: unknown): Ulozeno {
  const stav = vychoziStav();
  if (!jeObjekt(raw) || raw.verze !== 1) return stav;

  if (jeObjekt(raw.otazky)) {
    for (const [id, z] of Object.entries(raw.otazky)) {
      if (
        jeObjekt(z) &&
        jeCislo(z.pokusy) &&
        jeCislo(z.spravne) &&
        (z.posledni === "ok" || z.posledni === "chyba") &&
        typeof z.kdy === "string"
      ) {
        stav.otazky[id] = { pokusy: z.pokusy, spravne: z.spravne, posledni: z.posledni, kdy: z.kdy };
      }
    }
  }

  if (Array.isArray(raw.prectene)) {
    stav.prectene = [...new Set(raw.prectene.filter((x): x is string => typeof x === "string"))];
  }

  if (jeObjekt(raw.testy)) {
    for (const [kapitola, seznam] of Object.entries(raw.testy)) {
      if (!Array.isArray(seznam)) continue;
      const platne = seznam.filter(
        (t): t is ZaznamTestu => jeObjekt(t) && typeof t.kdy === "string" && jeCislo(t.skore) && jeCislo(t.celkem)
      );
      if (platne.length > 0) stav.testy[kapitola] = platne;
    }
  }

  if (typeof raw.posledniMisto === "string" && raw.posledniMisto.startsWith("#/")) {
    stav.posledniMisto = raw.posledniMisto;
  }

  if (jeObjekt(raw.nastaveni) && jeVzhled(raw.nastaveni.vzhled)) {
    stav.nastaveni.vzhled = raw.nastaveni.vzhled;
  }

  return stav;
}

export function nacti(): NactenyStav {
  try {
    const text = localStorage.getItem(KLIC_ULOZISTE);
    if (text === null) return { stav: vychoziStav(), lzeUlozit: true };
    const raw: unknown = JSON.parse(text);
    // Data z novější verze aplikace nepřepisujeme, jen je dočasně nepoužijeme.
    if (jeObjekt(raw) && typeof raw.verze === "number" && raw.verze > 1) {
      return { stav: vychoziStav(), lzeUlozit: false };
    }
    return { stav: migrate(raw), lzeUlozit: true };
  } catch {
    return { stav: vychoziStav(), lzeUlozit: true };
  }
}

export function uloz(stav: Ulozeno): boolean {
  try {
    localStorage.setItem(KLIC_ULOZISTE, JSON.stringify(stav));
    return true;
  } catch {
    return false;
  }
}

export function smaz(): void {
  try {
    localStorage.removeItem(KLIC_ULOZISTE);
  } catch {
    // úložiště není dostupné – není co mazat
  }
}

/** Ověří, že do localStorage jde zapisovat (v některých prohlížečích je v anonymním režimu vypnuté). */
export function ulozisteFunguje(): boolean {
  try {
    const klic = `${KLIC_ULOZISTE}:test`;
    localStorage.setItem(klic, "1");
    localStorage.removeItem(klic);
    return true;
  } catch {
    return false;
  }
}
