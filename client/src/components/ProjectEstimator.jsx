import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, CheckCircle2, Clock, DollarSign, Sparkles, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'

const PROJECT_TYPES = [
  { id: 'web-app', name: 'Custom Web Application', basePrice: 1200, baseDays: 14, icon: Layers, desc: 'Full-stack platform built with React, Node/Python & Database.' },
  { id: '3d-exp', name: '3D & Interactive Web', basePrice: 1500, baseDays: 18, icon: Cpu, desc: 'Immersive Three.js / Canvas experience with dynamic shaders.' },
  { id: 'landing', name: 'High-Converting Landing Page', basePrice: 600, baseDays: 7, icon: Sparkles, desc: 'Blazing fast, responsive marketing site optimized for conversion.' },
  { id: 'backend', name: 'API & Backend System', basePrice: 900, baseDays: 10, icon: ShieldCheck, desc: 'Scalable REST/GraphQL endpoints, database architecture & Auth.' },
]

const FEATURE_OPTIONS = [
  { id: 'rbac', label: 'Auth & Multi-Role Security', price: 250, days: 3 },
  { id: '3d-canvas', label: 'Custom 3D Scene / Canvas', price: 400, days: 4 },
  { id: 'payments', label: 'Payment Gateway (Stripe/Razorpay)', price: 300, days: 3 },
  { id: 'realtime', label: 'Real-time WebSockets / Alerts', price: 350, days: 4 },
  { id: 'admin', label: 'Admin Management Panel', price: 350, days: 4 },
  { id: 'seo', label: 'Lighthouse 95+ SEO & Speed Boost', price: 200, days: 2 },
]

const TIMELINES = [
  { id: 'express', label: 'Express (Priority Sprint)', multiplier: 1.25, timeNote: 'Dedicated focus for rapid launch' },
  { id: 'standard', label: 'Standard Timeline', multiplier: 1.0, timeNote: 'Balanced iterative sprints & testing' },
  { id: 'relaxed', label: 'Flexible Scope', multiplier: 0.9, timeNote: 'Staggered development milestones' },
]

export default function ProjectEstimator() {
  const { playSound } = useAudio()
  const [selectedType, setSelectedType] = useState('web-app')
  const [selectedFeatures, setSelectedFeatures] = useState(['rbac', 'admin'])
  const [selectedTimeline, setSelectedTimeline] = useState('standard')

  const toggleFeature = (id) => {
    playSound('click')
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const handleTypeSelect = (id) => {
    playSound('click')
    setSelectedType(id)
  }

  const handleTimelineSelect = (id) => {
    playSound('click')
    setSelectedTimeline(id)
  }

  // Calculate totals
  const currentTypeObj = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0]
  const currentTimelineObj = TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[1]

  const featurePrice = selectedFeatures.reduce((acc, featId) => {
    const f = FEATURE_OPTIONS.find((opt) => opt.id === featId)
    return acc + (f ? f.price : 0)
  }, 0)

  const featureDays = selectedFeatures.reduce((acc, featId) => {
    const f = FEATURE_OPTIONS.find((opt) => opt.id === featId)
    return acc + (f ? f.days : 0)
  }, 0)

  const rawPrice = (currentTypeObj.basePrice + featurePrice) * currentTimelineObj.multiplier
  const rawDays = Math.round((currentTypeObj.baseDays + featureDays) * (selectedTimeline === 'express' ? 0.75 : 1))

  const minPrice = Math.round(rawPrice * 0.9)
  const maxPrice = Math.round(rawPrice * 1.15)

  const handleScrollToContact = () => {
    playSound('success')
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      const messageTextarea = document.querySelector('#contact-message') || document.querySelector('textarea')
      if (messageTextarea) {
        const typeName = currentTypeObj.name
        const featNames = selectedFeatures.map((fId) => FEATURE_OPTIONS.find((o) => o.id === fId)?.label).join(', ')
        messageTextarea.value = `Hi Santosh, I calculated an estimate for a ${typeName} project with features: [${featNames}]. Estimated budget ~$${minPrice}-$${maxPrice}. Let's discuss!`
      }
    }
  }

  return (
    <section id="estimator" className="relative py-16 md:py-28 px-4 md:px-6 bg-grid">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <Calculator size={13} />
            <span>Interactive Calculator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Estimate Your Project Scope
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: 'var(--color-text-dim)' }}>
            Select your project requirements below for a transparent, instant estimation of timeframe and investment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Project Type */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-[10px]">1</span>
                Select Project Type
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon
                  const active = selectedType === type.id
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id)}
                      className={`text-left p-4 rounded-xl glass border transition-all cursor-pointer ${
                        active
                          ? 'border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_20px_rgba(53,231,209,0.15)]'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon size={18} className={active ? 'text-cyan-300' : 'text-slate-400'} />
                        {active && <CheckCircle2 size={16} className="text-cyan-400" />}
                      </div>
                      <h4 className="font-medium text-sm text-white mb-1">{type.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{type.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Key Features */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-[10px]">2</span>
                Add Key Capabilities & Modules
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {FEATURE_OPTIONS.map((feat) => {
                  const checked = selectedFeatures.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer ${
                        checked
                          ? 'bg-purple-500/15 border-purple-400/60 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-600'}`}>
                          {checked && '✓'}
                        </span>
                        {feat.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Pace / Timeline */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-[10px]">3</span>
                Desired Pace
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {TIMELINES.map((tl) => {
                  const active = selectedTimeline === tl.id
                  return (
                    <button
                      key={tl.id}
                      onClick={() => handleTimelineSelect(tl.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        active
                          ? 'border-blue-400 bg-blue-500/15 text-white'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-xs mb-1">{tl.label}</div>
                      <div className="text-[10px] text-slate-400">{tl.timeNote}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Summary Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="relative glass gradient-border rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl border border-white/10">
              <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                <span>Estimated Summary</span>
                <span className="text-cyan-400 animate-pulse">● Live Calculation</span>
              </h3>

              {/* Price Range */}
              <div className="mb-6 p-4 rounded-xl bg-slate-950/80 border border-white/10">
                <div className="text-xs text-slate-400 font-mono mb-1 flex items-center gap-1">
                  <DollarSign size={14} className="text-emerald-400" /> Estimated Investment
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                  ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">USD · Depends on final exact specification</p>
              </div>

              {/* Duration & Features count */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock size={13} className="text-cyan-400" /> Turnaround
                  </div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    ~{rawDays} Days
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Sparkles size={13} className="text-purple-400" /> Features
                  </div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {selectedFeatures.length} Modules
                  </div>
                </div>
              </div>

              {/* Selected breakdown checklist */}
              <div className="border-t border-white/10 pt-4 mb-6 space-y-2 text-xs">
                <div className="text-slate-400 font-mono text-[11px]">Selected Package:</div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>{currentTypeObj.name}</span>
                  <span className="font-mono text-slate-400">${currentTypeObj.basePrice}</span>
                </div>
                {selectedFeatures.map((fId) => {
                  const feat = FEATURE_OPTIONS.find((o) => o.id === fId)
                  return (
                    <div key={fId} className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>+ {feat?.label}</span>
                      <span className="font-mono">${feat?.price}</span>
                    </div>
                  )
                })}
              </div>

              {/* Action button */}
              <button
                onClick={handleScrollToContact}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 font-semibold text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Discuss This Scope
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
