// Kapitola 1 – Legislativa a odborná způsobilost.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k1-legislativa" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "predpisy", nazev: "Předpisy a orgány" },
    { id: "stupne", nazev: "Stupně odborné způsobilosti" },
    { id: "vedouci", nazev: "Vedoucí elektrotechnik – předpoklady, praxe, rozsah" },
    { id: "zkouska", nazev: "Zkouška a doklady" },
    { id: "poucena", nazev: "Osoba poučená a školení" }
  ],

  lekce: [
    {
      id: "k1-l01",
      podtema: "predpisy",
      nadpis: "Platné předpisy od 1. 7. 2022",
      text: md(
        "Od **1. 7. 2022** platí **zákon č. 250/2021 Sb.**, o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení (VTZ). Zrušil mimo jiné zákon č. 174/1968 Sb. a **vyhlášku č. 50/1978 Sb.**, o odborné způsobilosti v elektrotechnice.",
        "",
        "Podrobné požadavky na odbornou způsobilost dnes stanoví **nařízení vlády č. 194/2022 Sb.**, účinné rovněž od 1. 7. 2022 a novelizované nařízením č. 175/2024 Sb.",
        "",
        "Pozor na starší učebnice a testy. Pokud vycházejí z vyhlášky č. 50/1978 Sb., pracují se zrušenými pravidly i názvy, například „pracovník znalý“. Tato aplikace vychází ze zákona č. 250/2021 Sb. a nařízení č. 194/2022 Sb."
      ),
      fakta: ["K1-01", "K1-02", "K1-22"]
    },
    {
      id: "k1-l02",
      podtema: "predpisy",
      nadpis: "Kdo dohlíží a kdo vydává doklady",
      text: md(
        "**Státní správu** v oblasti bezpečnosti provozu vyhrazených technických zařízení vykonávají:",
        "- Ministerstvo práce a sociálních věcí,",
        "- Státní úřad inspekce práce,",
        "- oblastní inspektoráty práce.",
        "",
        "**Pověřenou organizací** je **Technická inspekce České republiky (TIČR)**. Vydává oprávnění firmám a osvědčení revizním technikům a vede jejich evidenci.",
        "",
        "Zkoušku z odborné způsobilosti v elektrotechnice zajišťuje **firma** – právnická nebo podnikající fyzická osoba – pro lidi, kteří pro ni pracují na elektrických zařízeních. Osoba samostatně výdělečně činná si zkoušku zajišťuje sama."
      ),
      fakta: ["K1-27", "K1-28", "K1-24"]
    },
    {
      id: "k1-l03",
      podtema: "stupne",
      nadpis: "Stupně odborné způsobilosti",
      text: md(
        "Zákon č. 250/2021 Sb. rozlišuje **osoby školené (seznámené)**, **osoby poučené** a **osoby znalé**. Osoby znalé jsou tři a nařízení vlády č. 194/2022 Sb. jim dává jména:",
        "- **elektrotechnik** (§ 6) – osoba znalá pro samostatnou činnost,",
        "- **vedoucí elektrotechnik** (§ 7) – osoba znalá pro řízení činnosti,",
        "- **revizní technik** (§ 8) – osoba znalá s osvědčením k revizím.",
        "",
        "Stupně na sebe navazují. Revizním technikem může být jen ten, kdo je zároveň odborně způsobilý jako vedoucí elektrotechnik.",
        "",
        "Klepněte na schod v ilustraci a uvidíte, co který stupeň smí, co pro něj platí a jaký má doklad."
      ),
      ilustrace: "zebricek-zpusobilosti",
      fakta: ["K1-03", "K1-04", "K1-30"]
    },
    {
      id: "k1-l04",
      podtema: "stupne",
      nadpis: "Elektrotechnik a starší osvědčení",
      text: md(
        "**Elektrotechnik** (§ 6) pracuje na elektrických zařízeních a v jejich blízkosti **samostatně**, s výjimkou zvláštních případů, které vyplynou z hodnocení rizik. Jeho minimální praxi stanoví **odpovědná osoba** v místním provozním bezpečnostním předpisu.",
        "",
        "Nemá-li elektrotechnik žádnou elektrotechnickou praxi, předpis mu stanoví **dohled osoby znalé s praxí nejméně 2 roky**, a to **nejméně na 1 rok**.",
        "",
        "Osvědčení podle dřívějších předpisů zůstala v platnosti:",
        "- pracovník znalý a pracovník znalý pro samostatnou činnost se považuje za **elektrotechnika**,",
        "- pracovník pro řízení činnosti, pro řízení činnosti prováděné dodavatelským způsobem a pro řízení provozu se považuje za **vedoucího elektrotechnika**."
      ),
      fakta: ["K1-29", "K1-23", "K1-22"]
    },
    {
      id: "k1-l05",
      podtema: "vedouci",
      nadpis: "Předpoklady vedoucího elektrotechnika",
      text: md(
        "Vedoucím elektrotechnikem (§ 7) se stane ten, kdo splní **všechny** předpoklady:",
        "- věk **18 let** a plná svéprávnost,",
        "- **zdravotní způsobilost**,",
        "- **odborná kvalifikace** – elektrotechnické vzdělání, vzdělání jiného oboru, které obsahově splňuje elektrotechnické požadavky, nebo úplná profesní kvalifikace z oboru Elektrotechnika v Národní soustavě kvalifikací,",
        "- minimální **odborná praxe**,",
        "- **zkouška** složená po zaškolení.",
        "",
        "Vedoucí elektrotechnik smí vše, co elektrotechnik, a navíc **řídit činnosti**, **řídit provoz** a **projektovat** vyhrazená elektrická zařízení. Výjimkou je projektování, které vyžaduje autorizaci podle zákona č. 360/1992 Sb."
      ),
      fakta: ["K1-16", "K1-05", "K1-06"]
    },
    {
      id: "k1-l06",
      podtema: "vedouci",
      nadpis: "Praxe podle rozsahu",
      text: md(
        "Rozsah odborné způsobilosti se určuje podle **napětí** (do 1 kV AC / 1,5 kV DC, nebo bez omezení) a podle **druhu zařízení** (objekty bez nebezpečí výbuchu, nebo s ním) a zapisuje se kódem, například E2A. Podle rozsahu se liší minimální praxe vedoucího elektrotechnika:",
        "- **2 roky** – E2A a E3A,",
        "- **3 roky** – E1A, E2B a E3B,",
        "- **4 roky** – E1B.",
        "",
        "Nejméně **1 rok** z této praxe musí být na zařízeních příslušného druhu a napětí.",
        "",
        "Doklad pro objekty bez nebezpečí výbuchu nepokrývá prostředí s nebezpečím výbuchu. Zkušební komise může rozsah dokladu omezit podle činností, které uchazeč skutečně vykonává. Význam písmen v kódu si vyzkoušejte v ilustraci."
      ),
      ilustrace: "kod-opravneni",
      fakta: ["K1-07", "K1-08", "K1-09", "K8-04"]
    },
    {
      id: "k1-l07",
      podtema: "zkouska",
      nadpis: "Jak probíhá zkouška",
      text: md(
        "Znalosti vedoucího elektrotechnika ověřuje **tříčlenná zkušební komise**. Předsedá jí osoba odborně způsobilá k revizím, tedy **revizní technik**.",
        "",
        "Zkouška má dvě části:",
        "- **písemný test** – nejméně 10 otázek z předpisů bezpečnosti a ochrany zdraví při práci (BOZP) pro činnost na elektrických zařízeních a z první pomoci,",
        "- **ústní pohovor** – rozbor výsledku a chyb testu, odborná problematika a pracovní postupy.",
        "",
        "V každé části je potřeba nejméně **80 %** správných odpovědí; k ústní části se postupuje jen po úspěšném testu. Při celkovém hodnocení „nevyhověl“ lze zkoušku opakovat **nejdříve po 15 dnech**, kolikrát je potřeba.",
        "",
        "Látka zahrnuje i první pomoc zejména při úrazu elektrickým proudem, pracovní a technologické postupy a zdroje a příčiny rizik."
      ),
      fakta: ["K1-10", "K1-11", "K1-12", "K1-13", "K1-26"]
    },
    {
      id: "k1-l08",
      podtema: "zkouska",
      nadpis: "Doklad a jeho platnost",
      text: md(
        "Před zkouškou uchazeč předloží předsedovi komise **doklad o kvalifikaci** (originál nebo úředně ověřenou kopii) a **doklad o délce praxe** (potvrzení zaměstnavatele nebo čestné prohlášení).",
        "",
        "Předseda komise zkoušku připravuje, vede a vyhodnocuje, pořizuje protokol a vystavuje **doklad**. Protokol uchovává **6 až 7 let** a za provedení zkoušky i správnost dokladu odpovídá.",
        "",
        "Doklad platí **3 roky** ode dne vydání. Když platnost přezkoušení skončí, osoba znalá se považuje za **osobu poučenou** a stupeň osoby znalé získá zpět až úspěšnou zkouškou. Termín přezkoušení je proto dobré hlídat s předstihem."
      ),
      fakta: ["K1-25", "K1-15", "K1-14", "K1-19"]
    },
    {
      id: "k1-l09",
      podtema: "poucena",
      nadpis: "Osoba poučená",
      text: md(
        "**Osoba poučená** (§ 4) musí být plně svéprávná a zdravotně způsobilá a musí projít **poučením a ověřením znalostí**, které provede pověřená osoba znalá. Pro „vyhověl“ je potřeba **80 %** správných odpovědí.",
        "",
        "- Dokladem je **zápis** podepsaný oběma. Vyhotovuje ho osoba znalá, která poučení provedla, a přesně v něm vymezí **rozsah poučení** a **pracoviště**.",
        "- Lhůtu opakování určí osoba znalá, **nejvýše 3 roky**.",
        "",
        "Osoba poučená smí samostatně **obsluhovat** elektrická zařízení bez omezení napětí, **podle pokynů** pracovat na zařízeních malého a nízkého napětí bez napětí a v jejich blízkosti a **s dohledem** na zařízeních vysokého napětí bez napětí a v jejich blízkosti."
      ),
      fakta: ["K1-17", "K1-18", "K3-04"]
    },
    {
      id: "k1-l10",
      podtema: "poucena",
      nadpis: "Obsluha a pravidelné školení",
      text: md(
        "**Obsluha** elektrického zařízení malého a nízkého napětí se nepovažuje za činnost, která vyžaduje odbornou způsobilost podle nařízení vlády č. 194/2022 Sb.",
        "",
        "Osoby odborně způsobilé podle § 4, 6 a 7 musí být pravidelně školeny o předpisech BOZP. Školení zajišťuje provozovatel:",
        "- podle svého **vnitřního předpisu**,",
        "- nemá-li vnitřní předpis, **nejméně jednou ročně**.",
        "",
        "Nepleťte si školení a přezkoušení. Školení je pravidelné (bez vnitřního předpisu každý rok), kdežto doklad o zkoušce osoby znalé platí 3 roky a poučení osoby poučené se opakuje nejpozději po 3 letech."
      ),
      fakta: ["K1-20", "K1-21", "K1-14", "K1-17"]
    }
  ],

  otazky: [
    // ───────── Předpisy a orgány ─────────
    {
      id: "k1-q01",
      kapitola: K,
      podtema: "predpisy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Který předpis dnes podrobně stanoví požadavky na odbornou způsobilost v elektrotechnice?",
      moznosti: [
        {
          id: "a",
          text: "Zákon č. 250/2021 Sb.",
          spravna: false,
          vysvetleni:
            "Zákon č. 250/2021 Sb. dává rámec: rozlišuje skupiny osob a stanoví jejich základní předpoklady (§ 19). Podrobné požadavky ale stanoví NV č. 194/2022 Sb."
        },
        {
          id: "b",
          text: "Nařízení vlády č. 194/2022 Sb.",
          spravna: true,
          vysvetleni:
            "Správně. NV č. 194/2022 Sb. podrobně stanoví požadavky na odbornou způsobilost v elektrotechnice. Platí od 1. 7. 2022 a novelizovalo ho nařízení č. 175/2024 Sb."
        },
        {
          id: "c",
          text: "Nařízení vlády č. 190/2022 Sb.",
          spravna: false,
          vysvetleni:
            "NV č. 190/2022 Sb. se týká vyhrazených elektrických zařízení – co mezi ně patří, jejich tříd a revizí. Odbornou způsobilost osob upravuje NV č. 194/2022 Sb."
        },
        {
          id: "d",
          text: "Zákon č. 360/1992 Sb.",
          spravna: false,
          vysvetleni:
            "Podle zákona č. 360/1992 Sb. se uděluje autorizace, kterou vyžaduje část projektování. Odbornou způsobilost v elektrotechnice stanoví NV č. 194/2022 Sb."
        }
      ],
      shrnuti:
        "Odbornou způsobilost v elektrotechnice podrobně upravuje NV č. 194/2022 Sb., rámec dává zákon č. 250/2021 Sb.",
      fakta: ["K1-02", "K1-03", "K1-16", "K2-02", "K1-06"]
    },
    {
      id: "k1-q02",
      kapitola: K,
      podtema: "predpisy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Kdo je pověřenou organizací podle zákona č. 250/2021 Sb.?",
      moznosti: [
        {
          id: "a",
          text: "Státní úřad inspekce práce",
          spravna: false,
          vysvetleni:
            "Státní úřad inspekce práce vykonává státní správu spolu s ministerstvem práce a oblastními inspektoráty práce (§ 4). Pověřenou organizací je Technická inspekce České republiky."
        },
        {
          id: "b",
          text: "Oblastní inspektorát práce",
          spravna: false,
          vysvetleni:
            "Oblastní inspektoráty práce patří ke státní správě (§ 4 zákona č. 250/2021 Sb.). Pověřenou organizací je Technická inspekce České republiky."
        },
        {
          id: "c",
          text: "Ministerstvo práce a sociálních věcí",
          spravna: false,
          vysvetleni:
            "Ministerstvo práce a sociálních věcí vykonává státní správu, pověřenou organizací ale není. Tou je Technická inspekce České republiky (§ 6)."
        },
        {
          id: "d",
          text: "Technická inspekce České republiky",
          spravna: true,
          vysvetleni:
            "Správně. Pověřenou organizací je Technická inspekce České republiky (TIČR). Vydává oprávnění firmám a osvědčení revizním technikům a vede jejich evidenci (§ 6 a § 24 zákona č. 250/2021 Sb.)."
        }
      ],
      shrnuti:
        "Pověřená organizace je TIČR (oprávnění, osvědčení, evidence); státní správu vykonává ministerstvo práce, Státní úřad inspekce práce a oblastní inspektoráty.",
      fakta: ["K1-28", "K1-27"]
    },
    {
      id: "k1-q03",
      kapitola: K,
      podtema: "predpisy",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Elektroinstalace dílny, kde řídíte údržbu, je z roku 1995. Kolega tvrdí, že se proto na vaši odbornou způsobilost pořád vztahuje vyhláška č. 50/1978 Sb. Co mu odpovíte?",
      moznosti: [
        {
          id: "a",
          text: "Vyhláška je od 1. 7. 2022 zrušená, způsobilost upravuje NV č. 194/2022 Sb.",
          spravna: true,
          vysvetleni:
            "Správně. Zákon č. 250/2021 Sb. zrušil vyhlášku č. 50/1978 Sb. s účinností od 1. 7. 2022. Odbornou způsobilost osob dnes upravuje NV č. 194/2022 Sb. bez ohledu na stáří zařízení."
        },
        {
          id: "b",
          text: "Má pravdu, pro zařízení uvedená do provozu před rokem 2022 platí dál",
          spravna: false,
          vysvetleni:
            "Podle předpisů platných v době uvedení do provozu se posuzuje technický stav zařízení (§ 3 odst. 5 zákona č. 250/2021 Sb.), ne odborná způsobilost osob. Vyhláška č. 50/1978 Sb. je zrušená."
        },
        {
          id: "c",
          text: "Vyhláška platí souběžně s novými předpisy do konce roku 2025",
          spravna: false,
          vysvetleni:
            "Vyhláška byla zrušena k 1. 7. 2022. V platnosti zůstala jen dříve vydaná osvědčení osob (§ 10 NV č. 194/2022 Sb.), ne pravidla vyhlášky."
        },
        {
          id: "d",
          text: "Vyhlášku jen novelizovalo nařízení vlády č. 175/2024 Sb.",
          spravna: false,
          vysvetleni:
            "Nařízení č. 175/2024 Sb. novelizovalo NV č. 194/2022 Sb., ne vyhlášku č. 50/1978 Sb. Ta byla zrušena zákonem č. 250/2021 Sb."
        }
      ],
      shrnuti:
        "Vyhláška č. 50/1978 Sb. je od 1. 7. 2022 zrušená; podle předpisů z doby uvedení do provozu se posuzuje jen technický stav zařízení.",
      fakta: ["K1-01", "K1-02", "K2-24", "K1-22"]
    },

    // ───────── Stupně odborné způsobilosti ─────────
    {
      id: "k1-q04",
      kapitola: K,
      podtema: "stupne",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak NV č. 194/2022 Sb. nazývá osobu znalou pro samostatnou činnost?",
      moznosti: [
        {
          id: "a",
          text: "Vedoucí elektrotechnik",
          spravna: false,
          vysvetleni:
            "Vedoucí elektrotechnik (§ 7) je osoba znalá pro řízení činnosti. Osoba znalá pro samostatnou činnost je elektrotechnik (§ 6)."
        },
        {
          id: "b",
          text: "Osoba poučená",
          spravna: false,
          vysvetleni:
            "Osoba poučená (§ 4) není osoba znalá; pracuje například podle pokynů nebo s dohledem. Osoba znalá pro samostatnou činnost je elektrotechnik (§ 6)."
        },
        {
          id: "c",
          text: "Elektrotechnik",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 5 odst. 1 NV č. 194/2022 Sb. je osoba znalá pro samostatnou činnost elektrotechnik (§ 6), pro řízení činnosti vedoucí elektrotechnik (§ 7)."
        },
        {
          id: "d",
          text: "Pracovník znalý",
          spravna: false,
          vysvetleni:
            "„Pracovník znalý“ je název z dřívějších předpisů. Jeho osvědčení zůstalo v platnosti a dnes se považuje za osvědčení elektrotechnika (§ 10 NV č. 194/2022 Sb.)."
        }
      ],
      shrnuti:
        "Osoba znalá pro samostatnou činnost = elektrotechnik (§ 6), pro řízení činnosti = vedoucí elektrotechnik (§ 7).",
      fakta: ["K1-04", "K1-22", "K3-04"]
    },
    {
      id: "k1-q05",
      kapitola: K,
      podtema: "stupne",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Které tři skupiny považuje zákon č. 250/2021 Sb. za osoby znalé?",
      moznosti: [
        {
          id: "a",
          text: "Osoby poučené, osoby pro samostatnou činnost a osoby pro řízení činnosti",
          spravna: false,
          vysvetleni:
            "Osoby poučené zákon uvádí jako samostatnou skupinu, mezi osoby znalé nepatří. Třetí skupinou osob znalých jsou revizní technici (§ 19 odst. 1)."
        },
        {
          id: "b",
          text: "Osoby pro samostatnou činnost, osoby pro řízení činnosti a revizní technici",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 19 odst. 1 zákona č. 250/2021 Sb. jsou osobami znalými osoby pro samostatnou činnost, osoby pro řízení činnosti a revizní technici."
        },
        {
          id: "c",
          text: "Osoby pro samostatnou činnost, osoby pro řízení činnosti a osoby pro řízení provozu",
          spravna: false,
          vysvetleni:
            "Řízení provozu není samostatná skupina osob, ale jedna z činností, které smí vedoucí elektrotechnik. Třetí skupinou osob znalých jsou revizní technici."
        },
        {
          id: "d",
          text: "Osoby školené, osoby pro řízení činnosti a revizní technici",
          spravna: false,
          vysvetleni:
            "Osoby školené (seznámené) zákon uvádí jako samostatnou skupinu, mezi osoby znalé nepatří. Místo nich sem patří osoby pro samostatnou činnost."
        }
      ],
      shrnuti:
        "Osoby znalé: pro samostatnou činnost, pro řízení činnosti a revizní technici; osoby poučené a školené mezi ně nepatří.",
      fakta: ["K1-03", "K1-06"]
    },
    {
      id: "k1-q06",
      kapitola: K,
      podtema: "stupne",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Do vaší party nastupuje kolega s platným osvědčením „pracovník pro řízení činnosti“ vydaným podle dřívějších předpisů. Za koho ho dnes považujete?",
      moznosti: [
        {
          id: "a",
          text: "Za elektrotechnika podle § 6",
          spravna: false,
          vysvetleni:
            "Za elektrotechnika se považuje pracovník znalý a pracovník znalý pro samostatnou činnost. Pracovník pro řízení činnosti odpovídá vedoucímu elektrotechnikovi (§ 10 NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Za osobu poučenou, dokud nesloží novou zkoušku",
          spravna: false,
          vysvetleni:
            "Osvědčení podle dřívějších předpisů zůstala v platnosti (§ 10). Za osobu poučenou se považuje až osoba znalá, jejímuž přezkoušení skončila platnost (§ 4 odst. 1)."
        },
        {
          id: "c",
          text: "Za revizního technika v rozsahu E2A",
          spravna: false,
          vysvetleni:
            "Revizní technik potřebuje platné osvědčení k revizím (§ 8). Pracovník pro řízení činnosti se dnes považuje za vedoucího elektrotechnika."
        },
        {
          id: "d",
          text: "Za vedoucího elektrotechnika podle § 7",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 10 NV č. 194/2022 Sb. se pracovník pro řízení činnosti, pro řízení činnosti prováděné dodavatelským způsobem a pro řízení provozu považuje za vedoucího elektrotechnika."
        }
      ],
      shrnuti:
        "Starší osvědčení platí dál: pracovník pro řízení činnosti = vedoucí elektrotechnik, pracovník znalý = elektrotechnik.",
      fakta: ["K1-22", "K1-19", "K1-30"]
    },
    {
      id: "k1-q07",
      kapitola: K,
      podtema: "stupne",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co musí revizní technik splňovat kromě platného osvědčení k revizím?",
      moznosti: [
        {
          id: "a",
          text: "Odbornou způsobilost podle § 7 a minimální praxi",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 8 NV č. 194/2022 Sb. musí být revizní technik zároveň odborně způsobilý jako vedoucí elektrotechnik a mít minimální praxi, například 4 roky pro E1A a E2A."
        },
        {
          id: "b",
          text: "Odbornou způsobilost podle § 6 a praxi nejméně 1 rok",
          spravna: false,
          vysvetleni:
            "Způsobilost elektrotechnika (§ 6) nestačí. Revizní technik musí být odborně způsobilý podle § 7 a mít delší praxi, například 4 roky pro E1A a E2A."
        },
        {
          id: "c",
          text: "Jen oprávnění firmy, pro kterou revize provádí",
          spravna: false,
          vysvetleni:
            "Oprávnění potřebuje revizní technik navíc jen tehdy, když revize provádí jako živnost (§ 17 zákona č. 250/2021 Sb.). Vždy ale musí mít způsobilost podle § 7 a praxi."
        },
        {
          id: "d",
          text: "Jen praxi nejméně 4 roky bez ohledu na rozsah",
          spravna: false,
          vysvetleni:
            "Praxe se liší podle rozsahu (4 roky jsou příklad pro E1A a E2A) a sama nestačí. Revizní technik musí být také odborně způsobilý podle § 7."
        }
      ],
      shrnuti:
        "Revizní technik = osvědčení k revizím + způsobilost vedoucího elektrotechnika (§ 7) + minimální praxe podle rozsahu.",
      fakta: ["K1-30", "K2-09"]
    },
    {
      id: "k1-q08",
      kapitola: K,
      podtema: "stupne",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Přijímáte do party absolventa elektrotechnické školy bez praxe. Bude pracovat jako elektrotechnik (§ 6). Co pro něj musí stanovit místní provozní bezpečnostní předpis?",
      moznosti: [
        {
          id: "a",
          text: "Dozor osoby znalé s praxí nejméně 1 rok, po dobu 2 let",
          spravna: false,
          vysvetleni:
            "Čísla i forma jsou prohozené. Předpis stanoví dohled (ne dozor) osoby znalé s praxí nejméně 2 roky, a to nejméně na 1 rok (§ 6 odst. 2 NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Práci jen podle pokynů, stejně jako u osoby poučené",
          spravna: false,
          vysvetleni:
            "Postavení osoby poučené se ho netýká – je to elektrotechnik. Bez praxe mu ale předpis stanoví dohled osoby znalé s praxí nejméně 2 roky po dobu nejméně 1 roku."
        },
        {
          id: "c",
          text: "Dohled osoby znalé s praxí nejméně 2 roky, nejméně na 1 rok",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 6 odst. 2 NV č. 194/2022 Sb. stanoví místní provozní bezpečnostní předpis elektrotechnikovi bez praxe dohled osoby znalé s praxí nejméně 2 roky, po dobu nejméně 1 roku."
        },
        {
          id: "d",
          text: "Dohled vedoucího elektrotechnika po dobu nejméně 3 let",
          spravna: false,
          vysvetleni:
            "Nařízení nevyžaduje vedoucího elektrotechnika ani 3 roky. Stačí dohled osoby znalé s praxí nejméně 2 roky po dobu nejméně 1 roku."
        }
      ],
      shrnuti: "Elektrotechnik bez praxe: dohled osoby znalé s praxí aspoň 2 roky, nejméně po dobu 1 roku.",
      fakta: ["K1-23", "K1-29"]
    },

    // ───────── Vedoucí elektrotechnik ─────────
    {
      id: "k1-q09",
      kapitola: K,
      podtema: "vedouci",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Uchazeč o zkoušku vedoucího elektrotechnika vystudoval jiný obor než elektrotechniku. Může se vedoucím elektrotechnikem stát?",
      moznosti: [
        {
          id: "a",
          text: "Ano, pokud vzdělání obsahově splňuje elektrotechnické požadavky",
          spravna: true,
          vysvetleni:
            "Správně. § 2 písm. a) NV č. 194/2022 Sb. připouští i vzdělání jiného oboru, které obsahově splňuje elektrotechnické požadavky. Další cestou je úplná profesní kvalifikace z oboru Elektrotechnika v Národní soustavě kvalifikací."
        },
        {
          id: "b",
          text: "Ne, nařízení uznává výhradně vzdělání v oboru elektrotechnika",
          spravna: false,
          vysvetleni:
            "Nařízení je širší: vedle elektrotechnického vzdělání uznává i jiný obor s elektrotechnickým obsahem a úplnou profesní kvalifikaci z oboru Elektrotechnika (§ 2 písm. a))."
        },
        {
          id: "c",
          text: "Ano, pokud místo vzdělání doloží nejméně 4 roky praxe v oboru",
          spravna: false,
          vysvetleni:
            "Praxe vzdělání nenahradí. Odborná kvalifikace a minimální praxe jsou dva samostatné předpoklady (§ 7 odst. 1 NV č. 194/2022 Sb.)."
        },
        {
          id: "d",
          text: "Ne, nejdřív musí získat osvědčení od pověřené organizace",
          spravna: false,
          vysvetleni:
            "Osvědčení pověřené organizace získává revizní technik (§ 11 zákona č. 250/2021 Sb.). U vedoucího elektrotechnika rozhoduje, zda vzdělání obsahově splňuje elektrotechnické požadavky."
        }
      ],
      shrnuti:
        "Kvalifikaci vedoucího elektrotechnika splní elektrotechnické vzdělání, jiný obor s elektrotechnickým obsahem, nebo úplná profesní kvalifikace z oboru Elektrotechnika.",
      fakta: ["K1-05", "K2-08"]
    },
    {
      id: "k1-q10",
      kapitola: K,
      podtema: "vedouci",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co smí vedoucí elektrotechnik navíc oproti elektrotechnikovi?",
      moznosti: [
        {
          id: "a",
          text: "Provádět revize vyhrazených elektrických zařízení",
          spravna: false,
          vysvetleni:
            "Revize smí provádět výhradně revizní technik s osvědčením (§ 17 zákona č. 250/2021 Sb.). Vedoucí elektrotechnik navíc řídí činnosti, řídí provoz a projektuje."
        },
        {
          id: "b",
          text: "Vydávat firmám oprávnění k montáži a opravám",
          spravna: false,
          vysvetleni:
            "Oprávnění vydává pověřená organizace, tedy Technická inspekce České republiky. Vedoucí elektrotechnik navíc řídí činnosti, řídí provoz a projektuje."
        },
        {
          id: "c",
          text: "Řídit činnosti a provoz a projektovat zařízení",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 7 odst. 1 NV č. 194/2022 Sb. smí vedoucí elektrotechnik vše jako elektrotechnik a navíc řídit činnosti a provoz a projektovat vyhrazená elektrická zařízení. Výjimkou je projektování, které vyžaduje autorizaci podle zákona č. 360/1992 Sb."
        },
        {
          id: "d",
          text: "Poučovat osoby poučené a ověřovat jejich znalosti",
          spravna: false,
          vysvetleni:
            "Poučení a ověření znalostí provádí pověřená osoba znalá – může to být i elektrotechnik (§ 19 odst. 3 zákona č. 250/2021 Sb.). Navíc smí vedoucí elektrotechnik řídit činnosti a provoz a projektovat."
        }
      ],
      shrnuti:
        "Vedoucí elektrotechnik = elektrotechnik + řízení činností, řízení provozu a projektování (bez projektů vyžadujících autorizaci).",
      fakta: ["K1-06", "K2-09", "K2-07", "K1-17"]
    },
    {
      id: "k1-q11",
      kapitola: K,
      podtema: "vedouci",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jaká je minimální odborná praxe vedoucího elektrotechnika pro rozsah E2A?",
      moznosti: [
        {
          id: "a",
          text: "1 rok",
          spravna: false,
          vysvetleni:
            "1 rok je část praxe, která musí být na zařízeních příslušného druhu a napětí (§ 7 odst. 3). Celková minimální praxe pro E2A jsou 2 roky."
        },
        {
          id: "b",
          text: "2 roky",
          spravna: true,
          vysvetleni: "Správně. Podle § 7 odst. 2 NV č. 194/2022 Sb. stačí 2 roky praxe pro rozsahy E2A a E3A."
        },
        {
          id: "c",
          text: "3 roky",
          spravna: false,
          vysvetleni: "3 roky platí pro rozsahy E1A, E2B a E3B. Pro E2A stačí 2 roky."
        },
        {
          id: "d",
          text: "4 roky",
          spravna: false,
          vysvetleni:
            "4 roky potřebuje vedoucí elektrotechnik pro E1B a revizní technik například pro E1A a E2A. Vedoucímu elektrotechnikovi v rozsahu E2A stačí 2 roky."
        }
      ],
      shrnuti: "Praxe vedoucího elektrotechnika: 2 roky E2A a E3A, 3 roky E1A, E2B a E3B, 4 roky E1B.",
      fakta: ["K1-07", "K1-08", "K1-30"]
    },
    {
      id: "k1-q12",
      kapitola: K,
      podtema: "vedouci",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Elektrotechnik z vaší party má 3 roky praxe, z toho jen 6 měsíců na zařízeních do 1 kV v objektech bez nebezpečí výbuchu, zbytek na zařízeních vysokého napětí. Chce složit zkoušku vedoucího elektrotechnika v rozsahu E2A. Splňuje podmínku praxe?",
      moznosti: [
        {
          id: "a",
          text: "Ano, celková praxe 3 roky převyšuje požadované 2 roky",
          spravna: false,
          vysvetleni:
            "Celková délka nestačí. Z praxe musí být nejméně 1 rok na zařízeních příslušného druhu a napětí (§ 7 odst. 3 NV č. 194/2022 Sb.); 6 měsíců je málo."
        },
        {
          id: "b",
          text: "Ano, pokud mu délku praxe písemně potvrdí zaměstnavatel",
          spravna: false,
          vysvetleni:
            "Potvrzení zaměstnavatele jen dokládá délku praxe (§ 9 odst. 5). Nenahradí podmínku 1 roku na zařízeních příslušného druhu a napětí."
        },
        {
          id: "c",
          text: "Ne, pro rozsah E2A je potřeba nejméně 4 roky praxe",
          spravna: false,
          vysvetleni:
            "Pro E2A stačí celkem 2 roky. Problém je jinde: chybí nejméně 1 rok praxe na zařízeních do 1 kV v objektech bez nebezpečí výbuchu."
        },
        {
          id: "d",
          text: "Ne, má málo praxe na zařízeních příslušného druhu a napětí",
          spravna: true,
          vysvetleni:
            "Správně. Celkově má praxe dost (pro E2A stačí 2 roky), ale § 7 odst. 3 vyžaduje nejméně 1 rok na zařízeních příslušného druhu a napětí. Pro E2A jsou to zařízení do 1 kV v objektech bez nebezpečí výbuchu."
        }
      ],
      shrnuti:
        "Nestačí celková délka praxe – nejméně 1 rok musí být na zařízeních stejného druhu a napětí, jaký je rozsah zkoušky.",
      fakta: ["K1-08", "K1-07", "K1-09", "K1-25"]
    },
    {
      id: "k1-q13",
      kapitola: K,
      podtema: "vedouci",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Máte doklad vedoucího elektrotechnika v rozsahu E2A. Provozovatel chce, abyste řídil práce na elektroinstalaci lakovny, kde je prostředí s nebezpečím výbuchu. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Smíte, protože jde o zařízení nízkého napětí do 1 kV",
          spravna: false,
          vysvetleni:
            "Napětí je jen jedno hledisko rozsahu. Druhým je druh zařízení: doklad pro objekty bez nebezpečí výbuchu nepokrývá prostředí s nebezpečím výbuchu (§ 7 odst. 6 a 7 NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Nesmíte, A znamená objekty bez nebezpečí výbuchu",
          spravna: true,
          vysvetleni:
            "Správně. Rozsah se stanoví i podle druhu zařízení: A znamená objekty bez nebezpečí výbuchu, B s nebezpečím výbuchu. Na lakovnu by byl potřeba rozsah E2B."
        },
        {
          id: "c",
          text: "Smíte, pokud vás k tomu provozovatel písemně pověří",
          spravna: false,
          vysvetleni:
            "Pověření od provozovatele nerozšíří rozsah odborné způsobilosti, který stanoví zkouška. Na prostředí s nebezpečím výbuchu je potřeba doklad v rozsahu B."
        },
        {
          id: "d",
          text: "Smíte, pokud se na zařízení bude pracovat jen bez napětí",
          spravna: false,
          vysvetleni:
            "Způsob provedení práce nemění rozsah dokladu. Doklad E2A se na prostředí s nebezpečím výbuchu nevztahuje ani při práci bez napětí."
        }
      ],
      shrnuti:
        "Písmeno A = objekty bez nebezpečí výbuchu, B = s nebezpečím výbuchu; doklad E2A na prostředí s nebezpečím výbuchu nestačí.",
      fakta: ["K8-04", "K1-09", "K2-06"]
    },

    // ───────── Zkouška a doklady ─────────
    {
      id: "k1-q14",
      kapitola: K,
      podtema: "zkouska",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Kdo předsedá tříčlenné zkušební komisi, která ověřuje znalosti vedoucího elektrotechnika?",
      moznosti: [
        {
          id: "a",
          text: "Zástupce oblastního inspektorátu práce",
          spravna: false,
          vysvetleni:
            "Inspektoráty práce vykonávají státní správu (§ 4 zákona č. 250/2021 Sb.). Předsedou komise musí být podle § 7 odst. 4 NV č. 194/2022 Sb. osoba odborně způsobilá k revizím."
        },
        {
          id: "b",
          text: "Vedoucí elektrotechnik s praxí nejméně 4 roky",
          spravna: false,
          vysvetleni:
            "Vedoucí elektrotechnik obecně nestačí; předsedou musí být osoba odborně způsobilá k revizím. Odchylka platí jen pro práce u provozovatelů přenosové a distribuční soustavy."
        },
        {
          id: "c",
          text: "Osoba odborně způsobilá k provádění revizí",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 7 odst. 4 NV č. 194/2022 Sb. předsedá komisi osoba odborně způsobilá k revizím, tedy revizní technik. Odpovídá za provedení zkoušky i za správnost dokladu."
        },
        {
          id: "d",
          text: "Zástupce Technické inspekce České republiky",
          spravna: false,
          vysvetleni:
            "Technická inspekce České republiky uděluje osvědčení revizním technikům po jejich zkoušce (§ 11 zákona č. 250/2021 Sb.). Komisi pro vedoucího elektrotechnika předsedá revizní technik."
        }
      ],
      shrnuti: "Komise pro § 7 je tříčlenná a předsedá jí revizní technik, který odpovídá za zkoušku i doklad.",
      fakta: ["K1-10", "K1-15", "K1-27", "K2-08"]
    },
    {
      id: "k1-q15",
      kapitola: K,
      podtema: "zkouska",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jak je u zkoušky z odborné způsobilosti nastavena hranice úspěchu?",
      moznosti: [
        {
          id: "a",
          text: "Nejméně 80 % správných odpovědí v součtu obou částí",
          spravna: false,
          vysvetleni:
            "Výsledky obou částí se nesčítají. Nejméně 80 % je nutné v písemné i v ústní části zvlášť (§ 19 odst. 2 písm. c) zákona č. 250/2021 Sb.)."
        },
        {
          id: "b",
          text: "Nejméně 80 % v testu, ústní pohovor se nehodnotí",
          spravna: false,
          vysvetleni:
            "Ústní část se hodnotí také a i v ní je potřeba nejméně 80 % správných odpovědí."
        },
        {
          id: "c",
          text: "Nejméně 70 % v testu a 80 % v ústní části",
          spravna: false,
          vysvetleni:
            "Pro obě části platí stejná hranice 80 %. K ústní části se postupuje jen po úspěšném písemném testu."
        },
        {
          id: "d",
          text: "Nejméně 80 % v písemné i v ústní části zvlášť",
          spravna: true,
          vysvetleni:
            "Správně. Pro „vyhověl“ je nutných nejméně 80 % správných odpovědí v každé části a k ústní části lze přistoupit jen po úspěšném testu (§ 19 odst. 2 písm. c) zákona č. 250/2021 Sb.)."
        }
      ],
      shrnuti: "80 % v písemném testu, potom 80 % v ústní části – každá část se hodnotí zvlášť.",
      fakta: ["K1-12", "K1-11"]
    },
    {
      id: "k1-q16",
      kapitola: K,
      podtema: "zkouska",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Uchazeč ve zkoušce celkově nevyhověl. Kdy ji může nejdříve opakovat?",
      moznosti: [
        {
          id: "a",
          text: "Nejdříve po 15 dnech, počet opakování není omezen",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 19 odst. 2 písm. c) zákona č. 250/2021 Sb. lze při celkovém hodnocení „nevyhověl“ zkoušku opakovat nejdříve po 15 dnech a počet opakování není omezen."
        },
        {
          id: "b",
          text: "Nejdříve po 30 dnech, nejvýše dvakrát",
          spravna: false,
          vysvetleni:
            "Lhůta je kratší a počet pokusů neomezený: opakovat lze nejdříve po 15 dnech, a to kolikrát je potřeba."
        },
        {
          id: "c",
          text: "Nejdříve po 3 měsících a po novém zaškolení",
          spravna: false,
          vysvetleni:
            "Zákon stanoví lhůtu 15 dnů, ne 3 měsíce. Počet opakování neomezuje."
        },
        {
          id: "d",
          text: "Ihned, pokud neuspěl jen v ústní části",
          spravna: false,
          vysvetleni:
            "Ani neúspěch jen v ústní části lhůtu nezkracuje. Při celkovém hodnocení „nevyhověl“ lze opakovat nejdříve po 15 dnech."
        }
      ],
      shrnuti: "Neúspěšnou zkoušku lze opakovat nejdříve po 15 dnech, počet pokusů není omezen.",
      fakta: ["K1-13", "K1-12"]
    },
    {
      id: "k1-q17",
      kapitola: K,
      podtema: "zkouska",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak dlouho platí doklad o úspěšném složení zkoušky z odborné způsobilosti v elektrotechnice?",
      moznosti: [
        {
          id: "a",
          text: "2 roky ode dne vydání",
          spravna: false,
          vysvetleni:
            "2 roky jsou minimální praxe vedoucího elektrotechnika pro E2A a E3A, ne platnost dokladu. Doklad platí 3 roky."
        },
        {
          id: "b",
          text: "3 roky ode dne vydání",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 19 odst. 2 písm. b) zákona č. 250/2021 Sb. platí doklad o zkoušce z odborné způsobilosti v elektrotechnice 3 roky ode dne vydání."
        },
        {
          id: "c",
          text: "5 let ode dne vydání",
          spravna: false,
          vysvetleni:
            "5 let platí osvědčení revizního technika (§ 12 zákona č. 250/2021 Sb.). Doklad o zkoušce z odborné způsobilosti platí 3 roky."
        },
        {
          id: "d",
          text: "10 let ode dne vydání",
          spravna: false,
          vysvetleni:
            "10 let platí oprávnění firmy (§ 8 zákona č. 250/2021 Sb.). Doklad o zkoušce z odborné způsobilosti platí 3 roky."
        }
      ],
      shrnuti: "Doklad o zkoušce platí 3 roky, osvědčení revizního technika 5 let, oprávnění firmy 10 let.",
      fakta: ["K1-14", "K2-08", "K2-07", "K1-07"]
    },
    {
      id: "k1-q18",
      kapitola: K,
      podtema: "zkouska",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co uchazeč předloží předsedovi komise před zkouškou?",
      moznosti: [
        {
          id: "a",
          text: "Doklad o kvalifikaci a oprávnění firmy, pro kterou pracuje",
          spravna: false,
          vysvetleni:
            "Oprávnění je doklad firmy, ne uchazeče. Nařízení požaduje doklad o kvalifikaci a doklad o délce praxe (§ 9 odst. 5 NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Doklad o délce praxe a zápis o poučení",
          spravna: false,
          vysvetleni:
            "Zápis o poučení je doklad osoby poučené (§ 4). Předseda komise požaduje doklad o kvalifikaci a doklad o délce praxe."
        },
        {
          id: "c",
          text: "Doklad o kvalifikaci a zprávu o revizi, kterou sám provedl",
          spravna: false,
          vysvetleni:
            "Revize smí provádět jen revizní technik s osvědčením. Uchazeč předkládá doklad o kvalifikaci a doklad o délce praxe."
        },
        {
          id: "d",
          text: "Doklad o kvalifikaci a doklad o délce praxe",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 9 odst. 5 NV č. 194/2022 Sb. předloží doklad o kvalifikaci (originál nebo úředně ověřenou kopii) a doklad o délce praxe (potvrzení zaměstnavatele nebo čestné prohlášení)."
        }
      ],
      shrnuti:
        "Ke zkoušce: doklad o kvalifikaci (originál nebo ověřená kopie) a doklad o praxi (potvrzení zaměstnavatele nebo čestné prohlášení).",
      fakta: ["K1-25", "K1-18", "K2-09"]
    },
    {
      id: "k1-q19",
      kapitola: K,
      podtema: "zkouska",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Pracujete jako vedoucí elektrotechnik na živnost, bez zaměstnavatele. Platnost vašeho dokladu o zkoušce právě skončila. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Zůstáváte vedoucím elektrotechnikem, dokud vás nevyzve inspekce",
          spravna: false,
          vysvetleni:
            "Platnost dokladu je pevná, 3 roky ode dne vydání. Po jejím skončení se osoba znalá považuje za osobu poučenou (§ 4 odst. 1 NV č. 194/2022 Sb.)."
        },
        {
          id: "b",
          text: "Zkoušku vám musí zajistit oblastní inspektorát práce",
          spravna: false,
          vysvetleni:
            "Osoba samostatně výdělečně činná si zkoušku zajišťuje sama (§ 19 odst. 4 zákona č. 250/2021 Sb.). Inspektoráty práce vykonávají státní správu."
        },
        {
          id: "c",
          text: "Považujete se za osobu poučenou a zkoušku si zajistíte sám",
          spravna: true,
          vysvetleni:
            "Správně. Osoba znalá, jejíž přezkoušení pozbylo platnosti, se považuje za osobu poučenou (§ 4 odst. 1 NV č. 194/2022 Sb.). Osoba samostatně výdělečně činná si zkoušku zajišťuje sama (§ 19 odst. 4 zákona)."
        },
        {
          id: "d",
          text: "Máte 15 dní, během nichž smíte dál řídit práce",
          spravna: false,
          vysvetleni:
            "15 dní je nejkratší lhůta pro opakování neúspěšné zkoušky, ne přechodné období. Po skončení platnosti se považujete za osobu poučenou."
        }
      ],
      shrnuti:
        "Po skončení platnosti dokladu je osoba znalá jen osobou poučenou, dokud znovu neuspěje u zkoušky; živnostník si zkoušku zajišťuje sám.",
      fakta: ["K1-19", "K1-24", "K1-14", "K1-13"]
    },

    // ───────── Osoba poučená a školení ─────────
    {
      id: "k1-q20",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Kdo provádí poučení a ověření znalostí osoby poučené?",
      moznosti: [
        {
          id: "a",
          text: "Tříčlenná zkušební komise s revizním technikem v čele",
          spravna: false,
          vysvetleni:
            "Tříčlenná komise ověřuje znalosti vedoucího elektrotechnika (§ 7 odst. 4 NV č. 194/2022 Sb.). Osobu poučenou poučí a ověří pověřená osoba znalá."
        },
        {
          id: "b",
          text: "Pověřená osoba znalá",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 19 odst. 3 zákona č. 250/2021 Sb. provede poučení a ověření znalostí pověřená osoba znalá; dokladem je zápis podepsaný oběma."
        },
        {
          id: "c",
          text: "Výhradně vedoucí elektrotechnik",
          spravna: false,
          vysvetleni:
            "Nemusí to být vedoucí elektrotechnik. Stačí pověřená osoba znalá, tedy i elektrotechnik (§ 6)."
        },
        {
          id: "d",
          text: "Technická inspekce České republiky",
          spravna: false,
          vysvetleni:
            "Technická inspekce České republiky uděluje osvědčení revizním technikům. Osobu poučenou poučí a ověří pověřená osoba znalá."
        }
      ],
      shrnuti: "Osobu poučenou poučí a přezkouší pověřená osoba znalá, dokladem je zápis podepsaný oběma.",
      fakta: ["K1-17", "K1-10", "K1-04", "K2-08"]
    },
    {
      id: "k1-q21",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 2,
      zadani: "V jaké lhůtě se opakuje poučení a ověření znalostí osoby poučené?",
      moznosti: [
        {
          id: "a",
          text: "Ve lhůtě, kterou určí osoba znalá, nejvýše po 3 letech",
          spravna: true,
          vysvetleni:
            "Správně. Lhůtu opakování určí osoba znalá, nejvýše však 3 roky (§ 19 odst. 3 zákona č. 250/2021 Sb.)."
        },
        {
          id: "b",
          text: "Pevně každé 3 roky, stejně jako u dokladu osoby znalé",
          spravna: false,
          vysvetleni:
            "3 roky jsou jen horní hranice. Konkrétní lhůtu určí osoba znalá a může být kratší."
        },
        {
          id: "c",
          text: "Každý rok spolu s pravidelným školením",
          spravna: false,
          vysvetleni:
            "Jednou ročně se školí o předpisech, nemá-li provozovatel vnitřní předpis (§ 3 odst. 4 NV č. 194/2022 Sb.). Ověření znalostí osoby poučené se opakuje ve lhůtě určené osobou znalou, nejvýše po 3 letech."
        },
        {
          id: "d",
          text: "Každých 5 let, stejně jako u osvědčení",
          spravna: false,
          vysvetleni:
            "5 let platí osvědčení revizního technika. Poučení se opakuje ve lhůtě, kterou určí osoba znalá, nejvýše po 3 letech."
        }
      ],
      shrnuti: "Lhůtu opakování poučení určuje osoba znalá, nejvýše 3 roky.",
      fakta: ["K1-17", "K1-21", "K2-08"]
    },
    {
      id: "k1-q22",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Poučujete skladníka, který bude podle vašich pokynů pracovat na zařízeních nízkého napětí bez napětí. Co musí obsahovat zápis o poučení?",
      moznosti: [
        {
          id: "a",
          text: "Evidenční číslo vašeho osvědčení revizního technika",
          spravna: false,
          vysvetleni:
            "Evidenční číslo osvědčení revizního technika patří do zprávy o revizi (§ 10 NV č. 190/2022 Sb.). Do zápisu o poučení patří rozsah poučení, pracoviště a podpisy obou."
        },
        {
          id: "b",
          text: "Jen podpis skladníka a datum poučení",
          spravna: false,
          vysvetleni:
            "Zápis podepisují oba – osoba znalá i poučovaný – a musí v něm být přesně vymezen rozsah poučení a pracoviště (§ 4 odst. 3 NV č. 194/2022 Sb.)."
        },
        {
          id: "c",
          text: "Lhůtu platnosti 5 let a razítko zaměstnavatele",
          spravna: false,
          vysvetleni:
            "Lhůta opakování je nejvýše 3 roky a určuje ji osoba znalá. Zápis musí obsahovat rozsah poučení, pracoviště a podpisy obou."
        },
        {
          id: "d",
          text: "Rozsah poučení, pracoviště a podpisy obou",
          spravna: true,
          vysvetleni:
            "Správně. Zápis vyhotovuje osoba znalá, která poučení provedla. Přesně v něm vymezí rozsah poučení a pracoviště a podepíší ho oba (§ 4 odst. 3 NV č. 194/2022 Sb., § 19 odst. 3 zákona č. 250/2021 Sb.)."
        }
      ],
      shrnuti: "Zápis o poučení: rozsah poučení, specifikace pracoviště a podpisy osoby znalé i poučené.",
      fakta: ["K1-18", "K1-17", "K3-04", "K2-20"]
    },
    {
      id: "k1-q23",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Která činnost na vyhrazeném elektrickém zařízení malého a nízkého napětí NEVYŽADUJE odbornou způsobilost podle NV č. 194/2022 Sb.?",
      moznosti: [
        {
          id: "a",
          text: "Montáž",
          spravna: false,
          vysvetleni:
            "Montáž je práce na vyhrazeném elektrickém zařízení (§ 2 písm. b) NV č. 190/2022 Sb.) a smí ji provádět jen odborně způsobilá osoba. Bez odborné způsobilosti lze vykonávat obsluhu."
        },
        {
          id: "b",
          text: "Měření",
          spravna: false,
          vysvetleni:
            "Měření je práce na vyhrazeném elektrickém zařízení a smí ji provádět jen odborně způsobilá osoba. Bez odborné způsobilosti lze vykonávat obsluhu."
        },
        {
          id: "c",
          text: "Obsluha",
          spravna: true,
          vysvetleni:
            "Správně. Obsluha elektrického zařízení malého a nízkého napětí se nepovažuje za činnost vyžadující odbornou způsobilost podle NV č. 194/2022 Sb. (§ 3 odst. 2)."
        },
        {
          id: "d",
          text: "Oprava",
          spravna: false,
          vysvetleni:
            "Oprava je práce na vyhrazeném elektrickém zařízení a smí ji provádět jen odborně způsobilá osoba (§ 7 odst. 6 NV č. 190/2022 Sb.). Bez odborné způsobilosti lze vykonávat obsluhu."
        }
      ],
      shrnuti:
        "Obsluha zařízení malého a nízkého napětí nevyžaduje odbornou způsobilost podle NV č. 194/2022 Sb.; montáž, měření ani oprava bez ní nejdou.",
      fakta: ["K1-20", "K3-13", "K3-11"]
    },
    {
      id: "k1-q24",
      kapitola: K,
      podtema: "poucena",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Provozovatel, pro kterého řídíte práce, nemá vnitřní předpis o školení. Jak často musí školit elektrotechniky a osoby poučené o předpisech bezpečnosti a ochrany zdraví při práci (BOZP)?",
      moznosti: [
        {
          id: "a",
          text: "Nejméně jednou ročně",
          spravna: true,
          vysvetleni:
            "Správně. Podle § 3 odst. 4 NV č. 194/2022 Sb. se školení osob podle § 4, 6 a 7 řídí vnitřním předpisem provozovatele; bez něj se konají nejméně jednou ročně."
        },
        {
          id: "b",
          text: "Nejméně jednou za 3 roky",
          spravna: false,
          vysvetleni:
            "3 roky jsou platnost dokladu o zkoušce a horní hranice lhůty poučení. Pravidelné školení bez vnitřního předpisu se koná nejméně jednou ročně."
        },
        {
          id: "c",
          text: "Nejméně jednou za 2 roky",
          spravna: false,
          vysvetleni:
            "Pro případ bez vnitřního předpisu stanoví nařízení nejméně jednou ročně, ne jednou za 2 roky."
        },
        {
          id: "d",
          text: "Jen při nástupu do práce",
          spravna: false,
          vysvetleni:
            "Jednorázové školení nestačí. Bez vnitřního předpisu se osoby podle § 4, 6 a 7 školí nejméně jednou ročně."
        }
      ],
      shrnuti: "Bez vnitřního předpisu provozovatele se o předpisech BOZP školí nejméně jednou ročně.",
      fakta: ["K1-21", "K1-14", "K1-17"]
    }
  ]
};

export default obsah;
