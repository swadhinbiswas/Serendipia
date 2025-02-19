from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,UUID,Boolean
import uuid
from functions import PasswordHashing
from datetime import datetime
from sqlalchemy.orm import relationship
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
    username= Column(String, unique=True)
    refreshtoken = Column(String,nullable=True, default=None, unique=False,blank=True)
    email = Column(String, unique=True)
    password = Column(PasswordHashing)
    balance = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())
    last_login = Column(DateTime, default=datetime.now())
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)



class UserProfile(Base):
    __tablename__ = 'user_profiles'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    first_name = Column(String)
    last_name = Column(String)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())
    user = relationship("User", backref="user_profiles")
    
    

class UserToken(Base):
    __tablename__ = 'user_tokens'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    token = Column(String, unique=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    


# class Chatsession(Base):
#     __tablename__ = 'chatsessions'
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
#     user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
#     session_id = Column(UUID(as_uuid=True),default=uuid.uuid4)
#     created_at = Column(DateTime, default=datetime.now())
#     messages = relationship("Chatmessage", backref="chatsessions",cascade="all, delete-orphan")
   


# class Chatmessage(Base):
#     __tablename__ = 'chatmessages'
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
#     chat_id = Column(UUID(as_uuid=True), ForeignKey('chatsessions.id'))
#     message = Column(String,nullable=False)
#     created_at = Column(DateTime, default=datetime.now())
#     updated_at = Column(DateTime, default=datetime.now())
#     session= relationship("Chatsession", backref="chatmessages")


# class UserImage(Base):
#     __tablename__ = 'user_images'
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
#     user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
#     image = Column(String,nullable=False)
#     created_at = Column(DateTime, default=datetime.now())
#     updated_at = Column(DateTime, default=datetime.now())
#     user = relationship("User", backref="user_images")


    
