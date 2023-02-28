import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from './modules/theme';
import createEmotionCache from './modules/createEmotionCache';
import { DefaultSeo } from 'next-seo';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    {(this.props as any).emotionStyleTags}
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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};