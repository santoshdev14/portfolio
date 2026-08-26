import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'

const stats = [
  { value: 20, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Commitment' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl font-semibold text-gradient">
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow mb-3">About</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
            A developer who cares about the details.
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-dim)' }}>
            I'm a software developer with 3+ years of experience designing and building web
            applications end-to-end — from data models and APIs to the interfaces people
            actually use. I work with startups and small teams who need a product built right
            the first time.
          </p>
          <p className="leading-relaxed mb-8" style={{ color: 'var(--color-text-dim)' }}>
            My philosophy is simple: ship things that are fast, maintainable, and considered.
            Good architecture and good design aren't in tension — they come from the same
            attention to detail.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass text-sm">
              <MapPin size={15} className="text-cyan-300" />
              Remote · Based in India
            </div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass text-sm">
              <Sparkles size={15} className="text-cyan-300" />
              Open to new freelance projects
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-dim)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative gradient-border glass rounded-2xl p-8 sm:p-10 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(79,157,255,0.35), transparent 70%)' }}
          />
          <p className="font-mono text-xs text-cyan-300 mb-4">// current-focus.json</p>
          <pre className="text-sm leading-relaxed overflow-x-auto font-mono" style={{ color: 'var(--color-text-dim)' }}>
{`{
  "role": "Full Stack Developer",
  "availability": "Freelance",
  "stack": ["React", "Node.js", "PostgreSQL"],
  "interests": [
    "scalable systems",
    "interactive interfaces",
    "developer tooling"
  ],
  "status": "accepting new projects"
}`}
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
