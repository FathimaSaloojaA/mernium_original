import nodemailer, { type Transporter } from 'nodemailer'

// SMTP settings come only from server-side environment variables.
// See .env.example for what each one means.
interface MailConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  from: string
}

export function readMailConfig(env = process.env): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM } = env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) return null
  const port = Number(SMTP_PORT || 465)
  if (!Number.isInteger(port) || port <= 0) return null
  return {
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM,
  }
}

let cached: { key: string; transporter: Transporter } | null = null

export function getTransporter(config: MailConfig): Transporter {
  const key = `${config.host}:${config.port}:${config.user}`
  if (cached?.key === key) return cached.transporter
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    // Keep well inside the serverless execution limit.
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 10_000,
    // Never let message content pull in local files or remote URLs.
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  cached = { key, transporter }
  return transporter
}
