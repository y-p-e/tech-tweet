from models.models import Book, Category
from database import session
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


def get_book_data():
  categories = session.query(Category).order_by(Category.id).all()
  book_dict = {}
  response_list = []
  for category in categories:
    book_dict[category.id] = []
    books = session.query(Book).filter(Book.category_id == category.id).all()
    book_list = []
    for book in books:
      book_model = BookModel.from_orm(book)
      book_list.append(book_model)

    random.shuffle(book_list)
    book_category_model = BookCategoryModel(
      category_id=category.id,
      books=book_list,
    )
    response_list.append(book_category_model)
  return response_list