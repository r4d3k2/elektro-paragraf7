// Kapitola 4 – Bezpečná práce na elektrických zařízeních.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
// Normu ČSN EN 50110-1 popisujeme vlastními slovy, nikdy doslovně.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k4-bezpecna-prace" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "norma", nazev: "Rozsah normy a pracovní postupy" },
    { id: "pravidla", nazev: "Pět pravidel práce bez napětí" },
    { id: "pasma", nazev: "Pásma kolem živých částí" },
    { id: "ukonceni", nazev: "Ukončení práce a opětovné zapnutí" },
    { id: "obsluha", nazev: "Obsluha a pomůcky" }
  ],

  lekce: [
    {
      id: "k4-l01",
      podtema: "norma",
      nadpis: "Norma ČSN EN 50110-1",
      text: md(
        "Pravidla bezpečné práce shrnuje norma **ČSN EN 50110-1 – Obsluha a práce na elektrických zařízeních**. Platí:",
        "- pro **obsluhu a všechny práce** na elektrických zařízeních, s nimi a v jejich blízkosti,",
        "- na zařízeních od **malého až po vysoké napětí**,",
        "- i pro **neelektrické práce** v blízkosti venkovních vedení a kabelů, pokud hrozí elektrické nebezpečí.",
        "",
        "Norma se tedy netýká jen elektrikářů. Řídí se jí i ten, kdo s elektřinou nepracuje, ale pracuje v blízkosti vedení nebo kabelů s hrozícím elektrickým nebezpečím.",
        "",
        "Aktuální evropské vydání je **EN 50110-1:2023**. Je to třetí vydání, nahradilo vydání z roku 2013 a změny proti němu jsou malé. Označení českého vydání je potřeba ověřit."
      ),
      fakta: ["K4-01", "K4-14"]
    },
    {
      id: "k4-l02",
      podtema: "norma",
      nadpis: "Tři pracovní postupy",
      text: md(
        "Norma rozlišuje tři pracovní postupy:",
        "- **práce bez napětí**,",
        "- **práce v blízkosti živých částí**,",
        "- **práce pod napětím**.",
        "",
        "**Upřednostňuje se práce bez napětí.** Práce pod napětím se používá tam, kde vypnutí není rozumně možné. Smějí ji vykonávat jen osoby k tomu **zvlášť vyškolené**, s vhodným izolovaným nářadím a ochrannými prostředky a podle stanovených postupů.",
        "",
        "Nepleťte si pracovní postupy normy se způsoby zajištění práce podle NV č. 190/2022 Sb. (podle pokynů, s dohledem, pod dozorem). Pracovní postup se týká stavu zařízení a živých částí, způsob zajištění toho, jak práci řídí a kontroluje osoba znalá."
      ),
      fakta: ["K4-02", "K4-10", "K3-01", "K3-02", "K3-03"]
    },
    {
      id: "k4-l03",
      podtema: "pravidla",
      nadpis: "Pět pravidel práce bez napětí",
      text: md(
        "Práce bez napětí stojí na **pěti základních pravidlech**, která se provádějí v tomto pořadí:",
        "- **1. Vypnutí** – odpojení ve všech pólech,",
        "- **2. Zajištění proti opětovnému zapnutí**,",
        "- **3. Ověření beznapěťového stavu**,",
        "- **4. Uzemnění a zkratování**,",
        "- **5. Ochrana před sousedními živými částmi**.",
        "",
        "Pořadí má logiku. Nejdřív se zařízení odpojí a zajistí, potom se ověří, že je opravdu bez napětí, a teprve ověřené části se uzemní a zkratují. Nakonec se ochrání to, co v sousedství zůstalo pod napětím.",
        "",
        "Projděte si jednotlivé kroky v ilustraci."
      ),
      ilustrace: "pet-pravidel",
      fakta: ["K4-03"]
    },
    {
      id: "k4-l04",
      podtema: "pravidla",
      nadpis: "Vypnutí a zajištění",
      text: md(
        "**Vypnutí** znamená odpojení **ve všech pólech**. Rozpojit jen některé vodiče nestačí.",
        "",
        "**Zajištění proti opětovnému zapnutí** brání tomu, aby odpojené zařízení během práce někdo znovu zapnul. U nízkého napětí lze zařízení zajistit například tak, že se **vyjmou pojistky** a na jejich místo se **vloží blokovací prvky**.",
        "",
        "Oba kroky jsou úkony pro zajištění pracoviště, a tedy prací na vyhrazeném elektrickém zařízení. Smí je provádět jen odborně způsobilá osoba a pro práci se stanoví vedoucí práce, který ji řádně zajistí."
      ),
      fakta: ["K4-03", "K4-06", "K3-13", "K3-11", "K3-09"]
    },
    {
      id: "k4-l05",
      podtema: "pravidla",
      nadpis: "Ověření, uzemnění a sousední části",
      text: md(
        "**Ověření beznapěťového stavu** se provádí vhodnou **zkoušečkou** nebo měřicím přístrojem, a to **ve všech pólech**. Správnou funkci zkoušečky je nutné ověřit **před jejím použitím** – ověřuje se tedy i samotný nástroj.",
        "",
        "Při **uzemňování a zkratování** platí pořadí: části se **nejdřív uzemní** a teprve potom **zkratují**. Soupravy musí být **odolné zkratovým proudům**.",
        "",
        "**Sousední živé části** jsou části v pásmu práce v blízkosti. Nelze-li je odpojit, chrání se **izolačními kryty** nebo **zakrývacím materiálem** proti náhodnému dotyku."
      ),
      fakta: ["K4-04", "K4-05", "K4-07"]
    },
    {
      id: "k4-l06",
      podtema: "pasma",
      nadpis: "Pásma kolem živé části",
      text: md(
        "Kolem holé živé části norma vymezuje dvě pásma:",
        "- **pásmo práce pod napětím** – od živé části po vzdálenost **DL**,",
        "- **pásmo práce v blízkosti** – od DL po vzdálenost **DV**.",
        "",
        "Za vzdáleností DV už nejde o žádné z těchto pásem.",
        "",
        "Pro **nízké napětí do 1 kV** se uvádí DL jako **„bez dotyku“** a DV přibližně **0,3 m**. Hodnoty je potřeba ověřit v tabulce normy.",
        "",
        "Pásma navazují na pracovní postupy. V pásmu práce pod napětím jde o práci pod napětím, kterou smějí jen zvlášť vyškolené osoby. V pásmu práce v blízkosti se sousední živé části, které nejde odpojit, chrání izolačními kryty nebo zakrývacím materiálem. Vzdálenost si vyzkoušejte posuvníkem v ilustraci."
      ),
      ilustrace: "zony-prace",
      fakta: ["K4-08", "K4-09", "K4-10", "K4-07"]
    },
    {
      id: "k4-l07",
      podtema: "ukonceni",
      nadpis: "Ukončení práce a opětovné zapnutí",
      text: md(
        "Po skončení práce se zařízení smí znovu uvést pod napětí, až když:",
        "- jsou **odstraněny uzemňovací a zkratovací soupravy**,",
        "- **všechny osoby odešly** z místa práce,",
        "- ukončení práce bylo **ohlášeno osobě, která pracoviště předala**.",
        "",
        "Platit musí všechny tři podmínky. Nestačí tedy, že je souprava odstraněná – dokud někdo zůstává na místě práce, zapnout se nesmí.",
        "",
        "I odstranění souprav a další úkony pro **odjištění pracoviště** jsou prací na vyhrazeném elektrickém zařízení. Smí je proto provádět jen odborně způsobilá osoba."
      ),
      fakta: ["K4-11", "K3-13", "K3-11"]
    },
    {
      id: "k4-l08",
      podtema: "obsluha",
      nadpis: "Obsluha",
      text: md(
        "**Obsluhou** elektrického zařízení se rozumí:",
        "- spínání a regulování,",
        "- odečítání údajů trvale namontovaných přístrojů,",
        "- výměna závitových a přístrojových pojistek a žárovek,",
        "- prohlídka elektrického zařízení.",
        "",
        "Vymezení pochází z výukového materiálu k ČSN EN 50110-1; znění v aktuální normě je dobré ověřit.",
        "",
        "Obsluha zařízení **malého a nízkého napětí** se nepovažuje za činnost, která vyžaduje odbornou způsobilost podle NV č. 194/2022 Sb. Osoba poučená smí samostatně obsluhovat zařízení **bez omezení napětí** a dotýká se přitom jen částí určených k obsluze. Výměna jističe nebo montáž zásuvky do vymezení obsluhy nepatří – jsou prací na zařízení."
      ),
      fakta: ["K4-13", "K1-20", "K3-04", "K3-13"]
    },
    {
      id: "k4-l09",
      podtema: "obsluha",
      nadpis: "Ochranné a pracovní pomůcky",
      text: md(
        "**Ochranná pomůcka** chrání osobu před nebezpečnými účinky elektřiny nebo před jiným ohrožením. **Pracovní pomůcka** je nástroj nebo předmět, který je potřeba k práci na elektrickém zařízení. Rozdíl je tedy v účelu.",
        "",
        "Pomůcky a prostředky z této kapitoly:",
        "- **zkoušečka** nebo měřicí přístroj k ověření beznapěťového stavu – funkce zkoušečky se ověřuje před použitím,",
        "- **uzemňovací a zkratovací soupravy** odolné zkratovým proudům,",
        "- **izolační kryty** a zakrývací materiál proti náhodnému dotyku sousedních živých částí.",
        "",
        "Na vyhrazeném elektrickém zařízení smí pracovat jen osoba vybavená potřebnými osobními ochrannými pracovními prostředky (OOPP) a seznámená s jejich používáním; o seznámení se pořizuje zápis podepsaný oběma stranami."
      ),
      fakta: ["K4-12", "K4-04", "K4-05", "K4-07", "K3-11"]
    }
  ],

  otazky: [
    // ───────── Rozsah normy a pracovní postupy ─────────
    {
      id: "k4-q01",
      kapitola: K,
      podtema: "norma",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Pro jaký rozsah napětí platí norma ČSN EN 50110-1?",
      moznosti: [
        {
          id: "a",
          text: "Jen pro nízké napětí do 1 kV AC",
          spravna: false,
          vysvetleni:
            "Norma se neomezuje na nízké napětí. Platí pro obsluhu a práce na elektrických zařízeních od malého až po vysoké napětí."
        },
        {
          id: "b",
          text: "Jen pro zařízení vysokého napětí",
          spravna: false,
          vysvetleni:
            "Vysoké napětí je jen část rozsahu. Norma platí pro zařízení od malého až po vysoké napětí."
        },
        {
          id: "c",
          text: "Od malého až po vysoké napětí",
          spravna: true,
          vysvetleni:
            "Správně. ČSN EN 50110-1 platí pro obsluhu a všechny práce na elektrických zařízeních, s nimi a v jejich blízkosti od malého až po vysoké napětí."
        },
        {
          id: "d",
          text: "Pro nízké a vysoké napětí, malé napětí vyjímá",
          spravna: false,
          vysvetleni:
            "Malé napětí norma nevyjímá. Platí pro zařízení od malého až po vysoké napětí."
        }
      ],
      shrnuti: "ČSN EN 50110-1 platí pro obsluhu a práci na zařízeních od malého až po vysoké napětí.",
      fakta: ["K4-01"]
    },
    {
      id: "k4-q02",
      kapitola: K,
      podtema: "norma",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Na stavbě, kde řídíte elektromontáže, mají lešenáři stavět lešení těsně u venkovního vedení. Vztahuje se na jejich práci norma ČSN EN 50110-1?",
      moznosti: [
        {
          id: "a",
          text: "Ano, pokud při ní hrozí elektrické nebezpečí",
          spravna: true,
          vysvetleni:
            "Správně. Norma zahrnuje i neelektrické práce v blízkosti venkovních vedení a kabelů, pokud hrozí elektrické nebezpečí."
        },
        {
          id: "b",
          text: "Ne, norma se týká jen elektrotechnických prací",
          spravna: false,
          vysvetleni:
            "Rozsah normy je širší. Zahrnuje i neelektrické práce v blízkosti venkovních vedení a kabelů, pokud hrozí elektrické nebezpečí."
        },
        {
          id: "c",
          text: "Ne, venkovní vedení norma ze svého rozsahu vyjímá",
          spravna: false,
          vysvetleni:
            "Venkovní vedení norma naopak výslovně zmiňuje: platí i pro neelektrické práce v jejich blízkosti, pokud hrozí elektrické nebezpečí."
        },
        {
          id: "d",
          text: "Jen tehdy, jsou-li lešenáři osobami poučenými",
          spravna: false,
          vysvetleni:
            "Rozsah platnosti normy nezávisí na odborné způsobilosti pracovníků. Rozhoduje, zda jde o práci v blízkosti vedení nebo kabelů s hrozícím elektrickým nebezpečím."
        }
      ],
      shrnuti: "ČSN EN 50110-1 platí i pro neelektrické práce u venkovních vedení a kabelů, pokud hrozí elektrické nebezpečí.",
      fakta: ["K4-01"]
    },
    {
      id: "k4-q03",
      kapitola: K,
      podtema: "norma",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Který pracovní postup norma ČSN EN 50110-1 upřednostňuje?",
      moznosti: [
        {
          id: "a",
          text: "Práci pod napětím s izolovaným nářadím",
          spravna: false,
          vysvetleni:
            "Práce pod napětím se používá tam, kde vypnutí není rozumně možné, a jen se zvlášť vyškolenými osobami. Upřednostňuje se práce bez napětí."
        },
        {
          id: "b",
          text: "Práci v blízkosti živých částí s kryty",
          spravna: false,
          vysvetleni:
            "Práce v blízkosti živých částí je jeden ze tří postupů, upřednostňovaný ale není. Tím je práce bez napětí."
        },
        {
          id: "c",
          text: "Práci podle pokynů osoby znalé",
          spravna: false,
          vysvetleni:
            "Práce podle pokynů je způsob zajištění práce podle NV č. 190/2022 Sb., ne pracovní postup normy. Norma upřednostňuje práci bez napětí."
        },
        {
          id: "d",
          text: "Práci bez napětí",
          spravna: true,
          vysvetleni:
            "Správně. Norma rozlišuje práci bez napětí, práci pod napětím a práci v blízkosti živých částí a upřednostňuje práci bez napětí."
        }
      ],
      shrnuti: "Ze tří pracovních postupů (bez napětí, pod napětím, v blízkosti) se upřednostňuje práce bez napětí.",
      fakta: ["K4-02", "K4-10", "K3-01"]
    },
    {
      id: "k4-q04",
      kapitola: K,
      podtema: "norma",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Provozovatel chce, aby se oprava v rozvaděči dělala bez přerušení dodávky, i když vypnutí lze bez potíží zajistit. Jak rozhodnete jako vedoucí práce?",
      moznosti: [
        {
          id: "a",
          text: "Pod napětím, pokud mají montéři izolované nářadí",
          spravna: false,
          vysvetleni:
            "Izolované nářadí samo nestačí. Práce pod napětím se používá jen tam, kde vypnutí není rozumně možné, a jen se zvlášť vyškolenými osobami podle stanovených postupů."
        },
        {
          id: "b",
          text: "Bez napětí, protože vypnutí je rozumně možné",
          spravna: true,
          vysvetleni:
            "Správně. Norma upřednostňuje práci bez napětí a práci pod napětím vyhrazuje pro případy, kdy vypnutí není rozumně možné. Tady možné je."
        },
        {
          id: "c",
          text: "Pod napětím, pokud to provozovatel písemně požaduje",
          spravna: false,
          vysvetleni:
            "Rozhodující není přání provozovatele, ale to, zda je vypnutí rozumně možné. Když je, upřednostňuje se práce bez napětí."
        },
        {
          id: "d",
          text: "V blízkosti živých částí bez dalších opatření",
          spravna: false,
          vysvetleni:
            "V pásmu práce v blízkosti se sousední živé části, které nejde odpojit, chrání izolačními kryty nebo zakrývacím materiálem. A když vypnutí jde zajistit, upřednostňuje se práce bez napětí."
        }
      ],
      shrnuti: "Jde-li zařízení rozumně vypnout, pracuje se bez napětí; práce pod napětím je pro případy, kdy to možné není.",
      fakta: ["K4-02", "K4-10", "K4-07"]
    },

    // ───────── Pět pravidel práce bez napětí ─────────
    {
      id: "k4-q05",
      kapitola: K,
      podtema: "pravidla",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Které z pěti pravidel práce bez napětí je v pořadí třetí?",
      moznosti: [
        {
          id: "a",
          text: "Zajištění proti opětovnému zapnutí",
          spravna: false,
          vysvetleni:
            "Zajištění proti opětovnému zapnutí je druhé pravidlo, hned po vypnutí. Třetí je ověření beznapěťového stavu."
        },
        {
          id: "b",
          text: "Uzemnění a zkratování",
          spravna: false,
          vysvetleni:
            "Uzemnění a zkratování je čtvrté pravidlo. Provádí se až po ověření beznapěťového stavu, které je třetí."
        },
        {
          id: "c",
          text: "Ověření beznapěťového stavu",
          spravna: true,
          vysvetleni:
            "Správně. Pořadí je: vypnutí, zajištění proti opětovnému zapnutí, ověření beznapěťového stavu, uzemnění a zkratování, ochrana před sousedními živými částmi."
        },
        {
          id: "d",
          text: "Ochrana před sousedními živými částmi",
          spravna: false,
          vysvetleni:
            "Ochrana před sousedními živými částmi je páté, poslední pravidlo. Třetí je ověření beznapěťového stavu."
        }
      ],
      shrnuti: "Vypnout – zajistit – ověřit – uzemnit a zkratovat – ochránit před sousedními živými částmi.",
      fakta: ["K4-03"]
    },
    {
      id: "k4-q06",
      kapitola: K,
      podtema: "pravidla",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak se ověřuje beznapěťový stav?",
      moznosti: [
        {
          id: "a",
          text: "Vhodnou zkoušečkou nebo měřicím přístrojem ve všech pólech",
          spravna: true,
          vysvetleni:
            "Správně. Beznapěťový stav se ověřuje vhodnou zkoušečkou nebo měřicím přístrojem ve všech pólech; funkce zkoušečky se ověří před jejím použitím."
        },
        {
          id: "b",
          text: "Pohledem na rozpojený odpojovač nebo vyjmuté pojistky",
          spravna: false,
          vysvetleni:
            "Rozpojený odpojovač nebo vyjmuté pojistky patří k vypnutí a zajištění. Beznapěťový stav se pak samostatně ověřuje zkoušečkou nebo měřicím přístrojem ve všech pólech."
        },
        {
          id: "c",
          text: "Zkoušečkou na jednom pólu, který byl vypnut jako první",
          spravna: false,
          vysvetleni:
            "Jeden pól nestačí. Ověřuje se ve všech pólech, a to vhodnou zkoušečkou nebo měřicím přístrojem."
        },
        {
          id: "d",
          text: "Podle zhasnuté signálky na dveřích rozvaděče",
          spravna: false,
          vysvetleni:
            "Signálka není zkoušečka ani měřicí přístroj použitý na místě práce. Beznapěťový stav se ověřuje vhodnou zkoušečkou nebo měřicím přístrojem ve všech pólech."
        }
      ],
      shrnuti: "Beznapěťový stav: vhodná zkoušečka nebo měřicí přístroj, všechny póly.",
      fakta: ["K4-04", "K4-03"]
    },
    {
      id: "k4-q07",
      kapitola: K,
      podtema: "pravidla",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Montér přinese zkoušečku z auta a hned s ní začne ověřovat beznapěťový stav vypnutého vývodu. Na co ho upozorníte?",
      moznosti: [
        {
          id: "a",
          text: "Zkoušečku smí k ověření použít jen revizní technik",
          spravna: false,
          vysvetleni:
            "Revizní technik provádí revize (§ 17 zákona č. 250/2021 Sb.). Ověření beznapěťového stavu patří k pěti pravidlům práce bez napětí; montér jen musí funkci zkoušečky nejdřív ověřit."
        },
        {
          id: "b",
          text: "Stačí ověřit jeden pól, ostatní se vypnuly s ním",
          spravna: false,
          vysvetleni:
            "Beznapěťový stav se ověřuje ve všech pólech. Předtím je navíc nutné ověřit funkci samotné zkoušečky."
        },
        {
          id: "c",
          text: "Vývod musí nejdřív uzemnit a zkratovat, pak ověřovat",
          spravna: false,
          vysvetleni:
            "Pořadí je opačné: ověření beznapěťového stavu je třetí pravidlo, uzemnění a zkratování čtvrté."
        },
        {
          id: "d",
          text: "Funkci zkoušečky musí ověřit ještě před jejím použitím",
          spravna: true,
          vysvetleni:
            "Správně. Správná funkce zkoušečky se ověřuje před jejím použitím; teprve pak se jí ověřuje beznapěťový stav ve všech pólech."
        }
      ],
      shrnuti: "Před ověřením beznapěťového stavu nejdřív ověřit funkci zkoušečky.",
      fakta: ["K4-04", "K4-03", "K2-09"]
    },
    {
      id: "k4-q08",
      kapitola: K,
      podtema: "pravidla",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jak lze u zařízení nízkého napětí provést zajištění proti opětovnému zapnutí?",
      moznosti: [
        {
          id: "a",
          text: "Ústně požádat obsluhu, aby zařízení nezapínala",
          spravna: false,
          vysvetleni:
            "Ústní žádost zapnutí nezabrání. U nízkého napětí lze zajistit například vyjmutím pojistek a vložením blokovacích prvků místo nich."
        },
        {
          id: "b",
          text: "Vyjmout pojistky a vložit místo nich blokovací prvky",
          spravna: true,
          vysvetleni:
            "Správně. Zajištění proti opětovnému zapnutí lze u nízkého napětí provést například vyjmutím pojistek a vložením blokovacích prvků na jejich místo."
        },
        {
          id: "c",
          text: "Vypnout jistič a ponechat rozvaděč otevřený",
          spravna: false,
          vysvetleni:
            "Samotné vypnutí je první pravidlo, zajištění je samostatný druhý krok. U nízkého napětí lze zajistit například vyjmutím pojistek a vložením blokovacích prvků."
        },
        {
          id: "d",
          text: "Zapsat vypnutí do provozního deníku",
          spravna: false,
          vysvetleni:
            "Zápis zapnutí nezabrání. Zajištění proti opětovnému zapnutí lze u nízkého napětí provést například vyjmutím pojistek a vložením blokovacích prvků."
        }
      ],
      shrnuti: "Zajištění u nízkého napětí: například vyjmout pojistky a vložit místo nich blokovací prvky.",
      fakta: ["K4-06", "K4-03"]
    },
    {
      id: "k4-q09",
      kapitola: K,
      podtema: "pravidla",
      typ: "vyber",
      obtiznost: 2,
      zadani: "V jakém pořadí se při čtvrtém pravidle uzemňuje a zkratuje?",
      moznosti: [
        {
          id: "a",
          text: "Nejdřív se uzemní, potom zkratuje",
          spravna: true,
          vysvetleni:
            "Správně. Části se nejdřív uzemní a teprve potom zkratují; uzemňovací a zkratovací soupravy musí být odolné zkratovým proudům."
        },
        {
          id: "b",
          text: "Nejdřív se zkratuje, potom uzemní",
          spravna: false,
          vysvetleni:
            "Pořadí je opačné. Části se nejdřív uzemní a teprve potom zkratují."
        },
        {
          id: "c",
          text: "Současně, na pořadí nezáleží",
          spravna: false,
          vysvetleni:
            "Na pořadí záleží: části se nejdřív uzemní a teprve potom zkratují."
        },
        {
          id: "d",
          text: "Zkratuje se hned, uzemní až po skončení práce",
          spravna: false,
          vysvetleni:
            "Uzemnění není krok po skončení práce. Při čtvrtém pravidle se části nejdřív uzemní a teprve potom zkratují."
        }
      ],
      shrnuti: "Čtvrté pravidlo: nejdřív uzemnit, potom zkratovat – soupravami odolnými zkratovým proudům.",
      fakta: ["K4-05", "K4-03"]
    },
    {
      id: "k4-q10",
      kapitola: K,
      podtema: "pravidla",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V rozvaděči nízkého napětí jste vypnuli, zajistili a ověřili vývod, na kterém se bude pracovat. Vedle zůstává přípojnice pod napětím, kterou nejde odpojit. Co uděláte podle pátého pravidla?",
      moznosti: [
        {
          id: "a",
          text: "Uzemníte ji a zkratujete spolu s vypnutým vývodem",
          spravna: false,
          vysvetleni:
            "Uzemňují a zkratují se části, u kterých byl ověřen beznapěťový stav. Přípojnice pod napětím mezi ně nepatří; chrání se izolačním krytem nebo zakrývacím materiálem."
        },
        {
          id: "b",
          text: "Pracovníky jen upozorníte, aby se jí nedotýkali",
          spravna: false,
          vysvetleni:
            "Upozornění nestačí. Sousední živé části, které nejde odpojit, se chrání izolačními kryty nebo zakrývacím materiálem proti náhodnému dotyku."
        },
        {
          id: "c",
          text: "Zakryjete ji izolačním krytem nebo zakrývacím materiálem",
          spravna: true,
          vysvetleni:
            "Správně. Sousední živé části v pásmu práce v blízkosti, které nejde odpojit, se chrání izolačními kryty nebo zakrývacím materiálem proti náhodnému dotyku."
        },
        {
          id: "d",
          text: "Práci na vývodu převedete na práci pod napětím",
          spravna: false,
          vysvetleni:
            "Vývod je bez napětí a práce na něm zůstává prací bez napětí. Sousední živé části řeší páté pravidlo: izolační kryty nebo zakrývací materiál."
        }
      ],
      shrnuti: "Sousední živé části, které nejde odpojit, se zakryjí izolačními kryty nebo zakrývacím materiálem.",
      fakta: ["K4-07", "K4-03", "K4-05"]
    },

    // ───────── Pásma kolem živých částí ─────────
    {
      id: "k4-q11",
      kapitola: K,
      podtema: "pasma",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak se nazývá pásmo, které leží mezi vzdálenostmi DL a DV od holé živé části?",
      moznosti: [
        {
          id: "a",
          text: "Pásmo práce pod napětím",
          spravna: false,
          vysvetleni:
            "Pásmo práce pod napětím sahá od holé živé části po vzdálenost DL. Mezi DL a DV leží pásmo práce v blízkosti."
        },
        {
          id: "b",
          text: "Pásmo práce v blízkosti",
          spravna: true,
          vysvetleni:
            "Správně. Od holé živé části po DL sahá pásmo práce pod napětím, od DL po DV pásmo práce v blízkosti."
        },
        {
          id: "c",
          text: "Pásmo obsluhy",
          spravna: false,
          vysvetleni:
            "Kolem živé části se rozlišuje pásmo práce pod napětím (do DL) a pásmo práce v blízkosti (od DL do DV). Mezi DL a DV je tedy pásmo práce v blízkosti."
        },
        {
          id: "d",
          text: "Pásmo bezpečné vzdálenosti",
          spravna: false,
          vysvetleni:
            "Kolem holé živé části norma rozlišuje jen dvě pásma: pásmo práce pod napětím do DL a pásmo práce v blízkosti od DL do DV."
        }
      ],
      shrnuti: "Do DL pásmo práce pod napětím, od DL do DV pásmo práce v blízkosti.",
      fakta: ["K4-08"]
    },
    {
      id: "k4-q12",
      kapitola: K,
      podtema: "pasma",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jaká vzdálenost DV se uvádí pro nízké napětí do 1 kV?",
      moznosti: [
        {
          id: "a",
          text: "Přibližně 1 m",
          spravna: false,
          vysvetleni:
            "Pro nízké napětí do 1 kV se uvádí DV přibližně 0,3 m (tabulka v příloze A ČSN EN 50110-1). Hodnotu je potřeba ověřit v normě."
        },
        {
          id: "b",
          text: "Přibližně 0,1 m",
          spravna: false,
          vysvetleni:
            "Uváděná hodnota DV pro nízké napětí je větší, přibližně 0,3 m. DL se pro nízké napětí uvádí jako „bez dotyku“."
        },
        {
          id: "c",
          text: "Přibližně 0,5 m",
          spravna: false,
          vysvetleni:
            "Pro nízké napětí do 1 kV se uvádí DV přibližně 0,3 m, ne 0,5 m. Údaj je třeba ověřit v aktuální normě."
        },
        {
          id: "d",
          text: "Přibližně 0,3 m",
          spravna: true,
          vysvetleni:
            "Správně. Pro nízké napětí do 1 kV se uvádí DV přibližně 0,3 m a DL jako „bez dotyku“. Údaj je třeba ověřit v aktuální normě."
        }
      ],
      shrnuti: "Nízké napětí do 1 kV: DL „bez dotyku“, DV přibližně 0,3 m (ověřit v normě).",
      fakta: ["K4-09", "K4-08"]
    },
    {
      id: "k4-q13",
      kapitola: K,
      podtema: "pasma",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Montér utahuje svorku na vypnutém vývodu. Ruka s klíčem se přitom dostane asi 20 cm od nekryté živé přípojnice nízkého napětí. V jakém pásmu pracuje?",
      moznosti: [
        {
          id: "a",
          text: "V pásmu práce v blízkosti – je mezi DL a DV",
          spravna: true,
          vysvetleni:
            "Správně. Pro nízké napětí se DL uvádí jako „bez dotyku“ a DV přibližně 0,3 m. Vzdálenost 20 cm leží mezi nimi, tedy v pásmu práce v blízkosti."
        },
        {
          id: "b",
          text: "V pásmu práce pod napětím – je blíž než 0,3 m",
          spravna: false,
          vysvetleni:
            "Pásmo práce pod napětím sahá jen po DL, které se pro nízké napětí uvádí jako „bez dotyku“. Do 0,3 m (DV) sahá pásmo práce v blízkosti."
        },
        {
          id: "c",
          text: "Mimo obě pásma – přípojnice se nedotýká",
          spravna: false,
          vysvetleni:
            "Pásmo práce v blízkosti končí až ve vzdálenosti DV, pro nízké napětí přibližně 0,3 m. Ve 20 cm je montér uvnitř tohoto pásma."
        },
        {
          id: "d",
          text: "V pásmu práce pod napětím – drží kovový nástroj",
          spravna: false,
          vysvetleni:
            "Pásma se vymezují vzdáleností od holé živé části (DL a DV). Ve vzdálenosti 20 cm jde o pásmo práce v blízkosti."
        }
      ],
      shrnuti: "U nízkého napětí je 20 cm od holé živé části v pásmu práce v blízkosti (DL „bez dotyku“, DV asi 0,3 m).",
      fakta: ["K4-08", "K4-09"]
    },

    // ───────── Ukončení práce a opětovné zapnutí ─────────
    {
      id: "k4-q14",
      kapitola: K,
      podtema: "ukonceni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Komu se ohlašuje ukončení práce, než se zařízení znovu uvede pod napětí?",
      moznosti: [
        {
          id: "a",
          text: "Revizní technikovi, který zařízení naposledy revidoval",
          spravna: false,
          vysvetleni:
            "Revizní technik provádí revize, ukončení práce se ohlašuje jinému. Hlásí se osobě, která pracoviště předala."
        },
        {
          id: "b",
          text: "Oblastnímu inspektorátu práce",
          spravna: false,
          vysvetleni:
            "Oblastnímu inspektorátu práce provozovatel ohlašuje havárii se škodou zjevně přesahující 5 000 000 Kč (§ 22 zákona č. 250/2021 Sb.). Ukončení práce se hlásí osobě, která pracoviště předala."
        },
        {
          id: "c",
          text: "Osobě, která pracoviště předala",
          spravna: true,
          vysvetleni:
            "Správně. Zařízení se znovu uvede pod napětí až po odstranění uzemňovacích a zkratovacích souprav, odchodu všech osob z místa práce a ohlášení ukončení práce osobě, která pracoviště předala."
        },
        {
          id: "d",
          text: "Nikomu, stačí odchod všech osob z místa práce",
          spravna: false,
          vysvetleni:
            "Odchod všech osob je jen jedna z podmínek. Zařízení se znovu zapíná až po odstranění souprav, odchodu osob a ohlášení ukončení práce osobě, která pracoviště předala."
        }
      ],
      shrnuti: "Ukončení práce se ohlašuje osobě, která pracoviště předala.",
      fakta: ["K4-11", "K2-26"]
    },
    {
      id: "k4-q15",
      kapitola: K,
      podtema: "ukonceni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Pracoviště montérům předáváte vy. Teď vám hlásí ukončení práce a uzemňovací a zkratovací souprava je odstraněná. Jeden montér ale ještě v rozvaděči dotahuje kryt. Smíte zařízení znovu uvést pod napětí?",
      moznosti: [
        {
          id: "a",
          text: "Ano, souprava je odstraněna a práce ohlášena",
          spravna: false,
          vysvetleni:
            "Chybí třetí podmínka: všechny osoby musí odejít z místa práce. Dokud je montér v rozvaděči, zařízení se pod napětí uvést nesmí."
        },
        {
          id: "b",
          text: "Ne, nejdřív musí všechny osoby odejít z místa práce",
          spravna: true,
          vysvetleni:
            "Správně. Zařízení se znovu uvede pod napětí až po odstranění uzemňovacích a zkratovacích souprav, odchodu všech osob z místa práce a ohlášení ukončení práce osobě, která pracoviště předala."
        },
        {
          id: "c",
          text: "Ano, pokud montér použije ochranné pomůcky",
          spravna: false,
          vysvetleni:
            "Ochranné pomůcky podmínku nenahrazují. Před uvedením pod napětí musí všechny osoby odejít z místa práce."
        },
        {
          id: "d",
          text: "Ne, nejdřív musí proběhnout revize zařízení",
          spravna: false,
          vysvetleni:
            "Revize se po opravě provádí podle potřeby (§ 6 odst. 2 NV č. 190/2022 Sb.), podmínkou opětovného zapnutí po každé práci není. Teď zapnutí brání to, že na místě práce ještě někdo je."
        }
      ],
      shrnuti: "Zapnout až po odstranění souprav, odchodu všech osob a ohlášení – musí platit všechny tři podmínky.",
      fakta: ["K4-11", "K2-11"]
    },

    // ───────── Obsluha a pomůcky ─────────
    {
      id: "k4-q16",
      kapitola: K,
      podtema: "obsluha",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Která z těchto činností patří podle vymezení k obsluze elektrického zařízení?",
      moznosti: [
        {
          id: "a",
          text: "Výměna vadného jističe v rozvodnici",
          spravna: false,
          vysvetleni:
            "Vymezení obsluhy zahrnuje výměnu závitových a přístrojových pojistek a žárovek, ne výměnu jističe. Ta je prací na zařízení (demontáž a montáž)."
        },
        {
          id: "b",
          text: "Montáž nové zásuvky v dílně",
          spravna: false,
          vysvetleni:
            "Montáž je práce na vyhrazeném elektrickém zařízení (§ 2 písm. b) NV č. 190/2022 Sb.), ne obsluha. K obsluze patří například výměna pojistek a žárovek."
        },
        {
          id: "c",
          text: "Měření izolačního odporu obvodu",
          spravna: false,
          vysvetleni:
            "Měření je práce na vyhrazeném elektrickém zařízení. K obsluze patří spínání, regulování, odečítání údajů trvale namontovaných přístrojů, výměna pojistek a žárovek a prohlídka."
        },
        {
          id: "d",
          text: "Výměna závitových pojistek a žárovek",
          spravna: true,
          vysvetleni:
            "Správně. Obsluhou se rozumí spínání, regulování, odečítání údajů trvale namontovaných přístrojů, výměna závitových a přístrojových pojistek a žárovek a prohlídka elektrického zařízení."
        }
      ],
      shrnuti: "Obsluha: spínání, regulování, odečítání údajů, výměna pojistek a žárovek, prohlídka – výměna jističe ani montáž k ní nepatří.",
      fakta: ["K4-13", "K3-13"]
    },
    {
      id: "k4-q17",
      kapitola: K,
      podtema: "obsluha",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jaký je rozdíl mezi ochrannou a pracovní pomůckou?",
      moznosti: [
        {
          id: "a",
          text: "Ochranná chrání osobu před nebezpečím, pracovní slouží k práci",
          spravna: true,
          vysvetleni:
            "Správně. Ochranná pomůcka chrání osobu před nebezpečnými účinky elektřiny nebo před jiným ohrožením; pracovní pomůcka je nástroj nebo předmět potřebný k práci na elektrickém zařízení."
        },
        {
          id: "b",
          text: "Ochranná chrání zařízení před poškozením, pracovní chrání osobu",
          spravna: false,
          vysvetleni:
            "Je to jinak: ochranná pomůcka chrání osobu před nebezpečnými účinky elektřiny nebo jiným ohrožením, pracovní pomůcka je nástroj nebo předmět potřebný k práci."
        },
        {
          id: "c",
          text: "Ochranná se používá jen pod napětím, pracovní jen bez napětí",
          spravna: false,
          vysvetleni:
            "Rozdíl není v tom, zda je zařízení pod napětím. Ochranná pomůcka chrání osobu, pracovní je nástroj nebo předmět potřebný k práci."
        },
        {
          id: "d",
          text: "Ochrannou smí používat jen osoba znalá, pracovní kdokoli",
          spravna: false,
          vysvetleni:
            "Rozdíl je v účelu, ne v tom, kdo pomůcku používá: ochranná chrání osobu před nebezpečnými účinky elektřiny nebo jiným ohrožením, pracovní slouží k práci."
        }
      ],
      shrnuti: "Ochranná pomůcka chrání osobu, pracovní pomůcka slouží k provedení práce.",
      fakta: ["K4-12"]
    },
    {
      id: "k4-q18",
      kapitola: K,
      podtema: "obsluha",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Řídíte provoz dílny. Skladník, osoba poučená, má v rozvaděči jen zapínat a vypínat jističe. Hlásí, že k jističům se dostane jen přes odklopený kryt, za kterým jsou holé svorky. Co mu řeknete?",
      moznosti: [
        {
          id: "a",
          text: "Kryt smí sejmout, protože jde jen o obsluhu",
          spravna: false,
          vysvetleni:
            "I při obsluze se osoba poučená smí dotýkat jen částí určených k obsluze. Holé svorky za krytem mezi ně nepatří."
        },
        {
          id: "b",
          text: "Může pokračovat, obsluha nevyžaduje odbornou způsobilost",
          spravna: false,
          vysvetleni:
            "Obsluha zařízení malého a nízkého napětí sice nevyžaduje odbornou způsobilost podle NV č. 194/2022 Sb., osoba poučená se ale i tak smí dotýkat jen částí určených k obsluze."
        },
        {
          id: "c",
          text: "Při obsluze se smí dotýkat jen částí určených k obsluze",
          spravna: true,
          vysvetleni:
            "Správně. Osoba poučená smí samostatně obsluhovat, dotýká se přitom ale jen částí určených k obsluze (§ 4 odst. 4 písm. a) NV č. 194/2022 Sb.). Holé svorky k nim nepatří."
        },
        {
          id: "d",
          text: "Může pokračovat, pokud si vezme ochrannou pomůcku",
          spravna: false,
          vysvetleni:
            "Ochranná pomůcka nemění, čeho se smí osoba poučená při obsluze dotýkat: jen částí určených k obsluze."
        }
      ],
      shrnuti: "Při obsluze se osoba poučená dotýká jen částí určených k obsluze – i když obsluha jinak odbornou způsobilost nevyžaduje.",
      fakta: ["K3-04", "K4-13", "K1-20", "K4-12"]
    }
  ]
};

export default obsah;
