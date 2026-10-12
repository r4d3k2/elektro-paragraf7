// #/k/:id/nauka/:index – karta nauky (pořadí od 1). Zobrazená karta se označí jako přečtená.
import { useEffect } from "react";
import type { Kapitola } from "../data/kapitoly";
import type { ObsahKapitoly } from "../data/typy";
import { Zdroje } from "../components/FaktChip";
import { Icon } from "../components/Icon";
import { IlustraceBlok } from "../components/IlustraceBlok";
import { Layout } from "../components/Layout";
import { OdznakOverit } from "../components/OdznakOverit";
import { Pruh } from "../components/Pruh";
import { tlacitkoPrimarni, tlacitkoSekundarni } from "../components/styly";
import { maOverit } from "../lib/fakta";
import { MiniMarkdown } from "../lib/miniMarkdown";
import { nazevPodtematu } from "../lib/obsah";
import { pokrok } from "../lib/progress";
import { odkaz, prejdi } from "../lib/route";

interface Props {
  kapitola: Kapitola;
  obsah: ObsahKapitoly;
  poradi: string | undefined;
}

export function Nauka({ kapitola, obsah, poradi }: Props) {
  const celkem = obsah.lekce.length;
  const cislo = Number(poradi);
  const platne = Number.isInteger(cislo) && cislo >= 1 && cislo <= celkem;
  const karta = platne ? obsah.lekce[cislo - 1] : undefined;
  const zaklad = `/k/${kapitola.id}`;

  useEffect(() => {
    if (!platne) {
      prejdi(`#${zaklad}/nauka/1`, { nahradit: true });
      return;
    }
    if (karta) {
      pokrok.oznacPrectene(karta.id);
      pokrok.nastavPosledniMisto(`#${zaklad}/nauka/${cislo}`);
    }
  }, [platne, karta, zaklad, cislo]);

  if (!karta) return null;

  const predchozi = cislo > 1 ? `#${zaklad}/nauka/${cislo - 1}` : undefined;
  const dalsi = cislo < celkem ? `#${zaklad}/nauka/${cislo + 1}` : undefined;
  const procvicitPodtema = odkaz(`${zaklad}/procvic`, { podtema: karta.podtema });

  return (
    <Layout
      titulek={karta.nadpis}
      zpet={{ href: `#${zaklad}`, popis: `Kapitola ${kapitola.cislo}` }}
      stitek={`Nauka ${cislo} / ${celkem}`}
    >
      <Pruh hodnota={cislo} max={celkem} popis={`Karta ${cislo} z ${celkem}`} />
      <p className="mt-4 text-sm font-medium text-tlumeny">{nazevPodtematu(obsah, karta.podtema)}</p>
      <h1 className="mt-1 text-2xl leading-tight font-bold">{karta.nadpis}</h1>

      {maOverit(karta.fakta) && (
        <div className="mt-3">
          <OdznakOverit popis="Karta se opírá o údaj, který je potřeba potvrdit v aktuálním znění normy." />
        </div>
      )}

      <MiniMarkdown text={karta.text} className="mt-4 text-[1.0625rem] leading-relaxed" />

      {karta.ilustrace && (
        <div className="mt-6">
          <IlustraceBlok id={karta.ilustrace} />
        </div>
      )}

      <div className="mt-6">
        <Zdroje fakta={karta.fakta} />
      </div>

      <a href={procvicitPodtema} className={`${tlacitkoPrimarni} mt-6 w-full`}>
        <Icon nazev="procvic" size={20} />
        Procvičit toto podtéma
      </a>

      <nav className="mt-3 grid grid-cols-2 gap-3" aria-label="Listování kartami">
        {predchozi ? (
          <a href={predchozi} className={tlacitkoSekundarni}>
            <Icon nazev="sipkaVlevo" size={18} />
            Předchozí
          </a>
        ) : (
          <span />
        )}
        {dalsi ? (
          <a href={dalsi} className={tlacitkoSekundarni}>
            Další
            <Icon nazev="sipkaVpravo" size={18} />
          </a>
        ) : (
          <a href={odkaz(`${zaklad}/procvic`)} className={tlacitkoSekundarni}>
            Procvičit vše
            <Icon nazev="sipkaVpravo" size={18} />
          </a>
        )}
      </nav>
    </Layout>
  );
}
