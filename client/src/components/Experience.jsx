import { motion } from 'framer-motion'
import { experience } from '../data/experience'
import { accentAt } from '../data/palette'

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-grid">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Experience</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Where I've worked
          </h2>
        </motion.div>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-cyan-300/60" />

          <div className="flex flex-col gap-12">
            {experience.map((item, i) => {
              const accent = accentAt(i)
              return (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <span
                    className={`absolute -left-8 sm:-left-10 top-1.5 h-3.5 w-3.5 rounded-full ${accent.dot}`}
                    style={{ boxShadow: `0 0 12px 2px ${accent.shadow}` }}
                  />
                  <div className={`glass rounded-2xl p-6 ${accent.chipBorder}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-medium text-lg">{item.role}</h3>
                      <span className={`font-mono text-xs ${accent.text}`}>{item.duration}</span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-dim)' }}>
                      {item.company}
                    </p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-dim)' }}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className={`text-[11px] font-mono px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 ${accent.tagText}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
