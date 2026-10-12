// Sdílené třídy Tailwindu pro tlačítka a plochy. Dotykové cíle mají nejméně 44 px (min-h-11).

export const tlacitko =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-colors duration-150 disabled:opacity-50";

export const tlacitkoPrimarni = `${tlacitko} bg-primarni text-na-primarni hover:bg-primarni/90 active:bg-primarni/80`;

export const tlacitkoSekundarni = `${tlacitko} border border-hrana bg-plocha text-text hover:border-primarni active:bg-plocha-2`;

export const tlacitkoTiche = `${tlacitko} text-primarni hover:bg-primarni/10 active:bg-primarni/15`;

export const plocha = "rounded-xl border border-hrana bg-plocha";

export const nadpisSekce = "text-xs font-semibold uppercase tracking-wider text-tlumeny";
