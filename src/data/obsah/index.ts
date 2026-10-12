// Registr obsahu kapitol. Obsah smí mít jen aktivní kapitoly (kapitola.faze <= AKTUALNI_FAZE);
// kontroluje to validátor obsahu (scripts/validate-content.ts).
import type { KapitolaId } from "../kapitoly";
import type { ObsahKapitoly } from "../typy";

export const OBSAH: Partial<Record<KapitolaId, ObsahKapitoly>> = {};
