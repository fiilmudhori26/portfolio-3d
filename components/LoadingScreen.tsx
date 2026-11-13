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
      className={`fixed inset-0 flex flex-col justify-center items-center gap-6 bg-border z-[999] transition-all duration-500 ${
        hide ? 'opacity-0 scale-105 pointer-events-none' : ''
      }`}
    >
      <svg
        className="w-12 h-12"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          opacity: hide ? 0 : 1,
          transform: hide ? 'scale(0.8) rotate(-10deg)' : 'scale(1) rotate(0deg)',
          transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <path d="M50 5L5 95h90L50 5z" stroke="#10B981" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="14" r="3" fill="#10B981" opacity="0.9" />
      </svg>
      <span
        className="font-sans font-light text-xs tracking-[0.4em] uppercase text-muted"
        style={{
          opacity: hide ? 0 : 1,
          transform: hide ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
        }}
      >
        Loading
      </span>
    </div>
  )
}
