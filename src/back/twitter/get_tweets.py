
from models.models import Tweet, Category, TweetUser
from pydantic import BaseModel
from typing import List
from sqlalchemy import desc

class TweetModel(BaseModel):
  id: int
  tweet_id: int
  tweet_en: str
  tweet_ja: str
  tweet_url: str
  profile_img_url: str
  tweeted_at: str


class TweetCategoryModel(BaseModel):
	category_id: int
	img: str
	tweets: List[TweetModel]


def get_translate_tweets(session):
	categories = session.query(Category).order_by(Category.id).all()
	tweet_dict = {}
	response_list = []
	profile_img_url_dict = {}
	for category in categories:
		tweet_dict[category.id] = []
		tweets = session.query(Tweet).filter(Tweet.category_id == category.id).order_by(desc(Tweet.tweeted_at)).limit(100).all()
		tweet_list = []
		for tweet in tweets:
			if tweet.tweet_user_id in profile_img_url_dict:
				profile_img_url = profile_img_url_dict[tweet.tweet_user_id]
			else:
				tweet_user = session.query(TweetUser).filter(TweetUser.id == tweet.tweet_user_id).first()
				profile_img_url = tweet_user.profile_img_url
				profile_img_url_dict[tweet.tweet_user_id] = profile_img_url
			tweet_model = TweetModel(
				id=tweet.id,
				tweet_id=tweet.tweet_id,
				tweet_en=tweet.tweet_en,
				tweet_ja=tweet.tweet_ja,
				tweet_url=tweet.tweet_url,
				profile_img_url=profile_img_url,
				tweeted_at=tweet.tweeted_at.strftime('%Y/%m/%d %H:%M:%S')
			)
			tweet_list.append(tweet_model)
		tweet_category_model = TweetCategoryModel(
			category_id=category.id,
			img=category.img_url,
			tweets=tweet_list,
		)
		response_list.append(tweet_category_model)
	return response_list