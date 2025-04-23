from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str


class UserInDB(UserSchema):
    hashed_password: str


class Login(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    uid: str
    access_token_expires: int


class AccessToken(BaseModel):
    access_token: str
    access_token_expires: int


class RefreshToken(BaseModel):
    refresh_token: str

class GenericResponse(BaseModel):
    message: str

class Token(AccessToken, RefreshToken):
    pass