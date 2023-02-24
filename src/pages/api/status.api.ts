import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  runtime: 'experimental-edge',
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    res.status(200).send({ status: 'ok', time: Date.now() })
  } else {
    res.status(404).json({ status: 404, error: 'Not Found' })
  }
}

export default handler
