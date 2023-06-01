from fastapi import APIRouter
from . import articles_service
from .articles_schema import addArticleDto, getKeywordDto


router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)


@router.get("/")
async def read_all_articles(email: str):
    return await articles_service.read_all_articles(email)


@router.get("/hot")
async def read_hot_articles():
    return await articles_service.read_hot_articles()


@router.get("/{article_id}")
async def read_article(article_id: str):
    return await articles_service.read_article(article_id)


@router.post("/")
async def add_article(addArticleDto: addArticleDto):
    return await articles_service.add_article(addArticleDto)


@router.post("/keyword")
async def get_keyword(getKeywordDto: getKeywordDto):
    return await articles_service.get_keyword(getKeywordDto)