'use client'

import { useState, useEffect } from 'react'
import { useFullpage } from '@/components/FullpageProvider'
import { personalInfo } from '@/lib/data'
import MenuOverlay from '@/components/MenuOverlay'

const sectionLabels = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const { currentSection, goToSection } = useFullpage()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = currentSection > 0

  useEffect(() => {
    document.body.classList.toggle('fullpage-active', menuOpen)
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-5 md:px-8 transition-colors duration-500 ${
          scrolled ? 'bg-black/70 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <a
          href="#section-0"
          aria-label="Rahmad Akbar — home"
          className="flex items-baseline no-underline rounded-md select-none"
          onClick={(e) => { e.preventDefault(); goToSection(0) }}
        >
          <span className="font-sans font-black text-2xl tracking-[-0.04em] text-foreground">RAHMAD</span>
          <span className="font-sans font-black text-2xl leading-none text-pink">.</span>
        </a>

        <div className="flex items-center gap-3">
          <a href={`mailto:${personalInfo.email}`} className="btn btn-pink !px-5 !py-2 text-sm hidden sm:inline-flex">
            Book a Call
          </a>
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-[6px] bg-none border-none p-2 cursor-pointer transition-transform duration-150 active:scale-90 w-11 h-11"
          >
            <span className={`block w-8 h-[2px] bg-foreground rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block w-8 h-[2px] bg-foreground rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-8 h-[2px] bg-foreground rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </nav>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} labels={sectionLabels} />
    </>
  )
}
