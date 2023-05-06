import motor.motor_asyncio
from decouple import config
from bson.objectid import ObjectId
import certifi

from .models.usersArticle import User, Article

ca = certifi.where()

MONGODB_URI = config("MONGODB_URI")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI, tlsCAFile=ca)
db = client.dbEarlyDev


def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "article_ids": user["article_ids"]
    }


def article_helper(article) -> dict:
    return {
        "id": str(article["_id"]),
    }


async def get_user(user_id:str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    return user


async def update_user(email:str, article_id:str):
    return await db.users.update_one({"email": email}, {"$push": {"article_ids": article_id}})


async def get_articles(email:str): 
    user = await db.users.find_one({"email": email})
    user_articles = user["article_ids"]
    articles = []
    for id in user_articles[::-1]:
        article = await db.articles.find_one({"_id": ObjectId(id["id"])})
        temp = {
            "id": str(article["_id"]),
            "title": article["title"],
            "image": article["image"]
        }
        articles.append(temp)
        if (len(articles) == 5):
            break
    return articles


async def get_hot_articles():
    hot_articles = await db.articles.find({"_id": 0}).sort("cnt", -1).to_list(length=5)
    return hot_articles


async def add_article(article:Article): 
    await db.articles.insert_one(article)
    return article_helper(article)