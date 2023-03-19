from sqlalchemy import Integer, Column, String, DateTime, ForeignKey, text
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from sqlalchemy.orm import relationship

from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    user_id = Column(String(255), nullable=False, unique=True)
    username = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    profile_image_url = Column(String(255), nullable=False)
    session_id = Column(String(255), nullable=False)
    refresh_token = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    updated_at = Column(DateTime, default=datetime.now, server_default=text('CURRENT_TIMESTAMP'), server_onupdate=text('CURRENT_TIMESTAMP'))


class Category(Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    img_url = Column(String(255), nullable=False)
	

class TweetUser(Base):
    __tablename__ = "tweet_user"
    id = Column(Integer, primary_key=True)
    user_id = Column(String(255), nullable=False, unique=True)
    user_name = Column(String(255), nullable=False, unique=True)
    profile_img_url = Column(String(255), nullable=False)
    category_id = Column(Integer, nullable=False)


class Tweet(Base):
    __tablename__ = "tweet"
    id = Column(Integer, primary_key=True)
    tweet_id = Column(String(255), nullable=False, unique=True)
    tweet_en = Column(MEDIUMTEXT, nullable=False)
    tweet_ja = Column(MEDIUMTEXT, nullable=False)
    category_id = Column(Integer, nullable=False)
    tweet_url = Column(String(255), nullable=False)
    tweet_user_id = Column(Integer, nullable=False)
    tweeted_at = Column(DateTime, default=datetime.now, nullable=False)


class FirstDefaultCategory(Base):
  __tablename__ = "first_default_category"
  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, unique=True)
  category_id = Column(Integer)


class SecondDefaultCategory(Base):
  __tablename__ = "second_default_category"
  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, unique=True)
  category_id = Column(Integer)


class Book(Base):
  __tablename__ = "book"
  id = Column(Integer, primary_key=True)
  img = Column(String(255), nullable=False)
  title = Column(String(255), nullable=False)
  description = Column(String(1000), nullable=False)
  url = Column(String(255), nullable=False)