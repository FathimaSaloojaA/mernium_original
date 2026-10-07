import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target,  ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export const OutputsSection = () => {
  return (
    <section className="py-32 px-6 lg:px-12 relative overflow-hidden border-b border-paper/10 bg-deepspace/40 noise-bg">
      <div className="max-w-[1400px] mx-auto space-y-28">
        {/* Section 1: What is Mernium? */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 font-mono text-xs text-acid bg-acid/10 px-4 py-1.5 border-l-2 border-acid"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>SYSTEM SPECIFICATION</span>
            </motion.div>

            <h2 className="text-4xl sm:text-6xl font-syne font-black text-warmwhite tracking-tight uppercase">
              WHAT IS <span className="text-outline-acid">MERNIUM?</span>
            </h2>

            <div className="space-y-6 pt-4">
              <div className="spatial-line pl-6 space-y-2">
                <h3 className="text-2xl font-syne font-bold text-warmwhite">ONLINE TECH INSTITUTION</h3>
                <p className="text-warmwhite/80 font-sans text-base leading-relaxed">
                  A developer-making system focused exclusively on technical interview readiness, system design, and production engineering—not syllabus completion.
                </p>
              </div>

              <div className="spatial-line pl-6 space-y-2">
                <h3 className="text-2xl font-syne font-bold text-warmwhite">NOT CERTIFICATE-ORIENTED</h3>
                <p className="text-warmwhite/80 font-sans text-base leading-relaxed">
                  We don't measure success by diplomas or hours watched. We measure success by your confidence in front of senior tech leads.
                </p>
              </div>
            </div>
          </div>

          {/* Large Goal Manifest Fragment */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 sm:p-14 bg-ink/90 border-t-2 border-r-2 border-acid text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <Target className="w-16 h-16 text-acid mx-auto" />
              <div className="space-y-2">
                <p className="text-2xl sm:text-4xl font-syne font-bold text-warmwhite/60 line-through">
                  The goal is not course completion.
                </p>
                <p className="text-3xl sm:text-5xl font-syne font-black text-acid uppercase tracking-tight">
                  THE GOAL IS INTERVIEW READINESS.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 2: Who Are Mernians? */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper/10 pb-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-violet font-bold uppercase tracking-widest">[ MERNIAN TRAITS ]</span>
              <h2 className="text-4xl sm:text-6xl font-syne font-black text-warmwhite tracking-tight uppercase">
                WHO ARE <span className="text-acid">MERNIANS?</span>
              </h2>
            </div>
            <p className="text-warmwhite/70 font-sans text-sm max-w-md">
              Developers who think clearly, code daily, explain confidently, and face interviews without fear.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Think Clearly', desc: 'Logical problem-solving mindset without memorizing code syntax', num: '01' },
              { title: 'Code Daily', desc: 'Hands-on production building with TypeScript, Express, and MongoDB', num: '02' },
              { title: 'Explain Confidently', desc: 'Articulating system architecture decisions clearly to tech leads', num: '03' },
              { title: 'Face Interviews Fearlessly', desc: 'Zero test anxiety during live whiteboard coding and Q&A drills', num: '04' },
            ].map((trait) => (
              <motion.div
                key={trait.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="spatial-line pl-6 space-y-3"
              >
                <span className="font-mono text-xs text-acid font-bold">[ TRAIT {trait.num} ]</span>
                <h3 className="text-2xl font-syne font-bold text-warmwhite">{trait.title}</h3>
                <p className="text-warmwhite/70 font-sans text-sm leading-relaxed">{trait.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: MERNMADE Status & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-acid bg-acid/10 px-3 py-1 uppercase tracking-widest border border-acid/30">
              MERNMADE STATUS
            </span>
            <h2 className="text-4xl sm:text-6xl font-syne font-black text-warmwhite leading-tight uppercase">
              NOT A DIPLOMA. A <span className="text-outline-acid">READINESS BADGE.</span>
            </h2>
            <p className="text-warmwhite/80 font-sans text-base leading-relaxed">
              MERNMADE is a status awarded only when you become interview-ready. No time-based completion stamps. No shortcuts. Only when you're truly ready.
            </p>

            <div className="pt-4">
              <Link to="/mernmade" data-cursor="explore">
                <button className="px-8 py-4 bg-acid text-ink font-syne font-extrabold text-sm uppercase tracking-wider flex items-center space-x-3 shadow-acid-glow hover:bg-acid-hover transition-colors">
                  <span>LEARN HOW MERNMADE WORKS</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-ink/90 border-l-4 border-violet space-y-6"
            >
              <ShieldCheck className="w-12 h-12 text-violet" />
              <blockquote className="text-2xl font-syne font-bold text-warmwhite leading-relaxed">
                "If you are confident and interview-ready, you don't need a certificate."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OutputsSection
