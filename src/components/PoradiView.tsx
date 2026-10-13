// Otázka typu „poradi“ (sekce 3 a 10 specifikace): položky se přesouvají tlačítky nahoru a dolů
// (spolehlivé na dotyku, bez tažení a bez knihovny). Po potvrzení se ukáže správné pořadí
// s vyznačenými chybami. S odpovedPredem se zobrazí rovnou vyhodnocená (rozbor testu kapitoly).
import { useEffect, useMemo, useRef, useState } from "react";
import type { OtazkaPoradi } from "../data/typy";
import { jeSpravnaOdpoved, pocetNaMiste } from "../lib/odpovedi";
import { poradiPolozek } from "../lib/shuffle";
import { Icon } from "./Icon";
import { HlavickaOtazky, ZaverOtazky } from "./OtazkaCasti";
import { nadpisSekce, tlacitkoPrimarni } from "./styly";

/** Výchozí (zamíchané) pořadí položek, stabilní po celou relaci. */
export function useVychoziPoradi(otazka: OtazkaPoradi): string[] {
  return useMemo(
    () =>
      poradiPolozek(
        otazka.id,
        otazka.polozky.map((p) => p.id),
        otazka.spravnePoradi
      ),
    [otazka]
  );
}

function textPolozky(otazka: OtazkaPoradi, id: string): string {
  return otazka.polozky.find((p) => p.id === id)?.text ?? id;
}

const tlacitkoSipky =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha text-text transition-colors duration-150 hover:border-primarni active:bg-plocha-2 disabled:opacity-30";

interface SeznamProps {
  otazka: OtazkaPoradi;
  poradi: string[];
  onZmena: (poradi: string[]) => void;
}

