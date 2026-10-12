// Tři hvězdičky zvládnutí kapitoly.
import { Icon } from "./Icon";

export function Hvezdicky({ pocet, velikost = 16 }: { pocet: 0 | 1 | 2 | 3; velikost?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Hvězdičky: ${pocet} ze 3`}>
      {[1, 2, 3].map((i) => (
        <Icon
          key={i}
          nazev="hvezda"
          size={velikost}
          plna={i <= pocet}
          className={i <= pocet ? "fill-akcent text-overit" : "text-hrana"}
        />
      ))}
    </span>
  );
}
