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
  const { goToSection } = useFullpage()
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

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
      className={`fixed inset-0 z-45 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        clipPath: open
          ? 'circle(150% at calc(100% - 40px) 40px)'
          : 'circle(0px at calc(100% - 40px) 40px)',
        transition: 'clip-path 0.6s ease',
      }}
    >
      <div className="bg-background/95 border-l border-border flex flex-col items-center justify-center min-h-screen min-w-full gap-8">
        <h1 className="font-display font-bold text-6xl text-foreground menu-item">Menu</h1>
        {labels.map((label, i) => (
          <a
            key={label}
            ref={(el) => { itemsRef.current[i] = el }}
            href={`#section-${i}`}
            onClick={(e) => {
              e.preventDefault()
              goToSection(i)
              onClose()
            }}
            className="text-2xl font-bold text-foreground no-underline"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
