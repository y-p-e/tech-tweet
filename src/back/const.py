import os
from dotenv import load_dotenv
import hashlib
import base64
import re

load_dotenv()

API_KEY = os.environ['TWITTER_API_KEY']
API_KEY_SECRET = os.environ['TWITTER_API_KEY_SECRET']
BEARER_TOKEN = os.environ['TWITTER_BEARER_TOKEN']
ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN']
ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']
TWITTER_CLIENT_ID = os.getenv("TWITTER_CLIENT_ID")
CLIENT_SECRET = os.environ.get("TWITTER_CLIENT_SECRET")
AUTH_ENDPOINT = "https://twitter.com/i/oauth2/authorize"
TWITTER_TOKEN_URL = "https://api.twitter.com/2/oauth2/token"
TWITTER_REDIRECT_URI = "https://tech-tweet-374313.web.app/call-back"
SCOPE = ["tweet.read", "users.read", "offline.access"]
TWITTER_CURRENT_USER_URL = 'https://api.twitter.com/2/users/me'
TWITTER_USER_PARAMS = {'user.fields': 'description', 'user.fields': 'profile_image_url'}

GOOGLE_PRIVATE_API_KEY = os.environ['GOOGLE_PRIVATE_API_KEY']

API_KEY = os.environ['API_KEY']

# Generate state
# state = hashlib.sha256(os.urandom(32)).hexdigest()
# code_verifier1 = base64.urlsafe_b64encode(os.urandom(30)).decode("utf-8")
# code_verifier = re.sub("[^a-zA-Z0-9]+", "", code_verifier1)
code_verifier = os.environ['TWITTER_CODE_VERIFIER']
# code_challenge1 = hashlib.sha256(code_verifier.encode("utf-8")).digest()
# code_challenge2 = base64.urlsafe_b64encode(code_challenge1).decode("utf-8")
# code_challenge = code_challenge2.replace("=", "")
code_challenge = os.environ['TWITTER_CODE_CHALLENGE']