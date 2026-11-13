'use client'

import { projects } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'
import { ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-3" data-section-index="3" ref={ref} className="section-full">
      <div className="w-full max-w-5xl mx-auto">
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '0ms' }}>
          <div className="text-center mb-12">
            <span className="text-[10px] font-display font-semibold tracking-[0.15em] uppercase text-accent">Work</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">Projects</h2>
            <p className="text-sm text-muted mt-3 max-w-xl mx-auto">Real applications I built from idea to deployment.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`card-subtle anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <div className="flex gap-2">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-accent transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {p.live !== '#' && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="text-muted hover:text-accent transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted/60 font-medium tracking-wider uppercase mb-2">{p.tagline}</p>
              <p className="text-sm text-muted leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-surface-2 border border-border text-muted/70 font-medium">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
