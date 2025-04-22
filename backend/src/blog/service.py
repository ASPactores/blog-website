from database import get_db
from models import BlogPost, User
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from typing import List, Annotated

from sqlalchemy import func

from .schema import BlogPostSchema

def create_blog_post(
    blog_post: BlogPostSchema, db: Annotated[Session, Depends(get_db)], user_id: str
):
    """
    Create a new blog post in the database.
    """
    new_blog_post = BlogPost(
        title=blog_post.title,
        content=blog_post.content,
        author_id=user_id,
        category=blog_post.category,
    )

    db.add(new_blog_post)
    db.commit()
    db.refresh(new_blog_post)

    return new_blog_post