from . import articles_repository
from ..users import users_repository

from .articles_schema import addArticleDto
from ..models import ResponseModel

from ..utils.bs4.preprocess import word_preprocess
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

    return await articles_repository.find_articles(article_ids)


async def add_article(addArticleDto: addArticleDto):
    # start_time = process_time()
    start_time = time()

    email = addArticleDto.email
    link = addArticleDto.link
    
    # 기사 히스토리에 추가
    title, image, image_content_type, keyword = word_preprocess(link)
    default_image = DEFAULT_IMAGE_URL

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

    # file extension setting 
    idx_start = image_content_type.find('/')
    extension = image_content_type[(idx_start+1):]

    # image_resizing 
    upload_to_s3(article_id['id'], image, extension)
    image_url = IMAGE_URL + 'resized-' + article_id["id"] + "." + extension
    
    await articles_repository.update_article(article_id, image_url)
    print("Resized image updated to DB successfully")
    
    # 유저 히스토리에 추가
    updateRes = await users_repository.update_user(email, article_id)

    # end_time = process_time()
    end_time = time()
    print("time: ", end_time - start_time)

    return ResponseModel(article_id, "Article added successfully.")