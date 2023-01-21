from sqlalchemy import Integer, Column
from database import Base


class Foo(Base):
    __tablename__ = "foos"

    id = Column(Integer, primary_key=True)