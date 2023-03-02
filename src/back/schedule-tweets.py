import schedule
import time
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ['API_KEY']

def do_task():
	url = 'http://0.0.0.0:8000/tweets	'
	headers = {"access_token": API_KEY}
	response = requests.request("POST", url, headers=headers)
	print(response.json())

def main():
	schedule.every().day.at("15:00").do(do_task)
	while True:
			schedule.run_pending()
			time.sleep(1800)
	
if __name__ == "__main__":
	main()