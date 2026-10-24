import {
  Component,
  createContext,
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { Canvas, useFrame, useThree, type RootState } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────
// The Mernium Neural Core — procedural real-time hero scene.
// Layers (inside → out): luminous nucleus, inner glass shell,
// refractive crystal, lattice cage, gyroscopic glass arcs,
// curved neural network with travelling pulses, orbiting
// code/logic glyphs, light trails and ambient particles.
// ─────────────────────────────────────────────────────────────

const PALETTE = {
  ink: '#0A1319',
  deep: '#11586B',
  mid: '#59ACB7',
  bright: '#71D5D9',
  pale: '#BDEAEB',
  slate: '#3F616A',
  slateLight: '#567B81',
}

type Theme = 'dark' | 'light'

interface Look {
  blending: THREE.Blending
  lineBase: string
  lineHot: string
  lineAlpha: number
  node: string
  nodeCore: string
  particle: string
  particleOpacity: number
  glowInner: string
  glowOuter: string
  glowOpacity: number
  trail: string
  trailOpacity: number
  glassColor: string
  glassOpacity: number
  cage: string
  cageEmissive: number
  accent: string
  transmissionBg: string
  ambient: number
  key: number
  inner: number
  envIntensity: number
}

// Same scene and motion in both themes — only light/material contrast changes.
const LOOKS: Record<Theme, Look> = {
  dark: {
    blending: THREE.AdditiveBlending,
    lineBase: PALETTE.slateLight,
    lineHot: PALETTE.pale,
    lineAlpha: 0.42,
    node: PALETTE.bright,
    nodeCore: PALETTE.pale,
    particle: PALETTE.mid,
    particleOpacity: 0.55,
    glowInner: PALETTE.deep,
    glowOuter: PALETTE.ink,
    glowOpacity: 0.65,
    trail: PALETTE.bright,
    trailOpacity: 0.85,
    glassColor: PALETTE.pale,
    glassOpacity: 0.22,
    cage: PALETTE.mid,
    cageEmissive: 0.55,
    accent: PALETTE.bright,
    transmissionBg: '#0D2A33',
    ambient: 0.3,
    key: 1.4,
    inner: 7,
    envIntensity: 1.3,
  },
  light: {
    blending: THREE.NormalBlending,
    lineBase: PALETTE.mid,
    lineHot: PALETTE.deep,
    lineAlpha: 0.42,
    node: PALETTE.deep,
    nodeCore: PALETTE.bright,
    particle: PALETTE.slateLight,
    particleOpacity: 0.4,
    glowInner: PALETTE.pale,
    glowOuter: '#FFFFFF',
    glowOpacity: 0.75,
    trail: PALETTE.deep,
    trailOpacity: 0.7,
    glassColor: PALETTE.bright,
    glassOpacity: 0.32,
    cage: PALETTE.deep,
    cageEmissive: 0.15,
    accent: PALETTE.deep,
    transmissionBg: '#EAF7F7',
    ambient: 0.85,
    key: 1.8,
    inner: 3,
    envIntensity: 1,
  },
}

interface Tier {
  nodes: number
  particles: number
  segments: number
  transmission: boolean
  dpr: [number, number]
}

const TIERS: Record<'full' | 'compact', Tier> = {
  full: { nodes: 44, particles: 380, segments: 20, transmission: true, dpr: [1, 1.75] },
  compact: { nodes: 26, particles: 150, segments: 14, transmission: false, dpr: [1, 1.5] },
}

// Frozen moment used when the visitor prefers reduced motion.
const STILL_TIME = 14.2

interface SceneSettings {
  look: Look
  tier: Tier
  motion: boolean
  compact: boolean
}

const SceneContext = createContext<SceneSettings | null>(null)

function useScene() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('useScene must be used inside <NeuralCore>')
  return ctx
}

function sceneTime(state: RootState, motion: boolean) {
  return motion ? state.clock.elapsedTime : STILL_TIME
}

