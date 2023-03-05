import Head from 'next/head';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../modules/theme';
import createEmotionCache from '../modules/createEmotionCache';
import { DefaultSeo } from 'next-seo';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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