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

/* ── Skill icons ───────────────────────────────────────────── */

export const SKILL_ICONS: Record<string, () => JSX.Element> = {
  JavaScript: () => (
    <LineIcon>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 16.5v-6M9 13h3.5a2 2 0 0 1 0 4H9" />
    </LineIcon>
  ),
  TypeScript: () => (
    <LineIcon>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8.5 10h7M12 10v7" />
    </LineIcon>
  ),
  'Next.js': () => (
    <LineIcon>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 15.5L15 9.5M9.5 9.5v6M15 9.5v6" />
    </LineIcon>
  ),
  React: () => (
    <LineIcon>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </LineIcon>
  ),
  'Tailwind CSS': () => (
    <LineIcon>
      <path d="M4 10c1.5-2.5 3-2.5 4.5 0s3 2.5 4.5 0 3-2.5 4.5 0" />
      <path d="M4 15c1.5-2.5 3-2.5 4.5 0s3 2.5 4.5 0 3-2.5 4.5 0" />
    </LineIcon>
  ),
  'HTML/CSS': () => (
    <LineIcon>
      <path d="M8.5 8L4.5 12l4 4" />
      <path d="M15.5 8l4 4-4 4" />
      <path d="M13 6.5l-2 11" />
    </LineIcon>
  ),
  'Node.js': () => (
    <LineIcon>
      <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" />
      <path d="M9.5 10.5v3a2.5 2.5 0 0 0 5 0v-3" />
    </LineIcon>
  ),
  'Prisma ORM': () => (
    <LineIcon>
      <path d="M12 4l4.5 6-4.5 10L7.5 10z" />
      <path d="M9.5 12h5" />
    </LineIcon>
  ),
  Supabase: () => (
    <LineIcon>
      <path d="M13.5 3L7 14h4.5L10 21l7-11h-4.5z" />
    </LineIcon>
  ),
  Fastify: () => (
    <LineIcon>
      <path d="M14.5 2L6.5 14.5H11L9 22l9-13h-4.5z" />
    </LineIcon>
  ),
  Git: () => (
    <LineIcon>
      <circle cx="7" cy="7" r="2.25" />
      <circle cx="7" cy="17" r="2.25" />
      <circle cx="17" cy="10" r="2.25" />
      <path d="M7 9.25v5.5" />
      <path d="M7 9.25c0 3.6 2 4.4 5.5 4.4h2.2" />
    </LineIcon>
  ),
  GitHub: () => (
    <LineIcon>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </LineIcon>
  ),
  Vercel: () => (
    <LineIcon>
      <path d="M12 4l9 15.5H3z" />
    </LineIcon>
  ),
  'VS Code': () => (
    <LineIcon>
      <path d="M8 8l-4.5 4 4.5 4" />
      <path d="M16 8l4.5 4-4.5 4" />
      <path d="M12.5 6.5l-1.5 11" />
    </LineIcon>
  ),
  'Excel/Sheets': () => (
    <LineIcon>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 10h16" />
      <path d="M4 15h16" />
      <path d="M10 4v16" />
      <path d="M15 4v16" />
    </LineIcon>
  ),
  SEO: () => (
    <LineIcon>
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5L20 20" />
    </LineIcon>
  ),
  'Content Planning': () => (
    <LineIcon>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="M8 14h3" />
    </LineIcon>
  ),
  'Content Writing': () => (
    <LineIcon>
      <path d="M12 3l3.5 5L12 21l-3.5-13z" />
      <path d="M12 9v6" />
    </LineIcon>
  ),
  Copywriting: () => (
    <LineIcon>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
      <path d="M5.5 15V5a1.5 1.5 0 0 1 1.5-1.5h10" />
    </LineIcon>
  ),
  'Social Media Strategy': () => (
    <LineIcon>
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="17" cy="6" r="2.2" />
      <circle cx="17" cy="18" r="2.2" />
      <path d="M8 11l7-4" />
      <path d="M8 13l7 4" />
    </LineIcon>
  ),
  Canva: () => (
    <LineIcon>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9.5" cy="10.5" r="1.4" />
      <path d="M14.5 13.5a3 3 0 0 0-4.5 2.5" />
    </LineIcon>
  ),
  CapCut: () => (
    <LineIcon>
      <circle cx="6.5" cy="7" r="2.4" />
      <circle cx="6.5" cy="17" r="2.4" />
      <path d="M9 8.4L20 16.5" />
      <path d="M9 15.6L20 7.5" />
    </LineIcon>
  ),
  Figma: () => (
    <LineIcon>
      <path d="M9.5 4h5M9.5 12h5M9.5 20h5" />
      <rect x="9.5" y="4" width="5" height="5" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1.5" />
      <rect x="9.5" y="15" width="5" height="5" rx="1.5" />
    </LineIcon>
  ),
}

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
