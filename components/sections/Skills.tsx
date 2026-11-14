'use client'

import { motion } from 'framer-motion'
import { skills as skillsData } from '@/lib/data'
import { SKILL_ICONS } from '@/components/icons'

const EASE = [0.22, 1, 0.36, 1] as const

const COLUMNS: Array<{ label: string; groups: Array<keyof typeof skillsData>; note: string }> = [
  { label: 'Frontend', groups: ['frontend'], note: 'Antarmuka & pengalaman pengguna' },
  { label: 'Backend & Data', groups: ['backend'], note: 'API, database & otomasi' },
  { label: 'Tools & Marketing', groups: ['tools', 'digitalMarketing', 'design'], note: 'Workflow & kanal distribusi' },
]

export default function Skills() {
  return (
    <section id="skills" data-section-index="2" className="relative bg-card border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="rule-top pt-6">
          <p className="label-mono">N°03 — Skills</p>
          <h2 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl text-ink mt-3">
            Isi<br /><em className="italic font-light">tas kerja.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 mt-12 border-t border-b border-line divide-y md:divide-y-0 md:divide-x divide-line">
          {COLUMNS.map((col, i) => {
            const items = col.groups.flatMap((g) => {
              const list = skillsData[g]
              return Array.isArray(list) ? (list as { name: string }[]) : []
            })
            return (
              <motion.div
                key={col.label}
                className="px-0 md:px-8 py-8 first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.09 }}
              >
                <p className="label-mono !text-[10px] text-ink">{col.label} <span className="text-accent">· {items.length}</span></p>
                <p className="label-mono !text-[8px] mt-1.5">{col.note}</p>
                <ul className="mt-6">
                  {items.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0"
                    >
                      <span className="w-5 h-5 flex-shrink-0 text-accent [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
                        {SKILL_ICONS[s.name]?.() ?? null}
                      </span>
                      <span className="font-display font-semibold text-lg text-ink leading-tight">{s.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <p className="label-mono !text-[9px] mt-8 text-right">Skill berkembang seiring project.</p>
      </div>
    </section>
  )
}
