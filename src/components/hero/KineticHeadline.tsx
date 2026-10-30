import { memo, useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useIsPresent, useMotionValue, useSpring, type Variants } from 'framer-motion'

// ─────────────────────────────────────────────────────────────
// BUILD → LEARN → BECOME kinetic 3D headline.
// Real DOM text extruded with stacked depth layers in CSS 3D,
// so it stays crisp, accessible and theme-aware.
// ─────────────────────────────────────────────────────────────

export type HeadlinePhase = 0 | 1 | 2

export const HEADLINE_WORDS = ['BUILD', 'LEARN', 'BECOME'] as const

// How long each word holds (entry animation included) before the next one.
export const PHASE_HOLD_MS: Record<HeadlinePhase, number> = { 0: 4300, 1: 4300, 2: 5000 }

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const EASE_IN = [0.7, 0, 0.84, 0] as const

// Deterministic scatter so the shards fly in identically every loop.
const spread = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

const SHARDS = [
  'polygon(0 0, 100% 0, 100% 36%, 0 52%)',
  'polygon(0 51%, 100% 35%, 100% 71%, 0 80%)',
  'polygon(0 79%, 100% 70%, 100% 100%, 0 100%)',
]
const SHARDS_MIRRORED = [
  'polygon(0 0, 100% 0, 100% 52%, 0 36%)',
  'polygon(0 35%, 100% 51%, 100% 80%, 0 71%)',
  'polygon(0 70%, 100% 79%, 100% 100%, 0 100%)',
]

// ─── Variants per word ───────────────────────────────────────

const letterVariants: Record<HeadlinePhase, Variants> = {
  // BUILD: the letter itself stays put while its shards assemble; it flips up and away on exit.
  0: {
    enter: {},
    show: {},
    exit: (i: number) => ({
      rotateX: 95,
      y: '-0.18em',
      z: 60,
      transition: { duration: 0.6, ease: EASE_IN, delay: i * 0.035 },
    }),
  },
  // LEARN: letters hinge up from below, then recede into depth on exit.
  1: {
    enter: { rotateX: -95, y: '0.2em', z: -40 },
    show: (i: number) => ({
      rotateX: 0,
      y: 0,
      z: 0,
      transition: { duration: 1, ease: EASE_OUT, delay: 0.35 + i * 0.06 },
    }),
    exit: (i: number) => ({
      z: -320,
      rotateY: -25,
      transition: { duration: 0.75, ease: EASE_IN, delay: i * 0.04 },
    }),
  },
  // BECOME: rises out of depth into place, then dissolves toward the viewer.
  2: {
    enter: { y: '0.55em', rotateX: 75, z: -160, scale: 0.92 },
    show: (i: number) => ({
      y: 0,
      rotateX: 0,
      z: 0,
      scale: 1,
      transition: { duration: 1.3, ease: EASE_OUT, delay: 0.45 + i * 0.075 },
    }),
    exit: (i: number) => ({
      z: 220,
      scale: 1.08,
      y: '-0.08em',
      transition: { duration: 0.7, ease: EASE_IN, delay: i * 0.03 },
    }),
  },
}

const shardVariants: Variants = {
  enter: ([i, k]: [number, number]) => ({
    x: `${spread(i, k) * 1.4}em`,
    y: `${spread(i, k + 3) * 0.9}em`,
    z: spread(i, k + 7) * 380,
    rotateX: spread(i, k + 1) * 120,
    rotateY: spread(i, k + 2) * 140,
    rotateZ: spread(i, k + 4) * 60,
    opacity: 0,
  }),
  show: ([i, k]: [number, number]) => ({
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    opacity: 1,
    transition: { duration: 1.25, ease: EASE_OUT, delay: 0.15 + i * 0.07 + k * 0.06 },
  }),
  exit: ([i]: [number, number]) => ({ opacity: 0, transition: { duration: 0.4, delay: 0.15 + i * 0.035 } }),
}

const SHOW_DELAY: Record<HeadlinePhase, number> = { 0: 0.85, 1: 0.35, 2: 0.45 }

