// Kapitola 7 – Sítě, uzemnění a značení vodičů.
// Každá karta i otázka odkazuje na fakta ze src/data/fakta.ts; jiná odborná tvrzení tu nejsou.
// Normy ČSN 33 2000-1, ČSN 33 0165, ČSN 33 0166 a ČSN 33 2000-5-54 popisujeme vlastními slovy.
import type { ObsahKapitoly } from "../typy";
import { md } from "./md";

const K = "k7-site-vodice" as const;

const obsah: ObsahKapitoly = {
  kapitola: K,
  podtemata: [
    { id: "oznaceni", nazev: "Označení sítí" },
    { id: "tn", nazev: "Sítě TN" },
    { id: "tt-it", nazev: "Sítě TT a IT" },
    { id: "znaceni", nazev: "Značení vodičů" },
    { id: "pen", nazev: "Vodič PEN" }
  ],

  lekce: [
    {
      id: "k7-l01",
      podtema: "oznaceni",
      nadpis: "Co znamenají písmena v označení sítě",
      text: md(
        "Typ sítě se označuje písmeny:",
        "- **první písmeno** – vztah **zdroje** k zemi: **T** = přímo uzemněný bod, **I** = izolovaný, nebo uzemněný přes impedanci,",
        "- **druhé písmeno** – vztah **neživých částí** k zemi: **T** = samostatně uzemněné, **N** = spojené s uzemněným bodem zdroje.",
        "",
        "U sítí TN se přidává ještě:",
        "- **C** – funkce středního vodiče (N) a ochranného vodiče (PE) jsou sloučené ve **vodiči PEN**,",
        "- **S** – vodiče N a PE jsou **oddělené**.",
        "",
        "Označení vychází z ČSN 33 2000-1 ed. 2 a je potřeba ho ověřit v normě. V ilustraci přepínejte sítě a zobrazte poruchu na kostře spotřebiče."
      ),
      ilustrace: "site-tn-tt-it",
      fakta: ["K7-01"]
    },
    {
      id: "k7-l02",
      podtema: "tn",
      nadpis: "Sítě TN-C, TN-S a TN-C-S",
      text: md(
        "V sítích **TN** jsou neživé části spojené s uzemněným bodem zdroje. Liší se tím, jak vedou funkci středního a ochranného vodiče:",
        "- **TN-C** – jediný vodič PEN,",
        "- **TN-S** – oddělené vodiče N a PE,",
        "- **TN-C-S** – nejdřív vodič PEN, od místa rozdělení oddělené N a PE.",
        "",
        "**Distribuční sítě nízkého napětí** dodavatele elektřiny jsou typu **TN-C**, výjimečně TN-C-S.",
        "",
        "Pro sítě TN platí v koncových obvodech 230 V doba automatického odpojení nejvýše **0,4 s**. Proudový chránič se v síti **TN-C nesmí použít**; v síti TN-C-S nesmí být na straně zátěže za chráničem vodič PEN."
      ),
      fakta: ["K7-01", "K7-02", "K6-02", "K6-06"]
    },
    {
      id: "k7-l03",
      podtema: "tt-it",
      nadpis: "Síť TT",
      text: md(
        "V síti **TT** má zdroj přímo uzemněný bod a **neživé části jsou uzemněné samostatně**.",
        "",
        "Z toho plyne důležité pravidlo: neživé části se v síti TT **nesmějí připojovat na střední vodič**. Kostra spotřebiče patří k vlastnímu uzemnění, ne k vodiči N.",
        "",
        "Pro síť TT platí kratší doby automatického odpojení než pro síť TN:",
        "- koncové obvody 230 V nejvýše **0,2 s**,",
        "- distribuční obvody nejvýše **1 s**.",
        "",
        "Cestu poruchového proudu v síti TT si zobrazte v ilustraci u první karty této kapitoly."
      ),
      fakta: ["K7-01", "K7-09", "K6-02", "K6-03"]
    },
    {
      id: "k7-l04",
      podtema: "tt-it",
      nadpis: "Síť IT a hlídač izolačního stavu",
      text: md(
        "V síti **IT** je zdroj **izolovaný od země**, nebo uzemněný přes **impedanci**. Neživé části jsou uzemněné samostatně.",
        "",
        "Při **první poruše** mezi živou částí a zemí je poruchový proud **malý** a **odpojení se nevyžaduje**. Zařízení tak může pracovat dál.",
        "",
        "Právě proto se v síti IT sleduje stav izolace **hlídačem izolačního stavu**. Má první poruchu odhalit dřív, než nastane druhá.",
        "",
        "Při revizi se hlídače izolačního stavu zkoušejí funkčně, stejně jako proudové chrániče.",
        "",
        "Údaj o hlídači (ČSN 33 2000-4-41 ed. 3) je potřeba ověřit v normě."
      ),
      fakta: ["K7-01", "K7-10", "K7-11", "K9-03"]
    },
    {
      id: "k7-l05",
      podtema: "znaceni",
      nadpis: "Barvy vodičů",
      text: md(
        "Izolace vodičů má barvu podle funkce:",
        "- **ochranný vodič PE** – **zelenožlutá**,",
        "- **střední vodič N** – **světle modrá**,",
        "- **fázové vodiče** – **hnědá, černá a šedá**.",
        "",
        "Kombinace **zelené a žluté je vyhrazena pro ochranné vodiče** a nesmí se použít k jinému účelu. Zelenožlutá žíla proto nesmí sloužit jako fázový ani střední vodič.",
        "",
        "Pětižilový kabel se zelenožlutou žílou má žíly **zelenožlutou, modrou, hnědou, černou a šedou**.",
        "",
        "V ilustraci si vyzkoušejte, jak rychle najdete ochranný vodič."
      ),
      ilustrace: "barvy-vodicu",
      fakta: ["K7-04", "K7-05", "K7-07"]
    },
    {
      id: "k7-l06",
      podtema: "pen",
      nadpis: "Vodič PEN: značení a přednost ochranné funkce",
      text: md(
        "**Vodič PEN** slučuje funkci středního vodiče N a ochranného vodiče PE. Značí se dvěma způsoby:",
        "- **zelenožlutě** se **světle modrými značkami** na koncích, nebo",
        "- **světle modře** se **zelenožlutými značkami** na koncích.",
        "",
        "Má-li vodič obě funkce, **přednost má funkce ochranná**.",
        "",
        "Pro vodič PEN platí stejně jako pro ochranný vodič PE, že se **nesmí samostatně jistit ani spínat**. Do vodiče PEN tedy nepatří samostatný jistič ani vypínač.",
        "",
        "Pravidla z ČSN 33 2000-5-54 ed. 3 je potřeba ověřit v aktuálním znění normy."
      ),
      fakta: ["K7-06", "K7-01", "K7-08", "K7-12"]
    },
    {
      id: "k7-l07",
      podtema: "pen",
      nadpis: "Rozdělení vodiče PEN",
      text: md(
        "V instalaci se vodič PEN **rozděluje** na ochranný vodič **PE** a střední vodič **N**. Tak vzniká síť **TN-C-S**: před místem rozdělení je PEN, za ním oddělené N a PE.",
        "",
        "Za místem rozdělení se vodiče N a PE **už nesmějí znovu spojit**.",
        "",
        "S rozdělením souvisí i proudový chránič. Na straně zátěže za chráničem se vodič PEN použít nesmí a v síti TN-C se chránič nesmí použít vůbec.",
        "",
        "Při revizi se v rámci prohlídky kontroluje i označení středních a ochranných vodičů.",
        "",
        "Údaje z ČSN 33 2000-5-54 ed. 3 je potřeba ověřit v normě."
      ),
      fakta: ["K7-03", "K7-01", "K6-06", "K9-02"]
    }
  ],

  otazky: [
    // ───────── Označení sítí ─────────
    {
      id: "k7-q01",
      kapitola: K,
      podtema: "oznaceni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co udává první písmeno v označení sítě, například T v TN-S?",
      moznosti: [
        {
          id: "a",
          text: "Vztah neživých částí k zemi",
          spravna: false,
          vysvetleni: "Vztah neživých částí k zemi udává druhé písmeno. První písmeno udává vztah zdroje k zemi."
        },
        {
          id: "b",
          text: "Vztah zdroje k zemi",
          spravna: true,
          vysvetleni:
            "Správně. První písmeno udává vztah zdroje k zemi: T – přímo uzemněný bod, I – izolovaný nebo uzemněný přes impedanci (ČSN 33 2000-1 ed. 2)."
        },
        {
          id: "c",
          text: "Zda jsou vodiče N a PE sloučené",
          spravna: false,
          vysvetleni:
            "Sloučení nebo oddělení vodičů N a PE vyjadřují u sítí TN až písmena C a S. První písmeno udává vztah zdroje k zemi."
        },
        {
          id: "d",
          text: "Počet fázových vodičů sítě",
          spravna: false,
          vysvetleni: "Počet vodičů označení sítě neudává. První písmeno vyjadřuje vztah zdroje k zemi."
        }
      ],
      shrnuti: "První písmeno: zdroj a zem; druhé písmeno: neživé části a zem.",
      fakta: ["K7-01"]
    },
    {
      id: "k7-q02",
      kapitola: K,
      podtema: "oznaceni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Co znamená písmeno I na prvním místě v označení sítě IT?",
      moznosti: [
        {
          id: "a",
          text: "Zdroj je izolovaný, nebo uzemněný přes impedanci",
          spravna: true,
          vysvetleni:
            "Správně. Písmeno I na prvním místě znamená, že zdroj je izolovaný od země, nebo uzemněný přes impedanci (ČSN 33 2000-1 ed. 2)."
        },
        {
          id: "b",
          text: "Neživé části jsou izolované od země",
          spravna: false,
          vysvetleni:
            "Vztah neživých částí k zemi udává druhé písmeno; v síti IT je to T, tedy samostatně uzemněné. Písmeno I se týká zdroje."
        },
        {
          id: "c",
          text: "Zdroj má jeden bod přímo uzemněný",
          spravna: false,
          vysvetleni:
            "Přímo uzemněný bod zdroje značí písmeno T. Písmeno I znamená zdroj izolovaný od země nebo uzemněný přes impedanci."
        },
        {
          id: "d",
          text: "Síť je určena jen pro spotřebiče třídy II",
          spravna: false,
          vysvetleni:
            "Písmeno I nepopisuje spotřebiče. Říká, že zdroj je izolovaný od země nebo uzemněný přes impedanci."
        }
      ],
      shrnuti: "I = zdroj izolovaný od země nebo uzemněný přes impedanci.",
      fakta: ["K7-01"]
    },
    {
      id: "k7-q03",
      kapitola: K,
      podtema: "oznaceni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co znamená písmeno C v označení sítě TN-C?",
      moznosti: [
        {
          id: "a",
          text: "Neživé části jsou spojené s uzemněným bodem zdroje",
          spravna: false,
          vysvetleni:
            "To vyjadřuje písmeno N. Písmeno C znamená sloučení funkcí středního a ochranného vodiče ve vodiči PEN."
        },
        {
          id: "b",
          text: "Vodiče N a PE jsou v celé síti oddělené",
          spravna: false,
          vysvetleni: "Oddělené vodiče N a PE značí písmeno S. Písmeno C znamená sloučení obou funkcí ve vodiči PEN."
        },
        {
          id: "c",
          text: "Funkce vodičů N a PE jsou sloučené ve vodiči PEN",
          spravna: true,
          vysvetleni:
            "Správně. U sítí TN znamená C sloučení funkcí středního a ochranného vodiče ve vodiči PEN, S jejich oddělení."
        },
        {
          id: "d",
          text: "Zdroj je uzemněný přes impedanci",
          spravna: false,
          vysvetleni:
            "Uzemnění zdroje přes impedanci patří k písmenu I (síť IT). C u sítí TN znamená sloučení funkcí N a PE ve vodiči PEN."
        }
      ],
      shrnuti: "C = vodič PEN (sloučené N a PE), S = oddělené N a PE.",
      fakta: ["K7-01"]
    },

    // ───────── Sítě TN ─────────
    {
      id: "k7-q04",
      kapitola: K,
      podtema: "tn",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jakého typu bývají distribuční sítě nízkého napětí dodavatele elektřiny?",
      moznosti: [
        {
          id: "a",
          text: "TT, výjimečně IT",
          spravna: false,
          vysvetleni:
            "Distribuční sítě nízkého napětí dodavatele nejsou typu TT ani IT. Jsou typu TN-C, výjimečně TN-C-S."
        },
        {
          id: "b",
          text: "TN-S, výjimečně TT",
          spravna: false,
          vysvetleni:
            "Oddělené vodiče N a PE (TN-S) distribuční síť dodavatele nemá. Je typu TN-C, výjimečně TN-C-S."
        },
        {
          id: "c",
          text: "IT, výjimečně TN-C",
          spravna: false,
          vysvetleni:
            "Síť IT se zdrojem izolovaným od země to není. Distribuční sítě nízkého napětí dodavatele jsou typu TN-C, výjimečně TN-C-S."
        },
        {
          id: "d",
          text: "TN-C, výjimečně TN-C-S",
          spravna: true,
          vysvetleni:
            "Správně. Distribuční sítě nízkého napětí dodavatele elektřiny jsou typu TN-C, výjimečně TN-C-S (výukový materiál ZČU FEL)."
        }
      ],
      shrnuti: "Distribuční síť nízkého napětí dodavatele: TN-C, výjimečně TN-C-S.",
      fakta: ["K7-02"]
    },
    {
      id: "k7-q05",
      kapitola: K,
      podtema: "tn",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jak je v síti TN-C-S vedena funkce středního a ochranného vodiče?",
      moznosti: [
        {
          id: "a",
          text: "V celé síti jedním společným vodičem PEN",
          spravna: false,
          vysvetleni:
            "To je síť TN-C. V síti TN-C-S je nejdřív vodič PEN a za místem rozdělení oddělené vodiče N a PE."
        },
        {
          id: "b",
          text: "Nejdřív vodičem PEN, za rozdělením odděleně N a PE",
          spravna: true,
          vysvetleni:
            "Správně. Síť TN-C-S spojuje obě části: vodič PEN se v instalaci rozdělí na ochranný vodič PE a střední vodič N."
        },
        {
          id: "c",
          text: "V celé síti oddělenými vodiči N a PE",
          spravna: false,
          vysvetleni:
            "To je síť TN-S. V síti TN-C-S jsou vodiče N a PE oddělené až za místem rozdělení vodiče PEN."
        },
        {
          id: "d",
          text: "Nejdřív odděleně N a PE, za nimi společným PEN",
          spravna: false,
          vysvetleni:
            "Pořadí je opačné. Nejdřív je vodič PEN a za místem rozdělení vodiče N a PE, které se znovu spojit nesmějí."
        }
      ],
      shrnuti: "TN-C-S: nejdřív PEN, za místem rozdělení oddělené N a PE.",
      fakta: ["K7-01", "K7-03"]
    },
    {
      id: "k7-q06",
      kapitola: K,
      podtema: "tn",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Přebíráte rozvod v síti TN-C-S. V podružném rozvaděči je zapojený proudový chránič a za ním pokračuje ke spotřebičům vodič PEN. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Je to v pořádku, chránič s vodičem PEN pracuje",
          spravna: false,
          vysvetleni:
            "Na straně zátěže za proudovým chráničem se vodič PEN použít nesmí. Zapojení nevyhovuje."
        },
        {
          id: "b",
          text: "Je to v pořádku, pokud má chránič IΔn 30 mA",
          spravna: false,
          vysvetleni: "Citlivost chrániče na tom nic nemění. Za chráničem se v síti TN-C-S nesmí použít vodič PEN."
        },
        {
          id: "c",
          text: "Za chráničem se vodič PEN použít nesmí",
          spravna: true,
          vysvetleni:
            "Správně. V síti TN-C-S se na straně zátěže za proudovým chráničem nesmí použít vodič PEN (ČSN 33 2000-4-41)."
        },
        {
          id: "d",
          text: "Chránič se v síti TN-C-S nesmí použít vůbec",
          spravna: false,
          vysvetleni:
            "Úplný zákaz chrániče platí pro síť TN-C. V síti TN-C-S jen nesmí být na straně zátěže za chráničem vodič PEN."
        }
      ],
      shrnuti: "TN-C-S: za proudovým chráničem nesmí být vodič PEN; v síti TN-C se chránič nepoužije vůbec.",
      fakta: ["K6-06", "K7-01"]
    },

    // ───────── Sítě TT a IT ─────────
    {
      id: "k7-q07",
      kapitola: K,
      podtema: "tt-it",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V objektu se sítí TT to má montér daleko k zemniči, a tak navrhuje připojit kovový kryt spotřebiče na střední vodič. Jak rozhodnete?",
      moznosti: [
        {
          id: "a",
          text: "Povolíte, střední vodič vede k uzemněnému zdroji",
          spravna: false,
          vysvetleni:
            "V síti TT se neživé části nesmějí připojovat na střední vodič. Jsou uzemněné samostatně (druhé písmeno T)."
        },
        {
          id: "b",
          text: "Povolíte, pokud obvod chrání proudový chránič",
          spravna: false,
          vysvetleni: "Chránič na tom nic nemění. Neživé části se v síti TT nesmějí připojovat na střední vodič."
        },
        {
          id: "c",
          text: "Povolíte, pokud se střední vodič označí zelenožlutě",
          spravna: false,
          vysvetleni:
            "Zelenožlutá barva je vyhrazena pro ochranné vodiče, střední vodič tak značit nelze. A neživé části se v síti TT na střední vodič připojovat nesmějí."
        },
        {
          id: "d",
          text: "Nepovolíte, neživé části nesmějí na střední vodič",
          spravna: true,
          vysvetleni:
            "Správně. V síti TT se neživé části elektrického zařízení nesmějí připojovat na střední vodič; jsou uzemněné samostatně."
        }
      ],
      shrnuti: "Síť TT: kostry se uzemňují samostatně, nikdy na střední vodič.",
      fakta: ["K7-09", "K7-01", "K7-05"]
    },
    {
      id: "k7-q08",
      kapitola: K,
      podtema: "tt-it",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Co platí v síti IT při první poruše mezi živou částí a zemí?",
      moznosti: [
        {
          id: "a",
          text: "Poruchový proud je malý a odpojení se nevyžaduje",
          spravna: true,
          vysvetleni:
            "Správně. V síti IT je při první poruše mezi živou částí a zemí poruchový proud malý a odpojení se nevyžaduje."
        },
        {
          id: "b",
          text: "Ochranný prvek musí obvod odpojit do 0,4 s",
          spravna: false,
          vysvetleni:
            "0,4 s je nejdelší doba odpojení v koncových obvodech sítě TN. V síti IT je při první poruše proud malý a odpojení se nevyžaduje."
        },
        {
          id: "c",
          text: "Ochranný prvek musí obvod odpojit do 0,2 s",
          spravna: false,
          vysvetleni: "0,2 s platí pro koncové obvody sítě TT. V síti IT se při první poruše odpojení nevyžaduje."
        },
        {
          id: "d",
          text: "Poruchový proud je velký a obvod se hned odpojí",
          spravna: false,
          vysvetleni:
            "Při první poruše v síti IT je poruchový proud naopak malý, a proto se odpojení nevyžaduje."
        }
      ],
      shrnuti: "Síť IT, první porucha: malý proud, odpojení se nevyžaduje.",
      fakta: ["K7-10", "K6-02"]
    },
    {
      id: "k7-q09",
      kapitola: K,
      podtema: "tt-it",
      typ: "vyber",
      obtiznost: 2,
      zadani: "K čemu slouží v síti IT hlídač izolačního stavu?",
      moznosti: [
        {
          id: "a",
          text: "Odpojí obvod při první poruše do 0,4 s",
          spravna: false,
          vysvetleni:
            "Při první poruše v síti IT se odpojení nevyžaduje. Hlídač sleduje stav izolace, aby se první porucha odhalila dřív, než nastane druhá."
        },
        {
          id: "b",
          text: "Nahrazuje uzemnění neživých částí",
          spravna: false,
          vysvetleni:
            "Neživé části jsou v síti IT uzemněné samostatně (druhé písmeno T). Hlídač nic neuzemňuje, sleduje stav izolace."
        },
        {
          id: "c",
          text: "Odhalí první poruchu dřív, než nastane druhá",
          spravna: true,
          vysvetleni:
            "Správně. Hlídač izolačního stavu sleduje stav izolace, aby se první porucha odhalila dřív, než nastane druhá (ČSN 33 2000-4-41 ed. 3, čl. 411.6); ověřit v normě."
        },
        {
          id: "d",
          text: "Měří impedanci poruchové smyčky",
          spravna: false,
          vysvetleni:
            "Impedance poruchové smyčky se měří při revizi, aby se ověřilo odpojení v předepsané době. Hlídač izolačního stavu sleduje stav izolace."
        }
      ],
      shrnuti: "Hlídač izolačního stavu odhalí první poruchu dřív, než přijde druhá.",
      fakta: ["K7-11", "K7-10", "K7-01", "K9-11"]
    },
    {
      id: "k7-q10",
      kapitola: K,
      podtema: "tt-it",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Na lince napájené ze sítě IT hlásí hlídač izolačního stavu poruchu. Linka běží dál a mistr chce poruchu řešit až o celozávodní dovolené za dva měsíce. Co mu řeknete?",
      moznosti: [
        {
          id: "a",
          text: "Linka smí běžet, ale poruchu je třeba najít hned",
          spravna: true,
          vysvetleni:
            "Správně. Při první poruše je proud malý a odpojení se nevyžaduje. Hlídač ji ale hlásí proto, aby se porucha odhalila dřív, než nastane druhá."
        },
        {
          id: "b",
          text: "Linku je nutné odpojit nejpozději do 0,4 s",
          spravna: false,
          vysvetleni:
            "Odpojení se při první poruše v síti IT nevyžaduje; 0,4 s je doba pro koncové obvody sítě TN. Poruchu je ale potřeba odhalit dřív, než nastane druhá."
        },
        {
          id: "c",
          text: "Mistr má pravdu, v síti IT porucha nevadí",
          spravna: false,
          vysvetleni:
            "Porucha vadí: hlídač ji hlásí proto, aby se odhalila dřív, než nastane druhá. Odpojení se jen při první poruše nevyžaduje."
        },
        {
          id: "d",
          text: "Hlídač je lepší vyřadit, aby nerušil výrobu",
          spravna: false,
          vysvetleni:
            "Hlídač izolačního stavu je v síti IT proto, aby se první porucha odhalila dřív, než nastane druhá. Vyřadit ho by šlo proti jeho účelu."
        }
      ],
      shrnuti: "První porucha v síti IT nevypíná, ale musí se najít dřív, než přijde druhá.",
      fakta: ["K7-10", "K7-11", "K6-02"]
    },

    // ───────── Značení vodičů ─────────
    {
      id: "k7-q11",
      kapitola: K,
      podtema: "znaceni",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jakou barvu izolace má střední vodič N?",
      moznosti: [
        {
          id: "a",
          text: "Zelenožlutou",
          spravna: false,
          vysvetleni: "Zelenožlutá je vyhrazena pro ochranné vodiče. Střední vodič N má izolaci světle modrou."
        },
        {
          id: "b",
          text: "Světle modrou",
          spravna: true,
          vysvetleni:
            "Správně. Ochranný vodič PE je zelenožlutý, střední vodič N světle modrý a fázové vodiče hnědé, černé a šedé (ČSN 33 0165 ed. 2)."
        },
        {
          id: "c",
          text: "Šedou",
          spravna: false,
          vysvetleni: "Šedá je spolu s hnědou a černou barvou fázových vodičů. Střední vodič N má izolaci světle modrou."
        },
        {
          id: "d",
          text: "Černou",
          spravna: false,
          vysvetleni: "Černá patří fázovým vodičům. Střední vodič N má izolaci světle modrou."
        }
      ],
      shrnuti: "PE zelenožlutá, N světle modrá, fázové vodiče hnědá, černá a šedá.",
      fakta: ["K7-04", "K7-05"]
    },
    {
      id: "k7-q12",
      kapitola: K,
      podtema: "znaceni",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Jaké barvy žil má pětižilový kabel se zelenožlutou žílou?",
      moznosti: [
        {
          id: "a",
          text: "Zelenožlutá, modrá, hnědá, černá a červená",
          spravna: false,
          vysvetleni:
            "Červenou žílu tento kabel nemá. Fázové žíly jsou hnědá, černá a šedá, k nim zelenožlutá a modrá."
        },
        {
          id: "b",
          text: "Zelenožlutá, modrá a tři černé",
          spravna: false,
          vysvetleni:
            "Fázové žíly se od sebe liší barvou: hnědá, černá a šedá. Kabel má žíly zelenožlutou, modrou, hnědou, černou a šedou."
        },
        {
          id: "c",
          text: "Dvě zelenožluté, hnědá, černá a šedá",
          spravna: false,
          vysvetleni:
            "Druhá zelenožlutá žíla v kabelu není. Pátou žílou je modrá pro střední vodič."
        },
        {
          id: "d",
          text: "Zelenožlutá, modrá, hnědá, černá a šedá",
          spravna: true,
          vysvetleni:
            "Správně. Pětižilový kabel se zelenožlutou žílou má žíly zelenožlutou, modrou, hnědou, černou a šedou (ČSN 33 0166 ed. 2, tabulka 1)."
        }
      ],
      shrnuti: "Pětižilový kabel: zelenožlutá, modrá, hnědá, černá a šedá žíla.",
      fakta: ["K7-07", "K7-04"]
    },
    {
      id: "k7-q13",
      kapitola: K,
      podtema: "znaceni",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Při prohlídce rozvodnice zjistíte, že montér použil zelenožlutý vodič jako fázový přívod k zásuvce, protože mu došla hnědá. Jak to posoudíte?",
      moznosti: [
        {
          id: "a",
          text: "Nevadí to, pokud konce vodiče označí hnědě",
          spravna: false,
          vysvetleni:
            "Označení konců to nenapraví. Kombinace zelené a žluté je vyhrazena pro ochranné vodiče a k jinému účelu se použít nesmí."
        },
        {
          id: "b",
          text: "Nevadí to, barva fázového vodiče není předepsaná",
          spravna: false,
          vysvetleni:
            "Barvy předepsané jsou: fázové vodiče hnědá, černá a šedá. Zelenožlutá je vyhrazena pro ochranné vodiče."
        },
        {
          id: "c",
          text: "Je to závada, zelenožlutá je jen pro ochranné vodiče",
          spravna: true,
          vysvetleni:
            "Správně. Kombinace zelené a žluté je vyhrazena pro ochranné vodiče a nesmí se použít k jinému účelu (ČSN 33 0165 ed. 2). Označení vodičů se kontroluje při prohlídce."
        },
        {
          id: "d",
          text: "Je to závada, fázový vodič musí být vždy černý",
          spravna: false,
          vysvetleni:
            "Fázové vodiče mohou být hnědé, černé i šedé. Závadou je použití zelenožluté barvy, která patří jen ochranným vodičům."
        }
      ],
      shrnuti: "Zelenožlutý vodič smí být jen ochranný – nikdy fázový ani střední.",
      fakta: ["K7-05", "K7-04", "K9-02"]
    },

    // ───────── Vodič PEN ─────────
    {
      id: "k7-q14",
      kapitola: K,
      podtema: "pen",
      typ: "vyber",
      obtiznost: 1,
      zadani: "Jak se značí vodič PEN?",
      moznosti: [
        {
          id: "a",
          text: "Světle modře v celé délce, bez dalšího značení",
          spravna: false,
          vysvetleni:
            "Světle modrý vodič bez dalšího značení je střední vodič N. PEN se značí zelenožlutě se světle modrými značkami na koncích, nebo světle modře se zelenožlutými značkami."
        },
        {
          id: "b",
          text: "Zelenožlutě se světle modrými značkami na koncích",
          spravna: true,
          vysvetleni:
            "Správně. Vodič PEN se značí zelenožlutě se světle modrými značkami na koncích, nebo světle modře se zelenožlutými značkami na koncích."
        },
        {
          id: "c",
          text: "Zelenožlutě v celé délce, bez dalšího značení",
          spravna: false,
          vysvetleni:
            "Zelenožlutý vodič bez dalšího značení je ochranný vodič PE. U vodiče PEN přibývají světle modré značky na koncích."
        },
        {
          id: "d",
          text: "Hnědě se zelenožlutými značkami na koncích",
          spravna: false,
          vysvetleni:
            "Hnědá je barva fázových vodičů. PEN se značí zelenožlutě se světle modrými značkami na koncích, nebo světle modře se zelenožlutými značkami."
        }
      ],
      shrnuti: "PEN: zelenožlutý se světle modrými konci, nebo světle modrý se zelenožlutými konci.",
      fakta: ["K7-06", "K7-04"]
    },
    {
      id: "k7-q15",
      kapitola: K,
      podtema: "pen",
      typ: "vyber",
      obtiznost: 2,
      zadani: "Která funkce má přednost, plní-li vodič funkci ochranného i středního vodiče?",
      moznosti: [
        {
          id: "a",
          text: "Funkce středního vodiče",
          spravna: false,
          vysvetleni: "Je to naopak. U vodiče PEN má přednost funkce ochranná."
        },
        {
          id: "b",
          text: "Obě funkce jsou rovnocenné",
          spravna: false,
          vysvetleni: "Funkce rovnocenné nejsou. Přednost má funkce ochranná (ČSN 33 2000-5-54 ed. 3)."
        },
        {
          id: "c",
          text: "Ta, kterou určí projektant",
          spravna: false,
          vysvetleni:
            "Přednost neurčuje projektant. Má-li vodič funkci ochranného i středního vodiče, přednost má funkce ochranná."
        },
        {
          id: "d",
          text: "Funkce ochranného vodiče",
          spravna: true,
          vysvetleni:
            "Správně. Má-li vodič funkci ochranného i středního vodiče (PEN), má přednost funkce ochranná; údaj ověřit v normě."
        }
      ],
      shrnuti: "U vodiče PEN má přednost funkce ochranná.",
      fakta: ["K7-08"]
    },
    {
      id: "k7-q16",
      kapitola: K,
      podtema: "pen",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "V objektu se vodič PEN rozděluje v hlavním rozvaděči na PE a N. Elektrikář v podružném rozvaděči znovu propojil svorkovnici N se svorkovnicí PE, protože „je to stejně jeden vodič“. Co platí?",
      moznosti: [
        {
          id: "a",
          text: "Je to správně, oba vodiče vycházejí z jednoho PEN",
          spravna: false,
          vysvetleni: "Za místem rozdělení vodiče PEN se vodiče N a PE už nesmějí znovu spojit."
        },
        {
          id: "b",
          text: "Je to správně, pokud se propojka označí zelenožlutě",
          spravna: false,
          vysvetleni: "Barva propojky nic nemění. Za místem rozdělení PEN se vodiče N a PE znovu spojit nesmějí."
        },
        {
          id: "c",
          text: "Je to chyba, za rozdělením se N a PE spojit nesmějí",
          spravna: true,
          vysvetleni:
            "Správně. Vodič PEN se rozděluje na ochranný vodič PE a střední vodič N a za místem rozdělení se už nesmějí znovu spojit (ČSN 33 2000-5-54 ed. 3); ověřit v normě."
        },
        {
          id: "d",
          text: "Je to chyba, PEN se smí rozdělit jen u spotřebiče",
          spravna: false,
          vysvetleni:
            "Problém není v tom, že se PEN rozděluje v hlavním rozvaděči. Chybou je, že se za místem rozdělení vodiče N a PE znovu spojily."
        }
      ],
      shrnuti: "Za místem rozdělení PEN se vodiče N a PE už nikdy znovu nespojují.",
      fakta: ["K7-03", "K7-01"]
    },
    {
      id: "k7-q17",
      kapitola: K,
      podtema: "pen",
      typ: "vyber",
      obtiznost: 3,
      zadani:
        "Montér chce do vodiče PEN vložit samostatný jednopólový jistič, aby mohl PEN při údržbě odpojit. Jak rozhodnete?",
      moznosti: [
        {
          id: "a",
          text: "Nepovolíte, PEN se nesmí samostatně jistit ani spínat",
          spravna: true,
          vysvetleni:
            "Správně. Ochranný vodič PE ani vodič PEN se nesmí samostatně jistit ani spínat (ČSN 33 2000-5-54 ed. 3); ověřit v normě."
        },
        {
          id: "b",
          text: "Povolíte, pokud se jistič označí zelenožlutě",
          spravna: false,
          vysvetleni:
            "Označení to nenapraví. Ochranný vodič PE ani vodič PEN se nesmí samostatně jistit ani spínat."
        },
        {
          id: "c",
          text: "Povolíte, pokud jistič vypíná jen při údržbě",
          spravna: false,
          vysvetleni: "Účel na tom nic nemění. Vodič PEN se stejně jako PE nesmí samostatně jistit ani spínat."
        },
        {
          id: "d",
          text: "Povolíte, PEN je hlavně střední vodič",
          spravna: false,
          vysvetleni:
            "U vodiče PEN má přednost funkce ochranná, ne funkce středního vodiče. A samostatně se jistit ani spínat nesmí."
        }
      ],
      shrnuti: "Ochranný vodič PE ani vodič PEN se samostatně nejistí ani nespíná.",
      fakta: ["K7-12", "K7-08"]
    }
  ]
};

export default obsah;
