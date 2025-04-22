from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import Annotated
from database import get_db
from .schema import UserSchema, Login, GenericResponse, RefreshToken, AccessToken, LoginResponse
from .service import create_new_user, sign_in_user, refresh_token

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/sign-up", response_model=GenericResponse)
def sign_up(user: UserSchema, db: Annotated[Session, Depends(get_db)]):
    try:
        create_new_user(user, db)
        return JSONResponse(
            content={"message": "User created successfully"},
            status_code=200,
        )
    except HTTPException as e:
        return JSONResponse(
            content={"message": e.detail},
            status_code=e.status_code,
        )

@router.post("/sign-in", response_model=LoginResponse)
def sign_in(user: Login, db: Annotated[Session, Depends(get_db)]):
    try:
        signed_in_user = sign_in_user(user, db)
        return signed_in_user
    except HTTPException as e:
        return JSONResponse(
            content={"message": e.detail},
            status_code=e.status_code,
        )

@router.post("/refresh", response_model=AccessToken)
def refresh(token: RefreshToken, db: Annotated[Session, Depends(get_db)]):
    """
    Refresh the access token using the refresh token.
    """
    try:
        new_access_token = refresh_token(token.refresh_token, db)
        return new_access_token
    except HTTPException as e:
        return JSONResponse(
            content={"message": e.detail},
            status_code=e.status_code,
        )