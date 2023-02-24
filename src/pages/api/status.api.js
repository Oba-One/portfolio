export const config = {
  runtime: 'experimental-edge',
}

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = (req, res) => {
  if (req.method == 'GET') {
    res.status(200).send({ status: 'ok', time: Date.now() })
  } else {
    res.status(404).json({ status: 404, error: 'Not Found' })
  }
}

export default handler
