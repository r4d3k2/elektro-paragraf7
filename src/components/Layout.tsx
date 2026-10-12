// Společné rozvržení stránky: horní lišta (zpět, název, vzhled), obsah do 640 px.
import { useEffect, type ReactNode } from "react";
import { pokrok, usePokrok } from "../lib/progress";
import { dalsiVzhled, POPIS_VZHLEDU } from "../lib/vzhled";
import { Icon, type NazevIkony } from "./Icon";

interface Props {
  /** Titulek záložky prohlížeče (bez názvu aplikace). */
  titulek: string;
  zpet?: { href: string; popis: string };
  /** Krátký text uprostřed lišty, např. „Kapitola 1“. */
  stitek?: string;
  children: ReactNode;
}

const IKONA_VZHLEDU: Record<string, NazevIkony> = { system: "system", svetly: "slunce", tmavy: "mesic" };

export function Layout({ titulek, zpet, stitek, children }: Props) {
  const stav = usePokrok();
  const vzhled = stav.nastaveni.vzhled;
  const dalsi = dalsiVzhled(vzhled);

  useEffect(() => {
    document.title = titulek ? `${titulek} · Elektro §7` : "Elektro §7 – trenažér";
  }, [titulek]);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-hrana bg-pozadi/90 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[640px] items-center gap-2 px-2">
          {zpet ? (
            <a
              href={zpet.href}
              className="inline-flex min-h-11 min-w-11 items-center gap-1 rounded-lg px-2 text-primarni hover:bg-primarni/10"
            >
              <Icon nazev="zpet" size={22} />
              <span className="max-w-[9rem] truncate text-sm font-medium">{zpet.popis}</span>
            </a>
          ) : (
            <a href="#/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2" aria-label="Elektro §7 – domů">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primarni text-akcent">
                <Icon nazev="blesk" size={16} plna />
              </span>
              <span className="font-mono text-sm font-semibold">Elektro §7</span>
            </a>
          )}
          <span className="min-w-0 flex-1 truncate text-center font-mono text-xs text-tlumeny">{stitek}</span>
          <button
            type="button"
            onClick={() => pokrok.nastavVzhled(dalsi)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-tlumeny hover:bg-plocha-2 hover:text-text"
            aria-label={`Vzhled: ${POPIS_VZHLEDU[vzhled]}. Přepnout na: ${POPIS_VZHLEDU[dalsi]}`}
            title={`Vzhled: ${POPIS_VZHLEDU[vzhled]}`}
          >
            <Icon nazev={IKONA_VZHLEDU[vzhled]} size={20} />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[640px] flex-1 px-4 pt-5 pb-28">{children}</main>
    </div>
  );
}
