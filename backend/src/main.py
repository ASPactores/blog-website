from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi_pagination import add_pagination

# Routes
from auth.routes import router as auth_router
from blog.routes import router as blog_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
add_pagination(app)
app.include_router(auth_router)
app.include_router(blog_router)


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
