// ─────────────────────────────────────────────────────────────
// Enquiry form schema + validation, shared by the browser forms
// and the /api/enquiry serverless function so both sides apply
// exactly the same rules. No DOM or Node APIs in this file.
// ─────────────────────────────────────────────────────────────

export const ENQUIRY_INBOX = 'mernium.learn@gmail.com'

export type FieldKind = 'name' | 'email' | 'phone' | 'select' | 'text'

export interface FieldSpec {
  label: string
  kind: FieldKind
  required: boolean
  max: number
  /** Minimum length after trimming (text fields only). */
  min?: number
  multiline?: boolean
  options?: { value: string; label: string }[]
}

export const BATCH_OPTIONS = [
  { value: 'cohort-06', label: 'Cohort 06 — May 1, 2026 (Weekday)' },
  { value: 'cohort-07', label: 'Cohort 07 — June 15, 2026 (Weekend)' },
]

export const INTEREST_OPTIONS = [
  { value: 'full-stack', label: 'Full-Stack MERN Program' },
  { value: 'interview', label: 'Interview Training' },
  { value: 'communication', label: 'Communication Training' },
  { value: 'batches', label: 'Batches & Admissions' },
  { value: 'other', label: 'Something else' },
]

export const FORMS = {
  application: {
    title: 'Admission Application',
    fields: {
      name: { label: 'Full name', kind: 'name', required: true, max: 80 },
      email: { label: 'Email address', kind: 'email', required: true, max: 254 },
      phone: { label: 'Phone number', kind: 'phone', required: true, max: 20 },
      batch: { label: 'Preferred batch', kind: 'select', required: true, max: 40, options: BATCH_OPTIONS },
      background: { label: 'Coding background', kind: 'text', required: true, min: 20, max: 1500, multiline: true },
      motivation: { label: 'Why become a Mernian', kind: 'text', required: true, min: 20, max: 1500, multiline: true },
    },
  },
  contact: {
    title: 'Contact Enquiry',
    fields: {
      name: { label: 'Full name', kind: 'name', required: true, max: 80 },
      email: { label: 'Email address', kind: 'email', required: true, max: 254 },
      phone: { label: 'Phone number', kind: 'phone', required: false, max: 20 },
      interest: { label: 'Program of interest', kind: 'select', required: true, max: 40, options: INTEREST_OPTIONS },
      message: { label: 'Your enquiry', kind: 'text', required: true, min: 15, max: 2000, multiline: true },
    },
  },
} as const satisfies Record<string, { title: string; fields: Record<string, FieldSpec> }>

export type FormKind = keyof typeof FORMS
export type FormValues<K extends FormKind> = Record<keyof (typeof FORMS)[K]['fields'] & string, string>
export type FieldErrors = Partial<Record<string, string>>

// Single-line fields must not carry control characters (blocks header-injection payloads).
const CONTROL_SINGLE = /[\u0000-\u001f\u007f]/
// Multi-line fields may keep newlines and tabs only.
const CONTROL_MULTI = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g

const EMAIL = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/
const NAME = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u
const PHONE = /^\+?[0-9\s().-]+$/

/** Trim and normalise a raw value the same way on client and server. */
export function normalize(spec: FieldSpec, raw: unknown): string {
  if (typeof raw !== 'string') return ''
  const trimmed = raw.trim()
  if (spec.multiline) return trimmed.replace(/\r\n?/g, '\n').replace(CONTROL_MULTI, '').replace(/\n{4,}/g, '\n\n\n')
  if (spec.kind === 'email') return trimmed.toLowerCase()
  return trimmed.replace(/\s+/g, ' ')
}

/** Returns an error message for one field, or undefined when it is valid. */
export function validateField(spec: FieldSpec, raw: unknown): string | undefined {
  // Length is checked on the raw input too, so oversized payloads are rejected before normalising.
  if (typeof raw === 'string' && raw.length > spec.max * 2 + 100) return `${spec.label} is too long.`
  const value = normalize(spec, raw)

  if (!value) {
    if (!spec.required) return undefined
    return spec.kind === 'select' ? `Please choose your ${spec.label.toLowerCase()}.` : `${spec.label} is required.`
  }
  if (value.length > spec.max) return `${spec.label} must be ${spec.max} characters or fewer.`
  if (!spec.multiline && typeof raw === 'string' && CONTROL_SINGLE.test(raw.trim())) return `${spec.label} contains invalid characters.`

  switch (spec.kind) {
    case 'name':
      if (value.length < 2) return 'Please enter your full name.'
      if (!NAME.test(value)) return 'Names can only contain letters, spaces, apostrophes, hyphens and full stops.'
      return undefined
    case 'email': {
      const [local = '', domain = ''] = value.split('@')
      if (!EMAIL.test(value) || local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..') || !/\.[a-z]{2,}$/i.test(domain)) {
        return 'Please enter a valid email address, like name@example.com.'
      }
      return undefined
    }
    case 'phone': {
      const digits = value.replace(/\D/g, '')
      if (!PHONE.test(value) || value.indexOf('+') > 0) return 'Phone numbers can only contain digits, spaces, +, -, ( and ).'
      if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number with 7–15 digits.'
      return undefined
    }
    case 'select':
      if (!spec.options?.some((o) => o.value === value)) return `Please choose your ${spec.label.toLowerCase()}.`
      return undefined
    case 'text': {
      const meaningful = value.replace(/[^\p{L}\p{N}]/gu, '')
      if (spec.min && value.length < spec.min) return `Please write at least ${spec.min} characters so we can help properly.`
      if (meaningful.length < Math.min(spec.min ?? 1, 10)) return 'Please describe this in your own words.'
      return undefined
    }
  }
}

/** Validates every field of a form. `values` contains the normalised data when ok. */
export function validateForm<K extends FormKind>(kind: K, input: Record<string, unknown>) {
  const fields = FORMS[kind].fields as Record<string, FieldSpec>
  const errors: FieldErrors = {}
  const values: Record<string, string> = {}
  for (const [name, spec] of Object.entries(fields)) {
    const error = validateField(spec, input[name])
    if (error) errors[name] = error
    else values[name] = normalize(spec, input[name])
  }
  const ok = Object.keys(errors).length === 0
  return { ok, errors, values: values as FormValues<K> }
}

export function optionLabel(spec: FieldSpec, value: string) {
  return spec.options?.find((o) => o.value === value)?.label ?? value
}

// ─── Request contract between the forms and /api/enquiry ────

export interface EnquiryRequest {
  form: FormKind
  values: Record<string, string>
  /** Client-generated id, reused across retries so a resend is not delivered twice. */
  submissionId: string
  /** Epoch ms when the form was first shown (bot timing check). */
  startedAt: number
  /** Honeypot: real users never fill this. */
  website: string
}

export type EnquiryResponse =
  | { ok: true; acknowledged: boolean }
  | { ok: false; code: 'invalid'; errors: FieldErrors; message: string }
  | { ok: false; code: 'rate_limited' | 'unavailable' | 'failed' | 'bad_request'; message: string }

export const MAX_BODY_BYTES = 12_000
export const MIN_FILL_MS = 3_000
