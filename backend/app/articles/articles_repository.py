from ..database import db
from bson.objectid import ObjectId
from .articles_schema import Article


def article_helper(article) -> dict:
    return {
        "_id": str(article["_id"]),
        "link": article["link"],
        "datetime": article["datetime"],
        "title": article["title"],
        "image": article["image"],
        "cnt": article["cnt"],
        "summary": article["summary"],
        "description": article["description"],
        "categories": article["categories"]
    } if article else None


async def find_all_articles(article_ids: list[str]):
    articles = []
    cnt = 0;
    
    for id in article_ids[::-1]:
        article = await db.articles.find_one({"_id": ObjectId(id)})

        temp = {
            "_id": str(article["_id"]),
            "datetime": article["datetime"],
            "title": article["title"],
            "image": article["image"]
        }
        articles.append(temp)
        cnt += 1

        # pagination 추가하기
        if (cnt == 5):
            break

    return articles


async def find_hot_articles():
    articles = await db.articles.find().sort([("cnt", -1), ("_id", -1)]).to_list(length=4)

    for article in articles:
        article["_id"] = str(article["_id"])

    return articles


async def find_all_hot_articles(limit: int, next: str | None):
    if next is None:
        articles = await db.articles.find().sort([("cnt", -1), ("_id", -1)]).to_list(length=limit)
    else:
        next_cnt, next_id = next.split("_")
        articles = await db.articles.find({"$or": [{"cnt": {"$lt": next_cnt}}, {"_id": {"$lt": ObjectId(next_id)}}]}).sort([("cnt", -1), ("_id", -1)]).to_list(length=limit)

    for article in articles:
        article["_id"] = str(article["_id"])

    return articles


async def find_article(article_id: str):
    article = await db.articles.find_one({"_id": ObjectId(article_id)}, {"_id": 0})
    
    return article


async def find_article_by_link(link: str):
    article = await db.articles.find_one({"link": link})

    return article_helper(article)


async def add_article(article: Article):
    newArticle = await db.articles.insert_one(article)
    
    return str(newArticle.inserted_id)


async def update_article(article_id: str, image_url: str):
    return await db.articles.update_one({"_id":ObjectId(article_id)}, {"$set":{"image":image_url}})


async def update_article_cnt(article_id: str):
    return await db.articles.update_one({"_id": ObjectId(article_id)}, {"$inc": {"cnt": 1}})