'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 bg-paper transition-all duration-500 ${
        hide ? 'opacity-0 pointer-events-none' : ''
      }`}
      aria-hidden={hide}
    >
      <span
        className="font-display italic font-black text-4xl sm:text-5xl tracking-[-0.03em] text-ink select-none"
        style={{
          opacity: hide ? 0 : 1,
          transform: hide ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        Rahmad Akbar<span className="text-accent">.</span>
      </span>
      <span className="label-mono" style={{ opacity: hide ? 0 : 1, transition: 'opacity 0.5s ease 0.15s' }}>
        N° 001 · Jember
      </span>
    </div>
  )
}
