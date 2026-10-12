// Ukazatel pokroku (zvládnutí, přečtení).
interface Props {
  hodnota: number;
  max: number;
  /** Popis pro čtečky, např. „Zvládnuto 5 z 24 otázek“. */
  popis: string;
  barva?: "primarni" | "spravne";
}

export function Pruh({ hodnota, max, popis, barva = "primarni" }: Props) {
  const podil = max > 0 ? Math.min(1, hodnota / max) : 0;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={hodnota}
      aria-label={popis}
      className="h-2 w-full overflow-hidden rounded-full bg-plocha-2"
    >
      <div
        className={`h-full rounded-full transition-[width] duration-200 ${barva === "spravne" ? "bg-spravne" : "bg-primarni"}`}
        style={{ width: `${podil * 100}%` }}
      />
    </div>
  );
}
