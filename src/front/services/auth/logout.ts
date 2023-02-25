import { fetcher } from "../../utils"

export type DefaultParams = {
	firstDefaultNumber: number
	secondDefaultNumber: number
}

export const logout = async () => {
	return await fetcher(
		'/api/logout',
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
	)
}
