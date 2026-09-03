import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/BrandIcons'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-slate-950/60 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-display font-semibold text-lg tracking-tight text-slate-900 dark:text-white mb-1">
              Santosh<span className="text-[#0284c7] dark:text-cyan-400">.dev</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              &copy; {new Date().getFullYear()} Santosh Varma. All rights reserved.
            </p>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center gap-6 font-mono text-xs text-slate-600 dark:text-slate-400">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                  className="hover:text-[#0284c7] dark:hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/santoshdev14"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-cyan-300 hover:border-[#0284c7]/40 dark:hover:border-cyan-400/40 transition-all"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/santosh-varma-7a2425228?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-cyan-300 hover:border-[#0284c7]/40 dark:hover:border-cyan-400/40 transition-all"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://www.instagram.com/santoshvarma.14"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-cyan-300 hover:border-[#0284c7]/40 dark:hover:border-cyan-400/40 transition-all"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