function useDisposable<T extends { dispose: () => void }>(factory: () => T, deps: unknown[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(factory, deps)
  useEffect(() => () => value.dispose(), [value])
  return value
}

// Deterministic randomness so the composition is identical on every load.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ─── Shaders ─────────────────────────────────────────────────

const OUTPUT_CHUNK = /* glsl */ `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`

const lineVertex = /* glsl */ `
  attribute float aT;
  attribute float aSeed;
  attribute float aPulse;
  attribute float aSpeed;
  varying float vT;
  varying float vSeed;
  varying float vPulse;
  varying float vSpeed;
  varying float vFade;
  void main() {
    vT = aT; vSeed = aSeed; vPulse = aPulse; vSpeed = aSpeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFade = mix(0.3, 1.0, smoothstep(-14.0, -6.0, mv.z));
    gl_Position = projectionMatrix * mv;
  }
`

const lineFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uHot;
  uniform float uBaseAlpha;
  varying float vT;
  varying float vSeed;
  varying float vPulse;
  varying float vSpeed;
  varying float vFade;
  void main() {
    // A pulse crosses the strand during part of its cycle, then rests.
    float head = fract(uTime * 0.09 * vSpeed + vSeed) * 2.2 - 0.6;
    float d = vT - head;
    float spark = exp(-d * d * 900.0);
    float tail = (1.0 - step(0.0, d)) * smoothstep(-0.24, 0.0, d) * 0.5;
    float pulse = vPulse * (spark + tail);
    float breathe = 0.8 + 0.2 * sin(uTime * 0.6 + vSeed * 6.2831);
    vec3 col = mix(uBase, uHot, clamp(pulse, 0.0, 1.0));
    gl_FragColor = vec4(col, (uBaseAlpha * breathe + pulse) * vFade);
    ${OUTPUT_CHUNK}
  }
`

const pointVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uDrift;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.13 + aPhase * 6.2831) * uDrift;
    p.y += cos(uTime * 0.11 + aPhase * 4.0) * uDrift;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float pulse = 0.8 + 0.2 * sin(uTime * 1.1 + aPhase * 6.2831);
    gl_PointSize = aSize * pulse * uPixelRatio * (9.0 / -mv.z);
    vAlpha = (0.5 + 0.5 * pulse) * mix(0.3, 1.0, smoothstep(-18.0, -6.0, mv.z));
    gl_Position = projectionMatrix * mv;
  }
`

const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uCore;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float halo = pow(1.0 - r * 2.0, 2.4);
    float core = smoothstep(0.17, 0.02, r);
    gl_FragColor = vec4(mix(uColor, uCore, core), (halo * 0.55 + core) * vAlpha * uOpacity);
    ${OUTPUT_CHUNK}
  }
`

const glowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const glowFragment = /* glsl */ `
  uniform vec3 uInner;
  uniform vec3 uOuter;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    float g = pow(clamp(1.0 - r, 0.0, 1.0), 2.2) * (0.93 + 0.07 * sin(uTime * 0.5));
    gl_FragColor = vec4(mix(uOuter, uInner, g), g * uOpacity);
    ${OUTPUT_CHUNK}
  }
`

const nucleusVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const nucleusFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uBright;
  uniform vec3 uPale;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.0);
    float flow = 0.5 + 0.5 * sin(vPos.y * 9.0 + uTime * 1.1 + sin(vPos.x * 6.0 + uTime * 0.7) * 1.6);
    float beat = 0.5 + 0.5 * sin(uTime * 1.4);
    vec3 col = mix(uDeep, uBright, 0.5 + 0.22 * flow * (0.6 + 0.4 * beat));
    col = mix(col, mix(uPale, uBright, 0.5), fresnel * 0.6);
    gl_FragColor = vec4(col * 1.25, 1.0);
    ${OUTPUT_CHUNK}
  }
`

const trailVertex = /* glsl */ `
  attribute float aA;
  varying float vA;
  varying float vFade;
  void main() {
    vA = aA;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFade = mix(0.25, 1.0, smoothstep(-14.0, -6.0, mv.z));
    gl_Position = projectionMatrix * mv;
  }
`

const trailFragment = /* glsl */ `
  uniform float uHead;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vA;
  varying float vFade;
  void main() {
    float x = fract(uHead - vA);
    float trail = pow(max(0.0, 1.0 - x / 0.3), 3.0);
    gl_FragColor = vec4(uColor, (trail + 0.03) * uOpacity * vFade);
    ${OUTPUT_CHUNK}
  }
`

function makePointUniforms(color: string, core: string, opacity: number, drift: number) {
  return {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uDrift: { value: drift },
    uColor: { value: new THREE.Color(color) },
    uCore: { value: new THREE.Color(core) },
    uOpacity: { value: opacity },
  }
}

// ─── Procedural geometry ─────────────────────────────────────

const CAGE_RADIUS = 1.55

