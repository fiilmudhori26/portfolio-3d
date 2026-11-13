'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const navLinks = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) { setActive(sections[i]); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur border-b border-border' : 'bg-transparent'}`}>
      <div className="container-wide">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-accent/20">
              <Image src={personalInfo.avatar} alt={personalInfo.name} width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-foreground">{personalInfo.initials}</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(item => (
              <a key={item.name} href={item.href} className={`px-4 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 rounded-md ${active === item.href.replace('#', '') ? 'text-foreground bg-accent/10' : 'text-muted/70 hover:text-foreground'}`}>
                {item.name}
              </a>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-muted/60 hover:text-foreground transition-colors">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-border bg-background/98 overflow-hidden">
            <div className="container-wide py-4 space-y-1">
              {navLinks.map(item => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm text-muted/70 hover:text-foreground">{item.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation