// #/k/:id/test – test kapitoly: 10 otázek (nebo všechny, je-li jich méně), pokrývá všechna podtémata,
// seřazené podle podtémat. Zpětná vazba až na konci, hranice úspěchu 80 %. Výsledek se uloží do pokroku,
// rozbor ukáže vysvětlení u všech možností. Rozpracovaný test přežije obnovení stránky (lib/test.ts).
// Test obsahuje otázky obou typů: „vyber“ i „poradi“.
import { useEffect, useState } from "react";
import type { Kapitola } from "../data/kapitoly";
import type { ObsahKapitoly, Otazka } from "../data/typy";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { BehTestu, RadekVysledku, RozborTestu, VysledekSkore } from "../components/TestCasti";
import { nadpisSekce, plocha, tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { nejblizsiKarta } from "../lib/fakta";
import { formatDatum, procenta } from "../lib/format";
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
        <BehTestu
          druh="test"
          otazky={otazkyTestu(obsah, beh.ids)}
          test={beh}
          popisOtazky={(o) => nazevPodtematu(obsah, o.podtema)}
          onZmena={zmen}
          onVyhodnot={vyhodnot}
          onZrus={zrus}
        />
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

      <VysledekSkore skore={skore} celkem={celkem} ok={ok} />

      <section className="mt-6">
        <h2 className={nadpisSekce}>Podle podtémat</h2>
        <ul className="mt-2 space-y-2">
          {poPodtematech.map((p) => (
            <li key={p.id} className={`${plocha} p-3`}>
              <RadekVysledku nazev={p.nazev} skore={p.spravne} celkem={p.celkem} />
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

      <RozborTestu
        otazky={otazky}
        odpovedi={odpovedi}
        popisOtazky={(o) => nazevPodtematu(obsah, o.podtema)}
        odkazNauka={(o) => {
          const karta = nejblizsiKarta(obsah.lekce, o);
          return karta ? `#${zaklad}/nauka/${karta.poradi}` : undefined;
        }}
      />
    </section>
  );
}
