// Kořen aplikace: hash routing, vzhled, panel faktů a hlášení o nové verzi (PWA).
import { useEffect, useRef } from "react";
import { FaktPanelProvider } from "./components/FaktPanel";
import { ID_OBSAHU, Layout } from "./components/Layout";
import { NovaVerze } from "./components/NovaVerze";
import { tlacitkoPrimarni } from "./components/styly";
import { najdiKapitolu, obsahKapitoly } from "./lib/obsah";
import { usePokrok } from "./lib/progress";
import { useHashRoute, type Trasa } from "./lib/route";
import { pouzijVzhled } from "./lib/vzhled";
import { Chyby } from "./pages/Chyby";
import { Domu } from "./pages/Domu";
import { Kapitola } from "./pages/Kapitola";
import { Nauka } from "./pages/Nauka";
import { OAplikaci } from "./pages/OAplikaci";
import { Prehled } from "./pages/Prehled";
import { Procvicovani } from "./pages/Procvicovani";
import { TestKapitoly } from "./pages/TestKapitoly";
import { Zkouska } from "./pages/Zkouska";

function Nenalezeno() {
  return (
    <Layout titulek="Stránka nenalezena" zpet={{ href: "#/", popis: "Domů" }}>
      <h1 className="text-2xl font-bold">Stránka nenalezena</h1>
      <p className="mt-2 text-tlumeny">Tato adresa v aplikaci neexistuje nebo ještě není dostupná.</p>
      <a href="#/" className={`${tlacitkoPrimarni} mt-5`}>
        Na úvodní stránku
      </a>
    </Layout>
  );
}

function Stranka({ trasa }: { trasa: Trasa }) {
  const [prvni, id, sekce, parametr] = trasa.cesta;
  if (!prvni) return <Domu />;
  if (prvni === "o-aplikaci" && !id) return <OAplikaci />;
  if (prvni === "zkouska" && !id) return <Zkouska />;
  if (prvni === "prehled" && !id) return <Prehled />;
  if (prvni === "chyby" && (!id || (id === "procvic" && !sekce))) {
    // key: nové procvičování (jiná kapitola) začíná s čistým stavem.
    return <Chyby key={`${id ?? ""}|${trasa.dotaz.get("kapitola") ?? ""}`} procvic={id === "procvic"} dotaz={trasa.dotaz} />;
  }

  if (prvni === "k" && id) {
    const kapitola = najdiKapitolu(id);
    if (!kapitola) return <Nenalezeno />;
    if (!sekce) return <Kapitola kapitola={kapitola} />;
    const obsah = obsahKapitoly(kapitola);
    if (!obsah) return <Kapitola kapitola={kapitola} />;
    if (sekce === "nauka") return <Nauka kapitola={kapitola} obsah={obsah} poradi={parametr} />;
    // key: při přechodu rovnou do jiné kapitoly se stav relace nesmí přenést.
    if (sekce === "procvic" && !parametr)
      return <Procvicovani key={kapitola.id} kapitola={kapitola} obsah={obsah} dotaz={trasa.dotaz} />;
    if (sekce === "test" && !parametr) return <TestKapitoly key={kapitola.id} kapitola={kapitola} obsah={obsah} />;
  }
  return <Nenalezeno />;
}

export default function App() {
  const trasa = useHashRoute();
  const vzhled = usePokrok().nastaveni.vzhled;
  const cesta = trasa.cesta.join("/");
  const prvniVykresleni = useRef(true);

  useEffect(() => {
    pouzijVzhled(vzhled);
  }, [vzhled]);

  // Při přechodu na jinou stránku začít nahoře (změna jen filtru v dotazu stránku neposouvá)
  // a přesunout fokus na obsah, aby čtečka obrazovky i klávesnice začaly na nové stránce.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (prvniVykresleni.current) {
      prvniVykresleni.current = false;
      return;
    }
    document.getElementById(ID_OBSAHU)?.focus({ preventScroll: true });
  }, [cesta]);

  return (
    <FaktPanelProvider>
      <Stranka trasa={trasa} />
      <NovaVerze />
    </FaktPanelProvider>
  );
}
