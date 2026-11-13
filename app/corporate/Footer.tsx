'use client'

import { Linkedin, Twitter, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="py-16 sm:py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <a href="#" className="text-lg font-bold tracking-tight text-gray-900">
              NEXUS<span className="text-gray-400">CORP</span>
            </a>
            <p className="mt-4 text-sm text-gray-500 max-w-md leading-relaxed">
              Enterprise-grade digital solutions that transform businesses. 
              We combine strategy, design, and technology to deliver measurable results.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-4">Services</h4>
            <ul className="space-y-3">
              {['Consulting', 'Development', 'Security', 'Cloud'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; 2026 NexusCorp. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}