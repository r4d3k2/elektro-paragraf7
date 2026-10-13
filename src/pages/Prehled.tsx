// #/prehled – přehled pokroku (Fáze 4): zvládnutí po kapitolách, poslední testy a zkoušky,
// tři nejslabší podtémata s odkazem na procvičení.
import { Hvezdicky } from "../components/Hvezdicky";
import { Icon } from "../components/Icon";
import { CisloKapitoly } from "../components/KapitolaKarta";
import { Layout } from "../components/Layout";
import { Pruh } from "../components/Pruh";
import { nadpisSekce, plocha, tlacitkoSekundarni } from "../components/styly";
import { formatDatum, procenta, tvar } from "../lib/format";
import { aktivniKapitoly } from "../lib/obsah";
import { nejslabsiPodtemata, pocetChyb, posledniVysledky } from "../lib/prehled";
import { hvezdicky, nejlepsiTest, pocetPrectenych, pocetZvladnutych, usePokrok } from "../lib/progress";
import { odkaz } from "../lib/route";
import { uspel } from "../lib/test";

function Cislo({ hodnota, popis, href }: { hodnota: string; popis: string; href?: string }) {
  const obsah = (
    <>
      <span className="block font-mono text-2xl font-semibold">{hodnota}</span>
      <span className="mt-0.5 block text-sm text-tlumeny">{popis}</span>
    </>
  );
  return href ? (
    <a href={href} className={`${plocha} block p-3 transition-colors duration-150 hover:border-primarni active:bg-plocha-2`}>
      {obsah}
    </a>
  ) : (
    <div className={`${plocha} p-3`}>{obsah}</div>
  );
}

