# Elektro §7 – trenažér · specifikace

> **Verze:** 1.1 · **Datum:** 2026-10-13 · **Repo:** `r4d3k2/elektro-paragraf7`
> Zdroj pravdy pro funkce, datový model a fáze. Změny navrhuje Claude v chatu, verze se zvyšuje v hlavičce a v changelogu.

## 1. O projektu

Osobní vzdělávací webová aplikace (PWA pro iPhone i PC) na přípravu ke zkoušce z odborné způsobilosti v elektrotechnice v rozsahu **§ 7 nařízení vlády č. 194/2022 Sb. – vedoucí elektrotechnik**, napětí **do 1 kV AC / 1,5 kV DC**, objekty bez nebezpečí výbuchu. Uživatel je jeden (Radovan), veškeré rozhraní je česky.

Cíl: učit se testováním. Každá odpověď, správná i špatná, má vysvětlení s odkazem na předpis. Látka je rozdělená do 9 kapitol v pevném pořadí; uživatel prochází kapitolu po kapitole, nikoli náhodný mix.

Nejde o marketingový web. Žádný backend, přihlášení, analytika ani reklama. Od Fáze 4 funguje offline.

## 2. Zásady obsahu (závazné)

1. Jediným zdrojem odborných tvrzení je `src/data/fakta.ts`. Každá karta nauky i otázka odkazuje na alespoň jeden fakt (`fakta: string[]`). Fakt může být i z jiné kapitoly.
2. Odborné tvrzení bez faktu nevymýšlej. Když fakt chybí, obsah nevytvářej a uveď ho ve shrnutí fáze jako „chybějící fakt“ s návrhem textu a zdroje.
3. Text a `stav` faktů mění jen Radovan, nebo Claude Code na jeho výslovný pokyn.
4. Fakta se stavem `"overit"` použít lze. Karta i otázka, která se o ně opírá, ale v UI nese odznak „Ověřit v normě“ a ve Zkoušce nanečisto se standardně nepoužije.
5. Normy ČSN nikdy nepřepisuj doslovně, piš vlastními slovy. U právních předpisů stačí parafráze s paragrafem.
6. Jazyk: spisovná čeština, krátké věty. Termíny tak, jak je používají předpisy: osoba poučená, elektrotechnik, vedoucí elektrotechnik, revizní technik, vyhrazené elektrické zařízení, provozovatel, pověřená organizace. Zkratky (VTZ, NN, VN, PE, PEN, RCD, LPS, BOZP) při prvním výskytu v kapitole rozepiš.
7. Na obrazovce „O aplikaci“ je upozornění: aplikace je studijní pomůcka, rozhodující je platné znění předpisů a norem; stav faktů k datu `FAKTA_OVERENO_K`; seznam `ZDROJE_ZNENI`.

## 3. Pravidla pro otázky a nauku

**Otázka typu `vyber`**
- 4 možnosti (výjimečně 3), právě jedna správná.
- Distraktory jsou věrohodné: typické omyly, záměny čísel (2 / 3 / 4 roky), záměny pojmů (dohled × dozor, oprávnění × osvědčení, osoba odpovědná za elektrické zařízení × vedoucí práce), pravidla ze zrušené vyhlášky č. 50/1978 Sb. Žádné „všechny uvedené“, „žádná z uvedených“ ani vtipné možnosti.
- Možnosti mají podobnou délku a stejný gramatický tvar; správná nesmí být nápadně nejdelší ani nejpřesnější.
- Zápor v zadání jen výjimečně a vždy velkými písmeny (NENÍ, NESMÍ).
- `vysvetleni` u každé možnosti, 1–3 věty. U správné: proč platí, s odkazem na paragraf. U špatné: v čem je chyba a co platí místo toho.
- `shrnuti`: jedna věta k zapamatování.
- `obtiznost`: 1 = pojem nebo číslo, 2 = pochopení souvislosti, 3 = situace z praxe z pohledu vedoucího elektrotechnika („Řídíte práci na rozvaděči a …“). V každé kapitole je aspoň 25 % otázek obtížnosti 3.
- Jedna otázka = jeden pojem. Stejnou věc se neptej dvakrát jinými slovy.
- Otázky jsou v datech seřazené podle podtémat ve stejném pořadí jako karty nauky.

