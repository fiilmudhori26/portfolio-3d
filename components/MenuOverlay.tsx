'use client'

import { useEffect, useRef } from 'react'
import { useFullpage } from '@/components/FullpageProvider'

export default function MenuOverlay({
  open,
  onClose,
  labels,
}: {
  open: boolean
  onClose: () => void
  labels: string[]
}) {
  const { goToSection, currentSection } = useFullpage()
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)

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
          el.style.transform = open ? 'translateY(0)' : 'translateY(20px)'
        }
      }, open ? i * 80 : 0)
    })
  }, [open])

  return (
    <div
      id="mobile-menu"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      style={{
        clipPath: open
          ? 'circle(150% at calc(100% - 40px) 40px)'
          : 'circle(0px at calc(100% - 40px) 40px)',
        transition: 'clip-path 0.6s ease, visibility 0.6s',
      }}
    >
      <div className="bg-background/95 border-l border-border flex flex-col items-center justify-center min-h-screen min-w-full gap-8">
        <h1 className="font-display font-bold text-6xl text-foreground menu-item">Menu</h1>
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
              className={`relative text-2xl font-bold no-underline pb-1 transition-colors duration-200 ${
                isActive
                  ? 'text-accent after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-accent'
                  : 'text-foreground hover:text-accent'
              }`}
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {label}
            </a>
          )
        })}
      </div>
    </div>
  )
}