export function Prehled() {
  const stav = usePokrok();
  const kapitoly = aktivniKapitoly();
  const idOtazek = kapitoly.flatMap(({ obsah }) => obsah.otazky.map((o) => o.id));
  const idKaret = kapitoly.flatMap(({ obsah }) => obsah.lekce.map((l) => l.id));
  const zvladnuto = pocetZvladnutych(stav, idOtazek);
  const precteno = pocetPrectenych(stav, idKaret);
  const chyb = pocetChyb(stav);
  const nejlepsiZkouska = stav.zkousky.reduce((max, z) => Math.max(max, procenta(z.skore, z.celkem)), -1);
  const slabe = nejslabsiPodtemata(stav);
  const vysledky = posledniVysledky(stav);

  return (
    <Layout titulek="Přehled pokroku" zpet={{ href: "#/", popis: "Domů" }} stitek="Přehled">
      <h1 className="text-2xl font-bold">Přehled pokroku</h1>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Cislo hodnota={`${procenta(zvladnuto, idOtazek.length)} %`} popis={`zvládnuto ${zvladnuto} z ${idOtazek.length} otázek`} />
        <Cislo hodnota={`${precteno} / ${idKaret.length}`} popis="přečtených karet nauky" />
        <Cislo hodnota={String(chyb)} popis={`${tvar(chyb, "chyba", "chyby", "chyb")} k opakování`} href="#/chyby" />
        <Cislo
          hodnota={nejlepsiZkouska >= 0 ? `${nejlepsiZkouska} %` : "–"}
          popis={nejlepsiZkouska >= 0 ? "nejlepší zkouška nanečisto" : "zkouška nanečisto zatím ne"}
          href="#/zkouska"
        />
      </div>

      <section className="mt-8" aria-labelledby="kapitoly-nadpis">
        <h2 id="kapitoly-nadpis" className={nadpisSekce}>
          Zvládnutí po kapitolách
        </h2>
        <ol className="mt-3 space-y-2">
          {kapitoly.map(({ kapitola, obsah }) => {
            const ids = obsah.otazky.map((o) => o.id);
            const z = pocetZvladnutych(stav, ids);
            const test = nejlepsiTest(stav, kapitola.id);
            const pokusu = stav.testy[kapitola.id]?.length ?? 0;
            return (
              <li key={kapitola.id}>
                <a
                  href={`#/k/${kapitola.id}`}
                  className={`${plocha} flex gap-3 p-3 transition-colors duration-150 hover:border-primarni active:bg-plocha-2`}
                >
                  <CisloKapitoly cislo={kapitola.cislo} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold">{kapitola.nazev}</span>
                      <Hvezdicky pocet={hvezdicky(ids.length ? z / ids.length : 0, test)} />
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <Pruh hodnota={z} max={ids.length} popis={`${kapitola.nazev}: zvládnuto ${z} z ${ids.length}`} />
                      <span className="shrink-0 font-mono text-xs text-tlumeny">
                        {z}/{ids.length}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-tlumeny">
                      {pokusu > 0 ? `test kapitoly: nejlépe ${Math.round(test * 100)} %` : "test kapitoly zatím ne"}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8" aria-labelledby="slabe-nadpis">
        <h2 id="slabe-nadpis" className={nadpisSekce}>
          Nejslabší podtémata
        </h2>
        {slabe.length === 0 ? (
          <p className="mt-2 text-sm text-tlumeny">
            {Object.keys(stav.otazky).length === 0
              ? "Ukážou se, až začnete procvičovat."
              : "Zatím žádné: ve všech podtématech, kde jste odpovídali, jsou všechny odpovědi správně."}
          </p>
        ) : (
          <ol className="mt-3 space-y-2">
            {slabe.map((p) => (
              <li key={`${p.kapitola.id}-${p.podtema.id}`} className={`${plocha} p-3`}>
                <p className="font-mono text-xs text-tlumeny">
                  Kapitola {p.kapitola.cislo} · {p.kapitola.nazev}
                </p>
                <p className="mt-0.5 font-semibold">{p.podtema.nazev}</p>
                <p className="mt-1 text-sm text-tlumeny">
                  Úspěšnost <span className="font-mono font-semibold text-spatne">{Math.round(p.uspesnost * 100)} %</span> z{" "}
                  <span className="font-mono">{p.pokusy}</span> {tvar(p.pokusy, "odpovědi", "odpovědí", "odpovědí")} ·
                  zvládnuto <span className="font-mono">{p.zvladnuto}</span> z <span className="font-mono">{p.otazek}</span>
                </p>
                <a
                  href={odkaz(`/k/${p.kapitola.id}/procvic`, { podtema: p.podtema.id })}
                  className={`${tlacitkoSekundarni} mt-2 w-full`}
                >
                  <Icon nazev="procvic" size={18} className="text-primarni" />
                  Procvičit podtéma
                </a>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-8" aria-labelledby="vysledky-nadpis">
        <h2 id="vysledky-nadpis" className={nadpisSekce}>
          Poslední testy a zkoušky
        </h2>
        {vysledky.length === 0 ? (
          <p className="mt-2 text-sm text-tlumeny">
            Zatím žádný test kapitoly ani zkouška nanečisto. Test najdete na stránce každé kapitoly.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {vysledky.map((v, i) => {
              const ok = uspel(v.skore, v.celkem);
              return (
                <li key={`${v.kdy}-${i}`}>
                  <a
                    href={v.druh === "zkouska" ? "#/zkouska" : `#/k/${v.kapitola?.id}/test`}
                    className={`${plocha} flex items-center gap-3 p-3 transition-colors duration-150 hover:border-primarni active:bg-plocha-2`}
                  >
                    <Icon
                      nazev={ok ? "spravne" : "spatne"}
                      size={20}
                      className={`shrink-0 ${ok ? "text-spravne" : "text-spatne"}`}
                      title={ok ? "Úspěch" : "Neúspěch"}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {v.druh === "zkouska" ? "Zkouška nanečisto" : `Test kapitoly ${v.kapitola?.cislo}`}
                      </span>
                      <span className="block truncate text-xs text-tlumeny">
                        {formatDatum(v.kdy)}
                        {v.druh === "test" && v.kapitola ? ` · ${v.kapitola.nazev}` : ""}
                        {v.neoverene ? " · včetně neověřených" : ""}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-sm font-semibold">
                      {v.skore} / {v.celkem}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </Layout>
  );
}
