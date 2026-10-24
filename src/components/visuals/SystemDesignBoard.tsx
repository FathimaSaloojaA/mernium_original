import { motion } from 'framer-motion'
import { Pulse, VizFrame, draw, fade, rise, useReveal } from './primitives'

interface Box {
  id: string
  x: number
  y: number
  w: number
  label: string
  note?: string
}

const BOXES: Box[] = [
  { id: 'client', x: 20, y: 190, w: 110, label: 'CLIENT' },
  { id: 'limit', x: 175, y: 190, w: 120, label: 'LIMITER', note: '100 req/min' },
  { id: 'lb', x: 340, y: 190, w: 80, label: 'LB' },
  { id: 'api1', x: 465, y: 100, w: 100, label: 'API' },
  { id: 'api2', x: 465, y: 280, w: 100, label: 'API' },
  { id: 'cache', x: 610, y: 100, w: 120, label: 'REDIS', note: 'TTL 60s' },
  { id: 'db', x: 610, y: 280, w: 120, label: 'MONGO', note: 'indexed' },
]
const H = 56
const box = (id: string) => BOXES.find((b) => b.id === id)!
const right = (b: Box): [number, number] => [b.x + b.w, b.y + H / 2]
const left = (b: Box): [number, number] => [b.x, b.y + H / 2]
const link = (a: string, b: string) => {
  const [x1, y1] = right(box(a))
  const [x2, y2] = left(box(b))
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`
}

const LINKS = [link('client', 'limit'), link('limit', 'lb'), link('lb', 'api1'), link('lb', 'api2'), link('api1', 'cache'), link('api2', 'db'), link('api1', 'db')]

const RUBRIC = ['Code quality', 'Clarity of speech', 'Trade-off reasoning', 'Composure under follow-ups']

// A whiteboard system-design drill (rate-limited API with cache) next to
// the evaluation rubric panels score it against.
export function SystemDesignBoard() {
  const { root } = useReveal()
  return (
    <VizFrame label="WHITEBOARD DRILL // DESIGN A RATE-LIMITED API" caption="You sketch it, defend it, and get scored on how you think — not just on the final diagram.">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="-mx-1 overflow-x-auto px-1">
        <motion.svg viewBox="0 0 750 400" className="w-full min-w-[540px]" role="img" aria-label="System design sketch: client, rate limiter, load balancer, two API servers, Redis cache and MongoDB" {...root}>
          <defs>
            <pattern id="sdb-grid" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="viz-fill-dim" />
            </pattern>
            <marker id="sdb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" className="viz-fill-node" />
            </marker>
          </defs>
          <rect width="750" height="400" fill="url(#sdb-grid)" opacity={0.6} />
          {LINKS.map((d, i) => (
            <g key={i}>
              <motion.path d={d} fill="none" className="viz-stroke" strokeWidth={1.6} markerEnd="url(#sdb-arrow)" variants={draw(0.3 + i * 0.12, 0.7)} />
              <Pulse path={d} dur={1.8 + (i % 3) * 0.4} begin={1.5 + i * 0.25} r={3} />
            </g>
          ))}
          {BOXES.map((b, i) => (
            <motion.g key={b.id} variants={rise(0.1 + i * 0.1)}>
              <rect x={b.x} y={b.y} width={b.w} height={H} rx={10} className="viz-fill-panel" strokeWidth={1.5} />
              <text x={b.x + b.w / 2} y={b.y + H / 2 + 7} textAnchor="middle" className="viz-text" style={{ fontSize: 19 }}>
                {b.label}
              </text>
              {b.note && (
                <text x={b.x + b.w / 2} y={b.y + H + 24} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 15 }}>
                  {b.note}
                </text>
              )}
            </motion.g>
          ))}
          <motion.path
            d="M 455 80 C 445 60 600 50 745 70"
            fill="none"
            className="viz-stroke-soft"
            strokeWidth={1.5}
            strokeDasharray="3 6"
            variants={fade(1.8)}
          />
          <motion.text variants={rise(2.1)} x={600} y={42} textAnchor="middle" className="viz-text-accent" style={{ fontSize: 15 }}>
            WHY CACHE HERE?
          </motion.text>
        </motion.svg>
        </div>

        <motion.div {...root} className="viz-card space-y-5 rounded-2xl p-5">
          <p className="viz-ink-accent font-mono text-[10px] uppercase tracking-[0.25em]">Panel rubric</p>
          {RUBRIC.map((r, i) => (
            <motion.div key={r} variants={rise(0.4 + i * 0.15)} className="space-y-2">
              <p className="viz-ink font-sans text-sm">{r}</p>
              <div className="viz-rail h-1.5 overflow-hidden rounded-full">
                <motion.div
                  className="viz-bar h-full rounded-full"
                  variants={{ hidden: { width: '0%' }, visible: { width: `${62 + ((i * 17) % 30)}%`, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 + i * 0.15 } } }}
                />
              </div>
            </motion.div>
          ))}
          <p className="viz-ink-dim font-mono text-[10px] leading-relaxed">Illustrative scorecard — every evaluation is written up with specific feedback.</p>
        </motion.div>
      </div>
    </VizFrame>
  )
}
