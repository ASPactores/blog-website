from fastapi import HTTPException, status, Security
from fastapi.security import HTTPBearer
from fastapi.security import APIKeyHeader, HTTPAuthorizationCredentials
from constants import JWTConfig
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Depends
from database import get_db
from models import User

import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

token_key = APIKeyHeader(name="Authorization")

async def validate_token(
    db: Annotated[Session, Depends(get_db)],
    credentials: HTTPAuthorizationCredentials = Security(HTTPBearer()),
):
    """
    Validate the token passed in the request header.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials not provided",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    
    try:
        # Decode and verify the token
        payload = jwt.decode(
            token,
            JWTConfig.SECRET_KEY,
            algorithms=[JWTConfig.ALGORITHM],
        )
        
        # Extract user ID from payload
        user_id = payload.get("sub")
        print(f"User ID from token: {user_id}")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Fetch user from database
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"}, 
            )
            
        return user
        
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Authentication error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
