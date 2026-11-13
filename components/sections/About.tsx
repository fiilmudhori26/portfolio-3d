'use client'

import Image from 'next/image'
import { personalInfo, about } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'

export default function About() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-1" data-section-index="1" ref={ref} className="section-full">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Kiri: foto */}
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-left'}`} style={{ transitionDelay: '0ms' }}>
          <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl border border-border">
            <Image
              src={personalInfo.avatar || '/images/profile.png'}
              alt={personalInfo.name}
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Kanan: konten */}
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-right'}`} style={{ transitionDelay: '150ms' }}>
          <p className="label-mono mb-3">About</p>
          <h2 className="font-sans font-black tracking-[-0.04em] leading-[0.95] text-5xl sm:text-6xl text-foreground">
            Santri.<br />
            Developer<span className="text-pink">.</span>
          </h2>
          <p className="text-base text-ink-2 leading-relaxed mt-6 mb-8 max-w-md">{about.summary}</p>

          <dl className="grid grid-cols-2 gap-5 mb-8">
            {[
              { label: 'Location', value: personalInfo.location },
              { label: 'Email', value: personalInfo.email },
              { label: 'Phone', value: personalInfo.phone },
              { label: 'Hafidz', value: '30 Juz' },
            ].map((item) => (
              <div key={item.label}>
                <dt className="label-mono !text-[9px]">{item.label}</dt>
                <dd className="text-sm font-semibold text-foreground mt-1 break-words">{item.value}</dd>
              </div>
            ))}
          </dl>

          <a href={personalInfo.cvDownload || '#'} download className="btn btn-pink">
            Download CV <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
