'use client'

import { experience, education, organization } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'
import { GraduationCap, Briefcase, Users } from 'lucide-react'

function TimelineItem({ icon, title, subtitle, period, description, highlights, tech }: {
  icon: React.ReactNode; title: string; subtitle: string; period: string;
  description: string; highlights?: string[]; tech?: string[];
}) {
  const { ref, visible } = useIntersectionShow<HTMLDivElement>()
  return (
    <div ref={ref} className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'} relative pl-8 pb-8 border-l border-border last:pb-0`}>
      <div className="absolute left-0 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-surface-2 border border-border flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-accent" />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <p className="text-xs text-muted/70 font-medium">{subtitle}</p>
        </div>
        <span className="text-[10px] text-muted/40 whitespace-nowrap font-mono">{period}</span>
      </div>
      <p className="text-xs text-muted leading-relaxed mb-2">{description}</p>
      {highlights && highlights.length > 0 && (
        <ul className="space-y-1 mb-3">
          {highlights.map((h, i) => (
            <li key={i} className="text-[11px] text-muted/50 flex gap-2">
              <span className="text-accent/60 mt-0.5">—</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {tech && tech.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tech.map((t) => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-surface-2 border border-border text-muted/50 font-medium">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Experience() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-4" data-section-index="4" ref={ref} className="section-full" style={{ background: '#0a0a0a' }}>
      <div className="w-full max-w-5xl mx-auto">
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}>
          <div className="text-center mb-12">
            <span className="text-[10px] font-display font-semibold tracking-[0.15em] uppercase text-accent">Journey</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">Experience</h2>
            <p className="text-sm text-muted mt-3 max-w-xl mx-auto">Work, education, and organizational involvement.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {/* Kolom kiri: Work Experience */}
          <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '100ms' }}>
            <h3 className="text-xs font-display font-semibold tracking-[0.12em] uppercase text-accent flex items-center gap-2 mb-6">
              <Briefcase className="w-3.5 h-3.5" /> Work
            </h3>
            {experience.map((exp) => (
              <TimelineItem
                key={exp.id}
                icon={<Briefcase className="w-3 h-3" />}
                title={exp.role}
                subtitle={`${exp.company} · ${exp.location}`}
                period={exp.period}
                description={exp.description}
                highlights={exp.contributions}
                tech={exp.tech}
              />
            ))}
          </div>

          {/* Kolom kanan: Education + Organization */}
          <div className="space-y-8">
            <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-xs font-display font-semibold tracking-[0.12em] uppercase text-accent flex items-center gap-2 mb-6">
                <GraduationCap className="w-3.5 h-3.5" /> Education
              </h3>
              {education.map((edu) => (
                <TimelineItem
                  key={edu.id}
                  icon={<GraduationCap className="w-3 h-3" />}
                  title={edu.major}
                  subtitle={edu.institution}
                  period={edu.period}
                  description={edu.description}
                  highlights={edu.highlights}
                />
              ))}
            </div>

            <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '300ms' }}>
              <h3 className="text-xs font-display font-semibold tracking-[0.12em] uppercase text-accent flex items-center gap-2 mb-6">
                <Users className="w-3.5 h-3.5" /> Organization
              </h3>
              {organization.map((org) => (
                <TimelineItem
                  key={org.id}
                  icon={<Users className="w-3 h-3" />}
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
