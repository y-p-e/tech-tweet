import json
import requests
from models.models import TweetUser, Tweet
from database import session
from const import BEARER_TOKEN, GOOGLE_PRIVATE_API_KEY
from dateutil.parser import parse

def save_translate_tweets():
  tweet_users = session.query(TweetUser).all()
  for tweet_user in tweet_users:
    url = "https://api.twitter.com/2/users/{}/tweets?tweet.fields=created_at&max_results=5".format(tweet_user.user_id)
    headers = {"Authorization": "Bearer {}".format(BEARER_TOKEN)}
    response = requests.request("GET", url, headers=headers)
    json_response = response.json()
    datas =  json_response["data"]
    for data in datas:
      tweet = Tweet()
      tweet.tweet_id = data["id"]
      tweet.tweet_en = data["text"]
      tweet.tweet_ja = "テスト"
      tweet.category_id = tweet_user.category_id
      tweet.tweet_user_id = tweet_user.id
      tweet.tweeted_at = parse(data["created_at"])

			# すでに登録済みの場合は次の処理
      regist_tweet = session.query(Tweet).filter(Tweet.tweet_id == tweet.tweet_id).one_or_none()
      if regist_tweet:
        continue

      item_data = {
				'target': 'ja',
				'source': 'en',
				'q': tweet.tweet_en
			}
      translate_response = requests.post('https://www.googleapis.com/language/translate/v2?key={}'.format(GOOGLE_PRIVATE_API_KEY), data=item_data)
      translate_text = json.loads(translate_response.text)["data"]["translations"][0]["translatedText"]
      tweet.tweet_ja = translate_text
      session.add(tweet)
  session.commit ()