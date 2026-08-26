import { Mail, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/BrandIcons'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative mt-24 overflow-hidden border-t" style={{ borderColor: 'var(--color-border)' }}>
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[100px] -z-10 rounded-full" />
      
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24 flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
          Let's create something <span className="text-gradient">extraordinary.</span>
        </h2>
        <p className="text-lg max-w-lg mb-4" style={{ color: 'var(--color-text-dim)' }}>
          I'm currently available for freelance projects. Let's discuss how I can help your team build scalable and beautiful digital experiences.
        </p>
        <a 
          href="mailto:hello@santoshvarma.dev" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white glow-blue hover:brightness-110 transition-all duration-300 group"
        >
          <Mail size={18} />
          <span>Say Hello</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 items-center border-t pt-8" style={{ borderColor: 'var(--color-border)' }}>
          
          <div className="flex flex-col items-center md:items-start order-2 md:order-1">
            <p className="font-display font-semibold text-xl mb-1">
              Santosh<span className="text-gradient">.dev</span>
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-dim)' }}>
              © {new Date().getFullYear()} Santosh Varma.
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 font-mono text-xs order-1 md:order-2" style={{ color: 'var(--color-text-dim)' }}>
            {links.map((l) => (
              <li key={l.href}>
                <a onClick={(e) => { e.preventDefault(); scrollTo(l.href) }} href={l.href} className="hover:text-cyan-300 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex justify-center md:justify-end items-center gap-4 order-3">
            <a href="https://github.com/santoshdev14" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--color-text-dim)' }} className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-300 transition-all">
              <GithubIcon size={18} />
            </a>
            <a href="https://www.linkedin.com/in/santosh-varma-7a2425228?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--color-text-dim)' }} className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-300 transition-all">
              <LinkedinIcon size={18} />
            </a>
            <a href="https://www.instagram.com/santoshvarma.14" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: 'var(--color-text-dim)' }} className="p-2 rounded-full hover:bg-white/5 hover:text-cyan-300 transition-all">
              <InstagramIcon size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
