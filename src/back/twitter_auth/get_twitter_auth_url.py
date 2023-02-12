import os
import hashlib
import base64
from requests_oauthlib import OAuth2Session
import re
from pydantic import BaseModel
from const import TWITTER_CLIENT_ID, AUTH_ENDPOINT, TWITTER_REDIRECT_URI, SCOPE

# Generate state
state = hashlib.sha256(os.urandom(32)).hexdigest()
code_verifier = base64.urlsafe_b64encode(os.urandom(30)).decode("utf-8")
code_verifier = re.sub("[^a-zA-Z0-9]+", "", code_verifier)
code_challenge = hashlib.sha256(code_verifier.encode("utf-8")).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode("utf-8")
code_challenge = code_challenge.replace("=", "")

class TwitterAuthUrl(BaseModel):
    auth_url: str
    state: str 
    code_verifier: str 

def get_twitter_auth_url():
  twitter = OAuth2Session(TWITTER_CLIENT_ID, redirect_uri=TWITTER_REDIRECT_URI, scope=SCOPE)
  auth_url, state = twitter.authorization_url(AUTH_ENDPOINT, code_challenge=code_challenge, code_challenge_method="S256")
  return TwitterAuthUrl(
		auth_url=auth_url,
		state=state,
		code_verifier=code_verifier,
	)