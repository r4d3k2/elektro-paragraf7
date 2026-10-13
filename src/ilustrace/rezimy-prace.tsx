// Ilustrace „Režimy práce“: tři sloupce Práce podle pokynů / s dohledem / pod dozorem.
// Definice: K3-01 (pokyny), K3-02 (dohled), K3-03 (dozor). Kde takto pracuje osoba poučená: K3-04, K3-05.
import { useState, type KeyboardEvent } from "react";
import { Zdroje } from "../components/FaktChip";
import { nadpisSekce } from "../components/styly";
import { NadpisIlustrace } from "./ovladani";

type RezimId = "pokyny" | "dohled" | "dozor";

interface Rezim {
  id: RezimId;
  nazev: string;
  popisek: [string, string];
  pokyny: string;
  pritomnost: string;
  kdoNadpis: string;
  kdo: string;
  poucena: string[];
  fakta: string[];
}

const REZIMY: Rezim[] = [
  {
    id: "pokyny",
    nazev: "podle pokynů",
    popisek: ["pokyny", "před prací"],
    pokyny: "Osoba znalá dává nezbytné pokyny pro bezpečné a správné provedení práce.",
    pritomnost: "Definice dohled ani přítomnost osoby znalé nevyžaduje – pracuje se podle daných pokynů.",
    kdoNadpis: "Kdo smí pokyny vydávat",
    kdo: "Pokyny pro práci na vyhrazeném elektrickém zařízení smí vydávat pouze osoba znalá.",
    poucena: ["na zařízeních malého a nízkého napětí bez napětí a v jejich blízkosti"],
    fakta: ["K3-01", "K3-04"]
  },
  {
    id: "dohled",
    nazev: "s dohledem",
    popisek: ["kontrola na začátku,", "pak podle potřeby"],
    pokyny: "Práce se provádí podle podrobnějších pokynů; vydávat je smí jen osoba znalá.",
    pritomnost:
      "Před zahájením se osoba vykonávající dohled přesvědčí, že jsou provedena bezpečnostní opatření. Potom podle potřeby kontroluje dodržování předpisů.",
    kdoNadpis: "Kdo smí dohled vykonávat",
    kdo: "Dohled smí vykonávat pouze osoba znalá.",
    poucena: [
      "na zařízeních vysokého napětí bez napětí a v jejich blízkosti",
      "v blízkosti nekrytých živých částí nízkého napětí pod napětím – v bezpečné vzdálenosti nebo až na dotyk s izolačním krytem"
    ],
    fakta: ["K3-02", "K3-01", "K3-04", "K3-05"]
  },
  {
    id: "dozor",
    nazev: "pod dozorem",
    popisek: ["trvale", "přítomen"],
    pokyny: "Pokyny pro práci na vyhrazeném elektrickém zařízení smí vydávat jen osoba znalá.",
    pritomnost: "Osoba pověřená dozorem je při práci trvale přítomna.",
    kdoNadpis: "Kdo smí dozor vykonávat",
    kdo: "Dozor smí vykonávat pouze osoba znalá.",
    poucena: ["v blízkosti nekrytých živých částí vysokého napětí"],
    fakta: ["K3-03", "K3-01", "K3-05"]
  }
];

// Geometrie: tři sloupce vedle sebe, nad nimi šipka „přísnost“. Barvy ve třídách (ne var() v atributech).
const SIRKA = 360;
const VYSKA = 196;
const SLOUPEC = 116;
const MEZERA = 2;
const HORE = 24;

/** Piktogram přítomnosti osoby znalé na časové ose práce. */
function Piktogram({ id, x0, x1, y, zvoleny }: { id: RezimId; x0: number; x1: number; y: number; zvoleny: boolean }) {
  const barva = zvoleny ? "fill-primarni" : "fill-tlumeny";
  const tah = zvoleny ? "stroke-primarni" : "stroke-tlumeny";
  const delka = x1 - x0;
  return (
    <g aria-hidden="true">
      {id === "dozor" ? (
        <line x1={x0} y1={y} x2={x1} y2={y} strokeWidth={7} strokeLinecap="round" className={tah} />
      ) : (
        <line x1={x0} y1={y} x2={x1} y2={y} strokeWidth={2} strokeDasharray="4 4" className="stroke-hrana" />
      )}
      <line x1={x0} y1={y - 9} x2={x0} y2={y + 9} strokeWidth={1.5} className="stroke-hrana" />
      <line x1={x1} y1={y - 9} x2={x1} y2={y + 9} strokeWidth={1.5} className="stroke-hrana" />
      {id === "pokyny" && <rect x={x0 - 6} y={y - 6} width={12} height={12} rx={2} className={barva} />}
      {id === "dohled" && (
        <>
          <circle cx={x0} cy={y} r={7} className={barva} />
          <circle cx={x0 + delka * 0.45} cy={y} r={4.5} className={barva} />
          <circle cx={x0 + delka * 0.78} cy={y} r={4.5} className={barva} />
        </>
      )}
      <text x={x0} y={y + 24} fontSize={9.5} className="fill-tlumeny">
        začátek
      </text>
      <text x={x1} y={y + 24} fontSize={9.5} textAnchor="end" className="fill-tlumeny">
        konec
      </text>
    </g>
  );
}

