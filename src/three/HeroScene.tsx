import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const outerTorusRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
    if (outerTorusRef.current) {
      outerTorusRef.current.rotation.z -= delta * 0.15
      outerTorusRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group>
      {/* Central Cyber Core */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#10b981"
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={2}
            emissive="#047857"
            emissiveIntensity={0.6}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Wireframe Orbital Ring 1 */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={outerTorusRef} scale={2.8}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      </Float>

      {/* Outer Floating Code Nodes */}
      {[
        [-3.2, 1.5, -1],
        [3.5, -1.2, 0.5],
        [-2.5, -2.2, 1.2],
        [2.8, 2.0, -1.5],
        [0, 3.2, -2],
      ].map((pos, i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={pos as [number, number, number]} scale={0.4}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#10b981' : '#38bdf8'}
              emissive={i % 2 === 0 ? '#10b981' : '#0284c7'}
              emissiveIntensity={0.7}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function DigitalParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const particleCount = 700
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 16
    positions[i + 1] = (Math.random() - 0.5) * 16
    positions[i + 2] = (Math.random() - 0.5) * 16
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#fbbf24" />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing" data-cursor="drag" data-cursor-text="3D DRAG">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneLights />
        <FloatingCore />
        <DigitalParticles />
      </Canvas>
    </div>
  )
}

export default HeroScene
