// Kapitola 9 – Revize a měření v praxi.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
// Přílohy č. 1 a 2 NV č. 190/2022 Sb. parafrázujeme; normy ČSN popisujeme vlastními slovy.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k9-revize-mereni" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "podklady", nazev: "Podklady k revizi" },
    { id: "prohlidka", nazev: "Prohlídka" },
    { id: "poradi", nazev: "Pořadí zkoušek a měření" },
    { id: "mereni", nazev: "Funkční zkoušky a měření" },
    { id: "spotrebice", nazev: "Spotřebiče a nářadí" }
  ],

  lekce: [
    {
      id: "k9-l01",
      podtema: "podklady",
      nadpis: "Podklady pro výchozí revizi",
      text: md(
        "Podklady pro **výchozí revizi** jsou mimo jiné:",
        "- **dokumentace skutečného provedení** s technickou zprávou,",
        "- **protokol o určení vnějších vlivů**,",
        "- záznamy o **prohlídkách a zkouškách během montáže**,",
        "- protokoly o **kusovém ověřování** zabudovaných výrobků,",
        "- identifikace **montážní firmy** včetně čísla oprávnění.",
        "",
        "Při výchozí revizi se kontroluje **shoda skutečného provedení** s projektovou a průvodní dokumentací a její **úplnost**. Následuje prohlídka z hlediska vnějších vlivů, prohlídka a zkouška stavu zařízení a potřebná měření s vyhodnocením.",
        "",
        "Bez úplných podkladů tedy výchozí revize nemá s čím porovnávat."
      ),
      fakta: ["K9-04", "K9-06"]
    },
    {
      id: "k9-l02",
      podtema: "podklady",
      nadpis: "Podklady pro pravidelnou a mimořádnou revizi",
      text: md(
        "Podklady pro **pravidelnou a mimořádnou revizi** jsou:",
        "- **provozní a výkresová dokumentace**,",
        "- **protokol o vnějších vlivech**,",
        "- záznamy o **prohlídkách, zkouškách a závadách**,",
        "- **zpráva o předchozí revizi**,",
        "- doklady o **kontrolách inspekce práce**,",
        "- u zařízení **I. třídy** osvědčení **pověřené organizace**,",
        "- u **mimořádné** revize **doklad o jejím důvodu**.",
        "",
        "Výsledkem revize je **zpráva o revizi**. Uvádí mimo jiné druh revize (výchozí, pravidelná, mimořádná s důvodem), naměřené hodnoty, závady s odkazem na porušené předpisy, celkové zhodnocení a doporučenou lhůtu příští revize."
      ),
      fakta: ["K9-05", "K2-20"]
    },
    {
      id: "k9-l03",
      podtema: "prohlidka",
      nadpis: "Prohlídka předchází zkoušce",
      text: md(
        "Revize začíná **prohlídkou** – **prohlídka předchází zkoušce**. Kontroluje se mimo jiné:",
        "- ochrana před úrazem elektrickým proudem a protipožární přepážky,",
        "- volba vodičů podle zatížitelnosti a úbytku napětí,",
        "- nastavení ochranných prvků a spínací prvky,",
        "- volba zařízení s ohledem na **vnější vlivy** a oprávněnost zatřídění prostorů,",
        "- **označení středních a ochranných vodičů**, schémata, výstražné nápisy a označení obvodů,",
        "- spoje vodičů a přístupnost.",
        "",
        "Rozsah prohlídky a zkoušky dává příloha č. 1 NV č. 190/2022 Sb., pokud výrobce nestanovil odlišné nebo další požadavky. Bod, který **není technicky proveditelný** nebo **není z hlediska bezpečnosti důvodný**, se provádět nemusí."
      ),
      fakta: ["K9-02", "K8-02", "K9-07"]
    },
    {
      id: "k9-l04",
      podtema: "poradi",
      nadpis: "Pořadí zkoušek a měření",
      text: md(
        "Příloha č. 1 NV č. 190/2022 Sb. stanoví, v jakém **pořadí** se zkoušky a měření provádějí:",
        "- **1.** spojitost ochranných vodičů a vodičů pospojování,",
        "- **2.** izolační stav,",
        "- **3.** ochrana oddělením obvodů a SELV/PELV,",
        "- **4.** izolační odpor podlahy a stěn,",
        "- **5.** automatické odpojení od zdroje,",
        "- **6.** zkouška zapojení přístrojů,",
        "- **7.** zkouška elektrické pevnosti,",
        "- **8.** funkční zkouška,",
        "- **9.** tepelné účinky, **10.** úbytek napětí,",
        "- **11.** zkouška polarity, **12.** pořadí fází.",
        "",
        "Projděte si pořadí v ilustraci; u některých kroků najdete podrobnosti."
      ),
      ilustrace: "poradi-mereni",
      fakta: ["K9-01"]
    },
    {
      id: "k9-l05",
      podtema: "mereni",
      nadpis: "Funkční zkoušky",
      text: md(
        "**Funkční zkouškou** se ověřuje, že ochranná a bezpečnostní zařízení skutečně fungují. Funkčně se zkoušejí:",
        "- **hlídače izolačního stavu**,",
        "- **proudové chrániče** – zkušebním tlačítkem nebo postupem výrobce či normy,",
        "- **bezpečnostní zařízení**, například nouzové vypnutí a blokování,",
        "- **hlásiče a ukazatele stavu**,",
        "- **přepěťové ochrany**.",
        "",
        "V pořadí zkoušek a měření je funkční zkouška osmá, hned po zkoušce elektrické pevnosti.",
        "",
        "**Elektrická pevnost izolace** se zkouší jen tehdy, nemají-li použité výrobky vlastnosti **doložené výrobcem**."
      ),
      fakta: ["K9-03", "K9-01"]
    },
    {
      id: "k9-l06",
      podtema: "mereni",
      nadpis: "Izolační odpor a impedance poruchové smyčky",
      text: md(
        "Dvě důležitá měření:",
        "- **izolační odpor** obvodů do 500 V se měří **stejnosměrným napětím 500 V**; nejmenší přípustná hodnota je **1 MΩ**,",
        "- **impedance poruchové smyčky** – jejím měřením se ověřuje, zda při poruše proteče **dostatečný proud**, aby ochranný prvek odpojil v předepsané době.",
        "",
        "Předepsaná doba je například **0,4 s** pro koncový obvod 230 V v síti TN a **0,2 s** v síti TT.",
        "",
        "Izolační stav je v pořadí zkoušek druhý, automatické odpojení od zdroje páté.",
        "",
        "Hodnoty z ČSN 33 2000-6 ed. 2 je potřeba ověřit v aktuálním znění normy."
      ),
      fakta: ["K9-08", "K9-11", "K6-02", "K9-01"]
    },
    {
      id: "k9-l07",
      podtema: "spotrebice",
      nadpis: "Spotřebiče a ruční nářadí",
      text: md(
        "**Ruční nářadí a spotřebiče do 400 V**, které **nejsou určeny k pevnému připojení**, nejsou vyhrazenými elektrickými zařízeními. Revize podle NV č. 190/2022 Sb. se na ně **nevztahují**. Stejně tak prodlužovací šňůry a odpojitelné přívody.",
        "",
        "Kontrolují se ale podle norem pro kontroly během používání:",
        "- **ČSN 33 1600 ed. 2** – ruční elektrické nářadí,",
        "- **ČSN 33 1610** – elektrické spotřebiče.",
        "",
        "Pozor na spotřebiče **určené k pevnému připojení**: na ty se výjimka nevztahuje. Pevně připojený ohřívač vody tedy do výjimky nepatří, mikrovlnná trouba zapojená do zásuvky ano."
      ),
      fakta: ["K9-09", "K9-10", "K2-03"]
    }
  ],

  otazky: [
    // ───────── Podklady k revizi ─────────
    {
      id: "k9-q01",
      kapitola: K,
      podtema: "podklady",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Který z těchto podkladů patří k výchozí revizi?",
      moznosti: [
        {
          id: "a",
          text: "Zpráva o předchozí revizi",
          spravna: false,
          vysvetleni:
            "Zpráva o předchozí revizi patří k podkladům pro pravidelnou a mimořádnou revizi. K výchozí revizi se předkládá dokumentace skutečného provedení s technickou zprávou."
        },
        {
          id: "b",
          text: "Doklad o důvodu mimořádné revize",
          spravna: false,
          vysvetleni:
            "Doklad o důvodu se předkládá u mimořádné revize. K výchozí revizi patří dokumentace skutečného provedení s technickou zprávou."
        },
        {
          id: "c",
          text: "Doklady o kontrolách inspekce práce",
          spravna: false,
          vysvetleni:
            "Doklady o kontrolách inspekce práce jsou podkladem pro pravidelnou a mimořádnou revizi. K výchozí revizi patří dokumentace skutečného provedení."
        },
        {
          id: "d",
          text: "Dokumentace skutečného provedení s technickou zprávou",
          spravna: true,
          vysvetleni:
            "Správně. Podklady pro výchozí revizi jsou mimo jiné dokumentace skutečného provedení s technickou zprávou, protokol o určení vnějších vlivů a záznamy o prohlídkách a zkouškách během montáže (příloha č. 2 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Výchozí revize: dokumentace skutečného provedení, protokol o vnějších vlivech, záznamy z montáže.",
      fakta: ["K9-04", "K9-05"]
    },
    {
      id: "k9-q02",
      kapitola: K,
      podtema: "podklady",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Který podklad se k pravidelné revizi předkládá jen u zařízení I. třídy?",
      moznosti: [
        {
          id: "a",
          text: "Osvědčení pověřené organizace",
          spravna: true,
          vysvetleni:
            "Správně. U zařízení I. třídy patří k podkladům pro pravidelnou a mimořádnou revizi i osvědčení pověřené organizace, na jehož základě bylo zařízení uvedeno do provozu."
        },
        {
          id: "b",
          text: "Protokol o určení vnějších vlivů",
          spravna: false,
          vysvetleni:
            "Protokol o vnějších vlivech je podkladem u všech zařízení, nejen u I. třídy. U I. třídy přibývá osvědčení pověřené organizace."
        },
        {
          id: "c",
          text: "Zpráva o předchozí revizi",
          spravna: false,
          vysvetleni:
            "Zpráva o předchozí revizi se předkládá u každé pravidelné revize. Jen u I. třídy přibývá osvědčení pověřené organizace."
        },
        {
          id: "d",
          text: "Provozní a výkresová dokumentace",
          spravna: false,
          vysvetleni:
            "Provozní a výkresová dokumentace patří k podkladům u všech zařízení. Jen u I. třídy přibývá osvědčení pověřené organizace."
        }
      ],
      shrnuti: "Zařízení I. třídy: k podkladům revize patří i osvědčení pověřené organizace.",
      fakta: ["K9-05", "K2-05"]
    },
    {
      id: "k9-q03",
      kapitola: K,
      podtema: "podklady",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Po požáru v části objektu objednáváte mimořádnou revizi elektroinstalace. Co musíte k podkladům přidat oproti pravidelné revizi?",
      moznosti: [
        {
          id: "a",
          text: "Protokoly o kusovém ověřování všech výrobků",
          spravna: false,
          vysvetleni:
            "Protokoly o kusovém ověřování zabudovaných výrobků patří k podkladům pro výchozí revizi. U mimořádné revize přibývá doklad o jejím důvodu."
        },
        {
          id: "b",
          text: "Doklad o důvodu mimořádné revize",
          spravna: true,
          vysvetleni:
            "Správně. Pro pravidelnou i mimořádnou revizi se předkládají stejné podklady, u mimořádné navíc doklad o jejím důvodu. Důvod se uvádí i ve zprávě o revizi."
        },
        {
          id: "c",
          text: "Nic, podklady jsou úplně stejné",
          spravna: false,
          vysvetleni:
            "Podklady jsou téměř stejné, ale u mimořádné revize přibývá doklad o jejím důvodu."
        },
        {
          id: "d",
          text: "Identifikaci montážní firmy s číslem oprávnění",
          spravna: false,
          vysvetleni:
            "Identifikace montážní firmy patří k podkladům pro výchozí revizi. U mimořádné revize přibývá doklad o jejím důvodu."
        }
      ],
      shrnuti: "Mimořádná revize: k obvyklým podkladům přidat doklad o jejím důvodu.",
      fakta: ["K9-05", "K9-04", "K2-20"]
    },
    {
      id: "k9-q04",
      kapitola: K,
      podtema: "podklady",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co se při výchozí revizi kontroluje u dokumentace?",
      moznosti: [
        {
          id: "a",
          text: "Jen podpis projektanta na dokumentaci",
          spravna: false,
          vysvetleni:
            "Kontroluje se shoda skutečného provedení s projektovou a průvodní dokumentací a úplnost dokumentace."
        },
        {
          id: "b",
          text: "Jen platnost oprávnění montážní firmy",
          spravna: false,
          vysvetleni:
            "Identifikace montážní firmy je jeden z podkladů. U dokumentace se kontroluje shoda skutečného provedení s projektovou a průvodní dokumentací a její úplnost."
        },
        {
          id: "c",
          text: "Shoda skutečného provedení s dokumentací a úplnost",
          spravna: true,
          vysvetleni:
            "Správně. Při výchozí revizi se kontroluje shoda skutečného provedení s projektovou a průvodní dokumentací a její úplnost (příloha č. 2, část B)."
        },
        {
          id: "d",
          text: "Zda dokumentace uvádí lhůty příštích revizí",
          spravna: false,
          vysvetleni:
            "Doporučená lhůta příští revize je náležitostí zprávy o revizi. U dokumentace se při výchozí revizi kontroluje shoda s provedením a úplnost."
        }
      ],
      shrnuti: "Výchozí revize: shoda skutečného provedení s dokumentací a její úplnost.",
      fakta: ["K9-06", "K9-04", "K2-20"]
    },

    // ───────── Prohlídka ─────────
    {
      id: "k9-q05",
      kapitola: K,
      podtema: "prohlidka",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co při revizi předchází zkouškám a měření?",
      moznosti: [
        {
          id: "a",
          text: "Prohlídka zařízení",
          spravna: true,
          vysvetleni: "Správně. Prohlídka předchází zkoušce (příloha č. 1 NV č. 190/2022 Sb., část A)."
        },
        {
          id: "b",
          text: "Měření automatického odpojení",
          spravna: false,
          vysvetleni:
            "Automatické odpojení od zdroje je v pořadí zkoušek a měření až páté. Zkouškám předchází prohlídka."
        },
        {
          id: "c",
          text: "Funkční zkouška chráničů",
          spravna: false,
          vysvetleni: "Funkční zkouška je v pořadí zkoušek až osmá. Zkouškám předchází prohlídka."
        },
        {
          id: "d",
          text: "Vypracování zprávy o revizi",
          spravna: false,
          vysvetleni: "Zpráva o revizi je výsledkem revize, ne jejím prvním krokem. Zkouškám předchází prohlídka."
        }
      ],
      shrnuti: "Nejdřív prohlídka, potom zkoušky a měření.",
      fakta: ["K9-02", "K9-01"]
    },
    {
      id: "k9-q06",
      kapitola: K,
      podtema: "prohlidka",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Která z těchto kontrol patří do prohlídky?",
      moznosti: [
        {
          id: "a",
          text: "Měření izolačního stavu",
          spravna: false,
          vysvetleni:
            "Izolační stav je druhá položka v pořadí zkoušek a měření. Do prohlídky patří například kontrola označení středních a ochranných vodičů."
        },
        {
          id: "b",
          text: "Zkouška polarity",
          spravna: false,
          vysvetleni:
            "Zkouška polarity je jedenáctá v pořadí zkoušek a měření. Prohlídka kontroluje například označení vodičů."
        },
        {
          id: "c",
          text: "Označení středních a ochranných vodičů",
          spravna: true,
          vysvetleni:
            "Správně. Při prohlídce se kontroluje mimo jiné označení středních a ochranných vodičů, schémata, výstražné nápisy a označení obvodů (příloha č. 1, část A)."
        },
        {
          id: "d",
          text: "Kontrola pořadí fází",
          spravna: false,
          vysvetleni:
            "Pořadí fází je poslední položka v pořadí zkoušek a měření, ne součást prohlídky. Prohlídka kontroluje například označení vodičů."
        }
      ],
      shrnuti: "Označení vodičů, schémata a nápisy se kontrolují při prohlídce, ještě před zkouškami a měřením.",
      fakta: ["K9-02", "K9-01"]
    },
    {
      id: "k9-q07",
      kapitola: K,
      podtema: "prohlidka",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Při revizi strojovny je jeden bod zkoušek podle přílohy č. 1 technicky neproveditelný. Revizní technik se ptá, jak postupovat. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Revizi nelze dokončit, dokud se bod neprovede",
          spravna: false,
          vysvetleni:
            "Bod, který není technicky proveditelný nebo není z hlediska bezpečnosti důvodný, se provádět nemusí (§ 7 odst. 3 NV č. 190/2022 Sb.)."
        },
        {
          id: "b",
          text: "Bod lze vynechat, není-li technicky proveditelný",
          spravna: true,
          vysvetleni:
            "Správně. Prohlídka a zkouška se provádějí v rozsahu přílohy č. 1, pokud výrobce nestanovil jinak; bod, který není technicky proveditelný nebo z hlediska bezpečnosti důvodný, se provádět nemusí."
        },
        {
          id: "c",
          text: "Bod nahradí jiné měření, které určí provozovatel",
          spravna: false,
          vysvetleni:
            "Rozsah neurčuje provozovatel, ale příloha č. 1 nebo odlišné požadavky výrobce. Technicky neproveditelný bod se provádět nemusí."
        },
        {
          id: "d",
          text: "Bod lze vynechat jen se souhlasem inspektorátu",
          spravna: false,
          vysvetleni:
            "Souhlas inspektorátu práce § 7 odst. 3 nevyžaduje. Bod, který není technicky proveditelný nebo není z hlediska bezpečnosti důvodný, se provádět nemusí."
        }
      ],
      shrnuti: "Technicky neproveditelný nebo bezpečnostně nedůvodný bod se provádět nemusí.",
      fakta: ["K9-07"]
    },

    // ───────── Pořadí zkoušek a měření ─────────
    {
      id: "k9-q08",
      kapitola: K,
      podtema: "poradi",
      typ: "poradi",
      obtiznost: 2,
      zadani: "Seřaďte tyto zkoušky a měření podle přílohy č. 1 NV č. 190/2022 Sb.",
      polozky: [
        { id: "odpojeni", text: "Automatické odpojení od zdroje" },
        { id: "spojitost", text: "Spojitost ochranných vodičů a vodičů pospojování" },
        { id: "funkcni", text: "Funkční zkouška" },
        { id: "faze", text: "Pořadí fází" },
        { id: "izolace", text: "Izolační stav" },
        { id: "ubytek", text: "Úbytek napětí" }
      ],
      spravnePoradi: ["spojitost", "izolace", "odpojeni", "funkcni", "ubytek", "faze"],
      vysvetleniPoradi:
        "Podle přílohy č. 1 NV č. 190/2022 Sb. se nejdřív zkouší spojitost ochranných vodičů a vodičů pospojování, potom izolační stav. Automatické odpojení od zdroje je v úplném pořadí páté, funkční zkouška osmá, úbytek napětí desátý a pořadí fází poslední, dvanácté.",
      shrnuti: "Začíná se spojitostí ochranných vodičů a izolačním stavem, končí se pořadím fází.",
      fakta: ["K9-01"],
      ilustrace: "poradi-mereni"
    },
    {
      id: "k9-q09",
      kapitola: K,
      podtema: "poradi",
      typ: "vyber",
      obtiznost: 1,
      zadani:
        "Co se podle přílohy č. 1 zkouší hned po spojitosti ochranných vodičů a vodičů pospojování?",
      moznosti: [
        {
          id: "a",
          text: "Automatické odpojení od zdroje",
          spravna: false,
          vysvetleni: "Automatické odpojení je v pořadí až páté. Po spojitosti ochranných vodičů následuje izolační stav."
        },
        {
          id: "b",
          text: "Funkční zkouška",
          spravna: false,
          vysvetleni: "Funkční zkouška je osmá. Druhé v pořadí je měření izolačního stavu."
        },
        {
          id: "c",
          text: "Zkouška polarity",
          spravna: false,
          vysvetleni: "Zkouška polarity je jedenáctá. Hned po spojitosti ochranných vodičů se zkouší izolační stav."
        },
        {
          id: "d",
          text: "Izolační stav",
          spravna: true,
          vysvetleni:
            "Správně. Pořadí začíná spojitostí ochranných vodičů a vodičů pospojování, druhý je izolační stav a třetí ochrana oddělením obvodů a SELV/PELV."
        }
      ],
      shrnuti: "První spojitost ochranných vodičů, druhý izolační stav.",
      fakta: ["K9-01"]
    },
    {
      id: "k9-q10",
      kapitola: K,
      podtema: "poradi",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Revizní technik chce začít měřením automatického odpojení od zdroje a spojitost ochranných vodičů změřit až na konci. Co mu řeknete?",
      moznosti: [
        {
          id: "a",
          text: "Je to jedno, na pořadí zkoušek nezáleží",
          spravna: false,
          vysvetleni:
            "Pořadí stanoví příloha č. 1 NV č. 190/2022 Sb.: spojitost ochranných vodičů je první, automatické odpojení páté."
        },
        {
          id: "b",
          text: "Spojitost ochranných vodičů se zkouší jako první",
          spravna: true,
          vysvetleni:
            "Správně. Podle přílohy č. 1 je spojitost ochranných vodičů a vodičů pospojování první; automatické odpojení od zdroje přichází na řadu až jako páté."
        },
        {
          id: "c",
          text: "Postupuje správně, odpojení je vždy první",
          spravna: false,
          vysvetleni:
            "Automatické odpojení od zdroje je v pořadí až páté. Začíná se spojitostí ochranných vodičů a vodičů pospojování."
        },
        {
          id: "d",
          text: "Nejdřív má udělat funkční zkoušku chráničů",
          spravna: false,
          vysvetleni:
            "Funkční zkouška je v pořadí osmá. Jako první se zkouší spojitost ochranných vodičů a vodičů pospojování."
        }
      ],
      shrnuti: "Zkoušky a měření mají pevné pořadí: spojitost ochranných vodičů vždy jako první.",
      fakta: ["K9-01"]
    },

    // ───────── Funkční zkoušky a měření ─────────
    {
      id: "k9-q11",
      kapitola: K,
      podtema: "mereni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak se při revizi funkčně zkouší proudový chránič?",
      moznosti: [
        {
          id: "a",
          text: "Měřením izolačního odporu chrániče",
          spravna: false,
          vysvetleni:
            "Izolační stav je samostatné měření. Proudový chránič se funkčně zkouší zkušebním tlačítkem nebo postupem výrobce či normy."
        },
        {
          id: "b",
          text: "Zkouškou elektrické pevnosti izolace",
          spravna: false,
          vysvetleni:
            "Elektrická pevnost se zkouší jen tehdy, nemají-li výrobky vlastnosti doložené výrobcem. Chránič se funkčně zkouší zkušebním tlačítkem nebo postupem výrobce či normy."
        },
        {
          id: "c",
          text: "Zkušebním tlačítkem nebo postupem výrobce či normy",
          spravna: true,
          vysvetleni:
            "Správně. Proudové chrániče se funkčně zkoušejí zkušebním tlačítkem nebo postupem výrobce či normy (příloha č. 1, část B bod II)."
        },
        {
          id: "d",
          text: "Jen prohlídkou polohy ovládací páčky",
          spravna: false,
          vysvetleni:
            "Prohlídka nestačí, chránič se zkouší funkčně: zkušebním tlačítkem nebo postupem výrobce či normy."
        }
      ],
      shrnuti: "Proudový chránič: funkční zkouška tlačítkem nebo postupem výrobce či normy.",
      fakta: ["K9-03"]
    },
    {
      id: "k9-q12",
      kapitola: K,
      podtema: "mereni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Kdy se při revizi zkouší elektrická pevnost izolace?",
      moznosti: [
        {
          id: "a",
          text: "Jen nemají-li výrobky vlastnosti doložené výrobcem",
          spravna: true,
          vysvetleni:
            "Správně. Elektrická pevnost izolace se zkouší jen tehdy, nemají-li použité výrobky vlastnosti doložené výrobcem (příloha č. 1, část B bod II)."
        },
        {
          id: "b",
          text: "Vždy, u každé výchozí i pravidelné revize",
          spravna: false,
          vysvetleni:
            "Nezkouší se vždy. Elektrická pevnost se zkouší jen tehdy, nemají-li použité výrobky vlastnosti doložené výrobcem."
        },
        {
          id: "c",
          text: "Jen u vyhrazených zařízení I. třídy",
          spravna: false,
          vysvetleni:
            "Třída zařízení tu nerozhoduje. Rozhoduje, zda mají použité výrobky vlastnosti doložené výrobcem."
        },
        {
          id: "d",
          text: "Jen při mimořádné revizi po poruše",
          spravna: false,
          vysvetleni:
            "Druh revize tu nerozhoduje. Elektrická pevnost se zkouší, nemají-li použité výrobky vlastnosti doložené výrobcem."
        }
      ],
      shrnuti: "Elektrická pevnost jen tam, kde vlastnosti výrobků nedoložil výrobce.",
      fakta: ["K9-03"]
    },
    {
      id: "k9-q13",
      kapitola: K,
      podtema: "mereni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Při revizi naměříte izolační odpor obvodu 230 V 0,6 MΩ, měřeno stejnosměrným napětím 500 V. Jak výsledek posoudíte?",
      moznosti: [
        {
          id: "a",
          text: "Vyhovuje, nejmenší hodnota je 0,5 MΩ",
          spravna: false,
          vysvetleni:
            "Nejmenší přípustná hodnota pro obvody do 500 V je 1 MΩ. Naměřených 0,6 MΩ nevyhovuje."
        },
        {
          id: "b",
          text: "Vyhovuje, pokud obvod chrání chránič 30 mA",
          spravna: false,
          vysvetleni:
            "Chránič je doplňková ochrana a izolační odpor nenahrazuje. Pro obvody do 500 V je nejmenší přípustná hodnota 1 MΩ."
        },
        {
          id: "c",
          text: "Nevyhovuje, měřit se mělo napětím 1000 V",
          spravna: false,
          vysvetleni:
            "Obvody do 500 V se měří stejnosměrným napětím 500 V, měřicí napětí bylo tedy správné. Nevyhovuje hodnota: minimum je 1 MΩ."
        },
        {
          id: "d",
          text: "Nevyhovuje, nejmenší přípustná hodnota je 1 MΩ",
          spravna: true,
          vysvetleni:
            "Správně. Izolační odpor obvodů do 500 V se měří stejnosměrným napětím 500 V a nejmenší přípustná hodnota je 1 MΩ (ČSN 33 2000-6 ed. 2); údaj ověřit v normě."
        }
      ],
      shrnuti: "Obvody do 500 V: měřit 500 V DC, izolační odpor nejméně 1 MΩ (ověřit v normě).",
      fakta: ["K9-08", "K6-08"]
    },
    {
      id: "k9-q14",
      kapitola: K,
      podtema: "mereni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co se ověřuje měřením impedance poruchové smyčky?",
      moznosti: [
        {
          id: "a",
          text: "Zda je izolace obvodu v pořádku",
          spravna: false,
          vysvetleni:
            "Stav izolace ukazuje měření izolačního odporu. Impedance smyčky ověřuje, zda při poruše proteče proud dost velký k odpojení v předepsané době."
        },
        {
          id: "b",
          text: "Zda při poruše proteče proud dost velký k odpojení",
          spravna: true,
          vysvetleni:
            "Správně. Měřením impedance poruchové smyčky se ověřuje, zda při poruše proteče dostatečný proud, aby ochranný prvek odpojil v předepsané době, například do 0,4 s v koncovém obvodu sítě TN; ověřit v normě."
        },
        {
          id: "c",
          text: "Zda proudový chránič vybaví při 30 mA",
          spravna: false,
          vysvetleni:
            "Chránič se zkouší funkčně, zkušebním tlačítkem nebo postupem výrobce či normy. Impedance smyčky se týká proudu potřebného k odpojení."
        },
        {
          id: "d",
          text: "Zda jsou fáze zapojeny ve správném pořadí",
          spravna: false,
          vysvetleni:
            "Pořadí fází je samostatná, poslední zkouška. Impedance smyčky ověřuje proud potřebný k odpojení v předepsané době."
        }
      ],
      shrnuti: "Impedance poruchové smyčky: stačí poruchový proud k odpojení v předepsané době?",
      fakta: ["K9-11", "K6-02", "K9-03", "K9-01"]
    },
    {
      id: "k9-q15",
      kapitola: K,
      podtema: "mereni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Revizní technik při revizi elektroinstalace kotelny u tlačítka nouzového vypnutí u vstupu provedl jen prohlídku. Prý to stačí. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Má pravdu, nouzové vypnutí se při revizi nezkouší",
          spravna: false,
          vysvetleni:
            "Bezpečnostní zařízení, jako nouzové vypnutí a blokování, se při revizi zkoušejí funkčně (příloha č. 1, část B bod II)."
        },
        {
          id: "b",
          text: "Má pravdu, u tlačítek prohlídka stačí",
          spravna: false,
          vysvetleni: "Prohlídka nestačí. Nouzové vypnutí a blokování se zkoušejí funkčně."
        },
        {
          id: "c",
          text: "Nemá, nouzové vypnutí se zkouší funkčně",
          spravna: true,
          vysvetleni:
            "Správně. Funkčně se zkoušejí i bezpečnostní zařízení jako nouzové vypnutí a blokování, dále hlídače izolačního stavu, proudové chrániče, hlásiče a ukazatele stavu a přepěťové ochrany."
        },
        {
          id: "d",
          text: "Nemá, tlačítko se zkouší elektrickou pevností",
          spravna: false,
          vysvetleni:
            "Elektrická pevnost se zkouší jen u výrobků bez vlastností doložených výrobcem. Nouzové vypnutí se zkouší funkčně."
        }
      ],
      shrnuti: "Nouzové vypnutí a blokování se při revizi zkoušejí funkčně.",
      fakta: ["K9-03", "K9-02"]
    },

    // ───────── Spotřebiče a nářadí ─────────
    {
      id: "k9-q16",
      kapitola: K,
      podtema: "spotrebice",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Která norma upravuje kontroly elektrických spotřebičů během používání?",
      moznosti: [
        {
          id: "a",
          text: "ČSN 33 1610",
          spravna: true,
          vysvetleni:
            "Správně. Kontroly elektrických spotřebičů během používání upravuje ČSN 33 1610, kontroly ručního elektrického nářadí ČSN 33 1600 ed. 2; údaj ověřit."
        },
        {
          id: "b",
          text: "ČSN 33 1600 ed. 2",
          spravna: false,
          vysvetleni:
            "ČSN 33 1600 ed. 2 upravuje kontroly ručního elektrického nářadí. Pro spotřebiče je to ČSN 33 1610."
        },
        {
          id: "c",
          text: "ČSN 33 2000-6 ed. 2",
          spravna: false,
          vysvetleni:
            "Z ČSN 33 2000-6 ed. 2 pochází například požadavek na izolační odpor obvodů. Kontroly spotřebičů během používání upravuje ČSN 33 1610."
        },
        {
          id: "d",
          text: "Příloha č. 4 NV č. 190/2022 Sb.",
          spravna: false,
          vysvetleni:
            "Příloha č. 4 stanoví lhůty revizí vyhrazených elektrických zařízení. Spotřebiče do 400 V, které nejsou určeny k pevnému připojení, mezi ně nepatří; jejich kontroly upravuje ČSN 33 1610."
        }
      ],
      shrnuti: "Ruční nářadí: ČSN 33 1600 ed. 2; spotřebiče: ČSN 33 1610.",
      fakta: ["K9-10", "K9-08", "K9-09", "K2-15"]
    },
    {
      id: "k9-q17",
      kapitola: K,
      podtema: "spotrebice",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V kuchyňce kanceláří je průtokový ohřívač vody určený k pevnému připojení a mikrovlnná trouba zapojená do zásuvky. Co zahrnete do revize vyhrazeného elektrického zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Oba spotřebiče, oba jsou v kuchyňce budovy",
          spravna: false,
          vysvetleni:
            "Mikrovlnná trouba do 400 V zapojená do zásuvky není vyhrazeným elektrickým zařízením; kontroluje se podle ČSN 33 1610. Výjimka se ale netýká spotřebičů určených k pevnému připojení."
        },
        {
          id: "b",
          text: "Ani jeden, spotřebiče do 400 V se nerevidují",
          spravna: false,
          vysvetleni:
            "Výjimka platí jen pro spotřebiče, které nejsou určeny k pevnému připojení. Ohřívač určený k pevnému připojení do ní nespadá."
        },
        {
          id: "c",
          text: "Jen mikrovlnnou troubu, ohřívač ne",
          spravna: false,
          vysvetleni:
            "Je to obráceně: mikrovlnná trouba do zásuvky spadá do výjimky, ohřívač určený k pevnému připojení ne."
        },
        {
          id: "d",
          text: "Ohřívač ano, mikrovlnnou troubu ne",
          spravna: true,
          vysvetleni:
            "Správně. Spotřebiče do 400 V nejsou vyhrazenými elektrickými zařízeními jen tehdy, nejsou-li určeny k pevnému připojení (§ 3 odst. 2 NV č. 190/2022 Sb.). Trouba do zásuvky do výjimky spadá a kontroluje se podle ČSN 33 1610."
        }
      ],
      shrnuti: "Spotřebič určený k pevnému připojení do výjimky nespadá; spotřebič do zásuvky do 400 V ano.",
      fakta: ["K2-03", "K9-09", "K9-10"]
    }
  ]
};

export default obsah;
