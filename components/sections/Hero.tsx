'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
import { useFullpage } from '@/components/FullpageProvider'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM4.5 9.75h1V21h-1zM10 9.75h.95v1.54h.01c.13-.25.46-.82 1.6-.82 1.7 0 2.6 1.13 2.6 3.27V21h-1v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.67-2.46 3.4V21h-1z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M16.6 3c.4 1.9 2.3 3.4 4.4 3.6v3.5a8.3 8.3 0 0 1-4.4-1.4v6.6A6.1 6.1 0 1 1 10.5 9.2c.34 0 .67.05 1 .15v3.7a2.45 2.45 0 1 0 1.6 2.32V3z" />
    </svg>
  )
}

const socialLinks = [
  { name: 'GitHub', href: personalInfo.social.github, Icon: GitHubIcon },
  { name: 'LinkedIn', href: personalInfo.social.linkedin, Icon: LinkedInIcon },
  { name: 'TikTok', href: personalInfo.social.tiktok, Icon: TikTokIcon },
]

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false })

export default function Hero() {
  const { goToSection } = useFullpage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const els = section.querySelectorAll('[data-animate]')
    els.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('anim-visible')
      }, 600 + i * 70)
    })
  }, [])

  return (
    <section
      id="section-0"
      data-section-index="0"
      ref={sectionRef}
      className="section-full isolation-auto"
    >
      <ThreeBackground />
      <div className="mx-auto w-full max-w-[96rem] grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 p-6 md:p-10 overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center md:items-start md:text-start">
          <div className="block md:hidden col-span-1 mx-auto mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-muted opacity-90 transition-opacity duration-500">
              <Image
                src={personalInfo.avatar || '/images/profile.png'}
                alt={personalInfo.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div data-animate className="anim-hidden anim-left inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" aria-hidden="true" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            </span>
            <span className="text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-accent">
              Available for work
            </span>
          </div>

          <div data-animate className="anim-hidden anim-left flex flex-col items-center md:items-start mb-5">
            <svg className="w-14 h-14 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M50 5L5 95h90L50 5z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <path d="M50 5L5 95h90L50 5z" stroke="#10B981" strokeWidth="0.3" fill="none" opacity="0.3" />
              <circle cx="50" cy="14" r="3" fill="#10B981" opacity="0.9" />
              <line x1="24" y1="66" x2="76" y2="66" stroke="currentColor" strokeWidth="1" opacity="0.35" />
              <line x1="50" y1="5" x2="50" y2="14" stroke="#10B981" strokeWidth="0.6" opacity="0.5" />
            </svg>
            <span className="font-sans font-light text-[0.7rem] md:text-[0.8rem] tracking-[0.4em] uppercase text-muted mt-2">
              {personalInfo.role || 'Full Stack Developer'}
            </span>
          </div>

          <h3 data-animate className="anim-hidden anim-left text-[1.1rem] md:text-[1.25rem] font-normal tracking-[0.28em] uppercase text-muted mb-3">
            {personalInfo.name}
          </h3>

          <h1 data-animate className="anim-hidden anim-left text-[clamp(2.1rem,7.4vw,5.5rem)] font-bold font-display leading-[1.02] my-2">
            {personalInfo.title}
          </h1>

          <p data-animate className="anim-hidden anim-left mt-4 tracking-[0.05em] text-muted leading-[1.7rem] max-w-lg">
            {personalInfo.tagline}
          </p>

          <div data-animate className="anim-hidden anim-left flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 mt-8">
            <a href={personalInfo.cvDownload || '#'} download target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center no-underline">
              Download CV
            </a>
            <button onClick={() => goToSection(3)} className="btn btn-secondary">
              View Projects
            </button>
            <button onClick={() => goToSection(5)} className="text-sm font-medium text-muted hover:text-foreground underline-offset-4 hover:underline transition-colors px-2 py-2 min-h-[44px] inline-flex items-center">
              Contact Me
            </button>
          </div>

          <div data-animate className="anim-hidden anim-left flex items-center justify-center md:justify-start gap-2 mt-5">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} profile`}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border text-muted hover:text-accent hover:border-accent/60 transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center col-span-1 mx-auto">
          <div
            className="rounded-full overflow-hidden bg-muted opacity-90 hover:opacity-100 transition-opacity duration-500"
            style={{ maxWidth: 'min(20vw, 340px)' }}
          >
            <Image
              src={personalInfo.avatar || '/images/profile.png'}
              alt={personalInfo.name}
              width={400}
              height={550}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
