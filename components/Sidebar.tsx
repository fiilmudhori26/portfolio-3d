'use client'

import { useState } from 'react'
import { useFullpage } from '@/components/FullpageProvider'

const icons = [
  { section: 0, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { section: 1, icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { section: 2, icon: 'M12 2l2.5 7H22l-6 4.5L18 22l-6-5-6 5 2-8.5L2 9h7.5L12 2z' },
  { section: 3, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { section: 4, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

const sectionNames = ['About', 'Work', 'Skills', 'Journey', 'Contact']
const sectionHrefs = ['#about', '#work', '#skills', '#journey', '#contact']

export default function Sidebar() {
  const { currentSection } = useFullpage()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-1.5 rounded-full border border-line bg-paper/90 backdrop-blur px-1 py-3">
      {icons.map(({ section, icon }) => {
        const isActive = currentSection === section
        const isHovered = hovered === section

        return (
          <a
            key={section}
            href={sectionHrefs[section]}
            onMouseEnter={() => setHovered(section)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(section)}
            onBlur={() => setHovered(null)}
            aria-label={`Go to ${sectionNames[section]} section`}
            aria-current={isActive ? 'true' : undefined}
            className={`group relative flex items-center justify-center w-9 h-9 rounded-full no-underline cursor-pointer transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive || isHovered ? 'text-accent bg-accent/10' : 'text-ink'
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 whitespace-nowrap rounded-md border border-line bg-card px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink opacity-0 -translate-x-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100"
            >
              {sectionNames[section]}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </a>
        )
      })}
    </div>
  )
}