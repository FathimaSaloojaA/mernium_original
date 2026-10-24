import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Instagram, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-black/90 backdrop-blur-xl border-t border-[#59ACB7]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gradient-emerald-gold mb-4">
              MERNIUM
            </h3>
            <p className="text-gray-400 mb-4">
              An interview-first, confidence-driven MERN Stack institution creating fearless developers.
            </p>
            <p className="text-[#71D5D9] font-semibold">
              No certificates. Only readiness.
            </p>
          </motion.div>

          {/* MERNMADE Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold text-white mb-4">MERNMADE</h4>
            <p className="text-gray-400 mb-4">
              A readiness badge earned when you become interview-ready. Not a certificate. Not time-based.
            </p>
            <Link
              to="/mernmade"
              className="text-[#71D5D9] hover:text-[#BDEAEB] transition-colors inline-flex items-center"
            >
              Learn more →
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#71D5D9] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-[#71D5D9] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-[#71D5D9] transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-400 hover:text-[#71D5D9] transition-colors">
                  Apply
                </Link>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#71D5D9] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:contact@mernium.com"
                className="text-gray-400 hover:text-[#71D5D9] transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://instagram.com/mernium"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#71D5D9] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-[#71D5D9] transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-[#59ACB7]/20 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>
            © {currentYear} MERNIUM. All rights reserved. Made with MERNMADE philosophy.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
