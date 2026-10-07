import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Points, PointMaterial, Ring } from '@react-three/drei'
import * as THREE from 'three'

interface PlanetData {
  id: string
  name: string
  color: string
  emissive: string
  distance: number
  size: number
  speed: number
  hasRing?: boolean
}

const planetsData: PlanetData[] = [
  { id: 'react', name: 'REACT.JS', color: '#42DFFF', emissive: '#0284c7', distance: 2.2, size: 0.38, speed: 0.8, hasRing: true },
  { id: 'node', name: 'NODE.JS', color: '#C7FF3D', emissive: '#059669', distance: 3.4, size: 0.45, speed: 0.5 },
  { id: 'mongo', name: 'MONGODB', color: '#10b981', emissive: '#047857', distance: 4.6, size: 0.35, speed: 0.35 },
  { id: 'express', name: 'EXPRESS.JS', color: '#F4F1E8', emissive: '#94a3b8', distance: 5.6, size: 0.3, speed: 0.25 },
  { id: 'ts', name: 'TYPESCRIPT', color: '#7657FF', emissive: '#4c1d95', distance: 6.8, size: 0.4, speed: 0.18, hasRing: true },
  { id: 'ai', name: 'AI CORE', color: '#C83CFF', emissive: '#7e22ce', distance: 8.0, size: 0.32, speed: 0.12 },
]

function CentralStellarSun() {
  const sunRef = useRef<THREE.Mesh>(null!)
  const coronaRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.2
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.15
      coronaRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group>
      {/* Central Solar Core */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={sunRef} scale={1.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#C7FF3D"
            emissive="#7657FF"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Stellar Corona Ring */}
      <mesh ref={coronaRef} scale={2.5}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#C7FF3D"
          emissive="#C7FF3D"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>
    </group>
  )
}

function OrbitingPlanets() {
  const orbitsGroupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (orbitsGroupRef.current) {
      orbitsGroupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={orbitsGroupRef}>
      {planetsData.map((planet) => (
        <SinglePlanet key={planet.id} data={planet} />
      ))}
    </group>
  )
}

function SinglePlanet({ data }: { data: PlanetData }) {
  const planetRef = useRef<THREE.Mesh>(null!)
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    orbitAngleRef.current += delta * data.speed * 0.4
    const x = Math.cos(orbitAngleRef.current) * data.distance
    const z = Math.sin(orbitAngleRef.current) * data.distance
    if (planetRef.current) {
      planetRef.current.position.set(x, Math.sin(orbitAngleRef.current * 2) * 0.3, z)
      planetRef.current.rotation.y += delta * 0.8
    }
  })

  return (
    <group>
      {/* Visual Orbit Path Line */}
      <Ring args={[data.distance - 0.01, data.distance + 0.01, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#7657FF" transparent opacity={0.15} side={THREE.DoubleSide} />
      </Ring>

      {/* Planet Mesh */}
      <mesh ref={planetRef} scale={data.size}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.7}
        />
        {data.hasRing && (
          <Ring args={[1.4, 2.0, 32]} rotation={[Math.PI / 3, 0, 0]}>
            <meshBasicMaterial color={data.color} transparent opacity={0.5} side={THREE.DoubleSide} wireframe />
          </Ring>
        )}
      </mesh>
    </group>
  )
}

function CosmicParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 22
    positions[i + 1] = (Math.random() - 0.5) * 22
    positions[i + 2] = (Math.random() - 0.5) * 22
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C7FF3D"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  )
}

export function SolarSystemHero() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing" data-cursor="drag" data-cursor-text="ORBIT 3D">
      <Canvas
        camera={{ position: [0, 3, 9], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#F4F1E8" />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#C7FF3D" distance={12} />
        <pointLight position={[-10, -5, -5]} intensity={1} color="#7657FF" />

        <CentralStellarSun />
        <OrbitingPlanets />
        <CosmicParticleField />
      </Canvas>
    </div>
  )
}

export default SolarSystemHero
