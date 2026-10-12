// Datový model obsahu – podle docs/elektro-par7-spec.md, sekce 4.
import type { KapitolaId } from "./kapitoly";

export const ILUSTRACE = [
  "zebricek-zpusobilosti", "lhuty-revizi", "kod-opravneni",               // F1
  "rezimy-prace", "pet-pravidel", "zony-prace", "kpr-metronom",          // F2
  "site-tn-tt-it", "proudovy-chranic", "barvy-vodicu", "ip-kod", "poradi-mereni" // F3
] as const;
export type IlustraceId = (typeof ILUSTRACE)[number];

export interface Podtema { id: string; nazev: string }

export interface LekceKarta {
  id: string;            // např. "k1-l01"
  podtema: string;
  nadpis: string;
  text: string;          // mini-markdown
  ilustrace?: IlustraceId;
  fakta: string[];
}

export interface Moznost {
  id: "a" | "b" | "c" | "d";
  text: string;
  spravna: boolean;
  vysvetleni: string;
}

interface OtazkaZaklad {
  id: string;            // např. "k1-q01"
  kapitola: KapitolaId;
  podtema: string;
  zadani: string;
  shrnuti: string;
  fakta: string[];
  obtiznost: 1 | 2 | 3;
  ilustrace?: IlustraceId;
}
export interface OtazkaVyber extends OtazkaZaklad { typ: "vyber"; moznosti: Moznost[] }
export interface OtazkaPoradi extends OtazkaZaklad {
  typ: "poradi";
  polozky: { id: string; text: string }[]; // v datech v zamíchaném pořadí
  spravnePoradi: string[];                  // id položek ve správném pořadí
  vysvetleniPoradi: string;
}
export type Otazka = OtazkaVyber | OtazkaPoradi;

export interface ObsahKapitoly {
  kapitola: KapitolaId;
  podtemata: Podtema[];
  lekce: LekceKarta[];
  otazky: Otazka[];
}
