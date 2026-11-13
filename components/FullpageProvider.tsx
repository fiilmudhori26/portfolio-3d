'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react'
import { animate } from 'framer-motion'

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

// Animasi lerp scroll pakai framer-motion animate() — smoothing internal + spring/ease, dipakai juga oleh goToSection
let rafId = 0
function scrollToSection(el: HTMLElement) {
  cancelAnimationFrame(rafId)
  animate(window.scrollY, el.getBoundingClientRect().top + window.scrollY, {
    duration: 0.85,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (v) => window.scrollTo({ top: v, behavior: 'instant' }),
  }).then(() => {
    rafId = 0
  })
}

export default function FullpageProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [totalSections, setTotalSections] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionRefs = useRef<Map<string, number>>(new Map())
  const nextIndex = useRef(0)

  // refs biar listener attach sekali & selalu baca nilai terbaru
  const currentRef = useRef(0)
  const totalRef = useRef(0)
  const scrollingRef = useRef(false)
  const isFinePointer = useRef(true)

  useEffect(() => {
    currentRef.current = currentSection
  }, [currentSection])
  useEffect(() => {
    totalRef.current = totalSections
  }, [totalSections])
  useEffect(() => {
    // pointer: fine = mouse/trackpad (PC). Touchscreen HP → natural scroll.
    isFinePointer.current = window.matchMedia('(pointer: fine)').matches
  }, [])

  const registerSection = useCallback((id: string) => {
    const idx = nextIndex.current
    sectionRefs.current.set(id, idx)
    nextIndex.current++
    return idx
  }, [])

  const goToSection = useCallback((index: number) => {
    if (scrollingRef.current) return
    const clamped = Math.max(0, Math.min(index, totalRef.current - 1))
    if (clamped === currentRef.current) return
    scrollingRef.current = true
    setIsScrolling(true)
    setCurrentSection(clamped)

    const el = document.getElementById(`section-${clamped}`)
    if (el) scrollToSection(el)

    setTimeout(() => {
      scrollingRef.current = false
      setIsScrolling(false)
    }, 1100)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFinePointer.current) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        goToSection(currentRef.current + 1)
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goToSection(currentRef.current - 1)
      }
    }

    // Wheel accumulate: 1 notch ga langsung lompat — kumpulin delta dulu (≥ 100px) baru snap.
    // Hasil: scroll feel natural di PC tapi tetap snapping per section.
    let acc = 0
    let accTimer: ReturnType<typeof setTimeout> | undefined
    const handleWheel = (e: WheelEvent) => {
      if (!isFinePointer.current || scrollingRef.current) return
      acc += e.deltaY
      clearTimeout(accTimer)
      accTimer = setTimeout(() => {
        acc = 0
      }, 300)
      if (Math.abs(acc) < 100) return
      const next = currentRef.current + (acc > 0 ? 1 : -1)
      acc = 0
      if (next < 0 || next >= totalRef.current) return
      e.preventDefault()
      goToSection(next)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      clearTimeout(accTimer)
    }
  }, [goToSection])

  useEffect(() => {
    const count = document.querySelectorAll('[data-section-index]').length
    if (count > 0) setTotalSections(count)
  }, [])

  useEffect(() => {
    const section = document.getElementById(`section-${currentSection}`)
    if (!section) return
    const prev = document.querySelectorAll('[data-section-index]')
    prev.forEach((s) => {
      if (s.id === `section-${currentSection}`) return
      s.querySelectorAll('[data-animate].anim-visible').forEach((el, i) => {
        setTimeout(() => el.classList.remove('anim-visible'), i * 30)
      })
    })
    const animEls = section.querySelectorAll('[data-animate]:not(.anim-visible)')
    animEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('anim-visible'), 150 + i * 70)
    })
  }, [currentSection])

  // Scroll-spy — jalan di semua device (PC & HP), update currentSection buat navbar/sidebar/animasi.
  useEffect(() => {
    const handleScroll = () => {
      if (scrollingRef.current) return
      const sections = document.querySelectorAll('[data-section-index]')
      let closest = currentRef.current
      let closestDist = Infinity
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const dist = Math.abs(rect.top)
        if (dist < closestDist) {
          closestDist = dist
          closest = parseInt(section.getAttribute('data-section-index') || '0')
        }
      })
      if (closest !== currentRef.current) {
        currentRef.current = closest
        setCurrentSection(closest)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <FullpageContext.Provider
      value={{ currentSection, totalSections, isScrolling, goToSection, registerSection, setTotalSections }}
    >
      {children}
    </FullpageContext.Provider>
  )
}