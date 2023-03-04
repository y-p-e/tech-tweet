import auth
from fastapi import FastAPI, Depends
from typing import List
from twitter_auth.get_twitter_auth_url import get_twitter_auth_url, TwitterAuthUrl
from twitter_auth.twitter_auth_callback import twitter_auth_callback, TwitterAccessToken
from twitter_auth.get_twitter_current_user import get_twitter_current_user, CurentUser
from twitter.save_tweet_user import save_tweet_user, TweetUserData
from twitter.save_tweets import save_translate_tweets
from category.save_category import save_tweet_category, CategoryData
from category.get_categories import get_tweet_category, CategoryModel
from twitter.get_tweets import get_translate_tweets, TweetCategoryModel
from user.update_default_category import update_first_default_category, update_second_default_category, DeaultCategory
from book.save_book import BookData, save_book_data
from book.get_book import BookCategoryModel, get_book_data 
from fastapi.security.api_key import APIKey

app = FastAPI()

@app.get("/twitter_auth_url")
def get_twitter_auth(api_key: APIKey = Depends(auth.get_api_key))->TwitterAuthUrl:
  return get_twitter_auth_url()

@app.get("/twitter_auth_callback")
def twitter_auth_cb(code: str, api_key: APIKey = Depends(auth.get_api_key))->CurentUser:
  return twitter_auth_callback(code)

@app.get("/current_user")
def get_current_user(access_token: str, session_id: str, api_key: APIKey = Depends(auth.get_api_key))->CurentUser:
  return get_twitter_current_user(access_token, session_id)

@app.get("/categories")
def get_category(api_key: APIKey = Depends(auth.get_api_key))->List[CategoryModel]:
  return get_tweet_category()

@app.post("/categories", status_code=201)
def save_category(category_data: CategoryData, api_key: APIKey = Depends(auth.get_api_key)):
  return save_tweet_category(category_data)

@app.post("/tweet_users", status_code=201)
def save_user(tweet_user: TweetUserData, api_key: APIKey = Depends(auth.get_api_key)):
  user_id = save_tweet_user(tweet_user)
  return {"user_id": user_id}

@app.get("/tweets")
def get_tweets(api_key: APIKey = Depends(auth.get_api_key))->List[TweetCategoryModel]:
  return get_translate_tweets()

@app.post("/tweets", status_code=201)
def save_tweets(api_key: APIKey = Depends(auth.get_api_key)):
  return save_translate_tweets()

@app.put("/users/{user_id}/first_default_category")
def update_first_category(user_id: int, session_id: str, deault_category: DeaultCategory, api_key: APIKey = Depends(auth.get_api_key)):
  return update_first_default_category(user_id, session_id, deault_category)

@app.put("/users/{user_id}/second_default_category")
def update_second_category(user_id: int, session_id: str, deault_category: DeaultCategory, api_key: APIKey = Depends(auth.get_api_key)):
  return update_second_default_category(user_id, session_id, deault_category)

@app.get("/books")
def get_book(api_key: APIKey = Depends(auth.get_api_key))->List[BookCategoryModel]:
  return get_book_data()

@app.post("/books", status_code=201)
def save_book(book_data: BookData, api_key: APIKey = Depends(auth.get_api_key)):
  return save_book_data(book_data)
