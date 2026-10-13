# Elektro §7 – trenažér: postup založení a vývoje

> Stav k 13. 10. 2026. Převzato z pracovního dokumentu v claude.ai; od teď platí tato verze v repu.
> F1 a F2 proběhly v cloudovém Claude Code, F3 a F4 se dokončují v Claude Code Desktop na PC ve větvích s pull requestem.

## Co stavíme

Trenažér na zkoušku **vedoucího elektrotechnika podle § 7 nařízení vlády č. 194/2022 Sb.** v rozsahu do 1 kV AC / 1,5 kV DC. Nařízení je prováděcí předpis k zákonu č. 250/2021 Sb. a § 7 zavádí stupeň „vedoucí elektrotechnik“ (osoba znalá pro řízení činnosti). Ověřeno v konsolidovaném znění k 12. 10. 2026.

Zkouška má písemný test (nejméně 10 otázek z předpisů BOZP a první pomoci) a ústní pohovor. V každé části je potřeba nejméně 80 % správných odpovědí a doklad platí 3 roky (zákon č. 250/2021 Sb. § 19, NV 194/2022 § 9, ověřeno). Hranici 80 % používá i aplikace.

Aplikace prochází látku po kapitolách v pevném pořadí. Každá kapitola má Nauku (krátké karty se schématy), Procvičování s vysvětlením každé možnosti a Test kapitoly. Na konci přibude Zkouška nanečisto, sestavená po kapitolách.

Každá otázka se opírá o fakt ze souboru `src/data/fakta.ts` (předpis, paragraf, stav ověření). Fakta z norem ČSN, která nebyla ověřena v primárním zdroji, mají stav „overit“ a aplikace je u otázky označí.

| # | Kapitola | Hlavní předpisy | Fáze |
| --- | --- | --- | --- |
| 1 | Legislativa a odborná způsobilost | zákon 250/2021, NV 194/2022 | F1 |
| 2 | Vyhrazená elektrická zařízení a revize | NV 190/2022 | F1 |
| 3 | Organizace práce a odpovědnosti | NV 190/2022, NV 194/2022 | F2 |
| 4 | Bezpečná práce na elektrických zařízeních | ČSN EN 50110-1 | F2 |
| 5 | Účinky proudu a první pomoc | doporučení ERC 2025 | F2 |
| 6 | Ochrana před úrazem elektrickým proudem | ČSN 33 2000-4-41 ed. 3 | F3 |
| 7 | Sítě, uzemnění a značení vodičů | ČSN 33 2000-1, ČSN 33 0165, ČSN 33 0166 | F3 |
| 8 | Vnější vlivy, krytí a zvláštní prostory | ČSN 33 2000-5-51, ČSN 33 2000-7-701, ČSN EN 60529 | F3 |
| 9 | Revize a měření v praxi | NV 190/2022 přílohy 1 a 2, ČSN 33 2000-6 | F3 |

Fáze: **F1** kostra, validátor dat, kapitoly 1–2 a tři ilustrace. **F2** kapitoly 3–5, čtyři ilustrace a Test kapitoly. **F3** kapitoly 6–9, pět ilustrací a otázky na seřazení. **F4** Zkouška nanečisto, opakování chyb, přehled pokroku a offline PWA.

Repo `r4d3k2/elektro-paragraf7`, Vercel nasazuje produkci z `main`, pull requesty mají preview URL. Model Opus ve všech fázích.

## Fáze 1 a 2 v cloudu (hotovo)

**Jednorázová příprava**

1. Repo na GitHubu s README (Public).
2. Aplikace Claude na GitHubu má k repu přístup (Settings → Applications → Claude → Configure → Repository access).
3. claude.ai/code → repo, větev `main`, prostředí Default (síť Trusted pustí npm i Google Fonts), režim Accept edits, model Opus.

**Fáze 1:** prompt `elektro-paragraf7-prompt-F1.md` vložený celý jako jedna zpráva. ČÁST A uložila podklady (`docs/elektro-par7-spec.md`, `CLAUDE.md`, `src/data/kapitoly.ts`, `src/data/fakta.ts`), ČÁST B postavila kostru, validátor a kapitoly 1–2. Pak Create PR → Merge → Delete branch a import projektu na Vercel.

**Fáze 2:** nové sezení, krátký prompt (specifikace a `CLAUDE.md` už byly v repu), Create PR → test preview → Merge.

Cena: F1 + F2 spotřebovaly asi 31 USD z promo kreditu pro cloudová sezení (praxe). Kredit platí do 4. 11. 2026 a lokálně použít nejde (ověřeno).

## Dokončení na PC (F3 a F4)

F3 a F4 běží v Claude Code Desktop na PC s modelem Opus z předplatného. Repo, specifikace, `CLAUDE.md` a Vercel zůstávají stejné. Fáze běží postupně: F4 začíná až po sloučení F3.

