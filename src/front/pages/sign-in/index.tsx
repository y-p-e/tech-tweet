import type { NextPage } from 'next'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TwitterLoginButton } from "react-social-login-buttons";
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next'
import type {ApiContext, AuthUrl} from '../../types/data'
import getAuthUrl from '../../services/auth/get-auth-url'
import authCallback from '../../services/auth/twitter_auth_callback';
import nookies from "nookies";

type SSRProps = {
  authUrl: AuthUrl
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Tech Tweet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn: NextPage<SSRProps> = (props) => {
  const {authUrl} = props
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            Sign in
          </Typography>
          <TwitterLoginButton onClick={() => router.push(authUrl.auth_url)} />
          <Grid container sx={{ mt: 4 }}>
            <Grid item>
            <Link variant="body2" href="/" component={NextLink}>
              {'Back to Home'}
            </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn


export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8000',
  }
  const code = context.query.code;
  if (typeof code === 'string') {
    const user = await authCallback(apiContext, code)
    const expiresIn = 60 * 60 * 24 * 90 * 1000; // 90日
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
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

  const authUrl = await getAuthUrl(apiContext)
  return {
    props: {
      authUrl,
    },
  }
}