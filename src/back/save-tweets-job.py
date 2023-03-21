import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ['API_KEY']
BASE_URL = os.environ['BASE_URL']

def main():
	url = f'{BASE_URL}/tweets'
	headers = {"access_token": API_KEY}
	requests.request("POST", url, headers=headers)

if __name__ == "__main__":
	main()