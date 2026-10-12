// Formátování čísel a délek v češtině.

/** 0,5 roku · 1 rok · 2–4 roky · 5 a více let. */
export function formatRoky(roky: number): string {
  const cislo = String(roky).replace(".", ",");
  if (!Number.isInteger(roky)) return `${cislo} roku`;
  if (roky === 1) return "1 rok";
  if (roky >= 2 && roky <= 4) return `${cislo} roky`;
  return `${cislo} let`;
}
