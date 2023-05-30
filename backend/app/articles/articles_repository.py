from ..database import db
from bson.objectid import ObjectId
from .articles_schema import Article


def article_helper(article) -> dict:
    return {
        "id": str(article["_id"]),
    }


async def find_all_articles(article_ids: list[str]):
    articles = []
    cnt = 0;
    
    for id in article_ids[::-1]:
        article = await db.articles.find_one({"_id": ObjectId(id["id"])})

        temp = {
            "id": str(article["_id"]),
            "datetime": article["datetime"],
            "title": article["title"],
            "image": article["image"]
        }
        articles.append(temp)
        cnt += 1

        # pagination 추가하기
        if (cnt == 5):
            break

    articles.sort(key=lambda x: x["datetime"], reverse=True)

    return articles


async def find_hot_articles():
    return await db.articles.find({}, {"_id": 0}).sort([("cnt", -1), ("datetime", -1)]).to_list(length=5)


async def find_article(article_id: str):
    article = await db.articles.find_one({"_id": ObjectId(article_id)}, {"_id": 0})
    
    return article


async def find_article_by_link(link: str):
    article = await db.articles.find_one({"link": link}, {"_id": 1})

    return str(article["_id"]) if article else None


async def add_article(article: Article):
    await db.articles.insert_one(article)
    
    return article_helper(article)


async def update_article(article_id: article_helper, image_url: str):
    await db.articles.update_one({"_id":ObjectId(article_id['id'])}, {"$set":{"image":image_url}})
    
    return


async def update_article_cnt(article_id: str):
    return await db.articles.update_one({"_id": ObjectId(article_id)}, {"$inc": {"cnt": 1}})