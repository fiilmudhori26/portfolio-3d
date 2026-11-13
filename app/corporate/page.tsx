'use client'

import Navigation from './Navigation'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'

export default function CorporateLanding() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}
