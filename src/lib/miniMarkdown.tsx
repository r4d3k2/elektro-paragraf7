// Mini-markdown pro texty karet: odstavce (oddělené prázdným řádkem), **tučně** a odrážky „- “.
// Vykresluje se do React prvků, bez dangerouslySetInnerHTML.
import type { ReactNode } from "react";

export type Blok = { typ: "odstavec"; text: string } | { typ: "seznam"; polozky: string[] };

export function rozeberMarkdown(text: string): Blok[] {
  const bloky: Blok[] = [];
  for (const cast of text.split(/\n[ \t]*\n/)) {
    let odstavec: string[] = [];
    let seznam: string[] = [];
    const uzavriOdstavec = () => {
      if (odstavec.length > 0) bloky.push({ typ: "odstavec", text: odstavec.join(" ") });
      odstavec = [];
    };
    const uzavriSeznam = () => {
      if (seznam.length > 0) bloky.push({ typ: "seznam", polozky: seznam });
      seznam = [];
    };
    for (const surovy of cast.split("\n")) {
      const radek = surovy.trim();
      if (!radek) continue;
      if (radek.startsWith("- ")) {
        uzavriOdstavec();
        seznam.push(radek.slice(2).trim());
      } else {
        uzavriSeznam();
        odstavec.push(radek);
      }
    }
    uzavriOdstavec();
    uzavriSeznam();
  }
  return bloky;
}

/** Řádkové formátování: jen **tučně**. */
export function radkovy(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((cast) => cast.length > 0)
    .map((cast, i) =>
      cast.length > 4 && cast.startsWith("**") && cast.endsWith("**") ? (
        <strong key={i} className="font-semibold">
          {cast.slice(2, -2)}
        </strong>
      ) : (
        cast
      )
    );
}

export function MiniMarkdown({ text, className = "" }: { text: string; className?: string }) {
  const bloky = rozeberMarkdown(text);
  return (
    <div className={`space-y-3 ${className}`}>
      {bloky.map((blok, i) =>
        blok.typ === "odstavec" ? (
          <p key={i}>{radkovy(blok.text)}</p>
        ) : (
          <ul key={i} className="space-y-1.5 pl-1">
            {blok.polozky.map((polozka, j) => (
              <li key={j} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primarni" />
                <span className="min-w-0">{radkovy(polozka)}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
