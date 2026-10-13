// #/o-aplikaci – účel, rozsah, upozornění, legenda stavů faktů, zdroje, vzhled, verze a reset pokroku.
import { useState, type ReactNode } from "react";
import { FAKTA_OVERENO_K, ZDROJE_ZNENI } from "../data/fakta";
import { AKTUALNI_FAZE } from "../data/faze";
import { KAPITOLY } from "../data/kapitoly";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { nadpisSekce, plocha, tlacitkoSekundarni } from "../components/styly";
import { POCET_FAKTU } from "../lib/fakta";
import { jeAktivni } from "../lib/obsah";
import { pokrok, ukladaniDostupne, usePokrok } from "../lib/progress";
import type { Vzhled } from "../lib/storage";
import { POPIS_VZHLEDU } from "../lib/vzhled";

function formatDatum(iso: string): string {
  const [rok, mesic, den] = iso.split("-").map(Number);
  return rok && mesic && den ? `${den}. ${mesic}. ${rok}` : iso;
}

/** „1–5“ pro souvislou řadu, jinak „1, 2 a 4“. */
function vycetKapitol(cisla: number[]): string {
  if (cisla.length === 0) return "";
  const souvisla = cisla.every((c, i) => i === 0 || c === cisla[i - 1] + 1);
  if (cisla.length > 2 && souvisla) return `${cisla[0]}–${cisla[cisla.length - 1]}`;
  if (cisla.length === 1) return String(cisla[0]);
  return `${cisla.slice(0, -1).join(", ")} a ${cisla[cisla.length - 1]}`;
}