function buildNetwork(count: number, segments: number) {
  const rand = mulberry32(7)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const nodes: THREE.Vector3[] = []

  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) / count) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i + rand() * 0.4
    const dir = new THREE.Vector3(Math.cos(theta) * r, y * 0.78, Math.sin(theta) * r)
    nodes.push(dir.multiplyScalar(2.1 + rand() * 1.25))
  }

  // Each node links to its nearest neighbours; every fourth also feeds the core.
  const curves: { a: THREE.Vector3; b: THREE.Vector3; control: THREE.Vector3; pulseChance: number }[] = []
  const seen = new Set<string>()
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: a.distanceToSquared(b) }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
    const links = rand() < 0.3 ? [0, 1, 2 + Math.floor(rand() * 3)] : [0, 1]
    links.forEach((k) => {
      const j = nearest[k].j
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) return
      seen.add(key)
      const b = nodes[j]
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const control = mid.clone().setLength(mid.length() + a.distanceTo(b) * 0.35)
      curves.push({ a, b, control, pulseChance: 0.38 })
    })
    if (i % 4 === 0) {
      const b = a.clone().setLength(CAGE_RADIUS)
      const side = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).cross(a).setLength(0.45)
      const control = a.clone().lerp(b, 0.5).add(side)
      curves.push({ a, b, control, pulseChance: 0.65 })
    }
  })

  const vertexCount = curves.length * segments * 2
  const positions = new Float32Array(vertexCount * 3)
  const aT = new Float32Array(vertexCount)
  const aSeed = new Float32Array(vertexCount)
  const aPulse = new Float32Array(vertexCount)
  const aSpeed = new Float32Array(vertexCount)
  let v = 0
  curves.forEach(({ a, b, control, pulseChance }) => {
    const points = new THREE.QuadraticBezierCurve3(a, control, b).getPoints(segments)
    const seed = rand()
    const pulse = rand() < pulseChance ? 1 : 0
    const speed = 0.6 + rand() * 0.8
    for (let s = 0; s < segments; s++) {
      for (const k of [s, s + 1]) {
        points[k].toArray(positions, v * 3)
        aT[v] = k / segments
        aSeed[v] = seed
        aPulse[v] = pulse
        aSpeed[v] = speed
        v++
      }
    }
  })

  const lines = new THREE.BufferGeometry()
  lines.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  lines.setAttribute('aT', new THREE.BufferAttribute(aT, 1))
  lines.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1))
  lines.setAttribute('aPulse', new THREE.BufferAttribute(aPulse, 1))
  lines.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1))

  const nodePositions = new Float32Array(count * 3)
  const nodeSizes = new Float32Array(count)
  const nodePhases = new Float32Array(count)
  nodes.forEach((n, i) => {
    n.toArray(nodePositions, i * 3)
    nodeSizes[i] = 16 + rand() * 18
    nodePhases[i] = rand()
  })
  const points = new THREE.BufferGeometry()
  points.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
  points.setAttribute('aSize', new THREE.BufferAttribute(nodeSizes, 1))
  points.setAttribute('aPhase', new THREE.BufferAttribute(nodePhases, 1))

  return { lines, points }
}

function buildParticles(count: number) {
  const rand = mulberry32(21)
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 22
    positions[i * 3 + 1] = (rand() - 0.5) * 14
    positions[i * 3 + 2] = -9 + rand() * 12
    sizes[i] = 2 + rand() * 4.5
    phases[i] = rand()
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  return geometry
}

function buildCage(radius: number) {
  const ico = new THREE.IcosahedronGeometry(radius, 0)
  const edges = new THREE.EdgesGeometry(ico)
  const pos = edges.getAttribute('position')
  const up = new THREE.Vector3(0, 1, 0)
  const edgeMatrices: THREE.Matrix4[] = []
  const vertices = new Map<string, THREE.Vector3>()
  for (let i = 0; i < pos.count; i += 2) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, i)
    const b = new THREE.Vector3().fromBufferAttribute(pos, i + 1)
    const dir = b.clone().sub(a)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize())
    const mid = a.clone().add(b).multiplyScalar(0.5)
    edgeMatrices.push(new THREE.Matrix4().compose(mid, quaternion, new THREE.Vector3(1, dir.length(), 1)))
    for (const p of [a, b]) vertices.set(p.toArray().map((n) => n.toFixed(3)).join(','), p)
  }
  ico.dispose()
  edges.dispose()
  return { edgeMatrices, vertices: [...vertices.values()] }
}

