// Registr interaktivních ilustrací. Ilustrace, které ještě nejsou hotové (pozdější fáze),
// v registru chybějí a na kartě se nezobrazí.
import type { ComponentType } from "react";
import type { IlustraceId } from "../data/typy";
import KodOpravneni from "./kod-opravneni";
import KprMetronom from "./kpr-metronom";
import LhutyRevizi from "./lhuty-revizi";
import PetPravidel from "./pet-pravidel";
import RezimyPrace from "./rezimy-prace";
import ZebricekZpusobilosti from "./zebricek-zpusobilosti";
import ZonyPrace from "./zony-prace";

export const REGISTR_ILUSTRACI: Partial<Record<IlustraceId, ComponentType>> = {
  "zebricek-zpusobilosti": ZebricekZpusobilosti,
  "lhuty-revizi": LhutyRevizi,
  "kod-opravneni": KodOpravneni,
  "rezimy-prace": RezimyPrace,
  "pet-pravidel": PetPravidel,
  "zony-prace": ZonyPrace,
  "kpr-metronom": KprMetronom
};
