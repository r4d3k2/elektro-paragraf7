// Jednoduchý routing přes hash (#/k/k1-legislativa/nauka/2?…) bez knihovny.
import { useMemo, useSyncExternalStore } from "react";

export interface Trasa {
  /** Segmenty cesty, např. ["k", "k1-legislativa", "nauka", "2"]. */
  cesta: string[];
  dotaz: URLSearchParams;
  /** Normalizovaný hash včetně „#“. */
  hash: string;
}

const UDALOST_ZMENY = "elektro7:trasa";

function dekoduj(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function rozeberHash(hash: string): Trasa {
  const bezMrizky = hash.replace(/^#/, "");
  const cele = bezMrizky.startsWith("/") ? bezMrizky : `/${bezMrizky}`;
  const [cast, dotaz = ""] = cele.split("?");
  return {
    cesta: cast.split("/").filter(Boolean).map(dekoduj),
    dotaz: new URLSearchParams(dotaz),
    hash: `#${cele}`
  };
}

function prihlas(fn: () => void): () => void {
  window.addEventListener("hashchange", fn);
  window.addEventListener(UDALOST_ZMENY, fn);
  return () => {
    window.removeEventListener("hashchange", fn);
    window.removeEventListener(UDALOST_ZMENY, fn);
  };
}

export function useHashRoute(): Trasa {
  const hash = useSyncExternalStore(prihlas, () => window.location.hash);
  return useMemo(() => rozeberHash(hash), [hash]);
}

/** Sestaví odkaz „#/…“; prázdné hodnoty dotazu vynechá. */
export function odkaz(cesta: string, dotaz?: Record<string, string | undefined>): string {
  const parametry = new URLSearchParams();
  for (const [klic, hodnota] of Object.entries(dotaz ?? {})) {
    if (hodnota) parametry.set(klic, hodnota);
  }
  const retezec = parametry.toString();
  return `#${cesta}${retezec ? `?${retezec}` : ""}`;
}

/** Přejde na jinou trasu. S nahradit: true nevytvoří nový záznam v historii. */
export function prejdi(cil: string, { nahradit = false }: { nahradit?: boolean } = {}): void {
  const hash = cil.startsWith("#") ? cil : `#${cil}`;
  if (nahradit) {
    history.replaceState(history.state, "", hash);
    window.dispatchEvent(new Event(UDALOST_ZMENY));
  } else {
    window.location.hash = hash;
  }
}