/** Seznam položek, které se přesouvají tlačítky nahoru a dolů. */
export function PoradiSeznam({ otazka, poradi, onZmena }: SeznamProps) {
  const tlacitka = useRef(new Map<string, HTMLButtonElement>());
  const [fokus, setFokus] = useState<string | null>(null);
  const [presunuta, setPresunuta] = useState<string | null>(null);
  const [hlaseni, setHlaseni] = useState("");

  // Po přesunu vrátí fokus na tlačítko přesunuté položky (pro ovládání klávesnicí).
  useEffect(() => {
    if (fokus === null) return;
    tlacitka.current.get(fokus)?.focus();
    setFokus(null);
  }, [fokus, poradi]);

  function presun(id: string, smer: -1 | 1) {
    const i = poradi.indexOf(id);
    const j = i + smer;
    if (i < 0 || j < 0 || j >= poradi.length) return;
    const nove = [...poradi];
    [nove[i], nove[j]] = [nove[j], nove[i]];
    onZmena(nove);
    // Na kraji seznamu je tlačítko ve stejném směru vypnuté – fokus přejde na opačné.
    const naKraji = j === 0 || j === poradi.length - 1;
    const stejnySmer = smer === -1 ? "nahoru" : "dolu";
    const opacnySmer = smer === -1 ? "dolu" : "nahoru";
    setFokus(`${id}:${naKraji ? opacnySmer : stejnySmer}`);
    setPresunuta(id);
    setHlaseni(`${textPolozky(otazka, id)} – teď na ${j + 1}. místě z ${poradi.length}.`);
  }

  function registruj(klic: string) {
    return (el: HTMLButtonElement | null) => {
      if (el) tlacitka.current.set(klic, el);
      else tlacitka.current.delete(klic);
    };
  }

  return (
    <>
      <ol className="space-y-2" aria-label="Pořadí položek">
        {poradi.map((id, i) => {
          const text = textPolozky(otazka, id);
          return (
            <li
              key={id}
              className={`flex items-center gap-2 rounded-xl border-2 bg-plocha py-1.5 pr-1.5 pl-2 transition-colors duration-150 ${
                presunuta === id ? "border-primarni" : "border-hrana"
              }`}
            >
              <span className="w-7 shrink-0 text-center font-mono text-sm font-semibold text-tlumeny" aria-hidden="true">
                {i + 1}.
              </span>
              <span className="min-w-0 flex-1 py-1">
                <span className="sr-only">{i + 1}. místo: </span>
                {text}
              </span>
              <span className="flex shrink-0 gap-1">
                <button
                  ref={registruj(`${id}:nahoru`)}
                  type="button"
                  onClick={() => presun(id, -1)}
                  disabled={i === 0}
                  aria-label={`Posunout výš: ${text}`}
                  className={tlacitkoSipky}
                >
                  <Icon nazev="nahoru" size={20} />
                </button>
                <button
                  ref={registruj(`${id}:dolu`)}
                  type="button"
                  onClick={() => presun(id, 1)}
                  disabled={i === poradi.length - 1}
                  aria-label={`Posunout níž: ${text}`}
                  className={tlacitkoSipky}
                >
                  <Icon nazev="dolu" size={20} />
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <p aria-live="polite" className="sr-only">
        {hlaseni}
      </p>
    </>
  );
}

/** Seřazené pořadí s vyznačením položek na správném a na špatném místě. */
function VyhodnocenePoradi({ otazka, poradi }: { otazka: OtazkaPoradi; poradi: string[] }) {
  return (
    <ol className="space-y-2" aria-label="Vaše pořadí">
      {poradi.map((id, i) => {
        const ok = otazka.spravnePoradi[i] === id;
        const spravneMisto = otazka.spravnePoradi.indexOf(id) + 1;
        return (
          <li
            key={id}
            className={`flex items-start gap-2 rounded-xl border-2 p-2.5 ${ok ? "border-spravne bg-spravne/10" : "border-spatne bg-spatne/10"}`}
          >
            <span className="w-7 shrink-0 pt-0.5 text-center font-mono text-sm font-semibold" aria-hidden="true">
              {i + 1}.
            </span>
            <span className="min-w-0 flex-1 pt-0.5">
              <span className="sr-only">{i + 1}. místo: </span>
              {textPolozky(otazka, id)}
              {!ok && <span className="mt-0.5 block text-sm font-medium text-spatne">Patří na {spravneMisto}. místo.</span>}
            </span>
            <Icon
              nazev={ok ? "spravne" : "spatne"}
              size={22}
              className={`mt-0.5 shrink-0 ${ok ? "text-spravne" : "text-spatne"}`}
              title={ok ? "Na správném místě" : "Na špatném místě"}
            />
          </li>
        );
      })}
    </ol>
  );
}

interface Props {
  otazka: OtazkaPoradi;
  nazevPodtematu?: string;
  /** Odkaz na kartu nauky, která s otázkou sdílí nejvíc faktů. */
  odkazNauka?: string;
  onOdpoved?: (spravne: boolean) => void;
  /** Už dané pořadí – otázka se zobrazí vyhodnocená. */
  odpovedPredem?: string[];
}

export function PoradiView({ otazka, nazevPodtematu, odkazNauka, onOdpoved, odpovedPredem }: Props) {
  const vychozi = useVychoziPoradi(otazka);
  const [poradi, setPoradi] = useState<string[]>(odpovedPredem ?? vychozi);
  const [potvrzeno, setPotvrzeno] = useState(odpovedPredem !== undefined);
  const vysledek = useRef<HTMLDivElement>(null);
  const jeSpravne = jeSpravnaOdpoved(otazka, poradi);
  const naMiste = pocetNaMiste(otazka, poradi);
  const celkem = otazka.polozky.length;

  function potvrd() {
    if (potvrzeno) return;
    setPotvrzeno(true);
    onOdpoved?.(jeSpravne);
    requestAnimationFrame(() => {
      const omezitPohyb = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      vysledek.current?.scrollIntoView({ block: "nearest", behavior: omezitPohyb ? "auto" : "smooth" });
    });
  }

  return (
    <article aria-labelledby={`zadani-${otazka.id}`}>
      <HlavickaOtazky otazka={otazka} nazevPodtematu={nazevPodtematu} />

      {!potvrzeno ? (
        <>
          <p className="mt-2 text-sm text-tlumeny">Seřaďte položky šipkami od první po poslední a pořadí potvrďte.</p>
          <div className="mt-4">
            <PoradiSeznam otazka={otazka} poradi={poradi} onZmena={setPoradi} />
          </div>
          <button type="button" onClick={potvrd} className={`${tlacitkoPrimarni} mt-4 w-full`}>
            <Icon nazev="spravne" size={18} />
            Potvrdit pořadí
          </button>
        </>
      ) : (
        <div className="mt-4 space-y-5">
          <div
            ref={vysledek}
            role="status"
            className={`flex scroll-mt-20 scroll-mb-28 items-center gap-2 rounded-xl p-3 font-semibold ${
              jeSpravne ? "bg-spravne/10 text-spravne" : "bg-spatne/10 text-spatne"
            }`}
          >
            <Icon nazev={jeSpravne ? "spravne" : "spatne"} size={22} />
            {jeSpravne ? "Správně – celé pořadí sedí" : `Špatně – na správném místě ${naMiste} z ${celkem}`}
          </div>

          <section>
            <h3 className={nadpisSekce}>Vaše pořadí</h3>
            <div className="mt-2">
              <VyhodnocenePoradi otazka={otazka} poradi={poradi} />
            </div>
          </section>

          {!jeSpravne && (
            <section>
              <h3 className={nadpisSekce}>Správné pořadí</h3>
              <ol className="mt-2 space-y-1.5">
                {otazka.spravnePoradi.map((id, i) => (
                  <li key={id} className="flex gap-2 rounded-lg bg-plocha px-2.5 py-2">
                    <span className="w-7 shrink-0 text-center font-mono text-sm font-semibold text-spravne">{i + 1}.</span>
                    <span className="min-w-0 flex-1">{textPolozky(otazka, id)}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="rounded-xl border-l-4 border-spravne bg-plocha p-3">
            <h3 className={nadpisSekce}>Vysvětlení</h3>
            <p className="mt-1.5">{otazka.vysvetleniPoradi}</p>
          </section>

          <ZaverOtazky otazka={otazka} odkazNauka={odkazNauka} />
        </div>
      )}
    </article>
  );
}
