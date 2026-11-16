'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { projects } from '@/lib/data'

type Project = (typeof projects)[number]

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

export interface WorkCardProps {
  project: Project
  index: number
  total: number
  active: boolean
  softBlur?: boolean
  shot: string
  onActivate: () => void
  onOpenLive: () => void
}

/**
 * Kartu proyek dengan screenshot — permukaan gelap (ink) sebagai jangkar
 * kontras di atas kertas krem. Chrome bar browser, screenshot 16/10
 * object-top, lalu area glass berisi judul serif, tagline mono,
 * chip tech, dan aksi Live / GitHub.
 */
export default function WorkCard({
  project,
  active,
  softBlur = false,
  shot,
  onActivate,
  onOpenLive,
}: WorkCardProps) {
  const [imgError, setImgError] = useState(false)
  const canLive = project.live !== '#'
  const liveHost = project.live.replace(/^https?:\/\//, '')
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
      {/* ── Browser chrome ─────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-2.5">
        {/* Dot chrome browser — warna macOS klasik (pola lama), sengaja dipertahankan:
            #D96B5B / #D9B45B / #7BA05B. */}
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#D96B5B]" />
          <span className="h-2 w-2 rounded-full bg-[#D9B45B]" />
          <span className="h-2 w-2 rounded-full bg-[#7BA05B]" />
        </span>
        <span className="flex-1 truncate text-center font-mono text-[9px] tracking-[0.06em] text-paper/55">
          {canLive ? liveHost : `github.com/fiilmudhori26/${project.id}`}
        </span>
      </div>

      {/* ── Screenshot ─────────────────────────────── */}
      {imgError ? (
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-black/40 p-6 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/70">
            Source code only
          </span>
          <p className="font-display text-3xl font-black italic leading-[0.95] tracking-[-0.03em] text-paper">
            {project.title}
          </p>
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
          <Image
            src={shot}
            alt={`Cuplikan proyek ${project.title}`}
            width={1280}
            height={800}
            sizes="(max-width: 768px) 82vw, 640px"
            className="h-full w-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {/* ── Body glass ─────────────────────────────── */}
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-paper sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Teknologi">
          {project.tech.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-[6px] border border-paper/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-paper/60 transition-colors duration-200 hover:border-accentOnDark/60 hover:text-paper"
            >
              {t}
            </li>
          ))}
        </ul>

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
