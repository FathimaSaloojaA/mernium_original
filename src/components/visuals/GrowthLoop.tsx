import { motion } from 'framer-motion'
import { GlowNode, Pulse, VizFrame, draw, rise, smoothPath, useReveal } from './primitives'

const LOOP_STEPS = ['LEARN', 'BUILD', 'REVIEW', 'EXPLAIN']

// An ascending spiral: each pass through the loop ends higher than it started.
// 2.5 turns, 8 samples per turn, ending at the top-centre summit.
const spiral: [number, number][] = Array.from({ length: 21 }, (_, i) => {
  const a = ((i - 20) / 4) * Math.PI - Math.PI / 2
  return [200 + Math.cos(a) * 112, 186 + Math.sin(a) * 34 - i * 6.5]
})
const SUMMIT = spiral[20]
const spiralPath = smoothPath(spiral)
// Final turn, clockwise from upper-right: one node per step, then READY at the summit.
const STEP_POINTS = [13, 15, 17, 19].map((i) => spiral[i])

// Traditional syllabus (a flat line to a certificate) vs the readiness loop.
export function GrowthLoop() {
  const { root } = useReveal()
  return (
    <VizFrame label="TWO MODELS // COMPLETION VS READINESS" caption="A syllabus ends when time runs out. A readiness loop ends when you can build it and explain it under pressure.">
      <motion.div {...root} className="grid gap-6 md:grid-cols-2">
        <div className="viz-card space-y-3 rounded-2xl p-5">
          <p className="viz-ink-dim font-mono text-[10px] uppercase tracking-[0.25em]">Traditional // linear syllabus</p>
          <svg viewBox="0 0 400 220" className="w-full" aria-hidden="true">
            <motion.path d="M 30 130 H 300" className="viz-stroke-dim" strokeWidth={2} variants={draw(0.2, 1.4)} />
            {Array.from({ length: 8 }, (_, i) => (
              <motion.g key={i} variants={rise(0.3 + i * 0.12)}>
                <line x1={30 + i * 36} x2={30 + i * 36} y1={122} y2={138} className="viz-stroke-dim" strokeWidth={2} />
                <text x={30 + i * 36} y={160} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 11 }}>
                  W{i + 1}
                </text>
              </motion.g>
            ))}
            <motion.g variants={rise(1.4)}>
              <rect x={310} y={106} width={48} height={48} rx={6} fill="none" className="viz-stroke-dim" strokeWidth={1.5} />
              <path d="M 320 122 H 348 M 320 132 H 342 M 320 142 H 334" className="viz-stroke-dim" strokeWidth={1.5} />
              <text x={334} y={186} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 11 }}>
                CERTIFICATE
              </text>
            </motion.g>
            <motion.text variants={rise(1.6)} x={180} y={70} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 12 }}>
              same pace · no feedback · no proof
            </motion.text>
          </svg>
        </div>

        <div className="viz-card space-y-3 rounded-2xl border-[#59ACB7]/40 p-5">
          <p className="viz-ink-accent font-mono text-[10px] uppercase tracking-[0.25em]">Mernium // readiness loop</p>
          <svg viewBox="0 0 400 220" className="w-full" aria-hidden="true">
            <motion.path d={spiralPath} fill="none" className="viz-stroke-soft" strokeWidth={6} strokeLinecap="round" variants={draw(0.2, 2)} />
            <motion.path d={spiralPath} fill="none" className="viz-stroke" strokeWidth={1.6} variants={draw(0.2, 2)} />
            <Pulse path={spiralPath} dur={5} begin={2.2} r={3.5} />
            {LOOP_STEPS.map((step, i) => {
              const [x, y] = STEP_POINTS[i]
              const onRight = x > 200
              return (
                <g key={step}>
                  <GlowNode x={x} y={y} r={5} delay={1.2 + i * 0.2} />
                  <motion.text
                    variants={rise(1.3 + i * 0.2)}
                    x={x + (onRight ? 14 : -14)}
                    y={y + 4}
                    textAnchor={onRight ? 'start' : 'end'}
                    className="viz-text"
                    style={{ fontSize: 12 }}
                  >
                    {step}
                  </motion.text>
                </g>
              )
            })}
            <GlowNode x={SUMMIT[0]} y={SUMMIT[1]} r={8} delay={2.1} />
            <motion.text variants={rise(2.2)} x={SUMMIT[0] + 18} y={SUMMIT[1] + 5} className="viz-text-accent" style={{ fontSize: 12 }}>
              READY
            </motion.text>
          </svg>
        </div>
      </motion.div>
    </VizFrame>
  )
}
