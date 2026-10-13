// Společné části otázky obou typů (OtazkaView.tsx a PoradiView.tsx): hlavička se zadáním
// a závěr vyhodnocené otázky.
import type { Otazka } from "../data/typy";
import { maOverit } from "../lib/fakta";
import { Zdroje } from "./FaktChip";
import { Icon } from "./Icon";
import { IlustraceBlok } from "./IlustraceBlok";
import { OdznakOverit } from "./OdznakOverit";
import { nadpisSekce } from "./styly";

export const POPIS_OBTIZNOSTI: Record<1 | 2 | 3, string> = {
  1: "Pojem",
  2: "Souvislosti",
  3: "Situace z praxe"
};

/** Podtéma, obtížnost (u otázky na seřazení i typ) a zadání. */
export function HlavickaOtazky({ otazka, nazevPodtematu }: { otazka: Otazka; nazevPodtematu?: string }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-xs text-tlumeny">
        {nazevPodtematu && <span className="font-medium">{nazevPodtematu}</span>}
        {nazevPodtematu && <span aria-hidden="true">·</span>}
        <span>{POPIS_OBTIZNOSTI[otazka.obtiznost]}</span>
        {otazka.typ === "poradi" && (
          <>
            <span aria-hidden="true">·</span>
            <span>Seřazení</span>
          </>
        )}
      </div>
      <h2 id={`zadani-${otazka.id}`} className="mt-2 text-lg leading-snug font-semibold">
        {otazka.zadani}
      </h2>
    </>
  );
}

/**
 * Závěr vyhodnocené otázky: shrnutí, odznak „Ověřit v normě“, zdroje, ilustrace a odkaz do nauky.
 * Ilustrace se ukáže až tady, aby před odpovědí neprozradila řešení.
 */
export function ZaverOtazky({ otazka, odkazNauka }: { otazka: Otazka; odkazNauka?: string }) {
  return (
    <>
      <section className="rounded-xl border border-primarni/30 bg-primarni/5 p-4">
        <h3 className={nadpisSekce}>Shrnutí</h3>
        <p className="mt-1.5 font-medium">{otazka.shrnuti}</p>
      </section>

      {maOverit(otazka.fakta) && (
        <div className="space-y-1.5">
          <OdznakOverit />
          <p className="text-sm text-tlumeny">Otázka se opírá o údaj, který je potřeba potvrdit v aktuálním znění normy.</p>
        </div>
      )}

      <Zdroje fakta={otazka.fakta} />

      {otazka.ilustrace && <IlustraceBlok id={otazka.ilustrace} />}

      {odkazNauka && (
        <a href={odkazNauka} className="inline-flex min-h-11 items-center gap-2 font-medium text-primarni">
          <Icon nazev="nauka" size={18} />
          Zpět do nauky
        </a>
      )}
    </>
  );
}
