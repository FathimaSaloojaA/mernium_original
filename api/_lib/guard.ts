// Best-effort abuse protection for a public form on serverless.
// State lives in module scope, so it is shared by requests that hit
// the same warm instance. It is a first line of defence, not a
// guarantee across every instance (see .env.example for notes).

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

/** Sliding-window limit per client key. Returns seconds to wait, or 0 if allowed. */
export function rateLimit(key: string, now = Date.now()): number {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return Math.ceil((WINDOW_MS - (now - recent[0])) / 1000)
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5_000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  }
  return 0
}

const DEDUPE_MS = 24 * 60 * 60 * 1000
const processed = new Map<string, { at: number; result: Promise<unknown> }>()

/**
 * Runs `task` once per submission id. A retry with the same id (double click,
 * or a resend after an uncertain network failure) gets the original result
 * instead of sending the enquiry again. Failed attempts are forgotten so the
 * student can retry for real.
 */
export function once<T>(id: string, task: () => Promise<T>, now = Date.now()): Promise<T> {
  for (const [k, v] of processed) if (now - v.at > DEDUPE_MS) processed.delete(k)
  const existing = processed.get(id)
  if (existing) return existing.result as Promise<T>
  const result = task()
  processed.set(id, { at: now, result })
  result.catch(() => processed.delete(id))
  return result
}

/** True if this submission id is already being processed or was delivered. */
export function hasSubmission(id: string) {
  return processed.has(id)
}

/** Client IP from the platform proxy headers. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || headers.get('x-real-ip') || 'unknown'
}
