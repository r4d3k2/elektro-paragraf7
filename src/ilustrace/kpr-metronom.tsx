// Ilustrace „Metronom pro resuscitaci“: tempo 100–120 za minutu a hloubka 5–6 cm (K5-01),
// 30 stlačení a 2 vdechy (K5-02), přerušení nejvýše 10 s (K5-03), režim bez vdechů (K5-04, „overit“).
// Doba každého úderu se počítá od kotvy přes performance.now() (kotva + n · interval), takže se
// zpoždění časovače nesčítá. Zvuk přes Web Audio je volitelný a ve výchozím stavu vypnutý.
import { useEffect, useRef, useState } from "react";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { nadpisSekce, tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { NadpisIlustrace, Prepinac } from "./ovladani";

const TEMPO_MIN = 100;
const TEMPO_MAX = 120;
const TEMPO_KROK = 5;
const TEMPO_VYCHOZI = 110;
const STLACENI_V_CYKLU = 30;
const PRERUSENI_MS = 10_000;
const BLIK_MS = 120;

type Faze = "stoji" | "stlaceni" | "vdechy";

interface Zobrazeni {
  faze: Faze;
  vCyklu: number;
  celkem: number;
  zbyvaS: number;
  uplynuloMs: number;
  namereneTempo: number | null;
}

const KLID: Zobrazeni = { faze: "stoji", vCyklu: 0, celkem: 0, zbyvaS: 0, uplynuloMs: 0, namereneTempo: null };

type AudioKontext = typeof AudioContext;

function vytvorAudio(): AudioContext | null {
  const Trida: AudioKontext | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioKontext }).webkitAudioContext;
  try {
    return Trida ? new Trida() : null;
  } catch {
    return null;
  }
}

function pipni(ctx: AudioContext, frekvence: number, delkaS: number): void {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const zisk = ctx.createGain();
  osc.frequency.value = frekvence;
  zisk.gain.setValueAtTime(0.0001, t);
  zisk.gain.exponentialRampToValueAtTime(0.35, t + 0.005);
  zisk.gain.exponentialRampToValueAtTime(0.0001, t + delkaS);
  osc.connect(zisk);
  zisk.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + delkaS + 0.02);
}

