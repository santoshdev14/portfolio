import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, Zap, ChevronDown } from 'lucide-react'
import TunnelHeroScene from './3d/TunnelHeroScene'
import { useTheme } from '../context/ThemeContext'
import { useAudio } from '../hooks/useAudio'

const FREELANCE_HIGHLIGHTS = [
  { label: 'MVP Sprints & Fixed Scope', shortLabel: 'MVP Sprints', icon: Zap },
  { label: 'Direct 1-on-1 Communication', shortLabel: 'Direct 1-on-1', icon: Sparkles },
  { label: 'Production-Ready Code', shortLabel: 'Production Code', icon: CheckCircle2 },
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
      <div className="absolute inset-0 z-5 pointer-events-none bg-radial from-white/90 via-white/55 to-white/15 dark:from-slate-950/90 dark:via-slate-950/60 dark:to-slate-950/15 sm:from-white/75 sm:via-white/40 sm:to-transparent sm:dark:from-slate-950/80 sm:dark:via-slate-950/45 sm:dark:to-transparent transition-colors duration-300" />

      {/* Central Content Overlay */}
      <div className="tunnel__content">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Freelance Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-slate-950/85 backdrop-blur-md text-[#0284c7] dark:text-cyan-400 font-mono text-[9.5px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest mb-3 sm:mb-5 shadow-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284c7] dark:bg-cyan-400" />
            </span>
            <span className="font-semibold text-center hidden sm:inline">FREELANCE FULL STACK DEVELOPER &mdash; OPEN FOR CLIENT WORK</span>
            <span className="font-semibold text-center sm:hidden">FREELANCE FULL STACK DEV &bull; OPEN FOR WORK</span>
          </motion.div>

          {/* User Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-slate-900 dark:text-white uppercase tracking-tight leading-[1.02] sm:leading-[0.94] text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-center px-2 drop-shadow-sm"
          >
            SANTOSH VARMA
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-1.5 sm:mt-3 text-sm sm:text-xl md:text-3xl font-display font-bold text-gradient text-center px-2 drop-shadow-sm"
          >
            Full Stack Developer & 3D Web Creative
          </motion.div>

          {/* Freelance Bio Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm md:text-base max-w-xl text-center mt-2.5 sm:mt-4 font-normal leading-relaxed px-3 sm:px-4 drop-shadow-sm"
          >
            Helping startups, founders, and businesses turn ideas into fast, scalable web applications, robust custom backends, and interactive digital experiences. Available for freelance contracts & MVP builds.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 mt-5 sm:mt-7 pointer-events-auto px-3 w-full max-w-sm sm:max-w-none"
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold font-mono text-[10.5px] sm:text-xs uppercase tracking-wider sm:tracking-[0.18em] shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight size={13} className="shrink-0" />
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-transparent border border-slate-400/60 dark:border-white/25 text-slate-900 dark:text-white font-bold font-mono text-[10.5px] sm:text-xs uppercase tracking-wider sm:tracking-[0.18em] hover:border-[#0284c7] dark:hover:border-cyan-400 hover:text-[#0284c7] dark:hover:text-cyan-300 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>LET'S TALK</span>
            </button>
          </motion.div>

          {/* Freelance Value Propositions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-4 sm:mt-7 font-mono text-slate-700 dark:text-slate-300 pointer-events-auto px-2 max-w-xs sm:max-w-none"
          >
            {FREELANCE_HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/90 dark:bg-slate-900/85 backdrop-blur-md border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-slate-200 text-[9.5px] sm:text-[11px] shadow-sm"
                >
                  <Icon size={12} className="text-[#0284c7] dark:text-cyan-400 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </div>
              )
            })}
          </motion.div>

          {/* Animated Scroll Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 sm:mt-8 pointer-events-auto"
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 transition-colors cursor-pointer group"
              aria-label="Scroll to Projects"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100">
                Explore Work
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={14} className="text-[#0284c7] dark:text-cyan-400" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
