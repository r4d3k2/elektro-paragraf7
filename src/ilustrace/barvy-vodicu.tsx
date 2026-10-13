// Ilustrace „Barvy vodičů“: řez pětižilovým kabelem a jednotlivé vodiče; klepnutí na barvu ukáže funkci.
// Mini úloha „Najdi ochranný vodič“ zamíchá žíly v řezu.
// Barvy a funkce: K7-04. Zelenožlutá jen pro ochranné vodiče: K7-05. Značení PEN: K7-06.
// Žíly pětižilového kabelu: K7-07. Přednost ochranné funkce u PEN: K7-08 – stav „overit“, proto poznámka.
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { OdznakOverit } from "../components/OdznakOverit";
import { tlacitkoSekundarni } from "../components/styly";
import { zamichej } from "../lib/shuffle";
import { NadpisIlustrace } from "./ovladani";

type ZilaId = "pe" | "n" | "hneda" | "cerna" | "seda";
type VodicId = ZilaId | "pen";

interface Vodic {
  barva: string;
  funkce: string;
  popis: string;
  fakta: string[];
  /** Třída výplně žíly v SVG; zelenožlutá má místo ní vzorek. */
  vypln?: string;
  /** Pozadí pruhu vodiče v seznamu. */
  pruh: CSSProperties;
}

const PRUHY_ZZ = "repeating-linear-gradient(135deg, var(--c-vodic-zelena) 0 9px, var(--c-vodic-zluta) 9px 18px)";

const VODICE: Record<VodicId, Vodic> = {
  pe: {
    barva: "zelenožlutá",
    funkce: "ochranný vodič PE",
    popis: "Kombinace zelené a žluté je vyhrazená pro ochranné vodiče a k jinému účelu se nesmí použít.",
    fakta: ["K7-04", "K7-05", "K7-07"],
    pruh: { backgroundImage: PRUHY_ZZ }
  },
  n: {
    barva: "světle modrá",
    funkce: "střední vodič N",
    popis: "Světle modrou izolaci má střední vodič N.",
    fakta: ["K7-04", "K7-07"],
    vypln: "fill-vodic-modra",
    pruh: { background: "var(--c-vodic-modra)" }
  },
  hneda: {
    barva: "hnědá",
    funkce: "fázový vodič",
    popis: "Fázové vodiče mají izolaci hnědou, černou a šedou.",
    fakta: ["K7-04", "K7-07"],
    vypln: "fill-vodic-hneda",
    pruh: { background: "var(--c-vodic-hneda)" }
  },
  cerna: {
    barva: "černá",
    funkce: "fázový vodič",
    popis: "Fázové vodiče mají izolaci hnědou, černou a šedou.",
    fakta: ["K7-04", "K7-07"],
    vypln: "fill-vodic-cerna",
    pruh: { background: "var(--c-vodic-cerna)", boxShadow: "inset 0 0 0 1.5px var(--c-vodic-cerna-obrys)" }
  },
  seda: {
    barva: "šedá",
    funkce: "fázový vodič",
    popis: "Fázové vodiče mají izolaci hnědou, černou a šedou.",
    fakta: ["K7-04", "K7-07"],
    vypln: "fill-vodic-seda",
    pruh: { background: "var(--c-vodic-seda)" }
  },
  pen: {
    barva: "zelenožlutá se světle modrými konci",
    funkce: "vodič PEN",
    popis:
      "Vodič PEN se značí zelenožlutě se světle modrými značkami na koncích, nebo světle modře se zelenožlutými značkami na koncích.",
    fakta: ["K7-06", "K7-08"],
    pruh: {
      backgroundImage: `linear-gradient(90deg, var(--c-vodic-modra) 0 16%, transparent 16% 84%, var(--c-vodic-modra) 84%), ${PRUHY_ZZ}`
    }
  }
};

// Žíly pětižilového kabelu se zelenožlutou žílou (K7-07).
const ZILY: ZilaId[] = ["pe", "n", "hneda", "cerna", "seda"];
const PORADI_VODICU: VodicId[] = ["pe", "n", "hneda", "cerna", "seda", "pen"];

