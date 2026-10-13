# elektro-paragraf7

**Elektro §7 – trenažér.** Osobní webová aplikace (PWA pro iPhone i PC) na přípravu ke zkoušce z odborné způsobilosti v elektrotechnice v rozsahu **§ 7 nařízení vlády č. 194/2022 Sb. – vedoucí elektrotechnik**, do 1 kV AC / 1,5 kV DC, objekty bez nebezpečí výbuchu. Učení testováním: každá možnost, správná i špatná, má vysvětlení s odkazem na předpis. Látka je v 9 kapitolách v pevném pořadí, rozhraní je česky.

> Studijní pomůcka. Rozhodující je vždy platné znění předpisů a norem.

## Stav

Hotové jsou **Fáze 1 a 2**:

- kapitoly 1–5: Legislativa a odborná způsobilost; Vyhrazená elektrická zařízení a revize; Organizace práce a odpovědnosti; Bezpečná práce na elektrických zařízeních; Účinky proudu a první pomoc,
- obrazovky Domů, Kapitola, Nauka, Procvičování, Test kapitoly (10 otázek ze všech podtémat, hranice 80 %, rozbor s vysvětleními) a O aplikaci,
- interaktivní ilustrace: žebříček způsobilosti, lhůty revizí, kód oprávnění, pokyny – dohled – dozor, pět pravidel práce bez napětí, pásma kolem živé části a metronom pro resuscitaci.

Kapitoly 6–9, otázky na seřazení, zkouška nanečisto a offline režim přijdou v dalších fázích podle specifikace.

## Příkazy

| Příkaz | Co dělá |
| --- | --- |
| `npm install` | nainstaluje závislosti podle `package-lock.json` |
| `npm run dev` | spustí vývojový server Vite |
| `npm run validate` | zkontroluje obsah (`scripts/validate-content.ts`) a vypíše statistiky |
| `npm run build` | validátor (prebuild), kontrola typů (`tsc -b`) a produkční sestavení do `dist/` |
| `npm run preview` | náhled sestavené verze |

## Jak je projekt postavený

- React + TypeScript (strict) + Vite + Tailwind CSS v4, žádné další knihovny.
- `src/data/fakta.ts` – báze faktů, jediný zdroj odborných tvrzení. Každá karta nauky i otázka na fakta odkazuje.
- `src/data/obsah/<kapitola>.ts` – podtémata, karty nauky a otázky; `src/data/faze.ts` určuje aktivní kapitoly.
- `scripts/validate-content.ts` – kontroluje id, odkazy na fakta, možnosti, vysvětlení, vyváženost odpovědí a minimální počty. Při chybě build skončí.
- Pokrok se ukládá v prohlížeči (`localStorage`, klíč `elektro7:v1`); bez úložiště aplikace funguje dál, jen si nic nepamatuje.

## Dokumentace

- Specifikace (zdroj pravdy pro funkce, data a fáze): [`docs/elektro-par7-spec.md`](docs/elektro-par7-spec.md)
- Pokyny pro Claude Code: [`CLAUDE.md`](CLAUDE.md)
