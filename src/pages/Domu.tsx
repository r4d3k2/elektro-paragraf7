// #/ – úvodní obrazovka: Pokračovat, zkouška nanečisto, chyby, přehled a seznam kapitol.
import { KAPITOLY } from "../data/kapitoly";
import { Icon, type NazevIkony } from "../components/Icon";
import { KapitolaKarta } from "../components/KapitolaKarta";
import { Layout } from "../components/Layout";
import { nadpisSekce, plocha } from "../components/styly";
import { procenta, tvar } from "../lib/format";
import { aktivniKapitoly, popisMista } from "../lib/obsah";
import { pocetChyb } from "../lib/prehled";
import { pocetZvladnutych, ukladaniDostupne, usePokrok } from "../lib/progress";
import { POCET_OTAZEK_ZKOUSKY } from "../lib/zkouska";

function Dlazdice({ href, ikona, nazev, popis }: { href: string; ikona: NazevIkony; nazev: string; popis: string }) {
  return (
    <a
      href={href}
      className={`${plocha} flex min-h-11 flex-col items-start p-3 transition-colors duration-150 hover:border-primarni active:bg-plocha-2`}
    >
      <Icon nazev={ikona} size={22} className="text-primarni" />
      <span className="mt-1.5 max-w-full text-sm leading-tight font-semibold">{nazev}</span>
      <span className="mt-0.5 max-w-full truncate font-mono text-xs text-tlumeny">{popis}</span>
    </a>
  );
}

export function Domu() {
  const stav = usePokrok();
  const misto = stav.posledniMisto ? popisMista(stav.posledniMisto) : undefined;
  const prvni = KAPITOLY[0];
  const chyb = pocetChyb(stav);
  const idOtazek = aktivniKapitoly().flatMap(({ obsah }) => obsah.otazky.map((o) => o.id));
  const zvladnuto = procenta(pocetZvladnutych(stav, idOtazek), idOtazek.length);

  return (
    <Layout titulek="">
      <h1 className="text-3xl font-bold tracking-tight">Elektro §7</h1>
      <p className="mt-1 text-tlumeny">Vedoucí elektrotechnik do 1 kV</p>

      <a
        href={misto && stav.posledniMisto ? stav.posledniMisto : `#/k/${prvni.id}/nauka/1`}
        className="mt-5 flex items-center gap-4 rounded-xl bg-primarni p-4 text-na-primarni transition-opacity duration-150 hover:opacity-95 active:opacity-90"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-na-primarni/15">
          <Icon nazev={misto ? "sipkaVpravo" : "nauka"} size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold">{misto ? "Pokračovat" : "Začít s kapitolou 1"}</span>
          <span className="block truncate text-sm opacity-90">
            {misto ? misto.popis : `Nauka 1 · ${prvni.nazev}`}
          </span>
          {misto && <span className="block truncate text-xs opacity-80">{misto.nadpis}</span>}
        </span>
      </a>

      {!ukladaniDostupne && (
        <p className="mt-4 flex gap-2 rounded-xl border border-overit/50 bg-overit/5 p-3 text-sm">
          <Icon nazev="info" size={18} className="mt-0.5 shrink-0 text-overit" />
          <span>
            Prohlížeč nedovoluje ukládat data (například v anonymním režimu). Aplikace funguje, ale po zavření si
            pokrok nezapamatuje.
          </span>
        </p>
      )}

      <nav aria-label="Trénink a přehled" className="mt-4 grid grid-cols-3 gap-2.5">
        <Dlazdice href="#/zkouska" ikona="zkouska" nazev="Zkouška nanečisto" popis={`${POCET_OTAZEK_ZKOUSKY} otázek`} />
        <Dlazdice
          href="#/chyby"
          ikona="chyby"
          nazev="Opakování chyb"
          popis={chyb > 0 ? `${chyb} ${tvar(chyb, "otázka", "otázky", "otázek")}` : "žádné"}
        />
        <Dlazdice href="#/prehled" ikona="prehled" nazev="Přehled pokroku" popis={`${zvladnuto} %`} />
      </nav>

      <h2 className={`${nadpisSekce} mt-8`}>Kapitoly</h2>
      <ol className="mt-3 space-y-3">
        {KAPITOLY.map((k) => (
          <KapitolaKarta key={k.id} kapitola={k} />
        ))}
      </ol>

      <a
        href="#/o-aplikaci"
        className="mt-8 flex min-h-11 items-center gap-2 rounded-lg px-1 font-medium text-primarni hover:underline"
      >
        <Icon nazev="info" size={18} />O aplikaci a zdrojích
      </a>
    </Layout>
  );
}
