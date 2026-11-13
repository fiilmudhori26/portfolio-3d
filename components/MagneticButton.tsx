'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  as?: 'a' | 'button'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export function MagneticButton({ children, className = '', as = 'a', href, target, rel, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 15 })
  const springY = useSpring(y, { stiffness: 300, damping: 15 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
    const maxDist = 150
    if (dist > maxDist) { x.set(0); y.set(0); return }
    const strength = (1 - dist / maxDist) * 8
    x.set((e.clientX - centerX) / rect.width * strength)
    y.set((e.clientY - centerY) / rect.height * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const Tag = as === 'button' ? 'button' : 'a'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Tag href={href} target={target} rel={rel} onClick={onClick} className={className}>
        {children}
      </Tag>
    </motion.div>
  )
}