**Otázka typu `poradi`** (od Fáze 3): 4–7 položek, správné pořadí, společné vysvětlení `vysvetleniPoradi` a `shrnuti`.

**Karta nauky**: nadpis, text 60–160 slov v mini-markdownu (odstavce, **tučně**, odrážky „- “), volitelně ilustrace, odkazy na fakta. Karta vysvětluje souvislosti, ne jen opakuje fakt.

## 4. Datový model

```ts
// src/data/typy.ts
import type { KapitolaId } from "./kapitoly";

export const ILUSTRACE = [
  "zebricek-zpusobilosti", "lhuty-revizi", "kod-opravneni",               // F1
  "rezimy-prace", "pet-pravidel", "zony-prace", "kpr-metronom",          // F2
  "site-tn-tt-it", "proudovy-chranic", "barvy-vodicu", "ip-kod", "poradi-mereni" // F3
] as const;
export type IlustraceId = (typeof ILUSTRACE)[number];

export interface Podtema { id: string; nazev: string }

export interface LekceKarta {
  id: string;            // např. "k1-l01"
  podtema: string;
  nadpis: string;
  text: string;          // mini-markdown
  ilustrace?: IlustraceId;
  fakta: string[];
}

export interface Moznost {
  id: "a" | "b" | "c" | "d";
  text: string;
  spravna: boolean;
  vysvetleni: string;
}

interface OtazkaZaklad {
  id: string;            // např. "k1-q01"
  kapitola: KapitolaId;
  podtema: string;
  zadani: string;
  shrnuti: string;
  fakta: string[];
  obtiznost: 1 | 2 | 3;
  ilustrace?: IlustraceId;
}
export interface OtazkaVyber extends OtazkaZaklad { typ: "vyber"; moznosti: Moznost[] }
export interface OtazkaPoradi extends OtazkaZaklad {
  typ: "poradi";
  polozky: { id: string; text: string }[]; // v datech v zamíchaném pořadí
  spravnePoradi: string[];                  // id položek ve správném pořadí
  vysvetleniPoradi: string;
}
export type Otazka = OtazkaVyber | OtazkaPoradi;

export interface ObsahKapitoly {
  kapitola: KapitolaId;
  podtemata: Podtema[];
  lekce: LekceKarta[];
  otazky: Otazka[];
}
```

- Obsah kapitoly: `src/data/obsah/<kapitola-id>.ts` (default export `ObsahKapitoly`), registr `src/data/obsah/index.ts`.
- `src/data/faze.ts`: `export const AKTUALNI_FAZE = 1;` Kapitola je aktivní, když `kapitola.faze <= AKTUALNI_FAZE`.
- `src/data/lhuty.ts`: tabulka lhůt pro ilustraci `lhuty-revizi`, s komentářem odkazujícím na fakta K2-15 a K2-16.

## 5. Validátor obsahu (`scripts/validate-content.ts`, prebuild)

Spouští se přes `tsx`. Při chybě vypíše srozumitelnou hlášku (soubor, id, pravidlo) a skončí `process.exit(1)`. Kontroluje:

1. Unikátní id faktů, karet a otázek; unikátní id podtémat v kapitole.
2. Kapitola každého faktu a obsahu existuje v `KAPITOLY`. Obsah existuje pro každou aktivní kapitolu a pro žádnou neaktivní.
3. Každá karta i otázka má aspoň jeden fakt a všechna id faktů existují.
4. `vyber`: 3–4 možnosti, právě jedna správná, id možností `a`–`d` v pořadí, neprázdné texty, `vysvetleni` alespoň 30 znaků u každé možnosti, texty možností v rámci otázky unikátní.
5. `poradi`: 4–7 položek, `spravnePoradi` je permutace id položek, pořadí v datech se liší od správného.
6. Neprázdné `zadani` a `shrnuti`; žádné duplicitní `zadani` (porovnání po převodu na malá písmena a odstranění interpunkce).
7. `podtema` karet i otázek existuje; každé podtéma má aspoň jednu kartu a jednu otázku.
8. `ilustrace` je v seznamu `ILUSTRACE`.
9. Zakázané fráze v možnostech: „všechny uvedené“, „žádná z uvedených“, „všechny výše“.
10. Vyváženost: v každé kapitole připadá na jedno písmeno nejvýše 40 % správných odpovědí.
11. Kódování: žádný znak `\uFFFD` a žádné sekvence `\u00` v textech.
12. Minimální počty pro aktivní kapitoly (tabulka níže) a alespoň 25 % otázek obtížnosti 3.

