import { ENQUIRY_INBOX, FORMS, optionLabel, type FieldSpec, type FormKind } from '../../src/lib/enquiry.js'

// All student-supplied text is untrusted: escape it for HTML bodies.
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const INK = '#0A1319'
const TEAL = '#11586B'
const ACCENT = '#59ACB7'
const PALE = '#BDEAEB'

function formatTimestamp(date: Date) {
  const ist = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(date)
  return { ist, iso: date.toISOString() }
}

function shell(title: string, body: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#EEF6F6;font-family:Arial,Helvetica,sans-serif;color:${INK};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF6F6;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #D5ECEC;">
<tr><td style="background:${INK};padding:22px 28px;">
<span style="font-size:20px;font-weight:800;letter-spacing:2px;color:${PALE};">MERNIUM</span>
<span style="display:block;font-size:11px;letter-spacing:2px;color:${ACCENT};margin-top:4px;">INSTITUTION 3.0</span>
</td></tr>
<tr><td style="padding:28px;font-size:15px;line-height:1.6;">${body}</td></tr>
<tr><td style="padding:16px 28px;background:#F4FAFA;font-size:12px;color:#567B81;">MERNIUM · <a href="mailto:${ENQUIRY_INBOX}" style="color:${TEAL};">${ENQUIRY_INBOX}</a></td></tr>
</table>
</td></tr></table>
</body></html>`
}

/** Internal notification sent to the MERNIUM inbox. */
export function internalEmail(kind: FormKind, values: Record<string, string>, receivedAt: Date) {
  const form = FORMS[kind]
  const specs = form.fields as Record<string, FieldSpec>
  const { ist, iso } = formatTimestamp(receivedAt)
  const rows = Object.entries(specs).map(([name, spec]) => {
    const raw = values[name] ?? ''
    const shown = raw ? (spec.kind === 'select' ? optionLabel(spec, raw) : raw) : '—'
    return { label: spec.label, value: shown, multiline: !!spec.multiline }
  })
  rows.push({ label: 'Form', value: form.title, multiline: false }, { label: 'Submitted', value: `${ist} (${iso})`, multiline: false })

  const subject = `New Student Enquiry — MERNIUM (${form.title})`
  const text = [
    `New ${form.title.toLowerCase()} received via the MERNIUM website.`,
    '',
    ...rows.map((r) => (r.multiline ? `${r.label}:\n${r.value}\n` : `${r.label}: ${r.value}`)),
    '',
    'Reply to this email to respond directly to the student.',
  ].join('\n')

  const html = shell(
    subject,
    `<h1 style="margin:0 0 6px;font-size:20px;color:${INK};">New ${escapeHtml(form.title)}</h1>
<p style="margin:0 0 20px;color:#567B81;font-size:13px;">Received via the MERNIUM website. Reply to this email to respond directly to the student.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${rows
  .map(
    (r) => `<tr><td style="padding:10px 0;border-top:1px solid #E3F0F0;">
<div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${ACCENT};font-weight:700;">${escapeHtml(r.label)}</div>
<div style="margin-top:4px;color:${INK};white-space:pre-wrap;word-break:break-word;">${escapeHtml(r.value)}</div></td></tr>`,
  )
  .join('\n')}
</table>`,
  )
  return { subject, text, html }
}

/** Acknowledgement sent to the student (copy approved by MERNIUM). */
export function acknowledgementEmail(name: string) {
  const subject = 'Thank you for contacting MERNIUM'
  const text = `Hi ${name},

Thank you for reaching out to MERNIUM!

We have received your enquiry successfully. Our team will review your message and get in touch with you shortly.

We appreciate your interest in learning with us and look forward to connecting with you.

Best regards,
MERNIUM Team
${ENQUIRY_INBOX}`

  const html = shell(
    subject,
    `<p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 16px;font-weight:700;color:${TEAL};">Thank you for reaching out to MERNIUM!</p>
<p style="margin:0 0 16px;">We have received your enquiry successfully. Our team will review your message and get in touch with you shortly.</p>
<p style="margin:0 0 24px;">We appreciate your interest in learning with us and look forward to connecting with you.</p>
<p style="margin:0;">Best regards,<br><strong>MERNIUM Team</strong><br><a href="mailto:${ENQUIRY_INBOX}" style="color:${TEAL};">${ENQUIRY_INBOX}</a></p>`,
  )
  return { subject, text, html }
}
