import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Clean canvas textures representing real full-stack & 3D projects for tunnel cards
function createProjectCardTexture(title, subtitle, tag, color = '#38bdf8') {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 360
  const ctx = canvas.getContext('2d')

  // Card background
  const grad = ctx.createLinearGradient(0, 0, 512, 360)
  grad.addColorStop(0, '#090d16')
  grad.addColorStop(1, '#1e293b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 360)

  // Inner border highlight
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.strokeRect(10, 10, 492, 340)

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
  ctx.lineWidth = 1
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke()
  }
  for (let y = 0; y < 360; y += 32) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke()
  }

  // Tag badge
  ctx.fillStyle = color
  ctx.font = 'bold 15px monospace'
  ctx.fillText(tag.toUpperCase(), 34, 48)

  // Project title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 30px sans-serif'
  ctx.fillText(title, 34, 110)

  // Subtitle
  ctx.fillStyle = '#94a3b8'
  ctx.font = '18px sans-serif'
  ctx.fillText(subtitle, 34, 150)

  // Interactive simulated button
  ctx.fillStyle = color
  ctx.fillRect(34, 230, 160, 42)
  ctx.fillStyle = '#0f172a'
  ctx.font = 'bold 15px sans-serif'
  ctx.fillText('EXPLORE →', 60, 257)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const CARDS_DATA = [
  { title: 'NavOne Connect', subtitle: 'Enterprise Document Routing', tag: 'Full-Stack App', color: '#38bdf8' },
  { title: 'Assignment Tracker', subtitle: 'Role-Based Workflow Engine', tag: 'Internal Tool', color: '#a855f7' },
  { title: 'Admin Module', subtitle: 'RBAC Security & Audit Logs', tag: 'Security Platform', color: '#2dd4bf' },
  { title: 'WSSD Grievance', subtitle: 'SLA Analytics Dashboard', tag: 'Government CRM', color: '#f43f5e' },
  { title: 'Maha eHRMS', subtitle: 'VICIdial Calling Integration', tag: 'Telephony Stack', color: '#fbbf24' },
  { title: 'Housing Magic', subtitle: 'Real Estate Web Platform', tag: 'Modular UI', color: '#34d399' },
  { title: 'Roha CRM', subtitle: 'Sales Pipeline Analytics', tag: 'Lead Engine', color: '#60a5fa' },
  { title: '3D WebGL Studio', subtitle: 'Three.js & Canvas Visuals', tag: 'Creative Tech', color: '#38bdf8' },
]

