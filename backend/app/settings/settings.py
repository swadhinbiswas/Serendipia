from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os 
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()



class Settings:
    def __init__(self):
        # self.api_key = os.getenv("API_KEY")
        # self.base_url = os.getenv("BASE_URL")
        self.engine = create_engine(os.getenv("DATABASEURL"))
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()
        self.SECRET_KEY = os.getenv("SECRET_KEY")
        self.ALGORITHM = os.getenv("ALGORITHM")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
        self.REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))
        self.EMAIL = os.getenv("EMAIL")
        self.PASSWORD = os.getenv("PASSWORD")
        self.EMAIL_HOST = os.getenv("EMAIL_HOST")
        self.EMAIL_PORT = os.getenv("EMAIL_PORT")
        self.EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS")
        self.EMAIL_USE_SSL = os.getenv("EMAIL_USE_SSL")
        self.EMAIL_BACKEND = os.getenv("EMAIL_BACKEND")
        self.EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
        self.EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

        




settings = Settings()

