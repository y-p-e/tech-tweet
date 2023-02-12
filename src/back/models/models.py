from sqlalchemy import Integer, Column, String, DateTime, ForeignKey, text
from sqlalchemy.dialects.mysql import TEXT
from sqlalchemy.orm import relationship

from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    user_id = Column(String(200), nullable=False, unique=True)
    username = Column(String(200), nullable=False)
    name = Column(String(200), nullable=False)
    profile_image_url = Column(String(1000), nullable=False)
    session_id = Column(String(200), nullable=False)
    refresh_token = Column(String(1000), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    updated_at = Column(DateTime, default=datetime.now, server_default=text('CURRENT_TIMESTAMP'), server_onupdate=text('CURRENT_TIMESTAMP'))

    first_default = relationship("FirstDefault", uselist=False)
    second_default = relationship("SecondDefault", uselist=False)


class Category(Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False, unique=True)
    img_url = Column(TEXT, nullable=False)
    users = relationship('TweetUser', backref='category')
	

class TweetUser(Base):
    __tablename__ = "tweet_user"
    id = Column(Integer, primary_key=True)
    user_id = Column(String(200), nullable=False, unique=True)
    url =  Column(TEXT, nullable=False)
    profile_img_url = Column(TEXT, nullable=False)
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False)
    tweets = relationship('Tweet', backref='tweet_user')


class Tweet(Base):
    __tablename__ = "tweet"
    id = Column(Integer, primary_key=True)
    tweet_id = Column(String(200), nullable=False, unique=True)
    tweet_en = Column(String(1000), nullable=False)
    tweet_ja = Column(String(1000), nullable=False)
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False)
    tweet_user_id = Column(Integer, ForeignKey('tweet_user.id'), nullable=False)
    tweeted_at = Column(DateTime, default=datetime.now, nullable=False)


class FirstDefaultCategory(Base):
  __tablename__ = "first_default_category"
  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey('user.id'), unique=True)
  category_id = Column(Integer, ForeignKey('category.id'))


class SecondDefaultCategory(Base):
  __tablename__ = "second_default_category"
  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey('user.id'), unique=True)
  category_id = Column(Integer, ForeignKey('category.id'))