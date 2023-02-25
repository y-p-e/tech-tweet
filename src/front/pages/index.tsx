import type { NextPage } from 'next'
import { useState } from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductValues from './modules/views/ProductValues';
import type {TweetNumberProps, Tweets, Tweet} from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';
import { GetServerSideProps } from 'next'
import { SWRConfig } from 'swr';
import getCategory from '../services/category/get-category';
import { ApiContext, Category, TweetData } from '../types/data';
import getTweet from '../services/tweet/get-tweet';

type SSRProps = {
  tweet_datas: TweetData[],
  category_datas: Category[],
  fallback: any
}

const Home: NextPage<SSRProps> = (props) => {
  const fallback = props.fallback
  const [firstTweetNumber, setFirstTweetNumber] = useState(fallback['/api/current-user'].firstDefault)
  const [secondTweetNumber, setSecondTweetNumber] = useState(fallback['/api/current-user'].secondDefault)
  const tweetMap = new Map<number, Tweets>();
  props.tweet_datas.map((tweetData, id) => {
    const tweetArr: Tweet[] = []
    tweetData.tweets.map((tweet) => {
      const t: Tweet = {
        profileImg: tweet.profile_img_url,
        tweet: tweet.tweet_ja,
      }
      tweetArr.push(t)
    })
    const tweets: Tweets = {
      img: tweetData.img,
      tweets: tweetArr,
    }
    tweetMap.set(tweetData.category_id, tweets)
  })
  const tweetNumberProps: TweetNumberProps = {
    firstTweetNumber,
    secondTweetNumber,
    setFirstTweetNumber,
    setSecondTweetNumber,
    tweetMap: tweetMap,
  }

  const handleFirstTweetNumber = (tweetNumber: number) => {
    setFirstTweetNumber(tweetNumber);
  };
  const handleSecondTweetNumber = (tweetNumber: number) => {
    setSecondTweetNumber(tweetNumber);
  };
  return (
    <>
    <SWRConfig value={{ fallback }}>
      <AppAppBar 
      isShowMenuIcon={true}
      category_datas={props.category_datas}
      handleFirstTweetNumber={handleFirstTweetNumber}
      handleSecondTweetNumber={handleSecondTweetNumber}
      />
      <ProductValues {...tweetNumberProps}/>
      <AppFooter />
    </SWRConfig>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8000',
  }
  const tweeDatats = await getTweet(apiContext)
  const categoryDatats = await getCategory(apiContext)

  return {
    props: {
      tweet_datas: tweeDatats,
      category_datas: categoryDatats,
      fallback: {
        '/api/current-user': {
          userId: "",
          name: "",
          firstDefault: 1,
          secondDefault: 2,
        }
      }
    },
  }
}