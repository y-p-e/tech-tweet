import {ApiContext, Category} from '../../types/data'
import { fetcher } from "../../utils";

const getCategory = async (context: ApiContext): Promise<Category[]> => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/categories`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	)
}

export default getCategory