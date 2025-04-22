import jwt
import bcrypt
from datetime import datetime, timedelta
from constants import JWTConfig

def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_byte_enc = plain_password.encode('utf-8')
    
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
        
    return bcrypt.checkpw(password = password_byte_enc , hashed_password = hashed_password)


def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password.decode('utf-8')

def create_jwt_token(
    user_id: str,
    full_name: str,
    expires_delta: timedelta,
):
    """
    Generate jwt token for the user.
    """
    expire = datetime.now() + expires_delta
    to_encode = {
        "sub": user_id,
        "name": full_name,
        "exp": expire,
    }
    encoded_jwt = jwt.encode(
        to_encode, JWTConfig.SECRET_KEY, algorithm=JWTConfig.ALGORITHM
    )
    return encoded_jwt