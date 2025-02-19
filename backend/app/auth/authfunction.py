from datetime import datetime,timedelta
from typing import Optional
from jose import JWTError, jwt
from settings.settings import SECRET_KEY,ALGORITHM,ACCESS_TOKEN_EXPIRE_MINUTES,REFRESH_TOKEN_EXPIRE_DAYS


class AuthFunction:
    def create_access_token(data:dict,expires_delta:timedelta = None):
        to_encode=data.copy()
        expire=datetime.now()+(expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp":expire})
        access_token =jwt.encode(data,SECRET_KEY,algorithm=ALGORITHM)
        return access_token
      
    def create_refresh_token(data:dict,expires_delta:timedelta = None):
        to_encode=data.copy()
        expire=datetime.now()+(expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
        to_encode.update({"exp":expire})
        encoded_refreshtoken=jwt.encode(data,SECRET_KEY,algorithm=ALGORITHM)
        return encoded_refreshtoken
    def verify_token(token:str):
        try:
            payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
            return payload
        except JWTError:
            return None