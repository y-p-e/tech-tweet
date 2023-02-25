import type { NextApiRequest, NextApiResponse } from 'next'
import type {User} from '../../types/data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const cookies = req.cookies
  const name = cookies.name ?? ''
  const userId = cookies.id ?? ''
  const firstDefault = cookies.firstDefault ?? '1'
  const secondDefault = cookies.secondDefault ?? '2'
  return res.status(200).json({ 
    userId: parseInt(userId),
    name: name,
    firstDefault: parseInt(firstDefault),
    secondDefault: parseInt(secondDefault),
  })
}
