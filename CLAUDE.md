# CLAUDE.md – Elektro §7 trenažér

## O projektu
Osobní webová aplikace (PWA pro iPhone i PC) na přípravu ke zkoušce **vedoucího elektrotechnika podle § 7 NV č. 194/2022 Sb.** v rozsahu do 1 kV AC / 1,5 kV DC. Učení testováním: každá možnost, správná i špatná, má vysvětlení s odkazem na předpis. Devět kapitol v pevném pořadí, žádné náhodné skákání mezi tématy. Uživatel je jeden (Radovan), vše česky.

Zdroj pravdy pro funkce, data a fáze: `docs/elektro-par7-spec.md`.

## Workflow
- Vývoj běží v cloudovém Claude Code (claude.ai/code). Každé sezení pracuje v jedné své větvi, nezakládá další větve ani worktree a nikdy neslučuje do `main`. Pull request vytváří a slučuje Radovan. Vercel nasazuje produkci z `main`, pull requesty mají preview URL.
- Každá fáze končí zastavením a shrnutím (co je hotové, počty, otázky opřené o fakta „overit“, chybějící fakta, co otestovat na iPhonu).
- Commity česky: `F2: …`, `obsah: …`, `oprava: …`.
- Před každým commitem `npm run build` (prebuild spouští validátor obsahu). Build musí projít.
- Neprohledávej přihlašovací údaje ani tokeny. Když selže `git push`, vypiš přesnou chybu.
- Dev server ani náhled v prohlížeči v cloudu nespouštěj; kontrolou je build, validátor a typy.

## Tech stack
React + TypeScript (strict) + Vite + Tailwind CSS v4 (`@tailwindcss/vite`), skripty přes `tsx`. Žádné další knihovny; jedinou výjimkou je ve Fázi 4 `vite-plugin-pwa`. Perzistence přes `src/lib/storage.ts` (localStorage v try/catch, klíč `elektro7:v1`, migrační funkce). Ikony jako inline SVG v `src/components/Icon.tsx`.

## Klíčové soubory
- `src/data/fakta.ts` – báze faktů, jediný zdroj odborných tvrzení
- `src/data/kapitoly.ts` – 9 kapitol, pořadí a fáze
- `src/data/faze.ts` – `AKTUALNI_FAZE` (zvyšuje se na začátku každé fáze)
- `src/data/obsah/<kapitola>.ts` – podtémata, karty nauky a otázky
- `scripts/validate-content.ts` – validátor obsahu (prebuild)
- `src/ilustrace/` – interaktivní SVG ilustrace a jejich registr

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
- Fáze 1: rozpracováno (na konci každé fáze tento oddíl aktualizuj)
