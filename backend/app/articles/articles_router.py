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


@router.get("/category/{keyword}")
async def read_articles_by_category(keyword: str, page: int, limit: int):
    return await articles_service.read_articles_by_category(keyword, page, limit)


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


@router.get("/remainCnt")
async def read_remain_cnt(email: str):
    return await articles_service.read_remain_cnt(email)


@router.get("/keyword")
async def get_keyword():
    return await articles_service.get_keyword()


@router.get("/{article_id}")
async def read_article(article_id: str):
    return await articles_service.read_article(article_id)


@router.post("/")
async def add_article(addArticleDto: addArticleDto):
    return await articles_service.add_article(addArticleDto)
