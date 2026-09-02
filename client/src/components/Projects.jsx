import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Heart } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'
import { projects } from '../data/projects'
import { accentAt } from '../data/palette'
import WobbleCard from './WobbleCard'

const projectHighlights = {
  'navone-connect': [
    'Built multi-role RBAC security allowing document flow matching internal hierarchies.',
    'Integrated real-time notification alerts with sub-second feedback using custom WebSocket channels.',
    'Optimized PostgreSQL query schemas to support concurrent bulk uploads of correspondence files.'
  ],
  'assignment-tracker': [
    'Engineered recursive department routing rules to direct document tasks automatically.',
    'Designed visual pipeline dashboard tracking average completion times for pending tasks.',
    'Created custom hooks for optimistic updates, ensuring snappy client responsiveness.'
  ],
  'admin-module': [
    'Developed modular permission manager supporting highly granular functional roles.',
    'Added security log audit trails tracking every administrative configuration update.',
    'Implemented active session reporting charts using lightweight visual graphs.'
  ],
  'wssd-grievance': [
    'Refactored Laravel database indexes, resulting in a 40% query latency improvement.',
    'Constructed REST endpoints facilitating secure cross-agency data syncing.',
    'Resolved UI bottleneck by introducing lazy-loaded paginated grids.'
  ],
  'maha-ehrms': [
    'Connected VICIdial calling API interfaces, supporting instant phone dials.',
    'Built drag-and-drop workflow builder using customized JavaScript canvas nodes.',
    'Rendered call duration charts with zero-latency updates.'
  ],
  'housing-magic': [
    'Engineered clean, responsive modular UI code reusable across multiple sub-sections.',
    'Implemented client-side listing cache decreasing network loads.',
    'Polished CSS styling ensuring responsive rendering down to 320px screens.'
  ],
  'roha-crm-lms': [
    'Maintained legacy PHP system while rolling out upgraded dashboard visualizers.',
    'Designed responsive layout optimizing mobile field sales entries.',
    'Built lead funnel reports with automatic CSV export utilities.'
  ]
}

function WindowFrame({ title, children }) {
  return (
    <div className="w-full h-full flex flex-col bg-slate-950/40 select-none">
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/40 border-b border-white/5">
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]/90 block"></span>
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/90 block"></span>
          <span className="w-2 h-2 rounded-full bg-[#27c93f]/90 block"></span>
        </div>
        <div className="text-[9px] font-mono text-slate-500 truncate max-w-[150px]">{title}</div>
        <div className="w-6"></div>
      </div>
      {/* Content */}
      <div className="flex-1 p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        {children}
      </div>
    </div>
  )
}

