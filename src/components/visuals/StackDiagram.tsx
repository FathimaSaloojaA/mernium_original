import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Database, Globe, Server, Container } from 'lucide-react'
import { VizFrame, rise, useReveal } from './primitives'

const TIERS = [
  { key: 'CLIENT', role: 'UI & state', icon: Globe, items: ['React 19', 'Router v7', 'Zustand / RTK', 'Tailwind'] },
  { key: 'API', role: 'Services & auth', icon: Server, items: ['Node.js', 'Express', 'REST · versioned', 'JWT · OAuth2'] },
  { key: 'DATA', role: 'Persistence & cache', icon: Database, items: ['MongoDB', 'Aggregations', 'Indexes', 'Redis cache'] },
]

// Request/response connector between tiers: horizontal on desktop, vertical on mobile.
function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center py-2 md:w-16 md:py-0" aria-hidden="true">
      <div className="flex gap-2 md:flex-col">
        <span className="viz-rail viz-flow-v block h-10 w-px md:hidden" />
        <span className="viz-rail viz-flow-v block h-10 w-px md:hidden [animation-direction:reverse]" />
        <span className="viz-rail viz-flow hidden h-px w-14 md:block" />
        <span className="viz-rail viz-flow hidden h-px w-14 md:block [animation-direction:reverse] [animation-delay:-1.2s]" />
      </div>
    </div>
  )
}

// The full-stack architecture the curriculum walks through, tier by tier.
export function StackDiagram() {
  const { root } = useReveal()
  return (
    <VizFrame label="SYSTEM MAP // WHAT YOU WILL BUILD" caption="Every module maps to a layer of a real production system — and to the interview questions asked about it.">
      <motion.div {...root} className="space-y-4">
        <div className="flex flex-col items-stretch md:flex-row">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon
            return (
              <Fragment key={tier.key}>
                {i > 0 && <Connector />}
                <motion.div variants={rise(0.15 + i * 0.18)} className="viz-card flex-1 rounded-2xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="viz-chip flex h-9 w-9 items-center justify-center rounded-xl">
                        <Icon className="viz-ink-accent h-4 w-4" />
                      </span>
                      <div>
                        <p className="viz-ink font-syne text-lg font-extrabold leading-none">{tier.key}</p>
                        <p className="viz-ink-dim mt-1 font-mono text-[10px] uppercase tracking-widest">{tier.role}</p>
                      </div>
                    </div>
                    <span className="viz-ink-dim font-mono text-[10px]">0{i + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tier.items.map((item) => (
                      <span key={item} className="viz-chip rounded-full px-3 py-1 font-mono text-[11px]">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Fragment>
            )
          })}
        </div>
        <motion.div
          variants={rise(0.75)}
          className="viz-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border-dashed px-5 py-3"
        >
          <span className="viz-ink-accent flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
            <Container className="h-4 w-4" /> Ship it
          </span>
          <span className="viz-ink-mid font-mono text-[11px] tracking-wider">Docker · AWS · Lighthouse-tuned production deploys</span>
        </motion.div>
      </motion.div>
    </VizFrame>
  )
}
