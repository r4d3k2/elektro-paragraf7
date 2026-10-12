// Přepínání světlého a tmavého vzhledu. "system" se řídí nastavením zařízení (CSS media query),
// ruční volba se zapíše do atributu data-tema na <html> (viz src/index.css).
import type { Vzhled } from "./storage";

const BARVA_LISTY = { svetly: "#F5F6F8", tmavy: "#0E151C" } as const;

export function pouzijVzhled(vzhled: Vzhled): void {
  const html = document.documentElement;
  if (vzhled === "system") html.removeAttribute("data-tema");
  else html.setAttribute("data-tema", vzhled);

  // Barva lišty prohlížeče (theme-color) musí odpovídat zvolenému vzhledu.
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    const proTmavy = (meta.getAttribute("media") ?? "").includes("dark");
    meta.content = vzhled === "system" ? BARVA_LISTY[proTmavy ? "tmavy" : "svetly"] : BARVA_LISTY[vzhled];
  });
}

export const POPIS_VZHLEDU: Record<Vzhled, string> = {
  system: "Podle systému",
  svetly: "Světlý",
  tmavy: "Tmavý"
};

export function dalsiVzhled(vzhled: Vzhled): Vzhled {
  return vzhled === "system" ? "svetly" : vzhled === "svetly" ? "tmavy" : "system";
}
