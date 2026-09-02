import { useState, useEffect, useCallback } from 'react'

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function useAudio() {
  const [muted, setMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_audio_muted') === 'true'
    }
    return true // muted by default for user preference
  })

  useEffect(() => {
    localStorage.setItem('portfolio_audio_muted', String(muted))
  }, [muted])

  const toggleAudio = useCallback(() => {
    setMuted((prev) => !prev)
  }, [])

  const playSound = useCallback(
    (type = 'click') => {
      if (muted) return
      try {
        const ctx = getAudioContext()
        if (!ctx) return

        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        if (type === 'click') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(800, now)
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.04)
          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
          osc.start(now)
          osc.stop(now + 0.04)
        } else if (type === 'hover') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(520, now)
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.03)
          gain.gain.setValueAtTime(0.03, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
          osc.start(now)
          osc.stop(now + 0.03)
        } else if (type === 'success') {
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(440, now)
          osc.frequency.setValueAtTime(880, now + 0.08)
          gain.gain.setValueAtTime(0.1, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)
          osc.start(now)
          osc.stop(now + 0.16)
        } else if (type === 'command') {
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(300, now)
          osc.frequency.exponentialRampToValueAtTime(150, now + 0.06)
          gain.gain.setValueAtTime(0.05, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
          osc.start(now)
          osc.stop(now + 0.06)
        }
      } catch (err) {
        // Audio context may be blocked by browser policy until gesture
      }
    },
    [muted]
  )

  return { muted, toggleAudio, playSound }
}
