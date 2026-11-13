'use client'

import { skills as skillsData } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'

const SKILL_GROUPS: Record<string, { name: string; level: number }[]> = {
  frontend: skillsData.frontend,
  backend: skillsData.backend,
  tools: skillsData.tools,
  design: skillsData.design,
  digitalMarketing: skillsData.digitalMarketing,
}

const CARDS: Array<{ label: string; groups: string[] }> = [
  { label: 'Frontend', groups: ['frontend'] },
  { label: 'Backend & Data', groups: ['backend'] },
  { label: 'Tools & Platform', groups: ['tools'] },
  { label: 'Design & Marketing', groups: ['design', 'digitalMarketing'] },
]

export default function Skills() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-2" data-section-index="2" ref={ref} className="section-full bg-surface">
      <div className="w-full max-w-6xl mx-auto">
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}>
          <p className="label-mono mb-3">Stack</p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-sans font-black tracking-[-0.04em] leading-[0.95] text-5xl sm:text-6xl lg:text-7xl text-foreground">
              Tech &amp;<br />Tools.
            </h2>
            <p className="text-sm text-ink-2 max-w-[16rem] leading-snug mb-1">
              What I reach for when something needs to ship.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {CARDS.map((card, i) => {
            const items = card.groups.flatMap((g) => SKILL_GROUPS[g] ?? [])
            return (
              <div
                key={card.label}
                className={`card-bento anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'} p-6 md:p-7 flex flex-col`}
                style={{ transitionDelay: `${150 + i * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3 className="font-sans font-extrabold text-2xl tracking-[-0.03em] text-foreground">{card.label}</h3>
                  <span className="font-mono text-xs text-ink-3 pt-1">{String(items.length).padStart(2, '0')}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s.name}
                      className="font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border border-border text-ink-2"
                      title={`Level ${s.level}/100`}
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