| Krok | Cloud (F1–F2) | PC (F3–F4) |
| --- | --- | --- |
| Kde běží | virtuální stroj Anthropic | PC, složka `C:\Users\Radek\Projekty\elektro-paragraf7` |
| Větev | sezení si ji založí samo | Desktop zakládá pro nové sezení vlastní worktree a větev (ověřeno), prompt ji pojmenuje |
| Push | přes proxy Anthropic | Git na PC (přihlášení ke GitHubu, praxe) |
| Pull request | Create PR v claude.ai/code | na GitHubu přes Compare & pull request |
| Kontrola před pushem | build | build a Preview v Desktop |
| Čerpá | promo kredit | limity předplatného (pětihodinové okno, týden) |

**Jednorázová příprava na PC**

```powershell
node -v
cd $HOME\Projekty
git clone https://github.com/r4d3k2/elektro-paragraf7.git
cd elektro-paragraf7
npm install
npm run build
```

- `node -v` má ukázat verzi 20 nebo vyšší (cloud používal 22). Přesná minimální verze pro použitý Vite neověřena; když build hlásí verzi Node, nainstaluj aktuální LTS.
- `npm run build` musí projít a validátor vypíše tabulku kapitol 1–5.
- Claude Code Desktop → Code → Local → Select folder → `C:\Users\Radek\Projekty\elektro-paragraf7`. Model Opus.

**Cyklus jedné fáze na PC**

1. V Desktop nové sezení ve složce projektu, vložit prompt fáze.
2. Claude Code pracuje ve své větvi, průběžně lze sledovat Preview.
3. Na konci pushne větev na GitHub (při prvním pushi z PC se může otevřít přihlášení ke GitHubu).
4. GitHub → žlutý pruh s názvem větve → **Compare & pull request** → **Create pull request**.
5. Komentář Vercelu s preview → test na iPhonu.
6. Opravy do stejného sezení; pull request i preview se aktualizují.
7. **Merge pull request** → **Delete branch**.
8. Na PC ve složce projektu `git switch main` a `git pull`.

**Prompt F3 na PC**

```
Work on a dedicated branch named f3-kapitoly-6-9 based on the current origin/main (run git fetch origin first). If this session already runs in its own git worktree created by the desktop app, keep using it and rename its branch to f3-kapitoly-6-9; otherwise create the branch in the current folder. Do not create any other branches or worktrees. Never commit to main, never push to main and never merge into main. When done, push the branch with git push -u origin f3-kapitoly-6-9. I will open the pull request and merge it myself.

Model: Opus.

Přečti CLAUDE.md a docs/elektro-par7-spec.md. Implementuj FÁZI 3 přesně podle sekce „Fáze 3“ ve specifikaci. Nic z Fáze 4.

Nejdřív samostatný commit „F3: přechod na lokální vývoj“:
- V CLAUDE.md uprav oddíl Workflow: od Fáze 3 probíhá vývoj lokálně v Claude Code Desktop na PC, každá fáze ve vlastní větvi, pull request a merge dělá Radovan na GitHubu po testu preview na Vercelu. npm run dev nespouštěj sám, náhled spravuje Preview v Desktop. Ostatní pravidla zůstávají.
- Zkontroluj, že .gitignore obsahuje .claude/worktrees/.
- Chybí-li node_modules, spusť npm install.

Pravidla:
- Nauku i otázky tvoř výhradně z faktů v src/data/fakta.ts. Text ani stav faktů neměň. Když potřebný fakt chybí, otázku nevytvářej a uveď ho ve shrnutí jako „chybějící fakt“.
- Hodnoty, které mají ve faktech stav „overit“, zobraz v ilustracích s poznámkou „ověřit v normě“.
- Na konci spusť npm run build (prebuild = validátor) a oprav všechny chyby.
- Commity česky s předponou „F3:“. Neprohledávej přihlašovací údaje; když push selže, vypiš přesnou chybu a skonči.

Shrnutí na konec: co je hotové, počty karet a otázek po kapitolách, otázky opřené o fakta „overit“, chybějící fakta, co mám otestovat na iPhonu, název pushnuté větve.
```

**Prompt F4 na PC** (až po sloučení F3)

```
Work on a dedicated branch named f4-zkouska-pwa based on the current origin/main (run git fetch origin first). If this session already runs in its own git worktree created by the desktop app, keep using it and rename its branch to f4-zkouska-pwa; otherwise create the branch in the current folder. Do not create any other branches or worktrees. Never commit to main, never push to main and never merge into main. When done, push the branch with git push -u origin f4-zkouska-pwa. I will open the pull request and merge it myself.

Model: Opus.

Přečti CLAUDE.md a docs/elektro-par7-spec.md. Nejdřív ověř, že origin/main obsahuje Fázi 3 (AKTUALNI_FAZE = 3); pokud ne, skonči a napiš mi. Pak implementuj FÁZI 4 přesně podle sekce „Fáze 4“ ve specifikaci.

Pravidla:
- Jediná nová závislost smí být vite-plugin-pwa (a případně nástroj pro vygenerování ikon jako devDependency). Žádné další knihovny.
- Uložená data uživatele se nesmí ztratit: změna tvaru dat jen s migrační funkcí.
- Chybí-li node_modules, spusť npm install.
- Na konci spusť npm run build (prebuild = validátor) a oprav všechny chyby. Aktualizuj CLAUDE.md (stav projektu) a README.
- Commity česky s předponou „F4:“. Neprohledávej přihlašovací údaje; když push selže, vypiš přesnou chybu a skonči.

Shrnutí na konec: co je hotové, jak ověřit offline režim na iPhonu, známá omezení, název pushnuté větve.
```

