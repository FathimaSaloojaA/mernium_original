import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Terminal, Compass } from 'lucide-react'
import { HeroWorld } from '../three/HeroWorld'
import { useMagnetic } from '../hooks/useMagnetic'
import { useScrollVelocity } from '../hooks/useScrollVelocity'

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const magneticCtaRef = useMagnetic(0.4)
  const magneticSecondaryRef = useMagnetic(0.3)
  const scrollVelocity = useScrollVelocity()

  // Dynamic text stretch on scroll velocity
  const textSkew = Math.min(Math.max(scrollVelocity * 15, -12), 12)

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] pt-32 pb-24 flex items-center overflow-hidden noise-bg border-b border-paper/10"
    >
      {/* Abstract Background Ambient Lights & Noise */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-acid/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-cobalt/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Embedded 3D WebGL Canvas (Bleeds across full viewport width) */}
      <div className="absolute inset-0 z-0 opacity-85 pointer-events-auto">
        <HeroWorld />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        {/* Asymmetric Overlapping Typography & Content Column */}
        <div className="lg:col-span-12 space-y-8 pointer-events-auto">
          {/* Eyebrow Fragment Pill */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-3 px-4 py-2 bg-ink/90 border-l-2 border-acid backdrop-blur-xl shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
            <span className="font-mono text-xs text-acid tracking-widest uppercase">
              [ 01 // INTERACTIVE DIGITAL ART INSTITUTION ]
            </span>
          </motion.div>

          {/* Huge Oversized Kinetic Kinetic Typography (Asymmetrical Bleed) */}
          <div className="space-y-1 py-4">
            <motion.h1
              className="text-7xl sm:text-9xl lg:text-[11rem] font-syne font-black tracking-tighter leading-[0.8] text-paper uppercase select-none"
              style={{ transform: `skewX(${textSkew}deg)` }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              BUILD.
            </motion.h1>

            <motion.h1
              className="text-7xl sm:text-9xl lg:text-[11rem] font-syne font-black tracking-tighter leading-[0.8] text-acid uppercase select-none pl-6 sm:pl-16"
              style={{ transform: `skewX(${-textSkew}deg)` }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              LEARN.
            </motion.h1>

            <motion.h1
              className="text-7xl sm:text-9xl lg:text-[11rem] font-syne font-black tracking-tighter leading-[0.8] text-outline-acid uppercase select-none pl-12 sm:pl-32"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              BECOME.
            </motion.h1>
          </div>

          {/* Asymmetric Floating Paragraph */}
          <motion.div
            className="max-w-xl glass-panel-raw p-6 sm:p-8 space-y-3 font-sans text-paper/90 ml-auto lg:ml-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 font-mono text-xs text-acid">
              <Terminal className="w-4 h-4" />
              <span>READINESS DOCTRINE 2026</span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-paper">
              An interview-first, confidence-driven MERN institution creating fearless software engineers. We replace syllabus completion certificates with verified production readiness.
            </p>
          </motion.div>

          {/* Magnetic Interaction Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-6 pt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/apply" data-cursor="button">
              <button
                ref={magneticCtaRef}
                className="px-10 py-5 bg-acid text-ink font-syne font-extrabold text-base tracking-wider uppercase flex items-center space-x-3 shadow-acid-glow hover:bg-acid-hover transition-colors group"
              >
                <span>ENTER EXPERIENCE</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>

            <Link to="/mernmade" data-cursor="explore">
              <button
                ref={magneticSecondaryRef}
                className="px-8 py-5 border border-paper/30 text-paper font-mono text-xs uppercase tracking-widest bg-ink/60 backdrop-blur-md hover:border-acid hover:text-acid transition-colors flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-acid" />
                <span>UNDERSTAND MERNMADE</span>
              </button>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection
