import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/BrandIcons'

const initialForm = { name: '', email: '', projectType: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email.'
    }
    if (!form.projectType) next.projectType = 'Please select a project type.'
    if (!form.message.trim()) next.message = 'Please add a short project description.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setStatus('submitting')
      setErrorMessage('')
      try {
        const response = await fetch('https://portfolio-c5hh.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })

        const data = await response.json()
        if (response.ok) {
          setStatus('success')
          setSubmitted(true)
          setForm(initialForm)
        } else {
          setStatus('error')
          setErrorMessage(data.error || 'Something went wrong. Please try again.')
        }
      } catch (err) {
        console.error('Contact form submission error:', err)
        setStatus('error')
        setErrorMessage('Failed to connect to the server. Please verify your internet connection or try again later.')
      }
    }
  }

  const field = (name, label, type = 'text', extra) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="block text-xs font-mono ml-1" style={{ color: 'var(--color-text-dim)' }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          rows={4}
          disabled={status === 'submitting'}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-purple-500/50 resize-none shadow-sm disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          {...extra}
        />
      ) : (
        <input
          id={name}
          type={type}
          disabled={status === 'submitting'}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-purple-500/50 shadow-sm disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          {...extra}
        />
      )}
      {errors[name] && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors[name]}</p>}
    </div>
  )

  return (
    <>
      <section id="contact" className="relative py-28 px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(53, 231, 209, 0.08) 0%, transparent 70%)',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-4xl text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Contact</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-dim)' }}>
            Let's turn your idea into a fast, scalable, and memorable digital experience.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-start">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-3xl p-6 sm:p-10 flex flex-col gap-6 shadow-xl"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {field('name', 'Name')}
              {field('email', 'Email', 'email')}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="projectType" className="block text-xs font-mono ml-1" style={{ color: 'var(--color-text-dim)' }}>
                  Project Type
                </label>
                <select
                  id="projectType"
                  disabled={status === 'submitting'}
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-purple-500/50 shadow-sm disabled:opacity-50"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                >
                  <option value="" style={{ backgroundColor: 'var(--color-surface)' }}>Select a type...</option>
                  <option style={{ backgroundColor: 'var(--color-surface)' }}>Web Application</option>
                  <option style={{ backgroundColor: 'var(--color-surface)' }}>E-commerce</option>
                  <option style={{ backgroundColor: 'var(--color-surface)' }}>Landing Page</option>
                  <option style={{ backgroundColor: 'var(--color-surface)' }}>API / Backend</option>
                  <option style={{ backgroundColor: 'var(--color-surface)' }}>Other</option>
                </select>
                {errors.projectType && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.projectType}</p>}
              </div>
              {field('budget', 'Budget (optional)')}
            </div>

            {field('message', 'Message', 'textarea')}

            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`mt-4 flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 glow-blue transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:brightness-110 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {status === 'submitting' ? (
                <>
                  <span>Sending Message...</span>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Send Message</span> 
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-row lg:flex-col gap-4 flex-wrap"
          >
            {[
              { icon: Mail, label: 'Email Me directly', desc: 'santoshvarma01814@gmail.com', href: 'mailto:santoshvarma01814@gmail.com' },
              { icon: LinkedinIcon, label: 'Connect on LinkedIn', desc: "Let's expand our network", href: 'https://www.linkedin.com/in/santosh-varma-7a2425228?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
              { icon: GithubIcon, label: 'Follow on GitHub', desc: 'Check out my repositories', href: 'https://github.com/santoshdev14' },
              { icon: InstagramIcon, label: 'Follow on Instagram', desc: 'See my latest updates', href: 'https://www.instagram.com/santoshvarma.14' },
            ].map(({ icon: Icon, label, desc, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all duration-300 flex-1 lg:flex-none group shadow-sm hover:shadow-md"
              >
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                  <Icon size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>{label}</span>
                  <span className="text-xs" style={{ color: 'var(--color-text-dim)' }}>{desc}</span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center shadow-2xl glass"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <button
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: 'var(--color-text-dim)' }}
              >
                <X size={20} />
              </button>
              
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-6 shadow-xl shadow-cyan-500/20">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              
              <h3 className="text-3xl font-display font-semibold mb-3">Thank You!</h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-dim)' }}>
                Your message has been sent successfully. I'll review your project details and get back to you within 24 hours.
              </p>
              
              <button
                onClick={() => setSubmitted(false)}
                className="w-full rounded-xl py-4 font-semibold text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 transition-all hover:brightness-110 active:scale-[0.98] shadow-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
