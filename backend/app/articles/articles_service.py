from fastapi import HTTPException

from . import articles_repository
from ..users import users_repository

from .articles_schema import addArticleDto, getKeywordDto
from ..models import ResponseModel

from ..utils.bs4.preprocess import og_parsing, text_parsing, load_text
from ..utils.bs4.keyword import keyword_finder
from ..utils.chat_gpt.summary import summarize
from ..utils.thumbnail.image_resizing import upload_to_s3

from time import time, process_time
from datetime import datetime
from decouple import config

IMAGE_URL = config('IMAGE_URL')
DEFAULT_IMAGE_URL = config('DEFAULT_IMAGE_URL')


async def read_articles(email: str):
    user = await users_repository.find_user_by_email(email)
    article_ids = user["article_ids"]

    if len(article_ids) == 0:
        raise HTTPException(status_code=404, detail="Articles not found")

    return await articles_repository.find_articles(article_ids)


async def read_all_articles(email: str, limit: int, next: str | None):
    user = await users_repository.find_user_by_email(email)
    article_ids = user["article_ids"]

    if len(article_ids) == 0:
        raise HTTPException(status_code=404, detail="Articles not found")

    articles = await articles_repository.find_all_articles(article_ids, limit, next)

    if len(articles) == 0:
        raise HTTPException(status_code=404, detail="This page is the last page.")

    lastArticle = articles[-1]
    next = str(lastArticle["datetime"]) + "_" + lastArticle["_id"]

    return {"articles": articles, "next": next}


async def read_hot_articles():
    articles = await articles_repository.find_hot_articles()

    if len(articles) == 0:
        raise HTTPException(status_code=404, detail="Hot Articles not found")
    
    return articles


async def read_all_hot_articles(limit: int, next: str | None):
    articles = await articles_repository.find_all_hot_articles(limit, next)
    
    if len(articles) == 0:
        raise HTTPException(status_code=404, detail="This page is the last page.")

    lastArticle = articles[-1]
    next = str(lastArticle["cnt"]) + "_" + lastArticle["_id"]

    return {"articles": articles, "next": next}


async def read_article(article_id: str):
    return await articles_repository.find_article(article_id)


async def add_article(addArticleDto: addArticleDto):
    # start_time = process_time()
    start_time = time()

    email = addArticleDto.email
    link = addArticleDto.link

    # 기사가 이미 존재하는지 확인
    isArticle = await articles_repository.find_article_by_link(link)
    
    if isArticle:
        isArticle_id = isArticle["_id"]
        await articles_repository.update_article_cnt(isArticle_id)

        isSameUser = await users_repository.find_user_by_article_id(email, isArticle_id)

        if isSameUser is None:
            await users_repository.update_user(email, isArticle_id)

        return ResponseModel(isArticle, "Article already exists in DB.")
    
    # text 및 title, image 파싱
    text_parsing(link)
    content = load_text()
    og_info = og_parsing(link)
    
    title = og_info['og_title']
    image = og_info['og_image']
    image_content_type = og_info['og_image_content_type']
    desc = og_info["og_desc"]
    
    
    # keyword 추출
    keyword = keyword_finder(content)
    
    # text 요약
    summary = summarize(content)

    article = {
        "link": link,
        "datetime": datetime.now(),
        "title": title,
        "image": image,
        "cnt": 1,
        "summary": summary,
        "description": desc,
        "categories": [keyword]
    }

    article_id = await articles_repository.add_article(article)
    
    # file extension setting 
    idx_start = image_content_type.find('/')
    extension = image_content_type[(idx_start+1):]

    # image_resizing 
    upload_to_s3(article_id, image, extension)
    image_url = IMAGE_URL + 'resized-' + article_id + "." + extension
    
    await articles_repository.update_article(article_id, image_url)
    print("Resized image updated to DB successfully")
    
    # 유저 히스토리에 추가
    await users_repository.update_user(email, article_id)

    # end_time = process_time()
    end_time = time()
    print("time: ", end_time - start_time)

    return ResponseModel(article_id, "Article added successfully.")


async def get_keyword(getKeywordDto: getKeywordDto):
    text_parsing(getKeywordDto.link)
    content = load_text()
    keyword = keyword_finder(content)
    
    return keyword