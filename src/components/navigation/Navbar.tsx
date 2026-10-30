import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Zap } from 'lucide-react'
import { FullscreenMenu } from './FullscreenMenu'
import { BrandMark } from '../brand/BrandMark'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    // Return focus to the toggle so keyboard users keep their place.
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }, [])

  // Any navigation (links, back/forward) closes the menu.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

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
            ? 'py-3 glass-nav border-b border-[#BDEAEB]/10 shadow-2xl shadow-[#0A1319]/40'
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group"
            data-cursor="pointer"
          >
            <BrandMark size={40} className="group-hover:scale-110 transition-transform" />
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-syne font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#BDEAEB] transition-colors">
                MERNIUM
              </span>
              <span className="font-mono text-[9px] text-[#567B81] tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#71D5D9] inline-block animate-pulse" />
                INSTITUTION 3.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 glass-card px-6 py-2 rounded-full border border-[#BDEAEB]/15">
            {quickNav.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-[#71D5D9] font-bold bg-[#59ACB7]/10 border border-[#59ACB7]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full border border-[#71D5D9]/40"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action CTAs & Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Admission CTA Button */}
            {/* Hidden below 360px (Apply stays in the menu and hero); icon-only until 400px. */}
            <Link to="/apply" data-cursor="button" tabIndex={-1} className="hidden min-[360px]:block">
              <motion.button
                aria-label="Apply now"
                className="relative group overflow-hidden min-h-[44px] min-w-[44px] justify-center px-0 min-[400px]:px-3.5 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#59ACB7] to-[#11586B] text-white font-mono text-xs font-bold tracking-wider uppercase whitespace-nowrap flex items-center gap-2 shadow-lg glow-teal hover:from-[#71D5D9] hover:to-[#59ACB7] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-3.5 h-3.5 shrink-0 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                <span className="hidden min-[400px]:inline" aria-hidden="true">
                  APPLY<span className="hidden sm:inline"> NOW</span>
                </span>
              </motion.button>
            </Link>

            {/* Menu Trigger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="w-11 h-11 shrink-0 rounded-full bg-[#11586B]/20 border border-[#BDEAEB]/15 text-white hover:bg-[#59ACB7]/20 hover:border-[#59ACB7]/50 hover:text-[#71D5D9] transition-all flex items-center justify-center group"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              data-cursor="button"
            >
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Interactive Menu */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

export default Navbar