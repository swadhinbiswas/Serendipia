from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,UUID,Boolean
from app.models import User, UserProfile, UserToken
import uuid
from datetime import datetime
from sqlalchemy.orm import relationship
Base = declarative_base()

class Chatsession(Base):
    __tablename__ = 'chatsessions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    title= Column(String,nullable=True)
    created_at = Column(DateTime, default=datetime.now())
    messages = relationship("Chatmessage", backref="chatsessions",cascade="all, delete-orphan")
   


class Chatmessage(Base):
    __tablename__ = 'chatmessages'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
    chat_id = Column(UUID(as_uuid=True), ForeignKey('chatsessions.id'))
    message = Column(String,nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())
    session= relationship("Chatsession", backref="chatmessages")

class Prompt(Base):
    __tablename__ = 'prompts'
    id= Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prompt = Column(String,nullable=False)
    imagepath= Column(String,nullable=True)
    

