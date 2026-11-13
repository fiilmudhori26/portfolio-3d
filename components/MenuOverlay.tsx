'use client'

import { useEffect, useRef } from 'react'
import { useFullpage } from '@/components/FullpageProvider'

const labels = ['About', 'Work', 'Skills', 'Journey', 'Contact']

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { goToSection, currentSection } = useFullpage()
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      setTimeout(() => {
        if (el) {
          el.style.opacity = open ? '1' : '0'
          el.style.transform = open ? 'translateY(0)' : 'translateY(24px)'
        }
      }, open ? i * 70 : 0)
    })
  }, [open])

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={`fixed inset-0 z-30 bg-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      <div className="min-h-screen flex flex-col justify-center px-6 pt-16">
        <p className="label-mono mb-8">Index</p>
        <nav aria-label="Menu" className="flex flex-col gap-5">
          {labels.map((label, i) => {
            const isActive = currentSection === i
            return (
              <a
                key={label}
                ref={(el) => { itemsRef.current[i] = el }}
                href={`#section-${i}`}
                tabIndex={open ? 0 : -1}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  goToSection(i)
                  onClose()
                }}
                className="group flex items-baseline gap-4 no-underline border-b border-line pb-4"
                style={{
                  opacity: 0,
                  transform: 'translateY(24px)',
                  transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted">0{i + 1}</span>
                <span className={`font-display font-black text-4xl sm:text-5xl tracking-[-0.03em] leading-none transition-colors ${isActive ? 'italic text-accent' : 'text-ink group-hover:text-accent'}`}>
                  {label}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
