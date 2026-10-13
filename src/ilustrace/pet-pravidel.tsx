// Ilustrace „Pět pravidel práce bez napětí“: krokovač 1–5 se schématem odpojovače, zámku,
// zkoušečky, uzemňovací a zkratovací soupravy a izolačního krytu.
// Pořadí: K4-03. Kroky: K4-04 (ověření), K4-05 (uzemnění a zkratování), K4-06 (zajištění u NN),
// K4-07 a K4-08 (sousední živé části). Barvy fází podle K7-04.
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { nadpisSekce, tlacitkoSekundarni } from "../components/styly";
import { NadpisIlustrace } from "./ovladani";

interface Krok {
  nazev: string;
  proc: string;
  pozor: string[];
  fakta: string[];
}

const KROKY: Krok[] = [
  {
    nazev: "Vypnutí",
    proc: "Místo práce se odpojí od napětí. Odpojit je nutné ve všech pólech – rozpojit jen některé vodiče nestačí.",
    pozor: ["odpojit ve všech pólech"],
    fakta: ["K4-03"]
  },
  {
    nazev: "Zajištění proti opětovnému zapnutí",
    proc: "Odpojené zařízení nesmí během práce nikdo znovu zapnout.",
    pozor: ["u nízkého napětí například vyjmout pojistky a vložit místo nich blokovací prvky"],
    fakta: ["K4-03", "K4-06"]
  },
  {
    nazev: "Ověření beznapěťového stavu",
    proc: "Teprve ověření potvrdí, že odpojené a zajištěné místo je opravdu bez napětí.",
    pozor: ["vhodná zkoušečka nebo měřicí přístroj", "ověřit ve všech pólech", "funkci zkoušečky ověřit před jejím použitím"],
    fakta: ["K4-03", "K4-04"]
  },
  {
    nazev: "Uzemnění a zkratování",
    proc: "Uzemňují a zkratují se až části, u kterých byl ověřen beznapěťový stav.",
    pozor: ["nejdřív uzemnit, potom zkratovat", "soupravy odolné zkratovým proudům"],
    fakta: ["K4-03", "K4-05"]
  },
  {
    nazev: "Ochrana před sousedními živými částmi",
    proc: "V pásmu práce v blízkosti mohou zůstat živé části, které nejde odpojit.",
    pozor: ["zakrýt je izolačními kryty nebo zakrývacím materiálem proti náhodnému dotyku"],
    fakta: ["K4-03", "K4-07", "K4-08"]
  }
];

// Geometrie schématu. Barvy jsou ve třídách (CSS), ne var() v atributech SVG.
const FAZE = [
  { x: 60, nazev: "L1", tah: "stroke-vodic-hneda" },
  { x: 96, nazev: "L2", tah: "stroke-vodic-cerna" },
  { x: 132, nazev: "L3", tah: "stroke-vodic-seda" }
];
const Y_KONTAKT = 62;
const Y_CEP = 100;
const Y_KONEC = 248;
const X_SOUSED = 304;

function Vodic({ x, y1, y2, tah, cerna }: { x: number; y1: number; y2: number; tah: string; cerna: boolean }) {
  return (
    <>
      {cerna && <line x1={x} y1={y1} x2={x} y2={y2} strokeWidth={6} className="stroke-vodic-cerna-obrys" />}
      <line x1={x} y1={y1} x2={x} y2={y2} strokeWidth={4} className={tah} />
    </>
  );
}

