import {
  ENQUIRY_INBOX,
  FORMS,
  MAX_BODY_BYTES,
  MIN_FILL_MS,
  validateForm,
  type EnquiryResponse,
  type FormKind,
} from '../src/lib/enquiry.js'
import { clientKey, hasSubmission, once, rateLimit } from './_lib/guard.js'
import { getTransporter, readMailConfig } from './_lib/mailer.js'
import { acknowledgementEmail, internalEmail } from './_lib/templates.js'

// POST /api/enquiry — receives every website enquiry/application form,
// validates it again on the server, emails it to the MERNIUM inbox and
// sends the student an acknowledgement.

const RETRY_MESSAGE = `We couldn't send your enquiry right now. Your details are still here — please try again in a moment, or email us at ${ENQUIRY_INBOX}.`

function reply(status: number, body: EnquiryResponse, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  })
}

class DeliveryError extends Error {}

// Log only an error's technical code — never the student's data or credentials.
function logFailure(stage: string, error: unknown) {
  const e = error as { code?: string; responseCode?: number; command?: string }
  console.error(`[enquiry] ${stage} failed`, { code: e?.code, responseCode: e?.responseCode, command: e?.command })
}

export async function POST(request: Request): Promise<Response> {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply(415, { ok: false, code: 'bad_request', message: 'Unsupported request.' })
  }
  const declared = Number(request.headers.get('content-length') || 0)
  if (declared > MAX_BODY_BYTES) return reply(413, { ok: false, code: 'bad_request', message: 'Your submission is too large.' })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return reply(413, { ok: false, code: 'bad_request', message: 'Your submission is too large.' })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
  } catch {
    return reply(400, { ok: false, code: 'bad_request', message: 'Unsupported request.' })
  }

  const form = body.form as FormKind
  const submissionId = body.submissionId
  const values = body.values
  if (
    typeof form !== 'string' ||
    !Object.hasOwn(FORMS, form) ||
    typeof submissionId !== 'string' ||
    !/^[A-Za-z0-9-]{16,64}$/.test(submissionId) ||
    typeof values !== 'object' ||
    values === null ||
    Array.isArray(values)
  ) {
    return reply(400, { ok: false, code: 'bad_request', message: 'Unsupported request.' })
  }

  // Honeypot: bots fill every field. Accept silently so they learn nothing, but send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') return reply(200, { ok: true, acknowledged: false })

  const startedAt = Number(body.startedAt)
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return reply(400, { ok: false, code: 'bad_request', message: 'That was very quick — please review your details and submit again.' })
  }

  // Retries of a known submission skip the limiter; only new submissions count.
  if (!hasSubmission(submissionId)) {
    const wait = rateLimit(clientKey(request.headers))
    if (wait) {
      return reply(
        429,
        { ok: false, code: 'rate_limited', message: 'Too many submissions from your connection. Please wait a few minutes and try again.' },
        { 'retry-after': String(wait) },
      )
    }
  }

  const result = validateForm(form, values as Record<string, unknown>)
  if (!result.ok) return reply(400, { ok: false, code: 'invalid', errors: result.errors, message: 'Please fix the highlighted fields.' })

  const config = readMailConfig()
  if (!config) {
    console.error('[enquiry] email delivery is not configured (missing SMTP_* / MAIL_FROM)')
    return reply(503, { ok: false, code: 'unavailable', message: RETRY_MESSAGE })
  }

  try {
    const outcome = await once(submissionId, async () => {
      const transporter = getTransporter(config)
      const student = result.values as Record<string, string>
      const receivedAt = new Date()

      const notification = internalEmail(form, student, receivedAt)
      try {
        await transporter.sendMail({
          from: config.from,
          to: ENQUIRY_INBOX,
          replyTo: { name: student.name, address: student.email },
          subject: notification.subject,
          text: notification.text,
          html: notification.html,
        })
      } catch (error) {
        logFailure('notification', error)
        throw new DeliveryError()
      }

      // The enquiry has reached MERNIUM at this point; an acknowledgement failure
      // must not make the student resend it (which would duplicate the enquiry).
      const ack = acknowledgementEmail(student.name)
      try {
        await transporter.sendMail({
          from: config.from,
          to: { name: student.name, address: student.email },
          replyTo: ENQUIRY_INBOX,
          subject: ack.subject,
          text: ack.text,
          html: ack.html,
        })
        return { acknowledged: true }
      } catch (error) {
        logFailure('acknowledgement', error)
        return { acknowledged: false }
      }
    })
    return reply(200, { ok: true, acknowledged: outcome.acknowledged })
  } catch (error) {
    if (!(error instanceof DeliveryError)) logFailure('processing', error)
    return reply(502, { ok: false, code: 'failed', message: RETRY_MESSAGE })
  }
}
