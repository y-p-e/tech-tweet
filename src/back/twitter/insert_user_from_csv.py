import sys
import csv
from .save_tweet_user import save_tweet_user, TweetUserData

def insert_user_from_csv():
	with open('data/user.csv', 'r') as f:
		reader = csv.reader(f)
		header = next(reader)
		for line in reader:
			data = TweetUserData(
				username=line[1],
				category_id=int(line[0])
			)
			save_tweet_user(data)