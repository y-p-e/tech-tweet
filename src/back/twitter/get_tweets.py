
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
  tweet_url: str
  profile_img_url: str
  tweeted_at: str


class TweetCategoryModel(BaseModel):
	category_id: int
	img: str
	tweets: List[TweetModel]


def get_translate_tweets():
	categories = session.query(Category).order_by(Category.id).all()
	tweet_dict = {}
	response_list = []
	for category in categories:
		tweet_dict[category.id] = []
		tweets = session.query(Tweet).filter(Tweet.category_id == category.id).order_by(desc(Tweet.tweeted_at)).limit(100).all()
		tweet_list = []
		for tweet in tweets:
			tweet_model = TweetModel(
				id=tweet.id,
				tweet_id=tweet.tweet_id,
				tweet_en=tweet.tweet_en,
				tweet_ja=tweet.tweet_ja,
				tweet_url=tweet.tweet_url,
				profile_img_url=tweet.tweet_user.profile_img_url,
				tweeted_at=tweet.tweeted_at.strftime('%Y/%m/%d %H:%M:%S')
			)
			tweet_list.append(tweet_model)
			# tweet_dict[category.id].append(tweet_model)
		tweet_category_model = TweetCategoryModel(
			category_id=category.id,
			img=category.img_url,
			tweets=tweet_list,
		)
		response_list.append(tweet_category_model)

	# response_list = []
	# for k, v in tweet_dict.items():
	# 	tweet_category_model = TweetCategoryModel(
	# 		category_id=k,	
	# 		tweets=v
	# 	)
	# 	response_list.append(tweet_category_model)
	return response_list