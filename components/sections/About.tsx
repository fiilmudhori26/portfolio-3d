'use client'

import { personalInfo, about, skills as skillsData } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium text-foreground/80">{name}</span>
        <span className="text-xs font-semibold text-foreground/70">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ '--progress-width': `${level}%` } as React.CSSProperties}
          data-progress={level}
        />
      </div>
    </div>
  )
}

export default function About() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-1" data-section-index="1" ref={ref} className="section-full">
      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Kiri: foto */}
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-left'}`} style={{ transitionDelay: '0ms' }}>
          <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl border border-border grayscale hover:grayscale-0 transition-all duration-500">
            <img src={personalInfo.avatar || '/images/profile.png'} alt={personalInfo.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Kanan: konten */}
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-right'}`} style={{ transitionDelay: '150ms' }}>
          <span className="text-[10px] font-display font-semibold tracking-[0.15em] uppercase text-accent">About</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
            Santri.<br />
            <span className="text-muted">Developer.</span>
          </h2>

          <p className="text-sm text-muted leading-relaxed mb-6">{about.summary}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Location', value: personalInfo.location },
              { label: 'Email', value: personalInfo.email },
              { label: 'Phone', value: personalInfo.phone },
              { label: 'Hafidz', value: '30 Juz' },
            ].map((item) => (
              <div key={item.label}>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted/60">{item.label}</span>
                <p className="text-sm font-medium text-foreground/80 mt-0.5 truncate">{item.value}</p>
              </div>
            ))}
          </div>

          <a href={personalInfo.cvDownload || '#'} download
            className="inline-block px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:brightness-110 transition-all active:scale-95 no-underline">
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