function formatCas(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function KprMetronom() {
  const [tempo, setTempo] = useState(TEMPO_VYCHOZI);
  const [zvuk, setZvuk] = useState(false);
  const [jenStlaceni, setJenStlaceni] = useState(false);
  const [blik, setBlik] = useState(false);
  const [z, setZ] = useState<Zobrazeni>(KLID);

  // Časování drží refy, aby se při překreslení nerozpadlo. Stav pro zobrazení jde do „z“.
  const r = useRef({
    faze: "stoji" as Faze,
    interval: 60_000 / TEMPO_VYCHOZI,
    kotva: 0, // čas úderu s indexem 0 v aktuální sérii
    index: 0, // počet úderů, které už v sérii zazněly
    vCyklu: 0,
    celkem: 0,
    start: 0, // začátek celého běhu
    konec: 0, // okamžik zastavení (údaje po zastavení zůstanou vidět)
    prvniVSerii: 0,
    posledni: 0,
    konecPauzy: 0,
    jenStlaceni: false,
    zvuk: false,
    casovac: 0,
    casovacBliku: 0
  });
  const audio = useRef<AudioContext | null>(null);

  function zobraz() {
    const s = r.current;
    const uderuVSerii = s.index;
    const namereneTempo =
      uderuVSerii >= 2 && s.posledni > s.prvniVSerii ? ((uderuVSerii - 1) * 60_000) / (s.posledni - s.prvniVSerii) : null;
    setZ({
      faze: s.faze,
      vCyklu: s.vCyklu,
      celkem: s.celkem,
      zbyvaS: Math.max(0, Math.ceil((s.konecPauzy - performance.now()) / 1000)),
      uplynuloMs: s.start ? (s.faze === "stoji" ? s.konec : performance.now()) - s.start : 0,
      namereneTempo
    });
  }

  function zrusCasovace() {
    window.clearTimeout(r.current.casovac);
    window.clearTimeout(r.current.casovacBliku);
  }

  function uder(ted: number, novych: number) {
    const s = r.current;
    s.celkem += novych;
    s.vCyklu = s.jenStlaceni ? ((s.vCyklu + novych - 1) % STLACENI_V_CYKLU) + 1 : Math.min(STLACENI_V_CYKLU, s.vCyklu + novych);
    s.posledni = ted;
    if (s.index === novych) s.prvniVSerii = ted;
    if (s.zvuk && audio.current) pipni(audio.current, 1000, 0.05);
    setBlik(true);
    window.clearTimeout(s.casovacBliku);
    s.casovacBliku = window.setTimeout(() => setBlik(false), BLIK_MS);
  }

  function naplanujUder() {
    const s = r.current;
    const dalsi = s.kotva + s.index * s.interval;
    s.casovac = window.setTimeout(tik, Math.max(0, dalsi - performance.now()));
  }

  function tik() {
    const s = r.current;
    if (s.faze !== "stlaceni") return;
    const ted = performance.now();
    // Kolik úderů mělo od kotvy proběhnout; po uspání záložky se zmeškané nepřehrávají dávkou.
    const melo = Math.floor((ted - s.kotva) / s.interval) + 1;
    const novych = Math.max(1, melo - s.index);
    s.index += novych;
    uder(ted, novych);
    if (!s.jenStlaceni && s.vCyklu >= STLACENI_V_CYKLU) {
      zacniVdechy(ted);
    } else {
      naplanujUder();
    }
    zobraz();
  }

  function zacniSerii(ted: number) {
    const s = r.current;
    s.faze = "stlaceni";
    s.kotva = ted;
    s.index = 0;
    s.vCyklu = 0;
    naplanujUder();
  }

  function zacniVdechy(ted: number) {
    const s = r.current;
    s.faze = "vdechy";
    s.konecPauzy = ted + PRERUSENI_MS;
    if (s.zvuk && audio.current) pipni(audio.current, 520, 0.25);
    odpocet();
  }

  function odpocet() {
    const s = r.current;
    if (s.faze !== "vdechy") return;
    const ted = performance.now();
    if (ted >= s.konecPauzy) {
      zacniSerii(ted);
      zobraz();
      return;
    }
    zobraz();
    const doCeleSekundy = ((s.konecPauzy - ted) % 1000) + 5;
    s.casovac = window.setTimeout(odpocet, Math.min(doCeleSekundy, s.konecPauzy - ted));
  }

  function spust() {
    const s = r.current;
    if (s.zvuk) pripravAudio();
    zrusCasovace();
    const ted = performance.now();
    s.celkem = 0;
    s.start = ted;
    s.prvniVSerii = ted;
    s.posledni = ted;
    zacniSerii(ted);
    zobraz();
  }

  function zastav() {
    const s = r.current;
    zrusCasovace();
    s.faze = "stoji";
    s.konec = performance.now();
    setBlik(false);
    zobraz();
  }

  function pokracuj() {
    const s = r.current;
    if (s.faze !== "vdechy") return;
    window.clearTimeout(s.casovac);
    zacniSerii(performance.now());
    zobraz();
  }

  function pripravAudio() {
    if (!audio.current) audio.current = vytvorAudio();
    // iOS pustí zvuk jen po gestu uživatele – proto resume() přímo v obsluze klepnutí.
    void audio.current?.resume().catch(() => undefined);
  }

  function zmenTempo(nove: number) {
    const s = r.current;
    const ohraniceno = Math.min(TEMPO_MAX, Math.max(TEMPO_MIN, nove));
    setTempo(ohraniceno);
    const novyInterval = 60_000 / ohraniceno;
    if (s.faze === "stlaceni" && s.index > 0) {
      // Nová kotva v plánovaném čase posledního úderu: další úder přijde za nový interval,
      // série a měření tempa začnou znovu.
      window.clearTimeout(s.casovac);
      s.kotva = s.kotva + (s.index - 1) * s.interval;
      s.prvniVSerii = s.posledni;
      s.index = 1;
      s.interval = novyInterval;
      naplanujUder();
      zobraz();
    } else {
      s.interval = novyInterval;
    }
  }

  function prepniZvuk(zapnout: boolean) {
    setZvuk(zapnout);
    r.current.zvuk = zapnout;
    if (zapnout) pripravAudio();
  }

  function prepniJenStlaceni(zapnout: boolean) {
    setJenStlaceni(zapnout);
    const s = r.current;
    s.jenStlaceni = zapnout;
    if (zapnout && s.faze === "vdechy") pokracuj();
  }

  // Při skrytí stránky (jiná aplikace, zamčený displej) se metronom zastaví; při odchodu uklidí.
  useEffect(() => {
    const priSkryti = () => {
      if (document.hidden && r.current.faze !== "stoji") zastav();
    };
    document.addEventListener("visibilitychange", priSkryti);
    const s = r.current;
    return () => {
      document.removeEventListener("visibilitychange", priSkryti);
      window.clearTimeout(s.casovac);
      window.clearTimeout(s.casovacBliku);
      void audio.current?.close().catch(() => undefined);
      audio.current = null;
    };
  }, []);

  const bezi = z.faze !== "stoji";
  const vdechy = z.faze === "vdechy";

  return (
    <>
      <NadpisIlustrace
        nadpis="Metronom pro stlačování hrudníku"
        napoveda="Stlačujte v rytmu pulzu. Po 30 stlačeních přijde výzva ke 2 vdechům."
      />

      <div className="flex flex-col items-center">
        <div
          aria-hidden="true"
          className={`flex h-44 w-44 flex-col items-center justify-center rounded-full border-4 transition-[transform,background-color,border-color] duration-100 ${
            vdechy
              ? "border-akcent bg-plocha-2"
              : blik
                ? "border-primarni bg-primarni/25 motion-safe:scale-105"
                : "border-hrana bg-plocha-2"
          }`}
        >
          {vdechy ? (
            <>
              <span className="text-2xl font-bold">2 vdechy</span>
              <span className="mt-1 font-mono text-sm text-tlumeny">zbývá {z.zbyvaS} s</span>
            </>
          ) : (
            <>
              <span className="font-mono text-6xl leading-none font-semibold">{bezi ? z.vCyklu : "–"}</span>
              <span className="mt-1 font-mono text-sm text-tlumeny">/ {STLACENI_V_CYKLU}</span>
            </>
          )}
        </div>
        <p className="sr-only" aria-live="assertive">
          {vdechy ? "Dva vdechy" : bezi ? "Stlačujte" : ""}
        </p>

        <div className="mt-4 grid w-full gap-2">
          {vdechy && (
            <button type="button" onClick={pokracuj} className={tlacitkoPrimarni}>
              Pokračovat ve stlačování
            </button>
          )}
          <button type="button" onClick={bezi ? zastav : spust} className={bezi ? tlacitkoSekundarni : tlacitkoPrimarni}>
            <Icon nazev={bezi ? "stop" : "start"} size={18} />
            {bezi ? "Stop" : "Start"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className={nadpisSekce} id="kpr-tempo">
          Tempo
        </p>
        <div className="mt-1.5 flex items-center gap-3" role="group" aria-labelledby="kpr-tempo">
          <button
            type="button"
            onClick={() => zmenTempo(tempo - TEMPO_KROK)}
            disabled={tempo <= TEMPO_MIN}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha disabled:opacity-40"
            aria-label={`Pomaleji o ${TEMPO_KROK}`}
          >
            <Icon nazev="minus" size={18} />
          </button>
          <span className="min-w-[7ch] text-center font-mono text-lg font-semibold" aria-live="polite">
            {tempo} / min
          </span>
          <button
            type="button"
            onClick={() => zmenTempo(tempo + TEMPO_KROK)}
            disabled={tempo >= TEMPO_MAX}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-hrana bg-plocha disabled:opacity-40"
            aria-label={`Rychleji o ${TEMPO_KROK}`}
          >
            <Icon nazev="plus" size={18} />
          </button>
          <span className="text-sm text-tlumeny">rozsah 100–120</span>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <Prepinac zapnuto={zvuk} onZmena={prepniZvuk}>
          <span className="inline-flex items-center gap-1.5">
            <Icon nazev={zvuk ? "zvuk" : "ticho"} size={18} />
            Zvuk při každém stlačení
          </span>
        </Prepinac>
        <Prepinac zapnuto={jenStlaceni} onZmena={prepniJenStlaceni}>
          Jen stlačování, bez vdechů
        </Prepinac>
        {jenStlaceni && (
          <p className="pl-1 text-sm text-tlumeny">
            Pro toho, kdo neumí nebo nechce dýchat z úst do úst. Opírá se o fakt K5-04 se stavem „ověřit“.
          </p>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-plocha-2 p-3 text-center">
        <div>
          <dt className="text-xs text-tlumeny">Uplynulo</dt>
          <dd className="font-mono font-semibold">{formatCas(z.uplynuloMs)}</dd>
        </div>
        <div>
          <dt className="text-xs text-tlumeny">Stlačení</dt>
          <dd className="font-mono font-semibold">{z.celkem}</dd>
        </div>
        <div>
          <dt className="text-xs text-tlumeny">Naměřené tempo</dt>
          <dd className="font-mono font-semibold">
            {z.namereneTempo === null ? "–" : z.namereneTempo.toFixed(1).replace(".", ",")}
          </dd>
        </div>
      </dl>

      <div className="mt-3 rounded-lg border border-hrana p-3 text-sm">
        <p className="font-semibold">Připomínka</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5">
          <li>hloubka stlačení nejméně 5 cm, nejvýše 6 cm</li>
          <li>tempo 100 až 120 za minutu, začít co nejdříve</li>
          <li>30 stlačení a 2 vdechy, přerušení nejvýše 10 s</li>
        </ul>
        <p className="mt-2 text-tlumeny">Na iPhonu může zvuk ztlumit tichý režim. Při přepnutí do jiné aplikace se metronom zastaví.</p>
      </div>

      <div className="mt-3">
        <Zdroje fakta={["K5-01", "K5-02", "K5-03", "K5-04"]} />
      </div>
    </>
  );
}
