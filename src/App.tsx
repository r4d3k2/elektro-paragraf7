// Kořen aplikace: hash routing, vzhled a panel faktů.
import { useEffect } from "react";
import { FaktPanelProvider } from "./components/FaktPanel";
import { Layout } from "./components/Layout";
import { tlacitkoPrimarni } from "./components/styly";
import { najdiKapitolu, obsahKapitoly } from "./lib/obsah";
import { usePokrok } from "./lib/progress";
import { useHashRoute, type Trasa } from "./lib/route";
import { pouzijVzhled } from "./lib/vzhled";
import { Domu } from "./pages/Domu";
import { Kapitola } from "./pages/Kapitola";
import { Nauka } from "./pages/Nauka";
import { OAplikaci } from "./pages/OAplikaci";
import { Procvicovani } from "./pages/Procvicovani";

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

  if (prvni === "k" && id) {
    const kapitola = najdiKapitolu(id);
    if (!kapitola) return <Nenalezeno />;
    if (!sekce) return <Kapitola kapitola={kapitola} />;
    const obsah = obsahKapitoly(kapitola);
    if (!obsah) return <Kapitola kapitola={kapitola} />;
    if (sekce === "nauka") return <Nauka kapitola={kapitola} obsah={obsah} poradi={parametr} />;
    if (sekce === "procvic" && !parametr) return <Procvicovani kapitola={kapitola} obsah={obsah} dotaz={trasa.dotaz} />;
  }
  return <Nenalezeno />;
}

export default function App() {
  const trasa = useHashRoute();
  const vzhled = usePokrok().nastaveni.vzhled;
  const cesta = trasa.cesta.join("/");

  useEffect(() => {
    pouzijVzhled(vzhled);
  }, [vzhled]);

  // Při přechodu na jinou stránku začít nahoře (změna jen filtru v dotazu stránku neposouvá).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [cesta]);

  return (
    <FaktPanelProvider>
      <Stranka trasa={trasa} />
    </FaktPanelProvider>
  );
}
