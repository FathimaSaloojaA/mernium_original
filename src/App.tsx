import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { CursorProvider } from './components/cursor/CustomCursor'
import { SmoothScroll } from './components/scroll/SmoothScroll'
import { ScrollToTop } from './components/scroll/ScrollToTop'
import { PageTransition } from './components/transitions/PageTransition'
import Navbar from './components/navigation/Navbar'
import Footer from './components/footer/Footer'
import FloatingAssistant from './components/assistant/FloatingAssistant'

import Home from './pages/Home'
import About from './pages/About'
import Mernmade from './pages/Mernmade'
import HowItWorks from './pages/HowItWorks'
import InterviewTraining from './pages/InterviewTraining'
import CommunicationTraining from './pages/CommunicationTraining'
import Courses from './pages/Courses'
import Batches from './pages/Batches'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Apply from './pages/Apply'
import Contact from './pages/Contact'

function App() {
  return (
    // Honour prefers-reduced-motion for every framer-motion transform (fades still run).
    <MotionConfig reducedMotion="user">
      <Router>
        <CursorProvider>
          <SmoothScroll>
            <div className="relative min-h-screen bg-[#0A1319] text-[#F4F4F6]">
              <ScrollToTop />
              <Navbar />
              <main className="relative z-10">
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mernmade" element={<Mernmade />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/interview-training" element={<InterviewTraining />} />
                    <Route path="/communication-training" element={<CommunicationTraining />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/batches" element={<Batches />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </PageTransition>
              </main>
              <Footer />
              <FloatingAssistant />
            </div>
          </SmoothScroll>
        </CursorProvider>
      </Router>
    </MotionConfig>
  )
}

export default App
