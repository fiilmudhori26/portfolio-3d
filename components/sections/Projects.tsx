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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`card-subtle anim-hidden-gpu flex flex-col min-h-[230px] ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
            >
              <h3 className="font-display text-lg font-bold leading-snug">{p.title}</h3>
              <p className="text-xs text-muted font-medium tracking-wider uppercase mt-1.5 mb-2">{p.tagline}</p>
              <p className="text-sm text-muted leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-surface-2 border border-border text-foreground/70 font-medium">{t}</span>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-2 pt-3 border-t border-border">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${p.title} source code on GitHub`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-foreground/80 hover:text-accent border border-border hover:border-accent/60 rounded-lg transition-colors no-underline min-h-[40px]"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    Code
                  </a>
                )}
                {p.live !== '#' && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} live demo`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-accent border border-accent/40 hover:border-accent hover:bg-accent/10 rounded-lg transition-colors no-underline min-h-[40px]"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
