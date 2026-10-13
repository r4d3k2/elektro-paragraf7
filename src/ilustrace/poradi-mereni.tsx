// Ilustrace „Pořadí zkoušek a měření“ podle přílohy č. 1 NV č. 190/2022 Sb. (K9-01).
// Prohlídka předchází zkoušce: K9-02. Nepovinné body: K9-07. Podrobnosti u některých kroků:
// K9-08 (izolační odpor) a K9-11 (impedance smyčky) mají stav „overit“ – proto poznámka; K6-02 a K9-03 ověřené.
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { OdznakOverit } from "../components/OdznakOverit";
import { tlacitkoSekundarni } from "../components/styly";
import { maOverit } from "../lib/fakta";
import { NadpisIlustrace } from "./ovladani";

interface Krok {
  nazev: string;
  podrobnosti?: string[];
  fakta: string[];
}

// Pořadí a názvy: K9-01.
const KROKY: Krok[] = [
  { nazev: "Spojitost ochranných vodičů a vodičů pospojování", fakta: ["K9-01"] },
  {
    nazev: "Izolační stav",
    podrobnosti: [
      "Izolační odpor obvodů do 500 V se měří stejnosměrným napětím 500 V, nejmenší přípustná hodnota je 1 MΩ – ověřit v normě."
    ],
    fakta: ["K9-01", "K9-08"]
  },
  { nazev: "Ochrana oddělením obvodů a SELV/PELV", fakta: ["K9-01"] },
  { nazev: "Izolační odpor podlahy a stěn", fakta: ["K9-01"] },
  {
    nazev: "Automatické odpojení od zdroje",
    podrobnosti: [
      "Měřením impedance poruchové smyčky se ověřuje, zda při poruše proteče dostatečný proud, aby ochranný prvek odpojil v předepsané době – ověřit v normě.",
      "Nejdelší doby odpojení v koncových obvodech 230 V: síť TN 0,4 s, síť TT 0,2 s."
    ],
    fakta: ["K9-01", "K9-11", "K6-02"]
  },
  { nazev: "Zkouška zapojení přístrojů", fakta: ["K9-01"] },
  {
    nazev: "Zkouška elektrické pevnosti",
    podrobnosti: ["Provádí se jen tehdy, nemají-li použité výrobky vlastnosti doložené výrobcem."],
    fakta: ["K9-01", "K9-03"]
  },
  {
    nazev: "Funkční zkouška",
    podrobnosti: [
      "Funkčně se zkoušejí hlídače izolačního stavu, proudové chrániče (zkušebním tlačítkem nebo postupem výrobce či normy), nouzové vypnutí a blokování, hlásiče a ukazatele stavu a přepěťové ochrany."
    ],
    fakta: ["K9-01", "K9-03"]
  },
  { nazev: "Tepelné účinky", fakta: ["K9-01"] },
  { nazev: "Úbytek napětí", fakta: ["K9-01"] },
  { nazev: "Zkouška polarity", fakta: ["K9-01"] },
  { nazev: "Pořadí fází", fakta: ["K9-01"] }
];

// Geometrie: 12 kroků ve dvou řadách „hadem“ – 1–6 zleva doprava, 7–12 zprava doleva.
const X0 = 32;
const KROK_X = 59.2;
const Y1 = 30;
const Y2 = 86;

function poloha(i: number): { x: number; y: number } {
  return i < 6 ? { x: X0 + i * KROK_X, y: Y1 } : { x: X0 + (11 - i) * KROK_X, y: Y2 };
}

