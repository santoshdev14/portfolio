import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'
import { accentAt } from '../data/palette'

export default function Skills() {
  let cursor = 0

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Skills</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Tools I build with
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <h3 className="font-mono text-sm mb-5 text-text-dim" style={{ color: 'var(--color-text-dim)' }}>
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, i) => {
                  const accent = accentAt(cursor++)
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: gi * 0.08 + i * 0.04 }}
                      whileHover={{ y: -3, rotate: -0.5 }}
                      className={`group relative glass rounded-xl px-4 py-3 text-sm transition-all duration-200 ${accent.chipBorder}`}
                      style={{ '--tw-shadow-color': accent.shadow }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 30px -8px ${accent.shadow}`)}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
                    >
                      <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                      <span className={accent.text}>{skill}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
