// Stav připojení a offline režimu (PWA, Fáze 4).
import { useSyncExternalStore } from "react";

function prihlas(fn: () => void): () => void {
  window.addEventListener("online", fn);
  window.addEventListener("offline", fn);
  return () => {
    window.removeEventListener("online", fn);
    window.removeEventListener("offline", fn);
  };
}

/** true, když je zařízení podle prohlížeče připojené k síti. */
export function useOnline(): boolean {
  return useSyncExternalStore(prihlas, () => navigator.onLine, () => true);
}

function offlineAktivni(): boolean {
  try {
    return Boolean(navigator.serviceWorker?.controller);
  } catch {
    return false;
  }
}

function prihlasSW(fn: () => void): () => void {
  const sw = "serviceWorker" in navigator ? navigator.serviceWorker : undefined;
  sw?.addEventListener("controllerchange", fn);
  return () => sw?.removeEventListener("controllerchange", fn);
}

/** Řídí stránku service worker? Pak je aplikace uložená v zařízení a funguje i bez připojení. */
export function useOfflineAktivni(): boolean {
  return useSyncExternalStore(prihlasSW, offlineAktivni, () => false);
}
