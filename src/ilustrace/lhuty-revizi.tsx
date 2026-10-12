// Ilustrace „Lhůty revizí“: výběr objektů a prostorů → nejdelší lhůta pravidelné revize.
// Data: src/data/lhuty.ts (fakta K2-15, K2-16), pravidla K2-17 (nejkratší), K2-18 (rok konce lhůty),
// K2-19 (řád preventivní údržby – až dvojnásobek).
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { nadpisSekce } from "../components/styly";
import { LHUTY, LHUTY_FAKTA, type SkupinaLhuty } from "../data/lhuty";
import { formatRoky } from "../lib/format";
import { NadpisIlustrace, Prepinac, Volba } from "./ovladani";

const MAX_OSA = 10; // roky na časové ose

export default function LhutyRevizi() {
  const [skupina, setSkupina] = useState<SkupinaLhuty>("instalace");
  const [vybrane, setVybrane] = useState<string[]>(["administrativa"]);
  const [blesk, setBlesk] = useState("lps-ostatni");
  const [radUdrzby, setRadUdrzby] = useState(false);
  const [rokRevize, setRokRevize] = useState(() => new Date().getFullYear());

  const polozky = LHUTY.filter((l) => l.skupina === skupina);
  const aktivni = skupina === "instalace" ? polozky.filter((l) => vybrane.includes(l.id)) : polozky.filter((l) => l.id === blesk);
  const nejkratsi = aktivni.reduce<(typeof LHUTY)[number] | undefined>(
    (min, l) => (!min || l.roky < min.roky ? l : min),
    undefined
  );
  const zaklad = nejkratsi?.roky;
  const ucinna = zaklad !== undefined ? (radUdrzby ? zaklad * 2 : zaklad) : undefined;

  function prepniInstalaci(id: string) {
    setVybrane((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  }

  // Časová osa: 0 = poslední revize, základní lhůta plně, prodloužení řádem šrafovaně.
  const OSA_X0 = 26;
  const OSA_X1 = 334;
  const naX = (roky: number) => OSA_X0 + (Math.min(roky, MAX_OSA) / MAX_OSA) * (OSA_X1 - OSA_X0);

  return (
    <>
      <NadpisIlustrace
        nadpis="Lhůty pravidelných revizí"
        napoveda="Vyberte objekt nebo prostor. Při více volbách platí nejkratší lhůta."
      />

      <div className="grid grid-cols-2 gap-1 rounded-lg border border-hrana bg-plocha p-1" role="group" aria-label="Druh zařízení">
        {(
          [
            ["instalace", "Elektrická instalace"],
            ["blesk", "Ochrana před bleskem"]
          ] as const
        ).map(([id, nazev]) => (
          <button
            key={id}
            type="button"
            aria-pressed={skupina === id}
            onClick={() => setSkupina(id)}
            className={`min-h-11 rounded-md px-2 text-sm font-medium transition-colors duration-150 ${
              skupina === id ? "bg-primarni text-na-primarni" : "hover:bg-plocha-2"
            }`}
          >
            {nazev}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Objekty a prostory">
        {polozky.map((l) => (
          <Volba
            key={l.id}
            zvoleno={skupina === "instalace" ? vybrane.includes(l.id) : blesk === l.id}
            onClick={() => (skupina === "instalace" ? prepniInstalaci(l.id) : setBlesk(l.id))}
          >
            {l.nazev}
          </Volba>
        ))}
      </div>

      <div className="mt-3">
        <Prepinac zapnuto={radUdrzby} onZmena={setRadUdrzby}>
          Provozovatel má řád preventivní údržby (lhůta až dvojnásobná)
        </Prepinac>
      </div>

      <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        {ucinna === undefined || zaklad === undefined ? (
          <p className="text-tlumeny">Vyberte alespoň jeden objekt nebo prostor.</p>
        ) : (
          <>
            <p className="text-sm text-tlumeny">Nejdelší lhůta pravidelné revize</p>
            <p className="mt-0.5 font-mono text-4xl font-semibold text-primarni">
              {radUdrzby ? "až " : ""}
              {formatRoky(ucinna)}
            </p>
            {radUdrzby && <p className="text-sm text-tlumeny">základ podle přílohy č. 4: {formatRoky(zaklad)}</p>}
            {aktivni.length > 1 && nejkratsi && (
              <p className="mt-1 text-sm">
                Platí nejkratší z vybraných: <span className="font-semibold">{nejkratsi.nazev}</span>.
              </p>
            )}
            {skupina === "blesk" && (
              <p className="mt-1 text-sm">Navíc nejméně jednou ročně vizuální kontrola.</p>
            )}

            <svg viewBox="0 0 360 64" className="mt-3 block h-auto w-full" role="img" aria-label={`Časová osa: lhůta ${formatRoky(ucinna)} od poslední revize`}>
              <defs>
                <pattern id="srafy-lhuty" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="3" height="6" className="fill-primarni" fillOpacity={0.45} />
                </pattern>
              </defs>
              <line x1={OSA_X0} y1={30} x2={OSA_X1} y2={30} strokeWidth={2} className="stroke-hrana" />
              {Array.from({ length: MAX_OSA + 1 }, (_, r) => (
                <line key={r} x1={naX(r)} y1={25} x2={naX(r)} y2={35} strokeWidth={r % 5 === 0 ? 2 : 1} className="stroke-hrana" />
              ))}
              {radUdrzby && (
                <rect x={naX(0)} y={22} width={naX(ucinna) - naX(0)} height={16} rx={3} fill="url(#srafy-lhuty)" />
              )}
              <rect x={naX(0)} y={22} width={Math.max(naX(zaklad) - naX(0), 3)} height={16} rx={3} className="fill-primarni" />
              <circle cx={naX(0)} cy={30} r={6} className="fill-akcent stroke-overit" strokeWidth={1.5} />
              {[0, 5, 10].map((r) => (
                <text key={r} x={naX(r)} y={56} textAnchor="middle" fontSize={11} className="fill-tlumeny font-mono">
                  {r === 0 ? "revize" : `${r} let`}
                </text>
              ))}
            </svg>

            <div className="mt-3 border-t border-hrana pt-3">
              <p className={nadpisSekce}>Kdy nejpozději další revize</p>
              <p className="mt-2 text-sm" id="rok-posledni-revize">
                Rok poslední revize
              </p>
              <div className="mt-1 flex items-center gap-3" role="group" aria-labelledby="rok-posledni-revize">
                <button
                  type="button"
                  onClick={() => setRokRevize((r) => r - 1)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha"
                  aria-label="O rok dříve"
                >
                  <Icon nazev="zpet" size={18} />
                </button>
                <span className="min-w-[4ch] text-center font-mono text-lg font-semibold" aria-live="polite">
                  {rokRevize}
                </span>
                <button
                  type="button"
                  onClick={() => setRokRevize((r) => r + 1)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha"
                  aria-label="O rok později"
                >
                  <Icon nazev="vpred" size={18} />
                </button>
              </div>
              <p className="mt-2 text-sm">
                {ucinna > 1 ? (
                  <>
                    Další revize musí proběhnout{radUdrzby ? " nejpozději" : ""} v roce{" "}
                    <span className="font-mono font-semibold">{rokRevize + ucinna}</span> – stačí kdykoli během roku, do
                    kterého spadá konec lhůty.
                  </>
                ) : (
                  <>
                    Lhůta nepřesahuje 1 rok, proto se pravidlo „rok konce lhůty“ nepoužije – počítá se od data poslední
                    revize.
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </div>

      <p className="mt-3 text-sm text-tlumeny">
        Uvádí-li výrobce v průvodní dokumentaci kratší lhůtu než řád prohlídek, údržby a revizí, platí lhůta výrobce.
      </p>
      <div className="mt-3">
        <Zdroje fakta={[...LHUTY_FAKTA, "K2-14"]} />
      </div>
    </>
  );
}
