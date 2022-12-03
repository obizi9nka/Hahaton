// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const PRIVATE_KEY_SIGNER = process.env.PRIVATE_KEY_SIGNER
const NODE_URL = process.env.NODE_URL

export default function handler(req, res) {
  if (PRIVATE_KEY_SIGNER == "")
    res.json({ name: 'John Doe' })
  else
    res.json({ name: 'kkk' })
}