export default function PoradiMereni() {
  const [krok, setKrok] = useState(0);
  const k = KROKY[krok];
  const cesta = KROKY.map((_, i) => poloha(i))
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");

  return (
    <>
      <NadpisIlustrace
        nadpis="Pořadí zkoušek a měření"
        napoveda="Příloha č. 1 NV č. 190/2022 Sb. Klepněte na krok nebo listujte šipkami."
      />

      <p className="mb-2 flex items-center gap-2 text-sm">
        <Icon nazev="info" size={18} className="shrink-0 text-primarni" />
        <span>Před zkouškami je vždy prohlídka – prohlídka předchází zkoušce.</span>
      </p>

      <svg viewBox="0 0 360 124" className="block h-auto w-full select-none" role="img" aria-label={`Krok ${krok + 1} z 12: ${k.nazev}`}>
        <path d={cesta} fill="none" strokeWidth={3} strokeLinejoin="round" className="stroke-hrana" />
        {KROKY.map((kk, i) => {
          const { x, y } = poloha(i);
          const aktivni = i === krok;
          const hotovo = i < krok;
          return (
            <g key={kk.nazev} onClick={() => setKrok(i)} className="cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r={aktivni ? 17 : 14}
                strokeWidth={2}
                className={
                  aktivni
                    ? "fill-primarni stroke-primarni"
                    : hotovo
                      ? "fill-plocha stroke-primarni"
                      : "fill-plocha stroke-hrana"
                }
              />
              <text
                x={x}
                y={y + 4.5}
                fontSize={aktivni ? 14 : 12.5}
                fontWeight={600}
                textAnchor="middle"
                className={`font-mono ${aktivni ? "fill-na-primarni" : hotovo ? "fill-primarni" : "fill-text"}`}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
        <text x={X0 - 20} y={Y1 + 34} fontSize={9.5} className="fill-tlumeny">
          začátek
        </text>
        <text x={X0 - 20} y={Y2 + 30} fontSize={9.5} className="fill-tlumeny">
          konec
        </text>
      </svg>

      <div className="mt-2 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="font-semibold">
          <span className="font-mono text-primarni">{krok + 1}.</span> {k.nazev}
        </p>
        {k.podrobnosti && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {k.podrobnosti.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {maOverit(k.fakta) && (
          <div className="mt-2">
            <OdznakOverit popis="Podrobnost u tohoto kroku je potřeba ověřit v normě." />
          </div>
        )}
        <div className="mt-3">
          <Zdroje fakta={k.fakta} />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setKrok((n) => Math.max(0, n - 1))} disabled={krok === 0} className={tlacitkoSekundarni}>
          <Icon nazev="sipkaVlevo" size={18} />
          Předchozí
        </button>
        <button
          type="button"
          onClick={() => setKrok((n) => Math.min(KROKY.length - 1, n + 1))}
          disabled={krok === KROKY.length - 1}
          className={tlacitkoSekundarni}
        >
          Další
          <Icon nazev="sipkaVpravo" size={18} />
        </button>
      </div>

      <ol className="mt-4 space-y-1" aria-label="Celé pořadí">
        {KROKY.map((kk, i) => (
          <li key={kk.nazev}>
            <button
              type="button"
              onClick={() => setKrok(i)}
              aria-current={i === krok ? "step" : undefined}
              className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-2 text-left text-sm transition-colors duration-150 ${
                i === krok ? "bg-primarni/10 font-semibold text-primarni" : "hover:bg-plocha-2"
              }`}
            >
              <span className="w-6 shrink-0 text-right font-mono text-tlumeny">{i + 1}.</span>
              <span className="min-w-0 flex-1">{kk.nazev}</span>
              {kk.podrobnosti && <Icon nazev="info" size={16} className="shrink-0 text-tlumeny" title="Má podrobnosti" />}
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-3 text-sm text-tlumeny">
        Bod, který není technicky proveditelný nebo není z hlediska bezpečnosti důvodný, se provádět nemusí; výrobce může
        stanovit odlišné nebo další požadavky.
      </p>
      <div className="mt-3">
        <Zdroje fakta={["K9-01", "K9-02", "K9-07"]} nadpis="Zdroje pořadí" />
      </div>
    </>
  );
}
