import { motion } from 'framer-motion'
import { Pulse, VizFrame, draw, hexPoints, pop, rise, smoothPath, useReveal } from './primitives'

interface Stage {
  num: string
  title: string
  subtitle: string
}

// The five-stage pipeline drawn as an ascending path: each stage sits
// higher (and brighter) than the last, ending at the luminous MASTER node.
export function JourneyMap({ stages }: { stages: Stage[] }) {
  const { root, reduced } = useReveal()
  const last = stages.length - 1

  const wide = stages.map((_, i) => [90 + i * 205, 250 - i * 42] as [number, number])
  const tall = stages.map((_, i) => [i % 2 ? 78 : 52, 50 + i * 112] as [number, number])
  const widePath = smoothPath(wide)
  const tallPath = smoothPath(tall)

  const stageNode = ([x, y]: [number, number], i: number, r: number, size: number) => (
    <motion.g key={i} variants={pop(0.5 + i * 0.22)}>
      {i === last && (
        <motion.circle
          cx={x}
          cy={y}
          r={r * 1.9}
          className="viz-fill-halo"
          animate={reduced ? undefined : { scale: [1, 1.25, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <polygon points={hexPoints(x, y, r)} className="viz-fill-bg viz-stroke" strokeWidth={1.5} />
      <polygon points={hexPoints(x, y, r * 0.72)} className={i === last ? 'viz-fill-node viz-glow' : 'viz-fill-panel'} />
      <text
        x={x}
        y={y + size * 0.36}
        textAnchor="middle"
        className="viz-text-display"
        style={{ fontSize: size, fill: i === last ? 'rgb(var(--viz-bg))' : undefined }}
      >
        {stages[i].num}
      </text>
    </motion.g>
  )

  return (
    <VizFrame label="THE PIPELINE // STAGE MAP" caption="Each stage builds on the last — confidence compounds as you climb from fundamentals to mastery.">
      {/* Desktop: ascending horizontal path */}
      <motion.svg viewBox="0 0 1000 330" className="hidden w-full md:block" role="img" aria-label={`Stages: ${stages.map((s) => s.title).join(', ')}`} {...root}>
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1={40} x2={960} y1={60 + g * 70} y2={60 + g * 70} className="viz-stroke-dim" strokeDasharray="2 10" />
        ))}
        <motion.path d={widePath} fill="none" className="viz-stroke-soft" strokeWidth={10} strokeLinecap="round" variants={draw(0.1, 1.6)} />
        <motion.path d={widePath} fill="none" className="viz-stroke" strokeWidth={2} variants={draw(0.1, 1.6)} />
        <Pulse path={widePath} dur={4.5} begin={1.8} r={4} />
        {wide.map((p, i) => stageNode(p, i, 30, 18))}
        {wide.map(([x, y], i) => (
          <motion.g key={i} variants={rise(0.7 + i * 0.22)}>
            <text x={x} y={y + 62} textAnchor="middle" className="viz-text-display" style={{ fontSize: 22 }}>
              {stages[i].title}
            </text>
          </motion.g>
        ))}
      </motion.svg>

      {/* Mobile: vertical path with labels alongside */}
      <motion.svg viewBox="0 0 340 600" className="w-full md:hidden" role="img" aria-label={`Stages: ${stages.map((s) => s.title).join(', ')}`} {...root}>
        <motion.path d={tallPath} fill="none" className="viz-stroke-soft" strokeWidth={8} strokeLinecap="round" variants={draw(0.1, 1.6)} />
        <motion.path d={tallPath} fill="none" className="viz-stroke" strokeWidth={2} variants={draw(0.1, 1.6)} />
        <Pulse path={tallPath} dur={4.5} begin={1.8} />
        {tall.map((p, i) => stageNode(p, i, 26, 16))}
        {tall.map(([, y], i) => (
          <motion.g key={i} variants={rise(0.7 + i * 0.2)}>
            <text x={128} y={y - 2} className="viz-text-display" style={{ fontSize: 24 }}>
              {stages[i].title}
            </text>
            <text x={128} y={y + 20} className="viz-text-dim" style={{ fontSize: 10.5 }}>
              {stages[i].subtitle}
            </text>
          </motion.g>
        ))}
      </motion.svg>
    </VizFrame>
  )
}
