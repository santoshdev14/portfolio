import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ── Elegant wireframe icosphere ─────────────────────────── */
function WireframeSphere({ isLight }) {
  const outerRef = useRef()
  const innerRef = useRef()

  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.06
      outerRef.current.rotation.y += delta * 0.10
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.04
      innerRef.current.rotation.y -= delta * 0.07
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Outer wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#4f9dff"
          wireframe
          emissive="#4f9dff"
          emissiveIntensity={isLight ? 0.15 : 0.5}
        />
      </mesh>
      {/* Inner wireframe */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#a76bff"
          wireframe
          emissive="#a76bff"
          emissiveIntensity={isLight ? 0.1 : 0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#35e7d1"
          emissive="#35e7d1"
          emissiveIntensity={isLight ? 0.3 : 0.8}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.85}
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

/* ── Small orbiting gem ─────────────────────────────────── */
function OrbitingGem({ radius, speed, offset, color, size = 0.08 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.5) * 0.5, Math.sin(t) * radius)
    ref.current.rotation.x += 0.02
    ref.current.rotation.y += 0.03
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} roughness={0.1} metalness={0.8} />
    </mesh>
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
  const gems = useMemo(() => [
    { radius: 2.3, speed: 0.4, offset: 0, color: '#a76bff', size: 0.10 },
    { radius: 2.7, speed: -0.3, offset: 2.1, color: '#35e7d1', size: 0.08 },
    { radius: 2.0, speed: 0.55, offset: 4.2, color: '#4f9dff', size: 0.09 },
    { radius: 3.0, speed: -0.22, offset: 1.0, color: '#a76bff', size: 0.07 },
  ], [])

  return (
    <>
      <ambientLight intensity={isLight ? 1.2 : 0.4} />
      <pointLight position={[4, 4, 5]} intensity={isLight ? 20 : 50} color="#4f9dff" />
      <pointLight position={[-4, -3, -3]} intensity={isLight ? 12 : 30} color="#a76bff" />
      <pointLight position={[0, 3, 2]} intensity={isLight ? 6 : 15} color="#35e7d1" />

      <MouseRig>
        <WireframeSphere isLight={isLight} />
        {gems.map((g, i) => (
          <OrbitingGem key={i} {...g} />
        ))}
        <OrbitRing radius={3.5} tilt={Math.PI / 2.4} speed={0.10} color="#4f9dff" opacity={isLight ? 0.5 : 0.3} />
        <OrbitRing radius={2.8} tilt={Math.PI / 1.4} speed={-0.08} color="#a76bff" opacity={isLight ? 0.4 : 0.2} />
      </MouseRig>

      {!reduceEffects && (
        <Sparkles
          count={60}
          scale={6}
          size={isLight ? 0.8 : 1.2}
          speed={0.25}
          color={isLight ? '#4f9dff' : '#8ec9ff'}
          opacity={isLight ? 0.35 : 0.5}
        />
      )}
    </>
  )
}

export default function HeroScene({ reduceEffects, isLight }) {
  return (
    <Canvas
      dpr={reduceEffects ? 1 : [1, 1.8]}
      camera={{ position: [0, 0, 6.5], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene reduceEffects={reduceEffects} isLight={isLight} />
      </Suspense>
    </Canvas>
  )
}
