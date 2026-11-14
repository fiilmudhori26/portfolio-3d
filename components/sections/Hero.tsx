'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { personalInfo, projects } from '@/lib/data'

const EASE = [0.22, 1, 0.36, 1] as const
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const marqueeItems = projects.map((p) => p.title)

const stats = [
  { target: 10, suffix: '+', label: 'Proyek live' },
  { target: 4, suffix: '+', label: 'Tahun ngoding' },
  { target: 30, suffix: '', label: 'Juz dihafal' },
  { target: 100, suffix: '%', label: 'Bespoke' },
]

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  // SSR & first paint render the final value. Saat masuk viewport, reset ke 0 sinkron (layout effect) lalu count-up — SSR/first paint tetap render nilai final.
  const [display, setDisplay] = useState(target)

  useIsoLayoutEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(target)
      return
    }
    setDisplay(0)
    const controls = animate(0, target, {
      duration: 1.15,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, target])

  return (
    <div ref={ref} className="px-5 sm:px-8 py-6 sm:py-8">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display font-black tracking-[-0.03em] text-5xl sm:text-6xl text-ink tabular-nums">
        {display}
        {suffix}
      </dd>
      <dd className="label-mono !text-[9px] mt-2">{label}</dd>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const finePointer = useRef(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springCfg = { stiffness: 130, damping: 22, mass: 0.6 }
  const rotate = useSpring(useTransform(mx, (v) => -2 + v * 3), springCfg)
  const photoX = useSpring(useTransform(mx, (v) => v * 14), springCfg)
  const photoY = useSpring(useTransform(my, (v) => v * 14), springCfg)

  useEffect(() => {
    finePointer.current = window.matchMedia('(pointer: fine)').matches
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !finePointer.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="about"
      data-section-index="0"
      className="relative bg-paper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-24 md:pt-28">
        {/* ── Grid utama ─────────────────────────────── */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <motion.p
              className="label-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.35 }}
            >
              Full-stack developer · Jember, Jawa Timur
            </motion.p>

            <h1 className="font-display font-black leading-[0.93] tracking-[-0.03em] text-[clamp(4rem,11vw,8.5rem)] text-ink mt-5">
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.em
                  className="block italic font-light will-change-transform"
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 1.4 }}
                >
                  Santri.
                </motion.em>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block will-change-transform"
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 1.52 }}
                >
                  Developer<span className="text-accent">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="mt-7 text-lg md:text-xl leading-snug text-ink max-w-md"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.62 }}
            >
              Saya membangun produk web dari skema database sampai deploy — untuk pesantren, UMKM, dan siapa pun yang butuh situs yang benar-benar jalan.
            </motion.p>
          </div>

          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex lg:justify-end lg:items-end">
            <motion.figure
              className="border border-ink bg-card rounded-2xl p-2 w-60 sm:w-72 lg:w-80 shadow-[6px_6px_0_rgba(28,26,23,0.12)]"
              style={{ rotate, x: photoX, y: photoY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.45 }}
            >
              <Image
                src={personalInfo.avatar || '/images/profile.png'}
                alt="Potret Rahmad Akbar"
                width={640}
                height={800}
                priority
                className="w-full aspect-[4/5] object-cover object-top rounded-xl"
              />
              <figcaption className="label-mono !text-[9px] text-center py-2.5">
                Potret — Rahmad Akbar
              </figcaption>
            </motion.figure>
          </div>
        </div>

        {/* ── Info terbitan ───────────────────────────── */}
        <div className="border-t border-b border-line mt-10 py-2.5 flex items-center justify-between gap-4">
          <p className="label-mono !text-[9px] sm:!text-[10px]">N° 001 · Jember, Jawa Timur · Indonesia · Est. 2026</p>
          <a href="#work" className="label-mono !text-[9px] sm:!text-[10px] text-accent hover:text-accent-deep transition-colors no-underline">
            Lihat karya ↓
          </a>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────────── */}
      <div className="border-b border-line overflow-hidden py-3" aria-hidden="true">
        <div className="animate-marquee hover:[animation-play-state:paused] whitespace-nowrap flex w-max">
          {[...marqueeItems, ...marqueeItems].map((name, i) => (
            <span key={i} className="label-mono !text-[10px] text-muted mx-5">
              {name} <span className="text-accent ml-5">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────── */}
      <div className="border-b border-line">
        <dl className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {stats.map((s) => (
            <Stat key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
          ))}
        </dl>
      </div>
    </section>
  )
}
