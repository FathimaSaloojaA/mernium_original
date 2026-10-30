import { motion } from 'framer-motion'
import { Database, Globe, Layers, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StackDiagram } from '../components/visuals/StackDiagram'
import { CodeWorkbench } from '../components/visuals/CodeWorkbench'

const Courses = () => {
  return (
    <div className="relative pt-28 pb-20">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="w-full min-w-0 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#59ACB7]/10 border border-[#59ACB7]/30 rounded-full text-[#71D5D9] font-mono text-xs uppercase tracking-widest"
          >
            <Layers className="w-4 h-4 text-[#71D5D9]" />
            <span>05 // PRODUCTION CURRICULUM</span>
          </motion.div>

          <motion.h1
            className="text-page-title font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            MERN STACK &amp; <span className="text-gradient-emerald-gold">INTERVIEW MAPPING</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Every single topic taught is directly mapped to system architecture, production code quality, and senior interview questions.
          </motion.p>
        </div>
      </section>

      {/* Teaching Method Header Pill */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="glass-card rounded-3xl p-8 sm:p-10 border border-[#59ACB7]/30 bg-gradient-to-br from-[#59ACB7]/10 via-transparent to-[#567B81]/5 text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-syne font-bold text-white">THE 3-TIER TEACHING FORMULA</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono text-gray-200">
              <span className="px-5 py-2 bg-[#59ACB7]/20 rounded-full border border-[#59ACB7]/40 text-[#BDEAEB]">
                1. WHAT IT IS
              </span>
              <ArrowRight className="w-5 h-5 text-[#71D5D9] hidden md:block" />
              <span className="px-5 py-2 bg-[#59ACB7]/20 rounded-full border border-[#59ACB7]/40 text-[#BDEAEB]">
                2. WHY IT EXISTS &amp; TRADEOFFS
              </span>
              <ArrowRight className="w-5 h-5 text-[#71D5D9] hidden md:block" />
              <span className="px-5 py-2 bg-[#59ACB7]/20 rounded-full border border-[#59ACB7]/40 text-[#BDEAEB]">
                3. HOW SENIOR INTERVIEWERS ASK IT
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* System map */}
      <section className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StackDiagram />
        </div>
      </section>

      {/* Frontend & Backend Breakdown */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Module */}
          <motion.div
            className="glass-card rounded-3xl p-6 sm:p-8 min-w-0 border border-white/10 glass-card-hover space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center gap-3 text-[#71D5D9]">
              <Globe className="w-8 h-8" />
              <h3 className="min-w-0 text-2xl lg:text-3xl font-syne font-extrabold text-white">FRONTEND CORE</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                'React 19 fundamentals & Fiber reconciler',
                'State management architectures (Zustand / Redux Toolkit)',
                'Advanced Custom Hooks & performance profiling',
                'React Router DOM v7 & nested layouts',
                'Component design patterns & accessibility',
                'Tailwind CSS & high-end WebGL canvas integration',
                'Lighthouse score optimization & code splitting',
                'Production web app deployments',
              ].map((topic, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300 text-sm font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Module */}
          <motion.div
            className="glass-card rounded-3xl p-6 sm:p-8 min-w-0 border border-white/10 glass-card-hover space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center gap-3 text-[#71D5D9]">
              <Database className="w-8 h-8" />
              <h3 className="min-w-0 text-2xl lg:text-3xl font-syne font-extrabold text-white">BACKEND CORE</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                'Node.js Event Loop, streams, & buffer internals',
                'Express.js middleware & rate limiting',
                'RESTful API architecture & versioning',
                'MongoDB document schemas & indexing strategies',
                'JWT & OAuth2 authentication security',
                'Aggregations, pipelines, & transaction logic',
                'Redis caching & memory management',
                'Docker containerization & AWS deployment',
              ].map((topic, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300 text-sm font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI-assisted workflow */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CodeWorkbench />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <Link to="/apply" data-cursor="button">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#59ACB7] to-teal-500 text-black font-syne font-bold text-base shadow-xl glow-emerald inline-flex items-center gap-2 hover:scale-105 transition-all">
            <span>ENROLL IN FULL CURRICULUM</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </section>
    </div>
  )
}

export default Courses
