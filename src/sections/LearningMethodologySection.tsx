import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Compass, CheckCircle2, Zap, Trophy, ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'LEARN',
    subtitle: 'INTERACTION & FUNDAMENTALS',
    icon: Code2,
    desc: 'Understand what concepts mean, why they exist, and how senior engineers explain them in technical interviews.',
    code: `// Stage 01: Core Architecture Logic
const understandConcept = (topic) => {
  return {
    whyItExists: true,
    interviewsAsked: ['Event Loop', 'Closure', 'Indexing'],
  };
};`,
  },
  {
    num: '02',
    title: 'BUILD',
    subtitle: 'REAL PRODUCTION APPLICATIONS',
    icon: Compass,
    desc: 'Write actual full-stack code daily. Build REST APIs, state architectures, and database aggregations from scratch.',
    code: `// Stage 02: Full-Stack Execution
app.post('/api/v1/build', async (req, res) => {
  const project = await Production.create(req.body);
  res.status(201).json({ status: 'FEARLESS_BUILD', project });
});`,
  },
  {
    num: '03',
    title: 'PRACTICE',
    subtitle: 'DAILY CODE REVIEWS & DRILLS',
    icon: Zap,
    desc: 'Fix bugs under pressure, optimize database indexes, write clean TypeScript types, and refactor legacy code.',
    code: `// Stage 03: Performance Optimization
const optimizeQuery = await Model.aggregate([
  { $match: { status: 'ACTIVE' } },
  { $group: { _id: '$category', total: { $sum: '$value' } } }
]);`,
  },
  {
    num: '04',
    title: 'EVALUATE',
    subtitle: 'MOCK INTERVIEW DRILLS',
    icon: CheckCircle2,
    desc: 'Face mock technical interviews with brutal, constructive feedback. Test your speech, clarity, and confidence.',
    code: `// Stage 04: Interview Evaluation
function evaluateCandidate(readiness) {
  if (readiness.confidence >= 95 && readiness.codeQuality === 'PRO') {
    return 'INTERVIEW_READY';
  }
}`,
  },
  {
    num: '05',
    title: 'MASTER',
    subtitle: 'FEARLESS ENGINEER STATUS',
    icon: Trophy,
    desc: 'Graduate as a fearless Mernian who enters interviews with zero anxiety, ready to land high-paying roles.',
    code: `// Stage 05: Master Status
export const MernianStatus = {
  fear: 0,
  confidence: 100,
  readiness: 'UNSTOPPABLE'
};`,
  },
]

export const LearningMethodologySection = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>04 // THE 5-STAGE METHODOLOGY</span>
          </motion.div>
          <h2 className="text-4xl sm:text-6xl font-syne font-extrabold text-white tracking-tight">
            THE <span className="text-gradient-emerald-gold">MASTER PIPELINE</span>
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Progression from beginner curiosity into an unstoppable, interview-ready builder.
          </p>
        </div>

        {/* Step Track Selector Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`relative px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase transition-all duration-300 flex items-center space-x-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg glow-emerald scale-105'
                    : 'glass-card text-gray-300 hover:text-white hover:border-emerald-500/40'
                }`}
                data-cursor="button"
              >
                <span className={isActive ? 'text-black' : 'text-emerald-400'}>{step.num}</span>
                <span>{step.title}</span>
              </button>
            )
          })}
        </div>

        {/* Step Visualizer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-8 md:p-10 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-black space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    STAGE {steps[activeStep].num} // 05
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                    {(() => {
                      const IconComp = steps[activeStep].icon
                      return <IconComp className="w-6 h-6" />
                    })()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-4xl font-syne font-extrabold text-white tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="font-mono text-xs text-amber-400 tracking-wider">
                    {steps[activeStep].subtitle}
                  </p>
                </div>

                <p className="text-gray-300 font-sans text-base leading-relaxed">
                  {steps[activeStep].desc}
                </p>

                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="px-6 py-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-mono text-xs uppercase font-bold flex items-center space-x-2 transition-colors"
                  >
                    <span>NEXT PIPELINE STAGE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Code Editor Mock */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/15 bg-[#0a0a0f] overflow-hidden shadow-2xl font-mono"
              >
                {/* Window Header */}
                <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-gray-500">pipeline_stage_{steps[activeStep].num}.ts</span>
                  <span className="text-[10px] text-emerald-400/80 uppercase">TS 5.9</span>
                </div>

                {/* Code Block */}
                <div className="p-6 text-xs sm:text-sm text-emerald-300 leading-relaxed overflow-x-auto">
                  <pre>
                    <code>{steps[activeStep].code}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningMethodologySection
