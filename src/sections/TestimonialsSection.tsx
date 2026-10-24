import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, MessageSquare, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

const testimonials = [
  {
    quote: "Before MERNIUM, I could build basic apps, but I panicked during mock interviews when asked about database indexing or event loop microtasks. MERNIUM eliminated that fear completely.",
    name: "Devanshu Verma",
    role: "Full-Stack Engineer @ Product Scale-Up",
    cohort: "Cohort 03",
    stat: "Landed role in 14 days post-readiness",
  },
  {
    quote: "The 5-Stage pipeline isn't standard online learning. You are forced to present your architectural decisions daily. When I walked into my senior tech interview, it felt like just another practice day.",
    name: "Ananya Iyer",
    role: "MERN Developer @ Fintech Core",
    cohort: "Cohort 04",
    stat: "Passed 4 out of 4 technical rounds",
  },
  {
    quote: "MERNIUM taught me to think like an engineer who solves problems, not a student who completes a checklist. The mock interview drills are life-changing.",
    name: "Mohammed Zaid",
    role: "Backend Architect @ SaaS Platform",
    cohort: "Cohort 02",
    stat: "Built distributed API handling 1M daily requests",
  },
]

export const TestimonialsSection = () => {
  const [activeIdx, setActiveIdx] = useState(0)

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
              <MessageSquare className="w-3.5 h-3.5" />
              <span>07 // MERNIAN TESTIMONIALS</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-syne font-extrabold text-white tracking-tight">
              VOICES OF <span className="text-gradient-emerald-gold">READINESS</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#59ACB7]/20 hover:border-[#59ACB7]/50 hover:text-[#71D5D9] transition-all"
              data-cursor="button"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#59ACB7]/20 hover:border-[#59ACB7]/50 hover:text-[#71D5D9] transition-all"
              data-cursor="button"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quote Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 sm:p-14 border border-[#59ACB7]/30 bg-gradient-to-br from-[#59ACB7]/10 via-transparent to-black space-y-8 relative overflow-hidden shadow-2xl"
          >
            <Quote className="w-16 h-16 text-[#59ACB7]/20 absolute top-8 right-8 pointer-events-none" />

            <div className="space-y-6 max-w-4xl relative z-10">
              <p className="text-2xl sm:text-4xl font-syne font-semibold text-white leading-relaxed tracking-tight">
                "{testimonials[activeIdx].quote}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-8 gap-4 relative z-10">
              <div className="space-y-1">
                <h4 className="text-xl font-syne font-bold text-white flex items-center gap-2">
                  {testimonials[activeIdx].name}
                  <CheckCircle2 className="w-4 h-4 text-[#71D5D9]" />
                </h4>
                <p className="font-mono text-xs text-[#71D5D9]">
                  {testimonials[activeIdx].role} — <span className="text-[#567B81]">{testimonials[activeIdx].cohort}</span>
                </p>
              </div>

              <span className="font-mono text-xs text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 inline-block">
                ⚡ {testimonials[activeIdx].stat}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TestimonialsSection
