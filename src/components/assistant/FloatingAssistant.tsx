import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Send, MessageCircle, Sparkles, Terminal } from 'lucide-react'

export const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9960] flex flex-col items-end">
      {/* Quick Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            id="assistant-shortcuts"
            className="mb-4 glass-card rounded-2xl p-5 border border-[#59ACB7]/30 backdrop-blur-2xl shadow-2xl glow-teal w-[min(16rem,calc(100vw-2rem))] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#BDEAEB]/10 pb-3">
              <div className="flex items-center space-x-2 text-[#71D5D9] font-mono text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMAND SHORTCUTS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-2 -m-1"
                aria-label="Close shortcuts"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <Link
                to="/apply"
                className="flex items-center space-x-3 p-2.5 rounded-xl bg-[#59ACB7]/10 hover:bg-[#59ACB7]/20 text-white border border-[#59ACB7]/30 transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <Send size={14} className="text-[#71D5D9] group-hover:translate-x-1 transition-transform" />
                <span>Apply as a Mernian</span>
              </Link>

              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2.5 rounded-xl bg-[#3F616A]/20 hover:bg-[#3F616A]/35 text-white border border-[#567B81]/30 transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={14} className="text-[#BDEAEB] group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/courses"
                className="flex items-center space-x-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <Terminal size={14} className="text-gray-400" />
                <span>Explore Curriculum</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close shortcuts' : 'Open shortcuts'}
        aria-expanded={isOpen}
        aria-controls="assistant-shortcuts"
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#59ACB7] via-[#11586B] to-[#3F616A] flex items-center justify-center shadow-2xl glow-emerald-strong text-white font-syne font-bold group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="button"
      >
        <Sparkles aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-45 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#71D5D9] border-2 border-[#0A1319] animate-ping" />
      </motion.button>
    </div>
  )
}

export default FloatingAssistant