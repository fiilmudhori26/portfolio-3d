'use client'

import { useFullpage } from '@/components/FullpageProvider'

const icons = [
  { section: 0, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { section: 1, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { section: 2, icon: 'M12 2l2.5 7H22l-6 4.5L18 22l-6-5-6 5 2-8.5L2 9h7.5L12 2z' },
  { section: 3, icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { section: 4, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { section: 5, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function Sidebar() {
  const { currentSection, goToSection } = useFullpage()

  return (
    <div className="hidden md:flex fixed left-0 top-[25%] z-40 bg-surface border-r border-border h-[50vh] w-14 flex-col justify-evenly items-center p-4 rounded-r-2xl text-[#f9fafb]">
      {icons.map(({ section, icon }) => (
        <button
          key={section}
          onClick={() => goToSection(section)}
          aria-label={`Go to section ${section}`}
          className="relative flex items-center justify-center w-10 h-10 bg-none border-none text-[#f9fafb] text-xl cursor-pointer transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ transform: currentSection === section ? 'scale(1.1)' : 'scale(1)' }}
        >
          <span
            className="absolute inset-0 bg-accent/20 rounded-xl transition-opacity duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ opacity: currentSection === section ? 1 : 0 }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="relative z-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </button>
      ))}
    </div>
  )
}
