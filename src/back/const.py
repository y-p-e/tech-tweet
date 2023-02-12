import os
from dotenv import load_dotenv

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
TWITTER_REDIRECT_URI = "http://localhost:5000/twitter_auth_callback"
SCOPE = ["tweet.read", "users.read", "offline.access"]
TWITTER_CURRENT_USER_URL = 'https://api.twitter.com/2/users/me'
TWITTER_USER_PARAMS = {'user.fields': 'description', 'user.fields': 'profile_image_url'}

GOOGLE_PRIVATE_API_KEY = os.environ['GOOGLE_PRIVATE_API_KEY']
