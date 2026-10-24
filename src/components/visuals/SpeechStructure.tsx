import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { VizFrame, draw, rise, useReveal } from './primitives'

const SEGMENTS = [
  { label: 'WHAT IT IS', note: 'One-sentence definition' },
  { label: 'WHY IT EXISTS', note: 'The problem and trade-offs' },
  { label: 'HOW YOU USED IT', note: 'Concrete proof from your build' },
]

// Deterministic "messy" waveform: irregular amplitude with hesitation gaps.
const messy = Array.from({ length: 64 }, (_, i) => {
  const gap = (i > 14 && i < 19) || (i > 38 && i < 43)
  const h = gap ? 3 : 10 + Math.abs(Math.sin(i * 1.7) * 38 + Math.sin(i * 0.43) * 22)
  return { x: 10 + i * 5.6, h }
})

// Clean waveform grouped into three deliberate phrases.
const clean = Array.from({ length: 54 }, (_, i) => {
  const seg = Math.floor(i / 18)
  const local = (i % 18) / 17
  const env = Math.sin(local * Math.PI)
  return { x: 10 + i * 6.6 + seg * 12, h: 6 + env * (34 + Math.abs(Math.sin(i * 0.9)) * 18), seg }
})

// Rambling answer → structured answer: the shape of what communication training changes.
export function SpeechStructure() {
  const { root } = useReveal()
  return (
    <VizFrame label="ANSWER SHAPE // BEFORE → AFTER" caption="Coaching turns hesitant, looping answers into short, structured explanations interviewers can follow.">
      <motion.div {...root} className="grid items-center gap-6 md:grid-cols-[1fr_auto_1.3fr]">
        <div className="space-y-3">
          <p className="viz-ink-dim font-mono text-[10px] uppercase tracking-[0.25em]">Before // unstructured</p>
          <svg viewBox="0 0 370 120" className="w-full" aria-hidden="true">
            {messy.map((b, i) => (
              <motion.rect
                key={i}
                x={b.x}
                width={3}
                rx={1.5}
                className="viz-fill-dim"
                variants={{
                  hidden: { y: 60, height: 0 },
                  visible: { y: 60 - b.h / 2, height: b.h, transition: { duration: 0.5, delay: i * 0.012 } },
                }}
              />
            ))}
            <motion.text variants={rise(0.9)} x={95} y={22} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 13 }}>
              “um…”
            </motion.text>
            <motion.text variants={rise(1.1)} x={230} y={112} textAnchor="middle" className="viz-text-dim" style={{ fontSize: 13 }}>
              “so basically…”
            </motion.text>
          </svg>
        </div>

        <motion.div variants={rise(1)} className="viz-chip mx-auto flex h-10 w-10 items-center justify-center rounded-full rotate-90 md:rotate-0">
          <ArrowRight className="viz-ink-accent h-4 w-4" />
        </motion.div>

        <div className="space-y-3">
          <p className="viz-ink-accent font-mono text-[10px] uppercase tracking-[0.25em]">After // structured</p>
          <svg viewBox="0 0 390 120" className="w-full" aria-hidden="true">
            {[0, 1, 2].map((s) => (
              <motion.path
                key={s}
                d={`M ${10 + s * 130} 112 H ${124 + s * 130}`}
                className="viz-stroke"
                strokeWidth={2}
                variants={draw(1.2 + s * 0.3, 0.6)}
              />
            ))}
            {clean.map((b, i) => (
              <motion.rect
                key={i}
                x={b.x}
                width={3.6}
                rx={1.8}
                className="viz-fill-node"
                variants={{
                  hidden: { y: 56, height: 0, opacity: 0 },
                  visible: { y: 56 - b.h / 2, height: b.h, opacity: 0.55 + b.seg * 0.2, transition: { duration: 0.5, delay: 1.2 + i * 0.015 } },
                }}
              />
            ))}
          </svg>
          <div className="grid grid-cols-3 gap-2">
            {SEGMENTS.map((s, i) => (
              <motion.div key={s.label} variants={rise(1.4 + i * 0.25)} className="space-y-1">
                <p className="viz-ink font-mono text-[10px] tracking-widest sm:text-[11px]">
                  0{i + 1} {s.label}
                </p>
                <p className="viz-ink-dim font-sans text-[11px] leading-snug sm:text-xs">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </VizFrame>
  )
}
