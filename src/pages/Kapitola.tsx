// #/k/:id – přehled kapitoly: cíle, předpisy, Nauka, Procvičování, Test kapitoly, podtémata.
import type { Kapitola as KapitolaTyp } from "../data/kapitoly";
import { Hvezdicky } from "../components/Hvezdicky";
import { Icon, type NazevIkony } from "../components/Icon";
import { CisloKapitoly } from "../components/KapitolaKarta";
import { Layout } from "../components/Layout";
import { Pruh } from "../components/Pruh";
import { nadpisSekce, plocha } from "../components/styly";
import { obsahKapitoly } from "../lib/obsah";
import { hvezdicky, nejlepsiTest, pocetPrectenych, pocetZvladnutych, usePokrok } from "../lib/progress";
import { odkaz } from "../lib/route";
import { delkaTestu } from "../lib/test";

interface DlazdiceProps {
  ikona: NazevIkony;
  nazev: string;
  popis: string;
  href?: string;
  hodnota?: number;
  max?: number;
}

function Dlazdice({ ikona, nazev, popis, href, hodnota, max }: DlazdiceProps) {
  const obsah = (
    <>
      <span className="flex items-center gap-2">
        <Icon nazev={href ? ikona : "zamek"} size={20} className={href ? "text-primarni" : "text-tlumeny"} />
        <span className={`font-semibold ${href ? "" : "text-tlumeny"}`}>{nazev}</span>
      </span>
      <span className="mt-1 block font-mono text-sm text-tlumeny">{popis}</span>
      {hodnota !== undefined && max !== undefined && (
        <span className="mt-2.5 block">
          <Pruh hodnota={hodnota} max={max} popis={`${nazev}: ${popis}`} />
        </span>
      )}
    </>
  );
  if (!href) {
    return (
      <div className="rounded-xl border border-dashed border-hrana p-4" aria-disabled="true">
        {obsah}
      </div>
    );
  }
  return (
    <a
      href={href}
      className={`${plocha} block p-4 transition-colors duration-150 hover:border-primarni active:bg-plocha-2`}
    >
      {obsah}
    </a>
  );
}

