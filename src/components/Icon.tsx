// Ikony jako inline SVG (žádná ikonová knihovna). Tah 2 px, barva podle currentColor.
import type { ReactNode } from "react";

const CESTY = {
  zpet: <polyline points="15 18 9 12 15 6" />,
  vpred: <polyline points="9 18 15 12 9 6" />,
  sipkaVpravo: <path d="M5 12h14M13 6l6 6-6 6" />,
  sipkaVlevo: <path d="M19 12H5M11 6l-6 6 6 6" />,
  spravne: <polyline points="20 6 9 17 4 12" />,
  spatne: <path d="M18 6 6 18M6 6l12 12" />,
  pozor: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 16v-4.5M12 8h.01" />
    </>
  ),
  nauka: (
    <>
      <path d="M2 4.5h6a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z" />
      <path d="M22 4.5h-6a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h7z" />
    </>
  ),
  procvic: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  test: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2.5h6V4M9 13l2 2 4-4" />
    </>
  ),
  zamek: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  hvezda: <polygon points="12 2.5 15 8.6 21.6 9.5 16.8 14.1 18 20.7 12 17.5 6 20.7 7.2 14.1 2.4 9.5 9 8.6" />,
  domu: (
    <>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  slunce: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  mesic: <path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a6.5 6.5 0 0 0 10 10z" />,
  system: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </>
  ),
  smazat: <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />,
  zdroj: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </>
  ),
  blesk: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  obnovit: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  ilustrace: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 15l5-5 4 4 3-3 6 6" />
    </>
  ),
  start: <polygon points="7 4.5 19.5 12 7 19.5" fill="currentColor" />,
  stop: <rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  zvuk: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  ticho: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    </>
  )
} satisfies Record<string, ReactNode>;

export type NazevIkony = keyof typeof CESTY;

interface Props {
  nazev: NazevIkony;
  size?: number;
  className?: string;
  /** Vyplněná varianta (hvězdička). */
  plna?: boolean;
  /** Text pro čtečky; bez něj je ikona jen dekorace. */
  title?: string;
}

export function Icon({ nazev, size = 20, className, plna = false, title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={plna ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {CESTY[nazev]}
    </svg>
  );
}
