'use client'

import { experience, education, organization } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'

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
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="journey" data-section-index="3" ref={ref} className="relative bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="rule-top pt-6">
          <p className="label-mono">N°04 — Journey</p>
          <h2 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl text-ink mt-3">
            Yang sudah<br /><em className="italic font-light">dilewati.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12 mt-12">
          {/* Kiri — Work */}
          <div className={`md:col-span-7 ${visible ? '' : 'anim-up'} anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''}`}>
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
          </div>

          {/* Kanan — Education + Organisation */}
          <div className={`md:col-span-5 space-y-12 ${visible ? '' : 'anim-up'} anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''}`} style={{ transitionDelay: '120ms' }}>
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
          </div>
        </div>
      </div>
    </section>
  )
}
