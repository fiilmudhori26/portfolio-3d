'use client'

import { useState } from 'react'
import Image from 'next/image'
import { projects, personalInfo } from '@/lib/data'
import { useFullpage } from '@/components/FullpageProvider'

const spotlight = projects.find((p) => p.id === 'keuangan-app') ?? projects[0]
const marqueeItems = projects.map((p) => p.title)

const heroStats = [
  { value: '10+', label: 'Projects shipped' },
  { value: '4+', label: 'Years building' },
  { value: '30', label: 'Juz Hafidz' },
  { value: '100%', label: 'Bespoke builds' },
]

export default function Hero() {
  const { goToSection } = useFullpage()
  const [shotError, setShotError] = useState(false)

  return (
    <section
      id="section-0"
      data-section-index="0"
      className="section-full !justify-start !overflow-hidden"
    >
      {/* ambient pink glow */}
      <div aria-hidden="true" className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,38,114,.16) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="absolute -bottom-52 -left-52 w-[40rem] h-[40rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,38,114,.07) 0%, transparent 65%)' }} />

      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center pt-14">
        {/* ── Left · copy ─────────────────────────────── */}
        <div>
          <p className="label-mono flex items-center gap-2.5 mb-6">
            <span className="relative inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink" />
            </span>
            Full-stack developer · Available for work
          </p>

          <h1 className="font-sans font-black uppercase text-foreground leading-[0.92] tracking-[-0.05em] text-[clamp(3.5rem,10vw,7.5rem)]">
            Web<br />Developer.
            <br />
            <span className="text-pink">Digital</span>
            <br />
            Marketer.
          </h1>

          <p className="mt-6 text-lg text-ink-2 max-w-md leading-snug">
            Santri Developer · Hafidz 30 Juz · Membangun solusi digital modern.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a href={`mailto:${personalInfo.email}`} className="btn btn-pink glow-pink">
              Book a Call
              <span aria-hidden="true">→</span>
            </a>
            <button onClick={() => goToSection(3)} className="btn btn-ghost">
              View My Work
            </button>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 max-w-xl">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-sans font-black text-3xl md:text-4xl tracking-[-0.04em] text-foreground">{s.value}</dd>
                <dd className="label-mono !text-[9px] mt-1.5 leading-relaxed">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right · recent build browser frame ─────── */}
        <div className="relative">
          <p className="label-mono mb-3 flex items-center justify-between">
            <span>Recent build — {spotlight.title}</span>
            <span className="inline-flex items-center gap-1.5 text-pink">
              <span className="h-1.5 w-1.5 rounded-full bg-pink inline-block" /> Live
            </span>
          </p>

          <a
            href={spotlight.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${spotlight.title} live site`}
            className="browser-frame block no-underline group glow-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
          >
            <div className="browser-frame-bar">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="flex-1 text-center font-mono text-[10px] text-ink-3 truncate px-2">
                {spotlight.live.replace('https://', '')}
              </span>
            </div>
            <div className="relative h-56 sm:h-64 lg:h-80 bg-surface overflow-hidden">
              {!shotError ? (
                <Image
                  src="/shots/keuangan-app.png"
                  alt={`Screenshot of ${spotlight.title} live site`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                  onError={() => setShotError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <p className="font-sans font-black text-3xl tracking-[-0.03em] text-foreground">{spotlight.title}</p>
                  <p className="label-mono">{spotlight.tagline}</p>
                </div>
              )}
            </div>
          </a>
          <p className="label-mono !text-[9px] mt-3 text-right">{spotlight.tagline}</p>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border overflow-hidden py-3" aria-hidden="true">
        <div className="animate-marquee whitespace-nowrap flex w-max">
          {[...marqueeItems, ...marqueeItems].map((name, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 mx-6">
              {name} <span className="text-pink ml-6">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
