import Image from 'next/image'
import { personalInfo, projects } from '@/lib/data'

const marqueeItems = projects.map((p) => p.title)

const stats = [
  { value: '10+', label: 'Proyek live' },
  { value: '4+', label: 'Tahun ngoding' },
  { value: '30', label: 'Juz dihafal' },
  { value: '100%', label: 'Bespoke' },
]

export default function Hero() {
  return (
    <section id="about" data-section-index="0" className="relative bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-24 md:pt-28">
        {/* ── Grid utama ─────────────────────────────── */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <p className="label-mono">Full-stack developer · Jember, Jawa Timur</p>

            <h1 className="font-display font-black leading-[0.93] tracking-[-0.03em] text-[clamp(4rem,11vw,8.5rem)] text-ink mt-5">
              <em className="italic font-light">Santri.</em>
              <br />
              Developer<span className="text-accent">.</span>
            </h1>

            <p className="mt-7 text-lg md:text-xl leading-snug text-ink max-w-md">
              Saya membangun produk web dari skema database sampai deploy — untuk pesantren, UMKM, dan siapa pun yang butuh situs yang benar-benar jalan.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex lg:justify-end lg:items-end">
            <figure className="-rotate-2 border border-ink bg-card rounded-2xl p-2 w-60 sm:w-72 lg:w-80 shadow-[6px_6px_0_rgba(28,26,23,0.12)]">
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
            </figure>
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
        <div className="animate-marquee whitespace-nowrap flex w-max">
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
            <div key={s.label} className="px-5 sm:px-8 py-6 sm:py-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display font-black tracking-[-0.03em] text-5xl sm:text-6xl text-ink">{s.value}</dd>
              <dd className="label-mono !text-[9px] mt-2">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
