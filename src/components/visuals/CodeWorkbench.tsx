import { motion } from 'framer-motion'
import { Check, CircleHelp, Sparkles, TerminalSquare } from 'lucide-react'
import { VizFrame, rise, useReveal } from './primitives'

type Token = [string, 'kw' | 'fn' | 'str' | 'txt' | 'dim']

const TOKEN_CLASS: Record<Token[1], string> = {
  kw: 'viz-ink-accent',
  fn: 'viz-ink',
  str: 'viz-ink-mid',
  txt: 'viz-ink opacity-80',
  dim: 'viz-ink-dim',
}

const WRITTEN: Token[][] = [
  [['router', 'fn'], ['.get(', 'txt'], ["'/courses/:id'", 'str'], [', requireAuth, ', 'txt'], ['async', 'kw'], [' (req, res) => {', 'txt']],
  [['  const', 'kw'], [' course = ', 'txt'], ['await', 'kw'], [' Course.', 'txt'], ['findById', 'fn'], ['(req.params.id).', 'txt'], ['lean', 'fn'], ['()', 'txt']],
  [['  if', 'kw'], [' (!course) ', 'txt'], ['return', 'kw'], [' res.', 'txt'], ['status', 'fn'], ['(404).', 'txt'], ['json', 'fn'], ['({ error: ', 'txt'], ["'Not found'", 'str'], [' })', 'txt']],
]

const SUGGESTED: Token[][] = [
  [['  res.', 'txt'], ['set', 'fn'], ['(', 'txt'], ["'Cache-Control'", 'str'], [', ', 'txt'], ["'private, max-age=60'", 'str'], [')', 'txt']],
  [['  return', 'kw'], [' res.', 'txt'], ['json', 'fn'], ['(course)', 'txt']],
]

const REVIEW = [
  { text: 'Auth middleware applied', ok: true },
  { text: 'Missing record returns 404', ok: true },
  { text: 'Validate :id as an ObjectId?', ok: false },
]

function Line({ n, tokens }: { n: number; tokens: Token[] }) {
  return (
    <div className="flex gap-4">
      <span className="viz-ink-dim w-5 shrink-0 select-none text-right">{n}</span>
      <span className="min-w-0 whitespace-pre-wrap break-words">
        {tokens.map(([t, k], i) => (
          <span key={i} className={TOKEN_CLASS[k]}>
            {t}
          </span>
        ))}
      </span>
    </div>
  )
}

// AI-assisted coding, the way it is practised here: the assistant proposes,
// the engineer reviews, tests and decides.
export function CodeWorkbench() {
  const { root } = useReveal()
  return (
    <VizFrame label="AI-ASSISTED WORKFLOW // HUMAN IN CONTROL" caption="Use AI to move faster — then prove you understand every line it suggests.">
      <motion.div {...root} className="viz-card overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-[rgb(var(--viz-text)/0.1)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#567B81]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#59ACB7]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#71D5D9]/60" />
          <span className="viz-ink-dim ml-3 font-mono text-[11px]">routes/courses.ts</span>
        </div>

        <div className="grid md:grid-cols-[1.7fr_1fr]">
          <div className="space-y-1.5 p-4 font-mono text-[11px] leading-relaxed sm:p-6 sm:text-[13px]">
            {WRITTEN.map((tokens, i) => (
              <Line key={i} n={i + 1} tokens={tokens} />
            ))}
            {SUGGESTED.map((tokens, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: [0, 0.45, 0.45, 1],
                    transition: { duration: 2.2, times: [0, 0.2, 0.75, 1], delay: 0.8 + i * 0.15 },
                  },
                }}
              >
                <Line n={WRITTEN.length + i + 1} tokens={tokens} />
              </motion.div>
            ))}
            <Line n={WRITTEN.length + SUGGESTED.length + 1} tokens={[['})', 'txt']]} />
            <motion.div variants={rise(0.9)} className="flex items-center gap-2 pl-9 pt-2">
              <span className="viz-chip inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] tracking-wider">
                <Sparkles className="viz-ink-accent h-3 w-3" /> SUGGESTION · TAB TO ACCEPT
              </span>
            </motion.div>
          </div>

          <div className="space-y-3 border-t border-[rgb(var(--viz-text)/0.1)] p-4 sm:p-6 md:border-l md:border-t-0">
            <p className="viz-ink-accent font-mono text-[10px] uppercase tracking-[0.25em]">Your review</p>
            {REVIEW.map((r, i) => (
              <motion.div key={r.text} variants={rise(2.4 + i * 0.3)} className="flex items-start gap-2.5 font-sans text-sm">
                {r.ok ? (
                  <Check className="viz-ink-accent mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <CircleHelp className="viz-ink-mid mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span className={r.ok ? 'viz-ink' : 'viz-ink-mid'}>{r.text}</span>
              </motion.div>
            ))}
            <motion.div variants={rise(3.4)} className="viz-chip mt-4 flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px]">
              <TerminalSquare className="viz-ink-accent h-4 w-4" />
              <span className="viz-ink-dim">$ npm test</span>
              <span className="viz-ink-accent">✓ passing</span>
              <span className="viz-caret viz-ink-accent">▍</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </VizFrame>
  )
}
