import type { NextApiRequest, NextApiResponse } from 'next'

const SMOKE_TOKEN = 'codex-contact-smoke-2026-06-21-7a49b'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).json({ status: 404, error: 'Not Found' })
    return
  }

  if (req.query.token !== SMOKE_TOKEN) {
    res.status(404).json({ status: 404, error: 'Not Found' })
    return
  }

  const host = req.headers.host

  if (!host) {
    res.status(500).json({ status: 500, error: 'Missing host header' })
    return
  }

  const response = await fetch(`https://${host}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'codex-contact-qa@example.com',
      message:
        'QA test from Codex validating the production contact form on 2026-06-21. Please ignore.',
    }),
  })

  const body = await response.text()

  res.status(response.ok ? 200 : 500).json({
    status: response.status,
    ok: response.ok,
    body,
  })
}