export default function RezimyPrace() {
  const [vybrany, setVybrany] = useState<RezimId>("dohled");
  const [fokus, setFokus] = useState<RezimId | null>(null);
  const rezim = REZIMY.find((r) => r.id === vybrany) ?? REZIMY[1];

  function klavesa(e: KeyboardEvent, id: RezimId) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setVybrany(id);
    }
  }

  return (
    <>
      <NadpisIlustrace
        nadpis="Pokyny, dohled, dozor"
        napoveda="Klepněte na sloupec. Piktogram ukazuje, kdy je osoba znalá u práce."
      />
      <svg
        viewBox={`0 0 ${SIRKA} ${VYSKA}`}
        className="block h-auto w-full select-none"
        role="group"
        aria-label="Tři způsoby zajištění práce: podle pokynů, s dohledem a pod dozorem"
      >
        <defs>
          <marker id="rezimy-sipka" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto">
            <path d="M0 0 10 5 0 10z" className="fill-tlumeny" />
          </marker>
        </defs>
        <text x={24} y={9} fontSize={10} className="fill-tlumeny">
          méně přísné
        </text>
        <text x={SIRKA - 24} y={9} fontSize={10} textAnchor="end" className="fill-tlumeny">
          přísnější
        </text>
        <line x1={24} y1={15} x2={SIRKA - 24} y2={15} strokeWidth={1.5} markerEnd="url(#rezimy-sipka)" className="stroke-tlumeny" />

        {REZIMY.map((r, i) => {
          const x = 4 + i * (SLOUPEC + MEZERA);
          const zvoleny = r.id === vybrany;
          const stred = x + SLOUPEC / 2;
          return (
            <g
              key={r.id}
              role="button"
              tabIndex={0}
              aria-pressed={zvoleny}
              aria-label={`Práce ${r.nazev}: ${r.popisek.join(" ")}`}
              onClick={() => setVybrany(r.id)}
              onKeyDown={(e) => klavesa(e, r.id)}
              onFocus={() => setFokus(r.id)}
              onBlur={() => setFokus(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={x}
                y={HORE}
                width={SLOUPEC}
                height={VYSKA - HORE - 4}
                rx={10}
                strokeWidth={zvoleny ? 2.5 : 1.5}
                className={`fill-plocha ${zvoleny ? "stroke-primarni" : "stroke-hrana"}`}
              />
              {zvoleny && (
                <rect x={x} y={HORE} width={SLOUPEC} height={VYSKA - HORE - 4} rx={10} fillOpacity={0.1} className="fill-primarni" />
              )}
              {fokus === r.id && (
                <rect
                  x={x - 2}
                  y={HORE - 2}
                  width={SLOUPEC + 4}
                  height={VYSKA - HORE}
                  rx={12}
                  fill="none"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  className="stroke-primarni"
                />
              )}
              <text x={stred} y={HORE + 22} fontSize={11} textAnchor="middle" className="fill-tlumeny">
                práce
              </text>
              <text
                x={stred}
                y={HORE + 40}
                fontSize={14}
                fontWeight={600}
                textAnchor="middle"
                className={zvoleny ? "fill-primarni" : "fill-text"}
              >
                {r.nazev}
              </text>
              <text x={x + 12} y={HORE + 70} fontSize={9.5} className="fill-tlumeny">
                osoba znalá u práce
              </text>
              <Piktogram id={r.id} x0={x + 14} x1={x + SLOUPEC - 14} y={HORE + 90} zvoleny={zvoleny} />
              <text x={stred} y={HORE + 136} fontSize={11} textAnchor="middle" className="fill-text">
                {r.popisek[0]}
              </text>
              <text x={stred} y={HORE + 151} fontSize={11} textAnchor="middle" className="fill-text">
                {r.popisek[1]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="font-semibold">Práce {rezim.nazev}</p>
        <h4 className={`${nadpisSekce} mt-3`}>Pokyny</h4>
        <p className="mt-1 text-sm">{rezim.pokyny}</p>
        <h4 className={`${nadpisSekce} mt-3`}>Přítomnost osoby znalé</h4>
        <p className="mt-1 text-sm">{rezim.pritomnost}</p>
        <h4 className={`${nadpisSekce} mt-3`}>{rezim.kdoNadpis}</h4>
        <p className="mt-1 text-sm">{rezim.kdo}</p>
        <h4 className={`${nadpisSekce} mt-3`}>Takto pracuje osoba poučená</h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {rezim.poucena.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mt-3">
          <Zdroje fakta={rezim.fakta} />
        </div>
      </div>
    </>
  );
}
