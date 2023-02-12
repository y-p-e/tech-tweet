import secrets
import os
import hashlib
import base64
from requests_oauthlib import OAuth2Session
import re
import requests
from models.models import User, FirstDefaultCategory, SecondDefaultCategory
from database import session
from pydantic import BaseModel
from const import TWITTER_CLIENT_ID, CLIENT_SECRET, TWITTER_TOKEN_URL, TWITTER_REDIRECT_URI, SCOPE, TWITTER_CURRENT_USER_URL, TWITTER_USER_PARAMS

state = hashlib.sha256(os.urandom(32)).hexdigest()
code_verifier = base64.urlsafe_b64encode(os.urandom(30)).decode("utf-8")
code_verifier = re.sub("[^a-zA-Z0-9]+", "", code_verifier)
code_challenge = hashlib.sha256(code_verifier.encode("utf-8")).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode("utf-8")
code_challenge = code_challenge.replace("=", "")


class TwitterAccessToken(BaseModel):
    name: str
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
  session.commit()

  return TwitterAccessToken(
    name=name,
    access_token=access_token,
    session_id=session_id,
	)