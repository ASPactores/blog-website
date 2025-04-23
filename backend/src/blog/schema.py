from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field
from enum import Enum

class CategoryEnum(str, Enum):
    TECHNOLOGY = "technology"
    HEALTH = "health"
    FINANCE = "finance"
    LIFESTYLE = "lifestyle"
    TRAVEL = "travel"
    FOOD = "food"
    BUSINESS = "business"
    EDUCATION = "education"
    

class BlogPostSchema(BaseModel):
    title: str
    content: str = Field(..., min_length=1)
    category: CategoryEnum
    
class BlogPostSchemaInDB(BlogPostSchema):
    id: UUID
    author_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None