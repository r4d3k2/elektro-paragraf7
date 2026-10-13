// Společné části Testu kapitoly a Zkoušky nanečisto: běh bez zpětné vazby, výsledek a rozbor.
// Oba druhy obsahují otázky typu „vyber“ i „poradi“. Správnost se ukáže až po vyhodnocení.
import { useMemo, useState } from "react";
import type { Moznost, Otazka, OtazkaPoradi, OtazkaVyber } from "../data/typy";
import { maOverit } from "../lib/fakta";
import { procenta } from "../lib/format";
import { jeSpravnaOdpoved, type Odpoved } from "../lib/odpovedi";
import { minimumProUspech } from "../lib/test";
import { Icon } from "./Icon";
import { OdznakOverit } from "./OdznakOverit";
import { HlavickaOtazky } from "./OtazkaCasti";
import { OtazkaView, PISMENA, useZobrazeneMoznosti } from "./OtazkaView";
import { PoradiSeznam, useVychoziPoradi } from "./PoradiView";
import { Pruh } from "./Pruh";
import { tlacitkoPrimarni, tlacitkoSekundarni, tlacitkoTiche } from "./styly";

export type DruhTestu = "test" | "zkouska";

const TEXTY: Record<DruhTestu, { koho: string; ceho: string; zrusitOtazka: string; zrusit: string }> = {
  test: { koho: "test", ceho: "testu", zrusitOtazka: "Zrušit rozpracovaný test?", zrusit: "Zrušit test" },
  zkouska: { koho: "zkoušku", ceho: "zkoušky", zrusitOtazka: "Zrušit rozpracovanou zkoušku?", zrusit: "Zrušit zkoušku" }
};

/** Stav rozpracovaného testu nebo zkoušky, který běh mění. */
export interface StavBehu {
  odpovedi: Partial<Record<string, Odpoved>>;
  index: number;
}

// ─── Běh: odpovědi bez zpětné vazby ─────────────────────────────────────

interface BehProps<T extends StavBehu> {
  druh: DruhTestu;
  otazky: Otazka[];
  test: T;
  /** Popis nad zadáním (podtéma, u zkoušky i kapitola). */
  popisOtazky: (otazka: Otazka) => string;
  onZmena: (test: T) => void;
  onVyhodnot: (test: T) => void;
  onZrus: () => void;
}

