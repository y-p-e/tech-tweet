from sqlalchemy import create_engine, orm
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE = "mysql+pymysql"

USER = os.environ['MYSQL_USER']
PASSWORD = os.environ['MYSQL_PASSWORD']
HOST = os.environ['MYSQL_HOST']
PORT = "3306"
DB_NAME = os.environ['MYSQL_DATABASE']
MYSQL_ATTR_SSL_CA = os.environ['MYSQL_ATTR_SSL_CA']

DATABASE_URL = "{}://{}:{}@{}:{}/{}".format(
    DATABASE, USER, PASSWORD, HOST, PORT, DB_NAME
)

Engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "ssl_ca": MYSQL_ATTR_SSL_CA
        }
    }
)

_sessionmaker = scoped_session(
    sessionmaker(
        autocommit=False, 
        autoflush=False, 
        bind=Engine
    )
)


def db_session() -> orm.Session:
    con = _sessionmaker.connection()
    if con.invalidated:
        _sessionmaker.remove()
    return _sessionmaker()

Base = declarative_base()
