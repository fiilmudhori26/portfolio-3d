'use client'

import { personalInfo } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'
import ContactForm from './ContactForm'

const socialLinks = [
  { href: personalInfo.social.github, label: 'GitHub' },
  { href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { href: personalInfo.social.tiktok, label: 'TikTok' },
]

export default function Contact() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="contact" data-section-index="4" ref={ref} className="relative bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="rule-top pt-6">
          <p className="label-mono">N°05 — Colophon</p>
        </div>

        <h2 className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'} font-display font-black tracking-[-0.04em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl text-ink mt-6 max-w-5xl`}>
          Mari bangun<br />sesuatu yang<br /><em className="italic font-light text-accent">nyata.</em>
        </h2>

        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-block font-display italic font-black tracking-[-0.02em] text-2xl sm:text-4xl lg:text-5xl text-accent underline underline-offset-8 decoration-accent/30 hover:decoration-accent transition-colors mt-10 break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
        >
          {personalInfo.email}
        </a>

        <ContactForm />

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a href={personalInfo.cvDownload || '#'} download className="btn btn-ink">
            Download CV
          </a>
          <a href="https://wa.me/62882008321724" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="WhatsApp">
            WhatsApp
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-10 border-t border-line mt-14 pt-6">
          <div>
            <p className="label-mono !text-[10px]">Find me</p>
            <ul className="mt-3 space-y-1.5">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-editorial font-mono text-xs uppercase tracking-[0.16em] no-underline">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="label-mono !text-[10px]">Colophon</p>
            <p className="text-xs text-muted leading-relaxed mt-3 max-w-xs md:ml-auto">
              © {new Date().getFullYear()} Rahmad Akbar · Disetel dalam Fraunces, Inter &amp; JetBrains Mono · Jember, Indonesia · Semua project handmade.<br /><br />Referensi (guru, dosen, mentor) tersedia atas permintaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
