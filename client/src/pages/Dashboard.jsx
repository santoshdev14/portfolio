import { useRef } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../components/3d/HeroScene'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useDeviceCapability'
import { useTheme } from '../context/ThemeContext'

export default function Dashboard() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} className="relative min-h-screen pt-24 pb-16 bg-grid overflow-hidden">
      {/* Ambient glows — behind everything */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pink/rose blur at center-left */}
        <div 
          className="absolute top-[40%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] opacity-[0.14] dark:opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' }}
        />
        {/* Orange blur at bottom-left */}
        <div 
          className="absolute top-[80%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.12] dark:opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
        />
        {/* Blue/cyan blur at center-right (behind 3D scene) */}
        <div 
          className="absolute top-[30%] right-[10%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-[0.18] dark:opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        />
        {/* Purple/pink blur at far right */}
        <div 
          className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[110px] opacity-[0.15] dark:opacity-[0.09]"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        />
      </div>

      {/* 3D Canvas running behind all Dashboard content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <HeroScene reduceEffects={isMobile || reducedMotion} isLight={isLight} eventSource={containerRef} />
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6 flex flex-col gap-10 items-center justify-center min-h-[70vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-5xl md:text-6xl tracking-tight text-center text-slate-900 dark:text-white"
        >
          Dashboard <span className="text-[#0891b2] dark:text-cyan-400">Overview</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-slate-300 text-center max-w-2xl"
        >
          Welcome to your new dashboard with the same amazing 3D background.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full glass rounded-3xl p-8 min-h-[400px] border border-white/20 dark:border-white/10 flex items-center justify-center shadow-xl backdrop-blur-xl"
        >
          <p className="text-slate-500 dark:text-slate-400 italic font-mono text-sm">Dashboard content goes here...</p>
        </motion.div>
      </div>
    </section>
  )
}
