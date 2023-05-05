from fastapi import FastAPI 
from .routers import articles, users

app = FastAPI() 


app.include_router(articles.router)
app.include_router(users.router)


@app.get("/")
async def root():
    return {"Greetings" : "Hello, World"}