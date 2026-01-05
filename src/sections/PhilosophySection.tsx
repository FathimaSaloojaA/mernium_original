import { motion } from 'framer-motion'
import { Target, AlertOctagon, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react'

export const PhilosophySection = () => {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Storytelling Kinetic Typography */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // THE INSTITUTION PHILOSOPHY</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-6xl md:text-7xl font-syne font-extrabold tracking-tight text-white leading-tight uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            WE DON'T TEACH PEOPLE TO <span className="text-stroke-emerald">WATCH CODE.</span>
            <br />
            WE TEACH THEM TO <span className="text-gradient-emerald-gold">BUILD &amp; CONQUER.</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg sm:text-xl font-sans max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Most traditional tech institutions deliver syllabus completion certificates to students who panic when asked to explain an event loop in a real technical interview. MERNIUM breaks this model completely.
          </motion.p>
        </div>

        {/* Comparison Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Institutes */}
          <motion.div
            className="glass-card rounded-3xl p-8 md:p-10 border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 text-red-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-syne font-bold text-2xl text-white">TRADITIONAL COACHING</h3>
            </div>

            <ul className="space-y-4">
              {[
                'Certificate-focused completion without real technical depth',
                'Passive video watching with zero live accountability',
                'Memorization of syntax instead of system architecture logic',
                'No mock interview pressure or real-time speech evaluation',
                'Graduating with fear when facing senior engineering managers',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-gray-400 text-sm">
                  <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* MERNIUM System */}
          <motion.div
            className="glass-card rounded-3xl p-8 md:p-10 border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/5 space-y-6 shadow-xl glow-emerald"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 text-emerald-400">
              <Target className="w-6 h-6" />
              <h3 className="font-syne font-bold text-2xl text-white">MERNIUM SYSTEM</h3>
            </div>

            <ul className="space-y-4">
              {[
                'Interview readiness logic mapped into every single line of code',
                'Daily production building with live code reviews and feedback',
                'System architecture mindset: databases, API limits, performance',
                'Rigorous mock interview drills until fear is entirely eliminated',
                'Graduating as a confident builder ready to pass technical rounds',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-emerald-300 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PhilosophySection
