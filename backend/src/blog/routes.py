from fastapi import APIRouter, Depends, HTTPException
from dependency import validate_token
from sqlalchemy.orm import Session
from typing import Annotated
from database import get_db
from fastapi_pagination import Page, LimitOffsetPage



from .service import create_blog_post, delete_blog_post, edit_blog_post, get_all_blog_posts, get_blog_post_by_id, get_self_blog_posts
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


@router.get("/posts", response_model=LimitOffsetPage[BlogPostSchemaInDB])
def get_all_posts(
    db: Annotated[Session, Depends(get_db)]
) -> Page[BlogPostSchemaInDB]:
    """
    Get all blog posts from the database.
    """
    try:
        get_all_blog_posts_response = get_all_blog_posts(db=db)
        return get_all_blog_posts_response
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error fetching blog posts: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while fetching the blog posts",
            headers={"Content-Type": "application/json"},
        )

@router.get("/posts/{post_id}", response_model=BlogPostSchemaInDB)
def get_post_by_id(
    post_id: str,
    db: Annotated[Session, Depends(get_db)]
) -> BlogPostSchemaInDB:
    """
    Get a blog post by its ID.
    """
    try:
        post = get_blog_post_by_id(db=db, post_id=post_id)
        return post
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error fetching blog post by ID: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while fetching the blog post",
            headers={"Content-Type": "application/json"},
        )

@router.get("/self/posts", response_model=LimitOffsetPage[BlogPostSchemaInDB])
def get_self_posts(
    user: Annotated[dict, Depends(validate_token)],
    db: Annotated[Session, Depends(get_db)]
) -> Page[BlogPostSchemaInDB]:
    """
    Get all blog posts created by the authenticated user.
    """
    try:
        self_posts = get_self_blog_posts(
            db=db, user_id=user.id
        )

        return self_posts
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error fetching self blog posts: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while fetching the self blog posts",
            headers={"Content-Type": "application/json"},
        )

@router.put("/edit/{post_id}", response_model=BlogPostSchemaInDB)
def edit_post(
    post_id: str,
    blog_post: BlogPostSchema,
    user: Annotated[dict, Depends(validate_token)],
    db: Annotated[Session, Depends(get_db)]
) -> BlogPostSchemaInDB:
    """
    Edit a blog post in the database.
    """
    try:
        # Extract user ID from the validated token
        user_id = user.id
        
        # Edit the blog post using the service layer
        updated_post = edit_blog_post(
            db=db, post_id=post_id, blog_post=blog_post, user_id=user_id
        )
        
        return updated_post
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error editing blog post: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while editing the blog post",
            headers={"Content-Type": "application/json"},
        )

@router.delete("/delete/{post_id}")
def delete_post(
    post_id: str,
    user: Annotated[dict, Depends(validate_token)],
    db: Annotated[Session, Depends(get_db)]
) -> dict:
    """
    Delete a blog post from the database.
    """
    try:
        # Extract user ID from the validated token
        user_id = user.id
        
        # Delete the blog post using the service layer
        delete_blog_post_response = delete_blog_post(
            db=db, post_id=post_id, user_id=user_id
        )
        
        return delete_blog_post_response
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error deleting blog post: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while deleting the blog post",
            headers={"Content-Type": "application/json"},
        )