function buildGlyphGeometry() {
  const chevron = [[0.28, 0.42], [-0.2, 0], [0.28, -0.42], [0.4, -0.31], [0.05, 0], [0.4, 0.31]]
  const shape = (points: number[][]) => {
    const s = new THREE.Shape()
    points.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)))
    s.closePath()
    return s
  }
  const left = shape(chevron.map(([x, y]) => [x - 0.68, y]))
  const right = shape(chevron.map(([x, y]) => [0.68 - x, y]).reverse())
  const slash = shape([[-0.24, -0.5], [-0.1, -0.5], [0.24, 0.5], [0.1, 0.5]])
  const geometry = new THREE.ExtrudeGeometry([left, slash, right], {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 4,
  })
  geometry.center()
  return geometry
}

// ─── Scene pieces ────────────────────────────────────────────

function Glass({ opacity }: { opacity?: number }) {
  const { look } = useScene()
  return (
    <meshPhysicalMaterial
      color={look.glassColor}
      transparent
      opacity={opacity ?? look.glassOpacity}
      roughness={0.08}
      metalness={0.15}
      clearcoat={1}
      clearcoatRoughness={0.1}
      iridescence={0.35}
      iridescenceIOR={1.3}
      envMapIntensity={look.envIntensity * 1.4}
      depthWrite={false}
      flatShading
    />
  )
}

function Nucleus() {
  const { motion } = useScene()
  const mesh = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(PALETTE.deep) },
      uBright: { value: new THREE.Color(PALETTE.bright) },
      uPale: { value: new THREE.Color(PALETTE.pale) },
    }),
    [],
  )
  useFrame((state) => {
    const t = sceneTime(state, motion)
    uniforms.uTime.value = t
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.04)
  })
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.36, 5]} />
      <shaderMaterial uniforms={uniforms} vertexShader={nucleusVertex} fragmentShader={nucleusFragment} />
    </mesh>
  )
}

function Crystal() {
  const { look, tier, motion } = useScene()
  const crystal = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Mesh>(null!)
  const background = useMemo(() => new THREE.Color(look.transmissionBg), [look])
  const geometry = useDisposable(() => new THREE.DodecahedronGeometry(1, 0), [])
  const edges = useDisposable(() => new THREE.EdgesGeometry(geometry), [geometry])

  useFrame((state) => {
    const t = sceneTime(state, motion)
    crystal.current.rotation.set(t * 0.05, t * 0.11, 0)
    inner.current.rotation.set(-t * 0.09, -t * 0.07, t * 0.04)
  })

  return (
    <>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.66, 0]} />
        <Glass opacity={look.glassOpacity * 1.3} />
      </mesh>
      <group ref={crystal}>
        <mesh geometry={geometry}>
          {tier.transmission ? (
            <MeshTransmissionMaterial
              background={background}
              samples={8}
              resolution={1024}
              thickness={0.5}
              roughness={0.04}
              ior={1.3}
              chromaticAberration={0.08}
              anisotropicBlur={0.04}
              distortion={0.06}
              distortionScale={0.3}
              temporalDistortion={motion ? 0.04 : 0}
              color={PALETTE.pale}
              attenuationColor={PALETTE.mid}
              attenuationDistance={3.5}
              clearcoat={1}
              envMapIntensity={look.envIntensity * 0.45}
              emissive={PALETTE.deep}
              emissiveIntensity={look.cageEmissive * 0.5}
              flatShading
            />
          ) : (
            <Glass opacity={look.glassOpacity * 1.5} />
          )}
        </mesh>
        <lineSegments geometry={edges}>
          <lineBasicMaterial color={look.node} transparent opacity={0.28} depthWrite={false} toneMapped={false} />
        </lineSegments>
      </group>
    </>
  )
}

function Cage() {
  const { look, motion } = useScene()
  const group = useRef<THREE.Group>(null!)
  const struts = useRef<THREE.InstancedMesh>(null!)
  const joints = useRef<THREE.InstancedMesh>(null!)
  const cage = useMemo(() => buildCage(CAGE_RADIUS), [])

  useLayoutEffect(() => {
    cage.edgeMatrices.forEach((m, i) => struts.current.setMatrixAt(i, m))
    struts.current.instanceMatrix.needsUpdate = true
    const m = new THREE.Matrix4()
    cage.vertices.forEach((p, i) => joints.current.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)))
    joints.current.instanceMatrix.needsUpdate = true
  }, [cage])

  useFrame((state) => {
    const t = sceneTime(state, motion)
    group.current.rotation.set(Math.sin(t * 0.1) * 0.2, -t * 0.045, Math.cos(t * 0.08) * 0.1)
  })

  return (
    <group ref={group}>
      <instancedMesh ref={struts} args={[undefined, undefined, cage.edgeMatrices.length]}>
        <cylinderGeometry args={[0.007, 0.007, 1, 6]} />
        <meshStandardMaterial
          color={look.cage}
          emissive={PALETTE.mid}
          emissiveIntensity={look.cageEmissive}
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.5}
        />
      </instancedMesh>
      <instancedMesh ref={joints} args={[undefined, undefined, cage.vertices.length]}>
        <icosahedronGeometry args={[0.03, 2]} />
        <meshBasicMaterial color={look.node} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

