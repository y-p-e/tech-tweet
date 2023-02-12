from fastapi import FastAPI
from typing import List
from twitter_auth.get_twitter_auth_url import get_twitter_auth_url, TwitterAuthUrl
from twitter_auth.twitter_auth_callback import twitter_auth_callback, TwitterAccessToken
from twitter_auth.get_twitter_current_user import get_twitter_current_user, TwitterCurentUserAccessToken
from twitter.save_tweet_user import save_tweet_user, TweetUserData
from twitter.save_tweets import save_translate_tweets
from category.save_category import save_tweet_category, CategoryData
from category.get_categories import get_tweet_category, CategoryModel
from twitter.get_tweets import get_translate_tweets, TweetCategoryModel
from user.update_default_category import update_first_default_category, update_second_default_category, DeaultCategory

app = FastAPI()

@app.get("/twitter_auth_url")
def get_twitter_auth()->TwitterAuthUrl:
  return get_twitter_auth_url()

@app.get("/twitter_auth_callback")
def twitter_auth_cb(state: str, code: str)->TwitterAccessToken:
  return twitter_auth_callback(code)

@app.post("/current_user")
def get_current_user(access_token: str, session_id: str)->TwitterCurentUserAccessToken:
  return get_twitter_current_user(access_token, session_id)

@app.get("/categories")
def get_category()->List[CategoryModel]:
  return get_tweet_category()

@app.post("/categories", status_code=201)
def save_category(category_data: CategoryData):
  return save_tweet_category(category_data)

@app.post("/tweet_users", status_code=201)
def save_user(tweet_user: TweetUserData):
  user_id = save_tweet_user(tweet_user)
  return {"user_id": user_id}

@app.get("/tweets")
def get_tweets()->List[TweetCategoryModel]:
  return get_translate_tweets()

@app.post("/tweets", status_code=201)
def save_tweets():
  return save_translate_tweets()

@app.put("users/{user_id}/first_default_category")
def update_first_category(user_id: int, deault_category: DeaultCategory):
  return update_first_default_category(user_id, deault_category)

@app.put("users/{user_id}/second_default_category")
def update_second_category(user_id: int, deault_category: DeaultCategory):
  return update_second_default_category(user_id, deault_category)