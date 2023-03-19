

import secrets
import requests
from fastapi import HTTPException, status
from requests_oauthlib import OAuth2Session
from requests.auth import HTTPBasicAuth
from models.models import User, FirstDefaultCategory, SecondDefaultCategory
from pydantic import BaseModel
from const import TWITTER_CLIENT_ID, CLIENT_SECRET, TWITTER_TOKEN_URL, TWITTER_REDIRECT_URI, SCOPE, TWITTER_CURRENT_USER_URL, TWITTER_USER_PARAMS


class CurentUser(BaseModel):
    id: int
    name: str
    session_id: str
    first_default: int
    second_default: int


def get_twitter_current_user(access_token: str, session_id: str, session):
  twitter = OAuth2Session(TWITTER_CLIENT_ID, redirect_uri=TWITTER_REDIRECT_URI, scope=SCOPE)
  for _ in range(100):
    session_id = secrets.token_urlsafe(16)
    user_by_session_id = session.query(User).filter(User.session_id == session_id).one_or_none()
    if not user_by_session_id:
      break

  headers = {'Authorization': f'Bearer {access_token}'}
  res = requests.get(TWITTER_CURRENT_USER_URL, params=TWITTER_USER_PARAMS, headers=headers)

  user = session.query(User).filter(User.session_id == session_id).first()

  # アクセストークン切れの認証エラーの場合リフレッシュトークンで更新
  if res.status_code == 401:
    refresh_token = user.refresh_token
    auth = HTTPBasicAuth(TWITTER_CLIENT_ID, CLIENT_SECRET)
    try:
      token = twitter.refresh_token(
        client_id=TWITTER_CLIENT_ID,
        auth=auth,
        token_url=TWITTER_TOKEN_URL,
        refresh_token= refresh_token,
      )
    except:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
      
    access_token = token["access_token"]
    refresh_token = token["refresh_token"]
    headers = {'Authorization': f'Bearer {access_token}'}
    res = requests.get(TWITTER_CURRENT_USER_URL, params=TWITTER_USER_PARAMS, headers=headers)

  data = res.json()
  username = data['data']['username']
  user_id = data['data']['id']
  name = data['data']['name']
  profile_image_url = data['data']['profile_image_url']


  user.session_id = session_id
  user.refresh_token = refresh_token
  session.add(user)
  session.commit()

  first_default = session.query(FirstDefaultCategory).filter(FirstDefaultCategory.user_id == user.id).first()
  second_default = session.query(SecondDefaultCategory).filter(SecondDefaultCategory.user_id == user.id).first()

  return CurentUser(
    id=user.id,
    name=user.username,
    session_id=user.session_id,
    first_default=first_default.category_id,
    second_default=second_default.category_id,
	)