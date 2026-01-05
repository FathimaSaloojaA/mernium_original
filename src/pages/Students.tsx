import { motion } from 'framer-motion'
import { Users, Award } from 'lucide-react'

const students = [
  {
    name: 'Devanshu Verma',
    role: 'Full-Stack Engineer',
    company: 'Product Scale-Up',
    cohort: 'Cohort 03',
    project: 'NEXUS Collaborative IDE',
    quote: 'MERNIUM converted my syntax knowledge into real architectural confidence.',
  },
  {
    name: 'Fathima Salooja',
    role: 'MERN Developer',
    company: 'Fintech Core',
    cohort: 'Cohort 03',
    project: 'PULSE Monitoring Dashboard',
    quote: 'The mock interview drills prepared me for every surprise question.',
  },
  {
    name: 'Ananya Iyer',
    role: 'Backend Architect',
    company: 'SaaS Platform',
    cohort: 'Cohort 04',
    project: 'Distributed Microservices API',
    quote: 'Zero interview anxiety after completing the 5-Stage pipeline.',
  },
]

const Students = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs uppercase tracking-widest"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>MERNIAN BUILDER HALL OF FAME</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            OUR <span className="text-gradient-emerald-gold">BUILDERS</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Meet the engineers who earned the MERNMADE status and now build high-scale software globally.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {students.map((student, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/10 glass-card-hover space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  {student.cohort}
                </span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-syne font-bold text-white">{student.name}</h3>
                <p className="font-mono text-xs text-gray-400">{student.role} @ <span className="text-emerald-300">{student.company}</span></p>
              </div>

              <p className="text-gray-300 text-sm font-sans italic leading-relaxed">
                "{student.quote}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Project: {student.project}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Students
