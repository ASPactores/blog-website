from database import get_db
from models import BlogPost, User
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Depends, HTTPException, status
from typing import List, Annotated
from fastapi_pagination import Page, add_pagination, paginate



from sqlalchemy import func

from .schema import BlogPostSchema, BlogPostSchemaInDB

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

def get_all_blog_posts(db: Annotated[Session, Depends(get_db)]) -> Page[BlogPostSchemaInDB]:
    """
    Get all blog posts from the database.
    """
    posts = paginate(db, select(BlogPost).order_by(BlogPost.created_at.desc()))
    return posts

def get_self_blog_posts(
    db: Annotated[Session, Depends(get_db)], user_id: str
) -> List[BlogPostSchemaInDB]:
    """
    Get all blog posts created by the authenticated user.
    """
    posts = paginate(
        db,
        select(BlogPost).where(BlogPost.author_id == user_id).order_by(BlogPost.created_at.desc()),
    )
    if not posts:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No blog posts found for this user",
        )
    return posts