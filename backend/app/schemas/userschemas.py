from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID
from datatime import datetime

class CreateUser(BaseModel):
    email: EmailStr
    username:str
    password: str
    password2: str


class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    created_at: datetime
    updated_at: datetime
    last_login: datetime
    is_active: bool


class Login(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    logintime: datetime
    user: UserResponse


class NewToken(BaseModel):
    refresh_token: str
    token: str
    expires_in: int
    token_type: str
    

# class CompleteProfile(BaseModel):
#     first_name: str
#     last_name: str
#     user_id: UUID
#     username: str
#     email: EmailStr
#     balance: int
#     created_at: datetime
#     updated_at: datetime
#     last_login: datetime
#     profile_picture: str


