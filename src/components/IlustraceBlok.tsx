// Rámeček pro interaktivní ilustraci na kartě nauky.
import type { IlustraceId } from "../data/typy";
import { REGISTR_ILUSTRACI } from "../ilustrace/registr";

export function IlustraceBlok({ id }: { id: IlustraceId }) {
  const Ilustrace = REGISTR_ILUSTRACI[id];
  if (!Ilustrace) return null;
  return (
    <figure className="rounded-xl border border-hrana bg-plocha p-3 sm:p-4">
      <Ilustrace />
    </figure>
  );
}
