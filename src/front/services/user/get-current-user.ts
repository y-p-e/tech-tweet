import {ApiContext, User} from '../../types/data'
import { fetcher } from "../../utils";

const getCurrentUser = async (context: ApiContext, accessToken: string, sessionId: string): Promise<User> => {
	return await fetcher(
		`${context.apiRootUrl.replace(/\/$/g, '')}/current_user?access_token=${accessToken}&session_id=${sessionId}`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	)
}

export default getCurrentUser