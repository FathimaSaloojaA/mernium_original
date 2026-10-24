import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { X, ArrowUpRight, Terminal, Zap, Sparkles } from 'lucide-react'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const FullscreenMenu = ({ isOpen, onClose }: FullscreenMenuProps) => {
  const location = useLocation()

  const mainLinks = [
    { path: '/', label: 'EXPERIENCE', num: '01', desc: 'Interactive Home & 3D Environment' },
    { path: '/about', label: 'PHILOSOPHY', num: '02', desc: 'Our Interview-First Doctrine' },
    { path: '/mernmade', label: 'MERNMADE', num: '03', desc: 'The Developer Making Engine' },
    { path: '/how-it-works', label: 'METHODOLOGY', num: '04', desc: '5-Stage Mastery Pipeline' },
    { path: '/courses', label: 'PROGRAMS', num: '05', desc: 'Full-Stack & System Architecture' },
    { path: '/batches', label: 'BATCHES', num: '06', desc: 'Cohort Schedules & Capacity' },
    { path: '/students', label: 'BUILDERS', num: '07', desc: 'Student Projects & Testimonials' },
  ]

  const secondaryLinks = [
    { path: '/interview-training', label: 'Interview Accelerator' },
    { path: '/communication-training', label: 'Communication Mastery' },
    { path: '/teachers', label: 'Faculty & Mentors' },
    { path: '/contact', label: 'Global Command' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9980] glass-menu flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-y-auto"
          initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
          animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
          exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Header Bar inside menu */}
          <div className="flex items-center justify-between border-b border-[#BDEAEB]/10 pb-6">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#71D5D9] animate-ping" />
              <span className="font-mono text-xs text-[#71D5D9] tracking-widest uppercase">
                SYSTEM MENU // NAVIGATION MATRIX
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-[#11586B]/20 border border-[#BDEAEB]/10 text-white hover:bg-[#59ACB7]/20 hover:border-[#59ACB7]/50 hover:text-[#71D5D9] transition-all group"
              data-cursor="button"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Main Links Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-10">
            {/* Primary navigation */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              {mainLinks.map((link, idx) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="group flex items-baseline space-x-4 sm:space-x-8 py-1 transition-all"
                      data-cursor="explore"
                      data-cursor-text="OPEN"
                    >
                      <span className="font-mono text-xs sm:text-sm text-[#71D5D9]/60 group-hover:text-[#71D5D9] transition-colors">
                        {link.num}
                      </span>
                      <h3
                        className={`text-3xl sm:text-5xl md:text-6xl font-syne font-extrabold tracking-tight transition-all duration-300 ${
                          isActive
                            ? 'text-[#71D5D9] pl-4 border-l-2 border-[#71D5D9]'
                            : 'text-white/80 group-hover:text-white group-hover:translate-x-3'
                        }`}
                      >
                        {link.label}
                      </h3>
                      <span className="hidden md:inline-block text-xs font-mono text-[#567B81] group-hover:text-[#BDEAEB] transition-colors">
                        â€” {link.desc}
                      </span>
                      <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-[#71D5D9] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Secondary Column */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-l border-[#BDEAEB]/10 pt-8 lg:pt-0 lg:pl-12">
              <div>
                <h4 className="font-mono text-xs text-[#567B81] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#71D5D9]" />
                  Specialized Accelerators
                </h4>
                <div className="space-y-4">
                  {secondaryLinks.map((sec) => (
                    <Link
                      key={sec.path}
                      to={sec.path}
                      onClick={onClose}
                      className="block text-gray-300 hover:text-[#71D5D9] text-lg font-medium transition-colors hover:translate-x-2 transition-transform duration-200"
                    >
                      {sec.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Institution Manifesto Pill */}
              <div className="p-6 rounded-2xl glass-card border border-[#59ACB7]/20 bg-gradient-to-br from-[#59ACB7]/10 to-transparent space-y-3">
                <div className="flex items-center space-x-2 text-[#71D5D9] font-mono text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>THE MERNIUM PROMISE</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  "No certificates. No empty promises. We build fearless engineers who conquer interviews."
                </p>
                <Link
                  to="/apply"
                  onClick={onClose}
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#71D5D9] hover:text-[#BDEAEB] group"
                >
                  <span>APPLY FOR ADMISSION</span>
                  <Zap className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Bar inside menu */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#BDEAEB]/10 pt-6 text-xs font-mono text-[#567B81] gap-4">
            <div className="flex items-center space-x-4">
              <span>Â© {new Date().getFullYear()} MERNIUM INSTITUTION</span>
              <span>â€¢</span>
              <span className="text-[#71D5D9]/80">3D DIGITAL WORLD</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
              <span className="hover:text-white transition-colors cursor-pointer">DOCTRINE</span>
              <span className="hover:text-white transition-colors cursor-pointer">PORTAL</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}