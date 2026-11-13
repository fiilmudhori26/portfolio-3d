import type { SVGProps } from 'react'

/**
 * Monochrome line icon system — single color (currentColor), stroke 1.75,
 * round caps/joins, fill none, viewBox 0 0 24 24.
 * PersonalMark may carry the accent color used for brand identity.
 */

type IconProps = SVGProps<SVGSVGElement>

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg {...base} {...props}>
      {children}
    </svg>
  )
}

/* ── Personal mark ─────────────────────────────────────────── */

export function PersonalMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.75" />
      <text
        x="12"
        y="12"
        dy="0.36em"
        textAnchor="middle"
        fontFamily="'Fraunces', serif"
        fontStyle="italic"
        fontWeight={900}
        fontSize="11"
        fill="currentColor"
        stroke="none"
      >
        RA
      </text>
    </svg>
  )
}

/* ── Section icons ─────────────────────────────────────────── */

export const SECTION_ICONS = {
  about: (
    <LineIcon>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 20c.9-4.2 3.6-6.3 6.5-6.3s5.6 2.1 6.5 6.3" />
    </LineIcon>
  ),
  work: (
    <LineIcon>
      <rect x="3.5" y="8" width="17" height="10.5" rx="2" />
      <path d="M9.5 8V6.5A2 2 0 0 1 11.5 4.5h1A2 2 0 0 1 14.5 6.5V8" />
      <path d="M3.5 13h17" />
    </LineIcon>
  ),
  skills: (
    <LineIcon>
      <path d="M12 3.6l2.2 5.3 5.3 2.2-5.3 2.2L12 18.6l-2.2-5.3L4.5 11.1l5.3-2.2z" />
    </LineIcon>
  ),
  journey: (
    <LineIcon>
      <path d="M6 20.5V4.5" />
      <path d="M6 5.5h11.5l-2.7 4 2.7 4H6" />
    </LineIcon>
  ),
  contact: (
    <LineIcon>
      <rect x="3.5" y="6.5" width="17" height="11" rx="2" />
      <path d="M4 7.5l8 5.6 8-5.6" />
    </LineIcon>
  ),
} as const

export type SectionIconKey = keyof typeof SECTION_ICONS

/* ── Project icons ─────────────────────────────────────────── */

export const PROJECT_ICONS: Record<string, JSX.Element> = {
  'simulasi-cpns': (
    <LineIcon>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none" />
    </LineIcon>
  ),
  'keuangan-app': (
    <LineIcon>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.4" />
    </LineIcon>
  ),
  koperasihub: (
    <LineIcon>
      <path d="M5 9l1.6-4.5h10.8L19 9" />
      <path d="M4.5 9h15V19a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19z" />
      <path d="M10 20.5v-5h4v5" />
    </LineIcon>
  ),
  'keuangan-santri': (
    <LineIcon>
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" />
      <path d="M12 6v12" />
    </LineIcon>
  ),
  'photo-booth': (
    <LineIcon>
      <rect x="3.5" y="7.5" width="17" height="11" rx="2" />
      <circle cx="12" cy="13" r="3.4" />
      <circle cx="7.5" cy="10.8" r=".8" fill="currentColor" stroke="none" />
    </LineIcon>
  ),
  'content-generator': (
    <LineIcon>
      <path d="M12 4l1.7 4.6L18.3 10l-4.6 1.7L12 16.3l-1.7-4.6L5.7 10l4.6-1.4z" />
      <path d="M18.5 15.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" />
    </LineIcon>
  ),
  'url-shortener': (
    <LineIcon>
      <path d="M10.2 13.8a3.8 3.8 0 0 0 5.4 0l2.7-2.7a3.8 3.8 0 0 0-5.4-5.4l-1.3 1.3" />
      <path d="M13.8 10.2a3.8 3.8 0 0 0-5.4 0l-2.7 2.7a3.8 3.8 0 0 0 5.4 5.4l1.3-1.3" />
    </LineIcon>
  ),
  'tpq-finance': (
    <LineIcon>
      <path d="M3 9.5L12 5l9 4.5-9 4.5z" />
      <path d="M6.5 11.5V16c0 1.4 2.4 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.5" />
    </LineIcon>
  ),
  santriflow: (
    <LineIcon>
      <path d="M4.5 11L12 4.5 19.5 11" />
      <path d="M6.5 9.5V20h11V9.5" />
      <path d="M10.3 20v-5h3.4v5" />
    </LineIcon>
  ),
  jobflow: (
    <LineIcon>
      <path d="M3.5 11.5L20.5 4.5l-5.6 15.5-3-6.7z" />
    </LineIcon>
  ),
}
