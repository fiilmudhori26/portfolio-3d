'use client'

import { useState } from 'react'
import Image from 'next/image'
import { projects } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'
import { ExternalLink, Github } from 'lucide-react'

const spotlightId = 'keuangan-app'
const ordered = [...projects].sort((a, b) => (a.id === spotlightId ? -1 : b.id === spotlightId ? 1 : 0))

function ProjectShot({ id, title }: { id: string; title: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="h-44 sm:h-48 flex flex-col items-center justify-center gap-2 p-4 text-center bg-surface">
        <p className="font-sans font-black text-2xl tracking-[-0.03em] text-foreground">{title}</p>
      </div>
    )
  }

  return (
    <Image
      src={`/shots/${id}.png`}
      alt={`Screenshot of ${title}`}
      width={1280}
      height={800}
      className="w-full h-44 sm:h-48 object-cover object-top"
      onError={() => setError(true)}
    />
  )
}

export default function Projects() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-3" data-section-index="3" ref={ref} className="section-full !items-start !pt-20 md:!pt-24">
      <div className="w-full max-w-6xl mx-auto">
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`} style={{ transitionDelay: '0ms' }}>
          <p className="label-mono mb-3">Selected work</p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-sans font-black tracking-[-0.04em] leading-[0.95] text-5xl sm:text-6xl lg:text-7xl text-foreground">
              Recent<br />Builds.
            </h2>
            <p className="text-sm text-ink-2 max-w-[16rem] leading-snug mb-1">
              {projects.length} live products — from idea to Vercel, no templates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {ordered.map((p, idx) => {
            const isSpotlight = p.id === spotlightId
            return (
              <article
                key={p.id}
                className={`card-bento anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'} flex flex-col overflow-hidden ${
                  isSpotlight ? 'md:col-span-2 lg:row-span-1' : ''
                }`}
                style={{ transitionDelay: `${150 + idx * 80}ms` }}
              >
                <div className="flex items-center justify-between px-5 pt-4">
                  <span className="label-mono !text-[9px]">
                    {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                  {isSpotlight ? (
                    <span className="label-mono !text-[9px] !text-pink inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink inline-block" /> Recent build
                    </span>
                  ) : (
                    <span className="label-mono !text-[9px] inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink inline-block" /> Live
                    </span>
                  )}
                </div>

                <div className="px-5 pt-3 pb-4 flex flex-col flex-1">
                  <h3 className="font-sans font-extrabold tracking-[-0.03em] leading-none text-2xl md:text-3xl text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-xs text-ink-2 mt-1.5">{p.tagline}</p>

                  <a
                    href={p.live !== '#' ? p.live : p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.live !== '#' ? `Open ${p.title} live site` : `View ${p.title} on GitHub`}
                    className="browser-frame block no-underline mt-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
                  >
                    <div className="browser-frame-bar !py-1.5">
                      <span className="flex gap-1" aria-hidden="true">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                      </span>
                      <span className="flex-1 text-center font-mono text-[9px] text-ink-3 truncate px-2">
                        {p.live !== '#' ? p.live.replace('https://', '') : `github.com/.../${p.id}`}
                      </span>
                    </div>
                    <ProjectShot id={p.id} title={p.title} />
                  </a>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.slice(0, 5).map((t) => (
                      <span key={t} className="font-mono text-[9px] uppercase tracking-[0.08em] px-2 py-1 rounded-full border border-border text-ink-2">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-4 pt-4">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${p.title} source code on GitHub`}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2 hover:text-foreground transition-colors no-underline py-2"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" /> Code
                      </a>
                    )}
                    {p.live !== '#' && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.title} live demo`}
                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-pink hover:text-foreground transition-colors no-underline py-2"
                      >
                        Demo <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
