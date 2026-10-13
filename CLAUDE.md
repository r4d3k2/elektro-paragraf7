# CLAUDE.md – Elektro §7 trenažér

## O projektu
Osobní webová aplikace (PWA pro iPhone i PC) na přípravu ke zkoušce **vedoucího elektrotechnika podle § 7 NV č. 194/2022 Sb.** v rozsahu do 1 kV AC / 1,5 kV DC. Učení testováním: každá možnost, správná i špatná, má vysvětlení s odkazem na předpis. Devět kapitol v pevném pořadí, žádné náhodné skákání mezi tématy. Uživatel je jeden (Radovan), vše česky.

Zdroj pravdy pro funkce, data a fáze: `docs/elektro-par7-spec.md`.

## Workflow
- Od Fáze 3 probíhá vývoj lokálně v Claude Code Desktop na PC (Fáze 1 a 2 proběhly v cloudovém Claude Code). Každá fáze má vlastní větev; sezení v ní pracuje, nezakládá další větve ani worktree, nikdy necommituje, nepushuje ani neslučuje do `main` a na konci větev pushne. Pull request i merge dělá Radovan na GitHubu po testu preview na Vercelu. Vercel nasazuje produkci z `main`, pull requesty mají preview URL.
- Každá fáze končí zastavením a shrnutím (co je hotové, počty, otázky opřené o fakta „overit“, chybějící fakta, co otestovat na iPhonu, název pushnuté větve).
- Commity česky: `F3: …`, `obsah: …`, `oprava: …`.
- Před každým commitem `npm run build` (prebuild spouští validátor obsahu). Build musí projít.
- Neprohledávej přihlašovací údaje ani tokeny. Když selže `git push`, vypiš přesnou chybu.
- `npm run dev` sám nespouštěj; náhled spravuje Preview v Claude Code Desktop. Kontrolou je build, validátor a typy.

## Tech stack
React + TypeScript (strict) + Vite + Tailwind CSS v4 (`@tailwindcss/vite`), skripty přes `tsx`. Žádné další knihovny; jedinou výjimkou je ve Fázi 4 `vite-plugin-pwa`. Perzistence přes `src/lib/storage.ts` (localStorage v try/catch, klíč `elektro7:v1`, pole `verze` = 2, migrační funkce `migrate`). Ikony jako inline SVG v `src/components/Icon.tsx`.

## Klíčové soubory
- `src/data/fakta.ts` – báze faktů, jediný zdroj odborných tvrzení
- `src/data/kapitoly.ts` – 9 kapitol, pořadí a fáze
- `src/data/faze.ts` – `AKTUALNI_FAZE` (zvyšuje se na začátku každé fáze)
- `src/data/obsah/<kapitola>.ts` – podtémata, karty nauky a otázky
- `scripts/validate-content.ts` – validátor obsahu (prebuild)
- `src/ilustrace/` – interaktivní SVG ilustrace a jejich registr
- `vite.config.ts` – PWA (`vite-plugin-pwa`): manifest, precache, runtime cache Google Fonts

## Pravidla obsahu
- Každá karta nauky i otázka odkazuje na fakta (`fakta: string[]`). Odborná tvrzení nevymýšlej. Chybějící fakt uveď ve shrnutí fáze.
- Text a stav faktů měň jen na výslovný pokyn Radovana.
- Otázky opřené o fakt se stavem „overit“ mají v UI odznak „Ověřit v normě“ a ve Zkoušce nanečisto se standardně nepoužijí.
- Normy ČSN jen vlastními slovy, nikdy doslovně.
- Vysvětlení je u každé možnosti, u špatné vždy i to, co platí místo toho.

## Co nedělat
- Neslučovat do `main`, nezakládat další větve, nepoužívat worktree.
- Nepřidávat knihovny, backend, přihlašování, analytiku ani sledování.
- Neměnit tvar uložených dat bez migrace; data uživatele se nesmí ztratit.
- Neupravovat validátor tak, aby propustil chybná data. Opravit data.
- Nepoužívat emoji v rozhraní.

