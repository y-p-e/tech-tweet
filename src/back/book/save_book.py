from models.models import Book, Category
from database import session
from pydantic import BaseModel
from fastapi import HTTPException

class BookData(BaseModel):
    title: str
    img: str
    description: str 
    url: str
    category_name: str


def save_book_data(book_data: BookData):
  category = session.query(Category).filter(Category.name == book_data.category_name).one_or_none()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")

  book = Book()
  book.title = book_data.title
  book.img = book_data.img
  book.url = book_data.url
  book.description = book_data.description
  book.category_id = category.id
  session.add(book)
  session.commit()
