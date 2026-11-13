'use client'

import { useState } from 'react'
import { useFullpage } from '@/components/FullpageProvider'
import { SECTION_ICONS } from '@/components/icons'

const sectionKeys = ['about', 'work', 'skills', 'journey', 'contact'] as const
const sectionNames = ['About', 'Work', 'Skills', 'Journey', 'Contact']
const sectionHrefs = ['#about', '#work', '#skills', '#journey', '#contact']

export default function Sidebar() {
  const { currentSection } = useFullpage()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-1.5 rounded-full border border-line bg-paper/90 backdrop-blur px-1 py-3">
      {sectionKeys.map((key, section) => {
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
            <span className="w-[18px] h-[18px] [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
              {SECTION_ICONS[key]}
            </span>
          </a>
        )
      })}
    </div>
  )
}