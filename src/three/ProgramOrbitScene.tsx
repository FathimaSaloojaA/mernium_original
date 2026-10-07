import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Ring, Html } from '@react-three/drei'
import * as THREE from 'three'

interface ProgramPlanet {
  id: string
  title: string
  subtitle: string
  color: string
  distance: number
  size: number
  speed: number
}

const programsData: ProgramPlanet[] = [
  { id: 'mern', title: 'MERN ENGINEERING', subtitle: 'FULL-STACK CORE', color: '#C7FF3D', distance: 2.8, size: 0.6, speed: 0.5 },
  { id: 'ai', title: 'AI & WEBGL COMPUTING', subtitle: 'ADVANCED TRACK', color: '#42DFFF', distance: 4.2, size: 0.5, speed: 0.35 },
  { id: 'arch', title: 'SYSTEM ARCHITECTURE', subtitle: 'CLOUD & REDIS', color: '#7657FF', distance: 5.6, size: 0.55, speed: 0.25 },
  { id: 'acc', title: 'INTERVIEW ACCELERATOR', subtitle: 'SPEECH & DRILLS', color: '#C83CFF', distance: 7.0, size: 0.45, speed: 0.18 },
]

function ProgramOrbitMesh({ onSelectProgram }: { onSelectProgram: (p: ProgramPlanet) => void }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {programsData.map((prog) => (
        <SingleProgramPlanet key={prog.id} data={prog} onSelect={onSelectProgram} />
      ))}
    </group>
  )
}

function SingleProgramPlanet({ data, onSelect }: { data: ProgramPlanet; onSelect: (p: ProgramPlanet) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const angleRef = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angleRef.current += delta * data.speed * 0.5
    const x = Math.cos(angleRef.current) * data.distance
    const z = Math.sin(angleRef.current) * data.distance
    if (meshRef.current) {
      meshRef.current.position.set(x, Math.sin(angleRef.current) * 0.4, z)
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      <Ring args={[data.distance - 0.015, data.distance + 0.015, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={data.color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh
          ref={meshRef}
          scale={data.size}
          onClick={() => onSelect(data)}
          onPointerOver={() => { document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'auto' }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />

          <Html distanceFactor={14} position={[0, 1.2, 0]} center>
            <div
              onClick={() => onSelect(data)}
              className="cursor-pointer px-4 py-1.5 bg-ink/90 backdrop-blur-xl text-warmwhite font-syne font-bold text-xs whitespace-nowrap border-l-2 border-acid uppercase shadow-xl hover:text-acid transition-colors"
            >
              {data.title}
            </div>
          </Html>
        </mesh>
      </Float>
    </group>
  )
}

export function ProgramOrbitScene({ onSelectProgram }: { onSelectProgram: (p: ProgramPlanet) => void }) {
  return (
    <div className="w-full h-[550px] relative">
      <Canvas camera={{ position: [0, 4, 8.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7657FF" />
        <ProgramOrbitMesh onSelectProgram={onSelectProgram} />
      </Canvas>
    </div>
  )
}

export default ProgramOrbitScene
