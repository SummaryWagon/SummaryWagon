from fastapi import HTTPException, status

from . import articles_repository
from ..users import users_repository

from .articles_schema import addArticleDto
from ..models import ResponseModel

from ..utils.bs4.preprocess import bs4_preprocess, og_parsing, text_parsing, load_text
from ..utils.bs4.keyword import keyword_finder
from ..utils.chat_gpt.summary import summarize
from ..utils.thumbnail.image_resizing import upload_to_s3

from time import time, process_time
from datetime import datetime
from decouple import config

from ..redis import limiter, checker, hget_all_cache, hmset_cache

IMAGE_URL = config('IMAGE_URL')
DEFAULT_IMAGE_URL = config('DEFAULT_IMAGE_URL')
LIMIT = int(config('LIMIT'))


async def read_articles(email: str):
    user = await users_repository.find_user_by_email(email)
    article_ids = user["article_ids"]

    if len(article_ids) == 0:
        raise HTTPException(status_code=404, detail="Articles not found")

    return await articles_repository.find_articles(article_ids)


async def read_articles_by_category(keyword: str, page: int, limit: int):
    data = await articles_repository.find_articles_by_category(keyword, page, limit)

    if len(data["articles"]) == 0:
        raise HTTPException(status_code=404, detail="There is no article in this category.")
    
    return data


# async def read_all_articles(email: str, limit: int, next: str | None):
#     user = await users_repository.find_user_by_email(email)
#     article_ids = user["article_ids"]

#     if len(article_ids) == 0:
#         raise HTTPException(status_code=404, detail="Articles not found")

#     articles = await articles_repository.find_all_articles(article_ids, limit, next)
#     lastArticle = articles[-1]

#     has_next = await articles_repository.has_next("datetime", lastArticle)

#     if has_next:
#         next = str(lastArticle["datetime"]) + "_" + lastArticle["_id"]
#     else:
#         next = None

#     return {"articles": articles, "next": next}

# temporary offset-based pagination
async def read_all_articles(email: str, page: int, limit: int):
    user = await users_repository.find_user_by_email(email)
    article_ids = user["article_ids"]

    if len(article_ids) == 0:
        raise HTTPException(status_code=404, detail="Articles not found")

    return await articles_repository.find_all_articles(article_ids, page, limit)


async def read_hot_articles():
    articles = await articles_repository.find_hot_articles()

    if len(articles) == 0:
        raise HTTPException(status_code=404, detail="Hot Articles not found")
    
    return articles


# async def read_all_hot_articles(limit: int, next: str | None):
#     articles = await articles_repository.find_all_hot_articles(limit, next)
#     lastArticle = articles[-1]
    
#     has_next = await articles_repository.has_next("cnt", lastArticle)
    
#     if has_next:
#         next = str(lastArticle["cnt"]) + "_" + lastArticle["_id"]
#     else:
#         next = None

#     return {"articles": articles, "next": next}

# temporary offset-based pagination
async def read_all_hot_articles(page:int, limit: int):
    return await articles_repository.find_all_hot_articles(page, limit)


async def read_remain_cnt(email: str):
    return checker(email)


async def get_keyword():
    cache = hget_all_cache("keyword")

    if cache:
        return cache
    
    else:
        keywordList = await articles_repository.find_keyword()
        keywordDict = {}

        for keywords in keywordList:
            for keyword in keywords:

                if keyword in keywordDict:
                    keywordDict[keyword] += 1
                else:
                    keywordDict[keyword] = 1

        sortedKeyword = sorted(keywordDict.items(), key=lambda x: x[1], reverse=True)
        
        # 5개만 추출
        value = dict(sortedKeyword[:5])
        hmset_cache("keyword", value)

        return hget_all_cache("keyword")


async def read_article(article_id: str):
    return await articles_repository.find_article(article_id)


async def add_article(addArticleDto: addArticleDto):
    # start_time = process_time()
    start_time = time()

    email = addArticleDto.email
    link = addArticleDto.link

    rate_limit = ''

    # 기사가 이미 존재하는지 확인
    isArticle = await articles_repository.find_article_by_link(link)
    
    if isArticle:
        # 유저가 이미 기사를 찾았는지 확인
        isSameUser = await users_repository.find_user_by_article_id(email, isArticle)

        if isSameUser is None:
            # rate limit 적용
            rate_limit = limiter(email, LIMIT)

            if rate_limit["call"] == False:
                raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail={"message": "call limit reached", "ttl": rate_limit["ttl"]})
            
            await users_repository.update_user(email, isArticle)
            await articles_repository.update_article_cnt(isArticle)

        else:
            rate_limit = checker(email)

        return ResponseModel(isArticle, rate_limit, "Article already exists in DB.")
    
    # rate limit 적용
    rate_limit = limiter(email, LIMIT)

    if rate_limit["call"] == False:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail={"message": "call limit reached", "ttl": rate_limit["ttl"]})

    # text 및 title, image 파싱
    soup = bs4_preprocess(link)
    text_parsing(soup)
    og_info = og_parsing(soup)
    content = load_text()
    
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
        "categories": keyword
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

    return ResponseModel(article_id, rate_limit, "Article added successfully.")
