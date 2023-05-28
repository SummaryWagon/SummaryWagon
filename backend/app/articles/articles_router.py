from fastapi import APIRouter
from . import articles_service
from .articles_schema import addArticleDto


router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)


@router.get("/")
async def read_articles(email: str):
    return await articles_service.read_articles(email)


@router.post("/")
async def add_article(addArticleDto: addArticleDto):
    return await articles_service.add_article(addArticleDto)