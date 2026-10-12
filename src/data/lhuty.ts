// Nejdelší lhůty pravidelných revizí pro ilustraci „lhuty-revizi“.
// Hodnoty jsou převzaté z faktů K2-15 (příloha č. 4 NV č. 190/2022 Sb., objekty a prostory)
// a K2-16 (ochrana před bleskem). Pravidla použití: K2-17 (nejkratší lhůta),
// K2-18 (rok konce lhůty), K2-19 (řád preventivní údržby – až dvojnásobek).
// Při změně faktu je nutné upravit i tuto tabulku.

export type SkupinaLhuty = "instalace" | "blesk";

export interface LhutaRevize {
  id: string;
  skupina: SkupinaLhuty;
  nazev: string;
  roky: number;
  fakt: "K2-15" | "K2-16";
}

export const LHUTY: LhutaRevize[] = [
  { id: "administrativa", skupina: "instalace", nazev: "Objekt pro administrativu", roky: 5, fakt: "K2-15" },
  { id: "vyroba", skupina: "instalace", nazev: "Objekt pro výrobu", roky: 3, fakt: "K2-15" },
  { id: "vzdelavani", skupina: "instalace", nazev: "Škola, mateřská škola", roky: 3, fakt: "K2-15" },
  { id: "ubytovani", skupina: "instalace", nazev: "Objekt pro ubytování", roky: 3, fakt: "K2-15" },
  { id: "lekarske", skupina: "instalace", nazev: "Objekt pro lékařské účely", roky: 3, fakt: "K2-15" },
  { id: "nad-200", skupina: "instalace", nazev: "Objekt pro více než 200 osob", roky: 2, fakt: "K2-15" },
  { id: "pozar-vybuch", skupina: "instalace", nazev: "Prostor s nebezpečím požáru a výbuchu", roky: 3, fakt: "K2-15" },
  { id: "mokre", skupina: "instalace", nazev: "Mokrý prostor", roky: 1, fakt: "K2-15" },
  { id: "korozivni", skupina: "instalace", nazev: "Prostor s korozivními nebo znečišťujícími látkami", roky: 1, fakt: "K2-15" },
  { id: "pojizdne", skupina: "instalace", nazev: "Pojízdný a převozný prostředek", roky: 1, fakt: "K2-15" },
  { id: "staveniste", skupina: "instalace", nazev: "Prozatímní zařízení staveniště", roky: 0.5, fakt: "K2-15" },
  { id: "lps-kriticke", skupina: "blesk", nazev: "Chrání kritické systémy", roky: 2, fakt: "K2-16" },
  { id: "lps-ostatni", skupina: "blesk", nazev: "Ostatní ochrana před bleskem", roky: 4, fakt: "K2-16" }
];

/** Fakta, ze kterých ilustrace lhůt čerpá. */
export const LHUTY_FAKTA = ["K2-15", "K2-16", "K2-17", "K2-18", "K2-19"];