const ARCS = [
  { radius: 1.9, tube: 0.01, arc: Math.PI * 1.35, tilt: [1.2, 0.2, 0], speed: 0.12 },
  { radius: 2.05, tube: 0.007, arc: Math.PI * 1.6, tilt: [0.3, -0.9, 0.4], speed: -0.08 },
  { radius: 2.2, tube: 0.012, arc: Math.PI * 0.85, tilt: [-0.7, 0.5, 1.1], speed: 0.16 },
] as const

function Arcs() {
  const { motion } = useScene()
  const rings = useRef<(THREE.Mesh | null)[]>([])
  useFrame((state) => {
    const t = sceneTime(state, motion)
    rings.current.forEach((ring, i) => {
      if (ring) ring.rotation.z = t * ARCS[i].speed + i * 2.1
    })
  })
  return (
    <>
      {ARCS.map((a, i) => (
        <group key={i} rotation={[...a.tilt] as [number, number, number]}>
          <mesh ref={(el) => void (rings.current[i] = el)}>
            <torusGeometry args={[a.radius, a.tube, 10, 160, a.arc]} />
            <Glass opacity={0.6} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Network() {
  const { look, tier, motion } = useScene()
  const dpr = useThree((s) => s.viewport.dpr)
  const group = useRef<THREE.Group>(null!)
  const net = useMemo(() => buildNetwork(tier.nodes, tier.segments), [tier])
  useEffect(
    () => () => {
      net.lines.dispose()
      net.points.dispose()
    },
    [net],
  )

  const lineUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBase: { value: new THREE.Color() },
      uHot: { value: new THREE.Color() },
      uBaseAlpha: { value: 0 },
    }),
    [],
  )
  const nodeUniforms = useMemo(() => makePointUniforms(look.node, look.nodeCore, 1, 0.04), [])

  useLayoutEffect(() => {
    lineUniforms.uBase.value.set(look.lineBase)
    lineUniforms.uHot.value.set(look.lineHot)
    lineUniforms.uBaseAlpha.value = look.lineAlpha
    nodeUniforms.uColor.value.set(look.node)
    nodeUniforms.uCore.value.set(look.nodeCore)
  }, [look, lineUniforms, nodeUniforms])

  useFrame((state) => {
    const t = sceneTime(state, motion)
    lineUniforms.uTime.value = t
    nodeUniforms.uTime.value = t
    nodeUniforms.uPixelRatio.value = dpr
    group.current.rotation.set(Math.sin(t * 0.07) * 0.08, t * 0.035, 0)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={net.lines} frustumCulled={false}>
        <shaderMaterial
          uniforms={lineUniforms}
          vertexShader={lineVertex}
          fragmentShader={lineFragment}
          transparent
          depthWrite={false}
          blending={look.blending}
          toneMapped={false}
        />
      </lineSegments>
      <points geometry={net.points} frustumCulled={false}>
        <shaderMaterial
          uniforms={nodeUniforms}
          vertexShader={pointVertex}
          fragmentShader={pointFragment}
          transparent
          depthWrite={false}
          blending={look.blending}
          toneMapped={false}
        />
      </points>
    </group>
  )
}

function Particles() {
  const { look, tier, motion } = useScene()
  const dpr = useThree((s) => s.viewport.dpr)
  const points = useRef<THREE.Points>(null!)
  const geometry = useDisposable(() => buildParticles(tier.particles), [tier.particles])
  const uniforms = useMemo(() => makePointUniforms(look.particle, look.particle, look.particleOpacity, 0.35), [])

  useLayoutEffect(() => {
    uniforms.uColor.value.set(look.particle)
    uniforms.uCore.value.set(look.particle)
    uniforms.uOpacity.value = look.particleOpacity
  }, [look, uniforms])

  useFrame((state) => {
    const t = sceneTime(state, motion)
    uniforms.uTime.value = t
    uniforms.uPixelRatio.value = dpr
    points.current.rotation.y = t * 0.01
  })

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={pointVertex}
        fragmentShader={pointFragment}
        transparent
        depthWrite={false}
        blending={look.blending}
        toneMapped={false}
      />
    </points>
  )
}

function LightTrail({ radius, tilt, speed, phase }: { radius: number; tilt: [number, number, number]; speed: number; phase: number }) {
  const { look, motion } = useScene()
  const geometry = useDisposable(() => {
    const steps = 220
    const positions = new Float32Array(steps * 3)
    const angles = new Float32Array(steps)
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2
      positions.set([Math.cos(a) * radius, 0, Math.sin(a) * radius * 0.82], i * 3)
      angles[i] = i / steps
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aA', new THREE.BufferAttribute(angles, 1))
    return g
  }, [radius])
  const uniforms = useMemo(
    () => ({ uHead: { value: 0 }, uColor: { value: new THREE.Color() }, uOpacity: { value: 1 } }),
    [],
  )
  useLayoutEffect(() => {
    uniforms.uColor.value.set(look.trail)
    uniforms.uOpacity.value = look.trailOpacity
  }, [look, uniforms])
  useFrame((state) => {
    uniforms.uHead.value = (sceneTime(state, motion) * speed + phase) % 1
  })
  return (
    <lineLoop geometry={geometry} rotation={tilt} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={trailVertex}
        fragmentShader={trailFragment}
        transparent
        depthWrite={false}
        blending={look.blending}
        toneMapped={false}
      />
    </lineLoop>
  )
}

type OrbiterKind = 'glyph' | 'panel' | 'tetra' | 'octa' | 'cube' | 'ring'

interface OrbiterConfig {
  kind: OrbiterKind
  radius: number
  speed: number
  phase: number
  tilt: [number, number, number]
  spin: [number, number, number]
  scale: number
}

// Code & logic references: </> glyph, code panel, logic solids.
const ORBITERS: OrbiterConfig[] = [
  { kind: 'glyph', radius: 2.75, speed: 0.07, phase: 0.6, tilt: [0.32, 0, 0.16], spin: [0.08, 0.5, 0.04], scale: 0.32 },
  { kind: 'panel', radius: 3.25, speed: -0.05, phase: 2.5, tilt: [-0.26, 0, -0.12], spin: [0.05, 0.45, 0.03], scale: 0.46 },
  { kind: 'tetra', radius: 2.35, speed: 0.11, phase: 4.1, tilt: [0.6, 0, -0.3], spin: [0.4, 0.3, 0.1], scale: 0.2 },
  { kind: 'octa', radius: 3.5, speed: 0.045, phase: 1.3, tilt: [-0.5, 0, 0.4], spin: [0.2, 0.35, 0], scale: 0.24 },
  { kind: 'cube', radius: 2.95, speed: -0.085, phase: 5.2, tilt: [0.15, 0, 0.55], spin: [0.3, 0.2, 0.25], scale: 0.17 },
  { kind: 'ring', radius: 2.5, speed: 0.09, phase: 3.3, tilt: [-0.2, 0, -0.5], spin: [0.5, 0.1, 0], scale: 0.17 },
]

const CODE_LINES = [
  { y: 0.13, x: 0, w: 0.5 },
  { y: 0.0, x: 0.1, w: 0.36 },
  { y: -0.13, x: 0.1, w: 0.56 },
  { y: -0.26, x: 0, w: 0.3 },
]

function OrbiterShape({ kind }: { kind: OrbiterKind }) {
  const { look } = useScene()
  const glyph = useDisposable(buildGlyphGeometry, [])
  const solid = useDisposable(
    () =>
      kind === 'tetra'
        ? new THREE.TetrahedronGeometry(1, 0)
        : kind === 'octa'
          ? new THREE.OctahedronGeometry(1, 0)
          : new THREE.BoxGeometry(1.2, 1.2, 1.2),
    [kind],
  )
  const edges = useDisposable(() => new THREE.EdgesGeometry(solid), [solid])
  const lineMaterial = (
    <lineBasicMaterial color={look.accent} transparent opacity={0.8} depthWrite={false} toneMapped={false} />
  )

  if (kind === 'glyph') {
    return (
      <mesh geometry={glyph}>
        <meshPhysicalMaterial
          color={look.accent}
          emissive={PALETTE.mid}
          emissiveIntensity={look.cageEmissive * 0.8}
          roughness={0.15}
          metalness={0.3}
          clearcoat={1}
          transparent
          opacity={0.85}
          envMapIntensity={look.envIntensity}
        />
      </mesh>
    )
  }
  if (kind === 'panel') {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1.1, 0.74, 0.04]} />
          <Glass opacity={look.glassOpacity * 1.6} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.44 + i * 0.07, 0.28, 0.03]}>
            <circleGeometry args={[0.022, 12]} />
            <meshBasicMaterial color={look.accent} transparent opacity={0.6} toneMapped={false} />
          </mesh>
        ))}
        {CODE_LINES.map((l, i) => (
          <mesh key={i} position={[-0.44 + l.x + l.w / 2, l.y, 0.03]}>
            <planeGeometry args={[l.w, 0.045]} />
            <meshBasicMaterial color={i % 2 ? look.node : look.accent} transparent opacity={0.85} toneMapped={false} />
          </mesh>
        ))}
      </group>
    )
  }
  if (kind === 'ring') {
    return (
      <mesh>
        <torusGeometry args={[1, 0.14, 12, 48]} />
        <Glass opacity={0.55} />
      </mesh>
    )
  }
  if (kind === 'cube') {
    return <lineSegments geometry={edges}>{lineMaterial}</lineSegments>
  }
  return (
    <group>
      <mesh geometry={solid}>
        <Glass opacity={look.glassOpacity * 1.5} />
      </mesh>
      <lineSegments geometry={edges}>{lineMaterial}</lineSegments>
    </group>
  )
}