// Geometrie řezu (viewBox 240 × 200): žíly v kruhu kolem středu.
const CX = 120;
const CY = 100;
const R_KABEL = 86;
const R_KRUH = 46;
const R_ZILA = 26;

function poloha(i: number): { x: number; y: number } {
  const uhel = (-90 + i * 72) * (Math.PI / 180);
  return { x: CX + R_KRUH * Math.cos(uhel), y: CY + R_KRUH * Math.sin(uhel) };
}

type Rezim = "prohlizet" | "uloha";

const REZIMY: [Rezim, string][] = [
  ["prohlizet", "Prohlížet"],
  ["uloha", "Najdi ochranný vodič"]
];

export default function BarvyVodicu() {
  const [rezim, setRezim] = useState<Rezim>("prohlizet");
  const [vybrany, setVybrany] = useState<VodicId>("pe");
  const [rozlozeni, setRozlozeni] = useState<ZilaId[]>(ZILY);
  const [tip, setTip] = useState<ZilaId | null>(null);
  const [fokus, setFokus] = useState<ZilaId | null>(null);

  const zily = rezim === "uloha" ? rozlozeni : ZILY;
  const v = VODICE[vybrany];
  const uhodnuto = tip === "pe";

  function novaUloha() {
    let nove = zamichej(ZILY);
    // Ochranný vodič nemá být nahoře jako v prohlížení.
    while (nove[0] === "pe") nove = zamichej(ZILY);
    setRozlozeni(nove);
    setTip(null);
  }

  function zmenRezim(r: Rezim) {
    if (r === rezim) return;
    setRezim(r);
    if (r === "uloha") novaUloha();
  }

  function klepni(id: ZilaId) {
    if (rezim === "uloha") setTip(id);
    else setVybrany(id);
  }

  function klavesa(e: KeyboardEvent, id: ZilaId) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      klepni(id);
    }
  }

  return (
    <>
      <NadpisIlustrace
        nadpis="Barvy vodičů"
        napoveda="Klepněte na žílu v řezu kabelem nebo na vodič v seznamu. V úloze najděte ochranný vodič."
      />

      <div className="mb-3 grid grid-cols-2 gap-1 rounded-lg border border-hrana bg-plocha p-1" role="group" aria-label="Režim">
        {REZIMY.map(([r, nazev]) => (
          <button
            key={r}
            type="button"
            aria-pressed={rezim === r}
            onClick={() => zmenRezim(r)}
            className={`min-h-11 rounded-md px-2 text-sm font-medium transition-colors duration-150 ${
              rezim === r ? "bg-primarni text-na-primarni" : "text-text hover:bg-plocha-2"
            }`}
          >
            {nazev}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 240 200"
        className="mx-auto block h-auto w-full max-w-[300px] select-none"
        role="group"
        aria-label="Řez pětižilovým kabelem"
      >
        <defs>
          <pattern id="barvy-zz" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="5" height="10" className="fill-vodic-zelena" />
            <rect x="5" width="5" height="10" className="fill-vodic-zluta" />
          </pattern>
        </defs>
        <circle cx={CX} cy={CY} r={R_KABEL} strokeWidth={2} className="fill-plocha-2 stroke-tlumeny" />
        <circle cx={CX} cy={CY} r={R_KABEL - 8} fill="none" strokeWidth={1} strokeDasharray="3 4" className="stroke-hrana" />
        {zily.map((id, i) => {
          const { x, y } = poloha(i);
          const zvolena = rezim === "prohlizet" ? vybrany === id : tip === id;
          const krouzek = zvolena
            ? rezim === "uloha"
              ? uhodnuto
                ? "stroke-spravne"
                : "stroke-spatne"
              : "stroke-primarni"
            : "stroke-primarni";
          return (
            <g
              key={id}
              role="button"
              tabIndex={0}
              aria-label={rezim === "uloha" ? `Žíla ${i + 1}, ${VODICE[id].barva}` : `${VODICE[id].barva}: ${VODICE[id].funkce}`}
              aria-pressed={zvolena}
              onClick={() => klepni(id)}
              onKeyDown={(e) => klavesa(e, id)}
              onFocus={() => setFokus(id)}
              onBlur={() => setFokus(null)}
              className="cursor-pointer outline-none"
            >
              {VODICE[id].vypln ? (
                <circle cx={x} cy={y} r={R_ZILA} className={VODICE[id].vypln} />
              ) : (
                <circle cx={x} cy={y} r={R_ZILA} fill="url(#barvy-zz)" />
              )}
              {id === "cerna" && (
                <circle cx={x} cy={y} r={R_ZILA} fill="none" strokeWidth={1.5} className="stroke-vodic-cerna-obrys" />
              )}
              <circle cx={x} cy={y} r={R_ZILA - 10} strokeWidth={1} className="fill-plocha stroke-tlumeny" />
              {(zvolena || fokus === id) && (
                <circle
                  cx={x}
                  cy={y}
                  r={R_ZILA + 4}
                  fill="none"
                  strokeWidth={zvolena ? 3.5 : 2}
                  strokeDasharray={zvolena ? undefined : "4 3"}
                  className={krouzek}
                />
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-center text-xs text-tlumeny">Řez kabelem: vodivá jádra v barevné izolaci žil</p>

      {rezim === "prohlizet" ? (
        <>
          <ul className="mt-3 grid gap-2" aria-label="Vodiče">
            {PORADI_VODICU.map((id) => {
              const zvoleno = vybrany === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={zvoleno}
                    onClick={() => setVybrany(id)}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-lg border-2 px-3 py-1.5 text-left text-sm transition-colors duration-150 ${
                      zvoleno ? "border-primarni bg-primarni/10" : "border-hrana bg-plocha hover:border-primarni/60"
                    }`}
                  >
                    <span aria-hidden="true" className="block h-4 w-16 shrink-0 rounded-full" style={VODICE[id].pruh} />
                    <span className="min-w-0">
                      <span className={`block font-medium ${zvoleno ? "text-primarni" : ""}`}>{VODICE[id].funkce}</span>
                      <span className="block text-xs text-tlumeny">{VODICE[id].barva}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
            <p className="font-semibold">{v.funkce}</p>
            <p className="text-sm text-tlumeny">Barva izolace: {v.barva}</p>
            <p className="mt-2 text-sm">{v.popis}</p>
            {vybrany === "pen" ? (
              <div className="mt-2 space-y-1.5">
                <p className="text-sm">
                  Má-li vodič funkci ochranného i středního vodiče, má přednost funkce ochranná – ověřit v normě.
                </p>
                <OdznakOverit popis="Přednost ochranné funkce u vodiče PEN je potřeba ověřit v normě." />
              </div>
            ) : (
              <p className="mt-2 text-sm text-tlumeny">
                Pětižilový kabel se zelenožlutou žílou má žíly zelenožlutou, modrou, hnědou, černou a šedou.
              </p>
            )}
            <div className="mt-3">
              <Zdroje fakta={v.fakta} />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-3 rounded-lg bg-plocha-2 p-4" aria-live="polite">
          {tip === null ? (
            <p className="text-sm">Klepněte v řezu kabelem na žílu, která je ochranným vodičem PE.</p>
          ) : uhodnuto ? (
            <p className="flex items-start gap-2 text-sm">
              <Icon nazev="spravne" size={20} className="shrink-0 text-spravne" />
              <span>
                <span className="font-semibold text-spravne">Správně.</span> Zelenožlutá žíla je ochranný vodič PE. Tuto
                kombinaci barev nelze použít k jinému účelu.
              </span>
            </p>
          ) : (
            <p className="flex items-start gap-2 text-sm">
              <Icon nazev="spatne" size={20} className="shrink-0 text-spatne" />
              <span>
                <span className="font-semibold text-spatne">To není ochranný vodič.</span> Izolace {VODICE[tip].barva} patří
                vodiči: {VODICE[tip].funkce}. Ochranný vodič PE má izolaci zelenožlutou.
              </span>
            </p>
          )}
          <button type="button" onClick={novaUloha} className={`${tlacitkoSekundarni} mt-3 w-full`}>
            <Icon nazev="obnovit" size={18} />
            Nová úloha
          </button>
          <div className="mt-3">
            <Zdroje fakta={["K7-04", "K7-05", "K7-07"]} />
          </div>
        </div>
      )}
    </>
  );
}
