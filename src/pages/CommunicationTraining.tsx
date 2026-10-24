import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageSquare, Mic, ArrowRight } from 'lucide-react'
import { SpeechStructure } from '../components/visuals/SpeechStructure'

const CommunicationTraining = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#567B81]/10 border border-[#567B81]/30 rounded-full text-[#567B81] font-mono text-xs uppercase tracking-widest"
          >
            <Mic className="w-4 h-4 text-[#567B81]" />
            <span>SPEECH &amp; CONFIDENCE DOCTRINE</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            COMMUNICATION <span className="text-gradient-emerald-gold">MASTERY</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Code is only 50% of the interview. The other 50% is how clearly and confidently you articulate your engineering solutions.
          </motion.p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Technical Speech Structure',
                desc: 'Learn the exact framework senior engineers use to explain complex async logic without rambling.',
              },
              {
                title: 'Mock Q&A Pressure Drills',
                desc: 'Practice answering unexpected follow-up questions from interviewers without losing composure.',
              },
              {
                title: 'Recorded Audio Analysis',
                desc: 'Review your speech recordings with coaches to eliminate filler words and hesitation.',
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 border border-white/10 glass-card-hover space-y-4"
              >
                <div className="p-3 rounded-2xl bg-[#567B81]/10 text-[#567B81] w-fit">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-syne font-bold text-white">{pillar.title}</h3>
                <p className="text-gray-300 text-sm font-sans leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

          <SpeechStructure />

          <div className="text-center pt-8">
            <Link to="/apply" data-cursor="button">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#59ACB7] to-teal-500 text-black font-syne font-bold text-base shadow-xl glow-emerald inline-flex items-center gap-2 hover:scale-105 transition-all">
                <span>ENROLL IN SPEECH DRILLS</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CommunicationTraining
