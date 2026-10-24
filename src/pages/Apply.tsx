import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Send, Terminal, Sparkles } from 'lucide-react'

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    background: '',
    motivation: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        batch: '',
        background: '',
        motivation: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="relative pt-28 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#59ACB7]/10 border border-[#59ACB7]/30 rounded-full text-[#71D5D9] font-mono text-xs uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-[#71D5D9]" />
            <span>OFFICIAL ADMISSION PORTAL</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            APPLY AS A <span className="text-gradient-emerald-gold">MERNIAN</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Start your transformation into a fearless, interview-ready software engineer.
          </motion.p>
        </div>
      </section>

      {/* Warning Notice */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card rounded-3xl p-6 sm:p-8 border border-[#567B81]/30 bg-[#567B81]/5 flex items-start space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-6 h-6 text-[#567B81] shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="text-lg font-syne font-bold text-white">IMPORTANT DOCTRINE NOTICE</h3>
              <p className="text-gray-300 text-sm font-sans leading-relaxed">
                <strong className="text-[#567B81]">Not for shortcut seekers.</strong> This program requires intense dedication, daily production building, and a genuine drive for interview readiness. We do not sell certificates.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expectations List */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card rounded-3xl p-8 border border-white/10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#71D5D9]" />
              WHAT WE EXPECT FROM APPLICANTS
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm font-sans text-gray-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Daily live session attendance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Camera on for real speech evaluation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Daily production code commits</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Commitment to zero-fear readiness</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              className="glass-card rounded-3xl p-12 border border-[#59ACB7]/40 bg-gradient-to-br from-[#59ACB7]/10 to-[#567B81]/5 text-center space-y-4 shadow-2xl glow-emerald"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#71D5D9] mx-auto" />
              <h2 className="text-3xl font-syne font-bold text-white">APPLICATION RECEIVED!</h2>
              <p className="text-gray-300 text-sm font-sans">
                Our admissions committee will review your profile and contact you via email within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-syne font-extrabold text-white">CANDIDATE ADMISSION FORM</h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 font-mono text-xs">
                  <label className="text-gray-300 uppercase tracking-wider">FULL NAME *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#71D5D9] font-sans transition-colors"
                  />
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <label className="text-gray-300 uppercase tracking-wider">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#71D5D9] font-sans transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 font-mono text-xs">
                  <label className="text-gray-300 uppercase tracking-wider">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#71D5D9] font-sans transition-colors"
                  />
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <label className="text-gray-300 uppercase tracking-wider">PREFERRED BATCH *</label>
                  <select
                    name="batch"
                    required
                    value={formData.batch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A1319] border border-white/15 text-white focus:outline-none focus:border-[#71D5D9] font-sans transition-colors"
                  >
                    <option value="">Select a batch...</option>
                    <option value="cohort-06">Cohort 06 — May 1, 2026 (Weekday)</option>
                    <option value="cohort-07">Cohort 07 — June 15, 2026 (Weekend)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <label className="text-gray-300 uppercase tracking-wider">YOUR CODING BACKGROUND *</label>
                <textarea
                  name="background"
                  required
                  rows={3}
                  value={formData.background}
                  onChange={handleChange}
                  placeholder="Describe your current tech stack, experience, and what you have built..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#71D5D9] font-sans transition-colors"
                />
              </div>

              <div className="space-y-2 font-mono text-xs">
                <label className="text-gray-300 uppercase tracking-wider">WHY DO YOU WANT TO BECOME A MERNIAN? *</label>
                <textarea
                  name="motivation"
                  required
                  rows={3}
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="What is your main goal for taking technical interviews?"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#71D5D9] font-sans transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#59ACB7] via-[#71D5D9] to-teal-500 text-black font-syne font-bold text-base uppercase tracking-wider shadow-xl glow-emerald flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all"
                data-cursor="button"
              >
                <span>SUBMIT ADMISSION APPLICATION</span>
                <Send className="w-5 h-5" />
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Apply
