// #/k/:id/test – test kapitoly: 10 otázek (nebo všechny, je-li jich méně), pokrývá všechna podtémata,
// seřazené podle podtémat. Zpětná vazba až na konci, hranice úspěchu 80 %. Výsledek se uloží do pokroku,
// rozbor ukáže vysvětlení u všech možností. Rozpracovaný test přežije obnovení stránky (lib/test.ts).
// Test obsahuje otázky obou typů: „vyber“ i „poradi“.
import { useEffect, useMemo, useState } from "react";
import type { Kapitola } from "../data/kapitoly";
import type { Moznost, ObsahKapitoly, Otazka, OtazkaPoradi, OtazkaVyber } from "../data/typy";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { OdznakOverit } from "../components/OdznakOverit";
import { HlavickaOtazky } from "../components/OtazkaCasti";
import { OtazkaView, PISMENA, useZobrazeneMoznosti } from "../components/OtazkaView";
import { PoradiSeznam, useVychoziPoradi } from "../components/PoradiView";
import { Pruh } from "../components/Pruh";
import { nadpisSekce, plocha, tlacitkoPrimarni, tlacitkoSekundarni, tlacitkoTiche } from "../components/styly";
import { maOverit, nejblizsiKarta } from "../lib/fakta";
import { nazevPodtematu } from "../lib/obsah";
import { jeSpravnaOdpoved, type Odpoved } from "../lib/odpovedi";
import { pokrok, usePokrok } from "../lib/progress";
import { odkaz } from "../lib/route";
import {
  delkaTestu,
  minimumProUspech,
  nactiRozpracovany,
  otazkyProTest,
  smazRozpracovany,
  ulozRozpracovany,
  uspel,
  vyberOtazky,
  type RozpracovanyTest
} from "../lib/test";

interface Props {
  kapitola: Kapitola;
  obsah: ObsahKapitoly;
}

interface Vysledek {
  otazky: Otazka[];
  odpovedi: Partial<Record<string, Odpoved>>;
}

function procenta(skore: number, celkem: number): number {
  return celkem > 0 ? Math.round((skore / celkem) * 100) : 0;
}

