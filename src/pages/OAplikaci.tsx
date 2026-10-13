// #/o-aplikaci – účel, rozsah, upozornění, legenda stavů faktů, zdroje, vzhled, offline režim,
// pokrok a jeho reset, záloha a obnova pokroku (soubor JSON) a verze.
import { useRef, useState, type ReactNode } from "react";
import { FAKTA_OVERENO_K, ZDROJE_ZNENI } from "../data/fakta";
import { AKTUALNI_FAZE } from "../data/faze";
import { KAPITOLY } from "../data/kapitoly";
import { Icon } from "../components/Icon";
import { Layout } from "../components/Layout";
import { nadpisSekce, plocha, tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { POCET_FAKTU } from "../lib/fakta";
import { formatDatum as formatDatumCasu } from "../lib/format";
import { jeAktivni } from "../lib/obsah";
import { useOfflineAktivni } from "../lib/pripojeni";
import { aktualniPokrok, pokrok, ukladaniDostupne, usePokrok } from "../lib/progress";
import { prectiZalohu, vytvorZalohu, type Ulozeno, type Vzhled } from "../lib/storage";
import { POPIS_VZHLEDU } from "../lib/vzhled";
import { smazRozpracovanou } from "../lib/zkouska";

function formatDatum(iso: string): string {
  const [rok, mesic, den] = iso.split("-").map(Number);
  return rok && mesic && den ? `${den}. ${mesic}. ${rok}` : iso;
}

/** „1–5“ pro souvislou řadu, jinak „1, 2 a 4“. */
function vycetKapitol(cisla: number[]): string {
  if (cisla.length === 0) return "";
  const souvisla = cisla.every((c, i) => i === 0 || c === cisla[i - 1] + 1);
  if (cisla.length > 2 && souvisla) return `${cisla[0]}–${cisla[cisla.length - 1]}`;
  if (cisla.length === 1) return String(cisla[0]);
  return `${cisla.slice(0, -1).join(", ")} a ${cisla[cisla.length - 1]}`;
}

function SouhrnPokroku({ stav }: { stav: Ulozeno }) {
  const testu = Object.values(stav.testy).reduce((soucet, seznam) => soucet + seznam.length, 0);
  return (
    <>
      Zodpovězené otázky: <span className="font-mono">{Object.keys(stav.otazky).length}</span> · přečtené karty:{" "}
      <span className="font-mono">{stav.prectene.length}</span> · testy kapitol: <span className="font-mono">{testu}</span> ·
      zkoušky nanečisto: <span className="font-mono">{stav.zkousky.length}</span>
    </>
  );
}

function Sekce({ nadpis, children }: { nadpis: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className={nadpisSekce}>{nadpis}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export function OAplikaci() {
  const stav = usePokrok();
  const [potvrzeni, setPotvrzeni] = useState(false);
  const [smazano, setSmazano] = useState(false);
  const aktivni = KAPITOLY.filter(jeAktivni).map((k) => k.cislo);
  const offline = useOfflineAktivni();
  // Hláška o smazání platí, jen dokud je pokrok prázdný (po obnově ze zálohy zmizí).
  const prazdny =
    Object.keys(stav.otazky).length === 0 &&
    stav.prectene.length === 0 &&
    Object.keys(stav.testy).length === 0 &&
    stav.zkousky.length === 0;

  return (
    <Layout titulek="O aplikaci" zpet={{ href: "#/", popis: "Domů" }} stitek="O aplikaci">
      <h1 className="text-2xl font-bold">O aplikaci</h1>

      <div className="mt-4 flex gap-3 rounded-xl border-2 border-akcent bg-plocha p-4">
        <Icon nazev="pozor" size={22} className="mt-0.5 shrink-0 text-overit" />
        <div>
          <p className="font-semibold">Studijní pomůcka</p>
          <p className="mt-1">
            Aplikace slouží k přípravě na zkoušku. Rozhodující je vždy platné znění předpisů a norem. Fakta jsou
            ověřená k datu <span className="font-mono">{formatDatum(FAKTA_OVERENO_K)}</span>.
          </p>
        </div>
      </div>

      <Sekce nadpis="Účel">
        <p>
          Osobní trenažér ke zkoušce z odborné způsobilosti v elektrotechnice v rozsahu § 7 nařízení vlády
          č. 194/2022 Sb. – vedoucí elektrotechnik. Učíte se testováním: každá možnost, správná i špatná, má
          vysvětlení s odkazem na předpis.
        </p>
      </Sekce>

      <Sekce nadpis="Rozsah">
        <p>
          Napětí do 1 kV AC / 1,5 kV DC, objekty bez nebezpečí výbuchu. Látka je v 9 kapitolách v pevném pořadí.{" "}
          {aktivni.length === KAPITOLY.length
            ? `Zpřístupněné jsou všechny kapitoly (fáze ${AKTUALNI_FAZE}).`
            : `Teď jsou zpřístupněné kapitoly ${vycetKapitol(aktivni)} (fáze ${AKTUALNI_FAZE}), další přibudou.`}
        </p>
      </Sekce>

      <Sekce nadpis="Stav faktů">
        <p>
          Všechna odborná tvrzení vycházejí z báze {POCET_FAKTU.celkem} faktů. Každá karta i otázka ukazuje své zdroje;
          klepnutím na čip zdroje zobrazíte text faktu.
        </p>
        <ul className="mt-3 space-y-2">
          <li className={`${plocha} flex gap-3 p-3`}>
            <span className="inline-flex h-fit items-center gap-1.5 rounded-md border border-spravne/40 bg-spravne/5 px-2 py-1 text-sm font-semibold text-spravne">
              <Icon nazev="spravne" size={16} />
              Ověřeno
            </span>
            <span className="text-sm">
              Ověřeno v textu předpisu nebo ve zdroji uvedeném u faktu ({POCET_FAKTU.overeno} faktů).
            </span>
          </li>
          <li className={`${plocha} flex gap-3 p-3`}>
            <span className="inline-flex h-fit shrink-0 items-center gap-1.5 rounded-md border border-overit/50 bg-overit/5 px-2 py-1 text-sm font-semibold text-overit">
              <Icon nazev="pozor" size={16} />
              Ověřit
            </span>
            <span className="text-sm">
              Běžně uváděný údaj, který je potřeba potvrdit v aktuálním znění normy ({POCET_FAKTU.overit} faktů). Karty
              a otázky, které se o něj opírají, nesou odznak „Ověřit v normě“ a do Zkoušky nanečisto se standardně
              nezařazují.
            </span>
          </li>
        </ul>
      </Sekce>

      <Sekce nadpis={`Zdroje znění (stav k ${formatDatum(FAKTA_OVERENO_K)})`}>
        <ul className="space-y-2">
          {ZDROJE_ZNENI.map((z) => (
            <li key={z} className="flex gap-2 text-sm">
              <Icon nazev="zdroj" size={16} className="mt-0.5 shrink-0 text-tlumeny" />
              <span>{z}</span>
            </li>
          ))}
        </ul>
      </Sekce>

      <Sekce nadpis="Vzhled">
        <div className="grid grid-cols-3 gap-1 rounded-lg border border-hrana bg-plocha p-1" role="group" aria-label="Vzhled">
          {(Object.keys(POPIS_VZHLEDU) as Vzhled[]).map((v) => {
            const aktivniVzhled = stav.nastaveni.vzhled === v;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={aktivniVzhled}
                onClick={() => pokrok.nastavVzhled(v)}
                className={`min-h-11 rounded-md px-2 text-sm font-medium transition-colors duration-150 ${
                  aktivniVzhled ? "bg-primarni text-na-primarni" : "hover:bg-plocha-2"
                }`}
              >
                {POPIS_VZHLEDU[v]}
              </button>
            );
          })}
        </div>
      </Sekce>

      <Sekce nadpis="Offline režim">
        <p className="flex gap-2 text-sm">
          <Icon
            nazev={offline ? "spravne" : "info"}
            size={18}
            className={`mt-0.5 shrink-0 ${offline ? "text-spravne" : "text-tlumeny"}`}
          />
          <span>
            {offline
              ? "Aplikace je uložená v zařízení a funguje i bez připojení (například v režimu letadlo)."
              : "Offline režim zatím není aktivní. Zapne se sám po načtení aplikace s připojením k internetu."}
          </span>
        </p>
        <p className="mt-2 text-sm text-tlumeny">
          Na iPhonu otevřete aplikaci v Safari a zvolte Sdílet → Přidat na plochu. Nová verze se nenačte sama:
          aplikace nabídne „Je k dispozici nová verze“ a načte ji až po klepnutí na Načíst.
        </p>
      </Sekce>

      <Sekce nadpis="Pokrok">
        <p className="text-sm">
          <SouhrnPokroku stav={stav} />
        </p>
        <p className="mt-1 text-sm text-tlumeny">
          {ukladaniDostupne
            ? "Pokrok se ukládá jen v tomto prohlížeči na tomto zařízení."
            : "Prohlížeč nedovoluje ukládat data, pokrok se po zavření ztratí."}
        </p>
        {!potvrzeni ? (
          <button type="button" onClick={() => setPotvrzeni(true)} className={`${tlacitkoSekundarni} mt-3`}>
            <Icon nazev="smazat" size={18} />
            Smazat pokrok
          </button>
        ) : (
          <div className="mt-3 rounded-xl border-2 border-spatne/60 p-4" role="alertdialog" aria-labelledby="reset-otazka">
            <p id="reset-otazka" className="font-semibold">
              Opravdu smazat veškerý pokrok?
            </p>
            <p className="mt-1 text-sm text-tlumeny">
              Smažou se odpovědi, přečtené karty, výsledky testů a zkoušek, rozpracovaná zkouška a poslední místo.
              Nastavení vzhledu zůstane. Akci nelze vrátit; předtím si můžete stáhnout zálohu.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  pokrok.smazPokrok();
                  smazRozpracovanou();
                  setPotvrzeni(false);
                  setSmazano(true);
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-spatne px-4 font-medium text-plocha"
              >
                Smazat
              </button>
              <button type="button" onClick={() => setPotvrzeni(false)} className={tlacitkoSekundarni}>
                Ponechat
              </button>
            </div>
          </div>
        )}
        {smazano && prazdny && (
          <p className="mt-2 text-sm text-spravne" role="status">
            Pokrok byl smazán.
          </p>
        )}
      </Sekce>

      <Sekce nadpis="Záloha a přenos na jiné zařízení">
        <Zaloha />
      </Sekce>

      <Sekce nadpis="Verze">
        <p className="font-mono text-sm">
          {__VERZE__} · fáze {AKTUALNI_FAZE}
        </p>
      </Sekce>
    </Layout>
  );
}

// ─── Záloha a obnova pokroku ────────────────────────────────────────────

function nazevSouboru(): string {
  const d = new Date();
  const dvemi = (n: number) => String(n).padStart(2, "0");
  return `elektro7-zaloha-${d.getFullYear()}-${dvemi(d.getMonth() + 1)}-${dvemi(d.getDate())}.json`;
}

function souborZalohy(): File {
  const text = JSON.stringify(vytvorZalohu(aktualniPokrok(), __VERZE__), null, 2);
  return new File([text], nazevSouboru(), { type: "application/json" });
}

/** Umí prohlížeč sdílet soubor (iPhone: nabídka Sdílet → Uložit do Souborů)? */
function lzeSdiletSoubor(): boolean {
  try {
    const zkusebni = new File(["{}"], "zaloha.json", { type: "application/json" });
    return typeof navigator.canShare === "function" && navigator.canShare({ files: [zkusebni] });
  } catch {
    return false;
  }
}

type StavObnovy =
  | { krok: "nic" }
  | { krok: "potvrdit"; data: Ulozeno; vytvoreno?: string; soubor: string }
  | { krok: "chyba"; zprava: string }
  | { krok: "hotovo" };

function Zaloha() {
  const vstup = useRef<HTMLInputElement>(null);
  const [obnova, setObnova] = useState<StavObnovy>({ krok: "nic" });
  const [hlaseni, setHlaseni] = useState("");
  const [sdilet] = useState(lzeSdiletSoubor);

  function stahni() {
    const soubor = souborZalohy();
    const url = URL.createObjectURL(soubor);
    const odkaz = document.createElement("a");
    odkaz.href = url;
    odkaz.download = soubor.name;
    document.body.appendChild(odkaz);
    odkaz.click();
    odkaz.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
    setHlaseni(`Záloha ${soubor.name} je připravená ke stažení.`);
  }

  async function sdilej() {
    try {
      await navigator.share({ files: [souborZalohy()], title: "Záloha Elektro §7" });
      setHlaseni("Záloha je odeslaná.");
    } catch (e) {
      // Zavření nabídky sdílení není chyba.
      if (!(e instanceof DOMException && e.name === "AbortError")) {
        setHlaseni("Sdílení se nepodařilo. Zkuste Stáhnout zálohu.");
      }
    }
  }

  async function prectiSoubor(soubor: File | undefined) {
    if (!soubor) return;
    try {
      const vysledek = prectiZalohu(await soubor.text());
      setObnova(
        vysledek.ok
          ? { krok: "potvrdit", data: vysledek.stav, vytvoreno: vysledek.vytvoreno, soubor: soubor.name }
          : { krok: "chyba", zprava: vysledek.duvod }
      );
    } catch {
      setObnova({ krok: "chyba", zprava: "Soubor se nepodařilo přečíst." });
    } finally {
      // Stejný soubor půjde vybrat znovu.
      if (vstup.current) vstup.current.value = "";
    }
  }

  return (
    <>
      <p className="text-sm">
        Pokrok je uložený jen v tomto prohlížeči. Zálohou ho přenesete na jiné zařízení (iPhone a PC) nebo ho
        ochráníte před smazáním dat prohlížeče.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={stahni} className={tlacitkoSekundarni}>
          <Icon nazev="stahnout" size={18} />
          Stáhnout zálohu
        </button>
        {sdilet && (
          <button type="button" onClick={() => void sdilej()} className={tlacitkoSekundarni}>
            <Icon nazev="sdilet" size={18} />
            Sdílet zálohu
          </button>
        )}
      </div>
      {sdilet && (
        <p className="mt-2 text-sm text-tlumeny">
          Na iPhonu: Sdílet zálohu → Uložit do Souborů, nebo ji pošlete e-mailem či přes AirDrop.
        </p>
      )}
      <p aria-live="polite" className="mt-1 text-sm text-spravne">
        {hlaseni}
      </p>

      <input
        ref={vstup}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => void prectiSoubor(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => {
          setObnova({ krok: "nic" });
          vstup.current?.click();
        }}
        className={`${tlacitkoSekundarni} mt-2 w-full sm:w-auto`}
      >
        <Icon nazev="nahrat" size={18} />
        Obnovit ze zálohy
      </button>

      {obnova.krok === "chyba" && (
        <p role="alert" className="mt-3 flex gap-2 rounded-xl border-2 border-spatne/60 p-3 text-sm">
          <Icon nazev="spatne" size={18} className="mt-0.5 shrink-0 text-spatne" />
          {obnova.zprava}
        </p>
      )}

      {obnova.krok === "potvrdit" && (
        <div className="mt-3 rounded-xl border-2 border-primarni/60 p-4" role="alertdialog" aria-labelledby="obnova-otazka">
          <p id="obnova-otazka" className="font-semibold">
            Obnovit pokrok ze zálohy?
          </p>
          <p className="mt-1 text-sm">
            <span className="font-mono break-all">{obnova.soubor}</span>
            {obnova.vytvoreno ? `, vytvořeno ${formatDatumCasu(obnova.vytvoreno)}` : ""}
          </p>
          <p className="mt-1 text-sm text-tlumeny">
            <SouhrnPokroku stav={obnova.data} />
          </p>
          <p className="mt-2 text-sm text-tlumeny">
            Současný pokrok na tomto zařízení se nahradí obsahem zálohy. Nastavení vzhledu zůstane.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                pokrok.obnovZeZalohy(obnova.data);
                setObnova({ krok: "hotovo" });
              }}
              className={tlacitkoPrimarni}
            >
              Obnovit
            </button>
            <button type="button" onClick={() => setObnova({ krok: "nic" })} className={tlacitkoSekundarni}>
              Zrušit
            </button>
          </div>
        </div>
      )}

      {obnova.krok === "hotovo" && (
        <p className="mt-3 text-sm text-spravne" role="status">
          Pokrok je obnovený ze zálohy.
        </p>
      )}
    </>
  );
}
