from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


from typing import List, Optional

class MessageCreate(BaseModel):
    id: UUID
    chat_id: UUID
    message: str
    created_at: datetime
    updated_at: datetime
    


class MessageResponse(BaseModel):
    id: UUID
    chat_id: UUID
    message: str
    created_at: datetime
    updated_at: datetime
    session: UUID

                                                                                                                                                                                                                                                                                                                                
    
    class config:
        orm_mode = True
        from_attributes = True
    
class PromptCreate(BaseModel):
    prompt: Optional[str]=None
    imagepath: Optional[str]=None
    
    
    class config:
        orm_mode = True
        from_attributes = True

class SessionCreateResponse(BaseModel):
    id: UUID
    user_id: UUID
    session_id: UUID
    created_at: datetime
    messages: List[MessageCreate]=[]
    
    class config:
        orm_mode = True
        from_attributes = True