function formatDatum(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

function otazkyTestu(obsah: ObsahKapitoly, ids: string[]): Otazka[] {
  return ids.map((id) => obsah.otazky.find((o) => o.id === id)).filter((o): o is Otazka => o !== undefined);
}

export function TestKapitoly({ kapitola, obsah }: Props) {
  const zaklad = `/k/${kapitola.id}`;
  const [beh, setBeh] = useState<RozpracovanyTest | null>(() => nactiRozpracovany(kapitola.id, obsah) ?? null);
  const [vysledek, setVysledek] = useState<Vysledek | null>(null);

  useEffect(() => {
    pokrok.nastavPosledniMisto(`#${zaklad}/test`);
  }, [zaklad]);

  function zacni() {
    const test: RozpracovanyTest = { ids: vyberOtazky(obsah).map((o) => o.id), odpovedi: {}, index: 0 };
    ulozRozpracovany(kapitola.id, test);
    setVysledek(null);
    setBeh(test);
    window.scrollTo({ top: 0 });
  }

  function zmen(test: RozpracovanyTest) {
    ulozRozpracovany(kapitola.id, test);
    setBeh(test);
  }

  function zrus() {
    smazRozpracovany(kapitola.id);
    setBeh(null);
    window.scrollTo({ top: 0 });
  }

  function vyhodnot(test: RozpracovanyTest) {
    const otazky = otazkyTestu(obsah, test.ids);
    pokrok.dokonciTest(
      kapitola.id,
      otazky.map((o) => ({ idOtazky: o.id, spravne: jeSpravnaOdpoved(o, test.odpovedi[o.id]) }))
    );
    smazRozpracovany(kapitola.id);
    setBeh(null);
    setVysledek({ otazky, odpovedi: test.odpovedi });
    window.scrollTo({ top: 0 });
  }

  return (
    <Layout
      titulek={`Test kapitoly – ${kapitola.nazev}`}
      zpet={{ href: `#${zaklad}`, popis: `Kapitola ${kapitola.cislo}` }}
      stitek="Test kapitoly"
    >
      {vysledek ? (
        <VysledekTestu kapitola={kapitola} obsah={obsah} vysledek={vysledek} onZnovu={zacni} />
      ) : beh ? (
        <BehTestu obsah={obsah} test={beh} onZmena={zmen} onVyhodnot={vyhodnot} onZrus={zrus} />
      ) : (
        <UvodTestu kapitola={kapitola} obsah={obsah} onStart={zacni} />
      )}
    </Layout>
  );
}

// ─── Úvod: pravidla a historie pokusů ───────────────────────────────────

function UvodTestu({ kapitola, obsah, onStart }: { kapitola: Kapitola; obsah: ObsahKapitoly; onStart: () => void }) {
  const stav = usePokrok();
  const pokusy = stav.testy[kapitola.id] ?? [];
  const celkem = delkaTestu(obsah);
  const podtemat = new Set(otazkyProTest(obsah).map((o) => o.podtema)).size;
  const posledni = [...pokusy].reverse().slice(0, 5);
  const nejlepsi = pokusy.reduce((max, t) => Math.max(max, procenta(t.skore, t.celkem)), 0);

  return (
    <>
      <p className="font-mono text-sm text-tlumeny">Kapitola {kapitola.cislo}</p>
      <h1 className="mt-1 text-2xl leading-tight font-bold">Test kapitoly</h1>
      <p className="mt-1 text-tlumeny">{kapitola.nazev}</p>

      <ul className={`${plocha} mt-5 space-y-2.5 p-4`}>
        <li className="flex gap-2.5">
          <Icon nazev="test" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>
            <span className="font-mono font-semibold">{celkem}</span> otázek ze všech {podtemat} podtémat, seřazených podle
            podtémat.
          </span>
        </li>
        <li className="flex gap-2.5">
          <Icon nazev="info" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>Správnost se ukáže až na konci, spolu s rozborem a vysvětlením u každé možnosti.</span>
        </li>
        <li className="flex gap-2.5">
          <Icon nazev="spravne" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>
            Úspěch od <span className="font-mono font-semibold">80 %</span> ({minimumProUspech(celkem)} z {celkem}). Test
            alespoň na 80 % spolu se všemi zvládnutými otázkami dává třetí hvězdičku kapitoly.
          </span>
        </li>
      </ul>

      <button type="button" onClick={onStart} className={`${tlacitkoPrimarni} mt-5 w-full`}>
        <Icon nazev="start" size={18} />
        Začít test
      </button>

      <section className="mt-8">
        <h2 className={nadpisSekce}>Předchozí pokusy</h2>
        {posledni.length === 0 ? (
          <p className="mt-2 text-sm text-tlumeny">Test jste zatím neskládali.</p>
        ) : (
          <>
            <p className="mt-2 text-sm">
              Nejlepší výsledek: <span className="font-mono font-semibold">{nejlepsi} %</span> · pokusů celkem:{" "}
              <span className="font-mono">{pokusy.length}</span>
            </p>
            <ul className="mt-2 space-y-2">
              {posledni.map((t, i) => {
                const ok = uspel(t.skore, t.celkem);
                return (
                  <li key={`${t.kdy}-${i}`} className={`${plocha} flex items-center gap-3 p-3`}>
                    <Icon
                      nazev={ok ? "spravne" : "spatne"}
                      size={20}
                      className={ok ? "text-spravne" : "text-spatne"}
                      title={ok ? "Úspěch" : "Neúspěch"}
                    />
                    <span className="flex-1 text-sm">{formatDatum(t.kdy)}</span>
                    <span className="font-mono text-sm font-semibold">
                      {t.skore} / {t.celkem} · {procenta(t.skore, t.celkem)} %
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </>
  );
}

// ─── Běh testu: odpovědi bez zpětné vazby ───────────────────────────────

interface BehProps {
  obsah: ObsahKapitoly;
  test: RozpracovanyTest;
  onZmena: (test: RozpracovanyTest) => void;
  onVyhodnot: (test: RozpracovanyTest) => void;
  onZrus: () => void;
}

function BehTestu({ obsah, test, onZmena, onVyhodnot, onZrus }: BehProps) {
  const [potvrditZruseni, setPotvrditZruseni] = useState(false);
  const otazky = useMemo(() => otazkyTestu(obsah, test.ids), [obsah, test.ids]);
  const otazka = otazky[test.index];
  if (!otazka) return null;

  const zvoleno = test.odpovedi[otazka.id];
  const posledni = test.index === otazky.length - 1;
  const zodpovezeno = otazky.filter((o) => test.odpovedi[o.id] !== undefined).length;
  const chybiJinde = otazky.some((o, i) => i !== test.index && test.odpovedi[o.id] === undefined);

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
            nazevPodtematu={nazevPodtematu(obsah, otazka.podtema)}
            zvoleno={Array.isArray(zvoleno) ? zvoleno : undefined}
            onZvol={(poradi) => onZmena({ ...test, odpovedi: { ...test.odpovedi, [otazka.id]: poradi } })}
          />
        ) : (
          <TestOtazka
            key={otazka.id}
            otazka={otazka}
            nazevPodtematu={nazevPodtematu(obsah, otazka.podtema)}
            zvoleno={typeof zvoleno === "string" ? zvoleno : undefined}
            onZvol={(id) => onZmena({ ...test, odpovedi: { ...test.odpovedi, [otazka.id]: id } })}
          />
        )}
      </div>

      <div className="mt-8 border-t border-hrana pt-4">
        {!potvrditZruseni ? (
          <button type="button" onClick={() => setPotvrditZruseni(true)} className={tlacitkoTiche}>
            Zrušit test bez vyhodnocení
          </button>
        ) : (
          <div className="rounded-xl border-2 border-spatne/60 p-4" role="alertdialog" aria-labelledby="zrusit-test">
            <p id="zrusit-test" className="font-semibold">
              Zrušit rozpracovaný test?
            </p>
            <p className="mt-1 text-sm text-tlumeny">Odpovědi se zahodí a výsledek se neuloží.</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onZrus}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-spatne px-4 font-medium text-plocha"
              >
                Zrušit test
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
              Vyhodnotit test
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
          <p className="mx-auto max-w-[640px] px-4 pb-2 text-center text-xs text-tlumeny">
            Zodpovězeno {zodpovezeno} z {otazky.length}. Vraťte se k otázkám bez odpovědi.
          </p>
        )}
      </div>
    </div>
  );
}

interface TestOtazkaProps {
  otazka: OtazkaVyber;
  nazevPodtematu: string;
  zvoleno: Moznost["id"] | undefined;
  onZvol: (id: Moznost["id"]) => void;
}

/** Otázka v testu: volbu lze měnit až do vyhodnocení, správnost se neukazuje. */
function TestOtazka({ otazka, nazevPodtematu, zvoleno, onZvol }: TestOtazkaProps) {
  const zobrazene = useZobrazeneMoznosti(otazka);
  return (
    <article aria-labelledby={`zadani-${otazka.id}`}>
      <HlavickaOtazky otazka={otazka} nazevPodtematu={nazevPodtematu} />
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
      <p className="mt-3 text-sm text-tlumeny">Odpověď můžete změnit až do vyhodnocení testu.</p>
    </article>
  );
}

interface TestOtazkaPoradiProps {
  otazka: OtazkaPoradi;
  nazevPodtematu: string;
  zvoleno: string[] | undefined;
  onZvol: (poradi: string[]) => void;
}

/**
 * Otázka na seřazení v testu: každý přesun se hned uloží jako odpověď. Pořadí lze přijmout i beze změny
 * tlačítkem „Potvrdit toto pořadí“. Správnost se neukazuje.
 */
function TestOtazkaPoradi({ otazka, nazevPodtematu, zvoleno, onZvol }: TestOtazkaPoradiProps) {
  const vychozi = useVychoziPoradi(otazka);
  const poradi = zvoleno ?? vychozi;
  return (
    <article aria-labelledby={`zadani-${otazka.id}`}>
      <HlavickaOtazky otazka={otazka} nazevPodtematu={nazevPodtematu} />
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
        <p className="mt-3 text-sm text-tlumeny">Pořadí je uložené. Měnit ho můžete až do vyhodnocení testu.</p>
      )}
    </article>
  );
}

// ─── Výsledek a rozbor ──────────────────────────────────────────────────

interface VysledekProps {
  kapitola: Kapitola;
  obsah: ObsahKapitoly;
  vysledek: Vysledek;
  onZnovu: () => void;
}

function VysledekTestu({ kapitola, obsah, vysledek, onZnovu }: VysledekProps) {
  const zaklad = `/k/${kapitola.id}`;
  const { otazky, odpovedi } = vysledek;
  const celkem = otazky.length;
  const skore = otazky.filter((o) => jeSpravnaOdpoved(o, odpovedi[o.id])).length;
  const ok = uspel(skore, celkem);
  const chyb = celkem - skore;

  const poPodtematech = obsah.podtemata
    .map((p) => {
      const vPodtematu = otazky.filter((o) => o.podtema === p.id);
      return {
        id: p.id,
        nazev: p.nazev,
        celkem: vPodtematu.length,
        spravne: vPodtematu.filter((o) => jeSpravnaOdpoved(o, odpovedi[o.id])).length
      };
    })
    .filter((p) => p.celkem > 0);

  return (
    <section aria-labelledby="vysledek-nadpis">
      <p className="font-mono text-sm text-tlumeny">Kapitola {kapitola.cislo} · Test kapitoly</p>
      <h1 id="vysledek-nadpis" className="mt-1 text-2xl font-bold">
        Výsledek testu
      </h1>

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

      <section className="mt-6">
        <h2 className={nadpisSekce}>Podle podtémat</h2>
        <ul className="mt-2 space-y-2">
          {poPodtematech.map((p) => (
            <li key={p.id} className={`${plocha} p-3`}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm">{p.nazev}</span>
                <span className="shrink-0 font-mono text-sm font-semibold">
                  {p.spravne} / {p.celkem}
                </span>
              </div>
              <div className="mt-2">
                <Pruh hodnota={p.spravne} max={p.celkem} barva="spravne" popis={`${p.nazev}: správně ${p.spravne} z ${p.celkem}`} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 grid gap-3">
        {chyb > 0 && (
          <a href={odkaz(`${zaklad}/procvic`, { rezim: "chyby" })} className={tlacitkoPrimarni}>
            <Icon nazev="obnovit" size={18} />
            Procvičit chyby
          </a>
        )}
        <button type="button" onClick={onZnovu} className={chyb > 0 ? tlacitkoSekundarni : tlacitkoPrimarni}>
          <Icon nazev="test" size={18} />
          Nový test
        </button>
        <a href={`#${zaklad}`} className={tlacitkoSekundarni}>
          Zpět na kapitolu
        </a>
      </div>

      <section className="mt-8" aria-labelledby="rozbor-nadpis">
        <h2 id="rozbor-nadpis" className="text-xl font-bold">
          Rozbor
        </h2>
        <p className="mt-1 text-sm text-tlumeny">
          Chybné odpovědi jsou rozbalené. Klepnutím rozbalíte i ostatní.
        </p>
        <ol className="mt-3 space-y-3">
          {otazky.map((o, i) => {
            const spravne = jeSpravnaOdpoved(o, odpovedi[o.id]);
            const karta = nejblizsiKarta(obsah.lekce, o);
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
                      nazevPodtematu={nazevPodtematu(obsah, o.podtema)}
                      odkazNauka={karta ? `#${zaklad}/nauka/${karta.poradi}` : undefined}
                      odpovedPredem={odpovedi[o.id]}
                    />
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </section>
    </section>
  );
}