function Sekce({ nadpis, children }: { nadpis: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className={nadpisSekce}>{nadpis}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export function OAplikaci() {
  const stav = usePokrok();
  const [potvrzeni, setPotvrzeni] = useState(false);
  const [smazano, setSmazano] = useState(false);
  const aktivni = KAPITOLY.filter(jeAktivni).map((k) => k.cislo);
  const zodpovezeno = Object.keys(stav.otazky).length;
  const testu = Object.values(stav.testy).reduce((soucet, seznam) => soucet + seznam.length, 0);

  return (
    <Layout titulek="O aplikaci" zpet={{ href: "#/", popis: "Domů" }} stitek="O aplikaci">
      <h1 className="text-2xl font-bold">O aplikaci</h1>

      <div className="mt-4 flex gap-3 rounded-xl border-2 border-akcent bg-plocha p-4">
        <Icon nazev="pozor" size={22} className="mt-0.5 shrink-0 text-overit" />
        <div>
          <p className="font-semibold">Studijní pomůcka</p>
          <p className="mt-1">
            Aplikace slouží k přípravě na zkoušku. Rozhodující je vždy platné znění předpisů a norem. Fakta jsou
            ověřená k datu <span className="font-mono">{formatDatum(FAKTA_OVERENO_K)}</span>.
          </p>
        </div>
      </div>

      <Sekce nadpis="Účel">
        <p>
          Osobní trenažér ke zkoušce z odborné způsobilosti v elektrotechnice v rozsahu § 7 nařízení vlády
          č. 194/2022 Sb. – vedoucí elektrotechnik. Učíte se testováním: každá možnost, správná i špatná, má
          vysvětlení s odkazem na předpis.
        </p>
      </Sekce>

      <Sekce nadpis="Rozsah">
        <p>
          Napětí do 1 kV AC / 1,5 kV DC, objekty bez nebezpečí výbuchu. Látka je v 9 kapitolách v pevném pořadí.
          Teď jsou zpřístupněné kapitoly {vycetKapitol(aktivni)} (fáze {AKTUALNI_FAZE}), další přibudou.
        </p>
      </Sekce>

      <Sekce nadpis="Stav faktů">
        <p>
          Všechna odborná tvrzení vycházejí z báze {POCET_FAKTU.celkem} faktů. Každá karta i otázka ukazuje své zdroje;
          klepnutím na čip zdroje zobrazíte text faktu.
        </p>
        <ul className="mt-3 space-y-2">
          <li className={`${plocha} flex gap-3 p-3`}>
            <span className="inline-flex h-fit items-center gap-1.5 rounded-md border border-spravne/40 bg-spravne/5 px-2 py-1 text-sm font-semibold text-spravne">
              <Icon nazev="spravne" size={16} />
              Ověřeno
            </span>
            <span className="text-sm">
              Ověřeno v textu předpisu nebo ve zdroji uvedeném u faktu ({POCET_FAKTU.overeno} faktů).
            </span>
          </li>
          <li className={`${plocha} flex gap-3 p-3`}>
            <span className="inline-flex h-fit shrink-0 items-center gap-1.5 rounded-md border border-overit/50 bg-overit/5 px-2 py-1 text-sm font-semibold text-overit">
              <Icon nazev="pozor" size={16} />
              Ověřit
            </span>
            <span className="text-sm">
              Běžně uváděný údaj, který je potřeba potvrdit v aktuálním znění normy ({POCET_FAKTU.overit} faktů). Karty
              a otázky, které se o něj opírají, nesou odznak „Ověřit v normě“.
            </span>
          </li>
        </ul>
      </Sekce>

      <Sekce nadpis={`Zdroje znění (stav k ${formatDatum(FAKTA_OVERENO_K)})`}>
        <ul className="space-y-2">
          {ZDROJE_ZNENI.map((z) => (
            <li key={z} className="flex gap-2 text-sm">
              <Icon nazev="zdroj" size={16} className="mt-0.5 shrink-0 text-tlumeny" />
              <span>{z}</span>
            </li>
          ))}
        </ul>
      </Sekce>

      <Sekce nadpis="Vzhled">
        <div className="grid grid-cols-3 gap-1 rounded-lg border border-hrana bg-plocha p-1" role="group" aria-label="Vzhled">
          {(Object.keys(POPIS_VZHLEDU) as Vzhled[]).map((v) => {
            const aktivniVzhled = stav.nastaveni.vzhled === v;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={aktivniVzhled}
                onClick={() => pokrok.nastavVzhled(v)}
                className={`min-h-11 rounded-md px-2 text-sm font-medium transition-colors duration-150 ${
                  aktivniVzhled ? "bg-primarni text-na-primarni" : "hover:bg-plocha-2"
                }`}
              >
                {POPIS_VZHLEDU[v]}
              </button>
            );
          })}
        </div>
      </Sekce>

      <Sekce nadpis="Pokrok">
        <p className="text-sm">
          Zodpovězené otázky: <span className="font-mono">{zodpovezeno}</span> · přečtené karty:{" "}
          <span className="font-mono">{stav.prectene.length}</span> · testy kapitol:{" "}
          <span className="font-mono">{testu}</span>
        </p>
        <p className="mt-1 text-sm text-tlumeny">
          {ukladaniDostupne
            ? "Pokrok se ukládá jen v tomto prohlížeči na tomto zařízení."
            : "Prohlížeč nedovoluje ukládat data, pokrok se po zavření ztratí."}
        </p>
        {!potvrzeni ? (
          <button type="button" onClick={() => setPotvrzeni(true)} className={`${tlacitkoSekundarni} mt-3`}>
            <Icon nazev="smazat" size={18} />
            Smazat pokrok
          </button>
        ) : (
          <div className="mt-3 rounded-xl border-2 border-spatne/60 p-4" role="alertdialog" aria-labelledby="reset-otazka">
            <p id="reset-otazka" className="font-semibold">
              Opravdu smazat veškerý pokrok?
            </p>
            <p className="mt-1 text-sm text-tlumeny">
              Smažou se odpovědi, přečtené karty, výsledky testů a poslední místo. Nastavení vzhledu zůstane. Akci
              nelze vrátit.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  pokrok.smazPokrok();
                  setPotvrzeni(false);
                  setSmazano(true);
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-spatne px-4 font-medium text-plocha"
              >
                Smazat
              </button>
              <button type="button" onClick={() => setPotvrzeni(false)} className={tlacitkoSekundarni}>
                Ponechat
              </button>
            </div>
          </div>
        )}
        {smazano && (
          <p className="mt-2 text-sm text-spravne" role="status">
            Pokrok byl smazán.
          </p>
        )}
      </Sekce>

      <Sekce nadpis="Verze">
        <p className="font-mono text-sm">
          {__VERZE__} · fáze {AKTUALNI_FAZE}
        </p>
      </Sekce>
    </Layout>
  );
}
