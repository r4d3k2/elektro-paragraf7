// Ilustrace „Žebříček odborné způsobilosti“: schody od osoby školené po revizního technika.
// Obsah panelů vychází z faktů K1-03, K1-04, K1-05, K1-06, K1-07, K1-08, K1-14, K1-16, K1-17,
// K1-18, K1-29, K1-30, K2-08, K2-09 a K3-04.
import { useState, type KeyboardEvent } from "react";
import { Zdroje } from "../components/FaktChip";
import { nadpisSekce } from "../components/styly";
import { NadpisIlustrace } from "./ovladani";

interface Stupen {
  id: string;
  paragraf: string;
  nazev: string;
  platnost: string;
  coSmi: string[];
  predpoklady: string[];
  doklad: string;
  fakta: string[];
  cil?: boolean;
}

const STUPNE: Stupen[] = [
  {
    id: "skolena",
    paragraf: "—",
    nazev: "Osoba školená (seznámená)",
    platnost: "",
    coSmi: ["Podrobnosti o tom, co osoba školená smí, zatím v bázi faktů nejsou."],
    predpoklady: ["Zákon č. 250/2021 Sb. ji uvádí jako samostatnou skupinu vedle osob poučených a znalých."],
    doklad: "—",
    fakta: ["K1-03"]
  },
  {
    id: "poucena",
    paragraf: "§ 4",
    nazev: "Osoba poučená",
    platnost: "≤ 3 roky",
    coSmi: [
      "samostatně obsluhovat elektrická zařízení bez omezení napětí",
      "podle pokynů pracovat na zařízeních malého a nízkého napětí bez napětí a v jejich blízkosti",
      "s dohledem pracovat na zařízeních vysokého napětí bez napětí a v jejich blízkosti"
    ],
    predpoklady: [
      "plná svéprávnost a zdravotní způsobilost",
      "poučení a ověření znalostí pověřenou osobou znalou, nejméně 80 % správných odpovědí"
    ],
    doklad: "Zápis podepsaný oběma s rozsahem poučení a pracovištěm; opakování ve lhůtě, kterou určí osoba znalá, nejvýše 3 roky.",
    fakta: ["K1-17", "K1-18", "K3-04"]
  },
  {
    id: "elektrotechnik",
    paragraf: "§ 6",
    nazev: "Elektrotechnik",
    platnost: "3 roky",
    coSmi: [
      "samostatně vykonávat činnosti na elektrických zařízeních a v jejich blízkosti, kromě zvláštních případů z hodnocení rizik"
    ],
    predpoklady: [
      "věk 18 let, plná svéprávnost a zdravotní způsobilost",
      "odborné elektrotechnické vzdělání",
      "odborná praxe – minimum stanoví odpovědná osoba v místním provozním bezpečnostním předpisu",
      "úspěšně složená zkouška"
    ],
    doklad: "Doklad o zkoušce, platí 3 roky ode dne vydání.",
    fakta: ["K1-04", "K1-29", "K1-16", "K1-14"]
  },
  {
    id: "vedouci",
    paragraf: "§ 7",
    nazev: "Vedoucí elektrotechnik",
    platnost: "3 roky",
    cil: true,
    coSmi: [
      "vše, co elektrotechnik",
      "řídit činnosti a řídit provoz",
      "projektovat vyhrazená elektrická zařízení, kromě projektování, které vyžaduje autorizaci podle zákona č. 360/1992 Sb."
    ],
    predpoklady: [
      "věk 18 let, plná svéprávnost a zdravotní způsobilost",
      "odborná kvalifikace podle § 2 písm. a) NV č. 194/2022 Sb.",
      "praxe 2 roky (E2A, E3A), 3 roky (E1A, E2B, E3B), 4 roky (E1B); z toho nejméně 1 rok na zařízeních příslušného druhu a napětí",
      "zkouška složená po zaškolení"
    ],
    doklad: "Doklad o zkoušce, platí 3 roky ode dne vydání.",
    fakta: ["K1-04", "K1-06", "K1-05", "K1-07", "K1-08", "K1-14"]
  },
  {
    id: "revizni",
    paragraf: "§ 8",
    nazev: "Revizní technik",
    platnost: "5 let",
    coSmi: ["provádět revize vyhrazených elektrických zařízení v rozsahu svého osvědčení"],
    predpoklady: [
      "odborná způsobilost podle § 7 (vedoucí elektrotechnik)",
      "minimální praxe, například 4 roky pro E1A a E2A",
      "zkouška u pověřené organizace s písemnou a ústní částí, v každé nejméně 80 %"
    ],
    doklad: "Osvědčení pověřené organizace, platí 5 let od udělení. Kdo dělá revize jako živnost, potřebuje navíc oprávnění.",
    fakta: ["K1-30", "K2-08", "K2-09"]
  }
];

