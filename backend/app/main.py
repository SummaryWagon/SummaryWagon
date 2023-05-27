from fastapi import FastAPI 
from .routers import articles, users
from decouple import config
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 

CORS_ORIGIN = config("CORS_ORIGIN")

origins = [
    CORS_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles.router)
app.include_router(users.router)


@app.get("/")
async def root():
    return {"Greetings" : "Hello, World"}