// Ilustrace „Pásma kolem živé části“: soustředná pásma kolem holé živé části nízkého napětí
// a posuvník vzdálenosti ruky nebo nástroje → druh práce a co vyžaduje.
// Pásma: K4-08. Hodnoty pro NN (DL „bez dotyku“, DV ≈ 0,3 m): K4-09 – stav „overit“, proto poznámka.
// Požadavky: K4-10 a K4-02 (práce pod napětím), K4-07 a K3-05 (práce v blízkosti).
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { OdznakOverit } from "../components/OdznakOverit";
import { nadpisSekce } from "../components/styly";
import { NadpisIlustrace } from "./ovladani";

const DV_CM = 30; // přibližně 0,3 m (K4-09, ověřit v normě)
const MAX_CM = 60;

// Geometrie: živá část vlevo, pásma jako soustředné kruhy, vzdálenost roste doprava.
const CX = 34;
const CY = 96;
const R_CAST = 9;
const R_DL = R_CAST + 4; // DL „bez dotyku“ – pásmo práce pod napětím je jen tenká vrstva u povrchu
const PX_NA_CM = 4.2;
const naX = (cm: number) => CX + R_CAST + cm * PX_NA_CM;
const R_DV = naX(DV_CM) - CX;

interface Pasmo {
  nazev: string;
  prace: string;
  vyzaduje: string[];
  fakta: string[];
  barva: string;
}

const POD_NAPETIM: Pasmo = {
  nazev: "Pásmo práce pod napětím",
  prace: "Práce pod napětím",
  vyzaduje: [
    "jen osoby k tomu zvlášť vyškolené",
    "vhodné izolované nářadí a ochranné prostředky",
    "stanovené pracovní postupy",
    "používá se tam, kde vypnutí není rozumně možné – upřednostňuje se práce bez napětí"
  ],
  fakta: ["K4-08", "K4-09", "K4-10", "K4-02"],
  barva: "text-spatne"
};

const V_BLIZKOSTI: Pasmo = {
  nazev: "Pásmo práce v blízkosti",
  prace: "Práce v blízkosti živých částí",
  vyzaduje: [
    "sousední živé části, které nejde odpojit, chránit izolačními kryty nebo zakrývacím materiálem proti náhodnému dotyku",
    "osoba poučená smí u nekrytých živých částí nízkého napětí pod napětím jen s dohledem osoby znalé, v bezpečné vzdálenosti nebo až na dotyk s izolačním krytem"
  ],
  fakta: ["K4-08", "K4-09", "K4-07", "K3-05"],
  barva: "text-overit"
};

const MIMO: Pasmo = {
  nazev: "Mimo obě pásma",
  prace: "Ani práce pod napětím, ani práce v blízkosti",
  vyzaduje: ["Vzdálenost je větší než DV, ruka ani nástroj nezasahují do žádného z pásem kolem živé části."],
  fakta: ["K4-08", "K4-09"],
  barva: "text-spravne"
};

function pasmo(cm: number): Pasmo {
  if (cm <= 0) return POD_NAPETIM;
  if (cm <= DV_CM) return V_BLIZKOSTI;
  return MIMO;
}

function formatCm(cm: number): string {
  return cm === 0 ? "dotyk" : `${cm} cm`;
}

