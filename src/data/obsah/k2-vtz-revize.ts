// Kapitola 2 – Vyhrazená elektrická zařízení a revize.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k2-vtz-revize" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "vez", nazev: "Co je a co není vyhrazené elektrické zařízení" },
    { id: "tridy", nazev: "Třídy vyhrazených elektrických zařízení" },
    { id: "opravneni", nazev: "Oprávnění a osvědčení" },
    { id: "revize", nazev: "Revize a lhůty" },
    { id: "provozovatel", nazev: "Povinnosti provozovatele a zpráva o revizi" }
  ],

  lekce: [
    {
      id: "k2-l01",
      podtema: "vez",
      nadpis: "Vyhrazené technické a elektrické zařízení",
      text: md(
        "Zákon č. 250/2021 Sb. nazývá **vyhrazeným technickým zařízením (VTZ)** tlakové, zdvihací, elektrické nebo plynové zařízení, které svým charakterem nebo akumulovanou energií, nesprávným použitím nebo provozními riziky představuje **závažné riziko** pro život, zdraví a bezpečnost osob.",
        "",
        "Která elektrická zařízení jsou vyhrazená, upřesňuje **nařízení vlády č. 190/2022 Sb.** Patří sem zařízení:",
        "- pro výrobu, přeměnu, přenos, rozvod, distribuci a odběr elektrické energie,",
        "- elektrické instalace staveb a technologií,",
        "- k ochraně před účinky atmosférické nebo statické elektřiny.",
        "",
        "Běžná elektroinstalace budovy i ochrana před bleskem jsou tedy vyhrazená elektrická zařízení se všemi povinnostmi, které k nim patří."
      ),
      fakta: ["K2-01", "K2-02"]
    },
    {
      id: "k2-l02",
      podtema: "vez",
      nadpis: "Co vyhrazeným elektrickým zařízením není",
      text: md(
        "Nařízení vlády č. 190/2022 Sb. výslovně vyjímá:",
        "- **ruční elektromechanické nářadí, elektronické přístroje a spotřebiče do 400 V včetně**, pokud nejsou určeny k pevnému připojení,",
        "- **prodlužovací šňůry a odpojitelné přívody**,",
        "- **zdravotnické elektrické přístroje**,",
        "- **elektrické zařízení strojního zařízení**, které je výrobkem podle zákona č. 22/1997 Sb.",
        "",
        "U spotřebičů rozhoduje napětí a způsob připojení. Vrtačka do zásuvky 230 V vyhrazeným zařízením není, a proto se na ni nevztahují revize podle NV č. 190/2022 Sb. Spotřebič určený k pevnému připojení výjimku nemá.",
        "",
        "Výjimka neznamená, že se nářadí nekontroluje. Kontroly ručního nářadí a spotřebičů během používání upravují normy ČSN 33 1600 ed. 2 a ČSN 33 1610."
      ),
      fakta: ["K2-03", "K9-09", "K9-10"]
    },
    {
      id: "k2-l03",
      podtema: "tridy",
      nadpis: "I. a II. třída",
      text: md(
        "Vyhrazená elektrická zařízení se dělí do dvou tříd. Do **I. třídy** patří mimo jiné:",
        "- zařízení pro prostředí s **nebezpečím výbuchu**,",
        "- zařízení v objektu, který podle požárně bezpečnostního řešení umožňuje přítomnost **více než 200 osob**,",
        "- elektrické instalace ve **zdravotnických prostorech** (s výjimkami),",
        "- **ochrana před bleskem**, která tato zařízení chrání,",
        "- zařízení v prostorách s teplotou nad +55 °C, s tryskající vodou a možností ponoření, s trvalým výskytem korozivních a znečišťujících látek nebo s nebezpečím požáru hořlavých kapalin, vyplývá-li to z dokumentace.",
        "",
        "Všechna ostatní jsou **II. třídy**.",
        "",
        "Třída má praktický dopad: zařízení I. třídy lze uvést do provozu jen na základě **osvědčení pověřené organizace**, které provozovatel uchovává po celou dobu provozu."
      ),
      fakta: ["K2-04", "K8-03", "K2-05"]
    },
    {
      id: "k2-l04",
      podtema: "opravneni",
      nadpis: "Oprávnění a osvědčení",
      text: md(
        "Dva pojmy, které se snadno spletou:",
        "- **Oprávnění** dostává **firma** – právnická nebo podnikající fyzická osoba – k montáži, opravám, revizím a zkouškám. Vydává ho pověřená organizace a platí **10 let** od nabytí právní moci rozhodnutí.",
        "- **Osvědčení** dostává **revizní technik** jako osoba. Uděluje ho pověřená organizace po zkoušce s písemnou a ústní částí (v každé nejméně 80 %) a platí **5 let** od udělení.",
        "",
        "Revizi smí provést jen revizní technik s osvědčením v rozsahu, který odpovídá revidovanému zařízení. Dělá-li revize jako živnost, potřebuje navíc oprávnění.",
        "",
        "Doklad o zkoušce vedoucího elektrotechnika (platí 3 roky) je třetí, samostatný doklad – není to oprávnění ani osvědčení."
      ),
      fakta: ["K2-07", "K2-08", "K2-09", "K1-14"]
    },
    {
      id: "k2-l05",
      podtema: "opravneni",
      nadpis: "Kód oprávnění",
      text: md(
        "Rozsah oprávnění se zapisuje kódem ze tří částí:",
        "- **druh zařízení**: E1 – zařízení nízkého a vysokého napětí s uvedením rozsahu (do 35 kV, do 230 kV nebo bez omezení), E2 – zařízení nízkého napětí do 1 kV AC nebo 1,5 kV DC, E3 – ochrana před atmosférickou elektřinou, přepětím a statickou elektřinou,",
        "- **prostředí**: A – bez nebezpečí výbuchu, B – s nebezpečím výbuchu,",
        "- **činnost**: M – montáž, O – opravy, R – revize, Z – zkoušky.",
        "",
        "Kód **E2A** s činností R tedy znamená revize zařízení do 1 kV AC / 1,5 kV DC v prostorech bez nebezpečí výbuchu. Stejné rozsahy se objevují u praxe vedoucího elektrotechnika – E2A vyžaduje 2 roky, E1B 4 roky. Kód si složte v ilustraci."
      ),
      ilustrace: "kod-opravneni",
      fakta: ["K2-06", "K1-07"]
    },
    {
      id: "k2-l06",
      podtema: "revize",
      nadpis: "Co je revize a kdy se dělá",
      text: md(
        "**Revize** je posouzení provozní a technické bezpečnosti vyhrazeného technického zařízení **prohlídkou, zkouškou nebo měřením** – zda odpovídá předpisům bezpečnosti a ochrany zdraví při práci (BOZP).",
        "",
        "Revize se provádí:",
        "- po dokončení **montáže vždy**; dodavatel předá zprávu o výchozí revizi, není-li sjednáno jinak,",
        "- po **opravě nebo přemístění** podle potřeby,",
        "- při **změně parametrů** ochrany proti přetížení a zkratu, ochrany před úrazem elektrickým proudem nebo ochrany před atmosférickou a statickou elektřinou,",
        "- po **rekonstrukci** jako výchozí revize.",
        "",
        "Rozlišujte: **oprava** obnoví použitelný stav beze změny základních parametrů, **rekonstrukce** nahradí nevyhovující část novou nebo modernější a základní technické nebo bezpečnostní parametry mění."
      ),
      fakta: ["K2-10", "K2-11", "K2-12", "K2-29", "K2-30"]
    },
    {
      id: "k2-l07",
      podtema: "revize",
      nadpis: "Lhůty pravidelných revizí",
      text: md(
        "Nejdelší lhůty pravidelných revizí stanoví příloha č. 4 nařízení vlády č. 190/2022 Sb., například:",
        "- administrativa **5 let**; výroba, školy, ubytování a lékařské účely **3 roky**; objekt pro více než 200 osob **2 roky**,",
        "- mokré prostory a pojízdné prostředky **1 rok**, prozatímní zařízení staveniště **0,5 roku**,",
        "- ochrana před bleskem (LPS): **2 roky** u kritických systémů, jinak **4 roky**, a každý rok vizuální kontrola.",
        "",
        "Pravidla použití:",
        "- Platí-li více lhůt, použije se **nejkratší**.",
        "- Revize musí proběhnout v **roce, do kterého spadá konec lhůty**; neplatí to pro lhůty do 1 roku.",
        "- **Řád preventivní údržby** dovoluje lhůty až **dvojnásobné**.",
        "- Kratší lhůta **výrobce** má přednost před řádem prohlídek, údržby a revizí."
      ),
      ilustrace: "lhuty-revizi",
      fakta: ["K2-15", "K2-16", "K2-17", "K2-18", "K2-19", "K2-14"]
    },
    {
      id: "k2-l08",
      podtema: "provozovatel",
      nadpis: "Provoz a závady",
      text: md(
        "Vyhrazené elektrické zařízení se smí provozovat, jen když byl jeho stav ověřen prohlídkou, zkouškou, kontrolou a revizí ve lhůtách podle **řádu prohlídek, údržby a revizí**. Ten musí provozovatel zpracovat.",
        "",
        "Za **stav ohrožující bezpečnost práce a provozu** zákon považuje:",
        "- provoz bez doložené zprávy o revizi ve stanovené lhůtě a rozsahu,",
        "- provoz v rozporu s průvodní nebo provozní dokumentací,",
        "- chybějící vydanou průvodní nebo provozní dokumentaci.",
        "",
        "Závady z revize nebo kontroly, které ohrožují bezpečný a spolehlivý provoz, se odstraňují **bez zbytečného odkladu**, ostatní podle závažnosti. Při **bezprostředním ohrožení** se zařízení neprodleně odpojí od zdroje a zajistí proti připojení; nejde-li to, zajistí se oprava bez zbytečného odkladu."
      ),
      fakta: ["K2-13", "K2-23", "K2-22", "K2-21"]
    },
    {
      id: "k2-l09",
      podtema: "provozovatel",
      nadpis: "Zpráva o revizi",
      text: md(
        "Výsledkem revize je **zpráva o revizi**. Obsahuje mimo jiné:",
        "- provozovatele, identifikaci a místo zařízení a **rozsah revize**,",
        "- jméno, podpis a **evidenční číslo osvědčení** revizního technika,",
        "- **druh revize** – výchozí, pravidelná, nebo mimořádná s uvedením důvodu,",
        "- data, použité měřicí přístroje a **naměřené hodnoty**,",
        "- **závady s odkazem na porušené předpisy**,",
        "- slovní **celkové zhodnocení** a doporučenou **lhůtu příští revize**.",
        "",
        "Zpráva může být listinná nebo elektronická s uznávaným elektronickým podpisem. Dělá-li se výchozí revize po částech, vystaví se před trvalým provozem jedna **souhrnná zpráva**. Stav zařízení se posuzuje podle předpisů platných v době jeho **uvedení do provozu**, a to až do rekonstrukce."
      ),
      fakta: ["K2-20", "K2-27", "K2-28", "K2-24"]
    },
    {
      id: "k2-l10",
      podtema: "provozovatel",
      nadpis: "Prozatímní zařízení, havárie a dokumentace",
      text: md(
        "Další povinnosti provozovatele:",
        "- **Prozatímní zařízení** se v době, kdy se nepoužívá, **vypíná**, pokud tím není ohrožena bezpečnost. O ponechání v provozu rozhoduje **osoba odpovědná za elektrické zařízení**.",
        "- **Havárii** související s vyhrazeným technickým zařízením se škodou zjevně přesahující **5 000 000 Kč** ohlásí bez zbytečného odkladu **oblastnímu inspektorátu práce**.",
        "- Po montáži převezme od dodavatele **průvodní dokumentaci** odpovídající skutečnému provedení, jejíž součástí je **posouzení vnějších vlivů**, a zprávu o výchozí revizi, není-li sjednáno jinak.",
        "",
        "Dokumentaci je dobré mít stále po ruce: provoz bez vydané průvodní nebo provozní dokumentace zákon považuje za stav ohrožující bezpečnost."
      ),
      fakta: ["K2-25", "K2-26", "K2-12", "K2-23"]
    }
  ],

  otazky: [
    // ───────── Co je a co není vyhrazené elektrické zařízení ─────────
    {
      id: "k2-q01",
      kapitola: K,
      podtema: "vez",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Které z těchto zařízení je vyhrazeným elektrickým zařízením podle NV č. 190/2022 Sb.?",
      moznosti: [
        {
          id: "a",
          text: "Prodlužovací šňůra k ručnímu nářadí",
          spravna: false,
          vysvetleni:
            "Prodlužovací šňůry a odpojitelné přívody jsou z vyhrazených elektrických zařízení výslovně vyňaty (§ 3 odst. 2 NV č. 190/2022 Sb.). Vyhrazená je například elektrická instalace budovy."
        },
        {
          id: "b",
          text: "Ruční vrtačka 230 V připojovaná vidlicí",
          spravna: false,
          vysvetleni:
            "Ruční nářadí do 400 V včetně, které není určeno k pevnému připojení, vyhrazeným zařízením není (§ 3 odst. 2). Vyhrazená je například elektrická instalace budovy."
        },
        {
          id: "c",
          text: "Elektrická instalace kancelářské budovy",
          spravna: true,
          vysvetleni:
            "Správně. Elektrické instalace staveb a technologií patří mezi vyhrazená elektrická zařízení (§ 3 odst. 1 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Zdravotnický elektrický přístroj",
          spravna: false,
          vysvetleni:
            "Zdravotnické elektrické přístroje jsou z vyhrazených elektrických zařízení vyňaty (§ 3 odst. 2). Vyhrazená je například elektrická instalace budovy."
        }
      ],
      shrnuti:
        "Elektroinstalace budovy je vyhrazené elektrické zařízení; prodlužovačky, nářadí do 400 V do zásuvky a zdravotnické přístroje ne.",
      fakta: ["K2-02", "K2-03"]
    },
    {
      id: "k2-q02",
      kapitola: K,
      podtema: "vez",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Za jakých podmínek spadá spotřebič do výjimky z vyhrazených elektrických zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Má napětí do 400 V včetně a není určen k pevnému připojení",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 3 odst. 2 NV č. 190/2022 Sb. nejsou vyhrazenými zařízeními ruční nářadí, elektronické přístroje a spotřebiče do 400 V včetně, pokud nejsou určeny k pevnému připojení."
        },
        {
          id: "b",
          text: "Má napětí do 230 V a připojuje se vidlicí do zásuvky",
          spravna: false,
          vysvetleni:
            "Hranice je 400 V včetně, ne 230 V. Kromě napětí rozhoduje, zda spotřebič není určen k pevnému připojení."
        },
        {
          id: "c",
          text: "Má napětí do 1 kV AC a nepracuje v prostředí s nebezpečím výbuchu",
          spravna: false,
          vysvetleni:
            "1 kV AC je hranice zařízení nízkého napětí v kódu E2, ne hranice výjimky. Výjimka platí pro spotřebiče do 400 V včetně, které nejsou určeny k pevnému připojení."
        },
        {
          id: "d",
          text: "Je určen k pevnému připojení a má napětí do 400 V",
          spravna: false,
          vysvetleni:
            "Pevné připojení výjimku naopak ruší. Vyňaty jsou spotřebiče do 400 V včetně, které k pevnému připojení určeny nejsou."
        }
      ],
      shrnuti:
        "Výjimka: spotřebiče, ruční nářadí a elektronické přístroje do 400 V včetně, které nejsou určeny k pevnému připojení.",
      fakta: ["K2-03", "K9-09", "K2-06"]
    },
    {
      id: "k2-q03",
      kapitola: K,
      podtema: "vez",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Do výrobní haly, kde řídíte údržbu, přibyl obráběcí stroj. Jeho elektrické zařízení je součástí stroje, který je výrobkem podle zákona č. 22/1997 Sb. Je elektrické zařízení stroje vyhrazeným elektrickým zařízením?",
      moznosti: [
        {
          id: "a",
          text: "Ano, protože slouží k odběru elektrické energie",
          spravna: false,
          vysvetleni:
            "Odběr energie sice patří do vymezení vyhrazených zařízení, ale § 3 odst. 2 NV č. 190/2022 Sb. elektrické zařízení stroje, který je výrobkem podle zákona č. 22/1997 Sb., výslovně vyjímá."
        },
        {
          id: "b",
          text: "Ano, protože je ke stroji připojeno pevně",
          spravna: false,
          vysvetleni:
            "Pevné připojení ruší výjimku u nářadí a spotřebičů do 400 V. Elektrické zařízení stroje, který je výrobkem podle zákona č. 22/1997 Sb., je vyňato samostatně."
        },
        {
          id: "c",
          text: "Ano, pokud napětí stroje přesahuje 400 V",
          spravna: false,
          vysvetleni:
            "Hranice 400 V se týká nářadí, přístrojů a spotřebičů. U elektrického zařízení strojního zařízení, které je výrobkem podle zákona č. 22/1997 Sb., nařízení napětí nestanoví."
        },
        {
          id: "d",
          text: "Ne, elektrické zařízení stroje jako výrobku je vyňato",
          spravna: true,
          vysvetleni:
            "Správně. Elektrické zařízení strojního zařízení, které je výrobkem podle zákona č. 22/1997 Sb., není vyhrazeným elektrickým zařízením (§ 3 odst. 2 NV č. 190/2022 Sb.). Vyhrazená zůstává elektrická instalace haly, ze které se stroj napájí."
        }
      ],
      shrnuti:
        "Elektrické zařízení stroje, který je výrobkem podle zákona č. 22/1997 Sb., není vyhrazené; elektroinstalace, která stroj napájí, ano.",
      fakta: ["K2-03", "K2-02"]
    },

    {
      id: "k2-q04",
      kapitola: K,
      podtema: "vez",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V dílně, kde řídíte údržbu, se používají ruční vrtačky 230 V připojované vidlicí do zásuvky. Podle čeho zajistíte jejich kontroly?",
      moznosti: [
        {
          id: "a",
          text: "Pravidelnými revizemi podle přílohy č. 4 NV č. 190/2022 Sb.",
          spravna: false,
          vysvetleni:
            "Revize podle NV č. 190/2022 Sb. se týkají vyhrazených elektrických zařízení. Ruční nářadí do 400 V, které není určeno k pevnému připojení, mezi ně nepatří; kontroluje se podle ČSN 33 1600 ed. 2."
        },
        {
          id: "b",
          text: "Kontrolami během používání podle ČSN 33 1600 ed. 2",
          spravna: true,
          vysvetleni:
            "Správně. Ruční nářadí do 400 V připojované vidlicí není vyhrazeným elektrickým zařízením, revize podle NV č. 190/2022 Sb. se na něj nevztahují (§ 3 odst. 2). Kontroly ručního elektrického nářadí během používání upravuje ČSN 33 1600 ed. 2."
        },
        {
          id: "c",
          text: "Výchozí revizí, kterou po nákupu provede revizní technik",
          spravna: false,
          vysvetleni:
            "Výchozí revize se provádí u vyhrazených elektrických zařízení po dokončení montáže. Ruční nářadí do 400 V připojované vidlicí vyhrazeným zařízením není; kontroly upravuje ČSN 33 1600 ed. 2."
        },
        {
          id: "d",
          text: "Kontrolami během používání podle ČSN 33 1610",
          spravna: false,
          vysvetleni:
            "ČSN 33 1610 upravuje kontroly elektrických spotřebičů během používání. Pro ruční elektrické nářadí platí ČSN 33 1600 ed. 2."
        }
      ],
      shrnuti:
        "Ruční nářadí do 400 V do zásuvky není vyhrazené zařízení; kontroluje se podle ČSN 33 1600 ed. 2, spotřebiče podle ČSN 33 1610.",
      fakta: ["K9-10", "K2-03", "K9-09", "K2-11"]
    },

    // ───────── Třídy ─────────
    {
      id: "k2-q05",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 1,
      zadani:
        "Do které třídy patří vyhrazené elektrické zařízení v objektu, který podle požárně bezpečnostního řešení umožňuje přítomnost více než 200 osob?",
      moznosti: [
        {
          id: "a",
          text: "Do II. třídy, protože v objektu není nebezpečí výbuchu",
          spravna: false,
          vysvetleni:
            "Nebezpečí výbuchu je jen jeden z důvodů pro I. třídu. Objekt pro více než 200 osob do I. třídy patří sám o sobě (§ 4 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Do I. třídy kvůli počtu osob v objektu",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 4 NV č. 190/2022 Sb. patří do I. třídy mimo jiné zařízení v objektu, který podle požárně bezpečnostního řešení umožňuje přítomnost více než 200 osob."
        },
        {
          id: "c",
          text: "Do II. třídy, počet osob o třídě nerozhoduje",
          spravna: false,
          vysvetleni:
            "Počet osob rozhoduje: objekt pro více než 200 osob podle požárně bezpečnostního řešení je důvodem pro I. třídu."
        },
        {
          id: "d",
          text: "Do I. třídy, jen pokud je v něm i zdravotnický prostor",
          spravna: false,
          vysvetleni:
            "Zdravotnické prostory jsou samostatný důvod pro I. třídu. Objekt pro více než 200 osob do ní patří i bez nich."
        }
      ],
      shrnuti: "Objekt pro více než 200 osob podle požárně bezpečnostního řešení = vyhrazené elektrické zařízení I. třídy.",
      fakta: ["K2-04"]
    },
    {
      id: "k2-q06",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co je navíc potřeba k uvedení vyhrazeného elektrického zařízení I. třídy do provozu?",
      moznosti: [
        {
          id: "a",
          text: "Souhlas oblastního inspektorátu práce",
          spravna: false,
          vysvetleni:
            "Nařízení u I. třídy nevyžaduje souhlas inspektorátu, ale osvědčení pověřené organizace (§ 6 odst. 6 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Oprávnění firmy, která zařízení namontovala",
          spravna: false,
          vysvetleni:
            "Oprávnění firmy opravňuje k montáži a uvedení do provozu nenahradí. Zařízení I. třídy lze uvést do provozu jen na základě osvědčení pověřené organizace."
        },
        {
          id: "c",
          text: "Druhá výchozí revize jiným revizním technikem",
          spravna: false,
          vysvetleni:
            "Druhou výchozí revizi nařízení nepožaduje. U I. třídy je rozhodující osvědčení pověřené organizace (§ 6 odst. 6 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Osvědčení pověřené organizace",
          spravna: true,
          vysvetleni:
            "Správně. Vyhrazené elektrické zařízení I. třídy lze uvést do provozu jen na základě osvědčení pověřené organizace a provozovatel ho uchovává po celou dobu provozu (§ 6 odst. 6 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti:
        "Zařízení I. třídy jde do provozu jen s osvědčením pověřené organizace, které provozovatel uchovává po celou dobu provozu.",
      fakta: ["K2-05", "K2-07", "K1-27"]
    },
    {
      id: "k2-q07",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Nové obchodní centrum podle požárně bezpečnostního řešení umožňuje přítomnost více než 200 osob. Provozovatel se ptá, co platí pro jeho ochranu před bleskem. Co odpovíte?",
      moznosti: [
        {
          id: "a",
          text: "Je I. třídy a do provozu jde s osvědčením pověřené organizace",
          spravna: true,
          vysvetleni:
            "Správně. Ochrana před bleskem, která chrání zařízení I. třídy, patří také do I. třídy (§ 4 NV č. 190/2022 Sb.). Do provozu ji lze uvést jen na základě osvědčení pověřené organizace (§ 6 odst. 6)."
        },
        {
          id: "b",
          text: "Ochrana před bleskem je vždy zařízením II. třídy",
          spravna: false,
          vysvetleni:
            "Ochrana před bleskem chránící zařízení I. třídy je také I. třídy. Do provozu jde jen s osvědčením pověřené organizace."
        },
        {
          id: "c",
          text: "Ochrana před bleskem není vyhrazeným elektrickým zařízením",
          spravna: false,
          vysvetleni:
            "Zařízení k ochraně před účinky atmosférické elektřiny jsou vyhrazená elektrická zařízení (§ 3 odst. 1 NV č. 190/2022 Sb.). Tady jde navíc o I. třídu."
        },
        {
          id: "d",
          text: "Stačí jí vizuální kontrola jednou ročně, revize se nedělá",
          spravna: false,
          vysvetleni:
            "Vizuální kontrola jednou ročně se provádí na všech systémech ochrany před bleskem (LPS), revize ale zůstává: u kritických systémů po 2 letech, u ostatních po 4 letech (příloha č. 4)."
        }
      ],
      shrnuti:
        "Ochrana před bleskem, která chrání zařízení I. třídy, je také I. třídy a potřebuje osvědčení pověřené organizace.",
      fakta: ["K2-04", "K2-05", "K2-02", "K2-16"]
    },

    // ───────── Oprávnění a osvědčení ─────────
    {
      id: "k2-q08",
      kapitola: K,
      podtema: "opravneni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Komu se vydává oprávnění k montáži, opravám, revizím a zkouškám vyhrazených elektrických zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Revizním technikům jako fyzickým osobám",
          spravna: false,
          vysvetleni:
            "Revizní technik dostává osvědčení (§ 11 zákona č. 250/2021 Sb.). Oprávnění se vydává firmám, tedy právnickým a podnikajícím fyzickým osobám."
        },
        {
          id: "b",
          text: "Vedoucím elektrotechnikům po úspěšné zkoušce",
          spravna: false,
          vysvetleni:
            "Po zkoušce dostává vedoucí elektrotechnik doklad o odborné způsobilosti platný 3 roky. Oprávnění se vydává firmám."
        },
        {
          id: "c",
          text: "Právnickým a podnikajícím fyzickým osobám",
          spravna: true,
          vysvetleni:
            "Správně. Montáž, opravy, revize a zkoušky smějí jako firma vykonávat jen právnické a podnikající fyzické osoby s oprávněním od pověřené organizace (§ 7 zákona č. 250/2021 Sb.)."
        },
        {
          id: "d",
          text: "Provozovatelům zařízení I. třídy",
          spravna: false,
          vysvetleni:
            "Provozovatel zařízení I. třídy potřebuje k uvedení do provozu osvědčení pověřené organizace. Oprávnění se vydává firmám, které montáž, opravy, revize a zkoušky provádějí."
        }
      ],
      shrnuti: "Oprávnění = firma; osvědčení = revizní technik; doklad o zkoušce = osoba znalá.",
      fakta: ["K2-07", "K2-08", "K1-14", "K2-05"]
    },
    {
      id: "k2-q09",
      kapitola: K,
      podtema: "opravneni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak dlouho platí oprávnění firmy k činnostem na vyhrazených elektrických zařízeních?",
      moznosti: [
        {
          id: "a",
          text: "5 let ode dne udělení",
          spravna: false,
          vysvetleni:
            "5 let platí osvědčení revizního technika (§ 12 zákona č. 250/2021 Sb.). Oprávnění firmy platí 10 let."
        },
        {
          id: "b",
          text: "10 let od právní moci rozhodnutí",
          spravna: true,
          vysvetleni:
            "Správně. Oprávnění platí 10 let ode dne nabytí právní moci rozhodnutí (§ 8 odst. 4 zákona č. 250/2021 Sb.)."
        },
        {
          id: "c",
          text: "3 roky ode dne vydání",
          spravna: false,
          vysvetleni:
            "3 roky platí doklad o zkoušce z odborné způsobilosti osoby (§ 19 zákona č. 250/2021 Sb.). Oprávnění firmy platí 10 let."
        },
        {
          id: "d",
          text: "Bez omezení, dokud firma působí",
          spravna: false,
          vysvetleni:
            "Oprávnění má omezenou platnost: 10 let od nabytí právní moci rozhodnutí."
        }
      ],
      shrnuti: "Oprávnění firmy platí 10 let od nabytí právní moci rozhodnutí.",
      fakta: ["K2-07", "K2-08", "K1-14"]
    },
    {
      id: "k2-q10",
      kapitola: K,
      podtema: "opravneni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jak získá revizní technik osvědčení?",
      moznosti: [
        {
          id: "a",
          text: "Zkouškou u pověřené organizace s písemnou a ústní částí",
          spravna: true,
          vysvetleni:
            "Správně. Osvědčení uděluje pověřená organizace na základě zkoušky s písemnou a ústní částí; v každé je nutných nejméně 80 %. Osvědčení platí 5 let (§ 11 a § 12 zákona č. 250/2021 Sb.)."
        },
        {
          id: "b",
          text: "Zkouškou u tříčlenné komise, které předsedá revizní technik",
          spravna: false,
          vysvetleni:
            "Tříčlennou komisi s revizním technikem v čele má zkouška vedoucího elektrotechnika (§ 7 odst. 4 NV č. 194/2022 Sb.). Osvědčení revizního technika uděluje pověřená organizace."
        },
        {
          id: "c",
          text: "Automaticky po 4 letech praxe vedoucího elektrotechnika",
          spravna: false,
          vysvetleni:
            "Praxe je jen jeden z předpokladů. Osvědčení uděluje pověřená organizace na základě zkoušky."
        },
        {
          id: "d",
          text: "Žádostí podanou u oblastního inspektorátu práce",
          spravna: false,
          vysvetleni:
            "Inspektoráty práce vykonávají státní správu. Osvědčení uděluje pověřená organizace po zkoušce s písemnou a ústní částí."
        }
      ],
      shrnuti:
        "Osvědčení revizního technika: zkouška u pověřené organizace (písemná a ústní část, v každé 80 %), platnost 5 let.",
      fakta: ["K2-08", "K1-10", "K1-30", "K1-27"]
    },
    {
      id: "k2-q11",
      kapitola: K,
      podtema: "opravneni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Firma má oprávnění s kódem E2B. Na jaká zařízení se vztahuje?",
      moznosti: [
        {
          id: "a",
          text: "Zařízení do 1 kV AC / 1,5 kV DC bez nebezpečí výbuchu",
          spravna: false,
          vysvetleni:
            "Prostory bez nebezpečí výbuchu označuje písmeno A. Písmeno B znamená prostory s nebezpečím výbuchu."
        },
        {
          id: "b",
          text: "Zařízení nízkého a vysokého napětí do 35 kV",
          spravna: false,
          vysvetleni:
            "Zařízení nízkého a vysokého napětí s uvedením rozsahu označuje E1. E2 je zařízení nízkého napětí do 1 kV AC / 1,5 kV DC."
        },
        {
          id: "c",
          text: "Ochranu před bleskem a přepětím s nebezpečím výbuchu",
          spravna: false,
          vysvetleni:
            "Ochranu před atmosférickou elektřinou, přepětím a statickou elektřinou označuje E3. E2 je zařízení nízkého napětí do 1 kV AC / 1,5 kV DC."
        },
        {
          id: "d",
          text: "Zařízení do 1 kV AC / 1,5 kV DC s nebezpečím výbuchu",
          spravna: true,
          vysvetleni:
            "Správně. E2 = zařízení nízkého napětí do 1 kV AC nebo 1,5 kV DC, B = prostory s nebezpečím výbuchu (příloha č. 3 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti:
        "E1 = nízké i vysoké napětí, E2 = do 1 kV AC / 1,5 kV DC, E3 = blesk, přepětí a statická elektřina; A bez, B s nebezpečím výbuchu.",
      fakta: ["K2-06"]
    },
    {
      id: "k2-q12",
      kapitola: K,
      podtema: "opravneni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Objednáváte u externí firmy pravidelnou revizi elektroinstalace kancelářské budovy (do 1 kV, bez nebezpečí výbuchu). Co si u dodavatele ověříte?",
      moznosti: [
        {
          id: "a",
          text: "Oprávnění E2A s činností M a doklad technika podle § 7",
          spravna: false,
          vysvetleni:
            "M znamená montáž a doklad podle § 7 na revizi nestačí. Revizi smí provést jen revizní technik s osvědčením a firma potřebuje oprávnění pro revize (R)."
        },
        {
          id: "b",
          text: "Oprávnění E3A s činností R, které pokrývá zařízení do 1 kV",
          spravna: false,
          vysvetleni:
            "E3 je ochrana před atmosférickou elektřinou, přepětím a statickou elektřinou. Elektroinstalace do 1 kV spadá pod E2."
        },
        {
          id: "c",
          text: "Oprávnění E2A s činností R a osvědčení revizního technika",
          spravna: true,
          vysvetleni:
            "Správně. Firma potřebuje oprávnění v rozsahu E2A pro revize (R) a revizi musí provést revizní technik s osvědčením v odpovídajícím rozsahu (§ 7 a § 17 zákona č. 250/2021 Sb., příloha č. 3 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Osvědčení pověřené organizace o uvedení budovy do provozu",
          spravna: false,
          vysvetleni:
            "Osvědčení pověřené organizace potřebuje provozovatel zařízení I. třídy k uvedení do provozu. U dodavatele revize ověřte oprávnění E2A s činností R a osvědčení revizního technika."
        }
      ],
      shrnuti:
        "U dodavatele revize ověřte oprávnění firmy pro daný rozsah s činností R a platné osvědčení revizního technika.",
      fakta: ["K2-06", "K2-07", "K2-09", "K2-05"]
    },

    // ───────── Revize a lhůty ─────────
    {
      id: "k2-q13",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co je revize podle zákona č. 250/2021 Sb.?",
      moznosti: [
        {
          id: "a",
          text: "Údržba zařízení podle řádu preventivní údržby",
          spravna: false,
          vysvetleni:
            "Řád preventivní údržby jen umožňuje prodloužit lhůty revizí. Revize je posouzení bezpečnosti zařízení prohlídkou, zkouškou nebo měřením."
        },
        {
          id: "b",
          text: "Posouzení bezpečnosti prohlídkou, zkouškou nebo měřením",
          spravna: true,
          vysvetleni:
            "Správně. Revize je posouzení provozní a technické bezpečnosti vyhrazeného technického zařízení prohlídkou, zkouškou nebo měřením, zda odpovídá předpisům bezpečnosti a ochrany zdraví při práci (§ 2 písm. c) zákona č. 250/2021 Sb.)."
        },
        {
          id: "c",
          text: "Oprava, která obnoví použitelný stav zařízení",
          spravna: false,
          vysvetleni:
            "Obnovení použitelného stavu beze změny parametrů je oprava (§ 2 zákona č. 250/2021 Sb.). Revize je posouzení bezpečnosti prohlídkou, zkouškou nebo měřením."
        },
        {
          id: "d",
          text: "Vizuální kontrola, kterou provádí obsluha zařízení",
          spravna: false,
          vysvetleni:
            "Vizuální kontrola je jen část péče o zařízení. Revize je posouzení bezpečnosti prohlídkou, zkouškou nebo měřením a smí ji provést jen revizní technik s osvědčením (§ 17 zákona)."
        }
      ],
      shrnuti:
        "Revize = posouzení provozní a technické bezpečnosti prohlídkou, zkouškou nebo měřením; provádí ji revizní technik.",
      fakta: ["K2-10", "K2-19", "K2-30", "K2-09"]
    },
    {
      id: "k2-q14",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Ve kterém z těchto případů se revize provádí vždy, bez ohledu na posouzení potřeby?",
      moznosti: [
        {
          id: "a",
          text: "Po dokončení montáže",
          spravna: true,
          vysvetleni:
            "Správně. Po dokončení montáže se revize provádí vždy (§ 6 odst. 2 písm. c) NV č. 190/2022 Sb.) a dodavatel předá zprávu o výchozí revizi, není-li sjednáno jinak."
        },
        {
          id: "b",
          text: "Po opravě zařízení",
          spravna: false,
          vysvetleni: "Po opravě se revize provádí podle potřeby. Vždy se provádí po dokončení montáže."
        },
        {
          id: "c",
          text: "Po přemístění zařízení",
          spravna: false,
          vysvetleni: "Po přemístění se revize provádí podle potřeby. Vždy se provádí po dokončení montáže."
        },
        {
          id: "d",
          text: "Po každé kontrole podle řádu",
          spravna: false,
          vysvetleni:
            "Kontroly a revize mají své lhůty v řádu prohlídek, údržby a revizí. Bez ohledu na potřebu se revize provádí po dokončení montáže."
        }
      ],
      shrnuti: "Po montáži se revize dělá vždy, po opravě nebo přemístění podle potřeby.",
      fakta: ["K2-11", "K2-12", "K2-13"]
    },
    {
      id: "k2-q15",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V rozvaděči dílny, kterou máte na starosti, se vyměnil jistič za jistič s vyšším jmenovitým proudem. Co z toho plyne pro revizi?",
      moznosti: [
        {
          id: "a",
          text: "Jde o opravu, revize se provede jen podle potřeby",
          spravna: false,
          vysvetleni:
            "Oprava obnovuje stav beze změny parametrů. Jistič s jiným jmenovitým proudem mění parametry ochrany proti přetížení a zkratu, proto je revize nutná."
        },
        {
          id: "b",
          text: "Revize počká na nejbližší pravidelný termín",
          spravna: false,
          vysvetleni:
            "Změna parametrů ochrany proti přetížení a zkratu je samostatný důvod revize (§ 6 odst. 4 NV č. 190/2022 Sb.), nezávislý na pravidelné lhůtě."
        },
        {
          id: "c",
          text: "Stačí funkční zkouška jističe, kterou udělá elektrotechnik",
          spravna: false,
          vysvetleni:
            "Funkční zkouška revizi nenahradí. Změna parametrů ochrany proti přetížení a zkratu vyžaduje revizi, kterou smí provést jen revizní technik."
        },
        {
          id: "d",
          text: "Jde o změnu parametrů jištění, revize je nutná",
          spravna: true,
          vysvetleni:
            "Správně. Revize je nutná i při změně parametrů ochrany proti přetížení a zkratu (§ 6 odst. 4 NV č. 190/2022 Sb.). Jistič s vyšším jmenovitým proudem tyto parametry mění."
        }
      ],
      shrnuti: "Změna parametrů ochrany proti přetížení a zkratu (třeba jiný jistič) vyžaduje revizi.",
      fakta: ["K2-11", "K2-30", "K2-09"]
    },
    {
      id: "k2-q16",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co platí pro rekonstrukci vyhrazeného technického zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Smí ji provést jen firma s oprávněním, opravu kdokoli",
          spravna: false,
          vysvetleni:
            "Oprávnění se vztahuje i na opravy (§ 7 zákona č. 250/2021 Sb.). Rekonstrukce se od opravy liší tím, že mění základní technické nebo bezpečnostní parametry."
        },
        {
          id: "b",
          text: "Mění základní technické nebo bezpečnostní parametry",
          spravna: true,
          vysvetleni:
            "Správně. Rekonstrukce nahrazuje nevyhovující část novou nebo modernější a mění základní technické nebo bezpečnostní parametry (§ 2 zákona č. 250/2021 Sb.). Po ní musí provozovatel zajistit zkoušky a výchozí revizi."
        },
        {
          id: "c",
          text: "Obnovuje použitelný stav beze změny parametrů",
          spravna: false,
          vysvetleni:
            "To je definice opravy. Rekonstrukce naopak mění základní technické nebo bezpečnostní parametry."
        },
        {
          id: "d",
          text: "Po ní stačí pravidelná revize v obvyklé lhůtě",
          spravna: false,
          vysvetleni:
            "Po rekonstrukci musí provozovatel ověřit bezpečnost včetně zkoušek a výchozí revize (§ 20 odst. 6 zákona č. 250/2021 Sb.)."
        }
      ],
      shrnuti:
        "Rekonstrukce mění základní technické nebo bezpečnostní parametry a následuje po ní výchozí revize; oprava parametry nemění.",
      fakta: ["K2-30", "K2-29", "K2-07"]
    },
    {
      id: "k2-q17",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jaká je nejdelší lhůta pravidelné revize elektroinstalace v objektu pro administrativu?",
      moznosti: [
        {
          id: "a",
          text: "2 roky",
          spravna: false,
          vysvetleni:
            "2 roky platí pro objekt pro více než 200 osob. Pro administrativu je to 5 let (příloha č. 4 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "3 roky",
          spravna: false,
          vysvetleni:
            "3 roky platí například pro objekty pro výrobu, školy, ubytování a lékařské účely. Pro administrativu je to 5 let."
        },
        {
          id: "c",
          text: "5 let",
          spravna: true,
          vysvetleni:
            "Správně. Pro objekty pro administrativu je nejdelší lhůta pravidelné revize 5 let (příloha č. 4 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "4 roky",
          spravna: false,
          vysvetleni:
            "4 roky jsou lhůta revize ochrany před bleskem, která nechrání kritické systémy. Pro elektroinstalaci administrativy platí 5 let."
        }
      ],
      shrnuti: "Administrativa 5 let; výroba, školy, ubytování a lékařské účely 3 roky; více než 200 osob 2 roky.",
      fakta: ["K2-15", "K2-16"]
    },
    {
      id: "k2-q18",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Na jedno zařízení se podle přílohy č. 4 vztahují dvě lhůty: 3 roky jako objekt pro výrobu a 1 rok jako mokrý prostor. Kterou použijete?",
      moznosti: [
        {
          id: "a",
          text: "3 roky, protože rozhoduje účel celého objektu",
          spravna: false,
          vysvetleni:
            "Účel objektu nemá přednost. Vztahuje-li se na zařízení více lhůt, použije se nejkratší (příloha č. 4 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "1 rok, protože se použije nejkratší lhůta",
          spravna: true,
          vysvetleni:
            "Správně. Vztahuje-li se na zařízení více revizních lhůt, použije se nejkratší (příloha č. 4 NV č. 190/2022 Sb., doplňující informace písm. a))."
        },
        {
          id: "c",
          text: "Tu, kterou si provozovatel zvolí v řádu prohlídek",
          spravna: false,
          vysvetleni:
            "Provozovatel si mezi lhůtami nevybírá, platí nejkratší. Prodloužit lhůty až na dvojnásobek může jen řádem preventivní údržby."
        },
        {
          id: "d",
          text: "3 roky a v mokrém prostoru roční vizuální kontrola",
          spravna: false,
          vysvetleni:
            "Roční vizuální kontrola je pravidlo pro ochranu před bleskem (LPS). Pro zařízení s více lhůtami platí nejkratší, tedy 1 rok."
        }
      ],
      shrnuti: "Platí-li pro jedno zařízení více lhůt, použije se nejkratší.",
      fakta: ["K2-17", "K2-15", "K2-19", "K2-16"]
    },
    {
      id: "k2-q19",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Plánujete revize ve škole. Poslední pravidelná revize elektroinstalace proběhla v březnu 2023 a lhůta jsou 3 roky. Do kdy musí proběhnout další?",
      moznosti: [
        {
          id: "a",
          text: "Nejpozději do konce roku 2026",
          spravna: true,
          vysvetleni:
            "Správně. Pravidelná revize musí proběhnout v roce, do kterého spadá konec lhůty od poslední revize (příloha č. 4 NV č. 190/2022 Sb.). Lhůta končí v březnu 2026, revize tedy musí proběhnout během roku 2026."
        },
        {
          id: "b",
          text: "Nejpozději do konce března 2026",
          spravna: false,
          vysvetleni:
            "Nařízení počítá s rokem, do kterého spadá konec lhůty. Revize musí proběhnout v roce 2026, ne nutně do března."
        },
        {
          id: "c",
          text: "Nejpozději do konce roku 2025",
          spravna: false,
          vysvetleni:
            "Tříletá lhůta od března 2023 končí v březnu 2026. Rozhoduje rok konce lhůty, tedy 2026."
        },
        {
          id: "d",
          text: "Nejpozději do září 2026 s tolerancí půl roku",
          spravna: false,
          vysvetleni:
            "Toleranci půl roku nařízení nestanoví. Rozhoduje rok, do kterého spadá konec lhůty – revize musí proběhnout v roce 2026."
        }
      ],
      shrnuti: "Revizi s lhůtou delší než 1 rok stačí provést v roce, do kterého spadá konec lhůty.",
      fakta: ["K2-18", "K2-15"]
    },
    {
      id: "k2-q20",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co může provozovatel, který má zpracovaný řád preventivní údržby?",
      moznosti: [
        {
          id: "a",
          text: "Vynechat výchozí revizi po montáži",
          spravna: false,
          vysvetleni:
            "Po dokončení montáže se revize provádí vždy. Řád preventivní údržby umožňuje jen prodloužit lhůty pravidelných revizí až na dvojnásobek."
        },
        {
          id: "b",
          text: "Stanovit lhůty pravidelných revizí až trojnásobné",
          spravna: false,
          vysvetleni:
            "Prodloužení je omezené: lhůty pravidelných revizí lze řádem preventivní údržby stanovit nejvýše dvojnásobné."
        },
        {
          id: "c",
          text: "Nahradit pravidelné revize vlastními kontrolami",
          spravna: false,
          vysvetleni:
            "Revize se nenahrazují. Řád preventivní údržby umožňuje jen stanovit lhůty pravidelných revizí až dvojnásobné."
        },
        {
          id: "d",
          text: "Stanovit lhůty pravidelných revizí až dvojnásobné",
          spravna: true,
          vysvetleni:
            "Správně. Provozovatel s řádem preventivní údržby v něm může stanovit lhůty pravidelných revizí až dvojnásobné (příloha č. 4 NV č. 190/2022 Sb., doplňující informace písm. c))."
        }
      ],
      shrnuti: "Řád preventivní údržby dovoluje lhůty pravidelných revizí nejvýše dvojnásobné.",
      fakta: ["K2-19", "K2-11"]
    },
    {
      id: "k2-q21",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V areálu, kde řídíte údržbu, je ochrana před bleskem (LPS), která nechrání žádný kritický systém. Co musíte zajistit?",
      moznosti: [
        {
          id: "a",
          text: "Revizi nejpozději po 2 letech a vizuální kontrolu jednou za 2 roky",
          spravna: false,
          vysvetleni:
            "2 roky jsou lhůta pro LPS chránící kritické systémy. U ostatních je revize nejpozději po 4 letech a vizuální kontrola každý rok."
        },
        {
          id: "b",
          text: "Revizi nejpozději po 5 letech, stejně jako u administrativy",
          spravna: false,
          vysvetleni:
            "5 let je lhůta pro elektroinstalaci administrativních objektů. Pro LPS platí 4 roky (ostatní) nebo 2 roky (kritické systémy) a k tomu roční vizuální kontrola."
        },
        {
          id: "c",
          text: "Revizi nejpozději po 4 letech a vizuální kontrolu každý rok",
          spravna: true,
          vysvetleni:
            "Správně. LPS, která nechrání kritické systémy, se reviduje nejpozději po 4 letech a na všech LPS se nejméně jednou ročně provádí vizuální kontrola (příloha č. 4 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Jen vizuální kontrolu každý rok, revize se nedělá",
          spravna: false,
          vysvetleni:
            "Roční vizuální kontrola revizi nenahrazuje. LPS mimo kritické systémy se reviduje nejpozději po 4 letech."
        }
      ],
      shrnuti:
        "Ochrana před bleskem: revize po 2 letech (kritické systémy) nebo po 4 letech (ostatní), vizuální kontrola každý rok.",
      fakta: ["K2-16", "K2-15"]
    },
    {
      id: "k2-q22",
      kapitola: K,
      podtema: "revize",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Výrobce uvádí v průvodní dokumentaci kratší lhůtu revize, než stanoví řád prohlídek, údržby a revizí. Která lhůta platí?",
      moznosti: [
        {
          id: "a",
          text: "Lhůta z řádu prohlídek, údržby a revizí",
          spravna: false,
          vysvetleni:
            "Řád nemá přednost před kratší lhůtou výrobce. Platí lhůta z průvodní dokumentace (§ 7 odst. 2 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Kratší lhůta z průvodní dokumentace výrobce",
          spravna: true,
          vysvetleni:
            "Správně. Uvádí-li průvodní dokumentace kratší lhůtu revize nebo kontroly, než stanoví řád prohlídek, údržby a revizí, platí lhůta z průvodní dokumentace (§ 7 odst. 2 NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Delší lhůta, pokud ji schválí revizní technik",
          spravna: false,
          vysvetleni:
            "Revizní technik ve zprávě lhůtu příští revize jen doporučuje. Je-li lhůta výrobce kratší než lhůta v řádu, platí lhůta výrobce."
        },
        {
          id: "d",
          text: "Lhůta z přílohy č. 4 nařízení, jiné se nepoužijí",
          spravna: false,
          vysvetleni:
            "Příloha č. 4 stanoví nejdelší lhůty. Kratší lhůta z průvodní dokumentace výrobce má přednost před řádem prohlídek, údržby a revizí."
        }
      ],
      shrnuti: "Kratší lhůta výrobce má přednost před lhůtou z řádu prohlídek, údržby a revizí.",
      fakta: ["K2-14", "K2-15", "K2-20"]
    },

    // ───────── Povinnosti provozovatele a zpráva o revizi ─────────
    {
      id: "k2-q23",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Při obchůzce zjistíte rozbitý kryt rozvodnice s přístupnými živými částmi. Jde o stav bezprostředně ohrožující bezpečnost. Jak postupujete?",
      moznosti: [
        {
          id: "a",
          text: "Závadu zapíšete a necháte ji odstranit při příští revizi",
          spravna: false,
          vysvetleni:
            "Při bezprostředním ohrožení se nečeká. Zařízení se musí neprodleně odpojit od zdroje a zajistit proti nežádoucímu připojení (§ 7 odst. 8 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Místo označíte výstražnou tabulkou a necháte v provozu",
          spravna: false,
          vysvetleni:
            "Výstraha nestačí. Zařízení se musí neprodleně odpojit od zdroje a zajistit proti připojení; nejde-li to, zajistí se oprava bez zbytečného odkladu."
        },
        {
          id: "c",
          text: "Zařízení neprodleně odpojíte a zajistíte proti připojení",
          spravna: true,
          vysvetleni:
            "Správně. Při stavu bezprostředně ohrožujícím bezpečnost se zařízení neprodleně odpojí od zdroje a zajistí proti nežádoucímu připojení. Nejde-li to, zajistí se oprava bez zbytečného odkladu (§ 7 odst. 8 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Ohlásíte to oblastnímu inspektorátu práce a vyčkáte",
          spravna: false,
          vysvetleni:
            "Ohlášení inspektorátu se týká havárie se škodou zjevně přesahující 5 000 000 Kč (§ 22 zákona č. 250/2021 Sb.). Ohrožení řešíte hned odpojením a zajištěním zařízení."
        }
      ],
      shrnuti: "Při bezprostředním ohrožení: neprodleně odpojit od zdroje a zajistit proti připojení, jinak bez odkladu opravit.",
      fakta: ["K2-21", "K2-22", "K2-26"]
    },
    {
      id: "k2-q24",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Přebíráte řízení provozu dílny a zjistíte, že chybí zpráva o pravidelné revizi; lhůta uplynula před půl rokem. Jak tento stav hodnotí zákon?",
      moznosti: [
        {
          id: "a",
          text: "Jako administrativní nedostatek bez vlivu na provoz",
          spravna: false,
          vysvetleni:
            "Nejde o formalitu. Zákon to považuje za stav ohrožující bezpečnost práce a provozu (§ 20 odst. 3 zákona č. 250/2021 Sb.)."
        },
        {
          id: "b",
          text: "Jako stav ohrožující bezpečnost práce a provozu",
          spravna: true,
          vysvetleni:
            "Správně. Provoz vyhrazeného technického zařízení bez doložené zprávy o revizi ve stanovených lhůtách a rozsahu je stavem ohrožujícím bezpečnost práce a provozu (§ 20 odst. 3 zákona č. 250/2021 Sb.)."
        },
        {
          id: "c",
          text: "Jako havárii, kterou je nutné ohlásit inspektorátu",
          spravna: false,
          vysvetleni:
            "Ohlašovací povinnost se týká havárie se škodou zjevně přesahující 5 000 000 Kč. Chybějící zpráva o revizi je stav ohrožující bezpečnost práce a provozu."
        },
        {
          id: "d",
          text: "Jako běžnou závadu k odstranění podle závažnosti",
          spravna: false,
          vysvetleni:
            "Nejde o běžnou závadu. Provoz bez doložené zprávy o revizi je stav ohrožující bezpečnost a zařízení lze provozovat jen s ověřeným stavem (§ 7 odst. 1 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Provoz bez doložené zprávy o revizi ve lhůtě je podle zákona stav ohrožující bezpečnost práce a provozu.",
      fakta: ["K2-23", "K2-13", "K2-26", "K2-22"]
    },
    {
      id: "k2-q25",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak musí zpráva o revizi uvádět zjištěné závady?",
      moznosti: [
        {
          id: "a",
          text: "S odkazem na porušené předpisy",
          spravna: true,
          vysvetleni:
            "Správně. Zpráva o revizi obsahuje mimo jiné zjištěné závady s odkazem na porušené předpisy (§ 10 odst. 1 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Jen souhrnně ve slovním zhodnocení",
          spravna: false,
          vysvetleni:
            "Celkové slovní zhodnocení je samostatná část zprávy. Závady se uvádějí s odkazem na porušené předpisy."
        },
        {
          id: "c",
          text: "Jen u výchozí revize, u pravidelné ne",
          spravna: false,
          vysvetleni:
            "Náležitosti zprávy platí pro výchozí, pravidelnou i mimořádnou revizi; druh revize je jedním z údajů zprávy. Závady se uvádějí s odkazem na porušené předpisy."
        },
        {
          id: "d",
          text: "Jen ústně při předání provozovateli",
          spravna: false,
          vysvetleni:
            "Závady musí být ve zprávě (listinné nebo elektronické) s odkazem na porušené předpisy."
        }
      ],
      shrnuti:
        "Ve zprávě o revizi se závady uvádějí s odkazem na porušené předpisy; k tomu celkové zhodnocení a lhůta příští revize.",
      fakta: ["K2-20", "K2-28"]
    },
    {
      id: "k2-q26",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Výchozí revize velkého objektu se provádí po částech. Co musí vzniknout před uvedením celého zařízení do trvalého provozu?",
      moznosti: [
        {
          id: "a",
          text: "Dílčí zprávy o jednotlivých částech",
          spravna: false,
          vysvetleni:
            "Dílčí zprávy nestačí. Před uvedením celku do trvalého provozu musí být vystavena jedna souhrnná zpráva o výchozí revizi (§ 10 odst. 2 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Osvědčení pověřené organizace pro každou část",
          spravna: false,
          vysvetleni:
            "Osvědčení pověřené organizace se týká uvedení zařízení I. třídy do provozu. Při revizi po částech je potřeba jedna souhrnná zpráva o výchozí revizi."
        },
        {
          id: "c",
          text: "Zpráva o pravidelné revizi celku do 1 roku",
          spravna: false,
          vysvetleni:
            "Pravidelná revize přichází až ve stanovené lhůtě. Před trvalým provozem musí být souhrnná zpráva o výchozí revizi."
        },
        {
          id: "d",
          text: "Jedna souhrnná zpráva o výchozí revizi",
          spravna: true,
          vysvetleni:
            "Správně. Provádí-li se výchozí revize po částech, musí být před uvedením celého zařízení do trvalého provozu vystavena jedna souhrnná zpráva o výchozí revizi (§ 10 odst. 2 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Výchozí revize po částech končí jednou souhrnnou zprávou před trvalým provozem.",
      fakta: ["K2-27", "K2-05"]
    },
    {
      id: "k2-q27",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Podle jakých předpisů se při dnešní pravidelné revizi posuzuje stav elektroinstalace uvedené do provozu v roce 2005, která od té doby neprošla rekonstrukcí?",
      moznosti: [
        {
          id: "a",
          text: "Vždy podle předpisů platných v den revize",
          spravna: false,
          vysvetleni:
            "Zákon stanoví opak: stav se posuzuje podle předpisů platných v době uvedení do provozu, a to až do rekonstrukce (§ 3 odst. 5 zákona č. 250/2021 Sb.)."
        },
        {
          id: "b",
          text: "Podle předpisů platných v době předchozí revize",
          spravna: false,
          vysvetleni: "Rozhoduje doba uvedení zařízení do provozu, ne doba předchozí revize."
        },
        {
          id: "c",
          text: "Podle předpisů platných v době uvedení do provozu",
          spravna: true,
          vysvetleni:
            "Správně. Stav vyhrazeného technického zařízení se posuzuje podle předpisů platných v době jeho uvedení do provozu, a to až do rekonstrukce (§ 3 odst. 5 zákona č. 250/2021 Sb.)."
        },
        {
          id: "d",
          text: "Podle předpisů, které zvolí revizní technik",
          spravna: false,
          vysvetleni:
            "Volba nepřísluší reviznímu technikovi. Zákon určuje předpisy platné v době uvedení do provozu, až do rekonstrukce."
        }
      ],
      shrnuti: "Stav zařízení se posuzuje podle předpisů z doby uvedení do provozu – až do rekonstrukce.",
      fakta: ["K2-24", "K2-29"]
    },
    {
      id: "k2-q28",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Kdo rozhoduje, zda prozatímní vyhrazené elektrické zařízení zůstane v provozu i v době, kdy se nepoužívá?",
      moznosti: [
        {
          id: "a",
          text: "Vedoucí práce, která na zařízení právě probíhá",
          spravna: false,
          vysvetleni:
            "Vedoucí práce zajišťuje konkrétní práci (§ 8 písm. e) NV č. 190/2022 Sb.). O ponechání prozatímního zařízení v provozu rozhoduje osoba odpovědná za elektrické zařízení."
        },
        {
          id: "b",
          text: "Revizní technik při pravidelné revizi",
          spravna: false,
          vysvetleni:
            "Revizní technik posuzuje bezpečnost a doporučuje lhůtu příští revize. O ponechání v provozu rozhoduje osoba odpovědná za elektrické zařízení."
        },
        {
          id: "c",
          text: "Elektrotechnik, který zařízení obsluhuje",
          spravna: false,
          vysvetleni:
            "Nařízení toto rozhodnutí svěřuje osobě odpovědné za elektrické zařízení (§ 7 odst. 7 NV č. 190/2022 Sb.), ne tomu, kdo zařízení obsluhuje."
        },
        {
          id: "d",
          text: "Osoba odpovědná za elektrické zařízení",
          spravna: true,
          vysvetleni:
            "Správně. Prozatímní zařízení se v době, kdy se nepoužívá, vypíná, pokud tím není ohrožena bezpečnost; o ponechání v provozu rozhoduje osoba odpovědná za elektrické zařízení (§ 7 odst. 7 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Prozatímní zařízení se mimo používání vypíná; o výjimce rozhoduje osoba odpovědná za elektrické zařízení.",
      fakta: ["K2-25", "K3-09", "K2-20"]
    },
    {
      id: "k2-q29",
      kapitola: K,
      podtema: "provozovatel",
      typ: "vyber",
      obtiznost: 1,
      zadani:
        "Při jaké škodě musí provozovatel ohlásit oblastnímu inspektorátu práce havárii související s vyhrazeným technickým zařízením?",
      moznosti: [
        {
          id: "a",
          text: "Při škodě zjevně přesahující 5 000 000 Kč",
          spravna: true,
          vysvetleni:
            "Správně. Havárii se škodou zjevně přesahující 5 000 000 Kč musí provozovatel bez zbytečného odkladu ohlásit oblastnímu inspektorátu práce (§ 22 zákona č. 250/2021 Sb.)."
        },
        {
          id: "b",
          text: "Při škodě zjevně přesahující 1 000 000 Kč",
          spravna: false,
          vysvetleni: "Hranice je vyšší: ohlašuje se havárie se škodou zjevně přesahující 5 000 000 Kč."
        },
        {
          id: "c",
          text: "Při škodě zjevně přesahující 500 000 Kč",
          spravna: false,
          vysvetleni: "Hranice je vyšší: ohlašuje se havárie se škodou zjevně přesahující 5 000 000 Kč."
        },
        {
          id: "d",
          text: "Při každé havárii bez ohledu na škodu",
          spravna: false,
          vysvetleni:
            "Ohlašovací povinnost podle § 22 zákona č. 250/2021 Sb. má hranici: havárie se škodou zjevně přesahující 5 000 000 Kč."
        }
      ],
      shrnuti:
        "Havárii vyhrazeného technického zařízení se škodou zjevně nad 5 000 000 Kč provozovatel bez odkladu hlásí oblastnímu inspektorátu práce.",
      fakta: ["K2-26"]
    }
  ]
};

export default obsah;
