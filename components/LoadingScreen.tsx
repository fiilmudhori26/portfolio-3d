'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-screen fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 bg-paper"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
          aria-hidden="true"
        >
          <motion.span
            className="font-display italic font-black text-4xl sm:text-5xl tracking-[-0.03em] text-ink select-none"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.45, ease: EASE } }}
          >
            Rahmad Akbar<span className="text-accent">.</span>
          </motion.span>
          <motion.span
            className="label-mono"
            exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut', delay: 0.08 } }}
          >
            N° 001 · Jember
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