function Orbiter({ config }: { config: OrbiterConfig }) {
  const { motion } = useScene()
  const ref = useRef<THREE.Group>(null!)
  const tilt = useMemo(() => new THREE.Euler(...config.tilt), [config])
  const scratch = useMemo(() => new THREE.Vector3(), [])
  const facesViewer = config.kind === 'glyph' || config.kind === 'panel'

  useFrame((state) => {
    const t = sceneTime(state, motion)
    const a = t * config.speed + config.phase
    scratch.set(Math.cos(a) * config.radius, Math.sin(t * 0.5 + config.phase) * 0.12, Math.sin(a) * config.radius * 0.8)
    ref.current.position.copy(scratch.applyEuler(tilt))
    const [sx, sy, sz] = config.spin
    if (facesViewer) {
      // Readable shapes sway gently instead of tumbling.
      ref.current.rotation.set(Math.sin(t * sx * 2) * 0.25, Math.sin(t * sy + config.phase) * 0.6, Math.sin(t * sz * 3) * 0.1)
    } else {
      ref.current.rotation.set(t * sx, t * sy, t * sz)
    }
  })

  return (
    <group ref={ref} scale={config.scale}>
      <OrbiterShape kind={config.kind} />
    </group>
  )
}

function Backglow() {
  const { look, motion } = useScene()
  const uniforms = useMemo(
    () => ({
      uInner: { value: new THREE.Color() },
      uOuter: { value: new THREE.Color() },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
    }),
    [],
  )
  useLayoutEffect(() => {
    uniforms.uInner.value.set(look.glowInner)
    uniforms.uOuter.value.set(look.glowOuter)
    uniforms.uOpacity.value = look.glowOpacity
  }, [look, uniforms])
  useFrame((state) => {
    uniforms.uTime.value = sceneTime(state, motion)
  })
  return (
    <mesh position={[0, 0, -1.6]} scale={9} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={glowVertex}
        fragmentShader={glowFragment}
        transparent
        depthWrite={false}
        blending={look.blending}
        toneMapped={false}
      />
    </mesh>
  )
}

