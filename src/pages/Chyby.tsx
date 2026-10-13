// #/chyby – opakování chyb (Fáze 4): otázky, na které byla poslední odpověď špatná (z procvičování,
// testu kapitoly i zkoušky nanečisto), po kapitolách.
// #/chyby/procvic?kapitola=… – procvičení jen chybných otázek: všech, nebo z jedné kapitoly.
// Seznam se při začátku procvičování „zamrazí“, opravená otázka tedy nezmizí pod rukou.
import { useEffect, useState } from "react";
import type { Kapitola } from "../data/kapitoly";
import type { Otazka } from "../data/typy";
import { Icon } from "../components/Icon";
import { CisloKapitoly } from "../components/KapitolaKarta";
import { Layout } from "../components/Layout";
import { OdznakOverit } from "../components/OdznakOverit";
import { OtazkaView } from "../components/OtazkaView";
import { Pruh } from "../components/Pruh";
import { nadpisSekce, plocha, tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { maOverit } from "../lib/fakta";
import { formatDatum, tvar } from "../lib/format";
import { najdiKapitolu, nazevPodtematu, odkazNaukyOtazky, popisOtazky } from "../lib/obsah";
import { chybyPoKapitolach } from "../lib/prehled";
import { aktualniPokrok, pokrok, usePokrok } from "../lib/progress";
import { odkaz } from "../lib/route";

interface Props {
  procvic: boolean;
  dotaz: URLSearchParams;
}

export function Chyby({ procvic, dotaz }: Props) {
  const kapitola = procvic ? najdiKapitolu(dotaz.get("kapitola") ?? "") : undefined;
  return (
    <Layout
      titulek="Opakování chyb"
      zpet={procvic ? { href: "#/chyby", popis: "Chyby" } : { href: "#/", popis: "Domů" }}
      stitek="Opakování chyb"
    >
      {procvic ? <ProcvicovaniChyb kapitola={kapitola} /> : <PrehledChyb />}
    </Layout>
  );
}

// ─── Přehled chyb po kapitolách ─────────────────────────────────────────

function PrehledChyb() {
  const stav = usePokrok();
  const poKapitolach = chybyPoKapitolach(stav);
  const celkem = poKapitolach.reduce((s, k) => s + k.otazky.length, 0);

  return (
    <>
      <h1 className="text-2xl font-bold">Opakování chyb</h1>
      <p className="mt-1 text-tlumeny">
        Otázky, na které jste naposledy odpověděli špatně, ať v procvičování, testu kapitoly, nebo zkoušce nanečisto.
        Po správné odpovědi otázka ze seznamu zmizí.
      </p>

      {celkem === 0 ? (
        <div className={`${plocha} mt-6 p-5 text-center`}>
          <Icon nazev="spravne" size={28} className="mx-auto text-spravne" />
          <p className="mt-2 font-semibold">Žádné chyby k opakování</p>
          <p className="mt-1 text-sm text-tlumeny">
            {Object.keys(stav.otazky).length === 0
              ? "Zatím jste neodpověděli na žádnou otázku. Chyby se tu objeví, jakmile začnete procvičovat."
              : "Všechny otázky, na které jste odpovídali, máte naposledy správně."}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href="#/" className={tlacitkoPrimarni}>
              Kapitoly
            </a>
            <a href="#/zkouska" className={tlacitkoSekundarni}>
              Zkouška nanečisto
            </a>
          </div>
        </div>
      ) : (
        <>
          <a href="#/chyby/procvic" className={`${tlacitkoPrimarni} mt-5 w-full`}>
            <Icon nazev="obnovit" size={18} />
            Procvičit všechny chyby ({celkem})
          </a>

          <h2 className={`${nadpisSekce} mt-8`}>Podle kapitol</h2>
          <ol className="mt-3 space-y-3">
            {poKapitolach.map(({ kapitola, obsah, otazky }) => (
              <li key={kapitola.id} className={`${plocha} p-4`}>
                <div className="flex gap-3">
                  <CisloKapitoly cislo={kapitola.cislo} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{kapitola.nazev}</h3>
                    <p className="mt-0.5 font-mono text-sm text-spatne">
                      {otazky.length} {tvar(otazky.length, "chyba", "chyby", "chyb")}
                    </p>
                  </div>
                </div>
                <a
                  href={odkaz("/chyby/procvic", { kapitola: kapitola.id })}
                  className={`${tlacitkoSekundarni} mt-3 w-full`}
                >
                  <Icon nazev="procvic" size={18} className="text-primarni" />
                  Procvičit chyby z kapitoly
                </a>
                <details className="group mt-2">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-primarni [&::-webkit-details-marker]:hidden">
                    <Icon nazev="vpred" size={16} className="transition-transform duration-150 group-open:rotate-90" />
                    Zobrazit otázky
                  </summary>
                  <ul className="mt-1 space-y-2">
                    {otazky.map((o) => {
                      const z = stav.otazky[o.id];
                      return (
                        <li key={o.id} className="rounded-lg bg-plocha-2 p-3 text-sm">
                          <p className="text-xs text-tlumeny">{nazevPodtematu(obsah, o.podtema)}</p>
                          <p className="mt-0.5">{o.zadani}</p>
                          <p className="mt-1 font-mono text-xs text-tlumeny">
                            správně {z?.spravne ?? 0} z {z?.pokusy ?? 0} pokusů
                            {z ? ` · naposledy ${formatDatum(z.kdy)}` : ""}
                          </p>
                          {maOverit(o.fakta) && (
                            <span className="mt-1.5 inline-block">
                              <OdznakOverit />
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </>
      )}

      <p className="mt-8 text-sm text-tlumeny">
        Chyby z jedné kapitoly najdete i v Procvičování kapitoly v režimu Chyby.{" "}
        <a href="#/prehled" className="font-medium text-primarni underline">
          Přehled pokroku
        </a>
      </p>
    </>
  );
}

// ─── Procvičení chyb ────────────────────────────────────────────────────

function ProcvicovaniChyb({ kapitola }: { kapitola: Kapitola | undefined }) {
  const [kolo, setKolo] = useState(0);
  return <SezeniChyb key={kolo} kapitola={kapitola} onZnovu={() => setKolo((k) => k + 1)} />;
}

function SezeniChyb({ kapitola, onZnovu }: { kapitola: Kapitola | undefined; onZnovu: () => void }) {
  const [seznam] = useState<Otazka[]>(() => chybyPoKapitolach(aktualniPokrok(), kapitola?.id).flatMap((k) => k.otazky));
  const [index, setIndex] = useState(0);
  const [vysledky, setVysledky] = useState<Record<string, boolean>>({});
  const otazka = seznam[index] as Otazka | undefined;
  const odpovezeno = otazka ? otazka.id in vysledky : false;
  const popisVyberu = kapitola ? `Chyby z kapitoly ${kapitola.cislo} · ${kapitola.nazev}` : "Chyby ze všech kapitol";

  useEffect(() => {
    pokrok.nastavPosledniMisto(odkaz("/chyby/procvic", { kapitola: kapitola?.id }));
  }, [kapitola]);

  function zaznamenej(spravne: boolean) {
    if (!otazka || otazka.id in vysledky) return;
    pokrok.zaznamenejOdpoved(otazka.id, spravne);
    setVysledky((v) => ({ ...v, [otazka.id]: spravne }));
  }

  function dalsi() {
    setIndex((i) => i + 1);
    window.scrollTo({ top: 0 });
  }

  if (seznam.length === 0) {
    return (
      <div className={`${plocha} p-5 text-center`}>
        <h1 className="font-semibold">Žádné chyby k procvičení</h1>
        <p className="mt-1 text-sm text-tlumeny">
          {kapitola ? `V kapitole ${kapitola.cislo} teď nemáte chybně zodpovězené otázky.` : "Teď nemáte chybně zodpovězené otázky."}
        </p>
        <a href="#/chyby" className={`${tlacitkoPrimarni} mt-4`}>
          Zpět na opakování chyb
        </a>
      </div>
    );
  }

  if (!otazka) {
    const opraveno = seznam.filter((o) => vysledky[o.id] === true).length;
    const stale = seznam.filter((o) => vysledky[o.id] === false);
    return (
      <section aria-labelledby="souhrn-nadpis">
        <p className="font-mono text-sm text-tlumeny">{popisVyberu}</p>
        <h1 id="souhrn-nadpis" className="mt-1 text-2xl font-bold">
          Souhrn
        </h1>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-spravne/10 p-4 text-spravne">
            <p className="font-mono text-3xl font-semibold">{opraveno}</p>
            <p className="text-sm font-medium">opraveno</p>
          </div>
          <div className="rounded-xl bg-spatne/10 p-4 text-spatne">
            <p className="font-mono text-3xl font-semibold">{stale.length}</p>
            <p className="text-sm font-medium">stále špatně</p>
          </div>
        </div>

        {stale.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold">Stále špatně</h2>
            <ul className="mt-2 space-y-2">
              {stale.map((o) => {
                const nauka = odkazNaukyOtazky(o);
                return (
                  <li key={o.id} className={`${plocha} p-3`}>
                    <p className="text-sm text-tlumeny">{popisOtazky(o)}</p>
                    <p className="mt-0.5">{o.zadani}</p>
                    {nauka && (
                      <a href={nauka} className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primarni">
                        <Icon nazev="nauka" size={16} />
                        Zpět do nauky
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-6 grid gap-3">
          {stale.length > 0 && (
            <button type="button" onClick={onZnovu} className={tlacitkoPrimarni}>
              <Icon nazev="obnovit" size={18} />
              Procvičit zbývající chyby
            </button>
          )}
          <a href="#/chyby" className={stale.length > 0 ? tlacitkoSekundarni : tlacitkoPrimarni}>
            Zpět na opakování chyb
          </a>
        </div>
      </section>
    );
  }

  const posledni = index === seznam.length - 1;
  return (
    <div>
      <h1 className="font-mono text-sm text-tlumeny">{popisVyberu}</h1>
      <div className="mt-3 flex items-center gap-3">
        <Pruh hodnota={index + 1} max={seznam.length} popis={`Otázka ${index + 1} z ${seznam.length}`} />
        <span className="shrink-0 font-mono text-sm text-tlumeny">
          {index + 1} / {seznam.length}
        </span>
      </div>

      <div className="mt-4">
        <OtazkaView
          key={otazka.id}
          otazka={otazka}
          nazevPodtematu={popisOtazky(otazka)}
          odkazNauka={odkazNaukyOtazky(otazka)}
          onOdpoved={zaznamenej}
        />
      </div>

      {odpovezeno && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-hrana bg-pozadi/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
          <div className="mx-auto flex max-w-[640px] items-center gap-3 px-4 py-3">
            <span className="font-mono text-sm text-tlumeny">
              {index + 1} / {seznam.length}
            </span>
            <button type="button" onClick={dalsi} className={`${tlacitkoPrimarni} flex-1`}>
              {posledni ? "Zobrazit souhrn" : "Další"}
              <Icon nazev="sipkaVpravo" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
