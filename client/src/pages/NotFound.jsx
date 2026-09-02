import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 bg-grid relative overflow-hidden bg-slate-950">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full blur-[140px] opacity-25 -z-10"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.9), rgba(168,85,247,0.4), transparent 70%)' }}
      />

      <div className="max-w-md w-full text-center flex flex-col items-center relative z-10 py-12">
        {/* Large 404 Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display font-black text-8xl sm:text-9xl md:text-[10rem] tracking-tighter leading-none select-none text-gradient drop-shadow-2xl"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-2xl sm:text-3xl text-white mt-4 mb-3"
        >
          Page Not Found
        </motion.h2>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto"
        >
          The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
        </motion.p>

        {/* Only ONE button: Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold font-mono text-xs uppercase tracking-[0.18em] shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Home size={15} />
            <span>BACK TO HOME PAGE</span>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
