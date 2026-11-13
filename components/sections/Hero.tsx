'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
import { useFullpage } from '@/components/FullpageProvider'

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
          <div className="block md:hidden col-span-1 mx-auto mb-8">
            <div className="w-36 h-36 md:w-60 md:h-60 rounded-full overflow-hidden bg-muted grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={personalInfo.avatar || '/images/profile.png'}
                alt={personalInfo.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div data-animate className="anim-hidden anim-left flex flex-col items-center md:items-start mb-6">
            <svg className="w-20 h-20 md:w-[100px] md:h-[100px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

          <h3 data-animate className="anim-hidden anim-left text-[1.25rem] font-normal tracking-[0.5rem] uppercase text-muted mb-3">
            {personalInfo.name}
          </h3>

          <h1 data-animate className="anim-hidden anim-left text-[1.75rem] md:text-[3.75rem] lg:text-[3.75rem] xl:text-[6rem] font-bold font-display my-2">
            {personalInfo.title}
          </h1>

          <p data-animate className="anim-hidden anim-left mt-4 tracking-[0.05em] text-muted leading-[1.7rem] max-w-[42rem]">
            {personalInfo.tagline}
          </p>

          <div data-animate className="anim-hidden anim-left flex flex-row justify-center md:justify-start items-center gap-4 mt-10">
            <a href={personalInfo.cvDownload || '#'} download target="_blank" rel="noopener noreferrer">
              <button className="btn btn-primary">Download CV</button>
            </a>
            <button onClick={() => goToSection(5)} className="btn btn-secondary">Contact Me</button>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center col-span-1 mx-auto">
          <div
            className="rounded-full overflow-hidden bg-muted grayscale hover:grayscale-0 transition-all duration-300"
            style={{ maxWidth: '26vw' }}
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
