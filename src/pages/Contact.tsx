import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, Instagram, ArrowRight, Terminal } from 'lucide-react'

const Contact = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[45vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs uppercase tracking-widest"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>GLOBAL COMMAND CENTER</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            CONNECT WITH <span className="text-gradient-emerald-gold">MERNIUM</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have questions about cohort dates, readiness evaluation, or application status? Reach out to our command team directly.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MessageCircle,
              title: 'WhatsApp Direct',
              description: 'Instant chat with admissions leads',
              link: 'https://wa.me/919000000000',
              action: 'Open WhatsApp',
            },
            {
              icon: Mail,
              title: 'Official Email',
              description: 'Send inquiries & application audits',
              link: 'mailto:admissions@mernium.edu',
              action: 'Send Email',
            },
            {
              icon: Phone,
              title: 'Phone Support',
              description: 'Direct call to admissions desk',
              link: 'tel:+919000000000',
              action: 'Call Now',
            },
            {
              icon: Instagram,
              title: 'Instagram Dispatch',
              description: 'Follow live cohort updates & student projects',
              link: 'https://instagram.com/mernium',
              action: 'Follow Feed',
            },
          ].map((contact, index) => {
            const IconComp = contact.icon
            return (
              <motion.a
                key={contact.title}
                href={contact.link}
                target={contact.link.startsWith('http') ? '_blank' : undefined}
                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-card rounded-3xl p-8 border border-white/10 glass-card-hover space-y-6 block group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-cursor="button"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComp className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-syne font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-sans">{contact.description}</p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 group-hover:gap-3 transition-all pt-2">
                  <span className="font-bold">{contact.action}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Contact
