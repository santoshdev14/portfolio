import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'

const FAQS = [
  {
    q: 'Are you currently available for freelance and contract work?',
    a: 'Yes, I am actively taking on select full-stack web development and interactive 3D web commissions for 2026. Whether you need an MVP built from scratch, architecture overhaul, or a high-converting web experience, feel free to get in touch.',
  },
  {
    q: 'What is your core technology stack?',
    a: 'My core stack centers on React 19, Three.js / WebGL, Node.js, Express, PostgreSQL, and modern cloud deployment. I also have deep production experience with Laravel, PHP legacy migrations, and real-time WebSockets.',
  },
  {
    q: 'What is the typical timeline for an MVP or web application?',
    a: 'Standard turnaround ranges from 2 to 4 weeks for focused MVPs or high-impact landing pages, and 4 to 8 weeks for complex multi-tenant SaaS platforms with authentication, payments, and role-based permissions.',
  },
  {
    q: 'Do you work with international clients and across time zones?',
    a: 'Absolutely. I regularly collaborate with remote teams and founders across North America, Europe, and Asia, maintaining clear daily asynchronous updates, milestone reviews, and flexible overlap hours.',
  },
  {
    q: 'How does your billing and project engagement work?',
    a: 'I offer both milestone-based fixed pricing (for well-defined scopes with transparent deliverables) and weekly sprint retainers (for fast-evolving startup products). You can also use the Project Estimator tool above for instant guidance.',
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)
  const { playSound } = useAudio()

  const toggle = (i) => {
    playSound('click')
    setOpenIndex((prev) => (prev === i ? -1 : i))
  }

  return (
    <section className="py-16 md:py-28 px-4 md:px-8 border-b border-white/5 bg-slate-950/70">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <HelpCircle size={13} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            Common Inquiries
          </h2>
          <p className="mt-2 text-xs font-mono text-slate-400">
            Everything you need to know about partnering on your next digital product.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-xl overflow-hidden transition-colors bg-white/5 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 text-cyan-400">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
