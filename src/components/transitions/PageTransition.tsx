import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation()

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'MERNIUM // DIGITAL EXPERIENCE'
      case '/about': return 'INSTITUTION PHILOSOPHY'
      case '/mernmade': return 'MERNMADE SYSTEM'
      case '/how-it-works': return 'THE 5-STEP METHODOLOGY'
      case '/courses': return 'MERN & TECH CURRICULUM'
      case '/batches': return 'ACTIVE BATCHES'
      case '/students': return 'BUILDER SHOWCASE'
      case '/teachers': return 'FACULTY & MENTORS'
      case '/interview-training': return 'INTERVIEW ACCELERATOR'
      case '/communication-training': return 'SPEECH & CONFIDENCE'
      case '/apply': return 'ADMISSION APPLICATION'
      case '/contact': return 'GLOBAL COMMAND CENTER'
      default: return 'MERNIUM'
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="w-full">
        {/* Cinematic Entrance Overlay */}
        <motion.div
          className="fixed inset-0 bg-[#050508] z-[9990] pointer-events-none flex flex-col justify-between p-8 md:p-16 border-b border-emerald-500/30"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
        >
          <div className="flex justify-between items-center text-xs font-mono text-emerald-400/60 uppercase tracking-widest">
            <span>[ SYSTEM ROUTING ]</span>
            <span>MERNIUM v3.0</span>
          </div>

          <div className="overflow-hidden py-4">
            <motion.h2
              className="text-4xl md:text-7xl font-syne font-extrabold text-white tracking-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {getPageTitle(location.pathname)}
            </motion.h2>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-gray-500 uppercase">
            <span>INTERVIEW-READY</span>
            <span>READY TO BUILD</span>
          </div>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
