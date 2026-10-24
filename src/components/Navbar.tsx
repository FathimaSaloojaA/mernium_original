import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/mernmade', label: 'MERNMADE' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/courses', label: 'Courses' },
    { path: '/batches', label: 'Batches' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-[#59ACB7]/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              className="text-2xl font-bold text-gradient-emerald-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MERNIUM
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <span className={`transition-colors ${isActive ? 'text-[#71D5D9]' : 'text-gray-300 hover:text-[#71D5D9]'}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#71D5D9] to-gold-400"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
            <Link to="/apply">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-[#59ACB7] to-[#59ACB7] text-white rounded-full font-semibold glow-emerald hover:from-[#71D5D9] hover:to-[#59ACB7] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-4 bg-black/95 backdrop-blur-xl border-t border-[#59ACB7]/20">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-gray-300 hover:text-[#71D5D9] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/apply" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full px-6 py-2 bg-gradient-to-r from-[#59ACB7] to-[#59ACB7] text-white rounded-full font-semibold glow-emerald">
              Apply Now
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
