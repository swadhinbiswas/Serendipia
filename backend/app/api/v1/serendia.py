from app.core import GeminiForVector, VectorDB
from app.settings import database
import os
from typing import List, Optional
from datetime import datetime
import uuid
from app.auth import get_current_user
from app.settings import database
from sqlalchemy.orm import Session
from app.models import Chatmessage, Chatsession, Prompt
from app.models import (
    User,
    Chatmessage,
    Chatsession,
    Prompt,
)

from app.schemas import (
    MessageCreate,
    MessageResponse,
    PromptCreate,
    SessionCreateResponse,
)

from fastapi import APIRouter, Depends, HTTPException, status

AI = GeminiForVector()
DB = VectorDB()

airouter = APIRouter(prefix="api/v1/ai/", tags=["AI"])


@airouter.post("/session/",response_class=SessionCreateResponse)
async def create_session(
    db: Session = Depends(database.get_db), user: User = Depends(get_current_user)
):
    user = db.query(User).first()
    create_Session = Chatsession(
        id=uuid.uuid4(),
        title="Chat Session",
        user_id=user.id,
        created_at=datetime.now(),
        messages=[],
    )
    db.add(create_Session)
    db.commit()
    db.refresh(create_Session)
    return SessionCreateResponse(
        id=create_Session.id,
        user_id=create_Session.user_id,
        session_id=create_Session.session_id,
        created_at=create_Session.created_at,
        messages=create_Session.messages,
    )
@airouter.get("/session/",response_model=List[SessionCreateResponse])
async def get_session(
    db: Session = Depends(database.get_db), user: User = Depends(get_current_user)
):
    user = db.query(User).first()
    sessions = db.query(Chatsession).filter(Chatsession.user_id == user.id).all().order_by(Chatsession.created_at.desc())
    return sessions.order_by(Chatsession.created_at.desc())

@airouter.get("/session/{session_id}", response_model=SessionCreateResponse)
async def get_session_by_id(
    session_id: str, db: Session = Depends(database.get_db)
):
    session = db.query(Chatsession).filter(Chatsession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@airouter.post("/chat/{session_id}/messages/", response_model=MessageResponse)
async def conversion(
    session_id: str, prompt: PromptCreate, db: Session = Depends(database.get_db)
):
  session=db.query(Chatsession).filter(Chatsession.session_id==session_id).first()
  if not session:
    raise HTTPException(status_code=404,detail="Session not found")
  if prompt.imagepath:
    chatresponse=AI.chatwithImage(image=prompt.imagepath,prompt=prompt.prompt)
  else:
    try:
      search_response=DB.search_on_DATABSE(prompt.prompt)
      if search_response:
        chatresponse=search_response
      else:
        chatresponse=AI.chattingwithAI(prompt.prompt)
        DB.add_data_to_collection(question=prompt.prompt,answer=chatresponse)
    except Exception:
      return HTTPException(status_code=500,detail="Internal Server Error")
  message=Chatmessage(
    id=uuid.uuid4(),
    chat_id=session.id,
    message=chatresponse,
    created_at=datetime.now(),
    updated_at=datetime.now()
  )
  db.add(message)
  db.commit()
  db.refresh(message)
  return MessageResponse(
        id=message.id,
        chat_id=message.chat_id,
        message=message.message,
        created_at=message.created_at,
        updated_at=message.updated_at,
        session=session.id
    )

# @airouter.post("/session/", response_model=SessionCreateResponse, status_code=201)
# async def create_session(
#     db: Session = Depends(database.get_db), user: User = Depends(get_current_user)
# ):
#     user = db.query(User).first()
#     create_Session = Chatsession(
#         id=uuid.uuid4(),
#         user_id=user.id,
#         session_id=uuid.uuid4(),
#         created_at=datetime.now(),
#         messages=[],
#     )
#     db.add(create_Session)
#     db.commit()
#     db.refresh(create_Session)
#     return {
#         "id": create_Session.id,
#         "user_id": create_Session.user_id,
#         "session_id": create_Session.session_id,
#         "created_at": create_Session.created_at,
#         "messages": create_Session.messages,

#     }
    



@airouter.post("/chat/{session_id}", response_model=MessageResponse)
async def chatbot(
    session_id: str, prompt: PromptCreate, db: Session = Depends(database.get_db)
):
    session = (
        database.query(Chatsession).filter(Chatsession.session_id == session_id).first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if prompt.imagepath:
        chatresponse = AI.chatwithImage(image=prompt.imagepath, prompt=prompt.prompt)
    else:
        try:
            search_response = DB.search_on_DATABSE(prompt.prompt)
            if search_response:
                chatresponse = search_response
            else:
                chatresponse = AI.chattingwithAI(prompt.prompt)
                DB.add_data_to_collection(question=prompt.prompt, answer=chatresponse)
        except Exception:
            return HTTPException(status_code=500, detail="Internal Server Error")
    message = Chatmessage(
        id=uuid.uuid4(),
        chat_id=session.id,
        message=chatresponse,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return {
        "id": message.id,
        "chat_id": message.chat_id,
        "message": message.message,
        "created_at": message.created_at,
        "updated_at": message.updated_at,
        "session": session.id,
        "user": session.user_id,
    }
