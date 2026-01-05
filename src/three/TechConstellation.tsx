import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Float, Line } from '@react-three/drei'
import * as THREE from 'three'

interface TechNode {
  id: string
  name: string
  category: string
  color: string
  position: [number, number, number]
  desc: string
}

const techNodes: TechNode[] = [
  { id: 'react', name: 'React.js', category: 'Frontend Engine', color: '#61dafb', position: [-3, 1.8, 0], desc: 'Virtual DOM, Concurrent Rendering, Custom Hooks Architecture' },
  { id: 'node', name: 'Node.js', category: 'Runtime System', color: '#68a063', position: [3, 1.5, -0.5], desc: 'Event Loop, Non-blocking I/O, Microservices' },
  { id: 'mongo', name: 'MongoDB', category: 'Database Layer', color: '#47a248', position: [-2.5, -1.8, 0.5], desc: 'Document Schemas, Aggregation Pipelines, Sharding' },
  { id: 'express', name: 'Express.js', category: 'API Framework', color: '#ffffff', position: [2.2, -1.9, 0], desc: 'Middleware Architecture, REST APIs, Security Auth' },
  { id: 'ts', name: 'TypeScript', category: 'Type Safety', color: '#3178c6', position: [0, 2.5, 0.5], desc: 'Static Typing, Generics, Enterprise Reliability' },
  { id: 'three', name: 'Three.js / WebGL', category: 'Spatial Computing', color: '#10b981', position: [0, -2.5, -0.5], desc: '3D Graphics, Custom Shaders, Immersive Canvas' },
  { id: 'next', name: 'Next.js', category: 'Fullstack Framework', color: '#fbbf24', position: [-4, -0.2, -1], desc: 'Server Components, SSR, Edge Functions' },
  { id: 'aws', name: 'AWS & Cloud', category: 'Infrastructure', color: '#ff9900', position: [4, 0.2, -1], desc: 'CI/CD Pipelines, Docker, Serverless Deployment' },
]

// Connections between nodes
const connections: [string, string][] = [
  ['react', 'express'],
  ['react', 'ts'],
  ['node', 'express'],
  ['node', 'mongo'],
  ['express', 'mongo'],
  ['react', 'three'],
  ['react', 'next'],
  ['node', 'aws'],
  ['ts', 'three'],
]

function ConstellationMesh({ onSelectNode, activeNodeId }: { onSelectNode: (node: TechNode) => void; activeNodeId: string | null }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Draw Connection Lines */}
      {connections.map(([fromId, toId], idx) => {
        const fromNode = techNodes.find((n) => n.id === fromId)
        const toNode = techNodes.find((n) => n.id === toId)
        if (!fromNode || !toNode) return null

        const isHighlighted = activeNodeId === fromId || activeNodeId === toId

        return (
          <Line
            key={idx}
            points={[fromNode.position, toNode.position]}
            color={isHighlighted ? '#10b981' : '#334155'}
            lineWidth={isHighlighted ? 2.5 : 1}
            transparent
            opacity={isHighlighted ? 0.9 : 0.4}
          />
        )
      })}

      {/* Render 3D Tech Spheres */}
      {techNodes.map((node) => {
        const isSelected = activeNodeId === node.id

        return (
          <Float key={node.id} speed={2} rotationIntensity={1} floatIntensity={1.2}>
            <group position={node.position}>
              <mesh
                onClick={() => onSelectNode(node)}
                onPointerOver={(e) => {
                  e.stopPropagation()
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto'
                }}
              >
                <sphereGeometry args={[isSelected ? 0.45 : 0.35, 32, 32]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 0.9 : 0.4}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>

              {/* HTML Badge Label in 3D Space */}
              <Html distanceFactor={12} position={[0, 0.55, 0]} center>
                <div
                  onClick={() => onSelectNode(node)}
                  className={`cursor-pointer px-3 py-1 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/50 scale-110'
                      : 'bg-black/80 backdrop-blur-md text-gray-200 border border-white/10 hover:border-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  {node.name}
                </div>
              </Html>
            </group>
          </Float>
        )
      })}
    </group>
  )
}

export function TechConstellation({ onSelectNode, activeNodeId }: { onSelectNode: (node: TechNode) => void; activeNodeId: string | null }) {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
        <ConstellationMesh onSelectNode={onSelectNode} activeNodeId={activeNodeId} />
      </Canvas>
    </div>
  )
}

export default TechConstellation
