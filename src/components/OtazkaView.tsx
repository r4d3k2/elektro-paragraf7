// Otázka se zpětnou vazbou podle sekce 6 specifikace. Typ „vyber“ je tady, typ „poradi“ v PoradiView.tsx.
// S odpovedPredem se zobrazí rovnou vyhodnocená (rozbor testu kapitoly).
import { useMemo, useRef, useState } from "react";
import type { Moznost, Otazka, OtazkaVyber } from "../data/typy";
import type { Odpoved } from "../lib/odpovedi";
import { poradiMoznosti } from "../lib/shuffle";
import { Icon } from "./Icon";
import { HlavickaOtazky, ZaverOtazky } from "./OtazkaCasti";
import { PoradiView } from "./PoradiView";

export const PISMENA = ["A", "B", "C", "D"];

/** Možnosti v zamíchaném pořadí, které zůstává stejné po celou relaci (Fisher–Yates, shuffle.ts). */
export function useZobrazeneMoznosti(otazka: OtazkaVyber): Moznost[] {
  return useMemo(() => {
    const poradi = poradiMoznosti(
      otazka.id,
      otazka.moznosti.map((m) => m.id)
    );
    return poradi
      .map((id) => otazka.moznosti.find((m) => m.id === id))
      .filter((m): m is Moznost => m !== undefined);
  }, [otazka]);
}

interface Props {
  otazka: Otazka;
  nazevPodtematu?: string;
  /** Odkaz na kartu nauky, která s otázkou sdílí nejvíc faktů. */
  odkazNauka?: string;
  onOdpoved?: (spravne: boolean) => void;
  /** Už daná odpověď – otázka se zobrazí vyhodnocená a zamčená. */
  odpovedPredem?: Odpoved;
}

export function OtazkaView({ otazka, odpovedPredem, ...ostatni }: Props) {
  if (otazka.typ === "poradi") {
    return (
      <PoradiView otazka={otazka} odpovedPredem={Array.isArray(odpovedPredem) ? odpovedPredem : undefined} {...ostatni} />
    );
  }
  return (
    <VyberView otazka={otazka} odpovedPredem={typeof odpovedPredem === "string" ? odpovedPredem : undefined} {...ostatni} />
  );
}

interface VyberProps extends Omit<Props, "otazka" | "odpovedPredem"> {
  otazka: OtazkaVyber;
  odpovedPredem?: Moznost["id"];
}

function VyberView({ otazka, nazevPodtematu, odkazNauka, onOdpoved, odpovedPredem }: VyberProps) {
  const zobrazene = useZobrazeneMoznosti(otazka);
  const [zvoleno, setZvoleno] = useState<Moznost["id"] | null>(odpovedPredem ?? null);
  const vysledek = useRef<HTMLDivElement>(null);
  const spravna = otazka.moznosti.find((m) => m.spravna);
  const odpovezeno = zvoleno !== null;
  const jeSpravne = odpovezeno && zvoleno === spravna?.id;
  const pismeno = (id: Moznost["id"]) => PISMENA[zobrazene.findIndex((m) => m.id === id)] ?? "?";

  function zvol(id: Moznost["id"]) {
    if (zvoleno !== null) return;
    setZvoleno(id);
    onOdpoved?.(id === spravna?.id);
    // Výsledek se objeví hned pod možnostmi; posuneme ho do zorného pole jen tolik, kolik je potřeba.
    requestAnimationFrame(() => {
      const omezitPohyb = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      vysledek.current?.scrollIntoView({ block: "nearest", behavior: omezitPohyb ? "auto" : "smooth" });
    });
  }

  // Pořadí vysvětlení: zvolená, správná, ostatní (v zobrazeném pořadí).
  const poradiVysvetleni = odpovezeno
    ? [
        ...zobrazene.filter((m) => m.id === zvoleno),
        ...zobrazene.filter((m) => m.spravna && m.id !== zvoleno),
        ...zobrazene.filter((m) => !m.spravna && m.id !== zvoleno)
      ]
    : [];

  return (
    <article aria-labelledby={`zadani-${otazka.id}`}>
      <HlavickaOtazky otazka={otazka} nazevPodtematu={nazevPodtematu} />

      <ul className="mt-4 space-y-2.5">
        {zobrazene.map((m) => {
          const zvolena = m.id === zvoleno;
          let vzhled = "border-hrana bg-plocha hover:border-primarni active:bg-plocha-2";
          if (odpovezeno) {
            if (m.spravna) vzhled = "border-spravne bg-spravne/10";
            else if (zvolena) vzhled = "border-spatne bg-spatne/10";
            else vzhled = "border-hrana bg-plocha opacity-70";
          }
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => zvol(m.id)}
                disabled={odpovezeno}
                aria-pressed={zvolena}
                className={`flex min-h-12 w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors duration-150 disabled:cursor-default ${vzhled}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold ${
                    odpovezeno && m.spravna
                      ? "bg-spravne text-plocha"
                      : odpovezeno && zvolena
                        ? "bg-spatne text-plocha"
                        : "bg-plocha-2 text-text"
                  }`}
                  aria-hidden="true"
                >
                  {pismeno(m.id)}
                </span>
                <span className="min-w-0 flex-1 pt-0.5">{m.text}</span>
                {odpovezeno && m.spravna && (
                  <Icon nazev="spravne" size={22} className="mt-0.5 shrink-0 text-spravne" title="Správná odpověď" />
                )}
                {odpovezeno && zvolena && !m.spravna && (
                  <Icon nazev="spatne" size={22} className="mt-0.5 shrink-0 text-spatne" title="Vaše špatná odpověď" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="sr-only">
        {odpovezeno
          ? jeSpravne
            ? "Správně."
            : `Špatně. Správná odpověď je ${spravna ? pismeno(spravna.id) : ""}.`
          : ""}
      </p>

      {odpovezeno && (
        <div className="mt-5 space-y-5">
          <div
            ref={vysledek}
            className={`flex scroll-mb-28 items-center gap-2 rounded-xl p-3 font-semibold ${
              jeSpravne ? "bg-spravne/10 text-spravne" : "bg-spatne/10 text-spatne"
            }`}
          >
            <Icon nazev={jeSpravne ? "spravne" : "spatne"} size={22} />
            {jeSpravne ? "Správně" : `Špatně – správná odpověď je ${spravna ? pismeno(spravna.id) : ""}`}
          </div>

          <section aria-label="Vysvětlení možností" className="space-y-3">
            {poradiVysvetleni.map((m) => (
              <div
                key={m.id}
                className={`rounded-xl border-l-4 bg-plocha p-3 ${
                  m.spravna ? "border-spravne" : m.id === zvoleno ? "border-spatne" : "border-hrana"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-mono font-semibold">{pismeno(m.id)}</span>
                  {m.id === zvoleno && <span className="font-semibold">Vaše odpověď</span>}
                  {m.spravna && <span className="font-semibold text-spravne">Správná odpověď</span>}
                  {!m.spravna && m.id === zvoleno && <span className="font-semibold text-spatne">Špatně</span>}
                </div>
                <p className="mt-1 text-sm text-tlumeny">{m.text}</p>
                <p className="mt-2">{m.vysvetleni}</p>
              </div>
            ))}
          </section>

          <ZaverOtazky otazka={otazka} odkazNauka={odkazNauka} />
        </div>
      )}
    </article>
  );
}
