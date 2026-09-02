import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ── Points-based Sphere ────────────────────────────────── */
function PointsSphere({ isLight }) {
  const ref = useRef()

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
      ref.current.rotation.x += delta * 0.03
    }
  })

  return (
    <points ref={ref}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <pointsMaterial
        color={isLight ? '#4f9dff' : '#8ec9ff'}
        size={isLight ? 0.035 : 0.04}
        sizeAttenuation={true}
        transparent
        opacity={isLight ? 0.7 : 0.9}
      />
    </points>
  )
}

/* ── Wireframe Inner Core Mesh ────────────────────────────── */
function WireframeCore({ isLight }) {
  const meshRef = useRef()
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color={isLight ? '#0891b2' : '#35e7d1'}
          wireframe
          transparent
          opacity={isLight ? 0.35 : 0.55}
          emissive={isLight ? '#0284c7' : '#35e7d1'}
          emissiveIntensity={isLight ? 0.2 : 0.4}
        />
      </mesh>
    </Float>
  )
}

/* ── Clean orbit ring ───────────────────────────────────── */
function OrbitRing({ radius, tilt, speed, color, opacity = 0.3 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

/* ── Particle Plexus (Constellation) System ──────────────── */
function Plexus({ count = 55, range = 4.2, minDistance = 1.3, isLight }) {
  const pointsRef = useRef()
  const linesRef = useRef()

  // Generate initial particle positions and velocity vectors
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical region for nicer organic shapes
      const r = (Math.random() * 0.7 + 0.3) * (range / 2)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      // Random slow velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.015
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015
    }
    return { positions: pos, velocities: vel }
  }, [count, range])

  // Max line vertices (each line segment has 2 vertices, e.g. 300 lines = 600 vertices)
  const maxLineVertices = 600
  const linePositions = useMemo(() => new Float32Array(maxLineVertices * 3), [])

  useFrame((state, delta) => {
    // Clamp delta to avoid massive jumps on lag
    const dt = Math.min(delta, 0.1)

    // Calculate mouse 3D viewport coordinates (approximate plane)
    const { width, height } = state.viewport
    const mouseX = (state.pointer.x * width) / 2
    const mouseY = (state.pointer.y * height) / 2

    // Move particles
    for (let i = 0; i < count; i++) {
      const idx = i * 3

      // Standard drift movement
      positions[idx] += velocities[idx] * dt * 10
      positions[idx + 1] += velocities[idx + 1] * dt * 10
      positions[idx + 2] += velocities[idx + 2] * dt * 10

      // Calculate distance to mouse cursor (assuming mouse is at z=0)
      const dx = mouseX - positions[idx]
      const dy = mouseY - positions[idx + 1]
      const dz = 0 - positions[idx + 2]
      const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz)

      // Attraction force: pull particles gently when cursor is within 2.2 units
      if (distToMouse < 2.2) {
        const force = (2.2 - distToMouse) * 0.08
        positions[idx] += dx * force * dt * 8
        positions[idx + 1] += dy * force * dt * 8
        positions[idx + 2] += dz * force * dt * 8
      }

      // Wrap around or bounce inside boundary sphere
      const distFromCenter = Math.sqrt(
        positions[idx] ** 2 + positions[idx + 1] ** 2 + positions[idx + 2] ** 2
      )
      if (distFromCenter > range) {
        // Reverse velocity and push back towards center slightly
        velocities[idx] *= -1
        velocities[idx + 1] *= -1
        velocities[idx + 2] *= -1
        positions[idx] += velocities[idx] * dt * 5
        positions[idx + 1] += velocities[idx + 1] * dt * 5
        positions[idx + 2] += velocities[idx + 2] * dt * 5
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Build connections
    let vertexCount = 0
    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3]
      const y1 = positions[i * 3 + 1]
      const z1 = positions[i * 3 + 2]

      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]

        const dx = x1 - x2
        const dy = y1 - y2
        const dz = z1 - z2
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < minDistance && vertexCount < maxLineVertices - 2) {
          linePositions[vertexCount * 3] = x1
          linePositions[vertexCount * 3 + 1] = y1
          linePositions[vertexCount * 3 + 2] = z1

          linePositions[(vertexCount + 1) * 3] = x2
          linePositions[(vertexCount + 1) * 3 + 1] = y2
          linePositions[(vertexCount + 1) * 3 + 2] = z2

          vertexCount += 2
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, vertexCount)
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleColor = isLight ? '#0891b2' : '#35e7d1'
  const lineColor = isLight ? '#3b82f6' : '#60a5fa'

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={particleColor}
          size={isLight ? 0.045 : 0.055}
          sizeAttenuation={true}
          transparent
          opacity={isLight ? 0.5 : 0.75}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={isLight ? 0.12 : 0.22}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}

/* ── Mouse-follow rig ───────────────────────────────────── */
function MouseRig({ children }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y += (state.pointer.x * 0.35 - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-state.pointer.y * 0.2 - group.current.rotation.x) * 0.04
  })
  return <group ref={group}>{children}</group>
}

function Scene({ reduceEffects, isLight }) {
  const { width } = useThree().viewport
  const isMobile = width < 4.8

  // Position sphere responsively: on the right on desktop, lower center on mobile
  const spherePosition = useMemo(() => {
    if (isMobile) return [0, -0.9, 0]
    return [width * 0.22, 0.1, 0]
  }, [width, isMobile])

  return (
    <>
      <ambientLight intensity={isLight ? 1.2 : 0.4} />
      <pointLight position={[4, 4, 5]} intensity={isLight ? 20 : 50} color="#4f9dff" />
      <pointLight position={[-4, -3, -3]} intensity={isLight ? 12 : 30} color="#a76bff" />
      <pointLight position={[0, 3, 2]} intensity={isLight ? 6 : 15} color="#35e7d1" />

      {/* Full background Plexus network */}
      {!reduceEffects && (
        <Plexus count={isMobile ? 35 : 75} range={width * 1.2} minDistance={1.4} isLight={isLight} />
      )}

      {/* Dotted Sphere and Orbiting Rings grouped and positioned responsively */}
      <MouseRig>
        <group position={spherePosition}>
          <PointsSphere isLight={isLight} />
          <WireframeCore isLight={isLight} />
          
          {/* Blue Orbiting Ring */}
          <OrbitRing 
            radius={1.85} 
            tilt={Math.PI / 2.5} 
            speed={0.08} 
            color="#3b82f6" 
            opacity={isLight ? 0.65 : 0.4} 
          />
          
          {/* Purple Orbiting Ring */}
          <OrbitRing 
            radius={2.05} 
            tilt={Math.PI / 1.35} 
            speed={-0.06} 
            color="#a76bff" 
            opacity={isLight ? 0.55 : 0.3} 
          />
        </group>
      </MouseRig>

      {!reduceEffects && (
        <Sparkles
          count={isMobile ? 25 : 55}
          scale={[width * 1.2, 6, 4]}
          size={isLight ? 0.7 : 1.1}
          speed={0.2}
          color={isLight ? '#3b82f6' : '#8ec9ff'}
          opacity={isLight ? 0.3 : 0.45}
        />
      )}
    </>
  )
}

export default function HeroScene({ reduceEffects, isLight, eventSource }) {
  return (
    <Canvas
      dpr={reduceEffects ? 1 : [1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      eventSource={eventSource}
    >
      <Suspense fallback={null}>
        <Scene reduceEffects={reduceEffects} isLight={isLight} />
      </Suspense>
    </Canvas>
  )
}

