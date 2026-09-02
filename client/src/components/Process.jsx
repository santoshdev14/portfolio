import { motion } from 'framer-motion'
import { Search, Compass, Code2, Rocket } from 'lucide-react'
import { accentAt } from '../data/palette'

const steps = [
  { icon: Search, title: 'Discovery', desc: 'We talk through your goals, users, and constraints to define what success looks like.' },
  { icon: Compass, title: 'Planning', desc: 'I map out architecture, scope, and milestones so there are no surprises later.' },
  { icon: Code2, title: 'Development', desc: 'Iterative builds with regular check-ins, so you always know where things stand.' },
  { icon: Rocket, title: 'Launch & Support', desc: 'Deployment, handover, and ongoing support after the project goes live.' },
]

export default function Process() {
  return (
    <section className="relative py-16 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">How I Work</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            A process built on clarity
          </h2>
        </motion.div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-400/50 via-purple-400/40 to-cyan-300/50" />

          {steps.map((step, i) => {
            const accent = accentAt(i)
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center flex flex-col items-center"
              >
                <div
                  className={`relative z-10 h-[72px] w-[72px] rounded-2xl flex items-center justify-center mb-5 glass gradient-border bg-gradient-to-br ${accent.iconBg}`}
                  style={{ boxShadow: `0 0 40px -12px ${accent.shadow}` }}
                >
                  <step.icon size={26} className={accent.text} />
                </div>
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: 'var(--color-text-dim)' }}>
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
