'use client'

import { BarChart3, Shield, Cloud, Headphones, Code, Zap } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Strategic Consulting',
    description: 'Data-driven strategies aligned with your business goals. We identify opportunities and build roadmaps that deliver ROI.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security infrastructure with compliance frameworks. Protect your data while scaling with confidence.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud architecture designed for growth. Migrate, modernize, and manage with zero downtime.',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored software solutions built with modern stacks. From web apps to enterprise platforms, we ship quality.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock technical support with dedicated account managers. We keep your business running smoothly.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed and efficiency across your entire tech stack. Reduce costs and improve user experience simultaneously.',
  },
]

export default function Features() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-gray-500 bg-white border border-[#E5E7EB] rounded-full">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Everything you need to scale
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Comprehensive services designed to take your business from concept to market leadership.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 bg-white rounded-2xl border border-[#E5E7EB] hover:border-gray-300 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 border border-[#E5E7EB] mb-5 text-gray-700 group-hover:bg-gray-100 transition-colors">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}