from src.models import Base
from sqlalchemy import Column, String, UUID
import uuid


class User(Base):
    """User model for authentication."""

    __tablename__ = "users"
    id = Column(
        UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4
    )
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
