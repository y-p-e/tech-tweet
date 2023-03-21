import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {

  case 'DELETE':
		const options = {
			maxAge: -1,
			httpOnly: false,
			path: "/",
		};
		setCookie({ res }, 'firstDefault', '', options);
		setCookie({ res }, 'secondDefault', '', options);
		setCookie({ res }, 'name', '', options);
		setCookie({ res }, 'userId', '', options);
		setCookie({ res }, 'sessionId', '', options);
	}
	return res.status(201).json({})
}