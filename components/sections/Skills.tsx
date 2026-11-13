'use client'

import { skills as skillsData } from '@/lib/data'
import { useIntersectionShow } from '@/lib/hooks'
import { Code2, Server, Wrench, Megaphone } from 'lucide-react'

const GROUP_META: Record<string, { label: string; icon: React.ElementType }> = {
  frontend: { label: 'Frontend', icon: Code2 },
  backend: { label: 'Backend', icon: Server },
  tools: { label: 'Tools & Platform', icon: Wrench },
  design: { label: 'Design', icon: Megaphone },
}

// ─── SVG Logos ────────────────────────────────────────────

function JSIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <rect width="64" height="64" rx="8" fill="#F7DF1E" />
      <path d="M42.5 50c1.4 2.2 3.2 3.8 6.5 3.8 2.7 0 4.5-1.4 4.5-3.3 0-2.3-1.8-3.1-4.8-4.5l-1.6-.7c-4.7-2-7.8-4.5-7.8-9.8 0-4.9 3.7-8.6 9.5-8.6 4.1 0 7.1 1.4 9.2 5.2l-5 3.2c-1.1-2-2.3-2.8-4.2-2.8-1.9 0-3.1 1.2-3.1 2.8 0 2 1.2 2.8 4 4.1l1.6.7c5.5 2.4 8.6 4.8 8.6 10.2 0 5.9-4.6 9.1-10.8 9.1-6 0-9.9-2.9-11.8-6.7zm-17.7.1c1 1.8 1.9 3.4 4.2 3.4 2.1 0 3.5-.8 3.5-4V28h6.5v21.5c0 6.7-3.9 9.7-9.6 9.7-5.2 0-8.2-2.7-9.7-6z" fill="#000" />
    </svg>
  )
}

function TSIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <rect width="64" height="64" rx="8" fill="#3178C6" />
      <path d="M13 32v-2.8h8.6V44h-3.4V34.3z" fill="#fff" />
      <path d="M29.7 44v-2.8h7.4V29.2h-7.4v-2.8H40V44zm9.2-6.2c-.1-1.1.4-2.7 2-3.4 1.5-.6 3.4-.6 5.2 0 1.8.6 2.9 1.7 2.9 3.4l-2.9.1c0-.7-.4-1.2-1-1.5-.6-.3-1.5-.3-2.1 0-.5.2-.8.5-.8 1s.3.8.8 1c.5.2 1 .3 1.5.5l.7.3c1.9.7 3 1.7 3 3.9s-1.3 3.8-3.1 4.5c-3 .9-6.2.5-7.6-2.2l2.7-1.5c.4.8 1.3 1.2 2.4 1.2s2-.3 2.1-1c.1-.8-.4-1.2-1.2-1.6l-.6-.3c-1.7-.7-3.4-1.7-3.5-4z" fill="#fff" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <circle cx="32" cy="32" r="28" fill="#000" />
      <path d="M35.5 21h4v22h-4zm-2.6 10.8l-6.8 8.2H20l8.3-10-7.8-9.2h5.5l5.1 6 1.5 1.8z" fill="#fff" />
      <path d="M47.5 21L27.8 49h-3.1l19.7-28z" fill="#fff" />
    </svg>
  )
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <circle cx="32" cy="32" r="5.5" fill="#61DAFB" />
      <path d="M32 12c-8.5 0-15.8 3.7-20.2 9.2C7.4 26.7 6.5 33.5 9.5 37.8c2 2.9 5.8 4.7 10.3 5.3 2.8-3.8 6.9-5.3 12.2-5.3s9.4 1.5 12.2 5.3c4.5-.6 8.3-2.4 10.3-5.3 3-4.3 2.1-11.1-2.3-16.6C47.8 15.7 40.5 12 32 12z" fill="none" stroke="#61DAFB" strokeWidth="2.5" />
      <path d="M20.5 46.4c2.3 4.5 5.9 7.9 10.1 9.4 5 1.8 10 1 13.3-2.1 2.3-2.2 3.3-5.4 3.1-9.1-3-1.2-6.4-1.9-10-1.9-3.2 0-6.2.5-9 1.4l-7.5 2.3z" fill="none" stroke="#61DAFB" strokeWidth="2.5" />
      <path d="M20.5 17.6l7.5 2.3c2.8.9 5.8 1.4 9 1.4 3.6 0 7-.7 10-1.9-.2-3.7-1.2-6.9-3.5-9.1-3.3-3.1-8.3-3.9-13.3-2.1-4.1 1.5-7.7 4.9-9.7 9.4z" fill="none" stroke="#61DAFB" strokeWidth="2.5" />
    </svg>
  )
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M16 39.5c0-6.2 4.5-10.3 11.7-10.3 8.2 0 9.5 5.5 14.7 5.5 4.3 0 7.6-2.4 8.6-4.2-2.5 5.6-7.8 8.7-14 8.7-8 0-9.9-5.5-14.8-5.5-3.5 0-6.2 2.8-6.2 5.8zM10 43c0 6.2 4.5 10.3 11.7 10.3 8.2 0 9.5-5.5 14.7-5.5 4.3 0 7.6 2.4 8.6 4.2-2.5-5.6-7.8-8.7-14-8.7-8 0-9.9 5.5-14.8 5.5-3.5 0-6.2-2.8-6.2-5.8z" fill="#06B6D4" />
    </svg>
  )
}

function HTMLIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M13 4l3.5 44.5L32 58l15.5-9.5L51 4z" fill="#E34F26" />
      <path d="M47 6l-2.7 34L32 48.5 19.7 40l-1.2-15h6l.7 8.5L32 38l6.5-4.5.6-7H18.5l-.5-6h19.7zM47.6 6l.3-2H14.3l.3 2z" fill="#fff" />
    </svg>
  )
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M32 4L6 18v28l26 14 26-14V18z" fill="#339933" />
      <path d="M32 4L6 18v28l26 14 26-14V18z" fill="none" stroke="#248639" strokeWidth="1" />
      <path d="M23 24c-3.5 0-6.3 2-6.3 6s2.8 6 6.3 6c3.5 0 6.3-2 6.3-6s-2.8-6-6.3-6zm0 9c-1.4 0-2.5-1.3-2.5-3s1.1-3 2.5-3 2.5 1.3 2.5 3-1.1 3-2.5 3z" fill="#fff" />
      <path d="M39 24h-5v12h3v-9h2c1.9 0 3-1.3 3-3s-1.1-3-3-3z" fill="#fff" />
      <path d="M46 28.5v3.3c-1.4 2-3.2 3.2-5.3 3.2-1 0-2-.3-2.8-.8l-.9 2.5c1 .6 2.2 1 3.7 1C44 37.7 48 34 48 28.5c0-5.5-4-9.2-7.3-9.2-1.5 0-2.7.4-3.7 1l.9 2.5c.8-.5 1.8-.8 2.8-.8 2.1 0 4 1.2 5.3 3.2z" fill="#fff" />
    </svg>
  )
}

function PrismaIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M51 8L22.5 54.5c-1.5 2.3-4.8 2-5.8-.5L9 31c-1-2.4.5-5 3-5.3L48 8c2.3-.3 4 1.7 3 3.8z" fill="#2D3748" />
      <path d="M48.5 8L22 55c-.3.5-.8.5-1 .2s-.2-.8 0-1.2L45.5 9.5c.3-.7 1.3-.5 1.3.2l-1 14.3c0 .5.4 1 .9 1l3.5-.3c.9 0 1.5-1 1-1.8L50 9c.5-1-.3-1.5-1.5-1z" fill="#fff" />
    </svg>
  )
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M37.5 3.5c-1.5-.5-3 .8-2.5 2.5l5.5 20-18.5-4c-2-.5-3 2-1.5 3.5l27 26c1 1 2.8 0 2.5-1.5L42 38.5l18 3.5c2 .5 3-1.8 1.5-3.5l-24-35z" fill="#3ECF8E" />
    </svg>
  )
}

function FastifyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <circle cx="32" cy="32" r="28" fill="#000" />
      <path d="M22 17l-4 7h8l2.5 4-5.5 9 4.5 2 8-13-2.5-4 5.5-9-4.5-2-8 13-2.5 4z" fill="#fff" />
    </svg>
  )
}

function GitIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M56.5 30L35.5 9c-1.5-1.5-4-1.5-5.5 0L10 28.8c-1.5 1.5-1.5 4 0 5.5L31 55.2c1.5 1.5 4 1.5 5.5 0L56.5 36c1.5-1.5 1.5-4 0-5.5z" fill="#F05032" />
      <circle cx="25.5" cy="38.5" r="6.5" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M29 32l11-11" fill="none" stroke="#fff" strokeWidth="3" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M32 4C16.5 4 4 16.5 4 32c0 12.4 8 22.8 19.2 26.5 1.4.3 1.9-.6 1.9-1.3v-4.6c-7.8 1.7-9.4-3.4-9.4-3.4-1.3-3.3-3.1-4.2-3.1-4.2-2.5-1.7.2-1.7.2-1.7 2.8.2 4.3 2.9 4.3 2.9 2.5 4.3 6.6 3 8.2 2.3.3-1.8 1-3 1.7-3.7-6.2-.7-12.8-3.1-12.8-13.9 0-3.1 1.1-5.6 2.9-7.6-.3-.7-1.3-3.6.3-7.5 0 0 2.4-.8 7.8 2.9 2.3-.6 4.7-.9 7-.9s4.7.3 7 .9c5.4-3.7 7.8-2.9 7.8-2.9 1.6 3.9.6 6.8.3 7.5 1.8 2 2.9 4.5 2.9 7.6 0 10.8-6.6 13.2-12.8 13.9 1 .9 1.9 2.6 1.9 5.3v7.9c0 .7.5 1.6 1.9 1.3C52 54.8 60 44.4 60 32 60 16.5 47.5 4 32 4z" fill="#181717" />
    </svg>
  )
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M32 8L6 56h52z" fill="#000" />
    </svg>
  )
}

function VSCodeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <path d="M47 6L24 28l-8-6L8 28l12 12-12 12 8 6 8-6 23 22c2 1 5 0 5-3V9c0-3-3-4-5-3z" fill="#007ACC" />
      <path d="M24 28l23-22c2-1 5 0 5 3v46c0 3-3 4-5 3L24 36l12-12-12-12z" fill="#1F9CF0" />
    </svg>
  )
}

function ExcelIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <rect x="6" y="6" width="52" height="52" rx="10" fill="#217346" />
      <path d="M12 14l12 18-12 18h5l10-14 10 14h5L30 32l12-18h-5l-10 14-10-14z" fill="#fff" />
    </svg>
  )
}

function CapCutIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-11 md:h-11">
      <circle cx="32" cy="32" r="28" fill="#000" />
      <path d="M22 18c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h8V18zm12 0v28h8c2.2 0 4-1.8 4-4V22c0-2.2-1.8-4-4-4z" fill="#fff" />
    </svg>
  )
}

function CanvaIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11" aria-label="Canva">
      <defs>
        <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="100%" stopColor="#7B2FBE" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#canvaGrad)" />
      <text x="50" y="62" textAnchor="middle" fill="white" fontFamily="Arial,Helvetica,sans-serif" fontWeight="700" fontSize="32" letterSpacing="-1">Canva</text>
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11" aria-label="Figma">
      <rect x="8" y="8" width="38" height="38" rx="10" fill="#F24E1E" />
      <rect x="54" y="8" width="38" height="38" rx="10" fill="#FF7262" />
      <rect x="8" y="54" width="38" height="38" rx="10" fill="#A259FF" />
      <circle cx="73" cy="73" r="19" fill="#1ABCFE" />
      <path d="M46 73a19 19 0 0038 0" fill="#0ACF83" />
    </svg>
  )
}

