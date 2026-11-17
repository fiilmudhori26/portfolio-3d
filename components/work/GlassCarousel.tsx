'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import WorkCard from './WorkCard'
import TypeCard from './TypeCard'
import type { projects } from '@/lib/data'

type Project = (typeof projects)[number]

/* Mapping shot → project. Shots tersedia di /public/shots — hanya id yang
   punya file yang dipetakan; sisanya jatuh ke TypeCard. */
const SHOTS: Record<string, string> = {
  'simulasi-cpns': '/shots/simulasi-cpns.png',
  'keuangan-app': '/shots/keuangan-app.png',
  koperasihub: '/shots/koperasihub.png',
  'keuangan-santri': '/shots/keuangan-santri.png',
  'photo-booth': '/shots/photo-booth.png',
  'tpq-finance': '/shots/tpq-finance.png',
  santriflow: '/shots/santriflow.png',
  'content-generator': '/shots/content-generator.png',
}

/* Kartu tipografis untuk proyek tanpa screenshot */
const TYPE_CARDS: Record<string, { monogram: string; accentLine: string }> = {
  jobflow: { monogram: 'JF', accentLine: 'NEXT.JS · PRISMA · NEXTAUTH' },
  'url-shortener': { monogram: 'US', accentLine: 'API — FASTIFY · ZOD · VITEST' },
}

const DESKTOP_CARD_W = 600
const DESKTOP_SPACING = 400

