'use client'

import { useFullpage } from '@/components/FullpageProvider'

export default function ScrollIndicator() {
  const { currentSection } = useFullpage()
  const show = currentSection === 0

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="text-[10px] uppercase tracking-[4px] text-muted font-medium font-display">Scroll</span>
      <div className="w-[1.5px] h-14 bg-muted origin-top animate-scroll-pulse" />
    </div>
  )
}
