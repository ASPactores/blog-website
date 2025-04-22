import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Database settings
    DB_URL: str = os.getenv(
        "DB_URL",
        f"postgresql+psycopg2://{os.getenv('POSTGRES_USER', 'postgres')}:"
        f"{os.getenv('POSTGRES_PASSWORD', 'postgres')}@db:5432/"
        f"{os.getenv('POSTGRES_DB', 'postgres')}",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