export function Kapitola({ kapitola }: { kapitola: KapitolaTyp }) {
  const stav = usePokrok();
  const obsah = obsahKapitoly(kapitola);
  const zpet = { href: "#/", popis: "Kapitoly" };

  const hlavicka = (
    <>
      <div className="flex items-center gap-3">
        <CisloKapitoly cislo={kapitola.cislo} aktivni={Boolean(obsah)} />
        <span className="font-mono text-sm text-tlumeny">Kapitola {kapitola.cislo}</span>
      </div>
      <h1 className="mt-3 text-2xl leading-tight font-bold">{kapitola.nazev}</h1>
      <p className="mt-1.5 text-tlumeny">{kapitola.kratce}</p>

      <section className="mt-5">
        <h2 className={nadpisSekce}>Cíle</h2>
        <ul className="mt-2 space-y-1.5">
          {kapitola.cile.map((cil) => (
            <li key={cil} className="flex gap-2">
              <Icon nazev="spravne" size={18} className="mt-0.5 shrink-0 text-primarni" />
              <span>{cil}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5">
        <h2 className={nadpisSekce}>Předpisy</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {kapitola.predpisy.map((p) => (
            <li key={p} className="rounded-md border border-hrana bg-plocha px-2 py-1 font-mono text-xs">
              {p}
            </li>
          ))}
        </ul>
      </section>
    </>
  );

  if (!obsah) {
    return (
      <Layout titulek={kapitola.nazev} zpet={zpet} stitek={`Kapitola ${kapitola.cislo}`}>
        {hlavicka}
        <p className="mt-6 flex items-center gap-2 rounded-xl border border-dashed border-hrana p-4 text-tlumeny">
          <Icon nazev="zamek" size={18} />
          Kapitolu připravujeme (Fáze {kapitola.faze}).
        </p>
      </Layout>
    );
  }

  const idKaret = obsah.lekce.map((l) => l.id);
  const idOtazek = obsah.otazky.map((o) => o.id);
  const precteno = pocetPrectenych(stav, idKaret);
  const zvladnuto = pocetZvladnutych(stav, idOtazek);
  const prvniNeprectena = obsah.lekce.findIndex((l) => !stav.prectene.includes(l.id));
  const nejlepsi = nejlepsiTest(stav, kapitola.id);
  const pokusu = stav.testy[kapitola.id]?.length ?? 0;
  const hvezdy = hvezdicky(idOtazek.length ? zvladnuto / idOtazek.length : 0, nejlepsi);
  const zaklad = `/k/${kapitola.id}`;

  return (
    <Layout titulek={kapitola.nazev} zpet={zpet} stitek={`Kapitola ${kapitola.cislo}`}>
      {hlavicka}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Dlazdice
          ikona="nauka"
          nazev="Nauka"
          popis={`Přečteno ${precteno} / ${idKaret.length}`}
          href={`#${zaklad}/nauka/${prvniNeprectena >= 0 ? prvniNeprectena + 1 : 1}`}
          hodnota={precteno}
          max={idKaret.length}
        />
        <Dlazdice
          ikona="procvic"
          nazev="Procvičování"
          popis={`Zvládnuto ${zvladnuto} / ${idOtazek.length}`}
          href={odkaz(`${zaklad}/procvic`)}
          hodnota={zvladnuto}
          max={idOtazek.length}
        />
        <Dlazdice
          ikona="test"
          nazev="Test kapitoly"
          popis={pokusu > 0 ? `Nejlepší ${Math.round(nejlepsi * 100)} %` : `${delkaTestu(obsah)} otázek · 80 %`}
          href={`#${zaklad}/test`}
          hodnota={pokusu > 0 ? Math.round(nejlepsi * 100) : undefined}
          max={100}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-tlumeny">
        <Hvezdicky pocet={hvezdy} />
        <span>
          {hvezdy === 0
            ? "První hvězdička od 50 % zvládnutých otázek."
            : hvezdy === 1
              ? "Druhá hvězdička od 80 % zvládnutých otázek."
              : "Třetí hvězdička: 100 % otázek a test kapitoly alespoň na 80 %."}
        </span>
      </div>

      <section className="mt-8">
        <h2 className={nadpisSekce}>Podtémata</h2>
        <ol className="mt-3 space-y-3">
          {obsah.podtemata.map((p, i) => {
            const karty = obsah.lekce.filter((l) => l.podtema === p.id);
            const otazky = obsah.otazky.filter((o) => o.podtema === p.id);
            const prectenoP = pocetPrectenych(
              stav,
              karty.map((k) => k.id)
            );
            const zvladnutoP = pocetZvladnutych(
              stav,
              otazky.map((o) => o.id)
            );
            const prvniKarta = obsah.lekce.findIndex((l) => l.podtema === p.id) + 1;
            return (
              <li key={p.id} className={`${plocha} p-4`}>
                <div className="flex gap-3">
                  <span className="font-mono text-sm text-tlumeny">{i + 1}.</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{p.nazev}</h3>
                    <p className="mt-0.5 font-mono text-xs text-tlumeny">
                      Nauka {prectenoP}/{karty.length} · Zvládnuto {zvladnutoP}/{otazky.length}
                    </p>
                    <div className="mt-2">
                      <Pruh
                        hodnota={zvladnutoP}
                        max={otazky.length}
                        popis={`${p.nazev}: zvládnuto ${zvladnutoP} z ${otazky.length}`}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={`#${zaklad}/nauka/${prvniKarta}`}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-hrana px-3 text-sm font-medium hover:border-primarni"
                      >
                        <Icon nazev="nauka" size={16} className="text-primarni" />
                        Číst
                      </a>
                      <a
                        href={odkaz(`${zaklad}/procvic`, { podtema: p.id })}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-hrana px-3 text-sm font-medium hover:border-primarni"
                      >
                        <Icon nazev="procvic" size={16} className="text-primarni" />
                        Procvičit
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </Layout>
  );
}
