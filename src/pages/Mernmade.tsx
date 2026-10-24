import { motion } from 'framer-motion'
import { Award, CheckCircle2, XCircle, ArrowRight, Shield, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const Mernmade = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[55vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#567B81]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            className="inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-[#59ACB7]/20 to-[#567B81]/20 border border-[#59ACB7]/30 rounded-full text-[#71D5D9] font-mono text-xs uppercase tracking-widest"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-[#71D5D9]" />
            <span>MERNMADE ENGINE</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            NOT A DIPLOMA. <br />
            <span className="text-gradient-emerald-gold">A READINESS BADGE.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MERNMADE is an earned status representing zero interview anxiety and verified technical competence.
          </motion.p>
        </div>
      </section>

      {/* Grid Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: XCircle,
                title: 'NOT A COURSE',
                description: 'MERNMADE is not about sitting through video hours. It is about proving production readiness.',
                type: 'negative',
              },
              {
                icon: XCircle,
                title: 'NOT A DIPLOMA',
                description: 'No paper certificates or time-based attendance stamps. Paper does not pass technical interviews.',
                type: 'negative',
              },
              {
                icon: Award,
                title: 'VERIFIED READINESS',
                description: 'A prestigious engineering status awarded only when you pass evaluation by senior tech leads.',
                type: 'positive',
              },
            ].map((item, idx) => {
              const IconComp = item.icon
              const isPositive = item.type === 'positive'
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`glass-card rounded-3xl p-8 border ${
                    isPositive
                      ? 'border-[#59ACB7]/40 bg-gradient-to-br from-[#59ACB7]/10 via-transparent to-[#567B81]/5 glow-emerald shadow-xl'
                      : 'border-white/10 bg-white/5'
                  } space-y-4`}
                >
                  <div className={`p-3 rounded-2xl ${isPositive ? 'bg-[#59ACB7]/20 text-[#71D5D9]' : 'bg-red-500/10 text-red-400'} w-fit`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-syne font-bold text-white">{item.title}</h3>
                  <p className="text-gray-300 text-sm font-sans leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* MERNMADE Criteria */}
          <motion.div
            className="glass-card rounded-3xl p-8 sm:p-12 border border-[#59ACB7]/30 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 text-[#71D5D9]">
              <Shield className="w-6 h-6" />
              <h2 className="text-3xl font-syne font-bold text-white">THE MERNMADE BADGE CRITERIA</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'System Architecture', desc: 'Ability to explain database indexing, API rate limiting, & cache strategies under pressure.' },
                { title: 'Clean TypeScript Code', desc: 'Writing maintainable, production-level full-stack TypeScript code with zero shortcuts.' },
                { title: 'Speech & Clarity', desc: 'Explaining technical decisions to senior engineering managers with absolute poise.' },
                { title: 'Live Code Debugging', desc: 'Fixing complex state bugs or async errors live in front of evaluators within minutes.' },
                { title: 'Project Ownership', desc: 'Architecting a full production web application end-to-end with real database sharding.' },
                { title: 'Zero Interview Fear', desc: 'Entering tech rounds with complete confidence and zero test anxiety.' },
              ].map((crit, cIdx) => (
                <div key={cIdx} className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-[#71D5D9] font-mono text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>VERIFICATION {cIdx + 1}</span>
                  </div>
                  <h4 className="text-lg font-syne font-bold text-white">{crit.title}</h4>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">{crit.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center pt-8">
            <Link to="/apply" data-cursor="button">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#59ACB7] via-[#71D5D9] to-teal-500 text-black font-syne font-bold text-base shadow-xl glow-emerald inline-flex items-center gap-2 hover:scale-105 transition-all">
                <span>EARN THE MERNMADE BADGE</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mernmade
