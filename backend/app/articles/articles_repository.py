from ..database import db
from bson.objectid import ObjectId
from .articles_schema import Article
from datetime import datetime


def article_helper(articles):
    for article in articles:
        article["_id"] = str(article["_id"])

    return articles


async def find_articles(article_ids: list[str]):
    articles = await db.articles.find({"_id": {"$in": [ObjectId(article_id) for article_id in article_ids]}}).sort([("datetime", -1), ("_id", -1)]).to_list(length=4)

    return article_helper(articles)


async def find_articles_by_category(keyword: str, page: int, limit: int):
    offset = (page - 1) * limit

    articles = await db.articles.find({"categories": keyword}).sort([("cnt", -1), ("_id", -1)]).skip(offset).limit(limit).to_list(length=limit)
    total = await db.articles.count_documents({"categories": keyword})

    return {"total": total, "articles": article_helper(articles)}


async def find_all_articles(article_ids: list[str], limit: int, next: str | None):
    if next is None:
        articles = await db.articles.find({"_id": {"$in": [ObjectId(article_id) for article_id in article_ids]}}).sort([("datetime", -1), ("_id", -1)]).to_list(length=limit)
    else:
        next_datetime, next_id = next.split("_")
        next_datetime_format = datetime.fromisoformat(next_datetime)
        articles = await db.articles.find({"$or": [{"datetime": {"$lt": next_datetime_format}}, {"datetime": next_datetime_format, "_id": {"$lt": ObjectId(next_id)}}]}).sort([("datetime", -1), ("_id", -1)]).to_list(length=limit)

    return article_helper(articles)


async def find_hot_articles():
    articles = await db.articles.find().sort([("cnt", -1), ("_id", -1)]).to_list(length=4)

    return article_helper(articles)


async def find_all_hot_articles(limit: int, next: str | None):
    if next is None:
        articles = await db.articles.find().sort([("cnt", -1), ("_id", -1)]).to_list(length=limit)
    else:
        next_cnt, next_id = next.split("_")
        next_cnt_format = int(next_cnt)
        articles = await db.articles.find({"$or": [{"cnt": {"$lt": next_cnt_format}}, {"cnt": next_cnt_format, "_id": {"$lt": ObjectId(next_id)}}]}).sort([("cnt", -1), ("_id", -1)]).to_list(length=limit)
        
    return article_helper(articles)


async def has_next(param: str, article):
    if param == "datetime":
        q = {"$or": [{"datetime": {"$lt": article["datetime"]}}, {"datetime": article["datetime"], "_id": {"$lt": ObjectId(article["_id"])}}]}
    elif param == "cnt":
        q = {"$or": [{"cnt": {"$lt": article["cnt"]}}, {"cnt": article["cnt"], "_id": {"$lt": ObjectId(article["_id"])}}]}
    
    r = await db.articles.find_one(q)
    
    if r is None:
        return False
    
    return True


async def find_keyword():
    keywordList = []

    async for category in db.articles.find({}, {"_id": 0, "categories": 1}):
        keywordList.append(category["categories"])

    return keywordList


async def find_article(article_id: str):
    article = await db.articles.find_one({"_id": ObjectId(article_id)}, {"_id": 0})
    
    return article


async def find_article_by_link(link: str):
    article = await db.articles.find_one({"link": link})
    
    if article is None:
        return None

    return str(article["_id"])


async def add_article(article: Article):
    newArticle = await db.articles.insert_one(article)
    
    return str(newArticle.inserted_id)


async def update_article(article_id: str, image_url: str):
    return await db.articles.update_one({"_id":ObjectId(article_id)}, {"$set":{"image":image_url}})


async def update_article_cnt(article_id: str):
    return await db.articles.update_one({"_id": ObjectId(article_id)}, {"$inc": {"cnt": 1}})
