import jwt
from datetime import datetime, timedelta
from typing import Annotated
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from cache import redis_client

from database import get_db
from models import User

from constants import JWTConfig
from .utils import hash_password, verify_password, create_jwt_token, blacklist_token
from .schema import UserSchema, Login, LoginResponse, AccessToken


def create_new_user(user: UserSchema, db: Annotated[Session, Depends(get_db)]):
    """
    Create a new user in the database.
    """
    # Check if the user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already has an account")

    hashed_password = hash_password(user.password)

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def authenticate_user(user_credentials: Login, db: Annotated[Session, Depends(get_db)]):
    """
    Authenticate a user with email and password.
    """
    user = db.query(User).filter(User.email == user_credentials.email).first()

    if not user or not verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=401, detail="The email or password is incorrect."
        )

    return user


def sign_in_user(user: Login, db: Annotated[Session, Depends(get_db)]):
    """
    Sign in a user and return an access token.
    """
    existing_user = authenticate_user(user, db)

    access_token_expires = timedelta(minutes=JWTConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_jwt_token(
        user_id=str(existing_user.id),
        full_name=f"{existing_user.first_name} {existing_user.last_name}",
        expires_delta=access_token_expires,
    )
    refresh_token_expires = timedelta(minutes=JWTConfig.REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token = create_jwt_token(
        user_id=str(existing_user.id),
        full_name=f"{existing_user.first_name} {existing_user.last_name}",
        expires_delta=refresh_token_expires,
    )

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        uid=str(existing_user.id),
        access_token_expires=JWTConfig.ACCESS_TOKEN_EXPIRE_MINUTES
        * 60,  # Convert minutes to seconds
    )


def refresh_token(token: str, db: Annotated[Session, Depends(get_db)]):
    """
    Refresh the access token using the refresh token.
    """
    try:
        if redis_client.exists(f"blacklist_refresh_token:{token}"):
            raise HTTPException(status_code=401, detail="Expired token")

        payload = jwt.decode(
            token,
            JWTConfig.SECRET_KEY,
            algorithms=[JWTConfig.ALGORITHM],
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        access_token_expires = timedelta(minutes=JWTConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
        new_access_token = create_jwt_token(
            user_id=user_id,
            full_name=f"{user.first_name} {user.last_name}",
            expires_delta=access_token_expires,
        )

        return AccessToken(
            access_token=new_access_token,
            access_token_expires=JWTConfig.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )  # Convert minutes to seconds
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def logout_user(access_token: str, refresh_token: str):
    """
    Logout the user by blacklisting the tokens.
    """
    try:
        blacklist_token(access_token, refresh_token)
        return {"message": "User logged out successfully"}
    except Exception as e:
        print(f"Error blacklisting tokens: {e}")
        raise HTTPException(
            status_code=500, detail="An error occurred while logging out"
        )
