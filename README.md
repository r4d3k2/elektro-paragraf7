# elektro-paragraf7

**Elektro §7 – trenažér.** Osobní webová aplikace (PWA pro iPhone i PC) na přípravu ke zkoušce z odborné způsobilosti v elektrotechnice v rozsahu **§ 7 nařízení vlády č. 194/2022 Sb. – vedoucí elektrotechnik**, do 1 kV AC / 1,5 kV DC, objekty bez nebezpečí výbuchu. Učení testováním: každá možnost, správná i špatná, má vysvětlení s odkazem na předpis. Látka je v 9 kapitolách v pevném pořadí, rozhraní je česky.

> Studijní pomůcka. Rozhodující je vždy platné znění předpisů a norem.

## Stav

Hotové jsou **Fáze 1–4** podle specifikace:

- všech 9 kapitol: Legislativa a odborná způsobilost; Vyhrazená elektrická zařízení a revize; Organizace práce a odpovědnosti; Bezpečná práce na elektrických zařízeních; Účinky proudu a první pomoc; Ochrana před úrazem elektrickým proudem; Sítě, uzemnění a značení vodičů; Vnější vlivy, krytí a zvláštní prostory; Revize a měření v praxi,
- obrazovky Domů, Kapitola, Nauka, Procvičování, Test kapitoly (10 otázek ze všech podtémat, hranice 80 %, rozbor s vysvětleními) a O aplikaci,
- **Zkouška nanečisto** (`#/zkouska`): 20 otázek ze všech kapitol poměrně k jejich rozsahu (z každé aspoň jedna), seřazené podle kapitol a podtémat; přednost mají otázky, které jdou hůř; standardně bez otázek opřených o fakta „overit“ (lze zapnout); bez nápovědy během zkoušky, hranice 80 %, výsledek po kapitolách, rozbor a historie pokusů,
- **Opakování chyb** (`#/chyby`): chybně zodpovězené otázky po kapitolách a jejich procvičení (všech najednou nebo z jedné kapitoly),
- **Přehled pokroku** (`#/prehled`): zvládnutí po kapitolách, poslední testy a zkoušky, tři nejslabší podtémata s odkazem na procvičení,
- otázky s výběrem odpovědi i otázky na seřazení (položky se přesouvají šipkami, po potvrzení se ukáže správné pořadí s vyznačenými chybami),
- interaktivní ilustrace: žebříček způsobilosti, lhůty revizí, kód oprávnění, pokyny – dohled – dozor, pět pravidel práce bez napětí, pásma kolem živé části, metronom pro resuscitaci, sítě TN/TT/IT s poruchou na kostře, proudový chránič, barvy vodičů, IP kód a pořadí zkoušek a měření,
- **offline režim** (PWA): aplikace se po prvním načtení uloží do zařízení a funguje i bez připojení; nová verze se nenačte sama, aplikace nabídne „Je k dispozici nová verze – načíst“,
- **záloha pokroku** do souboru JSON a obnova ze zálohy (přenos mezi iPhonem a PC), smazání pokroku.

## Na iPhonu

1. V Safari otevřete adresu aplikace a zvolte **Sdílet → Přidat na plochu**.
2. Spusťte aplikaci z plochy s připojením a nechte ji chvíli otevřenou. V O aplikaci se v sekci Offline režim ukáže „Aplikace je uložená v zařízení“. Písmo IBM Plex se uloží při prvním spuštění, kdy už aplikaci řídí service worker; proto aplikaci jednou zavřete a otevřete znovu.
3. Pak funguje i v režimu letadlo. Bez uloženého písma použije systémové.

Pokrok se ukládá jen v prohlížeči daného zařízení. Na jiné zařízení ho přenesete v O aplikaci → **Záloha a přenos na jiné zařízení**: Stáhnout (nebo Sdílet) zálohu a na druhém zařízení Obnovit ze zálohy.

## Příkazy

| Příkaz | Co dělá |
| --- | --- |
| `npm install` | nainstaluje závislosti podle `package-lock.json` |
| `npm run dev` | spustí vývojový server Vite (v Claude Code Desktop ho spravuje Preview); service worker je ve vývoji vypnutý |
| `npm run validate` | zkontroluje obsah (`scripts/validate-content.ts`) a vypíše statistiky |
| `npm run build` | validátor (prebuild), kontrola typů (`tsc -b`) a produkční sestavení do `dist/` včetně service workeru a manifestu |
| `npm run preview` | náhled sestavené verze (s offline režimem) |
| `npm run ikony` | znovu vygeneruje ikony PWA v `public/` z motivu `favicon.svg` (`scripts/generate-icons.mjs`) |

## Jak je projekt postavený

- React + TypeScript (strict) + Vite + Tailwind CSS v4; jedinou další závislostí je `vite-plugin-pwa` (offline režim).
- `src/data/fakta.ts` – báze faktů, jediný zdroj odborných tvrzení. Každá karta nauky i otázka na fakta odkazuje.
- `src/data/obsah/<kapitola>.ts` – podtémata, karty nauky a otázky; `src/data/faze.ts` určuje aktivní kapitoly.
- `scripts/validate-content.ts` – kontroluje id, odkazy na fakta, možnosti, vysvětlení, vyváženost odpovědí a minimální počty. Při chybě build skončí.
- Pokrok se ukládá v prohlížeči (`localStorage`, klíč `elektro7:v1`, uvnitř pole `verze`; data starší verze se při načtení převedou funkcí `migrate`). Bez úložiště aplikace funguje dál, jen si nic nepamatuje. Rozpracovaná zkouška nanečisto má vlastní klíč `elektro7:zkouska`.
- Offline: `vite-plugin-pwa` (režim „prompt“) uloží celou aplikaci do precache, písma Google Fonts do runtime cache (`vite.config.ts`).

## Dokumentace

- Specifikace (zdroj pravdy pro funkce, data a fáze): [`docs/elektro-par7-spec.md`](docs/elektro-par7-spec.md)
- Pokyny pro Claude Code: [`CLAUDE.md`](CLAUDE.md)
