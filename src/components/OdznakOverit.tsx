// Odznak pro obsah opřený o fakt se stavem „overit“.
import { Icon } from "./Icon";

export function OdznakOverit({ popis }: { popis?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border border-overit/50 bg-overit/5 px-2 py-1 text-sm font-semibold text-overit"
      title={popis ?? "Údaj je potřeba ověřit v aktuálním znění normy."}
    >
      <Icon nazev="pozor" size={16} />
      Ověřit v normě
    </span>
  );
}
