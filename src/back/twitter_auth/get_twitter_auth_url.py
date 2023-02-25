from requests_oauthlib import OAuth2Session
from pydantic import BaseModel
from const import TWITTER_CLIENT_ID, AUTH_ENDPOINT, TWITTER_REDIRECT_URI, SCOPE, code_challenge, code_verifier

class TwitterAuthUrl(BaseModel):
    auth_url: str

def get_twitter_auth_url():
  twitter = OAuth2Session(TWITTER_CLIENT_ID, redirect_uri=TWITTER_REDIRECT_URI, scope=SCOPE)
  auth_url, state = twitter.authorization_url(AUTH_ENDPOINT, code_challenge=code_challenge, code_challenge_method="S256")
  return TwitterAuthUrl(
		auth_url=auth_url,
	)