function CoreAssembly() {
  const { look, motion } = useScene()
  const group = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const t = sceneTime(state, motion)
    group.current.position.y = Math.sin(t * 0.45) * 0.06
    group.current.rotation.y = t * 0.06
  })
  return (
    <group ref={group}>
      <pointLight intensity={look.inner} distance={6} decay={1.6} color={PALETTE.bright} />
      <Nucleus />
      <Crystal />
      <Cage />
      <Arcs />
    </group>
  )
}

// Places the composition to the right of the headline and eases the
// camera toward the pointer for a subtle parallax.
function Composition({ parallax }: { parallax: boolean }) {
  const { compact } = useScene()
  const viewport = useThree((s) => s.viewport)
  const camera = useThree((s) => s.camera)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!parallax) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [parallax])

  useFrame((_, delta) => {
    if (!parallax) return
    const k = 1 - Math.exp(-Math.min(delta, 0.1) * 2)
    camera.position.x += (pointer.current.x * 0.45 - camera.position.x) * k
    camera.position.y += (-pointer.current.y * 0.3 - camera.position.y) * k
    camera.lookAt(0, 0, 0)
  })

  const x = viewport.width * (compact ? 0.3 : 0.335)
  const y = viewport.height * (compact ? 0.34 : 0.14)
  const scale = compact ? Math.min(0.5, viewport.width / 5) : THREE.MathUtils.clamp(viewport.width / 10.5, 0.72, 0.95)

  return (
    <group position={[x, y, 0]} scale={scale}>
      <Backglow />
      <CoreAssembly />
      <Network />
      <LightTrail radius={2.65} tilt={[0.35, 0, 0.2]} speed={0.07} phase={0} />
      <LightTrail radius={3.3} tilt={[-0.25, 0.4, -0.3]} speed={-0.045} phase={0.5} />
      {ORBITERS.map((o) => (
        <Orbiter key={o.kind} config={o} />
      ))}
    </group>
  )
}

