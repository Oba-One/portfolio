/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

const RESEND_API_URL = 'https://api.resend.com/emails'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? 'contact@afolabi.info'
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM ?? 'Afolabi Portfolio <notifications@afolabi.info>'

export const config = {
  // runtime: 'experimental-edge',
  api: {
    bodyParser: {
      sizeLimit: '1200b',
    },
  },
}

type ResendEmailResponse = {
  id?: string
  error?: string | { message?: string }
}

const Contact = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(320, 'Email is too long'),
  message: z.string().trim().min(1, 'Enter a message').max(1200, 'Message is too long'),
})

const cors = Cors({
  origin: true,
  methods: ['POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: Cors.CorsRequest,
    res: {
      statusCode?: number | undefined
      setHeader(key: string, value: string): any
      end(): any
    },
    next: (err?: any) => any
  ) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)

  if (req.method == 'POST') {
    const contact = Contact.safeParse(req.body)

    if (!contact.success) {
      res.status(400).json({
        status: 400,
        error: contact.error.issues[0]?.message ?? 'Invalid contact form submission',
      })
      return
    }

    const { email, message } = contact.data
    const escapedEmail = escapeHtml(email)
    const escapedMessage = escapeHtml(message).replace(/\n/g, '<br />')

    try {
      const info = await sendContactEmail({
        replyTo: email,
        subject: `Portfolio contact from ${email}`,
        text: [
          'You have a new contact form submission',
          '',
          `Email: ${email}`,
          '',
          message,
        ].join('\n'),
        html: `
        <p>You have a new contact form submission</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Email: ${escapedEmail}</li>
        </ul>
        <h3>Message</h3>
        <p>${escapedMessage}</p>
        `,
      })

      console.log('Contact email sent: ' + (info.id ?? 'accepted'))
      res.status(200).json({
        status: 200,
        message: 'Email successfully sent',
        data: info.id ?? null,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ status: 500, error: 'Error forwarding email' })
    }
  } else {
    res.status(404).json({ status: 404, error: 'Not Found' })
  }
}

async function sendContactEmail({
  html,
  replyTo,
  subject,
  text,
}: {
  html: string
  replyTo: string
  subject: string
  text: string
}) {
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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => {
    const escapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return escapes[character]
  })
}

export default handler
