import { motion } from 'framer-motion'
import { Code2, Layers, LayoutTemplate, Server, Plug, ShoppingCart, FileText, Gauge } from 'lucide-react'
import { accentAt } from '../data/palette'

const services = [
  { icon: Layers, title: 'Custom Web Applications', desc: 'End-to-end applications built around how your business actually works.' },
  { icon: Server, title: 'SaaS Applications', desc: 'Multi-tenant products with auth, billing, and dashboards baked in from day one.' },
  { icon: Code2, title: 'Frontend Development', desc: 'Fast, accessible interfaces with polished interactions and animation.' },
  { icon: Plug, title: 'Backend Development', desc: 'Reliable APIs, data models, and services that scale with your product.' },
  { icon: FileText, title: 'API Development', desc: 'Clean, documented REST APIs designed for the clients that consume them.' },
  { icon: ShoppingCart, title: 'E-commerce Websites', desc: 'Storefronts and checkout flows built to convert and easy to manage.' },
  { icon: LayoutTemplate, title: 'Landing Pages', desc: 'High-converting pages for launches, campaigns, and product marketing.' },
  { icon: Gauge, title: 'Website Optimization', desc: 'Performance and SEO audits that turn into measurable Lighthouse gains.' },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 bg-grid">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Services</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            What I can build
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const accent = accentAt(i)
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                className={`glass rounded-2xl p-6 transition-colors duration-300 ${accent.chipBorder}`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${accent.iconBg} border border-black/10 dark:border-white/10`}>
                  <s.icon size={18} className={accent.text} />
                </div>
                <h3 className="font-medium mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