| Kapitola | Min. karet | Min. otázek |
| --- | --- | --- |
| k1-legislativa | 6 | 16 |
| k2-vtz-revize | 6 | 16 |
| k3-organizace | 5 | 14 |
| k4-bezpecna-prace | 6 | 16 |
| k5-prvni-pomoc | 4 | 10 |
| k6-ochrana | 6 | 16 |
| k7-site-vodice | 5 | 14 |
| k8-prostory | 4 | 10 |
| k9-revize-mereni | 5 | 14 |

Při úspěchu vypíše tabulku po kapitolách (karty, otázky, obtížnost 1/2/3, otázky opřené o fakta „overit“) a počty faktů `overeno` / `overit`.

## 6. Obrazovky a chování

Routing přes hash vlastním hookem `useHashRoute` (bez knihovny):

- `#/` **Domů**: název „Elektro §7“, podtitul „Vedoucí elektrotechnik do 1 kV“, karta „Pokračovat“ (poslední místo), seznam 9 kapitol (číslo, název, krátký popis, pruh zvládnutí, hvězdičky; neaktivní kapitoly „připravujeme“). Odkaz „O aplikaci“.
- `#/k/:id` **Kapitola**: cíle, předpisy, tři dlaždice: Nauka (přečteno x/y), Procvičování (zvládnuto x/y), Test kapitoly (ve Fázi 1 neaktivní s popiskem „od Fáze 2“). Pod nimi podtémata s pokrokem.
- `#/k/:id/nauka/:index` **Karta nauky**: nadpis, text, ilustrace, čipy zdrojů (klepnutí otevře panel s textem faktu, zdrojem, poznámkou a stavem). Předchozí / další, tlačítko „Procvičit toto podtéma“. Zobrazená karta se označí jako přečtená.
- `#/k/:id/procvic?podtema=…&rezim=vse|chyby|nove` **Procvičování**: otázky v pořadí z dat; filtr podtématu a režimu. Možnosti se zobrazí zamíchané (Fisher–Yates, stabilní během relace) a písmena A–D se přidělí podle zobrazeného pořadí.
  - Po klepnutí na možnost: odpovědi se zamknou, správná se zvýrazní (barva správně + ikona), zvolená špatná barvou špatně + ikonou. Rozbalí se vysvětlení u všech možností (nejdřív zvolená, pak správná, pak ostatní), box „Shrnutí“, čipy zdrojů, odkaz „Zpět do nauky“ (karta sdílející nejvíc faktů) a odznak „Ověřit v normě“, má-li některý fakt stav `overit`.
  - Tlačítko „Další“, ukazatel x / y, na konci souhrn (správně / špatně, seznam chybných s odkazy).
- `#/k/:id/test` **Test kapitoly** (od Fáze 2): 10 otázek (nebo všechny, je-li jich méně), pokrývá všechna podtémata, seřazené podle podtémat. Zpětná vazba až na konci. Hranice úspěchu 80 %. Výsledek a rozbor s vysvětleními.
- `#/zkouska`, `#/chyby`, `#/prehled` (Fáze 4).
- `#/o-aplikaci`: účel, rozsah, upozornění, legenda stavů faktů, seznam `ZDROJE_ZNENI` s datem ověření, offline režim, verze aplikace, reset pokroku (s potvrzením), záloha a obnova pokroku (od Fáze 4).

**Pokrok** (localStorage, klíč `elektro7:v1`, vše v try/catch; bez úložiště aplikace funguje dál, jen si nic nepamatuje). Od Fáze 4 mají data verzi 2; klíč úložiště se nemění:

```ts
interface Ulozeno {
  verze: 2;
  otazky: Record<string, { pokusy: number; spravne: number; posledni: "ok" | "chyba"; kdy: string }>;
  prectene: string[];
  testy: Record<string, { kdy: string; skore: number; celkem: number }[]>;
  zkousky: {                       // historie zkoušek nanečisto (od verze 2)
    kdy: string;
    skore: number;
    celkem: number;
    neoverene: boolean;            // zahrnovala otázky opřené o fakta „overit“
    kapitoly: Record<string, { skore: number; celkem: number }>; // výsledek po kapitolách
  }[];
  posledniMisto?: string;
  nastaveni: { vzhled: "system" | "svetly" | "tmavy" };
}
```

