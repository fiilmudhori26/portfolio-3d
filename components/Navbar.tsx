'use client'

import { useState, useEffect } from 'react'
import { useFullpage } from '@/components/FullpageProvider'
import MenuOverlay from '@/components/MenuOverlay'
import { PersonalMark } from '@/components/icons'

const navItems = [
  { label: 'About', section: 0, href: '#about' },
  { label: 'Work', section: 1, href: '#work' },
  { label: 'Skills', section: 2, href: '#skills' },
  { label: 'Contact', section: 4, href: '#contact' },
]

export default function Navbar() {
  const { currentSection } = useFullpage()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = currentSection > 0

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-5 md:px-10 border-b transition-colors duration-500 ${
          scrolled ? 'bg-paper/90 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
        }`}
      >
        <a href="#about" className="flex items-center gap-2 font-display italic font-black text-xl sm:text-2xl tracking-[-0.02em] text-ink no-underline rounded-sm">
          <PersonalMark className="w-7 h-7 sm:w-8 sm:h-8 text-accent shrink-0" />
          <span>Rahmad Akbar</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          {navItems.map((item) => {
            const active = currentSection === item.section
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={active ? 'true' : undefined}
                className={`label-mono !text-[10px] pb-0.5 border-b transition-colors duration-200 cursor-pointer no-underline ${
                  active ? 'text-accent border-accent' : 'text-ink border-transparent hover:text-accent'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="label-mono !text-[10px] hidden sm:inline">Est. 2026</span>
          <a href="mailto:rahmad26akbar@gmail.com" className="btn btn-outline !py-2 !px-4 hidden sm:inline-flex">
            Book a Call
          </a>
          <button
            id="navbar-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] bg-none border-none p-2 cursor-pointer w-11 h-11"
          >
            <span className={`block w-7 h-[1.5px] bg-ink rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-7 h-[1.5px] bg-ink rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}