const fadeVariants = (word: HeadlinePhase, extra = 0): Variants => ({
  enter: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: SHOW_DELAY[word] + extra + i * (word === 2 ? 0.075 : 0.06) },
  }),
  exit: (i: number) => ({ opacity: 0, transition: { duration: 0.35, delay: i * 0.025 } }),
})

const FACE_VARIANTS = { 0: fadeVariants(0), 1: fadeVariants(1), 2: fadeVariants(2) }
const DEPTH_VARIANTS = { 0: fadeVariants(0), 1: fadeVariants(1, 0.15), 2: fadeVariants(2, 0.25) }

// ─── Pieces ──────────────────────────────────────────────────

const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties

function Letter({ char, index, word, depth }: { char: string; index: number; word: HeadlinePhase; depth: number }) {
  const accent = char === '.'
  const shards = index % 2 ? SHARDS_MIRRORED : SHARDS
  return (
    <motion.span
      className={`kt-letter${accent ? ' kt-letter--accent' : ''}`}
      custom={index}
      variants={letterVariants[word]}
      style={cssVars({ '--i': index, '--sweep': `${SHOW_DELAY[word]}s` })}
    >
      {Array.from({ length: depth }, (_, d) => (
        <motion.span
          key={d}
          className="kt-depth"
          custom={index}
          variants={DEPTH_VARIANTS[word]}
          style={cssVars({ '--z': `${-(d + 1) * (0.14 / depth)}em`, '--d': d / Math.max(depth - 1, 1) })}
        >
          {char}
        </motion.span>
      ))}
      {word === 0 ? (
        <>
          <span className="kt-sizer">{char}</span>
          {shards.map((clip, k) => (
            <motion.span
              key={k}
              className="kt-shard kt-face"
              custom={[index, k]}
              variants={shardVariants}
              style={{ clipPath: clip }}
            >
              {char}
            </motion.span>
          ))}
        </>
      ) : (
        <motion.span
          className={`kt-face${word === 2 ? ' kt-face--luminous' : ''}`}
          custom={index}
          variants={FACE_VARIANTS[word]}
        >
          {char}
        </motion.span>
      )}
    </motion.span>
  )
}

interface Node {
  x: number
  y: number
}

// LEARN: glowing nodes tied to each glyph, linked by flowing curves behind the letters.
function NodeLinks({ wordRef }: { wordRef: React.RefObject<HTMLDivElement | null> }) {
  const [layout, setLayout] = useState<{ nodes: Node[]; w: number; h: number } | null>(null)
  // Mounts after the word has measured, so it drives its own variants instead of inheriting them.
  const isPresent = useIsPresent()

  // useEffect (not layout): the parent word's ref is attached after child layout effects run.
  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const measure = () => {
      const letters = [...el.querySelectorAll<HTMLElement>('.kt-letter')].filter((l) => l.textContent !== '.')
      const h = el.offsetHeight
      setLayout({
        w: el.offsetWidth,
        h,
        nodes: letters.map((l, i) => ({
          x: l.offsetLeft + l.offsetWidth * (i % 2 ? 0.62 : 0.38),
          y: i % 2 ? h * 0.97 : h * 0.06,
        })),
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [wordRef])

  if (!layout || layout.nodes.length < 2) return null
  const { nodes, w, h } = layout
  const d = nodes.reduce((path, n, i) => {
    if (i === 0) return `M ${n.x} ${n.y}`
    const p = nodes[i - 1]
    const dx = (n.x - p.x) / 2
    return `${path} C ${p.x + dx} ${p.y} ${n.x - dx} ${n.y} ${n.x} ${n.y}`
  }, '')
  const skips = nodes.slice(2).map((n, i) => `M ${nodes[i].x} ${nodes[i].y} Q ${(nodes[i].x + n.x) / 2} ${h * 0.5} ${n.x} ${n.y}`)
  const r = Math.max(h * 0.035, 3)

  return (
    <motion.svg
      className="kt-links"
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      aria-hidden="true"
      initial="enter"
      animate={isPresent ? 'show' : 'exit'}
    >
      {skips.map((s, i) => (
        <motion.path
          key={i}
          d={s}
          fill="none"
          stroke="var(--kt-line)"
          strokeWidth={1}
          strokeDasharray="2 6"
          variants={{
            enter: { opacity: 0 },
            show: { opacity: 0.6, transition: { duration: 0.8, delay: 1.3 + i * 0.1 } },
            exit: { opacity: 0, transition: { duration: 0.3 } },
          }}
        />
      ))}
      <motion.path
        d={d}
        fill="none"
        stroke="var(--kt-line)"
        strokeWidth={1.5}
        variants={{
          enter: { pathLength: 0, opacity: 0 },
          show: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: 'easeInOut', delay: 0.9 } },
          exit: { opacity: 0, transition: { duration: 0.35 } },
        }}
      />
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          variants={{
            enter: { scale: 0, opacity: 0 },
            show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 16, delay: 1 + i * 0.16 } },
            exit: { scale: 0, opacity: 0, transition: { duration: 0.3, delay: i * 0.03 } },
          }}
        >
          <circle cx={n.x} cy={n.y} r={r * 3} fill="var(--kt-glow-soft)" />
          <circle cx={n.x} cy={n.y} r={r} fill="var(--kt-node)" />
        </motion.g>
      ))}
      <motion.circle
        r={r * 0.9}
        fill="var(--kt-sheen)"
        variants={{ enter: { opacity: 0 }, show: { opacity: 1, transition: { delay: 2.2 } }, exit: { opacity: 0 } }}
      >
        <animateMotion dur="2.4s" repeatCount="indefinite" path={d} />
      </motion.circle>
    </motion.svg>
  )
}

