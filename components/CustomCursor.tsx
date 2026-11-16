'use client'

import { useEffect, useRef, useState } from 'react'
import { ENABLE_CUSTOM_CURSOR } from '@/lib/hooks'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'

/**
 * Custom cursor: titik 6px accent (#B3402A) + ring 34px hairline token `line`
 * yang tertinggal (lerp 0.18); ring jadi `accent` saat hover elemen interaktif.
 * Hanya aktif pada pointer:fine dan bukan prefers-reduced-motion.
 * Matikan dengan ENABLE_CUSTOM_CURSOR di lib/hooks.ts.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!ENABLE_CUSTOM_CURSOR) return
    const fineMq = window.matchMedia('(pointer: fine)')
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fineMq.matches && !reduceMq.matches)
    update()
    fineMq.addEventListener('change', update)
    reduceMq.addEventListener('change', update)
    return () => {
      fineMq.removeEventListener('change', update)
      reduceMq.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    const pointer = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let hovering = false
    let seen = false

    const setRingHover = (active: boolean) => {
      ring.classList.toggle('border-accent', active)
      ring.classList.toggle('border-line', !active)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      if (!seen) {
        seen = true
        ringPos.x = pointer.x
        ringPos.y = pointer.y
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      hovering = !!target?.closest(INTERACTIVE_SELECTOR)
      setRingHover(hovering)
    }
    const onPointerOut = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        hovering = false
        setRingHover(false)
      }
    }

    let raf = 0
    const tick = () => {
      ringPos.x += (pointer.x - ringPos.x) * 0.18
      ringPos.y += (pointer.y - ringPos.y) * 0.18
      const scale = hovering ? 1.6 : 1
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('pointerout', onPointerOut, { passive: true })
    raf = window.requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      window.cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor fixed top-0 left-0 z-[70] pointer-events-none w-[34px] h-[34px] rounded-full border border-line opacity-0 transition-[border-color] duration-150"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor fixed top-0 left-0 z-[70] pointer-events-none w-[6px] h-[6px] rounded-full bg-accent opacity-0"
      />
    </>
  )
}
