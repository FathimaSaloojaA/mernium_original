import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Zap } from 'lucide-react'
import { FullscreenMenu } from './FullscreenMenu'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const quickNav = [
    { path: '/', label: 'EXPERIENCE' },
    { path: '/about', label: 'PHILOSOPHY' },
    { path: '/mernmade', label: 'MERNMADE' },
    { path: '/courses', label: 'PROGRAMS' },
    { path: '/how-it-works', label: 'METHODOLOGY' },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[9970] transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#050508]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-emerald-950/20'
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            data-cursor="pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 flex items-center justify-center overflow-hidden group-hover:border-emerald-400 transition-colors">
              <span className="font-syne font-extrabold text-lg text-emerald-400 group-hover:scale-110 transition-transform">
                M
              </span>
              <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                MERNIUM
              </span>
              <span className="font-mono text-[9px] text-gray-400 tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                INSTITUTION 3.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 glass-card px-6 py-2 rounded-full border border-white/10">
            {quickNav.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full border border-emerald-400/40"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action CTAs & Menu Trigger */}
          <div className="flex items-center space-x-4">
            {/* Admission CTA Button */}
            <Link to="/apply" data-cursor="button">
              <motion.button
                className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 shadow-lg glow-emerald hover:from-emerald-400 hover:to-emerald-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>APPLY NOW</span>
              </motion.button>
            </Link>

            {/* Menu Trigger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 rounded-full bg-white/5 border border-white/15 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center justify-center group"
              aria-label="Open Navigation Menu"
              data-cursor="button"
            >
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Interactive Menu */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default Navbar
