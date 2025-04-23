from database import get_db
from models import BlogPost, User
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Depends, HTTPException, status
from typing import List, Annotated
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate




from .schema import BlogPostSchema, BlogPostSchemaInDB, IndividualBlogPostSchema

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

    return BlogPostSchemaInDB(
        id=new_blog_post.id,
        title=new_blog_post.title,
        content=new_blog_post.content,
        author_id=new_blog_post.author_id,
        created_at=new_blog_post.created_at,
        updated_at=new_blog_post.updated_at,
        category=new_blog_post.category,
    )

def get_all_blog_posts(db: Annotated[Session, Depends(get_db)]) -> Page[BlogPostSchemaInDB]:
    """
    Get all blog posts from the database.
    """
    posts = paginate(db, select(BlogPost).order_by(BlogPost.created_at.desc()))
    return posts

def get_blog_post_by_id(
    db: Annotated[Session, Depends(get_db)], post_id: str
) -> IndividualBlogPostSchema:
    """
    Get a blog post by its ID.
    """
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if post:
        author = db.query(User).filter(User.id == post.author_id).first()
        if author:
            post.author_first_name = author.first_name
            post.author_last_name = author.last_name
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found",
        )
    print(f"Post: {post}")
    return IndividualBlogPostSchema(
        id=post.id,
        title=post.title,
        content=post.content,
        author_id=post.author_id,
        author_first_name=post.author_first_name,
        author_last_name=post.author_last_name,
        created_at=post.created_at,
        updated_at=post.updated_at,
        category=post.category,
    )

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

def edit_blog_post(
    db: Annotated[Session, Depends(get_db)],
    post_id: str,
    blog_post: BlogPostSchema,
    user_id: str,
) -> BlogPostSchemaInDB:
    """
    Edit an existing blog post in the database.
    """
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found",
        )

    if post.author_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit this blog post",
        )

    post.title = blog_post.title
    post.content = blog_post.content
    post.category = blog_post.category

    db.commit()
    db.refresh(post)

    return post

def delete_blog_post(
    db: Annotated[Session, Depends(get_db)], post_id: str, user_id: str
) -> BlogPostSchemaInDB:
    """
    Delete a blog post from the database.
    """
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found",
        )

    if post.author_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete this blog post",
        )

    db.delete(post)
    db.commit()

    return post