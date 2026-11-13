import type { Metadata } from 'next'
import './globals.css'
import { personalInfo } from '@/lib/data'

export const metadata: Metadata = {
  title: `${personalInfo.name} · Web Developer & Digital Marketing`,
  description: `Portfolio of ${personalInfo.name} — ${personalInfo.title}. Building modern web applications with Next.js, TypeScript, and Supabase.`,
  keywords: [
    'Rahmad Akbar', 'Web Developer', 'Frontend Developer', 'Next.js',
    'TypeScript', 'Digital Marketing', 'Content Creator', 'Portfolio', 'Indonesia',
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} · Portfolio`,
    description: `${personalInfo.title} — Building modern web solutions with Next.js, TypeScript, and Supabase.`,
    url: 'https://rahmad-portfolio.vercel.app',
    siteName: `${personalInfo.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} · Portfolio`,
    description: `${personalInfo.title} — Building modern web solutions.`,
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Outfit:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20 selection:text-foreground">
        {children}
      </body>
    </html>
  )
}
