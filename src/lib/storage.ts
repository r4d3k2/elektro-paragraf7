// Uložení pokroku do localStorage pod klíčem elektro7:v1.
// Každý přístup k úložišti je v try/catch: bez úložiště (anonymní režim, zakázaná data webu)
// aplikace funguje dál, jen si nic nepamatuje. Tvar dat se nemění bez migrace.
//
// Verze dat (pole „verze“; klíč úložiště zůstává elektro7:v1):
// 1 – Fáze 1–3: odpovědi, přečtené karty, testy kapitol, poslední místo, vzhled.
// 2 – Fáze 4: navíc historie zkoušek nanečisto („zkousky“). Převod z verze 1 je v migrate().

export const KLIC_ULOZISTE = "elektro7:v1";
export const VERZE_DAT = 2;

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

export interface VysledekCasti {
  skore: number;
  celkem: number;
}

export interface ZaznamZkousky {
  kdy: string;
  skore: number;
  celkem: number;
  /** Zahrnovala zkouška i otázky opřené o fakta „overit“? */
  neoverene: boolean;
  /** Výsledek po kapitolách (klíč je id kapitoly). */
  kapitoly: Record<string, VysledekCasti>;
}

export interface Ulozeno {
  verze: 2;
  otazky: Record<string, ZaznamOtazky>;
  prectene: string[];
  testy: Record<string, ZaznamTestu[]>;
  zkousky: ZaznamZkousky[];
  posledniMisto?: string;
  nastaveni: { vzhled: Vzhled };
}

export interface NactenyStav {
  stav: Ulozeno;
  /** false, když úložiště obsahuje data novější verze aplikace – ta se nesmí přepsat. */
  lzeUlozit: boolean;
}

export function vychoziStav(): Ulozeno {
  return { verze: 2, otazky: {}, prectene: [], testy: {}, zkousky: [], nastaveni: { vzhled: "system" } };
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

function jeVysledek(x: unknown): x is VysledekCasti {
  return jeObjekt(x) && jeCislo(x.skore) && jeCislo(x.celkem);
}

/** Části společné verzím 1 a 2. Platné záznamy zachová, poškozené zahodí. */
function nactiSpolecne(raw: Record<string, unknown>, stav: Ulozeno): void {
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
      const platne = seznam
        .filter((t): t is ZaznamTestu => jeObjekt(t) && typeof t.kdy === "string" && jeCislo(t.skore) && jeCislo(t.celkem))
        .map((t) => ({ kdy: t.kdy, skore: t.skore, celkem: t.celkem }));
      if (platne.length > 0) stav.testy[kapitola] = platne;
    }
  }

  if (typeof raw.posledniMisto === "string" && raw.posledniMisto.startsWith("#/")) {
    stav.posledniMisto = raw.posledniMisto;
  }

  if (jeObjekt(raw.nastaveni) && jeVzhled(raw.nastaveni.vzhled)) {
    stav.nastaveni.vzhled = raw.nastaveni.vzhled;
  }
}

function nactiZkousky(raw: unknown): ZaznamZkousky[] {
  if (!Array.isArray(raw)) return [];
  const zkousky: ZaznamZkousky[] = [];
  for (const z of raw) {
    if (!jeObjekt(z) || typeof z.kdy !== "string" || !jeCislo(z.skore) || !jeCislo(z.celkem)) continue;
    const kapitoly: Record<string, VysledekCasti> = {};
    if (jeObjekt(z.kapitoly)) {
      for (const [id, v] of Object.entries(z.kapitoly)) {
        if (jeVysledek(v)) kapitoly[id] = { skore: v.skore, celkem: v.celkem };
      }
    }
    zkousky.push({ kdy: z.kdy, skore: z.skore, celkem: z.celkem, neoverene: z.neoverene === true, kapitoly });
  }
  return zkousky;
}

/**
 * Převede načtená data na aktuální tvar Ulozeno (verze 2). Platné části zachová, poškozené zahodí.
 * Verze 1 → 2: všechna data zůstanou, přibude prázdná historie zkoušek nanečisto.
 * Neznámá verze vrátí výchozí stav (novější verzi zachytí už nacti() a nepřepíše ji).
 */
export function migrate(raw: unknown): Ulozeno {
  const stav = vychoziStav();
  if (!jeObjekt(raw)) return stav;
  if (raw.verze === 1) {
    nactiSpolecne(raw, stav);
    return stav;
  }
  if (raw.verze === 2) {
    nactiSpolecne(raw, stav);
    stav.zkousky = nactiZkousky(raw.zkousky);
    return stav;
  }
  return stav;
}

/** Jsou to data z novější verze aplikace, než je tato? */
export function jeNovejsiVerze(raw: unknown): boolean {
  return jeObjekt(raw) && typeof raw.verze === "number" && raw.verze > VERZE_DAT;
}

export function nacti(): NactenyStav {
  try {
    const text = localStorage.getItem(KLIC_ULOZISTE);
    if (text === null) return { stav: vychoziStav(), lzeUlozit: true };
    const raw: unknown = JSON.parse(text);
    // Data z novější verze aplikace nepřepisujeme, jen je dočasně nepoužijeme.
    if (jeNovejsiVerze(raw)) return { stav: vychoziStav(), lzeUlozit: false };
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

// ─── Záloha do souboru (export a import) ────────────────────────────────

const ZNACKA_ZALOHY = "elektro7-zaloha";

export interface Zaloha {
  aplikace: typeof ZNACKA_ZALOHY;
  /** Kdy byla záloha vytvořena (ISO). */
  vytvoreno: string;
  /** Verze aplikace z package.json. */
  verzeAplikace: string;
  data: Ulozeno;
}

export function vytvorZalohu(stav: Ulozeno, verzeAplikace: string): Zaloha {
  return { aplikace: ZNACKA_ZALOHY, vytvoreno: new Date().toISOString(), verzeAplikace, data: stav };
}

export type VysledekCteniZalohy =
  | { ok: true; stav: Ulozeno; vytvoreno?: string }
  | { ok: false; duvod: string };

/**
 * Přečte zálohu ze souboru. Přijme soubor z exportu i samotná data pokroku (verze 1 i 2)
 * a převede je přes migrate(). Data novější verze aplikace odmítne.
 */
export function prectiZalohu(text: string): VysledekCteniZalohy {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, duvod: "Soubor není platný JSON." };
  }
  if (!jeObjekt(raw)) return { ok: false, duvod: "Soubor neobsahuje zálohu Elektro §7." };

  const jeZaloha = raw.aplikace === ZNACKA_ZALOHY;
  const data = jeZaloha ? raw.data : raw;
  if (!jeObjekt(data) || typeof data.verze !== "number" || !jeObjekt(data.otazky)) {
    return { ok: false, duvod: "Soubor neobsahuje zálohu Elektro §7." };
  }
  if (jeNovejsiVerze(data)) {
    return { ok: false, duvod: "Záloha je z novější verze aplikace. Nejdřív aplikaci aktualizujte." };
  }
  if (data.verze !== 1 && data.verze !== 2) {
    return { ok: false, duvod: "Záloha má neznámou verzi dat." };
  }
  return {
    ok: true,
    stav: migrate(data),
    vytvoreno: jeZaloha && typeof raw.vytvoreno === "string" ? raw.vytvoreno : undefined
  };
}
