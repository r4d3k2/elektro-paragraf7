// Registr interaktivních ilustrací. Ilustrace, které ještě nejsou hotové (pozdější fáze),
// v registru chybějí a na kartě se nezobrazí.
import type { ComponentType } from "react";
import type { IlustraceId } from "../data/typy";
import KodOpravneni from "./kod-opravneni";
import LhutyRevizi from "./lhuty-revizi";
import ZebricekZpusobilosti from "./zebricek-zpusobilosti";

export const REGISTR_ILUSTRACI: Partial<Record<IlustraceId, ComponentType>> = {
  "zebricek-zpusobilosti": ZebricekZpusobilosti,
  "lhuty-revizi": LhutyRevizi,
  "kod-opravneni": KodOpravneni
};