## Stav projektu
- Fáze 1: hotovo (2026-10-12). Kostra, validátor (prebuild), obsah k1 (10 karet, 24 otázek) a k2 (10 karet, 29 otázek), obrazovky Domů / Kapitola / Nauka / Procvičování / O aplikaci, ilustrace `zebricek-zpusobilosti`, `lhuty-revizi`, `kod-opravneni`.
- Fáze 2: hotovo (2026-10-13). `AKTUALNI_FAZE = 2`, obsah k3 (8 karet, 18 otázek), k4 (9 karet, 18 otázek) a k5 (6 karet, 12 otázek), ilustrace `rezimy-prace`, `pet-pravidel`, `zony-prace`, `kpr-metronom`, Test kapitoly (`#/k/:id/test`) pro všechny aktivní kapitoly, třetí hvězdička podmíněná testem.
- Fáze 3: hotovo (2026-10-13, lokálně v Claude Code Desktop, větev `f3-kapitoly-6-9`). `AKTUALNI_FAZE = 3`, obsah k6 (7 karet, 18 otázek), k7 (7 karet, 17 otázek), k8 (6 karet, 14 otázek) a k9 (7 karet, 17 otázek), typ otázky `poradi` v Procvičování, Testu kapitoly i rozboru (otázky k4-q19 pět pravidel a k9-q08 pořadí zkoušek a měření), ilustrace `site-tn-tt-it`, `proudovy-chranic`, `barvy-vodicu`, `ip-kod`, `poradi-mereni`.
- Fáze 4: hotovo (2026-10-13, lokálně v Claude Code Desktop, větev `f4-zkouska-pwa`). `AKTUALNI_FAZE = 4`, Zkouška nanečisto (`#/zkouska`), Opakování chyb (`#/chyby`, `#/chyby/procvic?kapitola=…`), Přehled (`#/prehled`), offline PWA přes `vite-plugin-pwa` 2.0 (režim „prompt“, výzva „Je k dispozici nová verze – načíst“), ikony 192/512/maskovatelná 512 a apple-touch-icon 180, záloha a obnova pokroku (JSON) v O aplikaci, dlaždice Zkouška / Chyby / Přehled na Domů, přeskočení na obsah a přesun fokusu na `<main>` po změně stránky, štítek „offline“ v liště.
- Poznámky k Fázi 4: tvar uložených dat je `verze: 2` (přibylo pole `zkousky`: kdy, skore, celkem, neoverene, kapitoly), převod z verze 1 dělá `migrate` v `src/lib/storage.ts`; klíč úložiště zůstal `elektro7:v1`. Data novější verze aplikace se nepřepisují (`lzeUlozit`). Záloha je obálka `{ aplikace: "elektro7-zaloha", vytvoreno, verzeAplikace, data }`, import (`prectiZalohu`) přijme i holá data verze 1 a 2 a novější odmítne; obnova nahradí pokrok, vzhled zůstane podle zařízení. Výběr otázek zkoušky je v `src/lib/zkouska.ts` (`rozdelPomerne` = metoda největších zbytků s minimem 1 na kapitolu, řazení podle `uspesnost` z `progress.ts`, nezodpovězená otázka = 0,5); rozpracovaná zkouška je v localStorage pod `elektro7:zkouska` (přežije zavření aplikace), dokončená se zapíše přes `pokrok.dokonciZkousku` včetně statistiky otázek. Společné části testu a zkoušky (běh bez zpětné vazby s přehledem otázek, výsledek, rozbor) jsou v `src/components/TestCasti.tsx`. Odvozené pohledy (chyby po kapitolách, nejslabší podtémata, poslední výsledky) jsou v `src/lib/prehled.ts`, otázky napříč kapitolami v `src/lib/obsah.ts` (`najdiOtazku`, `popisOtazky`, `odkazNaukyOtazky`). Ikony PWA generuje `npm run ikony` (`scripts/generate-icons.mjs`, bez knihoven; `.mjs`, aby ho nekontroloval `tsc`). Ve vývojovém serveru je service worker vypnutý; offline se ověřuje přes `npm run build` a `npm run preview` (místní `.claude/launch.json` mimo repo má konfiguraci `elektro7-preview` na portu 4173).
- Poznámky k Fázi 3: Procvičování, Test kapitoly i Zkouška nanečisto berou oba typy otázek (`otazkyProTest` v `src/lib/test.ts`, `kandidatiZkousky` v `src/lib/zkouska.ts`). Odpověď je typu `Odpoved` (id možnosti, nebo pole id položek v pořadí) a vyhodnocuje ji `jeSpravnaOdpoved` v `src/lib/odpovedi.ts`; do pokroku se zapisuje jen ok/chyba, tvar uložených dat se nezměnil. Výchozí zamíchané pořadí položek drží `poradiPolozek` v `src/lib/shuffle.ts` (stabilní v relaci, nikdy rovnou správné). Ilustrace u otázky se ukáže až po vyhodnocení (`ZaverOtazky`). Test kapitoly zapisuje výsledek do `testy` a odpovědi i do statistiky otázek (`pokrok.dokonciTest`); rozpracovaný test drží `sessionStorage` (`elektro7:test:<kapitola>`), u otázky `poradi` se každý přesun hned uloží jako odpověď. `OtazkaView` s `odpovedPredem` zobrazí vyhodnocenou otázku (rozbor testu). Validátor vypisuje i počet otázek na seřazení. Pomocné soubory mimo strukturu ze specifikace: `src/lib/obsah.ts`, `src/lib/vzhled.ts`, `src/lib/format.ts`, `src/lib/test.ts`, `src/lib/odpovedi.ts`, `src/components/styly.ts`, `src/components/IlustraceBlok.tsx`, `src/components/OtazkaCasti.tsx`, `src/components/PoradiView.tsx`, `src/ilustrace/ovladani.tsx`, `src/data/obsah/md.ts`. Barvy v SVG ilustracích se zadávají třídami (`fill-…`, `stroke-…`, pro vodiče `stroke-vodic-hneda` apod.), ne `var()` v atributech. Ve `vite.config.ts` je `chunkSizeWarningLimit: 1000` (obsah je záměrně v jednom balíku).
- Na konci každé fáze tento oddíl aktualizuj.
