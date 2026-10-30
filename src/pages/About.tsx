import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Lightbulb, Shield, TrendingUp, AlertTriangle, ArrowRight, Cpu } from 'lucide-react'
import { GrowthLoop } from '../components/visuals/GrowthLoop'

const About = () => {
  return (
    <div className="relative pt-28 pb-20">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,90vw)] h-[min(500px,90vw)] bg-[#59ACB7]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="w-full min-w-0 max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 font-mono text-xs text-[#71D5D9] bg-[#59ACB7]/10 px-4 py-1.5 rounded-full border border-[#59ACB7]/30"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // INSTITUTION DOCTRINE</span>
          </motion.div>

          <motion.h1
            className="text-page-title font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            WE REMOVE <span className="text-gradient-emerald-gold">FEAR.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We don't measure success by syllabus completion. We measure it by your confidence in high-stakes technical interviews.
          </motion.p>
        </div>
      </section>

      {/* Traditional vs Mernium Doctrine */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            className="glass-card rounded-3xl p-8 sm:p-12 border border-red-500/30 bg-gradient-to-br from-red-500/10 via-transparent to-black"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 text-red-400 mb-6">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-3xl font-syne font-bold text-white">THE TRADITIONAL INSTITUTION FAILURE</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Certificate-focused, not skill-focused',
                'Time-based completion, not readiness-based',
                'Zero mock interview preparation under pressure',
                'Zero confidence and speech evaluation',
                'Surface syntax memorization without database/system architecture',
                'Graduating unprepared for senior engineering rounds',
              ].map((problem, index) => (
                <div key={index} className="flex items-start space-x-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  <p className="text-sm font-sans">{problem}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <GrowthLoop />

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Interview-First Learning',
                description: 'Every MERN concept is taught alongside real interviewer questions, performance benchmarks, and architectural tradeoffs.',
              },
              {
                icon: Lightbulb,
                title: 'Confidence Transformation',
                description: 'We build your speaking confidence through daily code explanation drills, live presentation feedback, and brutal mock rounds.',
              },
              {
                icon: Shield,
                title: 'Zero Shortcuts Doctrine',
                description: 'You proceed only when you prove 95%+ readiness. No forced timelines, no diploma inflation, no fake promises.',
              },
              {
                icon: TrendingUp,
                title: 'Continuous Mastery System',
                description: 'Access post-placement mentorship, system design updates, and advanced tech workshops even after landing your role.',
              },
            ].map((pillar, idx) => {
              const IconComp = pillar.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-3xl p-8 border border-white/10 glass-card-hover space-y-4"
                >
                  <div className="p-3 rounded-2xl bg-[#59ACB7]/10 border border-[#59ACB7]/30 text-[#71D5D9] w-fit">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-syne font-bold text-white">{pillar.title}</h3>
                  <p className="text-gray-300 text-sm font-sans leading-relaxed">{pillar.description}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center pt-8">
            <Link to="/apply" data-cursor="button">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#59ACB7] to-teal-500 text-black font-syne font-bold text-base shadow-xl glow-emerald inline-flex items-center gap-2 hover:scale-105 transition-all">
                <span>APPLY TO JOIN THE DOCTRINE</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
