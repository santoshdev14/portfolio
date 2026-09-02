import { motion } from 'framer-motion'
import { Layers, Cpu, Server, Sparkles, ArrowUpRight } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'

const PROMOS = [
  {
    title: 'Full-Stack SaaS',
    tag: 'Enterprise Platforms',
    desc: 'React, Node.js, PostgreSQL with RBAC security and multi-tenant architectures.',
    icon: Layers,
    href: '#projects',
    gradient: 'from-blue-600/30 via-slate-900 to-slate-950',
    accent: '#38bdf8',
  },
  {
    title: '3D & WebGL Canvas',
    tag: 'Interactive Experiences',
    desc: 'Three.js, custom shaders, and particle physics that stand out.',
    icon: Cpu,
    href: '#projects',
    gradient: 'from-purple-600/30 via-slate-900 to-slate-950',
    accent: '#c084fc',
  },
  {
    title: 'Cloud & System APIs',
    tag: 'High Concurrency',
    desc: 'REST & WebSocket gateways, telephony integrations & microservices.',
    icon: Server,
    href: '#services',
    gradient: 'from-emerald-600/30 via-slate-900 to-slate-950',
    accent: '#34d399',
  },
  {
    title: 'Speed & Design Systems',
    tag: 'Sub-second UX',
    desc: 'Lighthouse 95+ performance, fluid micro-interactions, responsive down to 320px.',
    icon: Sparkles,
    href: '#skills',
    gradient: 'from-amber-600/30 via-slate-900 to-slate-950',
    accent: '#fbbf24',
  },
]

export default function PromoGrid() {
  const { playSound } = useAudio()

  const scrollTo = (href) => {
    playSound('click')
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 border-b border-white/5 bg-slate-950/80">
      <div className="max-w-7xl mx-auto">
        <div className="promo-grid">
          {PROMOS.map((promo, i) => {
            const Icon = promo.icon
            return (
              <motion.a
                key={promo.title}
                href={promo.href}
                onClick={(e) => { e.preventDefault(); scrollTo(promo.href) }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="promo-card group relative overflow-hidden aspect-[3/4] flex flex-col justify-between p-6 rounded-none border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer"
              >
                {/* Background visual gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${promo.gradient} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

                {/* Top header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    {promo.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                {/* Middle Icon */}
                <div className="relative z-10 my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                    <Icon size={26} style={{ color: promo.accent }} />
                  </div>
                </div>

                {/* Bottom label & description */}
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {promo.desc}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