export default function PetPravidel() {
  const [krok, setKrok] = useState(1);
  const k = KROKY[krok - 1];
  const zvyrazni = (n: number) => (n === krok ? "stroke-primarni" : "stroke-text");
  const vypln = (n: number) => (n === krok ? "fill-primarni" : "fill-text");

  return (
    <>
      <NadpisIlustrace nadpis="Pět pravidel práce bez napětí" napoveda="Projděte kroky 1–5. Každý krok přidá do schématu jeden prvek." />

      <svg
        viewBox="0 0 360 264"
        className="block h-auto w-full select-none"
        role="img"
        aria-label={`Schéma práce bez napětí, krok ${krok}: ${k.nazev}`}
      >
        <defs>
          <pattern id="pet-srafy" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="3" height="6" className="fill-primarni" fillOpacity={0.35} />
          </pattern>
        </defs>

        {/* přívod – zůstává pod napětím */}
        {FAZE.map((f, i) => (
          <g key={f.nazev}>
            <text x={f.x} y={14} fontSize={11} textAnchor="middle" className="fill-tlumeny font-mono">
              {f.nazev}
            </text>
            <Vodic x={f.x} y1={20} y2={Y_KONTAKT} tah={f.tah} cerna={i === 1} />
            <circle cx={f.x} cy={Y_KONTAKT} r={3.5} className="fill-text" />
          </g>
        ))}
        <text x={150} y={36} fontSize={11} className="fill-overit" fontWeight={600}>
          přívod pod napětím
        </text>

        {/* 1 – odpojovač: rozpojené nože ve všech pólech */}
        {FAZE.map((f) => (
          <g key={`nuz-${f.nazev}`}>
            <line
              x1={f.x}
              y1={Y_CEP}
              x2={f.x + 20}
              y2={Y_KONTAKT + 8}
              strokeWidth={3}
              strokeLinecap="round"
              className={zvyrazni(1)}
            />
            <circle cx={f.x} cy={Y_CEP} r={4} className={vypln(1)} />
          </g>
        ))}
        <line x1={FAZE[0].x + 10} y1={84} x2={176} y2={84} strokeWidth={1.5} strokeDasharray="4 3" className={zvyrazni(1)} />
        <text x={182} y={80} fontSize={11} className="fill-tlumeny">
          odpojovač
        </text>
        <text x={182} y={93} fontSize={11} className={krok === 1 ? "fill-primarni" : "fill-tlumeny"}>
          rozpojen ve všech pólech
        </text>

        {/* 2 – zámek / blokovací prvek */}
        {krok >= 2 && (
          <g>
            <path d="M184 110 v-6 a6 6 0 0 1 12 0 v6" fill="none" strokeWidth={2.5} className={zvyrazni(2)} />
            <rect x={180} y={109} width={20} height={15} rx={2.5} className={vypln(2)} />
            <text x={206} y={121} fontSize={11} className={krok === 2 ? "fill-primarni" : "fill-tlumeny"}>
              zajištěno
            </text>
          </g>
        )}

        {/* místo práce */}
        {FAZE.map((f, i) => (
          <Vodic key={`prace-${f.nazev}`} x={f.x} y1={Y_CEP} y2={Y_KONEC} tah={f.tah} cerna={i === 1} />
        ))}
        <rect x={40} y={134} width={114} height={122} rx={8} fill="none" strokeWidth={1.5} strokeDasharray="5 4" className="stroke-tlumeny" />
        <text x={46} y={150} fontSize={10.5} className="fill-tlumeny">
          místo práce
        </text>

        {/* 3 – zkoušečka, ověření ve všech pólech */}
        {krok >= 3 && (
          <g>
            {FAZE.map((f) => (
              <g key={`zk-${f.nazev}`}>
                <circle cx={f.x} cy={170} r={6} className={vypln(3)} />
                <path d={`M${f.x - 3} 170 l2 2.5 4 -5`} fill="none" strokeWidth={1.8} className="stroke-plocha" />
              </g>
            ))}
            <rect x={178} y={142} width={46} height={58} rx={7} strokeWidth={2} className={`fill-plocha ${zvyrazni(3)}`} />
            <text x={201} y={166} fontSize={13} fontWeight={600} textAnchor="middle" className={krok === 3 ? "fill-primarni font-mono" : "fill-text font-mono"}>
              0 V
            </text>
            <text x={201} y={190} fontSize={9.5} textAnchor="middle" className="fill-tlumeny">
              zkoušečka
            </text>
            <line x1={178} y1={170} x2={FAZE[2].x + 8} y2={170} strokeWidth={1.5} strokeDasharray="3 3" className={zvyrazni(3)} />
          </g>
        )}

        {/* 4 – uzemňovací a zkratovací souprava: 1. uzemnit, 2. zkratovat */}
        {krok >= 4 && (
          <g>
            <line x1={48} y1={212} x2={FAZE[2].x} y2={212} strokeWidth={3} className={zvyrazni(4)} />
            {FAZE.map((f) => (
              <rect key={`sv-${f.nazev}`} x={f.x - 5} y={207} width={10} height={10} rx={2} className={vypln(4)} />
            ))}
            <line x1={48} y1={212} x2={48} y2={232} strokeWidth={3} className={zvyrazni(4)} />
            <line x1={36} y1={232} x2={60} y2={232} strokeWidth={2.5} className={zvyrazni(4)} />
            <line x1={40} y1={238} x2={56} y2={238} strokeWidth={2.5} className={zvyrazni(4)} />
            <line x1={44} y1={244} x2={52} y2={244} strokeWidth={2.5} className={zvyrazni(4)} />
            <text x={162} y={216} fontSize={11} className={krok === 4 ? "fill-primarni" : "fill-tlumeny"}>
              2. zkratovat
            </text>
            <text x={162} y={242} fontSize={11} className={krok === 4 ? "fill-primarni" : "fill-tlumeny"}>
              1. uzemnit
            </text>
          </g>
        )}

        {/* 5 – sousední živá část a izolační kryt */}
        <text x={X_SOUSED} y={124} fontSize={10.5} textAnchor="middle" className="fill-tlumeny">
          sousední
        </text>
        <text x={X_SOUSED} y={137} fontSize={10.5} textAnchor="middle" className="fill-tlumeny">
          živá část
        </text>
        <line x1={X_SOUSED} y1={146} x2={X_SOUSED} y2={Y_KONEC} strokeWidth={4} className="stroke-vodic-hneda" />
        {krok >= 5 && (
          <rect
            x={X_SOUSED - 16}
            y={150}
            width={32}
            height={Y_KONEC - 150 + 4}
            rx={9}
            fill="url(#pet-srafy)"
            strokeWidth={2.5}
            className="stroke-primarni"
          />
        )}
        <text x={X_SOUSED} y={262} fontSize={10.5} textAnchor="middle" fontWeight={600} className={krok >= 5 ? "fill-primarni" : "fill-overit"}>
          {krok >= 5 ? "izolační kryt" : "pod napětím"}
        </text>
      </svg>

      <div className="mt-3 flex items-center justify-between gap-1" role="group" aria-label="Kroky">
        {KROKY.map((kk, i) => {
          const n = i + 1;
          const aktivni = n === krok;
          return (
            <button
              key={kk.nazev}
              type="button"
              onClick={() => setKrok(n)}
              aria-current={aktivni ? "step" : undefined}
              aria-label={`Krok ${n}: ${kk.nazev}`}
              className={`flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-lg border-2 font-mono text-base font-semibold transition-colors duration-150 ${
                aktivni
                  ? "border-primarni bg-primarni text-na-primarni"
                  : n < krok
                    ? "border-primarni/50 bg-primarni/10 text-primarni"
                    : "border-hrana bg-plocha text-text"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>

      <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="font-semibold">
          <span className="font-mono text-primarni">{krok}.</span> {k.nazev}
        </p>
        <h4 className={`${nadpisSekce} mt-3`}>Proč</h4>
        <p className="mt-1 text-sm">{k.proc}</p>
        <h4 className={`${nadpisSekce} mt-3`}>Na co nezapomenout</h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {k.pozor.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mt-3">
          <Zdroje fakta={k.fakta} />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setKrok((n) => Math.max(1, n - 1))} disabled={krok === 1} className={tlacitkoSekundarni}>
          <Icon nazev="sipkaVlevo" size={18} />
          Předchozí
        </button>
        <button type="button" onClick={() => setKrok((n) => Math.min(KROKY.length, n + 1))} disabled={krok === KROKY.length} className={tlacitkoSekundarni}>
          Další
          <Icon nazev="sipkaVpravo" size={18} />
        </button>
      </div>
    </>
  );
}