function ProjectMockup({ id, interactive = false, activeState, setActiveState }) {
  if (id === 'navone-connect') {
    const isApproved = activeState?.approved ?? false
    return (
      <div className="flex flex-col gap-2 h-full text-slate-400">
        <div className="flex justify-between items-center border-b border-white/5 pb-1 select-none">
          <span className="font-semibold text-slate-200 text-[10px] sm:text-[11px]">Correspondence Queue</span>
          <span className="text-[8px] sm:text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">3 Active</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between bg-white/5 p-1.5 rounded border border-white/5 transition-all">
            <span className="truncate max-w-[120px] sm:max-w-[160px] text-slate-300">📁 Adani-Audit_v2.pdf</span>
            {isApproved ? (
              <span className="text-[8px] sm:text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.2 rounded font-semibold border border-emerald-500/20">Approved</span>
            ) : (
              <span className="text-[8px] sm:text-[9px] text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded font-semibold animate-pulse border border-amber-500/20">Pending Admin</span>
            )}
          </div>
          {interactive && (
            <button
              onClick={() => setActiveState?.({ ...activeState, approved: !isApproved })}
              className="mt-1 w-full text-[9px] bg-blue-500 hover:bg-blue-600 text-white py-1 rounded transition font-mono flex items-center justify-center gap-1 cursor-pointer"
            >
              {isApproved ? 'Reset Document Status' : '✓ Approve Document (Admin)'}
            </button>
          )}
          <div className="flex items-center justify-between bg-white/5 p-1.5 rounded border border-white/5">
            <span className="truncate max-w-[120px] sm:max-w-[160px] text-slate-300">✉️ Dept Transfer Request</span>
            <span className="text-[8px] sm:text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.2 rounded font-semibold border border-emerald-500/20">Approved</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 p-1.5 rounded border border-white/5 opacity-60">
            <span className="truncate max-w-[120px] sm:max-w-[160px] text-slate-300">🎫 SLA Notification Fix</span>
            <span className="text-[8px] sm:text-[9px] text-blue-400 bg-blue-400/10 px-1.5 py-0.2 rounded font-semibold border border-blue-500/20">Closed</span>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'assignment-tracker') {
    const progress = activeState?.progress ?? 70
    return (
      <div className="flex gap-2 h-full flex-col sm:flex-row">
        <div className="flex-1 flex flex-col gap-1.5">
          <span className="text-[8px] sm:text-[9px] font-semibold text-purple-400 border-b border-purple-500/20 pb-0.5 select-none">IN PROGRESS</span>
          <div className="bg-purple-950/20 border border-purple-500/20 rounded p-1.5 text-[9px] flex flex-col gap-1.5">
            <span className="text-slate-200 truncate">Doc Verification Flow</span>
            <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between items-center text-[8px]">
              <span className="text-slate-500">Progress: {progress}%</span>
            </div>
            {interactive && (
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => setActiveState?.({ ...activeState, progress: Math.min(100, progress + 10) })}
                  className="flex-1 text-[8px] bg-purple-500 text-white rounded py-0.5 cursor-pointer"
                >
                  Work +10%
                </button>
                <button
                  onClick={() => setActiveState?.({ ...activeState, progress: 0 })}
                  className="text-[8px] bg-slate-800 text-slate-400 rounded px-1.5 py-0.5 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <span className="text-[8px] sm:text-[9px] font-semibold text-emerald-400 border-b border-emerald-500/20 pb-0.5 select-none">COMPLETED</span>
          <div className="bg-emerald-950/10 border border-emerald-500/20 rounded p-1.5 text-[9px] opacity-75">
            <span className="text-slate-300 truncate line-through">Routing Logic v1</span>
            <span className="text-[8px] text-emerald-400 block mt-1">✓ Verified</span>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'admin-module') {
    const roles = activeState?.roles ?? { admin: true, auditor: false, staff: true }
    return (
      <div className="flex flex-col gap-1.5 h-full text-slate-400">
        <div className="flex justify-between items-center text-[8px] sm:text-[9px] border-b border-white/5 pb-1 select-none">
          <span>Active Roles: <strong className="text-cyan-400">{Object.values(roles).filter(Boolean).length}</strong></span>
          <span>Users: <strong className="text-cyan-400">128</strong></span>
        </div>
        <div className="flex flex-col gap-1 text-[9px] flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between p-0.5">
            <span className="text-slate-300">👑 System Admin</span>
            <span className="text-emerald-400 font-semibold text-[8px] bg-emerald-500/10 px-1 rounded border border-emerald-500/20">Full Control</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-1 p-0.5">
            <span className="text-slate-300">💼 Auditor</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-slate-500">{roles.auditor ? 'Enabled' : 'Disabled'}</span>
              <button
                disabled={!interactive}
                onClick={() => setActiveState?.({ ...activeState, roles: { ...roles, auditor: !roles.auditor } })}
                className={`w-6 h-3.5 rounded-full flex items-center p-0.5 transition-colors ${roles.auditor ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'} ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="w-2.5 h-2.5 bg-white rounded-full block" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-1 p-0.5">
            <span className="text-slate-300">👥 Dept Staff</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-slate-500">{roles.staff ? 'Enabled' : 'Disabled'}</span>
              <button
                disabled={!interactive}
                onClick={() => setActiveState?.({ ...activeState, roles: { ...roles, staff: !roles.staff } })}
                className={`w-6 h-3.5 rounded-full flex items-center p-0.5 transition-colors ${roles.staff ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'} ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="w-2.5 h-2.5 bg-white rounded-full block" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'wssd-grievance') {
    const sla = activeState?.sla ?? 98.4
    const resolved = activeState?.resolved ?? 12450
    return (
      <div className="flex flex-col gap-1 h-full">
        <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-slate-400 select-none">
          <span>Grievance Tracker</span>
          <span className="text-[8px] bg-pink-500/15 text-pink-400 px-1 rounded animate-pulse">Live</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-1 select-none">
          <div className="bg-white/5 p-1 rounded border border-white/5 text-center">
            <div className="text-[7px] sm:text-[8px] text-slate-500">RESOLVED</div>
            <div className="text-xs sm:text-sm font-semibold text-pink-400">{resolved.toLocaleString()}+</div>
          </div>
          <div className="bg-white/5 p-1 rounded border border-white/5 text-center">
            <div className="text-[7px] sm:text-[8px] text-slate-500">SLA RATE</div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-400">{sla}%</div>
          </div>
        </div>
        {/* Chart */}
        <div className="mt-1 flex items-end justify-between h-7 sm:h-9 bg-black/40 rounded p-1">
          <div className="w-[12%] h-[40%] bg-pink-500/30 rounded-t" />
          <div className="w-[12%] h-[60%] bg-pink-500/40 rounded-t" />
          <div className="w-[12%] h-[55%] bg-pink-500/50 rounded-t" />
          <div className="w-[12%] h-[80%] bg-pink-500/60 rounded-t" />
          <div className="w-[12%] h-[95%] bg-gradient-to-t from-pink-500 to-purple-400 rounded-t" />
        </div>
        {interactive && (
          <button
            onClick={() => setActiveState?.({ ...activeState, resolved: resolved + Math.floor(Math.random() * 5) + 1, sla: parseFloat((95 + Math.random() * 4).toFixed(1)) })}
            className="mt-1 w-full text-[8px] bg-pink-500 hover:bg-pink-600 text-white py-0.5 rounded transition font-mono cursor-pointer"
          >
            Refetch System SLA Logs
          </button>
        )}
      </div>
    )
  }

  if (id === 'maha-ehrms') {
    const dialedNumber = activeState?.dialedNumber ?? ''
    const callStatus = activeState?.callStatus ?? 'IDLE'

    const handleKeyClick = (val) => {
      if (!interactive) return
      if (dialedNumber.length >= 10) return
      setActiveState?.({ ...activeState, dialedNumber: dialedNumber + val })
    }

    const handleCall = () => {
      if (!interactive) return
      if (callStatus === 'IDLE') {
        if (!dialedNumber) return
        setActiveState?.({ ...activeState, callStatus: 'CALLING' })
        setTimeout(() => {
          setActiveState?.((prev) => ({ ...prev, callStatus: 'CONNECTED' }))
        }, 1500)
      } else {
        setActiveState?.({ ...activeState, callStatus: 'IDLE', dialedNumber: '' })
      }
    }

    return (
      <div className="flex gap-1.5 h-full items-center justify-between">
        <div className="flex-1 flex flex-col gap-0.5 justify-center">
          <div className="text-[7px] text-slate-500 uppercase tracking-wider select-none">VICIdial Dialer</div>
          <div className={`text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 select-none ${callStatus === 'CONNECTED' ? 'text-emerald-400' : callStatus === 'CALLING' ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}>
            {callStatus === 'CONNECTED' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
            {callStatus === 'CALLING' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />}
            {callStatus}
          </div>
          <div className="text-[8px] sm:text-[9px] text-slate-200 font-mono mt-0.5 truncate bg-black/30 px-1 py-0.5 rounded min-h-[16px] max-w-[90px]">
            {dialedNumber || 'Enter number'}
          </div>
          {interactive && (
            <button
              onClick={handleCall}
              className={`mt-1 text-[8px] text-white py-0.5 px-1 rounded font-semibold transition cursor-pointer ${callStatus !== 'IDLE' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
            >
              {callStatus !== 'IDLE' ? 'Hang Up' : 'Call'}
            </button>
          )}
        </div>
        {/* Mini Dialpad */}
        <div className="grid grid-cols-3 gap-0.5 bg-white/5 p-1 rounded border border-white/5 w-18 shrink-0 select-none">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              disabled={!interactive}
              onClick={() => handleKeyClick(n)}
              className="w-[18px] h-[18px] bg-white/5 hover:bg-white/10 active:bg-white/20 rounded flex items-center justify-center text-[8px] text-slate-300 font-mono border border-white/5 transition-all cursor-pointer"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'housing-magic') {
    const filterIndex = activeState?.filterIndex ?? 0
    const properties = [
      { name: 'Greenwood Residency', price: '₹1.85 Cr', rating: '4.8', loc: 'Mumbai' },
      { name: 'Saraswati Heights', price: '₹75 Lakh', rating: '4.5', loc: 'Pune' },
      { name: 'Skyline Mansion', price: '₹4.20 Cr', rating: '4.9', loc: 'South Mum' },
    ]
    const prop = properties[filterIndex]

    return (
      <div className="flex flex-col gap-1 h-full">
        <div className="bg-white/5 p-1 rounded border border-white/5 flex items-center gap-1 select-none">
          <span className="text-slate-500 text-[8px]">🔍</span>
          <span className="text-[8px] text-slate-300 truncate">Search: Apartments, {prop.loc}</span>
        </div>
        <div className="flex gap-1.5 mt-0.5">
          <div className="flex-1 bg-white/5 border border-white/5 rounded overflow-hidden flex flex-col">
            <div className="h-6 sm:h-7 bg-slate-900 flex items-center justify-center text-xs select-none text-white/10 font-bold bg-grid">
              🏠
            </div>
            <div className="p-1 flex flex-col gap-0.5 text-[8px] select-none">
              <span className="text-slate-200 font-semibold truncate">{prop.name}</span>
              <span className="text-amber-400 font-bold">{prop.price}</span>
              <div className="flex justify-between text-[7px] text-slate-500">
                <span>{prop.loc}</span>
                <span>⭐ {prop.rating}</span>
              </div>
            </div>
          </div>
        </div>
        {interactive && (
          <div className="flex gap-1 justify-between mt-1">
            {properties.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActiveState?.({ ...activeState, filterIndex: idx })}
                className={`flex-1 text-[7px] py-0.5 rounded transition cursor-pointer ${filterIndex === idx ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}
              >
                Prop {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (id === 'roha-crm-lms') {
    const leads = activeState?.leads ?? 452
    const contacted = Math.floor(leads * 0.7)
    const converted = Math.floor(leads * 0.25)

    return (
      <div className="flex flex-col gap-1.5 h-full justify-center">
        <div className="flex justify-between items-center text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-wider select-none">
          <span>Lead Pipeline Funnel</span>
          {interactive && (
            <button
              onClick={() => setActiveState?.({ ...activeState, leads: leads + 5 })}
              className="text-[7px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1 rounded hover:bg-amber-400/30 cursor-pointer"
            >
              + Add Lead
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-12 text-right text-[7px] text-slate-400">Total Leads</span>
            <div className="flex-1 bg-white/5 border border-white/5 rounded h-3 overflow-hidden relative">
              <div className="bg-amber-400/80 h-full w-full" />
              <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-slate-900">{leads}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-12 text-right text-[7px] text-slate-400">Contacted</span>
            <div className="flex-1 bg-white/5 border border-white/5 rounded h-3 overflow-hidden relative">
              <div className="bg-amber-400/60 h-full w-[70%]" />
              <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-slate-900">{contacted}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-12 text-right text-[7px] text-slate-400">Converted</span>
            <div className="flex-1 bg-white/5 border border-white/5 rounded h-3 overflow-hidden relative">
              <div className="bg-amber-400/40 h-full w-[25%]" />
              <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-slate-200">{converted}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function ProjectCard({ project, onOpen, index }) {
  const accent = accentAt(index)
  const [wished, setWished] = useState(false)

  const handleWish = (e) => {
    e.stopPropagation()
    setWished((prev) => !prev)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={project.size === 'lg' ? 'md:col-span-2' : ''}
    >
      <WobbleCard
        className={`group glass rounded-2xl overflow-hidden cursor-pointer ${accent.chipBorder} h-full flex flex-col border border-white/10 relative`}
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      >
        {/* Wishlist Heart Button (Reference Site Style) */}
        <button
          type="button"
          onClick={handleWish}
          aria-label="Save project"
          className={`absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wished
              ? 'bg-rose-500 text-white scale-110 shadow-lg'
              : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
          }`}
        >
          <Heart size={14} className={wished ? 'fill-current animate-[wishPop_0.38s]' : ''} />
        </button>

        {/* Drop Badge */}
        <div className="absolute top-3 left-3 z-30 px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold tracking-wider bg-black/70 border border-white/10 text-cyan-300">
          DROP 0{index + 1}
        </div>

        <div className="relative overflow-hidden bg-slate-950/80 h-44 sm:h-48 border-b border-white/5 shrink-0">
          <WindowFrame title={`${project.id}.jsx`}>
            <ProjectMockup id={project.id} />
          </WindowFrame>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-lg mb-2 text-text group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{project.title}</h3>
            <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: 'var(--color-text-dim)' }}>
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 ${accent.tagText}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </WobbleCard>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mockupStates, setMockupStates] = useState({})

  const categories = ['All', 'Full-Stack', 'Backend & CRM', 'Frontend']

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Full-Stack') return p.tech.includes('Node.js')
    if (selectedCategory === 'Backend & CRM') return p.tech.includes('Laravel') || p.tech.includes('Core PHP')
    if (selectedCategory === 'Frontend') return p.tech.includes('React.js') || (p.tech.includes('CSS') && !p.tech.includes('Node.js') && !p.tech.includes('PHP'))
    return false
  })

  const activeIndex = active ? projects.findIndex((p) => p.id === active.id) : 0
  const activeAccent = accentAt(activeIndex)

  const activeState = active ? (mockupStates[active.id] || {}) : {}
  const setActiveState = (updater) => {
    if (!active) return
    setMockupStates((prev) => {
      const current = prev[active.id] || {}
      const updated = typeof updater === 'function' ? updater(current) : updater
      return { ...prev, [active.id]: updated }
    })
  }

  return (
    <section id="projects" className="relative py-16 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="section-eyebrow mb-3">Projects</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Selected work
          </h2>
        </motion.div>

        {/* Categories / Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 text-xs sm:text-sm font-mono rounded-full border border-black/5 dark:border-white/5 transition-colors cursor-pointer select-none ${
                selectedCategory === cat
                  ? 'text-slate-900 dark:text-white font-medium'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {selectedCategory === cat && (
                <motion.span
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-cyan-600/30 dark:border-cyan-400/30 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <motion.div layout className="grid md:grid-cols-3 gap-6 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-surface gradient-border rounded-2xl flex flex-col md:flex-row h-auto max-h-[90vh] overflow-y-auto md:overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close project details"
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-full border border-slate-300/40 dark:border-white/15 transition-all hover:scale-110 cursor-pointer shadow-md"
              >
                <X size={16} />
              </button>

              {/* Left Side: Info & Text */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto max-h-none md:max-h-[80vh]">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider mb-2 block ${activeAccent.text}`}>
                    Featured Project
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4 text-text">{active.title}</h3>
                  <p className="leading-relaxed mb-6 text-sm text-text-dim">
                    {active.description}
                  </p>

                  <h4 className="text-xs font-semibold text-text mb-2 uppercase tracking-wider font-mono">Key Highlights</h4>
                  <ul className="space-y-2 mb-6 text-xs text-text-dim">
                    {(projectHighlights[active.id] || []).map((highlight, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${activeAccent.dot}`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {active.tech.map((t) => (
                      <span key={t} className={`text-[10px] font-mono px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 ${activeAccent.tagText}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4 border-t border-black/5 dark:border-white/5 pt-6">
                  <a
                    href={active.github}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-mono glass hover:border-cyan-600/40 dark:hover:border-cyan-300/40 transition-all hover:-translate-y-0.5"
                  >
                    <GithubIcon size={14} /> Code
                  </a>
                  <a
                    href={active.demo}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-mono bg-gradient-to-r from-blue-500 to-purple-500 text-white glow-blue hover:brightness-110 transition-all hover:-translate-y-0.5"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>

              {/* Right Side: Interactive Mockup Stage */}
              <div className="flex-1 bg-slate-950 p-6 md:p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-black/5 dark:border-white/5 md:overflow-y-auto max-h-none md:max-h-[80vh]">
                <div className="w-full max-w-md bg-slate-900/40 rounded-xl border border-white/10 overflow-hidden flex flex-col aspect-video md:aspect-[4/3] shadow-2xl animate-fade-in">
                  {/* Mock browser header */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-white/5 shrink-0">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 block"></span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 select-none bg-slate-950 px-3 py-0.5 rounded border border-white/5 w-1/2 text-center truncate">
                      {active.id}.dev
                    </div>
                    <div className="w-12"></div>
                  </div>
                  {/* Mock content window */}
                  <div className="flex-1 p-4 bg-slate-950 relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                    <ProjectMockup
                      id={active.id}
                      interactive={true}
                      activeState={activeState}
                      setActiveState={setActiveState}
                    />
                  </div>
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-3 select-none text-center">
                  ✨ Click and interact directly with the simulated UI elements above!
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
