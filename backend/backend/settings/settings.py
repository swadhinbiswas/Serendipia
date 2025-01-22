from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os 
from dotenv import load_dotenv
load_dotenv()



class Settings:
    def __init__(self):
        # self.api_key = os.getenv("API_KEY")
        # self.base_url = os.getenv("BASE_URL")
        self.engine = create_engine(os.getenv("DATABASEURL"))
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()
        




settings = Settings()

