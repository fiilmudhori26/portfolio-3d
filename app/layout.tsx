import type { Metadata } from 'next'
import './globals.css'
import { personalInfo } from '@/lib/data'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-3d-tau-eight.vercel.app'),
  title: `${personalInfo.name} · Web Developer & Digital Marketing`,
  description: `Portfolio of ${personalInfo.name} — ${personalInfo.title}. Building modern web applications with Next.js, TypeScript, Prisma/Drizzle, and PostgreSQL.`,
  keywords: [
    'Rahmad Akbar', 'Web Developer', 'Frontend Developer', 'Next.js',
    'TypeScript', 'Digital Marketing', 'Content Creator', 'Portfolio', 'Indonesia',
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} · Portfolio`,
    description: `${personalInfo.title} — Building modern web solutions with Next.js, TypeScript, Prisma/Drizzle, and PostgreSQL.`,
    url: 'https://portfolio-3d-tau-eight.vercel.app',
    siteName: `${personalInfo.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} · Portfolio`,
    description: `${personalInfo.title} — Building modern web solutions with Next.js, TypeScript, Prisma/Drizzle, and PostgreSQL.`,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased selection:bg-accent/20 selection:text-ink">
        {children}
      </body>
    </html>
  )
}
