from fastapi import APIRouter
from pydantic import BaseModel

from ..models.usersArticle import ResponseModel, ErrorResponseModel
from ..database import (
    get_user,
    update_user,
    get_articles,
    get_hot_articles,
    add_article
)

class User(BaseModel):
    user_id: str
    link: str | None = None

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
async def read_user_articles(user:User):
    user_articles = await get_articles(user.user_id)
    return user_articles


@router.post("/")
async def add_user_article(user:User):
    user = await update_user(user.user_id, user.link)
    
    return ResponseModel(user, "User link added successfully.")
