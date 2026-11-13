'use client'

import FullpageProvider from '@/components/FullpageProvider'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ScrollIndicator from '@/components/ScrollIndicator'
import LoadingScreen from '@/components/LoadingScreen'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <FullpageProvider>
      <LoadingScreen />
      <div className="section-overlay" id="sectionOverlay" />
      <Navbar />
      <Sidebar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <ScrollIndicator />
    </FullpageProvider>
  )
}
