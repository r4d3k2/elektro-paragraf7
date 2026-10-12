// Společné ovládací prvky ilustrací (dotykové cíle nejméně 44 px).
import type { ReactNode } from "react";

interface VolbaProps {
  zvoleno: boolean;
  onClick: () => void;
  children: ReactNode;
  popis?: string;
  mono?: boolean;
}

export function Volba({ zvoleno, onClick, children, popis, mono = false }: VolbaProps) {
  return (
    <button
      type="button"
      aria-pressed={zvoleno}
      aria-label={popis}
      onClick={onClick}
      className={`min-h-11 rounded-lg border-2 px-3 py-1.5 text-left text-sm font-medium transition-colors duration-150 ${
        mono ? "min-w-11 text-center font-mono text-base" : ""
      } ${zvoleno ? "border-primarni bg-primarni/10 text-primarni" : "border-hrana bg-plocha text-text hover:border-primarni/60"}`}
    >
      {children}
    </button>
  );
}

export function Prepinac({ zapnuto, onZmena, children }: { zapnuto: boolean; onZmena: (v: boolean) => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={zapnuto}
      onClick={() => onZmena(!zapnuto)}
      className="flex min-h-11 w-full items-center gap-3 rounded-lg px-1 text-left"
    >
      <span
        aria-hidden="true"
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ${zapnuto ? "bg-primarni" : "bg-hrana"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-plocha shadow transition-[left] duration-150 ${zapnuto ? "left-6" : "left-1"}`}
        />
      </span>
      <span className="text-sm font-medium">{children}</span>
    </button>
  );
}

export function NadpisIlustrace({ nadpis, napoveda }: { nadpis: string; napoveda: string }) {
  return (
    <figcaption className="mb-3">
      <span className="block font-semibold">{nadpis}</span>
      <span className="block text-sm text-tlumeny">{napoveda}</span>
    </figcaption>
  );
}
