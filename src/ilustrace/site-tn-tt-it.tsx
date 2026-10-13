// Ilustrace „Sítě TN, TT a IT“: přepínač TN-C / TN-S / TN-C-S / TT / IT a schéma se zdrojem, vodiči
// L1–L3, N, PE nebo PEN, uzemněním zdroje a neživých částí a spotřebičem třídy I. Tlačítko „Porucha
// na kostře“ zvýrazní cestu poruchového proudu a vysvětlí, co odpojí a kde se nesmí použít proudový chránič.
// Označení sítí: K7-01 (stav „overit“ – poznámka). Distribuční sítě: K7-02. Rozdělení PEN: K7-03 („overit“).
// Barvy vodičů: K7-04, PEN: K7-06. TT: K7-09. IT: K7-10, K7-11 („overit“). Doby odpojení: K6-02, K6-03.
// Proudový chránič a PEN: K6-06.
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { OdznakOverit } from "../components/OdznakOverit";
import { nadpisSekce } from "../components/styly";
import { maOverit } from "../lib/fakta";
import { NadpisIlustrace } from "./ovladani";

type SitId = "TN-C" | "TN-S" | "TN-C-S" | "TT" | "IT";

interface Pismeno {
  znak: string;
  vyznam: string;
}

interface Sit {
  id: SitId;
  pismena: Pismeno[];
  poznamky: string[];
  porucha: string[];
  chranic?: string;
  fakta: string[];
}

const ZDROJ_T: Pismeno = { znak: "T", vyznam: "zdroj má přímo uzemněný bod" };
const KOSTRA_N: Pismeno = { znak: "N", vyznam: "neživé části jsou spojené s uzemněným bodem zdroje" };
const KOSTRA_T: Pismeno = { znak: "T", vyznam: "neživé části jsou uzemněné samostatně" };
const ODPOJENI_TN = "Ochranný prvek musí odpojit koncový obvod 230 V nejpozději do 0,4 s, distribuční obvod do 5 s.";

const SITE: Sit[] = [
  {
    id: "TN-C",
    pismena: [ZDROJ_T, KOSTRA_N, { znak: "C", vyznam: "funkce středního a ochranného vodiče jsou sloučené ve vodiči PEN" }],
    poznamky: [
      "Distribuční sítě nízkého napětí dodavatele elektřiny jsou typu TN-C, výjimečně TN-C-S.",
      "Vodič PEN se značí zelenožlutě se světle modrými značkami na koncích, nebo světle modře se zelenožlutými značkami."
    ],
    porucha: ["Poruchový proud teče z fázového vodiče přes kostru do vodiče PEN a jím zpět ke zdroji.", ODPOJENI_TN],
    chranic: "Proudový chránič se v síti TN-C nesmí použít.",
    fakta: ["K7-01", "K7-02", "K7-06", "K6-02", "K6-03", "K6-06"]
  },
  {
    id: "TN-S",
    pismena: [ZDROJ_T, KOSTRA_N, { znak: "S", vyznam: "střední vodič N a ochranný vodič PE jsou oddělené" }],
    poznamky: ["Ochranný vodič PE má izolaci zelenožlutou, střední vodič N světle modrou."],
    porucha: ["Poruchový proud teče z fázového vodiče přes kostru do ochranného vodiče PE a jím zpět ke zdroji.", ODPOJENI_TN],
    fakta: ["K7-01", "K7-04", "K6-02", "K6-03"]
  },
  {
    id: "TN-C-S",
    pismena: [
      ZDROJ_T,
      KOSTRA_N,
      { znak: "C-S", vyznam: "v první části sítě je vodič PEN, za místem rozdělení jsou vodiče N a PE oddělené" }
    ],
    poznamky: [
      "Vodič PEN se rozděluje na ochranný vodič PE a střední vodič N; za místem rozdělení se už nesmějí znovu spojit – ověřit v normě.",
      "Distribuční sítě nízkého napětí dodavatele jsou typu TN-C, výjimečně TN-C-S."
    ],
    porucha: [
      "Poruchový proud teče z fázového vodiče přes kostru do vodiče PE, za místem rozdělení vodičem PEN zpět ke zdroji.",
      ODPOJENI_TN
    ],
    chranic: "Na straně zátěže za proudovým chráničem se nesmí použít vodič PEN.",
    fakta: ["K7-01", "K7-03", "K7-02", "K6-02", "K6-03", "K6-06"]
  },
  {
    id: "TT",
    pismena: [ZDROJ_T, KOSTRA_T],
    poznamky: ["Neživé části se v síti TT nesmějí připojovat na střední vodič."],
    porucha: [
      "Poruchový proud teče z kostry přes uzemnění spotřebiče a zemí k uzemnění zdroje.",
      "Ochranný prvek musí odpojit koncový obvod 230 V nejpozději do 0,2 s, distribuční obvod do 1 s."
    ],
    fakta: ["K7-01", "K7-09", "K6-02", "K6-03"]
  },
  {
    id: "IT",
    pismena: [{ znak: "I", vyznam: "zdroj je izolovaný od země, nebo uzemněný přes impedanci" }, KOSTRA_T],
    poznamky: [
      "Stav izolace sleduje hlídač izolačního stavu, aby se první porucha odhalila dřív, než nastane druhá – ověřit v normě."
    ],
    porucha: [
      "Při první poruše mezi živou částí a zemí je poruchový proud malý a odpojení se nevyžaduje.",
      "Hlídač izolačního stavu má první poruchu odhalit dřív, než nastane druhá."
    ],
    fakta: ["K7-01", "K7-10", "K7-11"]
  }
];

