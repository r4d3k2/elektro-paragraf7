// Položka seznamu kapitol na úvodní obrazovce.
import type { Kapitola } from "../data/kapitoly";
import { hvezdicky, nejlepsiTest, pocetZvladnutych, usePokrok } from "../lib/progress";
import { jeAktivni, obsahKapitoly } from "../lib/obsah";
import { Hvezdicky } from "./Hvezdicky";
import { Icon } from "./Icon";
import { Pruh } from "./Pruh";

export function CisloKapitoly({ cislo, aktivni = true }: { cislo: number; aktivni?: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold ${
        aktivni ? "border-primarni/40 bg-primarni/10 text-primarni" : "border-hrana text-tlumeny"
      }`}
      aria-hidden="true"
    >
      {String(cislo).padStart(2, "0")}
    </span>
  );
}

export function KapitolaKarta({ kapitola }: { kapitola: Kapitola }) {
  const stav = usePokrok();
  const aktivni = jeAktivni(kapitola);
  const obsah = obsahKapitoly(kapitola);

  if (!aktivni || !obsah) {
    return (
      <li className="flex gap-3 rounded-xl border border-dashed border-hrana p-4" aria-disabled="true">
        <CisloKapitoly cislo={kapitola.cislo} aktivni={false} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-tlumeny">{kapitola.nazev}</h3>
          <p className="mt-0.5 text-sm text-tlumeny">{kapitola.kratce}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-tlumeny">
            <Icon nazev="zamek" size={14} />
            Připravujeme · Fáze {kapitola.faze}
          </p>
        </div>
      </li>
    );
  }

  const idOtazek = obsah.otazky.map((o) => o.id);
  const zvladnuto = pocetZvladnutych(stav, idOtazek);
  const podil = idOtazek.length > 0 ? zvladnuto / idOtazek.length : 0;
  const hvezdy = hvezdicky(podil, nejlepsiTest(stav, kapitola.id));

  return (
    <li>
      <a
        href={`#/k/${kapitola.id}`}
        className="flex gap-3 rounded-xl border border-hrana bg-plocha p-4 transition-colors duration-150 hover:border-primarni active:bg-plocha-2"
      >
        <CisloKapitoly cislo={kapitola.cislo} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{kapitola.nazev}</h3>
            <Hvezdicky pocet={hvezdy} />
          </div>
          <p className="mt-0.5 text-sm text-tlumeny">{kapitola.kratce}</p>
          <div className="mt-3 flex items-center gap-3">
            <Pruh
              hodnota={zvladnuto}
              max={idOtazek.length}
              popis={`Zvládnuto ${zvladnuto} z ${idOtazek.length} otázek`}
            />
            <span className="shrink-0 font-mono text-xs text-tlumeny">
              {zvladnuto}/{idOtazek.length}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
