from fastapi import APIRouter
from app.routers.preprocess import word_preprocess


# from ..models.article import Article
from ..database import (
    get_hot_articles,
)

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)

# url
url = "https://techblog.woowahan.com/11072/"


@router.get("/")
async def read_hot_articles():
    hot_articles = await get_hot_articles()
    return hot_articles
 
 
"""article parsing """
@router.get("/details", response_description="")
async def crawling_articles():
    result = word_preprocess(url)
    
    print(result)
    
    return True