Zvládnutí kapitoly = podíl jejích otázek, jejichž poslední odpověď je „ok“. Hvězdičky: jedna od 50 %, dvě od 80 %, tři při 100 % a zároveň testu kapitoly alespoň 80 % (test od Fáze 2).

Funkce `migrate(raw)` převede data verze 1 (Fáze 1–3) na verzi 2: všechny části zůstanou, přibude prázdné `zkousky`. Data novější verze, než aplikace zná, se nepřepisují. Rozpracovaná zkouška nanečisto je mimo `Ulozeno` pod klíčem `elektro7:zkouska`.

**Záloha** (od Fáze 4): soubor JSON `{ aplikace: "elektro7-zaloha", vytvoreno, verzeAplikace, data: Ulozeno }`. Import přijme zálohu i holá data verze 1 a 2 (převede je přes `migrate`), novější verzi odmítne. Obnova po potvrzení nahradí pokrok na zařízení; nastavení vzhledu zůstane podle zařízení.

## 7. Interaktivní ilustrace (`src/ilustrace/`)

Každá ilustrace je React komponenta s inline SVG, barvami z CSS proměnných, českými popisky, funguje od šířky 360 px, má dotykové cíle alespoň 44 px a `aria-label`. Hodnoty bere z faktů nebo z datových souborů odvozených z faktů; hodnota opřená o fakt „overit“ má u sebe poznámku „ověřit v normě“.

**Fáze 1**
- `zebricek-zpusobilosti`: schody osob seznámená (školená) → poučená (§ 4) → elektrotechnik (§ 6) → vedoucí elektrotechnik (§ 7) → revizní technik (§ 8 + osvědčení). Klepnutím na schod se otevře panel: co smí, předpoklady, doklad a jeho platnost, zdroje (K1-03, K1-04, K1-06, K1-07, K1-14, K1-17, K1-30, K3-04). Schod vedoucího elektrotechnika je zvýrazněný jako cíl.
- `lhuty-revizi`: tlačítka typů objektů a prostorů podle přílohy č. 4 NV 190/2022 → velká hodnota lhůty. Přepínač „řád preventivní údržby“ (lhůta až dvojnásobná), výběr více typů najednou (platí nejkratší), poznámka o roce, do kterého spadá konec lhůty. Data z `src/data/lhuty.ts` (K2-15 až K2-19).
- `kod-opravneni`: skládačka kódu E1 / E2 / E3 × A / B × M / O / R / Z → srozumitelná věta (například „E2A, revize: zařízení do 1 kV AC / 1,5 kV DC v prostorech bez nebezpečí výbuchu“), k tomu minimální praxe vedoucího elektrotechnika pro daný rozsah a platnost oprávnění 10 let a osvědčení 5 let (K2-06, K1-07, K2-07, K2-08).

**Fáze 2**
- `rezimy-prace`: tři sloupce Práce podle pokynů / s dohledem / pod dozorem: kdo dává pokyny, jak často je dohlížející přítomen (piktogram), kdo smí dohled a dozor vykonávat (K3-01 až K3-03).
- `pet-pravidel`: krokovač 1–5 se schématem odpojovače, zámku, zkoušečky, uzemňovací a zkratovací soupravy a izolačního krytu. U každého kroku „proč“ a „na co nezapomenout“ (K4-03 až K4-07).
- `zony-prace`: soustředná pásma kolem živé části (pásmo práce pod napětím do DL, pásmo práce v blízkosti do DV, okolí). Posuvník vzdálenosti ruky nebo nástroje → druh práce a co vyžaduje. Hodnoty pro NN s poznámkou „ověřit v normě“ (K4-08, K4-09).
- `kpr-metronom`: Start / Stop, vizuální puls 110 za minutu (nastavitelné 100–120), počítadlo 1–30 a pak výzva „2 vdechy“, připomínka hloubky 5–6 cm. Zvuk volitelný přes Web Audio, výchozí vypnutý. Tempo měřit přes `performance.now()`, aby se drift nesčítal (K5-01, K5-02).

