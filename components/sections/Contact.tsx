'use client'

import { personalInfo, stats } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'
import { Mail, MapPin, Phone } from 'lucide-react'

const socialLinks = [
  {
    href: personalInfo.social.github,
    label: 'GitHub',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    href: personalInfo.social.linkedin,
    label: 'LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    href: personalInfo.social.tiktok,
    label: 'TikTok',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36z',
  },
]

export default function Contact() {
  const { ref, visible } = useIntersectionShow<HTMLElement>()

  return (
    <section id="section-5" data-section-index="5" ref={ref} className="section-full">
      <div className="w-full max-w-5xl mx-auto">
        <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}>
          <div className="text-center mb-12">
            <span className="text-[10px] font-display font-semibold tracking-[0.15em] uppercase text-accent">Contact</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">Get In Touch</h2>
            <p className="text-sm text-muted mt-3 max-w-xl mx-auto">Open for internship, collaboration, or just a chat.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Kontak info */}
          <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-left'}`} style={{ transitionDelay: '100ms' }}>
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted/60">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="block text-sm font-medium text-foreground/80 hover:text-accent transition-colors no-underline mt-0.5">{item.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground/80 mt-0.5">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-8">
              <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted/60">Social</span>
              <div className="flex gap-3 mt-3">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-muted hover:bg-accent hover:text-white hover:border-accent transition-all duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={link.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats + Quick CTA */}
          <div className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-right'}`} style={{ transitionDelay: '200ms' }}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="card-subtle text-center p-5">
                  <div className="font-display text-2xl font-bold text-foreground">
                    {s.value}<span className="text-muted text-lg">{s.suffix}</span>
                  </div>
                  <div className="text-[10px] font-medium tracking-[0.04em] text-muted/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="card-subtle p-6">
              <h3 className="font-display text-sm font-semibold mb-1">Let&apos;s work together</h3>
              <p className="text-xs text-muted mb-4">I&apos;m currently looking for internship or entry-level opportunities.</p>
              <a href={`mailto:${personalInfo.email}`}
                className="block w-full text-center px-5 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:brightness-110 transition-all active:scale-95 no-underline">
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
