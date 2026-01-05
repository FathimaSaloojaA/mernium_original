import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const teachers = [
  {
    name: 'Vikramaditya Roy',
    role: 'Principal System Architect',
    exp: '12+ Years in Distributed Systems',
    bio: 'Ex-Senior Lead Architect. Teaches event loop execution, database sharding, and real-time state synchronization.',
  },
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Full-Stack & Speech Coach',
    exp: '9+ Years in Engineering Leadership',
    bio: 'Focuses on code clarity, senior interview drills, and removing technical speaking anxiety.',
  },
]

const Teachers = () => {
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
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>SENIOR FACULTY &amp; MENTORS</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ENGINEERING <span className="text-gradient-emerald-gold">FACULTY</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Learn directly from senior software architects and engineering leaders who evaluate real candidates in modern product companies.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {teachers.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-emerald-500/30 glass-card-hover space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 flex items-center justify-center font-syne font-bold text-2xl text-emerald-400">
                  {t.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-syne font-bold text-white">{t.name}</h3>
                  <p className="font-mono text-xs text-emerald-400">{t.role}</p>
                </div>
              </div>

              <div className="font-mono text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 w-fit">
                ⚡ {t.exp}
              </div>

              <p className="text-gray-300 text-sm font-sans leading-relaxed">
                {t.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Teachers
