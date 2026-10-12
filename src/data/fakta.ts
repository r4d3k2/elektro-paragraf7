// Báze faktů – jediný zdroj odborných tvrzení v aplikaci.
// stav "overeno": ověřeno v textu předpisu nebo ve zdroji uvedeném v poli zdroj k datu FAKTA_OVERENO_K.
// stav "overit": běžně uváděný údaj, který je nutné potvrdit v aktuálním znění normy.
// Text a stav faktů mění jen Radovan nebo Claude Code na jeho výslovný pokyn (viz CLAUDE.md).

import type { KapitolaId } from "./kapitoly";

export type StavOvereni = "overeno" | "overit";

export interface Fakt {
  id: string;
  kapitola: KapitolaId;
  text: string;
  zdroj: string;
  stav: StavOvereni;
  pozn?: string;
}

export const FAKTA_OVERENO_K = "2026-10-12";

export const ZDROJE_ZNENI: string[] = [
  "Zákon č. 250/2021 Sb. – konsolidované znění se změnou č. 318/2025 Sb. (praceamzda.cz), ověřeno 12. 10. 2026",
  "Nařízení vlády č. 194/2022 Sb. – konsolidované znění se změnou č. 175/2024 Sb. (praceamzda.cz), ověřeno 12. 10. 2026",
  "Nařízení vlády č. 190/2022 Sb. – konsolidované znění se změnou č. 175/2024 Sb. (praceamzda.cz), ověřeno 12. 10. 2026",
  "ERC Guidelines 2025 – Adult Basic Life Support (cprguidelines.eu)",
  "Normy ČSN – text norem nebyl k dispozici; údaje ověřené jen ve výukových nebo výrobních materiálech mají tento zdroj uvedený u faktu"
];