// Geometrie: schody stoupají zleva doprava, nejnižší stupeň je dole.
// Barvy a písmo jsou ve třídách (CSS), ne v atributech SVG – var() v atributech Safari nemusí umět.
const SIRKA = 360;
const VYSKA_RADKU = 52;
const MEZERA = 6;
const ODSAZENI = 16;
const VYSKA = STUPNE.length * (VYSKA_RADKU + MEZERA);

export default function ZebricekZpusobilosti() {
  const [vybrany, setVybrany] = useState("vedouci");
  const [fokus, setFokus] = useState<string | null>(null);
  const stupen = STUPNE.find((s) => s.id === vybrany) ?? STUPNE[3];

  function klavesa(e: KeyboardEvent, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setVybrany(id);
    }
  }

  return (
    <>
      <NadpisIlustrace nadpis="Žebříček odborné způsobilosti" napoveda="Klepněte na schod a zobrazí se, co stupeň smí." />
      <svg
        viewBox={`0 0 ${SIRKA} ${VYSKA}`}
        className="block h-auto w-full select-none"
        role="group"
        aria-label="Žebříček odborné způsobilosti od osoby školené po revizního technika"
      >
        {STUPNE.map((s, i) => {
          const y = VYSKA - (i + 1) * (VYSKA_RADKU + MEZERA) + MEZERA / 2;
          const x = i * ODSAZENI;
          const sirka = SIRKA - x - 2;
          const stred = y + VYSKA_RADKU / 2 + 5;
          const zvoleny = s.id === vybrany;
          return (
            <g
              key={s.id}
              role="button"
              tabIndex={0}
              aria-pressed={zvoleny}
              aria-label={`${s.nazev}${s.paragraf !== "—" ? `, ${s.paragraf}` : ""}${s.cil ? ", cíl přípravy" : ""}`}
              onClick={() => setVybrany(s.id)}
              onKeyDown={(e) => klavesa(e, s.id)}
              onFocus={() => setFokus(s.id)}
              onBlur={() => setFokus(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={x + 1}
                y={y}
                width={sirka}
                height={VYSKA_RADKU}
                rx={8}
                strokeWidth={s.cil || zvoleny ? 3 : 1.5}
                className={`fill-plocha ${s.cil ? "stroke-akcent" : zvoleny ? "stroke-primarni" : "stroke-hrana"}`}
              />
              {zvoleny && (
                <rect x={x + 1} y={y} width={sirka} height={VYSKA_RADKU} rx={8} fillOpacity={0.14} className="fill-primarni" />
              )}
              {fokus === s.id && (
                <rect
                  x={x - 2}
                  y={y - 2}
                  width={sirka + 5}
                  height={VYSKA_RADKU + 4}
                  rx={10}
                  fill="none"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  className="stroke-primarni"
                />
              )}
              <text x={x + 14} y={stred} fontSize={14} fontWeight={600} className="fill-tlumeny font-mono">
                {s.paragraf}
              </text>
              <text
                x={x + 52}
                y={s.cil ? y + 24 : stred}
                fontSize={14.5}
                fontWeight={600}
                className={zvoleny ? "fill-primarni" : "fill-text"}
              >
                {s.id === "skolena" ? "Osoba školená" : s.nazev}
              </text>
              {s.cil && (
                <text x={x + 52} y={y + 41} fontSize={11.5} fontWeight={700} className="fill-overit">
                  CÍL PŘÍPRAVY
                </text>
              )}
              {s.platnost && (
                <text x={SIRKA - 14} y={stred} textAnchor="end" fontSize={12} className="fill-tlumeny font-mono">
                  {s.platnost}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-right font-mono text-xs text-tlumeny">vpravo: platnost dokladu</p>

      <div className="mt-4 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm text-tlumeny">{stupen.paragraf}</span>
          <span className="font-semibold">{stupen.nazev}</span>
          {stupen.cil && (
            <span className="rounded-full border border-akcent px-2 text-xs font-semibold">cíl této přípravy</span>
          )}
        </p>
        <h4 className={`${nadpisSekce} mt-3`}>Co smí</h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {stupen.coSmi.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4 className={`${nadpisSekce} mt-3`}>Předpoklady</h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {stupen.predpoklady.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4 className={`${nadpisSekce} mt-3`}>Doklad a platnost</h4>
        <p className="mt-1 text-sm">{stupen.doklad}</p>
        <div className="mt-3">
          <Zdroje fakta={stupen.fakta} />
        </div>
      </div>
    </>
  );
}
