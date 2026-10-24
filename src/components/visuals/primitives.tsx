import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

// ─────────────────────────────────────────────────────────────
// Shared building blocks for the site's illustration system:
// thin teal strokes, glass panels, luminous nodes. Colours come
// from the --viz-* tokens in index.css so every diagram follows
// the active theme.
// ─────────────────────────────────────────────────────────────

/** Props for an SVG/HTML root that reveals its children once it scrolls into view. */
export function useReveal() {
  const reduced = !!useReducedMotion()
  return {
    reduced,
    root: {
      initial: reduced ? 'visible' : 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-60px' },
    } as const,
  }
}

export const draw = (delay = 0, duration = 1.2): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease: 'easeInOut', delay }, opacity: { duration: 0.2, delay } } },
})

/** For dashed strokes: pathLength animation would overwrite the dash pattern. */
export const fade = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, delay } },
})

export const pop = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 18, delay } },
})

export const rise = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
})

/** Glass frame used around every diagram, with an accessible caption. */
export function VizFrame({
  label,
  caption,
  children,
  className = '',
}: {
  label: string
  caption?: string
  children: ReactNode
  className?: string
}) {
  return (
    <figure className={`glass-card relative overflow-hidden rounded-3xl border border-[#59ACB7]/20 p-5 sm:p-8 ${className}`}>
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#59ACB7]/10 blur-[90px]" />
      <div className="relative mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#71D5D9] sm:mb-6 sm:text-xs">
        <span>{label}</span>
        <span className="text-[#567B81]">FIG.</span>
      </div>
      <div className="relative">{children}</div>
      {caption && <figcaption className="relative mt-4 font-sans text-xs text-gray-400 sm:mt-6 sm:text-sm">{caption}</figcaption>}
    </figure>
  )
}

/** A luminous node: soft halo + solid core. */
export function GlowNode({ x, y, r = 6, delay = 0, halo = 3 }: { x: number; y: number; r?: number; delay?: number; halo?: number }) {
  return (
    <motion.g variants={pop(delay)}>
      <circle cx={x} cy={y} r={r * halo} className="viz-fill-halo" />
      <circle cx={x} cy={y} r={r} className="viz-fill-node viz-glow" />
    </motion.g>
  )
}

/** A small bright dot that travels along a path forever (skipped for reduced motion). */
export function Pulse({ path, dur = 3, begin = 0, r = 3.5 }: { path: string; dur?: number; begin?: number; r?: number }) {
  const reduced = !!useReducedMotion()
  if (reduced) return null
  return (
    <circle r={r} className="viz-fill-node viz-glow">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  )
}

/** Smooth curve through points (Catmull-Rom converted to cubic Béziers). */
export function smoothPath(points: [number, number][], tension = 1) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M ${p[0]} ${p[1]}`
    const p0 = points[i - 2] ?? points[i - 1]
    const p1 = points[i - 1]
    const p3 = points[i + 1] ?? p
    const c1 = [p1[0] + ((p[0] - p0[0]) / 6) * tension, p1[1] + ((p[1] - p0[1]) / 6) * tension]
    const c2 = [p[0] - ((p3[0] - p1[0]) / 6) * tension, p[1] - ((p3[1] - p1[1]) / 6) * tension]
    return `${d} C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p[0]} ${p[1]}`
  }, '')
}

/** Regular hexagon points string, flat-topped. */
export function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}
