// Kapitola 6 – Ochrana před úrazem elektrickým proudem.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
// Normy ČSN 33 2000-4-41 ed. 3 a ČSN EN 61140 popisujeme vlastními slovy, nikdy doslovně.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k6-ochrana" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "princip", nazev: "Princip ochranných opatření" },
    { id: "odpojeni", nazev: "Automatické odpojení a doby odpojení" },
    { id: "chranic", nazev: "Proudový chránič" },
    { id: "dalsi", nazev: "Další opatření: dvojitá izolace, SELV a PELV, elektrické oddělení" },
    { id: "tridy", nazev: "Třídy ochrany předmětů" }
  ],

  lekce: [
    {
      id: "k6-l01",
      podtema: "princip",
      nadpis: "Ochranné opatření a doplňková ochrana",
      text: md(
        "Ochrana před úrazem elektrickým proudem se skládá z **ochranných opatření**. Každé ochranné opatření má dvě části:",
        "- **základní ochranu** – ochranu před dotykem živých částí,",
        "- **ochranu při poruše**.",
        "",
        "K nim se může přidat **doplňková ochrana**: proudový chránič s jmenovitým reziduálním proudem (IΔn) nejvýše **30 mA** a doplňující ochranné pospojování.",
        "",
        "Na pořadí záleží. Proudový chránič 30 mA se **nepovažuje za jediné ochranné opatření**. Doplňuje základní ochranu a ochranu při poruše, nenahrazuje je.",
        "",
        "Rozdělení pochází z ČSN 33 2000-4-41 ed. 3; přesné znění je potřeba ověřit v aktuální normě."
      ),
      fakta: ["K6-01", "K6-08"]
    },
    {
      id: "k6-l02",
      podtema: "odpojeni",
      nadpis: "Doby automatického odpojení",
      text: md(
        "Při poruše musí ochranný prvek obvod **automaticky odpojit**, a to v předepsané době. Norma stanoví nejdelší doby odpojení.",
        "",
        "**Koncové obvody** při napětí proti zemi 230 V:",
        "- síť **TN**: nejvýše **0,4 s**,",
        "- síť **TT**: nejvýše **0,2 s**.",
        "",
        "**Distribuční obvody**:",
        "- síť **TN**: nejvýše **5 s**,",
        "- síť **TT**: nejvýše **1 s**.",
        "",
        "Síť TT má v obou případech kratší, tedy přísnější limit než síť TN. Pro které koncové obvody (do jakého jmenovitého proudu) tabulka platí, je potřeba ověřit v aktuálním znění normy. Co písmena TN a TT znamenají, vysvětluje kapitola 7."
      ),
      fakta: ["K6-02", "K6-03"]
    },
    {
      id: "k6-l03",
      podtema: "chranic",
      nadpis: "Jak funguje proudový chránič",
      text: md(
        "**Proudový chránič (RCD)** porovnává **součtovým transformátorem** proudy v pracovních vodičích obvodu. Co do obvodu teče fázovým vodičem, má se vracet středním vodičem.",
        "",
        "Když část proudu **odtéká mimo chránič** – například přes **tělo člověka** nebo přes **ochranný vodič (PE)** – proudy v pracovních vodičích se liší a chránič vybaví.",
        "",
        "Doplňkové chrániče mají IΔn **30 mA**. Proč právě tolik: proudy asi 10 až 30 mA zpravidla nezpůsobí smrt, při delším působení jsou ale nebezpečné. Proudy nad 30 mA mohou být smrtelné, pokud nedojde k rychlému odpojení.",
        "",
        "V ilustraci nastavte unikající proud a sledujte, kdy chránič vybaví."
      ),
      ilustrace: "proudovy-chranic",
      fakta: ["K6-07", "K5-09"]
    },
    {
      id: "k6-l04",
      podtema: "chranic",
      nadpis: "Kde chránič musí být a kde nesmí",
      text: md(
        "Harmonizační dokument **HD 60364-4-41:2017** rozšířil povinnou doplňkovou ochranu chráničem s IΔn nejvýše 30 mA:",
        "- na **zásuvkové obvody do 32 A**,",
        "- nově i na **světelné obvody v bytech** (tento údaj je potřeba ověřit).",
        "",
        "Česká ČSN 33 2000-4-41 ed. 3 dokument přejímá; přesné znění článku ověřte v normě.",
        "",
        "Jsou ale sítě, kde se chránič použít **nesmí**:",
        "- v síti **TN-C** se proudový chránič nesmí použít vůbec,",
        "- v síti **TN-C-S** se na straně zátěže za chráničem nesmí použít **vodič PEN** (spojený ochranný a střední vodič).",
        "",
        "I tam, kde je chránič povinný, zůstává doplňkovou ochranou – ochranu při poruše nenahrazuje."
      ),
      fakta: ["K6-04", "K6-05", "K6-06", "K6-08"]
    },
    {
      id: "k6-l05",
      podtema: "dalsi",
      nadpis: "Malé napětí SELV a PELV",
      text: md(
        "**SELV** a **PELV** jsou obvody **malého napětí**: nejvýše **50 V** střídavého nebo **120 V** stejnosměrného napětí bez zvlnění.",
        "",
        "Liší se vztahem k zemi:",
        "- obvody **SELV nejsou spojeny se zemí**,",
        "- obvody **PELV uzemněny být mohou**.",
        "",
        "Napětí tedy o druhu obvodu nerozhodne. Uzemněný obvod 24 V je PELV, neuzemněný SELV.",
        "",
        "Malým napětím SELV nebo PELV se napájejí předměty **třídy ochrany III**. Při revizi se ochrana oddělením obvodů a SELV/PELV zkouší jako třetí v pořadí, po spojitosti ochranných vodičů a izolačním stavu.",
        "",
        "Hodnoty z ČSN 33 2000-4-41 ed. 3 je potřeba ověřit v aktuálním znění normy."
      ),
      fakta: ["K6-10", "K6-09", "K9-01"]
    },
    {
      id: "k6-l06",
      podtema: "dalsi",
      nadpis: "Elektrické oddělení a dvojitá izolace",
      text: md(
        "**Ochrana elektrickým oddělením** napájí obvod z **oddělovacího zdroje** – oddělovacího transformátoru. Obvykle se z něj napájí jen **jeden spotřebič**.",
        "",
        "Dalším opatřením je **dvojitá nebo zesílená izolace**. Předmět s ní patří do **třídy ochrany II** a **nemá ochranný vodič**. Poznáte ho podle značky **dvou soustředných čtverců**.",
        "",
        "Opatření si nepleťte:",
        "- elektrické oddělení – oddělovací zdroj, obvykle jeden spotřebič,",
        "- dvojitá izolace – třída II, bez ochranného vodiče,",
        "- SELV a PELV – malé napětí, třída III.",
        "",
        "Údaje vycházejí z ČSN 33 2000-4-41 ed. 3 a ČSN EN 61140 a je potřeba je ověřit v normě."
      ),
      fakta: ["K6-11", "K6-09", "K6-12", "K6-10"]
    },
    {
      id: "k6-l07",
      podtema: "tridy",
      nadpis: "Třídy ochrany I, II a III",
      text: md(
        "Elektrické předměty se dělí do **tříd ochrany**:",
        "- **třída I** – základní izolace a **svorka pro ochranný vodič**,",
        "- **třída II** – **dvojitá nebo zesílená izolace**, bez ochranného vodiče; značkou jsou **dva soustředné čtverce**,",
        "- **třída III** – napájení **malým napětím SELV nebo PELV**.",
        "",
        "Třída napoví, co předmět potřebuje od instalace. Spotřebič třídy I má svorku, na kterou se připojuje ochranný vodič. Spotřebič třídy II ochranný vodič nemá, takže se k němu nic nepřipojuje. Předmět třídy III potřebuje napájení malým napětím.",
        "",
        "Rozdělení pochází z ČSN EN 61140; údaje je potřeba ověřit v aktuálním znění normy."
      ),
      fakta: ["K6-09", "K6-12", "K6-10"]
    }
  ],

  otazky: [
    // ───────── Princip ochranných opatření ─────────
    {
      id: "k6-q01",
      kapitola: K,
      podtema: "princip",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Z jakých dvou částí se skládá ochranné opatření před úrazem elektrickým proudem?",
      moznosti: [
        {
          id: "a",
          text: "Ze základní ochrany a ochrany při poruše",
          spravna: true,
          vysvetleni:
            "Správně. Ochranné opatření tvoří základní ochrana (před dotykem živých částí) a ochrana při poruše (ČSN 33 2000-4-41 ed. 3, čl. 410)."
        },
        {
          id: "b",
          text: "Z ochrany při poruše a doplňkové ochrany",
          spravna: false,
          vysvetleni:
            "Doplňková ochrana se k ochrannému opatření přidává navíc. Samotné ochranné opatření tvoří základní ochrana a ochrana při poruše."
        },
        {
          id: "c",
          text: "Ze základní ochrany a proudového chrániče",
          spravna: false,
          vysvetleni:
            "Proudový chránič s IΔn nejvýše 30 mA je doplňková ochrana. Ochranné opatření tvoří základní ochrana a ochrana při poruše."
        },
        {
          id: "d",
          text: "Z ochranného vodiče a uzemnění zdroje",
          spravna: false,
          vysvetleni:
            "Ochranné opatření se nedělí podle vodičů. Skládá se ze základní ochrany a z ochrany při poruše."
        }
      ],
      shrnuti: "Ochranné opatření = základní ochrana + ochrana při poruše; chránič 30 mA je jen doplněk.",
      fakta: ["K6-01"]
    },
    {
      id: "k6-q02",
      kapitola: K,
      podtema: "princip",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co patří k doplňkové ochraně?",
      moznosti: [
        {
          id: "a",
          text: "Dvojitá izolace a malé napětí SELV",
          spravna: false,
          vysvetleni:
            "Dvojitá izolace a SELV jsou samostatná opatření (třídy ochrany II a III). Doplňkovou ochranou je proudový chránič s IΔn nejvýše 30 mA a doplňující ochranné pospojování."
        },
        {
          id: "b",
          text: "Proudový chránič do 30 mA a doplňující pospojování",
          spravna: true,
          vysvetleni:
            "Správně. Doplňkovou ochranou je proudový chránič s IΔn nejvýše 30 mA a doplňující ochranné pospojování (ČSN 33 2000-4-41 ed. 3, čl. 410)."
        },
        {
          id: "c",
          text: "Automatické odpojení do 0,4 s v síti TN",
          spravna: false,
          vysvetleni:
            "0,4 s je nejdelší doba automatického odpojení v koncových obvodech sítě TN, doplňkovou ochranou ale není. Tou je proudový chránič s IΔn nejvýše 30 mA a doplňující ochranné pospojování."
        },
        {
          id: "d",
          text: "Proudový chránič s citlivostí 300 mA",
          spravna: false,
          vysvetleni:
            "Doplňková ochrana vyžaduje chránič s IΔn nejvýše 30 mA, ne 300 mA. Patří k ní i doplňující ochranné pospojování."
        }
      ],
      shrnuti: "Doplňková ochrana: proudový chránič s IΔn nejvýše 30 mA a doplňující ochranné pospojování.",
      fakta: ["K6-01", "K6-02", "K6-09"]
    },
    {
      id: "k6-q03",
      kapitola: K,
      podtema: "princip",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Investor chce v dílně ušetřit: zásuvkové obvody osadíte chráničem 30 mA a ochranu při poruše prý už řešit nemusíte. Co mu odpovíte?",
      moznosti: [
        {
          id: "a",
          text: "Souhlasíte, chránič 30 mA vyřeší každou poruchu",
          spravna: false,
          vysvetleni:
            "Chránič s IΔn 30 mA se nepovažuje za jediné ochranné opatření. Je doplňkovou ochranou k základní ochraně a ochraně při poruše, ne jejich náhradou."
        },
        {
          id: "b",
          text: "Souhlasíte, pokud jsou zásuvkové obvody do 32 A",
          spravna: false,
          vysvetleni:
            "Hranice 32 A říká, kde je doplňková ochrana chráničem povinná (HD 60364-4-41:2017). Ochranu při poruše tím nahradit nelze."
        },
        {
          id: "c",
          text: "Nesouhlasíte, chránič je jen doplňková ochrana",
          spravna: true,
          vysvetleni:
            "Správně. Proudový chránič s IΔn 30 mA se nepovažuje za jediné ochranné opatření; doplňuje základní ochranu a ochranu při poruše."
        },
        {
          id: "d",
          text: "Nesouhlasíte, do zásuvkových obvodů chránič nepatří",
          spravna: false,
          vysvetleni:
            "Naopak: HD 60364-4-41:2017 rozšířil povinnou doplňkovou ochranu chráničem 30 mA na zásuvkové obvody do 32 A. Ochranu při poruše ale nenahrazuje."
        }
      ],
      shrnuti: "Chránič 30 mA ochranu při poruše nenahrazuje, jen ji doplňuje.",
      fakta: ["K6-08", "K6-04"]
    },

    // ───────── Automatické odpojení a doby odpojení ─────────
    {
      id: "k6-q04",
      kapitola: K,
      podtema: "odpojeni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jaká je nejdelší doba automatického odpojení v koncovém obvodu 230 V v síti TN?",
      moznosti: [
        {
          id: "a",
          text: "0,2 s",
          spravna: false,
          vysvetleni: "0,2 s platí pro koncové obvody v síti TT. V síti TN je nejdelší doba odpojení 0,4 s."
        },
        {
          id: "b",
          text: "1 s",
          spravna: false,
          vysvetleni:
            "1 s je nejdelší doba odpojení v distribučních obvodech sítě TT. Koncový obvod 230 V v síti TN musí být odpojen nejpozději do 0,4 s."
        },
        {
          id: "c",
          text: "5 s",
          spravna: false,
          vysvetleni:
            "5 s se připouští v distribučních obvodech sítě TN. Pro koncové obvody 230 V v síti TN platí 0,4 s."
        },
        {
          id: "d",
          text: "0,4 s",
          spravna: true,
          vysvetleni:
            "Správně. V koncových obvodech při napětí proti zemi 230 V je nejdelší doba odpojení v síti TN 0,4 s (v síti TT 0,2 s)."
        }
      ],
      shrnuti: "Koncový obvod 230 V: síť TN do 0,4 s, síť TT do 0,2 s.",
      fakta: ["K6-02", "K6-03"]
    },
    {
      id: "k6-q05",
      kapitola: K,
      podtema: "odpojeni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jaké nejdelší doby odpojení se připouštějí v distribučních obvodech?",
      moznosti: [
        {
          id: "a",
          text: "Síť TN 5 s, síť TT 1 s",
          spravna: true,
          vysvetleni:
            "Správně. V distribučních obvodech se připouští nejvýše 5 s v síti TN a nejvýše 1 s v síti TT."
        },
        {
          id: "b",
          text: "Síť TN 0,4 s, síť TT 0,2 s",
          spravna: false,
          vysvetleni:
            "To jsou doby pro koncové obvody 230 V. Distribuční obvody mají delší limity: síť TN 5 s, síť TT 1 s."
        },
        {
          id: "c",
          text: "Síť TN 1 s, síť TT 5 s",
          spravna: false,
          vysvetleni:
            "Hodnoty jsou prohozené. Přísnější limit má síť TT: v distribučních obvodech TN 5 s, TT 1 s."
        },
        {
          id: "d",
          text: "Síť TN 5 s, síť TT 5 s",
          spravna: false,
          vysvetleni: "Pro síť TT platí v distribučních obvodech kratší doba, nejvýše 1 s. Pro síť TN je to 5 s."
        }
      ],
      shrnuti: "Distribuční obvody: síť TN do 5 s, síť TT do 1 s.",
      fakta: ["K6-03", "K6-02"]
    },
    {
      id: "k6-q06",
      kapitola: K,
      podtema: "odpojeni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Kontrolujete projekt koncového obvodu 230 V v objektu se sítí TT. Projektant uvádí, že ochranný prvek při poruše odpojí do 0,4 s. Co na to řeknete?",
      moznosti: [
        {
          id: "a",
          text: "Vyhovuje, 0,4 s je limit pro koncové obvody",
          spravna: false,
          vysvetleni: "0,4 s je limit pro koncové obvody v síti TN. V síti TT je nejdelší doba odpojení 0,2 s."
        },
        {
          id: "b",
          text: "Nevyhovuje, v síti TT platí nejvýše 0,2 s",
          spravna: true,
          vysvetleni:
            "Správně. V koncových obvodech 230 V se v síti TT připouští nejvýše 0,2 s; 0,4 s platí pro síť TN."
        },
        {
          id: "c",
          text: "Vyhovuje, v síti TT se připouští až 1 s",
          spravna: false,
          vysvetleni:
            "1 s se v síti TT připouští jen v distribučních obvodech. V koncovém obvodu 230 V platí nejvýše 0,2 s."
        },
        {
          id: "d",
          text: "Nevyhovuje, v síti TT platí nejvýše 0,1 s",
          spravna: false,
          vysvetleni:
            "Limit pro koncové obvody sítě TT je 0,2 s, ne 0,1 s. Projektovaných 0,4 s ale nevyhovuje ani tak."
        }
      ],
      shrnuti: "V síti TT musí koncový obvod 230 V odpojit do 0,2 s – 0,4 s platí jen pro síť TN.",
      fakta: ["K6-02", "K6-03"]
    },

    // ───────── Proudový chránič ─────────
    {
      id: "k6-q07",
      kapitola: K,
      podtema: "chranic",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co proudový chránič porovnává, aby poznal poruchu?",
      moznosti: [
        {
          id: "a",
          text: "Napětí mezi fázovým vodičem a zemí",
          spravna: false,
          vysvetleni: "Chránič neporovnává napětí. Součtovým transformátorem porovnává proudy v pracovních vodičích."
        },
        {
          id: "b",
          text: "Proud ve fázovém vodiči s jmenovitým proudem",
          spravna: false,
          vysvetleni:
            "Chránič neporovnává proud s jmenovitou hodnotou obvodu. Porovnává mezi sebou proudy v pracovních vodičích, a to součtovým transformátorem."
        },
        {
          id: "c",
          text: "Proudy v pracovních vodičích mezi sebou",
          spravna: true,
          vysvetleni:
            "Správně. Chránič porovnává proudy v pracovních vodičích součtovým transformátorem a vybaví, když část proudu odtéká mimo chránič."
        },
        {
          id: "d",
          text: "Proud v ochranném vodiči s proudem ve středním",
          spravna: false,
          vysvetleni:
            "Chránič porovnává proudy v pracovních vodičích, ochranný vodič mezi ně nepatří. Proud odtékající ochranným vodičem se projeví jako jejich rozdíl."
        }
      ],
      shrnuti: "Proudový chránič porovnává součtovým transformátorem proudy v pracovních vodičích.",
      fakta: ["K6-07"]
    },
    {
      id: "k6-q08",
      kapitola: K,
      podtema: "chranic",
      typ: "vyber",
      obtiznost: 2,
      zadani:
        "Člověk stojící na zemi se dotkne fázového vodiče v obvodu za proudovým chráničem 30 mA a chránič vybaví. Proč?",
      moznosti: [
        {
          id: "a",
          text: "Protože vzrostlo napětí na fázovém vodiči",
          spravna: false,
          vysvetleni:
            "Chránič nereaguje na napětí. Vybavil proto, že část proudu odtéká mimo chránič přes tělo člověka."
        },
        {
          id: "b",
          text: "Protože proud v obvodu překročil jmenovitou hodnotu",
          spravna: false,
          vysvetleni:
            "Chránič neporovnává proud s jmenovitou hodnotou. Vybavil, protože část proudu odtéká přes tělo mimo chránič a proudy v pracovních vodičích se liší."
        },
        {
          id: "c",
          text: "Protože se přerušil ochranný vodič",
          spravna: false,
          vysvetleni:
            "O vybavení tady nerozhoduje ochranný vodič. Chránič vybavil, protože část proudu odtéká mimo chránič přes tělo člověka."
        },
        {
          id: "d",
          text: "Protože část proudu odtéká přes tělo mimo chránič",
          spravna: true,
          vysvetleni:
            "Správně. Chránič vybaví, když část proudu odtéká mimo chránič, například přes tělo člověka nebo ochranný vodič; proudy v pracovních vodičích se pak liší."
        }
      ],
      shrnuti: "Chránič vybaví, když část proudu odteče mimo něj – přes tělo nebo ochranný vodič.",
      fakta: ["K6-07"]
    },
    {
      id: "k6-q09",
      kapitola: K,
      podtema: "chranic",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Ve starém objektu je rozvod v síti TN-C. Elektrikář chce do rozvodnice doplnit proudový chránič 30 mA jako doplňkovou ochranu. Jak rozhodnete?",
      moznosti: [
        {
          id: "a",
          text: "Souhlasíte, chránič zvýší bezpečnost v každé síti",
          spravna: false,
          vysvetleni:
            "Neplatí to pro každou síť. V síti TN-C se proudový chránič nesmí použít, ať má jakoukoli citlivost."
        },
        {
          id: "b",
          text: "Nesouhlasíte, v síti TN-C se chránič nesmí použít",
          spravna: true,
          vysvetleni: "Správně. Proudový chránič se v síti TN-C nesmí použít (ČSN 33 2000-4-41)."
        },
        {
          id: "c",
          text: "Souhlasíte, pokud bude mít chránič IΔn 30 mA",
          spravna: false,
          vysvetleni: "Citlivost na tom nic nemění. V síti TN-C se proudový chránič nesmí použít."
        },
        {
          id: "d",
          text: "Souhlasíte, PEN se rozdělí až za chráničem",
          spravna: false,
          vysvetleni:
            "Na straně zátěže za proudovým chráničem se nesmí použít vodič PEN, takže rozdělení až za chráničem nevyhovuje. V síti TN-C se chránič nesmí použít."
        }
      ],
      shrnuti: "V síti TN-C se proudový chránič nesmí použít.",
      fakta: ["K6-06"]
    },
    {
      id: "k6-q10",
      kapitola: K,
      podtema: "chranic",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Na které obvody rozšířil HD 60364-4-41:2017 povinnou doplňkovou ochranu chráničem 30 mA?",
      moznosti: [
        {
          id: "a",
          text: "Na zásuvkové obvody do 16 A",
          spravna: false,
          vysvetleni:
            "Hranice je vyšší: HD 60364-4-41:2017 rozšířil povinnou doplňkovou ochranu na zásuvkové obvody do 32 A."
        },
        {
          id: "b",
          text: "Na všechny obvody v objektu bez rozdílu",
          spravna: false,
          vysvetleni:
            "Rozšíření se netýká všech obvodů. Povinná doplňková ochrana chráničem 30 mA se rozšířila na zásuvkové obvody do 32 A."
        },
        {
          id: "c",
          text: "Na zásuvkové obvody do 32 A",
          spravna: true,
          vysvetleni:
            "Správně. HD 60364-4-41:2017 rozšířil povinnou doplňkovou ochranu proudovým chráničem s IΔn nejvýše 30 mA na zásuvkové obvody do 32 A."
        },
        {
          id: "d",
          text: "Na zásuvkové obvody do 63 A",
          spravna: false,
          vysvetleni:
            "Hranice je nižší. HD 60364-4-41:2017 rozšířil povinnou doplňkovou ochranu chráničem 30 mA na zásuvkové obvody do 32 A."
        }
      ],
      shrnuti: "Zásuvkové obvody do 32 A: povinně chránič s IΔn nejvýše 30 mA.",
      fakta: ["K6-04"]
    },
    {
      id: "k6-q11",
      kapitola: K,
      podtema: "chranic",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Při rekonstrukci bytu podle současných norem chce investor proudový chránič 30 mA jen na zásuvkové obvody. Světla prý chránit nemusíte. Co mu řeknete?",
      moznosti: [
        {
          id: "a",
          text: "Nemá pravdu, chránič je nově nutný i pro světla",
          spravna: true,
          vysvetleni:
            "Správně. HD 60364-4-41:2017 nově požaduje proudový chránič s IΔn nejvýše 30 mA i pro světelné obvody v bytech. Údaj je potřeba ověřit v aktuálním znění normy."
        },
        {
          id: "b",
          text: "Má pravdu, chránič je povinný jen u zásuvek do 32 A",
          spravna: false,
          vysvetleni:
            "Zásuvkové obvody do 32 A nejsou jediné. HD 60364-4-41:2017 nově požaduje chránič s IΔn nejvýše 30 mA i pro světelné obvody v bytech."
        },
        {
          id: "c",
          text: "Má pravdu, světelné obvody se chráničem nechrání",
          spravna: false,
          vysvetleni:
            "Naopak: HD 60364-4-41:2017 nově požaduje chránič s IΔn nejvýše 30 mA i pro světelné obvody v bytech."
        },
        {
          id: "d",
          text: "Nemá pravdu, světla potřebují chránič 10 mA",
          spravna: false,
          vysvetleni:
            "Pro světelné obvody v bytech se požaduje chránič s IΔn nejvýše 30 mA, stejně jako u zásuvkových obvodů do 32 A."
        }
      ],
      shrnuti: "V bytech nově chránič 30 mA i pro světelné obvody (ověřit v normě).",
      fakta: ["K6-05", "K6-04"]
    },

    // ───────── Další opatření ─────────
    {
      id: "k6-q12",
      kapitola: K,
      podtema: "dalsi",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Do jakého napětí sahají obvody malého napětí SELV a PELV?",
      moznosti: [
        {
          id: "a",
          text: "Do 24 V AC nebo 60 V DC",
          spravna: false,
          vysvetleni:
            "Hranice jsou vyšší: SELV a PELV jsou obvody do 50 V střídavého nebo 120 V stejnosměrného napětí bez zvlnění."
        },
        {
          id: "b",
          text: "Do 120 V AC nebo 50 V DC",
          spravna: false,
          vysvetleni: "Hodnoty jsou prohozené. Malé napětí SELV a PELV je do 50 V AC nebo 120 V DC."
        },
        {
          id: "c",
          text: "Do 50 V AC i DC",
          spravna: false,
          vysvetleni:
            "Pro stejnosměrné napětí platí vyšší hranice, 120 V bez zvlnění. Pro střídavé napětí je to 50 V."
        },
        {
          id: "d",
          text: "Do 50 V AC nebo 120 V DC",
          spravna: true,
          vysvetleni:
            "Správně. SELV a PELV jsou obvody malého napětí do 50 V AC nebo 120 V DC bez zvlnění (ČSN 33 2000-4-41 ed. 3, čl. 414); údaj ověřit v normě."
        }
      ],
      shrnuti: "SELV a PELV: do 50 V AC nebo 120 V DC (ověřit v normě).",
      fakta: ["K6-10"]
    },
    {
      id: "k6-q13",
      kapitola: K,
      podtema: "dalsi",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Na stroji je ovládací obvod 24 V AC napájený malým napětím. Jeden jeho pól je záměrně spojen se zemí. O jaký obvod jde?",
      moznosti: [
        {
          id: "a",
          text: "O obvod SELV, protože napětí je do 50 V",
          spravna: false,
          vysvetleni:
            "Napětí do 50 V AC splňují SELV i PELV. Rozhoduje vztah k zemi: obvody SELV se zemí spojeny nejsou."
        },
        {
          id: "b",
          text: "O obvod PELV, protože je uzemněný",
          spravna: true,
          vysvetleni:
            "Správně. SELV i PELV jsou obvody malého napětí do 50 V AC; obvody SELV nejsou spojeny se zemí, obvody PELV uzemněny být mohou."
        },
        {
          id: "c",
          text: "O elektrické oddělení, protože jde o jeden obvod",
          spravna: false,
          vysvetleni:
            "Elektrické oddělení napájí obvod z oddělovacího zdroje, obvykle jen jeden spotřebič. Uzemněný obvod malého napětí je PELV."
        },
        {
          id: "d",
          text: "O obvod SELV, protože jde o ovládací obvod",
          spravna: false,
          vysvetleni:
            "Účel obvodu nerozhoduje. Obvod SELV se zemí spojen není; uzemněný obvod malého napětí je PELV."
        }
      ],
      shrnuti: "SELV není spojen se zemí, PELV uzemněn být může.",
      fakta: ["K6-10", "K6-11"]
    },
    {
      id: "k6-q14",
      kapitola: K,
      podtema: "dalsi",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jak se napájí obvod chráněný elektrickým oddělením?",
      moznosti: [
        {
          id: "a",
          text: "Z uzemněného zdroje malého napětí PELV",
          spravna: false,
          vysvetleni:
            "Uzemněný obvod malého napětí je PELV, což je jiné opatření. Elektrické oddělení napájí obvod z oddělovacího zdroje, obvykle jen jeden spotřebič."
        },
        {
          id: "b",
          text: "Přes proudový chránič s IΔn 30 mA",
          spravna: false,
          vysvetleni:
            "Chránič s IΔn 30 mA je doplňková ochrana. Elektrické oddělení napájí obvod z oddělovacího zdroje (oddělovacího transformátoru)."
        },
        {
          id: "c",
          text: "Z oddělovacího zdroje, obvykle jen jeden spotřebič",
          spravna: true,
          vysvetleni:
            "Správně. Ochrana elektrickým oddělením napájí obvod z oddělovacího zdroje (oddělovacího transformátoru); obvykle se z něj napájí jen jeden spotřebič."
        },
        {
          id: "d",
          text: "Ze sítě TN-S přes ochranný vodič PE",
          spravna: false,
          vysvetleni:
            "Elektrické oddělení napájí obvod z oddělovacího zdroje, ne přímo ze sítě. Obvykle se z něj napájí jen jeden spotřebič."
        }
      ],
      shrnuti: "Elektrické oddělení: oddělovací zdroj (transformátor), obvykle jen pro jeden spotřebič.",
      fakta: ["K6-11", "K6-10", "K6-08"]
    },

    // ───────── Třídy ochrany předmětů ─────────
    {
      id: "k6-q15",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Čím se vyznačuje předmět třídy ochrany I?",
      moznosti: [
        {
          id: "a",
          text: "Dvojitou izolací bez ochranného vodiče",
          spravna: false,
          vysvetleni:
            "To je třída II. Předmět třídy I má základní izolaci a svorku pro ochranný vodič."
        },
        {
          id: "b",
          text: "Napájením malým napětím SELV nebo PELV",
          spravna: false,
          vysvetleni: "To je třída III. Předmět třídy I má základní izolaci a svorku pro ochranný vodič."
        },
        {
          id: "c",
          text: "Zesílenou izolací a značkou dvou čtverců",
          spravna: false,
          vysvetleni:
            "Zesílená izolace a značka dvou soustředných čtverců patří ke třídě II. Třída I má základní izolaci a svorku pro ochranný vodič."
        },
        {
          id: "d",
          text: "Základní izolací a svorkou pro ochranný vodič",
          spravna: true,
          vysvetleni:
            "Správně. Třída ochrany I znamená základní izolaci a svorku pro ochranný vodič (ČSN EN 61140); údaj ověřit v normě."
        }
      ],
      shrnuti: "Třída I: základní izolace a svorka pro ochranný vodič.",
      fakta: ["K6-09", "K6-12"]
    },
    {
      id: "k6-q16",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak vypadá značka třídy ochrany II?",
      moznosti: [
        {
          id: "a",
          text: "Dva soustředné čtverce",
          spravna: true,
          vysvetleni: "Správně. Značkou třídy ochrany II (dvojitá izolace) jsou dva soustředné čtverce."
        },
        {
          id: "b",
          text: "Kruh se třemi vodorovnými čarami",
          spravna: false,
          vysvetleni: "Značkou třídy ochrany II jsou dva soustředné čtverce, ne kruh s čarami."
        },
        {
          id: "c",
          text: "Čtverec s římskou číslicí II",
          spravna: false,
          vysvetleni: "Značka třídy II číslici nemá. Tvoří ji dva soustředné čtverce."
        },
        {
          id: "d",
          text: "Dva soustředné kruhy",
          spravna: false,
          vysvetleni: "Značka třídy II nemá kruhy, ale dva soustředné čtverce."
        }
      ],
      shrnuti: "Třída II = dvojitá izolace, značka dva soustředné čtverce.",
      fakta: ["K6-12"]
    },
    {
      id: "k6-q17",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co je znakem předmětu třídy ochrany III?",
      moznosti: [
        {
          id: "a",
          text: "Má svorku pro připojení ochranného vodiče",
          spravna: false,
          vysvetleni:
            "Svorku pro ochranný vodič má třída I. Předmět třídy III se napájí malým napětím SELV nebo PELV."
        },
        {
          id: "b",
          text: "Napájí se malým napětím SELV nebo PELV",
          spravna: true,
          vysvetleni:
            "Správně. Třída III znamená napájení malým napětím SELV nebo PELV, tedy do 50 V AC nebo 120 V DC; údaje ověřit v normě."
        },
        {
          id: "c",
          text: "Má trojitou izolaci bez ochranného vodiče",
          spravna: false,
          vysvetleni:
            "Číslo třídy neudává počet vrstev izolace. Dvojitou nebo zesílenou izolaci bez ochranného vodiče má třída II, třída III se napájí malým napětím SELV nebo PELV."
        },
        {
          id: "d",
          text: "Napájí se jen z oddělovacího transformátoru",
          spravna: false,
          vysvetleni:
            "Napájení z oddělovacího zdroje patří k ochraně elektrickým oddělením. Třídu III určuje napájení malým napětím SELV nebo PELV."
        }
      ],
      shrnuti: "Třída III: napájení malým napětím SELV nebo PELV.",
      fakta: ["K6-09", "K6-10", "K6-11"]
    },
    {
      id: "k6-q18",
      kapitola: K,
      podtema: "tridy",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Montér vyměňuje přívodní šňůru ruční vrtačky se značkou dvou soustředných čtverců a ptá se, kam v ní připojit ochranný vodič. Co mu odpovíte?",
      moznosti: [
        {
          id: "a",
          text: "Na kovové části vrtačky, jako u každého nářadí",
          spravna: false,
          vysvetleni:
            "Značka dvou soustředných čtverců označuje třídu ochrany II: dvojitou nebo zesílenou izolaci bez ochranného vodiče."
        },
        {
          id: "b",
          text: "Na svorku pro ochranný vodič uvnitř vrtačky",
          spravna: false,
          vysvetleni:
            "Svorku pro ochranný vodič mají předměty třídy I. Vrtačka se značkou dvou soustředných čtverců je třídy II a ochranný vodič nemá."
        },
        {
          id: "c",
          text: "Nikam, vrtačka je třídy II bez ochranného vodiče",
          spravna: true,
          vysvetleni:
            "Správně. Dva soustředné čtverce značí třídu ochrany II – dvojitou nebo zesílenou izolaci bez ochranného vodiče."
        },
        {
          id: "d",
          text: "Nikam, vrtačka je třídy III na malé napětí",
          spravna: false,
          vysvetleni:
            "Třídu III určuje napájení malým napětím SELV nebo PELV. Dva soustředné čtverce značí třídu II s dvojitou izolací."
        }
      ],
      shrnuti: "Dva soustředné čtverce = třída II, ochranný vodič se nepřipojuje.",
      fakta: ["K6-12", "K6-09"]
    }
  ]
};

export default obsah;