const MOTES = Array.from({ length: 18 }, (_, i) => ({
  left: `${50 + spread(i, 1) * 52}%`,
  top: `${50 + spread(i, 2) * 55}%`,
  size: `${2 + Math.abs(spread(i, 3)) * 3.5}px`,
  z: `${spread(i, 4) * 80}px`,
  dur: `${3.2 + Math.abs(spread(i, 5)) * 2.6}s`,
  delay: `${1.2 + Math.abs(spread(i, 6)) * 2.4}s`,
}))

// BECOME: soft luminous motes drifting up through the word.
function Motes() {
  return (
    <motion.span
      className="absolute inset-0"
      style={{ transformStyle: 'preserve-3d' }}
      variants={{ enter: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1 } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}
    >
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="kt-mote"
          style={cssVars({ left: m.left, top: m.top, '--s': m.size, '--z': m.z, '--dur': m.dur, '--delay': m.delay })}
        />
      ))}
    </motion.span>
  )
}

// BECOME: a soft band of light that passes down the word as it materialises.
function ScanLine() {
  return (
    <motion.span
      className="absolute left-[-6%] right-[-6%] h-[0.6em] pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, var(--kt-glow-soft), transparent 70%)',
        z: 30,
      }}
      variants={{
        enter: { top: '-40%', opacity: 0 },
        show: { top: ['-40%', '90%'], opacity: [0, 0.9, 0], transition: { duration: 1.8, ease: 'easeInOut', delay: 0.5 } },
        exit: { opacity: 0 },
      }}
    />
  )
}

