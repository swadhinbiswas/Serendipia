import bcrypt
from sqlalchemy import String,TypeDecorator
class PasswordHashing(TypeDecorator):
    impl = String
    def __init__(self,round=14,**kwargs):
        self.round = round
        super().__init__(**kwargs)
    def process_bind_param(self,value,dialect):
        if value is not None:
            return bcrypt.hashpw(value.encode(),bcrypt.gensalt(self.round)).decode('utf-8')
        
        return value
    def process_result_value(self,value,dialect):
        return value
    
    def verify_password(self,plain_password,hashed_password):
        return bcrypt.checkpw(plain_password.encode(),hashed_password.encode())
    