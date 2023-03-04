import {ApiContext, BookData} from '../../types/data'
import { fetcher } from "../../utils";

const getBook = async (context: ApiContext): Promise<BookData[]> => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/books`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'access_token': process.env.API_KEY || '',
			}
		}
	)
}

export default getBook