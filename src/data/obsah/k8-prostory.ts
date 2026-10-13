// Kapitola 8 – Vnější vlivy, krytí a zvláštní prostory.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
// Normy ČSN 33 2000-5-51, ČSN 33 2000-7-701 a ČSN EN 60529 popisujeme vlastními slovy, nikdy doslovně.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k8-prostory" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "vlivy", nazev: "Vnější vlivy a dokumentace" },
    { id: "ip", nazev: "IP kód" },
    { id: "koupelna", nazev: "Prostory s vanou nebo sprchou" },
    { id: "prostredi", nazev: "Prostředí a třídy zařízení" }
  ],

  lekce: [
    {
      id: "k8-l01",
      podtema: "vlivy",
      nadpis: "Posouzení vnějších vlivů",
      text: md(
        "Součástí **průvodní dokumentace** vyhrazeného elektrického zařízení je **posouzení vnějších vlivů**. Dodavatel ji po montáži předá odběrateli spolu se zprávou o výchozí revizi, není-li sjednáno jinak.",
        "",
        "**Protokol o určení vnějších vlivů** je podkladem pro **výchozí i pravidelnou revizi** a patří i k podkladům pro revizi mimořádnou. Potřebuje ho tedy i revizní technik, který přichází po letech provozu.",
        "",
        "Při prohlídce v rámci revize se s ohledem na vnější vlivy kontroluje:",
        "- **volba zařízení a ochranných opatření**,",
        "- **oprávněnost zatřídění a označení prostorů**."
      ),
      fakta: ["K8-01", "K2-12", "K9-04", "K9-05", "K8-02"]
    },
    {
      id: "k8-l02",
      podtema: "vlivy",
      nadpis: "Kód vnějších vlivů",
      text: md(
        "Vnější vlivy se značí **kódem ze dvou písmen a číslice**:",
        "- **první písmeno** udává kategorii: **A** – prostředí, **B** – využití, **C** – konstrukce budov,",
        "- **druhé písmeno** udává druh vlivu, například **AD** je voda,",
        "- **číslice** udává třídu vlivu.",
        "",
        "Kód stručně zapisuje, čemu je zařízení v daném prostoru vystaveno. Podle toho se volí zařízení a ochranná opatření a tuto volbu revizní technik kontroluje při prohlídce.",
        "",
        "Značení vychází z ČSN 33 2000-5-51 ed. 3 a je potřeba ho ověřit v aktuálním znění normy."
      ),
      fakta: ["K8-07", "K8-02"]
    },
    {
      id: "k8-l03",
      podtema: "ip",
      nadpis: "IP kód – stupeň ochrany krytem",
      text: md(
        "Stupeň ochrany krytem se značí **kódem IP** se dvěma číslicemi:",
        "- **první číslice (0–6)** – ochrana před vniknutím **cizích pevných těles** a před **dotykem** nebezpečných částí,",
        "- **druhá číslice (0–9)** – ochrana před vniknutím **vody**.",
        "",
        "Příklady:",
        "- **IP2X** – tělesa nad 12,5 mm, ochrana před dotykem prstem; **IP4X** – tělesa nad 1 mm,",
        "- **IP5X** – ochrana před prachem; **IP6X** – prachotěsné,",
        "- **IPX4** – stříkající voda; **IPX5** – tryskající voda; **IPX7** – dočasné ponoření.",
        "",
        "Údaje z ČSN EN 60529 je potřeba ověřit v normě. Kód si složte v ilustraci."
      ),
      ilustrace: "ip-kod",
      fakta: ["K8-05", "K8-06"]
    },
    {
      id: "k8-l04",
      podtema: "koupelna",
      nadpis: "Prostory s vanou nebo sprchou",
      text: md(
        "V prostorech s **vanou nebo sprchou** se rozlišují **zóny 0, 1 a 2**. **Zóna 0** je vnitřek vany nebo sprchové vaničky.",
        "",
        "Pro jednotlivé zóny platí **omezení druhu zařízení** a **minimální stupeň krytí** (IP kód).",
        "",
        "Obvody v těchto prostorech musí být chráněny **proudovým chráničem s IΔn nejvýše 30 mA**. I tady je chránič doplňkovou ochranou: nenahrazuje základní ochranu ani ochranu při poruše.",
        "",
        "Požadavky vycházejí z ČSN 33 2000-7-701 ed. 2. Je potřeba je ověřit v aktuálním znění normy, včetně rozměrů zón a hodnot krytí."
      ),
      fakta: ["K8-08", "K8-09", "K6-08"]
    },
    {
      id: "k8-l05",
      podtema: "prostredi",
      nadpis: "Prostředí a I. třída zařízení",
      text: md(
        "Prostředí ovlivňuje i **třídu** vyhrazeného elektrického zařízení. Do **I. třídy** patří zařízení v prostorách:",
        "- s teplotou okolí **nad +55 °C**,",
        "- s **tryskající vodou** a možností **ponoření**,",
        "- s **trvalým výskytem korozivních a znečišťujících látek**,",
        "- s **nebezpečím požáru hořlavých kapalin**,",
        "",
        "a to tehdy, **vyplývá-li to z projektové nebo provozní dokumentace**. Do I. třídy patří i zařízení pro prostředí s nebezpečím výbuchu.",
        "",
        "Zařízení I. třídy lze uvést do provozu jen na základě **osvědčení pověřené organizace**, které provozovatel uchovává po celou dobu provozu."
      ),
      fakta: ["K8-03", "K2-04", "K2-05"]
    },
    {
      id: "k8-l06",
      podtema: "prostredi",
      nadpis: "Prostředí, lhůty revizí a rozsah způsobilosti",
      text: md(
        "Prostředí rozhoduje i o **lhůtě pravidelné revize**. Například:",
        "- prostory **mokré** a s trvalým výskytem korozivních nebo znečišťujících látek – **1 rok**,",
        "- prostory s **nebezpečím požáru a výbuchu** – **3 roky**.",
        "",
        "Vztahuje-li se na zařízení více lhůt, použije se **nejkratší**.",
        "",
        "Prostředí určuje i **rozsah odborné způsobilosti**. Rozlišují se objekty **bez nebezpečí výbuchu** a **s nebezpečím výbuchu**. Doklad pro objekty bez nebezpečí výbuchu proto **nepokrývá** zařízení v prostředí s nebezpečím výbuchu."
      ),
      fakta: ["K2-15", "K2-17", "K8-04"]
    }
  ],

  otazky: [
    // ───────── Vnější vlivy a dokumentace ─────────
    {
      id: "k8-q01",
      kapitola: K,
      podtema: "vlivy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Součástí které dokumentace je posouzení vnějších vlivů?",
      moznosti: [
        {
          id: "a",
          text: "Zprávy o pravidelné revizi",
          spravna: false,
          vysvetleni:
            "Zpráva o revizi zaznamenává výsledek revize. Posouzení vnějších vlivů je součástí průvodní dokumentace vyhrazeného elektrického zařízení."
        },
        {
          id: "b",
          text: "Průvodní dokumentace zařízení",
          spravna: true,
          vysvetleni:
            "Správně. Součástí průvodní dokumentace je posouzení vnějších vlivů; dodavatel ji po montáži předá odběrateli (§ 6 odst. 3 NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Místního provozního bezpečnostního předpisu",
          spravna: false,
          vysvetleni:
            "Podle § 6 odst. 3 NV č. 190/2022 Sb. je posouzení vnějších vlivů součástí průvodní dokumentace, kterou dodavatel předává po montáži."
        },
        {
          id: "d",
          text: "Dokladu o odborné způsobilosti",
          spravna: false,
          vysvetleni:
            "Doklad o odborné způsobilosti se týká osoby, ne zařízení. Posouzení vnějších vlivů je součástí průvodní dokumentace."
        }
      ],
      shrnuti: "Posouzení vnějších vlivů je součástí průvodní dokumentace zařízení.",
      fakta: ["K8-01", "K2-12"]
    },
    {
      id: "k8-q02",
      kapitola: K,
      podtema: "vlivy",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co se při prohlídce v rámci revize kontroluje s ohledem na vnější vlivy?",
      moznosti: [
        {
          id: "a",
          text: "Volba zařízení a ochranných opatření a zatřídění prostorů",
          spravna: true,
          vysvetleni:
            "Správně. Kontroluje se volba zařízení a ochranných opatření s ohledem na vnější vlivy a oprávněnost zatřídění a označení prostorů (příloha č. 1 NV č. 190/2022 Sb., část A)."
        },
        {
          id: "b",
          text: "Platnost dokladů osob, které zařízení obsluhují",
          spravna: false,
          vysvetleni:
            "Prohlídka s ohledem na vnější vlivy se týká zařízení a prostorů: volby zařízení a ochranných opatření a oprávněnosti zatřídění a označení prostorů."
        },
        {
          id: "c",
          text: "Izolační odpor podlahy a stěn v daném prostoru",
          spravna: false,
          vysvetleni:
            "Izolační odpor podlahy a stěn patří do zkoušek a měření (čtvrtý v pořadí), ne do prohlídky. Prohlídka kontroluje volbu zařízení a ochranných opatření a zatřídění prostorů."
        },
        {
          id: "d",
          text: "Lhůty revizí podle druhu prostoru",
          spravna: false,
          vysvetleni:
            "Lhůty revizí stanoví příloha č. 4 NV č. 190/2022 Sb. Prohlídka s ohledem na vnější vlivy kontroluje volbu zařízení a ochranných opatření a oprávněnost zatřídění prostorů."
        }
      ],
      shrnuti: "Prohlídka: volba zařízení a ochranných opatření podle vnějších vlivů a oprávněnost zatřídění prostorů.",
      fakta: ["K8-02", "K9-01", "K2-15"]
    },
    {
      id: "k8-q03",
      kapitola: K,
      podtema: "vlivy",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Chystáte podklady k pravidelné revizi výrobní haly. Protokol o určení vnějších vlivů se ztratil a kolega navrhuje revizi bez něj – prý se týkal jen výchozí revize. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Kolega má pravdu, protokol je jen pro výchozí revizi",
          spravna: false,
          vysvetleni:
            "Protokol o určení vnějších vlivů je podkladem pro výchozí i pravidelnou revizi, nejen pro výchozí."
        },
        {
          id: "b",
          text: "Protokol je podkladem i pro pravidelnou revizi",
          spravna: true,
          vysvetleni:
            "Správně. Protokol o určení vnějších vlivů je podkladem pro výchozí i pravidelnou revizi a je uvedený i mezi podklady pro pravidelnou a mimořádnou revizi v příloze č. 2."
        },
        {
          id: "c",
          text: "Protokol nahradí zpráva o předchozí revizi",
          spravna: false,
          vysvetleni:
            "Zpráva o předchozí revizi je samostatný podklad. Protokol o vnějších vlivech mezi podklady pro pravidelnou revizi patří také."
        },
        {
          id: "d",
          text: "Protokol vypracuje revizní technik až při revizi",
          spravna: false,
          vysvetleni:
            "Posouzení vnějších vlivů je součástí průvodní dokumentace a protokol je podkladem pro revizi, ne jejím výstupem."
        }
      ],
      shrnuti: "Protokol o určení vnějších vlivů patří k podkladům i u pravidelné revize.",
      fakta: ["K8-01", "K9-05"]
    },
    {
      id: "k8-q04",
      kapitola: K,
      podtema: "vlivy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co udává první písmeno v kódu vnějších vlivů, například A v kódu AD?",
      moznosti: [
        {
          id: "a",
          text: "Druh vlivu, například vodu",
          spravna: false,
          vysvetleni:
            "Druh vlivu udává druhé písmeno (AD – voda). První písmeno udává kategorii: A prostředí, B využití, C konstrukce budov."
        },
        {
          id: "b",
          text: "Třídu vlivu",
          spravna: false,
          vysvetleni: "Třídu vlivu udává číslice na konci kódu. První písmeno udává kategorii."
        },
        {
          id: "c",
          text: "Stupeň ochrany krytem",
          spravna: false,
          vysvetleni:
            "Stupeň ochrany krytem se značí kódem IP. První písmeno kódu vnějších vlivů udává kategorii."
        },
        {
          id: "d",
          text: "Kategorii: prostředí, využití, nebo konstrukci budov",
          spravna: true,
          vysvetleni:
            "Správně. První písmeno udává kategorii (A – prostředí, B – využití, C – konstrukce budov), druhé písmeno druh vlivu a číslice třídu (ČSN 33 2000-5-51 ed. 3)."
        }
      ],
      shrnuti: "Kód vnějších vlivů: kategorie (A, B, C) – druh vlivu – třída.",
      fakta: ["K8-07", "K8-05"]
    },

    // ───────── IP kód ─────────
    {
      id: "k8-q05",
      kapitola: K,
      podtema: "ip",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co udává druhá číslice kódu IP?",
      moznosti: [
        {
          id: "a",
          text: "Ochranu před vniknutím vody",
          spravna: true,
          vysvetleni:
            "Správně. Druhá číslice (0–9) udává ochranu před vniknutím vody, první (0–6) ochranu před cizími pevnými tělesy a dotykem (ČSN EN 60529)."
        },
        {
          id: "b",
          text: "Ochranu před dotykem nebezpečných částí",
          spravna: false,
          vysvetleni:
            "Ochranu před dotykem a před cizími pevnými tělesy udává první číslice. Druhá číslice udává ochranu před vniknutím vody."
        },
        {
          id: "c",
          text: "Odolnost proti mechanickému nárazu",
          spravna: false,
          vysvetleni: "Druhá číslice kódu IP udává ochranu před vniknutím vody, ne odolnost proti nárazu."
        },
        {
          id: "d",
          text: "Ochranu před vniknutím prachu",
          spravna: false,
          vysvetleni:
            "Prach patří k první číslici (IP5X, IP6X). Druhá číslice udává ochranu před vniknutím vody."
        }
      ],
      shrnuti: "IP: první číslice pevná tělesa a dotyk, druhá číslice voda.",
      fakta: ["K8-05", "K8-06"]
    },
    {
      id: "k8-q06",
      kapitola: K,
      podtema: "ip",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co znamená krytí IP2X?",
      moznosti: [
        {
          id: "a",
          text: "Ochranu před tělesy nad 1 mm",
          spravna: false,
          vysvetleni: "To je IP4X. IP2X chrání před tělesy nad 12,5 mm a před dotykem prstem."
        },
        {
          id: "b",
          text: "Ochranu před stříkající vodou",
          spravna: false,
          vysvetleni:
            "Stříkající voda je IPX4, tedy druhá číslice. IP2X znamená tělesa nad 12,5 mm a ochranu před dotykem prstem."
        },
        {
          id: "c",
          text: "Tělesa nad 12,5 mm a ochranu před dotykem prstem",
          spravna: true,
          vysvetleni:
            "Správně. IP2X znamená ochranu před tělesy nad 12,5 mm a před dotykem prstem; druhá číslice se neuvádí (ČSN EN 60529, ověřit v normě)."
        },
        {
          id: "d",
          text: "Prachotěsné provedení",
          spravna: false,
          vysvetleni: "Prachotěsné je IP6X. IP2X chrání před tělesy nad 12,5 mm a před dotykem prstem."
        }
      ],
      shrnuti: "IP2X: tělesa nad 12,5 mm, ochrana před dotykem prstem.",
      fakta: ["K8-06"]
    },
    {
      id: "k8-q07",
      kapitola: K,
      podtema: "ip",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Které krytí z uvedených znamená ochranu před tryskající vodou?",
      moznosti: [
        {
          id: "a",
          text: "IPX4",
          spravna: false,
          vysvetleni: "IPX4 znamená ochranu před stříkající vodou. Tryskající vodu označuje IPX5."
        },
        {
          id: "b",
          text: "IPX7",
          spravna: false,
          vysvetleni: "IPX7 znamená dočasné ponoření. Tryskající vodu označuje IPX5."
        },
        {
          id: "c",
          text: "IP5X",
          spravna: false,
          vysvetleni:
            "Pětka na prvním místě znamená ochranu před prachem. Tryskající voda je druhá číslice 5, tedy IPX5."
        },
        {
          id: "d",
          text: "IPX5",
          spravna: true,
          vysvetleni:
            "Správně. IPX5 znamená ochranu před tryskající vodou (IPX4 stříkající voda, IPX7 dočasné ponoření); údaje ověřit v normě."
        }
      ],
      shrnuti: "IPX4 stříkající, IPX5 tryskající voda, IPX7 dočasné ponoření.",
      fakta: ["K8-06", "K8-05"]
    },
    {
      id: "k8-q08",
      kapitola: K,
      podtema: "ip",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Do skladu cementu vybíráte svítidlo. Provozovatel chce co nejvyšší ochranu před prachem. Které krytí zvolíte?",
      moznosti: [
        {
          id: "a",
          text: "IP6X",
          spravna: true,
          vysvetleni:
            "Správně. IP6X znamená prachotěsné provedení; IP5X je jen ochrana před prachem (ČSN EN 60529, ověřit v normě)."
        },
        {
          id: "b",
          text: "IP5X",
          spravna: false,
          vysvetleni: "IP5X znamená ochranu před prachem. Prachotěsné provedení je až IP6X."
        },
        {
          id: "c",
          text: "IP4X",
          spravna: false,
          vysvetleni: "IP4X chrání před tělesy nad 1 mm. Prachotěsné provedení je IP6X."
        },
        {
          id: "d",
          text: "IPX6",
          spravna: false,
          vysvetleni:
            "Druhá číslice se týká vody. Ochranu před prachem vyjadřuje první číslice; prachotěsné je IP6X."
        }
      ],
      shrnuti: "Nejvyšší ochrana před prachem je IP6X (prachotěsné); IP5X je jen ochrana před prachem.",
      fakta: ["K8-06", "K8-05"]
    },

    // ───────── Prostory s vanou nebo sprchou ─────────
    {
      id: "k8-q09",
      kapitola: K,
      podtema: "koupelna",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co je zóna 0 v prostoru s vanou nebo sprchou?",
      moznosti: [
        {
          id: "a",
          text: "Prostor nad vanou až ke stropu",
          spravna: false,
          vysvetleni: "Zóna 0 je vnitřek vany nebo sprchové vaničky, ne prostor nad ní."
        },
        {
          id: "b",
          text: "Vnitřek vany nebo sprchové vaničky",
          spravna: true,
          vysvetleni:
            "Správně. V prostorech s vanou nebo sprchou se rozlišují zóny 0, 1 a 2; zóna 0 je vnitřek vany nebo sprchové vaničky (ČSN 33 2000-7-701 ed. 2)."
        },
        {
          id: "c",
          text: "Pás do 60 cm od okraje vany",
          spravna: false,
          vysvetleni: "Zóna 0 je vnitřek vany nebo sprchové vaničky, ne pás kolem ní."
        },
        {
          id: "d",
          text: "Celá koupelna kromě vany",
          spravna: false,
          vysvetleni: "Je to naopak: zóna 0 je přímo vnitřek vany nebo sprchové vaničky."
        }
      ],
      shrnuti: "Zóna 0 = vnitřek vany nebo sprchové vaničky.",
      fakta: ["K8-08"]
    },
    {
      id: "k8-q10",
      kapitola: K,
      podtema: "koupelna",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co se v prostorech s vanou nebo sprchou omezuje pro jednotlivé zóny?",
      moznosti: [
        {
          id: "a",
          text: "Jen průřez vodičů",
          spravna: false,
          vysvetleni: "Pro jednotlivé zóny se omezuje druh zařízení a minimální stupeň krytí."
        },
        {
          id: "b",
          text: "Jen lhůta pravidelné revize",
          spravna: false,
          vysvetleni:
            "Lhůty revizí stanoví příloha č. 4 NV č. 190/2022 Sb. Pro jednotlivé zóny se omezuje druh zařízení a minimální stupeň krytí."
        },
        {
          id: "c",
          text: "Druh zařízení a minimální stupeň krytí",
          spravna: true,
          vysvetleni:
            "Správně. Pro jednotlivé zóny platí omezení druhu zařízení a minimální stupeň krytí (ČSN 33 2000-7-701 ed. 2); ověřit v normě."
        },
        {
          id: "d",
          text: "Jen doba automatického odpojení",
          spravna: false,
          vysvetleni:
            "Doby odpojení závisí na typu sítě a obvodu (například 0,4 s v koncovém obvodu sítě TN). Pro zóny se omezuje druh zařízení a minimální stupeň krytí."
        }
      ],
      shrnuti: "Zóny 0, 1 a 2: omezení druhu zařízení a minimální stupeň krytí.",
      fakta: ["K8-08", "K2-15", "K6-02"]
    },
    {
      id: "k8-q11",
      kapitola: K,
      podtema: "koupelna",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Montér připojuje v koupelně nový zásuvkový obvod do zóny 2. Proudový chránič vynechá, protože je zásuvka daleko od vany. Co mu řeknete?",
      moznosti: [
        {
          id: "a",
          text: "Má pravdu, chránič je nutný jen v zóně 0",
          spravna: false,
          vysvetleni:
            "Požadavek se neomezuje na zónu 0. Obvody v prostorech s vanou nebo sprchou musí být chráněny chráničem s IΔn nejvýše 30 mA."
        },
        {
          id: "b",
          text: "Má pravdu, stačí zásuvka s vyšším krytím",
          spravna: false,
          vysvetleni:
            "Krytí chránič nenahradí. Obvody v prostorech s vanou nebo sprchou musí mít chránič s IΔn nejvýše 30 mA."
        },
        {
          id: "c",
          text: "Nemá, obvody v koupelně musí mít chránič do 30 mA",
          spravna: true,
          vysvetleni:
            "Správně. Obvody v prostorech s vanou nebo sprchou musí být chráněny proudovým chráničem s IΔn nejvýše 30 mA (ověřit v normě). Zásuvkový obvod do 32 A ho navíc vyžaduje i podle HD 60364-4-41:2017."
        },
        {
          id: "d",
          text: "Nemá, potřebuje chránič s IΔn 300 mA",
          spravna: false,
          vysvetleni:
            "Pro prostory s vanou nebo sprchou se požaduje chránič s IΔn nejvýše 30 mA, ne 300 mA."
        }
      ],
      shrnuti: "V prostoru s vanou nebo sprchou chrání každý obvod chránič s IΔn nejvýše 30 mA.",
      fakta: ["K8-09", "K8-08", "K6-04"]
    },

    // ───────── Prostředí a třídy zařízení ─────────
    {
      id: "k8-q12",
      kapitola: K,
      podtema: "prostredi",
      typ: "vyber",
      obtiznost: 1,
      zadani:
        "Nad jakou teplotou okolí patří elektrické zařízení do I. třídy, vyplývá-li to z projektové nebo provozní dokumentace?",
      moznosti: [
        {
          id: "a",
          text: "Nad +35 °C",
          spravna: false,
          vysvetleni:
            "Hranice je vyšší. Do I. třídy patří zařízení v prostorách s teplotou okolí nad +55 °C, vyplývá-li to z dokumentace."
        },
        {
          id: "b",
          text: "Nad +45 °C",
          spravna: false,
          vysvetleni:
            "Nařízení uvádí teplotu okolí nad +55 °C (§ 4 odst. 1 NV č. 190/2022 Sb.), ne +45 °C."
        },
        {
          id: "c",
          text: "Nad +55 °C",
          spravna: true,
          vysvetleni:
            "Správně. Zařízení v prostorách s teplotou okolí nad +55 °C patří do I. třídy, pokud to vyplývá z projektové nebo provozní dokumentace (§ 4 odst. 1 NV č. 190/2022 Sb.)."
        },
        {
          id: "d",
          text: "Nad +70 °C",
          spravna: false,
          vysvetleni: "Hranice je nižší: teplota okolí nad +55 °C, vyplývá-li to z dokumentace."
        }
      ],
      shrnuti: "Teplota okolí nad +55 °C může zařadit zařízení do I. třídy.",
      fakta: ["K8-03"]
    },
    {
      id: "k8-q13",
      kapitola: K,
      podtema: "prostredi",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Projekt myčky aut s tryskající vodou řadí její elektrické zařízení do I. třídy. Provozovatel namítá, že objekt je jen pro pár zákazníků, takže jde o II. třídu. Co mu odpovíte?",
      moznosti: [
        {
          id: "a",
          text: "Má pravdu, I. třída je jen pro objekty nad 200 osob",
          spravna: false,
          vysvetleni:
            "Objekt pro více než 200 osob je jen jeden z důvodů. Do I. třídy patří i zařízení v prostorách s tryskající vodou a možností ponoření, vyplývá-li to z dokumentace."
        },
        {
          id: "b",
          text: "Nemá, I. třídu tu určuje prostředí s tryskající vodou",
          spravna: true,
          vysvetleni:
            "Správně. Zařízení v prostorách s tryskající vodou a možností ponoření patří do I. třídy, pokud to vyplývá z projektové nebo provozní dokumentace (§ 4 odst. 1 NV č. 190/2022 Sb.)."
        },
        {
          id: "c",
          text: "Má pravdu, voda rozhoduje jen o krytí IP",
          spravna: false,
          vysvetleni:
            "Ochranu před vodou sice vyjadřuje druhá číslice IP kódu, ale prostory s tryskající vodou a možností ponoření mohou zařízení zařadit i do I. třídy."
        },
        {
          id: "d",
          text: "Nemá, myčka je prostředí s nebezpečím výbuchu",
          spravna: false,
          vysvetleni:
            "Nebezpečí výbuchu tu důvodem není. Do I. třídy zařízení řadí prostředí s tryskající vodou a možností ponoření, vyplývá-li to z dokumentace."
        }
      ],
      shrnuti: "I. třídu může určit i prostředí, například tryskající voda – ne jen počet osob v objektu.",
      fakta: ["K8-03", "K2-04", "K8-05"]
    },
    {
      id: "k8-q14",
      kapitola: K,
      podtema: "prostredi",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jaká je nejdelší lhůta pravidelné revize v prostorech s nebezpečím požáru a výbuchu?",
      moznosti: [
        {
          id: "a",
          text: "1 rok",
          spravna: false,
          vysvetleni:
            "1 rok platí pro prostory mokré a s trvalým výskytem korozivních nebo znečišťujících látek. Pro prostory s nebezpečím požáru a výbuchu jsou to 3 roky."
        },
        {
          id: "b",
          text: "2 roky",
          spravna: false,
          vysvetleni:
            "2 roky platí pro objekt pro více než 200 osob. Prostory s nebezpečím požáru a výbuchu mají lhůtu 3 roky."
        },
        {
          id: "c",
          text: "5 let",
          spravna: false,
          vysvetleni: "5 let je lhůta pro objekty pro administrativu. Prostory s nebezpečím požáru a výbuchu mají 3 roky."
        },
        {
          id: "d",
          text: "3 roky",
          spravna: true,
          vysvetleni:
            "Správně. Prostory s nebezpečím požáru a výbuchu mají nejdelší lhůtu pravidelné revize 3 roky (příloha č. 4 NV č. 190/2022 Sb.)."
        }
      ],
      shrnuti: "Prostory s nebezpečím požáru a výbuchu: pravidelná revize nejpozději po 3 letech.",
      fakta: ["K2-15"]
    }
  ]
};

export default obsah;
