import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight, Terminal } from 'lucide-react'
import { SystemDesignBoard } from '../components/visuals/SystemDesignBoard'

const InterviewTraining = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#59ACB7]/10 border border-[#59ACB7]/30 rounded-full text-[#71D5D9] font-mono text-xs uppercase tracking-widest"
          >
            <Award className="w-4 h-4 text-[#71D5D9]" />
            <span>ACCELERATOR TRACK</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            INTERVIEW <span className="text-gradient-emerald-gold">DRILL &amp; ACCELERATION</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Conquer live coding under pressure, system design questions, and senior engineer interviews with zero anxiety.
          </motion.p>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Live Whiteboard Drills',
                desc: 'Solve JavaScript algorithms, async promises, & recursion live while explaining your thought process clearly.',
              },
              {
                title: 'System Design Drills',
                desc: 'Architect rate limiters, web chat systems, and caching layers with real trade-off analysis.',
              },
              {
                title: 'Mock Panel Evaluation',
                desc: 'Face mock interviews conducted by senior tech leads who evaluate code quality, speech, & composure.',
              },
            ].map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 border border-[#59ACB7]/30 glass-card-hover space-y-4"
              >
                <div className="p-3 rounded-2xl bg-[#59ACB7]/10 text-[#71D5D9] w-fit">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-syne font-bold text-white">{module.title}</h3>
                <p className="text-gray-300 text-sm font-sans leading-relaxed">{module.desc}</p>
              </motion.div>
            ))}
          </div>

          <SystemDesignBoard />

          <div className="text-center pt-8">
            <Link to="/apply" data-cursor="button">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#59ACB7] to-teal-500 text-black font-syne font-bold text-base shadow-xl glow-emerald inline-flex items-center gap-2 hover:scale-105 transition-all">
                <span>ENROLL IN INTERVIEW ACCELERATOR</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InterviewTraining
