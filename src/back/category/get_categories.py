from models.models import Category
from pydantic import BaseModel
from typing import List


class CategoryModel(BaseModel):
  id: int
  name: str
  img_url: str

  class Config:
    orm_mode = True

class CategoryListModel(BaseModel):
  categories: List[CategoryModel]


def get_tweet_category(session):
  categories = session.query(Category).all()
  category_list = CategoryListModel(categories=categories)
  return category_list.categories