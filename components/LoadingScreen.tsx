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
      className={`fixed inset-0 flex flex-col justify-center items-center gap-4 bg-black z-[999] transition-all duration-500 ${
        hide ? 'opacity-0 scale-105 pointer-events-none' : ''
      }`}
      aria-hidden={hide}
    >
      <span
        className="font-sans font-black text-5xl md:text-6xl tracking-[-0.04em] text-foreground select-none"
        style={{
          opacity: hide ? 0 : 1,
          transform: hide ? 'scale(0.92)' : 'scale(1)',
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        RAHMAD<span className="text-pink">.</span>
      </span>
      <span className="label-mono" style={{ opacity: hide ? 0 : 1, transition: 'opacity 0.6s ease 0.2s' }}>
        Web Developer
      </span>
    </div>
  )
}
