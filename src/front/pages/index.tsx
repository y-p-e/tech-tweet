import type { GetStaticProps, NextPage } from 'next'
import { useState, useEffect, createRef, useCallback } from 'react';
import AppFooter from '../modules/views/AppFooter';
import ProductValues from '../modules/views/ProductValues';
import type {TweetNumberProps, Tweets, Tweet, Books} from '../modules/views/ProductValues';
import AppAppBar from '../modules/views/AppAppBar';
import getCategory from '../services/category/get-category';
import { ApiContext, Category, TweetData, BookData } from '../types/data';
import getTweet from '../services/tweet/get-tweet';
import getBook from '../services/book/get-book';
import getCookie from '../services/user/get-cookie';
import {parseCookies} from 'nookies'

type SSGProps = {
  tweet_datas: TweetData[] | [],
  book_datas: BookData[] | [], 
  category_datas: Category[] | [],
  fallback: any
}

const Home: NextPage<SSGProps> = (props) => {
  let firstDefault = 1
  let secondDefault = 2
  const [firstTweetNumber, setFirstTweetNumber] = useState(firstDefault)
  const [secondTweetNumber, setSecondTweetNumber] = useState(secondDefault)
  useEffect(() => {
    (async() => {
      const cookies = parseCookies()
      const firstDefault = parseInt(cookies.firstDefault) || 1
      const secondDefault = parseInt(cookies.secondDefault) || 2
      setFirstTweetNumber(firstDefault)
      setSecondTweetNumber(secondDefault)
    })()
  }, []);
  const tweetMap = new Map<number, Tweets>();
  if (props.tweet_datas.length > 0) {
    props.tweet_datas.map((tweetData, id) => {
      const tweetArr: Tweet[] = []
      tweetData.tweets.map((tweet) => {
        const t: Tweet = {
          profileImg: tweet.profile_img_url,
          tweet: tweet.tweet_ja,
          tweetedAt: tweet.tweeted_at,
          url: tweet.tweet_url,
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
  const refFirstTweetTop = createRef<HTMLDivElement>()
  const scrollToBottomOfListFirst = useCallback(() => {
    refFirstTweetTop!.current!.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    })
  }, [refFirstTweetTop])

  useEffect(()=>{
    scrollToBottomOfListFirst()
  }, [firstTweetNumber])

  const refSecondTweetTop = createRef<HTMLDivElement>()
  const scrollToBottomOfListSecond = useCallback(() => {
    refSecondTweetTop!.current!.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    })
  }, [refSecondTweetTop])

  useEffect(()=>{
    scrollToBottomOfListSecond()
  }, [secondTweetNumber])

  const tweetNumberProps: TweetNumberProps = {
    firstTweetNumber,
    secondTweetNumber,
    setFirstTweetNumber,
    setSecondTweetNumber,
    tweetMap: tweetMap,
    bookMap: bookMap,
    refFirstTweetTop,
    refSecondTweetTop,
  }

  const handleFirstTweetNumber = (tweetNumber: number) => {
    setFirstTweetNumber(tweetNumber);
  };
  const handleSecondTweetNumber = (tweetNumber: number) => {
    setSecondTweetNumber(tweetNumber);
  };
  return (
    <>
      <AppAppBar
      isShowMenuIcon={true}
      category_datas={props.category_datas}
      firstTweetNumber={firstTweetNumber}
      secondTweetNumber={secondTweetNumber}
      handleFirstTweetNumber={handleFirstTweetNumber}
      handleSecondTweetNumber={handleSecondTweetNumber}
      />
      <ProductValues {...tweetNumberProps}/>
      <AppFooter />
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
  }
}