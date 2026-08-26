import { motion } from 'framer-motion'
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/BrandIcons'
import HeroScene from './3d/HeroScene'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useDeviceCapability'
import { useTheme } from '../context/ThemeContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.11, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stats = [
  { icon: Code2, value: '20+', label: 'Projects' },
  { icon: Layers, value: '3+', label: 'Years Exp.' },
  { icon: Zap, value: '100%', label: 'Satisfied' },
]

export default function Hero() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 bg-grid overflow-hidden">
      {/* Ambient glows — behind everything */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 72% 35%, rgba(79,157,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 45% 45% at 12% 75%, rgba(167,107,255,0.09) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full px-6 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ── Left: Text content ─────────────────────────────── */}
        <div>
          {/* Status badge */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 glass border border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
            </span>
            <span className="section-eyebrow text-[0.68rem] tracking-[0.16em]">Available for Freelance Projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-display font-bold tracking-tight leading-[1.06]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            I Build Digital{' '}
            <span className="block">Experiences That</span>
            <span className="text-gradient">Stand Out.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 max-w-md text-[0.97rem] leading-relaxed"
            style={{ color: 'var(--color-text-dim)' }}
          >
            Full-stack engineer specializing in modern web applications,
            scalable systems, and interactive digital experiences —
            from architecture to production.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white glow-blue hover:brightness-110 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              View My Work
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm glass hover:border-cyan-400/40 hover:bg-white/5 transition-all duration-300"
            >
              Let's Talk
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-10 flex flex-wrap gap-6"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Icon size={14} className="text-cyan-400" />
                </div>
                <div>
                  <p className="font-display font-bold text-base leading-none">{value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-dim)' }}>{label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="mt-9 flex items-center gap-1"
          >
            {[
              { icon: GithubIcon, href: 'https://github.com/santoshdev14', label: 'GitHub' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/santosh-varma-7a2425228?utm_source=share_via&utm_content=profile&utm_medium=member_ios', label: 'LinkedIn' },
              { icon: InstagramIcon, href: 'https://www.instagram.com/santoshvarma.14', label: 'Instagram' },
              { icon: Mail, href: 'mailto:santoshvarma01814@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl hover:bg-white/8 hover:text-cyan-300 transition-all duration-200"
                style={{ color: 'var(--color-text-dim)' }}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D Scene ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
          className="relative h-[360px] sm:h-[440px] md:h-[520px] rounded-3xl overflow-hidden"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(79,157,255,0.08) 0%, rgba(167,107,255,0.06) 50%, rgba(53,231,209,0.05) 100%)'
              : 'linear-gradient(135deg, rgba(5,7,13,0.95) 0%, rgba(10,14,26,0.9) 100%)',
            border: isLight
              ? '1px solid rgba(79,157,255,0.2)'
              : '1px solid rgba(79,157,255,0.1)',
            boxShadow: isLight
              ? '0 8px 40px rgba(79,157,255,0.1), inset 0 0 30px rgba(79,157,255,0.05)'
              : '0 8px 40px rgba(4,6,12,0.6), inset 0 0 30px rgba(79,157,255,0.03)',
          }}
        >
          <HeroScene reduceEffects={isMobile || reducedMotion} isLight={isLight} />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-dim)' }}>
          Scroll
        </span>
        <div className="relative w-[1px] h-10 overflow-hidden rounded-full" style={{ background: 'var(--color-border)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{ height: '45%', background: 'linear-gradient(to bottom, var(--color-cyan), transparent)' }}
            animate={{ y: ['-100%', '280%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
