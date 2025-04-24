from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse


from fastapi_pagination import add_pagination

# Routes
from auth.routes import router as auth_router
from blog.routes import router as blog_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
add_pagination(app)
app.include_router(auth_router)
app.include_router(blog_router)


@app.get("/", include_in_schema=False)
def hello():
    html_content = """
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome | Your App</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f9fafb;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 2.5rem;
                    color: #333;
                }
                p {
                    font-size: 1.2rem;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>BLOG API</h1>
                <p>The backend API is up and running 🚀</p>
            </div>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)