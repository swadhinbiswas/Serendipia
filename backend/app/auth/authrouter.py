from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime 
from app.auth import PasswordHashing, AuthFunction
from app.settings import database 
from app.models import User
from sqlalchemy.orm import Session


authrouter = APIRouter()
auth2 = OAuth2PasswordBearer(tokenUrl="token")
db=database.db

def authenticate_user(db,username:str,password:str):
   user=db.query(User).filter(User.username==username).first()
   if user and PasswordHashing().verify_password(password,user.password):
       return user

async def get_current_user(token:str=Depends(auth2),db:Session=Depends(database.get_db)):
    payload=AuthFunction.verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid token")
    user=db.query(User).filter(User.username==payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid token")
    return user
# ✅ Login & Get Tokens

@authrouter.post("/token")
async def login(form_data:OAuth2PasswordRequestForm=Depends()):
    user=authenticate_user(db,form_data.username,
                           form_data.password)
    if not user:
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                              detail="Incorrect username or password")
    access_token=AuthFunction.create_access_token(data={"sub":user.username})
    refresh_token=AuthFunction.create_refresh_token(data={"sub":user.username})
    
    user.refreshtoken=refresh_token
    user.last_login=datetime.now()
    db.commit()
    return {
          "username":user.username,
          "user_id":user.id,
         "access_token":access_token,
         "refresh_token":refresh_token,
         "token_type":"bearer"
         
    }
# ✅ Refresh Token
@authrouter.post("/refresh")
async def refresh(refresh_token:str=Depends(auth2)):
    user=authenticate_user(db,refresh_token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid token")
    access_token=AuthFunction.create_access_token(data={"sub":user.username})
    return {
       "user_id":user.id,
        "access_token":access_token,
        "token_type":"bearer"
    }
# ✅ Logout
@authrouter.post("/logout")
async def logout(token:str=Depends(auth2),db:Session=Depends(database.get_db)):
   try:
       payload=AuthFunction.verify_token(token)
       if not payload:
           raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                               detail="Invalid token")
       user=db.query(User).filter(User.username==payload.get("sub")).first()
       
       if not user:
           raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                               detail="Invalid token")
       user.refreshtoken=None
       
       
       db.commit() 
       return {
            "message":"Logout successful",
         }
       
   except JWTError:
       raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                           detail="Invalid token")
       
       
       
@authrouter.get("/me")
async def me(token:str=Depends(auth2)):
    payload=AuthFunction.verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid token")
    return payload
 
# ✅ Register User
# @authrouter.post("/register")
# async def register_user(username:str,email:str,password:str,db:Session=Depends(database.get_db)):
#      user=db.query(User).filter(User.username==username).first()
#      emails=db.query(User).filter(User.email==email).first()
#      if email or user:
#          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
#                              detail="User already exists")
     
#      hashed_password=PasswordHashing().process_bind_param(password,None)
     
     