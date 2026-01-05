import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Custom WebGL Distortion Plane Shader
const WaveDisplacementShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#C7FF3D') },
    uColorB: { value: new THREE.Color('#5146E5') },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float displacement = sin(pos.x * 3.0 + uTime * 2.0) * cos(pos.y * 3.0 + uTime * 1.5) * 0.35;
      pos.z += displacement;
      vDisplacement = displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      float mixFactor = clamp(vDisplacement + 0.5, 0.0, 1.0);
      vec3 finalColor = mix(uColorA, uColorB, mixFactor);
      gl_FragColor = vec4(finalColor, 0.35);
    }
  `,
}

function ShaderDistortionPlane() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.getElapsedTime()
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={[12, 8, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        args={[WaveDisplacementShader]}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function FloatingCyberPolyhedrons() {
  const groupRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
    if (coreRef.current) {
      coreRef.current.rotation.z += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Distorted Core */}
      <Float speed={2} rotationIntensity={1.8} floatIntensity={2}>
        <mesh ref={coreRef} position={[1.5, 0.5, 0]} scale={1.6}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#C7FF3D"
            emissive="#5146E5"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={0.5}
            speed={2.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Orbiting Wireframe Rings */}
      <Float speed={1.2} rotationIntensity={2} floatIntensity={1.2}>
        <mesh position={[-2, -1, 0.5]} scale={2.2}>
          <torusGeometry args={[1, 0.015, 16, 80]} />
          <meshStandardMaterial color="#C7FF3D" emissive="#C7FF3D" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>

      {/* Outer Floating Code Geometries */}
      {[
        [-3.8, 2.2, -1],
        [3.8, -2.0, 0.8],
        [-2.0, -2.5, 1.2],
        [2.2, 2.5, -1.2],
      ].map((pos, i) => (
        <Float key={i} speed={2 + i * 0.4} rotationIntensity={2} floatIntensity={2}>
          <mesh position={pos as [number, number, number]} scale={0.45}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#C7FF3D' : '#5146E5'}
              emissive={i % 2 === 0 ? '#C7FF3D' : '#5146E5'}
              emissiveIntensity={0.8}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function DynamicParticles() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particleCount = 800
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 18
    positions[i + 1] = (Math.random() - 0.5) * 18
    positions[i + 2] = (Math.random() - 0.5) * 18
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C7FF3D"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

export function HeroWorld() {
  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      data-cursor="drag"
      data-cursor-text="3D DRAG"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#C7FF3D" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#5146E5" />

        <ShaderDistortionPlane />
        <FloatingCyberPolyhedrons />
        <DynamicParticles />
      </Canvas>
    </div>
  )
}

export default HeroWorld
