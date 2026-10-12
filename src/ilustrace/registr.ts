// Registr interaktivních ilustrací. Ilustrace, které ještě nejsou hotové (pozdější fáze),
// v registru chybějí a na kartě se nezobrazí.
import type { ComponentType } from "react";
import type { IlustraceId } from "../data/typy";

export const REGISTR_ILUSTRACI: Partial<Record<IlustraceId, ComponentType>> = {};
