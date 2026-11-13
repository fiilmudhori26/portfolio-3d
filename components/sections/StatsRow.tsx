'use client'

import { stats } from '@/lib/data'
import { useEffect, useRef } from 'react'

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = el.querySelectorAll('.count-up')
          counters.forEach((c) => {
            const target = parseInt(c.getAttribute('data-count') || '0', 10)
            if (isNaN(target)) return
            let current = 0
            const step = Math.ceil(target / (600 / 16))
            const timer = setInterval(() => {
              current += step
              if (current >= target) { current = target; clearInterval(timer) }
              c.textContent = String(current)
            }, 16)
          })
          observer.disconnect()
        }
      })
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Component is now embedded in Contact section directly
  return null
}
