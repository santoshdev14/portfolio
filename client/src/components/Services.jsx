import { motion } from 'framer-motion'
import { Layers, Server, Smartphone, ShoppingCart, LayoutTemplate, Gauge } from 'lucide-react'
import { accentAt } from '../data/palette'

const services = [
  {
    icon: Layers,
    title: 'Custom Web Applications',
    desc: 'End-to-end applications built around how your business actually works with reliable architecture.',
  },
  {
    icon: Server,
    title: 'SaaS Applications',
    desc: 'Multi-tenant products with authentication, role permissions, billing, and live dashboards from day one.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS and Android mobile applications built with React Native for fluid performance and offline sync.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    desc: 'Modern digital storefronts, payment gateways, and checkout funnels optimized for high conversion.',
  },
  {
    icon: LayoutTemplate,
    title: 'Landing Pages',
    desc: 'Fast, responsive, high-converting marketing pages that tell your brand story and capture qualified leads.',
  },
  {
    icon: Gauge,
    title: 'Website Optimization',
    desc: 'Performance audits, core web vitals, and SEO optimization that achieve 95+ Google Lighthouse scores.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-28 px-4 md:px-6 bg-grid">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Services</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            What I Can Build For You
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-3">
            Full-cycle development services tailored for startups, founders, and growing enterprises.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const accent = accentAt(i)
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className={`glass rounded-2xl p-7 transition-colors duration-300 ${accent.chipBorder} border border-slate-200/80 dark:border-white/10`}
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${accent.iconBg} border border-black/5 dark:border-white/10 shadow-sm`}>
                  <s.icon size={20} className={accent.text} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
