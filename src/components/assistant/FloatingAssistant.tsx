import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Send, MessageCircle, Sparkles, Terminal } from 'lucide-react'

export const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-[9960]">
      {/* Quick Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="mb-4 glass-card rounded-2xl p-5 border border-emerald-500/30 bg-[#050508]/95 backdrop-blur-2xl shadow-2xl glow-emerald min-w-[240px] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMAND SHORTCUTS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <Link
                to="/apply"
                className="flex items-center space-x-3 p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-white border border-emerald-500/30 transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <Send size={14} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                <span>Apply as a Mernian</span>
              </Link>

              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-white border border-amber-500/30 transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
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
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center shadow-2xl glow-emerald-strong text-black font-syne font-bold group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="button"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
      </motion.button>
    </div>
  )
}

export default FloatingAssistant
