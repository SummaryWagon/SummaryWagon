from ..database import db


async def find_user_by_email(email: str):
    user = await db.users.find_one({"email": email})
    return user


async def find_user_by_article_id(email: str, article_id: str):
    user = await db.users.find_one({"email": email, "article_ids": article_id}, {"_id": 1})
    
    return str(user["_id"]) if user else None


async def update_user(email:str, article_id:str):
    return await db.users.update_one({"email": email}, {"$push": {"article_ids": article_id}})