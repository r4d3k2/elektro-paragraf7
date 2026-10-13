// Ilustrace „Proudový chránič“: vodiče L a N procházejí součtovým transformátorem, posuvník unikajícího
// proudu 0–50 mA; při dosažení IΔn 30 mA chránič vybaví.
// Princip: K6-07. Doplňková ochrana: K6-08. Zásuvkové obvody do 32 A: K6-04. Proč 30 mA: K5-09.
// Barvy vodičů podle K7-04. Žádná hodnota se neopírá o fakt „overit“.
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { nadpisSekce, tlacitkoPrimarni } from "../components/styly";
import { NadpisIlustrace, Volba } from "./ovladani";

const IDN_MA = 30; // jmenovitý reziduální proud doplňkového chrániče (K6-04, K6-08, K5-09)
const MAX_MA = 50;

type Cesta = "pe" | "telo";

const CESTY: Record<Cesta, { nazev: string; popis: string }> = {
  pe: { nazev: "ochranný vodič", popis: "přes ochranný vodič PE" },
  telo: { nazev: "tělo člověka", popis: "přes tělo člověka do země" }
};

// Geometrie (viewBox 360 × 232). Barvy jsou ve třídách, ne var() v atributech.
const Y_L = 58;
const Y_N = 100;
const X_TOROID = 92;
const X_KONTAKT = 164;
const X_SPOTREBIC = 250;
const Y_ZEM = 214;

function Kontakt({ y, vypnuto }: { y: number; vypnuto: boolean }) {
  return vypnuto ? (
    <line x1={X_KONTAKT} y1={y} x2={X_KONTAKT + 20} y2={y - 14} strokeWidth={3} strokeLinecap="round" className="stroke-text" />
  ) : (
    <line x1={X_KONTAKT} y1={y} x2={X_KONTAKT + 24} y2={y} strokeWidth={3} strokeLinecap="round" className="stroke-text" />
  );
}

