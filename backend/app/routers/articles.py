from fastapi import APIRouter
from app.routers.preprocess import word_preprocess


# from ..models.article import Article
from ..database import db

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
)

# url
url = "https://techblog.woowahan.com/11072/"



@router.get("/")
async def read_articles():
    return {"Mission" : "Completed"}


""" ToDo: 추후 api 통신에 활용 예정 """
@router.get("/topic_with_request/")
async def find_articles():
     # 필요 : topic을 command에 넣기
     return {"Mission" : "Completed"}
 
 
"""article parsing """
@router.get("/details", response_description="")
async def crawling_articles():
    result = word_preprocess(url)
    
    print(result)
    
    return True
 