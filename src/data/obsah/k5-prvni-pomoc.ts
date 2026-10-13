// Kapitola 5 – Účinky proudu a první pomoc.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k5-prvni-pomoc" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "ucinky", nazev: "Účinky proudu" },
    { id: "vyprosteni", nazev: "Vyproštění postiženého" },
    { id: "kpr", nazev: "Resuscitace a AED" },
    { id: "po-urazu", nazev: "Po úrazu" }
  ],

  lekce: [
    {
      id: "k5-l01",
      podtema: "ucinky",
      nadpis: "První pomoc patří ke zkoušce",
      text: md(
        "Předmětem školení i zkoušky z odborné způsobilosti jsou **teoretické a praktické znalosti první pomoci**, zejména při **úrazu elektrickým proudem**. Písemný test se týká předpisů bezpečnosti a ochrany zdraví při práci (BOZP) pro činnost na elektrických zařízeních a právě první pomoci.",
        "",
        "Účinky elektrického proudu na člověka závisejí hlavně na:",
        "- **velikosti proudu**,",
        "- **době jeho průchodu**,",
        "- **dráze proudu** tělem,",
        "- **druhu proudu** – zda je střídavý, nebo stejnosměrný, a jakou má frekvenci."
      ),
      fakta: ["K1-26", "K1-11", "K5-08"]
    },
    {
      id: "k5-l02",
      podtema: "ucinky",
      nadpis: "Proč právě 30 mA",
      text: md(
        "Pro představu o velikostech proudu:",
        "- proudy asi **10 až 30 mA** zpravidla nezpůsobí smrt, ale při delším působení jsou nebezpečné,",
        "- proudy **nad 30 mA** mohou být smrtelné, pokud nedojde k rychlému odpojení.",
        "",
        "Z této hranice vychází citlivost doplňkových **proudových chráničů 30 mA**. Chránič porovnává proudy v pracovních vodičích součtovým transformátorem a vybaví, když část proudu odtéká mimo chránič – například přes tělo člověka nebo ochranný vodič.",
        "",
        "Chránič 30 mA přitom není jediným ochranným opatřením. Je **doplňkovou ochranou** k základní ochraně a ochraně při poruše. Podrobně se mu věnuje kapitola 6."
      ),
      fakta: ["K5-09", "K6-07", "K6-08"]
    },
    {
      id: "k5-l03",
      podtema: "vyprosteni",
      nadpis: "Vyproštění z dosahu proudu",
      text: md(
        "Než se zachránce postiženého dotkne, musí ho **vyprostit z dosahu proudu**.",
        "",
        "U zařízení **nízkého napětí (NN)**:",
        "- **vypnout zdroj** – vypínačem, jističem nebo vytažením vidlice ze zásuvky,",
        "- nebo postiženého **odsunout nevodivým předmětem** bez přímého dotyku.",
        "",
        "U zařízení **vysokého napětí (VN)** platí přísnější pravidlo: zachránce se k postiženému **nesmí ani přiblížit**, dokud zařízení není **vypnuto a zajištěno**.",
        "",
        "Rozdíl si pamatujte. U NN může zachránce jednat sám, u VN musí počkat, až bude zařízení vypnuté a zajištěné – i když se se stlačováním hrudníku jinak začíná co nejdříve."
      ),
      fakta: ["K5-06", "K5-07", "K5-01"]
    },
    {
      id: "k5-l04",
      podtema: "kpr",
      nadpis: "Stlačování hrudníku",
      text: md(
        "Při resuscitaci dospělého se **hrudník stlačuje**:",
        "- frekvencí **100 až 120 za minutu**,",
        "- do hloubky **nejméně 5 cm a nejvýše 6 cm**,",
        "- a začíná se **co nejdříve**.",
        "",
        "Vyškolený zachránce střídá **30 stlačení a 2 umělé vdechy** (poměr 30 : 2). Přerušení stlačování má být co nejkratší; při výcviku se za přijatelné považuje přerušení **nejvýše 10 sekund**.",
        "",
        "Metronom v ilustraci udává tempo, počítá stlačení do 30 a pak vyzve ke 2 vdechům. Na vdechy nechá nejvýše 10 sekund."
      ),
      ilustrace: "kpr-metronom",
      fakta: ["K5-01", "K5-02", "K5-03"]
    },
    {
      id: "k5-l05",
      podtema: "kpr",
      nadpis: "Bez vdechů a s AED",
      text: md(
        "Kdo neumí nebo nechce dýchat z úst do úst, provádí **nepřerušované stlačování hrudníku**.",
        "",
        "**Automatizovaný externí defibrilátor (AED)** se použije **co nejdříve**. Zachránce postupuje podle jeho **hlasových pokynů** a stlačování přerušuje jen na dobu **analýzy a výboje**.",
        "",
        "Obě pravidla sledují stejný cíl jako limit 10 sekund: stlačování hrudníku se má přerušovat co nejméně. Kdo nedýchá z úst do úst, nedělá místo vdechů pauzy, a s AED se pauza omezí na analýzu a výboj."
      ),
      fakta: ["K5-04", "K5-05", "K5-03"]
    },
    {
      id: "k5-l06",
      podtema: "po-urazu",
      nadpis: "Po úrazu",
      text: md(
        "I když postižený po úrazu elektrickým proudem **působí zdravě**, má ho **vyšetřit lékař**. Hrozí totiž **pozdní poruchy srdečního rytmu**.",
        "",
        "Tísňová čísla v České republice:",
        "- **155** – zdravotnická záchranná služba,",
        "- **112** – jednotné evropské číslo tísňového volání.",
        "",
        "Jako vedoucí elektrotechnik myslete i na zařízení. Zjistí-li se po úrazu stav, který bezprostředně ohrožuje bezpečnost, musí se vyhrazené elektrické zařízení **neprodleně odpojit od zdroje** a zajistit proti nežádoucímu připojení. Není-li to možné, zajistí se bez zbytečného odkladu oprava."
      ),
      fakta: ["K5-10", "K5-11", "K2-21"]
    }
  ],

  otazky: [
    // ───────── Účinky proudu ─────────
    {
      id: "k5-q01",
      kapitola: K,
      podtema: "ucinky",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Na čem hlavně závisejí účinky elektrického proudu na člověka?",
      moznosti: [
        {
          id: "a",
          text: "Jen na napětí zdroje, kterého se člověk dotkl",
          spravna: false,
          vysvetleni:
            "Účinky nezávisejí na jediném údaji. Hlavními činiteli jsou velikost proudu, doba jeho průchodu, dráha proudu tělem a druh proudu."
        },
        {
          id: "b",
          text: "Na velikosti a druhu proudu, době průchodu a dráze tělem",
          spravna: true,
          vysvetleni:
            "Správně. Podle ČSN IEC/TS 60479-1 závisejí účinky hlavně na velikosti proudu, době jeho průchodu, dráze proudu tělem a druhu proudu (střídavý nebo stejnosměrný, frekvence)."
        },
        {
          id: "c",
          text: "Jen na druhu proudu, tedy zda je střídavý, nebo stejnosměrný",
          spravna: false,
          vysvetleni:
            "Druh proudu je jen jedním z hlavních činitelů. Dalšími jsou velikost proudu, doba jeho průchodu a dráha proudu tělem."
        },
        {
          id: "d",
          text: "Na velikosti proudu a dráze tělem, doba průchodu nerozhoduje",
          spravna: false,
          vysvetleni:
            "Doba průchodu patří mezi hlavní činitele spolu s velikostí proudu, dráhou proudu tělem a druhem proudu."
        }
      ],
      shrnuti: "Účinky proudu: velikost, doba průchodu, dráha tělem a druh proudu (střídavý, stejnosměrný, frekvence).",
      fakta: ["K5-08"]
    },
    {
      id: "k5-q02",
      kapitola: K,
      podtema: "ucinky",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Z čeho vychází citlivost 30 mA u doplňkových proudových chráničů?",
      moznosti: [
        {
          id: "a",
          text: "Proudy do 30 mA jsou bezpečné při jakékoli době působení",
          spravna: false,
          vysvetleni:
            "Proudy asi 10 až 30 mA zpravidla nezpůsobí smrt, ale při delším působení jsou nebezpečné. Citlivost 30 mA vychází z toho, že proudy nad 30 mA mohou být bez rychlého odpojení smrtelné."
        },
        {
          id: "b",
          text: "Nad 30 mA přebírá chránič úlohu ochrany při poruše",
          spravna: false,
          vysvetleni:
            "Chránič 30 mA je doplňkovou ochranou k základní ochraně a ochraně při poruše, nenahrazuje je. Jeho citlivost vychází z toho, že proudy nad 30 mA mohou být smrtelné."
        },
        {
          id: "c",
          text: "Proudy 10 až 30 mA jsou vždy smrtelné",
          spravna: false,
          vysvetleni:
            "Proudy asi 10 až 30 mA zpravidla nezpůsobí smrt. Smrtelné mohou být proudy nad 30 mA, pokud nedojde k rychlému odpojení."
        },
        {
          id: "d",
          text: "Proudy nad 30 mA mohou být smrtelné, není-li rychlé odpojení",
          spravna: true,
          vysvetleni:
            "Správně. Proudy nad 30 mA mohou být smrtelné, pokud nedojde k rychlému odpojení; proudy asi 10 až 30 mA zpravidla smrt nezpůsobí, ale při delším působení jsou nebezpečné. Odtud citlivost 30 mA."
        }
      ],
      shrnuti: "10–30 mA zpravidla nezabíjí, ale při delším působení je nebezpečné; nad 30 mA může být smrtelné – proto chrániče 30 mA.",
      fakta: ["K5-09", "K6-08"]
    },

    // ───────── Vyproštění postiženého ─────────
    {
      id: "k5-q03",
      kapitola: K,
      podtema: "vyprosteni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Kolega v dílně zůstal v kontaktu s poškozeným přívodem spotřebiče zapojeného do zásuvky 230 V. Jak postupujete?",
      moznosti: [
        {
          id: "a",
          text: "Vytáhnete vidlici nebo vypnete jistič, teprve pak se ho dotknete",
          spravna: true,
          vysvetleni:
            "Správně. U zařízení nízkého napětí je nutné postiženého před dotykem vyprostit z dosahu proudu: vypnout zdroj (vypínač, jistič, vytažení vidlice), nebo ho odsunout nevodivým předmětem bez přímého dotyku."
        },
        {
          id: "b",
          text: "Chytnete ho za ramena a co nejrychleji ho odtáhnete",
          spravna: false,
          vysvetleni:
            "Postiženého je nutné vyprostit z dosahu proudu dřív, než se ho dotknete. Vypněte zdroj, nebo ho odsuňte nevodivým předmětem bez přímého dotyku."
        },
        {
          id: "c",
          text: "Zavoláte 112 a čekáte, až zařízení vypne a zajistí odborník",
          spravna: false,
          vysvetleni:
            "Čekat na vypnutí a zajištění je pravidlo pro vysoké napětí. U nízkého napětí zdroj vypnete sami, nebo postiženého odsunete nevodivým předmětem."
        },
        {
          id: "d",
          text: "Přívod přestřihnete štípačkami s izolovanými rukojeťmi",
          spravna: false,
          vysvetleni:
            "Zásady vyproštění uvádějí vypnutí zdroje – vypínačem, jističem nebo vytažením vidlice – nebo odsunutí postiženého nevodivým předmětem bez přímého dotyku. Vidlice i jistič jsou tu po ruce."
        }
      ],
      shrnuti: "Nízké napětí: nejdřív vypnout zdroj (vypínač, jistič, vidlice) nebo odsunout nevodivým předmětem, teprve pak se dotknout.",
      fakta: ["K5-06", "K5-07"]
    },
    {
      id: "k5-q04",
      kapitola: K,
      podtema: "vyprosteni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "U rozvodny vysokého napětí leží v bezvědomí pracovník, který se dotkl živé části. Zařízení zatím vypnuté není. Co platí pro váš postup?",
      moznosti: [
        {
          id: "a",
          text: "Odsunete ho suchou dřevěnou latí a začnete resuscitaci",
          spravna: false,
          vysvetleni:
            "Odsunutí nevodivým předmětem je postup pro nízké napětí. K postiženému u vysokého napětí se nesmíte přiblížit, dokud zařízení není vypnuto a zajištěno."
        },
        {
          id: "b",
          text: "Okamžitě začnete stlačovat hrudník, rozhoduje každá vteřina",
          spravna: false,
          vysvetleni:
            "Se stlačováním se sice začíná co nejdříve, ale k postiženému u vysokého napětí se nesmíte přiblížit, dokud zařízení není vypnuto a zajištěno."
        },
        {
          id: "c",
          text: "Nepřiblížíte se, dokud zařízení není vypnuto a zajištěno",
          spravna: true,
          vysvetleni:
            "Správně. K postiženému u zařízení vysokého napětí se zachránce nesmí přiblížit, dokud zařízení není vypnuto a zajištěno."
        },
        {
          id: "d",
          text: "Přiblížíte se jen v ochranných pomůckách a vytáhnete ho",
          spravna: false,
          vysvetleni:
            "Pro vysoké napětí platí, že se zachránce k postiženému nesmí přiblížit, dokud zařízení není vypnuto a zajištěno. Výjimku pro ochranné pomůcky zásady neuvádějí."
        }
      ],
      shrnuti: "Vysoké napětí: k postiženému se nepřibližovat, dokud zařízení není vypnuto a zajištěno.",
      fakta: ["K5-07", "K5-06", "K5-01"]
    },

    // ───────── Resuscitace a AED ─────────
    {
      id: "k5-q05",
      kapitola: K,
      podtema: "kpr",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jakou frekvencí se při resuscitaci dospělého stlačuje hrudník?",
      moznosti: [
        {
          id: "a",
          text: "60 až 80 za minutu",
          spravna: false,
          vysvetleni:
            "To je příliš pomalé tempo. Hrudník dospělého se stlačuje frekvencí 100 až 120 za minutu."
        },
        {
          id: "b",
          text: "80 až 100 za minutu",
          spravna: false,
          vysvetleni:
            "Doporučená frekvence je 100 až 120 za minutu; 80 až 100 je pod dolní hranicí."
        },
        {
          id: "c",
          text: "100 až 120 za minutu",
          spravna: true,
          vysvetleni:
            "Správně. Podle doporučení ERC 2025 se hrudník dospělého stlačuje frekvencí 100 až 120 za minutu a se stlačováním se začíná co nejdříve."
        },
        {
          id: "d",
          text: "120 až 140 za minutu",
          spravna: false,
          vysvetleni:
            "Horní hranice je 120 za minutu. Doporučená frekvence je 100 až 120 stlačení za minutu."
        }
      ],
      shrnuti: "Tempo stlačování hrudníku dospělého: 100 až 120 za minutu.",
      fakta: ["K5-01"]
    },
    {
      id: "k5-q06",
      kapitola: K,
      podtema: "kpr",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Do jaké hloubky se při resuscitaci stlačuje hrudník dospělého?",
      moznosti: [
        {
          id: "a",
          text: "4 až 5 cm",
          spravna: false,
          vysvetleni:
            "Nejmenší hloubka je 5 cm. Hrudník dospělého se stlačuje do hloubky nejméně 5 cm a nejvýše 6 cm."
        },
        {
          id: "b",
          text: "5 až 6 cm",
          spravna: true,
          vysvetleni:
            "Správně. Podle doporučení ERC 2025 se hrudník dospělého stlačuje do hloubky nejméně 5 cm a nejvýše 6 cm."
        },
        {
          id: "c",
          text: "6 až 7 cm",
          spravna: false,
          vysvetleni:
            "Horní hranice je 6 cm. Hrudník se stlačuje do hloubky nejméně 5 cm a nejvýše 6 cm."
        },
        {
          id: "d",
          text: "7 až 8 cm",
          spravna: false,
          vysvetleni:
            "To je víc, než se doporučuje. Hloubka stlačení je nejméně 5 cm a nejvýše 6 cm."
        }
      ],
      shrnuti: "Hloubka stlačení hrudníku dospělého: nejméně 5 cm, nejvýše 6 cm.",
      fakta: ["K5-01"]
    },
    {
      id: "k5-q07",
      kapitola: K,
      podtema: "kpr",
      typ: "vyber",
      obtiznost: 1,
      zadani: "V jakém poměru střídá vyškolený zachránce stlačení hrudníku a umělé vdechy?",
      moznosti: [
        {
          id: "a",
          text: "15 : 2",
          spravna: false,
          vysvetleni:
            "Platí poměr 30 : 2 – po 30 stlačeních hrudníku následují 2 umělé vdechy."
        },
        {
          id: "b",
          text: "30 : 1",
          spravna: false,
          vysvetleni:
            "Po 30 stlačeních následují 2 umělé vdechy, ne jeden. Poměr je 30 : 2."
        },
        {
          id: "c",
          text: "15 : 1",
          spravna: false,
          vysvetleni:
            "Platí poměr 30 : 2, tedy 30 stlačení hrudníku a 2 umělé vdechy."
        },
        {
          id: "d",
          text: "30 : 2",
          spravna: true,
          vysvetleni:
            "Správně. Vyškolený zachránce střídá 30 stlačení hrudníku a 2 umělé vdechy; poměr 30 : 2 doporučuje ERC od roku 2005."
        }
      ],
      shrnuti: "Vyškolený zachránce: 30 stlačení a 2 vdechy (30 : 2).",
      fakta: ["K5-02"]
    },
    {
      id: "k5-q08",
      kapitola: K,
      podtema: "kpr",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak dlouhé přerušení stlačování hrudníku se při výcviku považuje za přijatelné?",
      moznosti: [
        {
          id: "a",
          text: "Nejvýše 10 sekund",
          spravna: true,
          vysvetleni:
            "Správně. Přerušení stlačování má být co nejkratší; při výcviku se za přijatelné považuje přerušení nejvýše 10 sekund."
        },
        {
          id: "b",
          text: "Nejvýše 20 sekund",
          spravna: false,
          vysvetleni:
            "Přijatelné je přerušení nejvýše 10 sekund, a i tak má být co nejkratší."
        },
        {
          id: "c",
          text: "Nejvýše 30 sekund",
          spravna: false,
          vysvetleni:
            "30 sekund je třikrát víc, než je přijatelné. Přerušení má trvat nejvýše 10 sekund."
        },
        {
          id: "d",
          text: "Nejvýše 1 minutu",
          spravna: false,
          vysvetleni:
            "Minuta bez stlačování je mnohem víc, než je přijatelné. Při výcviku se připouští přerušení nejvýše 10 sekund."
        }
      ],
      shrnuti: "Přerušení stlačování co nejkratší – nejvýše 10 sekund.",
      fakta: ["K5-03"]
    },
    {
      id: "k5-q09",
      kapitola: K,
      podtema: "kpr",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jak má postupovat zachránce, který neumí nebo nechce dýchat z úst do úst?",
      moznosti: [
        {
          id: "a",
          text: "Resuscitaci nezahájí a čeká na záchrannou službu",
          spravna: false,
          vysvetleni:
            "Zachránce bez vdechů resuscitaci nevzdává. Provádí nepřerušované stlačování hrudníku."
        },
        {
          id: "b",
          text: "Provádí nepřerušované stlačování hrudníku",
          spravna: true,
          vysvetleni:
            "Správně. Kdo neumí nebo nechce dýchat z úst do úst, provádí podle doporučení ERC pro laiky nepřerušované stlačování hrudníku."
        },
        {
          id: "c",
          text: "Po každých 30 stlačeních udělá pauzu místo vdechů",
          spravna: false,
          vysvetleni:
            "Pauzy místo vdechů se nedělají. Bez vdechů se hrudník stlačuje nepřerušovaně."
        },
        {
          id: "d",
          text: "Jen sleduje dýchání, dokud nepřijede pomoc",
          spravna: false,
          vysvetleni:
            "Samotné sledování dýchání nestačí. Kdo nedýchá z úst do úst, provádí nepřerušované stlačování hrudníku."
        }
      ],
      shrnuti: "Bez vdechů z úst do úst: nepřerušované stlačování hrudníku.",
      fakta: ["K5-04", "K5-02"]
    },
    {
      id: "k5-q10",
      kapitola: K,
      podtema: "kpr",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Stlačujete hrudník a kolegyně právě přinesla automatizovaný externí defibrilátor (AED). Jak s ním naložíte?",
      moznosti: [
        {
          id: "a",
          text: "Použijete ho až po příjezdu záchranné služby",
          spravna: false,
          vysvetleni:
            "AED se použije co nejdříve, ne až s příjezdem záchranné služby. Zachránce postupuje podle jeho hlasových pokynů."
        },
        {
          id: "b",
          text: "Připojíte ho a po dobu jeho použití stlačování vynecháte",
          spravna: false,
          vysvetleni:
            "Stlačování se přerušuje jen na dobu analýzy a výboje; jinak se v něm pokračuje podle hlasových pokynů AED."
        },
        {
          id: "c",
          text: "Připojíte ho až po dokončení dalšího cyklu 30 : 2",
          spravna: false,
          vysvetleni:
            "Na konec cyklu se nečeká. AED se použije co nejdříve a stlačování se přerušuje jen na dobu analýzy a výboje."
        },
        {
          id: "d",
          text: "Použijete ho hned a stlačování přerušíte jen na analýzu a výboj",
          spravna: true,
          vysvetleni:
            "Správně. AED se použije co nejdříve, zachránce postupuje podle jeho hlasových pokynů a stlačování přerušuje jen na dobu analýzy a výboje."
        }
      ],
      shrnuti: "AED co nejdříve, podle jeho hlasových pokynů; stlačování přerušit jen na analýzu a výboj.",
      fakta: ["K5-05", "K5-03"]
    },

    // ───────── Po úrazu ─────────
    {
      id: "k5-q11",
      kapitola: K,
      podtema: "po-urazu",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jaké telefonní číslo má v České republice zdravotnická záchranná služba?",
      moznosti: [
        {
          id: "a",
          text: "150",
          spravna: false,
          vysvetleni:
            "Zdravotnická záchranná služba má číslo 155. Zavolat lze i na jednotné evropské číslo tísňového volání 112."
        },
        {
          id: "b",
          text: "158",
          spravna: false,
          vysvetleni:
            "Správné číslo zdravotnické záchranné služby je 155; jednotné evropské číslo tísňového volání je 112."
        },
        {
          id: "c",
          text: "155",
          spravna: true,
          vysvetleni:
            "Správně. Zdravotnická záchranná služba má číslo 155. Jednotné evropské číslo tísňového volání je 112."
        },
        {
          id: "d",
          text: "156",
          spravna: false,
          vysvetleni:
            "Zdravotnickou záchrannou službu přivoláte na čísle 155, případně přes jednotné evropské číslo 112."
        }
      ],
      shrnuti: "Zdravotnická záchranná služba 155, jednotné evropské číslo tísňového volání 112.",
      fakta: ["K5-11"]
    },
    {
      id: "k5-q12",
      kapitola: K,
      podtema: "po-urazu",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Elektrikář z vaší party dostal ránu proudem. Je při vědomí, cítí se dobře a chce pokračovat v práci. Co zajistíte?",
      moznosti: [
        {
          id: "a",
          text: "Vyšetření lékařem kvůli hrozícím poruchám srdečního rytmu",
          spravna: true,
          vysvetleni:
            "Správně. I když postižený po úrazu elektrickým proudem působí zdravě, má ho vyšetřit lékař, protože hrozí pozdní poruchy srdečního rytmu."
        },
        {
          id: "b",
          text: "Nic, když se cítí dobře, vyšetření lékařem není potřeba",
          spravna: false,
          vysvetleni:
            "Dobrý pocit nestačí. Po úrazu elektrickým proudem hrozí pozdní poruchy srdečního rytmu, proto má postiženého vyšetřit lékař."
        },
        {
          id: "c",
          text: "Jen ošetření případných popálenin z lékárničky na místě",
          spravna: false,
          vysvetleni:
            "Důvodem k vyšetření lékařem nejsou jen viditelná zranění. Po úrazu elektrickým proudem hrozí pozdní poruchy srdečního rytmu."
        },
        {
          id: "d",
          text: "Vyšetření lékařem jen tehdy, pokud byl postižený v bezvědomí",
          spravna: false,
          vysvetleni:
            "Lékař má vyšetřit i postiženého, který působí zdravě. Po úrazu elektrickým proudem hrozí pozdní poruchy srdečního rytmu."
        }
      ],
      shrnuti: "Po úrazu elektrickým proudem vždy k lékaři – i když postižený působí zdravě (pozdní poruchy srdečního rytmu).",
      fakta: ["K5-10"]
    }
  ]
};

export default obsah;