// ─── Geometrie schématu (viewBox 360 × 252) ─────────────────────────────
const X_START = 52;
const X_KONEC = 330;
const Y = { L1: 32, L2: 46, L3: 60, N: 80, PEN: 88, PE: 98 };
const X_ZEM_ZDROJ = 30;
const Y_UZEL = 124;
const Y_ZEM = 232;
const X_ROZDELENI = 170;
const KOSTRA = { x: 222, y: 136, w: 100, h: 64 };
const X_L1 = 250;
const X_DRUHY = 274;
const X_PE = 306;

type Druh = "L1" | "L2" | "L3" | "N" | "PE" | "PEN";

const TAH: Record<Exclude<Druh, "PE" | "PEN">, string> = {
  L1: "stroke-vodic-hneda",
  L2: "stroke-vodic-cerna",
  L3: "stroke-vodic-seda",
  N: "stroke-vodic-modra"
};

function Vodic({ d, druh }: { d: string; druh: Druh }) {
  if (druh === "PE" || druh === "PEN") {
    return (
      <>
        <path d={d} fill="none" strokeWidth={3.5} className="stroke-vodic-zelena" />
        <path d={d} fill="none" strokeWidth={3.5} strokeDasharray="5 5" className="stroke-vodic-zluta" />
      </>
    );
  }
  return (
    <>
      {druh === "L2" && <path d={d} fill="none" strokeWidth={5} className="stroke-vodic-cerna-obrys" />}
      <path d={d} fill="none" strokeWidth={3} className={TAH[druh]} />
    </>
  );
}

/** Světle modrá značka na konci vodiče PEN (K7-06). */
function ZnackaPen({ x, y, svisle = false }: { x: number; y: number; svisle?: boolean }) {
  return svisle ? (
    <rect x={x - 2.5} y={y} width={5} height={7} className="fill-vodic-modra" />
  ) : (
    <rect x={x} y={y - 2.5} width={7} height={5} className="fill-vodic-modra" />
  );
}

