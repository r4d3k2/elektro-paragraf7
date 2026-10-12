// Kapitoly trenažéru – pevné pořadí a fáze, ve které se kapitola zpřístupní.
// Zdroj: docs/elektro-par7-spec.md (verze 1.0, 2026-10-12). Mění se jen na výslovný pokyn.

export type KapitolaId =
  | "k1-legislativa"
  | "k2-vtz-revize"
  | "k3-organizace"
  | "k4-bezpecna-prace"
  | "k5-prvni-pomoc"
  | "k6-ochrana"
  | "k7-site-vodice"
  | "k8-prostory"
  | "k9-revize-mereni";

export interface Kapitola {
  id: KapitolaId;
  cislo: number;
  nazev: string;
  kratce: string;
  cile: string[];
  predpisy: string[];
  faze: 1 | 2 | 3;
}

export const KAPITOLY: Kapitola[] = [
  {
    id: "k1-legislativa",
    cislo: 1,
    nazev: "Legislativa a odborná způsobilost",
    kratce: "Zákon o VTZ, nařízení o odborné způsobilosti a stupně od osoby poučené po revizního technika.",
    cile: [
      "Rozlišit osobu poučenou, elektrotechnika, vedoucího elektrotechnika a revizního technika.",
      "Znát předpoklady vedoucího elektrotechnika včetně délky praxe podle rozsahu.",
      "Vědět, jak probíhá zkouška, jaká je hranice úspěšnosti a jak dlouho platí doklad."
    ],
    predpisy: ["zákon č. 250/2021 Sb.", "nařízení vlády č. 194/2022 Sb."],
    faze: 1
  },
  {
    id: "k2-vtz-revize",
    cislo: 2,
    nazev: "Vyhrazená elektrická zařízení a revize",
    kratce: "Co je vyhrazené elektrické zařízení, třídy, oprávnění a osvědčení, revize, lhůty a povinnosti provozovatele.",
    cile: [
      "Poznat, co je a co není vyhrazené elektrické zařízení a do jaké třídy patří.",
      "Číst kód oprávnění a osvědčení (E1/E2/E3, A/B, M/O/R/Z).",
      "Znát základní lhůty pravidelných revizí a náležitosti zprávy o revizi."
    ],
    predpisy: ["nařízení vlády č. 190/2022 Sb.", "zákon č. 250/2021 Sb."],
    faze: 1
  },
  {
    id: "k3-organizace",
    cislo: 3,
    nazev: "Organizace práce a odpovědnosti",
    kratce: "Osoba odpovědná za elektrické zařízení, vedoucí práce, práce podle pokynů, s dohledem a pod dozorem.",
    cile: [
      "Rozlišit práci podle pokynů, s dohledem a pod dozorem a vědět, kdo je smí zajišťovat.",
      "Vědět, co smí osoba poučená a co musí zajistit vedoucí práce.",
      "Řídit práci podle zásad hodnocení rizik, pověření a školení."
    ],
    predpisy: ["nařízení vlády č. 190/2022 Sb.", "nařízení vlády č. 194/2022 Sb."],
    faze: 2
  },
  {
    id: "k4-bezpecna-prace",
    cislo: 4,
    nazev: "Bezpečná práce na elektrických zařízeních",
    kratce: "Práce bez napětí, v blízkosti a pod napětím, pět základních pravidel, pásma kolem živých částí.",
    cile: [
      "Znát pět základních pravidel práce bez napětí ve správném pořadí.",
      "Rozlišit pásmo práce pod napětím a pásmo práce v blízkosti.",
      "Vědět, za jakých podmínek se zařízení po práci znovu zapíná."
    ],
    predpisy: ["ČSN EN 50110-1"],
    faze: 2
  },
  {
    id: "k5-prvni-pomoc",
    cislo: 5,
    nazev: "Účinky proudu a první pomoc",
    kratce: "Na čem závisí účinky proudu, vyproštění postiženého, resuscitace a AED.",
    cile: [
      "Vědět, na čem závisí účinky elektrického proudu na člověka.",
      "Bezpečně vyprostit postiženého z dosahu proudu.",
      "Provádět resuscitaci podle doporučení ERC 2025."
    ],
    predpisy: ["doporučení ERC 2025", "nařízení vlády č. 194/2022 Sb. (§ 9)"],
    faze: 2
  },
  {
    id: "k6-ochrana",
    cislo: 6,
    nazev: "Ochrana před úrazem elektrickým proudem",
    kratce: "Základní ochrana, ochrana při poruše, automatické odpojení, proudové chrániče, třídy ochrany.",
    cile: [
      "Vysvětlit princip ochranného opatření a doplňkové ochrany.",
      "Znát doby automatického odpojení v sítích TN a TT.",
      "Vědět, jak funguje proudový chránič a kde se nesmí použít."
    ],
    predpisy: ["ČSN 33 2000-4-41 ed. 3", "ČSN EN 61140"],
    faze: 3
  },
  {
    id: "k7-site-vodice",
    cislo: 7,
    nazev: "Sítě, uzemnění a značení vodičů",
    kratce: "Soustavy TN-C, TN-S, TN-C-S, TT a IT, vodič PEN a barevné značení vodičů.",
    cile: [
      "Přečíst označení sítě a nakreslit cestu poruchového proudu.",
      "Znát barvy vodičů PE, N, PEN a fázových vodičů.",
      "Vědět, co platí pro vodič PEN a jeho rozdělení."
    ],
    predpisy: ["ČSN 33 2000-1 ed. 2", "ČSN 33 0165 ed. 2", "ČSN 33 0166 ed. 2"],
    faze: 3
  },
  {
    id: "k8-prostory",
    cislo: 8,
    nazev: "Vnější vlivy, krytí a zvláštní prostory",
    kratce: "Posouzení vnějších vlivů, IP kód, prostory s vanou a sprchou, třídy zařízení podle prostředí.",
    cile: [
      "Vědět, k čemu slouží protokol o určení vnějších vlivů.",
      "Přečíst IP kód.",
      "Znát zásady pro prostory s vanou nebo sprchou."
    ],
    predpisy: ["ČSN 33 2000-5-51 ed. 3", "ČSN 33 2000-7-701 ed. 2", "ČSN EN 60529", "nařízení vlády č. 190/2022 Sb."],
    faze: 3
  },
  {
    id: "k9-revize-mereni",
    cislo: 9,
    nazev: "Revize a měření v praxi",
    kratce: "Podklady k revizi, prohlídka, pořadí zkoušek a měření, zpráva o revizi, spotřebiče a nářadí.",
    cile: [
      "Připravit podklady pro výchozí a pravidelnou revizi.",
      "Znát pořadí zkoušek a měření podle přílohy č. 1 NV 190/2022.",
      "Vědět, co se zkouší funkčně a co obsahuje zpráva o revizi."
    ],
    predpisy: ["nařízení vlády č. 190/2022 Sb. (přílohy 1 a 2)", "ČSN 33 2000-6 ed. 2"],
    faze: 3
  }
];
