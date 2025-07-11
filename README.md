# Blog Website

This is a simple blog website that enables users to create accounts and perform CRUD (Create, Read, Update, Delete) operations on blog posts. All blog posts are stored in a database and accessible to all users. An authentication system ensures that only authenticated users can manage their own blog posts.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Pre-requisites](#pre-requisites)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database Migration](#database-migration)

## Technologies Used

- Frontend: Nextjs, Tailwind CSS, Typescript
- Backend: FastAPI, Alembic, SQLAlchemy, PostgreSQL, Redis (for auth session management)

## Pre-requisites

- Docker and Docker Compose installed on your machine.
- Python 3.12 or higher installed on your machine.
- `uv` for dependency management which can be installed using the command `pip install -U uv`.
- Node.js (at least version 22) and npm installed on your machine.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ASPactores/blog-website.git
```

2. Navigate to the project directory:

```bash
cd blog-website
```

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install --legacy-peer-deps
```

3. Make a copy of the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

4. In the `.env` file, set the `NEXT_PUBLIC_API_URL` to the URL of the FastAPI backend, as follows:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Start the development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`.

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Make a copy of the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

3. In the `.env` file, set the `DATABASE_URL` to the URL of the PostgreSQL database, as follows:

```bash
DATABASE_URL=postgresql://user:password@db:5432/postgres
```

4. Create a secret key for the JWT token. You can use the following command to generate a random secret key:

```bash
openssl rand -hex 32
```

5. Set the `SECRET_KEY` in the `.env` file to the generated secret key:

```bash
SECRET_KEY=your_secret_key
```

6. Start the backend server:

```bash
docker-compose up --build -d
```

7. You can access the backend API at `http://localhost:8000` and the Swagger UI at `http://localhost:8000/docs`.

### Database Migration

To setup the database, run the following command:

1. Go to the backend directory:

```bash
cd backend
```

2. Run the Alembic migrations:

```bash
docker-compose exec backend alembic revision --autogenerate -m "Initial migration"
```

3. Apply the migrations:

```bash
docker-compose exec backend alembic upgrade head
```

4. Seed the database with initial data:

```bash
docker-compose exec backend python src/seed.py
```

5. Take note of the user credentials printed in the terminal. You can use these credentials to log in to the application.