export function BehTestu<T extends StavBehu>({ druh, otazky, test, popisOtazky, onZmena, onVyhodnot, onZrus }: BehProps<T>) {
  const [potvrditZruseni, setPotvrditZruseni] = useState(false);
  const texty = TEXTY[druh];
  const otazka = otazky[test.index];
  if (!otazka) return null;

  const zvoleno = test.odpovedi[otazka.id];
  const posledni = test.index === otazky.length - 1;
  const zodpovezeno = otazky.filter((o) => test.odpovedi[o.id] !== undefined).length;
  const prvniBezOdpovedi = otazky.findIndex((o) => test.odpovedi[o.id] === undefined);
  const chybiJinde = prvniBezOdpovedi >= 0 && prvniBezOdpovedi !== test.index;

  function jdiNa(index: number) {
    onZmena({ ...test, index });
    window.scrollTo({ top: 0 });
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <Pruh hodnota={test.index + 1} max={otazky.length} popis={`Otázka ${test.index + 1} z ${otazky.length}`} />
        <span className="shrink-0 font-mono text-sm text-tlumeny">
          {test.index + 1} / {otazky.length}
        </span>
      </div>

      <div className="mt-4">
        {otazka.typ === "poradi" ? (
          <TestOtazkaPoradi
            key={otazka.id}
            otazka={otazka}
            popis={popisOtazky(otazka)}
            ceho={texty.ceho}
            zvoleno={Array.isArray(zvoleno) ? zvoleno : undefined}
            onZvol={(poradi) => onZmena({ ...test, odpovedi: { ...test.odpovedi, [otazka.id]: poradi } })}
          />
        ) : (
          <TestOtazka
            key={otazka.id}
            otazka={otazka}
            popis={popisOtazky(otazka)}
            ceho={texty.ceho}
            zvoleno={typeof zvoleno === "string" ? zvoleno : undefined}
            onZvol={(id) => onZmena({ ...test, odpovedi: { ...test.odpovedi, [otazka.id]: id } })}
          />
        )}
      </div>

      <MapaOtazek otazky={otazky} test={test} onJdi={jdiNa} />

      <div className="mt-8 border-t border-hrana pt-4">
        {!potvrditZruseni ? (
          <button type="button" onClick={() => setPotvrditZruseni(true)} className={tlacitkoTiche}>
            {texty.zrusit} bez vyhodnocení
          </button>
        ) : (
          <div className="rounded-xl border-2 border-spatne/60 p-4" role="alertdialog" aria-labelledby="zrusit-test">
            <p id="zrusit-test" className="font-semibold">
              {texty.zrusitOtazka}
            </p>
            <p className="mt-1 text-sm text-tlumeny">Odpovědi se zahodí a výsledek se neuloží.</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onZrus}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-spatne px-4 font-medium text-plocha"
              >
                {texty.zrusit}
              </button>
              <button type="button" onClick={() => setPotvrditZruseni(false)} className={tlacitkoSekundarni}>
                Pokračovat
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-hrana bg-pozadi/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-[640px] items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => jdiNa(test.index - 1)}
            disabled={test.index === 0}
            className={tlacitkoSekundarni}
            aria-label="Předchozí otázka"
          >
            <Icon nazev="sipkaVlevo" size={18} />
          </button>
          {posledni ? (
            <button
              type="button"
              onClick={() => onVyhodnot(test)}
              disabled={zodpovezeno < otazky.length}
              className={`${tlacitkoPrimarni} flex-1`}
            >
              Vyhodnotit {texty.koho}
              <Icon nazev="spravne" size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => jdiNa(test.index + 1)}
              disabled={zvoleno === undefined}
              className={`${tlacitkoPrimarni} flex-1`}
            >
              Další
              <Icon nazev="sipkaVpravo" size={18} />
            </button>
          )}
        </div>
        {posledni && chybiJinde && (
          <div className="mx-auto flex max-w-[640px] items-center justify-center gap-2 px-4 pb-2 text-xs text-tlumeny">
            <span>
              Zodpovězeno {zodpovezeno} z {otazky.length}.
            </span>
            <button
              type="button"
              onClick={() => jdiNa(prvniBezOdpovedi)}
              className="inline-flex min-h-11 items-center px-1 font-medium text-primarni underline"
            >
              Na otázku {prvniBezOdpovedi + 1} bez odpovědi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Rozbalovací přehled všech otázek: čísla s vyznačením zodpovězených, klepnutím se přejde na otázku. */
function MapaOtazek({ otazky, test, onJdi }: { otazky: Otazka[]; test: StavBehu; onJdi: (index: number) => void }) {
  const zodpovezeno = otazky.filter((o) => test.odpovedi[o.id] !== undefined).length;
  return (
    <details className="group mt-6 rounded-xl border border-hrana bg-plocha">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <Icon nazev="vpred" size={16} className="shrink-0 text-tlumeny transition-transform duration-150 group-open:rotate-90" />
        <span className="flex-1">Přehled otázek</span>
        <span className="font-mono text-xs text-tlumeny">
          zodpovězeno {zodpovezeno} / {otazky.length}
        </span>
      </summary>
      <ol className="grid grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-1.5 border-t border-hrana p-3">
        {otazky.map((o, i) => {
          const ma = test.odpovedi[o.id] !== undefined;
          const aktualni = i === test.index;
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => onJdi(i)}
                aria-current={aktualni ? "step" : undefined}
                aria-label={`Otázka ${i + 1}${ma ? ", zodpovězená" : ", bez odpovědi"}`}
                className={`flex min-h-11 w-full items-center justify-center rounded-lg border-2 font-mono text-sm font-semibold transition-colors duration-150 ${
                  ma ? "border-primarni bg-primarni/10 text-primarni" : "border-dashed border-hrana text-tlumeny"
                } ${aktualni ? "ring-2 ring-primarni ring-offset-2 ring-offset-plocha" : ""}`}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>
    </details>
  );
}

interface TestOtazkaProps {
  otazka: OtazkaVyber;
  popis: string;
  ceho: string;
  zvoleno: Moznost["id"] | undefined;
  onZvol: (id: Moznost["id"]) => void;
}

/** Otázka v testu: volbu lze měnit až do vyhodnocení, správnost se neukazuje. */
function TestOtazka({ otazka, popis, ceho, zvoleno, onZvol }: TestOtazkaProps) {
  const zobrazene = useZobrazeneMoznosti(otazka);
  return (
    <article aria-labelledby={`zadani-${otazka.id}`}>
      <HlavickaOtazky otazka={otazka} nazevPodtematu={popis} />
      <ul className="mt-4 space-y-2.5">
        {zobrazene.map((m, i) => {
          const zvolena = m.id === zvoleno;
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onZvol(m.id)}
                aria-pressed={zvolena}
                className={`flex min-h-12 w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors duration-150 ${
                  zvolena ? "border-primarni bg-primarni/10" : "border-hrana bg-plocha hover:border-primarni active:bg-plocha-2"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold ${
                    zvolena ? "bg-primarni text-na-primarni" : "bg-plocha-2 text-text"
                  }`}
                  aria-hidden="true"
                >
                  {PISMENA[i]}
                </span>
                <span className="min-w-0 flex-1 pt-0.5">{m.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm text-tlumeny">Odpověď můžete změnit až do vyhodnocení {ceho}.</p>
    </article>
  );
}

interface TestOtazkaPoradiProps {
  otazka: OtazkaPoradi;
  popis: string;
  ceho: string;
  zvoleno: string[] | undefined;
  onZvol: (poradi: string[]) => void;
}

/**
 * Otázka na seřazení v testu: každý přesun se hned uloží jako odpověď. Pořadí lze přijmout i beze změny
 * tlačítkem „Potvrdit toto pořadí“. Správnost se neukazuje.
 */
function TestOtazkaPoradi({ otazka, popis, ceho, zvoleno, onZvol }: TestOtazkaPoradiProps) {
  const vychozi = useVychoziPoradi(otazka);
  const poradi = zvoleno ?? vychozi;
  return (
    <article aria-labelledby={`zadani-${otazka.id}`}>
      <HlavickaOtazky otazka={otazka} nazevPodtematu={popis} />
      <p className="mt-2 text-sm text-tlumeny">Seřaďte položky šipkami od první po poslední.</p>
      <div className="mt-4">
        <PoradiSeznam otazka={otazka} poradi={poradi} onZmena={onZvol} />
      </div>
      {zvoleno === undefined ? (
        <button type="button" onClick={() => onZvol(poradi)} className={`${tlacitkoSekundarni} mt-4 w-full`}>
          <Icon nazev="spravne" size={18} />
          Potvrdit toto pořadí
        </button>
      ) : (
        <p className="mt-3 text-sm text-tlumeny">Pořadí je uložené. Měnit ho můžete až do vyhodnocení {ceho}.</p>
      )}
    </article>
  );
}

// ─── Výsledek a rozbor ──────────────────────────────────────────────────

/** Rámeček s výsledkem: úspěch / neúspěch, skóre a procenta. */
export function VysledekSkore({ skore, celkem, ok }: { skore: number; celkem: number; ok: boolean }) {
  return (
    <div
      className={`mt-4 rounded-xl border-2 p-4 ${ok ? "border-spravne bg-spravne/10 text-spravne" : "border-spatne bg-spatne/10 text-spatne"}`}
      role="status"
    >
      <p className="flex items-center gap-2 text-lg font-semibold">
        <Icon nazev={ok ? "spravne" : "spatne"} size={24} />
        {ok ? "Úspěch" : "Neúspěch"}
      </p>
      <p className="mt-1 font-mono text-4xl font-semibold">
        {skore} / {celkem} <span className="text-2xl">· {procenta(skore, celkem)} %</span>
      </p>
      <p className="mt-1 text-sm text-text">
        {ok
          ? "Hranice 80 % je splněná. Výsledek je uložený."
          : `Pro úspěch je potřeba alespoň ${minimumProUspech(celkem)} z ${celkem} (80 %). Výsledek je uložený.`}
      </p>
    </div>
  );
}

interface RozborProps {
  otazky: Otazka[];
  odpovedi: Partial<Record<string, Odpoved>>;
  popisOtazky: (otazka: Otazka) => string;
  odkazNauka: (otazka: Otazka) => string | undefined;
}

/** Rozbor všech otázek: chybné rozbalené, ostatní po klepnutí. U každé možnosti vysvětlení. */
export function RozborTestu({ otazky, odpovedi, popisOtazky, odkazNauka }: RozborProps) {
  const vysledky = useMemo(() => new Map(otazky.map((o) => [o.id, jeSpravnaOdpoved(o, odpovedi[o.id])])), [otazky, odpovedi]);
  return (
    <section className="mt-8" aria-labelledby="rozbor-nadpis">
      <h2 id="rozbor-nadpis" className="text-xl font-bold">
        Rozbor
      </h2>
      <p className="mt-1 text-sm text-tlumeny">Chybné odpovědi jsou rozbalené. Klepnutím rozbalíte i ostatní.</p>
      <ol className="mt-3 space-y-3">
        {otazky.map((o, i) => {
          const spravne = vysledky.get(o.id) === true;
          return (
            <li key={o.id}>
              <details
                open={!spravne}
                className={`group rounded-xl border-2 bg-plocha ${spravne ? "border-hrana" : "border-spatne/60"}`}
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-start gap-3 p-3 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm text-tlumeny">{i + 1}.</span>
                  <Icon
                    nazev={spravne ? "spravne" : "spatne"}
                    size={20}
                    className={`mt-0.5 shrink-0 ${spravne ? "text-spravne" : "text-spatne"}`}
                    title={spravne ? "Správně" : "Špatně"}
                  />
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="line-clamp-2">{o.zadani}</span>
                    {maOverit(o.fakta) && (
                      <span className="mt-1 block">
                        <OdznakOverit />
                      </span>
                    )}
                  </span>
                  <Icon
                    nazev="vpred"
                    size={18}
                    className="mt-0.5 shrink-0 text-tlumeny transition-transform duration-150 group-open:rotate-90"
                  />
                </summary>
                <div className="border-t border-hrana p-3">
                  <OtazkaView
                    otazka={o}
                    nazevPodtematu={popisOtazky(o)}
                    odkazNauka={odkazNauka(o)}
                    odpovedPredem={odpovedi[o.id]}
                  />
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Řádek „název – x / y“ s pruhem (výsledek po podtématech nebo kapitolách). */
export function RadekVysledku({ nazev, skore, celkem, href }: { nazev: string; skore: number; celkem: number; href?: string }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        {href ? (
          <a href={href} className="text-sm font-medium text-primarni hover:underline">
            {nazev}
          </a>
        ) : (
          <span className="text-sm">{nazev}</span>
        )}
        <span className="shrink-0 font-mono text-sm font-semibold">
          {skore} / {celkem}
        </span>
      </div>
      <div className="mt-2">
        <Pruh hodnota={skore} max={celkem} barva="spravne" popis={`${nazev}: správně ${skore} z ${celkem}`} />
      </div>
    </>
  );
}
