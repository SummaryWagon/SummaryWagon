from fastapi import FastAPI, Request, HTTPException, status
from .articles import articles_router
from decouple import config
from fastapi.middleware.cors import CORSMiddleware

from .redis import limiter

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
async def root(request: Request):
    client_ip = request.client.host
    
    res = limiter(client_ip, 5)

    if res["call"]:
        return {"Greetings" : "Hello, World", "ttl": res["ttl"]}
    else:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail={"message": "call limit reached", "ttl": res["ttl"]})
