'use client'

import { useState } from 'react'
import { useFullpage } from '@/components/FullpageProvider'

const icons = [
  { section: 0, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { section: 1, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { section: 2, icon: 'M12 2l2.5 7H22l-6 4.5L18 22l-6-5-6 5 2-8.5L2 9h7.5L12 2z' },
  { section: 3, icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { section: 4, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { section: 5, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

const sectionNames = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Sidebar() {
  const { currentSection, totalSections, goToSection } = useFullpage()
  const [hovered, setHovered] = useState<number | null>(null)

  const pct = totalSections <= 1 ? 100 : Math.round((currentSection / (totalSections - 1)) * 100)

  return (
    <div className="hidden md:flex fixed left-0 top-[25%] z-40 bg-surface border-r border-border h-[50vh] w-14 flex-col justify-evenly items-center p-4 rounded-r-2xl text-ink">
      {/* Scroll progress — sisi kiri container */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border pointer-events-none" aria-hidden="true">
        <div className="w-full bg-pink transition-all duration-500 ease-out" style={{ height: `${pct}%` }} />
      </div>

      {icons.map(({ section, icon }) => {
        const isActive = currentSection === section
        const isHovered = hovered === section
        const scale = isHovered ? 1.15 : isActive ? 1.1 : 1

        return (
          <button
            key={section}
            onClick={() => goToSection(section)}
            onMouseEnter={() => setHovered(section)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(section)}
            onBlur={() => setHovered(null)}
            aria-label={`Go to ${sectionNames[section]} section`}
            aria-current={isActive ? 'true' : undefined}
            className={`group relative flex items-center justify-center w-10 h-10 border-none text-xl cursor-pointer transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink ${
              isActive || isHovered ? 'text-pink bg-pink/10' : 'text-ink bg-none'
            }`}
            style={{ transform: `scale(${scale})` }}
          >
            {/* Tooltip — di kanan sidebar (sisi kiri di luar layar) */}
            <span
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 whitespace-nowrap rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 translate-x-[-4px] pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
            >
              {sectionNames[section]}
            </span>

            <span
              className="absolute inset-0 bg-pink/20 rounded-xl transition-opacity duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
              style={{ opacity: isActive ? 1 : 0 }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="relative z-[1] w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
