// #/k/:id/procvic?podtema=…&rezim=vse|chyby|nove – procvičování s okamžitou zpětnou vazbou.
// Seznam otázek se sestaví při otevření (v pořadí z dat) a během relace se nemění.
import { useEffect, useMemo, useState } from "react";
import type { Kapitola } from "../data/kapitoly";
import type { ObsahKapitoly, OtazkaVyber } from "../data/typy";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { OtazkaView } from "../components/OtazkaView";
import { Pruh } from "../components/Pruh";
import { nadpisSekce, plocha, tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { nejblizsiKarta } from "../lib/fakta";
import { nazevPodtematu } from "../lib/obsah";
import { aktualniPokrok, pocetChybnych, pocetNovych, pokrok, usePokrok } from "../lib/progress";
import { odkaz, prejdi } from "../lib/route";

type Rezim = "vse" | "chyby" | "nove";
const REZIMY: { id: Rezim; nazev: string }[] = [
  { id: "vse", nazev: "Vše" },
  { id: "chyby", nazev: "Chyby" },
  { id: "nove", nazev: "Nové" }
];

interface Props {
  kapitola: Kapitola;
  obsah: ObsahKapitoly;
  dotaz: URLSearchParams;
}

export function Procvicovani({ kapitola, obsah, dotaz }: Props) {
  const stav = usePokrok();
  const zaklad = `/k/${kapitola.id}`;
  const podtemaZDotazu = dotaz.get("podtema") ?? "";
  const podtema = obsah.podtemata.some((p) => p.id === podtemaZDotazu) ? podtemaZDotazu : "";
  const rezimZDotazu = dotaz.get("rezim");
  const rezim: Rezim = rezimZDotazu === "chyby" || rezimZDotazu === "nove" ? rezimZDotazu : "vse";
  const [kolo, setKolo] = useState(0);

  // Typ „poradi“ přibude ve Fázi 3; teď se procvičují jen otázky „vyber“.
  const vsechny = useMemo(
    () =>
      obsah.otazky.filter((o): o is OtazkaVyber => o.typ === "vyber" && (podtema === "" || o.podtema === podtema)),
    [obsah, podtema]
  );
  const idVsech = vsechny.map((o) => o.id);

  function zmenFiltr(novePodtema: string, novyRezim: Rezim) {
    prejdi(odkaz(`${zaklad}/procvic`, { podtema: novePodtema, rezim: novyRezim === "vse" ? undefined : novyRezim }), {
      nahradit: true
    });
  }

  return (
    <Layout
      titulek={`Procvičování – ${kapitola.nazev}`}
      zpet={{ href: `#${zaklad}`, popis: `Kapitola ${kapitola.cislo}` }}
      stitek="Procvičování"
    >
      <h1 className="sr-only">Procvičování – kapitola {kapitola.cislo}</h1>

      <div className="space-y-3">
        <label className="block">
          <span className={nadpisSekce}>Podtéma</span>
          <select
            value={podtema}
            onChange={(e) => zmenFiltr(e.target.value, rezim)}
            className="mt-1.5 block min-h-11 w-full rounded-lg border border-hrana bg-plocha px-3 text-base text-text"
          >
            <option value="">Všechna podtémata</option>
            {obsah.podtemata.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nazev}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className={nadpisSekce}>Režim</legend>
          <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-lg border border-hrana bg-plocha p-1">
            {REZIMY.map((r) => {
              const pocet =
                r.id === "vse" ? idVsech.length : r.id === "chyby" ? pocetChybnych(stav, idVsech) : pocetNovych(stav, idVsech);
              const aktivni = r.id === rezim;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={aktivni}
                  onClick={() => {
                    if (!aktivni) zmenFiltr(podtema, r.id);
                  }}
                  className={`min-h-11 rounded-md px-2 text-sm font-medium transition-colors duration-150 ${
                    aktivni ? "bg-primarni text-na-primarni" : "text-text hover:bg-plocha-2"
                  }`}
                >
                  {r.nazev} <span className="font-mono text-xs opacity-80">({pocet})</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <Sezeni
        key={`${podtema}|${rezim}|${kolo}`}
        kapitola={kapitola}
        obsah={obsah}
        vsechny={vsechny}
        podtema={podtema}
        rezim={rezim}
        // Návrat přes „Pokračovat“ platí jen pro první kolo; „Znovu“ začíná od první otázky.
        startId={kolo === 0 ? dotaz.get("otazka") : null}
        onZnovu={(novyRezim) => (novyRezim === rezim ? setKolo((k) => k + 1) : zmenFiltr(podtema, novyRezim))}
      />
    </Layout>
  );
}

interface SezeniProps {
  kapitola: Kapitola;
  obsah: ObsahKapitoly;
  vsechny: OtazkaVyber[];
  podtema: string;
  rezim: Rezim;
  startId: string | null;
  onZnovu: (rezim: Rezim) => void;
}

function Sezeni({ kapitola, obsah, vsechny, podtema, rezim, startId, onZnovu }: SezeniProps) {
  const zaklad = `/k/${kapitola.id}`;

  // Seznam se „zamrazí“ při začátku relace – zodpovězená otázka z režimu Chyby nebo Nové nezmizí pod rukou.
  const [seznam] = useState<OtazkaVyber[]>(() => {
    const s = aktualniPokrok();
    if (rezim === "chyby") return vsechny.filter((o) => s.otazky[o.id]?.posledni === "chyba");
    if (rezim === "nove") return vsechny.filter((o) => !s.otazky[o.id]);
    return vsechny;
  });
  const [index, setIndex] = useState(() => {
    const i = startId ? seznam.findIndex((o) => o.id === startId) : -1;
    return i >= 0 ? i : 0;
  });
  const [vysledky, setVysledky] = useState<Record<string, boolean>>({});

  const otazka = seznam[index] as OtazkaVyber | undefined;
  const odpovezeno = otazka ? otazka.id in vysledky : false;
  const hotovo = index >= seznam.length;

  useEffect(() => {
    if (!otazka) return;
    pokrok.nastavPosledniMisto(
      odkaz(`${zaklad}/procvic`, {
        podtema: podtema || undefined,
        rezim: rezim === "vse" ? undefined : rezim,
        otazka: otazka.id
      })
    );
  }, [otazka, zaklad, podtema, rezim]);

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
      <div className={`${plocha} mt-6 p-5 text-center`}>
        <p className="font-semibold">
          {rezim === "chyby" ? "Žádné chybně zodpovězené otázky." : "Všechny otázky už máte vyzkoušené."}
        </p>
        <p className="mt-1 text-sm text-tlumeny">
          {rezim === "chyby"
            ? "V tomto výběru teď nemáte co opravovat."
            : "Pokračujte v režimu Vše nebo si projděte chyby."}
        </p>
        <button type="button" onClick={() => onZnovu("vse")} className={`${tlacitkoPrimarni} mt-4`}>
          Procvičit vše
        </button>
      </div>
    );
  }

  if (hotovo || !otazka) {
    const chybne = seznam.filter((o) => vysledky[o.id] === false);
    const spravne = seznam.filter((o) => vysledky[o.id] === true).length;
    return (
      <section className="mt-6" aria-labelledby="souhrn-nadpis">
        <h2 id="souhrn-nadpis" className="text-xl font-bold">
          Souhrn
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-spravne/10 p-4 text-spravne">
            <p className="font-mono text-3xl font-semibold">{spravne}</p>
            <p className="text-sm font-medium">správně</p>
          </div>
          <div className="rounded-xl bg-spatne/10 p-4 text-spatne">
            <p className="font-mono text-3xl font-semibold">{chybne.length}</p>
            <p className="text-sm font-medium">špatně</p>
          </div>
        </div>

        {chybne.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Chybné odpovědi</h3>
            <ul className="mt-2 space-y-2">
              {chybne.map((o) => {
                const karta = nejblizsiKarta(obsah.lekce, o);
                return (
                  <li key={o.id} className={`${plocha} p-3`}>
                    <p className="text-sm text-tlumeny">{nazevPodtematu(obsah, o.podtema)}</p>
                    <p className="mt-0.5">{o.zadani}</p>
                    {karta && (
                      <a
                        href={`#${zaklad}/nauka/${karta.poradi}`}
                        className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primarni"
                      >
                        <Icon nazev="nauka" size={16} />
                        Nauka: {karta.karta.nadpis}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-6 grid gap-3">
          {chybne.length > 0 && (
            <button type="button" onClick={() => onZnovu("chyby")} className={tlacitkoPrimarni}>
              <Icon nazev="obnovit" size={18} />
              Procvičit chyby
            </button>
          )}
          <button type="button" onClick={() => onZnovu("vse")} className={tlacitkoSekundarni}>
            Znovu všechny otázky
          </button>
          <a href={`#${zaklad}`} className={tlacitkoSekundarni}>
            Zpět na kapitolu
          </a>
        </div>
      </section>
    );
  }

  const karta = nejblizsiKarta(obsah.lekce, otazka);
  const posledni = index === seznam.length - 1;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <Pruh hodnota={index + 1} max={seznam.length} popis={`Otázka ${index + 1} z ${seznam.length}`} />
        <span className="shrink-0 font-mono text-sm text-tlumeny">
          {index + 1} / {seznam.length}
        </span>
      </div>

      <div className="mt-4">
        <OtazkaView
          key={otazka.id}
          otazka={otazka}
          nazevPodtematu={nazevPodtematu(obsah, otazka.podtema)}
          odkazNauka={karta ? `#${zaklad}/nauka/${karta.poradi}` : undefined}
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
