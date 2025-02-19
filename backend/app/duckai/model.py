from enum import Enum
from pydantic import BaseModel
from typing import List
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

from app.duckai.duckmodel import ModelType

Base = declarative_base()

class Role(str, Enum):
    user = "user"
    assistant = "assistant"


class Message(Base):
    __tablename__ = "messages"
    id = Column(String, primary_key=True)
    role = Column(String, nullable=False)
    content = Column(String, nullable=False)
    history_id = Column(String, ForeignKey("history.id"))


class History(Base):
    __tablename__ = "history"
    id = Column(String, primary_key=True)
    model = Column(String, nullable=False)
    messages = relationship("Message", backref="history")

    def add_input(self, message: str) -> None:
        self.messages.append(Message(role=Role.user.value, content=message))

    def add_answer(self, message: str) -> None:
        self.messages.append(Message(role=Role.assistant.value, content=message))
