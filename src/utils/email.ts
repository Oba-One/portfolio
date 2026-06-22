const RESEND_API_URL = 'https://api.resend.com/emails'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? 'contact@afolabi.info'
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM ?? 'Afolabi Portfolio <notifications@afolabi.info>'

type SendContactEmailOptions = {
  html: string
  replyTo: string
  subject: string
  text: string
}

type ResendEmailResponse = {
  id?: string
  error?: string | { message?: string }
}

export async function sendContactEmail({
  html,
  replyTo,
  subject,
  text,
}: SendContactEmailOptions) {
  if (!RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY')
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  })

  let data: ResendEmailResponse | null = null

  try {
    data = (await response.json()) as ResendEmailResponse
  } catch {
    // Resend normally returns JSON, but keep the surfaced error useful if it does not.
  }

  if (!response.ok) {
    const errorMessage =
      typeof data?.error === 'string' ? data.error : data?.error?.message

    throw new Error(errorMessage ?? `Resend email send failed with ${response.status}`)
  }

  return data ?? {}
}
