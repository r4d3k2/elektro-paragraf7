// Kapitola 3 – Organizace práce a odpovědnosti.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k3-organizace" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "role", nazev: "Role a pověření" },
    { id: "rezimy", nazev: "Práce podle pokynů, s dohledem a pod dozorem" },
    { id: "poucena", nazev: "Co smí osoba poučená" },
    { id: "rizika", nazev: "Hodnocení rizik, OOPP a školení" },
    { id: "praxe", nazev: "Řízení práce v praxi" }
  ],

  lekce: [
    {
      id: "k3-l01",
      podtema: "role",
      nadpis: "Odpovědná osoba a osoba odpovědná za elektrické zařízení",
      text: md(
        "Dva podobné názvy ze dvou předpisů:",
        "- **Odpovědná osoba** (NV č. 194/2022 Sb.) je pověřená osoba provozovatele. Odpovídá za bezpečný provoz elektrického zařízení, stanoví pravidla činností a organizaci místa práce a kontroluje, že činnosti vykonávají jen odborně způsobilé osoby. Část svých činností může **delegovat**.",
        "- **Osoba odpovědná za elektrické zařízení** (NV č. 190/2022 Sb.) je fyzická osoba, kterou provozovatel **písemně** – listinně nebo elektronicky – pověří, aby zajistila bezpečný provoz vyhrazeného elektrického zařízení.",
        "",
        "Obě role vznikají pověřením od provozovatele a obě se týkají bezpečného provozu. Osoba odpovědná za elektrické zařízení rozhoduje například o tom, zda prozatímní zařízení zůstane v provozu i v době, kdy se nepoužívá."
      ),
      fakta: ["K3-10", "K3-08", "K2-25"]
    },
    {
      id: "k3-l02",
      podtema: "role",
      nadpis: "Vedoucí práce",
      text: md(
        "Pro **každou práci** na vyhrazeném elektrickém zařízení se stanoví **vedoucí práce**, který ji řádně zajistí. Vedoucím práce může být **pouze osoba znalá** – elektrotechnik, vedoucí elektrotechnik nebo revizní technik. Osoba poučená ani osoba školená jím být nemůže.",
        "",
        "Před zahájením se provede **rozbor složitosti práce**, aby se zvolila osoba s vhodnou odbornou způsobilostí.",
        "",
        "Pojem práce je přitom široký. Patří sem montáž, demontáž, oprava, prohlídka, kontrola, údržba, zkoušení, měření a revize, ale také **všechny úkony pro zajištění a odjištění pracoviště**. I úkony, kterými se pracoviště před prací zajistí a po ní odjistí, jsou tedy prací na vyhrazeném elektrickém zařízení."
      ),
      fakta: ["K3-09", "K3-13", "K1-03", "K1-04"]
    },
    {
      id: "k3-l03",
      podtema: "rezimy",
      nadpis: "Pokyny, dohled, dozor",
      text: md(
        "Nařízení vlády č. 190/2022 Sb. rozlišuje tři způsoby zajištění práce:",
        "- **Práce podle pokynů** – pro práci jsou dány nezbytné pokyny pro bezpečné a správné provedení.",
        "- **Práce s dohledem** – práce podle podrobnějších pokynů. Osoba vykonávající dohled se před zahájením přesvědčí, že jsou provedena bezpečnostní opatření, a podle potřeby kontroluje dodržování předpisů.",
        "- **Práce pod dozorem** – za **trvalé přítomnosti** osoby pověřené dozorem.",
        "",
        "Pokyny vydávat i dohled a dozor vykonávat smí na vyhrazeném elektrickém zařízení **jen osoba znalá**. Režimy se liší tím, jak blízko je osoba znalá u práce: dozor znamená trvalou přítomnost, dohled kontrolu před zahájením a dále podle potřeby. Porovnejte je v ilustraci."
      ),
      ilustrace: "rezimy-prace",
      fakta: ["K3-01", "K3-02", "K3-03"]
    },
    {
      id: "k3-l04",
      podtema: "poucena",
      nadpis: "Co smí osoba poučená",
      text: md(
        "**Osoba poučená** (§ 4 NV č. 194/2022 Sb.) smí:",
        "- **samostatně obsluhovat** elektrická zařízení bez omezení napětí; dotýká se přitom jen částí určených k obsluze,",
        "- pracovat **podle pokynů** na zařízeních malého a nízkého napětí (NN) bez napětí a v jejich blízkosti,",
        "- pracovat **s dohledem** na zařízeních vysokého napětí (VN) bez napětí a v jejich blízkosti,",
        "- v blízkosti nekrytých živých částí NN pod napětím pracovat **s dohledem** osoby znalé, v bezpečné vzdálenosti nebo až na dotyk s izolačním krytem,",
        "- v blízkosti nekrytých živých částí VN pracovat jen **pod dozorem** osoby znalé.",
        "",
        "Samostatně tedy smí obsluhovat. Práci vykonává podle pokynů, s dohledem nebo pod dozorem, případně podle zvláštního pracovního postupu (další karta). Čím blíž živým částem a čím vyšší napětí, tím přísnější režim."
      ),
      fakta: ["K3-04", "K3-05"]
    },
    {
      id: "k3-l05",
      podtema: "poucena",
      nadpis: "Obsluha a zvláštní pracovní postup",
      text: md(
        "**Obsluhou** se rozumí spínání, regulování, odečítání údajů trvale namontovaných přístrojů, výměna závitových a přístrojových pojistek a žárovek a prohlídka elektrického zařízení. Obsluha zařízení malého a nízkého napětí se nepovažuje za činnost, která vyžaduje odbornou způsobilost podle NV č. 194/2022 Sb.",
        "",
        "Osoba poučená smí vykonávat i **práci ve zvláštních případech**, pokud pro ni provozovatel vydal **zvláštní pracovní postup**. Podmínky:",
        "- s postupem je seznámena **předem a opakovaně**,",
        "- je **prakticky zacvičena**,",
        "- o seznámení se pořizuje **zápis**."
      ),
      fakta: ["K4-13", "K1-20", "K3-06"]
    },
    {
      id: "k3-l06",
      podtema: "rizika",
      nadpis: "Hodnocení rizika a OOPP",
      text: md(
        "Před zahájením **práce i obsluhy** vyhrazeného elektrického zařízení se **vyhodnotí elektrické riziko**. Podle výsledku se stanoví, jak se práce provede a jaká bezpečnostní opatření se přijmou.",
        "",
        "Z hodnocení rizik se odvíjí i samostatnost elektrotechnika (§ 6): pracuje samostatně, s výjimkou zvláštních případů, které z hodnocení rizik vyplynou.",
        "",
        "Práce na vyhrazeném elektrickém zařízení smí provádět jen odborně způsobilá osoba, která je vybavena potřebnými **osobními ochrannými pracovními prostředky (OOPP)** a je seznámena s jejich používáním. O seznámení se pořizuje **zápis podepsaný oběma stranami**."
      ),
      fakta: ["K3-07", "K1-29", "K3-11"]
    },
    {
      id: "k3-l07",
      podtema: "rizika",
      nadpis: "Školení",
      text: md(
        "Každá osoba, která vykonává činnosti na vyhrazeném elektrickém zařízení, s ním nebo v jeho blízkosti, musí být **školena o předpisech bezpečnosti a ochrany zdraví při práci (BOZP)**, včetně **místních provozních bezpečnostních předpisů**, které se týkají její činnosti.",
        "",
        "U osob odborně způsobilých podle § 4, 6 a 7 NV č. 194/2022 Sb. zajišťuje pravidelné školení provozovatel podle svého **vnitřního předpisu**. Když vnitřní předpis nemá, školí je **nejméně jednou ročně**.",
        "",
        "Předmětem školení i zkoušky jsou povinnosti z předpisů BOZP pro daný druh a napětí zařízení, první pomoc zejména při úrazu elektrickým proudem, pracovní a technologické postupy, provozní a bezpečnostní pokyny a zdroje a příčiny rizik."
      ),
      fakta: ["K3-12", "K1-21", "K1-26"]
    },
    {
      id: "k3-l08",
      podtema: "praxe",
      nadpis: "Řízení práce krok za krokem",
      text: md(
        "Když řídíte práci na vyhrazeném elektrickém zařízení, skládají se povinnosti z této kapitoly do jednoho postupu:",
        "- **Pověření** – provozovatel písemně pověří osobu odpovědnou za elektrické zařízení.",
        "- **Vedoucí práce** – pro každou práci se stanoví osoba znalá, která práci řádně zajistí.",
        "- **Rozbor složitosti a hodnocení rizika** – podle nich zvolíte osobu s vhodnou odbornou způsobilostí, postup a bezpečnostní opatření.",
        "- **Režim** – pokyny, dohled, nebo dozor podle toho, kdo a kde pracuje.",
        "- **OOPP a školení** – pracovníci jsou vybaveni, se zápisem seznámeni s používáním OOPP a proškoleni.",
        "",
        "Zvláštní pozornost patří žákům a studentům: při praktické výuce smějí jen činnosti odpovídající postupně nabývaným znalostem, vždy pod vedením určené osoby s odpovídající odbornou způsobilostí a po zaškolení a ověření."
      ),
      fakta: ["K3-08", "K3-09", "K3-07", "K3-11", "K3-12", "K3-14"]
    }
  ],

  otazky: [
    // ───────── Role a pověření ─────────
    {
      id: "k3-q01",
      kapitola: K,
      podtema: "role",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak provozovatel pověřuje osobu odpovědnou za elektrické zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Ústně při nástupu do funkce",
          spravna: false,
          vysvetleni:
            "Ústní pověření nestačí. NV č. 190/2022 Sb. (§ 8 písm. d) vyžaduje, aby provozovatel osobu odpovědnou za elektrické zařízení pověřil písemně, listinně nebo elektronicky."
        },
        {
          id: "b",
          text: "Písemně, listinně nebo elektronicky",
          spravna: true,
          vysvetleni:
            "Správně. Provozovatel písemně (listinně nebo elektronicky) pověří fyzickou osobu odpovědnou za elektrické zařízení, jejíž povinností je zajistit bezpečný provoz vyhrazeného elektrického zařízení (§ 8 písm. d) NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Zápisem do zprávy o revizi",
          spravna: false,
          vysvetleni:
            "Zpráva o revizi popisuje revidované zařízení, rozsah, výsledky a závady (§ 10 NV č. 190/2022 Sb.), k pověřování osob neslouží. Provozovatel pověřuje písemně, listinně nebo elektronicky."
        },
        {
          id: "d",
          text: "Rozhodnutím Technické inspekce ČR",
          spravna: false,
          vysvetleni:
            "Technická inspekce České republiky vydává oprávnění firmám a osvědčení revizním technikům. Osobu odpovědnou za elektrické zařízení pověřuje sám provozovatel, a to písemně."
        }
      ],
      shrnuti: "Osobu odpovědnou za elektrické zařízení pověřuje provozovatel písemně – listinně nebo elektronicky.",
      fakta: ["K3-08", "K2-20", "K1-28"]
    },
    {
      id: "k3-q02",
      kapitola: K,
      podtema: "role",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Kdo může být vedoucím práce na vyhrazeném elektrickém zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Vždy jen revizní technik",
          spravna: false,
          vysvetleni:
            "Revizní technik je jednou z osob znalých, předpis ale vedoucím práce výhradně jeho nedělá. Vedoucím práce může být osoba znalá (§ 8 písm. e) NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Osoba poučená s praxí nejméně 2 roky",
          spravna: false,
          vysvetleni:
            "Osoba poučená není osobou znalou, a vedoucím práce proto být nemůže bez ohledu na délku praxe. Vedoucím práce může být pouze osoba znalá."
        },
        {
          id: "c",
          text: "Kdokoli, koho určí provozovatel",
          spravna: false,
          vysvetleni:
            "Provozovatel nemůže určit kohokoli. Vedoucím práce může být pouze osoba znalá a před zahájením se provede rozbor složitosti práce, aby byla zvolena vhodná odborná způsobilost."
        },
        {
          id: "d",
          text: "Pouze osoba znalá",
          spravna: true,
          vysvetleni:
            "Správně. Pro každou práci na vyhrazeném elektrickém zařízení se stanoví vedoucí práce, který ji řádně zajistí, a může jím být pouze osoba znalá (§ 8 písm. e) NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Vedoucím práce smí být jen osoba znalá; stanoví se pro každou práci na vyhrazeném elektrickém zařízení.",
      fakta: ["K3-09", "K1-03"]
    },
    {
      id: "k3-q03",
      kapitola: K,
      podtema: "role",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co patří k úkolům odpovědné osoby podle NV č. 194/2022 Sb.?",
      moznosti: [
        {
          id: "a",
          text: "Vystavovat doklady o zkoušce z odborné způsobilosti",
          spravna: false,
          vysvetleni:
            "Doklad o zkoušce vystavuje předseda zkušební komise (§ 9 odst. 4 NV č. 194/2022 Sb.). Odpovědná osoba stanoví pravidla činností a organizaci místa práce."
        },
        {
          id: "b",
          text: "Provádět pravidelné revize elektrických instalací",
          spravna: false,
          vysvetleni:
            "Revize smí provádět výhradně revizní technik s osvědčením v odpovídajícím rozsahu (§ 17 zákona č. 250/2021 Sb.). Odpovědná osoba odpovídá za bezpečný provoz a organizaci práce."
        },
        {
          id: "c",
          text: "Stanovit pravidla činností a organizaci místa práce",
          spravna: true,
          vysvetleni:
            "Správně. Odpovědná osoba odpovídá za bezpečný provoz elektrického zařízení, stanoví pravidla činností a organizaci místa práce a kontroluje, že činnosti vykonávají jen odborně způsobilé osoby (§ 2 písm. f) a § 3 odst. 3)."
        },
        {
          id: "d",
          text: "Vést evidenci oprávnění firem a osvědčení",
          spravna: false,
          vysvetleni:
            "Evidenci oprávnění a osvědčení vede pověřená organizace, Technická inspekce České republiky. Odpovědná osoba stanoví pravidla činností a organizaci místa práce."
        }
      ],
      shrnuti:
        "Odpovědná osoba odpovídá za bezpečný provoz, stanoví pravidla činností a organizaci místa práce a kontroluje odbornou způsobilost osob.",
      fakta: ["K3-10", "K1-15", "K2-09", "K1-28"]
    },
    {
      id: "k3-q04",
      kapitola: K,
      podtema: "role",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co všechno se podle NV č. 190/2022 Sb. počítá jako práce na vyhrazeném elektrickém zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Montáž, údržba i revize a také zajištění a odjištění pracoviště",
          spravna: true,
          vysvetleni:
            "Správně. Prací se rozumí montáž, demontáž, oprava, prohlídka, kontrola, údržba, zkoušení, měření a revize a také všechny úkony pro zajištění a odjištění pracoviště (§ 2 písm. b) NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Montáž, oprava a údržba, ale ne zajištění a odjištění pracoviště",
          spravna: false,
          vysvetleni:
            "Úkony pro zajištění a odjištění pracoviště jsou výslovně prací na vyhrazeném elektrickém zařízení. Smí je proto provádět jen odborně způsobilá osoba (§ 7 odst. 6 NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Jen montáž, demontáž a oprava, kontroly a revize už ne",
          spravna: false,
          vysvetleni:
            "Výčet je širší. Prací je i prohlídka, kontrola, údržba, zkoušení, měření a revize a také úkony pro zajištění a odjištění pracoviště."
        },
        {
          id: "d",
          text: "Jen činnosti na zařízení, které je právě pod napětím",
          spravna: false,
          vysvetleni:
            "Definice práce nerozlišuje, zda je zařízení pod napětím. Prací je montáž, demontáž, oprava, prohlídka, kontrola, údržba, zkoušení, měření, revize i zajištění a odjištění pracoviště."
        }
      ],
      shrnuti:
        "Prací na vyhrazeném elektrickém zařízení je i prohlídka, měření, revize a každý úkon pro zajištění a odjištění pracoviště.",
      fakta: ["K3-13", "K3-11"]
    },

    // ───────── Práce podle pokynů, s dohledem a pod dozorem ─────────
    {
      id: "k3-q05",
      kapitola: K,
      podtema: "rezimy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Čím je podle definice charakteristická práce pod dozorem?",
      moznosti: [
        {
          id: "a",
          text: "Kontrolou opatření před zahájením a dále podle potřeby",
          spravna: false,
          vysvetleni:
            "To popisuje práci s dohledem. Při práci pod dozorem je osoba pověřená dozorem přítomna trvale (§ 2 písm. j) NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Trvalou přítomností osoby pověřené dozorem",
          spravna: true,
          vysvetleni:
            "Správně. Práce pod dozorem se provádí za trvalé přítomnosti osoby pověřené dozorem a dozor smí vykonávat pouze osoba znalá (§ 2 písm. j) NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Písemným příkazem vydaným před zahájením práce",
          spravna: false,
          vysvetleni:
            "Definice práce pod dozorem písemný příkaz nezmiňuje. Rozhodující je trvalá přítomnost osoby pověřené dozorem."
        },
        {
          id: "d",
          text: "Pokyny, které na místě vydává osoba poučená",
          spravna: false,
          vysvetleni:
            "Pokyny pro práci na vyhrazeném elektrickém zařízení smí vydávat jen osoba znalá a ani tak nejde o dozor. Dozor znamená trvalou přítomnost osoby znalé pověřené dozorem."
        }
      ],
      shrnuti: "Dozor = trvalá přítomnost osoby znalé pověřené dozorem; dohled = kontrola opatření na začátku a dále podle potřeby.",
      fakta: ["K3-03", "K3-02", "K3-01"]
    },
    {
      id: "k3-q06",
      kapitola: K,
      podtema: "rezimy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Kdo smí vydávat pokyny pro práci na vyhrazeném elektrickém zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Pouze revizní technik",
          spravna: false,
          vysvetleni:
            "Revizní technik je osobou znalou, předpis ale vydávání pokynů neomezuje jen na něj. Pokyny může vydávat osoba znalá (§ 2 písm. h) NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Osoba poučená s platným poučením",
          spravna: false,
          vysvetleni:
            "Osoba poučená pracuje podle pokynů, sama je ale vydávat nesmí. Pokyny pro práci na vyhrazeném elektrickém zařízení může vydávat pouze osoba znalá."
        },
        {
          id: "c",
          text: "Osoba znalá",
          spravna: true,
          vysvetleni:
            "Správně. Práce podle pokynů je práce, pro kterou jsou dány nezbytné pokyny pro bezpečné a správné provedení, a vydávat je může pouze osoba znalá (§ 2 písm. h) NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Kterýkoli zaměstnanec provozovatele",
          spravna: false,
          vysvetleni:
            "Pokyny pro práci na vyhrazeném elektrickém zařízení nesmí dávat kdokoli. Předpis je svěřuje pouze osobě znalé."
        }
      ],
      shrnuti: "Pokyny pro práci na vyhrazeném elektrickém zařízení vydává pouze osoba znalá.",
      fakta: ["K3-01", "K1-03"]
    },
    {
      id: "k3-q07",
      kapitola: K,
      podtema: "rezimy",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Kolega, osoba znalá, má vykonávat dohled nad osobou poučenou. Ráno jí práci zadá po telefonu a pracoviště vůbec neuvidí. Splňuje to definici dohledu?",
      moznosti: [
        {
          id: "a",
          text: "Ano, dohled znamená jen kontrolu podle potřeby",
          spravna: false,
          vysvetleni:
            "Kontrola podle potřeby je jen část dohledu. Před zahájením se osoba vykonávající dohled musí přesvědčit, že jsou provedena bezpečnostní opatření."
        },
        {
          id: "b",
          text: "Ano, stačí, že pokyny vydala osoba znalá",
          spravna: false,
          vysvetleni:
            "To by odpovídalo práci podle pokynů. Dohled navíc vyžaduje, aby se osoba znalá před zahájením přesvědčila o bezpečnostních opatřeních a podle potřeby kontrolovala dodržování předpisů."
        },
        {
          id: "c",
          text: "Ne, dohled vyžaduje trvalou přítomnost na místě",
          spravna: false,
          vysvetleni:
            "Trvalá přítomnost je znakem práce pod dozorem. Dohled ji nevyžaduje, osoba znalá se ale musí před zahájením přesvědčit o bezpečnostních opatřeních."
        },
        {
          id: "d",
          text: "Ne, před zahájením se musí přesvědčit o opatřeních",
          spravna: true,
          vysvetleni:
            "Správně. Osoba vykonávající dohled se před zahájením práce přesvědčí, že jsou provedena bezpečnostní opatření, a podle potřeby kontroluje dodržování předpisů (§ 2 písm. i) NV č. 190/2022 Sb.). Zadání po telefonu to nesplňuje."
        }
      ],
      shrnuti: "Dohled začíná tím, že se osoba znalá před zahájením přesvědčí o bezpečnostních opatřeních; pak kontroluje podle potřeby.",
      fakta: ["K3-02", "K3-03", "K3-01"]
    },

    // ───────── Co smí osoba poučená ─────────
    {
      id: "k3-q08",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co smí osoba poučená vykonávat samostatně?",
      moznosti: [
        {
          id: "a",
          text: "Obsluhovat elektrická zařízení bez omezení napětí",
          spravna: true,
          vysvetleni:
            "Správně. Osoba poučená smí samostatně obsluhovat elektrická zařízení bez omezení napětí; dotýká se přitom jen částí určených k obsluze (§ 4 odst. 4 písm. a) NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Pracovat na zařízeních nízkého napětí bez napětí",
          spravna: false,
          vysvetleni:
            "Na zařízeních malého a nízkého napětí bez napětí smí osoba poučená pracovat jen podle pokynů osoby znalé, ne samostatně. Samostatně smí obsluhovat."
        },
        {
          id: "c",
          text: "Provádět revize zařízení malého napětí",
          spravna: false,
          vysvetleni:
            "Revize smí provádět výhradně revizní technik s osvědčením (§ 17 zákona č. 250/2021 Sb.). Osoba poučená smí samostatně jen obsluhovat."
        },
        {
          id: "d",
          text: "Pracovat v blízkosti živých částí s izolačním krytem",
          spravna: false,
          vysvetleni:
            "V blízkosti nekrytých živých částí nízkého napětí pod napětím smí osoba poučená pracovat jen s dohledem osoby znalé. Samostatně smí obsluhovat."
        }
      ],
      shrnuti: "Samostatně smí osoba poučená jen obsluhovat; práci vykonává podle pokynů, s dohledem nebo pod dozorem.",
      fakta: ["K3-04", "K3-05", "K2-09"]
    },
    {
      id: "k3-q09",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Za jakých podmínek smí osoba poučená pracovat v blízkosti nekrytých živých částí nízkého napětí, které jsou pod napětím?",
      moznosti: [
        {
          id: "a",
          text: "Samostatně, pokud dodrží bezpečnou vzdálenost od všech živých částí",
          spravna: false,
          vysvetleni:
            "Samostatně ne. Předpis vyžaduje dohled osoby znalé, a to v bezpečné vzdálenosti nebo až na dotyk s izolačním krytem (§ 4 odst. 4 písm. d) NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Jen pod dozorem revizního technika, který je po celou dobu přítomen",
          spravna: false,
          vysvetleni:
            "Dozor ani revizní technik tu podmínkou nejsou. Stačí dohled osoby znalé; dozor předpis vyžaduje až u nekrytých živých částí vysokého napětí."
        },
        {
          id: "c",
          text: "S dohledem osoby znalé, v bezpečné vzdálenosti nebo s izolačním krytem",
          spravna: true,
          vysvetleni:
            "Správně. V blízkosti nekrytých živých částí nízkého napětí pod napětím smí osoba poučená pracovat s dohledem osoby znalé, v bezpečné vzdálenosti nebo až na dotyk s izolačním krytem (§ 4 odst. 4 písm. d) NV č. 194/2022 Sb.)."
        },
        {
          id: "d",
          text: "Podle pokynů, které od osoby znalé dostala písemně před zahájením",
          spravna: false,
          vysvetleni:
            "Práce podle pokynů platí pro zařízení malého a nízkého napětí bez napětí a v jejich blízkosti. U nekrytých živých částí nízkého napětí pod napětím musí být dohled osoby znalé."
        }
      ],
      shrnuti: "Nekryté živé části nízkého napětí pod napětím: osoba poučená jen s dohledem osoby znalé, v bezpečné vzdálenosti nebo s izolačním krytem.",
      fakta: ["K3-05", "K3-04"]
    },
    {
      id: "k3-q10",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Kdy smí osoba poučená vykonávat práci ve zvláštních případech?",
      moznosti: [
        {
          id: "a",
          text: "Kdykoli, když s tím na místě ústně souhlasí vedoucí práce",
          spravna: false,
          vysvetleni:
            "Ústní souhlas nestačí. Podmínkou je zvláštní pracovní postup vydaný provozovatelem; osoba poučená s ním musí být předem a opakovaně seznámena a prakticky zacvičena a o seznámení se pořizuje zápis."
        },
        {
          id: "b",
          text: "Podle zvláštního pracovního postupu, po seznámení a zacvičení",
          spravna: true,
          vysvetleni:
            "Správně. Provozovatel pro tyto případy vydá zvláštní pracovní postup. Osoba poučená s ním musí být předem a opakovaně seznámena a prakticky zacvičena a o seznámení se pořizuje zápis (§ 4 odst. 4 písm. f) NV č. 194/2022 Sb.)."
        },
        {
          id: "c",
          text: "Po jednom roce praxe na zařízeních stejného druhu a napětí",
          spravna: false,
          vysvetleni:
            "Délka praxe tu podmínkou není. Rozhoduje zvláštní pracovní postup provozovatele, předchozí a opakované seznámení s ním, praktické zacvičení a zápis o seznámení."
        },
        {
          id: "d",
          text: "Jen pod trvalým dozorem revizního technika s osvědčením",
          spravna: false,
          vysvetleni:
            "Pro zvláštní případy předpis dozor revizního technika nestanoví. Podmínkou je zvláštní pracovní postup, seznámení s ním, praktické zacvičení a zápis."
        }
      ],
      shrnuti: "Zvláštní případy: jen podle zvláštního pracovního postupu provozovatele, po seznámení, zacvičení a se zápisem.",
      fakta: ["K3-06"]
    },
    {
      id: "k3-q11",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Řídíte práci, při které bude osoba poučená pracovat v blízkosti nekrytých živých částí vysokého napětí. Jak práci zajistíte?",
      moznosti: [
        {
          id: "a",
          text: "Podle pokynů, které osobě poučené předem vydáte",
          spravna: false,
          vysvetleni:
            "Podle pokynů smí osoba poučená pracovat na zařízeních malého a nízkého napětí bez napětí a v jejich blízkosti. V blízkosti nekrytých živých částí vysokého napětí smí jen pod dozorem osoby znalé."
        },
        {
          id: "b",
          text: "S dohledem – před zahájením zkontrolujete opatření",
          spravna: false,
          vysvetleni:
            "Dohled stačí u nekrytých živých částí nízkého napětí a u zařízení vysokého napětí bez napětí. U nekrytých živých částí vysokého napětí předpis vyžaduje dozor."
        },
        {
          id: "c",
          text: "Tuto práci osoba poučená nesmí vykonávat vůbec",
          spravna: false,
          vysvetleni:
            "Předpis tuto práci osobě poučené nezakazuje, jen ji podmiňuje dozorem osoby znalé (§ 4 odst. 4 písm. e) NV č. 194/2022 Sb.)."
        },
        {
          id: "d",
          text: "Pod dozorem osoby znalé, která bude trvale přítomna",
          spravna: true,
          vysvetleni:
            "Správně. V blízkosti nekrytých živých částí vysokého napětí smí osoba poučená pracovat jen pod dozorem osoby znalé (§ 4 odst. 4 písm. e) NV č. 194/2022 Sb.). Dozor znamená trvalou přítomnost."
        }
      ],
      shrnuti: "U nekrytých živých částí vysokého napětí smí osoba poučená pracovat jen pod dozorem – osoba znalá je trvale přítomna.",
      fakta: ["K3-05", "K3-03", "K3-04"]
    },

    // ───────── Hodnocení rizik, OOPP a školení ─────────
    {
      id: "k3-q12",
      kapitola: K,
      podtema: "rizika",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co se musí udělat před zahájením práce nebo obsluhy vyhrazeného elektrického zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Vyhodnotit elektrické riziko a stanovit opatření",
          spravna: true,
          vysvetleni:
            "Správně. Před zahájením práce nebo obsluhy se vyhodnotí elektrické riziko a stanoví, jak se práce provede a jaká bezpečnostní opatření se přijmou (§ 8 písm. b) NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Ohlásit práci předem oblastnímu inspektorátu práce",
          spravna: false,
          vysvetleni:
            "Oblastnímu inspektorátu práce provozovatel ohlašuje havárii se škodou zjevně přesahující 5 000 000 Kč (§ 22 zákona č. 250/2021 Sb.), ne běžnou práci. Před prací se vyhodnotí elektrické riziko."
        },
        {
          id: "c",
          text: "Objednat mimořádnou revizi celého zařízení",
          spravna: false,
          vysvetleni:
            "Revize se provádí například po dokončení montáže, po opravě podle potřeby nebo při změně parametrů ochran (§ 6 NV č. 190/2022 Sb.), ne před každou prací. Před prací se vyhodnotí elektrické riziko."
        },
        {
          id: "d",
          text: "Vyžádat si písemný souhlas Technické inspekce ČR",
          spravna: false,
          vysvetleni:
            "Technická inspekce České republiky vydává oprávnění firmám a osvědčení revizním technikům. Před prací předpis ukládá vyhodnotit elektrické riziko a stanovit opatření."
        }
      ],
      shrnuti: "Před každou prací i obsluhou: vyhodnotit elektrické riziko, určit postup a bezpečnostní opatření.",
      fakta: ["K3-07", "K2-26", "K2-11", "K1-28"]
    },
    {
      id: "k3-q13",
      kapitola: K,
      podtema: "rizika",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "O čem musí být školena každá osoba, která vykonává činnosti na vyhrazeném elektrickém zařízení, s ním nebo v jeho blízkosti?",
      moznosti: [
        {
          id: "a",
          text: "Jen o návodech k používání strojů a nářadí na svém pracovišti",
          spravna: false,
          vysvetleni:
            "Školení podle § 8 písm. c) NV č. 190/2022 Sb. je širší. Týká se předpisů bezpečnosti a ochrany zdraví při práci (BOZP) včetně místních provozních bezpečnostních předpisů."
        },
        {
          id: "b",
          text: "O předpisech BOZP i místních provozních bezpečnostních předpisech",
          spravna: true,
          vysvetleni:
            "Správně. Každá taková osoba musí být školena o předpisech bezpečnosti a ochrany zdraví při práci (BOZP) včetně místních provozních bezpečnostních předpisů, které se týkají její činnosti (§ 8 písm. c) NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Jen o první pomoci při úrazu elektrickým proudem a jejím nácviku",
          spravna: false,
          vysvetleni:
            "První pomoc je předmětem školení a zkoušky osob odborně způsobilých (§ 9 odst. 1 NV č. 194/2022 Sb.). Školení podle § 8 písm. c) NV č. 190/2022 Sb. se ale týká předpisů BOZP včetně místních provozních bezpečnostních předpisů."
        },
        {
          id: "d",
          text: "O předpisech BOZP; místní předpisy se týkají jen osob znalých",
          spravna: false,
          vysvetleni:
            "Místní provozní bezpečnostní předpisy se týkají každé osoby, která na zařízení, s ním nebo v jeho blízkosti vykonává činnosti, nejen osob znalých."
        }
      ],
      shrnuti: "Každý, kdo pracuje na vyhrazeném elektrickém zařízení nebo v jeho blízkosti, je školen o předpisech BOZP včetně místních provozních bezpečnostních předpisů.",
      fakta: ["K3-12", "K1-26"]
    },
    {
      id: "k3-q14",
      kapitola: K,
      podtema: "rizika",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Zaměstnavatel zajišťuje zaměstnancům školení o předpisech BOZP podle zákoníku práce. Jakých předpisů se má školení týkat?",
      moznosti: [
        {
          id: "a",
          text: "Jen předpisů, které zaměstnanec potřebuje ke zkoušce podle § 7",
          spravna: false,
          vysvetleni:
            "Školení podle § 103 odst. 2 zákoníku práce se neváže na zkoušku. Týká se předpisů BOZP, které doplňují odborné předpoklady zaměstnanců a vztahují se k vykonávané práci."
        },
        {
          id: "b",
          text: "Jen předpisů o první pomoci a o hlášení pracovních úrazů",
          spravna: false,
          vysvetleni:
            "Školení podle § 103 odst. 2 zákoníku práce se neomezuje na první pomoc. Týká se předpisů BOZP, které doplňují odborné předpoklady a vztahují se k vykonávané práci."
        },
        {
          id: "c",
          text: "Předpisů doplňujících odborné předpoklady a týkajících se práce",
          spravna: true,
          vysvetleni:
            "Správně. Zaměstnavatel zajistí školení o právních a ostatních předpisech k zajištění BOZP, které doplňují odborné předpoklady zaměstnanců a vztahují se k vykonávané práci (§ 103 odst. 2 zákoníku práce)."
        },
        {
          id: "d",
          text: "Všech platných předpisů BOZP bez ohledu na druh vykonávané práce",
          spravna: false,
          vysvetleni:
            "Školení se týká předpisů, které se vztahují k vykonávané práci a doplňují odborné předpoklady zaměstnance, ne všech předpisů bez rozdílu."
        }
      ],
      shrnuti: "Zákoník práce: školení o předpisech BOZP, které doplňují odborné předpoklady a vztahují se k vykonávané práci.",
      fakta: ["K3-15"]
    },

    // ───────── Řízení práce v praxi ─────────
    {
      id: "k3-q15",
      kapitola: K,
      podtema: "praxe",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Ráno rozdělujete práci: v dílně je potřeba vyměnit vadnou zásuvku. Co musí předcházet tomu, než určíte, kdo práci provede?",
      moznosti: [
        {
          id: "a",
          text: "Revize celého zásuvkového obvodu revizním technikem",
          spravna: false,
          vysvetleni:
            "Revize se před každou prací nedělá; po opravě se provádí podle potřeby (§ 6 odst. 2 NV č. 190/2022 Sb.). Před zahájením práce se provede rozbor složitosti práce."
        },
        {
          id: "b",
          text: "Výběr pracovníka podle toho, jak dlouho je u firmy",
          spravna: false,
          vysvetleni:
            "Rozhoduje odborná způsobilost odpovídající složitosti práce, ne délka zaměstnání. Proto se před zahájením provede rozbor složitosti práce (§ 8 písm. e) NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Nový zápis o poučení každého pracovníka party",
          spravna: false,
          vysvetleni:
            "Zápis o poučení je dokladem osoby poučené (§ 4 odst. 3 NV č. 194/2022 Sb.), výběr pracovníka pro konkrétní práci nenahrazuje. Před zahájením se provede rozbor složitosti práce."
        },
        {
          id: "d",
          text: "Rozbor složitosti práce a podle něj volba osoby",
          spravna: true,
          vysvetleni:
            "Správně. Před zahájením práce se provede rozbor její složitosti, aby byla zvolena osoba s vhodnou odbornou způsobilostí; práci řádně zajistí vedoucí práce (§ 8 písm. e) NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Než určíte pracovníka, proveďte rozbor složitosti práce – podle něj zvolíte vhodnou odbornou způsobilost.",
      fakta: ["K3-09", "K2-11", "K1-18"]
    },
    {
      id: "k3-q16",
      kapitola: K,
      podtema: "praxe",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Na pracoviště, které řídíte, přichází na praktickou výuku student elektrotechnického oboru. Za jakých podmínek se smí zapojit do práce?",
      moznosti: [
        {
          id: "a",
          text: "Smí dělat činnosti podle znalostí, pod vedením, po zaškolení a ověření",
          spravna: true,
          vysvetleni:
            "Správně. Žáci a studenti elektrotechnických oborů smějí při praktické výuce jen činnosti odpovídající postupně nabývaným znalostem, vždy pod vedením určené osoby s odpovídající odbornou způsobilostí, a musí být předem zaškoleni a ověřeni (§ 3 odst. 5 NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Smí pracovat jako osoba poučená, jakmile dosáhne věku 18 let",
          spravna: false,
          vysvetleni:
            "Věk sám nic neopravňuje. Pro žáky a studenty platí zvláštní pravidlo: jen činnosti podle postupně nabývaných znalostí, pod vedením určené osoby, po zaškolení a ověření."
        },
        {
          id: "c",
          text: "Smí pracovat samostatně, pokud prošel ve škole výukou bezpečnosti",
          spravna: false,
          vysvetleni:
            "Samostatně ne. Student smí vždy jen pod vedením určené osoby s odpovídající odbornou způsobilostí, a to po předchozím zaškolení a ověření."
        },
        {
          id: "d",
          text: "Smí jen přihlížet, do žádné činnosti se zapojit nesmí",
          spravna: false,
          vysvetleni:
            "Předpis studentům činnosti dovoluje, jen je omezuje: musí odpovídat postupně nabývaným znalostem a probíhat pod vedením určené osoby po zaškolení a ověření."
        }
      ],
      shrnuti: "Žáci a studenti: jen činnosti podle nabytých znalostí, vždy pod vedením určené osoby, po zaškolení a ověření.",
      fakta: ["K3-14"]
    },
    {
      id: "k3-q17",
      kapitola: K,
      podtema: "praxe",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Při kontrole pracoviště zjistíte, že nový montér dostal osobní ochranné pracovní prostředky (OOPP), ale nikdo ho neseznámil s jejich používáním. Co zajistíte?",
      moznosti: [
        {
          id: "a",
          text: "Nic dalšího, návod k OOPP si přečte sám během práce",
          spravna: false,
          vysvetleni:
            "Samostudium za práce nestačí. Pracovat smí jen osoba vybavená OOPP a seznámená s jejich používáním; o seznámení se pořizuje zápis podepsaný oběma stranami."
        },
        {
          id: "b",
          text: "Seznámení s používáním OOPP a zápis podepsaný oběma stranami",
          spravna: true,
          vysvetleni:
            "Správně. Práce na vyhrazeném elektrickém zařízení smí provádět jen odborně způsobilá osoba vybavená potřebnými OOPP a seznámená s jejich používáním; o seznámení se pořizuje zápis podepsaný oběma stranami (§ 7 odst. 6 NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Nic, OOPP jsou povinné jen při práci pod napětím",
          spravna: false,
          vysvetleni:
            "Předpis požadavek na OOPP neomezuje na práci pod napětím. Na vyhrazeném elektrickém zařízení smí pracovat jen osoba vybavená potřebnými OOPP a seznámená s jejich používáním."
        },
        {
          id: "d",
          text: "Ústní seznámení, zápis se pořizuje jen u osob poučených",
          spravna: false,
          vysvetleni:
            "Zápis o seznámení s OOPP se pořizuje u každé osoby, která na vyhrazeném elektrickém zařízení pracuje, a podepisují ho obě strany."
        }
      ],
      shrnuti: "Kdo pracuje na vyhrazeném elektrickém zařízení, má OOPP a je seznámen s jejich používáním – se zápisem podepsaným oběma.",
      fakta: ["K3-11"]
    },
    {
      id: "k3-q18",
      kapitola: K,
      podtema: "praxe",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Jste vedoucí práce. Dva údržbáři, osoby poučené, mají pracovat na vypnutém zařízení vysokého napětí. Jak práci zajistíte?",
      moznosti: [
        {
          id: "a",
          text: "Podle pokynů, které jim vydáte před zahájením práce",
          spravna: false,
          vysvetleni:
            "Práce podle pokynů platí pro zařízení malého a nízkého napětí bez napětí a v jejich blízkosti. Na zařízeních vysokého napětí bez napětí smí osoba poučená pracovat s dohledem."
        },
        {
          id: "b",
          text: "Samostatně, protože zařízení je vypnuté a bez napětí",
          spravna: false,
          vysvetleni:
            "Samostatně smí osoba poučená jen obsluhovat. Na zařízeních vysokého napětí bez napětí a v jejich blízkosti smí pracovat s dohledem (§ 4 odst. 4 písm. c) NV č. 194/2022 Sb.)."
        },
        {
          id: "c",
          text: "S dohledem osoby znalé, která opatření předem zkontroluje",
          spravna: true,
          vysvetleni:
            "Správně. Na zařízeních vysokého napětí bez napětí a v jejich blízkosti smí osoba poučená pracovat s dohledem (§ 4 odst. 4 písm. c) NV č. 194/2022 Sb.). Osoba znalá se před zahájením přesvědčí o opatřeních a dále kontroluje podle potřeby."
        },
        {
          id: "d",
          text: "Tuto práci osoby poučené na vysokém napětí nesmějí vůbec",
          spravna: false,
          vysvetleni:
            "Předpis osobám poučeným práci na vypnutém zařízení vysokého napětí dovoluje, a to s dohledem osoby znalé."
        }
      ],
      shrnuti: "Zařízení vysokého napětí bez napětí: osoba poučená s dohledem; u nekrytých živých částí vysokého napětí jen pod dozorem.",
      fakta: ["K3-04", "K3-02", "K3-05"]
    }
  ]
};

export default obsah;