**Fáze 3**
- `site-tn-tt-it`: přepínač TN-C / TN-S / TN-C-S / TT / IT. Schéma: zdroj, L1–L3, N, PE nebo PEN, uzemnění zdroje a neživých částí, spotřebič třídy I. Tlačítko „Porucha na kostře“ zvýrazní cestu poruchového proudu a vysvětlí, co odpojí a kde se nesmí použít proudový chránič (K6-06, K7-01 až K7-11). Barvy vodičů podle K7-04 a K7-06.
- `proudovy-chranic`: vodiče L a N procházející součtovým transformátorem, posuvník unikajícího proudu 0–50 mA; při dosažení IΔn 30 mA chránič vybaví. Text vysvětlí princip a doplňkovou ochranu (K6-04, K6-07, K6-08).
- `barvy-vodicu`: řez pětižilovým kabelem a jednotlivé vodiče; klepnutí na barvu ukáže funkci; mini úloha „Najdi ochranný vodič“ (K7-04 až K7-07).
- `ip-kod`: dvě kolečka číslic → popis ochrany s poznámkou „ověřit v normě“ (K8-05, K8-06).
- `poradi-mereni`: pořadí zkoušek a měření podle přílohy č. 1 NV 190/2022 (K9-01); použije se v nauce i u otázky typu `poradi`.

## 8. Design

- Charakter: technický a klidný, „rozvaděč a výkres“. Mobil první, obsah nejvýš 640 px široký, na PC vycentrovaný.
- Písmo: IBM Plex Sans (text) a IBM Plex Mono (paragrafy, hodnoty, kódy) z Google Fonts, se systémovými záložními písmy.
- Barvy jako CSS proměnné; světlý a tmavý vzhled (podle systému + ruční přepínač):

| Proměnná | Světlý | Tmavý |
| --- | --- | --- |
| pozadí | #F5F6F8 | #0E151C |
| plocha | #FFFFFF | #17212B |
| text | #15202B | #E6EDF3 |
| tlumený text | #5B6672 | #9AA6B2 |
| primární | #1F4E79 | #6FA8DC |
| akcent (výstraha) | #F2C200 | #FFD34D |
| správně | #1E7F3C | #4CC27A |
| špatně | #B42318 | #F0716A |
| ověřit | #9A6700 | #E3B341 |

- Vodiče v ilustracích: hnědá #7A4B2A, černá #1D1D1D (v tmavém vzhledu se světlým obrysem), šedá #8C929A, světle modrá #3D9BE0, zelenožlutá jako pruhy #2E9E44 a #F2C200.
- Akcentová žlutá jen pro výstrahy a zvýraznění, ne pro plochy.
- Ikony inline SVG v `Icon.tsx`, žádná ikonová knihovna, žádné emoji.
- Dotykové cíle alespoň 44 px, kontrast textu WCAG AA, `prefers-reduced-motion` vypne animace. Animace jen přechody CSS do 250 ms.

## 9. Technika

- React + TypeScript (strict) + Vite + Tailwind CSS v4 (`@tailwindcss/vite`), skripty přes `tsx`.
- Žádné další knihovny (router, UI kit, ikony, markdown, animace, správa stavu). Výjimka ve Fázi 4: `vite-plugin-pwa`.
- Vlastní mini-markdown renderer `src/lib/miniMarkdown.tsx`: odstavce, **tučně**, odrážky „- “; bez `dangerouslySetInnerHTML`.
- `package.json` skripty: `dev`, `validate` (`tsx scripts/validate-content.ts`), `prebuild` (spustí validate), `build` (`tsc -b && vite build`), `preview`.
- Struktura:

```
src/
  data/        kapitoly.ts, fakta.ts, faze.ts, typy.ts, lhuty.ts, obsah/<kapitola>.ts, obsah/index.ts
  lib/         storage.ts, progress.ts, shuffle.ts, route.ts, miniMarkdown.tsx, fakta.ts
  components/  Icon.tsx, Layout.tsx, KapitolaKarta.tsx, OtazkaView.tsx, FaktChip.tsx, FaktPanel.tsx,
               OdznakOverit.tsx, Hvezdicky.tsx, Pruh.tsx …
  ilustrace/   registr.ts, <ilustrace-id>.tsx
  pages/       Domu.tsx, Kapitola.tsx, Nauka.tsx, Procvicovani.tsx, OAplikaci.tsx,
               TestKapitoly.tsx (F2), Zkouska.tsx, Chyby.tsx, Prehled.tsx (F4)
scripts/       validate-content.ts
docs/          elektro-par7-spec.md
```

