import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { accentAt } from '../data/palette'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir) => {
    setDirection(dir)
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]
  const accent = accentAt(index)

  return (
    <section className="relative py-16 md:py-28 px-4 md:px-6 bg-grid">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow mb-3">Testimonials</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-14">
            What clients say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative glass gradient-border rounded-2xl p-8 sm:p-10 min-h-[280px] flex items-center">
            <Quote className="absolute top-6 left-6 text-black/5 dark:text-white/10" size={40} />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.name}
                custom={direction}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < current.rating ? `fill-current ${accent.text}` : 'text-black/15 dark:text-white/15'}
                    />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-7">{current.review}</p>
                <div className="flex items-center justify-center gap-3">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${accent.iconBg} border border-black/10 dark:border-white/10 flex items-center justify-center font-display text-sm font-semibold ${accent.text}`}>
                    {current.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{current.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-dim)' }}>
                      {current.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-cyan-300/40 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  className={`h-1.5 rounded-full transition-all ${i === index ? `w-6 ${accentAt(i).dot}` : 'w-1.5 bg-black/20 dark:bg-white/20'}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-cyan-300/40 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
