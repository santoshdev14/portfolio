import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { MapPin, Sparkles, Terminal, FileCode2 } from 'lucide-react'
import DevTerminal from './DevTerminal'

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
  const [activeTab, setActiveTab] = useState('json') // 'json' | 'terminal'

  return (
    <section id="about" className="relative py-14 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left Column: Bio and Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow mb-2 sm:mb-3">About</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white">
            A developer who cares about the details.
          </h2>
          <p className="leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            I'm a software developer with 3+ years of experience designing and building web
            applications end-to-end — from data models and APIs to the interfaces people
            actually use. I work with startups and teams who need a product built right
            the first time.
          </p>
          <p className="leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            My philosophy is simple: ship things that are fast, maintainable, and considered.
            Good architecture and good design aren't in tension — they come from the same
            attention to detail.
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 glass text-xs sm:text-sm border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200">
              <MapPin size={14} className="text-[#0284c7] dark:text-cyan-400 shrink-0" />
              <span>Remote · Based in India</span>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 glass text-xs sm:text-sm border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200">
              <Sparkles size={14} className="text-[#0284c7] dark:text-cyan-400 shrink-0" />
              <span>Open to new freelance projects</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <p className="text-xs sm:text-sm mt-1 text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Code Card (current-focus.json) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-full overflow-hidden"
        >
          {/* Switcher Tabs - responsive & touch friendly */}
          <div className="flex items-center justify-between sm:justify-end gap-2 mb-3">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 sm:hidden">
              PROFILE INSPECTOR
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('json')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'json'
                    ? 'bg-[#0284c7]/10 dark:bg-cyan-500/15 text-[#0284c7] dark:text-cyan-300 border border-[#0284c7]/30 dark:border-cyan-500/30 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileCode2 size={13} />
                <span>focus.json</span>
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'terminal'
                    ? 'bg-[#0284c7]/10 dark:bg-cyan-500/15 text-[#0284c7] dark:text-cyan-300 border border-[#0284c7]/30 dark:border-cyan-500/30 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Terminal size={13} />
                <span>terminal</span>
              </button>
            </div>
          </div>

          {activeTab === 'json' ? (
            /* current-focus.json card with high-contrast syntax highlighting in light & dark mode */
            <div className="relative gradient-border glass rounded-2xl p-5 sm:p-7 md:p-8 overflow-hidden border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-slate-950/80 shadow-xl w-full">
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-48 sm:h-56 w-48 sm:w-56 rounded-full blur-3xl opacity-40 dark:opacity-70"
                style={{ background: 'radial-gradient(circle, rgba(79,157,255,0.35), transparent 70%)' }}
              />
              <p className="font-mono text-xs text-[#0284c7] dark:text-cyan-400 font-semibold mb-4 tracking-wide">
                // current-focus.json
              </p>
              <div className="overflow-x-auto">
                <pre className="text-[12px] sm:text-[13px] md:text-sm leading-relaxed font-mono text-slate-800 dark:text-slate-200">
                  <span className="text-slate-500 dark:text-slate-400">{'{'}</span>{'\n'}
                  {'  '}<span className="text-[#0369a1] dark:text-sky-300 font-medium">"role"</span>: <span className="text-emerald-700 dark:text-emerald-400">"Full Stack Developer"</span>,{'\n'}
                  {'  '}<span className="text-[#0369a1] dark:text-sky-300 font-medium">"availability"</span>: <span className="text-emerald-700 dark:text-emerald-400">"Freelance"</span>,{'\n'}
                  {'  '}<span className="text-[#0369a1] dark:text-sky-300 font-medium">"stack"</span>: [<span className="text-purple-700 dark:text-purple-300">"React"</span>, <span className="text-purple-700 dark:text-purple-300">"Node.js"</span>, <span className="text-purple-700 dark:text-purple-300">"PostgreSQL"</span>],{'\n'}
                  {'  '}<span className="text-[#0369a1] dark:text-sky-300 font-medium">"interests"</span>: [{'\n'}
                  {'    '}<span className="text-slate-700 dark:text-slate-300">"scalable systems"</span>,{'\n'}
                  {'    '}<span className="text-slate-700 dark:text-slate-300">"interactive interfaces"</span>,{'\n'}
                  {'    '}<span className="text-slate-700 dark:text-slate-300">"developer tooling"</span>{'\n'}
                  {'  '}],{'\n'}
                  {'  '}<span className="text-[#0369a1] dark:text-sky-300 font-medium">"status"</span>: <span className="text-emerald-700 dark:text-emerald-400">"accepting new projects"</span>{'\n'}
                  <span className="text-slate-500 dark:text-slate-400">{'}'}</span>
                </pre>
              </div>
            </div>
          ) : (
            <DevTerminal />
          )}
        </motion.div>
      </div>
    </section>
  )
}
