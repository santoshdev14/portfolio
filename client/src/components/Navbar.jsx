import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAudio } from '../hooks/useAudio'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const { theme, toggleTheme } = useTheme()
  const { playSound } = useAudio()

  useEffect(() => {
    const onScroll = () => {
      const sectionElements = links.map((link) => document.querySelector(link.href)).filter(Boolean)
      const scrollPosition = window.scrollY + 200

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${section.id}`)
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const handleClick = (href) => {
    playSound('click')
    setOpen(false)
    setActiveSection(href)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleToggleTheme = () => {
    playSound('click')
    toggleTheme()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 select-none">
      {/* Floating Capsule Navbar (as shown in user screenshot) */}
      <nav className="w-full max-w-6xl rounded-2xl px-6 py-3 flex items-center justify-between glass border border-slate-200/80 dark:border-white/10 shadow-2xl backdrop-blur-xl bg-white/85 dark:bg-slate-950/75 transition-all duration-300">
        {/* Brand: Santosh.dev */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleClick('#home') }}
          className="font-display font-semibold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center group cursor-pointer"
        >
          <span>Santosh</span>
          <span className="text-[#0284c7] dark:text-cyan-400 group-hover:brightness-125 transition-all">.dev</span>
        </a>

        {/* Center Nav Links in Monospace */}
        <ul className="hidden lg:flex items-center gap-7 font-mono text-[13px]">
          {links.map((link) => {
            const isActive = activeSection === link.href
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0284c7] dark:text-cyan-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right Actions: Theme toggle + Let's Talk pill */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="h-9 w-9 rounded-full flex items-center justify-center glass border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/25 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleClick('#contact') }}
            className="inline-flex items-center rounded-full px-5 py-2 text-xs font-mono font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            className="h-8 w-8 rounded-full flex items-center justify-center glass border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu - Full Light/Dark support */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-20 left-4 right-4 z-50 bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-white/15 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl text-slate-900 dark:text-white"
          >
            <ul className="flex flex-col gap-4 font-mono text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                    className="block py-1.5 text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-200 dark:border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleClick('#contact') }}
                  className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs font-mono uppercase shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
