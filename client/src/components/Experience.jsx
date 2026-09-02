import { motion } from 'framer-motion'
import { Briefcase, Calendar, Award } from 'lucide-react'
import { experience } from '../data/experience'
import { accentAt } from '../data/palette'

// Calculate total experience duration dynamically from November 2022
function calculateTotalExperience() {
  const startDate = new Date(2022, 10, 1) // November 2022
  const now = new Date()
  const totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return { years, months, display: `${years}+ Years` }
}

const experienceWithTenure = [
  {
    ...experience[0],
    tenure: '1+ Year (Current)',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  },
  {
    ...experience[1],
    tenure: '2 Years 3 Mos',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
]

export default function Experience() {
  const expStats = calculateTotalExperience()

  return (
    <section id="experience" className="relative py-16 md:py-28 px-4 md:px-6 bg-grid">
      <div className="mx-auto max-w-4xl">
        {/* Section Header with Total Year Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Year Count Pill Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md text-[#0284c7] dark:text-cyan-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Calendar size={13} className="shrink-0" />
            <span className="hidden sm:inline">TOTAL EXPERIENCE: {expStats.display} (NOV 2022 &mdash; PRESENT)</span>
            <span className="sm:hidden">EXPERIENCE: {expStats.display} (2022 &mdash; PRESENT)</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Where I've Worked
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-3">
            {expStats.years}+ years of shipping production platforms, government CRM portals, and scalable cloud architectures.
          </p>
        </motion.div>

        {/* Timeline with Year Count on Each Position */}
        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-[5px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-cyan-300/60" />

          <div className="flex flex-col gap-8 sm:gap-12">
            {experienceWithTenure.map((item, i) => {
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
                    className={`absolute -left-6 sm:-left-10 top-1.5 h-3 sm:h-3.5 w-3 sm:w-3.5 rounded-full ${accent.dot}`}
                    style={{ boxShadow: `0 0 12px 2px ${accent.shadow}` }}
                  />
                  <div className={`glass rounded-2xl p-6 sm:p-7 ${accent.chipBorder} border border-slate-200/80 dark:border-white/10 shadow-sm`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-display font-semibold text-lg sm:text-xl text-slate-900 dark:text-white">
                          {item.role}
                        </h3>
                        {/* Year Count Badge for this Role */}
                        <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.tenure}
                        </span>
                      </div>
                      <span className={`font-mono text-xs ${accent.text}`}>{item.duration}</span>
                    </div>

                    <p className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                      {item.company}
                    </p>
                    <p className="text-sm leading-relaxed mb-4 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 ${accent.tagText}`}
                        >
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
