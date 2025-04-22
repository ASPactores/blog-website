from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, String, UUID
import uuid


# Base = declarative_base()


class Base(DeclarativeBase):
    """Base class for SQLAlchemy models.

    This class serves as the base for all SQLAlchemy models in the application.
    It inherits from `DeclarativeBase`, which provides the necessary functionality
    for SQLAlchemy's ORM (Object-Relational Mapping) system.
    """

    pass


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


class Item(Base):
    """Item model for the application."""

    __tablename__ = "items"
    id = Column(
        UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4
    )
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(
        String, nullable=False
    )  # Consider using a more appropriate type for price
    quantity = Column(
        String, nullable=False
    )  # Consider using a more appropriate type for quantity
