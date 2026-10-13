// Formátování čísel a délek v češtině.

/** 0,5 roku · 1 rok · 2–4 roky · 5 a více let. */
export function formatRoky(roky: number): string {
  const cislo = String(roky).replace(".", ",");
  if (!Number.isInteger(roky)) return `${cislo} roku`;
  if (roky === 1) return "1 rok";
  if (roky >= 2 && roky <= 4) return `${cislo} roky`;
  return `${cislo} let`;
}

/** Zaokrouhlené procento (0, když není z čeho počítat). */
export function procenta(skore: number, celkem: number): number {
  return celkem > 0 ? Math.round((skore / celkem) * 100) : 0;
}

/** Datum z ISO řetězce: „13. 10. 2026“. */
export function formatDatum(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

/** Český tvar podle počtu: 1 otázka, 2–4 otázky, 0 a 5+ otázek. */
export function tvar(n: number, jeden: string, dvaAzCtyri: string, pet: string): string {
  if (n === 1) return jeden;
  if (n >= 2 && n <= 4) return dvaAzCtyri;
  return pet;
}
