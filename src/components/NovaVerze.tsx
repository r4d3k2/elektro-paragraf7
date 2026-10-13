// Registrace service workeru (vite-plugin-pwa, režim „prompt“) a hlášení pod horní lištou:
// „Je k dispozici nová verze – načíst“ a jednorázově „Aplikace funguje i offline“.
// Ve vývojovém serveru je registrace vypnutá (hook z vite-plugin-pwa nic nedělá).
import { useEffect, type ReactNode } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Icon, type NazevIkony } from "./Icon";

const HODINA = 60 * 60 * 1000;

export function NovaVerze() {
  const {
    needRefresh: [novaVerze, setNovaVerze],
    offlineReady: [offlinePripraveno, setOfflinePripraveno],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(_url, registrace) {
      if (!registrace) return;
      // Aplikace na ploše iPhonu zůstává dlouho v paměti: novou verzi hledat při návratu do aplikace
      // a pak každou hodinu (jen s připojením).
      const zkontroluj = () => {
        if (navigator.onLine) registrace.update().catch(() => {});
      };
      setInterval(zkontroluj, HODINA);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") zkontroluj();
      });
    }
  });

  // Hlášení o offline režimu po chvíli samo zmizí.
  useEffect(() => {
    if (!offlinePripraveno) return;
    const casovac = window.setTimeout(() => setOfflinePripraveno(false), 8000);
    return () => window.clearTimeout(casovac);
  }, [offlinePripraveno, setOfflinePripraveno]);

  if (novaVerze) {
    return (
      <Hlaseni ikona="obnovit" text="Je k dispozici nová verze" onZavrit={() => setNovaVerze(false)} popisZavrit="Později">
        <button
          type="button"
          onClick={() => void updateServiceWorker(true)}
          className="inline-flex min-h-11 items-center rounded-lg bg-primarni px-4 text-sm font-medium text-na-primarni hover:bg-primarni/90"
        >
          Načíst
        </button>
      </Hlaseni>
    );
  }
  if (offlinePripraveno) {
    return (
      <Hlaseni
        ikona="spravne"
        text="Aplikace je uložená v zařízení a funguje i bez připojení."
        onZavrit={() => setOfflinePripraveno(false)}
        popisZavrit="Zavřít"
      />
    );
  }
  return null;
}

interface HlaseniProps {
  ikona: NazevIkony;
  text: string;
  onZavrit: () => void;
  popisZavrit: string;
  children?: ReactNode;
}

function Hlaseni({ ikona, text, onZavrit, popisZavrit, children }: HlaseniProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top)+4rem)] z-30 px-3">
      <div
        role="status"
        className="pointer-events-auto mx-auto flex max-w-[616px] items-center gap-2 rounded-xl border border-primarni/40 bg-plocha py-1.5 pr-1.5 pl-3 shadow-lg"
      >
        <Icon nazev={ikona} size={20} className="shrink-0 text-primarni" />
        <p className="min-w-0 flex-1 text-sm font-medium">{text}</p>
        {children}
        <button
          type="button"
          onClick={onZavrit}
          aria-label={popisZavrit}
          title={popisZavrit}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-tlumeny hover:bg-plocha-2 hover:text-text"
        >
          <Icon nazev="spatne" size={18} />
        </button>
      </div>
    </div>
  );
}
