// Ilustrace „Kód oprávnění“: skládačka E1/E2/E3 × A/B × M/O/R/Z → srozumitelná věta.
// Význam písmen: K2-06. Praxe vedoucího elektrotechnika: K1-07, K1-08. Praxe revizního technika
// (příklad E1A a E2A): K1-30. Platnost oprávnění 10 let: K2-07, osvědčení 5 let: K2-08.
import { useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { nadpisSekce } from "../components/styly";
import { formatRoky } from "../lib/format";
import { NadpisIlustrace, Volba } from "./ovladani";

type Druh = "E1" | "E2" | "E3";
type Prostredi = "A" | "B";
type Cinnost = "M" | "O" | "R" | "Z";

const DRUH: Record<Druh, { kratce: string; veta: string }> = {
  E1: {
    kratce: "nízké i vysoké napětí",
    veta: "zařízení nízkého a vysokého napětí (v oprávnění se uvádí rozsah: do 35 kV, do 230 kV nebo bez omezení)"
  },
  E2: { kratce: "do 1 kV AC / 1,5 kV DC", veta: "zařízení nízkého napětí do 1 kV AC / 1,5 kV DC" },
  E3: {
    kratce: "blesk, přepětí, statika",
    veta: "ochrana před atmosférickou elektřinou, přepětím a statickou elektřinou"
  }
};

const PROSTREDI: Record<Prostredi, { kratce: string; veta: string }> = {
  A: { kratce: "bez nebezpečí výbuchu", veta: "v prostorech bez nebezpečí výbuchu" },
  B: { kratce: "s nebezpečím výbuchu", veta: "v prostorech s nebezpečím výbuchu" }
};

const CINNOST: Record<Cinnost, string> = { M: "montáž", O: "opravy", R: "revize", Z: "zkoušky" };
const PORADI_CINNOSTI: Cinnost[] = ["M", "O", "R", "Z"];

// Minimální praxe vedoucího elektrotechnika podle rozsahu (K1-07).
const PRAXE_VEDOUCIHO: Record<`${Druh}${Prostredi}`, number> = {
  E1A: 3,
  E1B: 4,
  E2A: 2,
  E2B: 3,
  E3A: 2,
  E3B: 3
};

function vycet(polozky: string[]): string {
  if (polozky.length <= 1) return polozky.join("");
  return `${polozky.slice(0, -1).join(", ")} a ${polozky[polozky.length - 1]}`;
}

export default function KodOpravneni() {
  const [druh, setDruh] = useState<Druh>("E2");
  const [prostredi, setProstredi] = useState<Prostredi>("A");
  const [cinnosti, setCinnosti] = useState<Cinnost[]>(["R"]);

  const rozsah = `${druh}${prostredi}` as const;
  const zvoleneCinnosti = PORADI_CINNOSTI.filter((c) => cinnosti.includes(c));
  const veta = `${rozsah}, ${vycet(zvoleneCinnosti.map((c) => CINNOST[c]))}: ${DRUH[druh].veta} ${PROSTREDI[prostredi].veta}.`;

  function prepniCinnost(c: Cinnost) {
    setCinnosti((v) => (v.includes(c) ? (v.length > 1 ? v.filter((x) => x !== c) : v) : [...v, c]));
  }

  // Štítek s kódem: tři pole (druh, prostředí, činnosti).
  const POLE = [
    { x: 8, sirka: 104, text: druh, popis: "druh zařízení" },
    { x: 120, sirka: 64, text: prostredi, popis: "prostředí" },
    { x: 200, sirka: 152, text: zvoleneCinnosti.join(" "), popis: "činnost" }
  ];

  return (
    <>
      <NadpisIlustrace nadpis="Kód oprávnění" napoveda="Složte kód z písmen a přečtěte si, co znamená." />

      <svg viewBox="0 0 360 96" className="block h-auto w-full" role="img" aria-label={`Kód ${rozsah} ${zvoleneCinnosti.join(", ")}`}>
        {POLE.map((p) => (
          <g key={p.popis}>
            <rect x={p.x} y={8} width={p.sirka} height={56} rx={8} strokeWidth={2} className="fill-plocha stroke-primarni" />
            <text x={p.x + p.sirka / 2} y={47} textAnchor="middle" fontSize={30} fontWeight={600} className="fill-primarni font-mono">
              {p.text}
            </text>
            <text x={p.x + p.sirka / 2} y={84} textAnchor="middle" fontSize={11.5} className="fill-tlumeny">
              {p.popis}
            </text>
          </g>
        ))}
        <text x={192} y={46} textAnchor="middle" fontSize={22} className="fill-tlumeny font-mono">
          –
        </text>
      </svg>

      <div className="mt-3 space-y-3">
        <div>
          <p className={nadpisSekce}>Druh zařízení</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {(Object.keys(DRUH) as Druh[]).map((d) => (
              <Volba key={d} zvoleno={druh === d} onClick={() => setDruh(d)} popis={`${d}: ${DRUH[d].kratce}`}>
                <span className="font-mono font-semibold">{d}</span>{" "}
                <span className="text-xs text-tlumeny">{DRUH[d].kratce}</span>
              </Volba>
            ))}
          </div>
        </div>
        <div>
          <p className={nadpisSekce}>Prostředí</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {(Object.keys(PROSTREDI) as Prostredi[]).map((p) => (
              <Volba key={p} zvoleno={prostredi === p} onClick={() => setProstredi(p)} popis={`${p}: ${PROSTREDI[p].kratce}`}>
                <span className="font-mono font-semibold">{p}</span>{" "}
                <span className="text-xs text-tlumeny">{PROSTREDI[p].kratce}</span>
              </Volba>
            ))}
          </div>
        </div>
        <div>
          <p className={nadpisSekce}>Činnost (lze vybrat více)</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {PORADI_CINNOSTI.map((c) => (
              <Volba key={c} zvoleno={cinnosti.includes(c)} onClick={() => prepniCinnost(c)} popis={`${c}: ${CINNOST[c]}`}>
                <span className="font-mono font-semibold">{c}</span> <span className="text-xs text-tlumeny">{CINNOST[c]}</span>
              </Volba>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-plocha-2 p-4" aria-live="polite">
        <p className="font-medium">{veta}</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="text-tlumeny">Minimální praxe vedoucího elektrotechnika v rozsahu {rozsah}</dt>
            <dd className="font-mono font-semibold">
              {formatRoky(PRAXE_VEDOUCIHO[rozsah])}{" "}
              <span className="font-sans font-normal">(z toho nejméně 1 rok na zařízeních příslušného druhu a napětí)</span>
            </dd>
          </div>
          {(rozsah === "E1A" || rozsah === "E2A") && (
            <div>
              <dt className="text-tlumeny">Minimální praxe revizního technika v rozsahu {rozsah}</dt>
              <dd className="font-mono font-semibold">{formatRoky(4)}</dd>
            </div>
          )}
          <div>
            <dt className="text-tlumeny">Platnost</dt>
            <dd>
              oprávnění firmy <span className="font-mono font-semibold">10 let</span> · osvědčení revizního technika{" "}
              <span className="font-mono font-semibold">5 let</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-3">
        <Zdroje fakta={["K2-06", "K1-07", "K1-08", "K1-30", "K2-07", "K2-08"]} />
      </div>
    </>
  );
}
