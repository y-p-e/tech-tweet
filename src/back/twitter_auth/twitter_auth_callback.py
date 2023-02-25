import secrets
from requests_oauthlib import OAuth2Session
import requests
from models.models import User, FirstDefaultCategory, SecondDefaultCategory
from database import session
from pydantic import BaseModel
from const import TWITTER_CLIENT_ID, CLIENT_SECRET, TWITTER_TOKEN_URL, TWITTER_REDIRECT_URI, SCOPE, TWITTER_CURRENT_USER_URL, TWITTER_USER_PARAMS, code_verifier
from twitter_auth.get_twitter_current_user import CurentUser

class TwitterAccessToken(BaseModel):
    access_token: str 
    session_id: str 


def twitter_auth_callback(code: str):
  twitter = OAuth2Session(TWITTER_CLIENT_ID, redirect_uri=TWITTER_REDIRECT_URI, scope=SCOPE)
  token = twitter.fetch_token(
    token_url=TWITTER_TOKEN_URL,
    client_secret=CLIENT_SECRET,
    code_verifier=code_verifier,
    code=code,
  )
  access_token = token["access_token"]
  refresh_token = token["refresh_token"]
  for _ in range(100):
    session_id = secrets.token_urlsafe(16)
    user_by_session_id = session.query(User).filter(User.session_id == session_id).one_or_none()
    if not user_by_session_id:
      break

  headers = {'Authorization': f'Bearer {access_token}'}
  res = requests.get(TWITTER_CURRENT_USER_URL, params=TWITTER_USER_PARAMS, headers=headers)

  data = res.json()
  username = data['data']['username']
  user_id = data['data']['id']
  name = data['data']['name']
  profile_image_url = data['data']['profile_image_url']

  user = session.query(User).filter(User.user_id == user_id).one_or_none()
  if not user:
    user = User(
      user_id = user_id,
      username = username,
      name = name,
      profile_image_url = profile_image_url,
      session_id = session_id,
      refresh_token = refresh_token,
      first_default = FirstDefaultCategory(category_id=1),
      second_default = SecondDefaultCategory(category_id=2),
    )
    session.add(user)
    session.flush()
    session.commit()
  print(user)
  print(user.id)
  print(user.first_default.category_id)
  return CurentUser(
    id=user.id,
    name=user.username,
    session_id=user.session_id,
    first_default=user.first_default.category_id,
    second_default=user.second_default.category_id,
	)