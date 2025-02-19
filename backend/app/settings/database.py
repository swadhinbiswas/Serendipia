from .settings import DATABASEURL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

class Database:
    def __init__(self):
        self.engine = create_engine(DATABASEURL)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()
        self.Base.metadata.create_all(bind=self.engine)
        self.db = self.SessionLocal()
        
    def get_db(self):
        db = self.db
        try:
            yield db
        finally:
            db.close()
        
        



database = Database()

