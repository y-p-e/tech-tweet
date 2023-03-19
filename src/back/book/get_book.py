from models.models import Book, Category
from pydantic import BaseModel
from typing import List
import random

class BookModel(BaseModel):
  id: int
  title: str
  description: str
  img: str
  url: str

  class Config:
    orm_mode = True

class BookCategoryModel(BaseModel):
  category_id: int
  books: List[BookModel]


def get_book_data(session):
  categories = session.query(Category).order_by(Category.id).all()
  books = session.query(Book).all()
  book_list = []
  for book in books:
    book_model = BookModel.from_orm(book)
    book_list.append(book_model)

  book_dict = {}
  response_list = []
  for category in categories:
    book_dict[category.id] = []
    random.shuffle(book_list)
    book_category_model = BookCategoryModel(
      category_id=category.id,
      books=book_list,
    )
    response_list.append(book_category_model)
  return response_list