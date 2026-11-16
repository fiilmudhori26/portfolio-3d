import { projects } from '@/lib/data'
import GlassCarousel from '@/components/work/GlassCarousel'

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

type OrderedProject = (typeof ordered)[number]

/* Daftar khusus print: semua proyek, urutan sama dengan carousel.
   Layar tidak terpengaruh (hidden); hanya muncul saat @media print. */
function PrintProjectList({ items }: { items: OrderedProject[] }) {
  return (
    <ol className="hidden print:block">
      {items.map((p) => (
        <li
          key={p.id}
          className="break-inside-avoid border-t border-[#1C1A17]/20 py-3 text-[#1C1A17] first:border-t-0 first:pt-0"
        >
          <h3 className="text-base font-bold leading-snug">
            {p.title}
            <span className="ml-2 font-mono text-[9px] font-normal uppercase tracking-[0.18em]">
              {p.tagline}
            </span>
          </h3>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#1C1A17]">
            {p.tech.join(' · ')}
          </p>
          <div className="mt-1.5 space-y-0.5 text-[10px] leading-snug">
            <p>
              <span className="font-semibold">Masalah: </span>
              {p.problem}
            </p>
            <p>
              <span className="font-semibold">Solusi: </span>
              {p.solution}
            </p>
            {p.impact ? (
              <p>
                <span className="font-semibold">Dampak: </span>
                {p.impact}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Projects() {
  const liveCount = ordered.filter((p) => p.live !== '#').length

  return (
    <section id="work" data-section-index="1" className="relative bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 md:pb-20">
        {/* ── Section header ─────────────────────────── */}
        <div className="rule-top pt-6 flex items-end justify-between gap-6 flex-wrap pb-8">
          <div>
            <p className="label-mono">N°02 - Work</p>
            <h2 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl text-ink mt-3">
              Karya<br /><em className="italic font-light">nyata.</em>
            </h2>
          </div>
          <p className="label-mono !text-[9px] sm:!text-[10px] max-w-[13rem] leading-relaxed text-right hidden sm:block">
            {liveCount} proyek live · diurutkan dari yang paling kuat
          </p>
        </div>

        {/* ── Glass carousel 3D (disembunyikan saat print) ── */}
        <div className="print:hidden">
          <GlassCarousel items={ordered} />
        </div>

        {/* ── Daftar print: semua proyek ─────────────── */}
        <PrintProjectList items={ordered} />
      </div>
    </section>
  )
}
