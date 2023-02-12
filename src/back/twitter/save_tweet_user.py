from fastapi import HTTPException
import requests
from models.models import Category, TweetUser
from database import session
from pydantic import BaseModel
from const import BEARER_TOKEN


class TweetUserData(BaseModel):
    username: str #Twitterアカウントの@の後の文字列
    category_name: str


def save_tweet_user(tweet_user: TweetUserData):
  category = session.query(Category).filter(Category.name == tweet_user.category_name).one_or_none()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")

  username = tweet_user.username
  user_fields = ["id", "name", "username", "created_at","protected","withheld", "location", "url", "description", "verified", "entities", "profile_image_url", "public_metrics", "pinned_tweet_id"]
  formatted_user_fields = "user.fields=" + ",".join(user_fields)
  url = "https://api.twitter.com/2/users/by?usernames={}&{}".format(username, formatted_user_fields)
  headers = {"Authorization": "Bearer {}".format(BEARER_TOKEN)}
  response = requests.request("GET", url, headers=headers)
  json_response = response.json()
  data =  json_response["data"]

  user_id = int(data[0]['id'])
  tweet_user = session.query(TweetUser).filter(TweetUser.user_id == user_id).one_or_none()
  if tweet_user:
    raise HTTPException(status_code=40, detail="User already save")

  tweet_user = TweetUser()
  tweet_user.user_id = user_id
  tweet_user.url = data[0]['url']
  tweet_user.profile_img_url = data[0]['profile_image_url']
  tweet_user.category_id = category.id
  session.add(tweet_user)
  session.commit()
  return user_id