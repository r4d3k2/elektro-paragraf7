import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __VERZE__: JSON.stringify(pkg.version)
  },
  build: {
    // Obsah všech kapitol je záměrně v jednom balíku (aplikace bude od Fáze 4 fungovat offline),
    // proto je výchozí hranice 500 kB pro varování zbytečně nízká.
    chunkSizeWarningLimit: 1000
  }
});
