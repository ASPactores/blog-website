from pydantic import BaseModel, EmailStr, Field
from enum import Enum

class CategoryEnum(str, Enum):
    TECHNOLOGY = "Technology"
    LIFESTYLE = "Lifestyle"
    EDUCATION = "Education"
    HEALTH = "Health"

class BlogPostSchema(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=1)
    category: CategoryEnum
    
class BlogPostSchemaInDB(BlogPostSchema):
    pass
