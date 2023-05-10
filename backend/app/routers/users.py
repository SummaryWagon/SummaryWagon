from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from time import time, process_time

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

file_path = "./data/articles.txt"


@router.get("/")
async def read_user_articles(email:str):
    user_articles = await get_articles(email)
    return user_articles

#todo: 중복 체크
@router.post("/")
async def add_user_article(user:User):
    # start_time = process_time()
    start_time = time()
    # 기사 히스토리에 추가
    title, image, keyword = word_preprocess(user.link)
    text = ''''''

    f = open(file_path, "r")

    while True:
        line = f.readline()
        if not line: break
        text += line
    
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
    # end_time = process_time()
    end_time = time()
    print("time: ", end_time - start_time)
    return ResponseModel(article_id, "Article added successfully.")