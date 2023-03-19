from models.models import Category
from pydantic import BaseModel


class CategoryData(BaseModel):
    name: str
    img_url: str 


def save_tweet_category(category_data: CategoryData, session):
  category = Category()
  category.name = category_data.name
  category.img_url = category_data.img_url
  session.add(category)
  session.commit()