## Ověřování obsahu

V `src/data/fakta.ts` je 144 faktů, z toho 113 ověřených a 31 k ověření. Otázka bez platného faktu neprojde buildem.

| Kapitola | Ověřeno | Ověřit |
| --- | --- | --- |
| 1 Legislativa a odborná způsobilost | 30 | 0 |
| 2 Vyhrazená elektrická zařízení a revize | 30 | 0 |
| 3 Organizace práce a odpovědnosti | 14 | 1 |
| 4 Bezpečná práce | 10 | 4 |
| 5 Účinky proudu a první pomoc | 4 | 7 |
| 6 Ochrana před úrazem | 6 | 6 |
| 7 Sítě a vodiče | 7 | 5 |
| 8 Vnější vlivy a prostory | 4 | 5 |
| 9 Revize a měření | 8 | 3 |

Kapitoly 1–3 a většina kapitoly 9 vycházejí z konsolidovaného znění zákona č. 250/2021 Sb. a nařízení vlády č. 190/2022 a 194/2022 Sb. k 12. 10. 2026. Text norem ČSN nebyl k dispozici: část údajů je ověřená ve výukových materiálech nebo u výrobců (uvedeno v poli zdroj), zbytek má stav „overit“.

**Jak fakt ověřit nebo opravit**

1. Najít údaj v normě nebo ve školicích materiálech.
2. Na GitHubu v `src/data/fakta.ts` změnit `"overit"` na `"overeno"`, případně opravit text a zdroj (webový editor, commit do `main`).
3. Při změně textu faktu nechat Claude Code upravit otázky, které na něj odkazují (karty i otázky mají seznam `fakta`).

Před zkouškou ověřit, zda se od 12. 10. 2026 nezměnily předpisy z `ZDROJE_ZNENI`.

## Časté problémy

| Problém | Příčina | Řešení |
| --- | --- | --- |
| Vercel build spadne | Validátor našel chybu v datech | Přesnou hlášku z logu Vercelu poslat Claude Code: „Validátor hlásí: … Oprav data, validátor neměň.“ |
| „denied by the Claude Code auto mode classifier … Credential Exploration“ | Claude Code zkoumá, proč nejde push (praxe) | Výjimku nepovolovat; pokyn neprohledávat přihlašovací údaje a vypsat přesnou chybu git push |
| Pull request má konflikt s `main` | Dvě sezení měnila stejné soubory, nebo sezení začalo před sloučením předchozí fáze | Navazující fáze postupně; do sezení „Rebase na aktuální main a vyřeš konflikty.“ |
| Preview na Vercelu chce přihlášení | Ochrana preview nasazení (neověřeno) | Přihlásit se v Safari stejným účtem Vercel |
| Došel limit používání | Pětihodinové nebo týdenní okno předplatného | Počkat a pokračovat ve stejném sezení |

## Kontrolní seznam

- [x] Repo založené s README, aplikace Claude na GitHubu k němu má přístup
- [x] F1 v cloudu, pull request sloučený
- [x] Projekt naimportovaný na Vercelu, aplikace na ploše iPhonu
- [x] F2 v cloudu, pull request sloučený
- [ ] Projekt naklonovaný na PC, `npm run build` prošel
- [ ] F3 sloučená po testu preview
- [ ] F4 sloučená, offline režim vyzkoušený v režimu letadlo
- [ ] Fakta „overit“ porovnaná s normami
- [ ] Před zkouškou zkontrolované změny předpisů od 12. 10. 2026

## Zdroje

- [Zákon č. 250/2021 Sb., konsolidované znění](https://www.praceamzda.cz/predpisy/250-2021-sb)
- [Nařízení vlády č. 194/2022 Sb., konsolidované znění](https://www.praceamzda.cz/predpisy/194-2022-sb)
- [Nařízení vlády č. 190/2022 Sb., konsolidované znění](https://www.praceamzda.cz/predpisy/190-2022-sb)
- [Claude Code: cloudová sezení](https://code.claude.com/docs/en/claude-code-on-the-web.md)
- [Claude Code: worktrees (Desktop zakládá worktree pro každé sezení)](https://code.claude.com/docs/en/worktrees)
- [Promo kredit pro cloudová sezení](https://support.claude.com/en/articles/17152539-cloud-sessions-bonus-credit-promotion)
