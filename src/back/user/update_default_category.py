from models.models import FirstDefaultCategory, SecondDefaultCategory, Category, User
from database import session
from pydantic import BaseModel
from fastapi import HTTPException


class DeaultCategory(BaseModel):
    category_id: int


def update_first_default_category(user_id, session_id, default_category: DeaultCategory):
  category = session.query(Category).filter(Category.id == int(default_category.category_id)).one_or_none()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")

  user = session.query(User).filter(User.id == user_id, User.session_id == session_id).one_or_none()
  if not user:
    raise HTTPException(status_code=404, detail="User not found")

  first_default_category = session.query(FirstDefaultCategory).filter(FirstDefaultCategory.user_id == user_id).one_or_none()
  first_default_category.category_id = default_category.category_id
  session.commit()

def update_second_default_category(user_id, session_id, default_category: DeaultCategory):
  category = session.query(Category).filter(Category.id == default_category.category_id).one_or_none()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")

  user = session.query(User).filter(User.id == user_id, User.session_id == session_id).one_or_none()
  if not user:
    raise HTTPException(status_code=404, detail="User not found")

  second_default_category = session.query(SecondDefaultCategory).filter(SecondDefaultCategory.user_id == user_id).one_or_none()
  second_default_category.category_id = default_category.category_id
  session.commit()
