'use client'

import { experience, education, organization } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'

function TimelineItem({ title, subtitle, period, description, highlights, tech }: {
  title: string; subtitle: string; period: string;
  description: string; highlights?: string[]; tech?: string[];
}) {
  const { ref, visible } = useIntersectionShow<HTMLDivElement>()
  return (
    <div ref={ref} className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'} relative pl-8 pb-7 border-l border-border last:pb-0`}>
      <span className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink" aria-hidden="true" />
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div>
          <h3 className="font-sans font-bold text-base text-foreground leading-snug">{title}</h3>
          <p className="text-xs text-ink-2 mt-0.5">{subtitle}</p>
        </div>
        <span className="label-mono !text-[9px] whitespace-nowrap pt-1">{period}</span>
      </div>
      <p className="text-xs text-ink-2 leading-relaxed mb-2">{description}</p>
      {highlights && highlights.length > 0 && (
        <ul className="space-y-1 mb-2">
          {highlights.map((h, i) => (
            <li key={i} className="text-[11px] text-ink-3 flex gap-2">
              <span className="text-pink mt-0.5" aria-hidden="true">—</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {tech && tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span key={t} className="font-mono text-[9px] uppercase tracking-[0.08em] px-2 py-1 rounded-full border border-border text-ink-2">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Experience() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-4" data-section-index="4" ref={ref} className="section-full !items-start !pt-20 md:!pt-24">
      <div className="w-full max-w-6xl mx-auto">
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}>
          <p className="label-mono mb-3">Journey</p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-sans font-black tracking-[-0.04em] leading-[0.95] text-5xl sm:text-6xl lg:text-7xl text-foreground">
              The Road<br />So Far.
            </h2>
            <p className="text-sm text-ink-2 max-w-[16rem] leading-snug mb-1">
              Work, education and organisation — all shipping.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-10">
          <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '100ms' }}>
            <h3 className="label-mono mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink inline-block" /> Work
            </h3>
            {experience.map((exp) => (
              <TimelineItem
                key={exp.id}
                title={exp.role}
                subtitle={`${exp.company} · ${exp.location}`}
                period={exp.period}
                description={exp.description}
                highlights={exp.contributions}
                tech={exp.tech}
              />
            ))}
          </div>

          <div className="space-y-10">
            <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="label-mono mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-pink inline-block" /> Education
              </h3>
              {education.map((edu) => (
                <TimelineItem
                  key={edu.id}
                  title={edu.major}
                  subtitle={edu.institution}
                  period={edu.period}
                  description={edu.description}
                  highlights={edu.highlights}
                />
              ))}
            </div>

            <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '300ms' }}>
              <h3 className="label-mono mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-pink inline-block" /> Organisation
              </h3>
              {organization.map((org) => (
                <TimelineItem
                  key={org.id}
                  title={org.role}
                  subtitle={org.organization}
                  period={org.period}
                  description={org.description}
                  highlights={org.achievements}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
