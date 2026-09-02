import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, Clock, Zap } from 'lucide-react'
import TunnelHeroScene from './3d/TunnelHeroScene'
import { useTheme } from '../context/ThemeContext'
import { useAudio } from '../hooks/useAudio'

const FREELANCE_HIGHLIGHTS = [
  { label: 'MVP Sprints & Fixed Scope', icon: Zap },
  { label: 'Direct 1-on-1 Communication', icon: Sparkles },
  { label: 'Production-Ready Code', icon: CheckCircle2 },
]

export default function Hero() {
  const { theme } = useTheme()
  const { playSound } = useAudio()
  const isLight = theme === 'light'

  const scrollTo = (href) => {
    playSound('click')
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="tunnel relative bg-grid">
      {/* 3D Infinite Perspective Tunnel Canvas */}
      <TunnelHeroScene isLight={isLight} />

      {/* Gentle Scrim Overlay for 3D background clarity & text contrast */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-radial from-white/75 via-white/40 to-transparent dark:from-slate-950/80 dark:via-slate-950/45 dark:to-transparent transition-colors duration-300" />

      {/* Central Content Overlay */}
      <div className="tunnel__content">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Freelance Availability Badge - 2026 removed */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-slate-950/85 backdrop-blur-md text-[#0284c7] dark:text-cyan-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-5 shadow-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284c7] dark:bg-cyan-400" />
            </span>
            <span className="font-semibold text-center">FREELANCE FULL STACK DEVELOPER &mdash; OPEN FOR CLIENT WORK</span>
          </motion.div>

          {/* User Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-slate-900 dark:text-white uppercase tracking-tight leading-[0.94] text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-center px-2 drop-shadow-sm"
          >
            SANTOSH VARMA
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-2 sm:mt-3 text-base sm:text-xl md:text-3xl font-display font-bold text-gradient text-center px-2 drop-shadow-sm"
          >
            Full Stack Developer & 3D Web Creative
          </motion.div>

          {/* Freelance Bio Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm md:text-base max-w-xl text-center mt-3 sm:mt-4 font-normal leading-relaxed px-4 drop-shadow-sm"
          >
            Helping startups, founders, and businesses turn ideas into fast, scalable web applications, robust custom backends, and interactive digital experiences. Available for freelance contracts & MVP builds.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-7 pointer-events-auto px-4"
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight size={13} />
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-transparent border border-slate-400/60 dark:border-white/25 text-slate-900 dark:text-white font-bold font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] hover:border-[#0284c7] dark:hover:border-cyan-400 hover:text-[#0284c7] dark:hover:text-cyan-300 active:scale-95 transition-all cursor-pointer"
            >
              <span>LET'S TALK</span>
            </button>
          </motion.div>

          {/* Freelance Value Propositions (Replaced Featured Pills) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 font-mono text-xs text-slate-700 dark:text-slate-300 pointer-events-auto px-3"
          >
            {FREELANCE_HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-slate-200 text-[10px] sm:text-[11px] shadow-sm"
                >
                  <Icon size={12} className="text-[#0284c7] dark:text-cyan-400" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
