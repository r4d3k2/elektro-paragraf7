// Čip se zdrojem (id faktu). Klepnutí otevře panel s textem faktu.
import { najdiFakt } from "../lib/fakta";
import { useOtevriFakt } from "./FaktPanel";
import { Icon } from "./Icon";
import { nadpisSekce } from "./styly";

export function FaktChip({ id }: { id: string }) {
  const otevri = useOtevriFakt();
  const overit = najdiFakt(id)?.stav === "overit";
  return (
    <button
      type="button"
      onClick={() => otevri(id)}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 font-mono text-sm transition-colors duration-150 ${
        overit
          ? "border-overit/50 text-overit hover:bg-overit/10"
          : "border-hrana text-text hover:border-primarni hover:text-primarni"
      }`}
      aria-label={`Zdroj ${id}${overit ? ", ověřit v normě" : ""}. Zobrazit fakt.`}
    >
      <Icon nazev={overit ? "pozor" : "zdroj"} size={15} />
      {id}
    </button>
  );
}

export function Zdroje({ fakta, nadpis = "Zdroje" }: { fakta: readonly string[]; nadpis?: string }) {
  return (
    <div>
      <h3 className={nadpisSekce}>{nadpis}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {fakta.map((id) => (
          <FaktChip key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
