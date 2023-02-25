import {ApiContext, CallbackUser} from '../../types/data'
import { fetcher } from "../../utils";

const authCallback = async (context: ApiContext, code: string): Promise<CallbackUser> => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/twitter_auth_callback?code=${code}`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	)
}

export default authCallback