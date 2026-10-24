import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Terminal, Sparkles, X, ArrowRight } from 'lucide-react'
import { TechConstellation } from '../three/TechConstellation'

interface TechNode {
  id: string
  name: string
  category: string
  color: string
  position: [number, number, number]
  desc: string
}

export const TechEcosystemSection = () => {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>({
    id: 'react',
    name: 'React.js',
    category: 'Frontend Engine',
    color: '#61dafb',
    position: [-3, 1.8, 0],
    desc: 'Virtual DOM, Fiber reconciler, Concurrent Rendering, Custom Hooks architecture, and state management optimization.',
  })

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 font-mono text-xs text-[#567B81] bg-[#567B81]/10 px-4 py-1.5 rounded-full border border-[#567B81]/20"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>03 // INTERACTIVE 3D CONSTELLATION</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-syne font-extrabold text-white tracking-tight">
              TECHNOLOGY <span className="text-gradient-emerald-gold">ECOSYSTEM</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-mono max-w-md">
            Click any node in 3D space to inspect how MERNIUM teaches its internals, architecture, and technical interview questions.
          </p>
        </div>

        {/* 3D Canvas & Tech Drawer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D WebGL Constellation Canvas */}
          <div className="lg:col-span-8 glass-card rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
            <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-[#71D5D9] bg-black/60 px-3 py-1 rounded-full border border-[#59ACB7]/30 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#71D5D9]" />
              <span>3D TECH NODES</span>
            </div>

            <TechConstellation
              onSelectNode={(node) => setSelectedNode(node)}
              activeNodeId={selectedNode?.id || null}
            />
          </div>

          {/* Node Detail Card */}
          <div className="lg:col-span-4 h-full">
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl p-8 border border-[#59ACB7]/30 bg-gradient-to-br from-[#59ACB7]/10 via-transparent to-black space-y-6 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#71D5D9] uppercase tracking-widest bg-[#59ACB7]/20 px-3 py-1 rounded-full border border-[#59ACB7]/30">
                        {selectedNode.category}
                      </span>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <h3 className="text-3xl font-syne font-extrabold text-white flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: selectedNode.color }}
                      />
                      {selectedNode.name}
                    </h3>

                    <p className="text-gray-300 font-sans text-sm leading-relaxed">
                      {selectedNode.desc}
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[#71D5D9]" />
                        INTERVIEW QUESTION FOCUS:
                      </span>
                      <ul className="text-xs font-mono text-[#BDEAEB] space-y-2">
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-[#71D5D9]" />
                          Deep dive execution &amp; memory profiling
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-[#71D5D9]" />
                          High-scale performance optimizations
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-[#71D5D9]" />
                          Architectural tradeoffs &amp; design patterns
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="w-full py-3 rounded-xl bg-[#59ACB7]/20 hover:bg-[#59ACB7]/30 border border-[#59ACB7]/40 text-[#BDEAEB] font-mono text-xs font-bold uppercase tracking-wider transition-colors">
                      VIEW {selectedNode.name.toUpperCase()} CURRICULUM
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[350px] space-y-4">
                  <Terminal className="w-12 h-12 text-[#71D5D9]/50 animate-bounce" />
                  <p className="font-mono text-sm text-gray-400">
                    Click any 3D node inside the constellation canvas to inspect technology details.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechEcosystemSection
