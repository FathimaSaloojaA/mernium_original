import { motion } from 'framer-motion'
import { Users, Award, Clock, ShieldCheck } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'FEARLESS BUILDERS',
    desc: 'Engineers who completed readiness evaluation',
  },
  {
    icon: Award,
    value: '98%',
    label: 'INTERVIEW PASS RATE',
    desc: 'Passed tech rounds at modern product companies',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'LIVE REVIEWS',
    desc: 'Continuous PR feedback & architecture audits',
  },
  {
    icon: ShieldCheck,
    value: '0',
    label: 'SHORTCUTS ALLOWED',
    desc: 'Graduation relies exclusively on mastery',
  },
]

export const StatsSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/10 glass-card-hover space-y-4 text-center sm:text-left"
            >
              <div className="flex items-center justify-between">
                <IconComp className="w-6 h-6 text-[#71D5D9]" />
                <span className="font-mono text-[10px] text-gray-500 uppercase">[ METRIC 0{idx + 1} ]</span>
              </div>
              <h3 className="text-5xl sm:text-6xl font-syne font-extrabold text-white tracking-tight text-gradient-cyber">
                {stat.value}
              </h3>
              <div className="space-y-1">
                <p className="font-mono text-xs font-bold text-[#71D5D9] tracking-wider">
                  {stat.label}
                </p>
                <p className="text-gray-400 text-xs font-sans">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default StatsSection
