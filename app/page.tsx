'use client'

import FullpageProvider from '@/components/FullpageProvider'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import LoadingScreen from '@/components/LoadingScreen'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <FullpageProvider>
      <LoadingScreen />
      <Navbar />
      <Sidebar />
      <main className="bg-paper md:pl-14">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <footer className="border-t border-line bg-card">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono !text-[9px]">© 2026 Rahmad Akbar · Jember, Indonesia</p>
            <nav aria-label="Footer" className="flex items-center gap-5">
              <a href="https://github.com/fiilmudhori26" target="_blank" rel="noopener noreferrer" className="label-mono !text-[9px] no-underline hover:text-accent transition-colors">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/Rahmadakbar" target="_blank" rel="noopener noreferrer" className="label-mono !text-[9px] no-underline hover:text-accent transition-colors">LinkedIn ↗</a>
              <a href="https://www.tiktok.com/@_arvyn24" target="_blank" rel="noopener noreferrer" className="label-mono !text-[9px] no-underline hover:text-accent transition-colors">TikTok ↗</a>
              <a href="mailto:rahmad26akbar@gmail.com" className="label-mono !text-[9px] no-underline hover:text-accent transition-colors">Email ↗</a>
            </nav>
          </div>
        </footer>
      </main>
    </FullpageProvider>
  )
}
