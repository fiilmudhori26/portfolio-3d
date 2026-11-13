'use client'

import { useState, useEffect } from 'react'
import { useFullpage } from '@/components/FullpageProvider'
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
        className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-5 transition-colors duration-500 ${
          scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <a
          href="#section-0"
          aria-label="Rahmad Akbar — home"
          className="flex items-center gap-2 no-underline rounded-md"
          onClick={(e) => { e.preventDefault(); goToSection(0) }}
        >
          <span className="flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M14 2L2 26h24L14 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="6" r="1.2" fill="#10B981" />
              <line x1="8" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          </span>
          <span className="font-sans font-light text-sm tracking-widest uppercase text-foreground">
            Rahmad
          </span>
        </a>
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center items-center gap-[6px] bg-none border-none p-2 cursor-pointer transition-transform duration-150 active:scale-90 w-11 h-11"
        >
          <span className={`block w-10 h-1 bg-foreground rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-10 h-1 bg-foreground rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        </button>
      </nav>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} labels={sectionLabels} />
    </>
  )
}
