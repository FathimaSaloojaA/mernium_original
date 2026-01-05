import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, Zap } from 'lucide-react'

const batches = [
  {
    name: 'COHORT 06 — INTERVIEW ACCELERATOR',
    start: 'MAY 1, 2026',
    schedule: 'MON - FRI (7:00 PM - 9:30 PM)',
    status: 'ADMISSIONS OPEN',
    capacity: '18 / 25 SEATS FILLED',
    tag: 'MOST POPULAR',
  },
  {
    name: 'COHORT 07 — FULL STACK & SYSTEM DESIGN',
    start: 'JUNE 15, 2026',
    schedule: 'SAT & SUN (10:00 AM - 3:00 PM)',
    status: 'EARLY BIRD OPEN',
    capacity: '8 / 25 SEATS FILLED',
    tag: 'WEEKEND TRACK',
  },
]

const Batches = () => {
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
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>LIMITED COHORT CAPACITY</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ACTIVE <span className="text-gradient-emerald-gold">BATCH SCHEDULES</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We strictly limit cohort sizes to 25 builders to guarantee individual code reviews and mock interview attention.
          </motion.p>
        </div>
      </section>

      {/* Batches Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {batches.map((batch, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 sm:p-10 border border-emerald-500/30 glass-card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center space-x-3 font-mono text-xs">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 uppercase">
                    {batch.status}
                  </span>
                  <span className="text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {batch.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-syne font-extrabold text-white">
                  {batch.name}
                </h3>

                <div className="flex flex-wrap gap-6 font-mono text-xs text-gray-300 pt-2">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    STARTS: {batch.start}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    {batch.schedule}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    {batch.capacity}
                  </span>
                </div>
              </div>

              <Link to="/apply" data-cursor="button">
                <button className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold text-sm tracking-wider uppercase flex items-center space-x-2 transition-all shadow-lg glow-emerald">
                  <span>RESERVE SEAT</span>
                  <Zap className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Batches
