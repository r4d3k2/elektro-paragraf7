// Panel s textem faktu, zdrojem, poznámkou a stavem. Otevírá se z čipu zdroje kdekoli v aplikaci.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { KAPITOLY } from "../data/kapitoly";
import { najdiFakt } from "../lib/fakta";
import { Icon } from "./Icon";
import { tlacitkoSekundarni } from "./styly";

const OtevriFakt = createContext<(id: string) => void>(() => {});

export function useOtevriFakt(): (id: string) => void {
  return useContext(OtevriFakt);
}

export function FaktPanelProvider({ children }: { children: ReactNode }) {
  const [idFaktu, setIdFaktu] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const otevri = useCallback((id: string) => setIdFaktu(id), []);
  const zavri = useCallback(() => setIdFaktu(null), []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (idFaktu && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!idFaktu && d.open) d.close();
    if (!idFaktu) document.documentElement.style.overflow = "";
  }, [idFaktu]);

  const fakt = idFaktu ? najdiFakt(idFaktu) : undefined;
  const kapitola = fakt ? KAPITOLY.find((k) => k.id === fakt.kapitola) : undefined;
  const overit = fakt?.stav === "overit";

  return (
    <OtevriFakt.Provider value={otevri}>
      {children}
      <dialog
        ref={dialog}
        onClose={zavri}
        onClick={(e) => {
          if (e.target === dialog.current) zavri();
        }}
        aria-labelledby="fakt-nadpis"
        className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-2xl border border-hrana bg-plocha p-0 text-text shadow-xl sm:inset-0 sm:m-auto sm:h-fit sm:max-w-[560px] sm:rounded-2xl"
      >
        {idFaktu && (
          <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 id="fakt-nadpis" className="font-mono text-lg font-semibold">
                  Fakt {idFaktu}
                </h2>
                {kapitola && (
                  <p className="text-sm text-tlumeny">
                    Kapitola {kapitola.cislo} · {kapitola.nazev}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={zavri}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-tlumeny hover:bg-plocha-2 hover:text-text"
                aria-label="Zavřít"
              >
                <Icon nazev="spatne" size={22} />
              </button>
            </div>

            {fakt ? (
              <>
                <p
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-sm font-semibold ${
                    overit ? "border-overit/50 bg-overit/5 text-overit" : "border-spravne/40 bg-spravne/5 text-spravne"
                  }`}
                >
                  <Icon nazev={overit ? "pozor" : "spravne"} size={16} />
                  {overit ? "Ověřit v normě" : "Ověřeno"}
                </p>
                <p className="mt-4 text-base leading-relaxed">{fakt.text}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-tlumeny">Zdroj</dt>
                    <dd className="mt-0.5 font-mono">{fakt.zdroj}</dd>
                  </div>
                  {fakt.pozn && (
                    <div>
                      <dt className="font-semibold text-tlumeny">Poznámka</dt>
                      <dd className="mt-0.5">{fakt.pozn}</dd>
                    </div>
                  )}
                  {overit && (
                    <div className="rounded-lg bg-plocha-2 p-3 text-tlumeny">
                      Běžně uváděný údaj, který je potřeba potvrdit v aktuálním znění normy.
                    </div>
                  )}
                </dl>
              </>
            ) : (
              <p className="mt-4">Fakt s tímto označením v bázi není.</p>
            )}

            <button type="button" onClick={zavri} className={`${tlacitkoSekundarni} mt-5 w-full`}>
              Zavřít
            </button>
          </div>
        )}
      </dialog>
    </OtevriFakt.Provider>
  );
}
