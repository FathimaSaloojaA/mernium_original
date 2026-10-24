import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code2, Compass, CheckCircle2, Zap, Trophy, ArrowRight, Layers } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'LEARN',
    subtitle: 'INTERACTION & FUNDAMENTALS',
    icon: Code2,
    desc: 'Understand what concepts mean, why they exist, and how senior engineers explain them in technical interviews.',
  },
  {
    num: '02',
    title: 'BUILD',
    subtitle: 'REAL PRODUCTION APPLICATIONS',
    icon: Compass,
    desc: 'Write actual full-stack code daily. Build REST APIs, state architectures, and database aggregations from scratch.',
  },
  {
    num: '03',
    title: 'PRACTICE',
    subtitle: 'DAILY CODE REVIEWS & DRILLS',
    icon: Zap,
    desc: 'Fix bugs under pressure, optimize database indexes, write clean TypeScript types, and refactor legacy code.',
  },
  {
    num: '04',
    title: 'EVALUATE',
    subtitle: 'MOCK INTERVIEW DRILLS',
    icon: CheckCircle2,
    desc: 'Face mock technical interviews with brutal, constructive feedback. Test your speech, clarity, and confidence.',
  },
  {
    num: '05',
    title: 'MASTER',
    subtitle: 'FEARLESS ENGINEER STATUS',
    icon: Trophy,
    desc: 'Graduate as a fearless Mernian who enters interviews with zero anxiety, ready to land high-paying roles.',
  },
]

const HowItWorks = () => {
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
            <Layers className="w-4 h-4 text-[#71D5D9]" />
            <span>THE 5-STEP SYSTEM</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            HOW IT <span className="text-gradient-emerald-gold">WORKS</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A structured pipeline designed to convert beginner curiosity into an unstoppable, interview-ready builder.
          </motion.p>
        </div>
      </section>

      {/* Steps List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {steps.map((step, idx) => {
            const IconComp = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 glass-card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group"
              >
                <div className="flex items-center space-x-6">
                  <span className="text-4xl sm:text-6xl font-syne font-extrabold text-[#71D5D9]/80 group-hover:text-[#BDEAEB] transition-colors">
                    {step.num}
                  </span>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#71D5D9] group-hover:scale-110 transition-transform">
                    <IconComp className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-2 max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl font-syne font-extrabold text-white">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs text-[#567B81] uppercase tracking-wider">
                    {step.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}

          <div className="text-center pt-8">
            <Link to="/apply" data-cursor="button">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#59ACB7] to-teal-500 text-black font-syne font-bold text-base shadow-xl glow-emerald inline-flex items-center gap-2 hover:scale-105 transition-all">
                <span>START AT STAGE 01</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
