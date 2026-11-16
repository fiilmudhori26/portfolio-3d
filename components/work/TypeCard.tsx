'use client'

import type { projects } from '@/lib/data'

type Project = (typeof projects)[number]

/* Aksen on-dark memakai token `accentOnDark` (#EBA87F) dari tailwind.config.ts.
   accent #B3402A kontrasnya ~2.9:1 di atas ink. Konstanta ini dipakai untuk
   inline style (-webkit-text-stroke) yang tidak punya utility Tailwind. */
const ACCENT_ON_DARK = '#EBA87F'

function ArrowTopRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58 0-.29-.01-1.24-.02-2.25-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5.1 18.3 5.1c.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export interface TypeCardProps {
  project: Project
  index: number
  total: number
  active: boolean
  softBlur?: boolean
  monogram: string
  accentLine: string
  onActivate: () => void
  onOpenLive: () => void
}

/**
 * Kartu tipografis untuk proyek tanpa screenshot — permukaan gelap ink,
 * pola garis diagonal hairline 45°, monogram Fraunces 900 dengan stroke
 * aksen, judul serif solid, tagline mono.
 */
export default function TypeCard({
  project,
  active,
  softBlur = false,
  monogram,
  accentLine,
  onActivate,
  onOpenLive,
}: TypeCardProps) {
  const canLive = project.live !== '#'
  const tabIndex = active ? 0 : -1

  return (
    <div
      role="button"
      aria-label={canLive ? `Buka live ${project.title} di tab baru` : `Tampilkan ${project.title}`}
      tabIndex={tabIndex}
      onClick={onActivate}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest('a,button')) return
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        onActivate()
      }}
      className={`print-invert w-full select-none overflow-hidden rounded-[20px] border outline-offset-4 transition-colors duration-200 ${
        active
          ? 'border-paper/25 bg-ink/90 shadow-[0_0_80px_var(--tw-shadow-color)] shadow-accent/35'
          : 'border-ink bg-ink/80'
      } ${softBlur ? 'backdrop-blur-md' : 'backdrop-blur-[18px]'}`}
    >
      {/* ── Panel tipografis ───────────────────────── */}
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden"
        style={{
          background:
            'repeating-linear-gradient(45deg, transparent 0px, transparent 14px, rgb(var(--paper-rgb) / 0.055) 14px, rgb(var(--paper-rgb) / 0.055) 15px)',
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-4 text-paper/35"
        >
          <ArrowTopRightIcon className="h-6 w-6" />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none select-none font-display font-black leading-none tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(4.5rem, 12vw, 7rem)',
            /* Stroke monogram non-aktif: paper (#FBF7EF) alpha 0.3 via --paper-rgb;
               aktif: ACCENT_ON_DARK (lihat konstanta di atas). */
            WebkitTextStroke: `1.5px ${active ? ACCENT_ON_DARK : 'rgb(var(--paper-rgb) / 0.3)'}`,
            color: 'transparent',
          }}
        >
          {monogram}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div className="bg-ink/60 p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-paper sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
          {project.tagline}
        </p>
        <p
          className={`mt-4 font-mono text-[10px] uppercase tracking-[0.22em] ${
            active ? 'text-accentOnDark' : 'text-paper/55'
          }`}
        >
          {accentLine}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-paper/10 pt-4">
          {canLive ? (
            <button
              type="button"
              tabIndex={tabIndex}
              aria-label={`Live: ${project.title}`}
              onClick={(e) => {
                e.stopPropagation()
                onOpenLive()
              }}
              className={`font-mono text-[10px] font-medium uppercase tracking-[0.2em] no-underline transition-colors duration-200 hover:text-paper ${
                active ? 'text-accentOnDark' : 'text-paper/60'
              }`}
            >
              Live ↗︎
            </button>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/70">
              Source only
            </span>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={tabIndex}
            aria-label={`GitHub: ${project.title}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="rounded-full border border-paper/20 p-2.5 text-paper/60 transition-colors duration-200 hover:border-accentOnDark/60 hover:text-paper"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
