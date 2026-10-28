import { useCallback, useRef, useState, type FormEvent } from 'react'
import {
  ENQUIRY_INBOX,
  FORMS,
  validateField,
  validateForm,
  type EnquiryRequest,
  type EnquiryResponse,
  type FieldErrors,
  type FieldSpec,
  type FormKind,
} from '../../lib/enquiry'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const NETWORK_MESSAGE = `We couldn't reach our server. Your details are still here — please check your connection and try again, or email us at ${ENQUIRY_INBOX}.`

const newSubmissionId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`

/**
 * State and behaviour for an enquiry form: validates on blur and on submit
 * (never while someone is first typing), clears errors as fields are fixed,
 * focuses the first invalid field, and posts to /api/enquiry exactly once
 * per submission.
 */
export function useEnquiryForm(kind: FormKind) {
  const specs = FORMS[kind].fields as Record<string, FieldSpec>
  const names = Object.keys(specs)
  const empty = () => Object.fromEntries(names.map((n) => [n, ''])) as Record<string, string>

  const [values, setValues] = useState<Record<string, string>>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [formError, setFormError] = useState<string | null>(null)
  const [acknowledged, setAcknowledged] = useState(true)

  const startedAt = useRef(Date.now())
  const submissionId = useRef(newSubmissionId())
  const inFlight = useRef(false)
  const honeypot = useRef<HTMLInputElement>(null)
  const elements = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>>({})

  const setError = (name: string, message: string | undefined) =>
    setErrors((prev) => {
      if (prev[name] === message) return prev
      const next = { ...prev }
      if (message) next[name] = message
      else delete next[name]
      return next
    })

  const focusFirst = (errs: FieldErrors) => {
    const first = names.find((n) => errs[n])
    if (first) elements.current[first]?.focus()
  }

  const onChange = useCallback(
    (name: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }))
      // Once a field has been visited, keep its message in sync as it is corrected.
      if (touched[name] || errors[name]) setError(name, validateField(specs[name], value))
      // Edited data after a failed attempt is a new submission.
      if (status === 'error') submissionId.current = newSubmissionId()
    },
    [touched, errors, specs, status],
  )

  const onBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }))
      setError(name, validateField(specs[name], values[name]))
    },
    [specs, values],
  )

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (inFlight.current) return

    const result = validateForm(kind, values)
    setTouched(Object.fromEntries(names.map((n) => [n, true])))
    setErrors(result.errors)
    if (!result.ok) {
      setFormError(null)
      focusFirst(result.errors)
      return
    }

    inFlight.current = true
    setStatus('submitting')
    setFormError(null)

    const payload: EnquiryRequest = {
      form: kind,
      values: result.values,
      submissionId: submissionId.current,
      startedAt: startedAt.current,
      website: honeypot.current?.value ?? '',
    }
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 25_000)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      const data = (await response.json().catch(() => null)) as EnquiryResponse | null

      if (response.ok && data?.ok) {
        setAcknowledged(data.acknowledged)
        setStatus('success')
        return
      }
      if (data && !data.ok && data.code === 'invalid') {
        setErrors(data.errors)
        focusFirst(data.errors)
      }
      setFormError(data && !data.ok ? data.message : NETWORK_MESSAGE)
      setStatus('error')
    } catch {
      // Uncertain outcome: keep the same submission id so a retry cannot duplicate it.
      setFormError(NETWORK_MESSAGE)
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      inFlight.current = false
    }
  }

  const reset = () => {
    setValues(empty())
    setErrors({})
    setTouched({})
    setFormError(null)
    setStatus('idle')
    startedAt.current = Date.now()
    submissionId.current = newSubmissionId()
  }

  /** Props for one field: value, handlers, ref and its validation state. */
  const field = (name: string) => ({
    name,
    spec: specs[name],
    value: values[name],
    error: errors[name],
    disabled: status === 'submitting',
    onChange: (value: string) => onChange(name, value),
    onBlur: () => onBlur(name),
    inputRef: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => {
      elements.current[name] = el
    },
  })

  return { field, onSubmit, status, formError, acknowledged, reset, honeypot, submitting: status === 'submitting' }
}
