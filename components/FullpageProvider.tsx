'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react'

interface FullpageContextType {
  currentSection: number
  totalSections: number
  isScrolling: boolean
  goToSection: (index: number) => void
  registerSection: (id: string) => number
  setTotalSections: (n: number) => void
}

const FullpageContext = createContext<FullpageContextType | null>(null)

export function useFullpage() {
  const ctx = useContext(FullpageContext)
  if (!ctx) throw new Error('useFullpage must be used within FullpageProvider')
  return ctx
}

const SCROLLING_DURATION_MS = 900

export default function FullpageProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [totalSections, setTotalSections] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextIndex = useRef(0)

  const registerSection = useCallback((id: string) => {
    void id
    const idx = nextIndex.current
    nextIndex.current++
    return idx
  }, [])

  const goToSection = useCallback((index: number) => {
    const sections = typeof document !== 'undefined'
      ? document.querySelectorAll('[data-section-index]')
      : []
    const count = sections.length
    const clamped = Math.max(0, Math.min(index, Math.max(0, count - 1)))

    const el = Array.from(sections).find(
      (s) => parseInt(s.getAttribute('data-section-index') || '0', 10) === clamped,
    ) as HTMLElement | undefined
    if (!el) return

    setCurrentSection(clamped)
    setIsScrolling(true)
    if (scrollingTimer.current) clearTimeout(scrollingTimer.current)
    scrollingTimer.current = setTimeout(() => setIsScrolling(false), SCROLLING_DURATION_MS)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [])

  // Scroll-spy via IntersectionObserver — scroll normal, tanpa snap.
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-index]')
    if (sections.length === 0) return
    setTotalSections(sections.length)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-section-index') || '0', 10)
            if (!Number.isNaN(idx)) setCurrentSection(idx)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-4.5rem 0px 0px 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (scrollingTimer.current) clearTimeout(scrollingTimer.current)
    }
  }, [])

  return (
    <FullpageContext.Provider
      value={{ currentSection, totalSections, isScrolling, goToSection, registerSection, setTotalSections }}
    >
      {children}
    </FullpageContext.Provider>
  )
}