export default function ZonyPrace() {
  const [cm, setCm] = useState(20);
  const p = pasmo(cm);
  const xNastroj = naX(cm);
  const uHranice = Math.abs(cm - DV_CM) <= 2;

  return (
    <>
      <NadpisIlustrace
        nadpis="Pásma kolem živé části"
        napoveda="Posuvníkem měňte vzdálenost ruky nebo nástroje od holé živé části nízkého napětí."
      />

      <svg
        viewBox="0 0 360 214"
        className="block h-auto w-full select-none"
        role="img"
        aria-label={`Vzdálenost ${formatCm(cm)} od holé živé části: ${p.nazev.toLocaleLowerCase("cs")}`}
      >
        <defs>
          <clipPath id="zony-orez">
            <rect x={0} y={8} width={360} height={170} />
          </clipPath>
        </defs>

        <g clipPath="url(#zony-orez)">
          <circle cx={CX} cy={CY} r={R_DV} fillOpacity={0.16} className="fill-akcent" />
          <circle cx={CX} cy={CY} r={R_DV} fill="none" strokeWidth={1.5} strokeDasharray="6 4" className="stroke-overit" />
          <circle cx={CX} cy={CY} r={R_DL} fillOpacity={0.55} className="fill-spatne" />
        </g>
        <circle cx={CX} cy={CY} r={R_CAST} className="fill-vodic-hneda" />

        <text x={64} y={40} fontSize={11} className="fill-overit" fontWeight={600}>
          pásmo práce
        </text>
        <text x={64} y={53} fontSize={11} className="fill-overit" fontWeight={600}>
          v blízkosti
        </text>
        <text x={CX + R_DV + 10} y={24} fontSize={11} className="fill-tlumeny">
          okolí – mimo pásma
        </text>
        <text x={CX - 4} y={CY + 30} fontSize={10} className="fill-spatne" fontWeight={600}>
          pod napětím
        </text>
        <text x={CX - 4} y={CY - 18} fontSize={10} className="fill-tlumeny">
          živá část
        </text>

        {/* ruka s nástrojem – hrot míří k živé části */}
        <g transform={`translate(${xNastroj} 0)`}>
          <line x1={0} y1={CY} x2={26} y2={CY} strokeWidth={3} strokeLinecap="round" className="stroke-text" />
          <rect x={26} y={CY - 7} width={30} height={14} rx={5} className="fill-primarni" />
          <circle cx={0} cy={CY} r={3} className="fill-primarni" />
        </g>

        {/* měřítko vzdálenosti */}
        <line x1={naX(0)} y1={186} x2={naX(MAX_CM)} y2={186} strokeWidth={1.5} className="stroke-hrana" />
        {Array.from({ length: MAX_CM / 10 + 1 }, (_, i) => i * 10).map((d) => (
          <g key={d}>
            <line x1={naX(d)} y1={181} x2={naX(d)} y2={191} strokeWidth={d === DV_CM ? 2 : 1} className={d === DV_CM ? "stroke-overit" : "stroke-hrana"} />
            <text x={naX(d)} y={205} fontSize={10.5} textAnchor="middle" className="fill-tlumeny font-mono">
              {d === 0 ? "0" : d}
            </text>
          </g>
        ))}
        <text x={naX(MAX_CM)} y={176} fontSize={10.5} textAnchor="end" className="fill-tlumeny">
          cm
        </text>
        <text x={naX(DV_CM)} y={176} fontSize={10.5} textAnchor="middle" fontWeight={600} className="fill-overit font-mono">
          DV ≈ 30
        </text>
        <text x={naX(0)} y={176} fontSize={10.5} textAnchor="middle" fontWeight={600} className="fill-spatne font-mono">
          DL
        </text>
        <circle cx={xNastroj} cy={186} r={5} className="fill-primarni" />
      </svg>

      <div className="mt-2">
        <label htmlFor="zony-vzdalenost" className="text-sm font-medium">
          Vzdálenost ruky nebo nástroje: <span className="font-mono font-semibold">{formatCm(cm)}</span>
        </label>
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCm((v) => Math.max(0, v - 1))}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha"
            aria-label="O 1 cm blíž"
          >
            <Icon nazev="minus" size={18} />
          </button>
          <input
            id="zony-vzdalenost"
            type="range"
            min={0}
            max={MAX_CM}
            step={1}
            value={cm}
            onChange={(e) => setCm(Number(e.target.value))}
            aria-valuetext={formatCm(cm)}
            className="h-11 min-w-0 flex-1 accent-primarni"
          />
          <button
            type="button"
            onClick={() => setCm((v) => Math.min(MAX_CM, v + 1))}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha"
            aria-label="O 1 cm dál"
          >
            <Icon nazev="plus" size={18} />
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className={`font-semibold ${p.barva}`}>{p.nazev}</p>
        <p className="mt-0.5 text-sm text-tlumeny">{p.prace}</p>
        <h4 className={`${nadpisSekce} mt-3`}>{p === MIMO ? "Proč" : "Co vyžaduje"}</h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {p.vyzaduje.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {uHranice && (
          <p className="mt-2 text-sm">Jste u hranice DV. Hodnota 0,3 m je přibližná – ověřte ji v tabulce normy.</p>
        )}
        <div className="mt-3">
          <Zdroje fakta={p.fakta} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-tlumeny">
        <OdznakOverit popis="Hodnoty DL a DV pro nízké napětí je potřeba ověřit v normě." />
        <span>
          Pro nízké napětí do 1 kV se uvádí DL „bez dotyku“ a DV přibližně 0,3 m – ověřit v normě.
        </span>
      </div>
    </>
  );
}
