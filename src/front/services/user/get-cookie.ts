import {ApiContext, User} from '../../types/data'
import { fetcher } from "../../utils";

const getCookie = async (): Promise<User> => {
	return await fetcher(
		'/api/current-user',
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}
	)
}

export default getCookie