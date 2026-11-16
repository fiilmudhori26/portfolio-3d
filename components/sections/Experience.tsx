'use client'

import { motion } from 'framer-motion'
import { experience, education, organization, awards } from '@/lib/data'

const EASE = [0.22, 1, 0.36, 1] as const

function MedalIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 6.8v2.4l1.6 1" />
      <path d="M8.8 13.2L6.5 21l5.5-2.6L17.5 21l-2.3-7.8" />
    </svg>
  )
}

function Row({ role, org, meta, detail }: { role: string; org: string; meta: string; detail?: string }) {
  return (
    <div className="border-t border-line py-4 first:border-t-0 grid grid-cols-12 gap-3 items-baseline">
      <div className="col-span-12 sm:col-span-8">
        <h3 className="font-display font-bold text-lg sm:text-xl text-ink leading-snug">
          {role} — <span className="italic font-light">{org}</span>
        </h3>
        {detail && <p className="text-xs text-muted leading-relaxed mt-1.5">{detail}</p>}
      </div>
      <p className="col-span-12 sm:col-span-4 label-mono !text-[9px] sm:text-right">{meta}</p>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="journey" data-section-index="3" className="relative bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="rule-top pt-6">
          <p className="label-mono">N°04 — Journey</p>
          <h2 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl text-ink mt-3">
            Yang sudah<br /><em className="italic font-light">dilewati.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12 mt-12">
          {/* Kiri — Work */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="label-mono !text-[10px] mb-5">Work</p>
            <div>
              {experience.map((exp) => (
                <Row
                  key={exp.id}
                  role={exp.role}
                  org={exp.company}
                  meta={`${exp.period} · ${exp.type}`}
                  detail={exp.description}
                />
              ))}
            </div>
          </motion.div>

          {/* Kanan — Education + Organisation */}
          <motion.div
            className="md:col-span-5 space-y-12"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          >
            <div>
              <p className="label-mono !text-[10px] mb-5">Education</p>
              {education.map((edu) => (
                <Row
                  key={edu.id}
                  role={edu.major}
                  org={edu.institution}
                  meta={edu.period}
                />
              ))}
            </div>
            <div>
              <p className="label-mono !text-[10px] mb-5">Organisation</p>
              {organization.map((org) => (
                <Row
                  key={org.id}
                  role={org.role}
                  org={org.organization}
                  meta={org.period}
                  detail={org.description}
                />
              ))}
            </div>
            <div>
              <p className="label-mono !text-[10px] mb-5">Prestasi &amp; Sertifikat</p>
              <div className="space-y-3">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="flex items-start gap-4 border border-line bg-card rounded-lg p-4"
                  >
                    <span className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
                      <MedalIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-ink leading-snug">
                        {award.title}
                      </h3>
                      <p className="label-mono !text-[9px] mt-1">{award.issuer} · {award.date}</p>
                      <p className="text-xs text-muted leading-relaxed mt-2">{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
