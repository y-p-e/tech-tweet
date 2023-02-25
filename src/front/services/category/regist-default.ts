import { ApiContext } from "../../types/data"
import { fetcher } from "../../utils"

export type DefaultParams = {
	firstDefaultNumber: number
	secondDefaultNumber: number
}

export const registDefaultCateogry = async (params: DefaultParams) => {
	return await fetcher(
		'/api/default-category',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		},
	)
}

export const putFirstDefault = async (context: ApiContext, userId: string, categoryId: number, sessionId: string) => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/users/${userId}/first_default_category?session_id=${sessionId}`,
		{
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				category_id: categoryId
			}),
		},
	)
}

export const putSecondDefault = async (context: ApiContext, userId: string, categoryId: number, sessionId: string) => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/users/${userId}/second_default_category?session_id=${sessionId}`,
		{
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				category_id: categoryId
			}),
		},
	)
}
