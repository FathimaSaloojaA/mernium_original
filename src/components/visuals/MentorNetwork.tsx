import { motion } from 'framer-motion'
import { GlowNode, Pulse, VizFrame, draw, fade, hexPoints, pop, useReveal } from './primitives'

const HUBS = [
  { x: 230, y: 175 },
  { x: 570, y: 175 },
]

// Small cohorts orbit each mentor; positions are fixed so the layout is stable.
const LEARNERS = HUBS.flatMap((hub, h) =>
  Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + h * 0.4
    const r = 105 + ((i * 37) % 30)
    return { x: hub.x + Math.cos(a) * r, y: hub.y + Math.sin(a) * r * 0.78, hub: h }
  }),
)

// Peer-review links cross between cohorts, not just to the mentor.
const PEERS: [number, number][] = [
  [0, 9],
  [1, 2],
  [3, 4],
  [5, 12],
  [8, 10],
  [11, 13],
  [6, 7],
]

export function MentorNetwork() {
  const { root } = useReveal()
  return (
    <VizFrame label="MENTORSHIP GRAPH // HOW FEEDBACK FLOWS" caption="Mentors run small cohorts, and learners review each other’s code — so feedback travels in every direction.">
      <motion.svg viewBox="0 20 800 290" className="w-full" role="img" aria-label="Two mentors at the centre of small learner cohorts, with peer-review links between learners" {...root}>
        {LEARNERS.map((l, i) => {
          const hub = HUBS[l.hub]
          const d = `M ${hub.x} ${hub.y} L ${l.x} ${l.y}`
          return (
            <g key={`s${i}`}>
              <motion.path d={d} className="viz-stroke-soft" strokeWidth={1.2} variants={draw(0.3 + (i % 7) * 0.08, 0.6)} />
              {i % 2 === 0 && <Pulse path={d} dur={2.2 + (i % 3) * 0.5} begin={1.4 + i * 0.2} r={2.6} />}
            </g>
          )
        })}
        {PEERS.map(([a, b], i) => {
          const p = LEARNERS[a]
          const q = LEARNERS[b]
          const d = `M ${p.x} ${p.y} Q ${(p.x + q.x) / 2} ${(p.y + q.y) / 2 - 40} ${q.x} ${q.y}`
          return <motion.path key={`p${i}`} d={d} fill="none" className="viz-stroke-dim" strokeWidth={1.2} strokeDasharray="3 6" variants={fade(1.2 + i * 0.1)} />
        })}
        {HUBS.map((h, i) => (
          <motion.g key={`h${i}`} variants={pop(0.1 + i * 0.15)}>
            <circle cx={h.x} cy={h.y} r={46} className="viz-fill-halo" />
            <polygon points={hexPoints(h.x, h.y, 30)} className="viz-fill-bg viz-stroke" strokeWidth={1.8} />
            <polygon points={hexPoints(h.x, h.y, 18)} className="viz-fill-node viz-glow" />
          </motion.g>
        ))}
        {LEARNERS.map((l, i) => (
          <GlowNode key={`l${i}`} x={l.x} y={l.y} r={5} halo={2.6} delay={0.6 + (i % 7) * 0.08} />
        ))}
      </motion.svg>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="viz-ink flex items-center gap-2">
          <span className="h-3 w-3 rotate-45 rounded-sm bg-[rgb(var(--viz-line))]" /> Mentor
        </span>
        <span className="viz-ink flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--viz-line))]" /> Learner
        </span>
        <span className="viz-ink-dim flex items-center gap-2">
          <span className="w-6 border-t border-dashed border-[rgb(var(--viz-dim))]" /> Peer review
        </span>
      </div>
    </VizFrame>
  )
}
