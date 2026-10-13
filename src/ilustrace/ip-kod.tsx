// Ilustrace „IP kód“: dvě kolečka číslic → popis stupně ochrany krytem.
// Význam číslic: K8-05, příklady stupňů: K8-06. Oba fakty mají stav „overit“, proto poznámka „ověřit v normě“.
// Stupně, které v bázi faktů nejsou, aplikace nepopisuje – odkáže na normu.
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { OdznakOverit } from "../components/OdznakOverit";
import { nadpisSekce } from "../components/styly";
import { NadpisIlustrace } from "./ovladani";

const PRVNI = ["X", "0", "1", "2", "3", "4", "5", "6"] as const;
const DRUHA = ["X", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

// Popisy stupňů jen z K8-06.
const POPIS_PRVNI: Partial<Record<string, string>> = {
  "2": "cizí pevná tělesa větší než 12,5 mm, ochrana před dotykem prstem",
  "4": "cizí pevná tělesa větší než 1 mm",
  "5": "ochrana před prachem",
  "6": "prachotěsné"
};
const POPIS_DRUHA: Partial<Record<string, string>> = {
  "4": "stříkající voda",
  "5": "tryskající voda",
  "7": "dočasné ponoření"
};

const PRIKLADY: [string, string][] = [
  ["2", "X"],
  ["4", "X"],
  ["5", "X"],
  ["6", "X"],
  ["X", "4"],
  ["X", "5"],
  ["X", "7"]
];

const NENI_VE_FAKTECH = "Popis tohoto stupně v bázi faktů aplikace není – najdete ho v ČSN EN 60529.";

function popis(cislice: string, mapa: Partial<Record<string, string>>): string {
  if (cislice === "X") return "Číslice se v kódu neuvádí (X).";
  return mapa[cislice] ?? NENI_VE_FAKTECH;
}

interface KoleckoProps {
  nazev: string;
  hodnoty: readonly string[];
  index: number;
  onZmena: (index: number) => void;
}

/** Kolečko číslic: šipkami nahoru a dolů se otáčí o jednu hodnotu (dokola). */
function Kolecko({ nazev, hodnoty, index, onZmena }: KoleckoProps) {
  const n = hodnoty.length;
  const otoc = (o: number) => onZmena((index + o + n) % n);
  return (
    <div className="flex flex-col items-center gap-1" role="group" aria-label={nazev}>
      <button
        type="button"
        onClick={() => otoc(1)}
        aria-label={`${nazev}: vyšší hodnota`}
        className="inline-flex min-h-11 min-w-16 items-center justify-center rounded-lg border border-hrana bg-plocha hover:border-primarni active:bg-plocha-2"
      >
        <Icon nazev="nahoru" size={22} />
      </button>
      <svg viewBox="0 0 64 104" className="h-[104px] w-16 select-none" aria-hidden="true">
        <rect x={2} y={2} width={60} height={100} rx={14} strokeWidth={2} className="fill-plocha-2 stroke-hrana" />
        <text x={32} y={24} fontSize={16} textAnchor="middle" className="fill-tlumeny font-mono" opacity={0.6}>
          {hodnoty[(index + 1) % n]}
        </text>
        <rect x={6} y={34} width={52} height={36} rx={8} strokeWidth={2.5} className="fill-plocha stroke-primarni" />
        <text x={32} y={62} fontSize={28} fontWeight={600} textAnchor="middle" className="fill-primarni font-mono">
          {hodnoty[index]}
        </text>
        <text x={32} y={92} fontSize={16} textAnchor="middle" className="fill-tlumeny font-mono" opacity={0.6}>
          {hodnoty[(index - 1 + n) % n]}
        </text>
      </svg>
      <button
        type="button"
        onClick={() => otoc(-1)}
        aria-label={`${nazev}: nižší hodnota`}
        className="inline-flex min-h-11 min-w-16 items-center justify-center rounded-lg border border-hrana bg-plocha hover:border-primarni active:bg-plocha-2"
      >
        <Icon nazev="dolu" size={22} />
      </button>
    </div>
  );
}

export default function IpKod() {
  const [i1, setI1] = useState<number>(PRVNI.indexOf("5"));
  const [i2, setI2] = useState<number>(DRUHA.indexOf("4"));
  const c1 = PRVNI[i1];
  const c2 = DRUHA[i2];
  const kod = `IP${c1}${c2}`;

  function nastav(p: string, d: string) {
    setI1(PRVNI.indexOf(p as (typeof PRVNI)[number]));
    setI2(DRUHA.indexOf(d as (typeof DRUHA)[number]));
  }

  return (
    <>
      <NadpisIlustrace nadpis="IP kód" napoveda="Otáčejte kolečky číslic šipkami a čtěte, co kód znamená." />

      <div className="flex items-center justify-center gap-3">
        <span className="font-mono text-4xl font-semibold text-tlumeny" aria-hidden="true">
          IP
        </span>
        <Kolecko nazev="První číslice" hodnoty={PRVNI} index={i1} onZmena={setI1} />
        <Kolecko nazev="Druhá číslice" hodnoty={DRUHA} index={i2} onZmena={setI2} />
      </div>

      <div className="mt-4 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="font-mono text-2xl font-semibold text-primarni">{kod}</p>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className={nadpisSekce}>
              První číslice <span className="font-mono normal-case">{c1}</span> (0–6)
            </dt>
            <dd className="mt-1">
              <span className="block text-tlumeny">Ochrana před vniknutím cizích pevných těles a před dotykem nebezpečných částí:</span>
              <span className="block font-medium">{popis(c1, POPIS_PRVNI)}</span>
            </dd>
          </div>
          <div>
            <dt className={nadpisSekce}>
              Druhá číslice <span className="font-mono normal-case">{c2}</span> (0–9)
            </dt>
            <dd className="mt-1">
              <span className="block text-tlumeny">Ochrana před vniknutím vody:</span>
              <span className="block font-medium">{popis(c2, POPIS_DRUHA)}</span>
            </dd>
          </div>
        </dl>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-tlumeny">
          <OdznakOverit popis="Význam číslic IP kódu je potřeba ověřit v ČSN EN 60529." />
          <span>Popisy stupňů ověřit v normě.</span>
        </div>
      </div>

      <div className="mt-3">
        <p className={nadpisSekce}>Příklady</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {PRIKLADY.map(([p, d]) => {
            const zvoleno = p === c1 && d === c2;
            return (
              <button
                key={`${p}${d}`}
                type="button"
                aria-pressed={zvoleno}
                onClick={() => nastav(p, d)}
                className={`min-h-11 min-w-11 rounded-lg border-2 px-3 font-mono text-sm font-semibold transition-colors duration-150 ${
                  zvoleno ? "border-primarni bg-primarni/10 text-primarni" : "border-hrana bg-plocha hover:border-primarni/60"
                }`}
              >
                IP{p}
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3">
        <Zdroje fakta={["K8-05", "K8-06"]} />
      </div>
    </>
  );
}
