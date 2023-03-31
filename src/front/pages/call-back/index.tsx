import type { NextPage } from 'next'
import type {ApiContext} from '../../types/data'
import authCallback from '../../services/auth/twitter_auth_callback';
import nookies from "nookies";

const CallBack: NextPage = () => {
  return <></>;
}
export default CallBack

export const getServerSideProps = async (context: any) => {
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8000',
  }
  const code = context.query.code;
  if (typeof code === 'string') {
    const user = await authCallback(apiContext, code)
    const expiresIn = 60 * 60 * 24 * 90 * 1000; // 90日
    const options = {
      maxAge: expiresIn,
      httpOnly: false,
      path: "/",
    };
	  nookies.set(context, 'name', user.name, options)
	  nookies.set(context, 'userId', String(user.id), options)
	  nookies.set(context, 'sessionId', String(user.session_id), options)
	  nookies.set(context, 'firstDefault', String(user.first_default), options)
	  nookies.set(context, 'secondDefault', String(user.second_default), options)
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  return {
    props: {},
  }
}