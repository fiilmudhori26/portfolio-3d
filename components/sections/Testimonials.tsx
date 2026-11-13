'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/data'

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-28 md:py-36">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-sub">Testimonials</span>
          <h2 className="display-lg">Kind Words</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="card p-7 flex flex-col"
            >
              <p className="text-ink-2/70 text-sm leading-relaxed flex-1 mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-ink-2/70">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-ink-2/70">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials