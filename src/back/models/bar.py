from sqlalchemy import Integer, Column, String
from database import Base


class Bar(Base):
    __tablename__ = "bars"

    id = Column(Integer, primary_key=True)
    name = Column(String(200))