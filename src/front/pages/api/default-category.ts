import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiContext } from '../../types/data'
import { putFirstDefault, putSecondDefault} from '../../services/category/regist-default'
import { setCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {

  case 'POST':
		const cookies = req.cookies
		const userId = cookies.userId
		const sesionId = cookies.sessionId ?? ''
		if (userId && userId !== '') {
			const apiContext: ApiContext = {
				apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8000',
			}
			putFirstDefault(apiContext, userId, req.body.firstDefaultNumber, sesionId)
			putSecondDefault(apiContext, userId, req.body.secondDefaultNumber, sesionId)
			const expiresIn = 60 * 60 * 24 * 90 * 1000; // 90日
			const options = {
				maxAge: expiresIn,
				httpOnly: false,
				path: "/",
			};
			setCookie({ res }, 'firstDefault', String(req.body.firstDefaultNumber), options);
			setCookie({ res }, 'secondDefault', String(req.body.secondDefaultNumber), options);
		}
	}
	const options = {
		httpOnly: false,
		path: "/",
	};
	setCookie({ res }, 'firstDefault', String(req.body.firstDefaultNumber), options);
	setCookie({ res }, 'secondDefault', String(req.body.secondDefaultNumber), options);
	return res.status(201).json({})
}