- Commity česky. Na konci každé fáze `npm run build` bez chyb.

## 10. Fáze

Každá fáze je samostatně funkční. Na jejím konci Claude Code zastaví a napíše shrnutí: co je hotové, počty karet a otázek po kapitolách, otázky opřené o fakta „overit“, chybějící fakta, co otestovat na iPhonu.

### Fáze 1 – Kostra, validátor, kapitoly 1–2

Implementuj:
1. Kostru projektu ručně, bez interaktivních generátorů: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html` (`lang="cs"`, viewport, `theme-color`, fonty), `src/main.tsx`, Tailwind v4, `.gitignore`. Závislosti nainstaluj přes `npm install` v aktuálních stabilních verzích a commitni `package-lock.json`. Existující `README.md`, `CLAUDE.md`, `docs/` a `src/data/kapitoly.ts`, `src/data/fakta.ts` nepřepisuj.
2. `src/data/typy.ts` (sekce 4), `src/data/faze.ts` s hodnotou 1, validátor (sekce 5) zapojený jako prebuild.
3. Obsah kapitol k1 a k2 jen z faktů: podtémata, alespoň 6 karet nauky a 16 otázek v každé.
   - k1 podtémata: předpisy a orgány; stupně odborné způsobilosti; vedoucí elektrotechnik (předpoklady, praxe, rozsah); zkouška a doklady; osoba poučená a školení.
   - k2 podtémata: co je a co není vyhrazené elektrické zařízení; třídy; oprávnění a osvědčení; revize a lhůty; povinnosti provozovatele a zpráva o revizi.
4. Obrazovky Domů, Kapitola (Test kapitoly neaktivní), Nauka, Procvičování se zpětnou vazbou, O aplikaci. Ukládání pokroku, přečtených karet, posledního místa a vzhledu.
5. Ilustrace `zebricek-zpusobilosti`, `lhuty-revizi`, `kod-opravneni`.
6. `README.md`: doplň popis projektu, příkazy a odkaz na specifikaci.

Ověř validátor: dočasně vlož do dat otázku se dvěma správnými možnostmi, odkaz na neexistující fakt a prázdné vysvětlení. Build musí pokaždé selhat s jasnou hláškou. Pak úpravy vrať a necommituj je.

Mimo rozsah Fáze 1: Test kapitoly, kapitoly 3–9, typ `poradi`, zkouška nanečisto, offline PWA, zvuky.

Akceptační kritéria Fáze 1:
- [ ] `npm run build` projde a validátor vypíše statistiky
- [ ] k1 i k2 mají alespoň 6 karet a 16 otázek, alespoň 25 % otázek obtížnosti 3, každá možnost má vysvětlení
- [ ] Zpětná vazba podle sekce 6 včetně odznaku „Ověřit v normě“
- [ ] Pokrok přežije obnovení stránky; bez úložiště (anonymní režim) aplikace nespadne
- [ ] Šířka 360 px bez vodorovného posunu; světlý i tmavý vzhled
- [ ] Tři ilustrace Fáze 1 fungují dotykem

### Fáze 2 – Kapitoly 3–5, Test kapitoly

Implementuj:
1. `AKTUALNI_FAZE = 2`.
2. Obsah k3, k4 a k5 jen z faktů (minimální počty ze sekce 5).
   - k3 podtémata: role a pověření (odpovědná osoba, osoba odpovědná za elektrické zařízení, vedoucí práce); práce podle pokynů, s dohledem a pod dozorem; co smí osoba poučená; hodnocení rizik, OOPP a školení; řízení práce v praxi (situační otázky).
   - k4 podtémata: rozsah normy a pracovní postupy; pět pravidel práce bez napětí; pásma kolem živých částí; ukončení práce a opětovné zapnutí; obsluha a pomůcky.
   - k5 podtémata: účinky proudu; vyproštění postiženého; resuscitace a AED; po úrazu.
3. Ilustrace `rezimy-prace`, `pet-pravidel`, `zony-prace`, `kpr-metronom`.
4. Test kapitoly (sekce 6) pro všechny aktivní kapitoly; třetí hvězdička podmíněná testem.

Mimo rozsah: kapitoly 6–9, typ `poradi`, zkouška nanečisto.

Akceptační kritéria Fáze 2:
- [ ] Build projde, k1–k5 splňují minimální počty
- [ ] Test kapitoly: 10 otázek, pokrytí podtémat, hranice 80 %, rozbor s vysvětleními, uložení výsledku
- [ ] Čtyři ilustrace Fáze 2 fungují; metronom drží tempo i po minutě běhu

### Fáze 3 – Kapitoly 6–9, otázky na seřazení

Implementuj:
1. `AKTUALNI_FAZE = 3`.
2. Obsah k6–k9 jen z faktů.
   - k6 podtémata: princip ochranných opatření; automatické odpojení a doby odpojení; proudový chránič; další opatření (dvojitá izolace, SELV a PELV, elektrické oddělení); třídy ochrany předmětů.
   - k7 podtémata: označení sítí; sítě TN; sítě TT a IT; značení vodičů; vodič PEN.
   - k8 podtémata: vnější vlivy a dokumentace; IP kód; prostory s vanou nebo sprchou; prostředí a třídy zařízení.
   - k9 podtémata: podklady k revizi; prohlídka; pořadí zkoušek a měření; funkční zkoušky a měření; spotřebiče a nářadí.
3. Typ otázky `poradi`: položky se přesouvají tlačítky nahoru a dolů (spolehlivé na dotyku, bez knihovny), po potvrzení se ukáže správné pořadí s vyznačenými chybami. Nejméně dvě otázky `poradi`: pět pravidel (k4) a pořadí zkoušek a měření (k9). Validátor rozšiř podle sekce 5 bodu 5.
4. Ilustrace `site-tn-tt-it`, `proudovy-chranic`, `barvy-vodicu`, `ip-kod`, `poradi-mereni`.

Akceptační kritéria Fáze 3:
- [ ] Build projde, všech 9 kapitol splňuje minimální počty
- [ ] Otázky `poradi` fungují na dotyku a ukládají se do pokroku
- [ ] Pět ilustrací Fáze 3 funguje; hodnoty z faktů „overit“ mají poznámku

### Fáze 4 – Zkouška nanečisto, chyby, přehled, offline

Implementuj:
1. `AKTUALNI_FAZE = 4` (typ `faze` kapitol zůstává 1–3).
2. **Zkouška nanečisto** (`#/zkouska`): 20 otázek, z každé kapitoly poměrně (alespoň 1), seřazené podle kapitol a podtémat. Standardně jen otázky bez faktů „overit“, přepínač „zahrnout neověřené“. Přednost mají otázky s horší úspěšností. Bez zpětné vazby během testu, hranice 80 %, výsledek po kapitolách, rozbor s vysvětleními, historie pokusů.
3. **Opakování chyb** (`#/chyby`): chybně zodpovězené otázky po kapitolách, procvičení jen jich.
4. **Přehled** (`#/prehled`): zvládnutí po kapitolách, poslední testy a zkoušky, tři nejslabší podtémata s odkazem na procvičení.
5. **PWA** přes `vite-plugin-pwa`: manifest (název „Elektro §7 – trenažér“, krátký název „Elektro §7“, ikony 192 a 512 px, apple-touch-icon 180 px, barva motivu), offline precache aplikace a runtime cache Google Fonts, výzva „Je k dispozici nová verze – načíst“.
6. Export a import pokroku do souboru JSON (záloha) a reset.
7. Dotažení: přístupnost (focus, aria), prázdné stavy, `prefers-reduced-motion`.
8. Aktualizuj `CLAUDE.md` (stav projektu) a `README.md`.

Akceptační kritéria Fáze 4:
- [ ] Zkouška nanečisto, opakování chyb a přehled fungují a ukládají se
- [ ] Na iPhonu po přidání na plochu aplikace funguje v režimu letadlo
- [ ] Export a import pokroku obnoví stav na jiném zařízení

## Changelog

| Verze | Datum | Změna |
| --- | --- | --- |
| 1.0 | 2026-10-12 | Vznik specifikace: 9 kapitol, báze faktů, validátor, fáze F1–F4, cloudový workflow |
| 1.1 | 2026-10-13 | Fáze 4: uložená data verze 2 (historie zkoušek nanečisto `zkousky`, migrace z verze 1), formát zálohy pokroku, rozpracovaná zkouška pod klíčem `elektro7:zkouska` |
