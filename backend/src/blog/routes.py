from fastapi import APIRouter, Depends, HTTPException
from dependency import validate_token
from sqlalchemy.orm import Session
from typing import Annotated
from database import get_db

from .service import create_blog_post
from .schema import BlogPostSchema, BlogPostSchemaInDB



router = APIRouter(
    prefix="/blog",
    tags=["blog"],
)

@router.post("/create", response_model=BlogPostSchemaInDB)
def create_post(
    blog_post: BlogPostSchema,
    user: Annotated[dict, Depends(validate_token)],
    db: Annotated[Session, Depends(get_db)]
):
    try:
        # Extract user ID from the validated token
        user_id = user.id
        
        # Create a new blog post using the service layer
        new_post = create_blog_post(blog_post=blog_post, db=db, user_id=user_id)
        
        return new_post
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error creating blog post: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while creating the blog post",
            headers={"Content-Type": "application/json"},
        )