export default function TunnelHeroScene({ isLight }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = container.clientWidth || window.innerWidth
    const Ht = container.clientHeight || window.innerHeight

    const canvas = document.createElement('canvas')
    canvas.className = 'tunnel__canvas'
    container.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(W, Ht, false)

    const BG = isLight ? 0xffffff : 0x05070d
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(BG)

    const isMobilePortrait = W < 768 || W < Ht
    const HX = isMobilePortrait ? 7.0 : 9.2
    const HY = isMobilePortrait ? 9.6 : 6.6
    const CELLZ = 7.5
    const RINGS = 14
    const LEN = RINGS * CELLZ
    scene.fog = new THREE.Fog(BG, CELLZ * 2.2, LEN * 0.92)

    const camera = new THREE.PerspectiveCamera(isMobilePortrait ? 72 : 65, W / Ht, 0.1, LEN * 1.5)
    camera.position.set(0, 0, 0)
    camera.lookAt(0, 0, -1)

    // Radial shadow texture
    const shadowTex = (() => {
      const cv = document.createElement('canvas')
      cv.width = cv.height = 128
      const g = cv.getContext('2d')
      const rg = g.createRadialGradient(64, 64, 6, 64, 64, 62)
      rg.addColorStop(0, 'rgba(0,0,0,0.45)')
      rg.addColorStop(1, 'rgba(0,0,0,0)')
      g.fillStyle = rg
      g.fillRect(0, 0, 128, 128)
      return new THREE.CanvasTexture(cv)
    })()

    // Rectangular rung line geometry
    const lineGeo = (() => {
      const v = []
      function seg(ax, ay, az, bx, by, bz) {
        v.push(ax, ay, az, bx, by, bz)
      }
      // Rung rectangle at front
      seg(-HX, -HY, 0, HX, -HY, 0); seg(HX, -HY, 0, HX, HY, 0)
      seg(HX, HY, 0, -HX, HY, 0); seg(-HX, HY, 0, -HX, -HY, 0)

      // Longitudinal lines running the ring's depth
      const dX = [-HX, -HX / 2, 0, HX / 2, HX]
      const dY = [-HY, -HY / 2, 0, HY / 2, HY]

      for (let j = 0; j < dY.length; j++) {
        const ty = dY[j]
        seg(-HX, ty, 0, -HX, ty, -CELLZ); seg(HX, ty, 0, HX, ty, -CELLZ)
      }
      for (let j = 0; j < dX.length; j++) {
        const tx = dX[j]
        seg(tx, -HY, 0, tx, -HY, -CELLZ); seg(tx, HY, 0, tx, HY, -CELLZ)
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
      return geo
    })()

    const lineMat = new THREE.LineBasicMaterial({
      color: isLight ? 0x94a3b8 : 0x334155,
      transparent: true,
      opacity: isLight ? 0.95 : 0.85,
    })

    const WALLS = [
      { axis: 'y', ang: Math.PI / 2, fix: 'x', val: -HX, isX: true },  // Left
      { axis: 'y', ang: -Math.PI / 2, fix: 'x', val: HX, isX: true },  // Right
      { axis: 'x', ang: -Math.PI / 2, fix: 'y', val: -HY, isX: false }, // Floor
      { axis: 'x', ang: Math.PI / 2, fix: 'y', val: HY, isX: false },   // Ceiling
    ]

    const group = new THREE.Group()
    scene.add(group)
    const rings = []
    let ci = 0

    function rnd(a, b) {
      return a + Math.random() * (b - a)
    }

    for (let i = 0; i < RINGS; i++) {
      const ring = new THREE.Group()
      ring.add(new THREE.LineSegments(lineGeo, lineMat))

      for (let c = 0; c < 4; c++) {
        const wp = WALLS[(c + i) % 4]
        const bh = isMobilePortrait ? rnd(1.9, 2.6) : rnd(2.7, 3.6)
        const bw = bh * (isMobilePortrait ? 1.3 : 1.2)
        const along = wp.isX ? rnd(-HY + 1.2, HY - 1.2) : rnd(-HX + 1.2, HX - 1.2)
        const dz = -rnd(1.0, CELLZ - 1.0)
        const eps = 0.05

        const cardData = CARDS_DATA[ci % CARDS_DATA.length]
        ci++
        const cardTex = createProjectCardTexture(cardData.title, cardData.subtitle, cardData.tag, cardData.color)

        const card = new THREE.Group()
        const shadow = new THREE.Mesh(
          new THREE.PlaneGeometry(1, 1),
          new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
        )
        shadow.position.set(0, -0.12, -0.02)
        shadow.scale.set(bw * 1.4, bh * 1.5, 1)

        const border = new THREE.Mesh(
          new THREE.PlaneGeometry(1, 1),
          new THREE.MeshBasicMaterial({ color: isLight ? 0xffffff : 0x1e293b })
        )
        border.scale.set(bw + 0.16, bh + 0.16, 1)

        const img = new THREE.Mesh(
          new THREE.PlaneGeometry(1, 1),
          new THREE.MeshBasicMaterial({ map: cardTex })
        )
        img.position.z = 0.01
        img.scale.set(bw, bh, 1)

        card.add(shadow); card.add(border); card.add(img)

        if (wp.axis === 'y') card.rotation.y = wp.ang
        else card.rotation.x = wp.ang

        const off = wp.val < 0 ? eps : -eps
        if (wp.fix === 'x') card.position.set(wp.val + off, along, dz)
        else card.position.set(along, wp.val + off, dz)

        ring.add(card)
      }
      group.add(ring)
      rings.push(ring)
    }

    function layout(p) {
      for (let i = 0; i < rings.length; i++) {
        const z = (((i * CELLZ - p) % LEN) + LEN) % LEN
        rings[i].position.z = -z + CELLZ
      }
    }

    let p = 0
    let vel = 0
    let down = false
    let lastY = 0
    const AUTO = 0.035

    function resize() {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.fov = (w < 768 || w < h) ? 72 : 65
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)

    layout(p)
    renderer.render(scene, camera)

    let animationId
    function frame() {
      if (!down) {
        p += vel + AUTO
        vel *= 0.94
        if (Math.abs(vel) < 0.0004) vel = 0
      }
      layout(p)
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(frame)
    }
    animationId = requestAnimationFrame(frame)

    const onWheel = (e) => {
      vel += e.deltaY * 0.0016
    }
    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return // Let mobile gestures scroll the webpage naturally
      down = true
      lastY = e.clientY
      container.classList.add('is-dragging')
    }
    const onPointerMove = (e) => {
      if (!down) return
      const dy = e.clientY - lastY
      lastY = e.clientY
      p += dy * 0.04
      vel = dy * 0.04
    }
    const onPointerUp = () => {
      down = false
      container.classList.remove('is-dragging')
    }

    container.addEventListener('wheel', onWheel, { passive: true })
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      renderer.dispose()
    }
  }, [isLight])

  return <div ref={containerRef} className="tunnel__canvas" />
}
