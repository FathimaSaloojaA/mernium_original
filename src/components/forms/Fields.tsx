import { useId, type ReactNode, type RefObject } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, RotateCcw } from 'lucide-react'
import type { FieldSpec } from '../../lib/enquiry'

interface FieldProps {
  name: string
  spec: FieldSpec
  value: string
  error?: string
  disabled?: boolean
  onChange: (value: string) => void
  onBlur: () => void
  inputRef: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => void
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel'
  rows?: number
  selectPlaceholder?: string
}

/** Labelled input / textarea / select with an inline, screen-reader-linked error. */
export function FormField({
  name,
  spec,
  value,
  error,
  disabled,
  onChange,
  onBlur,
  inputRef,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  inputMode,
  rows = 4,
  selectPlaceholder = 'Select an option…',
}: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const countId = `${id}-count`
  const describedBy = [error ? errorId : null, spec.multiline ? countId : null].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name,
    value,
    disabled,
    'aria-invalid': error ? true : undefined,
    'aria-required': spec.required || undefined,
    'aria-describedby': describedBy,
    onBlur,
    className: 'mn-field',
  }

  return (
    <div className="space-y-2 font-mono text-xs">
      <label htmlFor={id} className="mn-label uppercase tracking-wider">
        {label}
        {spec.required ? ' *' : <span className="normal-case tracking-normal opacity-70"> (optional)</span>}
      </label>

      {spec.kind === 'select' ? (
        <select {...common} ref={inputRef} onChange={(e) => onChange(e.target.value)}>
          <option value="">{selectPlaceholder}</option>
          {spec.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : spec.multiline ? (
        <textarea
          {...common}
          ref={inputRef}
          rows={rows}
          maxLength={spec.max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          {...common}
          ref={inputRef}
          type={type}
          maxLength={spec.max}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      <div className="flex min-h-[1rem] items-start justify-between gap-3">
        {error ? (
          <p id={errorId} className="mn-error flex items-start gap-1.5 font-sans text-xs leading-snug">
            <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : (
          <span />
        )}
        {spec.multiline && (
          <span id={countId} className={`shrink-0 tabular-nums ${value.length > spec.max * 0.9 ? 'mn-error' : 'text-[#567B81]'}`}>
            {value.length}/{spec.max}
          </span>
        )}
      </div>
    </div>
  )
}

/** Hidden from people and assistive tech; bots that fill every input reveal themselves. */
export function Honeypot({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input ref={inputRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

export function SubmitButton({ submitting, children, icon }: { submitting: boolean; children: ReactNode; icon: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      aria-disabled={submitting}
      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#59ACB7] via-[#71D5D9] to-teal-500 text-black font-syne font-bold text-base uppercase tracking-wider shadow-xl glow-emerald flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all disabled:cursor-wait disabled:opacity-80 disabled:hover:scale-100"
      data-cursor="button"
    >
      {submitting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          <span>SENDING…</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon}
        </>
      )}
    </button>
  )
}

/** Form-level status message (submission failures, rate limits). */
export function FormAlert({ message }: { message: string | null }) {
  return (
    <div role="alert" aria-live="assertive">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border px-4 py-3 font-sans text-sm"
          style={{ borderColor: 'color-mix(in srgb, var(--field-error) 40%, transparent)', background: 'var(--field-error-bg)' }}
        >
          <RotateCcw className="mn-error mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="mn-error leading-relaxed">{message}</p>
        </motion.div>
      )}
    </div>
  )
}

export function SuccessPanel({
  title,
  message,
  note,
  onReset,
  resetLabel,
}: {
  title: string
  message: string
  note?: string
  onReset: () => void
  resetLabel: string
}) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      tabIndex={-1}
      ref={(el) => el?.focus()}
      className="glass-card rounded-3xl p-10 sm:p-12 border border-[#59ACB7]/40 bg-gradient-to-br from-[#59ACB7]/10 to-[#567B81]/5 text-center space-y-4 shadow-2xl glow-emerald outline-none"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <CheckCircle2 className="w-16 h-16 text-[#71D5D9] mx-auto" aria-hidden="true" />
      <h2 className="text-3xl font-syne font-bold text-white">{title}</h2>
      <p className="text-gray-300 text-sm sm:text-base font-sans max-w-lg mx-auto leading-relaxed">{message}</p>
      {note && <p className="text-[#567B81] text-xs font-mono max-w-lg mx-auto">{note}</p>}
      <button
        type="button"
        onClick={onReset}
        className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#59ACB7]/40 px-5 py-2 font-mono text-xs uppercase tracking-widest text-[#71D5D9] hover:border-[#71D5D9] transition-colors"
        data-cursor="button"
      >
        {resetLabel}
      </button>
    </motion.div>
  )
}
