import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json" with { type: "json" };

const ROK = 60 * 60 * 24 * 365;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Offline PWA (Fáze 4): precache celé aplikace, runtime cache Google Fonts.
    // registerType "prompt": nová verze se nenačte sama, aplikace nabídne „Je k dispozici nová verze – načíst“
    // (src/components/NovaVerze.tsx). Rozpracovaný test nebo zkouška se tak nepřeruší pod rukou.
    VitePWA({
      registerType: "prompt",
      injectRegister: false,
      // Ikony a favicon z public/ zachytí už globPatterns níže; bez tohoto by byly v precache dvakrát.
      includeManifestIcons: false,
      manifest: {
        name: "Elektro §7 – trenažér",
        short_name: "Elektro §7",
        description: "Trenažér ke zkoušce vedoucího elektrotechnika podle § 7 NV č. 194/2022 Sb. do 1 kV AC / 1,5 kV DC.",
        lang: "cs",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#1F4E79",
        background_color: "#F5F6F8",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "pwa-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
        // Obsah všech kapitol je v jednom balíku; výchozí hranice 2 MiB by se mohla časem přiblížit.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // Hash routing: každá navigace jde na index.html.
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-styly",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 10, maxAgeSeconds: ROK }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-soubory",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 30, maxAgeSeconds: ROK }
            }
          }
        ]
      }
    })
  ],
  define: {
    __VERZE__: JSON.stringify(pkg.version)
  },
  build: {
    // Obsah všech kapitol je záměrně v jednom balíku (aplikace funguje offline),
    // proto je výchozí hranice 500 kB pro varování zbytečně nízká.
    chunkSizeWarningLimit: 1000
  }
});
