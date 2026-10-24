import { motion } from 'framer-motion'
import { GlowNode, Pulse, draw, rise, useReveal } from './primitives'

type Kind = 'editor' | 'dashboard' | 'services'

// Abstract preview of a project's shape (not a screenshot), picked from its name.
export function projectKind(name: string): Kind {
  if (/ide|editor/i.test(name)) return 'editor'
  if (/dashboard|monitor/i.test(name)) return 'dashboard'
  return 'services'
}

function Editor() {
  const lines = [0.7, 0.45, 0.85, 0.3, 0.6, 0.5, 0.75]
  return (
    <>
      <rect x={14} y={30} width={140} height={128} rx={6} className="viz-fill-panel" />
      <rect x={166} y={30} width={140} height={128} rx={6} className="viz-fill-panel" />
      {lines.map((w, i) => (
        <motion.rect key={`a${i}`} x={26 + (i % 3 === 1 ? 10 : 0)} y={44 + i * 15} height={5} rx={2.5} className={i === 2 ? 'viz-fill-node' : 'viz-fill-mid'} variants={{ hidden: { width: 0 }, visible: { width: 110 * w, transition: { delay: 0.2 + i * 0.08 } } }} />
      ))}
      {lines.map((w, i) => (
        <motion.rect key={`b${i}`} x={178 + (i % 2 ? 10 : 0)} y={44 + i * 15} height={5} rx={2.5} className="viz-fill-dim" variants={{ hidden: { width: 0 }, visible: { width: 100 * (1 - w * 0.5), transition: { delay: 0.4 + i * 0.08 } } }} />
      ))}
      {/* Two live collaborator cursors */}
      <motion.rect x={136} y={70} width={2} height={12} className="viz-fill-node viz-caret" variants={rise(1)} />
      <motion.rect x={250} y={115} width={2} height={12} className="viz-fill-node viz-caret" variants={rise(1.2)} />
    </>
  )
}

function Dashboard() {
  const pts = [120, 96, 104, 70, 86, 58, 64, 44, 52]
  const d = pts.map((y, i) => `${i ? 'L' : 'M'} ${24 + i * 34} ${y}`).join(' ')
  return (
    <>
      <rect x={14} y={30} width={292} height={128} rx={6} className="viz-fill-panel" />
      <motion.path d={`${d} L ${24 + 8 * 34} 140 L 24 140 Z`} className="viz-fill-halo" variants={rise(0.6)} />
      <motion.path d={d} fill="none" className="viz-stroke" strokeWidth={2} variants={draw(0.2, 1.2)} />
      <Pulse path={d} dur={3} begin={1.4} r={3} />
      {[0, 1, 2].map((i) => (
        <GlowNode key={i} x={270 - i * 12} y={44} r={2.5} halo={2} delay={0.8 + i * 0.1} />
      ))}
    </>
  )
}

function Services() {
  const gw = { x: 60, y: 94 }
  const svc = [
    { x: 170, y: 50 },
    { x: 190, y: 98 },
    { x: 170, y: 144 },
    { x: 270, y: 74 },
    { x: 270, y: 124 },
  ]
  const links = [...svc.slice(0, 3).map((s) => [gw, s]), [svc[0], svc[3]], [svc[1], svc[3]], [svc[1], svc[4]], [svc[2], svc[4]]]
  return (
    <>
      {links.map(([a, b], i) => {
        const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`
        return (
          <g key={i}>
            <motion.path d={d} className="viz-stroke-soft" strokeWidth={1.5} variants={draw(0.2 + i * 0.08, 0.5)} />
            {i < 3 && <Pulse path={d} dur={1.8} begin={1 + i * 0.3} r={2.5} />}
          </g>
        )
      })}
      <motion.rect variants={rise(0.1)} x={gw.x - 26} y={gw.y - 16} width={52} height={32} rx={8} className="viz-fill-panel" strokeWidth={1.5} />
      {svc.map((s, i) => (
        <GlowNode key={i} x={s.x} y={s.y} r={6} halo={2.4} delay={0.4 + i * 0.1} />
      ))}
    </>
  )
}

export function ProjectPreview({ name }: { name: string }) {
  const { root } = useReveal()
  const kind = projectKind(name)
  return (
    <div className="viz-card overflow-hidden rounded-2xl">
      <motion.svg viewBox="0 0 320 170" className="block w-full" role="img" aria-label={`Illustrative preview of ${name}`} {...root}>
        <circle cx={22} cy={16} r={3} className="viz-fill-dim" />
        <circle cx={32} cy={16} r={3} className="viz-fill-dim" />
        <circle cx={42} cy={16} r={3} className="viz-fill-dim" />
        {kind === 'editor' && <Editor />}
        {kind === 'dashboard' && <Dashboard />}
        {kind === 'services' && <Services />}
      </motion.svg>
    </div>
  )
}
