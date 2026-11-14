'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useFullpage } from '@/components/FullpageProvider'

const EASE = [0.22, 1, 0.36, 1] as const

const labels = ['About', 'Work', 'Skills', 'Journey', 'Contact']
const hrefs = ['#about', '#work', '#skills', '#journey', '#contact']

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: EASE, staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: 'easeIn', staggerChildren: 0.03, staggerDirection: -1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.18, ease: 'easeIn' } },
}

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { currentSection } = useFullpage()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const closedViaLink = useRef(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open) firstLinkRef.current?.focus()
    // Mengembalikan fokus ke tombol hamburger Navbar saat overlay ditutup/unmount,
    // KECUALI penutupan lewat klik link navigasi — dalam kasus itu fokus dipindahkan
    // ke section tujuan lewat requestAnimationFrame (lihat onClick link).
    return () => {
      if (open && !closedViaLink.current) document.getElementById('navbar-menu-toggle')?.focus()
      closedViaLink.current = false
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-30 bg-paper"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="min-h-screen flex flex-col justify-center px-6 pt-16">
            <p className="label-mono mb-8">Index</p>
            <nav aria-label="Menu" className="flex flex-col gap-5">
              {labels.map((label, i) => {
                const isActive = currentSection === i
                return (
                  <motion.a
                    key={label}
                    ref={i === 0 ? firstLinkRef : undefined}
                    variants={itemVariants}
                    href={hrefs[i]}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => {
                      closedViaLink.current = true
                      const target = document.querySelector<HTMLElement>(hrefs[i])
                      if (target) {
                        target.setAttribute('tabindex', '-1')
                        requestAnimationFrame(() => {
                          target.focus({ preventScroll: true })
                        })
                      }
                      onClose()
                    }}
                    className="group flex items-baseline gap-4 no-underline border-b border-line pb-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.18em] text-muted">0{i + 1}</span>
                    <span className={`font-display font-black text-4xl sm:text-5xl tracking-[-0.03em] leading-none transition-colors ${isActive ? 'italic text-accent' : 'text-ink group-hover:text-accent'}`}>
                      {label}
                    </span>
                  </motion.a>
                )
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
