import type { Metadata, Viewport } from 'next'
import './globals.css'
import { personalInfo } from '@/lib/data'

const SITE_URL = 'https://portfolio-3d-tau-eight.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${personalInfo.name} Â· Web Developer & Digital Marketing`,
  description: `Portfolio of ${personalInfo.name} â€” ${personalInfo.title}. Building modern web applications with Next.js, TypeScript, Prisma/Drizzle, and PostgreSQL.`,
  keywords: [
    'Rahmad Akbar', 'Web Developer', 'Frontend Developer', 'Next.js',
    'TypeScript', 'Digital Marketing', 'Content Creator', 'Portfolio', 'Indonesia',
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${personalInfo.name} Â· Portfolio`,
    description: `${personalInfo.title} â€” Building modern web solutions with Next.js, TypeScript, Prisma/Drizzle, and PostgreSQL.`,
    url: SITE_URL,
    siteName: `${personalInfo.name} Portfolio`,
    locale: 'id_ID',
    type: 'website',
    images: [
      { url: '/og-image-1.png', width: 1200, height: 630, alt: `${personalInfo.name} â€” portfolio` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} Â· Portfolio`,
    description: `${personalInfo.title} â€” Building modern web solutions with Next.js, TypeScript, Prisma/Drizzle, and PostgreSQL.`,
    images: ['/og-image-1.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FBF7EF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: SITE_URL,
    address: { '@type': 'PostalAddress', addressLocality: 'Jember', addressRegion: 'Jawa Timur', addressCountry: 'ID' },
    sameAs: [personalInfo.social.github, personalInfo.social.linkedin, personalInfo.social.tiktok],
  }
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalInfo.name} Portfolio`,
    url: SITE_URL,
    author: { '@type': 'Person', name: personalInfo.name },
  }
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased selection:bg-accent/20 selection:text-ink">
        {children}
      </body>
    </html>
  )
}