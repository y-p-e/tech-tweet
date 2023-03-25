import Head from 'next/head';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../modules/theme';
import createEmotionCache from '../modules/createEmotionCache';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (firebaseConfig?.projectId) {
				// Initialize Firebase
				const app = initializeApp(firebaseConfig);
				if (app.name && typeof window !== 'undefined') {
					getAnalytics(app);
				}
			}
    }
  }, [])
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo
				defaultTitle="TECH TWEET"
				description="IT情報やプログラミング言語別最新情報をまとめました。twitterから最新情報を取得してカテゴリー別に閲覧できます"
				openGraph={{
					type: "website",
					title: "TECH TWEET",
					description: "IT情報やプログラミング言語別最新情報をまとめました。twitterから最新情報を取得してカテゴリー別に閲覧できます",
					site_name: "TECH TWEET",
					url: "サイトのURL",
					images: [
					 {
					  url: "/logo.png",
            width: 800,
            height: 600,
            alt: 'TECH TWEETサイトのイメージ',
            type: 'image/png',
					 },
					],
				}}
				twitter={{
					handle: '@handle',
					site: '@site',
					cardType: "summary_large_image",
				}}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp