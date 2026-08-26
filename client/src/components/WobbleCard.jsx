import { useRef, useState } from 'react'

export default function WobbleCard({ children, className = '', intensity = 12, onClick, role, tabIndex, onKeyDown }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareOpacity: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animFrameRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateY = ((x - cx) / cx) * intensity
    const rotateX = -((y - cy) / cy) * intensity
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    animFrameRef.current = requestAnimationFrame(() => {
      setTransform({ rotateX, rotateY, glareX, glareY, glareOpacity: 0.15 })
    })
  }

  const handleMouseLeave = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    setIsHovering(false)
    setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareOpacity: 0 })
  }

  const handleMouseEnter = () => setIsHovering(true)

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      <div
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovering ? 1.02 : 1})`,
          transition: isHovering
            ? 'transform 0.1s linear'
            : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transformStyle: 'preserve-3d',
          borderRadius: 'inherit',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {children}

        {/* Glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255,255,255,${transform.glareOpacity}) 0%, transparent 65%)`,
            transition: isHovering ? 'opacity 0.1s linear' : 'opacity 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}