function Lighting() {
  const { look } = useScene()
  return (
    <>
      <ambientLight intensity={look.ambient} color={PALETTE.pale} />
      <directionalLight position={[4, 5, 6]} intensity={look.key} color={PALETTE.pale} />
      <pointLight position={[-6, -3, -4]} intensity={30} color={PALETTE.deep} />
      <pointLight position={[6, 4, 3]} intensity={18} color={PALETTE.bright} />
      {/* Procedural studio environment for glass reflections — no HDR download. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="ring" intensity={1.2} color={PALETTE.pale} scale={6} position={[0, 4, -6]} />
        <Lightformer form="rect" intensity={1.3} color={PALETTE.bright} scale={[8, 2, 1]} position={[-6, 1, 2]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.5} color={PALETTE.mid} scale={[6, 6, 1]} position={[6, -2, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="circle" intensity={1.6} color="#FFFFFF" scale={2} position={[2, 5, 4]} />
      </Environment>
    </>
  )
}

// Re-renders a frame when the theme flips while the loop is idle (reduced motion).
function InvalidateOn({ value }: { value: unknown }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => invalidate(), [value, invalidate])
  return null
}

// ─── Environment detection ───────────────────────────────────

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

function readTheme(): Theme {
  const root = document.documentElement
  return root.classList.contains('light') || root.dataset.theme === 'light' ? 'light' : 'dark'
}

function useDocumentTheme() {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
      return () => observer.disconnect()
    },
    readTheme,
    () => 'dark' as Theme,
  )
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

function StaticCore() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute right-[-12%] top-[12%] w-[min(80vw,680px)] aspect-square rounded-full"
        style={{
          background:
            'radial-gradient(circle at 42% 38%, rgba(189,234,235,0.45) 0%, rgba(113,213,217,0.22) 18%, rgba(17,88,107,0.28) 42%, transparent 68%)',
        }}
      />
      <div className="absolute right-[4%] top-[26%] w-[min(40vw,340px)] aspect-square rounded-full border border-[#71D5D9]/20" />
    </div>
  )
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

// ─── Public component ────────────────────────────────────────

// Memoised: the hero re-renders on every scroll-velocity tick, which would
// otherwise re-render the Canvas tree (and re-bake the environment map).
export const NeuralCore = memo(function NeuralCore() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [webgl] = useState(hasWebGL)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const [settled, setSettled] = useState(false)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const compact = useMediaQuery('(max-width: 767px), (pointer: coarse)')
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const theme = useDocumentTheme()

  const motion = !reducedMotion
  const settings = useMemo<SceneSettings>(
    () => ({ look: LOOKS[theme], tier: compact ? TIERS.compact : TIERS.full, motion, compact }),
    [theme, compact, motion],
  )

  // Pause rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Reduced motion: render long enough for the environment and glass to settle, then idle.
  useEffect(() => {
    if (motion) return
    const id = window.setTimeout(() => setSettled(true), 1200)
    return () => window.clearTimeout(id)
  }, [motion])

  if (!webgl) return <StaticCore />

  const frameloop = !visible ? 'never' : motion || !settled ? 'always' : 'demand'

  return (
    <div
      ref={wrapper}
      className="absolute inset-0 pointer-events-none transition-opacity duration-[1600ms] ease-out"
      style={{ opacity: ready ? (compact ? 0.75 : 1) : 0 }}
      aria-hidden="true"
    >
      <SceneBoundary fallback={<StaticCore />}>
        <Canvas
          frameloop={frameloop}
          dpr={settings.tier.dpr}
          camera={{ position: [0, 0, 9], fov: 40, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={() => setReady(true)}
          style={{ pointerEvents: 'none' }}
        >
          <SceneContext.Provider value={settings}>
            <InvalidateOn value={settings} />
            <Lighting />
            <Particles />
            <Composition parallax={motion && finePointer && !compact} />
          </SceneContext.Provider>
        </Canvas>
      </SceneBoundary>
    </div>
  )
})

export default NeuralCore
