// Registr interaktivních ilustrací. Ilustrace, které ještě nejsou hotové (pozdější fáze),
// v registru chybějí a na kartě se nezobrazí.
import type { ComponentType } from "react";
import type { IlustraceId } from "../data/typy";
import BarvyVodicu from "./barvy-vodicu";
import IpKod from "./ip-kod";
import KodOpravneni from "./kod-opravneni";
import KprMetronom from "./kpr-metronom";
import LhutyRevizi from "./lhuty-revizi";
import PetPravidel from "./pet-pravidel";
import PoradiMereni from "./poradi-mereni";
import ProudovyChranic from "./proudovy-chranic";
import RezimyPrace from "./rezimy-prace";
import SiteTnTtIt from "./site-tn-tt-it";
import ZebricekZpusobilosti from "./zebricek-zpusobilosti";
import ZonyPrace from "./zony-prace";

export const REGISTR_ILUSTRACI: Partial<Record<IlustraceId, ComponentType>> = {
  "zebricek-zpusobilosti": ZebricekZpusobilosti,
  "lhuty-revizi": LhutyRevizi,
  "kod-opravneni": KodOpravneni,
  "rezimy-prace": RezimyPrace,
  "pet-pravidel": PetPravidel,
  "zony-prace": ZonyPrace,
  "kpr-metronom": KprMetronom,
  "site-tn-tt-it": SiteTnTtIt,
  "proudovy-chranic": ProudovyChranic,
  "barvy-vodicu": BarvyVodicu,
  "ip-kod": IpKod,
  "poradi-mereni": PoradiMereni
};
