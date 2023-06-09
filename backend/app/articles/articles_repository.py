from ..database import db
from bson.objectid import ObjectId
from .articles_schema import Article


def article_helper(articles):
    for article in articles:
        article["_id"] = str(article["_id"])

    return articles


async def find_articles(article_ids: list[str]):
    articles = await db.articles.find({"_id": {"$in": [ObjectId(article_id) for article_id in article_ids]}}).sort([("datetime", -1), ("_id", -1)]).to_list(length=4)

    return article_helper(articles)


async def find_all_articles(article_ids: list[str], limit: int, next: str | None):
    if next is None:
        articles = await db.articles.find({"_id": {"$in": [ObjectId(article_id) for article_id in article_ids]}}).sort([("datetime", -1), ("_id", -1)]).to_list(length=limit)
    else:
        next_datetime, next_id = next.split("_")
        articles = await db.articles.find({"$or": [{"datetime": {"$lt": next_datetime}}, {"_id": {"$lt": ObjectId(next_id)}}]}).sort([("datetime", -1), ("_id", -1)]).to_list(length=limit)

    return article_helper(articles)


async def find_hot_articles():
    articles = await db.articles.find().sort([("cnt", -1), ("_id", -1)]).to_list(length=4)

    return article_helper(articles)


async def find_all_hot_articles(limit: int, next: str | None):
    if next is None:
        articles = await db.articles.find().sort([("cnt", -1), ("_id", -1)]).to_list(length=limit)
    else:
        next_cnt, next_id = next.split("_")
        articles = await db.articles.find({"$or": [{"cnt": {"$lt": next_cnt}}, {"_id": {"$lt": ObjectId(next_id)}}]}).sort([("cnt", -1), ("_id", -1)]).to_list(length=limit)
    
    return article_helper(articles)


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