function Uzel({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={3.2} className="fill-text" />;
}

function Popisek({ y, text }: { y: number; text: string }) {
  return (
    <text x={X_KONEC + 4} y={y + 3.5} fontSize={9.5} className="fill-tlumeny font-mono">
      {text}
    </text>
  );
}

/** Cesta poruchového proudu jako lomená čára. */
function cestaPoruchy(sit: SitId): { hlavni: string; slaba?: string } {
  const k = KOSTRA;
  const zacatek = `M${X_START} ${Y.L1} H${X_L1} V146 L${k.x} 150`;
  switch (sit) {
    case "TN-C":
      return { hlavni: `${zacatek} V${k.y} H${X_DRUHY} V${Y.PEN} H${X_START}` };
    case "TN-S":
      return { hlavni: `${zacatek} V${k.y} H${X_PE} V${Y.PE} H66 V150 H${X_ZEM_ZDROJ} V${Y_UZEL}` };
    case "TN-C-S":
      return { hlavni: `${zacatek} V${k.y} H${X_PE} V${Y.PE} H${X_ROZDELENI} V${Y.PEN} H${X_START}` };
    case "TT":
      return { hlavni: `${zacatek} V${k.y + k.h} H${X_PE} V${Y_ZEM} H${X_ZEM_ZDROJ} V${Y_UZEL}` };
    case "IT":
      return { hlavni: `${zacatek} V${k.y + k.h} H${X_PE} V${Y_ZEM}`, slaba: `M${X_PE} ${Y_ZEM} H${X_ZEM_ZDROJ} V176` };
  }
}

function Schema({ sit, porucha }: { sit: SitId; porucha: boolean }) {
  const k = KOSTRA;
  const maN = sit !== "IT" && sit !== "TN-C";
  const tn = sit.startsWith("TN");
  const cesta = cestaPoruchy(sit);

  return (
    <svg
      viewBox="0 0 360 252"
      className="block h-auto w-full select-none"
      role="img"
      aria-label={`Schéma sítě ${sit}${porucha ? " s poruchou na kostře spotřebiče" : ""}`}
    >
      {/* zem */}
      <line x1={8} y1={Y_ZEM} x2={352} y2={Y_ZEM} strokeWidth={1.5} className="stroke-tlumeny" />
      {Array.from({ length: 29 }, (_, i) => 14 + i * 12).map((x) => (
        <line key={x} x1={x} y1={Y_ZEM} x2={x - 7} y2={Y_ZEM + 7} strokeWidth={1} className="stroke-hrana" />
      ))}
      <text x={352} y={Y_ZEM + 16} fontSize={9.5} textAnchor="end" className="fill-tlumeny">
        zem
      </text>

      {/* zdroj a jeho uzemnění */}
      <rect x={8} y={22} width={44} height={102} rx={6} strokeWidth={2} className="fill-plocha stroke-text" />
      <text x={30} y={68} fontSize={10.5} textAnchor="middle" className="fill-text">
        zdroj
      </text>
      <text x={30} y={82} fontSize={10} textAnchor="middle" className="fill-tlumeny font-mono">
        3~
      </text>
      {sit === "IT" ? (
        <>
          <line x1={X_ZEM_ZDROJ} y1={Y_UZEL} x2={X_ZEM_ZDROJ} y2={156} strokeWidth={1.5} className="stroke-text" />
          <rect x={21} y={156} width={18} height={20} rx={2} strokeWidth={1.5} className="fill-plocha stroke-text" />
          <text x={30} y={170} fontSize={10} textAnchor="middle" className="fill-text font-mono">
            Z
          </text>
          <line x1={X_ZEM_ZDROJ} y1={176} x2={X_ZEM_ZDROJ} y2={Y_ZEM} strokeWidth={1.5} strokeDasharray="4 3" className="stroke-text" />
          <text x={44} y={164} fontSize={9.5} className="fill-tlumeny">
            izolovaný
          </text>
          <text x={44} y={176} fontSize={9.5} className="fill-tlumeny">
            nebo přes Z
          </text>
          {/* hlídač izolačního stavu */}
          <line x1={120} y1={Y.L3} x2={120} y2={192} strokeWidth={1.2} className="stroke-text" />
          <Uzel x={120} y={Y.L3} />
          <rect x={84} y={192} width={72} height={22} rx={4} strokeWidth={1.5} className="fill-plocha stroke-primarni" />
          <text x={120} y={207} fontSize={9.5} textAnchor="middle" className="fill-primarni">
            hlídač izolace
          </text>
          <line x1={120} y1={214} x2={120} y2={Y_ZEM} strokeWidth={1.2} className="stroke-text" />
        </>
      ) : (
        <>
          <line x1={X_ZEM_ZDROJ} y1={Y_UZEL} x2={X_ZEM_ZDROJ} y2={Y_ZEM} strokeWidth={2} className="stroke-text" />
          <text x={36} y={212} fontSize={9.5} className="fill-tlumeny">
            uzemnění zdroje
          </text>
        </>
      )}
      <Uzel x={X_ZEM_ZDROJ} y={Y_UZEL} />
      <Uzel x={X_ZEM_ZDROJ} y={Y_ZEM} />

      {/* fázové vodiče */}
      <Vodic d={`M${X_START} ${Y.L1} H${X_KONEC}`} druh="L1" />
      <Vodic d={`M${X_START} ${Y.L2} H${X_KONEC}`} druh="L2" />
      <Vodic d={`M${X_START} ${Y.L3} H${X_KONEC}`} druh="L3" />
      <Popisek y={Y.L1} text="L1" />
      <Popisek y={Y.L2} text="L2" />
      <Popisek y={Y.L3} text="L3" />

      {/* N, PE, PEN podle typu sítě */}
      {sit === "TN-C" && (
        <>
          <Vodic d={`M${X_START} ${Y.PEN} H${X_KONEC}`} druh="PEN" />
          <ZnackaPen x={X_START} y={Y.PEN} />
          <ZnackaPen x={X_KONEC - 7} y={Y.PEN} />
          <Popisek y={Y.PEN} text="PEN" />
        </>
      )}
      {sit === "TN-S" && (
        <>
          <Vodic d={`M${X_START} ${Y.N} H${X_KONEC}`} druh="N" />
          <Vodic d={`M66 ${Y.PE} H${X_KONEC}`} druh="PE" />
          <Vodic d={`M66 ${Y.PE} V150 H${X_ZEM_ZDROJ}`} druh="PE" />
          <Uzel x={66} y={Y.PE} />
          <Uzel x={X_ZEM_ZDROJ} y={150} />
          <Popisek y={Y.N} text="N" />
          <Popisek y={Y.PE} text="PE" />
        </>
      )}
      {sit === "TN-C-S" && (
        <>
          <Vodic d={`M${X_START} ${Y.PEN} H${X_ROZDELENI}`} druh="PEN" />
          <ZnackaPen x={X_START} y={Y.PEN} />
          <ZnackaPen x={X_ROZDELENI - 9} y={Y.PEN} />
          <text x={96} y={Y.PE + 10} fontSize={9.5} className="fill-tlumeny font-mono">
            PEN
          </text>
          <line x1={X_ROZDELENI} y1={Y.N} x2={X_ROZDELENI} y2={Y.PEN} strokeWidth={3} className="stroke-vodic-modra" />
          <Vodic d={`M${X_ROZDELENI} ${Y.PEN} V${Y.PE}`} druh="PE" />
          <Vodic d={`M${X_ROZDELENI} ${Y.N} H${X_KONEC}`} druh="N" />
          <Vodic d={`M${X_ROZDELENI} ${Y.PE} H${X_KONEC}`} druh="PE" />
          <Uzel x={X_ROZDELENI} y={Y.PEN} />
          <text x={X_ROZDELENI} y={Y.PE + 20} fontSize={9.5} textAnchor="middle" className="fill-primarni">
            rozdělení PEN
          </text>
          <Popisek y={Y.N} text="N" />
          <Popisek y={Y.PE} text="PE" />
        </>
      )}
      {sit === "TT" && (
        <>
          <Vodic d={`M${X_START} ${Y.N} H${X_KONEC}`} druh="N" />
          <Popisek y={Y.N} text="N" />
        </>
      )}

      {/* spotřebič třídy I: kovová kostra (neživá část) a zátěž */}
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={6} strokeWidth={3} className="fill-plocha stroke-text" />
      <text x={k.x + k.w / 2} y={k.y + 14} fontSize={9.5} textAnchor="middle" className="fill-tlumeny">
        spotřebič třídy I
      </text>
      <rect x={240} y={160} width={58} height={18} rx={3} strokeWidth={1.5} className="fill-plocha-2 stroke-text" />
      <text x={k.x + k.w / 2} y={k.y + k.h - 7} fontSize={9.5} textAnchor="middle" className="fill-tlumeny">
        kovová kostra
      </text>

      {/* přívody do spotřebiče */}
      <Vodic d={`M${X_L1} ${Y.L1} V160`} druh="L1" />
      <Uzel x={X_L1} y={Y.L1} />
      {sit === "IT" && (
        <>
          <Vodic d={`M${X_DRUHY} ${Y.L2} V160`} druh="L2" />
          <Uzel x={X_DRUHY} y={Y.L2} />
        </>
      )}
      {maN && (
        <>
          <Vodic d={`M${X_DRUHY} ${Y.N} V160`} druh="N" />
          <Uzel x={X_DRUHY} y={Y.N} />
        </>
      )}
      {sit === "TN-C" && (
        <>
          <Vodic d={`M${X_DRUHY} ${Y.PEN} V160`} druh="PEN" />
          <ZnackaPen x={X_DRUHY} y={153} svisle />
          <Uzel x={X_DRUHY} y={Y.PEN} />
          <Uzel x={X_DRUHY} y={k.y} />
        </>
      )}
      {/* průchodky kostrou – živé vodiče s kostrou spojené nejsou */}
      <circle cx={X_L1} cy={k.y} r={3.5} strokeWidth={1.5} className="fill-plocha stroke-text" />
      {sit !== "TN-C" && <circle cx={X_DRUHY} cy={k.y} r={3.5} strokeWidth={1.5} className="fill-plocha stroke-text" />}
      {(sit === "TN-S" || sit === "TN-C-S") && (
        <>
          <Vodic d={`M${X_PE} ${Y.PE} V${k.y}`} druh="PE" />
          <Uzel x={X_PE} y={Y.PE} />
          <Uzel x={X_PE} y={k.y} />
        </>
      )}
      {!tn && (
        <>
          <Vodic d={`M${X_PE} ${k.y + k.h} V${Y_ZEM}`} druh="PE" />
          <Uzel x={X_PE} y={k.y + k.h} />
          <Uzel x={X_PE} y={Y_ZEM} />
          <text x={X_PE - 6} y={Y_ZEM - 8} fontSize={9.5} textAnchor="end" className="fill-tlumeny">
            uzemnění kostry
          </text>
        </>
      )}

      {/* porucha na kostře a cesta poruchového proudu */}
      {porucha && (
        <>
          <path
            d={cesta.hlavni}
            fill="none"
            strokeWidth={sit === "IT" ? 3 : 7}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeOpacity={0.5}
            className="stroke-spatne"
          />
          {cesta.slaba && (
            <path d={cesta.slaba} fill="none" strokeWidth={2} strokeDasharray="3 4" strokeOpacity={0.7} className="stroke-spatne" />
          )}
          <path
            d={`M${X_L1} 146 l-8 -5 -4 10 -8 -5 -8 4`}
            fill="none"
            strokeWidth={2.5}
            strokeLinejoin="round"
            className="stroke-spatne"
          />
          <text x={k.x - 6} y={k.y + 30} fontSize={10} fontWeight={600} textAnchor="end" className="fill-spatne">
            porucha
          </text>
          {sit === "IT" && (
            <text x={200} y={Y_ZEM - 6} fontSize={9.5} textAnchor="middle" className="fill-spatne">
              malý proud
            </text>
          )}
        </>
      )}
    </svg>
  );
}

export default function SiteTnTtIt() {
  const [id, setId] = useState<SitId>("TN-C-S");
  const [porucha, setPorucha] = useState(false);
  const sit = SITE.find((s) => s.id === id) ?? SITE[0];

  return (
    <>
      <NadpisIlustrace
        nadpis="Sítě TN, TT a IT"
        napoveda="Přepněte typ sítě. Tlačítkem Porucha na kostře zobrazíte cestu poruchového proudu."
      />

      <div className="mb-3 grid grid-cols-5 gap-1 rounded-lg border border-hrana bg-plocha p-1" role="group" aria-label="Typ sítě">
        {SITE.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === id}
            onClick={() => setId(s.id)}
            className={`min-h-11 rounded-md px-0.5 font-mono text-xs font-semibold transition-colors duration-150 sm:text-sm ${
              s.id === id ? "bg-primarni text-na-primarni" : "text-text hover:bg-plocha-2"
            }`}
          >
            {s.id}
          </button>
        ))}
      </div>

      <Schema sit={id} porucha={porucha} />

      <button
        type="button"
        aria-pressed={porucha}
        onClick={() => setPorucha((p) => !p)}
        className={`mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 px-4 text-base font-medium transition-colors duration-150 ${
          porucha ? "border-spatne bg-spatne/10 text-spatne" : "border-hrana bg-plocha text-text hover:border-spatne"
        }`}
      >
        <Icon nazev="blesk" size={18} />
        {porucha ? "Skrýt poruchu" : "Porucha na kostře"}
      </button>

      <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="font-mono text-lg font-semibold text-primarni">Síť {sit.id}</p>

        <h4 className={`${nadpisSekce} mt-2`}>Co znamená označení</h4>
        <dl className="mt-1 space-y-1 text-sm">
          {sit.pismena.map((p) => (
            <div key={p.znak + p.vyznam} className="flex gap-2">
              <dt className="w-9 shrink-0 font-mono font-semibold">{p.znak}</dt>
              <dd>{p.vyznam}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-1 text-xs text-tlumeny">Význam písmen podle ČSN 33 2000-1 – ověřit v normě.</p>

        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {sit.poznamky.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {porucha && (
          <>
            <h4 className={`${nadpisSekce} mt-4 text-spatne`}>Porucha na kostře</h4>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              {sit.porucha.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {sit.chranic && (
              <p className="mt-2 flex gap-2 rounded-md border border-spatne/40 bg-plocha p-2 text-sm">
                <Icon nazev="pozor" size={18} className="mt-0.5 shrink-0 text-spatne" />
                <span>{sit.chranic}</span>
              </p>
            )}
          </>
        )}

        {maOverit(sit.fakta) && (
          <div className="mt-3">
            <OdznakOverit popis="Část údajů o této síti je potřeba ověřit v normě." />
          </div>
        )}
        <div className="mt-3">
          <Zdroje fakta={sit.fakta} />
        </div>
      </div>
    </>
  );
}