function ChevronIcon({ dir, className }: { dir: 'left' | 'right'; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {dir === 'left' ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  )
}

export default function GlassCarousel({ items }: { items: Project[] }) {
  const reduce = useReducedMotion()
  const total = items.length
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [carouselH, setCarouselH] = useState(560)

  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const suppressClick = useRef(false)

  const active = items[index]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  /* Ukur tinggi kartu tertinggi agar area 3D stabil (desktop) */
  useEffect(() => {
    if (isMobile) return
    const track = trackRef.current
    if (!track) return
    const children = Array.from(track.children) as HTMLElement[]
    const measure = () => {
      const max = children.reduce((acc, el) => Math.max(acc, el.offsetHeight), 0)
      if (max > 0) setCarouselH(max)
    }
    measure()
    const ro = new ResizeObserver(measure)
    children.forEach((el) => ro.observe(el))
    return () => ro.disconnect()
  }, [isMobile])

  const goTo = useCallback(
    (i: number) => setIndex(Math.min(total - 1, Math.max(0, i))),
    [total],
  )
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  const openLive = useCallback((p: Project) => {
    if (p.live === '#') return
    window.open(p.live, '_blank', 'noopener,noreferrer')
  }, [])

  const handleSelect = useCallback(
    (i: number) => {
      if (suppressClick.current) return
      if (i === index) {
        if (items[i].live !== '#') openLive(items[i])
        return
      }
      setIndex(i)
    },
    [index, items, openLive],
  )

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x
    if (Math.abs(offset) > 8) suppressClick.current = true
    if (offset <= -64) next()
    else if (offset >= 64) prev()
    window.setTimeout(() => {
      suppressClick.current = false
    }, 120)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'Home') {
      e.preventDefault()
      goTo(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      goTo(total - 1)
    }
  }

  /* Mode mobile: kartu scroll ke tengah saat panah ditekan */
  const scrollCardIntoView = (i: number) => {
    const container = scrollRef.current
    const child = container?.children[i] as HTMLElement | undefined
    if (!container || !child) return
    const containerRect = container.getBoundingClientRect()
    const childRect = child.getBoundingClientRect()
    const left =
      childRect.left - containerRect.left + container.scrollLeft - (container.clientWidth - child.offsetWidth) / 2
    container.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }

  const handleArrow = (dir: 'prev' | 'next') => {
    if (isMobile) {
      const target = dir === 'prev' ? Math.max(0, index - 1) : Math.min(total - 1, index + 1)
      scrollCardIntoView(target)
      setIndex(target)
      return
    }
    if (dir === 'prev') prev()
    else next()
  }

  const handleMobileScroll = () => {
    const container = scrollRef.current
    const first = container?.children[0] as HTMLElement | undefined
    if (!container || !first) return
    const step = first.offsetWidth + 16
    if (step <= 0) return
    const idx = Math.round(container.scrollLeft / step)
    const clamped = Math.min(total - 1, Math.max(0, idx))
    if (clamped !== index) setIndex(clamped)
  }

  const renderCard = (p: Project, i: number, softBlur: boolean) => {
    const isActive = i === index
    const shared = {
      project: p,
      index: i,
      total,
      active: isActive,
      softBlur,
      onActivate: () => handleSelect(i),
      onOpenLive: () => openLive(p),
    }
    const shot = SHOTS[p.id]
    if (shot) return <WorkCard key={p.id} {...shared} shot={shot} />
    const type = TYPE_CARDS[p.id] ?? {
      monogram: p.title.slice(0, 2).toUpperCase(),
      accentLine: p.tech.slice(0, 3).join(' · ').toUpperCase(),
    }
    return <TypeCard key={p.id} {...shared} monogram={type.monogram} accentLine={type.accentLine} />
  }

  const atStart = index === 0
  const atEnd = index === total - 1

  return (
    <div>
      {/* ── Carousel ─────────────────────────────── */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Karya pilihan"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="outline-offset-4"
      >
        {isMobile ? (
          /* < md — scroll-snap native, peek 82vw */
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] pb-1 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ touchAction: 'pan-x pan-y' }}
          >
            {items.map((p, i) => (
              <div key={p.id} className="w-[82vw] shrink-0 snap-center">
                {renderCard(p, i, true)}
              </div>
            ))}
          </div>
        ) : (
          /* ≥ md — 3D coverflow: perspective + rotateY + spring snap.
             touchAction pan-y: drag x hanya mengubah slide, scroll vertikal halaman tidak dibajak. */
          <motion.div
            ref={trackRef}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={handleDragEnd}
            className="relative w-full cursor-grab transition-[height] duration-300 active:cursor-grabbing"
            style={{ height: carouselH, perspective: '1200px', touchAction: 'pan-y' }}
          >
            {items.map((p, i) => {
              const offset = i - index
              const abs = Math.abs(offset)
              const visible = abs <= 2
              return (
                <motion.div
                  key={p.id}
                  className="absolute top-0"
                  style={{
                    left: '50%',
                    width: DESKTOP_CARD_W,
                    marginLeft: -DESKTOP_CARD_W / 2,
                    zIndex: 30 - abs,
                    visibility: visible ? 'visible' : 'hidden',
                  }}
                  animate={{
                    x: offset * DESKTOP_SPACING,
                    rotateY: offset === 0 ? 0 : offset < 0 ? 18 : -18,
                    scale: abs === 0 ? 1 : 0.92,
                    opacity: abs === 0 ? 1 : 0.75,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 260, damping: 30 }
                  }
                >
                  <motion.div
                    animate={{
                      filter:
                        abs === 0 ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.82)',
                    }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                  >
                    {renderCard(p, i, false)}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>

      {/* ── Counter + caption + panah ──────────────── */}
      <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        {/* Caption kartu aktif — crossfade 200ms, mini case-study */}
        <div className="min-h-[9.5rem] max-w-xl flex-1" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: 'easeOut' }}
            >
              <p className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
                {active.title}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {active.tagline}
              </p>
              <dl className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted">
                <div className="flex gap-2">
                  <dt className="label-mono !text-[8px] pt-0.5 w-14 shrink-0 text-muted">Masalah</dt>
                  <dd className="line-clamp-2">{active.problem}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="label-mono !text-[8px] pt-0.5 w-14 shrink-0 text-accent">Solusi</dt>
                  <dd className="line-clamp-2">{active.solution}</dd>
                </div>
                {active.impact ? (
                  <div className="flex gap-2">
                    <dt className="label-mono !text-[8px] pt-0.5 w-14 shrink-0 text-accent">Dampak</dt>
                    <dd className="line-clamp-2">{active.impact}</dd>
                  </div>
                ) : null}
              </dl>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Teknologi">
                {active.tech.slice(0, 3).map((t) => (
                  <li
                    key={t}
                    className="rounded-[6px] border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter mono + progress + panah */}
        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <div className="flex flex-col items-end gap-2">
            <p
              aria-hidden="true"
              className="font-mono text-sm tabular-nums tracking-[0.2em] text-ink"
            >
              {String(index + 1).padStart(2, '0')}
              <span className="text-muted"> / {String(total).padStart(2, '0')}</span>
            </p>
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={index + 1}
              aria-label="Progres karya"
              className="h-[2px] w-32 overflow-hidden bg-ink/10 sm:w-44"
            >
              <div
                className="h-full bg-accent transition-[width] duration-300 ease-out"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => handleArrow('prev')}
              disabled={atStart}
              aria-label="Karya sebelumnya"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-accent hover:text-accent-deep disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ink/20 disabled:hover:text-ink"
            >
              <ChevronIcon dir="left" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleArrow('next')}
              disabled={atEnd}
              aria-label="Karya berikutnya"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-accent hover:text-accent-deep disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ink/20 disabled:hover:text-ink"
            >
              <ChevronIcon dir="right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
