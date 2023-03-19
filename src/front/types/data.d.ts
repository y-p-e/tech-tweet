export type ApiContext = {
	apiRootUrl: string
}

export type AuthUrl = {
	auth_url: string
}

export type AccessToken = {
	access_token: string 
	session_id: string
}

export type User = {
	userId: number
	name: string
	firstDefault: number
	secondDefault: number
}

export type CallbackUser = {
	id: number
	name: string
  session_id: string
	first_default: number
	second_default: number
}

export type Category = {
  id: number,
  name: string,
  img_url: string,
}

export type TweetData = {
  category_id: number,
  img: string,
  tweets: [
    {
      id: number,
      tweet_id: number,
      tweet_en: string,
      tweet_ja: string,
      tweet_url: string
      profile_img_url: string,
      tweeted_at: string
    },
  ]
}

export type BookData = {
  category_id: number,
  books: [
    {
      img: string
      title: string
      descriptin: string
      url: string
    },
  ]
}