export const FAKTA: Fakt[] = [
  // ───────── Kapitola 1: Legislativa a odborná způsobilost ─────────
  {
    id: "K1-01",
    kapitola: "k1-legislativa",
    text: "Zákon č. 250/2021 Sb., o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení, je účinný od 1. 7. 2022. Zrušil mimo jiné zákon č. 174/1968 Sb. a vyhlášku č. 50/1978 Sb., o odborné způsobilosti v elektrotechnice.",
    zdroj: "zákon č. 250/2021 Sb., § 25 a § 28",
    stav: "overeno"
  },
  {
    id: "K1-02",
    kapitola: "k1-legislativa",
    text: "Požadavky na odbornou způsobilost v elektrotechnice podrobně stanoví nařízení vlády č. 194/2022 Sb., účinné od 1. 7. 2022 a novelizované nařízením č. 175/2024 Sb.",
    zdroj: "NV č. 194/2022 Sb., úvodní věta a § 11",
    stav: "overeno"
  },
  {
    id: "K1-03",
    kapitola: "k1-legislativa",
    text: "Zákon rozlišuje osoby znalé, osoby poučené a osoby školené (seznámené). Za osoby znalé se považují osoby pro samostatnou činnost, osoby pro řízení činnosti a revizní technici.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 1",
    stav: "overeno"
  },
  {
    id: "K1-04",
    kapitola: "k1-legislativa",
    text: "Nařízení vlády č. 194/2022 Sb. nazývá osobu znalou pro samostatnou činnost „elektrotechnik“ (§ 6) a osobu znalou pro řízení činnosti „vedoucí elektrotechnik“ (§ 7). Třetí osobou znalou je revizní technik (§ 8).",
    zdroj: "NV č. 194/2022 Sb., § 5 odst. 1",
    stav: "overeno"
  },
  {
    id: "K1-05",
    kapitola: "k1-legislativa",
    text: "Vedoucím elektrotechnikem může být jen osoba s odbornou kvalifikací podle § 2 písm. a) (elektrotechnické vzdělání, vzdělání jiného oboru obsahově splňující elektrotechnické požadavky, nebo úplná profesní kvalifikace z oboru Elektrotechnika v Národní soustavě kvalifikací), která splňuje minimální délku praxe a po zaškolení složila zkoušku.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 1 a § 2 písm. a)",
    stav: "overeno"
  },
  {
    id: "K1-06",
    kapitola: "k1-legislativa",
    text: "Vedoucí elektrotechnik smí vykonávat všechny činnosti elektrotechnika a navíc řízení činností, řízení provozu a projektování vyhrazených elektrických zařízení, pokud nejde o projektování vyžadující autorizaci podle zákona č. 360/1992 Sb.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 1; zákon č. 250/2021 Sb., § 19 odst. 2 písm. b)",
    stav: "overeno"
  },
  {
    id: "K1-07",
    kapitola: "k1-legislativa",
    text: "Minimální odborná praxe vedoucího elektrotechnika je 2 roky pro rozsah E2A a E3A, 3 roky pro E1A, E2B a E3B a 4 roky pro E1B.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 2",
    stav: "overeno"
  },
  {
    id: "K1-08",
    kapitola: "k1-legislativa",
    text: "Z minimální praxe vedoucího elektrotechnika musí být nejméně 1 rok praxe na elektrických zařízeních příslušného druhu a napětí.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 3",
    stav: "overeno"
  },
  {
    id: "K1-09",
    kapitola: "k1-legislativa",
    text: "Rozsah odborné způsobilosti se stanoví podle napětí (do 1 kV střídavého nebo 1,5 kV stejnosměrného napětí, nebo bez omezení napětí) a podle druhu zařízení (objekty bez nebezpečí výbuchu, nebo s nebezpečím výbuchu). Zkušební komise může rozsah dokladu omezit podle skutečně prováděných činností.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 6 a 7",
    stav: "overeno"
  },
  {
    id: "K1-10",
    kapitola: "k1-legislativa",
    text: "Znalosti vedoucího elektrotechnika ověřuje tříčlenná zkušební komise. Jejím předsedou musí být osoba odborně způsobilá k provádění revizí podle § 11 zákona č. 250/2021 Sb., tedy revizní technik.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 4",
    stav: "overeno",
    pozn: "Pro práce u provozovatelů přenosové a distribuční soustavy platí odchylka: předsedou může být odpovědná osoba provozovatele s kvalifikací nejméně vedoucího elektrotechnika."
  },
  {
    id: "K1-11",
    kapitola: "k1-legislativa",
    text: "Zkouška z odborné způsobilosti má dvě části: písemný test o minimálně 10 otázkách (předpisy BOZP pro činnost na elektrických zařízeních a první pomoc) a ústní pohovor zaměřený na výsledek a chyby testu, odbornou problematiku a pracovní postupy.",
    zdroj: "NV č. 194/2022 Sb., § 9 odst. 2",
    stav: "overeno"
  },
  {
    id: "K1-12",
    kapitola: "k1-legislativa",
    text: "V písemné i ústní části zkoušky je pro hodnocení „vyhověl“ nutné dosáhnout nejméně 80 % správných odpovědí. K ústní části lze přistoupit jen po úspěšné písemné části.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 2 písm. c)",
    stav: "overeno"
  },
  {
    id: "K1-13",
    kapitola: "k1-legislativa",
    text: "Při celkovém hodnocení „nevyhověl“ lze zkoušku opakovat nejdříve po 15 dnech. Počet opakování není omezen.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 2 písm. c)",
    stav: "overeno"
  },
  {
    id: "K1-14",
    kapitola: "k1-legislativa",
    text: "Doklad o úspěšném složení zkoušky z odborné způsobilosti k výkonu činností v elektrotechnice platí 3 roky ode dne vydání.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 2 písm. b)",
    stav: "overeno"
  },
  {
    id: "K1-15",
    kapitola: "k1-legislativa",
    text: "Předseda zkušební komise zkoušku připravuje, vede a vyhodnocuje, pořizuje protokol, vystavuje doklad a zajistí uchování protokolu nejméně 6 a nejdéle 7 let. Za provedení zkoušky a správnost dokladu odpovídá předseda komise.",
    zdroj: "NV č. 194/2022 Sb., § 9 odst. 4; zákon č. 250/2021 Sb., § 19 odst. 2 písm. c)",
    stav: "overeno"
  },
  {
    id: "K1-16",
    kapitola: "k1-legislativa",
    text: "Předpoklady osoby znalé pro samostatnou činnost i pro řízení činnosti jsou: věk 18 let a plná svéprávnost, zdravotní způsobilost, odborné elektrotechnické vzdělání, odborná praxe a úspěšně složená zkouška.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 2 písm. a)",
    stav: "overeno"
  },
  {
    id: "K1-17",
    kapitola: "k1-legislativa",
    text: "Osoba poučená musí být plně svéprávná a zdravotně způsobilá a musí projít poučením a ověřením znalostí, které provede pověřená osoba znalá. Dokladem je zápis podepsaný oběma; lhůtu opakování určí osoba znalá, nejvýše 3 roky. Pro „vyhověl“ je nutných 80 % správných odpovědí.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 3",
    stav: "overeno"
  },
  {
    id: "K1-18",
    kapitola: "k1-legislativa",
    text: "Zápis o poučení vyhotovuje osoba znalá, která poučení a ověření provedla. V zápisu musí být přesně vymezen rozsah poučení a specifikace pracoviště.",
    zdroj: "NV č. 194/2022 Sb., § 4 odst. 3",
    stav: "overeno"
  },
  {
    id: "K1-19",
    kapitola: "k1-legislativa",
    text: "Osoba znalá, jejíž přezkoušení pozbylo platnosti, se považuje za osobu poučenou. Stupeň osoby znalé může znovu získat úspěšným složením zkoušky.",
    zdroj: "NV č. 194/2022 Sb., § 4 odst. 1",
    stav: "overeno"
  },
  {
    id: "K1-20",
    kapitola: "k1-legislativa",
    text: "Obsluha elektrického zařízení malého a nízkého napětí se nepovažuje za činnost vyžadující odbornou způsobilost podle nařízení vlády č. 194/2022 Sb.",
    zdroj: "NV č. 194/2022 Sb., § 3 odst. 2",
    stav: "overeno"
  },
  {
    id: "K1-21",
    kapitola: "k1-legislativa",
    text: "Provozovatel zajistí pravidelné školení osob odborně způsobilých podle § 4, 6 a 7 o předpisech BOZP podle svého vnitřního předpisu. Nemá-li vnitřní předpis, školí je nejméně jednou ročně.",
    zdroj: "NV č. 194/2022 Sb., § 3 odst. 4",
    stav: "overeno"
  },
  {
    id: "K1-22",
    kapitola: "k1-legislativa",
    text: "Osvědčení podle dřívějších předpisů zůstala v platnosti: pracovník pro řízení činnosti, pro řízení činnosti prováděné dodavatelským způsobem a pro řízení provozu se považuje za vedoucího elektrotechnika; pracovník znalý a pracovník znalý pro samostatnou činnost za elektrotechnika.",
    zdroj: "NV č. 194/2022 Sb., § 10",
    stav: "overeno"
  },
  {
    id: "K1-23",
    kapitola: "k1-legislativa",
    text: "Pro elektrotechnika bez elektrotechnické praxe stanoví místní provozní bezpečnostní předpis dohled osoby znalé s praxí nejméně 2 roky, a to po dobu nejméně 1 roku.",
    zdroj: "NV č. 194/2022 Sb., § 6 odst. 2",
    stav: "overeno"
  },
  {
    id: "K1-24",
    kapitola: "k1-legislativa",
    text: "Zkoušky z odborné způsobilosti zajišťují právnické a podnikající fyzické osoby pro osoby, které pro ně pracují na elektrických zařízeních. Osoba samostatně výdělečně činná si zkoušku zajišťuje sama.",
    zdroj: "zákon č. 250/2021 Sb., § 19 odst. 4",
    stav: "overeno"
  },
  {
    id: "K1-25",
    kapitola: "k1-legislativa",
    text: "Před zkouškou předloží uchazeč předsedovi komise doklad o kvalifikaci (originál nebo úředně ověřenou kopii) a doklad o délce praxe (potvrzení zaměstnavatele nebo čestné prohlášení).",
    zdroj: "NV č. 194/2022 Sb., § 9 odst. 5",
    stav: "overeno"
  },
  {
    id: "K1-26",
    kapitola: "k1-legislativa",
    text: "Předmětem školení a zkoušky jsou povinnosti z předpisů BOZP pro činnost na elektrickém zařízení daného druhu a napětí, teoretické a praktické znalosti první pomoci zejména při úrazu elektrickým proudem, pracovní a technologické postupy, provozní a bezpečnostní pokyny a zdroje a příčiny rizik.",
    zdroj: "NV č. 194/2022 Sb., § 9 odst. 1",
    stav: "overeno"
  },
  {
    id: "K1-27",
    kapitola: "k1-legislativa",
    text: "Státní správu v oblasti bezpečnosti provozu vyhrazených technických zařízení vykonává Ministerstvo práce a sociálních věcí, Státní úřad inspekce práce a oblastní inspektoráty práce.",
    zdroj: "zákon č. 250/2021 Sb., § 4",
    stav: "overeno"
  },
  {
    id: "K1-28",
    kapitola: "k1-legislativa",
    text: "Pověřenou organizací podle zákona č. 250/2021 Sb. je Technická inspekce České republiky (TIČR). Vydává mimo jiné oprávnění firmám a osvědčení revizním technikům a vede jejich evidenci.",
    zdroj: "zákon č. 250/2021 Sb., § 6 a § 24 odst. 3",
    stav: "overeno"
  },
  {
    id: "K1-29",
    kapitola: "k1-legislativa",
    text: "Elektrotechnik (§ 6) vykonává činnosti na elektrických zařízeních a v jejich blízkosti samostatně, s výjimkou zvláštních případů vyplývajících z hodnocení rizik. Jeho minimální praxi stanoví odpovědná osoba místním provozním bezpečnostním předpisem.",
    zdroj: "NV č. 194/2022 Sb., § 6 odst. 1 a 2",
    stav: "overeno"
  },
  {
    id: "K1-30",
    kapitola: "k1-legislativa",
    text: "Revizním technikem může být jen držitel platného osvědčení k revizím, který je zároveň odborně způsobilý podle § 7 (vedoucí elektrotechnik) a splňuje minimální praxi, například 4 roky pro rozsah E1A a E2A.",
    zdroj: "NV č. 194/2022 Sb., § 8",
    stav: "overeno"
  },

  // ───────── Kapitola 2: Vyhrazená elektrická zařízení a revize ─────────
  {
    id: "K2-01",
    kapitola: "k2-vtz-revize",
    text: "Vyhrazené technické zařízení je tlakové, zdvihací, elektrické nebo plynové zařízení, které svým charakterem nebo akumulovanou energií, nesprávným použitím nebo provozními riziky představuje závažné riziko ohrožení života, zdraví a bezpečnosti osob.",
    zdroj: "zákon č. 250/2021 Sb., § 2 písm. a)",
    stav: "overeno"
  },
  {
    id: "K2-02",
    kapitola: "k2-vtz-revize",
    text: "Vyhrazenými elektrickými zařízeními jsou zařízení pro výrobu, přeměnu, přenos, rozvod, distribuci a odběr elektrické energie, elektrické instalace staveb a technologií a zařízení k ochraně před účinky atmosférické nebo statické elektřiny.",
    zdroj: "NV č. 190/2022 Sb., § 3 odst. 1",
    stav: "overeno"
  },
  {
    id: "K2-03",
    kapitola: "k2-vtz-revize",
    text: "Vyhrazenými elektrickými zařízeními nejsou ruční elektromechanické nářadí, elektronické přístroje a spotřebiče do 400 V včetně, pokud nejsou určeny k pevnému připojení; dále prodlužovací šňůry a odpojitelné přívody, zdravotnické elektrické přístroje a elektrické zařízení strojního zařízení, které je výrobkem podle zákona č. 22/1997 Sb.",
    zdroj: "NV č. 190/2022 Sb., § 3 odst. 2",
    stav: "overeno"
  },
  {
    id: "K2-04",
    kapitola: "k2-vtz-revize",
    text: "Do I. třídy patří mimo jiné elektrická zařízení pro prostředí s nebezpečím výbuchu, zařízení v objektu, který podle požárně bezpečnostního řešení umožňuje přítomnost více než 200 osob, elektrické instalace ve zdravotnických prostorech (s výjimkami) a ochrana před bleskem, která tato zařízení chrání. Ostatní vyhrazená elektrická zařízení jsou II. třídy.",
    zdroj: "NV č. 190/2022 Sb., § 4",
    stav: "overeno"
  },
  {
    id: "K2-05",
    kapitola: "k2-vtz-revize",
    text: "Vyhrazené elektrické zařízení I. třídy lze uvést do provozu jen na základě osvědčení pověřené organizace. Provozovatel ho uchovává po celou dobu provozu zařízení.",
    zdroj: "NV č. 190/2022 Sb., § 6 odst. 6",
    stav: "overeno"
  },
  {
    id: "K2-06",
    kapitola: "k2-vtz-revize",
    text: "Oprávnění se označuje kódem: E1 = zařízení nízkého a vysokého napětí s uvedením rozsahu (do 35 kV, do 230 kV nebo bez omezení), E2 = zařízení nízkého napětí do 1 kV AC nebo 1,5 kV DC, E3 = ochrana před atmosférickou elektřinou, přepětím a statickou elektřinou; A = prostory bez nebezpečí výbuchu, B = s nebezpečím výbuchu; M = montáž, O = opravy, R = revize, Z = zkoušky.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 3",
    stav: "overeno"
  },
  {
    id: "K2-07",
    kapitola: "k2-vtz-revize",
    text: "Montáž, opravy, revize a zkoušky vyhrazených technických zařízení smějí jako firma vykonávat jen právnické a podnikající fyzické osoby s oprávněním, které vydává pověřená organizace. Oprávnění platí 10 let ode dne nabytí právní moci rozhodnutí.",
    zdroj: "zákon č. 250/2021 Sb., § 7 a § 8 odst. 4",
    stav: "overeno"
  },
  {
    id: "K2-08",
    kapitola: "k2-vtz-revize",
    text: "Osvědčení revizního technika uděluje pověřená organizace na základě zkoušky s písemnou a ústní částí, v každé je nutných nejméně 80 %. Osvědčení platí 5 let ode dne udělení.",
    zdroj: "zákon č. 250/2021 Sb., § 11 odst. 3 a § 12 odst. 3",
    stav: "overeno"
  },
  {
    id: "K2-09",
    kapitola: "k2-vtz-revize",
    text: "Revizi smí provádět výhradně revizní technik s osvědčením v rozsahu odpovídajícím revidovanému zařízení. Provádí-li revize jako živnost, musí mít také oprávnění.",
    zdroj: "zákon č. 250/2021 Sb., § 17",
    stav: "overeno"
  },
  {
    id: "K2-10",
    kapitola: "k2-vtz-revize",
    text: "Revize je posouzení provozní a technické bezpečnosti vyhrazeného technického zařízení prohlídkou, zkouškou nebo měřením, zda odpovídá předpisům k zajištění bezpečnosti a ochrany zdraví při práci.",
    zdroj: "zákon č. 250/2021 Sb., § 2 písm. c)",
    stav: "overeno"
  },
  {
    id: "K2-11",
    kapitola: "k2-vtz-revize",
    text: "Revize se provádí po dokončení montáže vždy, po opravě nebo přemístění podle potřeby. Revize je nutná i při změně parametrů ochrany proti přetížení a zkratu, ochrany před úrazem elektrickým proudem nebo vlastností ochrany před atmosférickou a statickou elektřinou.",
    zdroj: "NV č. 190/2022 Sb., § 6 odst. 2 písm. c) a odst. 4",
    stav: "overeno"
  },
  {
    id: "K2-12",
    kapitola: "k2-vtz-revize",
    text: "Po montáži předá dodavatel odběrateli průvodní dokumentaci odpovídající skutečnému provedení, jejíž součástí je posouzení vnějších vlivů, a zprávu o výchozí revizi, není-li sjednáno jinak.",
    zdroj: "NV č. 190/2022 Sb., § 6 odst. 3",
    stav: "overeno"
  },
  {
    id: "K2-13",
    kapitola: "k2-vtz-revize",
    text: "Vyhrazené elektrické zařízení lze provozovat jen tehdy, byl-li jeho stav ověřen prohlídkou, zkouškou, kontrolou a revizí ve lhůtách podle řádu prohlídek, údržby a revizí, který musí provozovatel zpracovat.",
    zdroj: "NV č. 190/2022 Sb., § 7 odst. 1 a 5",
    stav: "overeno"
  },
  {
    id: "K2-14",
    kapitola: "k2-vtz-revize",
    text: "Uvádí-li průvodní dokumentace výrobce kratší lhůtu revize nebo kontroly, než stanoví řád prohlídek, údržby a revizí, platí lhůta z průvodní dokumentace.",
    zdroj: "NV č. 190/2022 Sb., § 7 odst. 2",
    stav: "overeno"
  },
  {
    id: "K2-15",
    kapitola: "k2-vtz-revize",
    text: "Základní nejdelší lhůty pravidelných revizí: objekty pro administrativu 5 let; objekty pro výrobu, vzdělávání (školy, mateřské školy), ubytování a lékařské účely 3 roky; objekt pro více než 200 osob 2 roky; prozatímní zařízení staveniště 0,5 roku; pojízdné a převozné prostředky 1 rok; prostory s nebezpečím požáru a výbuchu 3 roky; prostory mokré a s trvalým výskytem korozivních nebo znečišťujících látek 1 rok.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 4",
    stav: "overeno"
  },
  {
    id: "K2-16",
    kapitola: "k2-vtz-revize",
    text: "Ochrana před bleskem (LPS): revize LPS chránících kritické systémy nejpozději po 2 letech, ostatních po 4 letech. Na všech LPS se nejméně jednou ročně provádí vizuální kontrola.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 4",
    stav: "overeno"
  },
  {
    id: "K2-17",
    kapitola: "k2-vtz-revize",
    text: "Vztahuje-li se na zařízení více revizních lhůt, použije se nejkratší.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 4, doplňující informace písm. a)",
    stav: "overeno"
  },
  {
    id: "K2-18",
    kapitola: "k2-vtz-revize",
    text: "Pravidelná revize musí být provedena v roce, do kterého spadá konec stanovené lhůty od poslední revize. Neplatí to pro lhůty nepřesahující jeden rok.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 4, doplňující informace písm. b)",
    stav: "overeno"
  },
  {
    id: "K2-19",
    kapitola: "k2-vtz-revize",
    text: "Provozovatel, který má zpracovaný řád preventivní údržby, může v něm stanovit lhůty pravidelných revizí až dvojnásobné.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 4, doplňující informace písm. c)",
    stav: "overeno"
  },
  {
    id: "K2-20",
    kapitola: "k2-vtz-revize",
    text: "Zpráva o revizi obsahuje mimo jiné provozovatele, identifikaci a místo zařízení, rozsah revize, jméno, podpis a evidenční číslo osvědčení revizního technika, druh revize (výchozí, pravidelná, mimořádná s důvodem), data, použité měřicí přístroje, naměřené hodnoty, závady s odkazem na porušené předpisy, slovní celkové zhodnocení a doporučenou lhůtu příští revize.",
    zdroj: "NV č. 190/2022 Sb., § 10 odst. 1",
    stav: "overeno"
  },
  {
    id: "K2-21",
    kapitola: "k2-vtz-revize",
    text: "Zjistí-li se stav bezprostředně ohrožující bezpečnost, musí se vyhrazené elektrické zařízení neprodleně odpojit od zdroje a zajistit proti nežádoucímu připojení. Není-li to možné, musí se bez zbytečného odkladu zajistit oprava.",
    zdroj: "NV č. 190/2022 Sb., § 7 odst. 8",
    stav: "overeno"
  },
  {
    id: "K2-22",
    kapitola: "k2-vtz-revize",
    text: "Provozovatel musí zajistit odstranění závad ohrožujících bezpečný a spolehlivý provoz zjištěných při revizi nebo kontrole bez zbytečného odkladu. Ostatní závady se odstraňují v termínech podle jejich závažnosti.",
    zdroj: "zákon č. 250/2021 Sb., § 20 odst. 5",
    stav: "overeno"
  },
  {
    id: "K2-23",
    kapitola: "k2-vtz-revize",
    text: "Za stav ohrožující bezpečnost práce a provozu se považuje provoz vyhrazeného technického zařízení bez doložené zprávy o revizi ve stanovených lhůtách a rozsahu, provoz v rozporu s průvodní nebo provozní dokumentací a chybějící vydaná průvodní nebo provozní dokumentace.",
    zdroj: "zákon č. 250/2021 Sb., § 20 odst. 3",
    stav: "overeno"
  },
  {
    id: "K2-24",
    kapitola: "k2-vtz-revize",
    text: "Stav vyhrazeného technického zařízení se při kontrolách, zkouškách a revizích posuzuje podle předpisů platných v době jeho uvedení do provozu, a to až do jeho rekonstrukce.",
    zdroj: "zákon č. 250/2021 Sb., § 3 odst. 5",
    stav: "overeno"
  },
  {
    id: "K2-25",
    kapitola: "k2-vtz-revize",
    text: "Prozatímní vyhrazené elektrické zařízení se v době, kdy se nepoužívá, vypíná, pokud tím není ohrožena bezpečnost. O ponechání v provozu rozhoduje osoba odpovědná za elektrické zařízení.",
    zdroj: "NV č. 190/2022 Sb., § 7 odst. 7",
    stav: "overeno"
  },
  {
    id: "K2-26",
    kapitola: "k2-vtz-revize",
    text: "Provozovatel musí bez zbytečného odkladu ohlásit oblastnímu inspektorátu práce havárii související s vyhrazeným technickým zařízením se škodou zjevně přesahující 5 000 000 Kč.",
    zdroj: "zákon č. 250/2021 Sb., § 22",
    stav: "overeno"
  },
  {
    id: "K2-27",
    kapitola: "k2-vtz-revize",
    text: "Provádí-li se výchozí revize po částech, musí být před uvedením celého zařízení do trvalého provozu vystavena jedna souhrnná zpráva o výchozí revizi.",
    zdroj: "NV č. 190/2022 Sb., § 10 odst. 2",
    stav: "overeno"
  },
  {
    id: "K2-28",
    kapitola: "k2-vtz-revize",
    text: "Zpráva o revizi může být listinná nebo elektronická; elektronická musí být podepsána uznávaným elektronickým podpisem.",
    zdroj: "NV č. 190/2022 Sb., § 2 písm. f) a § 10 odst. 1 písm. d)",
    stav: "overeno"
  },
  {
    id: "K2-29",
    kapitola: "k2-vtz-revize",
    text: "Po rekonstrukci musí provozovatel ověřit bezpečnost vyhrazeného technického zařízení včetně zkoušek a výchozí revize.",
    zdroj: "zákon č. 250/2021 Sb., § 20 odst. 6",
    stav: "overeno"
  },
  {
    id: "K2-30",
    kapitola: "k2-vtz-revize",
    text: "Rekonstrukce nahrazuje nevyhovující část provozovaného zařízení novou nebo modernější částí a mění základní technické nebo bezpečnostní parametry. Oprava obnovuje použitelný stav beze změny těchto parametrů.",
    zdroj: "zákon č. 250/2021 Sb., § 2 písm. e) a i)",
    stav: "overeno"
  },

  // ───────── Kapitola 3: Organizace práce a odpovědnosti ─────────
  {
    id: "K3-01",
    kapitola: "k3-organizace",
    text: "Práce podle pokynů je práce, pro kterou jsou dány nezbytné pokyny pro bezpečné a správné provedení. Pokyny pro práci na vyhrazeném elektrickém zařízení může vydávat pouze osoba znalá.",
    zdroj: "NV č. 190/2022 Sb., § 2 písm. h)",
    stav: "overeno"
  },
  {
    id: "K3-02",
    kapitola: "k3-organizace",
    text: "Práce s dohledem se provádí podle podrobnějších pokynů. Osoba vykonávající dohled se před zahájením přesvědčí, že jsou provedena bezpečnostní opatření, a podle potřeby kontroluje dodržování předpisů. Dohled smí vykonávat pouze osoba znalá.",
    zdroj: "NV č. 190/2022 Sb., § 2 písm. i)",
    stav: "overeno"
  },
  {
    id: "K3-03",
    kapitola: "k3-organizace",
    text: "Práce pod dozorem se provádí za trvalé přítomnosti osoby pověřené dozorem. Dozor smí vykonávat pouze osoba znalá.",
    zdroj: "NV č. 190/2022 Sb., § 2 písm. j)",
    stav: "overeno"
  },
  {
    id: "K3-04",
    kapitola: "k3-organizace",
    text: "Osoba poučená smí samostatně obsluhovat elektrické zařízení bez omezení napětí (dotýká se jen částí určených k obsluze), pracovat podle pokynů na zařízeních malého a nízkého napětí bez napětí a v jejich blízkosti a pracovat s dohledem na zařízeních vysokého napětí bez napětí a v jejich blízkosti.",
    zdroj: "NV č. 194/2022 Sb., § 4 odst. 4 písm. a) až c)",
    stav: "overeno"
  },
  {
    id: "K3-05",
    kapitola: "k3-organizace",
    text: "V blízkosti nekrytých živých částí nízkého napětí pod napětím smí osoba poučená pracovat s dohledem osoby znalé, v bezpečné vzdálenosti nebo až na dotyk s izolačním krytem. V blízkosti nekrytých živých částí vysokého napětí smí pracovat jen pod dozorem osoby znalé.",
    zdroj: "NV č. 194/2022 Sb., § 4 odst. 4 písm. d) a e)",
    stav: "overeno"
  },
  {
    id: "K3-06",
    kapitola: "k3-organizace",
    text: "Osoba poučená smí vykonávat i práci ve zvláštních případech, pro které provozovatel vydal zvláštní pracovní postup. Musí s ním být předem a opakovaně seznámena a prakticky zacvičena; o seznámení se pořizuje zápis.",
    zdroj: "NV č. 194/2022 Sb., § 4 odst. 4 písm. f)",
    stav: "overeno"
  },
  {
    id: "K3-07",
    kapitola: "k3-organizace",
    text: "Před zahájením práce nebo obsluhy vyhrazeného elektrického zařízení se vyhodnotí elektrické riziko a stanoví, jak se práce provede a jaká bezpečnostní opatření se přijmou.",
    zdroj: "NV č. 190/2022 Sb., § 8 písm. b)",
    stav: "overeno"
  },
  {
    id: "K3-08",
    kapitola: "k3-organizace",
    text: "Provozovatel písemně (listinně nebo elektronicky) pověří fyzickou osobu odpovědnou za elektrické zařízení, jejíž povinností je zajistit bezpečný provoz vyhrazeného elektrického zařízení.",
    zdroj: "NV č. 190/2022 Sb., § 8 písm. d)",
    stav: "overeno"
  },
  {
    id: "K3-09",
    kapitola: "k3-organizace",
    text: "Pro každou práci na vyhrazeném elektrickém zařízení se stanoví vedoucí práce, který ji řádně zajistí. Před zahájením se provede rozbor složitosti práce, aby byla zvolena osoba s vhodnou odbornou způsobilostí. Vedoucím práce může být pouze osoba znalá.",
    zdroj: "NV č. 190/2022 Sb., § 8 písm. e)",
    stav: "overeno"
  },
  {
    id: "K3-10",
    kapitola: "k3-organizace",
    text: "Odpovědná osoba je pověřená osoba provozovatele, která odpovídá za bezpečný provoz elektrického zařízení, stanoví pravidla činností a organizaci místa práce. Kontroluje, že činnosti vykonávají jen odborně způsobilé osoby, a část svých činností může delegovat.",
    zdroj: "NV č. 194/2022 Sb., § 2 písm. f) a § 3 odst. 3",
    stav: "overeno"
  },
  {
    id: "K3-11",
    kapitola: "k3-organizace",
    text: "Práce na vyhrazeném elektrickém zařízení smí provádět jen odborně způsobilá osoba vybavená potřebnými osobními ochrannými pracovními prostředky a seznámená s jejich používáním. O seznámení se pořizuje zápis podepsaný oběma stranami.",
    zdroj: "NV č. 190/2022 Sb., § 7 odst. 6",
    stav: "overeno"
  },
  {
    id: "K3-12",
    kapitola: "k3-organizace",
    text: "Každá osoba, která vykonává činnosti na vyhrazeném elektrickém zařízení, s ním nebo v jeho blízkosti, musí být školena o předpisech BOZP včetně místních provozních bezpečnostních předpisů týkajících se její činnosti.",
    zdroj: "NV č. 190/2022 Sb., § 8 písm. c)",
    stav: "overeno"
  },
  {
    id: "K3-13",
    kapitola: "k3-organizace",
    text: "Prací na vyhrazeném elektrickém zařízení se rozumí montáž, demontáž, oprava, prohlídka, kontrola, údržba, zkoušení, měření a revize a také všechny úkony pro zajištění a odjištění pracoviště.",
    zdroj: "NV č. 190/2022 Sb., § 2 písm. b)",
    stav: "overeno"
  },
  {
    id: "K3-14",
    kapitola: "k3-organizace",
    text: "Žáci a studenti elektrotechnických oborů smějí při praktické výuce vykonávat jen činnosti odpovídající jejich postupně nabývaným znalostem, vždy pod vedením určené osoby s odpovídající odbornou způsobilostí, a musí být předem zaškoleni a ověřeni.",
    zdroj: "NV č. 194/2022 Sb., § 3 odst. 5",
    stav: "overeno"
  },
  {
    id: "K3-15",
    kapitola: "k3-organizace",
    text: "Zaměstnavatel je povinen zajistit zaměstnancům školení o právních a ostatních předpisech k zajištění BOZP, které doplňují jejich odborné předpoklady a vztahují se k vykonávané práci.",
    zdroj: "zákoník práce (zákon č. 262/2006 Sb.), § 103 odst. 2",
    stav: "overit"
  },

  // ───────── Kapitola 4: Bezpečná práce na elektrických zařízeních ─────────
  {
    id: "K4-01",
    kapitola: "k4-bezpecna-prace",
    text: "Norma ČSN EN 50110-1 (Obsluha a práce na elektrických zařízeních) platí pro obsluhu a všechny práce na elektrických zařízeních, s nimi a v jejich blízkosti od malého až po vysoké napětí, včetně neelektrických prací v blízkosti venkovních vedení a kabelů, pokud hrozí elektrické nebezpečí.",
    zdroj: "EN 50110-1:2023, rozsah platnosti (popis normy BSI a EVS)",
    stav: "overeno",
    pozn: "Aktuální evropské vydání je EN 50110-1:2023. Označení českého vydání (edice) ověřit."
  },
  {
    id: "K4-02",
    kapitola: "k4-bezpecna-prace",
    text: "Rozlišují se tři pracovní postupy: práce bez napětí, práce pod napětím a práce v blízkosti živých částí. Upřednostňovaným postupem je práce bez napětí.",
    zdroj: "ČSN EN 50110-1, kap. 6",
    stav: "overit"
  },
  {
    id: "K4-03",
    kapitola: "k4-bezpecna-prace",
    text: "Pět základních pravidel práce bez napětí se provádí v tomto pořadí: 1. vypnutí (odpojení ve všech pólech), 2. zajištění proti opětovnému zapnutí, 3. ověření beznapěťového stavu, 4. uzemnění a zkratování, 5. ochrana před sousedními živými částmi.",
    zdroj: "ČSN EN 50110-1 – ověřeno v materiálech DEHN a SEW-Eurodrive k EN 50110-1",
    stav: "overeno"
  },
  {
    id: "K4-04",
    kapitola: "k4-bezpecna-prace",
    text: "Beznapěťový stav se ověřuje vhodnou zkoušečkou nebo měřicím přístrojem ve všech pólech. Správná funkce zkoušečky se ověří před jejím použitím.",
    zdroj: "ČSN EN 50110-1 – ověřeno v materiálech DEHN k pěti pravidlům",
    stav: "overeno"
  },
  {
    id: "K4-05",
    kapitola: "k4-bezpecna-prace",
    text: "Při uzemňování a zkratování se části nejdřív uzemní a teprve potom zkratují. Používají se uzemňovací a zkratovací soupravy odolné zkratovým proudům.",
    zdroj: "ČSN EN 50110-1 – ověřeno v materiálech DEHN k pěti pravidlům",
    stav: "overeno"
  },
  {
    id: "K4-06",
    kapitola: "k4-bezpecna-prace",
    text: "Zajištění proti opětovnému zapnutí u nízkého napětí lze provést například vyjmutím pojistek a vložením blokovacích prvků místo nich.",
    zdroj: "ČSN EN 50110-1 – ověřeno v materiálech DEHN k pěti pravidlům",
    stav: "overeno"
  },
  {
    id: "K4-07",
    kapitola: "k4-bezpecna-prace",
    text: "Sousední živé části jsou části v pásmu práce v blízkosti. Nelze-li je odpojit, chrání se izolačními kryty nebo zakrývacím materiálem proti náhodnému dotyku.",
    zdroj: "ČSN EN 50110-1 – ověřeno v materiálech DEHN k pěti pravidlům",
    stav: "overeno"
  },
  {
    id: "K4-08",
    kapitola: "k4-bezpecna-prace",
    text: "Kolem živé části se rozlišuje pásmo práce pod napětím (od holé živé části po vzdálenost DL) a pásmo práce v blízkosti (od DL po vzdálenost DV).",
    zdroj: "EN 50110-1:2023, definice pásem (text návrhu změny EN 50110-1:2023/prA1:2026)",
    stav: "overeno"
  },
  {
    id: "K4-09",
    kapitola: "k4-bezpecna-prace",
    text: "Pro nízké napětí do 1 kV se uvádí DL jako „bez dotyku“ a DV přibližně 0,3 m.",
    zdroj: "ČSN EN 50110-1, příloha A (tabulka DL a DV)",
    stav: "overit"
  },
  {
    id: "K4-10",
    kapitola: "k4-bezpecna-prace",
    text: "Práce pod napětím smějí vykonávat jen osoby k tomu zvlášť vyškolené, s vhodným izolovaným nářadím a ochrannými prostředky a podle stanovených postupů; používá se tam, kde vypnutí není rozumně možné.",
    zdroj: "ČSN EN 50110-1, čl. 6.3",
    stav: "overit"
  },
  {
    id: "K4-11",
    kapitola: "k4-bezpecna-prace",
    text: "Po ukončení práce se zařízení smí znovu uvést pod napětí až po odstranění uzemňovacích a zkratovacích souprav, odchodu všech osob z místa práce a ohlášení ukončení práce osobě, která pracoviště předala.",
    zdroj: "ČSN EN 50110-1, čl. 6.2",
    stav: "overit"
  },
  {
    id: "K4-12",
    kapitola: "k4-bezpecna-prace",
    text: "Ochranná pomůcka chrání osobu před nebezpečnými účinky elektřiny nebo před jiným ohrožením; pracovní pomůcka je nástroj nebo předmět potřebný k práci na elektrickém zařízení.",
    zdroj: "výukový materiál ČVUT FEL k ČSN EN 50110-1 (A. Grošpic)",
    stav: "overeno"
  },
  {
    id: "K4-13",
    kapitola: "k4-bezpecna-prace",
    text: "Obsluhou elektrického zařízení se rozumí spínání, regulování, odečítání údajů trvale namontovaných přístrojů, výměna závitových a přístrojových pojistek a žárovek a prohlídka elektrického zařízení.",
    zdroj: "výukový materiál ČVUT FEL k ČSN EN 50110-1 (A. Grošpic)",
    stav: "overeno",
    pozn: "Vymezení převzaté z výukového materiálu; znění v aktuální normě ověřit."
  },
  {
    id: "K4-14",
    kapitola: "k4-bezpecna-prace",
    text: "EN 50110-1:2023 je třetí vydání evropské normy; nahradilo vydání z roku 2013 a změny proti němu jsou malé.",
    zdroj: "BSI, expert commentary k BS EN 50110-1:2023",
    stav: "overeno"
  },

  // ───────── Kapitola 5: Účinky proudu a první pomoc ─────────
  {
    id: "K5-01",
    kapitola: "k5-prvni-pomoc",
    text: "Při resuscitaci dospělého se hrudník stlačuje frekvencí 100 až 120 za minutu do hloubky nejméně 5 cm a nejvýše 6 cm. Se stlačováním se začíná co nejdříve.",
    zdroj: "ERC Guidelines 2025 – Adult Basic Life Support",
    stav: "overeno"
  },
  {
    id: "K5-02",
    kapitola: "k5-prvni-pomoc",
    text: "Vyškolený zachránce střídá 30 stlačení hrudníku a 2 umělé vdechy (poměr 30 : 2).",
    zdroj: "doporučení ERC (poměr 30 : 2 platí od roku 2005, potvrzen ve vydáních 2015 a 2025)",
    stav: "overeno"
  },
  {
    id: "K5-03",
    kapitola: "k5-prvni-pomoc",
    text: "Přerušení stlačování hrudníku má být co nejkratší; při výcviku se za přijatelné považuje přerušení nejvýše 10 sekund.",
    zdroj: "výukový standard BLS podle ERC (BMC Medical Education, 2016)",
    stav: "overeno"
  },
  {
    id: "K5-04",
    kapitola: "k5-prvni-pomoc",
    text: "Kdo neumí nebo nechce dýchat z úst do úst, provádí nepřerušované stlačování hrudníku.",
    zdroj: "doporučení ERC pro laiky",
    stav: "overit"
  },
  {
    id: "K5-05",
    kapitola: "k5-prvni-pomoc",
    text: "Automatizovaný externí defibrilátor (AED) se použije co nejdříve; zachránce postupuje podle jeho hlasových pokynů a stlačování přerušuje jen na dobu analýzy a výboje.",
    zdroj: "ERC Guidelines 2025 – Adult Basic Life Support",
    stav: "overit"
  },
  {
    id: "K5-06",
    kapitola: "k5-prvni-pomoc",
    text: "Před dotykem postiženého u zařízení nízkého napětí je nutné ho vyprostit z dosahu proudu: vypnout zdroj (vypínač, jistič, vytažení vidlice), nebo ho odsunout nevodivým předmětem bez přímého dotyku.",
    zdroj: "zásady první pomoci při úrazu elektrickým proudem",
    stav: "overit"
  },
  {
    id: "K5-07",
    kapitola: "k5-prvni-pomoc",
    text: "K postiženému u zařízení vysokého napětí se zachránce nesmí přiblížit, dokud zařízení není vypnuto a zajištěno.",
    zdroj: "zásady první pomoci při úrazu elektrickým proudem",
    stav: "overit"
  },
  {
    id: "K5-08",
    kapitola: "k5-prvni-pomoc",
    text: "Účinky elektrického proudu na člověka závisejí hlavně na velikosti proudu, době jeho průchodu, dráze proudu tělem a druhu proudu (střídavý nebo stejnosměrný, frekvence).",
    zdroj: "ČSN IEC/TS 60479-1",
    stav: "overit"
  },
  {
    id: "K5-09",
    kapitola: "k5-prvni-pomoc",
    text: "Proudy asi 10 až 30 mA zpravidla nezpůsobí smrt, ale při delším působení jsou nebezpečné; proudy nad 30 mA mohou být smrtelné, pokud nedojde k rychlému odpojení. Z toho vychází citlivost doplňkových proudových chráničů 30 mA.",
    zdroj: "výukový materiál SEZ (Štěpán, Ochrana proudovými chrániči)",
    stav: "overeno"
  },
  {
    id: "K5-10",
    kapitola: "k5-prvni-pomoc",
    text: "I když postižený po úrazu elektrickým proudem působí zdravě, má být vyšetřen lékařem, protože hrozí pozdní poruchy srdečního rytmu.",
    zdroj: "zásady první pomoci při úrazu elektrickým proudem",
    stav: "overit"
  },
  {
    id: "K5-11",
    kapitola: "k5-prvni-pomoc",
    text: "Tísňová čísla v ČR: 155 zdravotnická záchranná služba, 112 jednotné evropské číslo tísňového volání.",
    zdroj: "integrovaný záchranný systém ČR",
    stav: "overit"
  },

  // ───────── Kapitola 6: Ochrana před úrazem elektrickým proudem ─────────
  {
    id: "K6-01",
    kapitola: "k6-ochrana",
    text: "Ochranné opatření se skládá ze základní ochrany (před dotykem živých částí) a z ochrany při poruše. Doplňkovou ochranou je proudový chránič s IΔn nejvýše 30 mA a doplňující ochranné pospojování.",
    zdroj: "ČSN 33 2000-4-41 ed. 3, čl. 410",
    stav: "overit"
  },
  {
    id: "K6-02",
    kapitola: "k6-ochrana",
    text: "Nejdelší doby automatického odpojení v koncových obvodech při napětí proti zemi 230 V: v síti TN 0,4 s, v síti TT 0,2 s.",
    zdroj: "ČSN 33 2000-4-41 ed. 3, tabulka 41.1 – ověřeno ve výukových materiálech ZČU FEL a SEZ a v IEC 60364-4-41",
    stav: "overeno",
    pozn: "Rozsah koncových obvodů, pro které tabulka platí (jmenovitý proud), ověřit v aktuálním znění normy."
  },
  {
    id: "K6-03",
    kapitola: "k6-ochrana",
    text: "V distribučních obvodech se připouští doba automatického odpojení nejvýše 5 s v síti TN a nejvýše 1 s v síti TT.",
    zdroj: "ČSN 33 2000-4-41 ed. 3, čl. 411.3.2 – ověřeno ve výukovém materiálu ZČU FEL a v IEC 60364-4-41",
    stav: "overeno"
  },
  {
    id: "K6-04",
    kapitola: "k6-ochrana",
    text: "Harmonizační dokument HD 60364-4-41:2017 rozšířil povinnou doplňkovou ochranu proudovým chráničem s IΔn nejvýše 30 mA na zásuvkové obvody do 32 A.",
    zdroj: "HD 60364-4-41:2017 (náhled STN 33 2000-4-41:2018)",
    stav: "overeno",
    pozn: "České vydání ČSN 33 2000-4-41 ed. 3 přejímá HD 60364-4-41:2017 – přesné znění článku ověřit."
  },
  {
    id: "K6-05",
    kapitola: "k6-ochrana",
    text: "HD 60364-4-41:2017 nově požaduje proudový chránič s IΔn nejvýše 30 mA i pro světelné obvody v bytech.",
    zdroj: "HD 60364-4-41:2017, čl. 411.3.4",
    stav: "overit"
  },
  {
    id: "K6-06",
    kapitola: "k6-ochrana",
    text: "Proudový chránič se nesmí použít v síti TN-C. V síti TN-C-S se na straně zátěže za proudovým chráničem nesmí použít vodič PEN.",
    zdroj: "ČSN 33 2000-4-41 – ověřeno ve výukovém materiálu ZČU FEL",
    stav: "overeno"
  },
  {
    id: "K6-07",
    kapitola: "k6-ochrana",
    text: "Proudový chránič porovnává proudy v pracovních vodičích součtovým transformátorem. Vybaví, když část proudu odtéká mimo chránič, například přes tělo člověka nebo ochranný vodič.",
    zdroj: "výukový materiál SEZ (Štěpán, Ochrana proudovými chrániči)",
    stav: "overeno"
  },
  {
    id: "K6-08",
    kapitola: "k6-ochrana",
    text: "Proudový chránič s IΔn 30 mA se nepovažuje za jediné ochranné opatření; je doplňkovou ochranou k základní ochraně a ochraně při poruše.",
    zdroj: "výukový materiál SEZ (Štěpán, Ochrana proudovými chrániči)",
    stav: "overeno"
  },
  {
    id: "K6-09",
    kapitola: "k6-ochrana",
    text: "Třídy ochrany elektrických předmětů: I – základní izolace a svorka pro ochranný vodič; II – dvojitá nebo zesílená izolace bez ochranného vodiče; III – napájení malým napětím SELV nebo PELV.",
    zdroj: "ČSN EN 61140",
    stav: "overit"
  },
  {
    id: "K6-10",
    kapitola: "k6-ochrana",
    text: "SELV a PELV jsou obvody malého napětí do 50 V AC nebo 120 V DC (bez zvlnění). Obvody SELV nejsou spojeny se zemí, obvody PELV uzemněny být mohou.",
    zdroj: "ČSN 33 2000-4-41 ed. 3, čl. 414",
    stav: "overit"
  },
  {
    id: "K6-11",
    kapitola: "k6-ochrana",
    text: "Ochrana elektrickým oddělením napájí obvod z oddělovacího zdroje (oddělovacího transformátoru); obvykle se z něj napájí jen jeden spotřebič.",
    zdroj: "ČSN 33 2000-4-41 ed. 3, čl. 413",
    stav: "overit"
  },
  {
    id: "K6-12",
    kapitola: "k6-ochrana",
    text: "Značkou třídy ochrany II (dvojitá izolace) jsou dva soustředné čtverce.",
    zdroj: "ČSN EN 61140, ČSN EN 60417",
    stav: "overit"
  },

  // ───────── Kapitola 7: Sítě, uzemnění a značení vodičů ─────────
  {
    id: "K7-01",
    kapitola: "k7-site-vodice",
    text: "Označení sítí: první písmeno udává vztah zdroje k zemi (T – přímo uzemněný bod, I – izolovaný nebo uzemněný přes impedanci), druhé vztah neživých částí k zemi (T – samostatně uzemněné, N – spojené s uzemněným bodem zdroje). U sítí TN znamená C sloučení funkcí N a PE ve vodiči PEN a S oddělené vodiče N a PE.",
    zdroj: "ČSN 33 2000-1 ed. 2",
    stav: "overit"
  },
  {
    id: "K7-02",
    kapitola: "k7-site-vodice",
    text: "Distribuční sítě nízkého napětí dodavatele elektřiny jsou typu TN-C, výjimečně TN-C-S.",
    zdroj: "výukový materiál ZČU FEL (Sítě nn v rozvodech nn)",
    stav: "overeno"
  },
  {
    id: "K7-03",
    kapitola: "k7-site-vodice",
    text: "Vodič PEN se v instalaci rozděluje na ochranný vodič PE a střední vodič N; za místem rozdělení se už nesmějí znovu spojit.",
    zdroj: "ČSN 33 2000-5-54 ed. 3",
    stav: "overit"
  },
  {
    id: "K7-04",
    kapitola: "k7-site-vodice",
    text: "Barvy izolace: ochranný vodič PE zelenožlutá, střední vodič N světle modrá, fázové vodiče hnědá, černá a šedá.",
    zdroj: "ČSN 33 0165 ed. 2 a ČSN EN 60445 – ověřeno ve výukových materiálech ČVUT a VŠB",
    stav: "overeno"
  },
  {
    id: "K7-05",
    kapitola: "k7-site-vodice",
    text: "Kombinace zelené a žluté barvy je vyhrazena pro ochranné vodiče a nesmí se použít k jinému účelu.",
    zdroj: "ČSN 33 0165 ed. 2 – ověřeno ve výukovém materiálu ČVUT FSv",
    stav: "overeno"
  },
  {
    id: "K7-06",
    kapitola: "k7-site-vodice",
    text: "Vodič PEN se značí zelenožlutě se světle modrými značkami na koncích, nebo světle modře se zelenožlutými značkami na koncích.",
    zdroj: "ČSN 33 0165 ed. 2 a ČSN EN 60445 – ověřeno ve výukovém materiálu VŠB",
    stav: "overeno"
  },
  {
    id: "K7-07",
    kapitola: "k7-site-vodice",
    text: "Pětižilový kabel se zelenožlutou žílou má žíly zelenožlutou, modrou, hnědou, černou a šedou.",
    zdroj: "ČSN 33 0166 ed. 2, tabulka 1 – ověřeno ve výukovém materiálu SPŠ a VOŠ Liberec",
    stav: "overeno"
  },
  {
    id: "K7-08",
    kapitola: "k7-site-vodice",
    text: "Má-li vodič funkci ochranného i středního vodiče (PEN), má přednost funkce ochranná.",
    zdroj: "ČSN 33 2000-5-54 ed. 3",
    stav: "overit"
  },
  {
    id: "K7-09",
    kapitola: "k7-site-vodice",
    text: "V síti TT se neživé části elektrického zařízení nesmějí připojovat na střední vodič.",
    zdroj: "ČSN 33 2000-4-41 – ověřeno ve výukovém materiálu ZČU FEL",
    stav: "overeno"
  },
  {
    id: "K7-10",
    kapitola: "k7-site-vodice",
    text: "V síti IT je při první poruše mezi živou částí a zemí poruchový proud malý a odpojení se nevyžaduje.",
    zdroj: "ČSN 33 2000-4-41 – ověřeno ve výukovém materiálu ZČU FEL",
    stav: "overeno"
  },
  {
    id: "K7-11",
    kapitola: "k7-site-vodice",
    text: "V síti IT stav izolace sleduje hlídač izolačního stavu, aby se první porucha odhalila dřív, než nastane druhá.",
    zdroj: "ČSN 33 2000-4-41 ed. 3, čl. 411.6",
    stav: "overit"
  },
  {
    id: "K7-12",
    kapitola: "k7-site-vodice",
    text: "Ochranný vodič PE ani vodič PEN se nesmí samostatně jistit ani spínat.",
    zdroj: "ČSN 33 2000-5-54 ed. 3",
    stav: "overit"
  },

  // ───────── Kapitola 8: Vnější vlivy, krytí a zvláštní prostory ─────────
  {
    id: "K8-01",
    kapitola: "k8-prostory",
    text: "Součástí průvodní dokumentace vyhrazeného elektrického zařízení je posouzení vnějších vlivů. Protokol o určení vnějších vlivů je podkladem pro výchozí i pravidelnou revizi.",
    zdroj: "NV č. 190/2022 Sb., § 6 odst. 3 a příloha č. 2",
    stav: "overeno"
  },
  {
    id: "K8-02",
    kapitola: "k8-prostory",
    text: "Při prohlídce v rámci revize se kontroluje volba zařízení a ochranných opatření s ohledem na vnější vlivy a oprávněnost zatřídění a označení prostorů.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 1, část A písm. f)",
    stav: "overeno"
  },
  {
    id: "K8-03",
    kapitola: "k8-prostory",
    text: "Elektrické zařízení v prostorách s teplotou okolí nad +55 °C, s tryskající vodou a možností ponoření, s trvalým výskytem korozivních a znečišťujících látek nebo s nebezpečím požáru hořlavých kapalin patří do I. třídy, pokud to vyplývá z projektové nebo provozní dokumentace.",
    zdroj: "NV č. 190/2022 Sb., § 4 odst. 1 písm. a)",
    stav: "overeno"
  },
  {
    id: "K8-04",
    kapitola: "k8-prostory",
    text: "Rozsah odborné způsobilosti se stanoví i podle druhu zařízení (bez nebezpečí výbuchu, nebo s nebezpečím výbuchu). Doklad pro objekty bez nebezpečí výbuchu proto nepokrývá zařízení v prostředí s nebezpečím výbuchu.",
    zdroj: "NV č. 194/2022 Sb., § 7 odst. 6 a 7",
    stav: "overeno"
  },
  {
    id: "K8-05",
    kapitola: "k8-prostory",
    text: "Stupeň ochrany krytem se označuje kódem IP se dvěma číslicemi: první (0–6) udává ochranu před vniknutím cizích pevných těles a před dotykem nebezpečných částí, druhá (0–9) ochranu před vniknutím vody.",
    zdroj: "ČSN EN 60529",
    stav: "overit"
  },
  {
    id: "K8-06",
    kapitola: "k8-prostory",
    text: "Příklady IP: IP2X – tělesa nad 12,5 mm, ochrana před dotykem prstem; IP4X – tělesa nad 1 mm; IP5X – ochrana před prachem; IP6X – prachotěsné; IPX4 – stříkající voda; IPX5 – tryskající voda; IPX7 – dočasné ponoření.",
    zdroj: "ČSN EN 60529",
    stav: "overit"
  },
  {
    id: "K8-07",
    kapitola: "k8-prostory",
    text: "Vnější vlivy se značí kódem ze dvou písmen a číslice: první písmeno udává kategorii (A – prostředí, B – využití, C – konstrukce budov), druhé druh vlivu (například AD – voda) a číslice třídu.",
    zdroj: "ČSN 33 2000-5-51 ed. 3",
    stav: "overit"
  },
  {
    id: "K8-08",
    kapitola: "k8-prostory",
    text: "V prostorech s vanou nebo sprchou se rozlišují zóny 0, 1 a 2; zóna 0 je vnitřek vany nebo sprchové vaničky. Pro jednotlivé zóny platí omezení druhu zařízení a minimální stupeň krytí.",
    zdroj: "ČSN 33 2000-7-701 ed. 2",
    stav: "overit"
  },
  {
    id: "K8-09",
    kapitola: "k8-prostory",
    text: "Obvody v prostorech s vanou nebo sprchou musí být chráněny proudovým chráničem s IΔn nejvýše 30 mA.",
    zdroj: "ČSN 33 2000-7-701 ed. 2",
    stav: "overit"
  },

  // ───────── Kapitola 9: Revize a měření v praxi ─────────
  {
    id: "K9-01",
    kapitola: "k9-revize-mereni",
    text: "Zkoušky a měření při revizi se provádějí v tomto pořadí: spojitost ochranných vodičů a vodičů pospojování; izolační stav; ochrana oddělením obvodů a SELV/PELV; izolační odpor podlahy a stěn; automatické odpojení od zdroje; zkouška zapojení přístrojů; zkouška elektrické pevnosti; funkční zkouška; tepelné účinky; úbytek napětí; zkouška polarity; pořadí fází.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 1, část B bod I",
    stav: "overeno"
  },
  {
    id: "K9-02",
    kapitola: "k9-revize-mereni",
    text: "Prohlídka předchází zkoušce. Kontroluje se mimo jiné ochrana před úrazem, protipožární přepážky, volba vodičů podle zatížitelnosti a úbytku napětí, nastavení ochranných prvků, spínací prvky, vnější vlivy, označení středních a ochranných vodičů, schémata a výstražné nápisy, označení obvodů, spoje vodičů a přístupnost.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 1, část A",
    stav: "overeno"
  },
  {
    id: "K9-03",
    kapitola: "k9-revize-mereni",
    text: "Funkčně se zkoušejí hlídače izolačního stavu a proudové chrániče (zkušebním tlačítkem nebo postupem výrobce či normy), bezpečnostní zařízení jako nouzové vypnutí a blokování, hlásiče a ukazatele stavu a přepěťové ochrany. Elektrická pevnost izolace se zkouší jen tehdy, nemají-li použité výrobky vlastnosti doložené výrobcem.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 1, část B bod II",
    stav: "overeno"
  },
  {
    id: "K9-04",
    kapitola: "k9-revize-mereni",
    text: "Podklady pro výchozí revizi jsou mimo jiné dokumentace skutečného provedení s technickou zprávou, protokol o určení vnějších vlivů, záznamy o prohlídkách a zkouškách během montáže, protokoly o kusovém ověřování zabudovaných výrobků a identifikace montážní firmy včetně čísla oprávnění.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 2, část A bod I",
    stav: "overeno"
  },
  {
    id: "K9-05",
    kapitola: "k9-revize-mereni",
    text: "Podklady pro pravidelnou a mimořádnou revizi jsou provozní a výkresová dokumentace, protokol o vnějších vlivech, záznamy o prohlídkách, zkouškách a závadách, zpráva o předchozí revizi, doklady o kontrolách inspekce práce, u zařízení I. třídy osvědčení pověřené organizace a u mimořádné revize doklad o jejím důvodu.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 2, část A bod II",
    stav: "overeno"
  },
  {
    id: "K9-06",
    kapitola: "k9-revize-mereni",
    text: "Při výchozí revizi se kontroluje shoda skutečného provedení s projektovou a průvodní dokumentací a její úplnost, provede se prohlídka z hlediska vnějších vlivů, prohlídka a zkouška stavu zařízení a potřebná měření s vyhodnocením.",
    zdroj: "NV č. 190/2022 Sb., příloha č. 2, část B bod I",
    stav: "overeno"
  },
  {
    id: "K9-07",
    kapitola: "k9-revize-mereni",
    text: "Při revizi se provede prohlídka a zkouška v rozsahu přílohy č. 1, pokud výrobce nestanovil odlišné nebo další požadavky. Bod, který není technicky proveditelný nebo není z hlediska bezpečnosti důvodný, se provádět nemusí.",
    zdroj: "NV č. 190/2022 Sb., § 7 odst. 3",
    stav: "overeno"
  },
  {
    id: "K9-08",
    kapitola: "k9-revize-mereni",
    text: "Izolační odpor obvodů do 500 V se měří stejnosměrným napětím 500 V a nejmenší přípustná hodnota je 1 MΩ.",
    zdroj: "ČSN 33 2000-6 ed. 2",
    stav: "overit"
  },
  {
    id: "K9-09",
    kapitola: "k9-revize-mereni",
    text: "Ruční nářadí a spotřebiče do 400 V, které nejsou určeny k pevnému připojení, nejsou vyhrazenými elektrickými zařízeními, takže se na ně nevztahují revize podle NV č. 190/2022 Sb.",
    zdroj: "NV č. 190/2022 Sb., § 3 odst. 2 písm. a)",
    stav: "overeno"
  },
  {
    id: "K9-10",
    kapitola: "k9-revize-mereni",
    text: "Kontroly ručního elektrického nářadí během používání upravuje ČSN 33 1600 ed. 2, kontroly elektrických spotřebičů během používání ČSN 33 1610.",
    zdroj: "ČSN 33 1600 ed. 2, ČSN 33 1610",
    stav: "overit"
  },
  {
    id: "K9-11",
    kapitola: "k9-revize-mereni",
    text: "Měřením impedance poruchové smyčky se ověřuje, zda při poruše proteče dostatečný proud, aby ochranný prvek odpojil v předepsané době.",
    zdroj: "ČSN 33 2000-6 ed. 2",
    stav: "overit"
  }
];
