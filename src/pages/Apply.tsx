import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Send, Terminal, Sparkles } from 'lucide-react'
import { useEnquiryForm } from '../components/forms/useEnquiryForm'
import { FormAlert, FormField, Honeypot, SubmitButton, SuccessPanel } from '../components/forms/Fields'

const Apply = () => {
  const form = useEnquiryForm('application')

  return (
    <div className="relative pt-28 pb-20">
      {/* Hero Section */}
      <section className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="w-full min-w-0 max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#59ACB7]/10 border border-[#59ACB7]/30 rounded-full text-[#71D5D9] font-mono text-xs uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-[#71D5D9]" />
            <span>OFFICIAL ADMISSION PORTAL</span>
          </motion.div>

          <motion.h1
            className="text-page-title font-syne font-extrabold tracking-tight text-white uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            APPLY AS A <span className="text-gradient-emerald-gold">MERNIAN</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 font-sans max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Start your transformation into a fearless, interview-ready software engineer.
          </motion.p>
        </div>
      </section>

      {/* Warning Notice */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card rounded-3xl p-6 sm:p-8 border border-[#567B81]/30 bg-[#567B81]/5 flex items-start space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-6 h-6 text-[#567B81] shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="text-lg font-syne font-bold text-white">IMPORTANT DOCTRINE NOTICE</h3>
              <p className="text-gray-300 text-sm font-sans leading-relaxed">
                <strong className="text-[#567B81]">Not for shortcut seekers.</strong> This program requires intense dedication, daily production building, and a genuine drive for interview readiness. We do not sell certificates.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expectations List */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card rounded-3xl p-8 border border-white/10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#71D5D9]" />
              WHAT WE EXPECT FROM APPLICANTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans text-gray-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Daily live session attendance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Camera on for real speech evaluation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Daily production code commits</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#71D5D9] shrink-0" />
                <span>Commitment to zero-fear readiness</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {form.status === 'success' ? (
            <SuccessPanel
              title="APPLICATION RECEIVED!"
              message="Thank you for contacting MERNIUM! Your enquiry has been received. Our team will get in touch with you shortly."
              note={form.acknowledged ? 'A confirmation has been sent to your email address.' : 'Your confirmation email may take a little longer to arrive.'}
              onReset={form.reset}
              resetLabel="Submit another application"
            />
          ) : (
            <motion.form
              onSubmit={form.onSubmit}
              noValidate
              aria-busy={form.submitting}
              className="relative glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[min(1.875rem,calc((100vw-6rem)/10.3))] sm:text-3xl font-syne font-extrabold text-white">CANDIDATE ADMISSION FORM</h2>
              <Honeypot inputRef={form.honeypot} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField {...form.field('name')} label="FULL NAME" placeholder="John Doe" autoComplete="name" />
                <FormField {...form.field('email')} label="EMAIL ADDRESS" type="email" inputMode="email" placeholder="john@example.com" autoComplete="email" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField {...form.field('phone')} label="PHONE NUMBER" type="tel" inputMode="tel" placeholder="+91 98765 43210" autoComplete="tel" />
                <FormField {...form.field('batch')} label="PREFERRED BATCH" selectPlaceholder="Select a batch..." />
              </div>

              <FormField
                {...form.field('background')}
                label="YOUR CODING BACKGROUND"
                rows={3}
                placeholder="Describe your current tech stack, experience, and what you have built..."
              />

              <FormField
                {...form.field('motivation')}
                label="WHY DO YOU WANT TO BECOME A MERNIAN?"
                rows={3}
                placeholder="What is your main goal for taking technical interviews?"
              />

              <FormAlert message={form.formError} />

              <SubmitButton submitting={form.submitting} icon={<Send className="w-5 h-5" />}>
                SUBMIT ADMISSION APPLICATION
              </SubmitButton>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Apply
