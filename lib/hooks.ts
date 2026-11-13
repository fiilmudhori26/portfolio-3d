'use client'
import { useEffect, useRef, useState } from 'react'

export function useIntersectionShow<T extends HTMLElement>() {
  const ref = useRef<T>(null!)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) { setVisible(true); return }
    try {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
        { threshold: 0.15 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } catch {
      setVisible(true)
    }
  }, [])

  return { ref, visible }
}
