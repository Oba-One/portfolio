/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

import { transporter } from 'utils/email'

const AUTH_EMAIL_USER = process.env.AUTH_EMAIL_USER ?? ''

export const config = {
  // runtime: 'experimental-edge',
  api: {
    bodyParser: {
      sizeLimit: '1200b',
    },
  },
}

const mailOptions = {
  to: AUTH_EMAIL_USER,
  subject: 'Contact Form Submission',
}

const Contact = z.object({
  email: z.string().max(320),
  message: z.string().max(1200),
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
    const { email, message } = req.body

    await Contact.parseAsync({
      email,
      message,
    })

    transporter.sendMail(
      {
        ...mailOptions,
        from: email,
        html: `
        <p>You have a new contact form submission</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
        `,
      },
      function (error: any, info: any) {
        if (error) {
          console.log(error)
          res.status(400).json({ status: 400, error: 'Error forwarding email' })
        } else {
          console.log('Email sent: ' + info.response)
          res.status(200).json({
            status: 200,
            message: 'Email succesfully sent',
            data: info.response,
          })
        }
      }
    )
  } else {
    res.status(404).json({ status: 404, error: 'Not Found' })
  }
}

export default handler
