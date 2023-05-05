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
        "links": user["links"],
    }


async def get_user(user_id:str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    return user


async def update_user(email:str, link:str):
    user = await db.users.find_one({"email": email, "links": {"$exists": 1}})

    if (user):
        await db.users.update_one({"email": email}, {"$push": {"links": link}})
    else:
        await db.users.update_one({"email": email}, {"$set": {"links": [link]}})

    return user_helper(user)


async def get_articles(email:str): 
    user = await db.users.find_one({"email": email})
    user_links = user["links"]
    articles = []
    for link in user_links:
        article = await db.articles.find_one({"link": link},{"_id": 0})
        articles.append(article)
    return articles


async def get_hot_articles():
    hot_articles = await db.articles.find({"_id": 0}).sort("cnt", -1).to_list(length=5)
    return hot_articles


async def add_article(article:Article): 
    article = await db.articles.insert_one(article.dict())
    return article