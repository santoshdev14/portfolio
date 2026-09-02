import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Database, ShieldCheck, Zap, Server, ExternalLink } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'

const HOTSPOTS = [
  {
    id: 'frontend',
    title: 'Three.js & React 19 Frontend',
    tag: 'Client Layer',
    desc: 'WebGL canvas, responsive physics, and hardware-accelerated shaders at 60 FPS.',
    top: '32%',
    left: '28%',
    icon: Zap,
    color: '#38bdf8',
  },
  {
    id: 'rbac',
    title: 'Hierarchical RBAC Engine',
    tag: 'Security Core',
    desc: 'Multi-role authorization matching internal enterprise hierarchies with zero leak.',
    top: '48%',
    left: '62%',
    icon: ShieldCheck,
    color: '#a855f7',
  },
  {
    id: 'db',
    title: 'PostgreSQL Relational Storage',
    tag: 'Data Layer',
    desc: 'Optimized B-tree indexes, ACID compliance, and sub-10ms query latency.',
    top: '72%',
    left: '42%',
    icon: Database,
    color: '#2dd4bf',
  },
  {
    id: 'api',
    title: 'High-Concurrency REST & Sockets',
    tag: 'API Gateway',
    desc: 'Express & Node.js channels supporting real-time alerts and bulk correspondence.',
    top: '55%',
    left: '78%',
    icon: Server,
    color: '#fbbf24',
  },
]

export default function HotspotShowcase() {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0])
  const { playSound } = useAudio()

  const handleSelect = (hs) => {
    playSound('hover')
    setActiveHotspot(hs)
  }

  return (
    <section className="py-16 md:py-28 px-4 md:px-8 border-b border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 block mb-2">
              Interactive System Anatomy
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              Shop The Architecture
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Click any pulsating hotspot below to inspect the engineering architecture and subsystems behind every production deployment.
          </p>
        </div>

        {/* Interactive Architecture Stage */}
        <div className="relative rounded-2xl border border-white/10 overflow-hidden aspect-[16/10] sm:aspect-[16/8] bg-slate-900/60 p-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Central System Schematic Diagram */}
          <div className="w-full max-w-4xl h-full flex flex-col justify-between py-6 relative z-1">
            {/* Top row: Client Browser & 3D Layer */}
            <div className="flex justify-between items-center px-8 sm:px-16 border-b border-white/10 pb-6">
              <div className="bg-slate-950 px-4 py-2 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-300">
                🌐 Client Browser (React 19 + Canvas)
              </div>
              <div className="text-slate-600 font-mono text-xs hidden sm:block">&larr; WebSocket bi-directional stream &rarr;</div>
              <div className="bg-slate-950 px-4 py-2 rounded-lg border border-purple-500/30 text-xs font-mono text-purple-300">
                🔒 Reverse Proxy & SSL Gateway
              </div>
            </div>

            {/* Middle row: Microservices / Logic Nodes */}
            <div className="grid grid-cols-3 gap-4 px-6 my-auto text-center font-mono text-[11px]">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                Auth & RBAC Middleware
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                Business Logic & Controllers
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                Queues & Background Workers
              </div>
            </div>

            {/* Bottom row: Data Tier */}
            <div className="flex justify-between items-center px-8 sm:px-16 border-t border-white/10 pt-6">
              <div className="bg-slate-950 px-4 py-2 rounded-lg border border-emerald-500/30 text-xs font-mono text-emerald-300">
                🗄️ PostgreSQL Database (Primary)
              </div>
              <div className="text-slate-600 font-mono text-xs hidden sm:block">&larr; Read Replicas & Connection Pooling &rarr;</div>
              <div className="bg-slate-950 px-4 py-2 rounded-lg border border-amber-500/30 text-xs font-mono text-amber-300">
                ⚡ In-Memory Cache (Redis)
              </div>
            </div>
          </div>

          {/* Interactive Pulsating Hotspots */}
          {HOTSPOTS.map((hs) => {
            const isSelected = activeHotspot.id === hs.id
            return (
              <div
                key={hs.id}
                className="hotspot"
                style={{ top: hs.top, left: hs.left }}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(hs)}
                  className={`hotspot__dot transition-transform ${isSelected ? 'scale-125 border-cyan-400' : ''}`}
                  style={{ background: hs.color }}
                  aria-label={hs.title}
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                </button>
              </div>
            )
          })}

          {/* Active Hotspot Preview Tag Card */}
          <AnimatePresence mode="wait">
            {activeHotspot && (
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-6 right-6 z-30 max-w-sm w-full bg-slate-950/95 border border-white/15 rounded-xl p-5 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border"
                    style={{ color: activeHotspot.color, borderColor: `${activeHotspot.color}40`, backgroundColor: `${activeHotspot.color}15` }}
                  >
                    {activeHotspot.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">HOTSPOT INSPECTOR</span>
                </div>
                <h4 className="font-display font-bold text-base text-white mb-1">
                  {activeHotspot.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeHotspot.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
