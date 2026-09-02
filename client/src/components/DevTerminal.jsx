import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, RefreshCw } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'

const COMMANDS = {
  help: 'Available commands: help | skills | projects | experience | contact | matrix | date | whoami | clear',
  whoami: 'santosh_varma // Full-Stack Developer & 3D Web Creative',
  date: () => new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
  skills: 'Core Stack: React.js | Node.js | Three.js | PostgreSQL | TailwindCSS | REST APIs | Docker',
  projects: 'Shipped 20+ applications including NavOne Connect, Assignment Tracker, WSSD Grievance Portal & 3D Web Apps.',
  experience: '3+ Years experience building full-stack platforms, scalable backends, and responsive 3D web applications.',
  contact: 'Email: santoshvarma01814@gmail.com | LinkedIn: Santosh Varma | Location: Remote (India)',
  quote: '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
}

export default function DevTerminal() {
  const { playSound } = useAudio()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Santosh.dev Interactive Terminal [Version 2.4.0]' },
    { type: 'system', text: 'Type "help" or click quick options below.' },
  ])
  const [matrixActive, setMatrixActive] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase()
    playSound('command')

    if (!trimmed) return

    const newHistory = [...history, { type: 'user', text: `$ ${cmdStr}` }]

    if (trimmed === 'clear') {
      setHistory([])
      setMatrixActive(false)
      setInput('')
      return
    }

    if (trimmed === 'matrix') {
      setMatrixActive((prev) => !prev)
      newHistory.push({
        type: 'output',
        text: matrixActive ? '[Matrix Mode Disabled]' : 'Wake up, Neo... [Matrix Mode Enabled] 🟩🟩🟩',
      })
    } else if (COMMANDS[trimmed]) {
      const output = typeof COMMANDS[trimmed] === 'function' ? COMMANDS[trimmed]() : COMMANDS[trimmed]
      newHistory.push({ type: 'output', text: output })

      // Auto scroll screen down to matching section
      if (trimmed === 'skills') {
        setTimeout(() => {
          document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else if (trimmed === 'projects') {
        setTimeout(() => {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else if (trimmed === 'experience') {
        setTimeout(() => {
          document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else if (trimmed === 'contact') {
        setTimeout(() => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not recognized: "${trimmed}". Type "help" for a list of commands.`,
      })
    }

    setHistory(newHistory)
    setInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    executeCommand(input)
  }

  const handleQuickCommand = (cmd) => {
    executeCommand(cmd)
    inputRef.current?.focus()
  }

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden glass gradient-border border border-white/10 transition-all duration-500 shadow-2xl ${
        matrixActive ? 'shadow-emerald-500/20 border-emerald-500/30' : ''
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-slate-400">
            <TerminalIcon size={14} className={matrixActive ? 'text-emerald-400' : 'text-cyan-400'} />
            <span>santosh@dev-station:~</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {matrixActive && (
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse">
              MATRIX RUNNING
            </span>
          )}
          <button
            onClick={() => handleQuickCommand('clear')}
            title="Clear terminal"
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition cursor-pointer"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        className={`p-4 font-mono text-xs h-72 overflow-y-auto space-y-2 select-text ${
          matrixActive ? 'bg-slate-950 text-emerald-400 font-bold' : 'bg-slate-950/90 text-slate-200'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'user' && (
              <span className="text-cyan-400 font-semibold">{item.text}</span>
            )}
            {item.type === 'system' && (
              <span className="text-slate-400 italic">{item.text}</span>
            )}
            {item.type === 'output' && (
              <span className={matrixActive ? 'text-emerald-400' : 'text-slate-300'}>{item.text}</span>
            )}
            {item.type === 'error' && (
              <span className="text-rose-400 font-semibold">{item.text}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Row */}
      <form onSubmit={handleSubmit} className="flex items-center px-4 py-2.5 bg-slate-900/90 border-t border-white/10 font-mono text-xs">
        <span className={`mr-2 font-bold select-none ${matrixActive ? 'text-emerald-400' : 'text-cyan-400'}`}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command (e.g. skills, projects, contact)..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-500 font-mono text-xs"
        />
        <button type="submit" className="text-slate-400 hover:text-cyan-300 transition cursor-pointer ml-2">
          <CornerDownLeft size={14} />
        </button>
      </form>

      {/* Quick Action Pills for Touch & Mobile */}
      <div className="p-3 bg-slate-950 border-t border-white/5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-500 mr-1 flex items-center gap-1">
          <Sparkles size={11} className="text-cyan-400" /> Quick:
        </span>
        {['skills', 'projects', 'experience', 'contact', 'matrix'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleQuickCommand(cmd)}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}
