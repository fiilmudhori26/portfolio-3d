'use client'

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase text-gray-500 bg-gray-50 border border-[#E5E7EB] rounded-full">
            Trusted by 200+ companies worldwide
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-gray-900">
            Build Smarter.
            <br />
            <span className="text-gray-400">Scale Faster.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade digital solutions that transform your business.
            We combine strategy, design, and technology to deliver measurable results.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-sm"
            >
              Start a Project
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-900 border border-[#E5E7EB] rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}