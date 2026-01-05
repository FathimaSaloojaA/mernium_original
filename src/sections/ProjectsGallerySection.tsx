import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderGit2 } from 'lucide-react'

const projects = [
  {
    num: '01',
    title: 'NEXUS — AI CODING PLATFORM',
    student: 'Aarav Sharma (Cohort 4)',
    desc: 'Real-time collaborative code editor with WebSockets, Docker container sandbox, and automated interview question evaluator.',
    stack: ['React', 'Node.js', 'Docker', 'WebSockets', 'OpenAI'],
    link: '#',
    github: '#',
  },
  {
    num: '02',
    title: 'PULSE — DISTRIBUTED MONITORING',
    student: 'Fathima Salooja (Cohort 3)',
    desc: 'High-throughput system monitoring dashboard processing 50,000 telemetry events per second with Redis and MongoDB sharding.',
    stack: ['TypeScript', 'Express', 'Redis', 'MongoDB', 'Chart.js'],
    link: '#',
    github: '#',
  },
  {
    num: '03',
    title: 'SPATIAL — 3D INTERACTIVE CMS',
    student: 'Rohan Mehta (Cohort 5)',
    desc: 'Headless CMS rendering interactive 3D WebGL scenes dynamically based on GraphQL schemas.',
    stack: ['React Three Fiber', 'GraphQL', 'Node.js', 'Tailwind'],
    link: '#',
    github: '#',
  },
]

export const ProjectsGallerySection = () => {
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
              className="inline-flex items-center space-x-2 font-mono text-xs text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>06 // STUDENT SHOWCASE</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-syne font-extrabold text-white tracking-tight">
              BUILDER <span className="text-gradient-emerald-gold">PROJECTS</span>
            </h2>
          </div>
          <p className="text-gray-400 font-mono text-xs max-w-sm">
            No dummy to-do apps. Mernians engineer full-scale production applications evaluated by senior tech leads.
          </p>
        </div>

        {/* Projects Editorial List */}
        <div className="space-y-12">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 glass-card-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
              data-cursor="explore"
              data-cursor-text="PROJECT"
            >
              {/* Left Column: Number & Title */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center space-x-3 font-mono text-xs text-emerald-400">
                  <span className="text-2xl font-bold font-syne text-emerald-400/80">{proj.num}</span>
                  <span>// PRODUCTION APPLICATION</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-syne font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="font-mono text-xs text-amber-400/90">
                  Engineered by {proj.student}
                </p>
              </div>

              {/* Middle Column: Description & Tags */}
              <div className="lg:col-span-5 space-y-6">
                <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.stack.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="font-mono text-[11px] text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="lg:col-span-2 flex lg:flex-col items-center justify-end gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                <a
                  href={proj.link}
                  className="p-3.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 transition-all flex items-center justify-center w-12 h-12"
                  title="View Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href={proj.github}
                  className="p-3.5 rounded-full bg-white/5 text-gray-300 hover:bg-white/15 hover:text-white border border-white/10 transition-all flex items-center justify-center w-12 h-12"
                  title="Inspect Source Code"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsGallerySection
