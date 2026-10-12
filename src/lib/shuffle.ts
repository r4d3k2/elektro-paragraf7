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
