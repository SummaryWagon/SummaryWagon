from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

from ..models.usersArticle import ResponseModel, ErrorResponseModel
from ..database import (
    get_user,
    update_user,
    get_articles,
    get_hot_articles,
    add_article
)
from .preprocess import word_preprocess
from .summary import summarize

class User(BaseModel):
    # user_id: str
    email: str
    link: str | None = None

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

text = '''Google is planning to make its search engine more "visual, snackable, personal, and human," with a focus on serving young people globally, the Wall Street Journal reported on Saturday, citing documents.

The move comes as artificial intelligence (AI) applications such as ChatGPT are rapidly gaining in popularity, highlighting a technology that could upend the way businesses and society operate.

The tech giant will nudge its service further away from "10 blue links," which is a traditional format of presenting search results and plans to incorporate more human voices as part of the shift, the report said.

At its annual I/O developer conference in the coming week, Google is expected to debut new features that allow users to carry out conversations with an AI program, a project code-named "Magi," WSJ added, citing people familiar with the matter.

Generative AI has become a buzzword this year, with applications capturing the public's fancy and sparking a rush among companies to launch similar products they believe will change the nature of work.

Google, part of Alphabet Inc., did not immediately respond to Reuters' request for comment.'''


@router.get("/")
async def read_user_articles(email:str):
    user_articles = await get_articles(email)
    return user_articles

#todo: 중복 체크
@router.post("/")
async def add_user_article(user:User):
    

    # 기사 히스토리에 추가
    title, image, keyword = word_preprocess(user.link)
    summary = summarize(text)

    article = {
        "link": user.link,
        "datetime": datetime.now(),
        "title": title,
        "image": image,
        "cnt": 1,
        "summary": summary,
        "description": summary[0], # og_description으로 수정
        "categories": [keyword]
    }
    article_id = await add_article(article)

    # 유저 히스토리에 추가
    updateRes = await update_user(user.email, article_id)
    return ResponseModel(article_id, "Article added successfully.")