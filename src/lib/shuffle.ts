// Míchání možností (Fisher–Yates). Pořadí jedné otázky zůstává stejné po celou relaci
// (i po obnovení stránky v téže záložce), aby se odpovědi „nepřeskupovaly“ pod rukou.

const KLIC_RELACE = "elektro7:poradi";

export function zamichej<T>(pole: readonly T[], nahoda: () => number = Math.random): T[] {
  const vysledek = [...pole];
  for (let i = vysledek.length - 1; i > 0; i--) {
    const j = Math.floor(nahoda() * (i + 1));
    [vysledek[i], vysledek[j]] = [vysledek[j], vysledek[i]];
  }
  return vysledek;
}

function nactiRelaci(): Record<string, string[]> {
  try {
    const text = sessionStorage.getItem(KLIC_RELACE);
    const data: unknown = text ? JSON.parse(text) : {};
    return typeof data === "object" && data !== null ? (data as Record<string, string[]>) : {};
  } catch {
    return {};
  }
}

const poradiRelace = nactiRelaci();

function ulozRelaci(): void {
  try {
    sessionStorage.setItem(KLIC_RELACE, JSON.stringify(poradiRelace));
  } catch {
    // bez úložiště relace se pořadí drží jen v paměti
  }
}

function stejneId(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((x) => b.includes(x));
}

/** Vrátí id možností v pořadí, v jakém se mají zobrazit. */
export function poradiMoznosti(idOtazky: string, idMoznosti: readonly string[]): string[] {
  const ulozene = poradiRelace[idOtazky];
  if (Array.isArray(ulozene) && stejneId(ulozene, idMoznosti)) return ulozene;
  const nove = zamichej(idMoznosti);
  poradiRelace[idOtazky] = nove;
  ulozRelaci();
  return nove;
}

/**
 * Výchozí pořadí položek otázky „poradi“: zamíchané, stabilní po celou relaci
 * a nikdy rovnou správné.
 */
export function poradiPolozek(idOtazky: string, idPolozek: readonly string[], spravne: readonly string[]): string[] {
  const klic = `${idOtazky}:polozky`;
  const jeSpravne = (poradi: readonly string[]) => poradi.every((id, i) => id === spravne[i]);
  const ulozene = poradiRelace[klic];
  if (Array.isArray(ulozene) && stejneId(ulozene, idPolozek) && !jeSpravne(ulozene)) return ulozene;
  let nove = zamichej(idPolozek);
  // Posun o jedno místo: ze správného pořadí aspoň dvou různých položek udělá nesprávné.
  if (jeSpravne(nove)) nove = [...nove.slice(1), ...nove.slice(0, 1)];
  poradiRelace[klic] = nove;
  ulozRelaci();
  return nove;
}