// ─── Icon Router ──────────────────────────────────────────

const SVG_ICONS: Record<string, React.ComponentType> = {
  JavaScript: JSIcon,
  TypeScript: TSIcon,
  'Next.js': NextIcon,
  React: ReactIcon,
  'Tailwind CSS': TailwindIcon,
  'HTML/CSS': HTMLIcon,
  'Node.js': NodeIcon,
  'Prisma ORM': PrismaIcon,
  Supabase: SupabaseIcon,
  Fastify: FastifyIcon,
  Git: GitIcon,
  GitHub: GitHubIcon,
  Vercel: VercelIcon,
  'VS Code': VSCodeIcon,
  'Excel/Sheets': ExcelIcon,
  Canva: CanvaIcon,
  Figma: FigmaIcon,
  CapCut: CapCutIcon,
}

const INITIALS: Record<string, string> = {
  JavaScript: 'JS',
  TypeScript: 'TS',
  'Next.js': 'Nx',
  'Tailwind CSS': 'TW',
  'HTML/CSS': 'H5',
  'Node.js': 'Nj',
  'Prisma ORM': 'Pr',
  GitHub: 'Gh',
  'VS Code': 'VS',
  'Excel/Sheets': 'XL',
}

const LOGO_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  'Next.js': '#000',
  React: '#61DAFB',
  'Tailwind CSS': '#06B6D4',
  'HTML/CSS': '#E34F26',
  'Node.js': '#339933',
  'Prisma ORM': '#2D3748',
  Supabase: '#3ECF8E',
  Fastify: '#000',
  Git: '#F05032',
  GitHub: '#181717',
  Vercel: '#000',
  'VS Code': '#007ACC',
  'Excel/Sheets': '#217346',
  Canva: '#00C4CC',
  Figma: '#F24E1E',
  CapCut: '#000',
}

function TechIcon({ name }: { name: string }) {
  const SvgIcon = SVG_ICONS[name]
  if (SvgIcon) {
    return (
      <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl border border-border bg-surface hover:bg-border/50 transition-colors" title={name}>
        <SvgIcon />
      </div>
    )
  }

  const color = LOGO_COLORS[name] || '#666'
  const initial = INITIALS[name] || name.charAt(0).toUpperCase()
  return (
    <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl border border-border bg-surface hover:bg-border/50 transition-colors" title={name}>
      <span className="font-display text-lg md:text-xl font-bold leading-none" style={{ color }}>{initial}</span>
    </div>
  )
}

function SkillGroup({ groupKey }: { groupKey: string }) {
  const items = skillsData[groupKey as keyof typeof skillsData]
  const { ref, visible } = useIntersectionShow<HTMLDivElement>()
  const meta = GROUP_META[groupKey]
  if (!items || !Array.isArray(items)) return null
  const Icon = meta.icon

  return (
    <div ref={ref} className={`anim-hidden-gpu ${visible ? 'anim-visible-gpu' : ''} ${visible ? '' : 'anim-up'}`}>
      <h3 className="text-xs font-display font-semibold tracking-[0.1em] uppercase text-accent mb-4 flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" />
        {meta.label}
      </h3>
      <div className="flex flex-wrap gap-2 md:gap-2.5">
        {items.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1">
            <TechIcon name={s.name} />
            <span className="text-[10px] md:text-[11px] text-foreground/60 font-medium text-center leading-tight max-w-[52px] md:max-w-[56px]">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="section-2" data-section-index="2" className="section-full" style={{ background: '#0a0a0a' }}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-display font-semibold tracking-[0.15em] uppercase text-accent">Stack</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">Tech & Tools</h2>
          <p className="text-sm text-muted mt-3 max-w-xl mx-auto">Technologies I work with daily.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <SkillGroup groupKey="frontend" />
          <SkillGroup groupKey="backend" />
          <SkillGroup groupKey="tools" />
          <SkillGroup groupKey="design" />
        </div>
      </div>
    </section>
  )
}
