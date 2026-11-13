'use client'

import { Github, Linkedin, Music, ArrowUp } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const Footer = () => {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border">
      <div className="container-wide py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-2/60 text-xs">
            Designed & Built by <span className="text-ink-2">{personalInfo.name}</span>
            <span className="mx-2 text-ink-2/30">&bull;</span>
            <span>&copy; {year}</span>
          </p>
          <div className="flex items-center gap-4">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="text-ink-2/50 hover:text-foreground transition-colors"><Github size={16} /></a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-2/50 hover:text-foreground transition-colors"><Linkedin size={16} /></a>
            <a href={personalInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-ink-2/50 hover:text-foreground transition-colors"><Music size={16} /></a>
            <button onClick={scrollToTop} className="text-ink-2/50 hover:text-foreground transition-colors ml-2"><ArrowUp size={16} /></button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer