'use client'

import { useState } from 'react'
import Image from 'next/image'
import { projects } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'

const ORDER = [
  'simulasi-cpns',
  'keuangan-app',
  'koperasihub',
  'keuangan-santri',
  'photo-booth',
  'tpq-finance',
  'santriflow',
  'jobflow',
  'content-generator',
  'url-shortener',
]

const ordered = ORDER.map((id) => projects.find((p) => p.id === id)).filter(
  (p): p is (typeof projects)[number] => Boolean(p),
)

function ProjectShot({ id, title, live }: { id: string; title: string; live: string }) {
  const [error, setError] = useState(false)

  return (
    <div className="browser-frame">
      <div className="browser-frame-bar">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#D96B5B]" />
          <span className="h-2 w-2 rounded-full bg-[#D9B45B]" />
          <span className="h-2 w-2 rounded-full bg-[#7BA05B]" />
        </span>
        <span className="flex-1 text-center font-mono text-[9px] text-muted truncate px-2">
          {live !== '#' ? live.replace('https://', '') : `github.com/fiilmudhori26/${id}`}
        </span>
      </div>
      {!error ? (
        <Image
          src={`/shots/${id}.png`}
          alt={`Screenshot of ${title}`}
          width={1280}
          height={800}
          className="w-full aspect-[16/10] object-cover object-top"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full aspect-[16/10] flex flex-col items-center justify-center gap-4 p-6 text-center bg-ink text-paper">
          <span className="label-mono !text-[9px] text-paper/60">Source code only</span>
          <p className="font-display font-black italic text-3xl sm:text-4xl leading-[0.95] tracking-[-0.03em] text-paper">{title}</p>
          <p className="label-mono !text-[10px] text-paper/80">Buka repo di GitHub · bukan deploy publik</p>
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="work" data-section-index="1" ref={ref} className="relative bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Section header ─────────────────────────── */}
        <div className="rule-top pt-6 flex items-end justify-between gap-6 flex-wrap pb-4">
          <div>
            <p className="label-mono">N°02 — Work</p>
            <h2 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl text-ink mt-3">
              Karya<br /><em className="italic font-light">nyata.</em>
            </h2>
          </div>
          <p className="label-mono !text-[9px] sm:!text-[10px] max-w-[13rem] leading-relaxed text-right hidden sm:block">
            {ordered.length} proyek live · diurutkan dari yang paling kuat
          </p>
        </div>

        {/* ── Case studies ───────────────────────────── */}
        {ordered.map((p, i) => {
          const flip = i % 2 === 1
          const num = String(i + 1).padStart(2, '0')
          return (
            <article
              key={p.id}
              className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'} grid grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 border-t border-line items-center`}
              style={{ transitionDelay: '80ms' }}
            >
              {/* Kolom teks */}
              <div className={`col-span-12 md:col-span-4 ${flip ? 'md:order-2' : ''}`}>
                <p className="font-display font-black leading-none text-6xl md:text-7xl text-accent/90 tracking-[-0.04em]">{num}</p>
                <h3 className="font-display italic font-black tracking-[-0.02em] leading-[0.98] text-3xl sm:text-4xl lg:text-5xl text-ink mt-4">
                  {p.title}
                </h3>
                <p className="label-mono mt-3">{p.tagline}</p>
                <p className="text-sm text-ink leading-relaxed mt-4">{p.overview}</p>

                <ul className="flex flex-wrap gap-x-2 gap-y-2 mt-5">
                  {p.tech.map((t) => (
                    <li key={t} className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink border border-line rounded-full px-2.5 py-1">
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex flex-wrap items-center gap-6">
                  {p.live !== '#' && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Live: ${p.title}`} className="link-editorial font-mono text-xs uppercase tracking-[0.14em] no-underline font-medium">
                      Lihat live →
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`Code: ${p.title}`} className="link-editorial font-mono text-xs uppercase tracking-[0.14em] no-underline font-medium">
                    Code →
                  </a>
                </p>
              </div>

              {/* Kolom gambar */}
              <figure className={`col-span-12 md:col-span-8 ${flip ? 'md:order-1' : ''}`}>
                <ProjectShot id={p.id} title={p.title} live={p.live} />
                <figcaption className="label-mono !text-[9px] mt-3">
                  Gambar {num} — {p.id}{p.live !== '#' ? ` · live di ${p.live.replace('https://', '')}` : ' · source di GitHub'}
                </figcaption>
              </figure>
            </article>
          )
        })}
      </div>
    </section>
  )
}