export default function ProudovyChranic() {
  const [unik, setUnik] = useState(10);
  const [cesta, setCesta] = useState<Cesta>("pe");
  const [vybaveno, setVybaveno] = useState(false);

  function nastavUnik(ma: number) {
    const hodnota = Math.min(MAX_MA, Math.max(0, ma));
    setUnik(hodnota);
    if (hodnota >= IDN_MA) setVybaveno(true);
  }

  const tece = !vybaveno && unik > 0;
  const tlumit = vybaveno ? 0.35 : 1;
  const sirkaUniku = 1.5 + (unik / MAX_MA) * 4;
  const xUnik = 300;

  return (
    <>
      <NadpisIlustrace
        nadpis="Proudový chránič"
        napoveda="Nastavte unikající proud a cestu, kudy odtéká. Při 30 mA chránič vybaví."
      />

      <svg
        viewBox="0 0 360 232"
        className="block h-auto w-full select-none"
        role="img"
        aria-label={
          vybaveno
            ? "Chránič vybavil a obvod je odpojený."
            : `Unikající proud ${unik} mA ${CESTY[cesta].popis}, chránič je zapnutý.`
        }
      >
        {/* proudový chránič */}
        <rect x={60} y={30} width={150} height={142} rx={10} fill="none" strokeWidth={1.5} strokeDasharray="5 4" className="stroke-tlumeny" />
        <text x={66} y={24} fontSize={11} fontWeight={600} className="fill-text">
          proudový chránič
        </text>

        {/* vodiče L a N */}
        <text x={8} y={Y_L + 4} fontSize={11} className="fill-tlumeny font-mono">
          L
        </text>
        <text x={8} y={Y_N + 4} fontSize={11} className="fill-tlumeny font-mono">
          N
        </text>
        <line x1={22} y1={Y_L} x2={X_KONTAKT} y2={Y_L} strokeWidth={4} className="stroke-vodic-hneda" />
        <line x1={22} y1={Y_N} x2={X_KONTAKT} y2={Y_N} strokeWidth={4} className="stroke-vodic-modra" />
        <g opacity={tlumit}>
          <line x1={X_KONTAKT + 24} y1={Y_L} x2={X_SPOTREBIC} y2={Y_L} strokeWidth={4} className="stroke-vodic-hneda" />
          <line x1={X_KONTAKT + 24} y1={Y_N} x2={X_SPOTREBIC} y2={Y_N} strokeWidth={4} className="stroke-vodic-modra" />
        </g>
        <Kontakt y={Y_L} vypnuto={vybaveno} />
        <Kontakt y={Y_N} vypnuto={vybaveno} />
        <circle cx={X_KONTAKT} cy={Y_L} r={3} className="fill-text" />
        <circle cx={X_KONTAKT} cy={Y_N} r={3} className="fill-text" />

        {/* součtový transformátor a spoušť */}
        <ellipse cx={X_TOROID} cy={(Y_L + Y_N) / 2} rx={13} ry={34} fill="none" strokeWidth={6} className="stroke-primarni" />
        <text x={X_TOROID} y={146} fontSize={10} textAnchor="middle" className="fill-tlumeny">
          součtový
        </text>
        <text x={X_TOROID} y={158} fontSize={10} textAnchor="middle" className="fill-tlumeny">
          transformátor
        </text>
        <path d={`M${X_TOROID + 12} 106 L134 128`} fill="none" strokeWidth={1.5} className="stroke-primarni" />
        <rect x={130} y={122} width={48} height={22} rx={4} strokeWidth={1.5} className={`fill-plocha ${vybaveno ? "stroke-spatne" : "stroke-primarni"}`} />
        <text x={154} y={137} fontSize={10} textAnchor="middle" className={vybaveno ? "fill-spatne" : "fill-primarni"}>
          spoušť
        </text>
        <line x1={170} y1={122} x2={174} y2={Y_N + 4} strokeWidth={1.5} strokeDasharray="3 3" className="stroke-tlumeny" />
        <text x={135} y={83} fontSize={10.5} textAnchor="middle" className={vybaveno ? "fill-spatne font-mono" : "fill-text font-mono"} fontWeight={600}>
          {vybaveno ? "vypnuto" : `Δ ${unik} mA`}
        </text>

        {/* spotřebič a jeho kryt */}
        <g opacity={tlumit}>
          <rect x={X_SPOTREBIC} y={38} width={86} height={84} rx={8} strokeWidth={3} className="fill-plocha stroke-text" />
          <text x={X_SPOTREBIC + 52} y={104} fontSize={11} textAnchor="middle" className="fill-text">
            spotřebič
          </text>
          <text x={X_SPOTREBIC + 52} y={116} fontSize={10} textAnchor="middle" className="fill-tlumeny">
            kovový kryt
          </text>
        </g>

        {/* cesta unikajícího proudu mimo chránič */}
        {cesta === "pe" ? (
          <g opacity={tlumit}>
            <path
              d={`M${xUnik} 122 V194 H22`}
              fill="none"
              strokeWidth={5}
              className="stroke-vodic-zelena"
            />
            <path d={`M${xUnik} 122 V194 H22`} fill="none" strokeWidth={5} strokeDasharray="7 7" className="stroke-vodic-zluta" />
            <text x={30} y={188} fontSize={10.5} className="fill-tlumeny">
              PE – vede mimo chránič
            </text>
            {tece && (
              <path
                d={`M${xUnik} 122 V194 H22`}
                fill="none"
                strokeWidth={sirkaUniku}
                strokeLinecap="round"
                className="stroke-spatne"
                strokeOpacity={0.85}
              />
            )}
          </g>
        ) : (
          <g opacity={tlumit}>
            {/* zjednodušená postava: ruka na krytu, nohy na zemi */}
            <circle cx={318} cy={140} r={8} strokeWidth={2.5} className="fill-plocha stroke-text" />
            <line x1={318} y1={148} x2={318} y2={182} strokeWidth={2.5} className="stroke-text" />
            <line x1={318} y1={156} x2={xUnik} y2={122} strokeWidth={2.5} className="stroke-text" />
            <line x1={318} y1={182} x2={308} y2={Y_ZEM} strokeWidth={2.5} className="stroke-text" />
            <line x1={318} y1={182} x2={328} y2={Y_ZEM} strokeWidth={2.5} className="stroke-text" />
            {tece && (
              <path
                d={`M${xUnik} 122 L318 156 V182 L318 ${Y_ZEM}`}
                fill="none"
                strokeWidth={sirkaUniku}
                strokeLinecap="round"
                className="stroke-spatne"
                strokeOpacity={0.85}
              />
            )}
            <line x1={262} y1={Y_ZEM} x2={352} y2={Y_ZEM} strokeWidth={2} className="stroke-tlumeny" />
            {[268, 280, 292, 304, 316, 328, 340].map((x) => (
              <line key={x} x1={x} y1={Y_ZEM} x2={x - 8} y2={Y_ZEM + 8} strokeWidth={1.2} className="stroke-tlumeny" />
            ))}
            <text x={256} y={Y_ZEM - 8} fontSize={10.5} textAnchor="end" className="fill-tlumeny">
              tělo → zem, mimo chránič
            </text>
          </g>
        )}

        {/* blesk = porucha izolace na kryt */}
        {unik > 0 && (
          <path
            d={`M${X_SPOTREBIC + 8} ${Y_L + 4} l8 10 -6 2 8 12`}
            fill="none"
            strokeWidth={2.5}
            strokeLinejoin="round"
            className="stroke-spatne"
            opacity={tlumit}
          />
        )}
      </svg>

      <div className="mt-2 space-y-3">
        <div>
          <p className={nadpisSekce}>Kudy proud uniká</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {(Object.keys(CESTY) as Cesta[]).map((c) => (
              <Volba key={c} zvoleno={cesta === c} onClick={() => setCesta(c)}>
                {CESTY[c].nazev}
              </Volba>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="chranic-unik" className="text-sm font-medium">
            Unikající proud: <span className="font-mono font-semibold">{unik} mA</span>
          </label>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => nastavUnik(unik - 1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha"
              aria-label="O 1 mA méně"
            >
              <Icon nazev="minus" size={18} />
            </button>
            <input
              id="chranic-unik"
              type="range"
              min={0}
              max={MAX_MA}
              step={1}
              value={unik}
              onChange={(e) => nastavUnik(Number(e.target.value))}
              aria-valuetext={`${unik} mA`}
              className="h-11 min-w-0 flex-1 accent-primarni"
            />
            <button
              type="button"
              onClick={() => nastavUnik(unik + 1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha"
              aria-label="O 1 mA více"
            >
              <Icon nazev="plus" size={18} />
            </button>
          </div>
          <div className="mt-0.5 flex justify-between font-mono text-xs text-tlumeny" aria-hidden="true">
            <span>0</span>
            <span className="font-semibold text-spatne">IΔn = 30 mA</span>
            <span>50</span>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        {vybaveno ? (
          <>
            <p className="flex items-center gap-2 font-semibold text-spatne">
              <Icon nazev="blesk" size={18} />
              Chránič vybavil – obvod je odpojený
            </p>
            <p className="mt-1 text-sm">
              Unikající proud dosáhl jmenovitého reziduálního proudu IΔn = 30 mA. Zapnout znovu má smysl, až je unikající
              proud menší než IΔn.
            </p>
            <button
              type="button"
              onClick={() => setVybaveno(false)}
              disabled={unik >= IDN_MA}
              className={`${tlacitkoPrimarni} mt-3 w-full`}
            >
              Zapnout znovu
            </button>
          </>
        ) : (
          <>
            <p className="font-semibold">
              Zapnuto · rozdíl proudů <span className="font-mono">{unik} mA</span>
            </p>
            <p className="mt-1 text-sm">
              {unik === 0
                ? "Proud, který teče vodičem L ke spotřebiči, se celý vrací vodičem N."
                : `Část proudu (${unik} mA) odtéká ${CESTY[cesta].popis} a do vodiče N se nevrátí. Do IΔn = 30 mA zbývá ${IDN_MA - unik} mA.`}
            </p>
          </>
        )}

        <h4 className={`${nadpisSekce} mt-4`}>Princip</h4>
        <p className="mt-1 text-sm">
          Chránič porovnává součtovým transformátorem proudy v pracovních vodičích L a N. Vybaví, když část proudu
          odtéká mimo chránič – například přes tělo člověka nebo přes ochranný vodič.
        </p>
        <h4 className={`${nadpisSekce} mt-3`}>Proč 30 mA</h4>
        <p className="mt-1 text-sm">
          Proudy nad 30 mA mohou být smrtelné, pokud nedojde k rychlému odpojení. Z toho vychází citlivost doplňkových
          chráničů 30 mA; HD 60364-4-41:2017 je povinně vyžaduje u zásuvkových obvodů do 32 A.
        </p>
        <h4 className={`${nadpisSekce} mt-3`}>Doplňková ochrana</h4>
        <p className="mt-1 text-sm">
          Chránič s IΔn 30 mA není jediné ochranné opatření. Doplňuje základní ochranu a ochranu při poruše.
        </p>
        <p className="mt-3 text-xs text-tlumeny">Ilustrace zjednodušuje: chránič tu vybaví přesně při dosažení 30 mA.</p>
        <div className="mt-3">
          <Zdroje fakta={["K6-07", "K5-09", "K6-04", "K6-08"]} />
        </div>
      </div>
    </>
  );
}
