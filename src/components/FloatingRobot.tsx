import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Send, MessageCircle } from 'lucide-react'

const FloatingRobot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-black/90 backdrop-blur-xl border border-[#59ACB7]/30 rounded-2xl p-4 shadow-2xl glow-emerald min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#71D5D9] font-semibold">Quick Actions</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              <Link
                to="/apply"
                className="flex items-center space-x-2 p-2 rounded-lg bg-[#59ACB7]/10 hover:bg-[#59ACB7]/20 text-white transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <Send size={16} className="text-[#71D5D9] group-hover:translate-x-1 transition-transform" />
                <span>Apply as a Mernian</span>
              </Link>
              <a
                href="https://wa.me/917994774154"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg bg-[#59ACB7]/10 hover:bg-[#59ACB7]/20 text-white transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={16} className="text-[#71D5D9] group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-16 h-16 bg-gradient-to-br from-[#59ACB7] to-[#59ACB7] rounded-full shadow-2xl glow-emerald-strong flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: isHovered ? [0, -10, 0] : 0,
          rotate: isHovered ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          y: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
          rotate: { duration: 0.3 },
        }}
      >
        {/* Robot Face */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="relative z-10"
        >
          {/* Head */}
          <rect x="8" y="8" width="24" height="24" rx="4" fill="white" />
          {/* Eyes */}
          <circle
            cx="18"
            cy="18"
            r="2.5"
            fill="black"
          />
          <circle
            cx="22"
            cy="18"
            r="2.5"
            fill="black"
          />
          {/* Mouth */}
          <path
            d="M 16 24 Q 20 26 24 24"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-[#71D5D9] rounded-full"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.button>
    </div>
  )
}

export default FloatingRobot
