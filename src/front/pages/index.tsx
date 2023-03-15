import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react';
import AppFooter from '../modules/views/AppFooter';
import ProductValues from '../modules/views/ProductValues';
import type {TweetNumberProps, Tweets, Tweet, Books} from '../modules/views/ProductValues';
import AppAppBar from '../modules/views/AppAppBar';
import { SWRConfig } from 'swr';
import getCategory from '../services/category/get-category';
import { ApiContext, Category, TweetData, BookData } from '../types/data';
import getTweet from '../services/tweet/get-tweet';
import getBook from '../services/book/get-book';

type SSGProps = {
  tweet_datas: TweetData[] | [],
  book_datas: BookData[] | [], 
  category_datas: Category[] | [],
  fallback: any
}

const Home: NextPage<SSGProps> = (props) => {
  const fallback = props.fallback
  const [firstTweetNumber, setFirstTweetNumber] = useState(fallback['/api/current-user'].firstDefault)
  const [secondTweetNumber, setSecondTweetNumber] = useState(fallback['/api/current-user'].secondDefault)

  const tweetMap = new Map<number, Tweets>();
  if (props.tweet_datas.length > 0) {
    props.tweet_datas.map((tweetData, id) => {
      const tweetArr: Tweet[] = []
      tweetData.tweets.map((tweet) => {
        const t: Tweet = {
          profileImg: tweet.profile_img_url,
          tweet: tweet.tweet_ja,
          tweetedAt: tweet.tweeted_at,
        }
        tweetArr.push(t)
      })
      const tweets: Tweets = {
        img: tweetData.img,
        tweets: tweetArr,
      }
      tweetMap.set(tweetData.category_id, tweets)
    })
  }

  const bookMap = new Map<number, Books[]>();
  if (props.book_datas.length > 0) {
    props.book_datas.map((bookData, id) => {
      const bookArr: Books[] = []
      bookData.books.map((book) => {
        const b: Books = {
          img: book.img,
          title: book.title,
          descriptin: book.descriptin,
          url: book.url,
        }
        bookArr.push(b)
      })
      bookMap.set(bookData.category_id, bookArr)
    })
  }
  const tweetNumberProps: TweetNumberProps = {
    firstTweetNumber,
    secondTweetNumber,
    setFirstTweetNumber,
    setSecondTweetNumber,
    tweetMap: tweetMap,
    bookMap: bookMap,
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

export const getStaticProps: GetStaticProps<SSGProps> = async () => {
  const apiContext: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8000',
  }

  let tweeDatats: any[]
  try{
    tweeDatats = await getTweet(apiContext)
  } catch {
    tweeDatats = []
  }

  let categoryDatats: any[]
  try{
    categoryDatats = await getCategory(apiContext)
  } catch {
    categoryDatats = []
  }
  let bookDatas: any[]
  try{
    bookDatas = await getBook(apiContext)
  } catch {
    bookDatas = []
  }

  return {
    props: {
      tweet_datas: tweeDatats,
      book_datas: bookDatas,
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
    revalidate: 14400
  }
}