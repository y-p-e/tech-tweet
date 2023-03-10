import {ApiContext, TweetData} from '../../types/data'
import { fetcher } from "../../utils";

const getTweet = async (context: ApiContext): Promise<TweetData[]> => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/tweets`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'access_token': process.env.API_KEY || '',
			}
		}
	)
}

export default getTweet