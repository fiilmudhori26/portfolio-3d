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
      <main className="bg-paper min-h-screen md:pl-14">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </FullpageProvider>
  )
}
