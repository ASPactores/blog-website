from sqlalchemy.orm import Session
from models import BlogPost, User, Base
from database import engine, SessionLocal
from faker import Faker
import random
import bcrypt

Base.metadata.create_all(bind=engine)

fake = Faker()

def seed_data():
    db: Session = SessionLocal()
    
    try:
        db.query(BlogPost).delete()
        db.query(User).delete()
        db.commit()
        
        raw_password = fake.password()
        users = []
        for _ in range(2):
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), salt).decode('utf-8')

            user = User(
                email=fake.unique.email(),
                password=hashed_password,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
            )

            db.add(user)
            db.flush()  
            users.append(user)

        for user in users:
            db.refresh(user)
            print("User created:")
            print(f"Email: {user.email}, Password: {raw_password}")
            
        categories = [
            "technology",
            "health",
            "finance",
            "lifestyle",
            "travel",
            "food",
            "business",
            "education",
        ]
        
        for user in users:
            for _ in range(10):
                blog_post = BlogPost(
                    title = fake.sentence(nb_words=6),
                    content = fake.paragraph(nb_sentences=20),
                    category = random.choice(categories),
                    author_id = user.id,
                )
                db.add(blog_post)
        db.commit()
        print("Database seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()