function Word({ phase, depth }: { phase: HeadlinePhase; depth: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const chars = [...HEADLINE_WORDS[phase], '.']
  return (
    <motion.div ref={ref} className="kt-word" initial="enter" animate="show" exit="exit">
      {phase === 1 && <NodeLinks wordRef={ref} />}
      {chars.map((c, i) => (
        <Letter key={i} char={c} index={i} word={phase} depth={depth} />
      ))}
      {phase === 2 && (
        <>
          <ScanLine />
          <Motes />
        </>
      )}
    </motion.div>
  )
}

function StaticWord({ word, depth }: { word: string; depth: number }) {
  return (
    <span className="kt-word !static">
      {[...word, '.'].map((c, i) => (
        <span key={i} className={`kt-letter${c === '.' ? ' kt-letter--accent' : ''}`}>
          {Array.from({ length: depth }, (_, d) => (
            <span
              key={d}
              className="kt-depth"
              style={cssVars({ '--z': `${-(d + 1) * (0.14 / depth)}em`, '--d': d / Math.max(depth - 1, 1) })}
            >
              {c}
            </span>
          ))}
          <span className="kt-face">{c}</span>
        </span>
      ))}
    </span>
  )
}

function useCompact() {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setCompact(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return compact
}

const BASE_TILT = { x: 9, y: -11 }

export const KineticHeadline = memo(function KineticHeadline({
  phase,
  reducedMotion,
}: {
  phase: HeadlinePhase
  reducedMotion: boolean
}) {
  const compact = useCompact()
  const depth = compact ? 7 : 12
  const rotateX = useSpring(useMotionValue(BASE_TILT.x), { stiffness: 50, damping: 18 })
  const rotateY = useSpring(useMotionValue(BASE_TILT.y), { stiffness: 50, damping: 18 })

  // Gentle pointer-driven tilt reveals the extrusion from different angles.
  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      rotateY.set(BASE_TILT.y + ((e.clientX / window.innerWidth) * 2 - 1) * 7)
      rotateX.set(BASE_TILT.x - ((e.clientY / window.innerHeight) * 2 - 1) * 5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion, rotateX, rotateY])

  if (reducedMotion) {
    return (
      <h1 className="kt-stage font-syne font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(1.75rem,10.5vw-0.5rem,6rem)] select-none">
        <span className="sr-only">Build. Learn. Become.</span>
        <span aria-hidden="true" className="kt-rig block space-y-1" style={{ transform: `rotateX(${BASE_TILT.x}deg) rotateY(${BASE_TILT.y}deg)` }}>
          {HEADLINE_WORDS.map((w) => (
            <span key={w} className="block">
              <StaticWord word={w} depth={depth} />
            </span>
          ))}
        </span>
      </h1>
    )
  }

  return (
    <h1 className="kt-stage relative font-syne font-extrabold uppercase leading-none tracking-tight text-[clamp(2rem,12vw-0.5rem,7.5rem)] h-[1.15em] select-none">
      <span className="sr-only">Build. Learn. Become.</span>
      <motion.span aria-hidden="true" className="kt-rig absolute inset-0 block" style={{ rotateX, rotateY }}>
        <AnimatePresence initial>
          <Word key={phase} phase={phase} depth={depth} />
        </AnimatePresence>
      </motion.span>
    </h1>
  )
})

// Compact progress rail under the headline showing where the loop is.
export const PhaseRail = memo(function PhaseRail({ phase, reducedMotion }: { phase: HeadlinePhase; reducedMotion: boolean }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase" aria-hidden="true">
      {HEADLINE_WORDS.map((w, i) => {
        const active = reducedMotion || i === phase
        return (
          <div key={w} className="flex flex-col gap-2 min-w-[4.5rem] sm:min-w-[6rem]">
            <span className={`transition-colors duration-500 ${active ? 'text-[var(--kt-accent)]' : 'text-[#567B81]'}`}>
              0{i + 1} {w}
            </span>
            <span className="relative h-px w-full bg-[#567B81]/30 overflow-hidden">
              {reducedMotion ? (
                <span className="absolute inset-0 bg-[var(--kt-accent)]" />
              ) : (
                i === phase && (
                  <motion.span
                    key={phase}
                    className="absolute inset-y-0 left-0 bg-[var(--kt-accent)]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: PHASE_HOLD_MS[phase] / 1000, ease: 'linear' }}
                  />
                )
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
})

// Advances BUILD → LEARN → BECOME, pausing while the tab is hidden.
export function useHeadlinePhase(enabled: boolean) {
  const [phase, setPhase] = useState<HeadlinePhase>(0)
  useEffect(() => {
    if (!enabled) return
    let timer: number | undefined
    const schedule = () => {
      window.clearTimeout(timer)
      if (document.hidden) return
      timer = window.setTimeout(() => setPhase((p) => ((p + 1) % 3) as HeadlinePhase), PHASE_HOLD_MS[phase])
    }
    schedule()
    document.addEventListener('visibilitychange', schedule)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [enabled, phase])
  return phase
}
