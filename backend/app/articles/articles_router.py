from fastapi import APIRouter, HTTPException, status
from . import articles_service
from .articles_schema import addArticleDto, getKeywordDto
from ..redis import limiter


router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)


@router.get("/")
async def read_articles(email: str):
    return await articles_service.read_articles(email)


@router.get("/all")
async def read_all_articles(email: str, limit: int, next: str | None = None):
    return await articles_service.read_all_articles(email, limit, next)


@router.get("/hot")
async def read_hot_articles():
    return await articles_service.read_hot_articles()

  
# 카테고리 별 hot articles로 개선 가능
@router.get("/hot/all")
async def read_all_hot_articles(limit: int, next: str | None = None):
    return await articles_service.read_all_hot_articles(limit, next)


@router.get("/{article_id}")
async def read_article(article_id: str):
    return await articles_service.read_article(article_id)


@router.post("/")
async def add_article(addArticleDto: addArticleDto):
    client = addArticleDto.email

    res = limiter(client, 5)

    if res["call"]:
        return await articles_service.add_article(addArticleDto)
    else:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail={"message": "call limit reached", "ttl": res["ttl"]})
    
    return await articles_service.add_article(addArticleDto)


@router.post("/keyword")
async def get_keyword(getKeywordDto: getKeywordDto):
    return await articles_service.get_keyword(getKeywordDto)
