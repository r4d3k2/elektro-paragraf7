// #/zkouska – zkouška nanečisto (Fáze 4): 20 otázek ze všech kapitol, poměrně (z každé aspoň jedna),
// seřazené podle kapitol a podtémat. Standardně jen otázky bez faktů „overit“, přepínač „zahrnout
// neověřené“. Přednost mají otázky s horší úspěšností. Bez zpětné vazby během zkoušky, hranice 80 %,
// výsledek po kapitolách, rozbor s vysvětleními a historie pokusů. Výběr otázek je v lib/zkouska.ts.
import { useEffect, useMemo, useState } from "react";
import { KAPITOLY } from "../data/kapitoly";
import type { Otazka } from "../data/typy";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { BehTestu, RadekVysledku, RozborTestu, VysledekSkore } from "../components/TestCasti";
import { nadpisSekce, plocha, tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { formatDatum, procenta, tvar } from "../lib/format";
import { najdiOtazku, odkazNaukyOtazky, popisOtazky } from "../lib/obsah";
import { jeSpravnaOdpoved, type Odpoved } from "../lib/odpovedi";
import { aktualniPokrok, pokrok, usePokrok } from "../lib/progress";
import { minimumProUspech, uspel } from "../lib/test";
import {
  kandidatiZkousky,
  nactiRozpracovanou,
  POCET_OTAZEK_ZKOUSKY,
  smazRozpracovanou,
  ulozRozpracovanou,
  vyberOtazkyZkousky,
  type RozpracovanaZkouska
} from "../lib/zkouska";

interface Vysledek {
  otazky: Otazka[];
  odpovedi: Partial<Record<string, Odpoved>>;
  neoverene: boolean;
}

function otazkyZkousky(ids: string[]): Otazka[] {
  return ids.map(najdiOtazku).filter((o): o is Otazka => o !== undefined);
}

export function Zkouska() {
  const [beh, setBeh] = useState<RozpracovanaZkouska | null>(() => nactiRozpracovanou() ?? null);
  const [vysledek, setVysledek] = useState<Vysledek | null>(null);
  const [neoverene, setNeoverene] = useState(() => beh?.neoverene ?? false);

  useEffect(() => {
    pokrok.nastavPosledniMisto("#/zkouska");
  }, []);

  function zacni(sNeoverenymi: boolean) {
    const zkouska: RozpracovanaZkouska = {
      ids: vyberOtazkyZkousky(aktualniPokrok(), sNeoverenymi).map((o) => o.id),
      odpovedi: {},
      index: 0,
      neoverene: sNeoverenymi
    };
    ulozRozpracovanou(zkouska);
    setVysledek(null);
    setBeh(zkouska);
    window.scrollTo({ top: 0 });
  }

  function zmen(zkouska: RozpracovanaZkouska) {
    ulozRozpracovanou(zkouska);
    setBeh(zkouska);
  }

  function zrus() {
    smazRozpracovanou();
    setBeh(null);
    window.scrollTo({ top: 0 });
  }

  function vyhodnot(zkouska: RozpracovanaZkouska) {
    const otazky = otazkyZkousky(zkouska.ids);
    pokrok.dokonciZkousku(
      otazky.map((o) => ({ idOtazky: o.id, kapitola: o.kapitola, spravne: jeSpravnaOdpoved(o, zkouska.odpovedi[o.id]) })),
      zkouska.neoverene
    );
    smazRozpracovanou();
    setBeh(null);
    setVysledek({ otazky, odpovedi: zkouska.odpovedi, neoverene: zkouska.neoverene });
    window.scrollTo({ top: 0 });
  }

  return (
    <Layout titulek="Zkouška nanečisto" zpet={{ href: "#/", popis: "Domů" }} stitek="Zkouška nanečisto">
      {vysledek ? (
        <VysledekZkousky vysledek={vysledek} onZnovu={() => zacni(vysledek.neoverene)} />
      ) : beh ? (
        <BehTestu
          druh="zkouska"
          otazky={otazkyZkousky(beh.ids)}
          test={beh}
          popisOtazky={popisOtazky}
          onZmena={zmen}
          onVyhodnot={vyhodnot}
          onZrus={zrus}
        />
      ) : (
        <UvodZkousky neoverene={neoverene} onNeoverene={setNeoverene} onStart={() => zacni(neoverene)} />
      )}
    </Layout>
  );
}

// ─── Úvod: pravidla, přepínač neověřených a historie pokusů ─────────────

interface UvodProps {
  neoverene: boolean;
  onNeoverene: (hodnota: boolean) => void;
  onStart: () => void;
}

function UvodZkousky({ neoverene, onNeoverene, onStart }: UvodProps) {
  const stav = usePokrok();
  const kandidati = useMemo(() => kandidatiZkousky(neoverene), [neoverene]);
  const bezNeoverenych = useMemo(() => kandidatiZkousky(false).reduce((s, k) => s + k.otazky.length, 0), []);
  const sNeoverenymi = useMemo(() => kandidatiZkousky(true).reduce((s, k) => s + k.otazky.length, 0), []);
  const vBance = kandidati.reduce((s, k) => s + k.otazky.length, 0);
  const celkem = Math.min(POCET_OTAZEK_ZKOUSKY, vBance);
  const pokusy = stav.zkousky;
  const posledni = [...pokusy].reverse().slice(0, 10);
  const nejlepsi = pokusy.reduce((max, z) => Math.max(max, procenta(z.skore, z.celkem)), 0);
  const uspesnych = pokusy.filter((z) => uspel(z.skore, z.celkem)).length;

  return (
    <>
      <p className="font-mono text-sm text-tlumeny">Všechny kapitoly</p>
      <h1 className="mt-1 text-2xl leading-tight font-bold">Zkouška nanečisto</h1>
      <p className="mt-1 text-tlumeny">Ověřte si celou látku najednou, bez nápovědy během odpovídání.</p>

      <ul className={`${plocha} mt-5 space-y-2.5 p-4`}>
        <li className="flex gap-2.5">
          <Icon nazev="test" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>
            <span className="font-mono font-semibold">{celkem}</span> {tvar(celkem, "otázka", "otázky", "otázek")}{" "}
            {kandidati.length === KAPITOLY.length ? "ze všech kapitol" : `z ${kandidati.length} kapitol`}, z každé poměrně
            k počtu otázek (aspoň jedna), seřazených podle kapitol a podtémat.
          </span>
        </li>
        <li className="flex gap-2.5">
          <Icon nazev="procvic" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>Přednost mají otázky, které vám zatím jdou hůř.</span>
        </li>
        <li className="flex gap-2.5">
          <Icon nazev="info" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>Správnost se ukáže až na konci, spolu s výsledkem po kapitolách a rozborem každé otázky.</span>
        </li>
        <li className="flex gap-2.5">
          <Icon nazev="spravne" size={20} className="mt-0.5 shrink-0 text-primarni" />
          <span>
            Úspěch od <span className="font-mono font-semibold">80 %</span> ({minimumProUspech(celkem)} z {celkem}).
          </span>
        </li>
      </ul>

      <label className={`${plocha} mt-4 flex min-h-11 cursor-pointer items-start gap-3 p-4`}>
        <input
          type="checkbox"
          checked={neoverene}
          onChange={(e) => onNeoverene(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-primarni"
          aria-describedby="neoverene-popis"
        />
        <span>
          <span className="font-semibold">Zahrnout neověřené otázky</span>
          <span id="neoverene-popis" className="mt-0.5 block text-sm text-tlumeny">
            Otázky s odznakem „Ověřit v normě“ se standardně do zkoušky nezařazují. Bez nich je k dispozici{" "}
            <span className="font-mono">{bezNeoverenych}</span> otázek, s nimi <span className="font-mono">{sNeoverenymi}</span>.
          </span>
        </span>
      </label>

      <button type="button" onClick={onStart} disabled={celkem === 0} className={`${tlacitkoPrimarni} mt-5 w-full`}>
        <Icon nazev="start" size={18} />
        Začít zkoušku
      </button>

      <section className="mt-8">
        <h2 className={nadpisSekce}>Historie pokusů</h2>
        {posledni.length === 0 ? (
          <p className="mt-2 text-sm text-tlumeny">Zkoušku nanečisto jste zatím neskládali.</p>
        ) : (
          <>
            <p className="mt-2 text-sm">
              Nejlepší výsledek: <span className="font-mono font-semibold">{nejlepsi} %</span> · úspěšné:{" "}
              <span className="font-mono">
                {uspesnych} z {pokusy.length}
              </span>
            </p>
            <ul className="mt-2 space-y-2">
              {posledni.map((z, i) => {
                const ok = uspel(z.skore, z.celkem);
                return (
                  <li key={`${z.kdy}-${i}`}>
                    <details className={`${plocha} group`}>
                      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                        <Icon
                          nazev={ok ? "spravne" : "spatne"}
                          size={20}
                          className={`shrink-0 ${ok ? "text-spravne" : "text-spatne"}`}
                          title={ok ? "Úspěch" : "Neúspěch"}
                        />
                        <span className="min-w-0 flex-1 text-sm">
                          {formatDatum(z.kdy)}
                          {z.neoverene && <span className="block text-xs text-tlumeny">včetně neověřených</span>}
                        </span>
                        <span className="font-mono text-sm font-semibold">
                          {z.skore} / {z.celkem} · {procenta(z.skore, z.celkem)} %
                        </span>
                        <Icon
                          nazev="vpred"
                          size={16}
                          className="shrink-0 text-tlumeny transition-transform duration-150 group-open:rotate-90"
                        />
                      </summary>
                      <ul className="space-y-1 border-t border-hrana p-3">
                        {KAPITOLY.filter((k) => z.kapitoly[k.id]).map((k) => {
                          const v = z.kapitoly[k.id];
                          return (
                            <li key={k.id} className="flex justify-between gap-3 text-sm">
                              <span className="min-w-0 truncate">
                                {k.cislo}. {k.nazev}
                              </span>
                              <span className="shrink-0 font-mono">
                                {v.skore} / {v.celkem}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
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

function VysledekZkousky({ vysledek, onZnovu }: { vysledek: Vysledek; onZnovu: () => void }) {
  const { otazky, odpovedi } = vysledek;
  const celkem = otazky.length;
  const skore = otazky.filter((o) => jeSpravnaOdpoved(o, odpovedi[o.id])).length;
  const ok = uspel(skore, celkem);
  const chyb = celkem - skore;

  const poKapitolach = KAPITOLY.map((k) => {
    const vKapitole = otazky.filter((o) => o.kapitola === k.id);
    return {
      kapitola: k,
      celkem: vKapitole.length,
      spravne: vKapitole.filter((o) => jeSpravnaOdpoved(o, odpovedi[o.id])).length
    };
  }).filter((k) => k.celkem > 0);

  return (
    <section aria-labelledby="vysledek-nadpis">
      <p className="font-mono text-sm text-tlumeny">
        Zkouška nanečisto{vysledek.neoverene ? " · včetně neověřených" : ""}
      </p>
      <h1 id="vysledek-nadpis" className="mt-1 text-2xl font-bold">
        Výsledek zkoušky
      </h1>

      <VysledekSkore skore={skore} celkem={celkem} ok={ok} />

      <section className="mt-6">
        <h2 className={nadpisSekce}>Podle kapitol</h2>
        <ul className="mt-2 space-y-2">
          {poKapitolach.map((k) => (
            <li key={k.kapitola.id} className={`${plocha} p-3`}>
              <RadekVysledku
                nazev={`${k.kapitola.cislo}. ${k.kapitola.nazev}`}
                skore={k.spravne}
                celkem={k.celkem}
                href={`#/k/${k.kapitola.id}`}
              />
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 grid gap-3">
        {chyb > 0 && (
          <a href="#/chyby" className={tlacitkoPrimarni}>
            <Icon nazev="obnovit" size={18} />
            Opakovat chyby
          </a>
        )}
        <button type="button" onClick={onZnovu} className={chyb > 0 ? tlacitkoSekundarni : tlacitkoPrimarni}>
          <Icon nazev="zkouska" size={18} />
          Nová zkouška
        </button>
        <a href="#/prehled" className={tlacitkoSekundarni}>
          <Icon nazev="prehled" size={18} />
          Přehled pokroku
        </a>
      </div>

      <RozborTestu otazky={otazky} odpovedi={odpovedi} popisOtazky={popisOtazky} odkazNauka={odkazNaukyOtazky} />
    </section>
  );
}
