import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code, Cpu, Database, Award, ArrowUpRight, Check } from 'lucide-react'

const programs = [
  {
    id: 'mern-fullstack',
    title: 'MERN FULL-STACK ENGINEERING',
    subtitle: 'COHORT 2026',
    desc: 'Master React 19, Node.js, MongoDB, Express, and TypeScript. Build production-level microservices and real-time state architectures.',
    icon: Code,
    color: 'emerald',
    tags: ['React 19', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    highlights: ['Microservice REST APIs', 'Custom React Hooks', 'Database Sharding'],
  },
  {
    id: 'ai-dev',
    title: 'AI DEVELOPMENT & WEBGL',
    subtitle: 'ADVANCED TRACK',
    desc: 'Integrate LLMs, OpenAI API, LangChain, RAG pipelines, and 3D WebGL visuals into modern web apps.',
    icon: Cpu,
    color: 'amber',
    tags: ['OpenAI', 'LangChain', 'Vector DB', 'Three.js', 'WebGL'],
    highlights: ['RAG Pipeline Setup', 'Vector Search', '3D Spatial Canvas'],
  },
  {
    id: 'system-arch',
    title: 'SYSTEM ARCHITECTURE & CLOUD',
    subtitle: 'SCALE TRACK',
    desc: 'Learn high-availability system design, Redis caching, AWS deployment, Docker containers, and CI/CD pipelines.',
    icon: Database,
    color: 'cyan',
    tags: ['Redis', 'Docker', 'AWS EC2', 'Kubernetes', 'Nginx'],
    highlights: ['Distributed Caching', 'Docker Swarm', 'Load Balancing'],
  },
  {
    id: 'interview-acc',
    title: 'INTERVIEW ACCELERATOR',
    subtitle: 'CONFIDENCE DRILL',
    desc: 'Rigorously prepared for technical interviews, DSA logic in JS, live coding under pressure, and senior engineer speech drills.',
    icon: Award,
    color: 'purple',
    tags: ['DSA in JS', 'System Design', 'Mock Drills', 'Speech Training'],
    highlights: ['1-on-1 Mock Rounds', 'Speech Confidence', 'Resume Audit'],
  },
]

export const ProgramsSection = () => {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 font-mono text-xs text-[#71D5D9] bg-[#59ACB7]/10 px-4 py-1.5 rounded-full border border-[#59ACB7]/20"
            >
              <Code className="w-3.5 h-3.5" />
              <span>05 // ACADEMIC PROGRAMS &amp; TRACKS</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-syne font-extrabold text-white tracking-tight">
              CURRICULUM <span className="text-gradient-emerald-gold">PROGRAMS</span>
            </h2>
          </div>

          <Link to="/courses" data-cursor="explore">
            <button className="font-mono text-xs text-[#71D5D9] border-b border-[#71D5D9]/50 pb-1 hover:border-[#71D5D9] flex items-center gap-2 transition-colors">
              <span>EXPLORE ALL CURRICULUM MODULES</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((prog, idx) => {
            const IconComponent = prog.icon
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group glass-card rounded-3xl p-8 md:p-10 border border-white/10 glass-card-hover flex flex-col justify-between space-y-8 relative overflow-hidden"
                data-cursor="explore"
                data-cursor-text="VIEW"
              >
                {/* Background glow hover effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#59ACB7]/5 rounded-full blur-3xl group-hover:bg-[#59ACB7]/15 transition-all pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#567B81] bg-[#567B81]/10 px-3 py-1 rounded-full border border-[#567B81]/20 uppercase tracking-widest">
                      {prog.subtitle}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#71D5D9] group-hover:scale-110 group-hover:border-[#59ACB7]/50 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-syne font-extrabold text-white group-hover:text-[#BDEAEB] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-gray-300 text-sm font-sans leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2">
                    {prog.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                        <Check className="w-3.5 h-3.5 text-[#71D5D9]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tags & Link */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {prog.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[10px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to="/courses" className="p-2.5 rounded-full bg-white/5 text-white group-hover:bg-[#59ACB7] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection
