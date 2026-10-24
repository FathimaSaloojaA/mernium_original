import { motion } from 'framer-motion'
import { GlowNode, Pulse, VizFrame, draw, fade, hexPoints, pop, rise, useReveal } from './primitives'

const C = { x: 400, y: 310 }
const RING = 170
const LABEL_R = 205

// The MERNMADE badge at the centre, earned only when every criterion on the ring is verified.
export function ReadinessEmblem({ criteria }: { criteria: string[] }) {
  const { root, reduced } = useReveal()
  const points = criteria.map((_, i) => {
    const a = -Math.PI / 2 + (i / criteria.length) * Math.PI * 2
    return { a, x: C.x + Math.cos(a) * RING, y: C.y + Math.sin(a) * RING }
  })

  return (
    <VizFrame label="VERIFICATION MAP // SIX CHECKS, ONE BADGE" caption="The badge lights up only when all six verifications converge — no partial credit, no attendance stamps.">
      <motion.svg viewBox="0 0 800 620" className="mx-auto w-full max-w-3xl" role="img" aria-label={`MERNMADE badge criteria: ${criteria.join(', ')}`} {...root}>
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50%', originY: '50%' }}
        >
          <circle cx={C.x} cy={C.y} r={RING + 34} fill="none" className="viz-stroke-dim" strokeDasharray="1 9" strokeWidth={2} />
        </motion.g>
        <motion.circle cx={C.x} cy={C.y} r={RING} fill="none" className="viz-stroke-soft" strokeWidth={1.5} variants={draw(0.1, 1.4)} />

        {points.map((p, i) => {
          const spoke = `M ${p.x} ${p.y} L ${C.x + Math.cos(p.a) * 100} ${C.y + Math.sin(p.a) * 100}`
          return (
            <g key={i}>
              <motion.path d={spoke} className="viz-stroke" strokeWidth={1.2} strokeDasharray="4 6" variants={fade(0.6 + i * 0.12)} />
              <Pulse path={spoke} dur={2.6} begin={1.6 + i * 0.4} r={3} />
            </g>
          )
        })}

        {/* Badge */}
        <motion.g variants={pop(0.3)}>
          <circle cx={C.x} cy={C.y} r={130} className="viz-fill-halo" />
          <polygon points={hexPoints(C.x, C.y, 112)} className="viz-fill-bg viz-stroke" strokeWidth={2} />
          <polygon points={hexPoints(C.x, C.y, 96)} className="viz-fill-panel" />
          <polygon points={hexPoints(C.x, C.y, 96)} fill="none" className="viz-stroke-soft" strokeWidth={1} transform={`rotate(30 ${C.x} ${C.y})`} />
          <text x={C.x} y={C.y - 4} textAnchor="middle" className="viz-text-display" style={{ fontSize: 30 }}>
            MERN
          </text>
          <text x={C.x} y={C.y + 26} textAnchor="middle" className="viz-text-display" style={{ fontSize: 30, fill: 'rgb(var(--viz-line))' }}>
            MADE
          </text>
          <text x={C.x} y={C.y + 54} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 12 }}>
            VERIFIED
          </text>
        </motion.g>

        {points.map((p, i) => {
          const right = Math.cos(p.a) > 0.2
          const left = Math.cos(p.a) < -0.2
          const lx = C.x + Math.cos(p.a) * LABEL_R + (right ? 14 : left ? -14 : 0)
          const ly = C.y + Math.sin(p.a) * LABEL_R + (Math.sin(p.a) > 0.5 ? 30 : Math.sin(p.a) < -0.5 ? -26 : 4)
          const words = criteria[i].toUpperCase().split(' ')
          const lines = words.length > 2 ? [words.slice(0, -1).join(' '), words[words.length - 1]] : [words.join(' ')]
          return (
            <g key={i}>
              <GlowNode x={p.x} y={p.y} r={7} delay={0.9 + i * 0.15} />
              <motion.g variants={rise(1.1 + i * 0.15)} className="hidden md:block">
                {lines.map((line, k) => (
                  <text
                    key={k}
                    x={lx}
                    y={ly + k * 20 - (lines.length - 1) * 10}
                    textAnchor={right ? 'start' : left ? 'end' : 'middle'}
                    className="viz-text"
                    style={{ fontSize: 15 }}
                  >
                    {line}
                  </text>
                ))}
              </motion.g>
              <motion.text
                variants={rise(1.1 + i * 0.15)}
                x={lx}
                y={ly + 6}
                textAnchor={right ? 'start' : left ? 'end' : 'middle'}
                className="viz-text-accent md:hidden"
                style={{ fontSize: 26 }}
              >
                0{i + 1}
              </motion.text>
            </g>
          )
        })}
      </motion.svg>
    </VizFrame>
  )
}
