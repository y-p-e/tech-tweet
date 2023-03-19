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
from twitter.insert_user_from_csv import insert_user_from_csv
from database import db_session

app = FastAPI()

def get_db():
    session = db_session()
    try:
        yield session
    finally:
        session.close()

@app.get("/twitter_auth_url")
def get_twitter_auth(api_key: APIKey = Depends(auth.get_api_key))->TwitterAuthUrl:
  return get_twitter_auth_url()

@app.get("/twitter_auth_callback")
def twitter_auth_cb(code: str, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key))->CurentUser:
  return twitter_auth_callback(code, session)

@app.get("/current_user")
def get_current_user(access_token: str, session_id: str, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key))->CurentUser:
  return get_twitter_current_user(access_token, session_id, session)

@app.get("/categories")
def get_category(session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key))->List[CategoryModel]:
  return get_tweet_category(session)

@app.post("/categories", status_code=201)
def save_category(category_data: CategoryData, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  return save_tweet_category(category_data, session)

@app.post("/tweet_users", status_code=201)
def save_user(tweet_user: TweetUserData, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  user_id = save_tweet_user(tweet_user, session)
  return {"user_id": user_id}

@app.post("/tweet_users_from_csv", status_code=201)
def save_user_from_csv(session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  return insert_user_from_csv(session)

@app.get("/tweets")
def get_tweets(session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key))->List[TweetCategoryModel]:
  return get_translate_tweets(session)

@app.post("/tweets", status_code=201)
def save_tweets(session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  return save_translate_tweets(session)

@app.put("/users/{user_id}/first_default_category")
def update_first_category(user_id: int, session_id: str, deault_category: DeaultCategory, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  return update_first_default_category(user_id, session_id, deault_category, session)

@app.put("/users/{user_id}/second_default_category")
def update_second_category(user_id: int, session_id: str, deault_category: DeaultCategory, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  return update_second_default_category(user_id, session_id, deault_category, session)

@app.get("/books")
def get_book(session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key))->List[BookCategoryModel]:
  return get_book_data(session)

@app.post("/books", status_code=201)
def save_book(book_data: BookData, session = Depends(get_db), api_key: APIKey = Depends(auth.get_api_key)):
  return save_book_data(book_data, session)
