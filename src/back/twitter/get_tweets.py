
from models.models import Tweet, Category
from database import session
from pydantic import BaseModel
from typing import List
from sqlalchemy import desc


class TweetModel(BaseModel):
  id: int
  tweet_id: int
  tweet_en: str
  tweet_ja: str
  profile_img_url: str


class TweetCategoryModel(BaseModel):
	category_id: int
	tweets: List[TweetModel]


def get_translate_tweets():
	categories = session.query(Category).order_by(Category.id).all()
	tweet_dict = {}
	for category in categories:
		tweet_dict[category.id] = []
		tweets = session.query(Tweet).filter(Tweet.category_id == category.id).order_by(desc(Tweet.tweeted_at)).limit(100).all()
		for tweet in tweets:
			tweet_model = TweetModel(
				id=tweet.id,
				tweet_id=tweet.tweet_id,
				tweet_en=tweet.tweet_en,
				tweet_ja=tweet.tweet_ja,
				profile_img_url=tweet.tweet_user.profile_img_url
			)
			tweet_dict[category.id].append(tweet_model)

	response_list = []
	for k, v in tweet_dict.items():
		tweet_category_model = TweetCategoryModel(
			category_id=k,	
			tweets=v
		)
		response_list.append(tweet_category_model)
	return response_list