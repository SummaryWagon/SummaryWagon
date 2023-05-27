from ..database import db
from bson.objectid import ObjectId
from .articles_schema import Article


def article_helper(article) -> dict:
    return {
        "id": str(article["_id"]),
    }


async def find_articles(article_ids: list[int]):
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


async def add_article(article: Article):
    await db.articles.insert_one(article)
    
    return article_helper(article)