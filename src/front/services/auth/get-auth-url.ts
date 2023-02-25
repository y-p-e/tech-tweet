import {ApiContext, AuthUrl} from '../../types/data'
import { fetcher } from "../../utils";

const getAuthUrl = async (context: ApiContext): Promise<AuthUrl> => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/twitter_auth_url`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	)
}

export default getAuthUrl