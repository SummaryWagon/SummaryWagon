from . import articles_repository
from ..users import users_repository

from .articles_schema import addArticleDto
from ..models import ResponseModel

from ..utils.bs4.preprocess import word_preprocess
from ..utils.chat_gpt.summary import summarize

from time import time, process_time
from datetime import datetime


async def read_articles(email: str):
    user = await users_repository.find_user_by_email(email)
    article_ids = user["article_ids"]

    return await articles_repository.find_articles(article_ids)


async def add_article(addArticleDto: addArticleDto):
    # start_time = process_time()
    start_time = time()

    email = addArticleDto.email
    link = addArticleDto.link
    
    # 기사 히스토리에 추가
    title, image, keyword = word_preprocess(link)

    file_path = "app/data/articles.txt"
    text = ''''''

    f = open(file_path, "r")

    while True:
        line = f.readline()
        if not line: break
        text += line

    summary = summarize(text)

    article = {
        "link": link,
        "datetime": datetime.now(),
        "title": title,
        "image": image,
        "cnt": 1,
        "summary": summary,
        "description": summary[0], # og_description으로 수정
        "categories": [keyword]
    }

    article_id = await articles_repository.add_article(article)

    # 유저 히스토리에 추가
    updateRes = await users_repository.update_user(email, article_id)

    # end_time = process_time()
    end_time = time()
    print("time: ", end_time - start_time)

    return ResponseModel(article_id, "Article added successfully.")