import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Sparkles } from 'lucide-react'

export const FinalCTASection = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#59ACB7]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#567B81]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 font-mono text-xs text-[#71D5D9] bg-[#59ACB7]/10 px-5 py-2 rounded-full border border-[#59ACB7]/30"
        >
          <Sparkles className="w-4 h-4 text-[#71D5D9]" />
          <span>08 // ADMISSION &amp; TRANSFORMATION PORTAL</span>
        </motion.div>

        {/* Huge Title */}
        <motion.h2
          className="text-6xl sm:text-8xl md:text-9xl font-syne font-extrabold tracking-tighter leading-none text-white uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          READY <br />
          <span className="text-gradient-cyber">TO BUILD?</span>
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg sm:text-xl font-sans max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stop watching endless tutorials. Enter the institution that converts curious learners into fearless, interview-ready software engineers.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/apply" data-cursor="button">
            <motion.button
              className="px-10 py-5 rounded-full bg-gradient-to-r from-[#59ACB7] via-[#71D5D9] to-teal-500 text-black font-syne font-bold text-lg tracking-wide flex items-center justify-center space-x-3 shadow-2xl glow-emerald-strong hover:scale-105 transition-all group"
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>START YOUR APPLICATION</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link to="/contact" data-cursor="explore">
            <button className="px-8 py-5 rounded-full glass-card border border-white/20 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/10 transition-all">
              COMMAND CENTER CONTACT
            </button>
          </Link>
        </motion.div>

        <div className="pt-8 flex justify-center items-center space-x-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <span>NO CERTIFICATE GIMMICKS</span>
          <span>•</span>
          <span>FEARLESS ENGINE</span>
          <span>•</span>
          <span>2026 ADMISSIONS OPEN</span>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
