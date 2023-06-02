from fastapi import FastAPI
from .articles import articles_router
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


app.include_router(articles_router.router)


@app.get("/")
async def root():
    return {"Greetings" : "Hello, World"}