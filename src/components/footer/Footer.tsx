import { Link } from 'react-router-dom'
import { Terminal, Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-[#030305] border-t border-white/10 text-white relative z-10 overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 flex items-center justify-center font-syne font-extrabold text-xl text-emerald-400">
                M
              </div>
              <span className="font-syne font-extrabold text-2xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                MERNIUM
              </span>
            </Link>

            <p className="text-gray-400 text-sm font-sans max-w-sm leading-relaxed">
              The premium, interview-first MERN Stack tech institution. Building fearless software engineers through production code, system design, and mock interview drills.
            </p>

            <div className="flex items-center space-x-3 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GLOBAL ADMISSIONS OPEN FOR 2026</span>
            </div>
          </div>

          {/* Quick Routes Map */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              SYSTEM MAP
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-mono text-gray-300">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Experience</Link>
              <Link to="/about" className="hover:text-emerald-400 transition-colors">Philosophy</Link>
              <Link to="/mernmade" className="hover:text-emerald-400 transition-colors">MERNMADE</Link>
              <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">Methodology</Link>
              <Link to="/courses" className="hover:text-emerald-400 transition-colors">Programs</Link>
              <Link to="/batches" className="hover:text-emerald-400 transition-colors">Batches</Link>
              <Link to="/students" className="hover:text-emerald-400 transition-colors">Builders</Link>
              <Link to="/teachers" className="hover:text-emerald-400 transition-colors">Faculty</Link>
              <Link to="/interview-training" className="hover:text-emerald-400 transition-colors">Interview Drill</Link>
              <Link to="/apply" className="hover:text-emerald-400 transition-colors">Apply Now</Link>
            </div>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              COMMAND CENTER
            </h4>
            <p className="text-xs font-mono text-gray-400">
              Direct Inquiries &amp; Admissions:
            </p>
            <a
              href="mailto:admissions@mernium.edu"
              className="inline-flex items-center space-x-2 text-sm font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>admissions@mernium.edu</span>
            </a>

            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} MERNIUM DIGITAL INSTITUTION. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gray-300 cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">TERMS OF READINESS</span>
            <span>•</span>
            <span className="text-emerald-400/80">3D ENGINE v3.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
